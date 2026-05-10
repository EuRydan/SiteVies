import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "#080808",
          secondary: "#0F0F0F",
          card: "#141414",
        },
        accent: {
          DEFAULT: "#FF5A1A",
          hover: "#FF7A45",
          glow: "rgba(255,90,26,0.15)",
          muted: "rgba(255,90,26,0.08)",
        },
        text: {
          primary: "#F5F1EC",
          secondary: "rgba(245,241,236,0.55)",
          tertiary: "rgba(245,241,236,0.30)",
        },
        border: {
          subtle: "rgba(255,255,255,0.06)",
          hover: "rgba(255,90,26,0.35)",
        },
      },
      fontFamily: {
        sora: ["var(--font-sora)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      fontSize: {
        "hero": ["clamp(42px, 8vw, 82px)", { lineHeight: "0.95", letterSpacing: "-0.04em" }],
        "section": ["clamp(32px, 5vw, 56px)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "card-title": ["clamp(20px, 3vw, 26px)", { lineHeight: "1.2" }],
        "body": ["clamp(15px, 1.6vw, 18px)", { lineHeight: "1.65" }],
        "label": ["clamp(10px, 1vw, 12px)", { lineHeight: "1.5", letterSpacing: "0.15em" }],
        "cta": ["14px", { lineHeight: "1.5", letterSpacing: "0.04em" }],
      },
      animation: {
        "marquee": "marquee 24s linear infinite",
        "float": "float 4s ease-in-out infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
