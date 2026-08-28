"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Code2,
  Sparkles,
  Bot,
  Layers,
  Film,
  TrendingUp,
  Globe2,
  Send,
  CheckCircle2,
  Users,
} from "lucide-react";
import { Header } from "@/components/navigation/Header";
import { CustomCursor } from "@/components/cursor/CustomCursor";
import { useLocale } from "@/context/LocaleContext";
import { ProjectDiscoveryWizard } from "@/components/discovery/ProjectDiscoveryWizard";

const NETWORK_ROLES = [
  {
    icon: <Code2 className="w-5 h-5 text-sky-400" />,
    titleEn: "Full-Stack Engineers",
    titleAr: "مهندسو البرمجيات الشاملة (Full-Stack)",
    descEn: "Next.js, TypeScript, Node.js, PostgreSQL, cloud infrastructure. We work with engineers who care about code quality as much as shipping speed.",
    descAr: "Next.js، TypeScript، Node.js، PostgreSQL، وبنية سحابية. نعمل مع مهندسين يهتمون بجودة الكود بقدر اهتمامهم بالسرعة في التسليم.",
    accentBorder: "border-sky-500/30",
    accentBg: "bg-sky-500/5",
  },
  {
    icon: <Bot className="w-5 h-5 text-purple-400" />,
    titleEn: "AI & LLM Engineers",
    titleAr: "مهندسو الذكاء الاصطناعي والنماذج اللغوية",
    descEn: "LLM orchestration, RAG pipelines, embedding systems, and production AI deployment. We work with engineers who bridge research and real-world application.",
    descAr: "تنسيق النماذج اللغوية، خطوط أنابيب RAG، أنظمة التضمين، ونشر الذكاء الاصطناعي في الإنتاج. نعمل مع مهندسين يجمعون بين البحث والتطبيق الحقيقي.",
    accentBorder: "border-purple-500/30",
    accentBg: "bg-purple-500/5",
  },
  {
    icon: <Sparkles className="w-5 h-5 text-rose-400" />,
    titleEn: "Senior UI/UX Designers",
    titleAr: "مصممو واجهات وتجربة مستخدم متقدمون",
    descEn: "Figma design systems, product thinking, micro-interactions, and high-conversion interface architecture. We work with designers who understand business outcomes, not just aesthetics.",
    descAr: "أنظمة تصميم Figma، التفكير المنتج، التفاعلات الدقيقة، ومعمارية واجهات عالية التحويل. نعمل مع مصممين يفهمون النتائج التجارية لا مجرد الجماليات.",
    accentBorder: "border-rose-500/30",
    accentBg: "bg-rose-500/5",
  },
  {
    icon: <Layers className="w-5 h-5 text-amber-400" />,
    titleEn: "Brand & Visual Identity Designers",
    titleAr: "مصممو الهوية البصرية والعلامات التجارية",
    descEn: "Logo systems, typography, packaging, brand guidelines, and editorial art direction. We work with designers who build systems, not just beautiful outputs.",
    descAr: "أنظمة الشعارات، الطباعة، التغليف، إرشادات العلامات التجارية، والإخراج الفني التحريري. نعمل مع مصممين يبنون أنظمة، لا مجرد مخرجات جميلة.",
    accentBorder: "border-amber-500/30",
    accentBg: "bg-amber-500/5",
  },
  {
    icon: <Film className="w-5 h-5 text-indigo-400" />,
    titleEn: "Motion & 3D Artists",
    titleAr: "فنانو الموشن جرافيك والفن ثلاثي الأبعاد",
    descEn: "Cinema 4D, Blender, After Effects, Three.js WebGL. We work with artists who can translate brand systems into cinematic spatial experiences.",
    descAr: "Cinema 4D، Blender، After Effects، Three.js WebGL. نعمل مع فنانين يحولون أنظمة العلامات التجارية إلى تجارب مكانية سينمائية.",
    accentBorder: "border-indigo-500/30",
    accentBg: "bg-indigo-500/5",
  },
  {
    icon: <TrendingUp className="w-5 h-5 text-emerald-400" />,
    titleEn: "Performance Marketing Specialists",
    titleAr: "متخصصو التسويق الرقمي وإدارة الأداء",
    descEn: "Paid media, SEO, CRM automation, and data analytics. We work with marketers who are obsessed with measurable ROAS and business impact, not vanity metrics.",
    descAr: "الوسائط المدفوعة، SEO، أتمتة CRM، وتحليلات البيانات. نعمل مع المسوقين المهووسين بـ ROAS القابل للقياس والأثر التجاري، لا المقاييس الوهمية.",
    accentBorder: "border-emerald-500/30",
    accentBg: "bg-emerald-500/5",
  },
];

export default function CareersPage() {
  const { locale, isAr } = useLocale();
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", role: "", portfolio: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          company: `[NETWORK APPLICATION] Role: ${form.role}`,
          website: form.portfolio,
          message: form.message,
        }),
      });
    } catch (_) {}
    setSubmitted(true);
  };

  return (
    <main
      dir={isAr ? "rtl" : "ltr"}
      className={`min-h-screen bg-[#07070A] text-white pt-28 pb-32 ${isAr ? "font-arabic" : "font-sans"}`}
    >
      <CustomCursor />
      <Header onOpenProjectBuilder={() => setIsWizardOpen(true)} />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Page Header */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 border border-white/15 text-slate-300 text-xs font-mono mb-5 font-bold">
            <Users size={13} />
            <span>{isAr ? "انضم إلى الشبكة // JOIN THE NETWORK" : "JOIN THE NETWORK // ORDERLY SPECIALISTS"}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight text-white leading-tight mb-6">
            {isAr
              ? "نحن دائماً مهتمون بالأشخاص الاستثنائيين."
              : "We're always interested in\nexceptional people."}
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed">
            {isAr
              ? "ORDERLY لا يعمل كشركة هرمية تقليدية. نعمل كشبكة من المتخصصين الكبار الذين يتجمعون حول المشكلة الصحيحة مع الفريق الصحيح. لا توجد مسميات وظيفية ضخمة — فقط عمل عالي التأثير ومدفوع بشكل استثنائي."
              : "ORDERLY doesn't operate as a traditional hierarchical agency. We work as a network of senior specialists assembled around the right problem with the right team. No inflated titles — just high-impact, exceptionally compensated work."}
          </p>
        </div>

        {/* Network Philosophy */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 mb-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              titleEn: "Senior-only network",
              titleAr: "شبكة من الكبار فقط",
              descEn: "We don't hire juniors for client work. Every specialist in our network has proven production impact.",
              descAr: "لا نوظف المبتدئين لأعمال العملاء. كل متخصص في شبكتنا لديه أثر موثق في بيئة الإنتاج.",
            },
            {
              titleEn: "Project-based engagement",
              titleAr: "انخراط قائم على المشاريع",
              descEn: "Work on projects that match your specialisation. No busy work. No politics. Just craft and delivery.",
              descAr: "اعمل على مشاريع تتوافق مع تخصصك. لا عمل عشوائي. لا سياسات. فقط الحرفة والتسليم.",
            },
            {
              titleEn: "Premium compensation",
              titleAr: "تعويض متميز",
              descEn: "We pay for quality and results, not hours logged. Best-in-class rates for best-in-class contributors.",
              descAr: "ندفع مقابل الجودة والنتائج، لا الساعات المسجلة. أفضل معدلات في الصناعة لأفضل المساهمين.",
            },
          ].map((item, idx) => (
            <div key={idx}>
              <h3 className="text-base font-display font-bold text-white mb-2">
                {isAr ? item.titleAr : item.titleEn}
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                {isAr ? item.descAr : item.descEn}
              </p>
            </div>
          ))}
        </div>

        {/* Roles Grid */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <span className="w-8 h-[2px] bg-white/30" />
            <span className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold">
              {isAr ? "التخصصات التي نبحث عنها دائماً" : "SPECIALISATIONS WE'RE ALWAYS LOOKING FOR"}
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {NETWORK_ROLES.map((role, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-2xl ${role.accentBg} border ${role.accentBorder} hover:border-white/20 transition-all duration-300`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2.5 rounded-xl ${role.accentBg} border ${role.accentBorder}`}>
                    {role.icon}
                  </div>
                  <h3 className="text-sm font-display font-bold text-white leading-snug">
                    {isAr ? role.titleAr : role.titleEn}
                  </h3>
                </div>
                <p className="text-slate-300 text-xs leading-relaxed">
                  {isAr ? role.descAr : role.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Application Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-8 h-[2px] bg-creative-coral" />
              <span className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold">
                {isAr ? "انضم إلى الشبكة" : "JOIN THE NETWORK"}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-white mb-5 leading-tight">
              {isAr ? "أرسل لنا ملفك الاحترافي" : "Introduce yourself."}
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              {isAr
                ? "لا توجد وظائف مفتوحة بالضرورة الآن — لكننا نراجع كل طلب يصلنا ونتواصل عندما يكون هناك مشروع مناسب لك."
                : "There may not be an open role right now — but we review every introduction and reach out when the right project alignment exists."}
            </p>
          </div>

          <div className="lg:col-span-7">
            {submitted ? (
              <div className="p-10 rounded-3xl bg-[#0C0D14] border border-emerald-500/25 text-center flex flex-col items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                  <CheckCircle2 size={28} className="text-emerald-400" />
                </div>
                <h3 className="text-xl font-display font-bold text-white">
                  {isAr ? "تم استلام ملفك" : "Introduction Received"}
                </h3>
                <p className="text-slate-300 text-sm max-w-sm">
                  {isAr
                    ? "سنراجع ملفك ونتواصل معك عند توافر مشروع مناسب لتخصصك."
                    : "We'll review your profile and reach out when there's a fitting project for your specialisation."}
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="p-7 sm:p-8 rounded-3xl bg-[#0C0D14] border border-white/10 space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { field: "name", labelEn: "Full Name *", labelAr: "الاسم الكامل *", type: "text", required: true },
                    { field: "email", labelEn: "Email Address *", labelAr: "البريد الإلكتروني *", type: "email", required: true },
                    { field: "role", labelEn: "Your Specialisation *", labelAr: "تخصصك الأساسي *", type: "text", required: true },
                    { field: "portfolio", labelEn: "Portfolio / GitHub URL", labelAr: "رابط ملف الأعمال / GitHub", type: "url", required: false },
                  ].map(({ field, labelEn, labelAr, type, required }) => (
                    <div key={field}>
                      <label className="text-[10px] font-mono text-slate-400 uppercase font-bold block mb-1">
                        {isAr ? labelAr : labelEn}
                      </label>
                      <input
                        type={type}
                        required={required}
                        value={(form as any)[field]}
                        onChange={(e) => setForm((f) => ({ ...f, [field]: e.target.value }))}
                        className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-white/30 transition-colors"
                        placeholder={isAr ? labelAr : labelEn}
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <label className="text-[10px] font-mono text-slate-400 uppercase font-bold block mb-1">
                    {isAr ? "أخبرنا عنك وعن أفضل أعمالك" : "Tell us about yourself & your best work"}
                  </label>
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-white/30 transition-colors resize-none"
                    placeholder={isAr ? "نبذة عنك، أبرز مشاريعك، وما الذي تبحث عنه في التعاون..." : "Brief about you, your best projects, and what you're looking for in a collaboration..."}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-white text-black font-mono font-bold text-xs uppercase tracking-wider hover:bg-slate-200 transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <Send size={14} />
                  {isAr ? "إرسال ملفك الاحترافي" : "Send Your Introduction"}
                </button>
              </form>
            )}
          </div>
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
