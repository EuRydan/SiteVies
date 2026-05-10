"use client";

import { motion } from "framer-motion";

export default function MarqueeTicker() {
  const tickerText =
    "NEXT.JS 14  ·  SEGURANÇA EM PROFUNDIDADE  ·  SEO TÉCNICO  ·  LIGHTHOUSE 90+  ·  REACT  ·  SUPABASE  ·  PERFORMANCE FIRST  ·  VERCEL EDGE  ·  TYPESCRIPT  ·  ";

  return (
    <div
      className="marquee-container w-full bg-[#111111] py-4 overflow-hidden"
      style={{
        borderTop: "1px solid rgba(255,255,255,0.04)",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
        boxShadow: "0 -1px 0 rgba(255,90,26,0.20)",
      }}
    >
      <motion.div
        className="marquee-track flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          x: {
            duration: 24,
            repeat: Infinity,
            ease: "linear",
          },
        }}
      >
        {[...Array(4)].map((_, i) => (
          <span
            key={i}
            className="font-mono text-[12px] text-text-tertiary tracking-wider mx-0"
          >
            {tickerText}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
