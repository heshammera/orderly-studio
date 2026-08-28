"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { DisciplineShowcaseModal } from "@/components/showcase/DisciplineShowcaseModal";
import type { DisciplineId } from "@/data/disciplines";

interface CapabilitiesProps {
  locale: "en" | "ar";
}

export const Capabilities: React.FC<CapabilitiesProps> = ({ locale }) => {
  const isAr = locale === "ar";
  const [selectedDiscipline, setSelectedDiscipline] = useState<DisciplineId | null>(null);

  const matrix: {
    category: string;
    accent: string;
    disciplineId: DisciplineId;
    title: string;
    items: string[];
  }[] = [
    {
      category: isAr ? "01 // نبني" : "01 // BUILD",
      accent: "border-sky-500 text-sky-400",
      disciplineId: "engineering",
      title: isAr ? "الهندسة والبرمجيات" : "Software Engineering",
      items: isAr
        ? ["منصات SaaS السحابية", "مواقع الويب الفاخرة Next.js", "الواجهات البرمجية APIs", "لوحات التحكم الإدارية"]
        : ["SaaS Cloud Platforms", "Studio Next.js Websites", "Connected APIs & DB", "Custom Admin Portals"],
    },
    {
      category: isAr ? "02 // نصمم" : "02 // DESIGN",
      accent: "border-violet-500 text-violet-400",
      disciplineId: "uiux",
      title: isAr ? "تصميم الواجهات UI/UX" : "UI / UX Design",
      items: isAr
        ? ["شاشات التطبيق الكاملة", "نظام التصميم Design System", "النماذج التفاعلية الحية", "هندسة تجربة المستخدم"]
        : ["Complete Mobile/Web UI", "Scalable Design Systems", "Clickable Prototypes", "Conversion Architecture"],
    },
    {
      category: isAr ? "03 // نبتكر" : "03 // IDENTITY",
      accent: "border-amber-500 text-amber-400",
      disciplineId: "branding",
      title: isAr ? "الهوية البصرية والعلامة" : "Brand Identity",
      items: isAr
        ? ["الشعار والرمز الملكي", "الخطوط وبنية الألوان", "دليل الهوية الكامل", "تصميم التغليف الفاخر"]
        : ["Primary Logo Mark", "Typography & Palettes", "Comprehensive Brand Book", "Luxury Packaging"],
    },
    {
      category: isAr ? "04 // نؤتمت" : "04 // AUTOMATE",
      accent: "border-purple-500 text-purple-400",
      disciplineId: "ai",
      title: isAr ? "الذكاء الاصطناعي والأتمتة" : "AI & Automations",
      items: isAr
        ? ["مساعد ذكاء اصطناعي مخصص", "أتمتة العمليات التجارية", "ربط الأنظمة والفواتير", "تحليلات البيانات الذكية"]
        : ["Custom AI Assistants", "Workflow Automations", "CRM & Billing Pipelines", "Predictive Analytics"],
    },
    {
      category: isAr ? "05 // نحرك" : "05 // MOTION",
      accent: "border-rose-500 text-rose-400",
      disciplineId: "motion",
      title: isAr ? "الموشن والـ 3D" : "3D & Motion Craft",
      items: isAr
        ? ["فيديو إعلاني 3D سينمائي", "تحريك الشعار والواجهات", "مكتبة مجسمات 3D", "إعلانات الإطلاق 4K"]
        : ["Cinematic 3D Video", "Logo & UI Motion", "3D Digital Assets", "4K Product Trailers"],
    },
    {
      category: isAr ? "06 // نسوّق" : "06 // GROW",
      accent: "border-emerald-500 text-emerald-400",
      disciplineId: "marketing",
      title: isAr ? "التسويق الرقمي" : "Digital Marketing",
      items: isAr
        ? ["إعلانات ممولة عالية العائد", "تصدر نتائج البحث SEO", "قمع المبيعات والتسويق الآلي", "تقارير أداء أسبوعية"]
        : ["High-ROAS Paid Ads", "Organic Search SEO", "Automated CRM Funnels", "Weekly ROI Reports"],
    },
  ];

  return (
    <section className="py-28 bg-[#07070A] text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs font-mono text-neutral-cool uppercase tracking-widest block mb-2 font-bold">
              {isAr ? "مصفوفة القدرات والخدمات" : "05 // CAPABILITIES & DISCIPLINES"}
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white">
              {isAr ? "كل ما تحتاجه لبناء منتج رقمي استثنائي" : "Full-Spectrum Digital Mastery"}
            </h2>
          </div>

          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400 hover:text-white transition-colors"
          >
            <span>{isAr ? "صفحة الخدمات الشاملة ←" : "EXPLORE ALL SERVICES →"}</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {matrix.map((col, idx) => (
            <div
              key={idx}
              className="group p-8 rounded-3xl bg-soft-black border border-white/10 hover:border-white/25 transition-all duration-300 flex flex-col justify-between cursor-pointer shadow-xl"
              onClick={() => setSelectedDiscipline(col.disciplineId)}
            >
              <div>
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
                  <span className={`text-xs font-mono font-bold tracking-widest ${col.accent}`}>
                    {col.category}
                  </span>
                  <span className="text-[10px] font-mono text-white/40 group-hover:text-emerald-400 transition-colors">
                    {isAr ? "عرض التفاصيل ↗" : "DETAILS ↗"}
                  </span>
                </div>

                <h3 className="text-lg font-display font-bold text-white mb-4 group-hover:text-emerald-400 transition-colors">
                  {col.title}
                </h3>

                <ul className="flex flex-col gap-2.5">
                  {col.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="text-xs font-medium text-white/80 flex items-center gap-2">
                      <Check size={13} className="text-emerald-400 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between text-xs font-mono text-white/40">
                <span>{isAr ? "اضغط للمعاينة والطلب" : "Click to view & order"}</span>
                <ArrowUpRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Discipline Showcase Modal */}
      {selectedDiscipline && (
        <DisciplineShowcaseModal
          isOpen={selectedDiscipline !== null}
          onClose={() => setSelectedDiscipline(null)}
          locale={locale}
          initialDiscipline={selectedDiscipline}
        />
      )}
    </section>
  );
};