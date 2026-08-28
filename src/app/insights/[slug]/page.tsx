"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Share2 } from "lucide-react";
import { Header } from "@/components/navigation/Header";
import { CustomCursor } from "@/components/cursor/CustomCursor";
import { ProjectBuilderModal } from "@/components/home/ProjectBuilderModal";

export default function ArticleReaderPage({ params }: { params: { slug: string } }) {
  const [locale, setLocale] = useState<"en" | "ar">("en");
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const isAr = locale === "ar";

  const articles: Record<string, any> = {
    "scalable-saas-architecture": {
      category: isAr ? "الهندسة البرمجية" : "ENGINEERING",
      title: isAr ? "كيف نفكر في بناء منتجات SaaS قابلة للتوسع اللانهائي" : "How we think about scalable SaaS architectures",
      date: "06.09.2026",
      readTime: "6 min read",
      author: "ORDERLY Engineering Team",
      content: isAr ? [
        "في عالم تطوير البرمجيات السحابية الحديثة، لم يعد بناء تطبيق سريع في بيئة التطوير المحلية كافياً. التحدي الحقيقي يبدأ عندما يواجه النظام آلاف الاستعلامات المتزامنة والاتصالات اللحظية.",
        "نعتمد في أوردرلي على مبدأ المعمارية الموزعة غير المتزامنة (Event-Driven Edge Architecture) حيث يتم فصل طبقة العرض التفاعلية تماماً عن محركات معالجة البيانات، واستخدام الذاكرة المؤقتة الموزعة مثل Redis لضمان زمن استجابة دون 15 ميلي ثانية.",
        "النتيجة ليست مجرد سرعة في الأداء، بل استقرار كامل للنظام يحمي سمعة علامتك التجارية ويضمن تجربة استخدام سلسة لعملائك حول العالم."
      ] : [
        "In modern cloud software engineering, building a fast application in local development is no longer sufficient. The true test begins when systems face thousands of concurrent telemetry streams.",
        "At ORDERLY, we adopt event-driven edge architectures where interactive presentation layers are decoupled from data ingestion pipelines, leveraging in-memory queues and edge caching to maintain sub-15ms latency.",
        "The outcome is not merely raw benchmark speed, but rock-solid uptime that safeguards your brand equity and delivers frictionless customer experiences globally."
      ],
    },
    "psychology-of-luxury-packaging": {
      category: isAr ? "التصميم والعلامات التجارية" : "DESIGN",
      title: isAr ? "السيكولوجية الخفية وراء تصميم التغليف والمواد الملموسة" : "The psychology behind luxury packaging and tactile craft",
      date: "14.09.2026",
      readTime: "4 min read",
      author: "ORDERLY Creative Team",
      content: isAr ? [
        "في عصر تحولت فيه أغلب التفاعلات إلى لمسات على شاشات زجاجية ملساء، أصبحت اللحظة الملموسة لفتح علبة المنتج (Unboxing Experience) واحدة من أندر وأقوى أدوات ترسيخ العلامة التجارية.",
        "الوزن الفيزيائي، ملمس الورق الطبيعي، الصوت الهادئ لانزلاق الغطاء المغناطيسي، ونقاء الخطوط الطباعية، كلها إشارات عصبية تحفر في عقل العميل قيمة المنتج وفخامته.",
        "نصمم في أوردرلي كل تفصيلة ملموسة بنفس الشغف والدقة الهندسية التي نبني بها منصاتنا الرقمية لنصنع تجربة متكاملة تربط بين العالمين."
      ] : [
        "In an era where most interactions happen on smooth glass touchscreens, the physical moment of unboxing has become one of the rarest, highest-leverage brand touchpoints.",
        "Physical weight, textured paper grains, the acoustic click of a magnetic closure, and typographic precision are tactile neural cues that establish perceived luxury in milliseconds.",
        "At ORDERLY, we sculpt physical unboxing moments with the same architectural rigor we apply to software systems, creating a unified brand world."
      ],
    },
  };

  const art = articles[params.slug] || articles["scalable-saas-architecture"];

  return (
    <main dir={isAr ? "rtl" : "ltr"} className={`min-h-screen bg-off-white text-obsidian pt-28 pb-32 ${isAr ? "font-arabic" : "font-sans"}`}>
      <CustomCursor />
      <Header onOpenProjectBuilder={() => setIsBuilderOpen(true)} currentWorld="creative" />

      <article className="max-w-3xl mx-auto px-6 md:px-12">
        <Link href="/insights" className="inline-flex items-center gap-2 text-xs font-mono text-neutral-warm hover:text-obsidian uppercase tracking-wider mb-10 transition-colors">
          <ArrowLeft size={14} className="rtl:rotate-180" />
          <span>{isAr ? "العودة للمجلة التحريرية" : "BACK TO INSIGHTS"}</span>
        </Link>

        <div className="border-b border-neutral-warm/20 pb-8 mb-12">
          <span className="px-3.5 py-1 rounded-full bg-neutral-warm/15 text-[11px] font-mono font-bold text-obsidian uppercase mb-4 inline-block">
            {art.category}
          </span>
          <h1 className="text-3xl sm:text-5xl font-display font-black text-obsidian mb-6 leading-tight">
            {art.title}
          </h1>
          <div className="flex flex-wrap items-center gap-6 text-xs font-mono text-neutral-warm">
            <span className="flex items-center gap-1.5"><Calendar size={13} /> {art.date}</span>
            <span className="flex items-center gap-1.5"><Clock size={13} /> {art.readTime}</span>
            <span>By {art.author}</span>
          </div>
        </div>

        <div className="space-y-8 text-lg text-neutral-warm leading-relaxed font-sans">
          {art.content.map((paragraph: string, idx: number) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-neutral-warm/20 flex items-center justify-between">
          <Link href="/insights" className="text-xs font-mono font-bold uppercase text-creative-coral hover:underline">
            {isAr ? "← قراءة مقالات أخرى" : "← Read More Perspectives"}
          </Link>
          <button onClick={() => setIsBuilderOpen(true)} className="px-6 py-2.5 rounded-full bg-obsidian text-white font-mono text-xs uppercase tracking-wider hover:bg-creative-coral transition-colors">
            {isAr ? "ابدأ مشروعك" : "Start a Project"}
          </button>
        </div>
      </article>

      <ProjectBuilderModal isOpen={isBuilderOpen} onClose={() => setIsBuilderOpen(false)} locale={locale} />
    </main>
  );
}