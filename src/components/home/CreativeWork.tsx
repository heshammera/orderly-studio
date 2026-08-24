"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

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
    {
      slug: "orion-haute-horlogerie",
      title: isAr ? "استراتيجية وهوية دار أوريون" : "Orion Haute Horlogerie",
      category: "Brand Identity & Tactile Packaging",
      desc: isAr
        ? "تصميم هوية بصرية فاخرة وعلب تغليف ثلاثية الأبعاد لعلامة سويسرية رائدة."
        : "Spatial brand system, custom typography, and bespoke unboxing packaging.",
      bg: "bg-[#EFECE6]",
    },
    {
      slug: "lumina-spatial-gallery",
      title: isAr ? "تطبيق ومنصة لومينا الفنية" : "Lumina Spatial Gallery",
      category: "UI / UX & 3D Experience",
      desc: isAr
        ? "تجربة استعراض معارض فنية ثلاثية الأبعاد تجمع بين التجارة الإلكترونية والتصميم التحريري."
        : "A curated 3D digital gallery platform bridging spatial interaction and editorial commerce.",
      bg: "bg-[#EAE5DF]",
    },
  ];

  return (
    <section className="py-24 bg-off-white text-obsidian border-t border-neutral-warm/15">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs font-mono text-creative-coral uppercase tracking-widest block mb-2 font-bold">
              {isAr ? "أعمال إبداعية مختارة" : "SELECTED CREATIVE WORK"}
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-obsidian">
              {isAr ? "معرض الهويات والمنتجات" : "Form & Identity"}
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {creativeProjects.map((proj, idx) => (
            <Link
              key={idx}
              href={`/work/${proj.slug}`}
              className={`rounded-3xl ${proj.bg} border border-neutral-warm/20 p-8 sm:p-12 flex flex-col justify-between min-h-[400px] hover:shadow-2xl transition-all duration-500 group`}
              data-cursor="VIEW"
            >
              <div className="flex items-center justify-between">
                <span className="px-3.5 py-1 rounded-full bg-white text-[11px] font-mono font-bold text-obsidian shadow-sm">
                  {proj.category}
                </span>
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-obsidian group-hover:bg-creative-coral group-hover:text-white transition-colors shadow-sm">
                  <ArrowUpRight size={18} />
                </div>
              </div>

              <div className="my-auto py-8">
                <h3 className="text-2xl sm:text-4xl font-display font-black text-obsidian group-hover:text-creative-coral transition-colors mb-3">
                  {proj.title}
                </h3>
                <p className="text-neutral-warm text-sm sm:text-base leading-relaxed max-w-md">
                  {proj.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-warm/20 flex items-center justify-between text-xs font-mono text-neutral-warm">
                <span>ART DIRECTION</span>
                <span className="font-bold text-obsidian">ORDERLY STUDIO</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Dedicated Section Navigation Button */}
        <div className="flex justify-center pt-6">
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