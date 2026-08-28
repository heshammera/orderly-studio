"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";

interface ScrollPortalHeroProps {
  locale: "en" | "ar";
  onOpenProjectBuilder: () => void;
}

export const ScrollPortalHero: React.FC<ScrollPortalHeroProps> = ({
  locale,
  onOpenProjectBuilder,
}) => {
  const isAr = locale === "ar";
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [liveOffsets, setLiveOffsets] = useState<Array<{ x: number; y: number; rot: number }>>([
    { x: 0, y: 0, rot: 0 },
    { x: 0, y: 0, rot: 0 },
    { x: 0, y: 0, rot: 0 },
    { x: 0, y: 0, rot: 0 },
    { x: 0, y: 0, rot: 0 },
    { x: 0, y: 0, rot: 0 },
  ]);

  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouseMove);

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowH = window.innerHeight;
      const progress = Math.min(Math.max(scrollY / (windowH * 1.1), 0), 1);
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();

    // 1. Ambient Background Constellation Network
    const bgNodeCount = 45;
    const bgNodes: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      isCross: boolean;
      color: string;
      alpha: number;
    }> = [];

    const bgColors = ["#2B6CFF", "#7C3AED", "#E8614A", "#FFFFFF"];

    for (let i = 0; i < bgNodeCount; i++) {
      bgNodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        size: Math.random() * 2 + 1,
        isCross: Math.random() > 0.65,
        color: bgColors[Math.floor(Math.random() * bgColors.length)],
        alpha: Math.random() * 0.4 + 0.15,
      });
    }

    // 2. Central Architectural O-Ring Particles
    const ringCount = 750;
    const ringParticles: Array<{
      angle: number;
      radiusX: number;
      radiusY: number;
      speed: number;
      size: number;
      color: string;
      alpha: number;
      layer: number;
    }> = [];

    const palette = ["#2B6CFF", "#7C3AED", "#FFFFFF", "#E8614A", "#60A5FA"];
    const minDim = Math.min(width, height);

    for (let i = 0; i < ringCount; i++) {
      let angle = (i / ringCount) * Math.PI * 2;
      if (angle > 0.45 && angle < 0.95 && Math.random() > 0.2) {
        angle += 0.5;
      }

      const layer = Math.random();
      const rx = minDim * (0.24 + layer * 0.08) + (Math.random() - 0.5) * 20;
      const ry = minDim * (0.28 + layer * 0.09) + (Math.random() - 0.5) * 25;

      ringParticles.push({
        angle,
        radiusX: rx,
        radiusY: ry,
        speed: (0.0015 + Math.random() * 0.0015) * (Math.random() > 0.5 ? 1 : -1),
        size: Math.random() * 2 + 1,
        color: palette[Math.floor(Math.random() * palette.length)],
        alpha: Math.random() * 0.6 + 0.35,
        layer,
      });
    }

    let time = 0;
    let lastFrame = 0;

    const render = (timestamp: number) => {
      ctx.clearRect(0, 0, width, height);

      time += 0.015;

      mouse.current.x += (mouse.current.targetX - mouse.current.x) * 0.06;
      mouse.current.y += (mouse.current.targetY - mouse.current.y) * 0.06;

      // Update living floating offsets for scattered words every ~30ms
      if (timestamp - lastFrame > 32) {
        lastFrame = timestamp;
        setLiveOffsets([
          { x: Math.sin(time * 0.8) * 12 + mouse.current.x * 15, y: Math.cos(time * 0.6) * 10 + mouse.current.y * 15, rot: Math.sin(time * 0.4) * 2 },
          { x: Math.cos(time * 0.7) * 14 + mouse.current.x * 12, y: Math.sin(time * 0.9) * 12 + mouse.current.y * 12, rot: Math.cos(time * 0.5) * -2 },
          { x: Math.sin(time * 0.9 + 1) * 10 + mouse.current.x * 14, y: Math.cos(time * 0.7 + 1) * 14 + mouse.current.y * 14, rot: Math.sin(time * 0.3) * 1.5 },
          { x: Math.cos(time * 0.6 + 2) * 12 + mouse.current.x * 16, y: Math.sin(time * 0.8 + 2) * 10 + mouse.current.y * 16, rot: Math.cos(time * 0.4) * -1.5 },
          { x: Math.sin(time * 0.75 + 3) * 15 + mouse.current.x * 10, y: Math.cos(time * 0.85 + 3) * 11 + mouse.current.y * 10, rot: Math.sin(time * 0.5) * 2 },
          { x: Math.cos(time * 0.85 + 4) * 11 + mouse.current.x * 13, y: Math.sin(time * 0.65 + 4) * 13 + mouse.current.y * 13, rot: Math.cos(time * 0.3) * -2 },
        ]);
      }

      const progress = scrollProgress;
      const expansion = 1 + Math.pow(progress, 1.8) * 5.0;
      const alphaMultiplier = Math.max(1 - progress * 1.25, 0);

      if (alphaMultiplier > 0.01) {
        // --- Layer 1: Ambient Constellations ---
        const bgAlpha = alphaMultiplier * 0.65;

        for (let i = 0; i < bgNodeCount; i++) {
          const n1 = bgNodes[i];
          n1.x += n1.vx;
          n1.y += n1.vy;

          if (n1.x < 0 || n1.x > width) n1.vx *= -1;
          if (n1.y < 0 || n1.y > height) n1.vy *= -1;

          const px = n1.x + mouse.current.x * 12;
          const py = n1.y + mouse.current.y * 12;

          for (let j = i + 1; j < bgNodeCount; j++) {
            const n2 = bgNodes[j];
            const p2x = n2.x + mouse.current.x * 12;
            const p2y = n2.y + mouse.current.y * 12;

            const dx = px - p2x;
            const dy = py - p2y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 130) {
              ctx.beginPath();
              ctx.moveTo(px, py);
              ctx.lineTo(p2x, p2y);
              ctx.strokeStyle = "rgba(43, 108, 255, " + (1 - dist / 130) * 0.12 * bgAlpha + ")";
              ctx.lineWidth = 0.75;
              ctx.stroke();
            }
          }

          if (n1.isCross) {
            ctx.strokeStyle = n1.color;
            ctx.globalAlpha = n1.alpha * bgAlpha;
            ctx.lineWidth = 1;
            const s = 4;
            ctx.beginPath();
            ctx.moveTo(px - s, py);
            ctx.lineTo(px + s, py);
            ctx.moveTo(px, py - s);
            ctx.lineTo(px, py + s);
            ctx.stroke();
          } else {
            ctx.beginPath();
            ctx.arc(px, py, n1.size, 0, Math.PI * 2);
            ctx.fillStyle = n1.color;
            ctx.globalAlpha = n1.alpha * bgAlpha;
            ctx.fill();
          }
        }

        // --- Layer 2: Architectural O-Ring ---
        const centerX = width / 2 + mouse.current.x * 25;
        const centerY = height / 2 + mouse.current.y * 25;

        const grad = ctx.createRadialGradient(
          centerX,
          centerY,
          minDim * 0.1 * expansion,
          centerX,
          centerY,
          minDim * 0.38 * expansion
        );
        grad.addColorStop(0, "rgba(43, 108, 255, 0.1)");
        grad.addColorStop(0.5, "rgba(124, 58, 237, 0.05)");
        grad.addColorStop(1, "rgba(10, 10, 12, 0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(centerX, centerY, minDim * 0.38 * expansion, 0, Math.PI * 2);
        ctx.fill();

        for (let i = 0; i < ringCount; i++) {
          const p = ringParticles[i];
          p.angle += p.speed;

          const wobble = Math.sin(time + p.layer * 5) * 8;
          const px = centerX + Math.cos(p.angle) * (p.radiusX + wobble) * expansion;
          const py = centerY + Math.sin(p.angle) * (p.radiusY + wobble) * expansion;

          ctx.beginPath();
          ctx.arc(px, py, p.size * (1 + progress * 1.5), 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha * alphaMultiplier;
          ctx.fill();
        }
      }

      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animId);
    };
  }, [scrollProgress]);

  // Scattered keywords metadata
  const scatteredKeywords = [
    { text: isAr ? "ذكاء اصطناعي // AI" : "AI & NEURAL", top: "18%", left: "14%", color: "border-engineering-blue/30 text-engineering-blue" },
    { text: isAr ? "هوية بصرية // BRAND" : "BRAND IDENTITY", top: "22%", right: "12%", color: "border-creative-coral/30 text-creative-coral" },
    { text: isAr ? "منصات سحابية // SAAS" : "SAAS PLATFORMS", top: "72%", left: "12%", color: "border-engineering-violet/30 text-engineering-violet" },
    { text: isAr ? "تجارب رقمية // UI/UX" : "UI / UX & SPATIAL", top: "68%", right: "14%", color: "border-sky-400/30 text-sky-400" },
    { text: isAr ? "أتمتة // AUTOMATE" : "WORKFLOW ENGINES", top: "14%", right: "32%", color: "border-white/20 text-white/70" },
    { text: isAr ? "تغليف و3D" : "PACKAGING & 3D", top: "80%", left: "30%", color: "border-creative-peach/30 text-creative-peach" },
  ];

  const scatteredOpacity = Math.max(1 - scrollProgress * 6.5, 0);

  const entrance = Math.min(Math.max((scrollProgress - 0.02) / 0.30, 0), 1);
  const exit = Math.min(Math.max((scrollProgress - 0.55) / 0.40, 0), 1);
  const opacity = entrance * (1 - exit);
  const translateY = (1 - entrance) * 30 - exit * 50;

  return (
    <section className="relative w-full h-[150vh] bg-obsidian text-white select-none">
      {/* Sticky Fullscreen Viewport */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Fullscreen Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
        />

        {/* Ambient Grid */}
        <div
          className="absolute inset-0 bg-grid-pattern pointer-events-none"
          style={{ opacity: 0.18 * (1 - scrollProgress) }}
        />

        {/* --- Living Organic Floating Keywords --- */}
        {scatteredKeywords.map((kw, idx) => {
          const off = liveOffsets[idx] || { x: 0, y: 0, rot: 0 };
          return (
            <div
              key={idx}
              className={`absolute z-10 px-3.5 py-1.5 rounded-full bg-soft-black/80 backdrop-blur-md border text-[11px] font-mono tracking-widest uppercase shadow-xl pointer-events-none ${kw.color}`}
              style={{
                top: kw.top,
                left: kw.left,
                right: kw.right,
                opacity: scatteredOpacity,
                transform: `translate3d(${off.x}px, ${off.y}px, 0) rotate(${off.rot}deg) scale(${0.92 + scatteredOpacity * 0.08})`,
                transition: "opacity 150ms ease-out",
                willChange: "transform, opacity",
              }}
            >
              {kw.text}
            </div>
          );
        })}

        {/* Main Zero-Jitter Content Layer */}
        <div
          className="relative z-10 w-full flex flex-col items-center justify-center text-center px-6 max-w-4xl mx-auto will-change-transform"
          style={{
            opacity,
            transform: `translate3d(0, ${translateY}px, 0)`,
            pointerEvents: opacity < 0.2 ? "none" : "auto",
          }}
        >
          {/* Studio Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/15 text-xs font-mono text-neutral-cool mb-6 tracking-[0.25em] uppercase shadow-lg">
            <span className="w-1.5 h-1.5 rounded-full bg-engineering-blue animate-ping" />
            <span>{isAr ? "استوديو التكنولوجيا الإبداعية" : "CREATIVE TECHNOLOGY STUDIO"}</span>
          </div>

          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-display font-black tracking-tight text-white uppercase leading-tight mb-6 drop-shadow-2xl">
            ORDERLY
          </h1>

          {/* Supporting Narrative */}
          <p className="text-base sm:text-xl text-neutral-cool font-normal max-w-xl mb-10 leading-relaxed drop-shadow-md">
            {isAr
              ? "نحوّل الأفكار الطموحة والأنظمة المعقدة إلى تجارب رقمية استثنائية."
              : "We turn ambitious ideas and complex systems into unforgettable digital experiences."}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onOpenProjectBuilder}
              className="px-8 py-4 rounded-full bg-white text-obsidian font-bold text-xs tracking-wider uppercase flex items-center gap-3 hover:bg-engineering-blue hover:text-white transition-colors duration-200 shadow-2xl group"
              data-cursor="START"
            >
              <span>{isAr ? "ابدأ مشروعك الآن" : "START A PROJECT"}</span>
              <ArrowUpRight
                size={16}
                className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </button>

            <a
              href="#manifesto"
              className="px-6 py-4 rounded-full border border-white/15 bg-white/5 text-white/80 hover:text-white hover:border-white/30 font-mono text-xs tracking-wider uppercase flex items-center gap-2 transition-colors duration-200"
              data-cursor="PORTAL"
            >
              <span>{isAr ? "استكشف الاستوديو ↓" : "EXPLORE THE STUDIO ↓"}</span>
              <ArrowDown size={14} className="animate-bounce" />
            </a>
          </div>
        </div>

        {/* Minimal Scroll Cue */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-neutral-cool/60 pointer-events-none"
          style={{ opacity: Math.max(1 - scrollProgress * 4, 0) }}
        >
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/50">
            {isAr ? "قم بالتمرير للدخول" : "SCROLL TO ENTER"}
          </span>
          <div className="w-4 h-8 rounded-full border border-white/20 flex items-start justify-center p-1">
            <div className="w-1.5 h-2.5 rounded-full bg-engineering-blue animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
};
