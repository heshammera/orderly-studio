"use client";

import React, { useEffect, useState } from "react";

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Detect touch device
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouch(true);
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest("[data-cursor]");
      if (interactive) {
        const text = interactive.getAttribute("data-cursor") || "";
        setCursorText(text);
        setIsHovered(true);
      } else {
        setCursorText("");
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  if (isTouch) return null;

  return (
    <div
      className="pointer-events-none fixed top-0 left-0 z-50 transition-transform duration-75 ease-out"
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
      }}
    >
      <div
        className={`relative -top-1/2 -left-1/2 flex items-center justify-center rounded-full transition-all duration-300 ${
          isHovered
            ? "h-14 w-14 bg-white text-obsidian shadow-2xl scale-100"
            : "h-3.5 w-3.5 bg-white/80 scale-100 ring-2 ring-white/20"
        }`}
      >
        {cursorText && (
          <span className="text-[10px] font-bold tracking-wider uppercase font-mono animate-in fade-in zoom-in duration-200">
            {cursorText}
          </span>
        )}
      </div>
    </div>
  );
};
