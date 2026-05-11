"use client";

import { useRef, useState, useEffect } from "react";
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
import { ArrowRight, Zap, ShieldCheck, Gauge, LucideIcon, Code2, Cpu, Globe } from "lucide-react";
import SectionLabel from "@/components/SectionLabel";
import GlowCard from "@/components/GlowCard";
import AnimatedText from "@/components/AnimatedText";
import ScrollReveal from "@/components/ScrollReveal";
import MarqueeTicker from "@/components/MarqueeTicker";

/* ──────────────── MOUSE AURA DECORATION ──────────────── */
function MouseAura() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{ opacity: 0.4 }}
    >
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          background: "radial-gradient(circle, rgba(255,90,26,0.06) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
    </motion.div>
  );
}

/* ──────────────── GRID DECORATION BITS ──────────────── */
function GridBits() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20 z-0">
      <div className="absolute top-1/2 left-1/4 w-[1px] h-32 bg-gradient-to-b from-transparent via-white/5 to-transparent" />
      <div className="absolute top-1/4 right-1/3 w-32 h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      
      {/* Plus signs at intersections */}
      <div className="absolute top-[80px] left-[80px] w-2 h-2 text-white/10">+</div>
      <div className="absolute top-[80px] right-[80px] w-2 h-2 text-white/10">+</div>
      <div className="absolute bottom-[80px] left-[80px] w-2 h-2 text-white/10">+</div>
      <div className="absolute bottom-[80px] right-[80px] w-2 h-2 text-white/10">+</div>
    </div>
  );
}

/* ──────────────── METRIC CARD ──────────────── */
interface MetricCardProps {
  label: string;
  value: string;
  sub: string;
  delay: number;
  icon: LucideIcon;
}

function MetricCard({ label, value, sub, delay, icon: Icon }: MetricCardProps) {
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
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.5 }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: "1000px",
        position: "relative",
        background: "rgba(13, 13, 13, 0.7)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(255, 90, 26, 0.15)",
        borderTop: "1px solid rgba(255, 255, 255, 0.1)",
        borderRadius: "2px",
        padding: "clamp(16px, 3vw, 24px)",
        width: "100%",
        cursor: "default",
        boxShadow: "0 10px 30px -10px rgba(0,0,0,0.5)",
      }}
      className="group"
    >
      <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[1px] h-full bg-accent/30" />
        <div className="absolute top-0 right-0 h-[1px] w-full bg-accent/30" />
      </div>

      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{
          background: useTransform(
            [glowX, glowY],
            ([gx, gy]) => `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,90,26,0.12) 0%, transparent 70%)`
          ),
        }}
      />

      <div style={{ transform: "translateZ(30px)" }} className="relative">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-[1px] bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
            <Icon size={16} strokeWidth={2} />
          </div>
          <p className="font-mono text-[9px] md:text-[10px] text-text-tertiary uppercase tracking-[0.2em]">
            {label}
          </p>
        </div>

        <div className="flex flex-col gap-1">
          <p className="font-sora font-extrabold text-accent text-3xl md:text-4xl leading-none tracking-tight drop-shadow-[0_0_15px_rgba(255,90,26,0.2)]">
            {value}
          </p>
          <p className="font-inter font-medium text-[11px] md:text-xs text-text-secondary uppercase tracking-wider opacity-80">
            {sub}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* ──────────────── HERO ──────────────── */
function HeroSection() {
  return (
    <section className="relative min-h-[90vh] lg:min-h-screen flex items-center pt-24 lg:pt-20 section-padding overflow-hidden">
      <GridBits />
      
      {/* Background radial glow */}
      <div
        className="absolute top-1/4 right-0 w-[600px] h-[600px] opacity-15 blur-[120px] pointer-events-none"
        style={{ background: "radial-gradient(circle, var(--accent), transparent 70%)" }}
      />

      <div className="relative w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
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
              className="font-inter font-light text-body text-text-secondary max-w-[560px] leading-relaxed"
            >
              Criamos websites, aplicações e sistemas que combinam design de alto
              impacto, segurança em profundidade e SEO que realmente posiciona.
            </motion.p>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
            >
              <Link
                href="/contato"
                className="btn-primary w-full inline-flex items-center justify-center gap-2 px-7 py-4 text-bg-primary font-inter font-medium text-cta group"
              >
                Iniciar projeto
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/cases"
                className="btn-ghost w-full inline-flex items-center justify-center gap-2 px-7 py-4 font-inter font-medium text-cta"
              >
                Ver cases
              </Link>
            </motion.div>
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col gap-5 lg:items-end mb-16 lg:mb-0 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-5 w-full lg:max-w-[240px]">
            <MetricCard label="LIGHTHOUSE" value="90+" sub="Score garantido" icon={Gauge} delay={1.3} />
            <MetricCard label="CORE WEB VITALS" value="✓" sub="Aprovado" icon={Zap} delay={1.45} />
            <div className="sm:col-span-2 lg:col-span-1">
              <MetricCard label="SECURITY GRADE" value="A+" sub="SSL + Headers" icon={ShieldCheck} delay={1.6} />
            </div>
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
      icon: Globe,
      title: "Sites & Landing Pages",
      desc: "Sites institucionais e landing pages de alta conversão construídos com SEO técnico e performance impecável.",
      tags: ["Next.js", "Vercel", "SEO"],
    },
    {
      icon: Cpu,
      title: "Apps & Dashboards",
      desc: "Sistemas web complexos, painéis administrativos e plataformas SaaS sob medida para sua operação.",
      tags: ["React", "Supabase", "Dashboards"],
    },
    {
      icon: Code2,
      title: "Sistemas & APIs",
      desc: "Desenvolvimento de APIs robustas e integrações de sistemas para automatizar processos de negócio.",
      tags: ["Node.js", "Webhooks", "Integrations"],
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
              <GlowCard className="group h-full flex flex-col !p-6 md:!p-8 hover:bg-white/[0.02] transition-colors duration-500">
                <div className="w-12 h-12 rounded-full bg-accent/5 border border-accent/10 flex items-center justify-center text-accent mb-6 group-hover:scale-110 transition-transform duration-500">
                  <service.icon size={24} strokeWidth={1.5} />
                </div>
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
        <div className="absolute hidden md:block top-2 left-0 right-0 h-[1px] bg-white/[0.05]" />
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
                  <div className="absolute bottom-0 p-6 md:p-8 w-full z-10">
                    <span className="font-mono text-[10px] text-accent uppercase mb-2 block tracking-widest">{caseItem.type}</span>
                    <h3 className="font-sora font-bold text-xl md:text-2xl text-text-primary">{caseItem.title}</h3>
                  </div>
                  {/* Decorative glass overlay on hover */}
                  <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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
      <MouseAura />
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
