"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Mail, MapPin, Clock, ChevronDown } from "lucide-react";
import SectionLabel from "@/components/SectionLabel";
import AnimatedText from "@/components/AnimatedText";
import ScrollReveal from "@/components/ScrollReveal";

const contactSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  company: z.string().optional(),
  projectType: z.string().min(1, "Selecione um tipo de projeto"),
  budget: z.string().min(1, "Selecione um orçamento estimado"),
  message: z.string().min(10, "Mensagem deve ter pelo menos 10 caracteres"),
  honeypot: z.string(),
});

type ContactFormData = z.infer<typeof contactSchema>;

function FAQItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-border-subtle">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-4 text-left group"
      >
        <span className="font-inter font-medium text-sm text-text-primary group-hover:text-accent transition-colors">
          {question}
        </span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={16} className="text-text-tertiary" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="font-inter font-light text-sm text-text-secondary pb-4 leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ContatoPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      honeypot: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus("success");
        reset();
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 3000);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  const faqs = [
    {
      question: "Qual o prazo médio para um projeto?",
      answer:
        "Depende da complexidade. Landing pages podem ser entregues em 2 semanas, sites completos em 4-6 semanas, e apps ou sistemas sob consulta. Definimos prazos realistas e cumprimos.",
    },
    {
      question: "Vocês trabalham com contrato?",
      answer:
        "Sim, todos os projetos têm contrato formal com escopo, prazos, entregáveis e condições claras. Sem surpresas para nenhum lado.",
    },
    {
      question: "Posso acompanhar o progresso do projeto?",
      answer:
        "Absolutamente. Você recebe acesso ao ambiente de staging, aprovação por fase e updates regulares. Transparência é um dos nossos valores centrais.",
    },
  ];

  return (
    <div className="pt-32 pb-20">
      {/* Hero */}
      <section className="max-w-7xl mx-auto section-padding mb-16">
        <SectionLabel text="CONTATO" />
        <AnimatedText
          text="Vamos conversar."
          tag="h1"
          className="font-sora font-extrabold text-[40px] md:text-[56px] lg:text-hero leading-[1.0] tracking-[-0.03em] text-text-primary mb-6"
        />
      </section>

      {/* Content */}
      <section className="max-w-7xl mx-auto section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Form — 60% */}
          <div className="lg:col-span-3">
            <ScrollReveal>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Honeypot — invisível para humanos, bots preenchem automaticamente */}
                <input
                  type="text"
                  autoComplete="off"
                  tabIndex={-1}
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    left: "-9999px",
                    width: "1px",
                    height: "1px",
                    opacity: 0,
                    pointerEvents: "none",
                  }}
                  {...register("honeypot")}
                />
                {/* Name */}
                <div>
                  <label className="font-mono text-label uppercase text-text-tertiary tracking-[0.12em] mb-2 block">
                    Nome completo *
                  </label>
                  <input
                    type="text"
                    {...register("name")}
                    className={`form-input ${errors.name ? "error" : ""}`}
                    placeholder="Seu nome"
                  />
                  {errors.name && (
                    <p className="mt-1 text-[12px] text-[rgba(255,60,60,0.8)] font-inter">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="font-mono text-label uppercase text-text-tertiary tracking-[0.12em] mb-2 block">
                    Email *
                  </label>
                  <input
                    type="email"
                    {...register("email")}
                    className={`form-input ${errors.email ? "error" : ""}`}
                    placeholder="seu@email.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-[12px] text-[rgba(255,60,60,0.8)] font-inter">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Company */}
                <div>
                  <label className="font-mono text-label uppercase text-text-tertiary tracking-[0.12em] mb-2 block">
                    Empresa
                  </label>
                  <input
                    type="text"
                    {...register("company")}
                    className="form-input"
                    placeholder="Nome da empresa (opcional)"
                  />
                </div>

                {/* Project Type */}
                <div>
                  <label className="font-mono text-label uppercase text-text-tertiary tracking-[0.12em] mb-2 block">
                    Tipo de projeto *
                  </label>
                  <select
                    {...register("projectType")}
                    className={`form-input ${errors.projectType ? "error" : ""}`}
                  >
                    <option value="">Selecione</option>
                    <option value="site">Site</option>
                    <option value="app">App</option>
                    <option value="dashboard">Dashboard</option>
                    <option value="sistema">Sistema</option>
                    <option value="outro">Outro</option>
                  </select>
                  {errors.projectType && (
                    <p className="mt-1 text-[12px] text-[rgba(255,60,60,0.8)] font-inter">
                      {errors.projectType.message}
                    </p>
                  )}
                </div>

                {/* Budget */}
                <div>
                  <label className="font-mono text-label uppercase text-text-tertiary tracking-[0.12em] mb-2 block">
                    Orçamento estimado *
                  </label>
                  <select
                    {...register("budget")}
                    className={`form-input ${errors.budget ? "error" : ""}`}
                  >
                    <option value="">Selecione</option>
                    <option value="ate-5k">Até R$5k</option>
                    <option value="5k-15k">R$5k – R$15k</option>
                    <option value="15k-30k">R$15k – R$30k</option>
                    <option value="acima-30k">Acima de R$30k</option>
                    <option value="a-definir">A definir</option>
                  </select>
                  {errors.budget && (
                    <p className="mt-1 text-[12px] text-[rgba(255,60,60,0.8)] font-inter">
                      {errors.budget.message}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label className="font-mono text-label uppercase text-text-tertiary tracking-[0.12em] mb-2 block">
                    Mensagem *
                  </label>
                  <textarea
                    {...register("message")}
                    className={`form-input min-h-[120px] resize-y ${errors.message ? "error" : ""}`}
                    placeholder="Conte sobre seu projeto..."
                  />
                  {errors.message && (
                    <p className="mt-1 text-[12px] text-[rgba(255,60,60,0.8)] font-inter">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className={`w-full inline-flex items-center justify-center gap-2 px-6 py-4 font-inter font-medium text-cta transition-all duration-300 ${
                    status === "success"
                      ? "bg-[rgba(34,197,94,0.2)] text-[rgb(34,197,94)]"
                      : status === "error"
                      ? "bg-[rgba(255,60,60,0.2)] text-[rgba(255,60,60,0.8)]"
                      : "btn-primary text-bg-primary"
                  }`}
                  style={status === "success" ? { borderRadius: "2px", border: "1px solid rgba(34,197,94,0.3)" } : status === "error" ? { borderRadius: "2px", border: "1px solid rgba(255,60,60,0.3)" } : {}}
                >
                  {status === "loading" ? (
                    "Enviando..."
                  ) : status === "success" ? (
                    "Mensagem enviada ✓"
                  ) : status === "error" ? (
                    "Erro ao enviar. Tente novamente."
                  ) : (
                    <>
                      Enviar mensagem
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </form>
            </ScrollReveal>
          </div>

          {/* Info — 40% */}
          <div className="lg:col-span-2">
            <ScrollReveal delay={0.2}>
              <div className="space-y-8">
                {/* Contact Info */}
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-accent-muted flex items-center justify-center flex-shrink-0" style={{ borderRadius: "2px" }}>
                      <Mail size={18} className="text-accent" />
                    </div>
                    <div>
                      <h4 className="font-mono text-label uppercase text-text-tertiary tracking-[0.12em] mb-1">
                        EMAIL
                      </h4>
                      <a
                        href="mailto:contato@viesstudios.com.br"
                        className="font-inter text-sm text-text-primary hover:text-accent transition-colors"
                      >
                        contato@viesstudios.com.br
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-accent-muted flex items-center justify-center flex-shrink-0" style={{ borderRadius: "2px" }}>
                      <MapPin size={18} className="text-accent" />
                    </div>
                    <div>
                      <h4 className="font-mono text-label uppercase text-text-tertiary tracking-[0.12em] mb-1">
                        LOCALIZAÇÃO
                      </h4>
                      <p className="font-inter text-sm text-text-primary">
                        Rio de Janeiro, Brasil
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-accent-muted flex items-center justify-center flex-shrink-0" style={{ borderRadius: "2px" }}>
                      <Clock size={18} className="text-accent" />
                    </div>
                    <div>
                      <h4 className="font-mono text-label uppercase text-text-tertiary tracking-[0.12em] mb-1">
                        RESPOSTA
                      </h4>
                      <p className="font-inter text-sm text-text-primary">
                        Em até 24 horas
                      </p>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="border-t border-border-subtle pt-6">
                  <h4 className="font-mono text-label uppercase text-text-tertiary tracking-[0.12em] mb-4">
                    REDES SOCIAIS
                  </h4>
                  <div className="flex gap-4">
                    {[
                      { label: "Instagram", href: "https://instagram.com/viesstudios" },
                      { label: "LinkedIn", href: "https://linkedin.com/company/viesstudios" },
                      { label: "GitHub", href: "https://github.com/viesstudios" },
                    ].map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-bg-card font-inter text-sm text-text-secondary hover:text-text-primary transition-all duration-300 tech-card tech-card-hover"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>

                {/* FAQ */}
                <div className="border-t border-border-subtle pt-6">
                  <h4 className="font-mono text-label uppercase text-text-tertiary tracking-[0.12em] mb-4">
                    PERGUNTAS FREQUENTES
                  </h4>
                  <div>
                    {faqs.map((faq) => (
                      <FAQItem key={faq.question} {...faq} />
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
