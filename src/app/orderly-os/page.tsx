"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  Clock,
  Circle,
  FileText,
  MessageSquare,
  Layers,
  Bot,
  ArrowUpRight,
  Sparkles,
  BarChart3,
  ShieldCheck,
  Upload,
  Bell,
} from "lucide-react";
import { Header } from "@/components/navigation/Header";
import { CustomCursor } from "@/components/cursor/CustomCursor";
import { useLocale } from "@/context/LocaleContext";
import { ProjectDiscoveryWizard } from "@/components/discovery/ProjectDiscoveryWizard";

const PROJECT_PHASES = [
  { id: "discovery", labelEn: "Discovery & Strategy", labelAr: "الاستكشاف والاستراتيجية", status: "done" },
  { id: "strategy", labelEn: "Technical Blueprint", labelAr: "المخطط الهندسي التقني", status: "done" },
  { id: "design", labelEn: "Design & Prototyping", labelAr: "التصميم والنماذج الأولية", status: "active" },
  { id: "engineering", labelEn: "Engineering & Build", labelAr: "الهندسة والبرمجة", status: "upcoming" },
  { id: "launch", labelEn: "QA & Launch", labelAr: "الاختبار والإطلاق", status: "upcoming" },
];

const DELIVERABLES = [
  { nameEn: "Brand Identity Figma Master File", nameAr: "ملف Figma الرئيسي للهوية البصرية", type: "DESIGN", uploaded: true },
  { nameEn: "API Architecture Blueprint PDF", nameAr: "مخطط معمارية الـ API", type: "DOCUMENT", uploaded: true },
  { nameEn: "UI Component Library v1.2", nameAr: "مكتبة مكونات واجهة المستخدم", type: "DESIGN", uploaded: true },
  { nameEn: "Backend Build — Week 1", nameAr: "بناء الباك إند — الأسبوع الأول", type: "BUILD", uploaded: false },
];

const AI_MESSAGES = [
  {
    role: "assistant",
    textEn: "The mobile checkout flow prototype has been reviewed. Based on your feedback in the last session, I've updated the cart summary component. Ready for your approval.",
    textAr: "تمت مراجعة نموذج تدفق الشراء على الجوال. بناءً على ملاحظاتك في الجلسة الأخيرة، قمت بتحديث مكون ملخص السلة. جاهز لاعتمادك.",
  },
  {
    role: "user",
    textEn: "Looks great. Can we also add the express checkout button above the fold?",
    textAr: "يبدو رائعًا. هل يمكننا إضافة زر الشراء السريع فوق الحاجز؟",
  },
  {
    role: "assistant",
    textEn: "Absolutely. I'll add the express checkout CTA above the product gallery. I'll have the updated prototype ready within 2 hours.",
    textAr: "بالتأكيد. سأضيف زر الشراء السريع فوق معرض المنتج. سيكون النموذج المحدث جاهزاً خلال ساعتين.",
  },
];

export default function OrderlyOSPage() {
  const { locale, isAr } = useLocale();
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [aiInput, setAiInput] = useState("");

  return (
    <main
      dir={isAr ? "rtl" : "ltr"}
      className={`min-h-screen bg-[#07070A] text-white pt-28 pb-32 ${isAr ? "font-arabic" : "font-sans"}`}
    >
      <CustomCursor />
      <Header onOpenProjectBuilder={() => setIsWizardOpen(true)} />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Page Header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-sky-500/10 border border-sky-500/25 text-sky-400 text-xs font-mono mb-5 font-bold">
            <Layers size={13} />
            <span>ORDERLY OS // {isAr ? "بوابة العميل التفاعلية" : "CLIENT OPERATING SYSTEM"}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-display font-black tracking-tight text-white leading-tight mb-5">
            {isAr ? "إدارة مشروعك بمستوى الاستوديوهات العالمية" : "Your project. One organised system."}
          </h1>
          <p className="text-slate-300 text-base max-w-2xl leading-relaxed mb-3">
            {isAr
              ? "ORDERLY OS هي بوابة العمل المشترك الحية التي تربطك بفريقنا — تتبع التقدم، اعتمد المخرجات، وتواصل مع مساعد الذكاء الاصطناعي للمشروع في مكان واحد."
              : "ORDERLY OS is the live collaboration portal connecting you with our team — track progress, approve deliverables, and communicate with your project AI assistant in one place."}
          </p>
          <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold bg-emerald-500/10 px-3.5 py-1.5 rounded-full border border-emerald-500/25">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            {isAr ? "عرض تجريبي تفاعلي — ليس اتصالاً حياً" : "INTERACTIVE DEMO — Not a live connection"}
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-8 space-y-5">
            {/* Project Overview Card */}
            <div className="p-7 rounded-3xl bg-[#0C0D14] border border-white/10 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block mb-1">
                    {isAr ? "المشروع النشط" : "ACTIVE PROJECT"}
                  </span>
                  <h2 className="text-lg font-display font-bold text-white">
                    {isAr ? "منصة فالك للاستثمار العقاري — v2.0" : "Faalek Investment Platform — v2.0"}
                  </h2>
                </div>
                <span className="px-3 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-xs font-mono font-bold text-emerald-400">
                  {isAr ? "قيد التنفيذ" : "IN PROGRESS"}
                </span>
              </div>

              {/* Phase Timeline */}
              <div className="space-y-2.5">
                {PROJECT_PHASES.map((phase, idx) => (
                  <div key={phase.id} className={`flex items-center gap-3.5 p-3.5 rounded-xl transition-colors ${phase.status === "active" ? "bg-sky-500/10 border border-sky-500/20" : "bg-white/[0.02]"}`}>
                    {phase.status === "done" ? (
                      <CheckCircle2 size={18} className="text-emerald-400 flex-shrink-0" />
                    ) : phase.status === "active" ? (
                      <div className="w-[18px] h-[18px] rounded-full border-2 border-sky-400 flex items-center justify-center flex-shrink-0">
                        <div className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                      </div>
                    ) : (
                      <Circle size={18} className="text-slate-600 flex-shrink-0" />
                    )}
                    <span className={`text-sm font-mono font-semibold ${phase.status === "done" ? "text-emerald-300" : phase.status === "active" ? "text-sky-300 font-bold" : "text-slate-500"}`}>
                      {isAr ? phase.labelAr : phase.labelEn}
                    </span>
                    {phase.status === "active" && (
                      <span className="ms-auto text-[10px] font-mono text-sky-400 font-bold bg-sky-500/10 px-2 py-0.5 rounded-full border border-sky-500/20">
                        {isAr ? "جارٍ الآن" : "ACTIVE NOW"}
                      </span>
                    )}
                    {phase.status === "done" && (
                      <span className="ms-auto text-[10px] font-mono text-emerald-500 font-bold">
                        {isAr ? "مكتمل" : "COMPLETE"}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Deliverables */}
            <div className="p-7 rounded-3xl bg-[#0C0D14] border border-white/10 shadow-xl">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-base font-display font-bold text-white flex items-center gap-2">
                  <FileText size={18} className="text-sky-400" />
                  {isAr ? "المخرجات والملفات" : "Deliverables & Files"}
                </h3>
                <button className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-sky-400 hover:text-white transition-colors">
                  <Upload size={12} />
                  {isAr ? "رفع ملف" : "Upload"}
                </button>
              </div>
              <div className="space-y-2.5">
                {DELIVERABLES.map((d, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/15 transition-colors group">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-mono font-bold ${d.type === "DESIGN" ? "bg-rose-500/15 border border-rose-500/25 text-rose-400" : d.type === "BUILD" ? "bg-sky-500/15 border border-sky-500/25 text-sky-400" : "bg-amber-500/15 border border-amber-500/25 text-amber-400"}`}>
                        {d.type.slice(0, 3)}
                      </div>
                      <div>
                        <span className="text-xs font-mono font-semibold text-white block">
                          {isAr ? d.nameAr : d.nameEn}
                        </span>
                        <span className="text-[10px] font-mono text-slate-500">{d.type}</span>
                      </div>
                    </div>
                    {d.uploaded ? (
                      <button className="flex items-center gap-1.5 text-[10px] font-mono text-sky-400 hover:text-white transition-colors">
                        <ArrowUpRight size={12} />
                        {isAr ? "فتح" : "Open"}
                      </button>
                    ) : (
                      <span className="text-[10px] font-mono text-slate-600 font-bold bg-white/5 px-2 py-0.5 rounded-full">
                        {isAr ? "قريباً" : "PENDING"}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-4 space-y-5">
            {/* Stats */}
            <div className="p-6 rounded-3xl bg-[#0C0D14] border border-white/10 grid grid-cols-2 gap-3">
              {[
                { value: "Day 34", labelEn: "Project Day", labelAr: "يوم المشروع", color: "text-sky-400" },
                { value: "62%", labelEn: "Progress", labelAr: "الإنجاز", color: "text-emerald-400" },
                { value: "Apr 15", labelEn: "Launch Target", labelAr: "تاريخ الإطلاق", color: "text-amber-400" },
                { value: "3/5", labelEn: "Phases Done", labelAr: "مراحل منجزة", color: "text-violet-400" },
              ].map((s, i) => (
                <div key={i} className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                  <span className={`text-lg font-display font-black block ${s.color}`}>{s.value}</span>
                  <span className="text-[10px] font-mono text-slate-400 uppercase font-semibold">{isAr ? s.labelAr : s.labelEn}</span>
                </div>
              ))}
            </div>

            {/* AI Project Assistant */}
            <div className="p-6 rounded-3xl bg-[#0C0D14] border border-purple-500/20 flex flex-col h-[380px] shadow-xl">
              <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-white/10">
                <div className="w-8 h-8 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
                  <Bot size={16} className="text-purple-400" />
                </div>
                <div>
                  <span className="text-xs font-display font-bold text-white block">ORDERLY AI</span>
                  <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    {isAr ? "متصل" : "Online"}
                  </span>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto space-y-3 mb-3">
                {AI_MESSAGES.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[85%] p-3 rounded-xl text-xs leading-relaxed ${msg.role === "assistant" ? "bg-white/5 border border-white/10 text-slate-200" : "bg-purple-500/20 border border-purple-500/30 text-purple-100"}`}>
                      {isAr ? msg.textAr : msg.textEn}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={aiInput}
                  onChange={(e) => setAiInput(e.target.value)}
                  placeholder={isAr ? "اكتب رسالتك..." : "Ask about your project..."}
                  className="flex-1 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/40"
                />
                <button
                  type="button"
                  onClick={() => setAiInput("")}
                  className="w-8 h-8 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400 hover:bg-purple-500/30 transition-colors"
                >
                  <ArrowUpRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-sky-500/10 to-purple-500/10 border border-white/10 text-center">
          <h2 className="text-2xl sm:text-3xl font-display font-black text-white mb-4">
            {isAr ? "هذا ما يحصل عليه كل عميل من ORDERLY" : "Every ORDERLY client gets access to this."}
          </h2>
          <p className="text-slate-300 text-sm max-w-xl mx-auto mb-8 leading-relaxed">
            {isAr
              ? "لا رسائل بريد إلكتروني ضائعة. لا تحديثات مبعثرة. لوحة تحكم مشتركة واحدة تدير كل جانب من جوانب تسليم المشروع في الوقت الحقيقي."
              : "No lost emails. No scattered updates. One shared OS managing every aspect of your project delivery in real time."}
          </p>
          <button
            type="button"
            onClick={() => setIsWizardOpen(true)}
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-white text-black font-mono font-bold text-xs uppercase tracking-wider hover:bg-slate-200 transition-all shadow-xl hover:scale-[1.02]"
          >
            {isAr ? "ابدأ مشروعك الآن وادخل ORDERLY OS" : "Start a Project & Access ORDERLY OS"}
            <ArrowUpRight size={15} />
          </button>
        </div>
      </div>

      <ProjectDiscoveryWizard
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
        locale={locale}
      />
    </main>
  );
}
