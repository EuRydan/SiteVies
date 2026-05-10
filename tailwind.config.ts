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
        "hero": ["72px", { lineHeight: "1.0", letterSpacing: "-0.03em" }],
        "section": ["44px", { lineHeight: "1.1" }],
        "card-title": ["22px", { lineHeight: "1.3" }],
        "body": ["16px", { lineHeight: "1.75" }],
        "label": ["11px", { lineHeight: "1.5", letterSpacing: "0.12em" }],
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
