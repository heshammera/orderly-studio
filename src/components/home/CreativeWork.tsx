"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { REAL_PROJECTS } from "@/data/projects";

interface CreativeWorkProps {
  locale: "en" | "ar";
  onOpenProjectBuilder: () => void;
}

export const CreativeWork: React.FC<CreativeWorkProps> = ({
  locale,
  onOpenProjectBuilder,
}) => {
  const isAr = locale === "ar";

  const creativeProjects = [
    REAL_PROJECTS["cadi-parfumerie"],
    REAL_PROJECTS["faalek-proptech"],
  ];

  return (
    <section className="py-24 bg-off-white text-obsidian border-t border-neutral-warm/15" dir={isAr ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-creative-coral/10 border border-creative-coral/25 text-creative-coral text-xs font-mono mb-4 font-bold">
              <Sparkles size={13} />
              <span>{isAr ? "أعمال إبداعية وتصميمات حقيقية" : "SELECTED CREATIVE WORK"}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight text-obsidian leading-tight">
              {isAr ? "هويات بصرية وتجارب رقمية للعلامات الرائدة" : "Form, Identity & Spatial Design"}
            </h2>
          </div>

          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-creative-coral hover:text-obsidian transition-colors font-bold"
          >
            <span>{isAr ? "عرض ملف الأعمال الكامل ←" : "EXPLORE FULL FOLIO →"}</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {creativeProjects.map((proj, idx) => (
            <Link
              key={idx}
              href={`/work/${proj.slug}`}
              className="rounded-3xl bg-white border border-neutral-warm/25 p-7 sm:p-10 flex flex-col justify-between min-h-[420px] hover:shadow-2xl transition-all duration-500 group relative overflow-hidden"
              data-cursor="VIEW"
            >
              <div className="flex items-center justify-between relative z-10 mb-6">
                <span className="px-3.5 py-1 rounded-full bg-neutral-warm/10 border border-neutral-warm/20 text-[11px] font-mono font-bold text-obsidian shadow-sm">
                  {proj.category}
                </span>
                <div className="w-10 h-10 rounded-full bg-off-white border border-neutral-warm/20 flex items-center justify-center text-obsidian group-hover:bg-creative-coral group-hover:text-white transition-colors shadow-sm">
                  <ArrowUpRight size={18} />
                </div>
              </div>

              <div className="relative z-10 my-auto py-4">
                <span className="text-xs font-mono text-neutral-warm block mb-1.5 font-semibold">
                  {isAr ? `${proj.clientAr} • ${proj.locationAr}` : `${proj.clientEn} • ${proj.locationEn}`}
                </span>
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-obsidian group-hover:text-creative-coral transition-colors mb-3 leading-snug">
                  {isAr ? proj.titleAr : proj.titleEn}
                </h3>
                <p className="text-neutral-warm text-xs sm:text-sm leading-relaxed max-w-lg mb-6">
                  {isAr ? proj.descAr : proj.descEn}
                </p>

                {/* Real Metrics Row */}
                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-neutral-warm/15">
                  {proj.metrics.slice(0, 2).map((m, mIdx) => (
                    <div key={mIdx} className="p-2.5 rounded-xl bg-off-white/80 border border-neutral-warm/15">
                      <span className="text-base font-display font-black text-creative-coral block">{m.value}</span>
                      <span className="text-[10px] font-mono text-neutral-warm uppercase">{isAr ? m.labelAr : m.labelEn}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative z-10 pt-4 border-t border-neutral-warm/20 flex items-center justify-between text-xs font-mono text-neutral-warm">
                <span className="font-semibold">{isAr ? "نطاق العمل:" : "SCOPE:"}</span>
                <span className="font-bold text-obsidian">{proj.stack.slice(0, 3).join(" • ")}</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Section Navigation Button */}
        <div className="flex justify-center pt-4">
          <Link
            href="/work"
            className="px-8 py-4 rounded-full bg-white border border-neutral-warm/30 hover:border-creative-coral hover:bg-creative-coral/10 text-obsidian font-mono text-xs uppercase tracking-widest flex items-center gap-3 transition-all duration-300 shadow-md font-bold"
          >
            <span>{isAr ? "دخول المعرض الإبداعي الكامل ←" : "EXPLORE FULL CREATIVE GALLERY →"}</span>
            <ArrowUpRight size={14} className="text-creative-coral" />
          </Link>
        </div>
      </div>
    </section>
  );
};