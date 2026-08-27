"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  TrendingUp,
  Search,
  Share2,
  BarChart3,
  Mail,
  Zap,
  Globe2,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";
import { Header } from "@/components/navigation/Header";
import { CustomCursor } from "@/components/cursor/CustomCursor";
import { ProjectBuilderModal } from "@/components/home/ProjectBuilderModal";

export default function MarketingPage() {
  const [locale, setLocale] = useState<"en" | "ar">("en");
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const [activeService, setActiveService] = useState<number | null>(null);
  const isAr = locale === "ar";

  const services = [
    {
      icon: <TrendingUp size={22} />,
      title: isAr ? "استراتيجية التسويق الرقمي" : "Digital Marketing Strategy",
      desc: isAr
        ? "نبني خريطة تسويقية شاملة تجمع بين تحليل المنافسين، استهداف الجمهور، وتحديد القنوات الأكثر فاعلية لتحقيق أهداف نموك."
        : "Comprehensive roadmaps combining competitor analysis, audience intelligence, and channel prioritization for measurable growth.",
      deliverables: isAr
        ? ["خريطة رحلة العميل", "تحليل المنافسين الكامل", "تحديد الجمهور المستهدف", "خطة قنوات التسويق"]
        : ["Customer Journey Mapping", "Full Competitor Analysis", "Audience Segmentation", "Channel Mix Strategy"],
      color: "emerald",
      border: "border-emerald-500/30",
      bg: "bg-emerald-500/10",
      text: "text-emerald-400",
    },
    {
      icon: <Search size={22} />,
      title: isAr ? "تحسين محركات البحث SEO" : "SEO & Organic Growth",
      desc: isAr
        ? "تحسين تقني عميق ومحتوى متخصص لمحركات البحث يضع موقعك في صدارة النتائج وينمو باستمرار دون اعتماد على الإعلانات المدفوعة."
        : "Technical audits, semantic content clusters, and authority building that compound organic visibility without paid dependency.",
      deliverables: isAr
        ? ["التحسين التقني الكامل", "هيكلة محتوى الكلمات المفتاحية", "بناء الروابط الخارجية", "تقارير الأداء الشهرية"]
        : ["Technical SEO Audit", "Keyword Architecture", "Authority Link Building", "Monthly Performance Reports"],
      color: "teal",
      border: "border-teal-500/30",
      bg: "bg-teal-500/10",
      text: "text-teal-400",
    },
    {
      icon: <Share2 size={22} />,
      title: isAr ? "إدارة منصات التواصل الاجتماعي" : "Social Media & Content",
      desc: isAr
        ? "إنتاج محتوى إبداعي متقدم موجّه لكل منصة واستراتيجية نشر تبني مجتمعاً حقيقياً يتفاعل مع علامتك التجارية."
        : "Platform-native content production, brand voice development, and community management across all key social channels.",
      deliverables: isAr
        ? ["تقويم محتوى شهري", "إنتاج الفيديو القصير (Reels/TikTok)", "إدارة التعليقات والمجتمع", "تقارير التفاعل والنمو"]
        : ["Monthly Content Calendar", "Short-form Video Production", "Community Management", "Engagement & Growth Reports"],
      color: "cyan",
      border: "border-cyan-500/30",
      bg: "bg-cyan-500/10",
      text: "text-cyan-400",
    },
    {
      icon: <BarChart3 size={22} />,
      title: isAr ? "الإعلانات المدفوعة وتحسين الأداء" : "Paid Media & Performance",
      desc: isAr
        ? "إدارة حملات Google وMeta وTikTok بمنهجية تحليلية تعظم العائد على الإنفاق الإعلاني وتخفض تكلفة الاكتساب باستمرار."
        : "Scientific campaign management across Google, Meta, TikTok, and programmatic platforms with continuous ROAS optimization.",
      deliverables: isAr
        ? ["إعداد وإدارة حملات Google & Meta", "اختبار الإعلانات A/B", "تحسين صفحات الهبوط", "تقارير الأداء الأسبوعية"]
        : ["Google & Meta Campaign Setup", "A/B Ad Creative Testing", "Landing Page Optimization", "Weekly Performance Reports"],
      color: "sky",
      border: "border-sky-500/30",
      bg: "bg-sky-500/10",
      text: "text-sky-400",
    },
    {
      icon: <Mail size={22} />,
      title: isAr ? "التسويق عبر البريد الإلكتروني" : "Email Marketing & CRM",
      desc: isAr
        ? "تصميم رحلات بريدية مخصصة وأتمتة CRM ذكية تحوّل العملاء المحتملين إلى عملاء دائمين وترفع قيمة دورة حياة العميل."
        : "Personalized email journeys, behavioral automation, and CRM workflows that nurture leads into loyal long-term customers.",
      deliverables: isAr
        ? ["إعداد سلاسل البريد التلقائية", "تصميم قوالب احترافية", "تقسيم القوائم وتخصيص المحتوى", "اختبار معدلات الفتح والنقر"]
        : ["Automated Sequence Setup", "Professional Template Design", "List Segmentation & Personalization", "Open & CTR Rate Optimization"],
      color: "blue",
      border: "border-blue-500/30",
      bg: "bg-blue-500/10",
      text: "text-blue-400",
    },
    {
      icon: <Zap size={22} />,
      title: isAr ? "التحليلات والتقارير الذكية" : "Analytics & Reporting",
      desc: isAr
        ? "بناء لوحات تحكم تحليلية لحظية تترجم البيانات الخام إلى قرارات تسويقية ذكية وقابلة للتنفيذ الفوري."
        : "Custom real-time dashboards, attribution modeling, and AI-assisted insights that turn raw data into immediate action.",
      deliverables: isAr
        ? ["لوحة بيانات مخصصة", "نماذج إسناد التحويل", "تقارير تنفيذية دورية", "توصيات تحسين مستمرة"]
        : ["Custom Data Dashboard", "Conversion Attribution Models", "Executive Reporting", "Continuous Optimization Briefs"],
      color: "violet",
      border: "border-violet-500/30",
      bg: "bg-violet-500/10",
      text: "text-violet-400",
    },
  ];

  const caseStudies = [
    {
      slug: "nova-neural-engine",
      title: isAr ? "حملة إطلاق منصة Nova السحابية" : "Nova Cloud Platform Launch",
      category: "PERFORMANCE & ORGANIC GROWTH",
      client: isAr ? "Nova SaaS الدولية" : "Nova International",
      metrics: [
        { v: "+340%", l: isAr ? "تحويلات عضوية" : "Organic Conv." },
        { v: "−62%", l: "CAC" },
        { v: "8.4×", l: "ROAS" },
      ],
      gradient: "from-emerald-500/25 to-teal-500/10",
    },
    {
      slug: "orion-haute-horlogerie",
      title: isAr ? "الإطلاق العالمي لعلامة أوريون" : "Orion Global Brand Activation",
      category: "SOCIAL & CONTENT STRATEGY",
      client: isAr ? "دار أوريون السويسرية" : "Orion Geneva",
      metrics: [
        { v: "35+", l: isAr ? "تغطية دولية" : "Press Features" },
        { v: "2.1M", l: isAr ? "وصول عضوي" : "Organic Reach" },
        { v: "4.8×", l: isAr ? "تفاعل" : "Engagement" },
      ],
      gradient: "from-teal-500/25 to-cyan-500/10",
    },
  ];

  return (
    <main
      dir={isAr ? "rtl" : "ltr"}
      className={`min-h-screen bg-obsidian text-white ${isAr ? "font-arabic" : "font-sans"}`}
    >
      <CustomCursor />
      <Header
        locale={locale}
        onToggleLocale={() => setLocale((l) => (l === "en" ? "ar" : "en"))}
        onOpenProjectBuilder={() => setIsBuilderOpen(true)}
        currentWorld="neutral"
      />

      {/* Hero Section */}
      <section className="pt-40 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-neutral-cool hover:text-white uppercase tracking-wider mb-12 transition-colors"
        >
          <ArrowLeft size={14} className="rtl:rotate-180" />
          <span>{isAr ? "العودة للرئيسية" : "BACK TO HOMEPAGE"}</span>
        </Link>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 pb-12 border-b border-white/10 mb-20">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-mono mb-6">
              <Globe2 size={13} />
              <span>{isAr ? "خدمات التسويق الرقمي // MARKETING" : "04 // DIGITAL MARKETING"}</span>
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-black tracking-tight text-white leading-tight mb-6">
              {isAr ? (
                <>
                  نصل إلى الجمهور الصحيح
                  <br />
                  <span className="text-emerald-400">بالرسالة الصحيحة.</span>
                </>
              ) : (
                <>
                  Reach the Right Audience
                  <br />
                  <span className="text-emerald-400">With the Right Message.</span>
                </>
              )}
            </h1>
            <p className="text-neutral-cool text-lg sm:text-xl max-w-2xl leading-relaxed">
              {isAr
                ? "نجمع استراتيجية البيانات مع الإبداع التسويقي لبناء حضور رقمي مؤثر يحقق نمواً حقيقياً وقابلاً للقياس."
                : "We fuse data-driven strategy with creative storytelling to build measurable brand reach and sustainable revenue growth."}
            </p>
          </div>

          <button
            onClick={() => setIsBuilderOpen(true)}
            className="flex-shrink-0 inline-flex items-center gap-3 px-8 py-4 rounded-full bg-emerald-500 text-white font-bold text-xs tracking-wider uppercase hover:bg-emerald-400 transition-all shadow-2xl shadow-emerald-500/25"
          >
            <span>{isAr ? "ابدأ حملتك الآن" : "START A CAMPAIGN"}</span>
            <ArrowUpRight size={16} />
          </button>
        </div>

        {/* Services Grid */}
        <div className="mb-28">
          <div className="mb-12">
            <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest block mb-2 font-bold">
              {isAr ? "خدماتنا التسويقية الكاملة" : "FULL MARKETING SERVICES"}
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white">
              {isAr ? "من الاستراتيجية حتى التنفيذ" : "From Strategy to Execution"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc, idx) => {
              const isActive = activeService === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setActiveService(isActive ? null : idx)}
                  className={`rounded-3xl bg-soft-black border cursor-pointer transition-all duration-300 p-8 flex flex-col gap-5 ${
                    isActive
                      ? `${svc.border} shadow-2xl scale-[1.01]`
                      : "border-white/10 hover:border-white/25"
                  }`}
                >
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${isActive ? svc.bg : "bg-white/5"} ${svc.text} transition-colors`}>
                    {svc.icon}
                  </div>
                  <div>
                    <h3 className={`text-xl font-display font-bold mb-2 transition-colors ${isActive ? svc.text : "text-white"}`}>
                      {svc.title}
                    </h3>
                    <p className="text-neutral-cool text-sm leading-relaxed">{svc.desc}</p>
                  </div>

                  {isActive && (
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 pt-4 border-t border-white/10">
                      <span className="text-xs font-mono text-white/50 block mb-3 uppercase tracking-wider">
                        {isAr ? "المخرجات الأساسية" : "CORE DELIVERABLES"}
                      </span>
                      <ul className="space-y-2">
                        {svc.deliverables.map((d, i) => (
                          <li key={i} className={`flex items-center gap-2 text-sm ${svc.text}`}>
                            <CheckCircle2 size={14} />
                            <span className="text-white">{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Case Studies */}
        <div className="mb-20">
          <div className="mb-12">
            <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest block mb-2 font-bold">
              {isAr ? "أعمال تسويقية مختارة" : "SELECTED MARKETING RESULTS"}
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white">
              {isAr ? "نتائج حقيقية وقابلة للقياس" : "Results That Speak"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {caseStudies.map((cs, idx) => (
              <Link
                key={idx}
                href={`/work/${cs.slug}`}
                className="group rounded-3xl bg-soft-black border border-white/10 hover:border-emerald-500/40 overflow-hidden transition-all duration-500 shadow-2xl"
              >
                <div className={`h-52 bg-gradient-to-br ${cs.gradient} p-8 flex flex-col justify-between`}>
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-obsidian/80 text-[11px] font-mono font-bold text-emerald-300">
                      {cs.category}
                    </span>
                    <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-emerald-500 transition-colors">
                      <ArrowUpRight size={16} />
                    </div>
                  </div>
                  <div>
                    <span className="text-xs font-mono text-white/60 block mb-1">{cs.client}</span>
                    <h3 className="text-2xl font-display font-bold text-white group-hover:text-emerald-300 transition-colors">
                      {cs.title}
                    </h3>
                  </div>
                </div>
                <div className="p-8 grid grid-cols-3 gap-3">
                  {cs.metrics.map((m, i) => (
                    <div key={i} className="text-center p-3 rounded-xl bg-white/[0.03] border border-white/5">
                      <span className="text-2xl font-display font-black text-emerald-400 block">{m.v}</span>
                      <span className="text-[10px] font-mono text-neutral-cool uppercase">{m.l}</span>
                    </div>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="p-12 sm:p-20 rounded-3xl bg-gradient-to-br from-emerald-500/15 to-teal-500/5 border border-emerald-500/25 text-center flex flex-col items-center">
          <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest mb-3 font-bold">
            {isAr ? "جاهز لبدء حملتك؟" : "READY TO GROW?"}
          </span>
          <h3 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4">
            {isAr ? "لنبني استراتيجيتك التسويقية." : "Let's Build Your Growth Engine."}
          </h3>
          <p className="text-neutral-cool text-sm max-w-md mb-8 leading-relaxed">
            {isAr
              ? "ابدأ بمحادثة مجانية مع فريق التسويق لمناقشة أهدافك وبناء الخطة الأمثل لنموك الرقمي."
              : "Start with a complimentary strategy session to discuss your goals and build the right marketing roadmap."}
          </p>
          <button
            onClick={() => setIsBuilderOpen(true)}
            className="px-10 py-4 rounded-full bg-emerald-500 text-white font-bold text-xs tracking-widest uppercase hover:bg-emerald-400 transition-all shadow-xl shadow-emerald-500/20 flex items-center gap-3"
          >
            <span>{isAr ? "ابدأ مشروعك التسويقي الآن" : "START A MARKETING PROJECT"}</span>
            <ArrowUpRight size={16} />
          </button>
        </div>
      </section>

      <ProjectBuilderModal
        isOpen={isBuilderOpen}
        onClose={() => setIsBuilderOpen(false)}
        locale={locale}
      />
    </main>
  );
}