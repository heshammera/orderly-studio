"use client";

import React, { useState } from "react";
import {
  Palette,
  Sparkles,
  Type,
  ArrowUpRight,
  Layers,
  Check,
  RotateCw,
} from "lucide-react";

interface BrandingSandboxProps {
  locale: "en" | "ar";
  onStartProject?: () => void;
}

export const BrandingSandbox: React.FC<BrandingSandboxProps> = ({ locale, onStartProject }) => {
  const isAr = locale === "ar";
  const [brandName, setBrandName] = useState(isAr ? "أوردرلي" : "MERIDIAN");
  const [fontStyle, setFontStyle] = useState<"serif" | "modern" | "kinetic">("serif");
  const [foilColor, setFoilColor] = useState<"gold" | "silver" | "copper">("gold");
  const [tagline, setTagline] = useState(isAr ? "استوديو الإبداع والتقنية الفاخرة" : "LUXURY CREATIVE TECHNOLOGY");

  const foilClasses = {
    gold: "from-amber-200 via-amber-400 to-yellow-600 text-amber-300 drop-shadow-[0_2px_12px_rgba(245,158,11,0.5)]",
    silver: "from-slate-100 via-slate-300 to-slate-500 text-slate-200 drop-shadow-[0_2px_12px_rgba(203,213,225,0.5)]",
    copper: "from-rose-300 via-amber-600 to-rose-700 text-rose-300 drop-shadow-[0_2px_12px_rgba(244,63,94,0.5)]",
  };

  const fontFamilies = {
    serif: "font-serif tracking-wider",
    modern: "font-sans font-black tracking-tighter uppercase",
    kinetic: "font-mono font-bold tracking-[0.25em] uppercase",
  };

  return (
    <div
      className="w-full max-w-5xl mx-auto rounded-[32px] border border-amber-500/30 bg-[#0E0802]/95 text-white shadow-[0_30px_90px_rgba(0,0,0,0.9)] overflow-hidden"
      dir={isAr ? "rtl" : "ltr"}
    >
      {/* ── Top Bar ── */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-amber-500/20 bg-amber-950/20">
        <div className="flex items-center gap-3">
          <Sparkles size={16} className="text-amber-400" />
          <span className="text-xs font-mono font-bold tracking-widest text-amber-400 uppercase">
            ORDERLY BRAND ATELIER // {isAr ? "مختبر الهوية والعلامات التجارية الفاخرة" : "LUXURY IDENTITY LAB"}
          </span>
        </div>
        <span className="text-xs font-mono text-amber-200/50">360° BRAND ARCHITECTURE</span>
      </div>

      {/* ── Live Interactive Workshop ── */}
      <div className="p-6 md:p-8 space-y-6">
        {/* Input & Customizer Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Brand Name Input */}
          <div className="p-5 rounded-2xl border border-amber-500/20 bg-amber-950/20 md:col-span-2">
            <label className="block text-xs font-mono text-amber-300/70 uppercase tracking-wider mb-2 font-bold">
              {isAr ? "اكتب اسم علامتك التجارية وشاهدها بالذهب حياً" : "ENTER YOUR BRAND / COMPANY NAME"}
            </label>
            <input
              type="text"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              placeholder={isAr ? "اسم شركتك..." : "e.g. AURA, VORTEX, MERIDIAN..."}
              className="w-full px-4 py-3 rounded-xl bg-black/40 border border-amber-500/30 text-white text-lg font-bold placeholder:text-amber-200/30 focus:outline-none focus:border-amber-400"
            />
          </div>

          {/* Foil Finish Selector */}
          <div className="p-5 rounded-2xl border border-amber-500/20 bg-amber-950/20">
            <span className="block text-xs font-mono text-amber-300/70 uppercase tracking-wider mb-2 font-bold">
              {isAr ? "خامة رقائق الطباعة" : "METALLIC FOIL FINISH"}
            </span>
            <div className="flex items-center gap-2 mt-2">
              {(["gold", "silver", "copper"] as const).map((foil) => (
                <button
                  key={foil}
                  onClick={() => setFoilColor(foil)}
                  className={`flex-1 py-2 rounded-xl text-xs font-mono capitalize border transition-all ${
                    foilColor === foil
                      ? "border-amber-400 bg-amber-500/20 text-white font-bold"
                      : "border-white/10 bg-black/30 text-white/60 hover:border-white/25"
                  }`}
                >
                  {foil}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Typography Style Switcher */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-xs font-mono text-amber-300/60 uppercase">
            {isAr ? "النمط الطباعي:" : "Typography Discipline:"}
          </span>
          {(["serif", "modern", "kinetic"] as const).map((style) => (
            <button
              key={style}
              onClick={() => setFontStyle(style)}
              className={`px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider border transition-all ${
                fontStyle === style
                  ? "border-amber-400 bg-amber-400 text-black font-bold shadow-lg shadow-amber-400/20"
                  : "border-amber-500/20 bg-amber-950/20 text-amber-200/60 hover:text-white"
              }`}
            >
              {style === "serif" ? "Haute Couture Serif" : style === "modern" ? "Swiss Neugrotesk" : "Monospace Kinetic"}
            </button>
          ))}
        </div>

        {/* ── Live Luxury Mockup Display Studio ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Mockup 01: Embossed Gold Foil Card */}
          <div className="p-8 sm:p-12 rounded-3xl border border-amber-500/30 bg-gradient-to-br from-[#1c1206] via-[#100902] to-black relative overflow-hidden flex flex-col justify-between min-h-[260px] shadow-2xl group hover:border-amber-400/60 transition-all">
            {/* Texture overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />

            <div className="flex items-center justify-between relative z-10">
              <span className="text-[10px] font-mono tracking-[0.3em] text-amber-300/40 uppercase">
                PARIS ∙ MILAN ∙ RIYADH
              </span>
              <div className="w-6 h-6 rounded-full border border-amber-400/40 flex items-center justify-center text-amber-400 text-[10px] font-bold">
                {brandName.charAt(0) || "O"}
              </div>
            </div>

            {/* Central Embossed Foil Title */}
            <div className="my-auto py-6 relative z-10 text-center">
              <h2
                className={`text-3xl sm:text-5xl font-black bg-clip-text bg-gradient-to-r transition-all duration-300 ${foilClasses[foilColor]} ${fontFamilies[fontStyle]}`}
              >
                {brandName || "ORDERLY"}
              </h2>
              <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-amber-100/50 mt-3 block">
                {tagline}
              </span>
            </div>

            <div className="flex items-center justify-between relative z-10 text-[10px] font-mono text-amber-300/40">
              <span>EST. 2026</span>
              <span>SPECIAL PRINT EDITION</span>
            </div>
          </div>

          {/* Mockup 02: Luxury Monogram & Identity Guidelines Spec */}
          <div className="p-8 rounded-3xl border border-amber-500/20 bg-amber-950/10 flex flex-col justify-between space-y-6">
            <div>
              <span className="text-xs font-mono text-amber-300/70 uppercase tracking-wider block mb-4 font-bold">
                {isAr ? "دليل معمارية الهوية البصرية" : "BRAND IDENTITY SYSTEM SPEC"}
              </span>

              {/* Color Swatches */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#0E0802] border border-amber-500/30 flex-shrink-0" />
                  <div className="text-xs font-mono">
                    <span className="font-bold block">Obsidian Noir</span>
                    <span className="text-white/40">#0E0802 ∙ Primary Dark</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#F59E0B] border border-amber-300 flex-shrink-0" />
                  <div className="text-xs font-mono">
                    <span className="font-bold block">Imperial Gold Leaf</span>
                    <span className="text-white/40">#F59E0B ∙ Metallic Accent</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#FAF8F5] border border-white flex-shrink-0" />
                  <div className="text-xs font-mono">
                    <span className="font-bold block">Alabaster Cream</span>
                    <span className="text-white/40">#FAF8F5 ∙ Tactile Paper</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-amber-500/20 flex items-center justify-between text-xs font-mono text-amber-300/60">
              <span>{isAr ? "تغطية شاملة لكل نقاط الاتصال 360°" : "360° TOUCHPOINT READY"}</span>
              <span className="text-amber-400">VECTOR SVG / PRINT CMYK</span>
            </div>
          </div>
        </div>

        {/* Bottom Conversion Bridge */}
        <div className="p-6 rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-950/60 via-amber-900/20 to-transparent flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-obsidian flex items-center justify-center flex-shrink-0 font-bold shadow-lg shadow-amber-400/30">
              <Palette size={20} />
            </div>
            <div>
              <h5 className="text-sm font-bold text-white">
                {isAr ? "تريد بناء هوية بصرية فاخرة تجعل علامتك أيقونة لا تُنسى؟" : "Ready to build a commanding brand identity?"}
              </h5>
              <p className="text-xs text-amber-200/60">
                {isAr
                  ? "نصمم استراتيجيات التموضع، الشعارات، والخطوط والكتالوجات لأرقى العلامات التجارية العالمية."
                  : "We architect full-spectrum brand identity systems that capture luxury market share."}
              </p>
            </div>
          </div>

          {onStartProject && (
            <button
              onClick={onStartProject}
              className="px-6 py-3 rounded-full bg-amber-400 hover:bg-amber-300 text-obsidian font-bold text-xs font-mono uppercase tracking-wider flex items-center gap-2 transition-all shadow-xl shadow-amber-400/20 flex-shrink-0"
            >
              <span>{isAr ? "ابنِ هويتي التجارية" : "CRAFT MY BRAND"}</span>
              <ArrowUpRight size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
