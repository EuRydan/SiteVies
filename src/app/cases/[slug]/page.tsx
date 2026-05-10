"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import SectionLabel from "@/components/SectionLabel";
import ScrollReveal from "@/components/ScrollReveal";

const casesData: Record<
  string,
  {
    title: string;
    category: string;
    type: string;
    year: string;
    desc: string;
    stack: string[];
    prazo: string;
    results: { label: string; value: string }[];
    fullDesc: string;
  }
> = {
  "vies-experience": {
    title: "Vies Experience",
    category: "Plataforma EAD",
    type: "App",
    year: "2024",
    desc: "Plataforma de ensino à distância completa com streaming, progresso de alunos e gestão.",
    stack: ["Next.js", "React", "Supabase", "Vercel", "Tailwind CSS"],
    prazo: "8 semanas",
    results: [
      { label: "Alunos ativos", value: "1.200+" },
      { label: "Uptime", value: "99.9%" },
      { label: "Lighthouse", value: "94" },
    ],
    fullDesc:
      "Desenvolvemos uma plataforma EAD completa para a Vies Experience, com streaming de vídeo otimizado, sistema de progresso de alunos, quiz interativos, certificados automáticos e painel administrativo completo. A plataforma foi construída com Next.js e Supabase, garantindo escalabilidade e performance.",
  },
  "tsb-parts": {
    title: "TSB Parts",
    category: "E-commerce de autopeças",
    type: "Site",
    year: "2024",
    desc: "E-commerce de alta performance para venda de autopeças com catálogo extenso.",
    stack: ["Next.js", "Sanity CMS", "Stripe", "Vercel", "PostgreSQL"],
    prazo: "6 semanas",
    results: [
      { label: "Produtos", value: "5.000+" },
      { label: "Conversão", value: "+40%" },
      { label: "Lighthouse", value: "92" },
    ],
    fullDesc:
      "Criamos um e-commerce robusto e performático para a TSB Parts, com catálogo de mais de 5.000 autopeças, busca inteligente, filtros avançados, checkout otimizado e integração com sistemas de logística. O resultado foi um aumento de 40% na taxa de conversão comparado ao site anterior.",
  },
  "gigantes-nazare-rio-2023": {
    title: "Gigantes de Nazaré Rio 2023",
    category: "Identidade visual completa",
    type: "Branding",
    year: "2023",
    desc: "Identidade visual e material digital para o evento de surf de ondas grandes.",
    stack: ["Figma", "After Effects", "Illustrator", "Photoshop"],
    prazo: "3 semanas",
    results: [
      { label: "Peças criadas", value: "50+" },
      { label: "Alcance", value: "2M+" },
      { label: "Engajamento", value: "+65%" },
    ],
    fullDesc:
      "Desenvolvemos toda a identidade visual do evento Gigantes de Nazaré Rio 2023, incluindo logo, tipografia, paleta de cores, material impresso, social media kit, apresentações e material digital. O projeto capturou a essência do surf de ondas grandes com uma estética moderna e impactante.",
  },
  "lic-mtr7-adriano-imperador": {
    title: "LIC/MTR7 — Adriano Imperador",
    category: "Identidade aplicada",
    type: "Evento",
    year: "2023",
    desc: "Identidade visual e aplicações para evento com Adriano Imperador.",
    stack: ["Figma", "Illustrator", "InDesign", "After Effects"],
    prazo: "2 semanas",
    results: [
      { label: "Convidados", value: "500+" },
      { label: "Satisfação", value: "98%" },
      { label: "Materiais", value: "30+" },
    ],
    fullDesc:
      "Criamos a identidade visual completa e todas as aplicações para o evento exclusivo com Adriano Imperador, em parceria com LIC e MTR7. Do convite à sinalização do espaço, cada peça foi pensada para transmitir exclusividade e sofisticação.",
  },
};

function CountUp({ target, suffix = "" }: { target: string; suffix?: string }) {
  const [count, setCount] = useState("0");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    const numericPart = target.replace(/[^0-9.]/g, "");
    const num = parseFloat(numericPart);
    if (isNaN(num)) {
      setCount(target);
      return;
    }

    const nonNumericSuffix = target.replace(/[0-9.]/g, "");
    const duration = 1500;
    const steps = 40;
    const increment = num / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(num, increment * step);
      setCount(
        (num >= 100 ? Math.round(current) : current.toFixed(1)) + nonNumericSuffix
      );
      if (step >= steps) {
        clearInterval(timer);
        setCount(target);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref} className="font-sora font-bold text-[40px] md:text-[56px] text-accent leading-none">
      {count}
      {suffix}
    </span>
  );
}

export default function CaseDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const caseData = casesData[params.slug];

  if (!caseData) {
    return (
      <div className="pt-32 pb-20 text-center">
        <div className="max-w-7xl mx-auto section-padding">
          <h1 className="font-sora font-bold text-section text-text-primary mb-4">
            Case não encontrado
          </h1>
          <Link
            href="/cases"
            className="inline-flex items-center gap-2 text-accent font-inter"
          >
            <ArrowLeft size={16} />
            Voltar para cases
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20">
      {/* Hero */}
      <section className="relative overflow-hidden mb-16">
        <div className="absolute inset-0 bg-gradient-to-b from-bg-secondary to-bg-primary">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_800px_400px_at_50%_30%,rgba(255,90,26,0.1),transparent_70%)]" />
        </div>
        <div className="relative max-w-7xl mx-auto section-padding py-20 md:py-32">
          <Link
            href="/cases"
            className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors mb-8 font-inter text-sm"
          >
            <ArrowLeft size={16} />
            Todos os cases
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-label uppercase text-accent tracking-[0.12em]">
              {caseData.type}
            </span>
            <span className="w-1 h-1 rounded-full bg-text-tertiary" />
            <span className="font-mono text-label uppercase text-text-tertiary tracking-[0.12em]">
              {caseData.year}
            </span>
          </div>
          <h1 className="font-sora font-extrabold text-[40px] md:text-[56px] lg:text-hero leading-[1.0] tracking-[-0.03em] text-text-primary mb-4">
            {caseData.title}
          </h1>
          <p className="font-inter font-light text-lg text-text-secondary max-w-2xl">
            {caseData.category}
          </p>
        </div>
      </section>

      {/* Content Grid */}
      <section className="max-w-7xl mx-auto section-padding mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-7">
            <ScrollReveal>
              <SectionLabel text="SOBRE O PROJETO" />
              <p className="font-inter font-light text-body text-text-secondary leading-relaxed">
                {caseData.fullDesc}
              </p>
            </ScrollReveal>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-3">
            <ScrollReveal delay={0.2}>
              <div className="bg-bg-card tech-card corner-decoration p-6 space-y-6">
                <div>
                  <h4 className="font-mono text-label uppercase text-text-tertiary tracking-[0.12em] mb-3">
                    STACK
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {caseData.stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-accent-muted text-accent font-mono text-[10px] uppercase tracking-wider"
                        style={{ borderRadius: "2px" }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="border-t border-border-subtle pt-4">
                  <h4 className="font-mono text-label uppercase text-text-tertiary tracking-[0.12em] mb-2">
                    PRAZO
                  </h4>
                  <p className="font-inter text-sm text-text-primary">
                    {caseData.prazo}
                  </p>
                </div>
                <div className="border-t border-border-subtle pt-4">
                  <h4 className="font-mono text-label uppercase text-text-tertiary tracking-[0.12em] mb-2">
                    ANO
                  </h4>
                  <p className="font-inter text-sm text-text-primary">
                    {caseData.year}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="max-w-7xl mx-auto section-padding mb-20">
        <SectionLabel text="RESULTADOS" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {caseData.results.map((result, i) => (
            <ScrollReveal key={result.label} delay={i * 0.15}>
              <div className="text-center">
                <CountUp target={result.value} />
                <p className="font-mono text-label uppercase text-text-tertiary tracking-[0.12em] mt-3">
                  {result.label}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto section-padding text-center">
        <ScrollReveal>
          <h2 className="font-sora font-bold text-[28px] md:text-section text-text-primary mb-4">
            Quer um projeto similar?
          </h2>
          <p className="font-inter font-light text-body text-text-secondary mb-8">
            Vamos conversar sobre como podemos ajudar seu negócio.
          </p>
          <Link
            href="/contato"
            className="inline-flex items-center gap-2 px-8 py-4 btn-primary text-bg-primary font-inter font-medium text-cta group"
          >
            Iniciar um projeto similar
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </ScrollReveal>
      </section>
    </div>
  );
}
