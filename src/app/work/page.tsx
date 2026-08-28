"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Filter, Search } from "lucide-react";
import { Header } from "@/components/navigation/Header";
import { CustomCursor } from "@/components/cursor/CustomCursor";
import { ProjectBuilderModal } from "@/components/home/ProjectBuilderModal";

export default function WorkPage() {
  const [locale, setLocale] = useState<"en" | "ar">("en");
  const [activeFilter, setActiveFilter] = useState<"ALL" | "ENGINEERING" | "CREATIVE" | "HYBRID">("ALL");
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const isAr = locale === "ar";

  const projects = [
    {
      slug: "nova-neural-engine",
      title: isAr ? "منصة تحليل البيانات الفورية" : "Nova Neural Engine",
      category: "ENGINEERING",
      client: "Enterprise SaaS",
      desc: isAr ? "معمارية برمجية تعالج 50k حدث بالثانية مع لوحات WebGL." : "A real-time data engine processing 50k events/sec with reactive WebGL telemetry dashboards.",
      stack: "Next.js / Python / Rust / WebGL",
      accent: "from-blue-600/30 to-violet-600/10",
      featured: true,
    },
    {
      slug: "orion-haute-horlogerie",
      title: isAr ? "استراتيجية وهوية دار أوريون" : "Orion Haute Horlogerie",
      category: "CREATIVE",
      client: "Swiss Luxury Brand",
      desc: isAr ? "تصميم هوية بصرية فاخرة وعلب تغليف ثلاثية الأبعاد." : "Spatial brand system, custom typography, and bespoke unboxing packaging.",
      stack: "Branding / 3D Packaging / Typography",
      accent: "from-amber-600/30 to-rose-600/10",
      featured: true,
    },
    {
      slug: "aura-headless-commerce",
      title: isAr ? "نظام التجارة الموزع عبر الحافة" : "Aura Headless Commerce",
      category: "HYBRID",
      client: "Global Retail",
      desc: isAr ? "منصة تجارة إلكترونية مفصولة الرأس بزمن استجابة أقل من 25ms." : "Sub-25ms global checkout architecture handling millions in multi-currency transactions.",
      stack: "Next.js / GraphQL / Redis / Stripe",
      accent: "from-cyan-600/30 to-blue-600/10",
      featured: false,
    },
    {
      slug: "lumina-spatial-gallery",
      title: isAr ? "تطبيق ومنصة لومينا الفنية" : "Lumina Spatial Gallery",
      category: "CREATIVE",
      client: "Art & Editorial",
      desc: isAr ? "تجربة استعراض معارض فنية ثلاثية الأبعاد تجمع بين التجارة والتصميم التحريري." : "A curated 3D digital gallery platform bridging spatial interaction and editorial commerce.",
      stack: "React / Three.js / WebGL / Shaders",
      accent: "from-purple-600/30 to-pink-600/10",
      featured: false,
    },
  ];

  const filtered = activeFilter === "ALL" ? projects : projects.filter((p) => p.category === activeFilter);

  return (
    <main dir={isAr ? "rtl" : "ltr"} className={`min-h-screen bg-obsidian text-white pt-32 pb-24 ${isAr ? "font-arabic" : "font-sans"}`}>
      <CustomCursor />
      <Header onOpenProjectBuilder={() => setIsBuilderOpen(true)} />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Page Header */}
        <div className="mb-16">
          <span className="text-xs font-mono text-engineering-blue uppercase tracking-widest block mb-3 font-bold">
            {isAr ? "معرض الأعمال والمشاريع" : "SELECTED WORKS // 2026"}
          </span>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-black tracking-tight text-white mb-6">
            {isAr ? "أعمال تشكّل المعيار الرقمي" : "Engineering × Creative Folio"}
          </h1>
          <p className="text-neutral-cool text-base sm:text-lg max-w-2xl leading-relaxed">
            {isAr
              ? "مجموعة مختارة من المنصات الرقمية، المنتجات السحابية، والهويات البصرية التي تم بناؤها بمعايير استثنائية."
              : "A curated index of production software architectures, bespoke brand identities, and spatial digital worlds."}
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-3 pb-8 mb-12 border-b border-white/10">
          {(["ALL", "ENGINEERING", "CREATIVE", "HYBRID"] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2 rounded-full text-xs font-mono tracking-wider uppercase transition-all duration-200 border ${
                activeFilter === filter
                  ? "bg-white text-obsidian border-white font-bold shadow-lg"
                  : "bg-white/5 text-white/70 border-white/10 hover:border-white/30 hover:text-white"
              }`}
              data-cursor="FILTER"
            >
              {filter === "ALL" ? (isAr ? "الكل // ALL" : "ALL (4)") : filter}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filtered.map((proj) => (
            <Link
              key={proj.slug}
              href={`/work/${proj.slug}`}
              className="group rounded-3xl bg-soft-black border border-white/10 overflow-hidden hover:border-engineering-blue/50 transition-all duration-500 flex flex-col justify-between shadow-2xl"
              data-cursor="VIEW"
            >
              <div className={`h-72 sm:h-80 w-full bg-gradient-to-br ${proj.accent} p-8 flex flex-col justify-between relative`}>
                <div className="flex items-center justify-between">
                  <span className="px-3.5 py-1 rounded-full bg-obsidian/80 backdrop-blur-md border border-white/10 text-[11px] font-mono font-bold text-white">
                    {proj.category}
                  </span>
                  <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-engineering-blue transition-colors">
                    <ArrowUpRight size={18} />
                  </div>
                </div>

                <div>
                  <span className="text-xs font-mono text-white/60 block mb-1">{proj.client}</span>
                  <h3 className="text-2xl sm:text-3xl font-display font-bold text-white group-hover:text-engineering-blue transition-colors">
                    {proj.title}
                  </h3>
                </div>
              </div>

              <div className="p-8">
                <p className="text-neutral-cool text-sm leading-relaxed mb-6">{proj.desc}</p>
                <div className="flex items-center justify-between pt-4 border-t border-white/5 text-xs font-mono text-white/50">
                  <span>SPEC</span>
                  <span className="text-white/80">{proj.stack}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <ProjectBuilderModal isOpen={isBuilderOpen} onClose={() => setIsBuilderOpen(false)} locale={locale} />
    </main>
  );
}