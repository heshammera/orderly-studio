"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, BookOpen, Clock, Tag, Sparkles } from "lucide-react";
import { Header } from "@/components/navigation/Header";
import { CustomCursor } from "@/components/cursor/CustomCursor";
import { Footer } from "@/components/navigation/Footer";
import { ProjectDiscoveryWizard } from "@/components/discovery/ProjectDiscoveryWizard";
import { useLocale } from "@/context/LocaleContext";

interface Article {
  slug: string;
  category: "ENGINEERING" | "DESIGN" | "AI" | "GROWTH";
  categoryLabelEn: string;
  categoryLabelAr: string;
  titleEn: string;
  titleAr: string;
  excerptEn: string;
  excerptAr: string;
  authorEn: string;
  authorAr: string;
  authorRoleEn: string;
  authorRoleAr: string;
  date: string;
  readTimeEn: string;
  readTimeAr: string;
}

const ARTICLES: Article[] = [
  {
    slug: "scalable-saas-architecture",
    category: "ENGINEERING",
    categoryLabelEn: "ENGINEERING",
    categoryLabelAr: "الهندسة البرمجية",
    titleEn: "How We Engineer Sub-50ms SaaS Platforms at Scale",
    titleAr: "كيف نبني منصات سحابية SaaS باستجابة تقل عن 50 ميلي ثانية",
    excerptEn:
      "An architectural deep-dive into multi-tenant distributed systems, edge caching, and zero-downtime database migrations under real enterprise loads.",
    excerptAr:
      "مراجعة معمارية لتقنيات الأنظمة الموزعة، التخزين المؤقت على الحافة، وتحسين استعلامات قواعد البيانات تحت ضغط آلاف الطلبات المتزامنة.",
    authorEn: "Hesham Al-Otaibi",
    authorAr: "هشام العتيبي",
    authorRoleEn: "Lead Systems Architect",
    authorRoleAr: "كبير مهندسي النظم",
    date: "2025.10.12",
    readTimeEn: "6 min read",
    readTimeAr: "قراءة في 6 دقائق",
  },
  {
    slug: "psychology-of-luxury-packaging",
    category: "DESIGN",
    categoryLabelEn: "BRAND & DESIGN",
    categoryLabelAr: "الهوية والتصميم",
    titleEn: "The Tactile Science of Luxury Unboxing Experiences",
    titleAr: "السيكولوجية الخفية وراء تصميم التغليف الفاخر وتجربة اللمس",
    excerptEn:
      "Why tactile materiality, weight, and acoustic unboxing feedback create irreplaceable brand equity in a digital-first world.",
    excerptAr:
      "لماذا تظل التجربة الملموسة والفتح الفيزيائي للمنتجات الفاخرة أقوى محفز عاطفي للارتباط بالعلامة التجارية في العصر الرقمي.",
    authorEn: "Nour Al-Mansoor",
    authorAr: "نور المنصور",
    authorRoleEn: "Creative Director",
    authorRoleAr: "المديرة الإبداعية",
    date: "2025.10.28",
    readTimeEn: "4 min read",
    readTimeAr: "قراءة في 4 دقائق",
  },
  {
    slug: "ai-enterprise-business-value",
    category: "AI",
    categoryLabelEn: "AI & AUTOMATION",
    categoryLabelAr: "الذكاء الاصطناعي",
    titleEn: "Where Enterprise AI Actually Creates Measurable ROI",
    titleAr: "أين يخلق الذكاء الاصطناعي عائداً استثمارياً حقيقياً في المنظمات",
    excerptEn:
      "Moving past generative hype into pragmatic autonomous workflow integrations that measurably cut operational costs and latency.",
    excerptAr:
      "تجاوز الضجيج الإعلاني والتركيز على تكامل النماذج اللغوية والأتمتة التي تخفض التكاليف التشغيلية بنسب ملموسة وقابلة للقياس.",
    authorEn: "Tariq Al-Ghamdi",
    authorAr: "طارق الغامدي",
    authorRoleEn: "AI Research Lead",
    authorRoleAr: "رئيس أبحاث الذكاء الاصطناعي",
    date: "2025.11.05",
    readTimeEn: "5 min read",
    readTimeAr: "قراءة في 5 دقائق",
  },
  {
    slug: "high-roas-growth-engineering",
    category: "GROWTH",
    categoryLabelEn: "GROWTH & ADS",
    categoryLabelAr: "النمو والإعلانات",
    titleEn: "Engineering 6.8x ROAS: The Dynamic Testing Framework",
    titleAr: "هندسة العائد الإعلاني 6.8x: إطار عمل الاختبارات الديناميكية",
    excerptEn:
      "How algorithmic creative testing, automated retention funnels, and technical landing page speed combine to lower customer acquisition cost.",
    excerptAr:
      "كيف يجتمع اختبار الإعلانات الخوارزمي، قنوات الاحتفاظ المؤتمتة، وسرعة صفحات الهبوط لتخفيض تكلفة اكتساب العميل ومضاعفة العائد.",
    authorEn: "Fahad Al-Saleem",
    authorAr: "فهد السليم",
    authorRoleEn: "Head of Growth",
    authorRoleAr: "رئيس قسم النمو",
    date: "2025.11.18",
    readTimeEn: "7 min read",
    readTimeAr: "قراءة في 7 دقائق",
  },
];

export default function InsightsPage() {
  const { locale, isAr } = useLocale();
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>("ALL");

  const filteredArticles =
    activeFilter === "ALL"
      ? ARTICLES
      : ARTICLES.filter((a) => a.category === activeFilter);

  return (
    <main
      dir={isAr ? "rtl" : "ltr"}
      className={`min-h-screen bg-[#07070A] text-white pt-28 pb-24 ${isAr ? "font-arabic" : "font-sans"}`}
    >
      <CustomCursor />
      <Header onOpenProjectBuilder={() => setIsWizardOpen(true)} />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-14 pb-8 border-b border-white/10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-emerald-400 mb-5 font-bold">
            <BookOpen size={13} />
            <span>{isAr ? "المجلة الفكرية والتحريرية" : "ORDERLY INSIGHTS & PERSPECTIVES"}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black text-white mb-5 leading-tight">
            {isAr ? "أبحاث في التكنولوجيا والتصميم والنمو" : "Research, systems,\nand craft in action."}
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed">
            {isAr
              ? "مقالات تحريرية متخصصة ومخططات معمارية يكتبها مهندسو ومصممو ORDERLY من واقع مشاريع الإنتاج الحية."
              : "Technical breakdowns, architectural blueprints, and design philosophies written by ORDERLY engineers and creators from live production experience."}
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 text-xs font-mono">
          {[
            { id: "ALL", labelEn: "All Perspectives", labelAr: "جميع المقالات" },
            { id: "ENGINEERING", labelEn: "Engineering", labelAr: "الهندسة البرمجية" },
            { id: "DESIGN", labelEn: "Brand & Design", labelAr: "الهوية والتصميم" },
            { id: "AI", labelEn: "AI & Automation", labelAr: "الذكاء الاصطناعي" },
            { id: "GROWTH", labelEn: "Growth & ROAS", labelAr: "النمو والتسويق" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-4 py-2 rounded-full border transition-all whitespace-nowrap font-bold ${
                activeFilter === tab.id
                  ? "bg-white text-black border-white shadow-md scale-105"
                  : "bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10"
              }`}
            >
              {isAr ? tab.labelAr : tab.labelEn}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {filteredArticles.map((art) => (
            <div
              key={art.slug}
              className="p-8 rounded-3xl bg-[#0C0D14] border border-white/10 hover:border-white/25 transition-all duration-300 flex flex-col justify-between group shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono font-bold text-emerald-400">
                    {isAr ? art.categoryLabelAr : art.categoryLabelEn}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-white group-hover:text-black text-white flex items-center justify-center transition-all">
                    <ArrowUpRight size={14} />
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-display font-bold text-white group-hover:text-emerald-400 transition-colors mb-3 leading-snug">
                  {isAr ? art.titleAr : art.titleEn}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  {isAr ? art.excerptAr : art.excerptEn}
                </p>
              </div>

              {/* Author & Read Time */}
              <div className="pt-5 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                <div>
                  <span className="text-white font-bold block">
                    {isAr ? art.authorAr : art.authorEn}
                  </span>
                  <span className="text-slate-500 text-[10px]">
                    {isAr ? art.authorRoleAr : art.authorRoleEn}
                  </span>
                </div>
                <div className="text-end text-slate-400 text-[11px] flex items-center gap-1.5">
                  <Clock size={12} className="text-slate-500" />
                  <span>{isAr ? art.readTimeAr : art.readTimeEn}</span>
                </div>
              </div>
            </div>
          ))}
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