"use client";

import React, { useState, useEffect } from "react";
import { Menu, ArrowUpRight, Globe } from "lucide-react";
import { Logo } from "../brand/Logo";
import { FullscreenMenu } from "./FullscreenMenu";
import { useLocale } from "@/context/LocaleContext";

interface HeaderProps {
  onOpenProjectBuilder: () => void;
  currentWorld?: "engineering" | "creative" | "neutral";
}

export const Header: React.FC<HeaderProps> = ({
  onOpenProjectBuilder,
  currentWorld = "neutral",
}) => {
  const { locale, isAr, toggleLocale } = useLocale();
  const [scrollY, setScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isVisible = scrollY > 80;
  const isScrolledDeep = scrollY > 200;

  const getAccentBorder = () => {
    if (currentWorld === "engineering") return "border-engineering-blue/25 bg-obsidian/85 shadow-[0_10px_30px_rgba(43,108,255,0.12)]";
    if (currentWorld === "creative")   return "border-creative-coral/25 bg-obsidian/85 shadow-[0_10px_30px_rgba(232,97,74,0.12)]";
    return "border-white/10 bg-obsidian/85 shadow-2xl";
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 backdrop-blur-xl ${
          isVisible
            ? "translate-y-0 opacity-100 py-3.5 border-b"
            : "-translate-y-full opacity-0 py-6 pointer-events-none"
        } ${getAccentBorder()}`}
        dir={isAr ? "rtl" : "ltr"}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <Logo
            size="md"
            showSubtitle={!isScrolledDeep}
            locale={locale}
            variant={currentWorld === "creative" ? "creative" : "engineering"}
          />

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">
            <a href="#work"      className="text-white/80 hover:text-white transition-colors" data-cursor="VIEW">    {isAr ? "الأعمال"   : "WORK"}      </a>
            <a href="#services"  className="text-white/80 hover:text-white transition-colors" data-cursor="EXPLORE"> {isAr ? "الخدمات"   : "SERVICES"}   </a>
            <a href="#manifesto" className="text-white/80 hover:text-white transition-colors" data-cursor="READ">    {isAr ? "الاستوديو" : "STUDIO"}     </a>
            <a href="#process"   className="text-white/80 hover:text-white transition-colors" data-cursor="EXPLORE"> {isAr ? "المنهجية"  : "PROCESS"}    </a>
            <a href="#marketing" className="text-emerald-400/90 hover:text-emerald-300 transition-colors" data-cursor="EXPLORE"> {isAr ? "التسويق"   : "MARKETING"}  </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Language toggle */}
            <button
              onClick={toggleLocale}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 text-xs font-mono transition-all text-white/90"
              aria-label="Toggle language"
              data-cursor="LANG"
            >
              <Globe size={13} className={currentWorld === "creative" ? "text-creative-coral" : "text-engineering-blue"} />
              <span>{locale === "en" ? "العربية" : "EN"}</span>
            </button>

            {/* CTA */}
            <button
              onClick={onOpenProjectBuilder}
              className={`hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-xs tracking-wider uppercase transition-all duration-300 shadow-lg group ${
                currentWorld === "creative"
                  ? "bg-creative-coral text-white hover:bg-white hover:text-obsidian"
                  : "bg-white text-obsidian hover:bg-engineering-blue hover:text-white"
              }`}
              data-cursor="START"
            >
              <span>{isAr ? "ابدأ مشروعك" : "START A PROJECT"}</span>
              <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(true)}
              className="p-2.5 rounded-full border border-white/15 bg-white/5 hover:bg-white/15 text-white transition-all"
              aria-label="Open menu"
              data-cursor="MENU"
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </header>

      <FullscreenMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        onOpenProjectBuilder={onOpenProjectBuilder}
      />
    </>
  );
};
