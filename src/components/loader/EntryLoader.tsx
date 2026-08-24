"use client";

import React, { useEffect, useRef, useState } from "react";

interface EntryLoaderProps {
  onComplete: () => void;
  locale: "en" | "ar";
}

export const EntryLoader: React.FC<EntryLoaderProps> = ({ onComplete, locale }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [phase, setPhase] = useState<"chaos" | "ordering" | "letters" | "fadeout">("chaos");
  const [showSubtitle, setShowSubtitle] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // 2,500 particles for cinematic intro
    const particleCount = 2200;
    const particles: Array<{
      x: number;
      y: number;
      targetX: number;
      targetY: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      alpha: number;
      settled: boolean;
    }> = [];

    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) * 0.22;

    const colors = ["#2B6CFF", "#7C3AED", "#FFFFFF", "#E8614A"];

    // Initialize in random chaotic positions
    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = radius * (0.8 + Math.random() * 0.4);
      // Target: Ring representing the O with angular aperture
      const targetX = centerX + Math.cos(angle) * r;
      const targetY = centerY + Math.sin(angle) * r;

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        targetX,
        targetY,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        size: Math.random() * 2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.8 + 0.2,
        settled: false,
      });
    }

    // Sequence timeline
    const t1 = setTimeout(() => setShowSubtitle(true), 600);
    const t2 = setTimeout(() => setPhase("ordering"), 1200);
    const t3 = setTimeout(() => setPhase("letters"), 2400);
    const t4 = setTimeout(() => {
      setPhase("fadeout");
      setTimeout(onComplete, 800);
    }, 3400);

    let progress = 0;

    const render = () => {
      ctx.fillStyle = "rgba(10, 10, 12, 0.25)";
      ctx.fillRect(0, 0, width, height);

      progress += 0.01;

      particles.forEach((p, idx) => {
        if (phase === "chaos") {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;
        } else if (phase === "ordering" || phase === "letters") {
          // Attract towards the O target
          const dx = p.targetX - p.x;
          const dy = p.targetY - p.y;
          p.x += dx * 0.08;
          p.y += dy * 0.08;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [phase, onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-obsidian transition-opacity duration-700 pointer-events-none ${
        phase === "fadeout" ? "opacity-0" : "opacity-100"
      }`}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Center Dynamic Typography Container */}
      <div className="relative z-10 flex flex-col items-center text-center select-none">
        {/* Animated Subtitle */}
        {showSubtitle && (
          <span className="text-[11px] font-mono text-neutral-cool tracking-[0.3em] uppercase mb-4 animate-in fade-in duration-500">
            {locale === "ar" ? "استوديو التكنولوجيا الإبداعية" : "CREATIVE TECHNOLOGY STUDIO"}
          </span>
        )}

        {/* ORDERLY Wordmark Reveal */}
        {phase === "letters" && (
          <div className="flex items-center gap-3 animate-in zoom-in-95 duration-500">
            <h1 className="text-4xl sm:text-6xl font-display font-black tracking-widest text-white uppercase drop-shadow-2xl">
              ORDERLY
            </h1>
          </div>
        )}
      </div>

      {/* Skip Button */}
      <button
        onClick={onComplete}
        className="pointer-events-auto absolute bottom-8 right-8 text-[10px] font-mono text-neutral-cool hover:text-white uppercase tracking-widest px-3 py-1.5 rounded-full border border-white/10 bg-white/5 transition-colors"
      >
        {locale === "ar" ? "تخطي المدخل ←" : "SKIP INTRO →"}
      </button>
    </div>
  );
};
