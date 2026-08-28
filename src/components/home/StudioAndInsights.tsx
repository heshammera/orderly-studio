"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, ShieldCheck, CheckCircle2, TrendingUp, Cpu, Sparkles } from "lucide-react";

interface StudioAndInsightsProps {
  locale: "en" | "ar";
}

export const StudioAndInsights: React.FC<StudioAndInsightsProps> = ({ locale }) => {
  const isAr = locale === "ar";

  const pillars = [
    { name: isAr ? "الفضول المعرفي" : "Curiosity", desc: isAr ? "استكشاف أحدث التقنيات السحابية والذكاء الاصطناعي." : "Relentless exploration of modern cloud & AI tech." },
    { name: isAr ? "الدقة الهندسية" : "Precision", desc: isAr ? "بناء برمجيات بدون ثغرات أو تباطؤ بزمن < 50ms." : "Zero-defect architectural rigor and sub-50ms latency." },
    { name: isAr ? "الحِرفة والإتقان" : "Craft", desc: isAr ? "العناية الفائقة بأدق تفاصيل الهوية وتجربة المستخدم." : "Meticulous aesthetic attention and royal brand systems." },
    { name: isAr ? "النمو المالي" : "Growth", desc: isAr ? "حملات تسويقية وقمع مبيعات يحقق أعلى عائد ROAS." : "Data-driven performance media scaling real revenue." },
    { name: isAr ? "الالتزام التام" : "Integrity", desc: isAr ? "تسليم الكود المصدري وحقوق الملكية 100% للعميل." : "100% IP ownership & clean source code handover." },
  ];

  const realMetrics = [
    { value: "SAR 140M+", labelAr: "حجم الصفقات المدارة عبر المنصات", labelEn: "Total Asset Transactions Managed" },
    { value: "6.8×", labelAr: "متوسط العائد الإعلاني (ROAS)", labelEn: "Average Paid Media ROAS" },
    { value: "< 45ms", labelAr: "متوسط سرعة استجابة الخوادم", labelEn: "Average Global Edge Latency" },
    { value: "99.98%", labelAr: "استمرارية تشغيل الأنظمة الحية", labelEn: "Production Cloud Uptime SLA" },
  ];

  const articles = [
    {
      slug: "scalable-saas-architecture",
      category: isAr ? "الهندسة البرمجية" : "ENGINEERING",
      title: isAr ? "كيف نفكر في بناء منصات SaaS سحابية تتحمل مئات الآلاف من الزوار" : "How we engineer enterprise SaaS architectures for infinite scale",
      date: "12.01.2026",
      readTime: "5 min read",
    },
    {
      slug: "psychology-of-luxury-packaging",
      category: isAr ? "التصميم والعلامات الفاخرة" : "DESIGN",
      title: isAr ? "السيكولوجية البصرية وراء تصميم الهويات الملكية والتغليف الفاخر" : "The visual psychology behind royal brand identities & 3D packaging",
      date: "18.01.2026",
      readTime: "4 min read",
    },
    {
      slug: "ai-enterprise-business-value",
      category: isAr ? "الذكاء الاصطناعي والتسويق" : "GROWTH & AI",
      title: isAr ? "أين يخلق الذكاء الاصطناعي وأتمتة الـ CRM قيمة حقيقية في نمو المبيعات" : "Where AI agents & CRM automations unlock measurable revenue growth",
      date: "25.01.2026",
      readTime: "6 min read",
    },
  ];

  return (
    <section className="py-28 bg-off-white text-obsidian border-t border-neutral-warm/15" dir={isAr ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Studio Section */}
        <div className="mb-24">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-4">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-[2px] bg-obsidian" />
                <span className="text-xs font-mono uppercase tracking-widest text-neutral-warm font-semibold">
                  {isAr ? "الاستوديو والفلسفة // 05" : "05 // THE STUDIO"}
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight text-obsidian leading-tight">
                {isAr ? "نحن أوردرلي. التكنولوجيا × التصميم × التسويق." : "WE ARE ORDERLY. TECH × DESIGN × SCALE."}
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

          <p className="text-neutral-warm text-base sm:text-lg max-w-3xl leading-relaxed mb-12">
            {isAr
              ? "استوديو إبداعي وتكنولوجي مستقل يبني منتجات رقمية حقيقية للشركات الطموحة في المملكة والخليج والعالم. لا نعتمد على نماذج وهمية، بل نثبت قدراتنا عبر الأنظمة الحية التي تعمل في السوق."
              : "An independent creative technology studio engineering high-impact digital products for ambitious brands in the GCC and worldwide. Our production deployments are our primary proof."}
          </p>

          {/* 5 Core Pillars */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5 pt-6 border-t border-neutral-warm/20 mb-12">
            {pillars.map((pil, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-white border border-neutral-warm/20 shadow-sm">
                <span className="text-xs font-mono text-neutral-warm block mb-1 font-bold">0{idx + 1}</span>
                <h4 className="font-display font-bold text-sm sm:text-base text-obsidian mb-1">{pil.name}</h4>
                <p className="text-neutral-warm text-xs leading-relaxed">{pil.desc}</p>
              </div>
            ))}
          </div>

          {/* Real Metrics Banner */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-7 sm:p-8 rounded-3xl bg-white border border-neutral-warm/25 shadow-md">
            {realMetrics.map((m, mIdx) => (
              <div key={mIdx} className="text-center p-2">
                <span className="text-2xl sm:text-3xl font-display font-black text-obsidian block mb-1">
                  {m.value}
                </span>
                <span className="text-xs font-mono text-neutral-warm uppercase font-semibold">
                  {isAr ? m.labelAr : m.labelEn}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Verified Standard */}
        <div className="mb-24 p-7 sm:p-10 rounded-3xl bg-white border border-neutral-warm/20 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div>
            <span className="text-xs font-mono text-creative-coral uppercase tracking-widest block mb-1 font-bold">
              {isAr ? "معايير الجودة والشفافية" : "VERIFIED PRODUCTION STANDARD"}
            </span>
            <h3 className="text-xl sm:text-2xl font-display font-bold text-obsidian">
              {isAr ? "مشاريع حية قيد التشغيل • كود مصدري نظيف • نتائج قابلة للتحقق" : "Real Live Deployments • Clean Architecture • Verifiable Metrics"}
            </h3>
          </div>
          <div className="flex items-center gap-2.5 text-xs font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-full shadow-sm">
            <ShieldCheck size={16} className="text-emerald-600 flex-shrink-0" />
            <span>{isAr ? "معايير موثقة 100%" : "100% VERIFIED"}</span>
          </div>
        </div>

        {/* Insights Magazine */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-xs font-mono text-creative-coral uppercase tracking-widest block mb-2 font-bold">
                {isAr ? "المجلة الفكرية والتحريرية // 06" : "06 // INSIGHTS & PERSPECTIVES"}
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight text-obsidian leading-tight">
                {isAr ? "رؤى وأفكار من واقع تنفيذ المشاريع" : "Perspectives from Production"}
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {articles.map((art, idx) => (
              <Link
                key={idx}
                href={`/insights/${art.slug}`}
                className="p-7 sm:p-8 rounded-3xl bg-white border border-neutral-warm/20 hover:border-creative-coral/40 transition-all duration-300 flex flex-col justify-between group shadow-sm hover:shadow-xl"
                data-cursor="READ"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="px-3 py-1 rounded-full bg-neutral-warm/10 text-[10px] font-mono font-bold text-obsidian">
                      {art.category}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-neutral-warm/10 flex items-center justify-center text-obsidian group-hover:bg-creative-coral group-hover:text-white transition-colors">
                      <ArrowUpRight size={14} />
                    </div>
                  </div>

                  <h3 className="text-lg sm:text-xl font-display font-bold text-obsidian group-hover:text-creative-coral transition-colors mb-4 leading-snug">
                    {art.title}
                  </h3>
                </div>

                <div className="pt-5 border-t border-neutral-warm/15 flex items-center justify-between text-xs font-mono text-neutral-warm">
                  <span>{art.date}</span>
                  <span>{art.readTime}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};