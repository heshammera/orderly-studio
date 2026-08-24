"use client";

import React, { useEffect, useRef } from "react";

export const GlobalConstellationCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
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

    // 55 ambient nodes with rich contrast palette visible on BOTH dark and light backgrounds
    const nodeCount = 55;
    const nodes: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      isCross: boolean;
      color: string;
      alpha: number;
    }> = [];

    // Vivid electric blue, deep violet, warm coral, and neutral contrast tones
    const colors = ["#2B6CFF", "#7C3AED", "#E8614A", "#1E1E24", "#3B82F6"];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 1,
        isCross: Math.random() > 0.65,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.4 + 0.2,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse parallax
      mouse.current.x += (mouse.current.targetX - mouse.current.x) * 0.04;
      mouse.current.y += (mouse.current.targetY - mouse.current.y) * 0.04;

      // Draw connecting lines between nearby constellation nodes
      for (let i = 0; i < nodeCount; i++) {
        const n1 = nodes[i];
        n1.x += n1.vx;
        n1.y += n1.vy;

        if (n1.x < -20) n1.x = width + 20;
        if (n1.x > width + 20) n1.x = -20;
        if (n1.y < -20) n1.y = height + 20;
        if (n1.y > height + 20) n1.y = -20;

        const px = n1.x + mouse.current.x * 16;
        const py = n1.y + mouse.current.y * 16;

        for (let j = i + 1; j < nodeCount; j++) {
          const n2 = nodes[j];
          const p2x = n2.x + mouse.current.x * 16;
          const p2y = n2.y + mouse.current.y * 16;

          const dx = px - p2x;
          const dy = py - p2y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 140) {
            ctx.beginPath();
            ctx.moveTo(px, py);
            ctx.lineTo(p2x, p2y);
            const lineAlpha = (1 - dist / 140) * 0.18;
            ctx.strokeStyle = "rgba(43, 108, 255, " + lineAlpha + ")";
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        // Draw node dot or geometric cross (+)
        if (n1.isCross) {
          ctx.strokeStyle = n1.color;
          ctx.globalAlpha = n1.alpha * 0.85;
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
          ctx.globalAlpha = n1.alpha * 0.85;
          ctx.fill();
        }
      }

      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-20"
      style={{
        mixBlendMode: "normal",
      }}
    />
  );
};
