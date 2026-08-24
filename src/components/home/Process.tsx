"use client";

import React from "react";

interface ProcessProps {
  locale: "en" | "ar";
}

export const Process: React.FC<ProcessProps> = ({ locale }) => {
  const isAr = locale === "ar";

  const steps = [
    {
      num: "01",
      name: isAr ? "نفكّر" : "THINK",
      desc: isAr
        ? "استكشاف التحديات، دراسة السوق، وتحديد الفرص غير المستغلة."
        : "Deconstructing core problems, discovering market gaps, and questioning assumptions.",
    },
    {
      num: "02",
      name: isAr ? "نحدّد" : "DEFINE",
      desc: isAr
        ? "بناء الاستراتيجية، المعمارية التقنية، والاتجاه البصري المحكم."
        : "Establishing technical architecture, brand strategy, and design principles.",
    },
    {
      num: "03",
      name: isAr ? "نصمّم" : "DESIGN",
      desc: isAr
        ? "ابتكار واجهات المستخدم، الهوية، ونماذج التفاعل عالية الدقة."
        : "Crafting bespoke design systems, tactile packaging, and responsive UI flows.",
    },
    {
      num: "04",
      name: isAr ? "نبني" : "BUILD",
      desc: isAr
        ? "برمجة الأنظمة، تطوير الواجهات، وتكامل الذكاء الاصطناعي."
        : "Full-stack engineering, performance optimization, and rigorous testing.",
    },
    {
      num: "05",
      name: isAr ? "نطلق" : "LAUNCH",
      desc: isAr
        ? "النشر السحابي، التدشين الإعلامي، ومراقبة مؤشرات الأداء الحية."
        : "Zero-downtime deployment, global CDN activation, and conversion analytics.",
    },
    {
      num: "06",
      name: isAr ? "نطوّر" : "EVOLVE",
      desc: isAr
        ? "التحسين المستمر، إضافة الميزات، والتوسع عالمياً."
        : "Iterative feature development, performance tuning, and continuous scaling.",
    },
  ];

  return (
    <section id="process" className="py-28 bg-soft-black text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-16">
          <span className="text-xs font-mono text-engineering-blue uppercase tracking-widest block mb-2">
            {isAr ? "منهجية العمل والتحول" : "06 // METHODOLOGY"}
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white">
            {isAr ? "كيف نحوّل الفوضى إلى نظام متكامل" : "From Concept to Scale"}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-obsidian border border-white/10 hover:border-engineering-blue/40 transition-all flex flex-col justify-between group"
            >
              <div>
                <span className="text-xs font-mono text-neutral-cool block mb-4 group-hover:text-engineering-blue transition-colors">
                  {step.num} // TRANSFORMATION
                </span>
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-3">
                  {step.name}
                </h3>
                <p className="text-neutral-cool text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-white/5 text-[10px] font-mono text-white/30 flex items-center justify-between">
                <span>PHASE {step.num}</span>
                <span>ORDERLY METHOD</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
