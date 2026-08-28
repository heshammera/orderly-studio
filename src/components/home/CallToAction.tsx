"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";
import { Symbol } from "../brand/Symbol";

interface CallToActionProps {
  locale: "en" | "ar";
  onOpenProjectBuilder: () => void;
}

export const CallToAction: React.FC<CallToActionProps> = ({
  locale,
  onOpenProjectBuilder,
}) => {
  const isAr = locale === "ar";

  return (
    <footer className="py-28 bg-obsidian text-white border-t border-white/10 relative overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-radial-gradient pointer-events-none opacity-40" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center text-center">
        {/* Symbol with slow spin */}
        <div className="mb-8">
          <Symbol size={56} variant="engineering" animated={true} />
        </div>

        {/* 21 — Headline Finale */}
        <span className="text-xs font-mono text-engineering-blue uppercase tracking-widest mb-4 block font-bold">
          {isAr ? "المشهد الختامي // ابدأ مشروعك" : "21 // THE FINAL SCENE"}
        </span>

        {/* LET'S BUILD on a single line */}
        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-display font-black tracking-tight text-white mb-3 leading-tight">
          LET&apos;S BUILD
        </h2>
        <h3 className="text-4xl sm:text-6xl lg:text-7xl font-display font-black tracking-tight text-creative-coral mb-10 leading-tight">
          {isAr ? "تجارب لا تُنسى." : "SOMETHING EXTRAORDINARY."}
        </h3>

        {/* Action Button */}
        <button
          onClick={onOpenProjectBuilder}
          className="px-10 py-5 rounded-full bg-white text-obsidian font-bold text-sm tracking-wider uppercase flex items-center gap-3 hover:bg-engineering-blue hover:text-white transition-all duration-300 shadow-2xl group mb-20 hover:scale-105"
          data-cursor="START"
        >
          <span>{isAr ? "ابدأ مشروعك الآن" : "START A PROJECT"}</span>
          <ArrowUpRight
            size={20}
            className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
          />
        </button>

        {/* Footer Bottom Bar */}
        <div className="w-full pt-10 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-neutral-cool gap-6">
          <div className="flex items-center gap-3">
            <span className="font-bold text-white tracking-wider">ORDERLY</span>
            <span>//</span>
            <span>{isAr ? "استوديو التكنولوجيا الإبداعية" : "CREATIVE TECHNOLOGY STUDIO"}</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="mailto:hesham.mera@gmail.com" className="hover:text-white transition-colors">
              support@orderlyshops.com
            </a>
            <span>© {new Date().getFullYear()}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
