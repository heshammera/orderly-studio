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
  Volume2,
  VolumeX,
  Rotate3d,
} from "lucide-react";
import { ThreeWorldCanvas } from "./ThreeWorldCanvas";
import { WORLD_CONFIGS } from "./worlds-config";
import { worldAudio } from "./world-audio";
import type { WorldId } from "./WorldCanvas";

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
  const [isMuted, setIsMuted] = useState(false);

  const isAr = locale === "ar";

  useEffect(() => {
    setActiveWorld(worldId);
  }, [worldId]);

  const world = WORLD_CONFIGS[activeWorld] || WORLD_CONFIGS.uiux;

  // Open / Close animation & Spatial Audio Trigger
  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setVisible(true));
      });
      const t = setTimeout(() => setContentIn(true), 300);

      // Start procedural spatial audio for this world
      worldAudio.playWorldAmbience(activeWorld);

      return () => clearTimeout(t);
    } else {
      setContentIn(false);
      worldAudio.stopAmbience();
      const t = setTimeout(() => setVisible(false), 400);
      return () => clearTimeout(t);
    }
  }, [isOpen, activeWorld]);

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

  const handleToggleSound = () => {
    const muted = worldAudio.toggleMute();
    setIsMuted(muted);
  };

  if (!isOpen && !visible) return null;

  const realms: { id: WorldId; labelEn: string; labelAr: string; icon: React.ReactNode }[] = [
    { id: "uiux", labelEn: "UI/UX 3D", labelAr: "واجهات 3D", icon: <Layers size={13} /> },
    { id: "engineering", labelEn: "Cyber Core", labelAr: "مصفوفة برمجية", icon: <Cpu size={13} /> },
    { id: "branding", labelEn: "Gold Atelier", labelAr: "أتيليه الذهب", icon: <Palette size={13} /> },
    { id: "ai", labelEn: "Synaptic Cosmos", labelAr: "كون الذكاء", icon: <Sparkles size={13} /> },
    { id: "motion", labelEn: "Cinematic 3D", labelAr: "سينما 3D", icon: <Film size={13} /> },
    { id: "marketing", labelEn: "Data Globe", labelAr: "كوكب البيانات", icon: <TrendingUp size={13} /> },
  ];

  return (
    <div
      className={`fixed inset-0 z-[999] overflow-hidden transition-all duration-700 select-none bg-black ${
        visible ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
      }`}
      role="dialog"
      aria-modal="true"
      dir={isAr ? "rtl" : "ltr"}
    >
      {/* ── 100% Fullscreen Three.js WebGL 3D World ── */}
      <div className="absolute inset-0 z-0">
        <ThreeWorldCanvas worldId={activeWorld} />
      </div>

      {/* ── Ambient Radial Atmosphere Overlay ── */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/85 via-transparent to-black/60" />

      {/* ── Top Atmospheric HUD ── */}
      <header className="relative z-30 flex items-center justify-between px-6 md:px-12 py-6">
        {/* Left: 3D Dream Realm Identity */}
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
          <div className="flex flex-col">
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] font-bold text-white/90">
              ORDERLY // {isAr ? "عالم ثلاثي الأبعاد WebGL" : "SPATIAL 3D UNIVERSE"}
            </span>
            <span className="text-[10px] font-mono tracking-widest text-emerald-400/80">
              {isAr ? "انغماس مكاني كامل 60FPS" : "THREE.JS WEBGL ENGINE ∙ 60FPS"}
            </span>
          </div>
        </div>

        {/* Center: Realm Switcher Quick Bar */}
        <nav
          aria-label="Realm Switcher"
          className="hidden lg:flex items-center gap-1.5 p-1.5 rounded-full border border-white/10 bg-black/50 backdrop-blur-2xl shadow-2xl shadow-black/80"
        >
          {realms.map((r) => {
            const isCur = activeWorld === r.id;
            return (
              <button
                key={r.id}
                onClick={() => setActiveWorld(r.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-mono tracking-wider transition-all duration-300 ${
                  isCur
                    ? "bg-white text-black font-bold shadow-md shadow-white/20"
                    : "text-white/50 hover:text-white hover:bg-white/10"
                }`}
              >
                {r.icon}
                <span>{isAr ? r.labelAr : r.labelEn}</span>
              </button>
            );
          })}
        </nav>

        {/* Right: Sound, Minimal Mode & Close */}
        <div className="flex items-center gap-2.5">
          {/* Spatial Audio Toggle */}
          <button
            onClick={handleToggleSound}
            className={`p-2.5 rounded-full border border-white/15 bg-black/40 backdrop-blur-md transition-all ${
              isMuted ? "text-white/40" : "text-emerald-400 border-emerald-500/40 shadow-lg shadow-emerald-500/10"
            }`}
            title={isMuted ? "Unmute Spatial Ambience" : "Mute Spatial Ambience"}
          >
            {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
          </button>

          {/* Toggle Minimal / Focus View */}
          <button
            onClick={() => setIsMinimalMode(!isMinimalMode)}
            className="p-2.5 rounded-full border border-white/15 bg-black/40 backdrop-blur-md text-white/70 hover:text-white hover:border-white/40 transition-all"
            title={isMinimalMode ? "Show HUD" : "Zen Immersion Mode"}
          >
            {isMinimalMode ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
          </button>

          {/* Close button */}
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-full border border-white/20 bg-white/10 text-xs font-mono tracking-widest uppercase flex items-center gap-2 backdrop-blur-md text-white hover:bg-white hover:text-black hover:border-white transition-all"
          >
            <X size={14} />
            <span className="hidden sm:inline">{isAr ? "خروج" : "EXIT REALM"}</span>
          </button>
        </div>
      </header>

      {/* ── Main Holographic Floating Stage ── */}
      <main
        className={`relative z-20 max-w-7xl mx-auto px-6 md:px-12 h-[calc(100vh-160px)] flex flex-col justify-between transition-all duration-500 pointer-events-none ${
          isMinimalMode ? "opacity-0 translate-y-8" : "opacity-100"
        }`}
      >
        {/* Floating Narrative Hero Card (pointer-events-auto for clicks) */}
        <div
          className={`pointer-events-auto max-w-xl mt-2 sm:mt-6 p-6 sm:p-9 rounded-[28px] border border-white/15 bg-black/60 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.85)] text-white transition-all duration-700 ${
            contentIn ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6"
          }`}
        >
          {/* Badge */}
          <div className="flex items-center gap-2.5 mb-3.5">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase border ${world.accentBg} ${world.accentBorder} ${world.accentColor}`}
            >
              <Compass size={11} className="animate-spin" style={{ animationDuration: "12s" }} />
              <span>{isAr ? world.labelAr : world.label}</span>
            </span>

            <span className="text-[10px] font-mono tracking-widest uppercase text-white/35">
              // {isAr ? world.taglineAr : world.tagline}
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-2xl sm:text-4xl font-display font-black tracking-tight leading-[1.15] mb-3 text-white">
            {isAr ? world.taglineAr : world.tagline}
          </h1>

          {/* Description */}
          <p className="text-xs sm:text-sm leading-relaxed mb-5 font-normal text-white/70">
            {isAr ? world.descriptionAr : world.description}
          </p>

          {/* Holographic Stats Grid */}
          <div className="grid grid-cols-3 gap-2.5 p-3.5 rounded-2xl border border-white/10 bg-white/[0.03] mb-5">
            {world.stats.map((st, idx) => (
              <div key={idx} className="text-center">
                <span className={`text-lg sm:text-xl font-display font-black block tracking-tight ${world.accentColor}`}>
                  {st.value}
                </span>
                <span className="text-[9px] font-mono uppercase tracking-wider block mt-0.5 text-white/40">
                  {isAr ? st.labelAr : st.labelEn}
                </span>
              </div>
            ))}
          </div>

          {/* Capabilities Tags */}
          <div className="flex flex-wrap gap-1.5">
            {world.capabilities.slice(0, 4).map((cap, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-lg text-[10px] font-medium border border-white/10 bg-white/5 text-white/80"
              >
                {isAr ? cap.ar : cap.en}
              </span>
            ))}
          </div>
        </div>

        {/* ── Bottom Floating Action Deck ── */}
        <footer
          className={`pointer-events-auto flex flex-col sm:flex-row items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl border border-white/15 bg-black/70 backdrop-blur-2xl text-white shadow-2xl transition-all duration-700 ${
            contentIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
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
                    ? "bg-white text-black border-white font-bold"
                    : "border-white/10 text-white/60"
                }`}
              >
                {isAr ? r.labelAr : r.labelEn}
              </button>
            ))}
          </div>

          <div className="hidden sm:flex items-center gap-3 text-xs font-mono text-white/60">
            <span className="flex items-center gap-1 text-emerald-400">
              <Rotate3d size={13} />
              <span>{isAr ? "اسحب الماوس للدوران في الفضاء 3D" : "DRAG MOUSE TO ROTATE 3D SPACE"}</span>
            </span>
            <span>•</span>
            <span>[ESC] {isAr ? "للخروج" : "TO EXIT"}</span>
          </div>

          {/* Launch Project Brief inside this 3D World */}
          <button
            onClick={() => {
              onClose();
              if (onOpenProjectBuilder) {
                setTimeout(() => onOpenProjectBuilder(activeWorld), 350);
              }
            }}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full font-bold text-xs tracking-widest uppercase flex items-center justify-center gap-3 transition-all duration-300 shadow-xl bg-white text-black hover:bg-neutral-200 shadow-white/20"
          >
            <span>
              {isAr
                ? `ابدأ مشروعك في عالم ${world.labelAr.split(" ")[0]}`
                : `LAUNCH BRIEF IN THIS 3D UNIVERSE`}
            </span>
            <ArrowUpRight size={15} />
          </button>
        </footer>
      </main>
    </div>
  );
};
