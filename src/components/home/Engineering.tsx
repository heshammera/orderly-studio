"use client";

import React, { useState } from "react";
import {
  Cpu,
  TrendingUp,
  Globe,
  Database,
  Sparkles,
  ShoppingBag,
  Search,
  Mail,
  Layers,
  ArrowRight,
  Bot,
  Zap,
  CheckCircle2,
  BarChart3,
  ShieldCheck,
} from "lucide-react";

interface EngineeringProps {
  locale: "en" | "ar";
  onOpenProjectBuilder?: () => void;
}

type CategoryType = "all" | "engineering" | "marketing" | "design";

interface CapabilityItem {
  id: string;
  category: "engineering" | "marketing" | "design";
  titleEn: string;
  titleAr: string;
  tagEn: string;
  tagAr: string;
  badgeEn: string;
  badgeAr: string;
  descEn: string;
  descAr: string;
  metricsEn: string[];
  metricsAr: string[];
  icon: React.ReactNode;
  accentColor: string;
  accentBorder: string;
  accentBg: string;
  glowColor: string;
}

export const Engineering: React.FC<EngineeringProps> = ({ locale, onOpenProjectBuilder }) => {
  const isAr = locale === "ar";
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>("all");
  const [activeKey, setActiveKey] = useState<string>("saas");

  const capabilities: CapabilityItem[] = [
    /* ── Engineering & AI ── */
    {
      id: "saas",
      category: "engineering",
      titleEn: "Multi-Tenant SaaS Platforms",
      titleAr: "منصات البرمجيات السحابية SaaS",
      tagEn: "ENGINEERING",
      tagAr: "برمجيات سحابية",
      badgeEn: "NEXT.JS // POSTGRESQL // EDGE",
      badgeAr: "NEXT.JS // سحابيات // قاعدة بيانات",
      descEn:
        "High-performance cloud architectures engineered with Next.js App Router, edge computing, authenticated databases, and sub-100ms latency.",
      descAr:
        "بنية سحابية فائقة السرعة مبنية بأحدث تقنيات Next.js وقواعد بيانات PostgreSQL لتشغيل المنصات الضخمة بزمن استجابة أقل من 100ms.",
      metricsEn: ["Sub-100ms Load Speed", "Auto-Scaling Ready", "Enterprise Security"],
      metricsAr: ["تحميل في أجزاء من الثانية", "توسع تلقائي مع الضغط", "أعلى معايير الأمان"],
      icon: <Cpu className="w-5 h-5 text-sky-400" />,
      accentColor: "text-sky-400",
      accentBorder: "border-sky-500/40",
      accentBg: "bg-sky-500/10",
      glowColor: "rgba(56, 189, 248, 0.25)",
    },
    {
      id: "ai",
      category: "engineering",
      titleEn: "Custom AI Engines & Agents",
      titleAr: "أنظمة الذكاء الاصطناعي والمساعدات الذاتية",
      tagEn: "AI & NEURAL",
      tagAr: "ذكاء اصطناعي وأتمتة",
      badgeEn: "LLM // VECTOR DB // AGENTS",
      badgeAr: "نماذج لغوية // ذاكرة سياقية // أتمتة",
      descEn:
        "Proprietary AI concierges and neural automation pipelines trained on private business knowledge to resolve complex user inquiries instantly.",
      descAr:
        "مساعدات ذكاء اصطناعي مخصصة ومدربة على بيانات شركتك للرد الفوري على العملاء وإتمام العمليات دون تدخل بشري.",
      metricsEn: ["Contextual Memory (RAG)", "99.9% Uptime SLA", "24/7 Autonomous Tasks"],
      metricsAr: ["ذاكرة دلالية ببياناتك", "تشغيل مستمر 24/7", "إنجاز العمليات آلياً"],
      icon: <Bot className="w-5 h-5 text-purple-400" />,
      accentColor: "text-purple-400",
      accentBorder: "border-purple-500/40",
      accentBg: "bg-purple-500/10",
      glowColor: "rgba(168, 85, 247, 0.25)",
    },
    {
      id: "ecommerce",
      category: "engineering",
      titleEn: "Headless E-Commerce & Checkout",
      titleAr: "التجارة الإلكترونية وبوابات الدفع الفورية",
      tagEn: "E-COMMERCE",
      tagAr: "تجارة رقمية",
      badgeEn: "FRICTIONLESS // CART // STRIPE",
      badgeAr: "دفع سريع // سلة متقدمة // بوابات عالمية",
      descEn:
        "Frictionless checkout flows, multi-currency payment gateway integrations, and instant cart telemetry optimized for peak revenue.",
      descAr:
        "متاجر إلكترونية مفصولة الرأس وتدفق شراء بدون أي احتكاك مع ربط فوري لبوابات الدفع المحلية والعالمية لمضاعفة المبيعات.",
      metricsEn: ["One-Click Checkout", "Multi-Currency Ready", "Instant Cart Sync"],
      metricsAr: ["شراء بنقرة واحدة", "دعم العملات المتعددة", "تزامن فوري للمخزون"],
      icon: <ShoppingBag className="w-5 h-5 text-indigo-400" />,
      accentColor: "text-indigo-400",
      accentBorder: "border-indigo-500/40",
      accentBg: "bg-indigo-500/10",
      glowColor: "rgba(99, 102, 241, 0.25)",
    },

    /* ── Digital Marketing & Growth ── */
    {
      id: "ads",
      category: "marketing",
      titleEn: "High-ROAS Paid Ads Campaigns",
      titleAr: "إدارة الحملات الإعلانية الممولة (Paid Ads)",
      tagEn: "MARKETING",
      tagAr: "إعلانات ونمو",
      badgeEn: "GOOGLE // META // TIKTOK // ROAS",
      badgeAr: "جوجل // ميتا // تيك توك // عائد إعلاني",
      descEn:
        "Precision targeted paid acquisition across Google Ads, Meta, TikTok, and LinkedIn with continuous creative A/B testing to maximize revenue.",
      descAr:
        "إطلاق وإدارة الحملات الإعلانية الممولة على جوجل، إنستغرام، تيك توك، ولينكد إن مع اختبار مستمر للمحتوى لتحقيق أعلى عائد استثماري (ROAS).",
      metricsEn: ["3.5x–6.2x Target ROAS", "Dynamic Creative Testing", "Pixel & API Tracking"],
      metricsAr: ["عائد استثماري مضاعف", "اختبار وتطوير الإعلانات", "بكسل تتبع متقدم دقيق"],
      icon: <TrendingUp className="w-5 h-5 text-emerald-400" />,
      accentColor: "text-emerald-400",
      accentBorder: "border-emerald-500/40",
      accentBg: "bg-emerald-500/10",
      glowColor: "rgba(16, 185, 129, 0.25)",
    },
    {
      id: "seo",
      category: "marketing",
      titleEn: "Search Engine Dominance (SEO)",
      titleAr: "تصدر نتائج محركات البحث (SEO)",
      tagEn: "GROWTH",
      tagAr: "سيو وتصدر بحث",
      badgeEn: "ORGANIC // TECHNICAL // INTENT",
      badgeAr: "زيارات مجانية // سيو تقني // تصدر الكلمات",
      descEn:
        "Technical core web vitals optimization, high-intent keyword mapping, and authority content engines designed to rank #1 organically.",
      descAr:
        "تهيئة فنية شاملة للموقع، استهداف الكلمات الأكثر طلباً، وبناء سلطة النطاق لجلب عملاء ذوي نية شراء عالية من جوجل مجاناً.",
      metricsEn: ["Core Web Vitals 95+", "High-Intent Rankings", "Monthly Traffic Growth"],
      metricsAr: ["أعلى تقييم فني Core Vitals", "تصدر النتائج الأولى", "نمو مستمر في الزيارات"],
      icon: <Search className="w-5 h-5 text-teal-400" />,
      accentColor: "text-teal-400",
      accentBorder: "border-teal-500/40",
      accentBg: "bg-teal-500/10",
      glowColor: "rgba(20, 184, 166, 0.25)",
    },
    {
      id: "funnels",
      category: "marketing",
      titleEn: "Automated Funnels & CRM Retention",
      titleAr: "قمع المبيعات والتسويق الآلي (CRM)",
      tagEn: "RETENTION",
      tagAr: "أتمتة مبيعات",
      badgeEn: "AUTOMATED CRM // EMAIL // RETARGETING",
      badgeAr: "إيميل آلي // إعادة استهداف // رفع قيمة العميل",
      descEn:
        "Behavioral email sequences, automated lead scoring, and abandoned checkout recovery that turns one-time visitors into repeat buyers.",
      descAr:
        "سلاسل بريد إلكتروني تفاعلية، استرداد السلات المتروكة تلقائياً، وإعادة استهداف ذكية ترفع القيمة الدائمة للعميل (LTV).",
      metricsEn: ["Automated Sequences", "Lead Scoring Pipelines", "Higher Customer LTV"],
      metricsAr: ["رسائل مؤتمتة ذكية", "تأهيل العملاء المحتملين", "مضاعفة عمليات الشراء"],
      icon: <Mail className="w-5 h-5 text-amber-400" />,
      accentColor: "text-amber-400",
      accentBorder: "border-amber-500/40",
      accentBg: "bg-amber-500/10",
      glowColor: "rgba(245, 158, 11, 0.25)",
    },

    /* ── Design & Experience ── */
    {
      id: "uiux",
      category: "design",
      titleEn: "Luxury UI / UX Design Systems",
      titleAr: "تصميم الواجهات وأنظمة التصميم الفاخرة",
      tagEn: "DESIGN",
      tagAr: "واجهات وتجربة",
      badgeEn: "FIGMA // DESIGN TOKENS // PROTOTYPES",
      badgeAr: "FIGMA // نظام موحد // نماذج تفاعلية",
      descEn:
        "Art-directed design systems, bespoke micro-interactions, and high-conversion wireframes crafted for seamless developer execution.",
      descAr:
        "تصميم واجهات وتطبيقات تفاعلية متكاملة مع مكتبة عناصر معيارية ونماذج أولية حية قبل بدء مرحلة البرمجة.",
      metricsEn: ["Figma Master Library", "Interactive Prototypes", "Developer Handover Spec"],
      metricsAr: ["ملفات Figma المنظمة", "نموذج تجربة حي", "دليل تسليم للمطورين"],
      icon: <Sparkles className="w-5 h-5 text-rose-400" />,
      accentColor: "text-rose-400",
      accentBorder: "border-rose-500/40",
      accentBg: "bg-rose-500/10",
      glowColor: "rgba(244, 63, 94, 0.25)",
    },
    {
      id: "dashboards",
      category: "engineering",
      titleEn: "Custom Admin Dashboards & APIs",
      titleAr: "لوحات التحكم الإدارية والواجهات البرمجية",
      tagEn: "PORTALS",
      tagAr: "لوحات تحكم",
      badgeEn: "REST // GRAPHQL // TELEMETRY",
      badgeAr: "APIs // تقارير حية // إدارة بيانات",
      descEn:
        "Intuitive admin control centers to manage orders, inventory, content, and real-time revenue analytics with zero friction.",
      descAr:
        "لوحات تحكم إدارية سهلة وسريعة لإدارة المحتوى والطلبات والعملاء ومتابعة الإحصائيات المالية والتشغيلية لحظة بلحظة.",
      metricsEn: ["Real-Time Analytics", "Role-Based Access", "Data Export & Audit"],
      metricsAr: ["إحصائيات وتقارير لحظية", "صلاحيات متعددة للمستخدمين", "تصدير فوري للبيانات"],
      icon: <BarChart3 className="w-5 h-5 text-cyan-400" />,
      accentColor: "text-cyan-400",
      accentBorder: "border-cyan-500/40",
      accentBg: "bg-cyan-500/10",
      glowColor: "rgba(6, 182, 212, 0.25)",
    },
  ];

  const filteredCapabilities =
    selectedCategory === "all"
      ? capabilities
      : capabilities.filter((c) => c.category === selectedCategory);

  const activeCapability =
    capabilities.find((c) => c.id === activeKey) || capabilities[0];

  const categoryTabs = [
    { id: "all", labelEn: "All Capabilities", labelAr: "كافة القدرات والحلول" },
    { id: "engineering", labelEn: "⚡ Engineering & AI", labelAr: "⚡ الهندسة والذكاء الاصطناعي" },
    { id: "marketing", labelEn: "📈 Marketing & Growth", labelAr: "📈 التسويق ونمو المبيعات" },
    { id: "design", labelEn: "🎨 UI / UX & Design", labelAr: "🎨 التصميم والواجهات" },
  ];

  return (
    <section
      id="services"
      className="relative py-28 bg-[#07070A] text-white bg-grid-pattern overflow-hidden border-t border-white/10"
      dir={isAr ? "rtl" : "ltr"}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-8 border-b border-white/10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-emerald-400 text-xs font-mono mb-4 font-bold">
              <span>{isAr ? "02 // المحرك التكنولوجي والتسويقي" : "02 // TECHNOLOGY & GROWTH ENGINE"}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight text-white leading-tight">
              {isAr ? "أنظمة رقمية فائقة السرعة واستراتيجيات نمو متكاملة" : "Digital Systems & Growth Engines Built to Scale"}
            </h2>
          </div>

          <p className="text-slate-300 text-sm max-w-md leading-relaxed">
            {isAr
              ? "نجمع بين هندسة الكود النقي، تطبيقات الذكاء الاصطناعي، وإدارة الحملات التسويقية عالية العائد في محرك عمل واحد."
              : "We unite clean full-stack code, bespoke AI models, and high-ROAS marketing campaigns into one cohesive engine."}
          </p>
        </div>

        {/* Category Filters Bar */}
        <div className="flex flex-wrap gap-2 mb-10 pb-2">
          {categoryTabs.map((tab) => {
            const isSelected = selectedCategory === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedCategory(tab.id as CategoryType)}
                className={`px-4 py-2.5 rounded-full text-xs font-mono font-bold tracking-wider transition-all duration-200 border ${
                  isSelected
                    ? "bg-white text-black border-white shadow-lg shadow-white/10 scale-[1.02]"
                    : "bg-white/5 text-slate-300 border-white/10 hover:border-white/25 hover:text-white hover:bg-white/10"
                }`}
              >
                {isAr ? tab.labelAr : tab.labelEn}
              </button>
            );
          })}
        </div>

        {/* ── Main Dual Showcase Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left / Top: Interactive Capabilities Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {filteredCapabilities.map((item) => {
              const isSelected = activeKey === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveKey(item.id)}
                  onMouseEnter={() => setActiveKey(item.id)}
                  className={`p-5 rounded-2xl border text-start transition-all duration-300 flex flex-col justify-between group relative overflow-hidden ${
                    isSelected
                      ? `bg-white/[0.08] ${item.accentBorder} shadow-xl scale-[1.02] ring-1 ring-white/15`
                      : "bg-white/[0.03] border-white/10 hover:border-white/25 hover:bg-white/[0.06]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                        isSelected
                          ? `${item.accentBg} ${item.accentBorder} border shadow-md`
                          : "bg-white/5 border border-white/5 group-hover:bg-white/10"
                      }`}
                    >
                      {item.icon}
                    </div>

                    <span
                      className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${
                        isSelected
                          ? `${item.accentBg} ${item.accentBorder} ${item.accentColor}`
                          : "bg-white/5 border-white/10 text-slate-400"
                      }`}
                    >
                      {isAr ? item.tagAr : item.tagEn}
                    </span>
                  </div>

                  <div>
                    <h3
                      className={`text-sm sm:text-base font-display font-bold mb-1 leading-snug ${
                        isSelected ? "text-white font-black" : "text-white/90 group-hover:text-white"
                      }`}
                    >
                      {isAr ? item.titleAr : item.titleEn}
                    </h3>
                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                      {isAr ? item.descAr : item.descEn}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right / Bottom: Live Concept Deep-Dive Viewport */}
          <div className="lg:col-span-5 rounded-3xl bg-[#0C0D14] border border-white/15 p-7 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden">
            {/* Dynamic Glow */}
            <div
              className="absolute top-0 right-0 w-72 h-72 rounded-full blur-[100px] opacity-30 pointer-events-none transition-colors duration-700"
              style={{ backgroundColor: activeCapability.glowColor }}
            />

            <div className="relative z-10">
              {/* Top Meta Bar */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <span className={`text-xs font-mono font-bold uppercase tracking-wider ${activeCapability.accentColor}`}>
                  {isAr ? activeCapability.badgeAr : activeCapability.badgeEn}
                </span>
                <span className="text-[10px] font-mono text-emerald-400 font-bold flex items-center gap-1.5 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>LIVE_ENGINE</span>
                </span>
              </div>

              {/* Title & Tag */}
              <div className="flex items-center gap-3 mb-2">
                <div className={`p-2.5 rounded-xl ${activeCapability.accentBg} ${activeCapability.accentBorder} border`}>
                  {activeCapability.icon}
                </div>
                <h3 className="text-xl sm:text-2xl font-display font-bold text-white leading-snug">
                  {isAr ? activeCapability.titleAr : activeCapability.titleEn}
                </h3>
              </div>

              <p className="text-slate-200 text-xs sm:text-sm leading-relaxed my-5">
                {isAr ? activeCapability.descAr : activeCapability.descEn}
              </p>

              {/* 3 Metrics / Capabilities */}
              <div className="space-y-2 pt-4 border-t border-white/10 mb-6">
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold block mb-2">
                  {isAr ? "المزايا والمخرجات الأساسية:" : "KEY DELIVERABLES & SPECS:"}
                </span>
                {(isAr ? activeCapability.metricsAr : activeCapability.metricsEn).map((metric, mIdx) => (
                  <div key={mIdx} className="flex items-center gap-2 text-xs text-slate-100 font-mono">
                    <CheckCircle2 size={13} className="text-emerald-400 flex-shrink-0" />
                    <span>{metric}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Action Bar */}
            <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between gap-4">
              <a
                href="#work"
                className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-300 hover:text-white transition-colors"
              >
                <span>{isAr ? "استعراض النماذج الحية ←" : "Explore Live Work →"}</span>
              </a>

              <button
                type="button"
                onClick={onOpenProjectBuilder}
                className="px-5 py-2.5 rounded-full bg-white hover:bg-slate-200 text-black text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-lg hover:scale-105"
              >
                {isAr ? "اطلب هذه الخدمة" : "Start Project"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
