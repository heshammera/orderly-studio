"use client";

import React, { useState, useEffect } from "react";
import { X, Cookie, CheckCircle2 } from "lucide-react";

const COOKIE_KEY = "orderly_cookie_consent";

export const CookieBanner: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    // Only show if user hasn't already responded
    const stored = localStorage.getItem(COOKIE_KEY);
    if (!stored) {
      // Slight delay so it doesn't flash immediately on load
      const t = setTimeout(() => setVisible(true), 2500);
      return () => clearTimeout(t);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_KEY, "accepted");
    setAccepted(true);
    setTimeout(() => setVisible(false), 800);
  };

  const handleDecline = () => {
    localStorage.setItem(COOKIE_KEY, "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className={`fixed bottom-24 left-4 right-4 sm:left-auto sm:right-24 sm:max-w-sm z-[9998] transition-all duration-500 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <div className="bg-[#0F1018] border border-white/15 rounded-2xl shadow-2xl p-5 backdrop-blur-md">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <Cookie size={16} className="text-amber-400 flex-shrink-0 mt-0.5" />
            <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              ملفات الارتباط / Cookies
            </span>
          </div>
          <button
            onClick={handleDecline}
            className="text-slate-500 hover:text-white transition-colors flex-shrink-0"
          >
            <X size={14} />
          </button>
        </div>

        {/* Text */}
        <p className="text-xs text-slate-300 leading-relaxed mb-4 font-sans">
          نستخدم Vercel Analytics لتحليلات مجهولة تماماً تساعدنا على تحسين تجربتك.
          لا نشارك بياناتك مع أي طرف ثالث.{" "}
          <a href="/privacy" className="text-emerald-400 hover:underline">
            سياسة الخصوصية
          </a>
        </p>

        {/* Buttons */}
        <div className="flex gap-2">
          {accepted ? (
            <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400">
              <CheckCircle2 size={13} />
              <span>تم القبول!</span>
            </div>
          ) : (
            <>
              <button
                onClick={handleAccept}
                className="flex-1 py-2 rounded-xl bg-white text-black text-xs font-mono font-bold hover:bg-slate-200 transition-all"
              >
                موافق — Accept
              </button>
              <button
                onClick={handleDecline}
                className="flex-1 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 text-xs font-mono hover:bg-white/10 transition-all"
              >
                رفض — Decline
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
