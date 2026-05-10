"use client";

import { Award, Eye, Code, Shield } from "lucide-react";
import SectionLabel from "@/components/SectionLabel";
import AnimatedText from "@/components/AnimatedText";
import ScrollReveal from "@/components/ScrollReveal";
import GlowCard from "@/components/GlowCard";

const values = [
  {
    icon: Award,
    title: "Qualidade sobre velocidade",
    desc: "Preferimos entregar menos e entregar certo. Cada pixel, cada linha de código, cada decisão de design é intencional.",
  },
  {
    icon: Eye,
    title: "Transparência em cada etapa",
    desc: "Você sabe exatamente o que está sendo feito, quando e por quê. Sem surpresas, sem custos ocultos, sem promessas vazias.",
  },
  {
    icon: Code,
    title: "Código que você pode se orgulhar",
    desc: "TypeScript strict, componentes documentados, testes automatizados. O código que entregamos é o código que gostaríamos de manter.",
  },
  {
    icon: Shield,
    title: "SEO e segurança como padrão",
    desc: "Nunca como opcional, nunca como add-on. Cada projeto nasce com SSL, headers de segurança, SEO técnico e performance otimizada.",
  },
];

const techStack = [
  { name: "Next.js", use: "Framework principal" },
  { name: "React", use: "UI Library" },
  { name: "TypeScript", use: "Tipagem estática" },
  { name: "Tailwind CSS", use: "Estilização" },
  { name: "Framer Motion", use: "Animações" },
  { name: "Supabase", use: "Backend & Auth" },
  { name: "Sanity", use: "CMS Headless" },
  { name: "Vercel", use: "Deploy & Edge" },
  { name: "PostgreSQL", use: "Banco de dados" },
  { name: "Figma", use: "Design & Protótipos" },
  { name: "Node.js", use: "APIs & Backend" },
  { name: "n8n", use: "Automações" },
];

export default function SobrePage() {
  return (
    <div className="pt-32 pb-20">
      {/* Hero */}
      <section className="max-w-7xl mx-auto section-padding mb-24">
        <SectionLabel text="SOBRE A VIÉS" />
        <AnimatedText
          text="Uma agência construída sobre obsessão por qualidade."
          tag="h1"
          className="font-sora font-extrabold text-[40px] md:text-[56px] lg:text-hero leading-[1.0] tracking-[-0.03em] text-text-primary mb-8"
        />
        <ScrollReveal>
          <div className="max-w-3xl space-y-6">
            <p className="font-inter font-light text-body text-text-secondary">
              A Viés Studios nasceu de uma frustração: a distância entre o que agências
              prometem e o que realmente entregam. Sites lentos, sem SEO, sem segurança,
              sem estratégia — vendidos como &ldquo;premium&rdquo;.
            </p>
            <p className="font-inter font-light text-body text-text-secondary">
              Decidimos fazer diferente. Cada projeto nosso é construído com as mesmas
              ferramentas que empresas de tecnologia de ponta usam. Next.js, TypeScript,
              Supabase, Vercel — porque acreditamos que pequenos e médios negócios
              merecem a mesma qualidade técnica das startups do Vale do Silício.
            </p>
            <p className="font-inter font-light text-body text-text-secondary">
              Somos do Rio de Janeiro, mas trabalhamos remotamente com clientes de todo
              o Brasil. Nosso foco é simples: criar interfaces que impressionam, código
              que performa e estratégia que posiciona.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* Values */}
      <section className="max-w-7xl mx-auto section-padding mb-32">
        <SectionLabel text="NOSSOS VALORES" />
        <AnimatedText
          text="No que acreditamos."
          tag="h2"
          className="font-sora font-bold text-section text-text-primary mb-12"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {values.map((value, i) => (
            <ScrollReveal key={value.title} delay={i * 0.1}>
              <GlowCard className="h-full">
                <value.icon
                  size={28}
                  className="text-accent mb-4"
                  strokeWidth={1.5}
                />
                <h3 className="font-sora font-bold text-card-title text-text-primary mb-3">
                  {value.title}
                </h3>
                <p className="font-inter font-light text-sm text-text-secondary leading-relaxed">
                  {value.desc}
                </p>
              </GlowCard>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Tech Stack */}
      <section className="max-w-7xl mx-auto section-padding">
        <SectionLabel text="NOSSA STACK" />
        <AnimatedText
          text="Tecnologias que usamos."
          tag="h2"
          className="font-sora font-bold text-section text-text-primary mb-12"
        />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {techStack.map((tech, i) => (
            <ScrollReveal key={tech.name} delay={i * 0.05}>
              <div className="bg-bg-card tech-card tech-card-hover p-4 group">
                <div className="w-10 h-10 bg-accent-muted flex items-center justify-center mb-3 group-hover:bg-accent/20 transition-colors" style={{ borderRadius: "2px" }}>
                  <span className="font-sora font-bold text-accent text-sm">
                    {tech.name.charAt(0)}
                  </span>
                </div>
                <h4 className="font-inter font-medium text-sm text-text-primary mb-1">
                  {tech.name}
                </h4>
                <p className="font-inter text-[12px] text-text-tertiary">
                  {tech.use}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </div>
  );
}
