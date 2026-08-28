"use client";

import React, { useState } from "react";
import {
  X,
  ArrowRight,
  ArrowLeft,
  Cpu,
  Sparkles,
  TrendingUp,
  ShoppingBag,
  Bot,
  Layers,
  Lightbulb,
  Rocket,
  RefreshCw,
  BarChart3,
  CheckCircle2,
  ChevronRight,
  Send,
  Building2,
  Globe2,
} from "lucide-react";

interface ProjectDiscoveryWizardProps {
  isOpen: boolean;
  onClose: () => void;
  locale: "en" | "ar";
}

type StepId = 1 | 2 | 3 | 4 | 5;

interface FormState {
  projectType: string;
  stage: string;
  needs: string[];
  timeline: string;
  budget: string;
  name: string;
  company: string;
  email: string;
  website: string;
  brief: string;
}

const PROJECT_TYPES = [
  { id: "saas", icon: <Cpu className="w-6 h-6" />, labelEn: "SaaS Platform", labelAr: "منصة SaaS سحابية", colorClass: "border-sky-500/50 text-sky-400 bg-sky-500/10" },
  { id: "ai", icon: <Bot className="w-6 h-6" />, labelEn: "AI System / LLM", labelAr: "نظام ذكاء اصطناعي", colorClass: "border-purple-500/50 text-purple-400 bg-purple-500/10" },
  { id: "brand", icon: <Sparkles className="w-6 h-6" />, labelEn: "Brand & Identity", labelAr: "هوية بصرية وعلامة تجارية", colorClass: "border-rose-500/50 text-rose-400 bg-rose-500/10" },
  { id: "ecommerce", icon: <ShoppingBag className="w-6 h-6" />, labelEn: "E-Commerce", labelAr: "متجر إلكتروني", colorClass: "border-indigo-500/50 text-indigo-400 bg-indigo-500/10" },
  { id: "marketing", icon: <TrendingUp className="w-6 h-6" />, labelEn: "Marketing & Growth", labelAr: "تسويق ونمو المبيعات", colorClass: "border-emerald-500/50 text-emerald-400 bg-emerald-500/10" },
  { id: "other", icon: <Layers className="w-6 h-6" />, labelEn: "Something Else", labelAr: "شيء آخر", colorClass: "border-slate-500/50 text-slate-400 bg-slate-500/10" },
];

const STAGES = [
  { id: "idea", icon: <Lightbulb className="w-5 h-5" />, labelEn: "Idea / Concept", labelAr: "فكرة ومفهوم جديد", descEn: "Starting from scratch", descAr: "نبدأ من الصفر" },
  { id: "mvp", icon: <Rocket className="w-5 h-5" />, labelEn: "MVP Launch", labelAr: "نموذج أولي للإطلاق", descEn: "Ready to build & ship", descAr: "جاهز للبناء والإطلاق" },
  { id: "existing", icon: <RefreshCw className="w-5 h-5" />, labelEn: "Existing Product", labelAr: "منتج قائم يحتاج تطوير", descEn: "Needs a rebuild/upgrade", descAr: "يحتاج إعادة هندسة" },
  { id: "scale", icon: <BarChart3 className="w-5 h-5" />, labelEn: "Scaling Up", labelAr: "توسع ونمو مكثف", descEn: "Rapid growth phase", descAr: "مرحلة توسع سريع" },
];

const NEEDS = [
  { id: "strategy", labelEn: "Strategy & Discovery", labelAr: "استراتيجية وتحليل" },
  { id: "uxui", labelEn: "UX / UI Design", labelAr: "تصميم واجهات وتجربة" },
  { id: "engineering", labelEn: "Engineering & Dev", labelAr: "هندسة وبرمجة" },
  { id: "ai", labelEn: "AI & Automation", labelAr: "ذكاء اصطناعي وأتمتة" },
  { id: "branding", labelEn: "Brand & Visual Identity", labelAr: "هوية بصرية وعلامة" },
  { id: "marketing", labelEn: "Marketing & Growth", labelAr: "تسويق ونمو مبيعات" },
  { id: "packaging", labelEn: "Packaging & 3D", labelAr: "تغليف وثلاثي أبعاد" },
  { id: "analytics", labelEn: "Analytics & Reporting", labelAr: "تحليلات وتقارير" },
];

const TIMELINES = [
  { id: "1m", labelEn: "Under 1 Month", labelAr: "أقل من شهر" },
  { id: "3m", labelEn: "1–3 Months", labelAr: "شهر إلى 3 أشهر" },
  { id: "6m", labelEn: "3–6 Months", labelAr: "3 إلى 6 أشهر" },
  { id: "6m+", labelEn: "6+ Months / Ongoing", labelAr: "6 أشهر فأكثر / مستمر" },
];

const BUDGETS = [
  { id: "150k", labelEn: "150K–350K EGP (~$3K–$7K USD)", labelAr: "150,000 – 350,000 ج.م (~$3K–$7K)" },
  { id: "350k", labelEn: "350K–800K EGP (~$7K–$16K USD)", labelAr: "350,000 – 800,000 ج.م (~$7K–$16K)" },
  { id: "800k", labelEn: "800K–2.5M EGP (~$16K–$50K USD)", labelAr: "800,000 – 2,500,000 ج.م (~$16K–$50K)" },
  { id: "2.5m+", labelEn: "2.5M+ EGP Enterprise (~$50K+ USD)", labelAr: "2,500,000+ ج.م (مؤسسي)" },
];

export const ProjectDiscoveryWizard: React.FC<ProjectDiscoveryWizardProps> = ({
  isOpen,
  onClose,
  locale,
}) => {
  const isAr = locale === "ar";
  const [step, setStep] = useState<StepId>(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<FormState>({
    projectType: "",
    stage: "",
    needs: [],
    timeline: "",
    budget: "",
    name: "",
    company: "",
    email: "",
    website: "",
    brief: "",
  });

  if (!isOpen) return null;

  const totalSteps = 5;
  const progress = ((step - 1) / (totalSteps - 1)) * 100;

  const toggleNeed = (id: string) => {
    setForm((f) => ({
      ...f,
      needs: f.needs.includes(id) ? f.needs.filter((n) => n !== id) : [...f.needs, id],
    }));
  };

  const canProceed = () => {
    if (step === 1) return !!form.projectType;
    if (step === 2) return !!form.stage;
    if (step === 3) return form.needs.length > 0;
    if (step === 4) return !!form.timeline && !!form.budget;
    if (step === 5) return !!form.name && !!form.email;
    return false;
  };

  const handleSubmit = async () => {
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          company: form.company,
          website: form.website,
          message: `[PROJECT BRIEF]\nType: ${form.projectType}\nStage: ${form.stage}\nNeeds: ${form.needs.join(", ")}\nTimeline: ${form.timeline}\nBudget: ${form.budget}\n\n${form.brief}`,
        }),
      });
    } catch (_) {}
    setSubmitted(true);
  };

  const selectedType = PROJECT_TYPES.find((t) => t.id === form.projectType);
  const selectedStage = STAGES.find((s) => s.id === form.stage);

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      dir={isAr ? "rtl" : "ltr"}
    >
      <div className="relative w-full max-w-2xl bg-[#0B0C14] border border-white/15 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 flex-shrink-0">
          <div>
            <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-bold block mb-0.5">
              {isAr ? "نظام بناء ملف المشروع الذكي" : "PROJECT DISCOVERY BRIEF // ORDERLY"}
            </span>
            <h2 className="text-lg font-display font-bold text-white">
              {isAr ? "أخبرنا ماذا تريد أن تبني" : "Tell us what you're building"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all"
          >
            <X size={16} />
          </button>
        </div>

        {/* Progress Bar */}
        {!submitted && (
          <div className="px-6 pt-4 flex-shrink-0">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono text-slate-400">
                {isAr ? `الخطوة ${step} من ${totalSteps}` : `Step ${step} of ${totalSteps}`}
              </span>
              <span className="text-[10px] font-mono text-emerald-400 font-bold">
                {Math.round(progress)}% {isAr ? "مكتمل" : "Complete"}
              </span>
            </div>
            <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-400 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {submitted ? (
            /* ── SUCCESS STATE ── */
            <div className="p-10 text-center flex flex-col items-center gap-5">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
                <CheckCircle2 size={32} className="text-emerald-400" />
              </div>
              <h3 className="text-2xl font-display font-black text-white">
                {isAr ? "تم استلام ملف مشروعك" : "Project Brief Received"}
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed max-w-sm">
                {isAr
                  ? `شكراً ${form.name}. سيتواصل معك فريق ORDERLY خلال 24 ساعة لمناقشة تفاصيل جلسة الاستكشاف الأولى.`
                  : `Thank you, ${form.name}. The ORDERLY team will reach out within 24 hours to align on a discovery session.`}
              </p>
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 text-start w-full max-w-sm">
                <div className="text-[10px] font-mono text-slate-400 uppercase mb-3 font-bold">
                  {isAr ? "ملخص ملف مشروعك:" : "YOUR PROJECT PROFILE:"}
                </div>
                <div className="space-y-1.5 text-xs font-mono text-slate-200">
                  <div>◉ {isAr ? selectedType?.labelAr : selectedType?.labelEn}</div>
                  <div>◉ {isAr ? selectedStage?.labelAr : selectedStage?.labelEn}</div>
                  <div>◉ {form.needs.length} {isAr ? "خدمات مطلوبة" : "services selected"}</div>
                </div>
              </div>
              <button onClick={onClose} className="px-6 py-2.5 rounded-full bg-white text-black font-mono font-bold text-xs uppercase tracking-wider hover:bg-slate-200 transition-all">
                {isAr ? "إغلاق" : "Close"}
              </button>
            </div>
          ) : (
            <div className="p-6">
              {/* ── STEP 1: Project Type ── */}
              {step === 1 && (
                <div>
                  <h3 className="text-base font-display font-bold text-white mb-1">
                    {isAr ? "ماذا تريد أن تبني؟" : "What are you building?"}
                  </h3>
                  <p className="text-slate-400 text-xs mb-6">
                    {isAr ? "اختر النوع الأقرب لمشروعك." : "Select the type closest to your project."}
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {PROJECT_TYPES.map((type) => (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setForm((f) => ({ ...f, projectType: type.id }))}
                        className={`p-4 rounded-2xl border text-start transition-all duration-200 flex flex-col gap-2.5 ${
                          form.projectType === type.id
                            ? `${type.colorClass} scale-[1.02] ring-1 ring-white/20 shadow-md`
                            : "border-white/10 bg-white/[0.03] text-slate-300 hover:border-white/25 hover:bg-white/[0.06]"
                        }`}
                      >
                        <div className={form.projectType === type.id ? "" : "text-slate-400"}>
                          {type.icon}
                        </div>
                        <span className="text-xs font-mono font-bold leading-snug">
                          {isAr ? type.labelAr : type.labelEn}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* ── STEP 2: Stage ── */}
              {step === 2 && (
                <div>
                  <h3 className="text-base font-display font-bold text-white mb-1">
                    {isAr ? "ما هي مرحلة مشروعك الحالية؟" : "What stage is your project?"}
                  </h3>
                  <p className="text-slate-400 text-xs mb-6">
                    {isAr ? "هذا يساعدنا في تخصيص منهجية العمل المناسبة." : "This helps us tailor the right methodology for you."}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {STAGES.map((stage) => (
                      <button
                        key={stage.id}
                        type="button"
                        onClick={() => setForm((f) => ({ ...f, stage: stage.id }))}
                        className={`p-5 rounded-2xl border text-start transition-all duration-200 flex items-center gap-4 ${
                          form.stage === stage.id
                            ? "border-emerald-500/50 bg-emerald-500/10 ring-1 ring-white/15 shadow-md"
                            : "border-white/10 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.06]"
                        }`}
                      >
                        <div className={`p-2.5 rounded-xl border ${form.stage === stage.id ? "border-emerald-500/30 bg-emerald-500/20 text-emerald-400" : "border-white/10 bg-white/5 text-slate-400"}`}>
                          {stage.icon}
                        </div>
                        <div>
                          <span className={`text-sm font-display font-bold block ${form.stage === stage.id ? "text-white" : "text-slate-200"}`}>
                            {isAr ? stage.labelAr : stage.labelEn}
                          </span>
                          <span className="text-xs font-mono text-slate-400">
                            {isAr ? stage.descAr : stage.descEn}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* ── STEP 3: Needs ── */}
              {step === 3 && (
                <div>
                  <h3 className="text-base font-display font-bold text-white mb-1">
                    {isAr ? "ماذا تحتاج من ORDERLY؟" : "What do you need from ORDERLY?"}
                  </h3>
                  <p className="text-slate-400 text-xs mb-6">
                    {isAr ? "اختر كل ما ينطبق على مشروعك." : "Select all that apply to your project."}
                  </p>
                  <div className="grid grid-cols-2 gap-2.5">
                    {NEEDS.map((need) => {
                      const selected = form.needs.includes(need.id);
                      return (
                        <button
                          key={need.id}
                          type="button"
                          onClick={() => toggleNeed(need.id)}
                          className={`p-3.5 rounded-xl border text-start text-xs font-mono font-semibold transition-all duration-200 flex items-center gap-2.5 ${
                            selected
                              ? "border-white/30 bg-white/10 text-white ring-1 ring-white/10"
                              : "border-white/10 bg-white/[0.03] text-slate-300 hover:border-white/20 hover:bg-white/[0.06]"
                          }`}
                        >
                          <div className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${selected ? "bg-emerald-500 border-emerald-500" : "border-slate-500"}`}>
                            {selected && <CheckCircle2 size={10} className="text-white" />}
                          </div>
                          {isAr ? need.labelAr : need.labelEn}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ── STEP 4: Timeline & Budget ── */}
              {step === 4 && (
                <div className="space-y-7">
                  <div>
                    <h3 className="text-base font-display font-bold text-white mb-1">
                      {isAr ? "ما هو جدولك الزمني المتوقع؟" : "What's your expected timeline?"}
                    </h3>
                    <p className="text-slate-400 text-xs mb-5">
                      {isAr ? "سيساعدنا هذا في تخطيط الفريق والموارد المناسبة." : "This helps us plan the right team & resources."}
                    </p>
                    <div className="grid grid-cols-2 gap-2.5">
                      {TIMELINES.map((t) => (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => setForm((f) => ({ ...f, timeline: t.id }))}
                          className={`p-3.5 rounded-xl border text-xs font-mono font-bold transition-all duration-200 text-start ${
                            form.timeline === t.id
                              ? "border-sky-500/50 bg-sky-500/10 text-sky-300"
                              : "border-white/10 bg-white/[0.03] text-slate-300 hover:border-white/20"
                          }`}
                        >
                          {isAr ? t.labelAr : t.labelEn}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-base font-display font-bold text-white mb-1">
                      {isAr ? "ما هو النطاق التقديري للميزانية؟" : "What's your estimated budget range?"}
                    </h3>
                    <p className="text-slate-400 text-xs mb-5">
                      {isAr ? "يساعدنا هذا في تقديم حزمة العمل الأنسب لك." : "This helps us propose the most fitting engagement model."}
                    </p>
                    <div className="grid grid-cols-2 gap-2.5">
                      {BUDGETS.map((b) => (
                        <button
                          key={b.id}
                          type="button"
                          onClick={() => setForm((f) => ({ ...f, budget: b.id }))}
                          className={`p-3.5 rounded-xl border text-xs font-mono font-bold transition-all duration-200 text-start leading-snug ${
                            form.budget === b.id
                              ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-300"
                              : "border-white/10 bg-white/[0.03] text-slate-300 hover:border-white/20"
                          }`}
                        >
                          {isAr ? b.labelAr : b.labelEn}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ── STEP 5: Contact & Brief ── */}
              {step === 5 && (
                <div>
                  <h3 className="text-base font-display font-bold text-white mb-1">
                    {isAr ? "أخبرنا كيف نتواصل معك" : "Almost there — let's connect"}
                  </h3>
                  <p className="text-slate-400 text-xs mb-6">
                    {isAr ? "سيتواصل معك فريق ORDERLY خلال 24 ساعة." : "ORDERLY team will reach out within 24 hours."}
                  </p>

                  {/* Project Profile Summary */}
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 mb-6">
                    <div className="text-[10px] font-mono text-slate-400 uppercase mb-2 font-bold">
                      {isAr ? "ملف مشروعك:" : "YOUR PROJECT PROFILE:"}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedType && (
                        <span className="px-2.5 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-mono text-white">
                          {isAr ? selectedType.labelAr : selectedType.labelEn}
                        </span>
                      )}
                      {selectedStage && (
                        <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-300">
                          {isAr ? selectedStage.labelAr : selectedStage.labelEn}
                        </span>
                      )}
                      {form.needs.slice(0, 3).map((nId) => {
                        const need = NEEDS.find((n) => n.id === nId);
                        return need ? (
                          <span key={nId} className="px-2.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-xs font-mono text-sky-300">
                            {isAr ? need.labelAr : need.labelEn}
                          </span>
                        ) : null;
                      })}
                      {form.needs.length > 3 && (
                        <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-slate-400">
                          +{form.needs.length - 3} {isAr ? "أخرى" : "more"}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                    {[
                      { field: "name", labelEn: "Full Name *", labelAr: "الاسم الكامل *", type: "text" },
                      { field: "company", labelEn: "Company / Brand", labelAr: "الشركة / العلامة التجارية", type: "text" },
                      { field: "email", labelEn: "Email Address *", labelAr: "البريد الإلكتروني *", type: "email" },
                      { field: "website", labelEn: "Website (optional)", labelAr: "الموقع الإلكتروني (اختياري)", type: "url" },
                    ].map(({ field, labelEn, labelAr, type }) => (
                      <div key={field}>
                        <label className="text-[10px] font-mono text-slate-400 uppercase font-bold block mb-1">
                          {isAr ? labelAr : labelEn}
                        </label>
                        <input
                          type={type}
                          value={(form as any)[field]}
                          onChange={(e) => setForm((f) => ({ ...f, [field]: e.target.value }))}
                          className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 transition-colors"
                          placeholder={isAr ? labelAr : labelEn}
                        />
                      </div>
                    ))}
                  </div>

                  <div>
                    <label className="text-[10px] font-mono text-slate-400 uppercase font-bold block mb-1">
                      {isAr ? "أخبرنا المزيد عن مشروعك (اختياري)" : "Tell us more about your project (optional)"}
                    </label>
                    <textarea
                      value={form.brief}
                      onChange={(e) => setForm((f) => ({ ...f, brief: e.target.value }))}
                      rows={3}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 transition-colors resize-none"
                      placeholder={isAr ? "أي تفاصيل إضافية تساعدنا في فهم احتياجاتك..." : "Any additional context that helps us understand your needs..."}
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        {!submitted && (
          <div className="flex items-center justify-between p-6 border-t border-white/10 flex-shrink-0 gap-3">
            {step > 1 ? (
              <button
                onClick={() => setStep((s) => (s - 1) as StepId)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs font-mono font-bold hover:bg-white/10 transition-all"
              >
                <ArrowLeft size={14} className={isAr ? "rotate-180" : ""} />
                {isAr ? "رجوع" : "Back"}
              </button>
            ) : (
              <div />
            )}

            {step < 5 ? (
              <button
                onClick={() => canProceed() && setStep((s) => (s + 1) as StepId)}
                disabled={!canProceed()}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-mono font-bold transition-all ${
                  canProceed()
                    ? "bg-white text-black hover:bg-slate-200 shadow-lg hover:scale-[1.02]"
                    : "bg-white/10 text-slate-500 cursor-not-allowed"
                }`}
              >
                {isAr ? "التالي" : "Continue"}
                <ArrowRight size={14} className={isAr ? "rotate-180" : ""} />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!canProceed()}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-mono font-bold transition-all ${
                  canProceed()
                    ? "bg-emerald-500 hover:bg-emerald-400 text-white shadow-lg hover:scale-[1.02]"
                    : "bg-white/10 text-slate-500 cursor-not-allowed"
                }`}
              >
                <Send size={14} />
                {isAr ? "إرسال ملف المشروع" : "Submit Project Brief"}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
