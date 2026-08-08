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
      <span className="absolute left-1/2 top-[5px] h-3 w-3 -translate-x-1/2 rounded-full border border-[#c9a24a]/60 bg-[#2b0f1f]" />

      <span className="absolute bottom-0 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-[#c9a24a]/70" />
    </span>
  );
}

export function Gallery() {
  return (
    <section
      id="gallery"
      className="relative overflow-hidden"
    >
      {/* =========================================
          GALLERY BACKGROUND
      ========================================= */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${IMG.frescoWall})`,
        }}
        aria-hidden="true"
      />

      {/* Soft overlay for readability */}
      <div
        className="absolute inset-0 bg-[#170713]/20"
        aria-hidden="true"
      />

      {/* =========================================
          GALLERY CONTENT
      ========================================= */}
      <div className="relative mx-auto w-full max-w-[620px] px-5 py-20 sm:py-28">

        {/* Heading */}
        <Reveal className="text-center">
          <p className="font-caps text-[clamp(0.66rem,3vw,0.8rem)] tracking-royal text-[#c9a24a]/70">
            MEMORIES
          </p>

          <h2 className="mt-1 font-serif text-[clamp(2.9rem,13vw,4.3rem)] font-light leading-[1.1] text-[#fdf7ec] drop-shadow-[0_3px_10px_rgba(140,90,70,0.45)]">
            Gallery Wall
          </h2>
        </Reveal>

        {/* Gallery Images */}
        <div className="mt-12 space-y-16 sm:mt-16 sm:space-y-24">
          {GALLERY.map((shot, i) => (
            <Reveal key={`${shot.src}-${i}`} delay={i * 80}>
              <figure className="relative mx-auto w-full max-w-[430px] pt-[74px] sm:pt-[92px]">

                {/* Hanging cords */}
                <Cord side="left" />
                <Cord side="right" />

                {/* Photo frame */}
                <div
                  className="sway"
                  style={{
                    animationDelay: `${i * -1.8}s`,
                  }}
                >
                  <ArchFrame
                    uid={`gal${i}`}
                    photo={shot}
                    lobes={shot.shape === "wide" ? 4 : 5}
                    className={`w-full transition-transform duration-700 hover:-translate-y-1 ${
                      shot.shape === "wide"
                        ? "aspect-[4/3.1]"
                        : "aspect-[3/4.5]"
                    }`}
                  />
                </div>

                {/* Accessible image description */}
                <figcaption className="sr-only">
                  {shot.alt}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
