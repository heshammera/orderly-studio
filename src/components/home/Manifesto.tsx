"use client";

import React from "react";

interface ManifestoProps {
  locale: "en" | "ar";
}

export const Manifesto: React.FC<ManifestoProps> = ({ locale }) => {
  const isAr = locale === "ar";

  const tickerWords = isAr
    ? ["كود نقي", "تصميم بصري فاخر", "ذكاء اصطناعي مخصص", "هندسة سحابية", "هوية ملكية", "أنيميشن سينمائي", "تسويق استراتيجي"]
    : ["SCALABLE SYSTEMS", "LUXURY AESTHETICS", "BESPOKE AI", "CLOUD ENGINEERING", "ROYAL BRANDING", "CINEMATIC MOTION", "GROWTH MARKETING"];

  return (
    <section className="py-24 bg-off-white text-obsidian relative overflow-hidden">
      {/* Dynamic Animated Core Ticker Bar */}
      <div className="w-full overflow-hidden border-y border-neutral-warm/20 py-4 mb-20 bg-neutral-warm/5">
        <div className="flex items-center gap-12 whitespace-nowrap animate-marquee">
          {tickerWords.concat(tickerWords).map((word, idx) => (
            <span
              key={idx}
              className="text-xs font-mono font-bold tracking-widest text-obsidian/70 flex items-center gap-4 uppercase"
            >
              <span>{word}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-creative-coral" />
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

        {/* The 3 Core Pillars with safe line-height */}
        <div className="flex flex-col gap-3 sm:gap-4 mb-14">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight uppercase text-obsidian leading-tight">
            {isAr ? "نبني." : "WE BUILD."}
          </h2>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight uppercase text-neutral-warm leading-tight">
            {isAr ? "نصمّم." : "WE DESIGN."}
          </h2>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight uppercase text-creative-coral leading-tight">
            {isAr ? "ونربط بين الاثنين." : "WE CONNECT THE TWO."}
          </h2>
        </div>

        {/* Pure Typography Manifesto Hero */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start pt-8 border-t border-neutral-warm/20">
          <div className="md:col-span-6">
            <h3 className="text-xl sm:text-3xl font-display font-bold text-obsidian leading-snug">
              {isAr
                ? "الفجوة بين التكنولوجيا المعقدة والتصميم البصري الفاخر هي المكان الذي نصنع فيه قيمتنا."
                : "The gap between deep engineering and art-directed design is where we build enduring value."}
            </h3>
          </div>

          <div className="md:col-span-6 flex flex-col gap-6 text-neutral-warm text-sm sm:text-base leading-relaxed">
            <p>
              {isAr
                ? "معظم الوكالات إما تقنية بحتة تفتقر للروح والجمال، أو إبداعية بحتة تفتقر للقوة الهندسية وقابلية التوسع. نحن نوحد الاثنين تحت سقف واحد."
                : "Most studios are either purely technical and lack aesthetic soul, or purely artistic and lack software rigor. We unite both disciplines under one roof."}
            </p>
            <p>
              {isAr
                ? "كل سطر برمجي، وكل خطوة في تجربة المستخدم، وكل عنصر في الهوية البصرية يُصاغ بدقة متناهية ليخدم أهداف نموك التجاري."
                : "Every line of code, every pixel of interface design, and every brand touchpoint is crafted to perform flawlessly and scale infinitely."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
