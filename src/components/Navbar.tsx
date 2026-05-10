"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/servicos", label: "Serviços" },
  { href: "/processo", label: "Processo" },
  { href: "/cases", label: "Cases" },
  { href: "/sobre", label: "Sobre" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { scrollYProgress } = useScroll();

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setIsScrolled(latest > 0.01);
  });

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "backdrop-blur-[20px] bg-[rgba(8,8,8,0.8)]"
            : "bg-transparent"
        }`}
        style={{
          borderBottom: "1px solid rgba(255,255,255,0.04)",
          borderTop: "2px solid rgba(255,90,26,0.60)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 flex items-center justify-between h-14 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="font-sora font-bold text-lg md:text-2xl text-text-primary">
              Viés<span className="text-accent">.</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href + "/"));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    color: isActive ? "#FF5A1A" : "rgba(245,241,236,0.55)",
                    fontSize: "14px",
                    fontFamily: "Inter, sans-serif",
                    fontWeight: isActive ? 500 : 400,
                    textDecoration: "none",
                    position: "relative",
                    paddingBottom: "2px",
                    transition: "color 0.2s",
                  }}
                  className="hover:text-text-primary transition-colors duration-300 relative group"
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="navUnderline"
                      style={{
                        position: "absolute",
                        bottom: "-2px",
                        left: 0,
                        right: 0,
                        height: "1px",
                        background: "#FF5A1A",
                        borderRadius: "1px",
                      }}
                    />
                  )}
                  {!isActive && (
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent transition-all duration-300 group-hover:w-full" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Desktop CTA — ghost button with clip-path */}
          <Link
            href="/contato"
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 text-accent text-cta font-inter font-medium btn-ghost hover:bg-[rgba(255,90,26,0.08)]"
          >
            Iniciar projeto
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-text-primary p-2"
            aria-label="Menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Scroll Progress */}
        <motion.div
          className="absolute bottom-0 left-0 h-[1px] bg-accent origin-left"
          style={{ scaleX: scrollYProgress }}
        />
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-bg-primary pt-20 px-6 md:hidden"
          >
            <div className="flex flex-col gap-5 mt-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="font-sora text-2xl font-bold text-text-primary hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-8"
              >
                <Link
                  href="/contato"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-bg-primary font-inter font-medium text-cta btn-primary"
                >
                  Iniciar projeto →
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
