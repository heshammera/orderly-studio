"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, ShieldCheck } from "lucide-react";

interface StudioAndInsightsProps {
  locale: "en" | "ar";
}

export const StudioAndInsights: React.FC<StudioAndInsightsProps> = ({ locale }) => {
  const isAr = locale === "ar";

  const pillars = [
    { name: isAr ? "الفضول المعرفي" : "Curiosity", desc: isAr ? "استكشاف التقنيات الناشئة باستمرار." : "Relentless exploration of emerging tech." },
    { name: isAr ? "الدقة الهندسية" : "Precision", desc: isAr ? "بناء برمجيات بدون ثغرات أو تباطؤ." : "Zero-defect architectural rigor." },
    { name: isAr ? "الحِرفة والإتقان" : "Craft", desc: isAr ? "العناية الفائقة بأدق التفاصيل البصرية." : "Meticulous aesthetic attention." },
    { name: isAr ? "التكنولوجيا" : "Technology", desc: isAr ? "أنظمة سحابية وذكاء اصطناعي للمستقبل." : "Next-generation distributed infrastructure." },
    { name: isAr ? "التصميم" : "Design", desc: isAr ? "هويات رقمية تصنع الفارق في السوق." : "Transformative visual systems." },
  ];

  const articles = [
    {
      slug: "scalable-saas-architecture",
      category: isAr ? "الهندسة البرمجية" : "ENGINEERING",
      title: isAr ? "كيف نفكر في بناء منتجات SaaS قابلة للتوسع اللانهائي" : "How we think about scalable SaaS architectures",
      date: "06.09.2026",
      readTime: "6 min read",
    },
    {
      slug: "psychology-of-luxury-packaging",
      category: isAr ? "التصميم والعلامات التجارية" : "DESIGN",
      title: isAr ? "السيكولوجية الخفية وراء تصميم التغليف والمواد الملموسة" : "The psychology behind luxury packaging and tactile craft",
      date: "14.09.2026",
      readTime: "4 min read",
    },
    {
      slug: "ai-enterprise-business-value",
      category: isAr ? "الذكاء الاصطناعي" : "AI & AUTOMATION",
      title: isAr ? "أين يخلق الذكاء الاصطناعي قيمة حقيقية في نماذج الأعمال" : "Where AI actually creates real enterprise business value",
      date: "20.09.2026",
      readTime: "5 min read",
    },
  ];

  return (
    <section className="py-28 bg-off-white text-obsidian border-t border-neutral-warm/15">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* 16 — Studio Section */}
        <div className="mb-28">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-4">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-[2px] bg-obsidian" />
                <span className="text-xs font-mono uppercase tracking-widest text-neutral-warm font-semibold">
                  {isAr ? "الاستوديو والفلسفة" : "16 // THE STUDIO"}
                </span>
              </div>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight text-obsidian">
                {isAr ? "نحن أوردرلي." : "WE ARE ORDERLY."}
              </h2>
            </div>

            <Link
              href="/studio"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-obsidian hover:text-creative-coral transition-colors font-bold"
            >
              <span>{isAr ? "صفحة الاستوديو الكاملة ←" : "READ STUDIO STORY →"}</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>

          <p className="text-neutral-warm text-lg sm:text-xl max-w-3xl leading-relaxed mb-12">
            {isAr
              ? "استوديو مستقل مبني حول ركيزتين متساويتين: الهندسة البرمجية الصارمة والتصميم الإبداعي الفاخر. لا نبتكر تاريخاً زائفاً، بل نثبت قدراتنا عبر التجارب التي نبنيها."
              : "An independent studio founded on the convergence of engineering precision and artistic intent. We do not manufacture false histories; our work is our primary proof."}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 pt-6 border-t border-neutral-warm/20 mb-8">
            {pillars.map((pil, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-white border border-neutral-warm/20 shadow-sm">
                <span className="text-xs font-mono text-neutral-warm block mb-1">0{idx + 1}</span>
                <h4 className="font-display font-bold text-base text-obsidian mb-1">{pil.name}</h4>
                <p className="text-neutral-warm text-xs leading-relaxed">{pil.desc}</p>
              </div>
            ))}
          </div>

          {/* Button to /studio */}
          <div className="flex justify-center pt-4">
            <Link
              href="/studio"
              className="px-8 py-4 rounded-full bg-white border border-neutral-warm/30 hover:border-obsidian text-obsidian font-mono text-xs uppercase tracking-widest flex items-center gap-3 transition-all duration-300 shadow-md font-bold"
            >
              <span>{isAr ? "دخول صفحة الاستوديو والفلسفة ←" : "EXPLORE THE STUDIO PAGE →"}</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>

        {/* 17 — Integrity Standard */}
        <div className="mb-28 p-8 sm:p-12 rounded-3xl bg-white border border-neutral-warm/20 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div>
            <span className="text-xs font-mono text-creative-coral uppercase tracking-widest block mb-1 font-bold">
              {isAr ? "معايير العمل" : "17 // INTEGRITY STANDARD"}
            </span>
            <h3 className="text-2xl font-display font-bold text-obsidian">
              {isAr ? "أعمال حقيقية • جودة استثنائية • بدون ادعاءات وهمية" : "Selected Work • Pure Craft • Zero Fake Claims"}
            </h3>
          </div>
          <div className="flex items-center gap-3 text-xs font-mono text-neutral-warm">
            <ShieldCheck size={18} className="text-emerald-600" />
            <span>{isAr ? "معايير إنتاج معتمدة عالمياً" : "VERIFIED PRODUCTION STANDARD"}</span>
          </div>
        </div>

        {/* 18 — Insights Magazine */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-xs font-mono text-creative-coral uppercase tracking-widest block mb-2 font-bold">
                {isAr ? "المجلة الفكرية والتحريرية" : "18 // INSIGHTS MAGAZINE"}
              </span>
              <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-obsidian">
                {isAr ? "رؤى وأفكار من داخل الاستوديو" : "Editorial Perspectives"}
              </h2>
            </div>

            <Link
              href="/insights"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-creative-coral hover:text-obsidian transition-colors font-bold"
            >
              <span>{isAr ? "عرض كل المقالات ←" : "EXPLORE ALL INSIGHTS →"}</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {articles.map((art, idx) => (
              <Link
                key={idx}
                href={`/insights/${art.slug}`}
                className="p-8 rounded-3xl bg-white border border-neutral-warm/20 hover:border-creative-coral/40 transition-all duration-300 flex flex-col justify-between group shadow-sm hover:shadow-xl"
                data-cursor="READ"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="px-3 py-1 rounded-full bg-neutral-warm/10 text-[10px] font-mono font-bold text-obsidian">
                      {art.category}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-neutral-warm/10 flex items-center justify-center text-obsidian group-hover:bg-creative-coral group-hover:text-white transition-colors">
                      <ArrowUpRight size={14} />
                    </div>
                  </div>

                  <h3 className="text-xl font-display font-bold text-obsidian group-hover:text-creative-coral transition-colors mb-4 leading-snug">
                    {art.title}
                  </h3>
                </div>

                <div className="pt-6 border-t border-neutral-warm/15 flex items-center justify-between text-xs font-mono text-neutral-warm">
                  <span>{art.date}</span>
                  <span>{art.readTime}</span>
                </div>
              </Link>
            ))}
          </div>

          {/* Button to /insights */}
          <div className="flex justify-center pt-4">
            <Link
              href="/insights"
              className="px-8 py-4 rounded-full bg-white border border-neutral-warm/30 hover:border-creative-coral hover:bg-creative-coral/10 text-obsidian font-mono text-xs uppercase tracking-widest flex items-center gap-3 transition-all duration-300 shadow-md font-bold"
            >
              <span>{isAr ? "دخول مجلة المقالات التحريرية الكاملة ←" : "READ ALL PERSPECTIVES & ARTICLES →"}</span>
              <ArrowUpRight size={14} className="text-creative-coral" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};