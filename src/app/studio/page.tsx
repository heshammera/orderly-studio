"use client";

import React, { useState } from "react";
import { ArrowUpRight, ShieldCheck, Sparkles } from "lucide-react";
import { Header } from "@/components/navigation/Header";
import { CustomCursor } from "@/components/cursor/CustomCursor";
import { ProjectBuilderModal } from "@/components/home/ProjectBuilderModal";

export default function StudioPage() {
  const [locale, setLocale] = useState<"en" | "ar">("en");
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const isAr = locale === "ar";

  return (
    <main dir={isAr ? "rtl" : "ltr"} className={`min-h-screen bg-off-white text-obsidian pt-32 pb-24 ${isAr ? "font-arabic" : "font-sans"}`}>
      <CustomCursor />
      <Header onOpenProjectBuilder={() => setIsBuilderOpen(true)} currentWorld="creative" />

      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <div className="mb-16">
          <span className="text-xs font-mono text-creative-coral uppercase tracking-widest block mb-3 font-bold">
            {isAr ? "الاستوديو والفلسفة" : "STUDIO PHILOSOPHY"}
          </span>
          <h1 className="text-4xl sm:text-6xl font-display font-black text-obsidian mb-6">
            {isAr ? "استوديو مبني حول ركيزتين متساويتين" : "Two Disciplines. One Studio."}
          </h1>
          <p className="text-neutral-warm text-lg sm:text-xl leading-relaxed">
            {isAr
              ? "أوردرلي ليس شركة برمجة مع قسم تصميم جانبي، وليس وكالة تصميم مع مبرمجين خارجيين. نحن ندمج التخصصين من اليوم الأول."
              : "ORDERLY is not a development company with a design department, nor a design agency outsourcing engineering. The two disciplines are fused at the foundational level."}
          </p>
        </div>

        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-neutral-warm/20 shadow-xl mb-16 space-y-6">
          <h3 className="text-2xl font-display font-bold text-obsidian">
            {isAr ? "معايير النزاهة والعمل الحقيقي" : "The Standard of Integrity"}
          </h3>
          <p className="text-neutral-warm text-base leading-relaxed">
            {isAr
              ? "نحن نطلق أوردرلي من الصفر لنضع معياراً جديداً في صناعة التجارب الرقمية. لا نخترع تاريخاً مزيفاً، ولا ندعي جوائز وهمية أو أرقام عملاء غير حقيقية. الموقع نفسه وجودة الأعمال التي نبنيها هي الدليل الأول والوحيد على قدراتنا."
              : "We launch ORDERLY from the ground up to establish a new benchmark in creative technology. We do not invent fake client logos or fabricate statistics. The digital platform itself and the systems we engineer are our primary proof."}
          </p>
          <div className="pt-4 border-t border-neutral-warm/15 flex items-center gap-3 text-xs font-mono text-neutral-warm">
            <ShieldCheck size={18} className="text-emerald-600" />
            <span>{isAr ? "معايير إنتاج معتمدة وموثوقة" : "AUTHENTIC CRAFT GUARANTEE"}</span>
          </div>
        </div>

        <div className="p-10 rounded-3xl bg-obsidian text-white text-center flex flex-col items-center">
          <h3 className="text-3xl font-display font-bold mb-4">
            {isAr ? "هل ترغب في العمل معنا؟" : "Ready to Build Something Extraordinary?"}
          </h3>
          <button
            onClick={() => setIsBuilderOpen(true)}
            className="px-8 py-4 rounded-full bg-white text-obsidian font-bold text-xs tracking-wider uppercase flex items-center gap-3 hover:bg-creative-coral hover:text-white transition-all shadow-xl"
          >
            <span>{isAr ? "ابدأ مشروعك الآن" : "START A PROJECT"}</span>
            <ArrowUpRight size={16} />
          </button>
        </div>
      </div>

      <ProjectBuilderModal isOpen={isBuilderOpen} onClose={() => setIsBuilderOpen(false)} locale={locale} />
    </main>
  );
}