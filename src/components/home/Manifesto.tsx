"use client";

import React from "react";

interface ManifestoProps {
  locale: "en" | "ar";
}

export const Manifesto: React.FC<ManifestoProps> = ({ locale }) => {
  const isAr = locale === "ar";

  const coreWords = isAr
    ? ["الأفكار // IDEAS", "الأنظمة // SYSTEMS", "التصميم // DESIGN", "التكنولوجيا // TECH", "التجربة // EXPERIENCE"]
    : ["IDEAS", "SYSTEMS", "DESIGN", "TECHNOLOGY", "EXPERIENCE"];

  return (
    <section
      id="manifesto"
      className="relative py-28 sm:py-36 bg-off-white text-obsidian transition-colors duration-700 overflow-hidden"
    >
      {/* 03 First Scroll Word Dissolve Stream */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16">
        <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-b border-neutral-warm/20 text-xs sm:text-sm font-mono uppercase tracking-widest text-neutral-warm">
          {coreWords.map((word, idx) => (
            <span
              key={idx}
              className="px-3 py-1.5 rounded-full bg-obsidian/[0.04] border border-obsidian/10 font-bold hover:text-creative-coral transition-colors"
            >
              {word}
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Label */}
        <div className="flex items-center gap-3 mb-8">
          <span className="w-8 h-[2px] bg-creative-coral" />
          <span className="text-xs font-mono uppercase tracking-widest text-neutral-warm font-semibold">
            {isAr ? "البيان التأسيسي" : "01 // THE MANIFESTO"}
          </span>
        </div>

        {/* The 3 Core Pillars */}
        <div className="flex flex-col gap-2 sm:gap-4 mb-14">
          <h2 className="text-4xl sm:text-7xl lg:text-8xl font-display font-black tracking-tight uppercase text-obsidian leading-[0.95]">
            {isAr ? "نبني." : "WE BUILD."}
          </h2>
          <h2 className="text-4xl sm:text-7xl lg:text-8xl font-display font-black tracking-tight uppercase text-neutral-warm leading-[0.95]">
            {isAr ? "نصمّم." : "WE DESIGN."}
          </h2>
          <h2 className="text-4xl sm:text-7xl lg:text-8xl font-display font-black tracking-tight uppercase text-creative-coral leading-[0.95]">
            {isAr ? "ونربط بين الاثنين." : "WE CONNECT THE TWO."}
          </h2>
        </div>

        {/* Pure Typography Manifesto Hero */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start pt-8 border-t border-neutral-warm/20">
          <div className="md:col-span-6">
            <h3 className="text-2xl sm:text-4xl font-display font-extrabold text-obsidian leading-snug">
              {isAr
                ? "Technology should work beautifully.\nDesign should work intelligently."
                : "Technology should work beautifully.\nDesign should work intelligently."}
            </h3>
          </div>

          <div className="md:col-span-6 flex flex-col gap-4 text-neutral-warm text-base sm:text-lg leading-relaxed">
            <p>
              {isAr
                ? "أوردرلي هو استوديو تكنولوجيا إبداعية يجمع بين الهندسة البرمجية، التصميم الرقمي، والتقنيات الناشئة لبناء تجارب رقمية ذات أثر حقيقي."
                : "ORDERLY is a creative technology studio combining engineering, design and emerging technology to build digital experiences that matter."}
            </p>
            <p className="font-mono text-xs text-obsidian tracking-wider uppercase font-semibold">
              {isAr
                ? "الفوضى ← النظام ← البنية ← التجربة"
                : "CHAOS → ORDER → SYSTEM → EXPERIENCE"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
