"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Shield, FileText } from "lucide-react";
import { Header } from "@/components/navigation/Header";
import { Footer } from "@/components/navigation/Footer";
import { useLocale } from "@/context/LocaleContext";
import { CustomCursor } from "@/components/cursor/CustomCursor";

const SECTIONS = [
  {
    titleEn: "1. Information We Collect",
    titleAr: "1. المعلومات التي نجمعها",
    contentEn:
      "When you submit a project brief or introduction through our platform, we collect your name, email address, company name, and project description. We also collect standard server logs (IP address, browser type, page views) through Vercel Analytics for performance monitoring. We do not collect sensitive personal data.",
    contentAr:
      "عندما تقدم موجزاً لمشروع أو تقديماً عبر منصتنا، نجمع اسمك وعنوان بريدك الإلكتروني واسم الشركة ووصف المشروع. كما نجمع سجلات الخادم القياسية (عنوان IP، نوع المتصفح، مشاهدات الصفحة) من خلال Vercel Analytics لمراقبة الأداء. نحن لا نجمع بيانات شخصية حساسة.",
  },
  {
    titleEn: "2. How We Use Your Information",
    titleAr: "2. كيف نستخدم معلوماتك",
    contentEn:
      "We use collected information solely to respond to project inquiries, prepare tailored proposals, and improve our platform experience. We do not sell, rent, or share your personal data with any third party for marketing purposes.",
    contentAr:
      "نستخدم المعلومات المجمعة فقط للرد على استفسارات المشاريع وإعداد مقترحات مخصصة وتحسين تجربة منصتنا. نحن لا نبيع أو نؤجر أو نشارك بياناتك الشخصية مع أي طرف ثالث لأغراض تسويقية.",
  },
  {
    titleEn: "3. Data Storage & Security",
    titleAr: "3. تخزين البيانات والأمان",
    contentEn:
      "Project briefs and contact submissions are stored in a secure PostgreSQL database hosted on Neon (cloud-native, SOC 2 compliant). Data is encrypted in transit (TLS 1.3) and at rest. Access is restricted to authorized ORDERLY team members only.",
    contentAr:
      "يتم تخزين موجزات المشاريع ورسائل التواصل في قاعدة بيانات PostgreSQL آمنة مستضافة على Neon (متوافقة مع SOC 2). البيانات مشفرة أثناء النقل (TLS 1.3) وأثناء التخزين. الوصول مقيد لأعضاء فريق ORDERLY المخولين فقط.",
  },
  {
    titleEn: "4. Cookies & Analytics",
    titleAr: "4. ملفات تعريف الارتباط والتحليلات",
    contentEn:
      "We use Vercel Analytics for anonymous, privacy-first visitor analytics. No personally identifiable information is tracked. We use a session cookie for our admin portal authentication, which expires after 7 days of inactivity.",
    contentAr:
      "نستخدم Vercel Analytics للتحليلات المجهولة التي تحترم الخصوصية. لا يتم تتبع أي معلومات شخصية. نستخدم ملف تعريف ارتباط للجلسة لمصادقة بوابة المشرف، وتنتهي صلاحيته بعد 7 أيام من التعطل.",
  },
  {
    titleEn: "5. Your Rights",
    titleAr: "5. حقوقك",
    contentEn:
      "You have the right to request access to, correction of, or deletion of your personal data at any time. To exercise these rights, contact us at support@orderlyshops.com. We will respond within 72 hours.",
    contentAr:
      "يحق لك طلب الوصول إلى بياناتك الشخصية أو تصحيحها أو حذفها في أي وقت. لممارسة هذه الحقوق، تواصل معنا على support@orderlyshops.com. سنرد خلال 72 ساعة.",
  },
  {
    titleEn: "6. Third-Party Services",
    titleAr: "6. خدمات الطرف الثالث",
    contentEn:
      "Our platform is deployed on Vercel (CDN & hosting), uses Neon for database services, and may optionally send webhook notifications to Discord/Slack for new lead alerts. Each third-party service operates under its own privacy policy.",
    contentAr:
      "منصتنا مستضافة على Vercel (CDN واستضافة)، وتستخدم Neon لخدمات قواعد البيانات، وقد ترسل إشعارات webhook اختيارية إلى Discord/Slack لتنبيهات العملاء الجدد. كل خدمة طرف ثالث تعمل بموجب سياسة الخصوصية الخاصة بها.",
  },
  {
    titleEn: "7. Changes to This Policy",
    titleAr: "7. التغييرات على هذه السياسة",
    contentEn:
      "We may update this policy from time to time. We will notify users of material changes by updating the date below. Continued use of our platform constitutes acceptance of the updated policy.",
    contentAr:
      "قد نقوم بتحديث هذه السياسة من وقت لآخر. سنخطر المستخدمين بالتغييرات الجوهرية عن طريق تحديث التاريخ أدناه. استمرار استخدامك لمنصتنا يشكل قبولاً للسياسة المحدثة.",
  },
];

export default function PrivacyPage() {
  const { isAr } = useLocale();

  return (
    <main
      dir={isAr ? "rtl" : "ltr"}
      className={`min-h-screen bg-[#07070A] text-white pt-28 pb-20 ${isAr ? "font-arabic" : "font-sans"}`}
    >
      <CustomCursor />
      <Header onOpenProjectBuilder={() => {}} />

      <div className="max-w-3xl mx-auto px-6 md:px-12">
        {/* Back */}
        <div className="mb-10 pb-6 border-b border-white/10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-white/40 hover:text-white transition-colors uppercase tracking-wider mb-6"
          >
            <ArrowLeft size={13} className={isAr ? "rotate-180" : ""} />
            <span>{isAr ? "العودة للرئيسية" : "Back to Homepage"}</span>
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <Shield size={18} className="text-emerald-400" />
            </div>
            <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest font-bold">
              {isAr ? "سياسة الخصوصية" : "PRIVACY POLICY"}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-black text-white mb-3">
            {isAr ? "كيف نحمي بياناتك" : "How We Protect Your Data"}
          </h1>
          <p className="text-slate-400 text-sm leading-relaxed">
            {isAr
              ? "آخر تحديث: أغسطس 2026 — نلتزم بالشفافية الكاملة حول كيفية جمعنا لبياناتك واستخدامها وحمايتها."
              : "Last updated: August 2026 — We are fully transparent about how we collect, use, and protect your data."}
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-10">
          {SECTIONS.map((section, idx) => (
            <div key={idx} className="pb-10 border-b border-white/5 last:border-0">
              <h2 className="text-lg font-display font-bold text-white mb-3">
                {isAr ? section.titleAr : section.titleEn}
              </h2>
              <p className="text-slate-300 text-sm leading-7">
                {isAr ? section.contentAr : section.contentEn}
              </p>
            </div>
          ))}
        </div>

        {/* Contact Card */}
        <div className="mt-12 p-8 rounded-3xl bg-white/[0.03] border border-white/10 text-center">
          <FileText size={28} className="text-emerald-400 mx-auto mb-4" />
          <h3 className="text-lg font-display font-bold text-white mb-2">
            {isAr ? "سؤال حول خصوصيتك؟" : "Questions about your privacy?"}
          </h3>
          <p className="text-slate-400 text-sm mb-4">
            {isAr
              ? "تواصل مع فريقنا وسنرد خلال 72 ساعة."
              : "Reach out and we'll respond within 72 hours."}
          </p>
          <a
            href="mailto:hesham.mera@gmail.com"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-mono font-bold text-xs uppercase tracking-wider hover:bg-slate-200 transition-all"
          >
            support@orderlyshops.com
          </a>
        </div>
      </div>

      <Footer />
    </main>
  );
}
