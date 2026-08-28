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
  /** 0–1 opacity of the canvas layer */
  opacity?: number;
}

/* ══════════════════════════════════════════════════════════
   HELPERS
══════════════════════════════════════════════════════════ */
const rnd = (a: number, b: number) => Math.random() * (b - a) + a;

/** Radial glow — NO shadowBlur (perf safe) */
function glow(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  r: number,
  rgba: [number, number, number, number]
) {
  const g = ctx.createRadialGradient(x, y, 0, x, y, r);
  g.addColorStop(0, `rgba(${rgba[0]},${rgba[1]},${rgba[2]},${rgba[3]})`);
  g.addColorStop(1, `rgba(${rgba[0]},${rgba[1]},${rgba[2]},0)`);
  ctx.fillStyle = g;
  ctx.fillRect(x - r, y - r, r * 2, r * 2);
}

/** Edge vignette */
function vignette(
  ctx: CanvasRenderingContext2D,
  W: number,
  H: number,
  strength = 0.75,
  color = "0,0,0"
) {
  const g = ctx.createRadialGradient(W / 2, H / 2, H * 0.15, W / 2, H / 2, H * 0.9);
  g.addColorStop(0, `rgba(${color},0)`);
  g.addColorStop(1, `rgba(${color},${strength})`);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);
}

/* ══════════════════════════════════════════════════════════
   WORLD 01 — UI / UX  "The White Infinite"
══════════════════════════════════════════════════════════ */
interface UIComp {
  x: number; y: number; w: number; h: number;
  type: 0 | 1 | 2; // 0=btn 1=card 2=input
  depth: number; vy: number; phase: number;
}
interface UIUXState { comps: UIComp[] }

function initUIUX(W: number, H: number): UIUXState {
  return {
    comps: Array.from({ length: 26 }, (_, i) => ({
      x: rnd(20, W - 220),
      y: rnd(-H, H * 1.3),
      w: rnd(80, 200),
      h: [36, rnd(70, 110), 34][i % 3],
      type: (i % 3) as 0 | 1 | 2,
      depth: rnd(0.25, 1),
      vy: rnd(0.08, 0.3),
      phase: rnd(0, Math.PI * 2),
    })),
  };
}

function drawUIUX(
  ctx: CanvasRenderingContext2D,
  W: number, H: number, t: number,
  state: UIUXState,
  mx: number, my: number
) {
  // ── Background ──────────────────────────────────────────
  ctx.fillStyle = "#F4F2FF";
  ctx.fillRect(0, 0, W, H);

  const vpX = W / 2 + (mx - W / 2) * 0.04;
  const vpY = H * 0.40 + (my - H / 2) * 0.025;

  // ── Horizon glow ────────────────────────────────────────
  glow(ctx, W / 2, vpY, W * 0.55, [167, 139, 250, 0.18]);

  // ── Perspective grid ────────────────────────────────────
  // Horizontal lines receding into VP
  for (let i = 0; i <= 18; i++) {
    const p = i / 18;
    const y = vpY + (H - vpY) * Math.pow(p, 1.6);
    const a = 0.04 + p * 0.22;
    ctx.strokeStyle = `rgba(139,92,246,${a})`;
    ctx.lineWidth = 0.7 + p * 0.4;
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
  }
  // Vertical lines converging to VP
  for (let i = -10; i <= 10; i++) {
    const xB = W / 2 + i * (W / 14);
    const a = Math.max(0, 0.04 + (1 - Math.abs(i) / 10) * 0.14);
    ctx.strokeStyle = `rgba(139,92,246,${a})`;
    ctx.lineWidth = 0.7;
    ctx.beginPath(); ctx.moveTo(vpX, vpY); ctx.lineTo(xB, H + 20); ctx.stroke();
  }

  // ── Floating UI components ───────────────────────────────
  state.comps.forEach((c, i) => {
    c.y -= c.vy;
    if (c.y + c.h < -60) { c.y = H + 60; c.x = rnd(20, W - 220); }

    const offsetX = (mx - W / 2) * 0.05 * c.depth;
    const offsetY = (my - H / 2) * 0.04 * c.depth;
    const dx = c.x + offsetX;
    const dy = c.y + offsetY;
    const alpha = (0.28 + 0.22 * Math.sin(t * 0.5 + c.phase)) * c.depth;

    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.strokeStyle = "rgba(139,92,246,1)";
    ctx.lineWidth = 1.2;

    if (c.type === 0) {
      // Pill button
      ctx.beginPath();
      ctx.roundRect(dx, dy, c.w, c.h, c.h / 2);
      ctx.stroke();
      ctx.fillStyle = "rgba(139,92,246,0.08)";
      ctx.fill();
      // Text stub
      ctx.fillStyle = "rgba(139,92,246,0.5)";
      const tw = c.w * 0.55; const tx = dx + (c.w - tw) / 2;
      ctx.fillRect(tx, dy + c.h / 2 - 3, tw, 5);
      // Corner dot
      ctx.fillStyle = "rgba(167,139,250,1)";
      ctx.beginPath(); ctx.arc(dx + c.w, dy, 3.5, 0, Math.PI * 2); ctx.fill();
    } else if (c.type === 1) {
      // Card
      ctx.beginPath();
      ctx.roundRect(dx, dy, c.w, c.h, 10);
      ctx.stroke();
      ctx.fillStyle = "rgba(139,92,246,0.04)";
      ctx.fill();
      // Header divider
      ctx.strokeStyle = "rgba(139,92,246,0.25)";
      ctx.beginPath(); ctx.moveTo(dx + 10, dy + 24); ctx.lineTo(dx + c.w - 10, dy + 24); ctx.stroke();
      // Content lines
      [0, 1, 2].forEach(l => {
        if (dy + 36 + l * 14 < dy + c.h - 12) {
          ctx.fillStyle = `rgba(139,92,246,${0.15 - l * 0.04})`;
          ctx.fillRect(dx + 12, dy + 34 + l * 14, c.w - 24 - l * 22, 7);
        }
      });
      // Dot badge top-right
      ctx.fillStyle = "rgba(167,139,250,1)";
      ctx.beginPath(); ctx.arc(dx + c.w - 10, dy + 12, 4, 0, Math.PI * 2); ctx.fill();
    } else {
      // Input field
      ctx.beginPath();
      ctx.roundRect(dx, dy, c.w, c.h, 5);
      ctx.stroke();
      // Blinking cursor
      if (i % 3 === 0 && Math.floor(t * 1.5 + i) % 2 === 0) {
        ctx.fillStyle = "rgba(139,92,246,0.8)";
        ctx.fillRect(dx + 14, dy + 8, 2, c.h - 16);
      }
      // Placeholder stub
      ctx.fillStyle = "rgba(139,92,246,0.18)";
      ctx.fillRect(dx + 14, dy + c.h / 2 - 3, c.w * 0.45, 6);
    }
    ctx.restore();
  });

  // ── Design pen cursor at mouse ───────────────────────────
  const s = 18;
  ctx.strokeStyle = "rgba(109,40,217,0.7)";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(mx - s, my); ctx.lineTo(mx - 6, my);
  ctx.moveTo(mx + 6, my); ctx.lineTo(mx + s, my);
  ctx.moveTo(mx, my - s); ctx.lineTo(mx, my - 6);
  ctx.moveTo(mx, my + 6); ctx.lineTo(mx, my + s);
  ctx.stroke();
  ctx.strokeStyle = "rgba(109,40,217,0.4)";
  ctx.lineWidth = 1;
  ctx.beginPath(); ctx.arc(mx, my, 5, 0, Math.PI * 2); ctx.stroke();

  // ── Fade edges ──────────────────────────────────────────
  ["top", "bottom", "left", "right"].forEach((side) => {
    const g = side === "top" ? ctx.createLinearGradient(0, 0, 0, H * 0.14)
      : side === "bottom" ? ctx.createLinearGradient(0, H * 0.86, 0, H)
      : side === "left" ? ctx.createLinearGradient(0, 0, W * 0.1, 0)
      : ctx.createLinearGradient(W * 0.9, 0, W, 0);
    const c = "#F4F2FF";
    g.addColorStop(0, c); g.addColorStop(1, "rgba(244,242,255,0)");
    if (side === "bottom" || side === "right") { g.addColorStop(0, "rgba(244,242,255,0)"); g.addColorStop(1, c); }
    ctx.fillStyle = g;
    if (side === "top") ctx.fillRect(0, 0, W, H * 0.14);
    else if (side === "bottom") ctx.fillRect(0, H * 0.86, W, H * 0.14);
    else if (side === "left") ctx.fillRect(0, 0, W * 0.1, H);
    else ctx.fillRect(W * 0.9, 0, W * 0.1, H);
  });
}

/* ══════════════════════════════════════════════════════════
   WORLD 02 — Engineering / SaaS  "The Dark Matrix"
══════════════════════════════════════════════════════════ */
interface CodeDrop {
  x: number; y: number; speed: number;
  chars: string[]; len: number; size: number; depth: number;
}
interface EngNode { x: number; y: number; r: number; phase: number }
interface EngState { drops: CodeDrop[]; nodes: EngNode[]; termLines: { text: string; t: number }[]; lastTermAdd: number }

const CODE_CHARS = "01{}[]<>/=;:ABCDEFimportconstasyncawait".split("");

function initEngineering(W: number, H: number): EngState {
  const cols = Math.floor(W / 22);
  return {
    drops: Array.from({ length: cols }, (_, i) => ({
      x: 11 + i * 22 + rnd(-4, 4),
      y: rnd(-H * 2, 0),
      speed: rnd(0.6, 2.2),
      chars: Array.from({ length: Math.floor(rnd(6, 18)) }, () => CODE_CHARS[Math.floor(rnd(0, CODE_CHARS.length))]),
      len: Math.floor(rnd(6, 18)),
      size: rnd(9, 14),
      depth: rnd(0.3, 1),
    })),
    nodes: Array.from({ length: 20 }, () => ({
      x: rnd(W * 0.1, W * 0.9), y: rnd(H * 0.15, H * 0.85),
      r: rnd(3, 7), phase: rnd(0, Math.PI * 2),
    })),
    termLines: [],
    lastTermAdd: 0,
  };
}

const TERM_SNIPPETS = [
  "$ deploying cluster...", "> connected: 8 nodes", "✓ build(prod) OK 2.1s",
  "PING api.orderly.io", "200 OK — 42ms", "$ git push origin main",
  "→ route /dashboard", "$ prisma db push", "✓ schema synced",
];

function drawEngineering(
  ctx: CanvasRenderingContext2D,
  W: number, H: number, t: number,
  state: EngState,
  mx: number, my: number
) {
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, W, H);

  // ── Ambient blue glow emanating from center ──────────────
  glow(ctx, W / 2, H / 2, H * 0.7, [43, 108, 255, 0.06]);
  glow(ctx, mx, my, 120, [80, 210, 255, 0.04]);

  // ── Code rain ───────────────────────────────────────────
  state.drops.forEach((d) => {
    d.y += d.speed;
    if (d.y - d.len * d.size * 1.2 > H + 100) {
      d.y = rnd(-H, -50);
      d.chars = Array.from({ length: d.len }, () => CODE_CHARS[Math.floor(rnd(0, CODE_CHARS.length))]);
    }
    d.chars.forEach((ch, k) => {
      const cy = d.y - k * d.size * 1.2;
      if (cy < -20 || cy > H + 20) return;
      const fade = 1 - k / d.len;
      const isHead = k === 0;
      ctx.font = `${d.size}px monospace`;
      ctx.fillStyle = isHead
        ? `rgba(180,230,255,${0.9 * d.depth})`
        : `rgba(43,108,255,${fade * 0.55 * d.depth})`;
      ctx.fillText(ch, d.x, cy);
    });
  });

  // ── Node graph ──────────────────────────────────────────
  const offsetX = (mx - W / 2) * 0.06;
  const offsetY = (my - H / 2) * 0.04;

  // Connections
  for (let a = 0; a < state.nodes.length; a++) {
    for (let b = a + 1; b < state.nodes.length; b++) {
      const na = state.nodes[a], nb = state.nodes[b];
      const dist = Math.hypot(na.x - nb.x, na.y - nb.y);
      if (dist > 200) continue;
      const alpha = (1 - dist / 200) * 0.4;
      ctx.strokeStyle = `rgba(43,108,255,${alpha})`;
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(na.x + offsetX, na.y + offsetY);
      ctx.lineTo(nb.x + offsetX, nb.y + offsetY);
      ctx.stroke();
      // Data packet along line
      const frac = ((t * 0.4 + a * 0.2 + b * 0.1) % 1);
      const px = na.x + offsetX + (nb.x - na.x) * frac;
      const py = na.y + offsetY + (nb.y - na.y) * frac;
      glow(ctx, px, py, 10, [80, 210, 255, 0.6]);
      ctx.fillStyle = "rgba(180,230,255,0.9)";
      ctx.beginPath(); ctx.arc(px, py, 2, 0, Math.PI * 2); ctx.fill();
    }
  }
  // Nodes
  state.nodes.forEach((n, i) => {
    const pulse = 0.5 + 0.5 * Math.sin(t * 1.5 + n.phase);
    const nx = n.x + offsetX, ny = n.y + offsetY;
    glow(ctx, nx, ny, 30 * pulse, [43, 108, 255, 0.5]);
    ctx.fillStyle = `rgba(43,108,255,${0.7 + 0.3 * pulse})`;
    ctx.beginPath(); ctx.arc(nx, ny, n.r, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = `rgba(80,210,255,${pulse * 0.9})`;
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.arc(nx, ny, n.r + 3, 0, Math.PI * 2); ctx.stroke();
  });

  // ── Terminal snippets ────────────────────────────────────
  if (t - state.lastTermAdd > 2.2) {
    state.termLines.push({ text: TERM_SNIPPETS[Math.floor(rnd(0, TERM_SNIPPETS.length))], t });
    state.lastTermAdd = t;
    if (state.termLines.length > 5) state.termLines.shift();
  }
  ctx.font = "12px monospace";
  state.termLines.forEach((line, i) => {
    const age = t - line.t;
    const alpha = Math.min(1, age * 2) * Math.max(0, 1 - (age - 4) / 2);
    ctx.fillStyle = `rgba(80,210,255,${alpha * 0.7})`;
    ctx.fillText(line.text, 24 + offsetX * 0.3, H - 28 - i * 18 + offsetY * 0.2);
  });

  vignette(ctx, W, H, 0.7);
}

/* ══════════════════════════════════════════════════════════
   WORLD 03 — Branding / Packaging  "The Golden Atelier"
══════════════════════════════════════════════════════════ */
interface InkBlob { x: number; y: number; maxR: number; phase: number; speed: number }
interface GoldDust { x: number; y: number; vx: number; vy: number; size: number; alpha: number }
interface BrandState { blobs: InkBlob[]; dust: GoldDust[]; letterPhase: number }

function initBranding(W: number, H: number): BrandState {
  return {
    blobs: Array.from({ length: 8 }, () => ({
      x: rnd(W * 0.05, W * 0.95), y: rnd(H * 0.05, H * 0.95),
      maxR: rnd(90, 260), phase: rnd(0, Math.PI * 2), speed: rnd(0.12, 0.35),
    })),
    dust: Array.from({ length: 120 }, () => ({
      x: rnd(0, W), y: rnd(0, H),
      vx: rnd(-0.15, 0.15), vy: rnd(-0.2, -0.05),
      size: rnd(1, 3), alpha: rnd(0.1, 0.6),
    })),
    letterPhase: 0,
  };
}

const LETTERS = ["O", "R", "D", "E", "R", "L", "Y"];

function drawBranding(
  ctx: CanvasRenderingContext2D,
  W: number, H: number, t: number,
  state: BrandState,
  mx: number, my: number
) {
  // Warm dark background
  ctx.fillStyle = "#120A00";
  ctx.fillRect(0, 0, W, H);

  // Paper-like noise
  for (let i = 0; i < 800; i++) {
    const nx = rnd(0, W), ny = rnd(0, H);
    ctx.fillStyle = `rgba(200,150,50,${rnd(0, 0.012)})`;
    ctx.fillRect(nx, ny, 1, 1);
  }

  const offsetX = (mx - W / 2) * 0.05;
  const offsetY = (my - H / 2) * 0.04;

  // ── Ink blobs ───────────────────────────────────────────
  state.blobs.forEach((b) => {
    const progress = (Math.sin(t * b.speed + b.phase) + 1) / 2;
    const r = b.maxR * (0.4 + 0.6 * progress);
    const bx = b.x + offsetX * 0.6, by = b.y + offsetY * 0.5;
    const g = ctx.createRadialGradient(bx, by, 0, bx, by, r);
    g.addColorStop(0, `rgba(220,160,0,${0.14 * progress})`);
    g.addColorStop(0.5, `rgba(180,100,0,${0.08 * progress})`);
    g.addColorStop(1, "rgba(120,60,0,0)");
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(bx, by, r, 0, Math.PI * 2); ctx.fill();
  });

  // ── Giant floating letters ───────────────────────────────
  const baseY = H * 0.52;
  LETTERS.forEach((ch, i) => {
    const spacing = Math.min(W * 0.12, 110);
    const startX = W / 2 - (LETTERS.length - 1) * spacing / 2;
    const lx = startX + i * spacing + offsetX * (0.3 + i * 0.05);
    const ly = baseY + Math.sin(t * 0.4 + i * 0.85) * 22 + offsetY * 0.3;
    const alpha = 0.06 + 0.08 * Math.abs(Math.sin(t * 0.25 + i * 0.6));
    const size = Math.max(48, Math.min(W * 0.1, 100));

    ctx.save();
    ctx.font = `900 ${size}px serif`;
    ctx.textAlign = "center";
    // Gold gradient per letter
    const lg = ctx.createLinearGradient(lx, ly - size, lx, ly);
    lg.addColorStop(0, `rgba(255,210,80,${alpha * 1.4})`);
    lg.addColorStop(0.5, `rgba(230,160,20,${alpha})`);
    lg.addColorStop(1, `rgba(160,100,0,${alpha * 0.5})`);
    ctx.fillStyle = lg;
    ctx.fillText(ch, lx, ly);
    ctx.restore();
  });
  ctx.textAlign = "left";

  // ── Gold dust particles ──────────────────────────────────
  state.dust.forEach((d) => {
    d.x += d.vx; d.y += d.vy;
    if (d.y < -5) { d.y = H + 5; d.x = rnd(0, W); }
    if (d.x < 0 || d.x > W) { d.vx *= -1; }
    const flicker = 0.5 + 0.5 * Math.sin(t * 3 + d.x * 0.05);
    ctx.fillStyle = `rgba(255,200,60,${d.alpha * flicker})`;
    ctx.beginPath(); ctx.arc(d.x + offsetX * d.size * 0.08, d.y + offsetY * d.size * 0.06, d.size, 0, Math.PI * 2); ctx.fill();
  });

  // ── Large ambient glow center ────────────────────────────
  glow(ctx, W / 2 + offsetX * 0.3, H / 2 + offsetY * 0.2, H * 0.6, [200, 130, 0, 0.08]);

  vignette(ctx, W, H, 0.82, "10,5,0");
}

/* ══════════════════════════════════════════════════════════
   WORLD 04 — AI  "The Synaptic Cosmos"
══════════════════════════════════════════════════════════ */
interface Star { x: number; y: number; r: number; alpha: number }
interface Neuron { x: number; y: number; layer: number; phase: number }
interface Spark { x: number; y: number; tx: number; ty: number; prog: number; speed: number; alpha: number }
interface AIState { stars: Star[]; neurons: Neuron[]; sparks: Spark[]; lastSpark: number; equations: { txt: string; x: number; y: number; t: number }[]; lastEq: number }

const EQ_SYMBOLS = ["σ(x)", "∂L/∂w", "∇θ", "Σwᵢxᵢ", "softmax", "ReLU", "∞→0", "GPT-4", "∂²f"];

function initAI(W: number, H: number): AIState {
  const layerSizes = [3, 5, 6, 5, 3];
  const neurons: Neuron[] = [];
  layerSizes.forEach((count, li) => {
    const lx = W * 0.12 + (W * 0.76 * li) / (layerSizes.length - 1);
    for (let ni = 0; ni < count; ni++) {
      neurons.push({
        x: lx, y: H * 0.2 + (H * 0.6 * ni) / Math.max(count - 1, 1),
        layer: li, phase: rnd(0, Math.PI * 2),
      });
    }
  });
  return {
    stars: Array.from({ length: 220 }, () => ({
      x: rnd(0, W), y: rnd(0, H),
      r: rnd(0.5, 2.5), alpha: rnd(0.1, 0.8),
    })),
    neurons,
    sparks: [],
    lastSpark: 0,
    equations: [],
    lastEq: 0,
  };
}

function drawAI(
  ctx: CanvasRenderingContext2D,
  W: number, H: number, t: number,
  state: AIState,
  mx: number, my: number
) {
  ctx.fillStyle = "#04000F";
  ctx.fillRect(0, 0, W, H);

  const offsetX = (mx - W / 2) * 0.04;
  const offsetY = (my - H / 2) * 0.03;

  // ── Stars ────────────────────────────────────────────────
  state.stars.forEach((s, i) => {
    const tw = 0.5 + 0.5 * Math.sin(t * 0.8 + i * 0.4);
    ctx.fillStyle = `rgba(200,180,255,${s.alpha * tw})`;
    ctx.beginPath(); ctx.arc(s.x + offsetX * 0.2, s.y + offsetY * 0.15, s.r, 0, Math.PI * 2); ctx.fill();
  });

  // ── Aurora bands ────────────────────────────────────────
  const auroraColors: [number, number, number][] = [
    [139, 92, 246], [99, 102, 241], [168, 85, 247], [59, 130, 246],
  ];
  auroraColors.forEach(([r, g, b], bi) => {
    const baseY = H * (0.25 + bi * 0.12);
    const amplitude = H * 0.06;
    const freq = 0.006 + bi * 0.002;
    const speed = 0.15 + bi * 0.08;

    ctx.beginPath();
    for (let x = 0; x <= W; x += 4) {
      const y = baseY + Math.sin(x * freq + t * speed + bi * 1.5) * amplitude
        + Math.sin(x * freq * 2.1 - t * speed * 0.7) * amplitude * 0.4
        + offsetY * 0.3;
      if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.lineTo(W, 0); ctx.lineTo(0, 0); ctx.closePath();
    const ag = ctx.createLinearGradient(0, baseY - amplitude, 0, baseY + amplitude * 2);
    ag.addColorStop(0, `rgba(${r},${g},${b},0.18)`);
    ag.addColorStop(0.5, `rgba(${r},${g},${b},0.07)`);
    ag.addColorStop(1, `rgba(${r},${g},${b},0)`);
    ctx.fillStyle = ag;
    ctx.fill();
  });

  // ── Neural connections ───────────────────────────────────
  const layerMap = new Map<number, Neuron[]>();
  state.neurons.forEach(n => {
    const arr = layerMap.get(n.layer) || [];
    arr.push(n); layerMap.set(n.layer, arr);
  });
  layerMap.forEach((layerA, li) => {
    const layerB = layerMap.get(li + 1);
    if (!layerB) return;
    layerA.forEach(na => {
      layerB.forEach(nb => {
        const alpha = 0.15 + 0.1 * Math.sin(t * 0.8 + na.phase + nb.phase);
        ctx.strokeStyle = `rgba(139,92,246,${alpha})`;
        ctx.lineWidth = 0.7;
        ctx.beginPath();
        ctx.moveTo(na.x + offsetX, na.y + offsetY);
        ctx.lineTo(nb.x + offsetX, nb.y + offsetY);
        ctx.stroke();
      });
    });
  });

  // ── Neurons ──────────────────────────────────────────────
  state.neurons.forEach((n) => {
    const pulse = 0.5 + 0.5 * Math.sin(t * 2 + n.phase);
    const nx = n.x + offsetX, ny = n.y + offsetY;
    glow(ctx, nx, ny, 30 * pulse, [139, 92, 246, 0.6]);
    ctx.fillStyle = `rgba(139,92,246,${0.7 + 0.3 * pulse})`;
    ctx.beginPath(); ctx.arc(nx, ny, 5 + pulse * 3, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = `rgba(200,180,255,${pulse * 0.8})`;
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.arc(nx, ny, 9 + pulse * 2, 0, Math.PI * 2); ctx.stroke();
  });

  // ── Electric sparks ──────────────────────────────────────
  if (t - state.lastSpark > 0.15 && state.sparks.length < 20) {
    const neurons = state.neurons;
    const na = neurons[Math.floor(rnd(0, neurons.length))];
    const nb = neurons[Math.floor(rnd(0, neurons.length))];
    if (na !== nb) {
      state.sparks.push({ x: na.x, y: na.y, tx: nb.x, ty: nb.y, prog: 0, speed: rnd(0.8, 2.5), alpha: 1 });
    }
    state.lastSpark = t;
  }
  state.sparks.forEach((sp, i) => {
    sp.prog = Math.min(1, sp.prog + 0.04 * sp.speed);
    sp.alpha = Math.max(0, 1 - sp.prog * 1.2);
    const spx = sp.x + offsetX + (sp.tx - sp.x) * sp.prog;
    const spy = sp.y + offsetY + (sp.ty - sp.y) * sp.prog;
    glow(ctx, spx, spy, 12, [220, 200, 255, sp.alpha * 0.9]);
    ctx.fillStyle = `rgba(255,255,255,${sp.alpha})`;
    ctx.beginPath(); ctx.arc(spx, spy, 2, 0, Math.PI * 2); ctx.fill();
  });
  for (let i = state.sparks.length - 1; i >= 0; i--) {
    if (state.sparks[i].alpha <= 0) state.sparks.splice(i, 1);
  }

  // ── Floating equations ────────────────────────────────────
  if (t - state.lastEq > 3 && state.equations.length < 4) {
    state.equations.push({ txt: EQ_SYMBOLS[Math.floor(rnd(0, EQ_SYMBOLS.length))], x: rnd(W * 0.1, W * 0.9), y: H * 0.75, t });
    state.lastEq = t;
  }
  ctx.font = "italic bold 15px serif";
  state.equations.forEach((eq, i) => {
    const age = t - eq.t;
    const alpha = Math.min(1, age * 1.5) * Math.max(0, 1 - (age - 5) / 3);
    const ey = eq.y - age * 12 + offsetY * 0.3;
    ctx.fillStyle = `rgba(200,180,255,${alpha * 0.6})`;
    ctx.fillText(eq.txt, eq.x + offsetX * 0.4, ey);
    if (alpha <= 0) { state.equations.splice(i, 1); }
  });

  // Center cosmic glow
  glow(ctx, W / 2 + offsetX * 0.2, H / 2 + offsetY * 0.15, H * 0.55, [100, 50, 200, 0.07]);
  vignette(ctx, W, H, 0.78, "4,0,15");
}

/* ══════════════════════════════════════════════════════════
   WORLD 05 — Motion / 3D  "The Cinematic Void"
══════════════════════════════════════════════════════════ */
interface MotionParticle { x: number; y: number; vx: number; vy: number; alpha: number; size: number }
interface MotionState { shapes: { rot: number; rotSpeed: number; size: number; sides: number; depth: number; cx: number; cy: number }[]; particles: MotionParticle[]; lastExplosion: number; grainFrame: number }

function initMotion(W: number, H: number): MotionState {
  return {
    shapes: [
      { rot: 0, rotSpeed: 0.3, size: Math.min(W, H) * 0.18, sides: 4, depth: 1, cx: W / 2, cy: H / 2 },
      { rot: 0.5, rotSpeed: -0.18, size: Math.min(W, H) * 0.28, sides: 6, depth: 0.6, cx: W / 2, cy: H / 2 },
      { rot: 1, rotSpeed: 0.12, size: Math.min(W, H) * 0.42, sides: 3, depth: 0.35, cx: W / 2, cy: H / 2 },
    ],
    particles: Array.from({ length: 80 }, () => ({
      x: rnd(0, W), y: rnd(0, H),
      vx: rnd(-0.3, 0.3), vy: rnd(-0.4, -0.1),
      alpha: rnd(0.1, 0.5), size: rnd(1, 3.5),
    })),
    lastExplosion: 0,
    grainFrame: 0,
  };
}

function drawMotion(
  ctx: CanvasRenderingContext2D,
  W: number, H: number, t: number,
  state: MotionState,
  mx: number, my: number
) {
  ctx.fillStyle = "#060010";
  ctx.fillRect(0, 0, W, H);

  const barH = Math.max(H * 0.07, 40);
  const offsetX = (mx - W / 2) * 0.05;
  const offsetY = (my - H / 2) * 0.04;

  // ── Depth shapes (wireframe) ─────────────────────────────
  const cx = W / 2 + offsetX * 0.6;
  const cy = H / 2 + offsetY * 0.5;

  state.shapes.forEach((s, si) => {
    s.rot += s.rotSpeed * 0.012;
    const alpha = s.depth * (0.12 + 0.08 * Math.sin(t * 0.4 + si));
    ctx.strokeStyle = `rgba(232,97,74,${alpha})`;
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    const distortX = Math.sin(t * 0.2 + si) * s.size * 0.05;
    const distortY = Math.cos(t * 0.3 + si) * s.size * 0.03;
    for (let v = 0; v <= s.sides; v++) {
      const angle = s.rot + (v / s.sides) * Math.PI * 2;
      const rx = cx + (s.size + distortX) * Math.cos(angle);
      const ry = cy + (s.size * 0.5 + distortY) * Math.sin(angle);
      if (v === 0) ctx.moveTo(rx, ry); else ctx.lineTo(rx, ry);
    }
    ctx.stroke();

    // Diagonals
    for (let v = 0; v < s.sides; v += 2) {
      const a1 = s.rot + (v / s.sides) * Math.PI * 2;
      const a2 = s.rot + ((v + s.sides / 2) / s.sides) * Math.PI * 2;
      ctx.strokeStyle = `rgba(232,97,74,${alpha * 0.4})`;
      ctx.beginPath();
      ctx.moveTo(cx + s.size * Math.cos(a1), cy + s.size * 0.5 * Math.sin(a1));
      ctx.lineTo(cx + s.size * Math.cos(a2), cy + s.size * 0.5 * Math.sin(a2));
      ctx.stroke();
    }
  });

  // ── Lens flare center ────────────────────────────────────
  glow(ctx, cx, cy, 80, [232, 97, 74, 0.18]);
  glow(ctx, cx, cy, 20, [255, 180, 100, 0.4]);
  ctx.fillStyle = "rgba(255,220,180,0.5)";
  ctx.beginPath(); ctx.arc(cx, cy, 3, 0, Math.PI * 2); ctx.fill();

  // ── Floating particles ────────────────────────────────────
  state.particles.forEach((p) => {
    p.x += p.vx; p.y += p.vy;
    if (p.y < -10) { p.y = H + 10; p.x = rnd(0, W); }
    if (p.x < 0 || p.x > W) p.vx *= -1;
    const tw = 0.4 + 0.6 * Math.abs(Math.sin(t * 1.2 + p.x * 0.02));
    ctx.fillStyle = `rgba(232,97,74,${p.alpha * tw})`;
    ctx.beginPath(); ctx.arc(p.x + offsetX * p.size * 0.04, p.y + offsetY * p.size * 0.03, p.size, 0, Math.PI * 2); ctx.fill();
  });

  // ── Film grain (every 3 frames) ──────────────────────────
  state.grainFrame++;
  if (state.grainFrame % 3 === 0) {
    for (let i = 0; i < 600; i++) {
      ctx.fillStyle = `rgba(255,255,255,${rnd(0, 0.03)})`;
      ctx.fillRect(rnd(0, W), rnd(0, H), 1.5, 1.5);
    }
  }

  // ── Letterbox bars ───────────────────────────────────────
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, W, barH);
  ctx.fillRect(0, H - barH, W, barH);

  // ── Timeline at bottom (above letterbox) ─────────────────
  const tlY = H - barH + 8;
  const tlX1 = 24, tlX2 = W - 24;

  ctx.strokeStyle = "rgba(232,97,74,0.25)";
  ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(tlX1, tlY + 8); ctx.lineTo(tlX2, tlY + 8); ctx.stroke();

  // Tick marks
  for (let k = 0; k <= 30; k++) {
    const kx = tlX1 + ((tlX2 - tlX1) * k) / 30;
    const isKey = k % 5 === 0;
    ctx.strokeStyle = isKey ? "rgba(232,97,74,0.55)" : "rgba(232,97,74,0.2)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(kx, tlY + 4); ctx.lineTo(kx, tlY + 12); ctx.stroke();
    // Keyframe diamond
    if (isKey) {
      ctx.fillStyle = "rgba(232,97,74,0.6)";
      ctx.save();
      ctx.translate(kx, tlY + 8);
      ctx.rotate(Math.PI / 4);
      ctx.fillRect(-3, -3, 6, 6);
      ctx.restore();
    }
  }

  // Playhead
  const ph = tlX1 + ((tlX2 - tlX1) * (((t * 0.3) % 1)));
  ctx.strokeStyle = "rgba(255,255,255,0.8)";
  ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(ph, tlY + 2); ctx.lineTo(ph, tlY + 14); ctx.stroke();
  glow(ctx, ph, tlY + 8, 8, [255, 255, 255, 0.5]);

  // ORDERLY timestamp top-left (inside bar)
  ctx.font = "10px monospace";
  ctx.fillStyle = "rgba(232,97,74,0.5)";
  ctx.fillText(`ORDERLY MOTION ∙ 00:00:${String(Math.floor((t * 0.3 * 60) % 60)).padStart(2, "0")}`, 16, barH - 8);

  // Aspect ratio corners
  const co = 14;
  const cl = 20;
  ctx.strokeStyle = "rgba(255,255,255,0.2)";
  ctx.lineWidth = 1;
  [[co, barH + co], [W - co, barH + co], [co, H - barH - co], [W - co, H - barH - co]].forEach(([px, py], ci) => {
    ctx.beginPath();
    const dx = ci % 2 === 0 ? 1 : -1;
    const dy = ci < 2 ? 1 : -1;
    ctx.moveTo(px, py); ctx.lineTo(px + dx * cl, py);
    ctx.moveTo(px, py); ctx.lineTo(px, py + dy * cl);
    ctx.stroke();
  });

  vignette(ctx, W, H, 0.65, "6,0,16");
}

/* ══════════════════════════════════════════════════════════
   WORLD 06 — Marketing / E-Commerce  "The Data Planet"
══════════════════════════════════════════════════════════ */
interface MarketBar { x: number; targetH: number; currentH: number }
interface MarketMetric { text: string; x: number; y: number; born: number }
interface MarketSignal { x: number; y: number; phase: number }
interface MarketState { bars: MarketBar[]; metrics: MarketMetric[]; lastMetric: number; signals: MarketSignal[]; mapDots: { x: number; y: number }[] }

// Simplified continent dot map (normalized 0-1)
const MAP_DOTS_NORMALIZED: [number, number][] = [
  // Europe
  [0.49,0.27],[0.51,0.25],[0.53,0.27],[0.55,0.26],[0.57,0.28],[0.52,0.30],[0.54,0.30],[0.56,0.30],[0.50,0.30],
  // Asia
  [0.62,0.28],[0.65,0.27],[0.68,0.26],[0.70,0.28],[0.72,0.30],[0.75,0.29],[0.68,0.32],[0.72,0.35],[0.65,0.35],
  [0.60,0.30],[0.58,0.32],[0.63,0.38],[0.70,0.40],[0.75,0.38],
  // Africa
  [0.51,0.38],[0.53,0.40],[0.55,0.45],[0.52,0.50],[0.54,0.55],[0.50,0.45],[0.56,0.38],[0.53,0.35],
  // Americas
  [0.25,0.28],[0.27,0.30],[0.23,0.35],[0.25,0.40],[0.28,0.45],[0.26,0.50],[0.22,0.40],[0.30,0.30],
  [0.18,0.25],[0.20,0.22],[0.22,0.28],
  // Australia
  [0.78,0.55],[0.80,0.53],[0.82,0.56],[0.79,0.58],
];

const MARKET_SIGNALS: [number, number][] = [
  [0.5, 0.28], [0.75, 0.30], [0.25, 0.30], [0.52, 0.42], [0.28, 0.45], [0.68, 0.38],
];

const METRIC_TEXTS = ["+340% ROI", "2.1M Reach", "8.4× ROAS", "−62% CAC", "+18% CTR", "$4.2M GMV"];

function initMarketing(W: number, H: number): MarketState {
  const barCount = 12;
  return {
    bars: Array.from({ length: barCount }, (_, i) => ({
      x: W * 0.06 + (W * 0.88 * i) / (barCount - 1),
      targetH: rnd(H * 0.08, H * 0.42),
      currentH: rnd(0, 20),
    })),
    metrics: [],
    lastMetric: 0,
    signals: MARKET_SIGNALS.map(([nx, ny]) => ({ x: nx * W, y: ny * H, phase: rnd(0, Math.PI * 2) })),
    mapDots: MAP_DOTS_NORMALIZED.map(([nx, ny]) => ({ x: nx * W, y: ny * H })),
  };
}

function drawMarketing(
  ctx: CanvasRenderingContext2D,
  W: number, H: number, t: number,
  state: MarketState,
  mx: number, my: number
) {
  ctx.fillStyle = "#010F06";
  ctx.fillRect(0, 0, W, H);

  const offsetX = (mx - W / 2) * 0.04;
  const offsetY = (my - H / 2) * 0.03;

  // ── World map dots ───────────────────────────────────────
  state.mapDots.forEach((d, i) => {
    const pulse = 0.4 + 0.3 * Math.sin(t * 0.4 + i * 0.3);
    ctx.fillStyle = `rgba(34,197,94,${pulse * 0.45})`;
    ctx.beginPath();
    ctx.arc(d.x + offsetX * 0.3, d.y + offsetY * 0.3, 3.5, 0, Math.PI * 2);
    ctx.fill();
  });

  // ── Data stream arcs between signals ────────────────────
  for (let a = 0; a < state.signals.length; a++) {
    for (let b = a + 1; b < state.signals.length; b++) {
      const sa = state.signals[a], sb = state.signals[b];
      const frac = ((t * 0.25 + a * 0.15 + b * 0.1) % 1);
      const px = sa.x + offsetX + (sb.x - sa.x) * frac;
      const py = sa.y + offsetY + (sb.y - sa.y) * frac - Math.sin(frac * Math.PI) * 40;
      glow(ctx, px, py, 8, [74, 222, 128, 0.6]);
      ctx.fillStyle = "rgba(134,239,172,0.8)";
      ctx.beginPath(); ctx.arc(px, py, 2, 0, Math.PI * 2); ctx.fill();
    }
  }

  // ── Signal rings from cities ─────────────────────────────
  state.signals.forEach((s) => {
    for (let ring = 0; ring < 3; ring++) {
      const phase = ((t * 0.5 + s.phase + ring * 0.4) % 1);
      const r = phase * 50;
      const a = (1 - phase) * 0.5;
      ctx.strokeStyle = `rgba(34,197,94,${a})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(s.x + offsetX * 0.5, s.y + offsetY * 0.4, r, 0, Math.PI * 2);
      ctx.stroke();
    }
    glow(ctx, s.x + offsetX * 0.5, s.y + offsetY * 0.4, 12, [34, 197, 94, 0.7]);
    ctx.fillStyle = "rgba(74,222,128,1)";
    ctx.beginPath(); ctx.arc(s.x + offsetX * 0.5, s.y + offsetY * 0.4, 3, 0, Math.PI * 2); ctx.fill();
  });

  // ── Rising bar buildings ─────────────────────────────────
  const baseY = H * 0.82;
  state.bars.forEach((b, i) => {
    const dynamicTarget = b.targetH + H * 0.06 * Math.sin(t * 0.5 + i * 0.7);
    b.currentH += (dynamicTarget - b.currentH) * 0.025;

    const bx = b.x + offsetX * 0.5;
    const barWidth = Math.max(14, W * 0.06);

    // Building body
    const bg = ctx.createLinearGradient(0, baseY - b.currentH, 0, baseY);
    bg.addColorStop(0, `rgba(34,197,94,${0.5 + 0.2 * Math.sin(t * 0.3 + i)})`);
    bg.addColorStop(1, "rgba(34,197,94,0.04)");
    ctx.fillStyle = bg;
    ctx.fillRect(bx - barWidth / 2, baseY - b.currentH, barWidth, b.currentH);

    // Roof glow
    glow(ctx, bx, baseY - b.currentH, 22, [74, 222, 128, 0.55]);
    ctx.fillStyle = "rgba(134,239,172,0.9)";
    ctx.fillRect(bx - barWidth / 2, baseY - b.currentH - 2, barWidth, 3);

    // Building windows (dots)
    for (let row = 1; row < 5; row++) {
      const wy = baseY - b.currentH * (row / 5);
      if (wy > baseY - b.currentH + 8) {
        ctx.fillStyle = `rgba(134,239,172,${0.15 + 0.15 * Math.sin(t + i + row)})`;
        ctx.fillRect(bx - barWidth / 2 + 4, wy, barWidth - 8, 3);
      }
    }
  });

  // ── Floating metrics (holographic) ──────────────────────
  if (t - state.lastMetric > 2.5 && state.metrics.length < 5) {
    state.metrics.push({ text: METRIC_TEXTS[Math.floor(rnd(0, METRIC_TEXTS.length))], x: rnd(W * 0.08, W * 0.85), y: H * 0.65, born: t });
    state.lastMetric = t;
  }
  ctx.font = "bold 16px monospace";
  state.metrics.forEach((m, i) => {
    const age = t - m.born;
    const alpha = Math.min(1, age * 2) * Math.max(0, 1 - (age - 5) / 3);
    const my2 = m.y - age * 10 + offsetY * 0.3;
    ctx.fillStyle = `rgba(74,222,128,${alpha * 0.8})`;
    ctx.fillText(m.text, m.x + offsetX * 0.4, my2);
    if (alpha <= 0) state.metrics.splice(i, 1);
  });

  // Grid lines
  ctx.setLineDash([4, 8]);
  for (let l = 1; l <= 4; l++) {
    const gy = baseY - (baseY * 0.55 * l) / 4;
    ctx.strokeStyle = "rgba(34,197,94,0.06)";
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(30, gy); ctx.lineTo(W - 30, gy); ctx.stroke();
  }
  ctx.setLineDash([]);

  // Central ambient glow
  glow(ctx, W / 2, H * 0.4, H * 0.5, [34, 197, 94, 0.05]);
  vignette(ctx, W, H, 0.75, "1,15,6");
}

/* ══════════════════════════════════════════════════════════
   WorldCanvas Component
══════════════════════════════════════════════════════════ */
type AnyState = UIUXState | EngState | BrandState | AIState | MotionState | MarketState;

export const WorldCanvas: React.FC<WorldCanvasProps> = ({ worldId, opacity = 1 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<AnyState | null>(null);
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const targetMouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const onMouse = (e: MouseEvent) => { targetMouseRef.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("mousemove", onMouse);

    let W = canvas.offsetWidth || window.innerWidth;
    let H = canvas.offsetHeight || window.innerHeight;
    canvas.width = W; canvas.height = H;

    const getGroup = (id: WorldId) =>
      id === "uiux" ? "uiux" :
      id === "engineering" || id === "saas" ? "engineering" :
      id === "branding" || id === "packaging" ? "branding" :
      id === "ai" ? "ai" :
      id === "motion" ? "motion" : "marketing";

    const group = getGroup(worldId);

    const initState = () => {
      switch (group) {
        case "uiux": stateRef.current = initUIUX(W, H); break;
        case "engineering": stateRef.current = initEngineering(W, H); break;
        case "branding": stateRef.current = initBranding(W, H); break;
        case "ai": stateRef.current = initAI(W, H); break;
        case "motion": stateRef.current = initMotion(W, H); break;
        default: stateRef.current = initMarketing(W, H); break;
      }
    };
    initState();
    targetMouseRef.current = { x: W / 2, y: H / 2 };
    mouseRef.current = { x: W / 2, y: H / 2 };

    const onResize = () => {
      W = canvas.offsetWidth || window.innerWidth;
      H = canvas.offsetHeight || window.innerHeight;
      canvas.width = W; canvas.height = H;
      initState();
    };
    window.addEventListener("resize", onResize);

    const start = performance.now();
    const loop = (now: number) => {
      const t = (now - start) / 1000;

      // Smooth mouse
      const lerpF = 0.06;
      mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * lerpF;
      mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * lerpF;
      const { x: mx, y: my } = mouseRef.current;

      switch (group) {
        case "uiux": drawUIUX(ctx, W, H, t, stateRef.current as UIUXState, mx, my); break;
        case "engineering": drawEngineering(ctx, W, H, t, stateRef.current as EngState, mx, my); break;
        case "branding": drawBranding(ctx, W, H, t, stateRef.current as BrandState, mx, my); break;
        case "ai": drawAI(ctx, W, H, t, stateRef.current as AIState, mx, my); break;
        case "motion": drawMotion(ctx, W, H, t, stateRef.current as MotionState, mx, my); break;
        default: drawMarketing(ctx, W, H, t, stateRef.current as MarketState, mx, my); break;
      }

      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize", onResize);
    };
  }, [worldId]);

  return (
    <canvas
      ref={canvasRef}
      style={{ display: "block", width: "100%", height: "100%", opacity }}
    />
  );
};
