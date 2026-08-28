"use client";

import React from "react";

interface HybridProps {
  locale: "en" | "ar";
}

export const Hybrid: React.FC<HybridProps> = ({ locale }) => {
  const isAr = locale === "ar";

  return (
    <section className="py-28 bg-obsidian text-white border-t border-white/10 relative overflow-hidden">
      {/* Subtle ambient gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-engineering-blue/[0.03] to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center flex flex-col items-center relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white/80 mb-8">
          <span>{isAr ? "الاندماج الثلاثي" : "06 // THE TRIPLE EQUATION"}</span>
        </div>

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black tracking-normal uppercase mb-6 leading-snug">
          <span className="text-engineering-blue">TECHNOLOGY</span>{" "}
          <span className="text-white/40">×</span>{" "}
          <span className="text-creative-coral">DESIGN</span>{" "}
          <span className="text-white/40">×</span>{" "}
          <span className="text-emerald-400">MARKETING</span>
        </h2>

        <p className="text-xl sm:text-2xl font-display font-medium text-neutral-cool max-w-2xl mb-14">
          {isAr
            ? "تخصصات مختلفة. استوديو واحد متكامل."
            : "Three disciplines. One cohesive studio."}
        </p>

        {/* Three-pillar Comparative Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl text-start">
          {/* Engineering Pillar */}
          <div className="p-8 rounded-3xl bg-soft-black border border-engineering-blue/30 relative overflow-hidden group hover:border-engineering-blue/60 transition-all duration-300">
            <div className="absolute top-0 right-0 w-28 h-28 bg-engineering-blue/10 rounded-full blur-2xl pointer-events-none" />
            <span className="text-xs font-mono text-engineering-blue uppercase tracking-widest block mb-3 font-bold">
              {isAr ? "الهندسة والبرمجة" : "THE ENGINEERING CORE"}
            </span>
            <h4 className="text-xl font-display font-bold text-white mb-3">
              {isAr ? "الدقة، الأداء، وقابلية التوسع" : "Performance, Scale & Security"}
            </h4>
            <p className="text-neutral-cool text-sm leading-relaxed">
              {isAr
                ? "بنية تحتية برمجية صلبة تضمن سرعة النظام واستقراره تحت أعلى معدلات الاستخدام."
                : "Rock-solid cloud backends, resilient APIs, zero-latency frontend engineering, and scalable multi-tenant architecture."}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Next.js", "Python", "WebGL", "AI"].map((tag) => (
                <span key={tag} className="px-2.5 py-1 rounded-lg bg-engineering-blue/10 border border-engineering-blue/20 text-[10px] font-mono text-engineering-blue">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Creative Pillar */}
          <div className="p-8 rounded-3xl bg-soft-black border border-creative-coral/30 relative overflow-hidden group hover:border-creative-coral/60 transition-all duration-300">
            <div className="absolute top-0 left-0 w-28 h-28 bg-creative-coral/10 rounded-full blur-2xl pointer-events-none" />
            <span className="text-xs font-mono text-creative-coral uppercase tracking-widest block mb-3 font-bold">
              {isAr ? "التصميم والإبداع" : "THE CREATIVE SOUL"}
            </span>
            <h4 className="text-xl font-display font-bold text-white mb-3">
              {isAr ? "المعنى، الفخامة، والأثر البصري" : "Meaning, Luxury & Distinction"}
            </h4>
            <p className="text-neutral-cool text-sm leading-relaxed">
              {isAr
                ? "هويات وتجارب بصرية تفاعلية تأسر الجمهور وتمنح منتجك مكانة لا تُنسى في السوق."
                : "Art-directed typography, spatial interactions, emotional brand narratives, and meticulous physical & digital craft."}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Branding", "3D", "Motion", "UX/UI"].map((tag) => (
                <span key={tag} className="px-2.5 py-1 rounded-lg bg-creative-coral/10 border border-creative-coral/20 text-[10px] font-mono text-creative-coral">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Marketing Pillar */}
          <div className="p-8 rounded-3xl bg-soft-black border border-emerald-500/30 relative overflow-hidden group hover:border-emerald-500/60 transition-all duration-300">
            <div className="absolute bottom-0 left-0 w-28 h-28 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
            <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest block mb-3 font-bold">
              {isAr ? "التسويق والنمو" : "THE GROWTH ENGINE"}
            </span>
            <h4 className="text-xl font-display font-bold text-white mb-3">
              {isAr ? "الوصول، التفاعل، والتحويل" : "Reach, Engage & Convert"}
            </h4>
            <p className="text-neutral-cool text-sm leading-relaxed">
              {isAr
                ? "استراتيجيات تسويقية مبنية على البيانات تحوّل الجمهور المستهدف إلى عملاء حقيقيين وعائد قابل للقياس."
                : "Data-intelligence meets creative storytelling to build measurable brand reach and sustainable revenue growth at scale."}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["SEO", "Paid Media", "Social", "Analytics"].map((tag) => (
                <span key={tag} className="px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono text-emerald-400">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Synthesis tagline */}
        <p className="text-sm font-mono text-white/35 mt-12 tracking-[0.2em] uppercase">
          {isAr
            ? "البرمجة تبني. التصميم يُعبّر. التسويق يُوصل."
            : "ENGINEERING BUILDS. DESIGN EXPRESSES. MARKETING REACHES."}
        </p>
      </div>
    </section>
  );
};
