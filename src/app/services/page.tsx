"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Cpu, Layers, Palette, Sparkles, Workflow } from "lucide-react";
import { Header } from "@/components/navigation/Header";
import { CustomCursor } from "@/components/cursor/CustomCursor";
import { ProjectBuilderModal } from "@/components/home/ProjectBuilderModal";

export default function ServicesPage() {
  const [locale, setLocale] = useState<"en" | "ar">("en");
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const isAr = locale === "ar";

  const categories = [
    {
      title: isAr ? "الهندسة والبرمجيات // ENGINEERING" : "01 // SOFTWARE ENGINEERING",
      desc: isAr ? "أنظمة برمجية سحابية، منصات SaaS، وتطبيقات ويب فائقة السرعة." : "Cloud distributed architectures, reactive web applications, APIs, and headless commerce.",
      color: "border-engineering-blue text-engineering-blue",
      items: isAr
        ? ["منصات SaaS وتطبيقات الويب", "معمارية الـ APIs والـ Microservices", "تطبيقات الويب بـ WebGL", "التجارة الإلكترونية المفصولة الرأس"]
        : ["SaaS & Cloud Multi-Tenancy", "Connected API Gateways", "WebGL Data Visualizers", "Headless E-Commerce"],
    },
    {
      title: isAr ? "الذكاء الاصطناعي والأتمتة // AI" : "02 // AI & AUTOMATION",
      desc: isAr ? "نماذج الذكاء الاصطناعي التوليدي، الأتمتة الذكية، وتحليل البيانات الفوري." : "Custom LLM inference pipelines, autonomous agents, and workflow automations.",
      color: "border-engineering-violet text-engineering-violet",
      items: isAr
        ? ["تكامل نماذج الذكاء الاصطناعي AI", "أتمتة العمليات ومحركات سير العمل", "محركات البحث الدلالية", "معالجة البيانات الفورية"]
        : ["Custom LLM Integration", "Workflow Engine Automations", "Semantic Search Systems", "Real-Time Telemetry"],
    },
    {
      title: isAr ? "الإبداع والهوية البصرية // CREATIVE" : "03 // BRAND & CREATIVE",
      desc: isAr ? "تصميم الهويات التجارية، واجهات وتجربة المستخدم، والتغليف الفاخر." : "Art-directed brand systems, luxury packaging, and conversion-engineered UI/UX.",
      color: "border-creative-coral text-creative-coral",
      items: isAr
        ? ["استراتيجية وبناء الهوية البصرية", "تصميم واجهات وتجربة المستخدم UI/UX", "تصميم التغليف ثلاثي الأبعاد 3D", "الموشن جرافيكس والإخراج الإبداعي"]
        : ["Strategic Brand Identity", "UI / UX Design Systems", "3D & Tactile Packaging", "Cinematic Motion Design"],
    },
  ];

  return (
    <main dir={isAr ? "rtl" : "ltr"} className={`min-h-screen bg-obsidian text-white pt-32 pb-24 ${isAr ? "font-arabic" : "font-sans"}`}>
      <CustomCursor />
      <Header locale={locale} onToggleLocale={() => setLocale(l => l === "en" ? "ar" : "en")} onOpenProjectBuilder={() => setIsBuilderOpen(true)} />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-16">
          <span className="text-xs font-mono text-engineering-blue uppercase tracking-widest block mb-3 font-bold">
            {isAr ? "الخدمات والقدرات الشاملة" : "CAPABILITIES & DISCIPLINES"}
          </span>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-black tracking-tight text-white mb-6">
            {isAr ? "تكنولوجيا متقدمة × تصميم استثنائي" : "Engineered to Transform"}
          </h1>
          <p className="text-neutral-cool text-base sm:text-lg max-w-2xl leading-relaxed">
            {isAr
              ? "نجمع بين أرقى الممارسات الهندسية والإبداعية لبناء منتجات رقمية تقود السوق العالمي."
              : "We structure complexity into high-performing digital systems, unforgettable brands, and conversion experiences."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {categories.map((cat, idx) => (
            <div key={idx} className="p-8 sm:p-10 rounded-3xl bg-soft-black border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between shadow-2xl">
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

              <div className="pt-8 mt-8 border-t border-white/5">
                <button
                  onClick={() => setIsBuilderOpen(true)}
                  className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-white hover:text-engineering-blue transition-colors"
                >
                  <span>{isAr ? "طلب استشارة للمشروع ←" : "Start with this discipline →"}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ProjectBuilderModal isOpen={isBuilderOpen} onClose={() => setIsBuilderOpen(false)} locale={locale} />
    </main>
  );
}