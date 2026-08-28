"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Check, Clock, Sparkles } from "lucide-react";
import { Header } from "@/components/navigation/Header";
import { CustomCursor } from "@/components/cursor/CustomCursor";
import { DisciplineShowcaseModal } from "@/components/showcase/DisciplineShowcaseModal";
import { DISCIPLINES, type DisciplineId } from "@/data/disciplines";
import { useLocale } from "@/context/LocaleContext";

export default function ServicesPage() {
  const { locale, isAr } = useLocale();
  const [selectedDiscipline, setSelectedDiscipline] = useState<DisciplineId | null>(null);

  const disciplineList: DisciplineId[] = [
    "uiux", "engineering", "branding", "ai", "motion", "marketing",
  ];

  return (
    <main
      dir={isAr ? "rtl" : "ltr"}
      className={`min-h-screen bg-[#07070A] text-white pt-32 pb-24 ${isAr ? "font-arabic" : "font-sans"}`}
    >
      <CustomCursor />
      <Header onOpenProjectBuilder={() => setSelectedDiscipline("uiux")} />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Page Title */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-emerald-400 mb-4">
            <Sparkles size={13} />
            <span>{isAr ? "الخدمات والمخرجات الكاملة" : "CORE DISCIPLINES & DELIVERABLES"}</span>
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-black tracking-tight text-white mb-6">
            {isAr ? "تكنولوجيا × تصميم × تسويق" : "Engineering × Design × Marketing"}
          </h1>
          <p className="text-neutral-cool text-base sm:text-lg max-w-2xl leading-relaxed">
            {isAr
              ? "نقدم 6 تخصصات متكاملة لبناء وتطوير وتسويق المنتجات الرقمية الفاخرة بأعلى المعايير العالمية."
              : "6 integrated disciplines engineered to build, launch, and scale exceptional digital products."}
          </p>
        </div>

        {/* 6 Discipline Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {disciplineList.map((id) => {
            const item = DISCIPLINES[id];
            return (
              <div
                key={id}
                onClick={() => setSelectedDiscipline(id)}
                className="group p-8 rounded-3xl bg-soft-black border border-white/10 hover:border-white/25 transition-all duration-300 flex flex-col justify-between cursor-pointer shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider border ${item.badgeBg} ${item.badgeBorder} ${item.badgeText}`}>
                      {id.toUpperCase()}
                    </span>
                    <div className="flex items-center gap-1 text-[11px] font-mono text-white/50">
                      <Clock size={11} className="text-emerald-400" />
                      <span>{isAr ? item.timelineAr : item.timelineEn}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-display font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                    {isAr ? item.nameAr : item.nameEn}
                  </h3>
                  <p className="text-neutral-cool text-xs leading-relaxed mb-6">
                    {isAr ? item.taglineAr : item.taglineEn}
                  </p>
                  <div className="space-y-2 pt-4 border-t border-white/5">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-white/40 block mb-2 font-bold">
                      {isAr ? "المخرجات الأساسية:" : "KEY DELIVERABLES:"}
                    </span>
                    {item.deliverables.map((del, dIdx) => (
                      <div key={dIdx} className="flex items-center gap-2 text-xs text-white/80 font-medium">
                        <Check size={13} className="text-emerald-400 flex-shrink-0" />
                        <span className="truncate">{isAr ? del.titleAr : del.titleEn}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xs font-mono text-white/40 group-hover:text-white transition-colors">
                    {isAr ? "عرض التفاصيل والمخرجات" : "EXPLORE DELIVERABLES"}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-white group-hover:text-black text-white flex items-center justify-center transition-all">
                    <ArrowUpRight size={14} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Banner */}
        <div className="p-10 sm:p-14 rounded-3xl bg-gradient-to-br from-white/[0.05] via-soft-black to-black border border-white/15 text-center flex flex-col items-center shadow-2xl">
          <h3 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4">
            {isAr ? "لديك مشروع يجمع أكثر من تخصص؟" : "Need a Multi-Discipline Initiative?"}
          </h3>
          <p className="text-neutral-cool text-sm max-w-lg mb-8 leading-relaxed">
            {isAr
              ? "نحن متخصصون في دمج الهندسة والتصميم والتسويق في آن واحد."
              : "We seamlessly unite engineering, brand design, and marketing strategy under one studio roof."}
          </p>
          <button
            onClick={() => setSelectedDiscipline("uiux")}
            className="px-8 py-4 rounded-full bg-white text-black font-bold text-xs tracking-widest uppercase flex items-center gap-3 hover:bg-neutral-200 transition-all shadow-2xl hover:scale-105"
          >
            <span>{isAr ? "ابدأ مشروعك الآن" : "START A PROJECT"}</span>
            <ArrowUpRight size={16} />
          </button>
        </div>
      </div>

      {selectedDiscipline && (
        <DisciplineShowcaseModal
          isOpen={true}
          onClose={() => setSelectedDiscipline(null)}
          initialDiscipline={selectedDiscipline}
        />
      )}
    </main>
  );
}