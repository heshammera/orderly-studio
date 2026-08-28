"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Check,
  Clock,
  Send,
  Loader2,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { Header } from "@/components/navigation/Header";
import { CustomCursor } from "@/components/cursor/CustomCursor";
import { DISCIPLINES, type DisciplineId } from "@/data/disciplines";
import { useLocale } from "@/context/LocaleContext";
import { submitProjectBrief } from "@/actions/leads";

export default function StartAProjectPage() {
  const { isAr } = useLocale();
  const [selectedDiscipline, setSelectedDiscipline] = useState<DisciplineId>("uiux");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [formData, setFormData] = useState({ name: "", email: "", company: "", country: "", description: "" });

  const current = DISCIPLINES[selectedDiscipline] || DISCIPLINES.uiux;

  const tabs: { id: DisciplineId; labelEn: string; labelAr: string }[] = [
    { id: "uiux",        labelEn: "UI / UX Design",     labelAr: "تصميم الواجهات" },
    { id: "engineering", labelEn: "Engineering & SaaS",  labelAr: "الهندسة والبرمجيات" },
    { id: "branding",    labelEn: "Brand Identity",      labelAr: "الهوية البصرية" },
    { id: "ai",          labelEn: "AI & Automation",     labelAr: "الذكاء الاصطناعي" },
    { id: "motion",      labelEn: "Motion & 3D",         labelAr: "الموشن والـ 3D" },
    { id: "marketing",   labelEn: "Digital Marketing",   labelAr: "التسويق الرقمي" },
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
    if (res.success) { setSubmitted(true); }
    else { setErrorMsg(isAr ? (res.error || "حدث خطأ.") : (res.error || "An error occurred.")); }
  };

  return (
    <main
      dir={isAr ? "rtl" : "ltr"}
      className={`min-h-screen bg-[#07070A] text-white pt-28 pb-20 ${isAr ? "font-arabic" : "font-sans"}`}
    >
      <CustomCursor />
      <Header onOpenProjectBuilder={() => {}} />

      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-white/50 hover:text-white uppercase tracking-wider transition-colors"
          >
            <ArrowLeft size={14} className={isAr ? "rotate-180" : ""} />
            <span>{isAr ? "العودة للرئيسية" : "BACK TO HOMEPAGE"}</span>
          </Link>
          <span className="text-xs font-mono text-emerald-400">
            {isAr ? "طلب مشروع مخصص" : "PROJECT BRIEF PORTAL"}
          </span>
        </div>

        <div className="rounded-3xl bg-soft-black border border-white/10 p-6 sm:p-12 shadow-2xl space-y-10">
          {submitted ? (
            <div className="text-center py-12 flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={40} />
              </div>
              <h1 className="text-3xl sm:text-4xl font-display font-black text-white mb-4">
                {isAr ? "تم إرسال طلب مشروعك بنجاح!" : "Project Request Received!"}
              </h1>
              <p className="text-neutral-cool text-base max-w-lg mx-auto leading-relaxed mb-8">
                {isAr
                  ? "شكراً لتواصلك مع ORDERLY. سنتواصل معك خلال 24 ساعة بمقترح مفصل."
                  : "Thank you! Our team will follow up within 24 hours with a custom proposal."}
              </p>
              <Link
                href="/"
                className="inline-block px-8 py-3.5 rounded-full bg-white text-black font-bold text-xs tracking-widest uppercase hover:bg-neutral-200 transition-colors"
              >
                {isAr ? "العودة للرئيسية" : "RETURN TO HOMEPAGE"}
              </Link>
            </div>
          ) : (
            <>
              {/* Discipline Tabs */}
              <div>
                <span className="text-xs font-mono text-white/40 uppercase tracking-widest block mb-3 font-bold">
                  {isAr ? "01 // اختر نوع الخدمة الرئيسية لمشروعك:" : "01 // SELECT PRIMARY DISCIPLINE:"}
                </span>
                <div className="flex flex-wrap gap-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setSelectedDiscipline(tab.id)}
                      className={`px-4 py-2.5 rounded-full text-xs font-mono tracking-wider transition-all border ${
                        selectedDiscipline === tab.id
                          ? "bg-white text-black font-bold border-white shadow-lg"
                          : "bg-white/5 text-white/60 border-white/5 hover:border-white/20 hover:text-white"
                      }`}
                    >
                      {isAr ? tab.labelAr : tab.labelEn}
                    </button>
                  ))}
                </div>
              </div>

              {/* Deliverables preview */}
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-white/5">
                  <span className="text-base font-display font-bold text-white">
                    {isAr ? current.nameAr : current.nameEn}
                  </span>
                  <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                    <Clock size={12} />
                    {isAr ? `مدة الإنجاز: ${current.timelineAr}` : `Delivery: ${current.timelineEn}`}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {current.deliverables.map((del, dIdx) => (
                    <div key={dIdx} className="p-3.5 rounded-xl bg-white/5 border border-white/5">
                      <span className="text-xs font-bold text-white block mb-1">
                        {isAr ? del.titleAr : del.titleEn}
                      </span>
                      <p className="text-[11px] text-white/60 line-clamp-2">
                        {isAr ? del.descAr : del.descEn}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                <span className="text-xs font-mono text-white/40 uppercase tracking-widest block font-bold">
                  {isAr ? "02 // تفاصيل التواصل والمشروع:" : "02 // CONTACT & BRIEF DETAILS:"}
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-white/60 mb-1.5 uppercase">{isAr ? "الاسم *" : "NAME *"}</label>
                    <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder={isAr ? "هشام مرعي" : "John Doe"} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white text-sm focus:outline-none focus:border-white" />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-white/60 mb-1.5 uppercase">{isAr ? "الإيميل *" : "EMAIL *"}</label>
                    <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="name@company.com" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white text-sm focus:outline-none focus:border-white" />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-white/60 mb-1.5 uppercase">{isAr ? "الشركة" : "COMPANY"}</label>
                    <input type="text" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} placeholder={isAr ? "شركة المستقبل" : "Acme Corp"} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white text-sm focus:outline-none focus:border-white" />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-white/60 mb-1.5 uppercase">{isAr ? "الدولة" : "COUNTRY"}</label>
                    <input type="text" value={formData.country} onChange={(e) => setFormData({ ...formData, country: e.target.value })} placeholder={isAr ? "الرياض، السعودية" : "Dubai, UAE"} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white text-sm focus:outline-none focus:border-white" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-mono text-white/60 mb-1.5 uppercase">{isAr ? "نبذة عن المشروع (اختياري)" : "PROJECT BRIEF (OPTIONAL)"}</label>
                  <textarea rows={4} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder={isAr ? "صف فكرتك أو أهدافك..." : "Describe your vision..."} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white text-sm focus:outline-none focus:border-white resize-none" />
                </div>
                {errorMsg && <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs">{errorMsg}</div>}
                <div className="flex justify-end">
                  <button type="submit" disabled={loading || !formData.name || !formData.email} className="w-full sm:w-auto px-10 py-4 rounded-full bg-white hover:bg-neutral-200 text-black font-bold text-xs font-mono uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-xl disabled:opacity-50 hover:scale-105">
                    {loading ? (<><Loader2 size={14} className="animate-spin" /><span>{isAr ? "جارٍ الإرسال..." : "Submitting..."}</span></>) : (<><Send size={14} /><span>{isAr ? "إرسال الطلب" : "SUBMIT BRIEF"}</span></>)}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </main>
  );
}