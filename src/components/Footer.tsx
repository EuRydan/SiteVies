import Link from "next/link";
import { Shield } from "lucide-react";

const serviceLinks = [
  { href: "/servicos", label: "Sites & Landing Pages" },
  { href: "/servicos", label: "Apps & Dashboards" },
  { href: "/servicos", label: "Sistemas & Automações" },
];

const companyLinks = [
  { href: "/sobre", label: "Sobre" },
  { href: "/processo", label: "Processo" },
  { href: "/cases", label: "Cases" },
  { href: "/contato", label: "Contato" },
];

export default function Footer() {
  return (
    <footer
      className="bg-[#0A0A0A] relative z-10"
      style={{
        borderTop: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      <div className="max-w-7xl mx-auto section-padding py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8">
          {/* Logo + Tagline */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <span className="font-sora font-bold text-2xl text-text-primary">
                Viés<span className="text-accent">.</span>
              </span>
            </Link>
            <p className="font-inter text-sm text-text-secondary leading-relaxed mb-6">
              Agência de criação de websites premium, apps e sistemas digitais.
            </p>
            {/* Lighthouse Badge */}
            <div
              className="inline-flex items-center gap-2 px-3 py-2 bg-accent-muted"
              style={{
                border: "1px solid rgba(255,90,26,0.2)",
                borderRadius: "2px",
              }}
            >
              <Shield size={16} className="text-accent" />
              <span className="font-mono text-[11px] text-accent tracking-wide">
                LIGHTHOUSE 90+ GARANTIDO
              </span>
            </div>
          </div>

          {/* Serviços */}
          <div>
            <h4 className="font-mono text-label uppercase text-text-tertiary tracking-[0.12em] mb-4">
              Serviços
            </h4>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="font-inter text-sm text-text-secondary hover:text-text-primary transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h4 className="font-mono text-label uppercase text-text-tertiary tracking-[0.12em] mb-4">
              Empresa
            </h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="font-inter text-sm text-text-secondary hover:text-text-primary transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="font-mono text-label uppercase text-text-tertiary tracking-[0.12em] mb-4">
              Contato
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:contato@viesstudios.com.br"
                  className="font-inter text-sm text-text-secondary hover:text-accent transition-colors duration-300"
                >
                  contato@viesstudios.com.br
                </a>
              </li>
              <li className="font-inter text-sm text-text-secondary">
                Rio de Janeiro, Brasil
              </li>
              <li className="flex gap-4 mt-4">
                <a
                  href="https://instagram.com/viesstudios"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-inter text-sm text-text-secondary hover:text-accent transition-colors"
                >
                  Instagram
                </a>
                <a
                  href="https://linkedin.com/company/viesstudios"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-inter text-sm text-text-secondary hover:text-accent transition-colors"
                >
                  LinkedIn
                </a>
                <a
                  href="https://github.com/viesstudios"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-inter text-sm text-text-secondary hover:text-accent transition-colors"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
        >
          <p className="font-mono text-[11px] text-text-tertiary tracking-wide">
            © {new Date().getFullYear()} Viés Studios. Todos os direitos reservados.
          </p>
          <p className="font-mono text-[11px] text-text-tertiary tracking-wide">
            Feito com obsessão por qualidade.
          </p>
        </div>
      </div>
    </footer>
  );
}
