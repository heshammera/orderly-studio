"use client";

import React, { useState, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";

const WHATSAPP_NUMBER = "201003705046";

const WHATSAPP_MESSAGES = {
  en: "Hello ORDERLY Studio! I came across your platform and I'm interested in discussing a project. Could we schedule a discovery call?",
  ar: "مرحباً ORDERLY Studio! رأيت منصتكم وأود التحدث معكم عن مشروع. هل يمكننا ترتيب مكالمة استكشافية؟",
};

export const FloatingWhatsApp: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [hasShownTooltip, setHasShownTooltip] = useState(false);
  const [lang, setLang] = useState<"en" | "ar">("ar");

  // Show button after scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      }
    };

    // Also show after 4 seconds regardless
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 4000);

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  // Show tooltip bubble once after button appears
  useEffect(() => {
    if (isVisible && !hasShownTooltip) {
      const tooltipTimer = setTimeout(() => {
        setIsTooltipOpen(true);
        setHasShownTooltip(true);
        // Auto-close after 6 seconds
        setTimeout(() => setIsTooltipOpen(false), 6000);
      }, 1500);
      return () => clearTimeout(tooltipTimer);
    }
  }, [isVisible, hasShownTooltip]);

  // Detect page language
  useEffect(() => {
    const htmlDir = document.documentElement.getAttribute("dir");
    const htmlLang = document.documentElement.getAttribute("lang");
    if (htmlDir === "rtl" || htmlLang === "ar") {
      setLang("ar");
    } else {
      setLang("en");
    }
  }, []);

  const handleClick = () => {
    const message = encodeURIComponent(WHATSAPP_MESSAGES[lang]);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
    setIsTooltipOpen(false);
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed bottom-6 z-[9999] flex flex-col items-end gap-2 transition-all duration-500 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      } right-5`}
      dir="ltr"
    >
      {/* Tooltip Bubble */}
      {isTooltipOpen && (
        <div className="relative flex items-start gap-2 max-w-[240px] animate-in slide-in-from-bottom-2 duration-300">
          <div className="bg-white text-obsidian rounded-2xl rounded-br-sm px-4 py-3 shadow-2xl text-xs font-sans leading-snug">
            <p className="font-bold mb-0.5 text-[11px] text-emerald-600 uppercase tracking-wide">
              ORDERLY Studio
            </p>
            <p className="text-slate-600 leading-relaxed">
              {lang === "ar"
                ? "مرحباً! جاهزون لمناقشة مشروعك. ابدأ المحادثة الآن 👋"
                : "Hi there! Ready to discuss your project. Start a conversation now 👋"}
            </p>
          </div>
          <button
            onClick={() => setIsTooltipOpen(false)}
            className="mt-1 w-5 h-5 rounded-full bg-white/80 text-slate-400 hover:text-slate-600 flex items-center justify-center flex-shrink-0 shadow"
          >
            <X size={10} />
          </button>
        </div>
      )}

      {/* Main WhatsApp Button */}
      <button
        onClick={handleClick}
        className="group relative w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
        style={{ backgroundColor: "#25D366" }}
        aria-label="Chat on WhatsApp"
      >
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full animate-ping opacity-30" style={{ backgroundColor: "#25D366" }} />
        <span className="absolute inset-0 rounded-full animate-ping opacity-20 animation-delay-300" style={{ backgroundColor: "#25D366" }} />

        {/* WhatsApp SVG icon */}
        <svg
          viewBox="0 0 24 24"
          className="w-7 h-7 fill-white relative z-10"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      </button>
    </div>
  );
};
