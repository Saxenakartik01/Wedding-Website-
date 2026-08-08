import { useCallback, useEffect, useState } from "react";
import { FloatingControls } from "@/components/FloatingControls";
import { RopeIntro } from "@/components/RopeIntro";
import { Couple } from "@/sections/Couple";
import { Events } from "@/sections/Events";
import { Footer } from "@/sections/Footer";
import { Gallery } from "@/sections/Gallery";
import { Hero } from "@/sections/Hero";
import { Info } from "@/sections/Info";
import { Rsvp } from "@/sections/Rsvp";
import { cn } from "@/utils/cn";

export default function App() {
  // Rope intro should play on every page refresh
  const [introActive, setIntroActive] = useState(true);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    document.body.classList.toggle(
      "is-locked",
      introActive,
    );

    return () => {
      document.body.classList.remove("is-locked");
    };
  }, [introActive]);

  const handleRevealStart = useCallback(() => {
    setRevealed(true);
  }, []);

  const handleEnter = useCallback(() => {
    setIntroActive(false);
  }, []);

  const scrollTo = useCallback((id: string) => {
    const element = document.getElementById(id);

    if (!element) return;

    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, []);

  return (
    <>
      {/* =========================================
          MAIN WEBSITE
      ========================================= */}
      <div
        aria-hidden={introActive || undefined}
        className={cn(
          "origin-center transition-[opacity,transform] duration-[1500ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
          revealed
            ? "scale-100 opacity-100"
            : "scale-[1.04] opacity-0",
        )}
      >
        <Hero
          onViewEvents={() => scrollTo("events")}
        />

        {/* Correct section order */}
        <Events />

        <Couple />

        <Gallery />

        <Info />

        <Rsvp />

        <Footer />
      </div>

      {/* =========================================
          FLOATING CONTROLS
          Outside animated wrapper so fixed
          positioning works correctly.
      ========================================= */}
      {revealed && <FloatingControls />}

      {/* =========================================
          ROPE INTRO
          Plays on EVERY refresh.
      ========================================= */}
      {introActive && (
        <RopeIntro
          onRevealStart={handleRevealStart}
          onEnter={handleEnter}
        />
      )}
    </>
  );
}