import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, company, projectType, budget, message } = body;

    // Validate required fields
    if (!name || !email || !projectType || !budget || !message) {
      return NextResponse.json(
        { error: "Campos obrigatórios faltando." },
        { status: 400 }
      );
    }

    // If Resend API key is configured, send email
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: "Viés Studios <noreply@viesstudios.com.br>",
          to: ["contato@viesstudios.com.br"],
          subject: `Novo contato: ${name} - ${projectType}`,
          html: `
            <h2>Novo contato via site</h2>
            <p><strong>Nome:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Empresa:</strong> ${company || "Não informada"}</p>
            <p><strong>Tipo de projeto:</strong> ${projectType}</p>
            <p><strong>Orçamento:</strong> ${budget}</p>
            <p><strong>Mensagem:</strong></p>
            <p>${message}</p>
          `,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Resend error:", errorData);
        return NextResponse.json(
          { error: "Erro ao enviar email." },
          { status: 500 }
        );
      }
    } else {
      // Log to console when Resend is not configured
      console.log("Contact form submission:", {
        name,
        email,
        company,
        projectType,
        budget,
        message,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor." },
      { status: 500 }
    );
  }
}
