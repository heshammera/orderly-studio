"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  ShieldCheck,
  Sparkles,
  Cpu,
  Layers,
  TrendingUp,
  Globe2,
  Users,
  CheckCircle2,
  Code2,
} from "lucide-react";
import { Header } from "@/components/navigation/Header";
import { CustomCursor } from "@/components/cursor/CustomCursor";
import { Footer } from "@/components/navigation/Footer";
import { ProjectDiscoveryWizard } from "@/components/discovery/ProjectDiscoveryWizard";
import { useLocale } from "@/context/LocaleContext";

const STUDIO_PILLARS = [
  {
    icon: <Cpu className="w-6 h-6 text-sky-400" />,
    titleEn: "Deep Cloud Engineering",
    titleAr: "هندسة البرمجيات والأنظمة السحابية",
    descEn:
      "We don't build superficial web prototypes. We engineer production-grade distributed architectures, edge caching, and scalable APIs that process real capital.",
    descAr:
      "لا نبني نماذج تجريبية سطحية. نحن نطور معمارية موزعة عالية الأمان في بيئات الإنتاج الحية، مع كاش سريع وواجهات برمجية تدير عمليات مالية حقيقية.",
    accentBorder: "border-sky-500/30",
    accentBg: "bg-sky-500/5",
  },
  {
    icon: <Sparkles className="w-6 h-6 text-amber-400" />,
    titleEn: "Royal Art Direction & Typography",
    titleAr: "الإخراج الفني والخطوط الملكية",
    descEn:
      "Design is not decoration — it is the soul of brand equity. We craft bespoke bilingual typography pairings, luxury 3D unboxing, and refined visual systems.",
    descAr:
      "التصميم ليس مجرد زينة بل هو جوهر قيمة العلامة التجارية. نصمم خطوطاً عربية ولاتينية مخصصة، وتغليفاً ثلاثي الأبعاد، وأنظمة بصرية لا تُنسى.",
    accentBorder: "border-amber-500/30",
    accentBg: "bg-amber-500/5",
  },
  {
    icon: <TrendingUp className="w-6 h-6 text-emerald-400" />,
    titleEn: "Performance Marketing & ROAS",
    titleAr: "التسويق الرقمي وهندسة النمو",
    descEn:
      "Products need customers to survive. We build high-conversion paid media engines, dynamic ad hooks, and automated retention loops with proven positive return on ad spend.",
    descAr:
      "المنتجات تحتاج إلى مبيعات لتزدهر. نبني منظومات إعلانات ممولة عالية التحويل، وقمع مبيعات ذكي، وحلقات استرداد تلقائية تضمن عائداً إيجابياً ومقاساً.",
    accentBorder: "border-emerald-500/30",
    accentBg: "bg-emerald-500/5",
  },
];

export default function StudioPage() {
  const { locale, isAr } = useLocale();
  const [isWizardOpen, setIsWizardOpen] = useState(false);

  return (
    <main
      dir={isAr ? "rtl" : "ltr"}
      className={`min-h-screen bg-[#07070A] text-white pt-28 pb-20 ${isAr ? "font-arabic" : "font-sans"}`}
    >
      <CustomCursor />
      <Header onOpenProjectBuilder={() => setIsWizardOpen(true)} />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Page Header */}
        <div className="mb-16 pb-8 border-b border-white/10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-emerald-400 mb-5 font-bold">
            <Users size={13} />
            <span>{isAr ? "فلسفة الاستوديو وفريق العمل" : "STUDIO PHILOSOPHY & OPERATING MODEL"}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black text-white mb-6 leading-tight">
            {isAr
              ? "نبني، نصمّم، ونسوّق.\nاستوديو واحد بدون وسطاء."
              : "Engineering, Design & Scale.\nFused into one senior studio."}
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-3xl leading-relaxed">
            {isAr
              ? "ORDERLY ليس شركة برمجيات مع قسم تصميم جانبي، وليس وكالة تصميم تستعين بمبرمجين خارجيين. نحن نجمع التخصصات الثلاثة كفريق واحد متكامل يقوده متخصصون كبار."
              : "ORDERLY is not a software house outsourcing design, nor a creative agency delegating development to third parties. We are a senior multidisciplinary collective uniting deep engineering, royal art direction, and algorithmic performance marketing."}
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <span className="w-8 h-[2px] bg-white/30" />
            <span className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold">
              {isAr ? "الركائز الأساسية التي يقوم عليها الاستوديو" : "THE THREE FOUNDATIONAL PILLARS"}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {STUDIO_PILLARS.map((pillar, idx) => (
              <div
                key={idx}
                className={`p-8 rounded-3xl ${pillar.accentBg} border ${pillar.accentBorder} flex flex-col justify-between shadow-xl min-h-[260px]`}
              >
                <div>
                  <div className={`p-3 rounded-2xl ${pillar.accentBg} border ${pillar.accentBorder} w-fit mb-5`}>
                    {pillar.icon}
                  </div>
                  <h3 className="text-xl font-display font-bold text-white mb-3 leading-snug">
                    {isAr ? pillar.titleAr : pillar.titleEn}
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {isAr ? pillar.descAr : pillar.descEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Operating Model & Small Team Advantage */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#0C0D14] border border-white/10 mb-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5">
            <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-bold block">
              {isAr ? "نموذج العمل الرشيق" : "THE SENIOR COLLECTIVE MODEL"}
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-black text-white leading-snug">
              {isAr
                ? "فريق قيادي صغير + شبكة عالمية من المتخصصين الكبار"
                : "A small senior core + global specialist network"}
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {isAr
                ? "لا نوظف مئات المبتدئين لتكبير الفاتورة. بدلاً من ذلك، يدير كل مشروع مهندسون ومصممون ذوو خبرة إنتاجية حقيقية، مع الاستعانة بأفضل المتخصصين في العالم عند الحاجة لأي تخصص دقيق."
                : "We reject the bloated agency model of hundreds of juniors learning on client budgets. Every ORDERLY project is directed by seasoned practitioners who build directly, ensuring unparalleled craft velocity and zero communication friction."}
            </p>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-3">
            {[
              { titleEn: "Zero Junior Bloat", titleAr: "لا مبتدئين على مشاريع العملاء" },
              { titleEn: "Direct Access", titleAr: "تواصل مباشر مع المنفذين" },
              { titleEn: "ORDERLY OS Access", titleAr: "بوابة عميل تفاعلية حية" },
              { titleEn: "Verified SLAs", titleAr: "ضمانات تشغيل حقيقية" },
            ].map((item, i) => (
              <div key={i} className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 flex flex-col gap-2">
                <CheckCircle2 size={18} className="text-emerald-400" />
                <span className="text-xs font-mono font-bold text-slate-200">
                  {isAr ? item.titleAr : item.titleEn}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Authenticity Guarantee Banner */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-emerald-500/10 via-sky-500/10 to-transparent border border-white/10 text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-mono font-bold">
            <ShieldCheck size={14} />
            <span>{isAr ? "معيار النزاهة والعمل الحقيقي" : "AUTHENTIC CRAFT GUARANTEE"}</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-display font-black text-white">
            {isAr ? "مشاريعنا الحية وأرقامنا الموثقة هي دليلنا الأول" : "Our production work and verified metrics are our only proof."}
          </h3>
          <p className="text-slate-300 text-sm max-w-xl mx-auto leading-relaxed">
            {isAr
              ? "لا ندعي تاريخاً وهمياً ولا نضع أرقاماً غير حقيقية. كل مشروع وكل إحصائية على هذا الموقع موثقة من بيئة الإنتاج الفعلية."
              : "We don't fabricate metrics or invent histories. Every case study, latency figure, and transactional number on this platform is backed by real production deployments."}
          </p>
          <div className="pt-4">
            <button
              type="button"
              onClick={() => setIsWizardOpen(true)}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-mono font-bold text-xs uppercase tracking-wider hover:bg-slate-200 transition-all shadow-xl hover:scale-[1.02]"
            >
              <span>{isAr ? "ابدأ استكشاف مشروعك الآن" : "START A PROJECT WITH ORDERLY"}</span>
              <ArrowUpRight size={14} />
            </button>
          </div>
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