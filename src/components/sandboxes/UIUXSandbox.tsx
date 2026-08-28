"use client";

import React, { useState } from "react";
import {
  Sparkles,
  TrendingUp,
  CreditCard,
  Layers,
  ArrowUpRight,
  Sun,
  Moon,
  Zap,
  Activity,
  CheckCircle2,
  Sliders,
} from "lucide-react";

interface UIUXSandboxProps {
  locale: "en" | "ar";
  onStartProject?: () => void;
}

export const UIUXSandbox: React.FC<UIUXSandboxProps> = ({ locale, onStartProject }) => {
  const isAr = locale === "ar";
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [activeTab, setActiveTab] = useState<"overview" | "analytics" | "transactions">("overview");
  const [timeframe, setTimeframe] = useState<"1D" | "1W" | "1M" | "1Y">("1M");
  const [balance, setBalance] = useState(148290.5);
  const [transferAmount, setTransferAmount] = useState("2,500");
  const [transferSent, setTransferSent] = useState(false);

  const isDark = theme === "dark";

  const handleSend = () => {
    setTransferSent(true);
    setTimeout(() => setTransferSent(false), 2400);
  };

  return (
    <div
      className={`w-full max-w-5xl mx-auto rounded-[32px] border transition-all duration-500 overflow-hidden shadow-2xl ${
        isDark
          ? "bg-[#09090E]/95 border-white/15 text-white shadow-[0_30px_90px_rgba(0,0,0,0.9)]"
          : "bg-white/95 border-violet-200 text-slate-900 shadow-[0_30px_90px_rgba(109,40,217,0.15)]"
      }`}
      dir={isAr ? "rtl" : "ltr"}
    >
      {/* ── Top App Bar ── */}
      <div
        className={`flex items-center justify-between px-6 py-4 border-b ${
          isDark ? "border-white/10 bg-white/[0.02]" : "border-slate-100 bg-slate-50/50"
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <span className="text-xs font-mono font-bold tracking-widest uppercase opacity-60">
            ORDERLY OS ∙ {isAr ? "محاكي تجربة المستخدم الفاخرة" : "LUXURY FINTECH / AI INTERFACE"}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Theme switcher */}
          <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono border transition-all ${
              isDark
                ? "bg-white/10 border-white/15 text-white hover:bg-white/20"
                : "bg-slate-100 border-slate-200 text-slate-800 hover:bg-slate-200"
            }`}
          >
            {isDark ? <Sun size={13} className="text-amber-400" /> : <Moon size={13} className="text-violet-600" />}
            <span>{isDark ? (isAr ? "وضع النهار" : "Light Mode") : (isAr ? "وضع الليل" : "Dark Mode")}</span>
          </button>
        </div>
      </div>

      {/* ── Main App Canvas ── */}
      <div className="p-6 md:p-8 space-y-6">
        {/* Header Metric Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Total Net Worth Card */}
          <div
            className={`p-6 rounded-2xl border transition-all relative overflow-hidden ${
              isDark
                ? "bg-gradient-to-br from-violet-900/30 via-white/[0.02] to-transparent border-violet-500/30"
                : "bg-gradient-to-br from-violet-50 via-white to-slate-50 border-violet-200"
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono uppercase tracking-wider opacity-60">
                {isAr ? "إجمالي المحفظة الاستثمارية" : "TOTAL PORTFOLIO VALUE"}
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                <TrendingUp size={11} /> +18.4%
              </span>
            </div>
            <div className="text-3xl sm:text-4xl font-display font-black tracking-tight mb-2">
              ${balance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </div>
            <div className="text-xs font-mono opacity-50 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>{isAr ? "محدّث لحظياً عبر الـ WebSocket" : "Real-time streaming via WebSocket"}</span>
            </div>
          </div>

          {/* Quick Transfer Widget */}
          <div
            className={`p-6 rounded-2xl border transition-all ${
              isDark ? "bg-white/[0.03] border-white/10" : "bg-slate-50 border-slate-200"
            }`}
          >
            <span className="text-xs font-mono uppercase tracking-wider opacity-60 block mb-3">
              {isAr ? "تحويل فوري ذكي" : "SMART INSTANT TRANSFER"}
            </span>
            <div className="flex items-center gap-2 mb-3">
              <div className="relative flex-1">
                <span className="absolute start-3 top-2.5 text-xs opacity-50">$</span>
                <input
                  type="text"
                  value={transferAmount}
                  onChange={(e) => setTransferAmount(e.target.value)}
                  className={`w-full ps-7 pe-3 py-2 rounded-xl text-sm font-bold border focus:outline-none ${
                    isDark
                      ? "bg-white/5 border-white/15 text-white focus:border-violet-500"
                      : "bg-white border-slate-200 text-slate-900 focus:border-violet-600"
                  }`}
                />
              </div>
              <button
                onClick={handleSend}
                disabled={transferSent}
                className="px-4 py-2 rounded-xl bg-violet-600 text-white font-bold text-xs hover:bg-violet-500 transition-all flex items-center gap-1.5 shadow-lg shadow-violet-600/30"
              >
                {transferSent ? (
                  <>
                    <CheckCircle2 size={13} className="text-emerald-300" />
                    <span>{isAr ? "تم!" : "Sent!"}</span>
                  </>
                ) : (
                  <>
                    <Zap size={13} />
                    <span>{isAr ? "إرسال" : "Send"}</span>
                  </>
                )}
              </button>
            </div>
            <span className="text-[10px] font-mono opacity-40 block">
              {isAr ? "جرب الضغط لتشاهد التفاعل اللمسي" : "Click send to test micro-interaction"}
            </span>
          </div>

          {/* AI Yield Optimizer */}
          <div
            className={`p-6 rounded-2xl border transition-all ${
              isDark ? "bg-white/[0.03] border-white/10" : "bg-slate-50 border-slate-200"
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono uppercase tracking-wider opacity-60 flex items-center gap-1.5">
                <Sparkles size={12} className="text-violet-400" />
                <span>{isAr ? "محرك العائد الذكي AI" : "AI YIELD ENGINE"}</span>
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-400 font-bold">
                ACTIVE
              </span>
            </div>
            <div className="text-xl font-display font-bold mb-1">
              {isAr ? "إعادة توجيه 14.8% إلى عوائد أعلى" : "+$3,420.00 Reallocated"}
            </div>
            <p className="text-xs opacity-55 leading-relaxed">
              {isAr
                ? "خوارزمية تنبؤية تحسن توزيع الأصول في الوقت الفعلي."
                : "Predictive engine automatically rebalancing treasury."}
            </p>
          </div>
        </div>

        {/* Interactive Chart & Telemetry Area */}
        <div
          className={`p-6 rounded-2xl border ${
            isDark ? "bg-white/[0.02] border-white/10" : "bg-slate-50/70 border-slate-200"
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h4 className="text-base font-display font-bold">
                {isAr ? "أداء الأصول ومعدل التحويل" : "Liquidity & Conversion Velocity"}
              </h4>
              <span className="text-xs font-mono opacity-50">
                {isAr ? "مخطط بياني متجهي عالي الدقة 60FPS" : "High-precision vector spline visualizer"}
              </span>
            </div>

            {/* Timeframe selector */}
            <div className="flex items-center gap-1 p-1 rounded-xl bg-white/5 border border-white/10 self-start">
              {(["1D", "1W", "1M", "1Y"] as const).map((tf) => (
                <button
                  key={tf}
                  onClick={() => {
                    setTimeframe(tf);
                    setBalance((b) => (tf === "1Y" ? 210450 : tf === "1M" ? 148290.5 : 132000));
                  }}
                  className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                    timeframe === tf
                      ? "bg-violet-600 text-white font-bold shadow-md"
                      : "opacity-60 hover:opacity-100"
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive SVG Chart */}
          <div className="w-full h-44 relative flex items-end">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 500 120" preserveAspectRatio="none">
              <defs>
                <linearGradient id="uiuxGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              {/* Area */}
              <path
                d={
                  timeframe === "1Y"
                    ? "M0,100 Q120,40 250,70 T500,10 L500,120 L0,120 Z"
                    : timeframe === "1M"
                    ? "M0,90 Q150,20 300,50 T500,25 L500,120 L0,120 Z"
                    : "M0,80 Q100,60 250,30 T500,45 L500,120 L0,120 Z"
                }
                fill="url(#uiuxGrad)"
                className="transition-all duration-700 ease-out"
              />
              {/* Stroke line */}
              <path
                d={
                  timeframe === "1Y"
                    ? "M0,100 Q120,40 250,70 T500,10"
                    : timeframe === "1M"
                    ? "M0,90 Q150,20 300,50 T500,25"
                    : "M0,80 Q100,60 250,30 T500,45"
                }
                fill="none"
                stroke="#8b5cf6"
                strokeWidth="3"
                strokeLinecap="round"
                className="transition-all duration-700 ease-out"
              />
            </svg>
          </div>
        </div>

        {/* Bottom Banner + Direct Project Bridge */}
        <div
          className={`p-6 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-4 ${
            isDark
              ? "bg-gradient-to-r from-violet-950/40 via-purple-950/20 to-transparent border-violet-500/30"
              : "bg-gradient-to-r from-violet-100/80 via-purple-50 to-white border-violet-200"
          }`}
        >
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-violet-600 text-white flex items-center justify-center flex-shrink-0 shadow-lg shadow-violet-600/30">
              <Layers size={20} />
            </div>
            <div>
              <h5 className="text-sm font-bold">
                {isAr ? "هل تريد واجهة لتطبيقك بنفس هذه السلاسة والفخامة؟" : "Want this level of interface engineering?"}
              </h5>
              <p className="text-xs opacity-60">
                {isAr
                  ? "نصمم ونبني أنظمة واجهات متكاملة تُبهر المستخدمين وتضاعف معدلات التحويل."
                  : "We craft custom design systems and fluid micro-interactions engineered for scale."}
              </p>
            </div>
          </div>

          {onStartProject && (
            <button
              onClick={onStartProject}
              className="px-6 py-3 rounded-full bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs tracking-wider uppercase flex items-center gap-2 transition-all shadow-xl shadow-violet-600/30 flex-shrink-0"
            >
              <span>{isAr ? "ابنِ مشروعي بنفس المستوى" : "BUILD TO THIS STANDARD"}</span>
              <ArrowUpRight size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
