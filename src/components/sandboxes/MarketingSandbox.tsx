"use client";

import React, { useState } from "react";
import {
  TrendingUp,
  DollarSign,
  Users,
  Target,
  ArrowUpRight,
  Sparkles,
  BarChart3,
  Globe2,
} from "lucide-react";

interface MarketingSandboxProps {
  locale: "en" | "ar";
  onStartProject?: () => void;
}

export const MarketingSandbox: React.FC<MarketingSandboxProps> = ({ locale, onStartProject }) => {
  const isAr = locale === "ar";
  const [adSpend, setAdSpend] = useState(25000);
  const [selectedChannel, setSelectedChannel] = useState<"paid" | "seo" | "influencer" | "email">("paid");

  // Dynamic calculated growth metrics
  const estReach = (adSpend * 125).toLocaleString();
  const estRoas = selectedChannel === "paid" ? 6.8 : selectedChannel === "seo" ? 9.4 : 5.2;
  const estRevenue = (adSpend * estRoas).toLocaleString("en-US", { maximumFractionDigits: 0 });
  const estCacReduction = selectedChannel === "seo" ? "−58%" : "−42%";

  return (
    <div
      className="w-full max-w-5xl mx-auto rounded-[32px] border border-emerald-500/30 bg-[#011409]/95 text-white shadow-[0_30px_90px_rgba(0,0,0,0.9)] overflow-hidden"
      dir={isAr ? "rtl" : "ltr"}
    >
      {/* ── Top Bar ── */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-emerald-500/20 bg-emerald-950/20">
        <div className="flex items-center gap-3">
          <TrendingUp size={16} className="text-emerald-400" />
          <span className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase">
            ORDERLY GROWTH INTELLIGENCE // {isAr ? "محاكي العائد والنمو التسويقي" : "ROAS & ACQUISITION ENGINE"}
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-300/60">
          <span>DATA-DRIVEN REVENUE FUNNEL</span>
        </div>
      </div>

      {/* ── Main Interactive Simulator ── */}
      <div className="p-6 md:p-8 space-y-6">
        {/* Dynamic Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl border border-emerald-500/20 bg-emerald-950/20">
            <span className="text-xs font-mono text-emerald-300/60 uppercase block mb-1">
              {isAr ? "العائد الإعلاني التقديري (ROAS)" : "BLENDED ROAS"}
            </span>
            <div className="text-3xl font-display font-black text-emerald-400">
              {estRoas}×
            </div>
            <span className="text-[10px] font-mono text-emerald-300/50 mt-1 block">
              High-intent acquisition
            </span>
          </div>

          <div className="p-5 rounded-2xl border border-emerald-500/20 bg-emerald-950/20">
            <span className="text-xs font-mono text-emerald-300/60 uppercase block mb-1">
              {isAr ? "المبيعات المتوقعة" : "PROJECTED REVENUE"}
            </span>
            <div className="text-3xl font-display font-black text-white">
              ${estRevenue}
            </div>
            <span className="text-[10px] font-mono text-emerald-400 mt-1 block">
              Direct attributed pipeline
            </span>
          </div>

          <div className="p-5 rounded-2xl border border-emerald-500/20 bg-emerald-950/20">
            <span className="text-xs font-mono text-emerald-300/60 uppercase block mb-1">
              {isAr ? "الوصول المستهدف" : "ESTIMATED REACH"}
            </span>
            <div className="text-3xl font-display font-black text-white">
              {estReach}
            </div>
            <span className="text-[10px] font-mono text-emerald-300/50 mt-1 block">
              Qualified market impressions
            </span>
          </div>

          <div className="p-5 rounded-2xl border border-emerald-500/20 bg-emerald-950/20">
            <span className="text-xs font-mono text-emerald-300/60 uppercase block mb-1">
              {isAr ? "تخفيض تكلفة الاكتساب (CAC)" : "CAC REDUCTION"}
            </span>
            <div className="text-3xl font-display font-black text-emerald-400">
              {estCacReduction}
            </div>
            <span className="text-[10px] font-mono text-emerald-300/50 mt-1 block">
              Conversion rate optimization
            </span>
          </div>
        </div>

        {/* Interactive Spend Slider */}
        <div className="p-6 rounded-2xl border border-emerald-500/20 bg-emerald-950/10 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-emerald-300 uppercase tracking-wider font-bold">
              {isAr ? "حرّك ميزانية الحملة لتشاهد توقعات الإيرادات:" : "ADJUST MONTHLY GROWTH BUDGET (USD):"}
            </span>
            <span className="text-lg font-display font-bold text-emerald-400">
              ${adSpend.toLocaleString()} / mo
            </span>
          </div>

          <input
            type="range"
            min="5000"
            max="150000"
            step="5000"
            value={adSpend}
            onChange={(e) => setAdSpend(Number(e.target.value))}
            className="w-full h-2.5 bg-emerald-950 rounded-lg appearance-none cursor-pointer accent-emerald-500"
          />

          {/* Channels Selector */}
          <div className="pt-2">
            <span className="text-xs font-mono text-emerald-300/60 uppercase block mb-2">
              {isAr ? "اختر القناة التسويقية الأساسية:" : "SELECT PRIMARY ACQUISITION CHANNEL:"}
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {[
                { id: "paid", label: "Paid Media (Meta/Google)", desc: "Direct Conversion" },
                { id: "seo", label: "Organic Search & SEO", desc: "Long-term Compounding" },
                { id: "influencer", label: "Creator & PR Media", desc: "Brand Authority" },
                { id: "email", label: "CRM & Retention Funnel", desc: "Repeat Lifetime Value" },
              ].map((ch) => (
                <button
                  key={ch.id}
                  onClick={() => setSelectedChannel(ch.id as typeof selectedChannel)}
                  className={`p-3 rounded-xl border text-start text-xs font-mono transition-all flex flex-col justify-between ${
                    selectedChannel === ch.id
                      ? "border-emerald-400 bg-emerald-500/20 text-white font-bold shadow-md shadow-emerald-500/10"
                      : "border-emerald-500/15 bg-emerald-950/20 text-emerald-200/60 hover:border-emerald-500/40"
                  }`}
                >
                  <span className="text-xs">{ch.label}</span>
                  <span className="text-[10px] opacity-50 mt-1">{ch.desc}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Conversion Bridge */}
        <div className="p-6 rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-emerald-950/60 via-emerald-900/20 to-transparent flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-400 text-obsidian flex items-center justify-center flex-shrink-0 font-bold shadow-lg shadow-emerald-400/30">
              <BarChart3 size={20} />
            </div>
            <div>
              <h5 className="text-sm font-bold text-white">
                {isAr ? "تريد استراتيجية تسويق ونمو تحقق عوائد مضاعفة وقابلة للقياس؟" : "Ready to scale customer acquisition and revenue?"}
              </h5>
              <p className="text-xs text-emerald-200/60">
                {isAr
                  ? "ندير ونبني استراتيجيات التسويق الرقمي الشاملة لرفع المبيعات وخفض تكلفة الاكتساب."
                  : "We build data-driven performance funnels, high-ROAS paid campaigns, and organic SEO engines."}
              </p>
            </div>
          </div>

          {onStartProject && (
            <button
              onClick={onStartProject}
              className="px-6 py-3 rounded-full bg-emerald-400 hover:bg-emerald-300 text-obsidian font-bold text-xs font-mono uppercase tracking-wider flex items-center gap-2 transition-all shadow-xl shadow-emerald-400/20 flex-shrink-0"
            >
              <span>{isAr ? "أطلق حملتي التسويقية" : "SCALE MY GROWTH"}</span>
              <ArrowUpRight size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
