import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { IMG } from "@/assets";
import {
  CloseIcon,
  CompassIcon,
  MusicIcon,
} from "@/components/Ornaments";
import { NAV_LINKS } from "@/data";
import {
  startAmbient,
  stopAmbient,
  unlockAudio,
} from "@/audio";
import { cn } from "@/utils/cn";

const plate =
  "relative flex h-[58px] w-[58px] items-center justify-center rounded-full border border-[#e3c79a]/70 bg-[radial-gradient(circle_at_38%_30%,#fffaf0,#f7e3d5_55%,#eec8ce)] shadow-[0_10px_24px_rgba(40,6,20,0.45)] transition-all duration-500 hover:scale-105 active:scale-95 sm:h-[64px] sm:w-[64px]";

export function FloatingControls() {
  const [musicOn, setMusicOn] = useState(false);
  const [navOpen, setNavOpen] = useState(false);

  const toggleMusic = useCallback(() => {
    unlockAudio();

    setMusicOn((on) => {
      if (on) {
        stopAmbient();
      } else {
        startAmbient();
      }

      return !on;
    });
  }, []);

  useEffect(() => {
    return () => {
      stopAmbient();
    };
  }, []);

  useEffect(() => {
    if (!navOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setNavOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [navOpen]);

  const go = useCallback((id: string) => {
    setNavOpen(false);

    const element = document.getElementById(id);

    if (!element) {
      console.warn(`Navigation target not found: #${id}`);
      return;
    }

    window.setTimeout(() => {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  }, []);

  /*
   * IMPORTANT:
   * Render the entire controls directly into document.body.
   * This prevents parent transforms/animations from affecting
   * position: fixed.
   */
  if (typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <>
      {/* =====================================================
          FIXED FLOATING CONTROLS
          These are ALWAYS attached to the browser viewport.
      ===================================================== */}

      <div
        style={{
          position: "fixed",
          top: "80%",
          right: "20px",
          transform: "translateY(-50%)",
          zIndex: 999999,
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          pointerEvents: "auto",
        }}
      >
        {/* MUSIC BUTTON */}
        <button
          type="button"
          onClick={toggleMusic}
          aria-pressed={musicOn}
          aria-label={
            musicOn
              ? "Pause background music"
              : "Play background music"
          }
          className={cn(
            plate,
            musicOn && "ring-2 ring-[#c9a24a]/50",
          )}
        >
          {musicOn && (
            <span
              className="absolute inset-0 rounded-full border border-[#c9a24a]/60"
              style={{
                animation:
                  "glow-pulse 2.4s ease-in-out infinite",
              }}
            />
          )}

          <MusicIcon
            className={cn(
              "h-6 w-6 text-[#b8823f] transition-opacity",
              !musicOn && "opacity-55",
            )}
          />

          <span className="absolute bottom-[9px] h-[7px] w-[18px] rounded-[50%] bg-[#e7a8bd]/70" />
        </button>

        {/* NAVIGATION BUTTON */}
        <button
          type="button"
          onClick={() => setNavOpen(true)}
          aria-label="Open navigation"
          aria-expanded={navOpen}
          className={plate}
        >
          <span
            className="absolute inset-[6px] rounded-full border border-dashed border-[#d9a8b6]/70"
            style={{
              animation:
                "spin-slow 22s linear infinite",
            }}
          />

          <CompassIcon className="h-7 w-7 text-[#b8823f]" />
        </button>
      </div>

      {/* =====================================================
          NAVIGATION MODAL
      ===================================================== */}

      <div
        className={cn(
          "fixed inset-0 z-[100000] flex items-center justify-center px-4 transition-all duration-500",
          navOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
      >
        {/* BACKDROP */}
        <button
          type="button"
          tabIndex={navOpen ? 0 : -1}
          aria-label="Close navigation"
          onClick={() => setNavOpen(false)}
          className="absolute inset-0 h-full w-full cursor-default bg-black/70 backdrop-blur-[3px]"
        />

        {/* NAVIGATION CIRCLE */}
        <div
          className={cn(
            "relative aspect-square w-[min(92vw,430px)] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
            navOpen
              ? "scale-100 rotate-0"
              : "scale-90 -rotate-6",
          )}
        >
          {/* PEACOCK BACKGROUND */}
          <img
            src={IMG.peacock}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full rounded-full object-cover shadow-[0_30px_70px_rgba(0,0,0,0.65)] ring-1 ring-[#c9a24a]/40"
          />

          {/* NAVIGATION CONTENT */}
          <div className="absolute inset-[15%] flex flex-col items-center justify-center rounded-full bg-[radial-gradient(circle,rgba(140,25,55,0.62),rgba(90,12,38,0.48))] px-2 text-center backdrop-blur-[1px]">
            <p className="font-caps text-[0.6rem] tracking-royal text-cream/80 sm:text-[0.68rem]">
              NAVIGATION
            </p>

            <span className="mt-2 h-1.5 w-8 rounded-full bg-[#e0b46a]/80" />

            <nav className="mt-2 w-full">
              {NAV_LINKS.map((link, index) => (
                <button
                  key={link.id}
                  type="button"
                  tabIndex={navOpen ? 0 : -1}
                  onClick={() => go(link.id)}
                  className={cn(
                    "block w-full py-[5px] font-serif text-[clamp(0.95rem,4.2vw,1.2rem)] text-cream/90 transition-all duration-300 hover:tracking-[0.08em] hover:text-white sm:py-[7px]",
                    index > 0 &&
                      "border-t border-cream/20",
                  )}
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>

          {/* CLOSE BUTTON */}
          <button
            type="button"
            tabIndex={navOpen ? 0 : -1}
            onClick={() => setNavOpen(false)}
            aria-label="Close navigation"
            className="absolute -right-1 -top-1 flex h-10 w-10 items-center justify-center rounded-full border border-[#e3c79a]/60 bg-[#2b0f1f]/90 text-cream transition-colors duration-300 hover:bg-maroon"
          >
            <CloseIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </>,
    document.body,
  );
}
