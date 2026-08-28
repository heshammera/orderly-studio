"use client";

import React, { useEffect, useState } from "react";
import {
  X,
  Sparkles,
  Layers,
  Cpu,
  Palette,
  Film,
  TrendingUp,
  Maximize2,
  Minimize2,
  Volume2,
  VolumeX,
} from "lucide-react";
import { ThreeWorldCanvas } from "./ThreeWorldCanvas";
import { worldAudio } from "./world-audio";
import { UIUXSandbox } from "@/components/sandboxes/UIUXSandbox";
import { EngineeringSandbox } from "@/components/sandboxes/EngineeringSandbox";
import { BrandingSandbox } from "@/components/sandboxes/BrandingSandbox";
import { AISandbox } from "@/components/sandboxes/AISandbox";
import { MotionSandbox } from "@/components/sandboxes/MotionSandbox";
import { MarketingSandbox } from "@/components/sandboxes/MarketingSandbox";
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
  const [isMinimalMode, setIsMinimalMode] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const isAr = locale === "ar";

  useEffect(() => {
    setActiveWorld(worldId);
  }, [worldId]);

  // Open / Close animation & Spatial Audio Trigger
  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setVisible(true));
      });
      worldAudio.playWorldAmbience(activeWorld);
    } else {
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

  const handleStartProject = () => {
    onClose();
    if (onOpenProjectBuilder) {
      setTimeout(() => onOpenProjectBuilder(activeWorld), 350);
    }
  };

  if (!isOpen && !visible) return null;

  const realms: { id: WorldId; labelEn: string; labelAr: string; icon: React.ReactNode }[] = [
    { id: "uiux", labelEn: "UI/UX OS", labelAr: "واجهات وتطبيقات", icon: <Layers size={13} /> },
    { id: "engineering", labelEn: "Cloud Systems", labelAr: "أنظمة سحابية", icon: <Cpu size={13} /> },
    { id: "branding", labelEn: "Brand Atelier", labelAr: "أتيليه الهوية", icon: <Palette size={13} /> },
    { id: "ai", labelEn: "AI Neural Lab", labelAr: "مختبر الذكاء", icon: <Sparkles size={13} /> },
    { id: "motion", labelEn: "3D Motion Rig", labelAr: "محرر 3D وموشن", icon: <Film size={13} /> },
    { id: "marketing", labelEn: "Growth Engine", labelAr: "محرك النمو", icon: <TrendingUp size={13} /> },
  ];

  return (
    <div
      className={`fixed inset-0 z-[999] overflow-y-auto transition-all duration-700 select-none bg-black/95 backdrop-blur-3xl ${
        visible ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
      }`}
      role="dialog"
      aria-modal="true"
      dir={isAr ? "rtl" : "ltr"}
    >
      {/* ── Background Three.js WebGL 3D Ambience ── */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
        <ThreeWorldCanvas worldId={activeWorld} />
      </div>

      {/* ── Top Atmospheric HUD ── */}
      <header className="sticky top-0 z-30 flex items-center justify-between px-6 md:px-12 py-5 bg-black/60 backdrop-blur-xl border-b border-white/10">
        {/* Left: Studio Identity */}
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <div className="flex flex-col">
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] font-bold text-white/90">
              ORDERLY // {isAr ? "مختبر التجربة التفاعلية الحية" : "LIVE INTERACTIVE SANDBOX"}
            </span>
            <span className="text-[10px] font-mono tracking-widest text-emerald-400">
              {isAr ? "جرب المنتجات بنفسك في الوقت الفعلي" : "INTERACTIVE REAL-TIME ENVIRONMENT"}
            </span>
          </div>
        </div>

        {/* Center: Realm Switcher Quick Bar */}
        <nav
          aria-label="Realm Switcher"
          className="hidden lg:flex items-center gap-1.5 p-1.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-2xl"
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

          {/* Toggle Minimal Mode */}
          <button
            onClick={() => setIsMinimalMode(!isMinimalMode)}
            className="p-2.5 rounded-full border border-white/15 bg-black/40 backdrop-blur-md text-white/70 hover:text-white hover:border-white/40 transition-all"
            title={isMinimalMode ? "Show Sandbox UI" : "Fullscreen 3D Mode"}
          >
            {isMinimalMode ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
          </button>

          {/* Close button */}
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-full border border-white/20 bg-white/10 text-xs font-mono tracking-widest uppercase flex items-center gap-2 backdrop-blur-md text-white hover:bg-white hover:text-black hover:border-white transition-all"
          >
            <X size={14} />
            <span className="hidden sm:inline">{isAr ? "خروج" : "EXIT LAB"}</span>
          </button>
        </div>
      </header>

      {/* ── Main Dynamic Interactive Sandbox Stage ── */}
      <main className="relative z-20 max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
        {/* Mobile Realm Switcher Bar */}
        <div className="flex lg:hidden items-center gap-2 overflow-x-auto w-full pb-4 mb-6">
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

        {/* Render the Active Real-World Live Sandbox */}
        {!isMinimalMode && (
          <div className="animate-in fade-in zoom-in-95 duration-500">
            {activeWorld === "uiux" && (
              <UIUXSandbox locale={locale} onStartProject={handleStartProject} />
            )}
            {(activeWorld === "engineering" || activeWorld === "saas") && (
              <EngineeringSandbox locale={locale} onStartProject={handleStartProject} />
            )}
            {(activeWorld === "branding" || activeWorld === "packaging") && (
              <BrandingSandbox locale={locale} onStartProject={handleStartProject} />
            )}
            {activeWorld === "ai" && (
              <AISandbox locale={locale} onStartProject={handleStartProject} />
            )}
            {activeWorld === "motion" && (
              <MotionSandbox locale={locale} onStartProject={handleStartProject} />
            )}
            {(activeWorld === "marketing" || activeWorld === "ecommerce") && (
              <MarketingSandbox locale={locale} onStartProject={handleStartProject} />
            )}
          </div>
        )}
      </main>
    </div>
  );
};
