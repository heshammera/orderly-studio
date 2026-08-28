"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, TrendingUp } from "lucide-react";
import { REAL_PROJECTS } from "@/data/projects";

interface MarketingWorkProps {
  locale: "en" | "ar";
  onOpenProjectBuilder: () => void;
}

export const MarketingWork: React.FC<MarketingWorkProps> = ({ locale, onOpenProjectBuilder }) => {
  const isAr = locale === "ar";

  const marketingProjects = [
    REAL_PROJECTS["maksab-growth"],
    REAL_PROJECTS["cadi-parfumerie"],
  ];

  return (
    <section className="py-24 bg-[#0A0B10] text-white border-t border-white/10" dir={isAr ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-mono mb-4 font-bold">
              <TrendingUp size={13} />
              <span>{isAr ? "حملات تسويقية ونتائج نمو حقيقية" : "SELECTED MARKETING WORK"}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight text-white leading-tight">
              {isAr ? "أرقام وإيرادات قابلة للقياس والتدقيق" : "Growth Engineered by Data"}
            </h2>
          </div>

          <Link
            href="/marketing"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400 hover:text-white transition-colors font-bold"
          >
            <span>{isAr ? "عرض كل الأعمال التسويقية ←" : "EXPLORE ALL MARKETING WORK →"}</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {marketingProjects.map((proj, idx) => (
            <Link
              key={idx}
              href={`/work/${proj.slug}`}
              className="group rounded-3xl bg-soft-black border border-white/10 overflow-hidden hover:border-emerald-500/40 transition-all duration-500 flex flex-col justify-between shadow-2xl"
              data-cursor="VIEW"
            >
              {/* Card Banner */}
              <div className={`h-64 sm:h-72 w-full bg-gradient-to-br ${proj.accentGradient} p-7 sm:p-8 flex flex-col justify-between relative`}>
                <div className="flex items-center justify-between">
                  <span className="px-3.5 py-1 rounded-full bg-obsidian/80 backdrop-blur-md border border-white/10 text-[11px] font-mono text-emerald-300 font-bold">
                    {proj.category}
                  </span>
                  <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-emerald-500 transition-colors shadow-md">
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

                {/* Real Metrics Grid */}
                <div className="grid grid-cols-3 gap-2.5 pt-5 border-t border-white/10">
                  {proj.metrics.slice(0, 3).map((m, i) => (
                    <div key={i} className="text-center p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                      <span className="text-lg sm:text-xl font-display font-black text-emerald-400 block">{m.value}</span>
                      <span className="text-[10px] font-mono text-slate-400 uppercase font-semibold">{isAr ? m.labelAr : m.labelEn}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Section Navigation Button */}
        <div className="flex justify-center pt-4">
          <Link
            href="/marketing"
            className="px-8 py-4 rounded-full bg-white/5 border border-white/15 hover:border-emerald-500 hover:bg-emerald-500/10 text-white font-mono text-xs uppercase tracking-widest flex items-center gap-3 transition-all duration-300 shadow-lg font-bold"
          >
            <span>{isAr ? "دخول صفحة الأعمال التسويقية الكاملة ←" : "EXPLORE FULL MARKETING PORTFOLIO →"}</span>
            <ArrowUpRight size={14} className="text-emerald-400" />
          </Link>
        </div>
      </div>
    </section>
  );
};