"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface EngineeringWorkProps {
  locale: "en" | "ar";
  onOpenProjectBuilder: () => void;
}

export const EngineeringWork: React.FC<EngineeringWorkProps> = ({
  locale,
  onOpenProjectBuilder,
}) => {
  const isAr = locale === "ar";

  const projects = [
    {
      slug: "nova-neural-engine",
      title: isAr ? "منصة تحليل البيانات الفورية" : "Nova Neural Engine",
      category: "AI & High-Throughput Analytics",
      client: "Enterprise SaaS Platform",
      stack: "Next.js / Python / Rust / WebGL",
      desc: isAr
        ? "معمارية برمجية تعالج أكثر من 50,000 حدث في الثانية مع لوحة تحكم تفاعلية مبنية بتقنيات WebGL."
        : "A real-time data engine processing 50k events/sec with reactive WebGL telemetry dashboards.",
      gradient: "from-blue-600/30 to-violet-600/10",
    },
    {
      slug: "aura-headless-commerce",
      title: isAr ? "نظام التجارة الموزع عبر الحافة" : "Aura Headless Commerce",
      category: "E-Commerce & Global Edge Architecture",
      client: "Global Retail Brand",
      stack: "Next.js / GraphQL / Redis / Stripe",
      desc: isAr
        ? "منصة تجارة إلكترونية مفصولة الرأس بزمن استجابة أقل من 25 ميلي ثانية حول العالم مع معدل تحويل قياسي."
        : "Sub-25ms global checkout architecture handling millions in multi-currency transactions.",
      gradient: "from-cyan-600/30 to-blue-600/10",
    },
  ];

  return (
    <section id="work" className="py-24 bg-obsidian text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs font-mono text-engineering-blue uppercase tracking-widest block mb-2 font-bold">
              {isAr ? "مشاريع برمجية مختارة" : "SELECTED ENGINEERING WORK"}
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white">
              {isAr ? "الأنظمة في بيئة العمل الحية" : "Systems in Production"}
            </h2>
          </div>

          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-engineering-blue hover:text-white transition-colors"
          >
            <span>{isAr ? "عرض كل المشاريع ←" : "EXPLORE ALL WORKS →"}</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {projects.map((proj, idx) => (
            <Link
              key={idx}
              href={`/work/${proj.slug}`}
              className="group rounded-3xl bg-soft-black border border-white/10 overflow-hidden hover:border-engineering-blue/50 transition-all duration-500 flex flex-col justify-between shadow-2xl"
              data-cursor="VIEW"
            >
              <div className={`h-64 sm:h-80 w-full bg-gradient-to-br ${proj.gradient} p-8 flex flex-col justify-between relative`}>
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-obsidian/80 backdrop-blur-md border border-white/10 text-[11px] font-mono text-white/90">
                    {proj.category}
                  </span>
                  <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-engineering-blue transition-colors">
                    <ArrowUpRight size={18} />
                  </div>
                </div>

                <div>
                  <span className="text-xs font-mono text-white/60 block mb-1">{proj.client}</span>
                  <h3 className="text-2xl sm:text-3xl font-display font-bold text-white group-hover:text-engineering-blue transition-colors">
                    {proj.title}
                  </h3>
                </div>
              </div>

              <div className="p-8">
                <p className="text-neutral-cool text-sm leading-relaxed mb-6">{proj.desc}</p>
                <div className="flex items-center justify-between pt-4 border-t border-white/5 text-xs font-mono text-white/50">
                  <span>STACK</span>
                  <span className="text-white/80">{proj.stack}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Dedicated Section Navigation Button */}
        <div className="flex justify-center pt-6">
          <Link
            href="/work"
            className="px-8 py-4 rounded-full bg-white/5 border border-white/15 hover:border-engineering-blue hover:bg-engineering-blue/10 text-white font-mono text-xs uppercase tracking-widest flex items-center gap-3 transition-all duration-300 shadow-lg"
          >
            <span>{isAr ? "دخول صفحة معرض الأعمال الكاملة ←" : "VIEW ALL ENGINEERING & HYBRID WORK →"}</span>
            <ArrowUpRight size={14} className="text-engineering-blue" />
          </Link>
        </div>
      </div>
    </section>
  );
};