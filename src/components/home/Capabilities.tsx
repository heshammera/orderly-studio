"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Orbit } from "lucide-react";
import { WorldPortal } from "@/components/worlds/WorldPortal";
import type { WorldId } from "@/components/worlds/WorldCanvas";

interface CapabilitiesProps {
  locale: "en" | "ar";
}

export const Capabilities: React.FC<CapabilitiesProps> = ({ locale }) => {
  const isAr = locale === "ar";
  const [activeWorld, setActiveWorld] = useState<WorldId | null>(null);

  const matrix: {
    category: string;
    accent: string;
    worldId: WorldId;
    items: string[];
  }[] = [
    {
      category: isAr ? "نبني // BUILD" : "BUILD",
      accent: "border-engineering-blue text-engineering-blue",
      worldId: "engineering",
      items: isAr
        ? ["مواقع الويب الفاخرة", "تطبيقات الويب (Web Apps)", "منصات SaaS السحابية", "الواجهات البرمجية APIs", "الأنظمة الموزعة"]
        : ["Studio Websites", "Web Applications", "SaaS Platforms", "API Gateways", "Distributed Systems"],
    },
    {
      category: isAr ? "نؤتمت // AUTOMATE" : "AUTOMATE",
      accent: "border-engineering-violet text-engineering-violet",
      worldId: "ai",
      items: isAr
        ? ["حلول الذكاء الاصطناعي AI", "أتمتة العمليات التجارية", "محركات سير العمل", "التكاملات السحابية", "تحليل البيانات الفوري"]
        : ["Custom AI & LLMs", "Workflow Automation", "Event Pipelines", "Cloud Integrations", "Real-Time Telemetry"],
    },
    {
      category: isAr ? "نصمم // DESIGN" : "DESIGN",
      accent: "border-creative-coral text-creative-coral",
      worldId: "uiux",
      items: isAr
        ? ["بناء الهوية التجارية", "واجهات وتجربة المستخدم UI/UX", "الخطوط الطباعية", "تصميم التغليف", "أنظمة التصميم Design Systems"]
        : ["Brand Identity", "UI / UX Design", "Custom Typography", "Structural Packaging", "Design Systems"],
    },
    {
      category: isAr ? "نبتكر // CREATE" : "CREATE",
      accent: "border-creative-peach text-creative-peach",
      worldId: "motion",
      items: isAr
        ? ["الرسوم ثلاثية الأبعاد 3D", "الموشن جرافيكس", "التصوير التجاري الفني", "الإخراج الإبداعي", "التجارب المكانية Spatial"]
        : ["3D Art & Shaders", "Motion Graphics", "Art Direction", "Commercial Photography", "Spatial Experiences"],
    },
    {
      category: isAr ? "نسوّق // MARKET" : "MARKET",
      accent: "border-emerald-400 text-emerald-400",
      worldId: "marketing",
      items: isAr
        ? ["استراتيجية التسويق الرقمي", "تحسين محركات البحث SEO", "إدارة منصات التواصل", "الإعلانات المدفوعة Paid Media", "التسويق عبر البريد CRM"]
        : ["Digital Strategy", "SEO & Organic Growth", "Social Media & Content", "Paid Media & Ads", "Email Marketing & CRM"],
    },
  ];

  return (
    <section className="py-28 bg-obsidian text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs font-mono text-neutral-cool uppercase tracking-widest block mb-2 font-bold">
              {isAr ? "مصفوفة القدرات الشاملة" : "05 // CAPABILITY MATRIX"}
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white">
              {isAr ? "كل ما تحتاجه لبناء منتج استثنائي" : "Full-Spectrum Execution"}
            </h2>
          </div>

          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-engineering-blue hover:text-white transition-colors"
          >
            <span>{isAr ? "صفحة الخدمات الكاملة ←" : "EXPLORE ALL SERVICES →"}</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-12">
          {matrix.map((col, idx) => (
            <div
              key={idx}
              className="group p-8 rounded-3xl bg-soft-black border border-white/10 hover:border-white/25 transition-all flex flex-col justify-between cursor-pointer"
              onClick={() => setActiveWorld(col.worldId)}
              data-cursor="EXPLORE"
            >
              <div>
                <span className={`text-xs font-mono font-bold tracking-widest block pb-4 mb-6 border-b ${col.accent}`}>
                  {col.category}
                </span>

                <ul className="flex flex-col gap-3">
                  {col.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="text-sm font-medium text-white/80 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8 flex items-center justify-between">
                <span className="text-[11px] font-mono text-white/30">DISCIPLINE 0{idx + 1}</span>
                {/* Subtle Enter World hint on hover */}
                <span className={`opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-mono flex items-center gap-1 ${col.accent}`}>
                  <Orbit size={10} />
                  <span>{isAr ? "ادخل" : "ENTER"}</span>
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Dedicated Navigation Button */}
        <div className="flex justify-center pt-6">
          <Link
            href="/services"
            className="px-8 py-4 rounded-full bg-white/5 border border-white/15 hover:border-engineering-blue hover:bg-engineering-blue/10 text-white font-mono text-xs uppercase tracking-widest flex items-center gap-3 transition-all duration-300 shadow-lg"
          >
            <span>{isAr ? "دخول صفحة الخدمات والقدرات الشاملة ←" : "EXPLORE ALL SERVICES & CAPABILITIES →"}</span>
            <ArrowUpRight size={14} className="text-engineering-blue" />
          </Link>
        </div>
      </div>

      {/* World Portal overlay */}
      {activeWorld && (
        <WorldPortal
          worldId={activeWorld}
          isOpen={activeWorld !== null}
          onClose={() => setActiveWorld(null)}
          locale={locale}
        />
      )}
    </section>
  );
};