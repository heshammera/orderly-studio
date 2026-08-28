"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Cpu, CheckCircle2 } from "lucide-react";
import { REAL_PROJECTS } from "@/data/projects";

interface EngineeringWorkProps {
  locale: "en" | "ar";
  onOpenProjectBuilder: () => void;
}

export const EngineeringWork: React.FC<EngineeringWorkProps> = ({
  locale,
  onOpenProjectBuilder,
}) => {
  const isAr = locale === "ar";

  const engineeringProjects = [
    REAL_PROJECTS["faalek-proptech"],
    REAL_PROJECTS["quantum-logistics"],
  ];

  return (
    <section id="work" className="py-24 bg-obsidian text-white border-t border-white/10" dir={isAr ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/25 text-sky-400 text-xs font-mono mb-4 font-bold">
              <Cpu size={13} />
              <span>{isAr ? "مشاريع برمجية حية قيد التشغيل" : "SELECTED ENGINEERING WORK"}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight text-white leading-tight">
              {isAr ? "أنظمة برمجية سحابية في بيئة العمل الحية" : "Systems Running in Production"}
            </h2>
          </div>

          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-sky-400 hover:text-white transition-colors font-bold"
          >
            <span>{isAr ? "عرض كل المشاريع ←" : "EXPLORE ALL WORKS →"}</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {engineeringProjects.map((proj, idx) => (
            <Link
              key={idx}
              href={`/work/${proj.slug}`}
              className="group rounded-3xl bg-soft-black border border-white/10 overflow-hidden hover:border-sky-500/50 transition-all duration-500 flex flex-col justify-between shadow-2xl"
              data-cursor="VIEW"
            >
              {/* Card Banner */}
              <div className={`h-64 sm:h-72 w-full bg-gradient-to-br ${proj.accentGradient} p-7 sm:p-8 flex flex-col justify-between relative`}>
                <div className="flex items-center justify-between">
                  <span className="px-3.5 py-1 rounded-full bg-obsidian/80 backdrop-blur-md border border-white/15 text-[11px] font-mono font-bold text-white">
                    {proj.category}
                  </span>
                  <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-sky-500 transition-colors shadow-md">
                    <ArrowUpRight size={18} />
                  </div>
                </div>

                <div>
                  <span className="text-xs font-mono text-white/70 block mb-1 font-semibold">
                    {isAr ? `${proj.clientAr} • ${proj.locationAr}` : `${proj.clientEn} • ${proj.locationEn}`}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-white group-hover:text-sky-300 transition-colors leading-snug">
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
                <div className="grid grid-cols-2 gap-3 pt-5 border-t border-white/10 mb-5">
                  {proj.metrics.slice(0, 2).map((m, mIdx) => (
                    <div key={mIdx} className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                      <span className="text-lg font-display font-black text-sky-400 block">{m.value}</span>
                      <span className="text-[10px] font-mono text-slate-400 uppercase">{isAr ? m.labelAr : m.labelEn}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/5 text-xs font-mono text-slate-400">
                  <span className="font-bold">{isAr ? "التقنيات المستخدمة:" : "TECH STACK:"}</span>
                  <span className="text-white truncate max-w-[200px]">{proj.stack.slice(0, 3).join(" • ")}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Section Navigation Button */}
        <div className="flex justify-center pt-4">
          <Link
            href="/work"
            className="px-8 py-4 rounded-full bg-white/5 border border-white/15 hover:border-sky-500 hover:bg-sky-500/10 text-white font-mono text-xs uppercase tracking-widest flex items-center gap-3 transition-all duration-300 shadow-lg font-bold"
          >
            <span>{isAr ? "دخول صفحة معرض الأعمال الكاملة ←" : "VIEW ALL CASE STUDIES & CLIENT WORKS →"}</span>
            <ArrowUpRight size={14} className="text-sky-400" />
          </Link>
        </div>
      </div>
    </section>
  );
};