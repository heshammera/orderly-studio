"use client";

import React, { useEffect, useRef, useState } from "react";
import { X, ArrowUpRight, ChevronRight, Zap } from "lucide-react";
import { WorldCanvas, type WorldId } from "./WorldCanvas";
import { WORLD_CONFIGS } from "./worlds-config";

interface WorldPortalProps {
  worldId: WorldId;
  isOpen: boolean;
  onClose: () => void;
  locale: "en" | "ar";
  onOpenProjectBuilder?: () => void;
}

export const WorldPortal: React.FC<WorldPortalProps> = ({
  worldId,
  isOpen,
  onClose,
  locale,
  onOpenProjectBuilder,
}) => {
  const isAr = locale === "ar";
  const [visible, setVisible] = useState(false);
  const [contentIn, setContentIn] = useState(false);
  const world = WORLD_CONFIGS[worldId];

  /* ── Portal open / close animation ── */
  useEffect(() => {
    if (isOpen) {
      // Tiny delay so browser paints the initial state before animating
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setVisible(true));
      });
      setTimeout(() => setContentIn(true), 350);
    } else {
      setContentIn(false);
      setTimeout(() => setVisible(false), 300);
    }
  }, [isOpen]);

  /* ── ESC key to close ── */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  /* ── Body scroll lock ── */
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

  return (
    <div
      className={`fixed inset-0 z-[999] flex flex-col md:flex-row overflow-hidden transition-all duration-500 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      role="dialog"
      aria-modal="true"
    >
      {/* ── Canvas World Panel (left / top on mobile) ── */}
      <div
        className={`relative flex-1 md:w-[55%] md:flex-none overflow-hidden min-h-[40vh] md:min-h-0 transition-transform duration-500 ${
          visible ? "translate-y-0 md:translate-x-0" : "translate-y-8 md:-translate-x-8"
        } ${world.bg}`}
      >
        {/* Canvas fills entire panel */}
        <WorldCanvas worldId={worldId} />

        {/* World label floating top-left */}
        <div
          className={`absolute top-6 left-6 rtl:left-auto rtl:right-6 z-10 transition-all duration-500 delay-200 ${
            contentIn ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3"
          }`}
        >
          <div
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] font-mono font-bold tracking-widest uppercase ${world.accentBg} ${world.accentBorder} ${world.accentColor}`}
          >
            <Zap size={10} />
            <span>{isAr ? world.labelAr : world.label}</span>
          </div>
        </div>

        {/* Large tagline over canvas, bottom */}
        <div
          className={`absolute bottom-6 left-6 rtl:left-auto rtl:right-6 right-6 z-10 transition-all duration-500 delay-300 ${
            contentIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <p className={`text-2xl md:text-3xl font-display font-black ${world.accentColor} opacity-40 tracking-wide uppercase`}>
            {isAr ? world.taglineAr : world.tagline}
          </p>
        </div>

        {/* Close button (top-right) */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 rtl:right-auto rtl:left-5 z-20 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm border border-white/15 flex items-center justify-center text-white/70 hover:text-white hover:border-white/40 transition-all"
          aria-label="Close portal"
        >
          <X size={16} />
        </button>
      </div>

      {/* ── Content Panel (right / bottom on mobile) ── */}
      <div
        className={`relative w-full md:w-[45%] flex flex-col bg-[#09090C] border-l border-white/[0.06] overflow-y-auto transition-all duration-500 delay-150 ${
          contentIn ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8 rtl:-translate-x-8"
        }`}
        dir={isAr ? "rtl" : "ltr"}
      >
        <div className="flex flex-col gap-8 p-7 md:p-10 flex-1">
          {/* Header */}
          <div>
            <div
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] font-mono font-bold tracking-widest uppercase mb-4 ${world.accentBg} ${world.accentBorder} ${world.accentColor}`}
            >
              <span>{isAr ? "عالم" : "WORLD"}</span>
              <ChevronRight size={10} />
              <span>{isAr ? world.labelAr.split(" ")[0] : world.label.split(" ")[0]}</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-display font-black text-white leading-tight mb-4">
              {isAr ? world.labelAr : world.label}
            </h2>
            <p className="text-white/55 text-sm leading-relaxed">
              {isAr ? world.descriptionAr : world.description}
            </p>
          </div>

          {/* Stats row */}
          <div className={`grid grid-cols-3 gap-3 rounded-2xl border ${world.accentBorder} ${world.accentBg} p-5`}>
            {world.stats.map((stat, i) => (
              <div key={i} className="text-center">
                <span className={`text-xl md:text-2xl font-display font-black ${world.accentColor} block`}>
                  {stat.value}
                </span>
                <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider block mt-0.5">
                  {isAr ? stat.labelAr : stat.labelEn}
                </span>
              </div>
            ))}
          </div>

          {/* Capabilities list */}
          <div>
            <h3 className="text-xs font-mono text-white/40 uppercase tracking-widest mb-4">
              {isAr ? "القدرات الأساسية" : "CORE CAPABILITIES"}
            </h3>
            <ul className="space-y-2.5">
              {world.capabilities.map((cap, i) => (
                <li key={i} className="flex items-center gap-3 group">
                  <div
                    className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${world.accentColor.replace("text-", "bg-")} opacity-60 group-hover:opacity-100 transition-opacity`}
                  />
                  <span className="text-sm text-white/65 group-hover:text-white/90 transition-colors">
                    {isAr ? cap.ar : cap.en}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* CTA buttons */}
          <div className="flex flex-col gap-3 pt-4 border-t border-white/[0.06]">
            {onOpenProjectBuilder && (
              <button
                onClick={() => {
                  onClose();
                  setTimeout(() => onOpenProjectBuilder(), 400);
                }}
                className={`w-full py-3.5 px-6 rounded-2xl font-bold text-xs tracking-widest uppercase flex items-center justify-center gap-2.5 transition-all duration-300 text-white ${world.accentBorder} border`}
                style={{
                  background: `linear-gradient(135deg, ${
                    worldId === "uiux" ? "rgba(139,92,246,0.25)" :
                    worldId === "ai" ? "rgba(139,92,246,0.25)" :
                    worldId === "branding" || worldId === "packaging" ? "rgba(234,179,8,0.2)" :
                    worldId === "motion" ? "rgba(232,97,74,0.2)" :
                    worldId === "marketing" || worldId === "ecommerce" ? "rgba(34,197,94,0.2)" :
                    "rgba(43,108,255,0.2)"
                  }, transparent)`,
                }}
              >
                <span>{isAr ? "ابدأ مشروعك في هذا العالم" : "START A PROJECT IN THIS WORLD"}</span>
                <ArrowUpRight size={14} />
              </button>
            )}
            <button
              onClick={onClose}
              className="w-full py-3 px-6 rounded-2xl font-mono text-xs tracking-wider uppercase text-white/40 hover:text-white/70 border border-white/[0.06] hover:border-white/20 transition-all"
            >
              {isAr ? "← الخروج من العالم" : "← EXIT WORLD"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
