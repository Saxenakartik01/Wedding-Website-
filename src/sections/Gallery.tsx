import { GALLERY, IMG } from "@/assets";
import { ArchFrame } from "@/components/Ornaments";
import { Reveal } from "@/components/Reveal";

function Cord({ side }: { side: "left" | "right" }) {
  return (
    <span
      className="pointer-events-none absolute top-0 h-[74px] w-[14px] sm:h-[92px]"
      style={{ [side]: "9%" } as React.CSSProperties}
      aria-hidden="true"
    >
      <svg viewBox="0 0 14 92" preserveAspectRatio="none" className="h-full w-full">
        <path d="M7 0v44" stroke="#c9a24a" strokeWidth="1.6" />
        <path d="M7 0v44" stroke="#f0d79a" strokeWidth="0.5" />
        <circle cx="7" cy="49" r="4.2" fill="none" stroke="#c9a24a" strokeWidth="1.3" />
        <path d="M7 53v5" stroke="#c9a24a" strokeWidth="1" />
        <ellipse cx="7" cy="63" rx="3" ry="4.2" fill="#e7aebe" />
        <ellipse cx="7" cy="72" rx="2.6" ry="3.6" fill="#a9b98c" />
        <ellipse cx="7" cy="81" rx="2.8" ry="4.4" fill="#e7aebe" />
        <ellipse cx="7" cy="89" rx="1.6" ry="2.4" fill="#c9a24a" />
      </svg>
    </span>
  );
}

export function Gallery() {
  return (
    <section id="gallery" className="relative isolate w-full overflow-hidden bg-[#f7e6dc]">
      <img
        src={IMG.frescoWall}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
      />
      <div
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(247,230,220,0.25),rgba(247,230,220,0.05)_30%,rgba(247,230,220,0.3))]"
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-[620px] px-5 py-20 sm:py-28">
        <Reveal className="text-center">
          <p className="font-caps text-[clamp(0.66rem,3vw,0.8rem)] tracking-royal text-[#c9a24a]/70">
            MEMORIES
          </p>
          <h2 className="mt-1 font-serif text-[clamp(2.9rem,13vw,4.3rem)] font-light leading-[1.1] text-[#fdf7ec] drop-shadow-[0_3px_10px_rgba(140,90,70,0.45)]">
            Gallery Wall
          </h2>
        </Reveal>

        <div className="mt-12 space-y-16 sm:mt-16 sm:space-y-24">
          {GALLERY.map((shot, i) => (
            <Reveal key={shot.src} delay={i * 80}>
              <figure className="relative mx-auto w-full max-w-[430px] pt-[74px] sm:pt-[92px]">
                <Cord side="left" />
                <Cord side="right" />
                <div className="sway" style={{ animationDelay: `${i * -1.8}s` }}>
                  <ArchFrame
                    uid={`gal${i}`}
                    photo={shot}
                    lobes={shot.shape === "wide" ? 4 : 5}
                    className={`w-full transition-transform duration-700 hover:-translate-y-1 ${
                      shot.shape === "wide" ? "aspect-[4/3.1]" : "aspect-[3/4.5]"
                    }`}
                  />
                </div>
                <figcaption className="sr-only">{shot.alt}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
