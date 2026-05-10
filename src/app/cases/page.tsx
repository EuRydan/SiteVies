"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import SectionLabel from "@/components/SectionLabel";
import AnimatedText from "@/components/AnimatedText";
import ScrollReveal from "@/components/ScrollReveal";

const allCases = [
  {
    slug: "vies-experience",
    title: "Vies Experience",
    category: "Plataforma EAD",
    type: "App",
    year: "2024",
    desc: "Plataforma de ensino à distância com streaming de vídeo, progresso de alunos e painel administrativo completo.",
  },
  {
    slug: "tsb-parts",
    title: "TSB Parts",
    category: "E-commerce de autopeças",
    type: "Site",
    year: "2024",
    desc: "E-commerce de alta performance para venda de autopeças com catálogo de +5.000 produtos e checkout otimizado.",
  },
  {
    slug: "gigantes-nazare-rio-2023",
    title: "Gigantes de Nazaré Rio 2023",
    category: "Identidade visual completa",
    type: "Branding",
    year: "2023",
    desc: "Identidade visual e material digital para o evento Gigantes de Nazaré Rio 2023. Surf de ondas grandes.",
  },
  {
    slug: "lic-mtr7-adriano-imperador",
    title: "LIC/MTR7 — Adriano Imperador",
    category: "Identidade aplicada",
    type: "Evento",
    year: "2023",
    desc: "Identidade visual e aplicações para evento com Adriano Imperador em parceria com LIC e MTR7.",
  },
];

const filters = ["Todos", "Sites", "Apps", "Sistemas", "E-commerce", "Branding", "Evento"];

export default function CasesPage() {
  const [activeFilter, setActiveFilter] = useState("Todos");

  const filteredCases =
    activeFilter === "Todos"
      ? allCases
      : allCases.filter(
          (c) =>
            c.type.toLowerCase() === activeFilter.toLowerCase() ||
            c.category.toLowerCase().includes(activeFilter.toLowerCase())
        );

  return (
    <div className="pt-32 pb-20">
      {/* Hero */}
      <section className="max-w-7xl mx-auto section-padding mb-16">
        <SectionLabel text="NOSSO TRABALHO" />
        <AnimatedText
          text="Projetos que falam por si."
          tag="h1"
          className="font-sora font-extrabold text-[40px] md:text-[56px] lg:text-hero leading-[1.0] tracking-[-0.03em] text-text-primary mb-6"
        />
        <ScrollReveal>
          <p className="font-inter font-light text-body text-text-secondary max-w-2xl">
            Cada projeto é uma prova do nosso compromisso com qualidade, performance e
            resultado. Conheça alguns dos trabalhos que nos orgulhamos.
          </p>
        </ScrollReveal>
      </section>

      {/* Filters */}
      <section className="max-w-7xl mx-auto section-padding mb-12">
        <div className="flex flex-wrap gap-3">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 font-inter text-sm transition-all duration-300 ${
                activeFilter === filter
                  ? "btn-primary text-bg-primary"
                  : "btn-ghost text-text-secondary"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </section>

      {/* Cases Grid */}
      <section className="max-w-7xl mx-auto section-padding">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {filteredCases.map((caseItem, i) => (
              <ScrollReveal key={caseItem.slug} delay={i * 0.1}>
                <Link href={`/cases/${caseItem.slug}`}>
                  <div className="group relative overflow-hidden tech-card corner-decoration bg-bg-card aspect-[16/10] transition-all duration-500">
                    {/* Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-bg-secondary to-bg-card">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,90,26,0.08),transparent_60%)]" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="font-sora font-extrabold text-[80px] md:text-[120px] text-[rgba(255,255,255,0.02)] select-none leading-none">
                          {caseItem.title.charAt(0)}
                        </span>
                      </div>
                    </div>

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-bg-primary/60 group-hover:bg-bg-primary/20 transition-all duration-500" />

                    {/* Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-mono text-label uppercase text-accent tracking-[0.12em]">
                          {caseItem.type}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-text-tertiary" />
                        <span className="font-mono text-label uppercase text-text-tertiary tracking-[0.12em]">
                          {caseItem.year}
                        </span>
                      </div>
                      <h3 className="font-sora font-bold text-2xl md:text-3xl text-text-primary mb-1">
                        {caseItem.title}
                      </h3>
                      <p className="font-inter text-sm text-text-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-2 group-hover:translate-y-0">
                        {caseItem.category}
                      </p>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredCases.length === 0 && (
          <div className="text-center py-20">
            <p className="font-inter text-text-secondary">
              Nenhum case encontrado para este filtro.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
