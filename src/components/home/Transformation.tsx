"use client";

import React from "react";
import { Symbol } from "../brand/Symbol";

interface TransformationProps {
  locale: "en" | "ar";
}

export const Transformation: React.FC<TransformationProps> = ({ locale }) => {
  const isAr = locale === "ar";

  return (
    <section className="relative py-36 bg-gradient-to-b from-obsidian via-soft-black to-off-white text-center flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Central Symbol Bridge */}
      <div className="relative z-10 flex flex-col items-center max-w-4xl mx-auto">
        <div className="p-4 rounded-full bg-white/10 backdrop-blur-xl border border-white/15 mb-8 shadow-2xl animate-pulse">
          <Symbol size={48} variant="creative" />
        </div>

        {/* Crisp Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-creative-coral/15 border border-creative-coral/30 text-xs font-mono text-creative-coral uppercase tracking-widest mb-6 font-bold shadow-sm">
          <span>{isAr ? "نقطة التحول البصري // 07" : "07 // THE METAMORPHOSIS"}</span>
        </div>

        {/* Master Transition Headline */}
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black text-white max-w-3xl leading-tight mb-8 drop-shadow-lg">
          {isAr ? (
            <>
              عندما تلتقي <span className="text-engineering-blue drop-shadow-[0_0_20px_rgba(43,108,255,0.4)]">الهندسة الصارمة</span> مع{" "}
              <span className="text-creative-coral drop-shadow-[0_0_20px_rgba(232,97,74,0.4)]">التعبير الإبداعي</span>
            </>
          ) : (
            <>
              Where <span className="text-engineering-blue drop-shadow-[0_0_20px_rgba(43,108,255,0.4)]">Rigorous Code</span> meets{" "}
              <span className="text-creative-coral drop-shadow-[0_0_20px_rgba(232,97,74,0.4)]">Unbound Imagination</span>
            </>
          )}
        </h2>

        {/* High-Contrast Supporting Narrative */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white/90 backdrop-blur-xl border border-neutral-warm/30 shadow-2xl max-w-2xl">
          <p className="text-obsidian font-display font-semibold text-base sm:text-lg leading-relaxed">
            {isAr
              ? "تتلاشى العقد البرمجية لتفسح المجال أمام الخطوط الطباعية، المواد البصرية، والهويات المؤثرة."
              : "The network dissolves into form, typography, tactile materials, and memorable human experiences."}
          </p>
          <span className="text-[11px] font-mono uppercase tracking-widest text-creative-coral font-bold mt-2 block">
            {isAr ? "الفوضى ← النظام ← البنية ← التجربة" : "CHAOS → ORDER → SYSTEM → EXPERIENCE"}
          </span>
        </div>
      </div>
    </section>
  );
};
