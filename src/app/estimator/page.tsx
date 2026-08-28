"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Calculator,
  ArrowRight,
  ArrowUpRight,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Cpu,
  Sparkles,
  Bot,
  Layers,
  ShoppingBag,
  TrendingUp,
  Sliders,
  DollarSign,
} from "lucide-react";
import { Header } from "@/components/navigation/Header";
import { CustomCursor } from "@/components/cursor/CustomCursor";
import { Footer } from "@/components/navigation/Footer";
import { ProjectDiscoveryWizard } from "@/components/discovery/ProjectDiscoveryWizard";
import { useLocale } from "@/context/LocaleContext";

interface ScopeOption {
  id: string;
  labelEn: string;
  labelAr: string;
  descEn: string;
  descAr: string;
  icon: React.ReactNode;
  weeks: number;
  baseCostEgp: number;
}

const SCOPE_OPTIONS: ScopeOption[] = [
  {
    id: "saas",
    labelEn: "SaaS Cloud Platform",
    labelAr: "منصة سحابية متكاملة SaaS",
    descEn: "Multi-tenant architecture, Next.js, PostgreSQL, Auth & Payment Gateways",
    descAr: "معمارية متعددة المستأجرين، Next.js، قواعد بيانات، وبوابات دفع",
    icon: <Cpu className="w-5 h-5 text-sky-400" />,
    weeks: 6,
    baseCostEgp: 650000,
  },
  {
    id: "ai",
    labelEn: "AI & LLM Integration",
    labelAr: "ذكاء اصطناعي ونماذج لغوية",
    descEn: "Custom RAG pipeline, Vector DB, autonomous agent workflows",
    descAr: "أنظمة RAG مخصصة، قواعد بيانات دلالية، وعملاء أتمتة",
    icon: <Bot className="w-5 h-5 text-purple-400" />,
    weeks: 4,
    baseCostEgp: 450000,
  },
  {
    id: "branding",
    labelEn: "Royal Brand & Typography",
    labelAr: "هوية بصرية وخطوط مخصصة",
    descEn: "Bilingual typography, luxury logo system, comprehensive design tokens",
    descAr: "خطوط متناغمة، نظام شعار ملكي، ودليل هوية شامل",
    icon: <Sparkles className="w-5 h-5 text-amber-400" />,
    weeks: 3,
    baseCostEgp: 350000,
  },
  {
    id: "mobile",
    labelEn: "Mobile Application",
    labelAr: "تطبيق جوال (iOS & Android)",
    descEn: "React Native, offline-first sync, push notifications",
    descAr: "React Native، مزامنة بدون إنترنت، وتنبيهات فورية",
    icon: <Layers className="w-5 h-5 text-rose-400" />,
    weeks: 6,
    baseCostEgp: 550000,
  },
  {
    id: "ecommerce",
    labelEn: "High-Speed Commerce Store",
    labelAr: "متجر إلكتروني فائق السرعة",
    descEn: "Sub-second checkout, headless architecture, Klaviyo funnels",
    descAr: "شراء في أقل من ثانية، معمارية Headless، وأتمتة مبيعات",
    icon: <ShoppingBag className="w-5 h-5 text-emerald-400" />,
    weeks: 4,
    baseCostEgp: 400000,
  },
  {
    id: "growth",
    labelEn: "Growth & Performance Media",
    labelAr: "إدارة الحملات الإعلانية والنمو",
    descEn: "Dynamic ads testing, technical SEO, ROAS optimization setup",
    descAr: "اختبارات إعلانات ديناميكية، تحسين محركات البحث، ومضاعفة ROAS",
    icon: <TrendingUp className="w-5 h-5 text-cyan-400" />,
    weeks: 3,
    baseCostEgp: 250000,
  },
];

const COMPLEXITY_LEVELS = [
  { id: "mvp", labelEn: "Standard MVP", labelAr: "نموذج أولي قياسي", mult: 1.0, weeksAdd: 0 },
  { id: "advanced", labelEn: "Advanced / Scalable", labelAr: "متقدم وقابل للتوسع", mult: 1.35, weeksAdd: 2 },
  { id: "enterprise", labelEn: "Enterprise SLA (99.98%)", labelAr: "مؤسسي عالي الأمان والامتثال", mult: 1.75, weeksAdd: 4 },
];

export default function EstimatorPage() {
  const { locale, isAr } = useLocale();
  const [selectedScopes, setSelectedScopes] = useState<string[]>(["saas", "branding"]);
  const [complexity, setComplexity] = useState<string>("advanced");
  const [isWizardOpen, setIsWizardOpen] = useState(false);

  const toggleScope = (id: string) => {
    setSelectedScopes((prev) =>
      prev.includes(id) ? (prev.length > 1 ? prev.filter((s) => s !== id) : prev) : [...prev, id]
    );
  };

  const selectedComplexity = COMPLEXITY_LEVELS.find((c) => c.id === complexity) || COMPLEXITY_LEVELS[1];

  const rawWeeks = selectedScopes.reduce((acc, sId) => {
    const opt = SCOPE_OPTIONS.find((o) => o.id === sId);
    return acc + (opt ? opt.weeks : 0);
  }, 0);

  // Parallel sprint discount (approx 65% of sequential sum)
  const totalWeeks = Math.max(3, Math.round(rawWeeks * 0.65) + selectedComplexity.weeksAdd);

  const rawCostEgp = selectedScopes.reduce((acc, sId) => {
    const opt = SCOPE_OPTIONS.find((o) => o.id === sId);
    return acc + (opt ? opt.baseCostEgp : 0);
  }, 0);

  const totalCostEgp = Math.round((rawCostEgp * selectedComplexity.mult) / 10000) * 10000;
  const totalCostUsd = Math.round(totalCostEgp / 49 / 500) * 500;

  return (
    <main
      dir={isAr ? "rtl" : "ltr"}
      className={`min-h-screen bg-[#07070A] text-white pt-28 pb-20 ${isAr ? "font-arabic" : "font-sans"}`}
    >
      <CustomCursor />
      <Header onOpenProjectBuilder={() => setIsWizardOpen(true)} />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-14 pb-8 border-b border-white/10">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-mono mb-5 font-bold">
            <Calculator size={13} />
            <span>{isAr ? "حاسبة تقدير نطاق وميزانية المشروع" : "PROJECT SCOPE & ESTIMATION ENGINE"}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black text-white mb-5 leading-tight">
            {isAr ? "احسب نطاق مشروعك وجدوله الزمني" : "Estimate your project scope\nand timeline in real time."}
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed">
            {isAr
              ? "اختر المتطلبات ومستوى التعقيد للاطلاع على تقدير دقيق لأسابيع التسليم والميزانية التقديرية قبل حجز جلسة الاستكشاف."
              : "Select required capabilities and architecture complexity for an instant, transparent breakdown of sprint weeks and investment ranges."}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
          {/* Left Configurator (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Step 1: Capabilities */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-6 h-[2px] bg-emerald-400" />
                <h3 className="text-sm font-mono uppercase tracking-widest text-slate-300 font-bold">
                  {isAr ? "01 // حدد مكونات نطاق العمل" : "01 // SELECT SCOPE COMPONENTS"}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SCOPE_OPTIONS.map((opt) => {
                  const isSelected = selectedScopes.includes(opt.id);
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => toggleScope(opt.id)}
                      className={`p-5 rounded-2xl border text-start transition-all duration-200 flex flex-col justify-between min-h-[130px] ${
                        isSelected
                          ? "bg-white/[0.08] border-white/40 shadow-lg ring-1 ring-white/20 scale-[1.01]"
                          : "bg-white/[0.02] border-white/10 hover:border-white/25 hover:bg-white/[0.04]"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                          {opt.icon}
                        </div>
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                            isSelected ? "bg-emerald-500 border-emerald-500 text-black" : "border-slate-600"
                          }`}
                        >
                          {isSelected && <CheckCircle2 size={12} className="text-white" />}
                        </div>
                      </div>
                      <div>
                        <span className="text-sm font-display font-bold text-white block mb-1">
                          {isAr ? opt.labelAr : opt.labelEn}
                        </span>
                        <span className="text-xs font-mono text-slate-400 leading-snug block">
                          {isAr ? opt.descAr : opt.descEn}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Complexity */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-6 h-[2px] bg-sky-400" />
                <h3 className="text-sm font-mono uppercase tracking-widest text-slate-300 font-bold">
                  {isAr ? "02 // مستوى المعمارية والامتثال" : "02 // ARCHITECTURE & SCALE COMPLEXITY"}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {COMPLEXITY_LEVELS.map((lvl) => {
                  const isSelected = complexity === lvl.id;
                  return (
                    <button
                      key={lvl.id}
                      type="button"
                      onClick={() => setComplexity(lvl.id)}
                      className={`p-4 rounded-xl border text-start transition-all ${
                        isSelected
                          ? "bg-sky-500/10 border-sky-500/50 text-sky-300 ring-1 ring-sky-500/20"
                          : "bg-white/[0.02] border-white/10 text-slate-400 hover:border-white/20"
                      }`}
                    >
                      <span className="text-xs font-mono font-bold block mb-1">
                        {isAr ? lvl.labelAr : lvl.labelEn}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Live Summary Box (5 cols) */}
          <div className="lg:col-span-5 sticky top-32">
            <div className="p-8 rounded-3xl bg-[#0C0D14] border border-white/15 shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold block">
                    {isAr ? "التقدير الأولي" : "ESTIMATED SUMMARY"}
                  </span>
                  <h3 className="text-lg font-display font-bold text-white">
                    {isAr ? "ملخص نطاق المشروع" : "Project Breakdown"}
                  </h3>
                </div>
                <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                  <Sliders size={16} className="text-slate-400" />
                </div>
              </div>

              {/* Weeks & Cost Display */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5">
                  <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block mb-1 flex items-center gap-1.5">
                    <Clock size={12} className="text-sky-400" />
                    {isAr ? "الجدول المتوقع" : "TIMELINE"}
                  </span>
                  <span className="text-2xl sm:text-3xl font-display font-black text-sky-400 block">
                    {totalWeeks} {isAr ? "أسابيع" : "Weeks"}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">
                    {isAr ? "تسليم بنظام السبرنتات" : "Sprint-based delivery"}
                  </span>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5">
                  <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block mb-1 flex items-center gap-1.5">
                    <DollarSign size={12} className="text-emerald-400" />
                    {isAr ? "نطاق الاستثمار التقديري" : "ESTIMATED INVESTMENT"}
                  </span>
                  <span className="text-xl sm:text-2xl font-display font-black text-emerald-400 block leading-tight">
                    {isAr ? `${totalCostEgp.toLocaleString()} ج.م` : `EGP ${totalCostEgp.toLocaleString()}`}
                  </span>
                  <span className="text-xs font-mono text-slate-400 font-semibold block mt-0.5">
                    ≈ ${totalCostUsd.toLocaleString()} USD
                  </span>
                </div>
              </div>

              {/* Selected Scope List */}
              <div className="space-y-2 pt-2 border-t border-white/10">
                <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block mb-2">
                  {isAr ? "المكونات المختارة:" : "SELECTED CAPABILITIES:"}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedScopes.map((sId) => {
                    const opt = SCOPE_OPTIONS.find((o) => o.id === sId);
                    return opt ? (
                      <span
                        key={sId}
                        className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-slate-200"
                      >
                        {isAr ? opt.labelAr : opt.labelEn}
                      </span>
                    ) : null;
                  })}
                </div>
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={() => setIsWizardOpen(true)}
                className="w-full py-4 rounded-full bg-white text-black font-mono font-bold text-xs uppercase tracking-wider hover:bg-slate-200 transition-all shadow-xl hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                <span>{isAr ? "اعتمد هذا التكوين واحجز الاستكشاف" : "CONFIRM CONFIGURATION & PROCEED"}</span>
                <ArrowUpRight size={14} />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-slate-400 font-semibold">
                <ShieldCheck size={13} className="text-emerald-500" />
                <span>{isAr ? "تقدير فوري غير ملزم • جلسة مواءمة مجانية" : "Non-binding estimation • Free discovery alignment"}</span>
              </div>
            </div>
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
