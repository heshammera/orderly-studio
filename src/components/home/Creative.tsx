"use client";

import React, { useState } from "react";
import { Palette, Layout, Box, Film, Camera, Sparkles, Wand2 } from "lucide-react";

interface CreativeProps {
  locale: "en" | "ar";
}

export const Creative: React.FC<CreativeProps> = ({ locale }) => {
  const isAr = locale === "ar";
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(0);

  const creativeDisciplines = [
    {
      id: "brand",
      title: isAr ? "الهوية البصرية والعلامة التجارية" : "Brand Identity & Systems",
      desc: isAr
        ? "تصميم هويات متكاملة، استراتيجية التموضع، خطوط مخصصة، ودلائل الاستخدام الشاملة."
        : "Complete identity systems, strategic positioning, proprietary typography, and comprehensive design guides.",
      accent: "from-orange-500/20 to-rose-500/20",
    },
    {
      id: "uiux",
      title: isAr ? "تصميم الواجهات وتجربة المستخدم" : "UI / UX & Product Design",
      desc: isAr
        ? "هندسة تجارب تفاعلية فخمة وسلسة ترفع معدلات التحويل وتترك انطباعاً استثنائياً."
        : "Ultra-premium interfaces, micro-interactions, conversion flows, and coherent design tokens.",
      accent: "from-rose-500/20 to-amber-500/20",
    },
    {
      id: "packaging",
      title: isAr ? "تصميم التغليف والمواد الملموسة" : "Packaging & Physical Media",
      desc: isAr
        ? "تطوير علب وتغليف المنتجات الملموسة بأفخر الخامات وتقنيات الطباعة العالمية."
        : "Tactile product unboxing experiences, material curation, structural packaging, and print finishing.",
      accent: "from-amber-500/20 to-orange-500/20",
    },
    {
      id: "motion3d",
      title: isAr ? "الموشن جرافيكس والرسوم ثلاثية الأبعاد" : "Motion Design & 3D Art",
      desc: isAr
        ? "صناعة فيديوهات متحركة سينمائية وتجسيد ثلاثي الأبعاد للمنتجات الرقمية والمادية."
        : "Cinematic brand films, 3D product animations, particle shaders, and spatial interactive assets.",
      accent: "from-red-500/20 to-rose-500/20",
    },
    {
      id: "photo",
      title: isAr ? "التصوير الفني والإخراج الإبداعي" : "Art Direction & Editorial",
      desc: isAr
        ? "إخراج فني لجلسات التصوير التجاري والتحريري لتقديم علامتك التجارية بأرقى صورة."
        : "Art directed studio campaigns, editorial still life, and high-fidelity brand imagery.",
      accent: "from-orange-600/20 to-yellow-500/20",
    },
  ];

  return (
    <section className="py-28 bg-off-white text-obsidian overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-neutral-warm/20 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-creative-coral/10 border border-creative-coral/20 text-creative-coral text-xs font-mono mb-4">
              <span>{isAr ? "عالم الإبداع والتصميم" : "03 // CREATIVE DISCIPLINE"}</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-obsidian">
              {isAr ? "نشكّل هويات تترك أثراً" : "Crafted with Aesthetic Intent"}
            </h2>
          </div>
          <p className="text-neutral-warm text-sm font-mono max-w-sm">
            {isAr
              ? "تصميم تحريري ذكي يمنح علامتك التجارية صوتاً بصرياً قوياً في السوق العالمي."
              : "Editorial art direction and spatial design that elevates brands from generic to unforgettable."}
          </p>
        </div>

        {/* Large Typographic Stack with Visual Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Typographic Stack */}
          <div className="lg:col-span-7 flex flex-col divide-y divide-neutral-warm/15">
            {creativeDisciplines.map((item, idx) => {
              const active = hoveredIdx === idx;
              return (
                <div
                  key={item.id}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  className="py-6 cursor-pointer group transition-all duration-300"
                  data-cursor="EXPLORE"
                >
                  <div className="flex items-center justify-between">
                    <h3
                      className={`text-2xl sm:text-4xl font-display font-bold transition-all duration-300 ${
                        active
                          ? "text-creative-coral translate-x-2 rtl:-translate-x-2"
                          : "text-obsidian group-hover:text-creative-coral/80"
                      }`}
                    >
                      {item.title}
                    </h3>
                    <span className="font-mono text-xs text-neutral-warm">0{idx + 1}</span>
                  </div>
                  {active && (
                    <p className="text-neutral-warm text-sm sm:text-base mt-3 max-w-xl leading-relaxed animate-in fade-in duration-200">
                      {item.desc}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Visual Art Card */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl bg-white border border-neutral-warm/20 p-8 sm:p-12 shadow-xl flex flex-col justify-between h-[420px] relative overflow-hidden">
              <div
                className={`absolute inset-0 bg-gradient-to-br ${
                  hoveredIdx !== null ? creativeDisciplines[hoveredIdx].accent : "from-orange-500/10 to-rose-500/10"
                } transition-colors duration-500 pointer-events-none`}
              />

              <div className="relative z-10 flex items-center justify-between">
                <span className="text-xs font-mono text-creative-coral uppercase tracking-widest font-bold">
                  {isAr ? "المعيار الجمالي" : "AESTHETIC STANDARD"}
                </span>
                <span className="text-xs font-mono text-neutral-warm">
                  0{hoveredIdx !== null ? hoveredIdx + 1 : 1} / 05
                </span>
              </div>

              <div className="relative z-10 my-auto text-center">
                <h4 className="text-3xl font-display font-black text-obsidian tracking-tight mb-2">
                  {hoveredIdx !== null ? creativeDisciplines[hoveredIdx].title : "ORDERLY CREATIVE"}
                </h4>
                <p className="text-neutral-warm text-xs font-mono uppercase tracking-wider">
                  {isAr ? "دقة في التفاصيل • فخامة في التعبير" : "Editorial Precision • Tactile Luxury"}
                </p>
              </div>

              <div className="relative z-10 pt-4 border-t border-neutral-warm/20 flex items-center justify-between text-xs font-mono text-neutral-warm">
                <span>STUDIO DISCIPLINE</span>
                <span className="font-bold text-obsidian">ORDERLY × CRAFT</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
