"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Sparkles, CheckCircle2 } from "lucide-react";
import { Header } from "@/components/navigation/Header";
import { CustomCursor } from "@/components/cursor/CustomCursor";
import { Footer } from "@/components/navigation/Footer";
import { ProjectDiscoveryWizard } from "@/components/discovery/ProjectDiscoveryWizard";
import { REAL_PROJECTS, PROJECTS_LIST } from "@/data/projects";
import { useLocale } from "@/context/LocaleContext";

export default function WorkPage() {
  const { locale, isAr } = useLocale();
  const [activeFilter, setActiveFilter] = useState<"ALL" | "ENGINEERING" | "CREATIVE" | "MARKETING" | "HYBRID">("ALL");
  const [isWizardOpen, setIsWizardOpen] = useState(false);

  const filtered =
    activeFilter === "ALL"
      ? PROJECTS_LIST
      : PROJECTS_LIST.filter((p) => p.category === activeFilter);

  const filterTabs = [
    { id: "ALL", labelEn: "All Works", labelAr: "كافة المشاريع" },
    { id: "ENGINEERING", labelEn: "⚡ Engineering & SaaS", labelAr: "⚡ البرمجيات والأنظمة" },
    { id: "CREATIVE", labelEn: "🎨 Brand & 3D Design", labelAr: "🎨 الهويات والتصميم" },
    { id: "MARKETING", labelEn: "📈 Growth & Performance", labelAr: "📈 التسويق والنمو" },
    { id: "HYBRID", labelEn: "✦ Multi-Discipline", labelAr: "✦ مشاريع هجينة متكاملة" },
  ];

  return (
    <main
      dir={isAr ? "rtl" : "ltr"}
      className={`min-h-screen bg-[#07070A] text-white pt-32 pb-24 ${isAr ? "font-arabic" : "font-sans"}`}
    >
      <CustomCursor />
      <Header onOpenProjectBuilder={() => setIsWizardOpen(true)} />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Page Header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-emerald-400 mb-4 font-bold">
            <Sparkles size={13} />
            <span>{isAr ? "سجل الأعمال والمشاريع الحقيقية // 2024–2026" : "VERIFIED PRODUCTION FOLIO // 2024–2026"}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight text-white mb-6 leading-tight">
            {isAr ? "مشاريع حية تشكّل معيار التميز الرقمي" : "Production Systems & Brand Transformations"}
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed">
            {isAr
              ? "مجموعة مختارة من المنصات البرمجية، الهويات الملكية، والحملات التسويقية التي تم بناؤها وتشغيلها بعوائد وأرقام حقيقية موثقة."
              : "A curated index of production software platforms, luxury brand identities, and high-ROAS marketing campaigns with verifiable business outcomes."}
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-2.5 pb-8 mb-12 border-b border-white/10">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id as any)}
              className={`px-4 sm:px-5 py-2.5 rounded-full text-xs font-mono font-bold tracking-wider uppercase transition-all duration-200 border ${
                activeFilter === tab.id
                  ? "bg-white text-black border-white shadow-lg shadow-white/10 scale-[1.02]"
                  : "bg-white/5 text-slate-300 border-white/10 hover:border-white/25 hover:text-white hover:bg-white/10"
              }`}
            >
              {isAr ? tab.labelAr : tab.labelEn}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {filtered.map((proj) => (
            <Link
              key={proj.slug}
              href={`/work/${proj.slug}`}
              className="group rounded-3xl bg-soft-black border border-white/10 overflow-hidden hover:border-white/30 transition-all duration-500 flex flex-col justify-between shadow-2xl"
              data-cursor="VIEW"
            >
              {/* Card Banner */}
              <div className={`h-72 sm:h-80 w-full bg-gradient-to-br ${proj.accentGradient} p-7 sm:p-8 flex flex-col justify-between relative`}>
                <div className="flex items-center justify-between">
                  <span className="px-3.5 py-1 rounded-full bg-obsidian/85 backdrop-blur-md border border-white/15 text-[11px] font-mono font-bold text-white shadow-sm">
                    {proj.category}
                  </span>
                  <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all shadow-md">
                    <ArrowUpRight size={18} />
                  </div>
                </div>

                <div>
                  <span className="text-xs font-mono text-white/70 block mb-1 font-semibold">
                    {isAr ? `${proj.clientAr} • ${proj.locationAr}` : `${proj.clientEn} • ${proj.locationEn}`}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-white group-hover:text-emerald-300 transition-colors leading-snug">
                    {isAr ? proj.titleAr : proj.titleEn}
                  </h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-7 sm:p-8 flex flex-col flex-1 justify-between">
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
                  {isAr ? proj.descAr : proj.descEn}
                </p>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-3 pt-5 border-t border-white/10 mb-5">
                  {proj.metrics.slice(0, 2).map((m, mIdx) => (
                    <div key={mIdx} className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                      <span className="text-lg font-display font-black text-emerald-400 block">{m.value}</span>
                      <span className="text-[10px] font-mono text-slate-400 uppercase font-semibold">{isAr ? m.labelAr : m.labelEn}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/5 text-xs font-mono text-slate-400">
                  <span className="font-bold">{isAr ? "التقنيات والنطاق:" : "STACK & SCOPE:"}</span>
                  <span className="text-white truncate max-w-[220px]">{proj.stack.slice(0, 3).join(" • ")}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <Footer />

      <ProjectDiscoveryWizard
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
        locale={locale}
      />
    </main>
  );
}