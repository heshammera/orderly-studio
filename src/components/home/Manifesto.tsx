"use client";

import React from "react";
import { Cpu, Sparkles, TrendingUp, Layers } from "lucide-react";

interface ManifestoProps {
  locale: "en" | "ar";
}

export const Manifesto: React.FC<ManifestoProps> = ({ locale }) => {
  const isAr = locale === "ar";

  const tickerWords = isAr
    ? [
        "كود نقي",
        "تصميم بصري فاخر",
        "ذكاء اصطناعي مخصص",
        "هندسة سحابية",
        "هوية ملكية",
        "أنيميشن سينمائي",
        "تسويق استراتيجي",
        "نمو المبيعات ROAS",
      ]
    : [
        "SCALABLE SYSTEMS",
        "LUXURY AESTHETICS",
        "BESPOKE AI",
        "CLOUD ENGINEERING",
        "ROYAL BRANDING",
        "CINEMATIC MOTION",
        "GROWTH MARKETING",
        "DATA-DRIVEN SCALE",
      ];

  const pillars = [
    {
      num: "01",
      icon: <Cpu className="w-5 h-5 text-engineering-blue" />,
      titleEn: "Engineering & Code",
      titleAr: "الهندسة والبرمجيات",
      descEn: "Scalable cloud infrastructure, robust Next.js platforms, and bespoke neural AI systems built for infinite scale.",
      descAr: "بنية سحابية فائقة السرعة، منصات Next.js متطورة، وأنظمة ذكاء اصطناعي مخصصة مبنية للتوسع بلا انقطاع.",
      accentBorder: "border-engineering-blue/30",
      accentBg: "bg-engineering-blue/5",
    },
    {
      num: "02",
      icon: <Sparkles className="w-5 h-5 text-creative-coral" />,
      titleEn: "Design & Identity",
      titleAr: "التصميم والهوية",
      descEn: "Art-directed luxury brand identities, conversion-focused UI/UX design systems, and cinematic 3D craft.",
      descAr: "هويات بصرية ملكية، واجهات وتطبيقات تفاعلية فائقة السلاسة، ولمسات 3D سينمائية تجعل علامتك أيقونة.",
      accentBorder: "border-creative-coral/30",
      accentBg: "bg-creative-coral/5",
    },
    {
      num: "03",
      icon: <TrendingUp className="w-5 h-5 text-emerald-600" />,
      titleEn: "Growth & Marketing",
      titleAr: "التسويق ونمو المبيعات",
      descEn: "Data-driven paid media campaigns, search engine dominance (SEO), and high-conversion automated funnels.",
      descAr: "حملات إعلانية ممولة بأعلى عائد ROAS، تصدر نتائج البحث، وقمع مبيعات ذكي يضاعف أرباحك وعملائك.",
      accentBorder: "border-emerald-600/30",
      accentBg: "bg-emerald-600/5",
    },
  ];

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
            {isAr ? "البيان التأسيسي // الفلسفة" : "01 // THE MANIFESTO"}
          </span>
        </div>

        {/* ── Single-Line Core Pillars Headline on Desktop ── */}
        <div className="mb-14 pb-8 border-b border-neutral-warm/20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-black tracking-tight flex flex-wrap md:flex-nowrap items-center gap-x-4 gap-y-2 leading-tight">
            <span className="text-obsidian">{isAr ? "نبني." : "WE BUILD."}</span>
            <span className="text-neutral-warm">{isAr ? "نصمّم." : "WE DESIGN."}</span>
            <span className="text-emerald-600">{isAr ? "نسوّق." : "WE SCALE."}</span>
            <span className="text-creative-coral">{isAr ? "ونربط بين الكل." : "WE CONNECT ALL THREE."}</span>
          </h2>

          <p className="text-xl sm:text-2xl font-display font-bold text-obsidian/90 max-w-4xl mt-6 leading-snug">
            {isAr
              ? "الفجوة بين التكنولوجيا المعقدة، التصميم البصري الفاخر، واستراتيجيات التسويق الذكي هي المكان الذي نصنع فيه قيمتنا الحقيقية."
              : "The intersection of rigorous engineering, art-directed design, and data-driven marketing is where we build enduring value."}
          </p>
        </div>

        {/* ── 3 Balanced Editorial Cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {pillars.map((pillar, pIdx) => (
            <div
              key={pIdx}
              className={`p-7 rounded-3xl bg-white border ${pillar.accentBorder} shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className={`p-2.5 rounded-xl ${pillar.accentBg} border ${pillar.accentBorder}`}>
                    {pillar.icon}
                  </div>
                  <span className="text-xs font-mono font-bold text-neutral-warm">
                    {pillar.num}
                  </span>
                </div>

                <h3 className="text-lg font-display font-bold text-obsidian mb-2">
                  {isAr ? pillar.titleAr : pillar.titleEn}
                </h3>

                <p className="text-xs sm:text-sm text-neutral-warm leading-relaxed">
                  {isAr ? pillar.descAr : pillar.descEn}
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-neutral-warm/10 flex items-center gap-2 text-xs font-mono font-semibold text-obsidian/60">
                <Layers size={13} />
                <span>{isAr ? "تكامل 100% مع باقي الخدمات" : "100% Integrated"}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Studio Philosophy Narrative */}
        <div className="p-8 rounded-3xl bg-neutral-warm/5 border border-neutral-warm/15 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <p className="text-sm sm:text-base text-obsidian font-medium leading-relaxed">
            {isAr
              ? "معظم الوكالات إما تقنية بحتة تفتقر للروح والجمال، أو إبداعية تفتقر للعمق البرمجي، أو تسويقية تعتمد على قوالب جاهزة. نحن ندمج التخصصات الثلاثة في فريق واحد متناغم."
              : "Most agencies are either technical without aesthetic soul, creative without engineering rigor, or marketing-only using generic templates. We unite all three disciplines under one unified studio roof."}
          </p>

          <p className="text-xs sm:text-sm text-neutral-warm leading-relaxed">
            {isAr
              ? "كل سطر برمجي، وكل تفاعل في واجهة المستخدم، وكل حملة إعلانية تُصمم بدقة لتعمل بتناغم كامل وتضاعف نمو علامتك في السوق."
              : "Every line of code, every micro-interaction in the interface, and every growth ad campaign is crafted to work synchronously and compound your brand's market value."}
          </p>
        </div>
      </div>
    </section>
  );
};
