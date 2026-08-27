"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface MarketingWorkProps {
  locale: "en" | "ar";
  onOpenProjectBuilder: () => void;
}

export const MarketingWork: React.FC<MarketingWorkProps> = ({ locale, onOpenProjectBuilder }) => {
  const isAr = locale === "ar";

  const projects = [
    {
      slug: "nova-neural-engine",
      title: isAr ? "حملة إطلاق منصة Nova السحابية" : "Nova Cloud Platform Launch",
      category: "PERFORMANCE & SEO",
      client: isAr ? "شركة Nova SaaS الدولية" : "Nova International SaaS",
      desc: isAr
        ? "استراتيجية تسويق رقمي متكاملة حققت 340% زيادة في التحويلات العضوية خلال 90 يوماً من الإطلاق."
        : "An integrated digital launch strategy achieving 340% organic conversion growth within 90 days of product release.",
      metrics: [{ label: isAr ? "نمو التحويل" : "Conversion Growth", value: "+340%" }, { label: "CAC", value: "−62%" }, { label: isAr ? "عائد الاستثمار" : "ROAS", value: "8.4×" }],
      gradient: "from-emerald-600/30 to-teal-600/10",
    },
    {
      slug: "orion-haute-horlogerie",
      title: isAr ? "هوية وحملة الإطلاق العالمية لأوريون" : "Orion Global Brand Activation",
      category: "SOCIAL & CONTENT STRATEGY",
      client: isAr ? "دار أوريون السويسرية" : "Orion Watchmaker Geneva",
      desc: isAr
        ? "حملة إبداعية على منصات التواصل الاجتماعي وفعالية الإطلاق التي وصلت إلى أكثر من 35 تغطية دولية."
        : "A social-native content strategy and activation event generating 35+ editorial press features globally.",
      metrics: [{ label: isAr ? "تغطية صحفية" : "Press Coverage", value: "35+" }, { label: isAr ? "وصول عضوي" : "Organic Reach", value: "2.1M" }, { label: isAr ? "التفاعل" : "Engagement", value: "4.8×" }],
      gradient: "from-teal-600/30 to-cyan-600/10",
    },
  ];

  return (
    <section className="py-24 bg-soft-black text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest block mb-2 font-bold">
              {isAr ? "أعمال تسويقية مختارة" : "SELECTED MARKETING WORK"}
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white">
              {isAr ? "نتائج حقيقية وقابلة للقياس" : "Growth Engineered by Design"}
            </h2>
          </div>
          <Link
            href="/marketing"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400 hover:text-white transition-colors"
          >
            <span>{isAr ? "عرض كل الأعمال التسويقية ←" : "EXPLORE ALL MARKETING WORK →"}</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {projects.map((proj, idx) => (
            <Link
              key={idx}
              href={`/work/${proj.slug}`}
              className="group rounded-3xl bg-[#141418] border border-white/10 overflow-hidden hover:border-emerald-500/40 transition-all duration-500 flex flex-col shadow-2xl"
              data-cursor="VIEW"
            >
              {/* Card Header Visual */}
              <div className={`h-64 w-full bg-gradient-to-br ${proj.gradient} p-8 flex flex-col justify-between relative`}>
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-obsidian/80 backdrop-blur-md border border-white/10 text-[11px] font-mono text-emerald-300 font-bold">
                    {proj.category}
                  </span>
                  <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-emerald-500 transition-colors">
                    <ArrowUpRight size={18} />
                  </div>
                </div>
                <div>
                  <span className="text-xs font-mono text-white/60 block mb-1">{proj.client}</span>
                  <h3 className="text-2xl sm:text-3xl font-display font-bold text-white group-hover:text-emerald-300 transition-colors">
                    {proj.title}
                  </h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-8 flex flex-col flex-1">
                <p className="text-neutral-cool text-sm leading-relaxed mb-6">{proj.desc}</p>
                <div className="mt-auto grid grid-cols-3 gap-3 pt-6 border-t border-white/5">
                  {proj.metrics.map((m, i) => (
                    <div key={i} className="text-center">
                      <span className="text-xl font-display font-black text-emerald-400 block">{m.value}</span>
                      <span className="text-[10px] font-mono text-neutral-cool uppercase">{m.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Section CTA Button */}
        <div className="flex justify-center pt-6">
          <Link
            href="/marketing"
            className="px-8 py-4 rounded-full bg-white/5 border border-white/15 hover:border-emerald-500 hover:bg-emerald-500/10 text-white font-mono text-xs uppercase tracking-widest flex items-center gap-3 transition-all duration-300 shadow-lg"
          >
            <span>{isAr ? "دخول صفحة الأعمال التسويقية الكاملة ←" : "EXPLORE FULL MARKETING PORTFOLIO →"}</span>
            <ArrowUpRight size={14} className="text-emerald-400" />
          </Link>
        </div>
      </div>
    </section>
  );
};