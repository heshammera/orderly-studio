"use client";

import React, { useState, useEffect } from "react";
import {
  Cpu,
  Server,
  Activity,
  Zap,
  Globe2,
  ShieldCheck,
  ArrowUpRight,
  Database,
  RefreshCw,
} from "lucide-react";

interface EngineeringSandboxProps {
  locale: "en" | "ar";
  onStartProject?: () => void;
}

export const EngineeringSandbox: React.FC<EngineeringSandboxProps> = ({ locale, onStartProject }) => {
  const isAr = locale === "ar";
  const [trafficRps, setTrafficRps] = useState(48000);
  const [activeRegion, setActiveRegion] = useState<"fra" | "iad" | "tyo" | "ruh">("ruh");
  const [nodesOnline, setNodesOnline] = useState(16);
  const [latency, setLatency] = useState(14);
  const [isScaling, setIsScaling] = useState(false);
  const [apiQueriesRun, setApiQueriesRun] = useState(1420);

  const triggerScale = () => {
    setIsScaling(true);
    setTimeout(() => {
      setNodesOnline((n) => (n === 16 ? 32 : 16));
      setLatency((l) => (l === 14 ? 8 : 14));
      setIsScaling(false);
    }, 1200);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setApiQueriesRun((q) => q + Math.floor(Math.random() * 12 + 5));
    }, 800);
    return () => clearInterval(interval);
  }, []);

  const regions = [
    { id: "ruh", name: isAr ? "الرياض (me-central-1)" : "Riyadh (me-central-1)", ping: "6ms" },
    { id: "fra", name: isAr ? "فرانكفورت (eu-central-1)" : "Frankfurt (eu-central-1)", ping: "22ms" },
    { id: "iad", name: isAr ? "فرجينيا (us-east-1)" : "Virginia (us-east-1)", ping: "78ms" },
    { id: "tyo", name: isAr ? "طوكيو (ap-northeast-1)" : "Tokyo (ap-northeast-1)", ping: "115ms" },
  ];

  return (
    <div
      className="w-full max-w-5xl mx-auto rounded-[32px] border border-sky-500/30 bg-[#020814]/95 text-white shadow-[0_30px_90px_rgba(0,0,0,0.9)] overflow-hidden"
      dir={isAr ? "rtl" : "ltr"}
    >
      {/* ── Top Terminal Bar ── */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-sky-500/20 bg-sky-950/20">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-ping" />
          <span className="text-xs font-mono font-bold tracking-widest text-sky-400 uppercase">
            ORDERLY CLOUD ARCHITECTURE // {isAr ? "محاكي الأنظمة السحابية الموزعة" : "DISTRIBUTED SYSTEM TELEMETRY"}
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-sky-300/60">
          <ShieldCheck size={14} className="text-sky-400" />
          <span>99.99% UPTIME SLA</span>
        </div>
      </div>

      {/* ── Live Control Surface ── */}
      <div className="p-6 md:p-8 space-y-6">
        {/* Top Control Panel */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Active Latency */}
          <div className="p-5 rounded-2xl border border-sky-500/20 bg-sky-950/20">
            <span className="text-xs font-mono text-sky-300/60 uppercase block mb-1">
              {isAr ? "زمن الاستجابة (Latency)" : "P99 RESPONSE TIME"}
            </span>
            <div className="text-3xl font-display font-black text-sky-400">
              {latency}ms
            </div>
            <span className="text-[10px] font-mono text-emerald-400 mt-1 block">
              ✓ Edge Caching Sub-15ms
            </span>
          </div>

          {/* Nodes Online */}
          <div className="p-5 rounded-2xl border border-sky-500/20 bg-sky-950/20">
            <span className="text-xs font-mono text-sky-300/60 uppercase block mb-1">
              {isAr ? "العقد النشطة (Cluster Nodes)" : "ACTIVE CLUSTER NODES"}
            </span>
            <div className="text-3xl font-display font-black text-white">
              {nodesOnline} <span className="text-sm font-mono text-sky-400 font-normal">VMs</span>
            </div>
            <span className="text-[10px] font-mono text-sky-300/50 mt-1 block">
              Auto-sharded PostgreSQL
            </span>
          </div>

          {/* Requests Processed */}
          <div className="p-5 rounded-2xl border border-sky-500/20 bg-sky-950/20">
            <span className="text-xs font-mono text-sky-300/60 uppercase block mb-1">
              {isAr ? "الطلبات المعالجة (RPS)" : "THROUGHPUT RATE"}
            </span>
            <div className="text-3xl font-display font-black text-white">
              {trafficRps.toLocaleString()} <span className="text-sm font-mono text-sky-400 font-normal">rps</span>
            </div>
            <span className="text-[10px] font-mono text-sky-300/50 mt-1 block">
              Zero-drop load balancer
            </span>
          </div>

          {/* Scale Trigger Action */}
          <div className="p-5 rounded-2xl border border-sky-500/30 bg-gradient-to-br from-sky-900/30 to-transparent flex flex-col justify-between">
            <span className="text-xs font-mono text-sky-300/70 uppercase block">
              {isAr ? "اختبار التوسع الفوري" : "SIMULATE AUTO-SCALE"}
            </span>
            <button
              onClick={triggerScale}
              disabled={isScaling}
              className="mt-2 w-full py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-obsidian font-bold text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg shadow-sky-500/20 disabled:opacity-50"
            >
              <RefreshCw size={13} className={isScaling ? "animate-spin" : ""} />
              <span>{isScaling ? (isAr ? "جارٍ التوسع..." : "SCALING...") : (isAr ? "مضاعفة السيرفرات 2×" : "DOUBLE NODES 2X")}</span>
            </button>
          </div>
        </div>

        {/* Traffic Load Slider & Region Selectors */}
        <div className="p-6 rounded-2xl border border-sky-500/20 bg-sky-950/10 space-y-5">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-sky-300 uppercase tracking-wider font-bold">
                {isAr ? "محاكي ضغط الزوار (Simulate Concurrent Traffic Load)" : "SIMULATE TRAFFIC PRESSURE (1K - 500K RPS)"}
              </span>
              <span className="text-xs font-mono text-sky-400 font-bold">
                {trafficRps.toLocaleString()} req/sec
              </span>
            </div>
            <input
              type="range"
              min="5000"
              max="250000"
              step="5000"
              value={trafficRps}
              onChange={(e) => {
                const val = Number(e.target.value);
                setTrafficRps(val);
                setLatency(Math.max(6, Math.floor(val / 8000)));
              }}
              className="w-full h-2 bg-sky-950 rounded-lg appearance-none cursor-pointer accent-sky-400"
            />
          </div>

          {/* Regions Grid */}
          <div>
            <span className="text-xs font-mono text-sky-300/60 uppercase tracking-wider block mb-3">
              {isAr ? "اختر المركز السحابي النشط (Active Edge Gateway)" : "SELECT ACTIVE EDGE GATEWAY"}
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {regions.map((reg) => (
                <button
                  key={reg.id}
                  onClick={() => setActiveRegion(reg.id as typeof activeRegion)}
                  className={`p-3 rounded-xl border text-start text-xs font-mono transition-all flex items-center justify-between ${
                    activeRegion === reg.id
                      ? "border-sky-400 bg-sky-500/20 text-white font-bold shadow-md shadow-sky-500/10"
                      : "border-sky-500/20 bg-sky-950/20 text-sky-300/70 hover:border-sky-500/40"
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="text-xs">{reg.name}</span>
                    <span className="text-[10px] opacity-50">{reg.ping}</span>
                  </div>
                  {activeRegion === reg.id && <Zap size={13} className="text-sky-400" />}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Live Architecture Microservice Pipeline */}
        <div className="p-6 rounded-2xl border border-sky-500/20 bg-sky-950/10">
          <span className="text-xs font-mono text-sky-300/60 uppercase tracking-wider block mb-4">
            {isAr ? "خط أنابيب معمارية النظام (Live Microservices Pipeline)" : "LIVE CLOUD TOPOLOGY"}
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-center text-xs font-mono">
            <div className="p-4 rounded-xl border border-sky-500/20 bg-white/[0.02]">
              <Globe2 size={18} className="mx-auto text-sky-400 mb-2" />
              <span className="font-bold block">Edge CDN</span>
              <span className="text-[10px] text-emerald-400">Global Anycast</span>
            </div>
            <div className="p-4 rounded-xl border border-sky-500/20 bg-white/[0.02]">
              <Server size={18} className="mx-auto text-sky-400 mb-2" />
              <span className="font-bold block">API Gateway</span>
              <span className="text-[10px] text-sky-300">GraphQL / REST</span>
            </div>
            <div className="p-4 rounded-xl border border-sky-500/20 bg-white/[0.02]">
              <Cpu size={18} className="mx-auto text-sky-400 mb-2" />
              <span className="font-bold block">Worker Compute</span>
              <span className="text-[10px] text-sky-300">Serverless Rust/Node</span>
            </div>
            <div className="p-4 rounded-xl border border-sky-500/20 bg-white/[0.02]">
              <Database size={18} className="mx-auto text-sky-400 mb-2" />
              <span className="font-bold block">Data Storage</span>
              <span className="text-[10px] text-emerald-400">Postgres + Redis</span>
            </div>
          </div>
        </div>

        {/* Bottom Conversion Bridge */}
        <div className="p-6 rounded-2xl border border-sky-500/30 bg-gradient-to-r from-sky-950/60 via-sky-900/20 to-transparent flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-sky-500 text-obsidian flex items-center justify-center flex-shrink-0 font-bold shadow-lg shadow-sky-500/30">
              <Cpu size={20} />
            </div>
            <div>
              <h5 className="text-sm font-bold text-white">
                {isAr ? "تحتاج بنية سحابية موثوقة تتحمل ملايين المستخدمين بدون توقف؟" : "Need cloud architecture built for zero downtime?"}
              </h5>
              <p className="text-xs text-sky-200/60">
                {isAr
                  ? "نبني منصات SaaS وأنظمة موزعة بأعلى معايير الأمان وقابلية التوسع السريع."
                  : "We engineer enterprise backends, high-throughput APIs, and scalable SaaS infrastructure."}
              </p>
            </div>
          </div>

          {onStartProject && (
            <button
              onClick={onStartProject}
              className="px-6 py-3 rounded-full bg-sky-400 hover:bg-sky-300 text-obsidian font-bold text-xs font-mono uppercase tracking-wider flex items-center gap-2 transition-all shadow-xl shadow-sky-400/20 flex-shrink-0"
            >
              <span>{isAr ? "ابنِ نظامي السحابي" : "ENGINEER MY PLATFORM"}</span>
              <ArrowUpRight size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
