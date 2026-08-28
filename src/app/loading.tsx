import React from "react";

export default function RootLoading() {
  return (
    <div className="min-h-screen bg-[#07070A] flex flex-col items-center justify-center p-6">
      <div className="relative flex flex-col items-center gap-4">
        {/* Animated pulse ring */}
        <div className="w-16 h-16 rounded-full border-2 border-white/10 border-t-emerald-400 animate-spin" />
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-mono tracking-widest text-slate-400 uppercase font-bold">
            ORDERLY SYSTEM INITIALIZING
          </span>
        </div>
      </div>
    </div>
  );
}
