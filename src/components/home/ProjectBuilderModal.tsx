"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Send,
  Loader2,
  Orbit,
  Sparkles,
  Layers,
  Cpu,
  Palette,
  Film,
  TrendingUp,
  Globe2,
} from "lucide-react";
import { Symbol } from "../brand/Symbol";
import { submitProjectBrief } from "@/actions/leads";
import { WorldCanvas, type WorldId } from "@/components/worlds/WorldCanvas";
import { WORLD_CONFIGS } from "@/components/worlds/worlds-config";

interface ProjectBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
  locale: "en" | "ar";
  initialWorld?: WorldId;
}

export const ProjectBuilderModal: React.FC<ProjectBuilderModalProps> = ({
  isOpen,
  onClose,
  locale,
  initialWorld = "uiux",
}) => {
  const [selectedWorld, setSelectedWorld] = useState<WorldId>(initialWorld);
  const [hoveredWorld, setHoveredWorld] = useState<WorldId | null>(null);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [formData, setFormData] = useState({
    projectType: [] as string[],
    services: [] as string[],
    successGoal: "",
    description: "",
    name: "",
    company: "",
    email: "",
    country: "",
  });

  const isAr = locale === "ar";
  const activeWorldId = hoveredWorld || selectedWorld;
  const currentWorldConfig = WORLD_CONFIGS[activeWorldId];

  useEffect(() => {
    if (initialWorld) {
      setSelectedWorld(initialWorld);
    }
  }, [initialWorld]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // ESC to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const worldsList: {
    id: WorldId;
    icon: React.ReactNode;
    titleEn: string;
    titleAr: string;
    subEn: string;
    subAr: string;
    accent: string;
    border: string;
    bg: string;
  }[] = [
    {
      id: "uiux",
      icon: <Layers size={22} />,
      titleEn: "UI / UX & Product Design",
      titleAr: "تصميم الواجهات وتجربة المستخدم",
      subEn: "Design systems, spatial UI, conversion flows & prototypes",
      subAr: "أنظمة تصميم متكاملة، تجارب مستخدم تفاعلية، ونماذج أولية",
      accent: "text-violet-400",
      border: "border-violet-500/40",
      bg: "bg-violet-500/10",
    },
    {
      id: "engineering",
      icon: <Cpu size={22} />,
      titleEn: "Software Engineering & SaaS",
      titleAr: "الهندسة والبرمجيات السحابية",
      subEn: "Cloud architectures, APIs, full-stack web apps & scale",
      subAr: "معماريات سحابية، واجهات برمجية، وتطبيقات ويب متقدمة",
      accent: "text-sky-400",
      border: "border-sky-500/40",
      bg: "bg-sky-500/10",
    },
    {
      id: "branding",
      icon: <Palette size={22} />,
      titleEn: "Brand Identity & Systems",
      titleAr: "الهوية البصرية والعلامة التجارية",
      subEn: "Strategic positioning, visual identity & typography",
      subAr: "استراتيجية التموضع، الهوية البصرية، والخطوط المخصصة",
      accent: "text-amber-400",
      border: "border-amber-500/40",
      bg: "bg-amber-500/10",
    },
    {
      id: "ai",
      icon: <Sparkles size={22} />,
      titleEn: "AI & Neural Automation",
      titleAr: "الذكاء الاصطناعي والأتمتة",
      subEn: "Custom LLMs, autonomous workflows & intelligence",
      subAr: "نماذج لغوية مخصصة، أتمتة العمليات، ووكلاء أذكياء",
      accent: "text-purple-400",
      border: "border-purple-500/40",
      bg: "bg-purple-500/10",
    },
    {
      id: "motion",
      icon: <Film size={22} />,
      titleEn: "Motion Design & 3D Craft",
      titleAr: "الموشن جرافيكس والرسوم ثلاثية الأبعاد",
      subEn: "Cinematic brand films, 3D assets & shaders",
      subAr: "أفلام سينمائية للعلامة التجارية وتجسيد ثلاثي الأبعاد",
      accent: "text-rose-400",
      border: "border-rose-500/40",
      bg: "bg-rose-500/10",
    },
    {
      id: "marketing",
      icon: <TrendingUp size={22} />,
      titleEn: "Digital Marketing & Growth",
      titleAr: "التسويق الرقمي ونمو الأعمال",
      subEn: "Full-funnel strategy, SEO, paid ads & analytics",
      subAr: "استراتيجيات التسويق الرقمي، تحسين SEO، والإعلانات",
      accent: "text-emerald-400",
      border: "border-emerald-500/40",
      bg: "bg-emerald-500/10",
    },
  ];

  const serviceOptions = isAr
    ? [
        "استراتيجية المنتج والتموضع",
        "تصميم تجربة المستخدم UX",
        "تصميم الواجهات UI System",
        "تطوير الواجهات الأمامية Next.js",
        "تطوير البنية الخلفية والـ APIs",
        "حلول الذكاء الاصطناعي LLM",
        "الأتمتة وتكامل الأنظمة",
        "نظام الهوية البصرية والموشن",
        "تصميم التغليف والمجسمات 3D",
        "استراتيجية التسويق الرقمي",
        "تحسين محركات البحث SEO",
        "الإعلانات المدفوعة Paid Media",
      ]
    : [
        "Product Strategy & Positioning",
        "UX Journey & Architecture",
        "UI Design System",
        "Frontend Next.js Engineering",
        "Backend & API Architecture",
        "Custom AI / LLM Integration",
        "Workflow Automations",
        "Visual Identity & Motion",
        "3D & Tactile Packaging",
        "Digital Marketing Strategy",
        "SEO & Organic Growth",
        "Paid Ads & Performance",
      ];

  const toggleSelection = (key: "projectType" | "services", val: string) => {
    setFormData((prev) => {
      const exists = prev[key].includes(val);
      return {
        ...prev,
        [key]: exists ? prev[key].filter((item) => item !== val) : [...prev[key], val],
      };
    });
  };

  const handleNext = () => setStep((s) => Math.min(s + 1, 5));
  const handlePrev = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const res = await submitProjectBrief({
      name: formData.name,
      email: formData.email,
      company: formData.company,
      country: formData.country,
      projectType: [selectedWorld, ...formData.projectType],
      services: formData.services,
      successGoal: formData.successGoal,
      description: formData.description,
    });

    setLoading(false);

    if (res.success) {
      setSubmitted(true);
    } else {
      setErrorMsg(
        isAr
          ? res.error || "حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى."
          : res.error || "An error occurred. Please try again."
      );
    }
  };

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center p-0 md:p-6 overflow-hidden bg-black/90 backdrop-blur-2xl animate-in fade-in duration-300"
      role="dialog"
      aria-modal="true"
    >
      {/* ── Outer Modal Container ── */}
      <div
        className="relative w-full h-full md:max-w-6xl md:h-[90vh] md:rounded-[32px] overflow-hidden flex flex-col bg-[#07070A] border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.8)]"
        dir={isAr ? "rtl" : "ltr"}
      >
        {/* ── Live World Canvas Background ── */}
        <div className="absolute inset-0 pointer-events-none opacity-40 transition-opacity duration-700">
          <WorldCanvas worldId={activeWorldId} />
        </div>

        {/* Ambient Gradient Layer */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#07070A]/85 via-[#07070A]/90 to-[#07070A]/98 pointer-events-none" />

        {/* ── Top Bar ── */}
        <div className="relative z-10 flex items-center justify-between px-6 md:px-10 py-5 border-b border-white/10 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <Symbol size={24} variant="engineering" />
            <div className="flex flex-col">
              <span className="font-display font-black text-sm uppercase tracking-widest text-white">
                ORDERLY // {isAr ? "بوابة المشاريع" : "PROJECT PORTAL"}
              </span>
              <span className="text-[10px] font-mono text-white/40">
                {isAr ? "عالم المشروع:" : "Active Universe:"}{" "}
                <span className={currentWorldConfig.accentColor}>
                  {isAr ? currentWorldConfig.labelAr : currentWorldConfig.label}
                </span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            {/* Step Indicators */}
            <div className="hidden sm:flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((s) => (
                <div
                  key={s}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    s === step
                      ? "w-8 bg-white"
                      : s < step
                      ? "w-4 bg-white/40"
                      : "w-2 bg-white/15"
                  }`}
                />
              ))}
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              className="p-2 rounded-full border border-white/10 hover:border-white/30 text-white/70 hover:text-white transition-colors bg-white/5"
              aria-label="Close portal"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* ── Main Interactive Content ── */}
        <div className="relative z-10 flex-1 overflow-y-auto p-6 md:p-10 flex flex-col justify-between">
          {submitted ? (
            /* ── Success Screen ── */
            <div className="my-auto text-center max-w-xl mx-auto py-12 animate-in zoom-in-95 duration-500">
              <div className="w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={40} />
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-black text-white mb-4">
                {isAr ? "تم إطلاق طلبك بنجاح!" : "Project Brief Launched!"}
              </h2>
              <p className="text-neutral-cool text-sm sm:text-base leading-relaxed mb-8">
                {isAr
                  ? "شكراً لتواصلك مع ORDERLY. فريقنا الهندسي والإبداعي يراجع متطلباتك الآن وسنتواصل معك خلال 24 ساعة بمقترح مفصل."
                  : "Thank you for reaching out to ORDERLY. Our multidisciplinary team is analyzing your project brief and will follow up within 24 hours."}
              </p>
              <button
                onClick={onClose}
                className="px-8 py-3.5 rounded-full bg-white text-obsidian font-bold text-xs tracking-widest uppercase hover:bg-neutral-200 transition-colors"
              >
                {isAr ? "إغلاق البوابة" : "CLOSE PORTAL"}
              </button>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto w-full my-auto py-4">
              {/* ── STEP 1: CHOOSE YOUR UNIVERSE / WORLD ── */}
              {step === 1 && (
                <div className="animate-in fade-in slide-in-from-bottom-3 duration-300">
                  <div className="mb-8 text-center sm:text-start">
                    <span className="text-xs font-mono text-white/40 uppercase tracking-widest block mb-2 font-bold">
                      {isAr ? "الخطوة 01 // اختيار البيئة" : "STEP 01 // UNIVERSE GATEWAY"}
                    </span>
                    <h2 className="text-2xl sm:text-4xl font-display font-black text-white">
                      {isAr ? "اختر عالم مشروعك الأساسي" : "Choose Your Project Universe"}
                    </h2>
                    <p className="text-white/50 text-xs sm:text-sm mt-2">
                      {isAr
                        ? "حدد التخصص الرئيسي لمشروعك لندخلك العالم المناسب ونخصص المتطلبات بدقة."
                        : "Select the primary domain for your initiative to immerse in the matching workspace."}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                    {worldsList.map((world) => {
                      const isSelected = selectedWorld === world.id;
                      return (
                        <div
                          key={world.id}
                          onMouseEnter={() => setHoveredWorld(world.id)}
                          onMouseLeave={() => setHoveredWorld(null)}
                          onClick={() => {
                            setSelectedWorld(world.id);
                            if (!formData.projectType.includes(world.id)) {
                              setFormData((prev) => ({
                                ...prev,
                                projectType: [world.id],
                              }));
                            }
                          }}
                          className={`group p-6 rounded-2xl border cursor-pointer transition-all duration-300 relative overflow-hidden flex flex-col justify-between ${
                            isSelected
                              ? `${world.border} ${world.bg} shadow-2xl scale-[1.02]`
                              : "border-white/10 bg-white/[0.02] hover:border-white/25 hover:bg-white/[0.04]"
                          }`}
                        >
                          <div>
                            <div
                              className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-colors ${
                                isSelected ? `${world.bg} ${world.accent}` : "bg-white/5 text-white/60"
                              }`}
                            >
                              {world.icon}
                            </div>
                            <h3 className={`text-lg font-display font-bold mb-1.5 transition-colors ${
                              isSelected ? world.accent : "text-white"
                            }`}>
                              {isAr ? world.titleAr : world.titleEn}
                            </h3>
                            <p className="text-white/45 text-xs leading-relaxed">
                              {isAr ? world.subAr : world.subEn}
                            </p>
                          </div>

                          <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono">
                            <span className={isSelected ? world.accent : "text-white/30"}>
                              {isSelected ? (isAr ? "العالم المختار ✓" : "SELECTED ✓") : (isAr ? "اضغط للدخول" : "ENTER WORLD")}
                            </span>
                            <Orbit
                              size={12}
                              className={`transition-transform duration-500 ${
                                isSelected ? "rotate-180 text-white" : "text-white/20"
                              }`}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ── STEP 2: SELECT SPECIFIC CAPABILITIES ── */}
              {step === 2 && (
                <div className="animate-in fade-in slide-in-from-bottom-3 duration-300">
                  <div className="mb-8 text-center sm:text-start">
                    <span className="text-xs font-mono text-white/40 uppercase tracking-widest block mb-2 font-bold">
                      {isAr ? "الخطوة 02 // الخدمات المطلوبة" : "STEP 02 // CAPABILITIES"}
                    </span>
                    <h2 className="text-2xl sm:text-4xl font-display font-black text-white">
                      {isAr ? "ما هي الخدمات المحددة التي تحتاجها؟" : "Select Required Disciplines"}
                    </h2>
                    <p className="text-white/50 text-xs sm:text-sm mt-2">
                      {isAr
                        ? "يمكنك اختيار أكثر من خدمة لبناء مشروع متكامل يجمع عدة تخصصات."
                        : "Select all disciplines that apply to your initiative."}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
                    {serviceOptions.map((svc) => {
                      const isSelected = formData.services.includes(svc);
                      return (
                        <button
                          key={svc}
                          type="button"
                          onClick={() => toggleSelection("services", svc)}
                          className={`p-4 rounded-xl text-start text-xs sm:text-sm font-medium border transition-all duration-200 flex items-center justify-between ${
                            isSelected
                              ? "border-white bg-white text-obsidian font-bold shadow-lg"
                              : "border-white/10 bg-white/[0.03] text-white/80 hover:border-white/25"
                          }`}
                        >
                          <span>{svc}</span>
                          {isSelected && <CheckCircle2 size={16} className="text-obsidian flex-shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ── STEP 3: SUCCESS GOAL & PROJECT DESCRIPTION ── */}
              {step === 3 && (
                <div className="animate-in fade-in slide-in-from-bottom-3 duration-300">
                  <div className="mb-8 text-center sm:text-start">
                    <span className="text-xs font-mono text-white/40 uppercase tracking-widest block mb-2 font-bold">
                      {isAr ? "الخطوة 03 // الرؤية والهدف" : "STEP 03 // VISION & GOALS"}
                    </span>
                    <h2 className="text-2xl sm:text-4xl font-display font-black text-white">
                      {isAr ? "ما هو هدف النجاح الأساسي؟" : "What is Your Primary Success Goal?"}
                    </h2>
                  </div>

                  <div className="space-y-6 mb-8">
                    <div>
                      <label className="block text-xs font-mono text-white/60 mb-2 uppercase tracking-wider">
                        {isAr ? "الهدف الرئيسي للنجاح" : "PRIMARY SUCCESS METRIC / GOAL"}
                      </label>
                      <input
                        type="text"
                        value={formData.successGoal}
                        onChange={(e) => setFormData({ ...formData, successGoal: e.target.value })}
                        placeholder={
                          isAr
                            ? "مثال: إطلاق MVP خلال 6 أسابيع / مضاعفة التحويلات 3× / بناء هوية لجمع تمويل"
                            : "e.g., Launch MVP in 6 weeks / Triple conversion rate / Series A Brand Identity"
                        }
                        className="w-full px-5 py-4 rounded-xl bg-white/[0.04] border border-white/15 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-white/60 mb-2 uppercase tracking-wider">
                        {isAr ? "نبذة عن المشروع أو الفكرة (اختياري)" : "PROJECT BRIEF / VISION (OPTIONAL)"}
                      </label>
                      <textarea
                        rows={4}
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder={
                          isAr
                            ? "صف رؤيتك للمشروع، الفئة المستهدفة، أو أي مراجع تفضلها..."
                            : "Describe your vision, target audience, technical needs, or references..."
                        }
                        className="w-full px-5 py-4 rounded-xl bg-white/[0.04] border border-white/15 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-white resize-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* ── STEP 4: CONTACT & COMPANY DETAILS ── */}
              {step === 4 && (
                <div className="animate-in fade-in slide-in-from-bottom-3 duration-300">
                  <div className="mb-8 text-center sm:text-start">
                    <span className="text-xs font-mono text-white/40 uppercase tracking-widest block mb-2 font-bold">
                      {isAr ? "الخطوة 04 // بيانات التواصل" : "STEP 04 // CONTACT DETAILS"}
                    </span>
                    <h2 className="text-2xl sm:text-4xl font-display font-black text-white">
                      {isAr ? "من نتواصل معه؟" : "Who Are We Partnering With?"}
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    <div>
                      <label className="block text-xs font-mono text-white/60 mb-2 uppercase tracking-wider">
                        {isAr ? "الاسم الكامل *" : "FULL NAME *"}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder={isAr ? "هشام مرعي" : "John Doe"}
                        className="w-full px-5 py-3.5 rounded-xl bg-white/[0.04] border border-white/15 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-white/60 mb-2 uppercase tracking-wider">
                        {isAr ? "البريد الإلكتروني *" : "EMAIL ADDRESS *"}
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@company.com"
                        className="w-full px-5 py-3.5 rounded-xl bg-white/[0.04] border border-white/15 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-white/60 mb-2 uppercase tracking-wider">
                        {isAr ? "اسم الشركة / العلامة التجارية" : "COMPANY / BRAND NAME"}
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder={isAr ? "شركة المستقبل" : "Acme Corp"}
                        className="w-full px-5 py-3.5 rounded-xl bg-white/[0.04] border border-white/15 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-white/60 mb-2 uppercase tracking-wider">
                        {isAr ? "الدولة / المدينة" : "COUNTRY / CITY"}
                      </label>
                      <input
                        type="text"
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        placeholder={isAr ? "الرياض، المملكة العربية السعودية" : "Dubai, UAE"}
                        className="w-full px-5 py-3.5 rounded-xl bg-white/[0.04] border border-white/15 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* ── STEP 5: REVIEW & LAUNCH BRIEF ── */}
              {step === 5 && (
                <div className="animate-in fade-in slide-in-from-bottom-3 duration-300">
                  <div className="mb-8 text-center sm:text-start">
                    <span className="text-xs font-mono text-white/40 uppercase tracking-widest block mb-2 font-bold">
                      {isAr ? "الخطوة 05 // مراجعة وإطلاق الطلب" : "STEP 05 // REVIEW & LAUNCH"}
                    </span>
                    <h2 className="text-2xl sm:text-4xl font-display font-black text-white">
                      {isAr ? "تأكيد تفاصيل المشروع" : "Ready to Launch Your Brief"}
                    </h2>
                  </div>

                  <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4 mb-8 text-xs sm:text-sm">
                    <div className="flex items-center justify-between pb-3 border-b border-white/5">
                      <span className="text-white/50">{isAr ? "العالم المختار:" : "Chosen Universe:"}</span>
                      <span className={`font-bold uppercase ${currentWorldConfig.accentColor}`}>
                        {isAr ? currentWorldConfig.labelAr : currentWorldConfig.label}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pb-3 border-b border-white/5">
                      <span className="text-white/50">{isAr ? "صاحب الطلب:" : "Contact:"}</span>
                      <span className="text-white font-medium">
                        {formData.name || "—"} ({formData.email || "—"})
                      </span>
                    </div>

                    {formData.services.length > 0 && (
                      <div className="pb-3 border-b border-white/5">
                        <span className="text-white/50 block mb-2">{isAr ? "الخدمات المحددة:" : "Services:"}</span>
                        <div className="flex flex-wrap gap-1.5">
                          {formData.services.map((s) => (
                            <span key={s} className="px-2.5 py-1 rounded-md bg-white/10 text-[11px] text-white">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {formData.successGoal && (
                      <div>
                        <span className="text-white/50 block mb-1">{isAr ? "هدف النجاح:" : "Goal:"}</span>
                        <span className="text-white font-medium">{formData.successGoal}</span>
                      </div>
                    )}
                  </div>

                  {errorMsg && (
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs mb-6">
                      {errorMsg}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* ── Bottom Controls ── */}
          {!submitted && (
            <div className="max-w-4xl mx-auto w-full pt-6 border-t border-white/10 flex items-center justify-between">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={handlePrev}
                  className="px-6 py-3 rounded-full border border-white/15 text-white/70 hover:text-white text-xs font-mono uppercase tracking-wider flex items-center gap-2 hover:bg-white/5 transition-all"
                >
                  <ArrowLeft size={14} className="rtl:rotate-180" />
                  <span>{isAr ? "السابق" : "BACK"}</span>
                </button>
              ) : (
                <div />
              )}

              {step < 5 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-8 py-3.5 rounded-full bg-white text-obsidian font-bold text-xs tracking-widest uppercase flex items-center gap-2 hover:bg-neutral-200 transition-all shadow-xl"
                >
                  <span>{isAr ? "متابعة" : "NEXT STEP"}</span>
                  <ArrowRight size={14} className="rtl:rotate-180" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading || !formData.name || !formData.email}
                  className="px-10 py-3.5 rounded-full bg-emerald-500 text-white font-bold text-xs tracking-widest uppercase flex items-center gap-2 hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xl shadow-emerald-500/25"
                >
                  {loading ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      <span>{isAr ? "جارٍ الإرسال..." : "SUBMITTING..."}</span>
                    </>
                  ) : (
                    <>
                      <Send size={14} />
                      <span>{isAr ? "إطلاق الطلب الآن" : "LAUNCH PROJECT BRIEF"}</span>
                    </>
                  )}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};