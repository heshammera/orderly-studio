"use client";

import React from "react";

interface HybridProps {
  locale: "en" | "ar";
}

export const Hybrid: React.FC<HybridProps> = ({ locale }) => {
  const isAr = locale === "ar";

  return (
    <section className="py-28 bg-obsidian text-white border-t border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center flex flex-col items-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white/80 mb-8">
          <span>{isAr ? "الاندماج الهجين" : "04 // THE HYBRID EQUATION"}</span>
        </div>

        {/* Master Headline */}
        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-display font-black tracking-tight uppercase mb-6 leading-tight">
          <span className="text-engineering-blue">TECHNOLOGY</span>{" "}
          <span className="text-creative-coral">×</span>{" "}
          <span className="text-white">DESIGN</span>
        </h2>

        <p className="text-xl sm:text-2xl font-display font-medium text-neutral-cool max-w-2xl mb-12">
          {isAr ? "تخصصات مختلفة. استوديو واحد متكامل." : "Different disciplines. One cohesive studio."}
        </p>

        {/* Side-by-side Comparative Synthesis */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl text-start">
          <div className="p-8 rounded-3xl bg-soft-black border border-engineering-blue/30 relative overflow-hidden">
            <span className="text-xs font-mono text-engineering-blue uppercase tracking-widest block mb-3 font-bold">
              {isAr ? "الهندسة والبرمجة" : "THE ENGINEERING CORE"}
            </span>
            <h4 className="text-xl font-display font-bold text-white mb-2">
              {isAr ? "الدقة، الأداء، وقابلية التوسع" : "Performance, Scale & Security"}
            </h4>
            <p className="text-neutral-cool text-sm leading-relaxed">
              {isAr
                ? "بنية تحتية برمجية صلبة تضمن سرعة البرمجة واستقرار النظام تحت أعلى معدلات الاستخدام."
                : "Rock-solid cloud backends, resilient APIs, zero-latency frontend engineering, and scalable multi-tenant architecture."}
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-soft-black border border-creative-coral/30 relative overflow-hidden">
            <span className="text-xs font-mono text-creative-coral uppercase tracking-widest block mb-3 font-bold">
              {isAr ? "التصميم والإبداع" : "THE CREATIVE SOUL"}
            </span>
            <h4 className="text-xl font-display font-bold text-white mb-2">
              {isAr ? "المعنى، الفخامة، والأثر البصري" : "Meaning, Luxury & Distinction"}
            </h4>
            <p className="text-neutral-cool text-sm leading-relaxed">
              {isAr
                ? "هويات وتجارب بصرية تفاعلية تأسر الجمهور وتمنح منتجك مكانة لا تُنسى في السوق."
                : "Art-directed typography, spatial interactions, emotional brand narratives, and meticulous physical & digital craft."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
