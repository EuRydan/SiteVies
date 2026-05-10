import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre",
  description:
    "Conheça a Viés Studios: uma agência digital do Rio de Janeiro construída sobre obsessão por qualidade, performance e código limpo.",
  openGraph: {
    title: "Sobre | Viés Studios",
    description:
      "Uma agência construída sobre obsessão por qualidade. Conheça nossa história e valores.",
    images: [{ url: "/og/sobre.png", width: 1200, height: 630 }],
  },
  alternates: { canonical: "https://viesstudios.com.br/sobre" },
};

export default function SobreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
