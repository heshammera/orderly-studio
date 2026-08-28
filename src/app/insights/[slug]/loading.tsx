import React from "react";

export default function ArticleDetailLoading() {
  return (
    <div className="min-h-screen bg-[#07070A] text-white pt-32 pb-24 px-6 md:px-12 max-w-4xl mx-auto animate-pulse">
      {/* Top Tag */}
      <div className="w-32 h-5 rounded bg-emerald-500/20 mb-6" />

      {/* Article Title */}
      <div className="w-full h-14 rounded-2xl bg-white/10 mb-4" />
      <div className="w-3/4 h-14 rounded-2xl bg-white/10 mb-8" />

      {/* Author & Meta */}
      <div className="flex items-center gap-4 pb-8 mb-10 border-b border-white/10">
        <div className="w-10 h-10 rounded-full bg-white/15" />
        <div className="space-y-1.5">
          <div className="w-28 h-4 rounded bg-white/15" />
          <div className="w-20 h-3 rounded bg-white/10" />
        </div>
      </div>

      {/* Paragraph blocks skeleton */}
      <div className="space-y-4">
        <div className="w-full h-4 rounded bg-white/5" />
        <div className="w-full h-4 rounded bg-white/5" />
        <div className="w-5/6 h-4 rounded bg-white/5" />
        <div className="w-full h-4 rounded bg-white/5" />
        <div className="w-4/6 h-4 rounded bg-white/5" />
      </div>
    </div>
  );
}
