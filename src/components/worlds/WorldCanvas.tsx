"use client";

import React, { useEffect, useRef } from "react";

export type WorldId =
  | "uiux"
  | "engineering"
  | "branding"
  | "ai"
  | "motion"
  | "marketing"
  | "saas"
  | "ecommerce"
  | "packaging";

interface WorldCanvasProps {
  worldId: WorldId;
}

/* ─────────────────────────────────────────────
   Utility helpers
───────────────────────────────────────────── */
function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

/* ─────────────────────────────────────────────
   World renderers — one function per world
───────────────────────────────────────────── */

// 01 — UI/UX: Floating wireframe components on dot grid
function drawUIUX(
  ctx: CanvasRenderingContext2D,
  W: number,
  H: number,
  t: number,
  rects: { x: number; y: number; w: number; h: number; vy: number; opacity: number }[]
) {
  ctx.clearRect(0, 0, W, H);

  // Dot grid
  ctx.fillStyle = "rgba(139,92,246,0.15)";
  const gap = 36;
  for (let x = gap; x < W; x += gap) {
    for (let y = gap; y < H; y += gap) {
      ctx.beginPath();
      ctx.arc(x, y, 1.5, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Floating UI component wireframes
  rects.forEach((r, i) => {
    r.y -= r.vy;
    if (r.y + r.h < 0) {
      r.y = H + r.h;
      r.x = rand(20, W - r.w - 20);
    }

    const pulse = 0.35 + 0.25 * Math.sin(t * 0.8 + i * 1.1);
    ctx.strokeStyle = `rgba(139,92,246,${pulse})`;
    ctx.lineWidth = 1;
    ctx.strokeRect(r.x, r.y, r.w, r.h);

    // inner horizontal rule (card header sim)
    if (r.h > 40) {
      ctx.strokeStyle = `rgba(139,92,246,${pulse * 0.5})`;
      ctx.beginPath();
      ctx.moveTo(r.x + 8, r.y + 18);
      ctx.lineTo(r.x + r.w - 8, r.y + 18);
      ctx.stroke();
    }

    // corner dot
    ctx.fillStyle = `rgba(167,139,250,${pulse})`;
    ctx.beginPath();
    ctx.arc(r.x + r.w, r.y, 3, 0, Math.PI * 2);
    ctx.fill();
  });

  // Large crosshair cursor floating
  const cx = W * 0.72 + Math.sin(t * 0.4) * 18;
  const cy = H * 0.45 + Math.cos(t * 0.3) * 14;
  ctx.strokeStyle = "rgba(167,139,250,0.55)";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(cx - 20, cy);
  ctx.lineTo(cx + 20, cy);
  ctx.moveTo(cx, cy - 20);
  ctx.lineTo(cx, cy + 20);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(cx, cy, 5, 0, Math.PI * 2);
  ctx.stroke();
}

// 02 — Engineering: Node graph + code rain
function drawEngineering(
  ctx: CanvasRenderingContext2D,
  W: number,
  H: number,
  t: number,
  nodes: { x: number; y: number; r: number }[],
  drops: { x: number; y: number; speed: number; chars: string[]; idx: number }[]
) {
  ctx.clearRect(0, 0, W, H);

  // Code rain (columns of chars)
  ctx.font = "11px monospace";
  drops.forEach((d) => {
    d.y += d.speed;
    if (d.y > H) d.y = rand(-120, 0);

    d.chars.forEach((ch, i) => {
      const alpha = Math.max(0, 1 - i * 0.18);
      if (i === 0) {
        ctx.fillStyle = `rgba(80,210,255,${alpha * 0.9})`;
      } else {
        ctx.fillStyle = `rgba(43,108,255,${alpha * 0.45})`;
      }
      ctx.fillText(ch, d.x, d.y - i * 14);
    });
  });

  // Node connections
  for (let a = 0; a < nodes.length; a++) {
    for (let b = a + 1; b < nodes.length; b++) {
      const na = nodes[a], nb = nodes[b];
      const dist = Math.hypot(na.x - nb.x, na.y - nb.y);
      if (dist < 210) {
        const pulse = 0.5 + 0.4 * Math.sin(t * 1.2 + a + b);
        ctx.strokeStyle = `rgba(43,108,255,${(1 - dist / 210) * 0.5 * pulse})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(na.x, na.y);
        ctx.lineTo(nb.x, nb.y);
        ctx.stroke();

        // data packet along line
        const frac = ((t * 0.5 + a * 0.3) % 1);
        const px = na.x + (nb.x - na.x) * frac;
        const py = na.y + (nb.y - na.y) * frac;
        ctx.fillStyle = "rgba(80,210,255,0.7)";
        ctx.beginPath();
        ctx.arc(px, py, 2, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  // Nodes
  nodes.forEach((n, i) => {
    const pulse = 0.6 + 0.4 * Math.sin(t * 1.5 + i * 0.7);
    ctx.fillStyle = `rgba(43,108,255,${pulse * 0.9})`;
    ctx.beginPath();
    ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = `rgba(80,210,255,${pulse})`;
    ctx.lineWidth = 1;
    ctx.stroke();
  });
}

// 03 — Brand Identity: Ink spreading + letter particles
function drawBranding(
  ctx: CanvasRenderingContext2D,
  W: number,
  H: number,
  t: number,
  blots: { x: number; y: number; maxR: number; phase: number; speed: number }[]
) {
  ctx.clearRect(0, 0, W, H);

  // Ink blots
  blots.forEach((b, i) => {
    const progress = (Math.sin(t * b.speed + b.phase) + 1) / 2;
    const r = b.maxR * progress;
    const alpha = 0.08 + 0.12 * progress;
    const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, r);
    grad.addColorStop(0, `rgba(234,179,8,${alpha})`);
    grad.addColorStop(0.6, `rgba(202,138,4,${alpha * 0.5})`);
    grad.addColorStop(1, `rgba(161,98,7,0)`);
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(b.x, b.y, Math.max(0, r), 0, Math.PI * 2);
    ctx.fill();
  });

  // Floating brand letters
  const letters = ["O", "R", "D", "E", "R", "L", "Y"];
  letters.forEach((ch, i) => {
    const ox = W * 0.15 + (W * 0.7 * i) / letters.length;
    const oy = H * 0.5 + Math.sin(t * 0.6 + i * 0.9) * 30;
    const alpha = 0.08 + 0.12 * Math.abs(Math.sin(t * 0.4 + i));
    ctx.font = `bold ${Math.floor(rand(60, 100))}px serif`;
    ctx.fillStyle = `rgba(234,179,8,${alpha})`;
    ctx.fillText(ch, ox, oy);
  });

  // Fine gold particle dust
  for (let i = 0; i < 40; i++) {
    const px = (W * (i / 40) + t * 12) % W;
    const py = H * 0.3 + Math.sin(t * 0.5 + i * 0.4) * (H * 0.25);
    ctx.fillStyle = `rgba(234,179,8,${0.1 + 0.15 * Math.sin(t + i)})`;
    ctx.beginPath();
    ctx.arc(px, py, 1.5, 0, Math.PI * 2);
    ctx.fill();
  }
}

// 04 — AI & Automation: Neural network
function drawAI(
  ctx: CanvasRenderingContext2D,
  W: number,
  H: number,
  t: number,
  layers: { x: number; nodes: { y: number }[] }[]
) {
  ctx.clearRect(0, 0, W, H);

  // Background pulse rings
  const cx = W / 2, cy = H / 2;
  for (let r = 40; r < 320; r += 55) {
    const alpha = 0.04 + 0.03 * Math.sin(t * 0.8 - r * 0.015);
    ctx.strokeStyle = `rgba(139,92,246,${alpha})`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(cx, cy, r + Math.sin(t * 0.5) * 6, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Connections between layers
  for (let l = 0; l < layers.length - 1; l++) {
    const layerA = layers[l], layerB = layers[l + 1];
    layerA.nodes.forEach((na, ai) => {
      layerB.nodes.forEach((nb, bi) => {
        const pulse = 0.3 + 0.4 * Math.sin(t * 1.4 + l + ai + bi);
        ctx.strokeStyle = `rgba(139,92,246,${pulse * 0.4})`;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(layerA.x, na.y);
        ctx.lineTo(layerB.x, nb.y);
        ctx.stroke();

        // signal pulse along connection
        const frac = ((t * 0.6 + l * 0.3 + ai * 0.15) % 1);
        ctx.fillStyle = `rgba(167,139,250,0.8)`;
        ctx.beginPath();
        ctx.arc(
          layerA.x + (layerB.x - layerA.x) * frac,
          na.y + (nb.y - na.y) * frac,
          2, 0, Math.PI * 2
        );
        ctx.fill();
      });
    });
  }

  // Nodes
  layers.forEach((layer, li) => {
    layer.nodes.forEach((n, ni) => {
      const pulse = 0.5 + 0.5 * Math.sin(t * 2 + li * 0.5 + ni * 0.8);
      ctx.fillStyle = `rgba(139,92,246,${0.6 + 0.4 * pulse})`;
      ctx.beginPath();
      ctx.arc(layer.x, n.y, 6 + pulse * 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = `rgba(167,139,250,${pulse})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    });
  });
}

// 05 — Motion / 3D: Rotating wireframe shapes
function drawMotion(
  ctx: CanvasRenderingContext2D,
  W: number,
  H: number,
  t: number
) {
  ctx.clearRect(0, 0, W, H);

  const cx = W / 2, cy = H / 2;

  // Rotating icosahedron (simplified as rotating polygon cluster)
  const sizes = [80, 130, 180, 220];
  sizes.forEach((size, i) => {
    const rot = t * (0.3 + i * 0.12) * (i % 2 === 0 ? 1 : -1);
    const sides = 3 + i * 2;
    const alpha = 0.08 + 0.08 * Math.sin(t * 0.5 + i);
    ctx.strokeStyle = `rgba(232,97,74,${alpha * 2})`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let s = 0; s <= sides; s++) {
      const angle = rot + (s / sides) * Math.PI * 2;
      const px = cx + size * Math.cos(angle);
      const py = cy + size * Math.sin(angle) * 0.5;
      if (s === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();
  });

  // Diagonal lines (motion blur aesthetic)
  for (let i = 0; i < 12; i++) {
    const angle = (i / 12) * Math.PI * 2 + t * 0.2;
    const len = 90 + 40 * Math.sin(t * 0.7 + i);
    const alpha = 0.06 + 0.08 * Math.abs(Math.sin(t * 0.5 + i * 0.4));
    ctx.strokeStyle = `rgba(232,97,74,${alpha})`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(cx + Math.cos(angle) * 40, cy + Math.sin(angle) * 40);
    ctx.lineTo(cx + Math.cos(angle) * (40 + len), cy + Math.sin(angle) * (40 + len));
    ctx.stroke();
  }

  // Timeline bar at bottom
  const barY = H - 36;
  ctx.strokeStyle = "rgba(232,97,74,0.2)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(20, barY);
  ctx.lineTo(W - 20, barY);
  ctx.stroke();

  // Playhead
  const ph = 20 + ((t * 60) % (W - 40));
  ctx.strokeStyle = "rgba(232,97,74,0.8)";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(ph, barY - 8);
  ctx.lineTo(ph, barY + 8);
  ctx.stroke();

  // Keyframe ticks
  for (let k = 0; k < 20; k++) {
    const kx = 20 + (k / 19) * (W - 40);
    const isKey = k % 4 === 0;
    ctx.strokeStyle = isKey ? "rgba(232,97,74,0.5)" : "rgba(232,97,74,0.15)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(kx, barY - (isKey ? 5 : 2));
    ctx.lineTo(kx, barY + (isKey ? 5 : 2));
    ctx.stroke();
  }
}

// 06 — Marketing: Rising charts + world signals
function drawMarketing(
  ctx: CanvasRenderingContext2D,
  W: number,
  H: number,
  t: number,
  bars: { x: number; targetH: number; currentH: number }[]
) {
  ctx.clearRect(0, 0, W, H);

  const baseY = H * 0.75;

  // Grid lines
  for (let i = 1; i <= 4; i++) {
    const gy = baseY - (baseY * 0.8 * i) / 4;
    ctx.strokeStyle = "rgba(34,197,94,0.08)";
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 6]);
    ctx.beginPath();
    ctx.moveTo(30, gy);
    ctx.lineTo(W - 30, gy);
    ctx.stroke();
  }
  ctx.setLineDash([]);

  // Rising bars
  bars.forEach((bar, i) => {
    const targetH = bar.targetH + 20 * Math.sin(t * 0.8 + i * 0.7);
    bar.currentH += (targetH - bar.currentH) * 0.04;

    const alpha = 0.4 + 0.3 * Math.sin(t * 0.5 + i * 0.6);
    const grad = ctx.createLinearGradient(0, baseY - bar.currentH, 0, baseY);
    grad.addColorStop(0, `rgba(34,197,94,${alpha})`);
    grad.addColorStop(1, `rgba(34,197,94,0.05)`);
    ctx.fillStyle = grad;
    ctx.fillRect(bar.x - 12, baseY - bar.currentH, 24, bar.currentH);

    // top glow
    ctx.fillStyle = `rgba(74,222,128,${0.7 + 0.3 * Math.sin(t + i)})`;
    ctx.fillRect(bar.x - 12, baseY - bar.currentH - 2, 24, 3);
  });

  // Floating metric numbers
  const metrics = ["+340%", "8.4×", "2.1M", "−62%"];
  metrics.forEach((m, i) => {
    const mx = W * 0.12 + (W * 0.76 * i) / 3;
    const my = H * 0.2 + Math.sin(t * 0.5 + i * 1.1) * 12;
    const alpha = 0.15 + 0.2 * Math.abs(Math.sin(t * 0.4 + i * 0.8));
    ctx.font = "bold 18px monospace";
    ctx.fillStyle = `rgba(74,222,128,${alpha})`;
    ctx.textAlign = "center";
    ctx.fillText(m, mx, my);
  });
  ctx.textAlign = "left";

  // Signal pulses (world map dots)
  const signals = [
    { x: W * 0.2, y: H * 0.45 },
    { x: W * 0.45, y: H * 0.38 },
    { x: W * 0.7, y: H * 0.5 },
    { x: W * 0.85, y: H * 0.42 },
    { x: W * 0.3, y: H * 0.55 },
  ];
  signals.forEach((s, i) => {
    const phase = t * 1.2 + i * 1.3;
    const r = 4 + (phase % (Math.PI * 2)) * 8;
    const alpha = Math.max(0, 0.5 - (r - 4) / 16);
    ctx.strokeStyle = `rgba(34,197,94,${alpha})`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(s.x, s.y, r, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = "rgba(74,222,128,0.8)";
    ctx.beginPath();
    ctx.arc(s.x, s.y, 3, 0, Math.PI * 2);
    ctx.fill();
  });
}

/* ─────────────────────────────────────────────
   Main WorldCanvas component
───────────────────────────────────────────── */
export const WorldCanvas: React.FC<WorldCanvasProps> = ({ worldId }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<Record<string, unknown>>({});
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = canvas.offsetWidth;
    let H = canvas.offsetHeight;
    canvas.width = W;
    canvas.height = H;

    const onResize = () => {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width = W;
      canvas.height = H;
      initState();
    };
    window.addEventListener("resize", onResize);

    // ── Initialize per-world state ──────────────────
    const initState = () => {
      if (worldId === "uiux") {
        stateRef.current.rects = Array.from({ length: 18 }, () => ({
          x: rand(10, W - 160),
          y: rand(0, H),
          w: rand(60, 150),
          h: rand(28, 70),
          vy: rand(0.15, 0.5),
          opacity: rand(0.3, 0.8),
        }));
      } else if (worldId === "engineering" || worldId === "saas") {
        stateRef.current.nodes = Array.from({ length: 22 }, () => ({
          x: rand(40, W - 40),
          y: rand(40, H - 60),
          r: rand(3, 7),
        }));
        const codeChars = "01{}[]()=>const async await import export function class".split("");
        stateRef.current.drops = Array.from({ length: 24 }, (_, i) => ({
          x: 24 + ((W - 48) * i) / 23,
          y: rand(-H, 0),
          speed: rand(0.5, 1.4),
          chars: Array.from({ length: 8 }, () => codeChars[Math.floor(rand(0, codeChars.length))]),
          idx: 0,
        }));
      } else if (worldId === "branding") {
        stateRef.current.blots = Array.from({ length: 7 }, () => ({
          x: rand(W * 0.1, W * 0.9),
          y: rand(H * 0.1, H * 0.9),
          maxR: rand(80, 220),
          phase: rand(0, Math.PI * 2),
          speed: rand(0.15, 0.4),
        }));
      } else if (worldId === "ai") {
        const layerSizes = [3, 5, 5, 3];
        stateRef.current.layers = layerSizes.map((count, li) => ({
          x: W * 0.12 + (W * 0.76 * li) / (layerSizes.length - 1),
          nodes: Array.from({ length: count }, (_, ni) => ({
            y: H * 0.2 + (H * 0.6 * ni) / Math.max(count - 1, 1),
          })),
        }));
      } else if (worldId === "motion" || worldId === "packaging") {
        // no extra init needed
      } else if (worldId === "marketing" || worldId === "ecommerce") {
        stateRef.current.bars = Array.from({ length: 10 }, (_, i) => ({
          x: W * 0.08 + (W * 0.84 * i) / 9,
          targetH: rand(H * 0.15, H * 0.55),
          currentH: 0,
        }));
      }
    };

    initState();

    // ── Animation loop ──────────────────────────────
    let startTime = performance.now();
    const loop = (now: number) => {
      const t = (now - startTime) / 1000;

      switch (worldId) {
        case "uiux":
          drawUIUX(ctx, W, H, t, stateRef.current.rects as Parameters<typeof drawUIUX>[4]);
          break;
        case "engineering":
        case "saas":
          drawEngineering(
            ctx, W, H, t,
            stateRef.current.nodes as Parameters<typeof drawEngineering>[4],
            stateRef.current.drops as Parameters<typeof drawEngineering>[5]
          );
          break;
        case "branding":
        case "packaging":
          drawBranding(ctx, W, H, t, stateRef.current.blots as Parameters<typeof drawBranding>[4]);
          break;
        case "ai":
          drawAI(ctx, W, H, t, stateRef.current.layers as Parameters<typeof drawAI>[4]);
          break;
        case "motion":
          drawMotion(ctx, W, H, t);
          break;
        case "marketing":
        case "ecommerce":
          drawMarketing(ctx, W, H, t, stateRef.current.bars as Parameters<typeof drawMarketing>[4]);
          break;
        default:
          drawEngineering(
            ctx, W, H, t,
            stateRef.current.nodes as Parameters<typeof drawEngineering>[4],
            stateRef.current.drops as Parameters<typeof drawEngineering>[5]
          );
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
    };
  }, [worldId]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ display: "block" }}
    />
  );
};
