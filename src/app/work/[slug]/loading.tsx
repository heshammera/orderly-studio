import React from "react";

export default function WorkDetailLoading() {
  return (
    <div className="min-h-screen bg-[#07070A] text-white pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto animate-pulse">
      {/* Top Tag & Back Button skeleton */}
      <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/10">
        <div className="w-24 h-4 rounded bg-white/10" />
        <div className="w-32 h-6 rounded-full bg-white/10" />
      </div>

      {/* Hero Title & Subtitle skeleton */}
      <div className="max-w-4xl mb-12 space-y-4">
        <div className="w-48 h-5 rounded bg-sky-500/20" />
        <div className="w-full sm:w-3/4 h-12 rounded-2xl bg-white/10" />
        <div className="w-2/3 h-6 rounded-lg bg-white/5" />
      </div>

      {/* 4 Metrics skeleton cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 h-28 flex flex-col justify-between">
            <div className="w-16 h-3 rounded bg-white/10" />
            <div className="w-24 h-7 rounded bg-white/15" />
          </div>
        ))}
      </div>

      {/* Big architecture blueprint skeleton */}
      <div className="p-8 sm:p-12 rounded-3xl bg-[#0D0E16] border border-white/10 h-72 mb-12" />

      {/* 2 Narrative columns skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 h-48" />
        <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 h-48" />
      </div>
    </div>
  );
}
