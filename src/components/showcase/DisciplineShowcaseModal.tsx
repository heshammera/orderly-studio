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

/* ─── icon helper ─────────────────────────────────────────── */
const Icon = ({ name, className = "w-5 h-5" }: { name: string; className?: string }) => {
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

/* ─── discipline selector data ────────────────────────────── */
const DISCIPLINE_TILES: {
  id: DisciplineId;
  iconName: string;
  subtitleEn: string;
  subtitleAr: string;
}[] = [
  { id: "uiux",        iconName: "layout",     subtitleEn: "Apps, websites & design systems",       subtitleAr: "تطبيقات، مواقع، وأنظمة تصميم" },
  { id: "engineering", iconName: "cpu",        subtitleEn: "Full-stack platforms & SaaS products",  subtitleAr: "منصات ويب متكاملة وبرمجيات سحابية" },
  { id: "branding",    iconName: "sparkles",   subtitleEn: "Logo, colors, typography & packaging",  subtitleAr: "شعار، ألوان، خطوط، وهوية بصرية كاملة" },
  { id: "ai",          iconName: "bot",        subtitleEn: "AI agents & workflow automations",       subtitleAr: "مساعدات ذكاء اصطناعي وأتمتة العمليات" },
  { id: "motion",      iconName: "film",       subtitleEn: "Cinematic 3D videos & animations",      subtitleAr: "فيديوهات سينمائية ثلاثية الأبعاد" },
  { id: "marketing",   iconName: "trending-up",subtitleEn: "Paid ads, SEO & growth strategy",       subtitleAr: "إعلانات ممولة، SEO، واستراتيجية النمو" },
];

type Step = 1 | 2 | 3;

export const DisciplineShowcaseModal: React.FC<DisciplineShowcaseModalProps> = ({
  isOpen,
  onClose,
  initialDiscipline = "uiux",
}) => {
  const { locale, isAr } = useLocale();
  const [step, setStep]           = useState<Step>(1);
  const [active, setActive]       = useState<DisciplineId>(initialDiscipline);
  const [loading, setLoading]     = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg]   = useState("");
  const [form, setForm]           = useState({ name: "", email: "", company: "", description: "" });

  /* reset on open */
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setActive(initialDiscipline);
      setSubmitted(false);
      setErrorMsg("");
      setForm({ name: "", email: "", company: "", description: "" });
    }
  }, [isOpen, initialDiscipline]);

  /* lock scroll */
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  /* ESC key */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!isOpen) return null;

  const current = DISCIPLINES[active];

  /* ─── form submit ─── */
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
    if (res.success) { setSubmitted(true); }
    else {
      setErrorMsg(
        isAr
          ? (res.error || "حدث خطأ. يرجى المحاولة مرة أخرى.")
          : (res.error || "An error occurred. Please try again.")
      );
    }
  };

  /* ─── shared overlay wrapper ─── */
  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-2xl animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      dir={isAr ? "rtl" : "ltr"}
    >
      <div className="relative w-full max-w-2xl bg-[#09090D] rounded-[28px] border border-white/12 shadow-[0_0_80px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col">

        {/* ── Ambient glow ── */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-40 rounded-full blur-[100px] opacity-20 pointer-events-none"
          style={{ backgroundColor: current.glowColor }}
        />

        {/* ── Top bar ── */}
        <div className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-white/8">
          {/* Step indicator */}
          <div className="flex items-center gap-2">
            {([1, 2, 3] as Step[]).map((n) => (
              <div
                key={n}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  step === n ? "w-6 bg-white" : step > n ? "w-3 bg-white/40" : "w-3 bg-white/15"
                }`}
              />
            ))}
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full border border-white/10 hover:border-white/30 text-white/50 hover:text-white bg-white/5 transition-all"
          >
            <X size={16} />
          </button>
        </div>

        {/* ══════════════════════════════════════════════════
            STEP 1 — Pick a discipline
        ══════════════════════════════════════════════════ */}
        {step === 1 && (
          <div className="relative z-10 p-6 md:p-8 flex flex-col gap-6 animate-in slide-in-from-bottom-4 duration-300">
            <div>
              <p className="text-xs font-mono text-white/40 uppercase tracking-widest mb-1">
                {isAr ? "الخطوة 1 من 3" : "STEP 1 OF 3"}
              </p>
              <h2 className="text-2xl md:text-3xl font-display font-black text-white">
                {isAr ? "ما نوع مشروعك؟" : "What type of project?"}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {DISCIPLINE_TILES.map((tile) => {
                const data = DISCIPLINES[tile.id];
                const isSelected = active === tile.id;
                return (
                  <button
                    key={tile.id}
                    onClick={() => setActive(tile.id)}
                    className={`flex items-center gap-4 p-4 rounded-2xl border text-left transition-all duration-200 group ${
                      isSelected
                        ? `border-white/30 bg-white/8 shadow-lg`
                        : "border-white/8 bg-white/[0.02] hover:border-white/20 hover:bg-white/5"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${
                        isSelected ? "bg-white/15" : "bg-white/5 group-hover:bg-white/10"
                      }`}
                    >
                      <Icon name={tile.iconName} className={`w-5 h-5 ${isSelected ? data.accentColor : "text-white/50"}`} />
                    </div>
                    <div className="text-left min-w-0">
                      <p className={`text-sm font-bold truncate ${isSelected ? "text-white" : "text-white/80"}`}>
                        {isAr ? data.nameAr : data.nameEn}
                      </p>
                      <p className="text-[11px] text-white/40 leading-tight mt-0.5 truncate">
                        {isAr ? tile.subtitleAr : tile.subtitleEn}
                      </p>
                    </div>
                    {isSelected && (
                      <Check size={14} className="text-emerald-400 flex-shrink-0 ms-auto" />
                    )}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full py-4 rounded-2xl bg-white hover:bg-neutral-100 text-black font-bold text-sm tracking-wide flex items-center justify-center gap-2 transition-all hover:scale-[1.01] shadow-xl"
            >
              <span>{isAr ? "التالي — اعرف ماذا ستستلم" : "Next — See what you receive"}</span>
              <ChevronRight size={16} className={isAr ? "rotate-180" : ""} />
            </button>
          </div>
        )}

        {/* ══════════════════════════════════════════════════
            STEP 2 — Deliverables preview
        ══════════════════════════════════════════════════ */}
        {step === 2 && (
          <div className="relative z-10 p-6 md:p-8 flex flex-col gap-6 animate-in slide-in-from-bottom-4 duration-300">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-mono text-white/40 uppercase tracking-widest mb-1">
                  {isAr ? "الخطوة 2 من 3" : "STEP 2 OF 3"}
                </p>
                <h2 className="text-2xl md:text-3xl font-display font-black text-white">
                  {isAr ? "ماذا ستستلم؟" : "What you receive"}
                </h2>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`text-xs font-mono font-bold ${current.accentColor}`}>
                    {isAr ? current.nameAr : current.nameEn}
                  </span>
                  <span className="text-white/25">·</span>
                  <span className="text-xs font-mono text-white/40 flex items-center gap-1">
                    <Clock size={11} className="text-emerald-400" />
                    {isAr ? current.timelineAr : current.timelineEn}
                  </span>
                </div>
              </div>
            </div>

            {/* 3 clean deliverable rows */}
            <div className="flex flex-col gap-3">
              {current.deliverables.map((del, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/8"
                >
                  <div className="w-9 h-9 rounded-xl bg-white/8 flex items-center justify-center flex-shrink-0">
                    <Icon name={del.icon} className={`w-4 h-4 ${current.accentColor}`} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white mb-0.5">
                      {isAr ? del.titleAr : del.titleEn}
                    </p>
                    <p className="text-xs text-white/50 leading-relaxed">
                      {isAr ? del.descAr : del.descEn}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {(isAr ? del.featuresAr : del.featuresEn).map((f, fi) => (
                        <span key={fi} className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 text-white/50 border border-white/8">
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Guarantees strip */}
            <div className="flex flex-wrap gap-3">
              {(isAr ? current.includedGuaranteesAr : current.includedGuaranteesEn).map((g, gi) => (
                <div key={gi} className="flex items-center gap-1.5 text-[11px] font-mono text-white/50">
                  <ShieldCheck size={12} className="text-emerald-400" />
                  <span>{g}</span>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="p-3.5 rounded-xl border border-white/12 text-white/50 hover:text-white hover:border-white/25 transition-all"
              >
                <ArrowLeft size={16} className={isAr ? "rotate-180" : ""} />
              </button>
              <button
                onClick={() => setStep(3)}
                className="flex-1 py-3.5 rounded-2xl bg-white hover:bg-neutral-100 text-black font-bold text-sm flex items-center justify-center gap-2 transition-all hover:scale-[1.01] shadow-xl"
              >
                <span>{isAr ? "احجز مشروعك الآن" : "Request this project"}</span>
                <ChevronRight size={16} className={isAr ? "rotate-180" : ""} />
              </button>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════
            STEP 3 — Contact form / success
        ══════════════════════════════════════════════════ */}
        {step === 3 && (
          <div className="relative z-10 p-6 md:p-8 flex flex-col gap-6 animate-in slide-in-from-bottom-4 duration-300">
            {submitted ? (
              <div className="text-center py-8 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mb-4">
                  <CheckCircle2 size={30} />
                </div>
                <h3 className="text-2xl font-display font-black text-white mb-2">
                  {isAr ? "تم إرسال طلبك!" : "Request Received!"}
                </h3>
                <p className="text-sm text-white/50 max-w-sm mx-auto leading-relaxed mb-6">
                  {isAr
                    ? "شكراً لتواصلك. سنتواصل معك خلال 24 ساعة بمقترح مفصل."
                    : "Thank you! We'll follow up within 24 hours with a custom proposal."}
                </p>
                <button
                  onClick={onClose}
                  className="px-8 py-3 rounded-full bg-white text-black font-bold text-xs tracking-widest uppercase hover:bg-neutral-200 transition-colors"
                >
                  {isAr ? "إغلاق" : "CLOSE"}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                  <p className="text-xs font-mono text-white/40 uppercase tracking-widest mb-1">
                    {isAr ? "الخطوة 3 من 3" : "STEP 3 OF 3"}
                  </p>
                  <h2 className="text-2xl md:text-3xl font-display font-black text-white">
                    {isAr ? "معلومات التواصل" : "Your details"}
                  </h2>
                  <p className="text-xs text-white/40 mt-1">
                    {isAr
                      ? `طلب مشروع: ${current.nameAr}`
                      : `Project type: ${current.nameEn}`}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-mono text-white/50 uppercase">
                      {isAr ? "الاسم *" : "NAME *"}
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder={isAr ? "هشام مرعي" : "John Doe"}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/12 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-white/40 transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-mono text-white/50 uppercase">
                      {isAr ? "الإيميل *" : "EMAIL *"}
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="name@company.com"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/12 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-white/40 transition-colors"
                    />
                  </div>

                  <div className="sm:col-span-2 flex flex-col gap-1.5">
                    <label className="text-xs font-mono text-white/50 uppercase">
                      {isAr ? "الشركة / العلامة التجارية" : "COMPANY / BRAND"}
                    </label>
                    <input
                      type="text"
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      placeholder={isAr ? "شركة المستقبل" : "Acme Corp"}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/12 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-white/40 transition-colors"
                    />
                  </div>

                  <div className="sm:col-span-2 flex flex-col gap-1.5">
                    <label className="text-xs font-mono text-white/50 uppercase">
                      {isAr ? "نبذة عن مشروعك (اختياري)" : "PROJECT BRIEF (OPTIONAL)"}
                    </label>
                    <textarea
                      rows={3}
                      value={form.description}
                      onChange={(e) => setForm({ ...form, description: e.target.value })}
                      placeholder={isAr ? "صف فكرتك أو أهدافك..." : "Describe your vision or goals..."}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/12 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-white/40 transition-colors resize-none"
                    />
                  </div>
                </div>

                {errorMsg && (
                  <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/25 text-red-400 text-xs">
                    {errorMsg}
                  </div>
                )}

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="p-3.5 rounded-xl border border-white/12 text-white/50 hover:text-white hover:border-white/25 transition-all"
                  >
                    <ArrowLeft size={16} className={isAr ? "rotate-180" : ""} />
                  </button>
                  <button
                    type="submit"
                    disabled={loading || !form.name || !form.email}
                    className="flex-1 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all hover:scale-[1.01] shadow-xl shadow-emerald-500/20"
                  >
                    {loading ? (
                      <><Loader2 size={15} className="animate-spin" /><span>{isAr ? "جارٍ الإرسال..." : "Submitting..."}</span></>
                    ) : (
                      <><Send size={15} /><span>{isAr ? "إرسال الطلب" : "Submit Request"}</span></>
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
