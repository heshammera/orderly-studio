"use client";

import React from "react";
import { ArrowDown, ArrowUpRight, Sparkles } from "lucide-react";
import { OrbCanvas } from "../webgl/OrbCanvas";

interface HeroProps {
  locale: "en" | "ar";
  onOpenProjectBuilder: () => void;
}

export const Hero: React.FC<HeroProps> = ({ locale, onOpenProjectBuilder }) => {
  const isAr = locale === "ar";

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center bg-obsidian bg-grid-pattern pt-24 pb-16 overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-radial-gradient pointer-events-none" />

      <div className="max-w-7xl w-full mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left Column: Typography & Positioning */}
        <div className="lg:col-span-7 flex flex-col items-start text-start">
          {/* Studio Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-neutral-cool mb-6 tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-engineering-blue animate-ping" />
            <span>{isAr ? "استوديو التكنولوجيا الإبداعية" : "CREATIVE TECHNOLOGY STUDIO"}</span>
          </div>

          {/* Primary Statement */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold tracking-tighter text-white leading-[1.05] mb-6">
            {isAr ? (
              <>
                نحوّل الأفكار الطموحة إلى <span className="text-engineering-blue">تجارب رقمية</span> استثنائية.
              </>
            ) : (
              <>
                We turn ambitious ideas into <span className="text-engineering-blue">digital experiences</span>.
              </>
            )}
          </h1>

          {/* Supporting Narrative */}
          <p className="text-base sm:text-lg text-neutral-cool font-normal max-w-xl mb-10 leading-relaxed">
            {isAr
              ? "استوديو يجمع بين دقة الهندسة البرمجية وشغف التصميم الإبداعي لبناء منصات، منتجات ذكاء اصطناعي، وهويات تجارية عالمية تقود المستقبل."
              : "An independent studio combining software engineering, AI, and digital brand design to structure complexity into seamless digital worlds."}
          </p>

          {/* Dual CTAs */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={onOpenProjectBuilder}
              className="px-8 py-4 rounded-full bg-white text-obsidian font-bold text-sm tracking-wider uppercase flex items-center gap-3 hover:bg-engineering-blue hover:text-white transition-all duration-300 shadow-xl group"
              data-cursor="START"
            >
              <span>{isAr ? "ابدأ مشروعك معنا" : "EXPLORE THE STUDIO"}</span>
              <ArrowUpRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </button>

            <a
              href="#manifesto"
              className="px-6 py-4 rounded-full border border-white/15 bg-white/5 text-white/80 hover:text-white hover:border-white/30 font-mono text-xs tracking-wider uppercase flex items-center gap-2 transition-all"
              data-cursor="SCROLL"
            >
              <span>{isAr ? "فلسفة الاستوديو" : "THE PHILOSOPHY"}</span>
              <ArrowDown size={14} />
            </a>
          </div>
        </div>

        {/* Right Column: Signature 3D Orb */}
        <div className="lg:col-span-5 relative h-[380px] sm:h-[480px] lg:h-[540px] flex items-center justify-center">
          <OrbCanvas className="w-full h-full" />
          
          {/* Subtle Coordinate Float Overlay */}
          <div className="absolute bottom-4 right-4 text-[10px] font-mono text-white/30 tracking-widest uppercase pointer-events-none hidden sm:block">
            <span>SYS: 3D_ORB_ACTIVE // CHAOS_TO_ORDER</span>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-neutral-cool/50 pointer-events-none">
        <span className="text-[10px] font-mono tracking-widest uppercase">
          {isAr ? "تمرير للاستكشاف" : "SCROLL TO DISCOVER"}
        </span>
        <div className="w-4 h-7 rounded-full border border-white/20 flex items-start justify-center p-1">
          <div className="w-1 h-2 rounded-full bg-engineering-blue animate-bounce" />
        </div>
      </div>
    </section>
  );
};
