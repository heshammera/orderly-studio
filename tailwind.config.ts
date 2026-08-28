import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        obsidian: "#070709",
        "soft-black": "#0E0E12",
        "card-dark": "#121218",
        "off-white": "#F8F8F6",
        "engineering-blue": "#2B6CFF",
        "engineering-cyan": "#0EA5E9",
        "engineering-violet": "#8B5CF6",
        "creative-coral": "#E8614A",
        "creative-peach": "#F2A07B",
        "brand-gold": "#F59E0B",
        "brand-emerald": "#10B981",
        "neutral-cool": "#94A3B8",
        "neutral-warm": "#A8A29E",
        "grid-line": "#1E1E24",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "var(--font-arabic)", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "var(--font-arabic)", "sans-serif"],
        arabic: ["var(--font-arabic)", "var(--font-display)", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
      },
      letterSpacing: {
        tighter: "-0.04em",
        tight: "-0.02em",
        wide: "0.08em",
        wider: "0.15em",
        widest: "0.25em",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
