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
        obsidian: "#0A0A0C",
        "soft-black": "#111114",
        "off-white": "#F5F4F0",
        "engineering-blue": "#2B6CFF",
        "engineering-violet": "#7C3AED",
        "creative-coral": "#E8614A",
        "creative-peach": "#F2A07B",
        "neutral-cool": "#8B8C9E",
        "neutral-warm": "#9E8E7E",
        "grid-line": "#1E1E24",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "sans-serif"],
        display: ["var(--font-display)", "sans-serif"],
        arabic: ["var(--font-arabic)", "Almarai", "Cairo", "sans-serif"],
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
