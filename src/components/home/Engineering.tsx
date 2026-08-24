"use client";

import React, { useState } from "react";
import { Cpu, Terminal, Layers, Database, Sparkles, Workflow, ShoppingBag, Globe, ArrowRight, ArrowUpRight } from "lucide-react";

interface EngineeringProps {
  locale: "en" | "ar";
}

export const Engineering: React.FC<EngineeringProps> = ({ locale }) => {
  const isAr = locale === "ar";
  const [activeKey, setActiveKey] = useState<string>("ai");

  const services = [
    {
      id: "ai",
      title: "AI",
      fullTitle: isAr ? "الذكاء الاصطناعي والأنظمة الذاتية" : "AI & Autonomous Systems",
      desc: isAr
        ? "أنظمة ذكاء اصطناعي ذكية مبنية حول مشاكل الأعمال الحقيقية ونماذج التوليد الفوري."
        : "Intelligent systems built around real business problems and neural inference pipelines.",
      meta: "NEURAL_NET // LLM // EMBEDDINGS",
      concept: "neural",
    },
    {
      id: "ecommerce",
      title: "E-COMMERCE",
      fullTitle: isAr ? "التجارة الإلكترونية المفصولة الرأس" : "Headless E-Commerce & Checkout",
      desc: isAr
        ? "متاجر إلكترونية فائقة السرعة مع تدفق شراء بدون احتكاك وتكامل الدفع الفوري."
        : "Frictionless checkout architectures, real-time cart telemetry, and global conversion flows.",
      meta: "CART // CHECKOUT // ANALYTICS",
      concept: "commerce",
    },
    {
      id: "apis",
      title: "APIs",
      fullTitle: isAr ? "معمارية الواجهات البرمجية والـ Microservices" : "Connected API Architecture",
      desc: isAr
        ? "واجهات برمجية متصلة وشبكة عقد سحابية تدعم ملايين الطلبات بزمن استجابة أقل من 15ms."
        : "Connected node gateways, event-driven microservices, and high-throughput data pipelines.",
      meta: "GRAPHQL // REST // WEBSOCKETS",
      concept: "architecture",
    },
    {
      id: "saas",
      title: "SAAS",
      fullTitle: isAr ? "منصات البرمجيات السحابية SaaS" : "Multi-Tenant SaaS Platforms",
      desc: isAr
        ? "تطبيقات سحابية متعددة المستأجرين مع لوحات تحكم تفاعلية وقابلية توسع تلقائية."
        : "Multi-tenant dashboards, edge computing, distributed databases, and automated scaling.",
      meta: "TENANCY // METRICS // BILLING",
      concept: "dashboard",
    },
    {
      id: "webapps",
      title: "WEB APPS",
      fullTitle: isAr ? "تطبيقات الويب عالية الأداء" : "Reactive Web Applications",
      desc: isAr
        ? "واجهات ويب معقدة تفاعلية مبنية بتقنيات الـ WebGL لبيئات العمل الاحترافية."
        : "Complex single-page applications, WebGL spatial charts, and zero-latency client interactions.",
      meta: "REACT // TYPESCRIPT // WEBGL",
      concept: "reactive",
    },
    {
      id: "automation",
      title: "AUTOMATION",
      fullTitle: isAr ? "محركات الأتمتة وسير العمل" : "Workflow Engines & Triggers",
      desc: isAr
        ? "أتمتة العمليات التجارية وربط الأنظمة لتقليل التدخل اليدوي ومضاعفة الكفاءة."
        : "Event-driven workflow engines, webhook automations, and custom business logic bots.",
      meta: "QUEUES // CRON // TRIGGERS",
      concept: "workflow",
    },
    {
      id: "websites",
      title: "WEBSITES",
      fullTitle: isAr ? "مواقع الاستوديو الفاخرة" : "Ultra-Fast Studio Websites",
      desc: isAr
        ? "مواقع ويب فائقة السرعة ومصممة بأعلى معايير الـ SEO والتفاعل العالمي."
        : "Editorial brand experiences engineered for lighthouse 100/100 performance scores.",
      meta: "NEXT.JS // EDGE // SEO",
      concept: "studio",
    },
    {
      id: "desktop",
      title: "DESKTOP",
      fullTitle: isAr ? "تطبيقات سطح المكتب المتقدمة" : "Cross-Platform Desktop Apps",
      desc: isAr
        ? "تطبيقات سطح مكتب سريعة تعمل عبر منصات متعددة مع وصول عميق للنظام."
        : "Native cross-platform desktop software engineered for offline-first resilience.",
      meta: "TAURI // ELECTRON // RUST",
      concept: "native",
    },
  ];

  const currentService = services.find((s) => s.id === activeKey) || services[0];

  return (
    <section id="services" className="relative py-32 bg-obsidian text-white bg-grid-pattern overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-white/10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-engineering-blue/10 border border-engineering-blue/20 text-engineering-blue text-xs font-mono mb-4">
              <span>{isAr ? "عالم الهندسة البرمجية" : "02 // ENGINEERING"}</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight">
              {isAr ? "أنظمة رقمية مصممة للتوسع" : "Digital systems engineered for ambitious ideas."}
            </h2>
          </div>
        </div>

        {/* 06 Interactive Engineering Service Field */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Orbit Service Field Matrix */}
          <div className="lg:col-span-7 relative p-8 sm:p-12 rounded-3xl bg-soft-black/80 border border-white/10 backdrop-blur-xl">
            {/* Center Core Badge */}
            <div className="flex items-center justify-center mb-8">
              <div className="px-6 py-2.5 rounded-full bg-engineering-blue/20 border border-engineering-blue text-white font-mono text-xs uppercase tracking-widest font-bold shadow-[0_0_20px_rgba(43,108,255,0.4)]">
                ENGINEERING CORE
              </div>
            </div>

            {/* Orbiting Interactive Service Cloud */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {services.map((srv) => {
                const isActive = activeKey === srv.id;
                return (
                  <button
                    key={srv.id}
                    onClick={() => setActiveKey(srv.id)}
                    onMouseEnter={() => setActiveKey(srv.id)}
                    className={`p-4 rounded-2xl text-center font-display font-black text-sm tracking-wider uppercase transition-all duration-300 border ${
                      isActive
                        ? "bg-engineering-blue text-white border-engineering-blue shadow-[0_0_30px_rgba(43,108,255,0.5)] scale-105"
                        : "bg-white/[0.03] text-white/50 border-white/10 hover:text-white hover:border-white/30"
                    }`}
                    data-cursor="EXP"
                  >
                    {srv.title}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Reactive Concept Viewport */}
          <div className="lg:col-span-5 rounded-3xl bg-soft-black border border-engineering-blue/30 p-8 sm:p-10 flex flex-col justify-between shadow-2xl relative overflow-hidden min-h-[380px]">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-engineering-blue/15 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <span className="text-xs font-mono text-engineering-blue uppercase tracking-widest">
                  {currentService.meta}
                </span>
                <span className="text-[10px] font-mono text-emerald-400">● LIVE_SYSTEM</span>
              </div>

              <h3 className="text-3xl sm:text-4xl font-display font-bold text-white mb-2">
                {currentService.title}
              </h3>
              <h4 className="text-sm font-mono text-neutral-cool mb-4">{currentService.fullTitle}</h4>

              <p className="text-neutral-cool text-sm sm:text-base leading-relaxed mb-6">
                {currentService.desc}
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <a
                href="#work"
                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-engineering-blue hover:text-white transition-colors"
              >
                <span>{isAr ? "استكشف المشاريع البرمجية ←" : "Explore →"}</span>
                <ArrowRight size={14} />
              </a>
              <span className="text-[10px] font-mono text-white/30">NODE_0x{activeKey.toUpperCase()}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
