"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Bot,
  Play,
  CheckCircle2,
  Cpu,
  ArrowUpRight,
  Database,
  Terminal,
  Zap,
} from "lucide-react";

interface AISandboxProps {
  locale: "en" | "ar";
  onStartProject?: () => void;
}

export const AISandbox: React.FC<AISandboxProps> = ({ locale, onStartProject }) => {
  const isAr = locale === "ar";
  const [selectedTask, setSelectedTask] = useState<number>(0);
  const [isRunning, setIsRunning] = useState(false);
  const [outputGenerated, setOutputGenerated] = useState(true);

  const tasks = [
    {
      title: isAr ? "تحليل البيانات المالية والتنبؤ بالسوق" : "Financial Telemetry & Anomaly Detection",
      prompt: isAr
        ? "حلل 1.2M عملية مالية واستخرج الأنماط الشاذة وتوقعات السيولة للربع القادم."
        : "Analyze 1.2M transactions, identify anomalous cash outflows, and project Q4 liquidity.",
      output: isAr
        ? "✓ تم فحص 1,248,910 سجل في 68ms.\n- تم كشف 3 شذوذات في تدفقات التحويل.\n- التنبؤ بنمو السيولة بنسبة +24.6% مع معدل ثقة 98.4%."
        : "✓ Processed 1,248,910 records in 68ms.\n- 3 liquidity divergence anomalies flagged.\n- Projected net treasury growth: +24.6% (Confidence: 98.4%).",
      tokens: "1,420 tokens / 68ms",
    },
    {
      title: isAr ? "توليد كود وبناء نماذج أولية ذكية" : "Autonomous Code & Workflow Generation",
      prompt: isAr
        ? "ابنِ خط أنابيب تكامل آلي بين Stripe وSalesforce وقاعدة بيانات PostgreSQL مع معالجة الأخطاء."
        : "Generate fault-tolerant event pipeline syncing Stripe webhooks to Postgres with retry queues.",
      output: isAr
        ? "✓ تم توليد بنية Rust/TypeScript غير متزامنة مع Zero-Drop Queue.\n- معدل معالجة: 45,000 حدث/ثانية.\n- اختبارات الوحدة: 100% نجاح."
        : "✓ Synthesized asynchronous Rust worker with zero-drop retry queue.\n- Throughput: 45,000 events/sec.\n- Unit test coverage: 100% passing.",
      tokens: "2,850 tokens / 112ms",
    },
    {
      title: isAr ? "مساعد تنفيذي ووكيل محادثة فائق الذكاء" : "Executive Multilingual Concierge Agent",
      prompt: isAr
        ? "أجب عن استفسارات كبار العملاء بلغات متعددة مع الحفاظ على نبرة العلامة التجارية الفاخرة."
        : "Synthesize personalized VIP client responses with contextual luxury brand voice memory.",
      output: isAr
        ? "✓ تم استدعاء الذاكرة الدلالية (Vector DB).\n- الصياغة: فصحى راقية ومطابقة لمعايير العلامة.\n- زمن الاستجابة: 42ms."
        : "✓ Retrieved semantic vector memory (Cosine similarity 0.96).\n- Tone: Executive Luxury.\n- Latency: 42ms.",
      tokens: "890 tokens / 42ms",
    },
  ];

  const handleRunTask = () => {
    setIsRunning(true);
    setOutputGenerated(false);
    setTimeout(() => {
      setIsRunning(false);
      setOutputGenerated(true);
    }, 900);
  };

  return (
    <div
      className="w-full max-w-5xl mx-auto rounded-[32px] border border-purple-500/30 bg-[#080314]/95 text-white shadow-[0_30px_90px_rgba(0,0,0,0.9)] overflow-hidden"
      dir={isAr ? "rtl" : "ltr"}
    >
      {/* ── Top Bar ── */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-purple-500/20 bg-purple-950/20">
        <div className="flex items-center gap-3">
          <Sparkles size={16} className="text-purple-400" />
          <span className="text-xs font-mono font-bold tracking-widest text-purple-400 uppercase">
            ORDERLY NEURAL ENGINE // {isAr ? "مختبر الذكاء الاصطناعي والوكلاء الذاتيين" : "AUTONOMOUS AI AGENT PIPELINE"}
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-purple-300/60">
          <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
          <span>LLM INFERENCE & VECTOR MEMORY</span>
        </div>
      </div>

      {/* ── Main Interactive Canvas ── */}
      <div className="p-6 md:p-8 space-y-6">
        {/* Pipeline Architecture Stage */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs font-mono text-center">
          <div className="p-4 rounded-2xl border border-purple-500/20 bg-purple-950/20">
            <Bot size={20} className="mx-auto text-purple-400 mb-2" />
            <span className="font-bold block">Autonomous Agent</span>
            <span className="text-[10px] text-purple-300/50">Multi-Agent Orchestrator</span>
          </div>
          <div className="p-4 rounded-2xl border border-purple-500/20 bg-purple-950/20">
            <Database size={20} className="mx-auto text-purple-400 mb-2" />
            <span className="font-bold block">Vector Embeddings</span>
            <span className="text-[10px] text-purple-300/50">Pinecone / Qdrant RAG</span>
          </div>
          <div className="p-4 rounded-2xl border border-purple-500/20 bg-purple-950/20">
            <Cpu size={20} className="mx-auto text-purple-400 mb-2" />
            <span className="font-bold block">LLM Reasoning</span>
            <span className="text-[10px] text-purple-300/50">Custom Fine-Tuned Model</span>
          </div>
          <div className="p-4 rounded-2xl border border-purple-500/20 bg-purple-950/20">
            <Zap size={20} className="mx-auto text-emerald-400 mb-2" />
            <span className="font-bold block">Action Execution</span>
            <span className="text-[10px] text-emerald-400">Zero-Human Latency</span>
          </div>
        </div>

        {/* Task Selection */}
        <div>
          <span className="text-xs font-mono text-purple-300/70 uppercase tracking-wider block mb-3 font-bold">
            {isAr ? "اختر مهمة لاختبار ذكاء وسرعة المحرك:" : "SELECT AN ENTERPRISE AI USE CASE TO TEST:"}
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {tasks.map((t, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSelectedTask(idx);
                  handleRunTask();
                }}
                className={`p-4 rounded-2xl border text-start text-xs font-mono transition-all flex flex-col justify-between ${
                  selectedTask === idx
                    ? "border-purple-400 bg-purple-500/20 text-white font-bold shadow-lg shadow-purple-500/10"
                    : "border-purple-500/20 bg-purple-950/20 text-purple-200/70 hover:border-purple-500/40"
                }`}
              >
                <span className="text-sm font-display font-bold block mb-2">{t.title}</span>
                <span className="text-[10px] text-purple-400">{t.tokens}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Live Execution Sandbox Terminal */}
        <div className="p-6 rounded-2xl border border-purple-500/30 bg-black/60 font-mono text-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-purple-500/20">
            <div className="flex items-center gap-2 text-purple-300">
              <Terminal size={14} />
              <span>PROMPT INFERENCE ENGINE</span>
            </div>
            <button
              onClick={handleRunTask}
              disabled={isRunning}
              className="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-[11px] flex items-center gap-1.5 transition-all shadow-md shadow-purple-600/30 disabled:opacity-50"
            >
              <Play size={11} className={isRunning ? "animate-spin" : ""} />
              <span>{isRunning ? (isAr ? "جارٍ التحليل..." : "RUNNING...") : (isAr ? "إعادة التشغيل" : "EXECUTE")}</span>
            </button>
          </div>

          <div>
            <span className="text-purple-400 block mb-1 opacity-70">// INPUT PROMPT:</span>
            <p className="text-purple-100/90 leading-relaxed bg-purple-950/30 p-3 rounded-xl border border-purple-500/15">
              &quot;{tasks[selectedTask].prompt}&quot;
            </p>
          </div>

          <div>
            <span className="text-emerald-400 block mb-1 opacity-70">// AGENT RESPONSE & TELEMETRY:</span>
            <div className="bg-purple-950/40 p-4 rounded-xl border border-purple-500/20 min-h-[90px] flex items-center">
              {isRunning ? (
                <div className="flex items-center gap-2 text-purple-400 animate-pulse">
                  <div className="w-2 h-2 rounded-full bg-purple-400" />
                  <span>{isAr ? "جاري تدفق البيانات والتفكير الذاتي..." : "Streaming vector inference & tool execution..."}</span>
                </div>
              ) : outputGenerated ? (
                <pre className="text-emerald-300 whitespace-pre-wrap font-mono text-xs leading-relaxed">
                  {tasks[selectedTask].output}
                </pre>
              ) : null}
            </div>
          </div>
        </div>

        {/* Bottom Conversion Bridge */}
        <div className="p-6 rounded-2xl border border-purple-500/30 bg-gradient-to-r from-purple-950/60 via-purple-900/20 to-transparent flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-purple-500 text-white flex items-center justify-center flex-shrink-0 font-bold shadow-lg shadow-purple-500/30">
              <Bot size={20} />
            </div>
            <div>
              <h5 className="text-sm font-bold text-white">
                {isAr ? "تريد دمج الذكاء الاصطناعي وأتمتة العمليات في شركتك؟" : "Ready to integrate custom AI agents into your business?"}
              </h5>
              <p className="text-xs text-purple-200/60">
                {isAr
                  ? "نبني حلول الذكاء الاصطناعي التوليدي والنماذج المخصصة التي توفر مئات الساعات التشغيلية."
                  : "We build custom LLM workflows, autonomous enterprise agents, and semantic intelligence pipelines."}
              </p>
            </div>
          </div>

          {onStartProject && (
            <button
              onClick={onStartProject}
              className="px-6 py-3 rounded-full bg-purple-500 hover:bg-purple-400 text-white font-bold text-xs font-mono uppercase tracking-wider flex items-center gap-2 transition-all shadow-xl shadow-purple-500/20 flex-shrink-0"
            >
              <span>{isAr ? "ابنِ حل الذكاء الاصطناعي" : "BUILD MY AI PIPELINE"}</span>
              <ArrowUpRight size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
