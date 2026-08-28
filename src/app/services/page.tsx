"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Orbit } from "lucide-react";
import { Header } from "@/components/navigation/Header";
import { CustomCursor } from "@/components/cursor/CustomCursor";
import { ProjectBuilderModal } from "@/components/home/ProjectBuilderModal";
import { WorldPortal } from "@/components/worlds/WorldPortal";
import type { WorldId } from "@/components/worlds/WorldCanvas";

export default function ServicesPage() {
  const [locale, setLocale] = useState<"en" | "ar">("en");
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const [builderInitialWorld, setBuilderInitialWorld] = useState<WorldId>("uiux");
  const [activeWorld, setActiveWorld] = useState<WorldId | null>(null);
  const isAr = locale === "ar";

  const handleOpenBuilder = (worldId?: WorldId) => {
    if (worldId) setBuilderInitialWorld(worldId);
    setIsBuilderOpen(true);
  };

  const categories: {
    title: string;
    desc: string;
    color: string;
    link: string;
    worldId: WorldId;
    items: string[];
  }[] = [
    {
      title: isAr ? "الهندسة والبرمجيات // ENGINEERING" : "01 // SOFTWARE ENGINEERING",
      desc: isAr ? "أنظمة برمجية سحابية، منصات SaaS، وتطبيقات ويب فائقة السرعة." : "Cloud distributed architectures, reactive web applications, APIs, and headless commerce.",
      color: "border-engineering-blue text-engineering-blue",
      link: "/#work",
      worldId: "engineering",
      items: isAr
        ? ["منصات SaaS وتطبيقات الويب", "معمارية الـ APIs والـ Microservices", "تطبيقات الويب بـ WebGL", "التجارة الإلكترونية المفصولة الرأس"]
        : ["SaaS & Cloud Multi-Tenancy", "Connected API Gateways", "WebGL Data Visualizers", "Headless E-Commerce"],
    },
    {
      title: isAr ? "الذكاء الاصطناعي والأتمتة // AI" : "02 // AI & AUTOMATION",
      desc: isAr ? "نماذج الذكاء الاصطناعي التوليدي، الأتمتة الذكية، وتحليل البيانات الفوري." : "Custom LLM inference pipelines, autonomous agents, and workflow automations.",
      color: "border-engineering-violet text-engineering-violet",
      link: "/#work",
      worldId: "ai",
      items: isAr
        ? ["تكامل نماذج الذكاء الاصطناعي AI", "أتمتة العمليات ومحركات سير العمل", "محركات البحث الدلالية", "معالجة البيانات الفورية"]
        : ["Custom LLM Integration", "Workflow Engine Automations", "Semantic Search Systems", "Real-Time Telemetry"],
    },
    {
      title: isAr ? "الإبداع والهوية البصرية // CREATIVE" : "03 // BRAND & CREATIVE",
      desc: isAr ? "تصميم الهويات التجارية، واجهات وتجربة المستخدم، والتغليف الفاخر." : "Art-directed brand systems, luxury packaging, and conversion-engineered UI/UX.",
      color: "border-creative-coral text-creative-coral",
      link: "/#work",
      worldId: "branding",
      items: isAr
        ? ["استراتيجية وبناء الهوية البصرية", "تصميم واجهات وتجربة المستخدم UI/UX", "تصميم التغليف ثلاثي الأبعاد 3D", "الموشن جرافيكس والإخراج الإبداعي"]
        : ["Strategic Brand Identity", "UI / UX Design Systems", "3D & Tactile Packaging", "Cinematic Motion Design"],
    },
    {
      title: isAr ? "التسويق الرقمي // MARKETING" : "04 // DIGITAL MARKETING",
      desc: isAr ? "استراتيجيات تسويقية مبنية على البيانات تحقق نمواً حقيقياً وقابلاً للقياس." : "Data-driven marketing strategies that deliver measurable reach, engagement, and revenue growth.",
      color: "border-emerald-400 text-emerald-400",
      link: "/marketing",
      worldId: "marketing",
      items: isAr
        ? ["استراتيجية التسويق الرقمي", "تحسين محركات البحث SEO", "إدارة منصات التواصل الاجتماعي", "الإعلانات المدفوعة Paid Media", "التسويق عبر البريد CRM"]
        : ["Digital Marketing Strategy", "SEO & Organic Growth", "Social Media Management", "Paid Media & Performance", "Email & CRM Automation"],
    },
  ];

  return (
    <main dir={isAr ? "rtl" : "ltr"} className={`min-h-screen bg-obsidian text-white pt-32 pb-24 ${isAr ? "font-arabic" : "font-sans"}`}>
      <CustomCursor />
      <Header
        locale={locale}
        onToggleLocale={() => setLocale((l) => (l === "en" ? "ar" : "en"))}
        onOpenProjectBuilder={() => handleOpenBuilder()}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-16">
          <span className="text-xs font-mono text-engineering-blue uppercase tracking-widest block mb-3 font-bold">
            {isAr ? "الخدمات والقدرات الشاملة" : "CAPABILITIES & DISCIPLINES"}
          </span>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-black tracking-tight text-white mb-6">
            {isAr ? "تكنولوجيا × تصميم × تسويق" : "Engineering × Design × Marketing"}
          </h1>
          <p className="text-neutral-cool text-base sm:text-lg max-w-2xl leading-relaxed">
            {isAr
              ? "نجمع بين أرقى الممارسات الهندسية والإبداعية والتسويقية لبناء منتجات رقمية تقود السوق العالمي."
              : "We fuse engineering precision, creative artistry, and marketing intelligence into complete digital products that lead markets."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {categories.map((cat, idx) => (
            <div key={idx} className="group p-8 sm:p-10 rounded-3xl bg-soft-black border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between shadow-2xl relative overflow-hidden">
              <div>
                <span className={`text-xs font-mono font-bold tracking-widest block pb-4 mb-6 border-b ${cat.color}`}>
                  {cat.title}
                </span>
                <p className="text-neutral-cool text-sm leading-relaxed mb-8">{cat.desc}</p>
                <ul className="space-y-3">
                  {cat.items.map((item, i) => (
                    <li key={i} className="text-sm font-medium text-white/90 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-engineering-blue" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8 mt-8 border-t border-white/5 flex items-center justify-between gap-3">
                <button
                  onClick={() => handleOpenBuilder(cat.worldId)}
                  className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-white hover:text-engineering-blue transition-colors"
                >
                  <span>{isAr ? "طلب استشارة ←" : "Request a consultation →"}</span>
                </button>

                {/* ── Enter World button ── */}
                <button
                  onClick={() => setActiveWorld(cat.worldId)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-[10px] font-mono font-bold tracking-widest uppercase transition-all duration-300 ${cat.color} border-current opacity-60 hover:opacity-100 hover:bg-white/5`}
                  data-cursor="EXPLORE"
                >
                  <Orbit size={11} />
                  <span>{isAr ? "ادخل العالم" : "ENTER REALM"}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="p-10 sm:p-14 rounded-3xl bg-gradient-to-br from-engineering-blue/15 to-creative-coral/10 border border-white/20 text-center flex flex-col items-center">
          <h3 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4">
            {isAr ? "لديك مشروع يجمع أكثر من تخصص؟" : "Need a Multi-Discipline Project?"}
          </h3>
          <p className="text-neutral-cool text-sm max-w-md mb-8 leading-relaxed">
            {isAr
              ? "نحن متخصصون في بناء المشاريع التي تحتاج إلى الهندسة والتصميم والتسويق في آن واحد تحت سقف استوديو واحد."
              : "We specialize in end-to-end projects combining engineering, creative, and marketing disciplines under one roof."}
          </p>
          <button
            onClick={() => handleOpenBuilder()}
            className="px-8 py-4 rounded-full bg-white text-obsidian font-bold text-xs tracking-wider uppercase flex items-center gap-3 hover:bg-engineering-blue hover:text-white transition-all shadow-xl"
          >
            <span>{isAr ? "ابدأ مشروعك الآن" : "START A PROJECT"}</span>
            <ArrowUpRight size={16} />
          </button>
        </div>
      </div>

      <ProjectBuilderModal
        isOpen={isBuilderOpen}
        onClose={() => setIsBuilderOpen(false)}
        locale={locale}
        initialWorld={builderInitialWorld}
      />

      {/* World Portal — opens on top of everything */}
      {activeWorld && (
        <WorldPortal
          worldId={activeWorld}
          isOpen={activeWorld !== null}
          onClose={() => setActiveWorld(null)}
          locale={locale}
          onOpenProjectBuilder={(wid) => handleOpenBuilder(wid)}
        />
      )}
    </main>
  );
}