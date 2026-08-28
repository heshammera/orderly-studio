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
  ChevronDown,
  Layers,
} from "lucide-react";

interface MarketingProps {
  locale: "en" | "ar";
}

export const Marketing: React.FC<MarketingProps> = ({ locale }) => {
  const isAr = locale === "ar";
  const [activeIdx, setActiveIdx] = useState<number>(0);

  const marketingDisciplines = [
    {
      id: "strategy",
      icon: <TrendingUp size={20} />,
      title: isAr ? "استراتيجية التسويق الرقمي" : "Digital Marketing Strategy",
      desc: isAr
        ? "بناء خرائط تسويقية شاملة تجمع بين تحليل البيانات والإبداع لرفع الوعي بالعلامة التجارية ومضاعفة المبيعات."
        : "Full-funnel marketing roadmaps driven by data intelligence, audience profiling, and creative execution.",
      featuresAr: ["خريطة نمو شاملة", "دراسة السوق والمنافسين", "تحديد قنوات الاستحواذ"],
      featuresEn: ["Full-Funnel Blueprint", "Competitive Audit", "Channel Allocation"],
      accent: "from-emerald-500/20 to-teal-500/20",
      color: "text-emerald-400",
    },
    {
      id: "seo",
      icon: <Search size={20} />,
      title: isAr ? "تحسين محركات البحث SEO" : "SEO & Organic Growth",
      desc: isAr
        ? "تهيئة تقنية ومحتوى متخصص يضع موقعك في صدارة نتائج البحث لجلب زيارات مجانية مستدامة."
        : "Technical SEO, semantic content architecture, and link strategies that compound over time.",
      featuresAr: ["تهيئة Core Web Vitals", "استهداف الكلمات الأكثر طلباً", "تصدر النتائج الأولى"],
      featuresEn: ["Technical Core Vitals", "High-Intent Keyword Map", "#1 Organic Rankings"],
      accent: "from-teal-500/20 to-cyan-500/20",
      color: "text-teal-400",
    },
    {
      id: "social",
      icon: <Share2 size={20} />,
      title: isAr ? "إدارة منصات التواصل الاجتماعي" : "Social Media & Content",
      desc: isAr
        ? "إنتاج محتوى بصري وفيديوهات إبداعية تبني مجتمعاً نشطاً وتزيد تفاعل العملاء مع علامتك."
        : "Platform-native content production, community management, and brand voice orchestration.",
      featuresAr: ["صناعة محتوى إبداعي", "خطة نشر وتوزيع شهرية", "بناء مجتمع متفاعل"],
      featuresEn: ["Platform-Native Content", "Monthly Content Calendar", "Community Engagement"],
      accent: "from-cyan-500/20 to-sky-500/20",
      color: "text-cyan-400",
    },
    {
      id: "performance",
      icon: <BarChart3 size={20} />,
      title: isAr ? "الإعلانات المدفوعة وتحسين الأداء" : "Paid Media & Performance",
      desc: isAr
        ? "إدارة حملات Google وMeta وTikTok بمنهجية علمية تعظم العائد على الاستثمار (ROAS) بأقل تكلفة اكتساب."
        : "Data-driven paid campaigns across Google, Meta, TikTok, and programmatic with continuous CPA optimization.",
      featuresAr: ["حملات إعلانات ممولة", "عائد استثماري ROAS عالي", "استهداف دقيق للمشترين"],
      featuresEn: ["High-ROAS Paid Ads", "A/B Creative Testing", "Pixel & API Tracking"],
      accent: "from-sky-500/20 to-blue-500/20",
      color: "text-sky-400",
    },
    {
      id: "email",
      icon: <Mail size={20} />,
      title: isAr ? "التسويق عبر البريد الإلكتروني وأتمتة CRM" : "Email & CRM Automation",
      desc: isAr
        ? "تصميم رحلات بريدية مخصصة وأتمتة CRM تحوّل العملاء المحتملين إلى مشترين دائمين."
        : "Personalized drip sequences, behavioral triggers, and CRM automation that convert and retain.",
      featuresAr: ["رسائل بريدية مؤتمتة", "استرداد السلات المتروكة", "مضاعفة عمليات الشراء"],
      featuresEn: ["Automated Drip Sequences", "Abandoned Cart Recovery", "Customer Retention"],
      accent: "from-blue-500/20 to-violet-500/20",
      color: "text-blue-400",
    },
    {
      id: "analytics",
      icon: <Zap size={20} />,
      title: isAr ? "التحليلات والتقارير الذكية" : "Analytics & Intelligent Reporting",
      desc: isAr
        ? "لوحات تحكم تحليلية مباشرة تترجم البيانات الخام إلى قرارات تسويقية دقيقة لزيادة الأرباح."
        : "Real-time dashboards, attribution modelling, and AI-assisted insights that accelerate growth decisions.",
      featuresAr: ["لوحات تحكم حية", "تقارير أداء أسبوعية", "تتبع دقيق للعائد المالي"],
      featuresEn: ["Live ROI Dashboards", "Attribution Modeling", "Executive Growth Reports"],
      accent: "from-violet-500/20 to-emerald-500/20",
      color: "text-violet-400",
    },
  ];

  const currentItem = marketingDisciplines[activeIdx] || marketingDisciplines[0];

  return (
    <section
      id="marketing"
      className="py-28 bg-obsidian text-white border-t border-white/10 overflow-hidden relative"
      dir={isAr ? "rtl" : "ltr"}
    >
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-emerald-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-white/10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-mono mb-4 font-bold">
              <Megaphone size={13} />
              <span>{isAr ? "04 // عالم التسويق والنمو" : "04 // MARKETING DISCIPLINE"}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight text-white leading-tight">
              {isAr ? "نصل إلى الجمهور الصحيح بالرسالة الصحيحة" : "Reach. Engage. Convert."}
            </h2>
          </div>

          <p className="text-slate-300 text-sm font-medium max-w-md leading-relaxed">
            {isAr
              ? "استراتيجيات تسويقية مبنية على تحليل البيانات والإبداع لبناء حضور رقمي مؤثر وقابل للقياس."
              : "Data-intelligence meets creative storytelling to build measurable brand reach and revenue growth."}
          </p>
        </div>

        {/* ── Responsive Dual Layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left: Interactive List / Mobile Accordion */}
          <div className="lg:col-span-7 flex flex-col divide-y divide-white/10">
            {marketingDisciplines.map((item, idx) => {
              const active = activeIdx === idx;
              return (
                <div
                  key={item.id}
                  onClick={() => setActiveIdx(idx)}
                  className={`py-5 sm:py-6 cursor-pointer transition-all duration-300 group ${
                    active ? "bg-white/[0.04] px-4 -mx-4 rounded-2xl" : ""
                  }`}
                  data-cursor="EXPLORE"
                >
                  {/* Title Row */}
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                          active
                            ? `bg-emerald-500/20 ${item.color} border border-emerald-500/30 shadow-md`
                            : "bg-white/5 text-white/40 group-hover:bg-white/10 group-hover:text-white"
                        }`}
                      >
                        {item.icon}
                      </div>

                      <h3
                        className={`text-lg sm:text-2xl md:text-3xl font-display font-bold transition-all duration-200 ${
                          active
                            ? `${item.color}`
                            : "text-white group-hover:text-emerald-400/90"
                        }`}
                      >
                        {item.title}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="font-mono text-xs font-bold text-white/40">0{idx + 1}</span>
                      <ChevronDown
                        size={16}
                        className={`text-white/40 transition-transform duration-300 lg:hidden ${
                          active ? "rotate-180 text-emerald-400" : ""
                        }`}
                      />
                    </div>
                  </div>

                  {/* Mobile & Desktop Inline Content */}
                  {active && (
                    <div className="mt-4 pt-3 border-t border-white/10 animate-in fade-in slide-in-from-top-2 duration-300">
                      <p className="text-slate-200 text-sm sm:text-base leading-relaxed mb-4">
                        {item.desc}
                      </p>

                      {/* Mobile Inline Deliverables Badges */}
                      <div className="flex flex-wrap gap-2 pt-1">
                        {(isAr ? item.featuresAr : item.featuresEn).map((feat, fIdx) => (
                          <span
                            key={fIdx}
                            className="text-xs font-mono font-medium px-3 py-1 rounded-full bg-white/10 border border-white/15 text-white shadow-sm"
                          >
                            ✦ {feat}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right: Desktop Visual Preview Card (Hidden on mobile to eliminate detached bottom jumping) */}
          <div className="hidden lg:block lg:col-span-5 sticky top-32">
            <div className="rounded-3xl bg-soft-black border border-white/15 p-8 sm:p-10 shadow-2xl flex flex-col justify-between min-h-[440px] relative overflow-hidden transition-all duration-500">
              {/* Dynamic gradient background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${currentItem.accent} transition-all duration-700 pointer-events-none`}
              />

              <div className="relative z-10 flex items-center justify-between">
                <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest font-bold flex items-center gap-2">
                  <Megaphone size={13} />
                  <span>{isAr ? "محرك النمو والأداء" : "GROWTH ENGINE"}</span>
                </span>
                <span className="text-xs font-mono font-bold text-white/60 px-2.5 py-1 rounded-full bg-white/10 border border-white/15">
                  0{activeIdx + 1} / 06
                </span>
              </div>

              <div className="relative z-10 my-auto text-center">
                {/* Animated icon ring */}
                <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <div className={`${currentItem.color} transition-colors duration-500`}>
                    {React.cloneElement(currentItem.icon as React.ReactElement, { size: 30 })}
                  </div>
                </div>

                <h4 className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight mb-2">
                  {currentItem.title}
                </h4>

                <p className="text-slate-300 text-xs font-mono uppercase tracking-wider">
                  {isAr
                    ? "بيانات دقيقة • إبداع موجّه • نتائج قابلة للقياس"
                    : "Data Precision • Creative Reach • Measurable Growth"}
                </p>
              </div>

              {/* Footer Stats */}
              <div className="relative z-10 pt-5 border-t border-white/10 grid grid-cols-3 gap-2 text-center">
                {[
                  { label: isAr ? "قنوات إعلانية" : "Channels", value: "12+" },
                  { label: isAr ? "منصات نمو" : "Platforms", value: "8" },
                  { label: isAr ? "خدمات متكاملة" : "Services", value: "06" },
                ].map((stat, i) => (
                  <div key={i}>
                    <span className="text-lg font-display font-black text-white block">{stat.value}</span>
                    <span className="text-[10px] font-mono text-slate-300 uppercase font-semibold">{stat.label}</span>
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