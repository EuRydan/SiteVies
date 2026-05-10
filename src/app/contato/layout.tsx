import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Entre em contato com a Viés Studios. Briefing gratuito, sem compromisso. Respondemos em até 24 horas.",
  openGraph: {
    title: "Contato | Viés Studios",
    description:
      "Inicie uma conversa sobre seu próximo projeto digital. Briefing gratuito.",
    images: [{ url: "/og/contato.png", width: 1200, height: 630 }],
  },
  alternates: { canonical: "https://viesstudios.com.br/contato" },
};

export default function ContatoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
