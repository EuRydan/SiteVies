"use client";

import { motion } from "framer-motion";

interface SectionLabelProps {
  text: string;
  className?: string;
}

export default function SectionLabel({ text, className = "" }: SectionLabelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className={`flex items-center gap-[10px] mb-6 ${className}`}
    >
      {/* Double dash accent mark */}
      <span
        className="block w-5 h-[1px] bg-accent"
        style={{ boxShadow: "0 3px 0 #FF5A1A" }}
      />
      <span className="font-mono text-label uppercase text-accent tracking-[0.12em]">
        {text}
      </span>
    </motion.div>
  );
}
