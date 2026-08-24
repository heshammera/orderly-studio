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
    <footer className="py-32 bg-obsidian text-white border-t border-white/10 relative overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-radial-gradient pointer-events-none opacity-40" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center text-center">
        {/* Symbol with slow spin */}
        <div className="mb-10">
          <Symbol size={64} variant="engineering" animated={true} />
        </div>

        {/* 21 — Huge Typography Finale */}
        <span className="text-xs font-mono text-engineering-blue uppercase tracking-widest mb-6 block font-bold">
          {isAr ? "المشهد الختامي // ابدأ مشروعك" : "21 // THE FINAL SCENE"}
        </span>

        <h2 className="text-5xl sm:text-7xl lg:text-9xl font-display font-black tracking-tight text-white mb-2 leading-[0.9]">
          LET'S
        </h2>
        <h2 className="text-5xl sm:text-7xl lg:text-9xl font-display font-black tracking-tight text-white mb-2 leading-[0.9]">
          BUILD
        </h2>
        <h2 className="text-5xl sm:text-7xl lg:text-9xl font-display font-black tracking-tight text-creative-coral mb-12 leading-[0.9]">
          {isAr ? "تجارب لا تُنسى." : "SOMETHING."}
        </h2>

        {/* Action Button */}
        <button
          onClick={onOpenProjectBuilder}
          className="px-10 py-5 rounded-full bg-white text-obsidian font-bold text-sm tracking-wider uppercase flex items-center gap-3 hover:bg-engineering-blue hover:text-white transition-all duration-300 shadow-2xl group mb-24"
          data-cursor="START"
        >
          <span>{isAr ? "ابدأ مشروعك الآن" : "START A PROJECT"}</span>
          <ArrowUpRight
            size={20}
            className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
          />
        </button>

        {/* Footer Bottom Bar */}
        <div className="w-full pt-12 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-neutral-cool gap-6">
          <div className="flex items-center gap-3">
            <span className="font-bold text-white tracking-wider">ORDERLY</span>
            <span>//</span>
            <span>{isAr ? "استوديو التكنولوجيا الإبداعية" : "CREATIVE TECHNOLOGY STUDIO"}</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="mailto:hello@orderlyshops.com" className="hover:text-white transition-colors">
              hello@orderlyshops.com
            </a>
            <a href="https://orderlyshops.com" className="hover:text-white transition-colors">
              orderlyshops.com
            </a>
            <span>© {new Date().getFullYear()}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
