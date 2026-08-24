"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, Send, Loader2 } from "lucide-react";
import { Header } from "@/components/navigation/Header";
import { CustomCursor } from "@/components/cursor/CustomCursor";
import { Symbol } from "@/components/brand/Symbol";
import { submitProjectBrief } from "@/actions/leads";

export default function StartAProjectPage() {
  const [locale, setLocale] = useState<"en" | "ar">("en");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const isAr = locale === "ar";

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

  return (
    <main dir={isAr ? "rtl" : "ltr"} className={`min-h-screen bg-obsidian text-white pt-28 pb-24 ${isAr ? "font-arabic" : "font-sans"}`}>
      <CustomCursor />
      <Header locale={locale} onToggleLocale={() => setLocale(l => l === "en" ? "ar" : "en")} onOpenProjectBuilder={() => {}} />

      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-mono text-neutral-cool hover:text-white uppercase tracking-wider mb-10 transition-colors">
          <ArrowLeft size={14} className="rtl:rotate-180" />
          <span>{isAr ? "العودة للرئيسية" : "BACK TO HOMEPAGE"}</span>
        </Link>

        <div className="rounded-3xl bg-soft-black border border-white/15 p-8 sm:p-14 shadow-2xl relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-10">
            <div className="flex items-center gap-3">
              <Symbol size={28} variant="engineering" />
              <span className="font-display font-bold text-base tracking-widest uppercase text-white">
                ORDERLY // PROJECT BUILDER
              </span>
            </div>
            {!submitted && (
              <span className="text-xs font-mono text-neutral-cool tracking-wider">
                {isAr ? `الخطوة ${step} من 5` : `STEP 0${step} / 05`}
              </span>
            )}
          </div>

          {!submitted ? (
            <div>
              {step === 1 && (
                <div className="animate-in fade-in duration-300">
                  <span className="text-xs font-mono text-engineering-blue uppercase tracking-widest block mb-2 font-bold">
                    01 // PROJECT SCOPE
                  </span>
                  <h2 className="text-3xl font-display font-bold text-white mb-8">
                    {isAr ? "ما الذي تتطلع إلى بنائه؟" : "What are you looking to create?"}
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
                    {projectTypes.map((item) => {
                      const active = formData.projectType.includes(item.label);
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => toggleSelection("projectType", item.label)}
                          className={`p-5 rounded-2xl text-start text-xs sm:text-sm font-medium transition-all border ${
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

              {step === 2 && (
                <div className="animate-in fade-in duration-300">
                  <span className="text-xs font-mono text-creative-coral uppercase tracking-widest block mb-2 font-bold">
                    02 // DISCIPLINES
                  </span>
                  <h2 className="text-3xl font-display font-bold text-white mb-8">
                    {isAr ? "ما هي الخدمات والقدرات المطلوبة؟" : "Which capabilities do you need?"}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {serviceOptions.map((srv, idx) => {
                      const active = formData.services.includes(srv);
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => toggleSelection("services", srv)}
                          className={`p-4 rounded-xl text-start text-xs sm:text-sm font-medium transition-all border flex items-center justify-between ${
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

              {step === 3 && (
                <div className="animate-in fade-in duration-300">
                  <span className="text-xs font-mono text-engineering-violet uppercase tracking-widest block mb-2 font-bold">
                    03 // SUCCESS METRICS
                  </span>
                  <h2 className="text-3xl font-display font-bold text-white mb-8">
                    {isAr ? "كيف يبدو النجاح بالنسبة لمشروعك؟" : "What does success look like?"}
                  </h2>
                  <textarea
                    rows={5}
                    value={formData.successGoal}
                    onChange={(e) => setFormData({ ...formData, successGoal: e.target.value })}
                    placeholder={
                      isAr
                        ? "مثال: إطلاق منتج رقمي سريع، رفع معدل التحويل، أو بناء علامة تجارية رائدة عالمياً..."
                        : "e.g. Launching a scalable product, securing enterprise contracts, redefining the visual industry standard..."
                    }
                    className="w-full p-5 rounded-2xl bg-white/[0.03] border border-white/15 text-white placeholder:text-neutral-cool text-sm focus:outline-none focus:border-engineering-blue transition-colors"
                  />
                </div>
              )}

              {step === 4 && (
                <div className="animate-in fade-in duration-300">
                  <span className="text-xs font-mono text-white/60 uppercase tracking-widest block mb-2 font-bold">
                    04 // THE IDEA
                  </span>
                  <h2 className="text-3xl font-display font-bold text-white mb-8">
                    {isAr ? "أخبرنا عن تفاصيل الفكرة" : "Tell us about the idea"}
                  </h2>
                  <textarea
                    rows={6}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder={
                      isAr
                        ? "اشرح التحدي، الجمهور المستهدف، الجدول الزمني المتوقع، أو أي متطلبات خاصة..."
                        : "Describe the core challenge, target audience, expected timeline, or technical requirements..."
                    }
                    className="w-full p-5 rounded-2xl bg-white/[0.03] border border-white/15 text-white placeholder:text-neutral-cool text-sm focus:outline-none focus:border-engineering-blue transition-colors"
                  />
                </div>
              )}

              {step === 5 && (
                <div className="animate-in fade-in duration-300">
                  <span className="text-xs font-mono text-engineering-blue uppercase tracking-widest block mb-2 font-bold">
                    05 // CONTACT DETAILS
                  </span>
                  <h2 className="text-3xl font-display font-bold text-white mb-8">
                    {isAr ? "بيانات التواصل" : "How do we reach you?"}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      required
                      placeholder={isAr ? "الاسم الكريم *" : "Your Name *"}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="p-4 rounded-xl bg-white/[0.03] border border-white/15 text-white text-sm focus:outline-none focus:border-engineering-blue"
                    />
                    <input
                      type="email"
                      required
                      placeholder={isAr ? "البريد الإلكتروني *" : "Email Address *"}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="p-4 rounded-xl bg-white/[0.03] border border-white/15 text-white text-sm focus:outline-none focus:border-engineering-blue"
                    />
                    <input
                      type="text"
                      placeholder={isAr ? "اسم الشركة / المشروع" : "Company / Project Name"}
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="p-4 rounded-xl bg-white/[0.03] border border-white/15 text-white text-sm focus:outline-none focus:border-engineering-blue"
                    />
                    <input
                      type="text"
                      placeholder={isAr ? "الدولة / المدينة" : "Country / City"}
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="p-4 rounded-xl bg-white/[0.03] border border-white/15 text-white text-sm focus:outline-none focus:border-engineering-blue"
                    />
                  </div>
                  {errorMsg && (
                    <p className="text-xs font-mono text-rose-400 mt-3">{errorMsg}</p>
                  )}
                </div>
              )}

              <div className="flex items-center justify-between mt-10 pt-8 border-t border-white/10">
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
                    className="flex items-center gap-2 px-8 py-4 rounded-full bg-white text-obsidian font-bold text-xs tracking-wider uppercase hover:bg-engineering-blue hover:text-white transition-all shadow-lg"
                  >
                    <span>{isAr ? "التالي" : "CONTINUE"}</span>
                    {isAr ? <ArrowLeft size={14} /> : <ArrowRight size={14} />}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading}
                    className="flex items-center gap-2 px-10 py-4 rounded-full bg-engineering-blue text-white font-bold text-xs tracking-wider uppercase hover:bg-blue-600 transition-all shadow-xl disabled:opacity-50"
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
            <div className="flex flex-col items-center text-center py-12 animate-in zoom-in-95 duration-500">
              <Symbol size={72} variant="engineering" animated={true} className="mb-8" />
              <span className="text-xs font-mono text-engineering-blue tracking-widest uppercase mb-3 font-bold">
                {isAr ? "تم استلام وحفظ الطلب بنجاح" : "TRANSMISSION RECORDED"}
              </span>
              <h2 className="text-4xl font-display font-bold text-white mb-4">
                {isAr ? "وصلتنا فكرتك. سنضعها في نظام." : "WE'VE GOT IT."}
              </h2>
              <p className="text-neutral-cool text-base max-w-lg mb-10 leading-relaxed">
                {isAr
                  ? "تم حفظ موجز مشروعك بنجاح في قاعدة بيانات أوردرلي، وسيتواصل معك الفريق الفني خلال 24 ساعة لبدء تحويل الفكرة إلى واقع."
                  : "Your project brief has been securely stored in our system. The ORDERLY team is reviewing your specifications and will respond within 24 hours."}
              </p>
              <Link
                href="/"
                className="px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-mono text-xs uppercase tracking-wider transition-all"
              >
                {isAr ? "العودة للرئيسية" : "BACK TO HOME"}
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}