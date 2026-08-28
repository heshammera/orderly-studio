"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  TrendingUp,
  Search,
  Share2,
  BarChart3,
  Mail,
  Zap,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  Activity,
  Layers,
  ArrowRight,
} from "lucide-react";
import { Header } from "@/components/navigation/Header";
import { Footer } from "@/components/navigation/Footer";
import { CustomCursor } from "@/components/cursor/CustomCursor";
import { ProjectDiscoveryWizard } from "@/components/discovery/ProjectDiscoveryWizard";
import { useLocale } from "@/context/LocaleContext";

const MARKETING_PILLARS = [
  {
    icon: <TrendingUp className="w-6 h-6 text-emerald-400" />,
    titleEn: "Paid Social & Algorithmic Scaling",
    titleAr: "إدارة الحملات الممولة والتوسع الخوارزمي",
    descEn:
      "Precision-targeted campaigns on Meta, TikTok, and Google engineered for positive unit economics and aggressive ROAS scaling.",
    descAr:
      "حملات مدروسة بدقة على Meta وTikTok وGoogle مصممة لتحقيق ربحية فورية ومضاعفة العائد على الإنفاق الإعلاني (ROAS).",
    deliverablesEn: ["Predictable CPA Optimization", "Budget Scaling Playbooks", "Lookalike & Retargeting Sets"],
    deliverablesAr: ["تحسين تكلفة الاكتساب CPA", "خطط مضاعفة الميزانيات", "جماهير الاستهداف المشابهة وإعادة الاستهداف"],
    accentBorder: "border-emerald-500/30",
    accentBg: "bg-emerald-500/5",
  },
  {
    icon: <Activity className="w-6 h-6 text-sky-400" />,
    titleEn: "Server-Side CAPI & Attribution Tracking",
    titleAr: "التتبع السحابي CAPI والربط الدقيق",
    descEn:
      "Bypass iOS ad blockers and cookie restrictions with custom Conversions API (CAPI) servers ensuring 100% conversion signal accuracy.",
    descAr:
      "تخطي قيود ملفات الارتباط وiOS عبر خوادم تتبع سحابية مخصصة (CAPI) تضمن وصول 100% من إشارات الشراء للمنصات الإعلانية.",
    deliverablesEn: ["Meta & TikTok CAPI Gateway", "Multi-Touch Attribution Model", "Server-Side Event Deduplication"],
    deliverablesAr: ["بوابة تتبع Meta & TikTok CAPI", "نموذج إسناد متقدم للتحويلات", "منع تكرار الأحداث البرمجية"],
    accentBorder: "border-sky-500/30",
    accentBg: "bg-sky-500/5",
  },
  {
    icon: <Zap className="w-6 h-6 text-amber-400" />,
    titleEn: "Dynamic Ad Creative Hooks & Iteration",
    titleAr: "تصميم واختبار هوكات الإعلانات الجاذبة",
    descEn:
      "High-velocity creative testing engine producing 30+ visual variations weekly with algorithmic retention metrics analysis.",
    descAr:
      "إنتاج واختبار أكثر من 30 قالباً بصرياً وهوك أسبوعياً مع تحليل بياني لمعدلات استبقاء المشاهدين في أول 3 ثوانٍ.",
    deliverablesEn: ["First-3-Sec Visual Hooks", "Motion Ad Variations", "UGC Direct Response Frameworks"],
    deliverablesAr: ["هوكات بصرية لأول 3 ثوانٍ", "إعلانات موشن تفاعلية", "نماذج استجابة مباشرة UGC"],
    accentBorder: "border-amber-500/30",
    accentBg: "bg-amber-500/5",
  },
  {
    icon: <Mail className="w-6 h-6 text-purple-400" />,
    titleEn: "Automated Retention Loops & Klaviyo CRM",
    titleAr: "أتمتة دورات الاستبقاء وKlaviyo CRM",
    descEn:
      "Lifecycle email and SMS automations that extract 30%+ additional lifetime value (LTV) from every acquired customer automatically.",
    descAr:
      "سلاسل بريد إلكتروني ورسائل نصية مؤتمتة تستخرج أكثر من 30% قيمة إضافية من كل عميل مستحوذ عليه على مدار دورة حياته.",
    deliverablesEn: ["Abandoned Cart & Browse Flows", "VIP Re-engagement Automations", "Post-Purchase Upsell Loops"],
    deliverablesAr: ["استرداد السلات المتروكة", "أتمتة إعادة تنشيط العملاء المميزين", "عروض الشراء التكميلي التلقائية"],
    accentBorder: "border-purple-500/30",
    accentBg: "bg-purple-500/5",
  },
  {
    icon: <Search className="w-6 h-6 text-rose-400" />,
    titleEn: "High-Intent Search & Technical SEO",
    titleAr: "تحسين محركات البحث التقني والكلمات الشرائية",
    descEn:
      "Dominate high-value transactional search keywords with sub-second core web vitals and programmatic content architectures.",
    descAr:
      "تصدر الكلمات البحثية عالية النية الشرائية عبر معمارية محتوى برمجية وسرعة استجابة فائقة لمؤشرات Core Web Vitals.",
    deliverablesEn: ["Programmatic SEO Architecture", "Sub-Second Core Web Vitals", "Commercial Intent Topic Clusters"],
    deliverablesAr: ["هندسة SEO برمجية مؤتمتة", "سرعة قياسية لمحركات البحث", "عناقيد كلمات تجارية عالية التحويل"],
    accentBorder: "border-rose-500/30",
    accentBg: "bg-rose-500/5",
  },
  {
    icon: <BarChart3 className="w-6 h-6 text-cyan-400" />,
    titleEn: "Conversion Rate Optimization (CRO)",
    titleAr: "تحسين معدل التحويل (CRO)",
    descEn:
      "Data-backed A/B testing of landing page value propositions, checkout funnels, and payment friction removal.",
    descAr:
      "اختبارات A/B مبنية على البيانات لتحسين صياغة عروض صفحات الهبوط، وتسهيل خطوات الدفع، وإزالة أي عوائق أمام العميل.",
    deliverablesEn: ["Frictionless Checkout UX", "Split URL Testing Setup", "Heatmap & Funnel Drop-off Audits"],
    deliverablesAr: ["تجربة شراء سلسة بدون تعقيد", "اختبارات مقارنة لصفحات الهبوط", "خرائط حرارية وتحليل نقاط التسرب"],
    accentBorder: "border-cyan-500/30",
    accentBg: "bg-cyan-500/5",
  },
];

const METRICS_BANNER = [
  { value: "6.8×", labelEn: "Average Paid Media ROAS", labelAr: "متوسط العائد الإعلاني (ROAS)" },
  { value: "< 1.2s", labelEn: "Landing Page Load Time", labelAr: "سرعة تحميل صفحات الهبوط" },
  { value: "100%", labelEn: "Attribution Signal Match", labelAr: "دقة إشارات التتبع السحابي" },
  { value: "+340%", labelEn: "Average Client Revenue Scale", labelAr: "متوسط نمو مبيعات العملاء" },
];

export default function MarketingPage() {
  const { locale, isAr } = useLocale();
  const [isWizardOpen, setIsWizardOpen] = useState(false);

  return (
    <main
      dir={isAr ? "rtl" : "ltr"}
      className={`min-h-screen bg-[#07070A] text-white pt-28 pb-20 ${isAr ? "font-arabic" : "font-sans"}`}
    >
      <CustomCursor />
      <Header onOpenProjectBuilder={() => setIsWizardOpen(true)} />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Page Header */}
        <div className="mb-16 pb-8 border-b border-white/10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-5 font-bold">
            <TrendingUp size={13} />
            <span>{isAr ? "هندسة النمو والتسويق عالي العائد" : "GROWTH & PERFORMANCE MARKETING"}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black text-white mb-6 leading-tight">
            {isAr
              ? "نبني قنوات تسويق\nتحقق عائداً إيجابياً ومقاساً."
              : "Algorithmic Growth Engines\nBuilt for measurable ROAS."}
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-3xl leading-relaxed">
            {isAr
              ? "التسويق في ORDERLY ليس مجرد نشر منشورات عشوائية. نحن نبني منظومة إعلانية متكاملة: تتبع سحابي دقيق CAPI، هوكات بصرية تفاعلية، وقمع مبيعات مؤتمت يضاعف العائد المالي."
              : "We don't post generic content. We engineer high-conversion paid media engines combining server-side CAPI tracking, dynamic creative hooks, and automated retention loops to scale profitable revenue."}
          </p>
        </div>

        {/* Real Metrics Banner */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16 p-6 sm:p-8 rounded-3xl bg-[#0F1018] border border-white/10 shadow-2xl">
          {METRICS_BANNER.map((m, idx) => (
            <div key={idx} className="p-3">
              <span className="text-3xl sm:text-4xl font-display font-black text-emerald-400 block mb-1">
                {m.value}
              </span>
              <span className="text-xs font-mono text-slate-400 uppercase font-semibold">
                {isAr ? m.labelAr : m.labelEn}
              </span>
            </div>
          ))}
        </div>

        {/* 6 Marketing Pillars Grid */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <span className="w-8 h-[2px] bg-emerald-400" />
            <span className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold">
              {isAr ? "ركائز منظومة النمو الرقمي" : "THE SIX GROWTH ENGINE PILLARS"}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MARKETING_PILLARS.map((pillar, idx) => (
              <div
                key={idx}
                className={`p-8 rounded-3xl ${pillar.accentBg} border ${pillar.accentBorder} flex flex-col justify-between shadow-xl min-h-[300px]`}
              >
                <div>
                  <div className={`p-3 rounded-2xl ${pillar.accentBg} border ${pillar.accentBorder} w-fit mb-5`}>
                    {pillar.icon}
                  </div>
                  <h3 className="text-lg font-display font-bold text-white mb-3 leading-snug">
                    {isAr ? pillar.titleAr : pillar.titleEn}
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed mb-6">
                    {isAr ? pillar.descAr : pillar.descEn}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 space-y-1.5">
                  {(isAr ? pillar.deliverablesAr : pillar.deliverablesEn).map((del, dIdx) => (
                    <div key={dIdx} className="flex items-center gap-2 text-xs font-mono text-slate-400">
                      <CheckCircle2 size={12} className="text-emerald-400 flex-shrink-0" />
                      <span>{del}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-emerald-500/15 via-sky-500/10 to-transparent border border-white/10 text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-mono font-bold">
            <ShieldCheck size={14} />
            <span>{isAr ? "استراتيجية نمو مخصصة لمشروعك" : "CUSTOM GROWTH ROADMAP"}</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-display font-black text-white">
            {isAr ? "جاهز لمضاعفة مبيعاتك وقمع تحويلاتك؟" : "Ready to scale your conversion funnel?"}
          </h3>
          <p className="text-slate-300 text-sm max-w-xl mx-auto leading-relaxed">
            {isAr
              ? "احجز جلسة استكشاف استراتيجية لتحليل أرقامك الحالية، نقاط التسرب في قمع البيع، وخطة مضاعفة الـ ROAS."
              : "Book a discovery briefing to audit your current funnel drop-offs, tracking signals, and high-ROAS scaling roadmap."}
          </p>
          <div className="pt-4">
            <button
              type="button"
              onClick={() => setIsWizardOpen(true)}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-mono font-bold text-xs uppercase tracking-wider hover:bg-slate-200 transition-all shadow-xl hover:scale-[1.02]"
            >
              <span>{isAr ? "ابدأ استكشاف مشروعك التسويقي" : "LAUNCH MARKETING BRIEF"}</span>
              <ArrowUpRight size={14} />
            </button>
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