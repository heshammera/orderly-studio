"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, CheckCircle2, Cpu, Globe, Layers } from "lucide-react";
import { Header } from "@/components/navigation/Header";
import { CustomCursor } from "@/components/cursor/CustomCursor";
import { ProjectBuilderModal } from "@/components/home/ProjectBuilderModal";

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const [locale, setLocale] = useState<"en" | "ar">("en");
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const isAr = locale === "ar";

  const caseStudies: Record<string, any> = {
    "nova-neural-engine": {
      title: isAr ? "منصة Nova لتحليل البيانات الفورية" : "Nova Neural Engine",
      subtitle: "Enterprise SaaS & Telemetry Architecture",
      category: "ENGINEERING",
      client: "Nova Systems International",
      timeline: "4 Months // Production Deployment",
      challenge: isAr
        ? "بناء بنية تحتية سحابية قادرة على استيعاب ومعالجة أكثر من 50,000 حدث متزامن في الثانية بدون أي تأخير، مع توفير واجهة مستخدم مبنية بـ WebGL تعرض الرسوم البيانية المكانية ثلاثية الأبعاد."
        : "Architecting a zero-latency real-time pipeline capable of ingesting and querying 50,000+ telemetry events per second, visualised through interactive WebGL spatial dashboards.",
      strategy: isAr
        ? "تصميم معمارية موزعة عبر الحافة (Edge Compute) مع معالجة غير متزامنة بقواعد بيانات Redis و ClickHouse، وواجهة أمامية فائقة السرعة بـ Next.js و React Three Fiber."
        : "Leveraged distributed edge workers, in-memory caching queues, and GPU-accelerated client rendering to keep roundtrip latency under 15 milliseconds.",
      metrics: [
        { label: isAr ? "زمن الاستجابة" : "Avg Latency", value: "< 15ms" },
        { label: isAr ? "معدل المعالجة" : "Throughput", value: "50k/sec" },
        { label: isAr ? "نسبة التوفر" : "Uptime", value: "99.99%" },
        { label: isAr ? "درجة الأداء" : "Lighthouse", value: "100/100" },
      ],
      stack: ["Next.js 14", "TypeScript", "Python / PyTorch", "WebGL / Three.js", "Redis", "ClickHouse"],
    },
    "orion-haute-horlogerie": {
      title: isAr ? "دار أوريون للساعات الفاخرة" : "Orion Haute Horlogerie",
      subtitle: "Bespoke Brand Identity & Tactile 3D Packaging",
      category: "CREATIVE",
      client: "Orion Watchmaker Geneva",
      timeline: "3 Months // Global Brand Launch",
      challenge: isAr
        ? "إعادة صياغة الهوية البصرية والتغليف الفاخر لدار ساعات سويسرية رائدة لمخاطبة جيل جديد من هواة الفخامة والتقنية."
        : "Re-imagining a prestigious heritage watchmaker's identity system and tactile unboxing experience for a digital-native luxury audience.",
      strategy: isAr
        ? "ابتكار خط طباعي مخصص، نظام شبكة هندسي مستوحى من حركة التروس الميكانيكية، وتصميم علب ثلاثية الأبعاد بأفخر الخامات البيئية."
        : "Constructed a custom geometric typeface, golden-ratio packaging mechanics, and interactive spatial 3D showcase.",
      metrics: [
        { label: isAr ? "الزيادة في المبيعات" : "Conversion Lift", value: "+140%" },
        { label: isAr ? "التفاعل الرقمي" : "Engagement", value: "4.8x" },
        { label: isAr ? "التغطية العالمية" : "Global Press", value: "35+ Outlets" },
        { label: isAr ? "معدل الرضا" : "Brand Index", value: "98%" },
      ],
      stack: ["Brand Strategy", "Custom Typography", "3D Packaging", "Motion Graphics", "Art Direction"],
    },
  };

  const project = caseStudies[params.slug] || caseStudies["nova-neural-engine"];

  return (
    <main dir={isAr ? "rtl" : "ltr"} className={`min-h-screen bg-obsidian text-white pt-28 pb-32 ${isAr ? "font-arabic" : "font-sans"}`}>
      <CustomCursor />
      <Header locale={locale} onToggleLocale={() => setLocale(l => l === "en" ? "ar" : "en")} onOpenProjectBuilder={() => setIsBuilderOpen(true)} />

      <div className="max-w-5xl mx-auto px-6 md:px-12">
        {/* Back Link */}
        <Link href="/work" className="inline-flex items-center gap-2 text-xs font-mono text-neutral-cool hover:text-white uppercase tracking-wider mb-10 transition-colors">
          <ArrowLeft size={14} className="rtl:rotate-180" />
          <span>{isAr ? "العودة لكافة الأعمال" : "BACK TO ALL WORK"}</span>
        </Link>

        {/* Hero Section */}
        <div className="border-b border-white/10 pb-12 mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full bg-engineering-blue/15 border border-engineering-blue/30 text-engineering-blue text-xs font-mono font-bold uppercase">
              {project.category}
            </span>
            <span className="text-xs font-mono text-neutral-cool">{project.timeline}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-display font-black text-white mb-4 leading-tight">
            {project.title}
          </h1>
          <p className="text-xl font-display text-neutral-cool">{project.subtitle}</p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 sm:p-8 rounded-3xl bg-soft-black border border-white/10 mb-16 shadow-2xl">
          {project.metrics.map((m: any, idx: number) => (
            <div key={idx} className="text-center p-3">
              <span className="text-3xl sm:text-4xl font-display font-black text-white block mb-1">{m.value}</span>
              <span className="text-xs font-mono text-neutral-cool uppercase">{m.label}</span>
            </div>
          ))}
        </div>

        {/* Modular Story Blocks */}
        <div className="space-y-16">
          {/* Challenge Block */}
          <div className="p-8 sm:p-12 rounded-3xl bg-soft-black border border-white/10">
            <span className="text-xs font-mono text-creative-coral uppercase tracking-widest block mb-3 font-bold">
              01 // THE CHALLENGE
            </span>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-4">
              {isAr ? "تفكيك المشكلة المعقدة" : "Deconstructing the Core Complexity"}
            </h3>
            <p className="text-neutral-cool text-base sm:text-lg leading-relaxed">{project.challenge}</p>
          </div>

          {/* Strategy & Architecture Block */}
          <div className="p-8 sm:p-12 rounded-3xl bg-soft-black border border-white/10">
            <span className="text-xs font-mono text-engineering-blue uppercase tracking-widest block mb-3 font-bold">
              02 // THE STRATEGY & ARCHITECTURE
            </span>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-4">
              {isAr ? "المعمارية التقنية والتنفيذ" : "Architectural Execution & Systems"}
            </h3>
            <p className="text-neutral-cool text-base sm:text-lg leading-relaxed mb-8">{project.strategy}</p>

            <div className="pt-6 border-t border-white/10">
              <span className="text-xs font-mono text-white/50 block mb-3">PRODUCTION TECH STACK</span>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((stk: string, idx: number) => (
                  <span key={idx} className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white">
                    {stk}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* CTA Box */}
          <div className="p-10 sm:p-16 rounded-3xl bg-gradient-to-br from-engineering-blue/20 to-creative-coral/10 border border-white/20 text-center flex flex-col items-center">
            <h3 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4">
              {isAr ? "هل لديك مشروع مماثل؟" : "Have a Similar Vision?"}
            </h3>
            <p className="text-neutral-cool text-sm sm:text-base max-w-md mb-8">
              {isAr ? "دعنا نناقش المعمارية والتصميم المخصص لتحويل فكرتك إلى واقع." : "Let's structure your idea into scalable code and iconic visual design."}
            </p>
            <button
              onClick={() => setIsBuilderOpen(true)}
              className="px-8 py-4 rounded-full bg-white text-obsidian font-bold text-xs tracking-wider uppercase flex items-center gap-3 hover:bg-engineering-blue hover:text-white transition-all shadow-xl"
            >
              <span>{isAr ? "ابدأ مشروعك الآن" : "START A PROJECT"}</span>
              <ArrowUpRight size={16} />
            </button>
          </div>
        </div>
      </div>

      <ProjectBuilderModal isOpen={isBuilderOpen} onClose={() => setIsBuilderOpen(false)} locale={locale} />
    </main>
  );
}