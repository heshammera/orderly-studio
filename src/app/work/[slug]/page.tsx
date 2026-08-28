"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  Cpu,
  Globe,
  Layers,
  ShieldCheck,
  Sparkles,
  Quote,
  Network,
  Workflow,
  Clock,
  ExternalLink,
} from "lucide-react";
import { Header } from "@/components/navigation/Header";
import { CustomCursor } from "@/components/cursor/CustomCursor";
import { ProjectDiscoveryWizard } from "@/components/discovery/ProjectDiscoveryWizard";
import { REAL_PROJECTS } from "@/data/projects";
import { useLocale } from "@/context/LocaleContext";

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const { locale, isAr } = useLocale();
  const [isWizardOpen, setIsWizardOpen] = useState(false);

  const project =
    REAL_PROJECTS[params.slug] || REAL_PROJECTS["faalek-proptech"];

  const blueprint = project.blueprint;
  const testimonial = project.testimonial;

  return (
    <main
      dir={isAr ? "rtl" : "ltr"}
      className={`min-h-screen bg-[#07070A] text-white pt-28 pb-32 ${isAr ? "font-arabic" : "font-sans"}`}
    >
      <CustomCursor />
      <Header onOpenProjectBuilder={() => setIsWizardOpen(true)} />

      <div className="max-w-5xl mx-auto px-6 md:px-12">
        {/* Back Link */}
        <Link
          href="/work"
          className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white uppercase tracking-wider mb-10 transition-colors"
        >
          <ArrowLeft size={14} className={isAr ? "rotate-180" : ""} />
          <span>{isAr ? "العودة لمعرض المشاريع" : "BACK TO ALL WORKS"}</span>
        </Link>

        {/* Project Header */}
        <div className="mb-14 pb-8 border-b border-white/10">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-3.5 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-mono font-bold text-emerald-400">
              {project.category}
            </span>
            <span className="text-xs font-mono text-slate-400">
              {isAr ? `${project.clientAr} • ${project.locationAr}` : `${project.clientEn} • ${project.locationEn}`}
            </span>
            <span className="text-xs font-mono text-slate-400">
              {project.year}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-white mb-4 leading-tight">
            {isAr ? project.titleAr : project.titleEn}
          </h1>

          <p className="text-slate-300 text-base sm:text-lg max-w-3xl leading-relaxed">
            {isAr ? project.subtitleAr : project.subtitleEn}
          </p>
        </div>

        {/* Key Metrics Banner */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 sm:p-8 rounded-3xl bg-[#0C0D14] border border-white/10 mb-16 shadow-2xl">
          {project.metrics.map((m, i) => (
            <div key={i} className="text-center p-3">
              <span className="text-2xl sm:text-3xl font-display font-black text-emerald-400 block mb-1">
                {m.value}
              </span>
              <span className="text-xs font-mono text-slate-400 uppercase font-semibold">
                {isAr ? m.labelAr : m.labelEn}
              </span>
            </div>
          ))}
        </div>

        {/* Narrative & Case Study Body */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          {/* Main Case Details */}
          <div className="md:col-span-8 space-y-12">
            <div>
              <span className="text-xs font-mono text-slate-400 uppercase tracking-widest block mb-3 font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-400" />
                {isAr ? "01 // التحدي والاحتياج الأساسي:" : "01 // THE CHALLENGE"}
              </span>
              <p className="text-slate-200 text-base sm:text-lg leading-relaxed bg-white/[0.02] p-6 rounded-2xl border border-white/5">
                {isAr ? project.challengeAr : project.challengeEn}
              </p>
            </div>

            <div>
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest block mb-3 font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                {isAr ? "02 // الحل الهندسي والتنفيذ:" : "02 // THE SOLUTION & EXECUTION"}
              </span>
              <p className="text-slate-200 text-base sm:text-lg leading-relaxed bg-white/[0.02] p-6 rounded-2xl border border-white/5">
                {isAr ? project.solutionAr : project.solutionEn}
              </p>
            </div>

            {/* Architecture / Pipeline Blueprint */}
            {blueprint && (
              <div className="pt-4">
                <div className="flex items-center gap-2.5 mb-5">
                  <Workflow size={18} className="text-sky-400" />
                  <h3 className="text-lg font-display font-bold text-white">
                    {isAr ? blueprint.titleAr : blueprint.titleEn}
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {(isAr ? blueprint.nodesAr : blueprint.nodesEn).map((node, nIdx) => (
                    <div
                      key={nIdx}
                      className="p-5 rounded-2xl bg-[#0C0D14] border border-white/10 hover:border-sky-500/30 transition-colors flex flex-col justify-between"
                    >
                      <div>
                        <span className="text-[10px] font-mono text-sky-400 font-bold px-2 py-0.5 rounded bg-sky-500/10 border border-sky-500/20 inline-block mb-2">
                          {node.step}
                        </span>
                        <h4 className="text-sm font-display font-bold text-white mb-2">
                          {node.label}
                        </h4>
                      </div>
                      <p className="text-xs font-mono text-slate-400 leading-relaxed">
                        {node.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Client Testimonial Endorsement */}
            {testimonial && (
              <div className="p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/15 relative overflow-hidden">
                <Quote size={36} className="text-emerald-400/20 absolute -top-2 right-4 pointer-events-none" />
                <p className="text-base sm:text-lg text-slate-100 font-medium leading-relaxed mb-6 italic">
                  "{isAr ? testimonial.quoteAr : testimonial.quoteEn}"
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center font-display font-bold text-emerald-300 text-sm">
                    {(isAr ? testimonial.authorAr : testimonial.authorEn).slice(0, 2)}
                  </div>
                  <div>
                    <span className="text-sm font-display font-bold text-white block">
                      {isAr ? testimonial.authorAr : testimonial.authorEn}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      {isAr ? testimonial.titleAr : testimonial.titleEn}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Specs */}
          <div className="md:col-span-4 space-y-6">
            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-5">
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase block mb-1 font-bold">
                  {isAr ? "الجدول الزمني للإنجاز" : "DELIVERY TIMELINE"}
                </span>
                <span className="text-xs font-mono font-bold text-white flex items-center gap-1.5">
                  <Clock size={13} className="text-sky-400" />
                  {isAr ? project.timelineAr : project.timelineEn}
                </span>
              </div>

              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase block mb-2 font-bold">
                  {isAr ? "التقنيات ونطاق العمل" : "TECH STACK & SCOPE"}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {project.stack.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick CTA Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-sky-500/10 to-transparent border border-white/15 text-center space-y-3 shadow-xl">
              <h3 className="text-base font-display font-bold text-white">
                {isAr ? "لديك مشروع مماثل؟" : "Need a Similar System?"}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {isAr
                  ? "دعنا نبني ونطلق منصتك بنفس معايير الجودة والسرعة."
                  : "Let's build and scale your initiative with verified studio standards."}
              </p>
              <button
                type="button"
                onClick={() => setIsWizardOpen(true)}
                className="w-full py-3.5 rounded-full bg-white text-black font-mono font-bold text-xs uppercase tracking-wider hover:bg-slate-200 transition-all shadow-lg hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                <span>{isAr ? "ابدأ استكشاف مشروعك" : "START PROJECT BRIEF"}</span>
                <ArrowUpRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <ProjectDiscoveryWizard
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
        locale={locale}
      />
    </main>
  );
}