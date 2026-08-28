"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, BookOpen } from "lucide-react";
import { Header } from "@/components/navigation/Header";
import { CustomCursor } from "@/components/cursor/CustomCursor";
import { ProjectBuilderModal } from "@/components/home/ProjectBuilderModal";

export default function InsightsPage() {
  const [locale, setLocale] = useState<"en" | "ar">("en");
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const isAr = locale === "ar";

  const articles = [
    {
      slug: "scalable-saas-architecture",
      category: isAr ? "الهندسة البرمجية" : "ENGINEERING",
      title: isAr ? "كيف نفكر في بناء منتجات SaaS قابلة للتوسع اللانهائي" : "How we think about scalable SaaS architectures",
      excerpt: isAr
        ? "مراجعة معمارية لتقنيات الـ Multi-Tenancy، إدارة الذاكرة المؤقتة عبر الحافة، وتحسين استعلامات قواعد البيانات تحت ضغط آلاف الطلبات المتزامنة."
        : "An architectural deep-dive into multi-tenant distributed systems, edge caching, and zero-downtime database migrations.",
      date: "06.09.2026",
      readTime: "6 min read",
    },
    {
      slug: "psychology-of-luxury-packaging",
      category: isAr ? "التصميم والعلامات التجارية" : "DESIGN",
      title: isAr ? "السيكولوجية الخفية وراء تصميم التغليف والمواد الملموسة" : "The psychology behind luxury packaging and tactile craft",
      excerpt: isAr
        ? "لماذا تظل التجربة الملموسة والفتح الفيزيائي للمنتجات (Unboxing) أقوى محفز عاطفي للارتباط بالعلامة التجارية في العصر الرقمي."
        : "Why tactile materiality, weight, and acoustic unboxing feedback create irreplaceable brand equity in a digital-first world.",
      date: "14.09.2026",
      readTime: "4 min read",
    },
    {
      slug: "ai-enterprise-business-value",
      category: isAr ? "الذكاء الاصطناعي" : "AI & AUTOMATION",
      title: isAr ? "أين يخلق الذكاء الاصطناعي قيمة حقيقية في نماذج الأعمال" : "Where AI actually creates real enterprise business value",
      excerpt: isAr
        ? "تجاوز الضجيج الإعلاني والتركيز على تكامل النماذج اللغوية والأتمتة التي تخفض التكاليف التشغيلية بنسب ملموسة."
        : "Moving past generative hype into pragmatic autonomous workflow integrations that deliver measurable ROI.",
      date: "20.09.2026",
      readTime: "5 min read",
    },
  ];

  return (
    <main dir={isAr ? "rtl" : "ltr"} className={`min-h-screen bg-off-white text-obsidian pt-32 pb-24 ${isAr ? "font-arabic" : "font-sans"}`}>
      <CustomCursor />
      <Header onOpenProjectBuilder={() => setIsBuilderOpen(true)} currentWorld="creative" />

      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="mb-16 border-b border-neutral-warm/20 pb-8">
          <span className="text-xs font-mono text-creative-coral uppercase tracking-widest block mb-3 font-bold">
            {isAr ? "المجلة الفكرية والتحريرية" : "EDITORIAL PERSPECTIVES"}
          </span>
          <h1 className="text-4xl sm:text-6xl font-display font-black text-obsidian mb-6">
            {isAr ? "رؤى في التكنولوجيا والتصميم" : "Insights & Perspectives"}
          </h1>
          <p className="text-neutral-warm text-base sm:text-lg max-w-2xl leading-relaxed">
            {isAr
              ? "مقالات تحريرية متخصصة تستكشف تقاطع الهندسة البرمجية، الذكاء الاصطناعي، وعلم تصميم الهويات."
              : "Thought leadership, architectural breakdowns, and design philosophies curated by the ORDERLY team."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {articles.map((art) => (
            <div
              key={art.slug}
              className="p-8 rounded-3xl bg-white border border-neutral-warm/20 hover:border-creative-coral/40 transition-all duration-300 flex flex-col justify-between group shadow-sm hover:shadow-xl"
              data-cursor="READ"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="px-3 py-1 rounded-full bg-neutral-warm/10 text-[10px] font-mono font-bold text-obsidian">
                    {art.category}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-neutral-warm/10 flex items-center justify-center text-obsidian group-hover:bg-creative-coral group-hover:text-white transition-colors">
                    <ArrowUpRight size={14} />
                  </div>
                </div>

                <h3 className="text-xl font-display font-bold text-obsidian group-hover:text-creative-coral transition-colors mb-4 leading-snug">
                  {art.title}
                </h3>
                <p className="text-neutral-warm text-sm leading-relaxed mb-6">{art.excerpt}</p>
              </div>

              <div className="pt-6 border-t border-neutral-warm/15 flex items-center justify-between text-xs font-mono text-neutral-warm">
                <span>{art.date}</span>
                <span>{art.readTime}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ProjectBuilderModal isOpen={isBuilderOpen} onClose={() => setIsBuilderOpen(false)} locale={locale} />
    </main>
  );
}