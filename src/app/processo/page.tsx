"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FileCheck, ThumbsUp, RefreshCw, PackageCheck } from "lucide-react";
import SectionLabel from "@/components/SectionLabel";
import AnimatedText from "@/components/AnimatedText";
import ScrollReveal from "@/components/ScrollReveal";
import GlowCard from "@/components/GlowCard";

const steps = [
  {
    num: "01",
    title: "Briefing & Discovery",
    desc: "Entendemos profundamente o seu negócio, público-alvo, concorrentes e objetivos. Esse é o fundamento de tudo.",
    activities: [
      "Reunião de alinhamento (60 min)",
      "Análise de concorrentes",
      "Definição de personas",
      "Benchmark visual e funcional",
      "Documento de escopo",
    ],
  },
  {
    num: "02",
    title: "Proposta & Escopo",
    desc: "Com base no briefing, definimos escopo fixo, cronograma, entregáveis e investimento. Tudo documentado, sem surpresas.",
    activities: [
      "Proposta comercial detalhada",
      "Cronograma por fases",
      "Lista de entregáveis",
      "Termos e condições",
      "Aprovação formal",
    ],
  },
  {
    num: "03",
    title: "Design & Prototipação",
    desc: "Criamos o design completo em alta fidelidade. Você aprova cada tela antes de uma linha de código ser escrita.",
    activities: [
      "Wireframes de baixa fidelidade",
      "UI Design em alta fidelidade",
      "Protótipo interativo",
      "Design system documentado",
      "Rodada de revisões",
    ],
  },
  {
    num: "04",
    title: "Desenvolvimento",
    desc: "Código limpo, performático e seguro. TypeScript strict, testes, CI/CD e deploy automatizado desde o dia um.",
    activities: [
      "Setup de projeto e CI/CD",
      "Desenvolvimento frontend",
      "Integração com CMS/APIs",
      "Testes e QA",
      "Otimização de performance",
    ],
  },
  {
    num: "05",
    title: "Launch & Handoff",
    desc: "Deploy em produção, configuração de analytics, SEO final e handoff completo com documentação e treinamento.",
    activities: [
      "Deploy em produção",
      "Configuração de analytics",
      "SEO técnico final",
      "Documentação completa",
      "Treinamento de uso do CMS",
    ],
  },
];

const guarantees = [
  {
    icon: FileCheck,
    title: "Escopo Fixo",
    desc: "Definido antes de começar, sem custos ocultos.",
  },
  {
    icon: ThumbsUp,
    title: "Aprovações por Fase",
    desc: "Você aprova cada etapa antes de avançar.",
  },
  {
    icon: RefreshCw,
    title: "Revisões Inclusas",
    desc: "Rodadas de revisão no contrato.",
  },
  {
    icon: PackageCheck,
    title: "Full Handoff",
    desc: "Documentação, credenciais e treinamento inclusos.",
  },
];

export default function ProcessoPage() {
  const timelineRef = useRef(null);
  const timelineInView = useInView(timelineRef, { once: true, margin: "-100px" });

  return (
    <div className="pt-32 pb-20 overflow-visible">
      {/* Hero */}
      <section className="max-w-7xl mx-auto section-padding mb-24 overflow-visible">
        <SectionLabel text="COMO TRABALHAMOS" />
        <div className="overflow-visible pb-2">
          <AnimatedText
            text="Como transformamos um briefing em resultado."
            tag="h1"
            className="font-sora font-extrabold text-[40px] md:text-[56px] lg:text-hero leading-[1.0] tracking-[-0.03em] text-text-primary mb-6 overflow-visible"
          />
        </div>
        <ScrollReveal>
          <p className="font-inter font-light text-body text-text-secondary max-w-2xl">
            Um processo claro, previsível e transparente. Cada fase tem entregáveis
            definidos e sua aprovação antes de avançar.
          </p>
        </ScrollReveal>
      </section>

      {/* Timeline */}
      <section className="max-w-4xl mx-auto section-padding mb-32 overflow-visible" ref={timelineRef}>
        <div style={{ position: "relative", paddingLeft: "60px" }} className="overflow-visible">
          {/* Linha vertical — posicionada no centro do círculo */}
          <div
            style={{
              position: "absolute",
              left: "28px", /* metade da largura do círculo (56px / 2 = 28px) ajustado ao offset */
              top: "0",
              bottom: "0",
              width: "1px",
              background: "rgba(255,90,26,0.20)",
            }}
          >
            <motion.div
              className="w-full bg-accent origin-top"
              initial={{ scaleY: 0 }}
              animate={timelineInView ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ duration: 2, ease: "easeOut" }}
              style={{ height: "100%" }}
            />
          </div>

          <div className="overflow-visible">
            {steps.map((step, i) => (
              <ScrollReveal key={step.num} delay={i * 0.15} direction="left">
                <div
                  style={{
                    position: "relative",
                    display: "flex",
                    gap: "32px",
                    marginBottom: "64px",
                    alignItems: "flex-start",
                  }}
                  className="overflow-visible"
                >
                  {/* Número + círculo — container com largura fixa */}
                  <div
                    style={{
                      position: "absolute",
                      left: "-60px", /* puxa para fora do paddingLeft */
                      top: "0",
                      width: "56px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "4px",
                      flexShrink: 0,
                    }}
                  >
                    {/* Número watermark */}
                    <span
                      style={{
                        fontFamily: "JetBrains Mono, monospace",
                        fontSize: "11px",
                        color: "rgba(255,90,26,0.50)",
                        letterSpacing: "0.08em",
                      }}
                    >
                      {step.num}
                    </span>

                    {/* Círculo — centralizado no eixo da linha */}
                    <div
                      style={{
                        width: "12px",
                        height: "12px",
                        borderRadius: "50%",
                        background: "#FF5A1A",
                        boxShadow:
                          "0 0 0 4px rgba(255,90,26,0.12), 0 0 12px rgba(255,90,26,0.3)",
                        flexShrink: 0,
                      }}
                    />
                  </div>

                  {/* Conteúdo do step */}
                  <div>
                    <h3 className="font-sora font-bold text-[24px] text-text-primary mb-3">
                      {step.title}
                    </h3>
                    <p className="font-inter font-light text-body text-text-secondary mb-4">
                      {step.desc}
                    </p>
                    <ul className="space-y-2">
                      {step.activities.map((activity) => (
                        <li
                          key={activity}
                          className="flex items-center gap-2 text-sm text-text-secondary"
                        >
                          <div className="w-1 h-1 rounded-full bg-accent flex-shrink-0" />
                          <span className="font-inter">{activity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantees */}
      <section className="max-w-7xl mx-auto section-padding">
        <SectionLabel text="SEM SURPRESAS" />
        <AnimatedText
          text="Garantias do nosso processo."
          tag="h2"
          className="font-sora font-bold text-section text-text-primary mb-12"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {guarantees.map((item, i) => (
            <ScrollReveal key={item.title} delay={i * 0.1}>
              <GlowCard className="h-full">
                <item.icon
                  size={28}
                  className="text-accent mb-4"
                  strokeWidth={1.5}
                />
                <h3 className="font-sora font-bold text-card-title text-text-primary mb-2">
                  {item.title}
                </h3>
                <p className="font-inter font-light text-sm text-text-secondary">
                  {item.desc}
                </p>
              </GlowCard>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </div>
  );
}
