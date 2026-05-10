import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Processo",
  description:
    "Conheça nosso processo de trabalho: do briefing ao launch, cada fase é transparente, documentada e aprovada por você. Sem surpresas.",
  openGraph: {
    title: "Processo | Viés Studios",
    description:
      "Do briefing ao resultado. Conheça cada etapa do nosso processo de criação.",
    images: [{ url: "/og/processo.png", width: 1200, height: 630 }],
  },
  alternates: { canonical: "https://viesstudios.com.br/processo" },
};

export default function ProcessoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
