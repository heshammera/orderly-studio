"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  ArrowRight,
  ArrowLeft,
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
  Check,
} from "lucide-react";
import { DISCIPLINES, type DisciplineId } from "@/data/disciplines";
import { submitProjectBrief } from "@/actions/leads";

interface DisciplineShowcaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  locale: "en" | "ar";
  initialDiscipline?: DisciplineId;
}

export const DisciplineShowcaseModal: React.FC<DisciplineShowcaseModalProps> = ({
  isOpen,
  onClose,
  locale,
  initialDiscipline = "uiux",
}) => {
  const [activeTab, setActiveTab] = useState<DisciplineId>(initialDiscipline);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    country: "",
    description: "",
  });

  const isAr = locale === "ar";

  useEffect(() => {
    if (initialDiscipline) {
      setActiveTab(initialDiscipline);
    }
  }, [initialDiscipline]);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setIsFormOpen(false);
      setSubmitted(false);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // ESC key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const current = DISCIPLINES[activeTab] || DISCIPLINES.uiux;

  const renderIcon = (name: string, className = "w-5 h-5") => {
    switch (name) {
      case "layout": return <Layout className={className} />;
      case "layers": return <Layers className={className} />;
      case "smartphone": return <Smartphone className={className} />;
      case "globe": return <Globe className={className} />;
      case "database": return <Database className={className} />;
      case "shield": return <Shield className={className} />;
      case "sparkles": return <Sparkles className={className} />;
      case "palette": return <Palette className={className} />;
      case "book": return <BookOpen className={className} />;
      case "bot": return <Bot className={className} />;
      case "zap": return <Zap className={className} />;
      case "cpu": return <Cpu className={className} />;
      case "film": return <Film className={className} />;
      case "play": return <Play className={className} />;
      case "box": return <Box className={className} />;
      case "trending-up": return <TrendingUp className={className} />;
      case "search": return <Search className={className} />;
      case "mail": return <Mail className={className} />;
      default: return <Sparkles className={className} />;
    }
  };

  const tabs: { id: DisciplineId; labelEn: string; labelAr: string; icon: React.ReactNode }[] = [
    { id: "uiux", labelEn: "UI / UX Design", labelAr: "تصميم الواجهات", icon: <Layout size={14} /> },
    { id: "engineering", labelEn: "Engineering & SaaS", labelAr: "الهندسة والبرمجيات", icon: <Cpu size={14} /> },
    { id: "branding", labelEn: "Brand Identity", labelAr: "الهوية البصرية", icon: <Palette size={14} /> },
    { id: "ai", labelEn: "AI & Automation", labelAr: "الذكاء الاصطناعي", icon: <Bot size={14} /> },
    { id: "motion", labelEn: "Motion & 3D", labelAr: "الموشن والـ 3D", icon: <Film size={14} /> },
    { id: "marketing", labelEn: "Digital Marketing", labelAr: "التسويق الرقمي", icon: <TrendingUp size={14} /> },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const res = await submitProjectBrief({
      name: formData.name,
      email: formData.email,
      company: formData.company,
      country: formData.country,
      projectType: [current.id],
      services: [current.nameEn],
      description: formData.description,
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

  return (
    <div
      className="fixed inset-0 z-[999] overflow-y-auto bg-black/90 backdrop-blur-2xl transition-all duration-300 animate-in fade-in flex items-center justify-center p-0 md:p-6 select-none"
      role="dialog"
      aria-modal="true"
      dir={isAr ? "rtl" : "ltr"}
    >
      {/* ── Main Modal Shell ── */}
      <div className="relative w-full h-full md:max-w-6xl md:h-[92vh] md:rounded-[32px] overflow-hidden flex flex-col bg-[#08080C] border border-white/15 text-white shadow-[0_0_100px_rgba(0,0,0,0.9)]">
        {/* Subtle Ambient Radial Glow */}
        <div
          className="absolute top-0 right-1/4 w-96 h-96 rounded-full pointer-events-none blur-[120px] opacity-25 transition-colors duration-700"
          style={{ backgroundColor: current.glowColor }}
        />

        {/* ── Top Header Navigation Bar ── */}
        <header className="relative z-20 flex items-center justify-between px-6 md:px-10 py-5 border-b border-white/10 bg-[#08080C]/80 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-display font-black text-sm uppercase tracking-widest text-white">
              ORDERLY // {isAr ? "دليل الخدمات والمخرجات" : "DISCIPLINES & DELIVERABLES"}
            </span>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="p-2.5 rounded-full border border-white/10 hover:border-white/30 text-white/70 hover:text-white bg-white/5 transition-all"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </header>

        {/* ── Discipline Selector Tabs Bar ── */}
        <nav
          aria-label="Discipline Tabs"
          className="relative z-20 flex items-center gap-2 px-6 md:px-10 py-3.5 border-b border-white/10 bg-white/[0.02] overflow-x-auto"
        >
          {tabs.map((tab) => {
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setIsFormOpen(false);
                  setSubmitted(false);
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono tracking-wider flex-shrink-0 transition-all duration-200 border ${
                  isSelected
                    ? "bg-white text-black font-bold border-white shadow-lg shadow-white/10 scale-[1.02]"
                    : "bg-white/5 text-white/60 border-white/5 hover:border-white/20 hover:text-white"
                }`}
              >
                {tab.icon}
                <span>{isAr ? tab.labelAr : tab.labelEn}</span>
              </button>
            );
          })}
        </nav>

        {/* ── Main Scrollable Body ── */}
        <div className="relative z-10 flex-1 overflow-y-auto p-6 md:p-10 space-y-10">
          {/* Section 1: Hero Overview */}
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span
                className={`px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider border ${current.badgeBg} ${current.badgeBorder} ${current.badgeText}`}
              >
                {isAr ? current.nameAr : current.nameEn}
              </span>

              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-white/5 border border-white/10 text-white/70">
                <Clock size={12} className="text-emerald-400" />
                <span>
                  {isAr ? `مدة الإنجاز: ${current.timelineAr}` : `Delivery: ${current.timelineEn}`}
                </span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-display font-black text-white leading-tight mb-4">
              {isAr ? current.taglineAr : current.taglineEn}
            </h1>

            <p className="text-sm sm:text-base text-neutral-cool leading-relaxed">
              {isAr ? current.overviewAr : current.overviewEn}
            </p>
          </div>

          {/* Section 2: The 3 Concrete Deliverables */}
          <div>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xs font-mono uppercase tracking-widest text-white/60 font-bold">
                {isAr ? "01 // ماذا ستستلم بالضبط في يدك؟" : "01 // WHAT YOU RECEIVE (KEY DELIVERABLES)"}
              </h2>
              <span className="text-xs font-mono text-emerald-400">3 Core Deliverables</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {current.deliverables.map((del, idx) => (
                <div
                  key={idx}
                  className="p-6 sm:p-7 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-white/20 transition-all flex flex-col justify-between space-y-5 group"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-white/10 text-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      {renderIcon(del.icon, "w-5 h-5")}
                    </div>

                    <h3 className="text-lg font-display font-bold text-white mb-2">
                      {isAr ? del.titleAr : del.titleEn}
                    </h3>

                    <p className="text-xs text-white/60 leading-relaxed mb-4">
                      {isAr ? del.descAr : del.descEn}
                    </p>
                  </div>

                  <ul className="pt-4 border-t border-white/5 space-y-2 text-xs font-mono text-white/80">
                    {(isAr ? del.featuresAr : del.featuresEn).map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-2">
                        <Check size={13} className="text-emerald-400 flex-shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: The 3-Step Clear Process */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-widest text-white/60 font-bold mb-5">
              {isAr ? "02 // كيف نعمل معك؟ (3 خطوات واضحة)" : "02 // HOW WE WORK (3-STEP ROADMAP)"}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {current.process.map((step, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl border border-white/10 bg-white/[0.01] flex flex-col justify-between"
                >
                  <div>
                    <span className="text-xs font-mono text-white/40 block mb-2 font-bold">
                      STEP {step.number}
                    </span>
                    <h4 className="text-base font-display font-bold text-white mb-1.5">
                      {isAr ? step.titleAr : step.titleEn}
                    </h4>
                    <p className="text-xs text-white/60 leading-relaxed">
                      {isAr ? step.descAr : step.descEn}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Guarantees */}
          <div className="p-4 rounded-2xl border border-white/10 bg-white/[0.02] flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-white/80">
            {(isAr ? current.includedGuaranteesAr : current.includedGuaranteesEn).map(
              (guarantee, gIdx) => (
                <div key={gIdx} className="flex items-center gap-2">
                  <ShieldCheck size={15} className="text-emerald-400" />
                  <span>{guarantee}</span>
                </div>
              )
            )}
          </div>

          {/* ── Section 5: Direct Order / Project Brief Form ── */}
          <div
            id="order-form"
            className="p-6 sm:p-8 rounded-3xl border border-white/15 bg-gradient-to-br from-white/[0.04] to-transparent shadow-2xl space-y-6"
          >
            {submitted ? (
              <div className="text-center py-8 animate-in zoom-in-95 duration-400">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="text-2xl font-display font-black text-white mb-2">
                  {isAr ? "تم استلام طلب مشروعك بنجاح!" : "Project Request Received!"}
                </h3>
                <p className="text-sm text-neutral-cool max-w-md mx-auto leading-relaxed mb-6">
                  {isAr
                    ? "شكراً لتواصلك مع ORDERLY. فريقنا يراجع متطلباتك وسنتواصل معك خلال 24 ساعة بمقترح عمل مخصص وجدول زمني دقيق."
                    : "Thank you for reaching out. Our team will review your brief and follow up within 24 hours with a custom proposal."}
                </p>
                <button
                  onClick={onClose}
                  className="px-8 py-3 rounded-full bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-neutral-200 transition-colors"
                >
                  {isAr ? "إغلاق" : "CLOSE"}
                </button>
              </div>
            ) : isFormOpen ? (
              <form onSubmit={handleSubmit} className="space-y-4 animate-in fade-in duration-300">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <h3 className="text-base font-display font-bold text-white">
                    {isAr
                      ? `طلب مشروع: ${current.nameAr}`
                      : `Start Project: ${current.nameEn}`}
                  </h3>
                  <button
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="text-xs font-mono text-white/50 hover:text-white"
                  >
                    {isAr ? "إلغاء ←" : "Cancel →"}
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-white/60 mb-1.5 uppercase">
                      {isAr ? "الاسم الكامل *" : "FULL NAME *"}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={isAr ? "هشام مرعي" : "John Doe"}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white text-sm focus:outline-none focus:border-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-white/60 mb-1.5 uppercase">
                      {isAr ? "البريد الإلكتروني *" : "EMAIL ADDRESS *"}
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@company.com"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white text-sm focus:outline-none focus:border-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-white/60 mb-1.5 uppercase">
                      {isAr ? "اسم الشركة / العلامة" : "COMPANY / BRAND"}
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder={isAr ? "شركة المستقبل" : "Acme Corp"}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white text-sm focus:outline-none focus:border-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-white/60 mb-1.5 uppercase">
                      {isAr ? "الدولة / المدينة" : "COUNTRY / CITY"}
                    </label>
                    <input
                      type="text"
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      placeholder={isAr ? "الرياض، السعودية" : "Dubai, UAE"}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white text-sm focus:outline-none focus:border-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-white/60 mb-1.5 uppercase">
                    {isAr ? "نبذة عن فكرة المشروع أو أهدافك (اختياري)" : "PROJECT BRIEF / GOALS (OPTIONAL)"}
                  </label>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder={
                      isAr
                        ? "صف رؤيتك للمشروع أو أي مراجع تفضلها..."
                        : "Describe your project vision or target audience..."
                    }
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white text-sm focus:outline-none focus:border-white resize-none"
                  />
                </div>

                {errorMsg && (
                  <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
                    {errorMsg}
                  </div>
                )}

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="submit"
                    disabled={loading || !formData.name || !formData.email}
                    className="px-8 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs font-mono uppercase tracking-wider flex items-center gap-2 transition-all shadow-xl shadow-emerald-500/25 disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <Loader2 size={14} className="animate-spin" />
                        <span>{isAr ? "جارٍ الإرسال..." : "SUBMITTING..."}</span>
                      </>
                    ) : (
                      <>
                        <Send size={14} />
                        <span>{isAr ? "تأكيد وإرسال الطلب الآن" : "SUBMIT PROJECT BRIEF"}</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            ) : (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-xl sm:text-2xl font-display font-black text-white mb-1">
                    {isAr ? `جاهز لبدء مشروع ${current.nameAr}؟` : `Ready to start your ${current.nameEn}?`}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-cool">
                    {isAr
                      ? "احجز موعد استشارتك الآن وسنبدأ العمل معك مباشرة."
                      : "Request a custom proposal and delivery roadmap for your initiative."}
                  </p>
                </div>

                <button
                  onClick={() => setIsFormOpen(true)}
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-white hover:bg-neutral-200 text-black font-bold text-xs font-mono uppercase tracking-widest flex items-center justify-center gap-3 transition-all shadow-2xl hover:scale-105 flex-shrink-0"
                >
                  <span>{isAr ? "اطلب هذا المشروع الآن" : "REQUEST THIS PROJECT"}</span>
                  <ArrowRight size={15} className="rtl:rotate-180" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
