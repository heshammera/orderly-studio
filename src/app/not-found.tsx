"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Symbol } from "@/components/brand/Symbol";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-obsidian text-white flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
      <div className="relative z-10 flex flex-col items-center max-w-lg">
        <Symbol size={64} variant="engineering" animated={true} className="mb-8" />
        <span className="text-xs font-mono text-engineering-blue uppercase tracking-widest mb-3 font-bold">
          ERROR 404 // DISCONNECTED NODE
        </span>
        <h1 className="text-5xl sm:text-7xl font-display font-black text-white uppercase tracking-tight mb-4">
          LOST IN THE SYSTEM?
        </h1>
        <p className="text-neutral-cool text-sm sm:text-base leading-relaxed mb-8">
          The coordinate or system route you are looking for has been reorganized or does not exist. Let's put things back in order.
        </p>
        <Link
          href="/"
          className="px-8 py-4 rounded-full bg-white text-obsidian font-bold text-xs tracking-wider uppercase flex items-center gap-3 hover:bg-engineering-blue hover:text-white transition-all shadow-2xl"
        >
          <span>TAKE ME HOME →</span>
        </Link>
      </div>
    </main>
  );
}