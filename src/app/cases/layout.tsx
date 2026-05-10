import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cases",
  description:
    "Conheça os projetos da Viés Studios: sites, apps, sistemas e branding que entregam resultado real. Cada case é uma prova da nossa qualidade.",
  openGraph: {
    title: "Cases | Viés Studios",
    description:
      "Projetos que falam por si. Conheça nosso portfólio de sites, apps e sistemas.",
    images: [{ url: "/og/cases.png", width: 1200, height: 630 }],
  },
  alternates: { canonical: "https://viesstudios.com.br/cases" },
};

export default function CasesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
