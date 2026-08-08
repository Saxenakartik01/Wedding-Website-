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

const INTRO_KEY = "tanya-rohan-intro";

function introAlreadySeen() {
 
    return false;
  }


export default function App() {
  const [introActive, setIntroActive] = useState(
    () => !introAlreadySeen(),
  );

  const [revealed, setRevealed] = useState(
    () => introAlreadySeen(),
  );

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

    try {
      window.sessionStorage.setItem(
        INTRO_KEY,
        "1",
      );
    } catch {
      /* private mode — intro simply plays again */
    }
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

        <Couple />

        <Events />

        <Gallery />

        <Info />

        <Rsvp />

        <Footer />
      </div>

      {/* =========================================
          FLOATING CONTROLS
          
          IMPORTANT:
          This is OUTSIDE the animated website
          wrapper so position: fixed works
          relative to the viewport.
      ========================================= */}
      {revealed && <FloatingControls />}

      {/* =========================================
          INTRO / ROPE ANIMATION
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
