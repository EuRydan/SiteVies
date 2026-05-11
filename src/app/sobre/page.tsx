"use client";

import { Award, Eye, Code, Shield } from "lucide-react";
import { 
  SiNextdotjs, 
  SiReact, 
  SiTypescript, 
  SiTailwindcss, 
  SiFramer, 
  SiSupabase, 
  SiSanity, 
  SiVercel, 
  SiPostgresql, 
  SiFigma, 
  SiNodedotjs, 
  SiN8N 
} from "react-icons/si";
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
    title: "Transparência total",
    desc: "Você sabe exatamente o que está sendo feito, quando e por quê. Sem surpresas ou promessas vazias.",
  },
  {
    icon: Code,
    title: "Código de alto nível",
    desc: "TypeScript strict, componentes documentados, testes automatizados. Entregamos o que gostaríamos de manter.",
  },
  {
    icon: Shield,
    title: "SEO e segurança nativos",
    desc: "Cada projeto nasce com SSL, headers de segurança e performance otimizada como padrão absoluto.",
  },
];

const techStack = [
  { name: "Next.js", use: "Framework", icon: SiNextdotjs },
  { name: "React", use: "UI Library", icon: SiReact },
  { name: "TypeScript", use: "Tipagem", icon: SiTypescript },
  { name: "Tailwind CSS", use: "Estilo", icon: SiTailwindcss },
  { name: "Framer Motion", use: "Animação", icon: SiFramer },
  { name: "Supabase", use: "Backend", icon: SiSupabase },
  { name: "Sanity", use: "CMS", icon: SiSanity },
  { name: "Vercel", use: "Cloud", icon: SiVercel },
  { name: "PostgreSQL", use: "Database", icon: SiPostgresql },
  { name: "Figma", use: "Design", icon: SiFigma },
  { name: "Node.js", use: "Runtime", icon: SiNodedotjs },
  { name: "n8n", use: "Automação", icon: SiN8N },
];

export default function SobrePage() {
  return (
    <div className="pt-24 md:pt-32 pb-20">
      {/* Hero */}
      <section className="max-w-7xl mx-auto section-padding mb-20 lg:mb-32">
        <SectionLabel text="SOBRE A VIÉS" />
        <AnimatedText
          text="Uma agência construída sobre obsessão por qualidade."
          tag="h1"
          className="font-sora font-extrabold text-hero text-text-primary mb-8"
        />
        <ScrollReveal>
          <div className="max-w-3xl space-y-6">
            <p className="font-inter font-light text-sm md:text-body text-text-secondary leading-relaxed">
              A Viés Studios nasceu para fechar a distância entre o que agências
              prometem e o que realmente entregam. Sites lentos, sem SEO e sem segurança
              não deveriam ser vendidos como &ldquo;premium&rdquo;.
            </p>
            <p className="font-inter font-light text-sm md:text-body text-text-secondary leading-relaxed">
              Decidimos fazer diferente. Cada projeto nosso é construído com as mesmas
              tecnologias que startups do Vale do Silício usam — Next.js, TypeScript e Vercel —
              porque acreditamos que cada negócio merece excelência técnica.
            </p>
            <p className="font-inter font-light text-sm md:text-body text-text-secondary leading-relaxed">
              Nosso foco é simples: interfaces que impressionam, código que performa
              e estratégia que realmente posiciona sua marca no topo.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* Values */}
      <section className="max-w-7xl mx-auto section-padding mb-24 lg:mb-40">
        <SectionLabel text="NOSSOS VALORES" />
        <AnimatedText
          text="No que acreditamos."
          tag="h2"
          className="font-sora font-bold text-section text-text-primary mb-10 lg:mb-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {values.map((value, i) => (
            <ScrollReveal key={value.title} delay={i * 0.1}>
              <GlowCard className="h-full !p-6 md:!p-8">
                <value.icon size={24} className="text-accent mb-4 md:mb-6" strokeWidth={1.5} />
                <h3 className="font-sora font-bold text-lg md:text-card-title text-text-primary mb-2 md:mb-3">
                  {value.title}
                </h3>
                <p className="font-inter font-light text-sm md:text-body text-text-secondary leading-relaxed">
                  {value.desc}
                </p>
              </GlowCard>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Tech Stack */}
      <section className="max-w-7xl mx-auto section-padding mb-16 lg:mb-32">
        <SectionLabel text="NOSSA STACK" />
        <AnimatedText
          text="Tecnologias que usamos."
          tag="h2"
          className="font-sora font-bold text-section text-text-primary mb-10 lg:mb-16"
        />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
          {techStack.map((tech, i) => (
            <ScrollReveal key={tech.name} delay={i * 0.05}>
              <div className="bg-bg-card tech-card tech-card-hover p-4 md:p-6 group h-full">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-accent-muted flex items-center justify-center mb-3 md:mb-4 group-hover:bg-accent/20 transition-colors" style={{ borderRadius: "1px" }}>
                  <tech.icon className="text-accent text-lg md:text-xl group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h4 className="font-inter font-medium text-xs md:text-sm text-text-primary mb-1">
                  {tech.name}
                </h4>
                <p className="font-inter text-[10px] md:text-[11px] text-text-tertiary">
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
