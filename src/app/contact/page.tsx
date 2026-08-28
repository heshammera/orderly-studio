"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Mail,
  MessageCircle,
  Phone,
  MapPin,
  Clock,
  CalendarDays,
  Send,
  Loader2,
  CheckCircle2,
  ArrowLeft,
  Shield,
  Cpu,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { Header } from "@/components/navigation/Header";
import { Footer } from "@/components/navigation/Footer";
import { CustomCursor } from "@/components/cursor/CustomCursor";
import { ProjectDiscoveryWizard } from "@/components/discovery/ProjectDiscoveryWizard";
import { useLocale } from "@/context/LocaleContext";

const SERVICES_QUICK = [
  { icon: <Cpu size={14} />, labelEn: "SaaS & Cloud Engineering", labelAr: "هندسة السحابة والبرمجيات" },
  { icon: <Sparkles size={14} />, labelEn: "Brand & Identity Design", labelAr: "الهوية البصرية والتصميم" },
  { icon: <TrendingUp size={14} />, labelEn: "AI & Performance Marketing", labelAr: "الذكاء الاصطناعي والتسويق" },
];

export default function ContactPage() {
  const { locale, isAr } = useLocale();
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setLoading(true);
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          company: form.company,
          message: form.message,
        }),
      });
      setSubmitted(true);
    } catch (_) {
      setSubmitted(true); // Still show success to user
    }
    setLoading(false);
  };

  return (
    <main
      dir={isAr ? "rtl" : "ltr"}
      className={`min-h-screen bg-[#07070A] text-white pt-28 pb-20 ${isAr ? "font-arabic" : "font-sans"}`}
    >
      <CustomCursor />
      <Header onOpenProjectBuilder={() => setIsWizardOpen(true)} />

      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Page Header */}
        <div className="mb-14 pb-10 border-b border-white/10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-bold mb-5">
            <MessageCircle size={12} />
            <span>{isAr ? "تواصل معنا مباشرة" : "DIRECT CONTACT"}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black text-white mb-5 leading-tight">
            {isAr ? "لنبني شيئاً\nاستثنائياً معاً." : "Let's build something\nextraordinary together."}
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed">
            {isAr
              ? "سواء كان لديك مشروع واضح المعالم أو مجرد فكرة في مرحلتها الأولى، فريق ORDERLY جاهز للاستماع والرد خلال 24 ساعة."
              : "Whether you have a fully scoped project or just an early idea, our team is ready to listen and respond within 24 hours."}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* LEFT — Contact Info */}
          <div className="lg:col-span-5 space-y-6">

            {/* WhatsApp CTA — Primary */}
            <a
              href="https://wa.me/201003705046?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%20ORDERLY%20Studio!%20%D8%A3%D9%88%D8%AF%20%D8%A7%D9%84%D8%AA%D8%AD%D8%AF%D8%AB%20%D8%B9%D9%86%20%D9%85%D8%B4%D8%B1%D9%88%D8%B9."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-6 rounded-3xl border-2 hover:scale-[1.02] transition-all duration-300 shadow-2xl"
              style={{ background: "linear-gradient(135deg, #128C7E15, #25D36610)", borderColor: "#25D36640" }}
            >
              <div>
                <span className="text-xs font-mono text-[#25D366] uppercase tracking-widest font-bold block mb-1">
                  {isAr ? "الأسرع والأيسر" : "FASTEST RESPONSE"}
                </span>
                <span className="text-xl font-display font-black text-white">
                  WhatsApp
                </span>
                <span className="text-sm text-slate-300 font-mono block mt-0.5 dir-ltr" dir="ltr">
                  +20 100 370 5046
                </span>
              </div>
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{ backgroundColor: "#25D366" }}
              >
                <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </div>
            </a>

            {/* Email */}
            <a
              href="mailto:hesham.mera@gmail.com"
              className="flex items-center justify-between p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/25 hover:bg-white/[0.06] transition-all group"
            >
              <div>
                <span className="text-xs font-mono text-slate-400 uppercase tracking-widest font-bold block mb-1">
                  {isAr ? "البريد الإلكتروني" : "EMAIL"}
                </span>
                <span className="text-base font-display font-bold text-white">
                  support@orderlyshops.com
                </span>
              </div>
              <Mail size={20} className="text-slate-400 group-hover:text-white transition-colors" />
            </a>

            {/* Info cards row */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                <Clock size={16} className="text-sky-400 mb-2" />
                <span className="text-xs font-mono text-slate-400 uppercase font-bold block mb-1">
                  {isAr ? "وقت الاستجابة" : "RESPONSE TIME"}
                </span>
                <span className="text-sm font-bold text-white">
                  {isAr ? "أقل من 24 ساعة" : "Under 24 Hours"}
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                <MapPin size={16} className="text-rose-400 mb-2" />
                <span className="text-xs font-mono text-slate-400 uppercase font-bold block mb-1">
                  {isAr ? "الموقع" : "LOCATION"}
                </span>
                <span className="text-sm font-bold text-white">
                  {isAr ? "القاهرة، مصر" : "Cairo, Egypt"}
                </span>
              </div>
            </div>

            {/* Discovery Wizard CTA */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-sky-500/10 to-purple-500/10 border border-white/10">
              <CalendarDays size={20} className="text-sky-400 mb-3" />
              <h3 className="text-base font-display font-bold text-white mb-2">
                {isAr ? "هل تفضل وصف مشروعك تفصيلياً؟" : "Prefer to detail your project scope?"}
              </h3>
              <p className="text-slate-400 text-xs leading-relaxed mb-4">
                {isAr
                  ? "استخدم معالج الاستكشاف الذكي ليساعدك في تنظيم أفكارك وتلقي مقترح مفصل."
                  : "Use our 5-step intelligent discovery wizard to structure your brief and receive a tailored proposal."}
              </p>
              <button
                onClick={() => setIsWizardOpen(true)}
                className="w-full py-3 rounded-xl bg-white text-black font-mono font-bold text-xs uppercase tracking-wider hover:bg-slate-200 transition-all flex items-center justify-center gap-2"
              >
                <span>{isAr ? "ابدأ معالج الاستكشاف" : "OPEN DISCOVERY WIZARD"}</span>
                <ArrowUpRight size={13} />
              </button>
            </div>

            {/* Quick services */}
            <div>
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-bold block mb-3">
                {isAr ? "ما الذي يمكننا بناؤه معك" : "WHAT WE BUILD WITH YOU"}
              </span>
              <div className="space-y-2">
                {SERVICES_QUICK.map((s, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-sm text-slate-300 font-mono">
                    <span className="text-emerald-400">{s.icon}</span>
                    <span>{isAr ? s.labelAr : s.labelEn}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-[#0C0D14] border border-white/10 shadow-2xl">
              {submitted ? (
                <div className="text-center py-16 flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mb-6">
                    <CheckCircle2 size={38} className="text-emerald-400" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-display font-black text-white mb-3">
                    {isAr ? "تم استلام رسالتك!" : "Message Received!"}
                  </h2>
                  <p className="text-slate-300 text-sm max-w-sm leading-relaxed mb-8">
                    {isAr
                      ? "شكراً لتواصلك مع ORDERLY. سنتواصل معك خلال 24 ساعة بمقترح مخصص."
                      : "Thank you for reaching out. Our team will follow up within 24 hours with a custom proposal."}
                  </p>
                  <Link
                    href="/"
                    className="px-8 py-3.5 rounded-full bg-white text-black font-mono font-bold text-xs uppercase tracking-wider hover:bg-slate-200 transition-all"
                  >
                    {isAr ? "العودة للرئيسية" : "BACK TO HOMEPAGE"}
                  </Link>
                </div>
              ) : (
                <>
                  <div className="mb-8 pb-6 border-b border-white/10">
                    <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest font-bold block mb-2">
                      {isAr ? "أرسل لنا رسالة مباشرة" : "SEND A DIRECT MESSAGE"}
                    </span>
                    <h2 className="text-2xl font-display font-black text-white">
                      {isAr ? "نرد على كل رسالة بجدية كاملة." : "We respond to every message seriously."}
                    </h2>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[11px] font-mono text-slate-400 uppercase font-bold block mb-1.5">
                          {isAr ? "الاسم *" : "NAME *"}
                        </label>
                        <input
                          type="text"
                          required
                          value={form.name}
                          onChange={e => setForm({ ...form, name: e.target.value })}
                          placeholder={isAr ? "اسمك الكريم" : "Your full name"}
                          className="w-full px-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/50 font-mono transition-colors"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-mono text-slate-400 uppercase font-bold block mb-1.5">
                          {isAr ? "البريد الإلكتروني *" : "EMAIL *"}
                        </label>
                        <input
                          type="email"
                          required
                          value={form.email}
                          onChange={e => setForm({ ...form, email: e.target.value })}
                          placeholder="name@company.com"
                          className="w-full px-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/50 font-mono transition-colors"
                          dir="ltr"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-mono text-slate-400 uppercase font-bold block mb-1.5">
                        {isAr ? "الشركة أو المشروع" : "COMPANY / PROJECT"}
                      </label>
                      <input
                        type="text"
                        value={form.company}
                        onChange={e => setForm({ ...form, company: e.target.value })}
                        placeholder={isAr ? "اسم شركتك أو مشروعك" : "Your company or project name"}
                        className="w-full px-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/50 font-mono transition-colors"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-mono text-slate-400 uppercase font-bold block mb-1.5">
                        {isAr ? "نبذة عن المشروع أو السؤال" : "ABOUT YOUR PROJECT OR QUESTION"}
                      </label>
                      <textarea
                        rows={5}
                        value={form.message}
                        onChange={e => setForm({ ...form, message: e.target.value })}
                        placeholder={
                          isAr
                            ? "أخبرنا عن مشروعك — ما الذي تريد بناؤه، ما التحدي الذي تواجهه، وما الهدف الذي تسعى لتحقيقه..."
                            : "Tell us about your project — what you want to build, the challenge you face, and the outcome you're aiming for..."
                        }
                        className="w-full px-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/50 font-mono resize-none transition-colors leading-relaxed"
                      />
                    </div>

                    <div className="flex items-center gap-2 text-[11px] font-mono text-slate-500 pb-2">
                      <Shield size={12} className="text-emerald-500/60" />
                      <span>{isAr ? "بياناتك آمنة ومشفرة ولن تُشارك مع أي طرف." : "Your data is encrypted and never shared with third parties."}</span>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 rounded-2xl bg-white text-black font-mono font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-slate-200 transition-all shadow-xl disabled:opacity-60 hover:scale-[1.01]"
                    >
                      {loading ? (
                        <Loader2 size={16} className="animate-spin" />
                      ) : (
                        <>
                          <Send size={14} />
                          <span>{isAr ? "إرسال الرسالة" : "SEND MESSAGE"}</span>
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
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
