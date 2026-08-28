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
import { TrustEngine } from "@/components/home/TrustEngine";
import { Footer } from "@/components/navigation/Footer";
import { DisciplineShowcaseModal } from "@/components/showcase/DisciplineShowcaseModal";
import { ProjectDiscoveryWizard } from "@/components/discovery/ProjectDiscoveryWizard";
import { useLocale } from "@/context/LocaleContext";
import type { DisciplineId } from "@/data/disciplines";

export default function HomePage() {
  // ── Locale comes from global context — no local useState needed ──
  const { locale, isAr } = useLocale();

  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [builderInitialDiscipline, setBuilderInitialDiscipline] = useState<DisciplineId>("uiux");
  const [currentWorld, setCurrentWorld] = useState<"engineering" | "creative" | "neutral">("neutral");

  const handleOpenBuilder = (disciplineId?: DisciplineId) => {
    if (disciplineId) setBuilderInitialDiscipline(disciplineId);
    setIsBuilderOpen(true);
  };

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

  return (
    <main
      dir={isAr ? "rtl" : "ltr"}
      className={`min-h-screen relative ${isAr ? "font-arabic" : "font-sans"}`}
    >
      <CustomCursor />
      <GlobalConstellationCanvas />

      <Header
        onOpenProjectBuilder={() => handleOpenBuilder()}
        currentWorld={currentWorld}
      />

      <ScrollPortalHero
        locale={locale}
        onOpenProjectBuilder={() => setIsWizardOpen(true)}
      />

      {/* Phase 1 — Trust Engine: Sector Strip, Verified Stats, Testimonials */}
      <TrustEngine locale={locale} />

      <Manifesto locale={locale} />
      <Engineering locale={locale} onOpenProjectBuilder={() => handleOpenBuilder("engineering")} />
      <EngineeringWork locale={locale} onOpenProjectBuilder={() => handleOpenBuilder("engineering")} />
      <Transformation locale={locale} />
      <Creative locale={locale} />
      <CreativeWork locale={locale} onOpenProjectBuilder={() => handleOpenBuilder("branding")} />
      <Marketing locale={locale} />
      <MarketingWork locale={locale} onOpenProjectBuilder={() => handleOpenBuilder("marketing")} />
      <Hybrid locale={locale} />
      <Capabilities locale={locale} />
      <Process locale={locale} />
      <StudioAndInsights locale={locale} />
      <CallToAction locale={locale} onOpenProjectBuilder={() => setIsWizardOpen(true)} />

      {/* Global Enterprise Footer (Phase 8) */}
      <Footer />

      {/* Intelligent Project Discovery Wizard (Phase 2) */}
      <ProjectDiscoveryWizard
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
        locale={locale}
      />

      {/* Discipline Showcase Modal — internal discipline details */}
      <DisciplineShowcaseModal
        isOpen={isBuilderOpen}
        onClose={() => setIsBuilderOpen(false)}
        initialDiscipline={builderInitialDiscipline}
      />
    </main>
  );
}
