"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  ArrowRight,
  ArrowLeft,
  Check,
  CheckCircle2,
  Send,
  Loader2,
  Clock,
  ShieldCheck,
  Layout,
  Layers,
  Smartphone,
  Globe,
  Database,
  Shield,
  Sparkles,
  Palette,
  BookOpen,
  Bot,
  Zap,
  Cpu,
  Film,
  Play,
  Box,
  TrendingUp,
  Search,
  Mail,
  ChevronRight,
} from "lucide-react";
import { DISCIPLINES, type DisciplineId } from "@/data/disciplines";
import { useLocale } from "@/context/LocaleContext";
import { submitProjectBrief } from "@/actions/leads";

interface DisciplineShowcaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDiscipline?: DisciplineId;
}

/* ─── Icon component helper ─────────────────────────────────── */
const DisciplineIcon = ({
  name,
  className = "w-5 h-5",
}: {
  name: string;
  className?: string;
}) => {
  switch (name) {
    case "layout":      return <Layout className={className} />;
    case "layers":      return <Layers className={className} />;
    case "smartphone":  return <Smartphone className={className} />;
    case "globe":       return <Globe className={className} />;
    case "database":    return <Database className={className} />;
    case "shield":      return <Shield className={className} />;
    case "sparkles":    return <Sparkles className={className} />;
    case "palette":     return <Palette className={className} />;
    case "book":        return <BookOpen className={className} />;
    case "bot":         return <Bot className={className} />;
    case "zap":         return <Zap className={className} />;
    case "cpu":         return <Cpu className={className} />;
    case "film":        return <Film className={className} />;
    case "play":        return <Play className={className} />;
    case "box":         return <Box className={className} />;
    case "trending-up": return <TrendingUp className={className} />;
    case "search":      return <Search className={className} />;
    case "mail":        return <Mail className={className} />;
    default:            return <Sparkles className={className} />;
  }
};

/* ─── 6 Discipline Tiles Configuration ────────────────────────── */
const TILES: {
  id: DisciplineId;
  iconName: string;
  tagEn: string;
  tagAr: string;
  subtitleEn: string;
  subtitleAr: string;
  gradientFrom: string;
}[] = [
  {
    id: "uiux",
    iconName: "layout",
    tagEn: "UI / UX",
    tagAr: "واجهات وتطبيقات",
    subtitleEn: "Mobile apps, web platforms & interactive design systems",
    subtitleAr: "تطبيقات موبايل، مواقع ويب، وأنظمة تصميم تفاعلية",
    gradientFrom: "from-violet-600/20",
  },
  {
    id: "engineering",
    iconName: "cpu",
    tagEn: "ENGINEERING",
    tagAr: "برمجيات وسحابيات",
    subtitleEn: "High-speed full-stack platforms, APIs & custom portals",
    subtitleAr: "منصات ويب فائقة السرعة، واجهات برمجية، ولوحات تحكم",
    gradientFrom: "from-sky-600/20",
  },
  {
    id: "branding",
    iconName: "sparkles",
    tagEn: "BRANDING",
    tagAr: "هوية وعلامة تجارية",
    subtitleEn: "Iconic marks, typography systems & luxury packaging",
    subtitleAr: "شعار ملكي، خطوط مميزة، وهوية بصرية وتغليف فاخر",
    gradientFrom: "from-amber-600/20",
  },
  {
    id: "ai",
    iconName: "bot",
    tagEn: "AI & AGENTS",
    tagAr: "ذكاء اصطناعي وأتمتة",
    subtitleEn: "Trained AI assistants, CRM workflows & data pipelines",
    subtitleAr: "مساعدات ذكاء اصطناعي مدربة، أتمتة كاملة للعمليات",
    gradientFrom: "from-fuchsia-600/20",
  },
  {
    id: "motion",
    iconName: "film",
    tagEn: "MOTION & 3D",
    tagAr: "موشن و 3D سينمائي",
    subtitleEn: "Cinematic 3D product visuals & dynamic brand animations",
    subtitleAr: "فيديوهات سينمائية ثلاثية الأبعاد وتحريك احترافي للشعار",
    gradientFrom: "from-rose-600/20",
  },
  {
    id: "marketing",
    iconName: "trending-up",
    tagEn: "GROWTH & ADS",
    tagAr: "تسويق ونمو مبيعات",
    subtitleEn: "High-ROAS paid ads, SEO dominance & automated funnels",
    subtitleAr: "إعلانات ممولة عالية العائد، تصدر محركات البحث، وقمع مبيعات",
    gradientFrom: "from-emerald-600/20",
  },
];

type Step = 1 | 2 | 3;

export const DisciplineShowcaseModal: React.FC<DisciplineShowcaseModalProps> = ({
  isOpen,
  onClose,
  initialDiscipline = "uiux",
}) => {
  const { isAr } = useLocale();
  const [step, setStep] = useState<Step>(1);
  const [active, setActive] = useState<DisciplineId>(initialDiscipline);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    description: "",
  });

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setActive(initialDiscipline);
      setSubmitted(false);
      setErrorMsg("");
      setForm({ name: "", email: "", company: "", description: "" });
    }
  }, [isOpen, initialDiscipline]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!isOpen) return null;

  const current = DISCIPLINES[active] || DISCIPLINES.uiux;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const res = await submitProjectBrief({
      name: form.name,
      email: form.email,
      company: form.company,
      country: "",
      projectType: [current.id],
      services: [current.nameEn],
      description: form.description,
    });

    setLoading(false);

    if (res.success) {
      setSubmitted(true);
    } else {
      setErrorMsg(
        isAr
          ? res.error || "حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى."
          : res.error || "An error occurred. Please try again."
      );
    }
  };

  const stepLabels = [
    { num: 1, labelEn: "1. Discipline", labelAr: "1. اختر الخدمة" },
    { num: 2, labelEn: "2. Deliverables", labelAr: "2. المخرجات والمدة" },
    { num: 3, labelEn: "3. Contact", labelAr: "3. معلومات الطلب" },
  ];

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-2xl animate-in fade-in duration-200 select-none overflow-y-auto"
      role="dialog"
      aria-modal="true"
      dir={isAr ? "rtl" : "ltr"}
    >
      {/* ── Main Modal Card ── */}
      <div className="relative w-full max-w-2xl bg-[#090A0F] rounded-[28px] sm:rounded-[32px] border border-white/15 shadow-[0_0_100px_rgba(0,0,0,0.95)] overflow-hidden flex flex-col my-auto">
        {/* Dynamic Vibrant Ambient Backlight */}
        <div
          className="absolute -top-20 left-1/2 -translate-x-1/2 w-96 h-60 rounded-full blur-[110px] opacity-35 pointer-events-none transition-colors duration-700"
          style={{ backgroundColor: current.glowColor }}
        />

        {/* ── Top Header Navigation Bar ── */}
        <header className="relative z-10 flex items-center justify-between px-5 sm:px-8 py-4 border-b border-white/10 bg-[#090A0F]/80 backdrop-blur-md">
          {/* Breadcrumb / Step Indicator */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {stepLabels.map((s) => {
              const isActive = step === s.num;
              const isDone = step > s.num;
              return (
                <button
                  key={s.num}
                  type="button"
                  onClick={() => isDone && setStep(s.num as Step)}
                  disabled={!isDone}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono tracking-wider transition-all duration-200 ${
                    isActive
                      ? "bg-white text-black font-bold shadow-md shadow-white/10"
                      : isDone
                      ? "bg-white/10 text-white/90 hover:bg-white/15 cursor-pointer"
                      : "bg-white/5 text-white/35"
                  }`}
                >
                  {isDone && <Check size={11} className="text-emerald-400" />}
                  <span>{isAr ? s.labelAr : s.labelEn}</span>
                </button>
              );
            })}
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="p-2 rounded-full border border-white/10 hover:border-white/30 text-white/70 hover:text-white bg-white/5 hover:bg-white/10 transition-all"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </header>

        {/* ══════════════════════════════════════════════════
            STEP 1 — Pick a discipline
        ══════════════════════════════════════════════════ */}
        {step === 1 && (
          <div className="relative z-10 p-5 sm:p-8 flex flex-col gap-6 animate-in slide-in-from-bottom-3 duration-300">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-emerald-400 mb-2 font-semibold">
                <span>{isAr ? "الخطوة 1 من 3" : "STEP 1 OF 3"}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight">
                {isAr ? "ما نوع المشروع الذي تود بناءه؟" : "What type of project?"}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                {isAr
                  ? "اختر التخصص الرئيسي وسنعرض لك المخرجات المحددة وجدول التنفيذ:"
                  : "Select a primary discipline to preview deliverables and timeline:"}
              </p>
            </div>

            {/* 6 Rich Discipline Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {TILES.map((tile) => {
                const data = DISCIPLINES[tile.id];
                const isSelected = active === tile.id;
                return (
                  <button
                    key={tile.id}
                    type="button"
                    onClick={() => setActive(tile.id)}
                    className={`relative p-4 rounded-2xl border text-left transition-all duration-200 group flex items-start gap-3.5 ${
                      isSelected
                        ? `bg-gradient-to-br ${tile.gradientFrom} to-white/[0.08] border-white/40 shadow-xl scale-[1.01]`
                        : "bg-white/[0.03] border-white/10 hover:border-white/25 hover:bg-white/[0.06]"
                    }`}
                  >
                    {/* Glowing Icon Box */}
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                        isSelected
                          ? `${data.badgeBg} ${data.badgeBorder} border shadow-lg`
                          : "bg-white/5 border border-white/5 group-hover:bg-white/10"
                      }`}
                    >
                      <DisciplineIcon
                        name={tile.iconName}
                        className={`w-5 h-5 ${
                          isSelected ? data.accentColor : "text-white/60 group-hover:text-white"
                        }`}
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span
                          className={`text-sm font-display font-bold tracking-tight truncate ${
                            isSelected ? "text-white" : "text-white/90 group-hover:text-white"
                          }`}
                        >
                          {isAr ? data.nameAr : data.nameEn}
                        </span>

                        {isSelected && (
                          <div className="w-5 h-5 rounded-full bg-emerald-500 text-black flex items-center justify-center flex-shrink-0 shadow-md">
                            <Check size={12} strokeWidth={3} />
                          </div>
                        )}
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                        {isAr ? tile.subtitleAr : tile.subtitleEn}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Next CTA Button */}
            <button
              type="button"
              onClick={() => setStep(2)}
              className="w-full py-4 rounded-2xl bg-white hover:bg-slate-100 text-black font-display font-extrabold text-sm tracking-wider uppercase flex items-center justify-center gap-2.5 transition-all hover:scale-[1.01] shadow-2xl shadow-white/10"
            >
              <span>{isAr ? "التالي — استعراض المخرجات والمدة" : "Next — See Deliverables & Timeline"}</span>
              <ChevronRight size={17} className="rtl:rotate-180" />
            </button>
          </div>
        )}

        {/* ══════════════════════════════════════════════════
            STEP 2 — Deliverables preview
        ══════════════════════════════════════════════════ */}
        {step === 2 && (
          <div className="relative z-10 p-5 sm:p-8 flex flex-col gap-6 animate-in slide-in-from-bottom-3 duration-300">
            {/* Header Banner */}
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <div className="inline-flex items-center gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider border ${current.badgeBg} ${current.badgeBorder} ${current.badgeText}`}
                  >
                    {isAr ? current.nameAr : current.nameEn}
                  </span>
                  <span className="text-xs font-mono text-emerald-400 flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30">
                    <Clock size={12} />
                    <span>{isAr ? `مدة الإنجاز: ${current.timelineAr}` : `Delivery: ${current.timelineEn}`}</span>
                  </span>
                </div>
              </div>

              <h2 className="text-xl sm:text-2xl font-display font-black text-white leading-snug">
                {isAr ? current.taglineAr : current.taglineEn}
              </h2>
            </div>

            {/* 3 Large Concrete Deliverables */}
            <div className="flex flex-col gap-3">
              {current.deliverables.map((del, idx) => (
                <div
                  key={idx}
                  className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all flex items-start gap-4"
                >
                  <div
                    className={`w-10 h-10 rounded-xl ${current.badgeBg} ${current.badgeBorder} border flex items-center justify-center flex-shrink-0 shadow-md`}
                  >
                    <DisciplineIcon name={del.icon} className={`w-5 h-5 ${current.accentColor}`} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm sm:text-base font-display font-bold text-white mb-1">
                      {isAr ? del.titleAr : del.titleEn}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed mb-2.5">
                      {isAr ? del.descAr : del.descEn}
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                      {(isAr ? del.featuresAr : del.featuresEn).map((feat, fIdx) => (
                        <span
                          key={fIdx}
                          className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-200"
                        >
                          ✓ {feat}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Guarantees Strip */}
            <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-slate-300">
              {(isAr ? current.includedGuaranteesAr : current.includedGuaranteesEn).map((g, gIdx) => (
                <div key={gIdx} className="flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-emerald-400 flex-shrink-0" />
                  <span>{g}</span>
                </div>
              ))}
            </div>

            {/* Navigation Actions */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-5 py-3.5 rounded-2xl border border-white/15 text-slate-300 hover:text-white hover:border-white/30 bg-white/5 hover:bg-white/10 transition-all flex items-center gap-2 text-xs font-mono uppercase"
              >
                <ArrowLeft size={15} className="rtl:rotate-180" />
                <span>{isAr ? "رجوع" : "Back"}</span>
              </button>

              <button
                type="button"
                onClick={() => setStep(3)}
                className="flex-1 py-4 rounded-2xl bg-white hover:bg-slate-100 text-black font-display font-extrabold text-sm tracking-wider uppercase flex items-center justify-center gap-2 transition-all hover:scale-[1.01] shadow-2xl"
              >
                <span>{isAr ? "احجز هذا المشروع الآن" : "Request This Project"}</span>
                <ChevronRight size={17} className="rtl:rotate-180" />
              </button>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════
            STEP 3 — Booking Form / Confirmation
        ══════════════════════════════════════════════════ */}
        {step === 3 && (
          <div className="relative z-10 p-5 sm:p-8 flex flex-col gap-6 animate-in slide-in-from-bottom-3 duration-300">
            {submitted ? (
              <div className="text-center py-10 flex flex-col items-center animate-in zoom-in-95 duration-400">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mb-4 shadow-xl shadow-emerald-500/20">
                  <CheckCircle2 size={34} />
                </div>
                <h3 className="text-2xl sm:text-3xl font-display font-black text-white mb-2">
                  {isAr ? "تم استلام طلب مشروعك بنجاح!" : "Project Request Received!"}
                </h3>
                <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed mb-6">
                  {isAr
                    ? "شكراً لتواصلك مع ORDERLY. فريقنا يراجع متطلباتك وسنتواصل معك خلال 24 ساعة بمقترح مخصص وجدول زمني دقيق."
                    : "Thank you for reaching out. Our team will review your brief and follow up within 24 hours with a custom proposal."}
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-8 py-3.5 rounded-full bg-white text-black font-display font-bold text-xs uppercase tracking-widest hover:bg-slate-200 transition-colors shadow-xl"
                >
                  {isAr ? "إغلاق النافذة" : "CLOSE WINDOW"}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-emerald-400 mb-2 font-semibold">
                    <span>{isAr ? "الخطوة 3 من 3" : "STEP 3 OF 3"}</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight">
                    {isAr ? "معلومات التواصل والمشروع" : "Contact & Project Details"}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1">
                    {isAr
                      ? `أنت تطلب باقة: ${current.nameAr}`
                      : `You are requesting: ${current.nameEn}`}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-mono text-slate-300 uppercase font-semibold">
                      {isAr ? "الاسم الكامل *" : "FULL NAME *"}
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder={isAr ? "هشام مرعي" : "John Doe"}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-white focus:bg-white/[0.08] transition-all"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-mono text-slate-300 uppercase font-semibold">
                      {isAr ? "البريد الإلكتروني *" : "EMAIL ADDRESS *"}
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="name@company.com"
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-white focus:bg-white/[0.08] transition-all"
                    />
                  </div>

                  <div className="sm:col-span-2 flex flex-col gap-1.5">
                    <label className="text-xs font-mono text-slate-300 uppercase font-semibold">
                      {isAr ? "اسم الشركة / العلامة (اختياري)" : "COMPANY / BRAND (OPTIONAL)"}
                    </label>
                    <input
                      type="text"
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      placeholder={isAr ? "شركة المستقبل" : "Acme Corp"}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-white focus:bg-white/[0.08] transition-all"
                    />
                  </div>

                  <div className="sm:col-span-2 flex flex-col gap-1.5">
                    <label className="text-xs font-mono text-slate-300 uppercase font-semibold">
                      {isAr ? "نبذة عن فكرة مشروعك (اختياري)" : "PROJECT BRIEF / VISION (OPTIONAL)"}
                    </label>
                    <textarea
                      rows={3}
                      value={form.description}
                      onChange={(e) => setForm({ ...form, description: e.target.value })}
                      placeholder={
                        isAr
                          ? "صف أهدافك، الفئة المستهدفة، أو أي تفاصيل تفضلها..."
                          : "Describe your goals, vision, or any references..."
                      }
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-white focus:bg-white/[0.08] transition-all resize-none"
                    />
                  </div>
                </div>

                {errorMsg && (
                  <div className="px-4 py-3 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 text-xs font-mono">
                    {errorMsg}
                  </div>
                )}

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-5 py-3.5 rounded-2xl border border-white/15 text-slate-300 hover:text-white hover:border-white/30 bg-white/5 hover:bg-white/10 transition-all flex items-center gap-2 text-xs font-mono uppercase"
                  >
                    <ArrowLeft size={15} className="rtl:rotate-180" />
                    <span>{isAr ? "رجوع" : "Back"}</span>
                  </button>

                  <button
                    type="submit"
                    disabled={loading || !form.name || !form.email}
                    className="flex-1 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-black font-display font-extrabold text-sm tracking-wider uppercase flex items-center justify-center gap-2 transition-all hover:scale-[1.01] shadow-2xl shadow-emerald-500/30"
                  >
                    {loading ? (
                      <>
                        <Loader2 size={16} className="animate-spin text-black" />
                        <span>{isAr ? "جارٍ الإرسال..." : "SUBMITTING..."}</span>
                      </>
                    ) : (
                      <>
                        <Send size={16} className="text-black" />
                        <span>{isAr ? "تأكيد وإرسال الطلب الآن" : "SUBMIT PROJECT BRIEF"}</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
