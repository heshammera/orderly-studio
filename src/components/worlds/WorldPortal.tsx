"use client";

import React, { useEffect, useState } from "react";
import {
  X,
  ArrowUpRight,
  Sparkles,
  ChevronRight,
  Layers,
  Cpu,
  Palette,
  Film,
  TrendingUp,
  Maximize2,
  Minimize2,
  Compass,
} from "lucide-react";
import { WorldCanvas, type WorldId } from "./WorldCanvas";
import { WORLD_CONFIGS } from "./worlds-config";

interface WorldPortalProps {
  worldId: WorldId;
  isOpen: boolean;
  onClose: () => void;
  locale: "en" | "ar";
  onOpenProjectBuilder?: (worldId?: WorldId) => void;
}

export const WorldPortal: React.FC<WorldPortalProps> = ({
  worldId,
  isOpen,
  onClose,
  locale,
  onOpenProjectBuilder,
}) => {
  const [activeWorld, setActiveWorld] = useState<WorldId>(worldId);
  const [visible, setVisible] = useState(false);
  const [contentIn, setContentIn] = useState(false);
  const [isMinimalMode, setIsMinimalMode] = useState(false);

  const isAr = locale === "ar";

  useEffect(() => {
    setActiveWorld(worldId);
  }, [worldId]);

  const world = WORLD_CONFIGS[activeWorld] || WORLD_CONFIGS.uiux;
  const isLightWorld = activeWorld === "uiux";

  // Open / Close animation
  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setVisible(true));
      });
      const t = setTimeout(() => setContentIn(true), 300);
      return () => clearTimeout(t);
    } else {
      setContentIn(false);
      const t = setTimeout(() => setVisible(false), 400);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  // ESC key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen && !visible) return null;

  const realms: { id: WorldId; labelEn: string; labelAr: string; icon: React.ReactNode }[] = [
    { id: "uiux", labelEn: "UI/UX", labelAr: "واجهات", icon: <Layers size={13} /> },
    { id: "engineering", labelEn: "Engineering", labelAr: "برمجيات", icon: <Cpu size={13} /> },
    { id: "branding", labelEn: "Branding", labelAr: "هوية", icon: <Palette size={13} /> },
    { id: "ai", labelEn: "AI Neural", labelAr: "ذكاء اصطناعي", icon: <Sparkles size={13} /> },
    { id: "motion", labelEn: "Motion 3D", labelAr: "موشن 3D", icon: <Film size={13} /> },
    { id: "marketing", labelEn: "Marketing", labelAr: "تسويق", icon: <TrendingUp size={13} /> },
  ];

  return (
    <div
      className={`fixed inset-0 z-[999] overflow-hidden transition-all duration-700 select-none ${
        visible ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
      }`}
      role="dialog"
      aria-modal="true"
      dir={isAr ? "rtl" : "ltr"}
    >
      {/* ── 100% Fullscreen Dream World Canvas ── */}
      <div className="absolute inset-0 z-0">
        <WorldCanvas worldId={activeWorld} />
      </div>

      {/* ── Ambient Radial Atmosphere Overlay ── */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${
          isLightWorld
            ? "bg-gradient-to-t from-violet-950/10 via-transparent to-white/40"
            : "bg-gradient-to-t from-black/80 via-transparent to-black/60"
        }`}
      />

      {/* ── Top Atmospheric HUD ── */}
      <header className="relative z-30 flex items-center justify-between px-6 md:px-12 py-6">
        {/* Left: Dream Realm Identity */}
        <div className="flex items-center gap-3">
          <div
            className={`w-3 h-3 rounded-full animate-ping ${
              isLightWorld ? "bg-violet-600" : "bg-white"
            }`}
          />
          <div className="flex flex-col">
            <span
              className={`font-mono text-[11px] uppercase tracking-[0.3em] font-bold ${
                isLightWorld ? "text-violet-950/80" : "text-white/80"
              }`}
            >
              ORDERLY // {isAr ? "عالم الأحلام التفاعلي" : "DREAM REALM"}
            </span>
            <span
              className={`text-[10px] font-mono tracking-widest ${
                isLightWorld ? "text-violet-900/50" : "text-white/40"
              }`}
            >
              {isAr ? "الانغماس الكامل" : "FULL IMMERSION MODE"} ∙ 60FPS
            </span>
          </div>
        </div>

        {/* Center: Realm Switcher Quick Bar */}
        <nav
          aria-label="Realm Switcher"
          className={`hidden lg:flex items-center gap-1.5 p-1.5 rounded-full border backdrop-blur-2xl transition-all duration-300 ${
            isLightWorld
              ? "bg-white/70 border-violet-200/80 shadow-lg shadow-violet-500/5"
              : "bg-black/40 border-white/10 shadow-2xl shadow-black/80"
          }`}
        >
          {realms.map((r) => {
            const isCur = activeWorld === r.id;
            return (
              <button
                key={r.id}
                onClick={() => setActiveWorld(r.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-mono tracking-wider transition-all duration-300 ${
                  isCur
                    ? isLightWorld
                      ? "bg-violet-600 text-white font-bold shadow-md shadow-violet-600/30"
                      : "bg-white text-black font-bold shadow-md shadow-white/20"
                    : isLightWorld
                    ? "text-violet-950/60 hover:text-violet-950 hover:bg-violet-100/50"
                    : "text-white/50 hover:text-white hover:bg-white/10"
                }`}
              >
                {r.icon}
                <span>{isAr ? r.labelAr : r.labelEn}</span>
              </button>
            );
          })}
        </nav>

        {/* Right: Controls & Close */}
        <div className="flex items-center gap-3">
          {/* Toggle Minimal / Focus View */}
          <button
            onClick={() => setIsMinimalMode(!isMinimalMode)}
            className={`p-2.5 rounded-full border backdrop-blur-md transition-all ${
              isLightWorld
                ? "bg-white/60 border-violet-200 text-violet-900 hover:bg-white"
                : "bg-black/40 border-white/15 text-white/70 hover:text-white hover:border-white/40"
            }`}
            title={isMinimalMode ? "Show HUD" : "Zen Immersion Mode"}
          >
            {isMinimalMode ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>

          {/* Close button */}
          <button
            onClick={onClose}
            className={`px-4 py-2 rounded-full border text-xs font-mono tracking-widest uppercase flex items-center gap-2 backdrop-blur-md transition-all ${
              isLightWorld
                ? "bg-violet-950 text-white border-violet-900 hover:bg-violet-900 shadow-lg"
                : "bg-white/10 border-white/20 text-white hover:bg-white hover:text-black hover:border-white"
            }`}
          >
            <X size={14} />
            <span className="hidden sm:inline">{isAr ? "خروج" : "EXIT REALM"}</span>
          </button>
        </div>
      </header>

      {/* ── Main Holographic Floating Stage ── */}
      <main
        className={`relative z-20 max-w-7xl mx-auto px-6 md:px-12 h-[calc(100vh-160px)] flex flex-col justify-between transition-all duration-500 ${
          isMinimalMode ? "opacity-0 pointer-events-none translate-y-8" : "opacity-100"
        }`}
      >
        {/* Floating Narrative Hero Card */}
        <div
          className={`max-w-2xl mt-4 sm:mt-8 p-6 sm:p-10 rounded-[28px] border backdrop-blur-2xl shadow-2xl transition-all duration-700 ${
            contentIn ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6"
          } ${
            isLightWorld
              ? "bg-white/80 border-violet-300/60 shadow-[0_20px_60px_rgba(109,40,217,0.12)] text-violet-950"
              : "bg-black/50 border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.8)] text-white"
          }`}
        >
          {/* Badge */}
          <div className="flex items-center gap-2.5 mb-4">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase border ${
                isLightWorld
                  ? "bg-violet-100 text-violet-700 border-violet-300"
                  : `${world.accentBg} ${world.accentBorder} ${world.accentColor}`
              }`}
            >
              <Compass size={11} className="animate-spin" style={{ animationDuration: "12s" }} />
              <span>{isAr ? world.labelAr : world.label}</span>
            </span>

            <span
              className={`text-[10px] font-mono tracking-widest uppercase ${
                isLightWorld ? "text-violet-900/40" : "text-white/30"
              }`}
            >
              // {isAr ? world.taglineAr : world.tagline}
            </span>
          </div>

          {/* Headline */}
          <h1
            className={`text-3xl sm:text-5xl font-display font-black tracking-tight leading-[1.1] mb-4 ${
              isLightWorld ? "text-violet-950" : "text-white"
            }`}
          >
            {isAr ? world.taglineAr : world.tagline}
          </h1>

          {/* Description */}
          <p
            className={`text-sm sm:text-base leading-relaxed mb-6 font-normal ${
              isLightWorld ? "text-violet-900/75" : "text-white/70"
            }`}
          >
            {isAr ? world.descriptionAr : world.description}
          </p>

          {/* Holographic Stats Grid */}
          <div
            className={`grid grid-cols-3 gap-3 p-4 rounded-2xl border mb-6 ${
              isLightWorld
                ? "bg-violet-50/80 border-violet-200/80"
                : "bg-white/[0.03] border-white/10"
            }`}
          >
            {world.stats.map((st, idx) => (
              <div key={idx} className="text-center">
                <span
                  className={`text-xl sm:text-2xl font-display font-black block tracking-tight ${
                    isLightWorld ? "text-violet-700" : world.accentColor
                  }`}
                >
                  {st.value}
                </span>
                <span
                  className={`text-[10px] font-mono uppercase tracking-wider block mt-0.5 ${
                    isLightWorld ? "text-violet-900/50" : "text-white/40"
                  }`}
                >
                  {isAr ? st.labelAr : st.labelEn}
                </span>
              </div>
            ))}
          </div>

          {/* Capabilities Tags */}
          <div className="flex flex-wrap gap-2">
            {world.capabilities.slice(0, 4).map((cap, i) => (
              <span
                key={i}
                className={`px-3 py-1 rounded-lg text-[11px] font-medium border transition-colors ${
                  isLightWorld
                    ? "bg-violet-100/70 border-violet-200 text-violet-900"
                    : "bg-white/5 border-white/10 text-white/80 hover:border-white/30"
                }`}
              >
                {isAr ? cap.ar : cap.en}
              </span>
            ))}
          </div>
        </div>

        {/* ── Bottom Floating Action Deck ── */}
        <footer
          className={`flex flex-col sm:flex-row items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl border backdrop-blur-2xl transition-all duration-700 ${
            contentIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          } ${
            isLightWorld
              ? "bg-white/80 border-violet-200 text-violet-950 shadow-xl"
              : "bg-black/60 border-white/15 text-white shadow-2xl"
          }`}
        >
          {/* Mobile Realm Switcher Bar */}
          <div className="flex lg:hidden items-center gap-2 overflow-x-auto w-full pb-2 sm:pb-0">
            {realms.map((r) => (
              <button
                key={r.id}
                onClick={() => setActiveWorld(r.id)}
                className={`px-3 py-1.5 rounded-full text-[10px] font-mono flex-shrink-0 border ${
                  activeWorld === r.id
                    ? isLightWorld
                      ? "bg-violet-600 text-white border-violet-600 font-bold"
                      : "bg-white text-black border-white font-bold"
                    : isLightWorld
                    ? "border-violet-200 text-violet-900"
                    : "border-white/10 text-white/60"
                }`}
              >
                {isAr ? r.labelAr : r.labelEn}
              </button>
            ))}
          </div>

          <div className="hidden sm:flex items-center gap-3 text-xs font-mono opacity-60">
            <span>[ESC] {isAr ? "للخروج في أي وقت" : "TO EXIT"}</span>
            <span>•</span>
            <span>{isAr ? "حرك الماوس للتفاعل ثلاثي الأبعاد" : "MOVE CURSOR FOR 3D PARALLAX"}</span>
          </div>

          {/* Launch Project Brief inside this World */}
          <button
            onClick={() => {
              onClose();
              if (onOpenProjectBuilder) {
                setTimeout(() => onOpenProjectBuilder(activeWorld), 350);
              }
            }}
            className={`w-full sm:w-auto px-8 py-3.5 rounded-full font-bold text-xs tracking-widest uppercase flex items-center justify-center gap-3 transition-all duration-300 shadow-xl ${
              isLightWorld
                ? "bg-violet-600 text-white hover:bg-violet-700 shadow-violet-600/30"
                : "bg-white text-black hover:bg-neutral-200 shadow-white/20"
            }`}
          >
            <span>
              {isAr
                ? `ابدأ مشروعك في عالم ${world.labelAr.split(" ")[0]}`
                : `LAUNCH BRIEF IN THIS UNIVERSE`}
            </span>
            <ArrowUpRight size={15} />
          </button>
        </footer>
      </main>
    </div>
  );
};
