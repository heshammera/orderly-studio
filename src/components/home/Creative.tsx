"use client";

import React, { useState } from "react";
import {
  Palette,
  Layout,
  Box,
  Film,
  Camera,
  Sparkles,
  TrendingUp,
  ChevronDown,
  ArrowUpRight,
  Layers,
} from "lucide-react";

interface CreativeProps {
  locale: "en" | "ar";
}

export const Creative: React.FC<CreativeProps> = ({ locale }) => {
  const isAr = locale === "ar";
  const [activeIdx, setActiveIdx] = useState<number>(0);

  const creativeDisciplines = [
    {
      id: "brand",
      title: isAr ? "الهوية البصرية والعلامة التجارية" : "Brand Identity & Systems",
      desc: isAr
        ? "تصميم هويات بصرية ملكية متكاملة، استراتيجية التموضع، خطوط مخصصة، ودلائل الاستخدام الشاملة."
        : "Complete identity systems, strategic positioning, proprietary typography, and comprehensive design guides.",
      featuresAr: ["شعار ملكي وأيقونات", "لوحة ألوان وخطوط", "كتاب إرشادات الهوية"],
      featuresEn: ["Royal Logo & Monograms", "Typography Architecture", "Brand Guidelines"],
      accent: "from-orange-500/20 to-rose-500/20",
      accentColor: "text-orange-500",
      icon: <Palette className="w-5 h-5" />,
    },
    {
      id: "uiux",
      title: isAr ? "تصميم الواجهات وتجربة المستخدم" : "UI / UX & Product Design",
      desc: isAr
        ? "هندسة تجارب تفاعلية فخمة وسلسة ترفع معدلات التحويل وتترك انطباعاً استثنائياً لا يُنسى."
        : "Ultra-premium interfaces, micro-interactions, conversion flows, and coherent design tokens.",
      featuresAr: ["شاشات التطبيق والموقع", "نظام تصميم Figma", "نماذج تفاعلية حية"],
      featuresEn: ["Mobile & Web Screens", "Figma Design System", "Interactive Prototype"],
      accent: "from-rose-500/20 to-amber-500/20",
      accentColor: "text-rose-500",
      icon: <Layout className="w-5 h-5" />,
    },
    {
      id: "marketing-creatives",
      title: isAr ? "المحتوى البصري والتسويق الإعلاني" : "Marketing Creatives & Ad Media",
      desc: isAr
        ? "تصميم إعلانات وبوسترات بصرية جذابة مهيأة لتحقيق أعلى معدل نقر وتحويل في الحملات الممولة."
        : "High-converting visual ad creatives, social campaign assets, and landing graphics engineered for peak ROAS.",
      featuresAr: ["تصاميم إعلانات ممولة", "قوالب سوشيال ميديا", "صفحات هبوط تسويقية"],
      featuresEn: ["Paid Ad Creatives", "Social Templates", "High-Converting Landers"],
      accent: "from-emerald-500/20 to-teal-500/20",
      accentColor: "text-emerald-500",
      icon: <TrendingUp className="w-5 h-5" />,
    },
    {
      id: "packaging",
      title: isAr ? "تصميم التغليف والمواد الملموسة" : "Packaging & Physical Media",
      desc: isAr
        ? "تطوير علب وتغليف المنتجات الملموسة بأفخر الخامات وتقنيات الطباعة العالمية."
        : "Tactile product unboxing experiences, material curation, structural packaging, and print finishing.",
      featuresAr: ["علب وتغليف المنتجات", "بطاقات وأوراق رسمية", "ملفات جاهزة للطباعة"],
      featuresEn: ["Luxury Box Unboxing", "Corporate Stationery", "Print-Ready Vector Spec"],
      accent: "from-amber-500/20 to-orange-500/20",
      accentColor: "text-amber-500",
      icon: <Box className="w-5 h-5" />,
    },
    {
      id: "motion3d",
      title: isAr ? "الموشن جرافيكس والرسوم ثلاثية الأبعاد" : "Motion Design & 3D Art",
      desc: isAr
        ? "صناعة فيديوهات متحركة سينمائية وتجسيد ثلاثي الأبعاد للمنتجات الرقمية والمادية."
        : "Cinematic brand films, 3D product animations, particle shaders, and spatial interactive assets.",
      featuresAr: ["فيديوهات إعلانية 4K", "تحريك الشعار والواجهات", "مجسمات 3D تفاعلية"],
      featuresEn: ["4K Product Films", "Logo & UI Motion", "Interactive 3D GLB"],
      accent: "from-red-500/20 to-rose-500/20",
      accentColor: "text-red-500",
      icon: <Film className="w-5 h-5" />,
    },
    {
      id: "photo",
      title: isAr ? "التصوير الفني والإخراج الإبداعي" : "Art Direction & Editorial",
      desc: isAr
        ? "إخراج فني لجلسات التصوير التجاري والتحريري لتقديم علامتك التجارية بأرقى صورة."
        : "Art directed studio campaigns, editorial still life, and high-fidelity brand imagery.",
      featuresAr: ["إخراج فني للحملات", "تصوير فوتوغرافي راقٍ", "توجيه بصري متكامل"],
      featuresEn: ["Campaign Art Direction", "Editorial Still Life", "Master Brand Assets"],
      accent: "from-orange-600/20 to-yellow-500/20",
      accentColor: "text-orange-600",
      icon: <Camera className="w-5 h-5" />,
    },
  ];

  const currentItem = creativeDisciplines[activeIdx] || creativeDisciplines[0];

  return (
    <section className="py-28 bg-off-white text-obsidian overflow-hidden" dir={isAr ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-neutral-warm/20 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-creative-coral/10 border border-creative-coral/25 text-creative-coral text-xs font-mono mb-4 font-bold">
              <span>{isAr ? "عالم الإبداع والتصميم والتسويق" : "03 // CREATIVE & MARKETING CRAFT"}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight text-obsidian leading-tight">
              {isAr ? "نشكّل هويات ومحتوى يصنع الفارق" : "Crafted with Aesthetic & Commercial Intent"}
            </h2>
          </div>

          <p className="text-neutral-warm text-sm font-medium max-w-md leading-relaxed">
            {isAr
              ? "تصميم تحريري وهوية بصرية مدروسة ومحتوى إعلاني يمنح علامتك التجارية صوتاً قوياً ولافتاً في السوق."
              : "Editorial art direction, spatial brand identities, and high-impact marketing creatives that command attention."}
          </p>
        </div>

        {/* ── Responsive Dual Layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left: Interactive List / Mobile Accordion */}
          <div className="lg:col-span-7 flex flex-col divide-y divide-neutral-warm/20">
            {creativeDisciplines.map((item, idx) => {
              const active = activeIdx === idx;
              return (
                <div
                  key={item.id}
                  onClick={() => setActiveIdx(idx)}
                  className={`py-5 sm:py-6 cursor-pointer transition-all duration-300 group ${
                    active ? "bg-neutral-warm/[0.04] px-4 -mx-4 rounded-2xl" : ""
                  }`}
                  data-cursor="EXPLORE"
                >
                  {/* Title Row */}
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className={`p-2 rounded-xl transition-colors ${
                        active ? "bg-white shadow-sm text-creative-coral" : "bg-transparent text-neutral-warm group-hover:text-obsidian"
                      }`}>
                        {item.icon}
                      </span>
                      <h3
                        className={`text-lg sm:text-2xl md:text-3xl font-display font-bold transition-all duration-200 ${
                          active
                            ? "text-creative-coral"
                            : "text-obsidian group-hover:text-creative-coral/90"
                        }`}
                      >
                        {item.title}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="font-mono text-xs font-bold text-neutral-warm">0{idx + 1}</span>
                      <ChevronDown
                        size={16}
                        className={`text-neutral-warm transition-transform duration-300 lg:hidden ${
                          active ? "rotate-180 text-creative-coral" : ""
                        }`}
                      />
                    </div>
                  </div>

                  {/* Mobile & Desktop Inline Description */}
                  {active && (
                    <div className="mt-4 pt-3 border-t border-neutral-warm/15 animate-in fade-in slide-in-from-top-2 duration-300">
                      <p className="text-neutral-warm text-sm sm:text-base leading-relaxed mb-4">
                        {item.desc}
                      </p>

                      {/* Mobile Inline Deliverables & Badges (Solves the mobile UX issue completely) */}
                      <div className="flex flex-wrap gap-2 pt-1">
                        {(isAr ? item.featuresAr : item.featuresEn).map((feat, fIdx) => (
                          <span
                            key={fIdx}
                            className="text-xs font-mono font-medium px-3 py-1 rounded-full bg-white border border-neutral-warm/20 text-obsidian shadow-sm"
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

          {/* Right: Desktop Live Dynamic Visual Card (Hidden on small mobile screens to prevent detached scrolling) */}
          <div className="hidden lg:block lg:col-span-5 sticky top-32">
            <div className="rounded-3xl bg-white border border-neutral-warm/20 p-8 sm:p-10 shadow-xl flex flex-col justify-between h-[440px] relative overflow-hidden transition-all duration-500">
              {/* Dynamic Gradient Background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${currentItem.accent} transition-all duration-700 pointer-events-none`}
              />

              <div className="relative z-10 flex items-center justify-between">
                <span className="text-xs font-mono text-creative-coral uppercase tracking-widest font-bold flex items-center gap-2">
                  <Sparkles size={13} />
                  <span>{isAr ? "المعيار الجمالي والإبداعي" : "AESTHETIC & CREATIVE CRAFT"}</span>
                </span>
                <span className="text-xs font-mono font-bold text-neutral-warm px-2.5 py-1 rounded-full bg-white/80 border border-neutral-warm/20">
                  0{activeIdx + 1} / 06
                </span>
              </div>

              <div className="relative z-10 my-auto text-center">
                <div className="w-14 h-14 rounded-2xl bg-white shadow-md text-creative-coral flex items-center justify-center mx-auto mb-4">
                  {currentItem.icon}
                </div>

                <h4 className="text-2xl sm:text-3xl font-display font-black text-obsidian tracking-tight mb-2">
                  {currentItem.title}
                </h4>

                <p className="text-neutral-warm text-xs font-mono uppercase tracking-wider">
                  {isAr ? "دقة في التفاصيل • فخامة في التعبير • تأثير تسويقي" : "Editorial Precision • Tactile Luxury • Growth Impact"}
                </p>
              </div>

              <div className="relative z-10 pt-4 border-t border-neutral-warm/20 flex items-center justify-between text-xs font-mono text-neutral-warm">
                <div className="flex items-center gap-1.5 font-semibold text-obsidian">
                  <Layers size={13} />
                  <span>{isAr ? "مستوى استوديو عالمي" : "STUDIO GRADE"}</span>
                </div>
                <span className="font-bold text-creative-coral">ORDERLY × CRAFT</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
