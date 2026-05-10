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

  const rotateX = useTransform(y, [-0.5, 0.5], [12, -12]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-12, 12]);
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
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.5, ease: "easeOut" }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: "800px",
        position: "relative",
        background: "#141414",
        border: "1px solid rgba(255,255,255,0.06)",
        borderTop: "1px solid rgba(255,255,255,0.10)",
        borderRadius: "2px",
        padding: "20px 24px",
        width: "220px",
        cursor: "default",
        willChange: "transform",
      }}
    >
      {/* Reflexo de luz que segue o mouse dentro do card */}
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "2px",
          background: useTransform(
            [glowX, glowY],
            ([gx, gy]) =>
              `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,90,26,0.10) 0%, transparent 60%)`
          ),
          pointerEvents: "none",
        }}
      />

      {/* Cantos decorativos — elevados no z */}
      <span
        style={{
          position: "absolute",
          top: "-1px",
          left: "-1px",
          width: "10px",
          height: "10px",
          borderTop: "2px solid rgba(255,90,26,0.5)",
          borderLeft: "2px solid rgba(255,90,26,0.5)",
          transform: "translateZ(4px)",
        }}
      />
      <span
        style={{
          position: "absolute",
          bottom: "-1px",
          right: "-1px",
          width: "10px",
          height: "10px",
          borderBottom: "2px solid rgba(255,90,26,0.5)",
          borderRight: "2px solid rgba(255,90,26,0.5)",
          transform: "translateZ(4px)",
        }}
      />

      {/* Conteúdo elevado na frente */}
      <div style={{ transform: "translateZ(12px)" }}>
        <p
          style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: "10px",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "rgba(245,241,236,0.30)",
            marginBottom: "8px",
          }}
        >
          {label}
        </p>
        <p
          style={{
            fontFamily: "Sora, sans-serif",
            fontSize: "28px",
            fontWeight: 700,
            color: "#FF5A1A",
            lineHeight: 1,
            marginBottom: "4px",
          }}
        >
          {value}
        </p>
        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 300,
            fontSize: "13px",
            color: "rgba(245,241,236,0.45)",
          }}
        >
          {sub}
        </p>
      </div>
    </motion.div>
  );
}

/* ──────────────── HERO ──────────────── */
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-visible pt-20 section-padding">
      {/* Camada 0: Estático glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "10%",
          right: "5%",
          width: "700px",
          height: "500px",
          background:
            "radial-gradient(ellipse at center, rgba(255,90,26,0.09) 0%, transparent 65%)",
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />

      {/* Grid container */}
      <div className="relative w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center overflow-visible">
        {/* Left column */}
        <div className="flex flex-col gap-6 overflow-visible">
          {/* Label */}
          <div className="overflow-visible">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              <SectionLabel text="AGÊNCIA DE CRIAÇÃO DIGITAL // PREMIUM" />
            </motion.div>
          </div>

          {/* H1 */}
          <div className="overflow-visible">
            <h1
              className="font-sora font-bold text-text-primary leading-[1.02] tracking-[-0.03em] overflow-visible"
              style={{
                fontSize: "clamp(40px, 6vw, 76px)",
                paddingBottom: "0.12em",
              }}
            >
              <motion.span
                initial={{ opacity: 0, y: 40, clipPath: "inset(100% 0 0 0)" }}
                animate={{ opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)" }}
                transition={{
                  delay: 0.6,
                  duration: 0.8,
                  type: "spring" as const,
                  damping: 20,
                  stiffness: 100,
                }}
                className="block overflow-visible"
              >
                Seu próximo site deveria ser uma declaração.
              </motion.span>
            </h1>
          </div>

          {/* Body + CTAs */}
          <div className="flex flex-col gap-8 overflow-visible">
            <motion.p
              initial={{ opacity: 0, filter: "blur(8px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="font-inter font-light text-body text-text-secondary max-w-[480px]"
            >
              Criamos websites, aplicações e sistemas que combinam design de alto
              impacto, segurança em profundidade e SEO que realmente posiciona.
            </motion.p>

            <motion.div
              className="flex items-center gap-4 flex-wrap"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 1.1,
                type: "spring" as const,
                stiffness: 100,
                damping: 15,
              }}
            >
              <Link
                href="/contato"
                className="btn-primary inline-flex items-center gap-2 px-6 py-3.5 text-bg-primary font-inter font-medium text-cta group"
              >
                Iniciar projeto
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
              <Link
                href="/cases"
                className="btn-ghost inline-flex items-center gap-2 px-6 py-3.5 font-inter font-medium text-cta"
              >
                Ver cases
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Right column: Metric cards — with independent 3D tilt */}
        <div
          className="flex flex-col gap-3 lg:items-end overflow-visible"
          style={{ perspective: "1000px" }}
        >
          <MetricCard
            label="LIGHTHOUSE"
            value="90+"
            sub="Score garantido"
            delay={1.3}
          />
          <MetricCard
            label="CORE WEB VITALS"
            value="✓"
            sub="Aprovado"
            delay={1.45}
          />
          <MetricCard
            label="SECURITY GRADE"
            value="A+"
            sub="SSL + Headers"
            delay={1.6}
          />
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <SectionLabel text="O PROBLEMA" />
            <AnimatedText
              text="A maioria dos sites são caros e lentos."
              tag="h2"
              className="font-sora font-bold text-section text-text-primary mb-6"
            />
            <ScrollReveal delay={0.2}>
              <p className="font-inter font-light text-body text-text-secondary">
                Agências cobram premium e entregam WordPress lento, sem SEO real,
                sem segurança e sem estratégia. Nós fazemos diferente — e você pode
                medir isso.
              </p>
            </ScrollReveal>
          </div>

          <div className="flex flex-col gap-6">
            {/* Bad card */}
            <ScrollReveal direction="right" delay={0.1}>
              <div
                className="tech-card bg-[rgba(255,60,60,0.04)] p-6"
                style={{
                  borderColor: "rgba(255,60,60,0.25)",
                  borderTopColor: "rgba(255,60,60,0.35)",
                }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-[rgba(255,60,60,0.6)]" />
                  <span className="font-mono text-label uppercase text-[rgba(255,60,60,0.6)] tracking-[0.12em]">
                    SITE COMUM
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm text-text-tertiary">
                      Lighthouse
                    </span>
                    <span className="font-sora font-bold text-[rgba(255,60,60,0.8)]">
                      48
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm text-text-tertiary">
                      Segurança
                    </span>
                    <span className="font-inter text-sm text-[rgba(255,60,60,0.8)]">
                      Sem SSL
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm text-text-tertiary">
                      SEO
                    </span>
                    <span className="font-inter text-sm text-[rgba(255,60,60,0.8)]">
                      Sem SEO
                    </span>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Good card */}
            <ScrollReveal direction="right" delay={0.3}>
              <div
                className="glow-card corner-decoration bg-bg-card p-6"
                style={{
                  borderColor: "rgba(255,90,26,0.3)",
                  borderTopColor: "rgba(255,90,26,0.5)",
                }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                  <span className="font-mono text-label uppercase text-accent tracking-[0.12em]">
                    SITE VIÉS
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm text-text-tertiary">
                      Lighthouse
                    </span>
                    <span className="font-sora font-bold text-accent">97</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm text-text-tertiary">
                      Segurança
                    </span>
                    <span className="font-inter text-sm text-accent">
                      A+ Security
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm text-text-tertiary">
                      SEO
                    </span>
                    <span className="font-inter text-sm text-accent">
                      SEO Técnico
                    </span>
                  </div>
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
      tags: ["Next.js", "CMS Headless", "Core Web Vitals", "SEO"],
    },
    {
      icon: Monitor,
      title: "Apps & Dashboards",
      desc: "Plataformas SaaS, painéis de dados e sistemas internos com autenticação robusta e escalabilidade.",
      tags: ["React", "Supabase", "Auth", "API REST"],
    },
    {
      icon: Settings,
      title: "Sistemas & Automações",
      desc: "Integrações, automações e sistemas sob medida para o que seu negócio precisa rodar.",
      tags: ["Webhooks", "n8n", "APIs", "Automação"],
    },
  ];

  return (
    <section className="section-gap relative z-10 section-divider">
      <div className="max-w-7xl mx-auto section-padding">
        <SectionLabel text="SERVIÇOS" />
        <AnimatedText
          text="O que a Viés constrói para você."
          tag="h2"
          className="font-sora font-bold text-section text-text-primary mb-12"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <ScrollReveal key={service.title} delay={i * 0.15}>
              <GlowCard className="group h-full">
                <service.icon
                  size={32}
                  className="text-accent mb-6"
                  strokeWidth={1.5}
                />
                <h3 className="font-sora font-bold text-card-title text-text-primary mb-3">
                  {service.title}
                </h3>
                <p className="font-inter font-light text-sm text-text-secondary mb-6 leading-relaxed">
                  {service.desc}
                </p>
                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-accent-muted text-accent font-mono text-[10px] uppercase tracking-wider"
                      style={{ borderRadius: "2px" }}
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

/* ──────────────── PROCESSO — SCROLL-DRIVEN TIMELINE ──────────────── */
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
    <section className="w-full relative py-12 section-padding overflow-visible">
      <div className="mb-12 md:mb-20">
        <SectionLabel text="PROCESSO" />
        <h2
          className="font-sora font-bold text-text-primary"
          style={{
            fontSize: "clamp(32px, 5vw, 52px)",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
          }}
        >
          Do briefing ao resultado.
        </h2>
      </div>

      {/* Timeline */}
      <div className="relative w-full max-w-6xl mx-auto">
        {/* Track base */}
        <div
          className="absolute hidden md:block"
          style={{
            top: "8px",
            left: "0",
            right: "0",
            height: "1px",
            background: "rgba(255,255,255,0.06)",
          }}
        />

        {/* Animated progress line */}
        <motion.div
          className="absolute hidden md:block"
          style={{
            top: "8px",
            left: "0",
            right: "0",
            height: "1px",
            background: "linear-gradient(90deg, #FF5A1A, rgba(255,90,26,0.6))",
            scaleX: lineScaleX,
            transformOrigin: "left center",
            boxShadow: "0 0 8px rgba(255,90,26,0.5)",
          }}
        />

        {/* Steps Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
            gap: "8px",
            width: "100%",
            maxWidth: "100%",
          }}
        >
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              animate={{ opacity: i <= activeStep ? 1 : 0.25 }}
              transition={{ duration: 0.3 }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                padding: "0 4px",
                minWidth: 0,
              }}
            >
              {/* Ponto */}
              <motion.div
                animate={{
                  background: i <= activeStep ? "#FF5A1A" : "rgba(255,255,255,0.15)",
                  boxShadow:
                    i <= activeStep
                      ? "0 0 0 4px rgba(255,90,26,0.15), 0 0 12px rgba(255,90,26,0.4)"
                      : "none",
                  scale: i <= activeStep ? 1.2 : 1,
                }}
                transition={{ duration: 0.3 }}
                style={{
                  width: "16px",
                  height: "16px",
                  borderRadius: "50%",
                  marginBottom: "12px",
                  flexShrink: 0,
                }}
              />

              {/* Número */}
              <span
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: "10px",
                  letterSpacing: "0.10em",
                  color: i <= activeStep ? "#FF5A1A" : "rgba(245,241,236,0.25)",
                  marginBottom: "6px",
                  transition: "color 0.3s",
                }}
              >
                {step.num}
              </span>

              {/* Título */}
              <span
                style={{
                  fontFamily: "Sora, sans-serif",
                  fontSize: "clamp(12px, 1.5vw, 16px)",
                  fontWeight: 600,
                  color: i <= activeStep ? "#F5F1EC" : "rgba(245,241,236,0.25)",
                  marginBottom: "4px",
                  transition: "color 0.3s",
                  whiteSpace: "nowrap",
                }}
              >
                {step.title}
              </span>

              {/* Descrição */}
              <span
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 300,
                  fontSize: "clamp(10px, 1vw, 13px)",
                  color: i <= activeStep
                    ? "rgba(245,241,236,0.55)"
                    : "rgba(245,241,236,0.15)",
                  lineHeight: 1.5,
                  transition: "color 0.3s",
                  wordBreak: "break-word",
                  minWidth: 0,
                }}
              >
                {step.desc}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────── CASES PREVIEW ──────────────── */
function CasesSection() {
  const cases = [
    {
      title: "Vies Experience",
      category: "Plataforma EAD",
      type: "App",
      year: "2024",
    },
    {
      title: "TSB Parts",
      category: "E-commerce de autopeças",
      type: "Site",
      year: "2024",
    },
  ];

  return (
    <section className="section-gap relative z-10 section-divider">
      <div className="max-w-7xl mx-auto section-padding">
        <SectionLabel text="CASES" />
        <AnimatedText
          text="Projetos que falam por si."
          tag="h2"
          className="font-sora font-bold text-section text-text-primary mb-12"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cases.map((caseItem, i) => (
            <ScrollReveal key={caseItem.title} delay={i * 0.15}>
              <Link
                href={`/cases/${caseItem.title.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <div className="group relative overflow-hidden tech-card bg-bg-card aspect-[16/10]">
                  {/* Placeholder background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-bg-secondary to-bg-card">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,90,26,0.08),transparent_60%)]" />
                  </div>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-bg-primary/60 group-hover:bg-bg-primary/30 transition-all duration-500" />

                  {/* Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-mono text-label uppercase text-accent tracking-[0.12em]">
                        {caseItem.type}
                      </span>
                      <span className="font-mono text-label uppercase text-text-tertiary tracking-[0.12em]">
                        {caseItem.year}
                      </span>
                    </div>
                    <h3 className="font-sora font-bold text-2xl text-text-primary">
                      {caseItem.title}
                    </h3>
                    <p className="font-inter text-sm text-text-secondary mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      {caseItem.category}
                    </p>
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
    <section className="section-gap relative z-10 overflow-hidden section-divider">
      {/* Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 600px 400px at 50% 50%, rgba(255,90,26,0.12) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-3xl mx-auto section-padding text-center relative z-10">
        <AnimatedText
          text="Pronto para criar algo que realmente funciona?"
          tag="h2"
          className="font-sora font-bold text-[32px] md:text-section text-text-primary mb-6"
        />
        <ScrollReveal>
          <p className="font-inter font-light text-body text-text-secondary mb-10">
            Briefing gratuito. Sem compromisso. Só resultados.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <Link
            href="/contato"
            className="btn-primary inline-flex items-center gap-2 px-8 py-4 text-bg-primary font-inter font-medium text-cta group"
          >
            Agendar conversa
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ──────────────── HOME PAGE ──────────────── */
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

      {/* Wrapper sticky — altura define quanto tempo a tela fica "presa" */}
      <div ref={processRef} style={{ height: "300vh", position: "relative" }}>
        <div
          style={{
            position: "sticky",
            top: "0",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          <ProcessSection scrollProgress={processProgress} />
        </div>
      </div>

      <CasesSection />
      <CTASection />
    </>
  );
}
