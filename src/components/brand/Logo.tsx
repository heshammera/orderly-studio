"use client";

import React from "react";
import Link from "next/link";
import { Symbol } from "./Symbol";

interface LogoProps {
  className?: string;
  variant?: "engineering" | "creative" | "neutral" | "mono";
  showSubtitle?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  locale?: string;
}

export const Logo: React.FC<LogoProps> = ({
  className = "",
  variant = "neutral",
  showSubtitle = false,
  size = "md",
  locale = "en",
}) => {
  const sizeMap = {
    sm: { symbol: 22, text: "text-lg", sub: "text-[9px]" },
    md: { symbol: 28, text: "text-2xl", sub: "text-[10px]" },
    lg: { symbol: 38, text: "text-4xl", sub: "text-xs" },
    xl: { symbol: 52, text: "text-6xl", sub: "text-sm" },
  };

  const currentSize = sizeMap[size];

  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-3 transition-opacity duration-300 hover:opacity-90 ${className}`}
      aria-label="ORDERLY — Creative Technology Studio"
    >
      <Symbol
        size={currentSize.symbol}
        variant={variant}
        className="transition-transform duration-500 group-hover:scale-105"
      />
      <div className="flex flex-col">
        <span
          className={`font-bold tracking-widest leading-none font-display uppercase text-white transition-colors duration-300 ${currentSize.text} ${
            variant === "creative" ? "group-hover:text-creative-coral" : "group-hover:text-engineering-blue"
          }`}
        >
          ORDERLY
        </span>
        {showSubtitle && (
          <span
            className={`font-mono uppercase tracking-widest text-neutral-cool mt-1 ${currentSize.sub}`}
          >
            {locale === "ar" ? "استوديو التكنولوجيا الإبداعية" : "Creative Technology Studio"}
          </span>
        )}
      </div>
    </Link>
  );
};
