import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Serviços",
  description:
    "Sites, apps, dashboards e sistemas digitais com SEO técnico, segurança em profundidade e design premium. Conheça nossos serviços e planos.",
  openGraph: {
    title: "Serviços | Viés Studios",
    description:
      "Sites, apps, dashboards e sistemas digitais com SEO técnico, segurança em profundidade e design premium.",
    images: [{ url: "/og/servicos.png", width: 1200, height: 630 }],
  },
  alternates: { canonical: "https://viesstudios.com.br/servicos" },
};

export default function ServicosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
