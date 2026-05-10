"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
  useMotionValueEvent,
  MotionValue,
} from "framer-motion";
import Link from "next/link";
import { Layout, Monitor, Settings, ArrowRight } from "lucide-react";
import SectionLabel from "@/components/SectionLabel";
import GlowCard from "@/components/GlowCard";
import AnimatedText from "@/components/AnimatedText";
import ScrollReveal from "@/components/ScrollReveal";
import MarqueeTicker from "@/components/MarqueeTicker";

/* ──────────────── METRIC CARD — 3D TILT ──────────────── */
interface MetricCardProps {
  label: string;
  value: string;
  sub: string;
  delay: number;
}

function MetricCard({ label, value, sub, delay }: MetricCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const x = useSpring(rawX, { stiffness: 300, damping: 25, mass: 0.5 });
  const y = useSpring(rawY, { stiffness: 300, damping: 25, mass: 0.5 });

  const rotateX = useTransform(y, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-10, 10]);
  const glowX = useTransform(x, [-0.5, 0.5], [0, 100]);
  const glowY = useTransform(y, [-0.5, 0.5], [0, 100]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set((e.clientX - rect.left) / rect.width - 0.5);
    rawY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    rawX.set(0);
    rawY.set(0);
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.4 }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: "800px",
        position: "relative",
        background: "#0D0D0D",
        border: "1px solid rgba(255,255,255,0.04)",
        borderRadius: "1px",
        padding: "clamp(12px, 3vw, 20px)",
        width: "100%",
        maxWidth: "200px",
        cursor: "default",
      }}
      className="group"
    >
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: useTransform(
            [glowX, glowY],
            ([gx, gy]) => `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,90,26,0.06) 0%, transparent 60%)`
          ),
          pointerEvents: "none",
        }}
      />
      <div style={{ transform: "translateZ(10px)" }}>
        <p className="font-mono text-[9px] text-text-tertiary mb-1 uppercase tracking-widest">
          {label}
        </p>
        <p className="font-sora font-bold text-accent text-2xl md:text-3xl leading-none mb-1">
          {value}
        </p>
        <p className="font-inter font-light text-[11px] text-text-secondary">
          {sub}
        </p>
      </div>
    </motion.div>
  );
}

/* ──────────────── HERO ──────────────── */
function HeroSection() {
  return (
    <section className="relative min-h-[90vh] lg:min-h-screen flex items-center pt-24 lg:pt-20 section-padding overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute top-1/4 right-0 w-[500px] h-[500px] opacity-20 blur-[100px] pointer-events-none"
        style={{ background: "radial-gradient(circle, var(--accent), transparent 70%)" }}
      />

      <div className="relative w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <div className="lg:col-span-7 flex flex-col gap-6 md:gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <SectionLabel text="AGÊNCIA DE CRIAÇÃO DIGITAL // PREMIUM" />
          </motion.div>

          <h1 className="font-sora font-bold text-hero text-text-primary">
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="block"
            >
              Seu próximo site deveria ser uma declaração.
            </motion.span>
          </h1>

          <div className="flex flex-col gap-8 md:gap-10">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="font-inter font-light text-body text-text-secondary max-w-[540px]"
            >
              Criamos websites, aplicações e sistemas que combinam design de alto
              impacto, segurança em profundidade e SEO que realmente posiciona.
            </motion.p>

            <motion.div
              className="flex items-center gap-4 flex-wrap"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
            >
              <Link
                href="/contato"
                className="btn-primary inline-flex items-center gap-2 px-7 py-4 text-bg-primary font-inter font-medium text-cta group"
              >
                Iniciar projeto
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/cases"
                className="btn-ghost inline-flex items-center gap-2 px-7 py-4 font-inter font-medium text-cta"
              >
                Ver cases
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Metric Cards Grid - Fixed for mobile */}
        <div className="lg:col-span-5 grid grid-cols-2 lg:grid-cols-1 gap-3 md:gap-4 lg:justify-items-end">
          <div className="lg:contents">
            <MetricCard label="LIGHTHOUSE" value="90+" sub="Score garantido" delay={1.3} />
            <MetricCard label="CORE WEB VITALS" value="✓" sub="Aprovado" delay={1.45} />
          </div>
          <div className="col-span-2 lg:col-span-1 lg:w-full lg:flex lg:justify-end">
            <MetricCard label="SECURITY GRADE" value="A+" sub="SSL + Headers" delay={1.6} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────── PROBLEMA / PROPOSTA ──────────────── */
function ProblemSection() {
  return (
    <section className="section-gap relative z-10 section-divider">
      <div className="max-w-7xl mx-auto section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="max-w-xl">
            <SectionLabel text="O PROBLEMA" />
            <AnimatedText
              text="A maioria dos sites são caros e lentos."
              tag="h2"
              className="font-sora font-bold text-section text-text-primary mb-6 md:mb-8"
            />
            <ScrollReveal>
              <p className="font-inter font-light text-body text-text-secondary leading-relaxed">
                Agências cobram premium e entregam WordPress lento, sem SEO real,
                sem segurança e sem estratégia. Nós fazemos diferente.
              </p>
            </ScrollReveal>
          </div>

          <div className="flex flex-col gap-4 md:gap-6 w-full max-w-lg lg:ml-auto">
            <ScrollReveal direction="right" delay={0.1}>
              <div className="tech-card bg-[rgba(255,60,60,0.03)] p-6 md:p-8 border-[rgba(255,60,60,0.15)]">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-1.5 h-1.5 rounded-full bg-[rgba(255,60,60,0.5)]" />
                  <span className="font-mono text-label uppercase text-[rgba(255,60,60,0.5)]">
                    SITE COMUM
                  </span>
                </div>
                <div className="space-y-3">
                  {[
                    { l: "Lighthouse", v: "48", c: "text-[rgba(255,60,60,0.8)]" },
                    { l: "Segurança", v: "Sem SSL", c: "text-[rgba(255,60,60,0.8)]" },
                    { l: "SEO", v: "Básico", c: "text-[rgba(255,60,60,0.8)]" },
                  ].map((row) => (
                    <div key={row.l} className="flex justify-between items-center border-b border-white/[0.03] pb-2">
                      <span className="font-mono text-[10px] text-text-tertiary uppercase">{row.l}</span>
                      <span className={`font-sora font-bold ${row.c}`}>{row.v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.3}>
              <div className="glow-card corner-decoration bg-bg-card p-6 md:p-8 border-accent/20">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                  <span className="font-mono text-label uppercase text-accent">
                    SITE VIÉS
                  </span>
                </div>
                <div className="space-y-3">
                  {[
                    { l: "Lighthouse", v: "97+", c: "text-accent" },
                    { l: "Segurança", v: "A+ Security", c: "text-accent" },
                    { l: "SEO", v: "Técnico Real", c: "text-accent" },
                  ].map((row) => (
                    <div key={row.l} className="flex justify-between items-center border-b border-white/[0.05] pb-2">
                      <span className="font-mono text-[10px] text-text-tertiary uppercase">{row.l}</span>
                      <span className={`font-sora font-bold ${row.c}`}>{row.v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────── SERVIÇOS PREVIEW ──────────────── */
function ServicesSection() {
  const services = [
    {
      icon: Layout,
      title: "Sites & Landing Pages",
      desc: "Sites institucionais, landing pages e e-commerces com SEO técnico e design estratégico.",
      tags: ["Next.js", "Headless", "SEO"],
    },
    {
      icon: Monitor,
      title: "Apps & Dashboards",
      desc: "Plataformas SaaS, painéis de dados e sistemas internos com autenticação e escalabilidade.",
      tags: ["React", "Supabase", "Auth"],
    },
    {
      icon: Settings,
      title: "Sistemas & Automações",
      desc: "Integrações, automações e sistemas sob medida para o que seu negócio precisa rodar.",
      tags: ["Webhooks", "n8n", "APIs"],
    },
  ];

  return (
    <section className="section-gap relative z-10 section-divider">
      <div className="max-w-7xl mx-auto section-padding">
        <SectionLabel text="SERVIÇOS" />
        <AnimatedText
          text="O que a Viés constrói para você."
          tag="h2"
          className="font-sora font-bold text-section text-text-primary mb-10 md:12"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {services.map((service, i) => (
            <ScrollReveal key={service.title} delay={i * 0.1}>
              <GlowCard className="group h-full flex flex-col !p-6 md:!p-8">
                <service.icon size={28} className="text-accent mb-5" strokeWidth={1.5} />
                <h3 className="font-sora font-bold text-card-title text-text-primary mb-3">
                  {service.title}
                </h3>
                <p className="font-inter font-light text-sm text-text-secondary mb-8 leading-relaxed flex-grow">
                  {service.desc}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 bg-accent-muted text-accent font-mono text-[9px] uppercase tracking-wider"
                      style={{ borderRadius: "1px" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </GlowCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────── PROCESSO — RESPONSIVE TIMELINE ──────────────── */
interface ProcessSectionProps {
  scrollProgress: MotionValue<number>;
}

function ProcessSection({ scrollProgress }: ProcessSectionProps) {
  const [activeStep, setActiveStep] = useState(0);
  const lineScaleX = useTransform(scrollProgress, [0, 1], [0, 1]);

  useMotionValueEvent(scrollProgress, "change", (v) => {
    if (v < 0.15) setActiveStep(0);
    else if (v < 0.35) setActiveStep(1);
    else if (v < 0.55) setActiveStep(2);
    else if (v < 0.75) setActiveStep(3);
    else setActiveStep(4);
  });

  const steps = [
    { num: "01", title: "Briefing", desc: "Entendemos seu negócio" },
    { num: "02", title: "Proposta", desc: "Escopo e prazo definidos" },
    { num: "03", title: "Design", desc: "UI/UX de alto impacto" },
    { num: "04", title: "Código", desc: "Desenvolvimento robusto" },
    { num: "05", title: "Launch", desc: "Deploy e otimização" },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto section-padding py-8 md:py-0">
      <div className="mb-10 md:mb-16">
        <SectionLabel text="PROCESSO" />
        <h2 className="font-sora font-bold text-section text-text-primary">
          Do briefing ao resultado.
        </h2>
      </div>

      <div className="relative w-full max-w-6xl mx-auto">
        {/* Track base desktop */}
        <div className="absolute hidden md:block top-2 left-0 right-0 h-[1px] bg-white/[0.05]" />
        {/* Animated line desktop */}
        <motion.div
          className="absolute hidden md:block top-2 left-0 right-0 h-[1px] bg-accent origin-left"
          style={{ scaleX: lineScaleX }}
        />

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              animate={{ opacity: i <= activeStep ? 1 : 0.3 }}
              className="flex flex-row md:flex-col items-start md:items-center text-left md:text-center gap-5 md:gap-0"
            >
              <div className="flex flex-col items-center md:mb-4">
                <motion.div
                  animate={{
                    background: i <= activeStep ? "#FF5A1A" : "rgba(255,255,255,0.1)",
                    scale: i <= activeStep ? 1.2 : 1,
                  }}
                  className="w-3.5 h-3.5 rounded-full"
                />
                <div className="w-[1px] h-full md:hidden bg-white/5 mt-2 min-h-[30px]" />
              </div>

              <div className="flex flex-col md:items-center">
                <span className="font-mono text-[9px] text-accent mb-1.5">{step.num}</span>
                <h4 className="font-sora font-bold text-text-primary text-base md:text-lg mb-1 whitespace-nowrap">
                  {step.title}
                </h4>
                <p className="font-inter text-[11px] md:text-xs text-text-secondary leading-relaxed max-w-[150px]">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ──────────────── CASES PREVIEW ──────────────── */
function CasesSection() {
  const cases = [
    { title: "Vies Experience", category: "Plataforma EAD", type: "App" },
    { title: "TSB Parts", category: "E-commerce Peças", type: "Site" },
  ];

  return (
    <section className="section-gap relative z-10 section-divider">
      <div className="max-w-7xl mx-auto section-padding">
        <SectionLabel text="CASES" />
        <AnimatedText
          text="Projetos que falam por si."
          tag="h2"
          className="font-sora font-bold text-section text-text-primary mb-10 md:mb-12"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {cases.map((caseItem, i) => (
            <ScrollReveal key={caseItem.title} delay={i * 0.1}>
              <Link href={`/cases/${caseItem.title.toLowerCase().replace(/\s+/g, "-")}`}>
                <div className="group relative overflow-hidden tech-card aspect-[16/10]">
                  <div className="absolute inset-0 bg-bg-secondary group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-bg-primary/60" />
                  <div className="absolute bottom-0 p-6 md:p-8 w-full">
                    <span className="font-mono text-[10px] text-accent uppercase mb-2 block tracking-widest">{caseItem.type}</span>
                    <h3 className="font-sora font-bold text-xl md:text-2xl text-text-primary">{caseItem.title}</h3>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────── CTA FINAL ──────────────── */
function CTASection() {
  return (
    <section className="section-gap relative z-10 section-divider overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,90,26,0.08),transparent_70%)]" />
      <div className="max-w-3xl mx-auto section-padding text-center relative">
        <AnimatedText
          text="Pronto para criar algo que realmente funciona?"
          tag="h2"
          className="font-sora font-bold text-section text-text-primary mb-8 leading-tight"
        />
        <ScrollReveal>
          <Link
            href="/contato"
            className="btn-primary inline-flex items-center gap-2 px-8 py-4 text-bg-primary font-inter font-medium text-cta group"
          >
            Agendar conversa
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}

export default function HomePage() {
  const processRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: processProgress } = useScroll({
    target: processRef,
    offset: ["start start", "end end"],
  });

  return (
    <>
      <HeroSection />
      <MarqueeTicker />
      <ProblemSection />
      <ServicesSection />
      <div ref={processRef} style={{ height: "300vh", position: "relative" }}>
        <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
          <ProcessSection scrollProgress={processProgress} />
        </div>
      </div>
      <CasesSection />
      <CTASection />
    </>
  );
}
