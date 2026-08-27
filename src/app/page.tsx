"use client";

import React, { useState, useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import { Header } from "@/components/navigation/Header";
import { CustomCursor } from "@/components/cursor/CustomCursor";
import { GlobalConstellationCanvas } from "@/components/webgl/GlobalConstellationCanvas";
import { ScrollPortalHero } from "@/components/hero/ScrollPortalHero";
import { Manifesto } from "@/components/home/Manifesto";
import { Engineering } from "@/components/home/Engineering";
import { EngineeringWork } from "@/components/home/EngineeringWork";
import { Transformation } from "@/components/home/Transformation";
import { Creative } from "@/components/home/Creative";
import { CreativeWork } from "@/components/home/CreativeWork";
import { Marketing } from "@/components/home/Marketing";
import { MarketingWork } from "@/components/home/MarketingWork";
import { Hybrid } from "@/components/home/Hybrid";
import { Capabilities } from "@/components/home/Capabilities";
import { Process } from "@/components/home/Process";
import { StudioAndInsights } from "@/components/home/StudioAndInsights";
import { CallToAction } from "@/components/home/CallToAction";
import { ProjectBuilderModal } from "@/components/home/ProjectBuilderModal";

export default function HomePage() {
  const [locale, setLocale] = useState<"en" | "ar">("en");
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const [currentWorld, setCurrentWorld] = useState<"engineering" | "creative" | "neutral">("neutral");

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Scroll listener for dynamic world detection
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const height = window.innerHeight;

      if (scrollY > height * 1.6 && scrollY < height * 4.5) {
        setCurrentWorld("engineering");
      } else if (scrollY >= height * 4.5 && scrollY < height * 8.5) {
        setCurrentWorld("creative");
      } else {
        setCurrentWorld("neutral");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      lenis.destroy();
    };
  }, []);

  const toggleLocale = () => {
    setLocale((prev) => (prev === "en" ? "ar" : "en"));
  };

  const isAr = locale === "ar";

  return (
    <main
      dir={isAr ? "rtl" : "ltr"}
      className={`min-h-screen relative ${isAr ? "font-arabic" : "font-sans"}`}
    >
      {/* Dynamic Desktop Cursor */}
      <CustomCursor />

      {/* Global Unified Ambient Constellation Network (Calm & Non-Intrusive) */}
      <GlobalConstellationCanvas />

      {/* Persistent Context-Aware Navigation */}
      <Header
        locale={locale}
        onToggleLocale={toggleLocale}
        onOpenProjectBuilder={() => setIsBuilderOpen(true)}
        currentWorld={currentWorld}
      />

      {/* 01 & 02 Seamless Full-Screen Scroll Portal Hero */}
      <ScrollPortalHero
        locale={locale}
        onOpenProjectBuilder={() => setIsBuilderOpen(true)}
      />

      {/* 03 & 04 Manifesto and Core Words */}
      <Manifesto locale={locale} />

      {/* 05 & 06 Engineering & Orbit Service Field */}
      <Engineering locale={locale} />

      {/* 07 Selected Engineering Case Studies */}
      <EngineeringWork
        locale={locale}
        onOpenProjectBuilder={() => setIsBuilderOpen(true)}
      />

      {/* 08 Transformation Moment (Black to Off-White) */}
      <Transformation locale={locale} />

      {/* 09 & 10 Creative World & Typographic Services Stack */}
      <Creative locale={locale} />

      {/* 11 & 12 Creative Editorial Art Gallery */}
      <CreativeWork
        locale={locale}
        onOpenProjectBuilder={() => setIsBuilderOpen(true)}
      />

      {/* 13 Marketing World — Strategy, Growth & Performance */}
      <Marketing locale={locale} />

      {/* 14 Selected Marketing Work */}
      <MarketingWork
        locale={locale}
        onOpenProjectBuilder={() => setIsBuilderOpen(true)}
      />

      {/* 15 Hybrid World (Technology × Design × Marketing) */}
      <Hybrid locale={locale} />

      {/* 14 Capabilities Matrix */}
      <Capabilities locale={locale} />

      {/* 15 Process Methodology */}
      <Process locale={locale} />

      {/* 16, 17, 18 Studio, Selected Work & Insights Magazine */}
      <StudioAndInsights locale={locale} />

      {/* 21 Final Scene & Call To Action Footer */}
      <CallToAction
        locale={locale}
        onOpenProjectBuilder={() => setIsBuilderOpen(true)}
      />

      {/* 19 & 20 5-Step Interactive Project Builder Modal */}
      <ProjectBuilderModal
        isOpen={isBuilderOpen}
        onClose={() => setIsBuilderOpen(false)}
        locale={locale}
      />
    </main>
  );
}
