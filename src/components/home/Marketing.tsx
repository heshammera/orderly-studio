"use client";

import React, { useState } from "react";
import {
  Megaphone,
  TrendingUp,
  Mail,
  Share2,
  Search,
  BarChart3,
  Zap,
  Globe2,
} from "lucide-react";

interface MarketingProps {
  locale: "en" | "ar";
}

export const Marketing: React.FC<MarketingProps> = ({ locale }) => {
  const isAr = locale === "ar";
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(0);

  const marketingDisciplines = [
    {
      id: "strategy",
      icon: <TrendingUp size={20} />,
      title: isAr ? "استراتيجية التسويق الرقمي" : "Digital Marketing Strategy",
      desc: isAr
        ? "بناء خرائط تسويقية شاملة تجمع بين البيانات والإبداع لرفع الوعي بالعلامة التجارية وتحقيق الأهداف."
        : "Full-funnel marketing roadmaps driven by data, audience intelligence, and creative execution.",
      accent: "from-emerald-500/20 to-teal-500/20",
      color: "text-emerald-400",
    },
    {
      id: "seo",
      icon: <Search size={20} />,
      title: isAr ? "تحسين محركات البحث SEO" : "SEO & Organic Growth",
      desc: isAr
        ? "تحسين تقني ومحتوى متخصص يضع موقعك في صدارة نتائج البحث وينمو بشكل عضوي مستدام."
        : "Technical SEO, semantic content architecture, and link strategies that compound over time.",
      accent: "from-teal-500/20 to-cyan-500/20",
      color: "text-teal-400",
    },
    {
      id: "social",
      icon: <Share2 size={20} />,
      title: isAr ? "إدارة منصات التواصل الاجتماعي" : "Social Media & Content",
      desc: isAr
        ? "إنتاج محتوى إبداعي واستراتيجية نشر احترافية تبني مجتمعاً نشطاً حول علامتك التجارية."
        : "Platform-native content production, community management, and brand voice orchestration.",
      accent: "from-cyan-500/20 to-sky-500/20",
      color: "text-cyan-400",
    },
    {
      id: "performance",
      icon: <BarChart3 size={20} />,
      title: isAr ? "الإعلانات المدفوعة وتحسين الأداء" : "Paid Media & Performance",
      desc: isAr
        ? "إدارة حملات Google وMeta وTikTok بمنهجية علمية تعظم العائد على الاستثمار بأقل تكلفة اكتساب."
        : "Data-driven paid campaigns across Google, Meta, TikTok, and programmatic with continuous CPA optimization.",
      accent: "from-sky-500/20 to-blue-500/20",
      color: "text-sky-400",
    },
    {
      id: "email",
      icon: <Mail size={20} />,
      title: isAr ? "التسويق عبر البريد الإلكتروني" : "Email & CRM Automation",
      desc: isAr
        ? "تصميم رحلات بريدية مخصصة وأتمتة CRM تحوّل العملاء المحتملين إلى عملاء دائمين."
        : "Personalized drip sequences, behavioral triggers, and CRM automation that convert and retain.",
      accent: "from-blue-500/20 to-violet-500/20",
      color: "text-blue-400",
    },
    {
      id: "analytics",
      icon: <Zap size={20} />,
      title: isAr ? "التحليلات والتقارير الذكية" : "Analytics & Intelligent Reporting",
      desc: isAr
        ? "لوحات تحكم تحليلية مباشرة تترجم البيانات الخام إلى قرارات تسويقية أكثر ذكاءً وسرعة."
        : "Real-time dashboards, attribution modelling, and AI-assisted insights that accelerate decisions.",
      accent: "from-violet-500/20 to-emerald-500/20",
      color: "text-violet-400",
    },
  ];

  return (
    <section
      id="marketing"
      className="py-28 bg-obsidian text-white border-t border-white/10 overflow-hidden relative"
    >
      {/* Background ambient glow for marketing world */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-emerald-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-white/10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-mono mb-5">
              <Megaphone size={13} />
              <span>{isAr ? "عالم التسويق الرقمي" : "04 // MARKETING DISCIPLINE"}</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-white">
              {isAr ? "نصل إلى الجمهور الصحيح" : "Reach. Engage. Convert."}
            </h2>
          </div>
          <p className="text-neutral-cool text-sm font-mono max-w-sm leading-relaxed">
            {isAr
              ? "استراتيجيات تسويقية مبنية على البيانات والإبداع معاً لبناء حضور رقمي مؤثر وقابل للقياس."
              : "Data-intelligence meets creative storytelling to build measurable brand reach and revenue growth."}
          </p>
        </div>

        {/* Interactive Service Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Discipline List */}
          <div className="lg:col-span-7 flex flex-col divide-y divide-white/8">
            {marketingDisciplines.map((item, idx) => {
              const active = hoveredIdx === idx;
              return (
                <div
                  key={item.id}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  className="py-6 cursor-pointer group transition-all duration-300"
                  data-cursor="EXPLORE"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 ${
                          active
                            ? `bg-emerald-500/20 ${item.color}`
                            : "bg-white/5 text-white/40 group-hover:bg-white/10"
                        }`}
                      >
                        {item.icon}
                      </div>
                      <h3
                        className={`text-xl sm:text-3xl font-display font-bold transition-all duration-300 ${
                          active
                            ? `${item.color} translate-x-1 rtl:-translate-x-1`
                            : "text-white group-hover:text-emerald-400/80"
                        }`}
                      >
                        {item.title}
                      </h3>
                    </div>
                    <span className="font-mono text-xs text-white/30">0{idx + 1}</span>
                  </div>
                  {active && (
                    <p className="text-neutral-cool text-sm sm:text-base mt-4 max-w-xl leading-relaxed animate-in fade-in slide-in-from-bottom-2 duration-300 pl-[52px] rtl:pl-0 rtl:pr-[52px]">
                      {item.desc}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right: Visual Preview Card */}
          <div className="lg:col-span-5 sticky top-24">
            <div className="rounded-3xl bg-soft-black border border-white/10 p-8 sm:p-10 shadow-2xl flex flex-col justify-between min-h-[420px] relative overflow-hidden">
              {/* Dynamic gradient background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${
                  hoveredIdx !== null
                    ? marketingDisciplines[hoveredIdx].accent
                    : "from-emerald-500/10 to-teal-500/10"
                } transition-all duration-700 pointer-events-none`}
              />

              <div className="relative z-10 flex items-center justify-between">
                <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest font-bold">
                  {isAr ? "الأداء التسويقي" : "GROWTH ENGINE"}
                </span>
                <span className="text-xs font-mono text-white/30">
                  0{hoveredIdx !== null ? hoveredIdx + 1 : 1} / 06
                </span>
              </div>

              <div className="relative z-10 my-auto text-center">
                {/* Animated icon ring */}
                <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-5">
                  <div
                    className={`${
                      hoveredIdx !== null
                        ? marketingDisciplines[hoveredIdx].color
                        : "text-emerald-400"
                    } transition-colors duration-500`}
                  >
                    {hoveredIdx !== null ? (
                      React.cloneElement(
                        marketingDisciplines[hoveredIdx].icon as React.ReactElement,
                        { size: 36 }
                      )
                    ) : (
                      <Globe2 size={36} />
                    )}
                  </div>
                </div>
                <h4 className="text-2xl font-display font-black text-white tracking-tight mb-2">
                  {hoveredIdx !== null
                    ? marketingDisciplines[hoveredIdx].title
                    : "ORDERLY MARKETING"}
                </h4>
                <p className="text-neutral-cool text-xs font-mono uppercase tracking-wider">
                  {isAr
                    ? "بيانات دقيقة • إبداع موجّه • نتائج قابلة للقياس"
                    : "Data Precision • Creative Reach • Measurable Growth"}
                </p>
              </div>

              {/* Footer Stats */}
              <div className="relative z-10 pt-5 border-t border-white/10 grid grid-cols-3 gap-2 text-center">
                {[
                  { label: isAr ? "قنوات" : "Channels", value: "12+" },
                  { label: isAr ? "منصة" : "Platforms", value: "8" },
                  { label: isAr ? "خدمة" : "Services", value: "06" },
                ].map((stat, i) => (
                  <div key={i}>
                    <span className="text-xl font-display font-black text-white block">{stat.value}</span>
                    <span className="text-[10px] font-mono text-neutral-cool uppercase">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};