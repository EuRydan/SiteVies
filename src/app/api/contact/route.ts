import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { z } from "zod"

// Schema de validação server-side com Zod
// Os valores dos enums DEVEM corresponder aos values dos <option> no formulário
const ContactSchema = z.object({
  name: z
    .string()
    .min(2, "Nome muito curto")
    .max(100, "Nome muito longo")
    .regex(/^[a-zA-ZÀ-ÖØ-öø-ÿ\s'-]+$/, "Nome inválido"), // letras, acentos, espaços
  email: z
    .string()
    .email("Email inválido")
    .max(254, "Email muito longo"), // RFC 5321 limit
  company: z
    .string()
    .max(100, "Nome da empresa muito longo")
    .optional()
    .or(z.literal("")),
  projectType: z.enum(["site", "app", "dashboard", "sistema", "outro"], {
    message: "Tipo de projeto inválido",
  }),
  budget: z.enum(
    ["ate-5k", "5k-15k", "15k-30k", "acima-30k", "a-definir"],
    { message: "Orçamento inválido" }
  ),
  message: z
    .string()
    .min(10, "Mensagem muito curta")
    .max(2000, "Mensagem muito longa"),
  honeypot: z.string().max(0, "Bot detectado"), // deve estar vazio
})

// Labels amigáveis para o email
const projectTypeLabels: Record<string, string> = {
  site: "Site",
  app: "App",
  dashboard: "Dashboard",
  sistema: "Sistema",
  outro: "Outro",
}

const budgetLabels: Record<string, string> = {
  "ate-5k": "Até R$5k",
  "5k-15k": "R$5k – R$15k",
  "15k-30k": "R$15k – R$30k",
  "acima-30k": "Acima de R$30k",
  "a-definir": "A definir",
}

// Sanitização: remove tags HTML da string
function stripHtml(str: string): string {
  return str
    .replace(/<[^>]*>/g, "")           // remove tags
    .replace(/&[a-z]+;/gi, "")         // remove HTML entities
    .replace(/javascript:/gi, "")       // remove javascript: protocol
    .trim()
}

// Headers de segurança para a response
const securityHeaders = {
  "Content-Type": "application/json",
  "X-Content-Type-Options": "nosniff",
  "Cache-Control": "no-store, no-cache",
}

export async function POST(req: NextRequest) {
  try {
    // 1. Verificar Content-Type
    const contentType = req.headers.get("content-type") ?? ""
    if (!contentType.includes("application/json")) {
      return NextResponse.json(
        { error: "Content-Type inválido" },
        { status: 415, headers: securityHeaders }
      )
    }

    // 2. Verificar Origin — só aceitar do próprio domínio
    const origin = req.headers.get("origin") ?? ""
    const allowedOrigins = [
      process.env.NEXT_PUBLIC_SITE_URL ?? "",
      "http://localhost:3000",
    ].filter(Boolean)

    if (!allowedOrigins.some(o => origin.startsWith(o))) {
      return NextResponse.json(
        { error: "Origem não autorizada" },
        { status: 403, headers: securityHeaders }
      )
    }

    // 3. Verificar tamanho do body (máximo 10KB)
    const contentLength = req.headers.get("content-length")
    if (contentLength && parseInt(contentLength) > 10_240) {
      return NextResponse.json(
        { error: "Payload muito grande" },
        { status: 413, headers: securityHeaders }
      )
    }

    // 4. Parse do body
    let body: unknown
    try {
      body = await req.json()
    } catch {
      return NextResponse.json(
        { error: "JSON inválido" },
        { status: 400, headers: securityHeaders }
      )
    }

    // 5. Validação server-side com Zod
    const result = ContactSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { error: "Dados inválidos", details: result.error.flatten().fieldErrors },
        { status: 422, headers: securityHeaders }
      )
    }

    // 6. Honeypot — se preenchido, é bot — responder 200 para não revelar detecção
    if (result.data.honeypot !== "") {
      return NextResponse.json(
        { success: true },
        { status: 200, headers: securityHeaders }
      )
    }

    // 7. Sanitização dos campos de texto livre
    const sanitized = {
      ...result.data,
      name: stripHtml(result.data.name),
      company: result.data.company ? stripHtml(result.data.company) : "",
      message: stripHtml(result.data.message),
    }

    // 8. Verificar que RESEND_API_KEY está configurada
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY não configurada")
      return NextResponse.json(
        { error: "Erro interno de configuração" },
        { status: 500, headers: securityHeaders }
      )
    }

    // 9. Enviar email via Resend
    const resend = new Resend(process.env.RESEND_API_KEY)
    const { error: resendError } = await resend.emails.send({
      from: "Viés Studios <contato@viesstudios.com.br>",
      to: ["contato@viesstudios.com.br"],
      replyTo: sanitized.email,
      subject: `[Novo contato] ${projectTypeLabels[sanitized.projectType] ?? sanitized.projectType} — ${sanitized.name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #FF5A1A;">Novo contato via site</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; font-weight: bold;">Nome</td><td>${sanitized.name}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Email</td><td>${sanitized.email}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Empresa</td><td>${sanitized.company || "—"}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Tipo</td><td>${projectTypeLabels[sanitized.projectType] ?? sanitized.projectType}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Orçamento</td><td>${budgetLabels[sanitized.budget] ?? sanitized.budget}</td></tr>
          </table>
          <h3>Mensagem</h3>
          <p style="white-space: pre-wrap; background: #f5f5f5; padding: 16px; border-radius: 4px;">${sanitized.message}</p>
        </div>
      `,
    })

    if (resendError) {
      // Log interno mas não expor detalhes pro cliente
      console.error("Resend error:", resendError)
      return NextResponse.json(
        { error: "Falha ao enviar mensagem. Tente novamente." },
        { status: 502, headers: securityHeaders }
      )
    }

    return NextResponse.json(
      { success: true },
      { status: 200, headers: securityHeaders }
    )

  } catch (err) {
    // Nunca expor stack trace em produção
    console.error("Contact API error:", err)
    return NextResponse.json(
      { error: "Erro interno. Tente novamente." },
      { status: 500, headers: securityHeaders }
    )
  }
}

// Bloquear qualquer método que não seja POST
export async function GET() {
  return NextResponse.json(
    { error: "Método não permitido" },
    { status: 405, headers: { ...securityHeaders, Allow: "POST" } }
  )
}
