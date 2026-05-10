"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FileCheck, ThumbsUp, RefreshCw, PackageCheck, Check } from "lucide-react";
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
      "Reunião de alinhamento",
      "Análise de concorrentes",
      "Definição de personas",
      "Benchmark visual",
      "Documento de escopo",
    ],
  },
  {
    num: "02",
    title: "Proposta & Escopo",
    desc: "Com base no briefing, definimos escopo fixo, cronograma, entregáveis e investimento. Sem surpresas.",
    activities: [
      "Proposta detalhada",
      "Cronograma por fases",
      "Lista de entregáveis",
      "Termos e condições",
      "Aprovação formal",
    ],
  },
  {
    num: "03",
    title: "Design & Prototipação",
    desc: "Criamos o design completo em alta fidelidade. Você aprova cada tela antes do desenvolvimento.",
    activities: [
      "Wireframes",
      "UI Design em alta fidelidade",
      "Protótipo interativo",
      "Design system",
      "Rodada de revisões",
    ],
  },
  {
    num: "04",
    title: "Desenvolvimento",
    desc: "Código limpo, performático e seguro com as melhores tecnologias do mercado.",
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
    desc: "Deploy em produção, configuração de analytics, SEO final e treinamento.",
    activities: [
      "Deploy em produção",
      "Configuração de analytics",
      "SEO técnico final",
      "Documentação completa",
      "Treinamento de uso",
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
    desc: "Documentação e treinamento inclusos.",
  },
];

export default function ProcessoPage() {
  const timelineRef = useRef(null);
  const timelineInView = useInView(timelineRef, { once: true, margin: "-50px" });

  return (
    <div className="pt-24 md:pt-32 pb-20">
      {/* Hero */}
      <section className="max-w-7xl mx-auto section-padding mb-20 lg:mb-32">
        <SectionLabel text="COMO TRABALHAMOS" />
        <AnimatedText
          text="Como transformamos um briefing em resultado."
          tag="h1"
          className="font-sora font-extrabold text-hero text-text-primary mb-6 md:mb-8"
        />
        <ScrollReveal>
          <p className="font-inter font-light text-body text-text-secondary max-w-2xl leading-relaxed">
            Um processo claro, previsível e transparente. Cada fase tem entregáveis
            definidos e sua aprovação antes de avançar.
          </p>
        </ScrollReveal>
      </section>

      {/* Timeline */}
      <section className="max-w-4xl mx-auto section-padding mb-32 overflow-visible" ref={timelineRef}>
        <div className="relative pl-8 md:pl-16">
          {/* Main vertical line */}
          <div className="absolute left-0 md:left-4 top-0 bottom-0 w-[1px] bg-white/[0.05]">
            <motion.div
              className="w-full bg-accent origin-top"
              initial={{ scaleY: 0 }}
              animate={timelineInView ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              style={{ height: "100%" }}
            />
          </div>

          <div className="space-y-16 lg:space-y-24">
            {steps.map((step, i) => (
              <div key={step.num} className="relative group">
                {/* Milestone dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className="absolute -left-8 md:-left-12 top-2 w-4 h-4 rounded-full bg-bg-primary border-2 border-accent z-10"
                />
                
                <ScrollReveal delay={0.1} direction="left">
                  <div className="flex flex-col md:flex-row gap-6 md:gap-12">
                    <div className="flex-shrink-0">
                      <span className="font-mono text-[10px] md:text-xs text-accent uppercase tracking-widest block mb-1">
                        PASSO {step.num}
                      </span>
                      <h3 className="font-sora font-bold text-2xl md:text-3xl text-text-primary">
                        {step.title}
                      </h3>
                    </div>
                    
                    <div className="max-w-xl">
                      <p className="font-inter font-light text-sm md:text-body text-text-secondary mb-6 leading-relaxed">
                        {step.desc}
                      </p>
                      
                      <div className="bg-white/[0.02] border border-white/[0.05] p-5 md:p-6 rounded-[1px]">
                        <h4 className="font-mono text-[9px] text-text-tertiary uppercase tracking-widest mb-4">ENTREGÁVEIS / ATIVIDADES</h4>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
                          {step.activities.map((activity) => (
                            <li key={activity} className="flex items-center gap-2 text-xs md:text-sm text-text-secondary">
                              <Check size={12} className="text-accent flex-shrink-0" />
                              <span className="font-inter">{activity}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantees */}
      <section className="max-w-7xl mx-auto section-padding mb-16 lg:mb-32">
        <SectionLabel text="SEM SURPRESAS" />
        <AnimatedText
          text="Garantias do nosso processo."
          tag="h2"
          className="font-sora font-bold text-section text-text-primary mb-10 lg:mb-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {guarantees.map((item, i) => (
            <ScrollReveal key={item.title} delay={i * 0.1}>
              <GlowCard className="h-full !p-6 md:!p-8">
                <item.icon size={24} className="text-accent mb-4 md:mb-5" strokeWidth={1.5} />
                <h3 className="font-sora font-bold text-lg md:text-card-title text-text-primary mb-2 md:mb-3">
                  {item.title}
                </h3>
                <p className="font-inter font-light text-sm text-text-secondary leading-relaxed">
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
