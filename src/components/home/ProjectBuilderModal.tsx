"use client";

import React, { useState } from "react";
import { X, ArrowRight, ArrowLeft, CheckCircle2, Send, Loader2 } from "lucide-react";
import { Symbol } from "../brand/Symbol";
import { submitProjectBrief } from "@/actions/leads";

interface ProjectBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
  locale: "en" | "ar";
}

export const ProjectBuilderModal: React.FC<ProjectBuilderModalProps> = ({
  isOpen,
  onClose,
  locale,
}) => {
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

  if (!isOpen) return null;

  const isAr = locale === "ar";

  const projectTypes = isAr
    ? [
        { id: "saas", label: "منصة SaaS / برمجيات" },
        { id: "digital_product", label: "منتج رقمي متكامل" },
        { id: "webapp", label: "تطبيق ويب تفاعلي" },
        { id: "website", label: "موقع ويب واستوديو" },
        { id: "ai_automation", label: "ذكاء اصطناعي وأتمتة" },
        { id: "ecommerce", label: "تجارة إلكترونية متقدمة" },
        { id: "branding", label: "هوية بصرية وعلامة تجارية" },
        { id: "ui_ux", label: "تصميم واجهات وتجربة مستخدم" },
        { id: "packaging_3d", label: "تصميم تغليف ومجسمات 3D" },
        { id: "marketing_strategy", label: "استراتيجية تسويق رقمي" },
        { id: "social_media", label: "إدارة وسائل التواصل الاجتماعي" },
        { id: "seo_sem", label: "تحسين محركات البحث SEO / SEM" },
        { id: "paid_media", label: "إعلانات مدفوعة وبريد إلكتروني" },
      ]
    : [
        { id: "saas", label: "SaaS Platform" },
        { id: "digital_product", label: "Digital Product" },
        { id: "webapp", label: "Web Application" },
        { id: "website", label: "Studio Website" },
        { id: "ai_automation", label: "AI & Automation" },
        { id: "ecommerce", label: "E-Commerce" },
        { id: "branding", label: "Brand Identity" },
        { id: "ui_ux", label: "UI / UX Design" },
        { id: "packaging_3d", label: "Packaging & 3D" },
        { id: "marketing_strategy", label: "Marketing Strategy" },
        { id: "social_media", label: "Social Media Management" },
        { id: "seo_sem", label: "SEO / SEM Campaign" },
        { id: "paid_media", label: "Paid Media & Email" },
      ];

  const serviceOptions = isAr
    ? [
        "استراتيجية المنتج",
        "تصميم تجربة المستخدم UX",
        "تصميم الواجهات UI",
        "تطوير الواجهات الأمامية",
        "تطوير البنية الخلفية والـ APIs",
        "حلول الذكاء الاصطناعي",
        "الأتمتة وتكامل الأنظمة",
        "نظام الهوية البصرية والموشن",
        "تصميم التغليف والمواد الملموسة",
        "استراتيجية التسويق الرقمي",
        "تحسين محركات البحث SEO",
        "إدارة منصات التواصل الاجتماعي",
        "الإعلانات المدفوعة Paid Media",
        "التسويق عبر البريد الإلكتروني",
        "التحليلات وتقارير النمو",
      ]
    : [
        "Product Strategy",
        "UX Architecture",
        "UI Design System",
        "Frontend Engineering",
        "Backend & API Architecture",
        "AI Solutions",
        "Workflow Automation",
        "Visual Identity & Motion",
        "Packaging & Physical Media",
        "Digital Marketing Strategy",
        "SEO & Organic Growth",
        "Social Media Management",
        "Paid Media & Ads",
        "Email Marketing & CRM",
        "Analytics & Growth Reporting",
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
      projectType: formData.projectType,
      services: formData.services,
      successGoal: formData.successGoal,
      description: formData.description,
    });

    setLoading(false);
    if (res.success) {
      setSubmitted(true);
    } else {
      setErrorMsg(res.error || "An error occurred.");
    }
  };

  const resetForm = () => {
    setStep(1);
    setSubmitted(false);
    setFormData({
      projectType: [],
      services: [],
      successGoal: "",
      description: "",
      name: "",
      company: "",
      email: "",
      country: "",
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-obsidian/90 backdrop-blur-2xl p-4 sm:p-6 animate-in fade-in duration-300">
      <div className="relative w-full max-w-3xl rounded-3xl bg-soft-black border border-white/15 p-6 sm:p-10 shadow-2xl overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-engineering-blue/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-creative-coral/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-5 mb-8">
          <div className="flex items-center gap-3">
            <Symbol size={26} variant="engineering" />
            <span className="font-display font-bold text-sm tracking-widest uppercase text-white">
              {isAr ? "منشئ المشاريع — أوردرلي" : "ORDERLY — PROJECT BUILDER"}
            </span>
          </div>

          <div className="flex items-center gap-4">
            {!submitted && (
              <span className="text-xs font-mono text-neutral-cool tracking-wider">
                {isAr ? `الخطوة ${step} من 5` : `STEP 0${step} / 05`}
              </span>
            )}
            <button
              onClick={resetForm}
              className="p-2 rounded-full border border-white/10 hover:border-white/30 text-neutral-cool hover:text-white transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Content Body */}
        {!submitted ? (
          <div>
            {/* Step 1: Project Type */}
            {step === 1 && (
              <div className="animate-in fade-in duration-300">
                <span className="text-xs font-mono text-engineering-blue uppercase tracking-widest">
                  {isAr ? "المرحلة الأولى" : "PHASE 01 — SCOPE"}
                </span>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mt-1 mb-6">
                  {isAr ? "ما الذي تتطلع إلى بنائه؟" : "What are you looking to create?"}
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {projectTypes.map((item) => {
                    const active = formData.projectType.includes(item.label);
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => toggleSelection("projectType", item.label)}
                        className={`p-4 rounded-xl text-start text-xs sm:text-sm font-medium transition-all duration-200 border ${
                          active
                            ? "bg-engineering-blue text-white border-engineering-blue shadow-lg scale-[1.02]"
                            : "bg-white/[0.03] text-white/80 border-white/10 hover:border-white/25 hover:bg-white/[0.06]"
                        }`}
                      >
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 2: Capabilities */}
            {step === 2 && (
              <div className="animate-in fade-in duration-300">
                <span className="text-xs font-mono text-creative-coral uppercase tracking-widest">
                  {isAr ? "المرحلة الثانية" : "PHASE 02 — DISCIPLINES"}
                </span>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mt-1 mb-6">
                  {isAr ? "ما هي الخدمات المطلوبة؟" : "Which capabilities do you need?"}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {serviceOptions.map((srv, idx) => {
                    const active = formData.services.includes(srv);
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => toggleSelection("services", srv)}
                        className={`p-4 rounded-xl text-start text-xs sm:text-sm font-medium transition-all duration-200 border flex items-center justify-between ${
                          active
                            ? "bg-creative-coral text-white border-creative-coral shadow-lg"
                            : "bg-white/[0.03] text-white/80 border-white/10 hover:border-white/25 hover:bg-white/[0.06]"
                        }`}
                      >
                        <span>{srv}</span>
                        {active && <CheckCircle2 size={16} />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 3: Success Metrics */}
            {step === 3 && (
              <div className="animate-in fade-in duration-300">
                <span className="text-xs font-mono text-engineering-violet uppercase tracking-widest">
                  {isAr ? "المرحلة الثالثة" : "PHASE 03 — IMPACT"}
                </span>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mt-1 mb-6">
                  {isAr ? "كيف يبدو النجاح بالنسبة لك؟" : "What does success look like?"}
                </h2>
                <textarea
                  rows={4}
                  value={formData.successGoal}
                  onChange={(e) => setFormData({ ...formData, successGoal: e.target.value })}
                  placeholder={
                    isAr
                      ? "مثال: إطلاق منتج رقمي سريع، رفع معدل التحويل، أو بناء علامة تجارية رائدة عالمياً..."
                      : "e.g. Launching a scalable product, securing enterprise contracts, redefining the visual industry standard..."
                  }
                  className="w-full p-4 rounded-2xl bg-white/[0.03] border border-white/15 text-white placeholder:text-neutral-cool text-sm focus:outline-none focus:border-engineering-blue transition-colors"
                />
              </div>
            )}

            {/* Step 4: Idea Details */}
            {step === 4 && (
              <div className="animate-in fade-in duration-300">
                <span className="text-xs font-mono text-white/60 uppercase tracking-widest">
                  {isAr ? "المرحلة الرابعة" : "PHASE 04 — THE IDEA"}
                </span>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mt-1 mb-6">
                  {isAr ? "أخبرنا عن الفكرة وتفاصيلها" : "Tell us about the idea"}
                </h2>
                <textarea
                  rows={5}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder={
                    isAr
                      ? "اشرح التحدي، الجمهور المستهدف، الجدول الزمني المتوقع، أو أي متطلبات خاصة..."
                      : "Describe the core challenge, target audience, expected timeline, or technical requirements..."
                  }
                  className="w-full p-4 rounded-2xl bg-white/[0.03] border border-white/15 text-white placeholder:text-neutral-cool text-sm focus:outline-none focus:border-engineering-blue transition-colors"
                />
              </div>
            )}

            {/* Step 5: Contact Info */}
            {step === 5 && (
              <div className="animate-in fade-in duration-300">
                <span className="text-xs font-mono text-engineering-blue uppercase tracking-widest">
                  {isAr ? "المرحلة الأخيرة" : "PHASE 05 — CONTACT"}
                </span>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mt-1 mb-6">
                  {isAr ? "بيانات التواصل" : "How do we reach you?"}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    placeholder={isAr ? "الاسم الكريم *" : "Your Name *"}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="p-3.5 rounded-xl bg-white/[0.03] border border-white/15 text-white text-sm focus:outline-none focus:border-engineering-blue"
                  />
                  <input
                    type="email"
                    required
                    placeholder={isAr ? "البريد الإلكتروني *" : "Email Address *"}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="p-3.5 rounded-xl bg-white/[0.03] border border-white/15 text-white text-sm focus:outline-none focus:border-engineering-blue"
                  />
                  <input
                    type="text"
                    placeholder={isAr ? "اسم الشركة / المشروع" : "Company / Project Name"}
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="p-3.5 rounded-xl bg-white/[0.03] border border-white/15 text-white text-sm focus:outline-none focus:border-engineering-blue"
                  />
                  <input
                    type="text"
                    placeholder={isAr ? "الدولة / المدينة" : "Country / City"}
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="p-3.5 rounded-xl bg-white/[0.03] border border-white/15 text-white text-sm focus:outline-none focus:border-engineering-blue"
                  />
                </div>
                {errorMsg && (
                  <p className="text-xs font-mono text-rose-400 mt-3">{errorMsg}</p>
                )}
              </div>
            )}

            {/* Controls */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/10">
              <button
                type="button"
                onClick={handlePrev}
                disabled={step === 1 || loading}
                className={`flex items-center gap-2 text-xs font-mono tracking-wider uppercase transition-opacity ${
                  step === 1 ? "opacity-0 pointer-events-none" : "text-neutral-cool hover:text-white"
                }`}
              >
                {isAr ? <ArrowRight size={14} /> : <ArrowLeft size={14} />}
                <span>{isAr ? "السابق" : "PREVIOUS"}</span>
              </button>

              {step < 5 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex items-center gap-2 px-6 py-3 rounded-full bg-white text-obsidian font-bold text-xs tracking-wider uppercase hover:bg-engineering-blue hover:text-white transition-all shadow-lg"
                >
                  <span>{isAr ? "التالي" : "CONTINUE"}</span>
                  {isAr ? <ArrowLeft size={14} /> : <ArrowRight size={14} />}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading}
                  className="flex items-center gap-2 px-8 py-3.5 rounded-full bg-engineering-blue text-white font-bold text-xs tracking-wider uppercase hover:bg-blue-600 transition-all shadow-xl disabled:opacity-50"
                >
                  {loading ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <>
                      <span>{isAr ? "إرسال موجز المشروع" : "SUBMIT BRIEF"}</span>
                      <Send size={14} />
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Signature Success State */
          <div className="flex flex-col items-center text-center py-10 animate-in zoom-in-95 duration-500">
            <Symbol size={64} variant="engineering" animated={true} className="mb-6" />
            <span className="text-xs font-mono text-engineering-blue tracking-widest uppercase mb-2">
              {isAr ? "تم استلام وحفظ الطلب بنجاح" : "TRANSMISSION SAVED"}
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4">
              {isAr ? "وصلتنا فكرتك. سنضعها في نظام." : "WE'VE GOT IT."}
            </h2>
            <p className="text-neutral-cool text-sm max-w-md mb-8 leading-relaxed">
              {isAr
                ? "تم حفظ موجز مشروعك بنجاح في قاعدة بيانات أوردرلي، وسيتواصل معك الفريق الفني خلال 24 ساعة لبدء تحويل الفكرة إلى واقع."
                : "Your project brief has been securely stored in our system. The ORDERLY team is reviewing your specifications and will respond within 24 hours."}
            </p>
            <button
              onClick={resetForm}
              className="px-8 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-mono text-xs uppercase tracking-wider transition-all"
            >
              {isAr ? "إغلاق النافذة" : "CLOSE"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};