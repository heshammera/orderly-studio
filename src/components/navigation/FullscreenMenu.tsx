"use client";

import React from "react";
import Link from "next/link";
import { X, ArrowUpRight } from "lucide-react";
import { Symbol } from "../brand/Symbol";

interface FullscreenMenuProps {
  isOpen: boolean;
  onClose: () => void;
  locale: "en" | "ar";
  onOpenProjectBuilder: () => void;
}

export const FullscreenMenu: React.FC<FullscreenMenuProps> = ({
  isOpen,
  onClose,
  locale,
  onOpenProjectBuilder,
}) => {
  if (!isOpen) return null;

  const isAr = locale === "ar";

  const navLinks = [
    {
      title: isAr ? "الأعمال والمشاريع" : "Selected Work",
      href: "#work",
      sub: isAr ? "الهندسة، التصميم، والأنظمة الهجينة" : "Engineering, Creative & Hybrid",
    },
    {
      title: isAr ? "الخدمات والقدرات" : "Services",
      href: "#services",
      sub: isAr ? "البرمجيات، الذكاء الاصطناعي، والهوية البصرية" : "Software, AI, Branding & Products",
    },
    {
      title: isAr ? "الاستوديو والفلسفة" : "Studio",
      href: "#manifesto",
      sub: isAr ? "فلسفة التكنولوجيا × التصميم" : "Philosophy, Process & Standards",
    },
    {
      title: isAr ? "منهجية العمل" : "Process",
      href: "#process",
      sub: isAr ? "من الفكرة إلى الإطلاق والتطوير" : "From Concept to Scale",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-between bg-obsidian/95 backdrop-blur-2xl p-6 md:p-16 animate-in fade-in duration-300">
      {/* Top Bar */}
      <div className="flex items-center justify-between border-b border-white/10 pb-6">
        <div className="flex items-center gap-3">
          <Symbol size={28} variant="engineering" />
          <span className="font-display font-bold tracking-widest text-xl uppercase">ORDERLY</span>
        </div>
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-sm font-mono tracking-wider uppercase text-neutral-cool hover:text-white transition-colors p-2 rounded-full border border-white/10 hover:border-white/30"
          data-cursor="CLOSE"
        >
          <span>{isAr ? "إغلاق" : "CLOSE"}</span>
          <X size={18} />
        </button>
      </div>

      {/* Main Navigation Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-auto max-w-6xl w-full mx-auto">
        <div className="flex flex-col gap-6">
          {navLinks.map((link, idx) => (
            <Link
              key={idx}
              href={link.href}
              onClick={onClose}
              className="group flex flex-col py-3 border-b border-white/5 hover:border-white/20 transition-all duration-300"
              data-cursor="GO"
            >
              <div className="flex items-center justify-between">
                <span className="text-3xl md:text-5xl font-display font-bold tracking-tight text-white group-hover:text-engineering-blue transition-colors">
                  {link.title}
                </span>
                <ArrowUpRight
                  size={28}
                  className="text-white/20 group-hover:text-engineering-blue group-hover:translate-x-1 group-hover:-translate-y-1 transition-all"
                />
              </div>
              <span className="text-xs font-mono text-neutral-cool mt-1 tracking-wider">
                {link.sub}
              </span>
            </Link>
          ))}
        </div>

        {/* Studio Statement / Fast CTA */}
        <div className="hidden md:flex flex-col justify-between p-8 rounded-2xl bg-white/[0.02] border border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-engineering-blue/10 border border-engineering-blue/20 text-engineering-blue text-xs font-mono mb-6">
              <span>{isAr ? "استوديو التكنولوجيا الإبداعية" : "CREATIVE TECHNOLOGY STUDIO"}</span>
            </div>
            <h3 className="text-2xl font-display font-medium text-white/90 leading-snug">
              {isAr
                ? "نحوّل الأفكار الطموحة والأنظمة المعقدة إلى تجارب رقمية لا تُنسى."
                : "We engineer systems and shape identities that transform ambitious ideas into reality."}
            </h3>
          </div>

          <div className="pt-8">
            <button
              onClick={() => {
                onClose();
                onOpenProjectBuilder();
              }}
              className="w-full py-4 px-6 rounded-full bg-white text-obsidian font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-3 hover:bg-engineering-blue hover:text-white transition-all duration-300 shadow-xl"
              data-cursor="START"
            >
              <span>{isAr ? "ابدأ مشروعك الآن" : "START A PROJECT"}</span>
              <ArrowUpRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="flex flex-col sm:flex-row items-center justify-between border-t border-white/10 pt-6 text-xs font-mono text-neutral-cool gap-4">
        <div>
          <span>{isAr ? "أوردرلي — التكنولوجيا × التصميم" : "ORDERLY — TECHNOLOGY × DESIGN"}</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="mailto:hello@orderlyshops.com" className="hover:text-white transition-colors">
            hello@orderlyshops.com
          </a>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </div>
    </div>
  );
};
