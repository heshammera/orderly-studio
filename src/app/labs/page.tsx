"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Bot,
  Layers,
  Zap,
  Cpu,
  Globe2,
  Code2,
  Sparkles,
  FlaskConical,
  ExternalLink,
} from "lucide-react";
import { Header } from "@/components/navigation/Header";
import { CustomCursor } from "@/components/cursor/CustomCursor";
import { useLocale } from "@/context/LocaleContext";
import { ProjectDiscoveryWizard } from "@/components/discovery/ProjectDiscoveryWizard";

const LABS = [
  {
    id: "LAB_001",
    status: "ACTIVE",
    statusColor: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
    icon: <Bot className="w-7 h-7 text-purple-400" />,
    accentBorder: "border-purple-500/30",
    accentBg: "bg-purple-500/10",
    titleEn: "Neural Workflow Intelligence Agent",
    titleAr: "عميل الأتمتة وسير العمل بالذكاء الاصطناعي",
    descEn:
      "A self-adapting LLM-powered automation layer that monitors, classifies, and routes business workflows without manual configuration. Trained on domain-specific operational data.",
    descAr:
      "طبقة أتمتة مدعومة بنموذج لغوي ضخم تراقب سير العمل وتصنفه وتوجهه تلقائياً بدون أي تدخل يدوي — مدربة على بيانات تشغيلية خاصة بكل مجال.",
    tagsEn: ["LLM / RAG", "Vector DB", "Workflow Engine", "Python"],
    tagsAr: ["نموذج لغوي", "قاعدة بيانات دلالية", "محرك سير عمل", "Python"],
  },
  {
    id: "LAB_002",
    status: "BETA",
    statusColor: "text-amber-400 border-amber-500/30 bg-amber-500/10",
    icon: <Layers className="w-7 h-7 text-cyan-400" />,
    accentBorder: "border-cyan-500/30",
    accentBg: "bg-cyan-500/10",
    titleEn: "WebGL Spatial Interface Renderer",
    titleAr: "مكتبة واجهات ثلاثية الأبعاد مكانية بـ WebGL",
    descEn:
      "A lightweight TypeScript library for constructing GPU-accelerated 3D data visualisations and spatial brand experiences directly in the browser — no heavy 3D engine required.",
    descAr:
      "مكتبة TypeScript خفيفة الوزن لبناء تجسيدات بيانات ثلاثية الأبعاد وتجارب علامات تجارية مكانية مباشرة في المتصفح دون الحاجة لمحرك ثلاثي الأبعاد ضخم.",
    tagsEn: ["WebGL / Three.js", "GLSL Shaders", "TypeScript", "Open Source"],
    tagsAr: ["WebGL / Three.js", "شادرز GLSL", "TypeScript", "مفتوح المصدر"],
  },
  {
    id: "LAB_003",
    status: "ACTIVE",
    statusColor: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
    icon: <Zap className="w-7 h-7 text-indigo-400" />,
    accentBorder: "border-indigo-500/30",
    accentBg: "bg-indigo-500/10",
    titleEn: "Real-Time Commerce Edge Architecture",
    titleAr: "معمارية التجارة الفورية عالية الأداء",
    descEn:
      "A distributed commerce infrastructure pattern achieving sub-30ms checkout, global multi-currency edge routing, and zero-downtime inventory synchronization at scale.",
    descAr:
      "نمط معمارية تجارية موزعة يحقق إتمام الشراء في أقل من 30ms، توجيه عالمي متعدد العملات، ومزامنة مخزون بدون أي توقف حتى في ذروة الضغط.",
    tagsEn: ["Edge Computing", "Redis", "GraphQL", "Next.js"],
    tagsAr: ["حوسبة حافة", "Redis", "GraphQL", "Next.js"],
  },
  {
    id: "LAB_004",
    status: "R&D",
    statusColor: "text-slate-400 border-slate-500/30 bg-slate-500/10",
    icon: <Sparkles className="w-7 h-7 text-rose-400" />,
    accentBorder: "border-rose-500/30",
    accentBg: "bg-rose-500/10",
    titleEn: "Generative Brand Systems Engine",
    titleAr: "محرك الهويات البصرية التوليدية",
    descEn:
      "Exploring AI-generated brand consistency systems — dynamic logo adaptation, typographic pairings, and color palettes that remain coherent across print, digital, and motion contexts.",
    descAr:
      "استكشاف أنظمة اتساق العلامة التجارية المولدة بالذكاء الاصطناعي — تكيف الشعار الديناميكي، اقتران الخطوط، ولوحات الألوان التي تبقى متسقة عبر الطباعة والرقمي والحركة.",
    tagsEn: ["Generative AI", "Brand Systems", "Vision Models", "R&D"],
    tagsAr: ["ذكاء اصطناعي توليدي", "أنظمة العلامات", "نماذج رؤية", "بحث وتطوير"],
  },
];

export default function LabsPage() {
  const { locale, isAr } = useLocale();
  const [isWizardOpen, setIsWizardOpen] = useState(false);

  return (
    <main
      dir={isAr ? "rtl" : "ltr"}
      className={`min-h-screen bg-[#07070A] text-white pt-28 pb-32 ${isAr ? "font-arabic" : "font-sans"}`}
    >
      <CustomCursor />
      <Header onOpenProjectBuilder={() => setIsWizardOpen(true)} />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Page Header */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/25 text-purple-400 text-xs font-mono mb-5 font-bold">
            <FlaskConical size={13} />
            <span>{isAr ? "ORDERLY LABS // الأبحاث والتجريب" : "ORDERLY LABS // RESEARCH & EXPERIMENTS"}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight text-white leading-tight mb-6">
            {isAr ? "هنا نبتكر. هنا نجرب. هنا تبدأ الأفكار." : "Where we experiment,\ninnovate, and build ahead."}
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed">
            {isAr
              ? "ORDERLY LABS هو مختبرنا الداخلي للأبحاث والتجريب — حيث نبني أدواتنا الخاصة، نختبر تقنيات الغد، وننشر مكتبات مفتوحة المصدر تخدم المطورين والمصممين حول العالم."
              : "ORDERLY LABS is our internal R&D sandbox — where we build proprietary tools, test tomorrow's technologies, and release open-source libraries that serve builders worldwide."}
          </p>
        </div>

        {/* Lab Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {LABS.map((lab) => (
            <div
              key={lab.id}
              className={`p-8 rounded-3xl bg-[#0C0D14] border ${lab.accentBorder} flex flex-col justify-between min-h-[280px] hover:shadow-xl transition-all duration-300 group`}
            >
              {/* Top row */}
              <div className="flex items-start justify-between mb-6">
                <div className={`p-3 rounded-2xl ${lab.accentBg} border ${lab.accentBorder}`}>
                  {lab.icon}
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border ${lab.statusColor}`}>
                    {lab.status}
                  </span>
                  <span className="text-xs font-mono text-slate-500 font-bold">{lab.id}</span>
                </div>
              </div>

              <div className="flex-1">
                <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-3 leading-snug">
                  {isAr ? lab.titleAr : lab.titleEn}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-5">
                  {isAr ? lab.descAr : lab.descEn}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-5 border-t border-white/10">
                {(isAr ? lab.tagsAr : lab.tagsEn).map((tag, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-slate-300">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Philosophy Strip */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#0C0D14] border border-white/10 text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-display font-black text-white mb-4">
            {isAr ? "الاستوديو الذي يبتكر ولا ينتظر" : "A studio that invents, not just executes."}
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed mb-8">
            {isAr
              ? "كل مشروع عميل يغذي تجربة Labs. وكل تجربة في Labs تُصبح ميزة لعملائنا. هذا ما يجعل ORDERLY أسرع وأذكى مع كل مشروع."
              : "Every client project feeds our Labs experiments. And every Labs experiment becomes a feature advantage for our clients. That's what makes ORDERLY faster and smarter with every project."}
          </p>
          <button
            type="button"
            onClick={() => setIsWizardOpen(true)}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-black font-mono font-bold text-xs uppercase tracking-wider hover:bg-slate-200 transition-all shadow-lg hover:scale-[1.02]"
          >
            {isAr ? "ابدأ مشروعك مع ORDERLY" : "Start a Project with ORDERLY"}
            <ArrowUpRight size={14} />
          </button>
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
