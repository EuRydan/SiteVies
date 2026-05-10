"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Check, ArrowRight, Shield, Search, Zap, Code } from "lucide-react";
import Link from "next/link";
import SectionLabel from "@/components/SectionLabel";
import AnimatedText from "@/components/AnimatedText";
import ScrollReveal from "@/components/ScrollReveal";
import GlowCard from "@/components/GlowCard";

const services = [
  {
    title: "Sites & Landing Pages",
    desc: "Criamos sites institucionais, landing pages de alta conversão e e-commerces performáticos com SEO técnico avançado e design estratégico que diferencia sua marca.",
    deliverables: [
      "Design responsivo mobile-first",
      "SEO técnico completo (Schema, sitemap, meta tags)",
      "Core Web Vitals otimizados",
      "CMS headless para autonomia de conteúdo",
      "Certificado SSL e headers de segurança",
      "Analytics e tracking configurados",
    ],
    stack: ["Next.js", "React", "Tailwind CSS", "Sanity CMS", "Vercel"],
  },
  {
    title: "Apps & Dashboards",
    desc: "Desenvolvemos plataformas SaaS, painéis de dados interativos e sistemas internos com autenticação robusta, escalabilidade real e interfaces que seus usuários vão amar.",
    deliverables: [
      "Autenticação segura (OAuth, JWT, MFA)",
      "Dashboard com visualização de dados",
      "API REST documentada",
      "Banco de dados escalável (PostgreSQL)",
      "Deploy com CI/CD automatizado",
      "Testes automatizados",
    ],
    stack: ["React", "TypeScript", "Supabase", "PostgreSQL", "Vercel"],
  },
  {
    title: "Sistemas & Automações",
    desc: "Construímos integrações, automações e sistemas sob medida para eliminar trabalho manual e escalar operações. Do webhook simples ao sistema complexo.",
    deliverables: [
      "Integrações com APIs de terceiros",
      "Automações de processos com n8n",
      "Webhooks e event-driven architecture",
      "Relatórios automatizados",
      "Monitoramento e alertas",
      "Documentação técnica completa",
    ],
    stack: ["Node.js", "n8n", "Webhooks", "REST APIs", "PostgreSQL"],
  },
];

const differentials = [
  {
    icon: Search,
    title: "SEO Técnico",
    desc: "Schema markup, sitemap XML, Core Web Vitals, meta dinâmico por página. Não apenas tags — estrutura real para ranquear.",
  },
  {
    icon: Shield,
    title: "Segurança",
    desc: "HTTPS forçado, CSP headers, sanitização de inputs, rate limiting, auditoria. Segurança como arquitetura, não como feature.",
  },
  {
    icon: Zap,
    title: "Performance",
    desc: "Bundle splitting, lazy loading, cache edge, imagens WebP/AVIF automático. Cada milissegundo importa para conversão.",
  },
  {
    icon: Code,
    title: "Código Limpo",
    desc: "TypeScript strict, componentes documentados, zero dependências desnecessárias. Código que outros devs querem manter.",
  },
];

const tiers = [
  {
    name: "Starter",
    type: "Landing Page",
    cms: "—",
    seo: "Básico",
    security: "SSL + Headers",
    prazo: "2 semanas",
    support: "30 dias",
    cta: "Solicitar",
    featured: false,
  },
  {
    name: "Pro",
    type: "Site Completo",
    cms: "✓ Headless",
    seo: "Técnico",
    security: "+ CSP + Audit",
    prazo: "4–6 semanas",
    support: "90 dias",
    cta: "Solicitar",
    featured: true,
  },
  {
    name: "Studio",
    type: "App ou Sistema",
    cms: "✓ Customizado",
    seo: "Técnico + Avançado",
    security: "+ Rate limit + Custom",
    prazo: "Sob consulta",
    support: "Contrato mensal",
    cta: "Falar com a equipe",
    featured: false,
  },
];

/* ──────────────── SERVICE CARD — STACKABLE ──────────────── */
interface ServiceCardProps {
  service: typeof services[0];
  index: number;
}

function ServiceCard({ service, index }: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "start start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 1], [0, 1, 1]);

  return (
    <div
      ref={cardRef}
      className="sticky w-full"
      style={{ 
        top: `${100 + index * 40}px`,
        zIndex: index + 10,
        paddingBottom: "80px"
      }}
    >
      <motion.div style={{ scale, opacity }} className="overflow-visible">
        <GlowCard className="!p-8 md:!p-12 transition-all duration-500 hover:border-accent/40 bg-bg-primary" tilt={false}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="font-sora font-bold text-[32px] md:text-[40px] text-text-primary mb-6 leading-tight">
                {service.title}
              </h3>
              <p className="font-inter font-light text-body text-text-secondary mb-10 max-w-lg leading-relaxed">
                {service.desc}
              </p>
              <div className="flex flex-wrap gap-2 mb-10">
                {service.stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-1.5 bg-accent-muted text-accent font-mono text-[11px] font-bold uppercase tracking-widest border border-accent/10"
                    style={{ borderRadius: "2px" }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <Link
                href="/contato"
                className="inline-flex items-center gap-2 text-accent font-inter font-medium text-cta group"
              >
                Solicitar orçamento
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>

            <div className="bg-white/[0.02] border border-white/[0.05] p-8 md:p-10 rounded-[2px]">
              <h4 className="font-mono text-label uppercase text-text-tertiary tracking-[0.15em] mb-8">
                ENTREGÁVEIS
              </h4>
              <ul className="space-y-4">
                {service.deliverables.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check
                      size={16}
                      className="text-accent mt-1 flex-shrink-0"
                      strokeWidth={3}
                    />
                    <span className="font-inter font-light text-[15px] text-text-secondary">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </GlowCard>
      </motion.div>
    </div>
  );
}

export default function ServicosPage() {
  return (
    <div className="pt-32 pb-20">
      {/* Hero */}
      <section className="max-w-7xl mx-auto section-padding mb-24">
        <SectionLabel text="NOSSOS SERVIÇOS" />
        <AnimatedText
          text="Tudo que seu negócio precisa no digital."
          tag="h1"
          className="font-sora font-extrabold text-[40px] md:text-[56px] lg:text-hero leading-[1.0] tracking-[-0.03em] text-text-primary mb-6"
        />
        <ScrollReveal>
          <p className="font-inter font-light text-body text-text-secondary max-w-2xl">
            De landing pages de alta conversão a sistemas complexos — cada projeto é
            construído com obsessão por qualidade, performance e resultado mensurável.
          </p>
        </ScrollReveal>
      </section>

      {/* Expanded Service Cards — STACKED EFFECT */}
      <section className="max-w-7xl mx-auto section-padding mb-40 overflow-visible">
        <div className="relative space-y-[15vh] pb-[20vh]">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </section>

      {/* Differentials */}
      <section className="max-w-7xl mx-auto section-padding mb-32">
        <SectionLabel text="DIFERENCIAIS TÉCNICOS" />
        <AnimatedText
          text="Por que somos diferentes."
          tag="h2"
          className="font-sora font-bold text-section text-text-primary mb-12"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {differentials.map((diff, i) => (
            <ScrollReveal key={diff.title} delay={i * 0.1}>
              <GlowCard className="h-full">
                <diff.icon
                  size={28}
                  className="text-accent mb-4"
                  strokeWidth={1.5}
                />
                <h3 className="font-sora font-bold text-card-title text-text-primary mb-3">
                  {diff.title}
                </h3>
                <p className="font-inter font-light text-sm text-text-secondary leading-relaxed">
                  {diff.desc}
                </p>
              </GlowCard>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="max-w-7xl mx-auto section-padding">
        <SectionLabel text="PLANOS" />
        <AnimatedText
          text="Encontre o plano ideal."
          tag="h2"
          className="font-sora font-bold text-section text-text-primary mb-12"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tiers.map((tier, i) => (
            <ScrollReveal key={tier.name} delay={i * 0.15}>
              <div
                className={`tech-card p-8 relative ${
                  tier.featured
                    ? "corner-decoration"
                    : ""
                }`}
                style={tier.featured ? {
                  borderColor: "rgba(255,90,26,0.4)",
                  borderTopColor: "rgba(255,90,26,0.6)",
                  boxShadow: "0 0 0 1px rgba(255,90,26,0.15) inset, 0 8px 32px rgba(255,90,26,0.08)",
                } : {}}
              >
                {tier.featured && (
                  <span className="absolute -top-3 left-6 px-3 py-1 bg-accent text-bg-primary font-mono text-[10px] uppercase tracking-wider" style={{ borderRadius: "2px" }}>
                    Mais escolhido
                  </span>
                )}
                <h3 className="font-sora font-bold text-2xl text-text-primary mb-1">
                  {tier.name}
                </h3>
                <p className="font-inter text-sm text-text-secondary mb-6">
                  {tier.type}
                </p>

                <div className="space-y-4 mb-8">
                  {[
                    { label: "CMS", value: tier.cms },
                    { label: "SEO", value: tier.seo },
                    { label: "Segurança", value: tier.security },
                    { label: "Prazo", value: tier.prazo },
                    { label: "Suporte", value: tier.support },
                  ].map((row) => (
                    <div
                      key={row.label}
                      className="flex justify-between items-center border-b border-border-subtle pb-3"
                    >
                      <span className="font-mono text-[11px] text-text-tertiary uppercase tracking-wider">
                        {row.label}
                      </span>
                      <span className="font-inter text-sm text-text-primary">
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>

                <Link
                  href="/contato"
                  className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3 font-inter font-medium text-cta transition-all duration-300 ${
                    tier.featured
                      ? "btn-primary text-bg-primary"
                      : "btn-ghost"
                  }`}
                >
                  {tier.cta}
                  <ArrowRight size={14} />
                </Link>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </div>
  );
}
