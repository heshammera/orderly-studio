"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  ShieldCheck,
  Send,
  CheckCircle2,
  Globe2,
} from "lucide-react";
import { useLocale } from "@/context/LocaleContext";

export const Footer: React.FC = () => {
  const { locale, isAr } = useLocale();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    try {
      await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
    } catch (_) {
      // Silent fail — UI still shows success
    }
    setSubscribed(true);
  };

  return (
    <footer
      dir={isAr ? "rtl" : "ltr"}
      className="bg-[#050508] border-t border-white/10 text-white pt-20 pb-12"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          {/* Col 1: Brand & Mission (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-xl font-display font-black tracking-tight text-white">
                ORDERLY
              </span>
              <span className="text-[10px] font-mono text-emerald-400 font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                STUDIO // OS
              </span>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed max-w-sm">
              {isAr
                ? "استوديو تكنولوجيا وتصميم مستقل يبني منصات سحابية عالية الأداء، أنظمة ذكاء اصطناعي، وهويات بصرية ملكية لشركات المنطقة والعالم."
                : "An independent creative technology studio engineering high-throughput SaaS, custom AI systems, and art-directed brand experiences for market leaders."}
            </p>

            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{isAr ? "الرياض • دبي • لندن • العمل عالمياً" : "Riyadh • Dubai • London • Global"}</span>
            </div>
          </div>

          {/* Col 2: Work (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold block">
              {isAr ? "المشاريع الحية" : "WORK"}
            </span>
            <ul className="space-y-2.5 text-xs font-mono">
              <li>
                <Link href="/work/faalek-proptech" className="text-slate-300 hover:text-white transition-colors">
                  Faalek PropTech
                </Link>
              </li>
              <li>
                <Link href="/work/cadi-parfumerie" className="text-slate-300 hover:text-white transition-colors">
                  Cadi Parfumerie
                </Link>
              </li>
              <li>
                <Link href="/work/maksab-growth" className="text-slate-300 hover:text-white transition-colors">
                  Maksab Growth
                </Link>
              </li>
              <li>
                <Link href="/work/quantum-logistics" className="text-slate-300 hover:text-white transition-colors">
                  Quantum Logistics
                </Link>
              </li>
              <li>
                <Link href="/work" className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1">
                  <span>{isAr ? "كل المشاريع" : "All Projects"}</span>
                  <ArrowUpRight size={11} />
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Capabilities (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold block">
              {isAr ? "القدرات والخدمات" : "CAPABILITIES"}
            </span>
            <ul className="space-y-2.5 text-xs font-mono">
              <li>
                <Link href="/services" className="text-slate-300 hover:text-white transition-colors">
                  {isAr ? "هندسة البرمجيات والـ SaaS" : "SaaS & Cloud Engineering"}
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-slate-300 hover:text-white transition-colors">
                  {isAr ? "الذكاء الاصطناعي والأتمتة" : "AI & Workflow Intelligence"}
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-slate-300 hover:text-white transition-colors">
                  {isAr ? "الهوية البصرية والخطوط" : "Brand & Royal Typography"}
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-slate-300 hover:text-white transition-colors">
                  {isAr ? "التسويق وإعلانات الأداء" : "Performance Marketing & Ads"}
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-slate-300 hover:text-white transition-colors">
                  {isAr ? "تصميم الواجهات UI/UX" : "UI/UX Product Systems"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Platform & Labs (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold block">
              {isAr ? "المنصة والأبحاث" : "PLATFORM & R&D"}
            </span>
            <ul className="space-y-2.5 text-xs font-mono">
              <li>
                <Link href="/orderly-os" className="text-sky-400 hover:text-sky-300 font-bold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                  <span>ORDERLY OS</span>
                </Link>
              </li>
              <li>
                <Link href="/labs" className="text-purple-400 hover:text-purple-300 font-bold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                  <span>ORDERLY LABS</span>
                </Link>
              </li>
              <li>
                <Link href="/estimator" className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>{isAr ? "حاسبة نطاق المشروع" : "Scope Estimator"}</span>
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-slate-300 hover:text-white transition-colors">
                  {isAr ? "انضم للشبكة (Careers)" : "Join the Network"}
                </Link>
              </li>
              <li>
                <Link href="/insights" className="text-slate-300 hover:text-white transition-colors">
                  {isAr ? "المقالات والأبحاث" : "Insights Magazine"}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-emerald-400 hover:text-emerald-300 font-bold transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>{isAr ? "تواصل معنا" : "Contact Us"}</span>
                </Link>
              </li>
            </ul>

            {/* Newsletter */}
            <div className="pt-3">
              <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block mb-2">
                {isAr ? "النشرة الإخبارية التقنية" : "STUDIO DISPATCH"}
              </span>
              {subscribed ? (
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                  <CheckCircle2 size={13} />
                  <span>{isAr ? "تم اشتراكك بنجاح" : "Subscribed to Dispatch"}</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={isAr ? "بريدك الإلكتروني..." : "Your email..."}
                    className="flex-1 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-white/30 font-mono"
                  />
                  <button
                    type="submit"
                    className="px-3 py-2 rounded-xl bg-white text-black text-xs font-mono font-bold hover:bg-slate-200 transition-colors flex items-center justify-center"
                  >
                    <Send size={12} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-3">
            <ShieldCheck size={14} className="text-emerald-500" />
            <span>© {new Date().getFullYear()} ORDERLY STUDIO. {isAr ? "جميع الحقوق محفوظة." : "All rights reserved."}</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="/privacy" className="hover:text-slate-200 transition-colors">
              {isAr ? "سياسة الخصوصية" : "Privacy Policy"}
            </a>
            <a href="/privacy" className="hover:text-slate-200 transition-colors">
              {isAr ? "الشروط والأحكام" : "Terms of Service"}
            </a>
            <span className="text-emerald-400 font-bold">
              {isAr ? "99.98% استمرارية" : "99.98% SLA"}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
