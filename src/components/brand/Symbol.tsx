"use client";

import React from "react";

interface SymbolProps {
  className?: string;
  size?: number;
  variant?: "engineering" | "creative" | "neutral" | "mono";
  animated?: boolean;
}

export const Symbol: React.FC<SymbolProps> = ({
  className = "",
  size = 32,
  variant = "neutral",
  animated = false,
}) => {
  const getColors = () => {
    switch (variant) {
      case "engineering":
        return { primary: "#2B6CFF", secondary: "#7C3AED", accent: "#FFFFFF" };
      case "creative":
        return { primary: "#E8614A", secondary: "#F2A07B", accent: "#111114" };
      case "mono":
        return { primary: "currentColor", secondary: "currentColor", accent: "currentColor" };
      case "neutral":
      default:
        return { primary: "#FFFFFF", secondary: "#8B8C9E", accent: "#2B6CFF" };
    }
  };

  const colors = getColors();

  return (
    <div
      className={`inline-flex items-center justify-center relative ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={animated ? "animate-spin [animation-duration:20s]" : ""}
      >
        {/* Outer Architectural Ring with Structural Gap */}
        <circle
          cx="50"
          cy="50"
          r="42"
          stroke={colors.primary}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray="210 50"
          transform="rotate(-45 50 50)"
        />
        
        {/* Inner Precision Orbital Axis */}
        <circle
          cx="50"
          cy="50"
          r="26"
          stroke={colors.secondary}
          strokeWidth="1.5"
          strokeDasharray="4 6"
          opacity="0.75"
        />

        {/* Central Transformation Core Node */}
        <circle
          cx="50"
          cy="50"
          r="6"
          fill={colors.primary}
        />

        {/* Dynamic Vector Coordinate Marks */}
        <line x1="50" y1="14" x2="50" y2="20" stroke={colors.primary} strokeWidth="2" strokeLinecap="round" />
        <line x1="86" y1="50" x2="80" y2="50" stroke={colors.primary} strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
  );
};
