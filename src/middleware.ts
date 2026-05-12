import { NextRequest, NextResponse } from "next/server"

// Armazenamento em memória dos hits por IP
// Em produção com múltiplas instâncias, substituir por Redis (Upstash)
const rateLimit = new Map<string, { count: number; resetAt: number }>()

const LIMIT = 5           // máximo 5 requests
const WINDOW_MS = 60_000  // por janela de 60 segundos

export function middleware(req: NextRequest) {
  // Aplicar rate limiting apenas na rota de contato
  if (!req.nextUrl.pathname.startsWith("/api/contact")) {
    return NextResponse.next()
  }

  // Extrair IP — Vercel fornece x-forwarded-for
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"

  const now = Date.now()
  const record = rateLimit.get(ip)

  // Resetar janela se expirou
  if (!record || now > record.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return NextResponse.next()
  }

  // Incrementar contador
  record.count++

  if (record.count > LIMIT) {
    return NextResponse.json(
      { error: "Muitas tentativas. Aguarde alguns minutos." },
      {
        status: 429,
        headers: {
          "Retry-After": "60",
          "X-RateLimit-Limit": String(LIMIT),
          "X-RateLimit-Remaining": "0",
        },
      }
    )
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/api/contact"],
}
