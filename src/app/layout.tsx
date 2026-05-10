import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Sora } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-jetbrains",
  display: "swap",
  preload: true,
});

const sora = Sora({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "800"],
  variable: "--font-sora",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://viesstudios.com.br"),
  title: {
    default: "Viés Studios — Agência de Criação Digital Premium",
    template: "%s | Viés Studios",
  },
  description:
    "Criamos websites, aplicações e sistemas que combinam design de alto impacto, segurança em profundidade e SEO que realmente posiciona. Agência premium no Rio de Janeiro.",
  keywords: [
    "agência digital",
    "criação de sites",
    "desenvolvimento web",
    "Next.js",
    "React",
    "SEO técnico",
    "Rio de Janeiro",
  ],
  authors: [{ name: "Viés Studios" }],
  creator: "Viés Studios",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://viesstudios.com.br",
    siteName: "Viés Studios",
    title: "Viés Studios — Agência de Criação Digital Premium",
    description:
      "Criamos websites, aplicações e sistemas que combinam design de alto impacto, segurança em profundidade e SEO que realmente posiciona.",
    images: [
      {
        url: "/og/home.png",
        width: 1200,
        height: 630,
        alt: "Viés Studios",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Viés Studios — Agência de Criação Digital Premium",
    description:
      "Criamos websites premium com design de alto impacto, segurança e SEO técnico.",
  },
  alternates: {
    canonical: "https://viesstudios.com.br",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const schemaOrg = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Viés Studios",
    url: "https://viesstudios.com.br",
    description:
      "Agência de criação de websites premium, apps e sistemas digitais.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Rio de Janeiro",
      addressCountry: "BR",
    },
  };

  return (
    <html lang="pt-BR" className={`${inter.variable} ${jetbrainsMono.variable} ${sora.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
      </head>
      <body className="font-inter antialiased bg-bg-primary text-text-primary">
        <Navbar />
        <main className="relative z-10 min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
