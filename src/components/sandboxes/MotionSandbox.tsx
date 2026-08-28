"use client";

import React, { useState } from "react";
import {
  Film,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  ArrowUpRight,
  Sliders,
  Layers,
} from "lucide-react";

interface MotionSandboxProps {
  locale: "en" | "ar";
  onStartProject?: () => void;
}

export const MotionSandbox: React.FC<MotionSandboxProps> = ({ locale, onStartProject }) => {
  const isAr = locale === "ar";
  const [playProgress, setPlayProgress] = useState(45);
  const [isPlaying, setIsPlaying] = useState(false);
  const [easingMode, setEasingMode] = useState<"spring" | "cubic" | "linear">("spring");
  const [renderStyle, setRenderStyle] = useState<"metallic" | "wireframe" | "glass">("metallic");

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div
      className="w-full max-w-5xl mx-auto rounded-[32px] border border-rose-500/30 bg-[#0C020A]/95 text-white shadow-[0_30px_90px_rgba(0,0,0,0.9)] overflow-hidden"
      dir={isAr ? "rtl" : "ltr"}
    >
      {/* ── Top Bar ── */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-rose-500/20 bg-rose-950/20">
        <div className="flex items-center gap-3">
          <Film size={16} className="text-rose-400" />
          <span className="text-xs font-mono font-bold tracking-widest text-rose-400 uppercase">
            ORDERLY 3D & MOTION STUDIO // {isAr ? "محرر الموشن والأنيميشن الحركي" : "KINETIC TIMELINE & 3D RIG"}
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-rose-300/60">
          <span>60 FPS ∙ 4K PRORES EXPORT</span>
        </div>
      </div>

      {/* ── Main Interactive Studio ── */}
      <div className="p-6 md:p-8 space-y-6">
        {/* Interactive Kinetic Viewport */}
        <div className="p-8 sm:p-12 rounded-3xl border border-rose-500/30 bg-gradient-to-b from-rose-950/20 via-black to-black relative overflow-hidden flex flex-col items-center justify-center min-h-[260px]">
          {/* Animated SVG Morphing Kinetic Sculpture responding to Timeline Scrubber */}
          <div
            className="w-48 h-48 relative flex items-center justify-center transition-transform duration-75"
            style={{
              transform: `rotate(${playProgress * 3.6}deg) scale(${1 + Math.sin(playProgress * 0.05) * 0.2})`,
            }}
          >
            {/* Outer Ring */}
            <div
              className={`absolute inset-0 rounded-full border-2 border-dashed transition-all ${
                renderStyle === "metallic"
                  ? "border-rose-400 shadow-[0_0_30px_rgba(244,63,94,0.4)]"
                  : renderStyle === "wireframe"
                  ? "border-rose-300"
                  : "border-purple-300/50 backdrop-blur-md"
              }`}
            />
            {/* Mid Diamond */}
            <div
              className="absolute w-32 h-32 border-2 border-rose-500 transform rotate-45 transition-all"
              style={{ transform: `rotate(${playProgress * -2.4}deg)` }}
            />
            {/* Inner Core */}
            <div
              className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-rose-600 via-pink-500 to-amber-400 shadow-2xl transition-all"
              style={{ transform: `rotate(${playProgress * 4.8}deg)` }}
            />
          </div>

          <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-[11px] font-mono text-rose-300/50">
            <span>ROTATION: {(playProgress * 3.6).toFixed(1)}°</span>
            <span>FRAME: {Math.floor(playProgress * 0.6)} / 60</span>
          </div>
        </div>

        {/* Timeline Control Surface */}
        <div className="p-6 rounded-2xl border border-rose-500/20 bg-rose-950/10 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-rose-300 uppercase tracking-wider font-bold">
              {isAr ? "شريط الزمن التفاعلي (Scrub Timeline to Rotate 3D)" : "INTERACTIVE SCRUBBER"}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={togglePlay}
                className="px-4 py-1.5 rounded-full bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs font-mono flex items-center gap-1.5 shadow-md shadow-rose-600/30"
              >
                {isPlaying ? <Pause size={12} /> : <Play size={12} />}
                <span>{isPlaying ? "Pause" : "Play Loop"}</span>
              </button>
              <button
                onClick={() => setPlayProgress(0)}
                className="p-1.5 rounded-full border border-white/10 hover:bg-white/5 text-white/70"
              >
                <RotateCcw size={13} />
              </button>
            </div>
          </div>

          <input
            type="range"
            min="0"
            max="100"
            value={playProgress}
            onChange={(e) => setPlayProgress(Number(e.target.value))}
            className="w-full h-2.5 bg-rose-950 rounded-lg appearance-none cursor-pointer accent-rose-500"
          />

          {/* Shading & Easing Mode Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-rose-300/60 uppercase">{isAr ? "الماتيريال:" : "Shading:"}</span>
              {(["metallic", "wireframe", "glass"] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setRenderStyle(mode)}
                  className={`px-3 py-1 rounded-lg text-xs font-mono capitalize border transition-all ${
                    renderStyle === mode
                      ? "border-rose-400 bg-rose-500/20 text-white font-bold"
                      : "border-rose-500/10 text-white/50 hover:text-white"
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-rose-300/60 uppercase">{isAr ? "الانسيابية:" : "Easing:"}</span>
              {(["spring", "cubic", "linear"] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setEasingMode(mode)}
                  className={`px-3 py-1 rounded-lg text-xs font-mono capitalize border transition-all ${
                    easingMode === mode
                      ? "border-rose-400 bg-rose-500/20 text-white font-bold"
                      : "border-rose-500/10 text-white/50 hover:text-white"
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Conversion Bridge */}
        <div className="p-6 rounded-2xl border border-rose-500/30 bg-gradient-to-r from-rose-950/60 via-rose-900/20 to-transparent flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-rose-500 text-white flex items-center justify-center flex-shrink-0 font-bold shadow-lg shadow-rose-500/30">
              <Film size={20} />
            </div>
            <div>
              <h5 className="text-sm font-bold text-white">
                {isAr ? "تريد فيديو إعلاني سينمائي أو نماذج 3D ترفع قيمة علامتك؟" : "Want cinematic 3D films and motion design?"}
              </h5>
              <p className="text-xs text-rose-200/60">
                {isAr
                  ? "ننتج أفلام المنتجات ثلاثية الأبعاد والموشن جرافيكس بأعلى درجات الواقعية السينمائية."
                  : "We produce high-end 3D product visualizations, cinematic brand trailers, and spatial shaders."}
              </p>
            </div>
          </div>

          {onStartProject && (
            <button
              onClick={onStartProject}
              className="px-6 py-3 rounded-full bg-rose-500 hover:bg-rose-400 text-white font-bold text-xs font-mono uppercase tracking-wider flex items-center gap-2 transition-all shadow-xl shadow-rose-500/20 flex-shrink-0"
            >
              <span>{isAr ? "أنتج فيديو مشروعي 3D" : "COMMISSION 3D MOTION"}</span>
              <ArrowUpRight size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
