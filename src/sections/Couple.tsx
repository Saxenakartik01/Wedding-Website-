import { IMG } from "@/assets";
import { SprigRule } from "@/components/Ornaments";
import { Reveal } from "@/components/Reveal";
import { STORY, WEDDING } from "@/data";

export function Couple() {
  return (
    <section id="couple" className="relative isolate w-full overflow-hidden bg-[#f6ecd8]">
      <img
        src={IMG.gardenCream}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
      />
      <div
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(250,242,225,0.5)_0%,rgba(250,242,225,0.18)_35%,rgba(250,242,225,0.35)_100%)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-[620px] px-6 py-24 text-center sm:py-32">
        <Reveal>
          <p className="font-caps text-[clamp(0.7rem,3.2vw,0.85rem)] tracking-royal text-[#bf9536]">
            A LOVE STORY
          </p>
          <h2 className="mt-3 font-serif text-[clamp(2.9rem,13.5vw,4.5rem)] font-normal italic leading-[1.02] text-maroon">
            Meet the
            <br />
            Couple
          </h2>
          <SprigRule className="mt-7" color="#b98f3c" />
        </Reveal>

        <Reveal delay={120}>
          <p className="mt-10 font-serif text-[clamp(1.1rem,4.8vw,1.4rem)] leading-[2.05] text-[#3b2a22]">
            {STORY}
          </p>
        </Reveal>

        <Reveal delay={220}>
          <p className="mt-12 font-serif text-[clamp(1.3rem,5.6vw,1.7rem)] italic tracking-[0.02em] text-[#c9a24a]">
            {WEDDING.hashtag}
          </p>
        </Reveal>
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(180deg,transparent,rgba(196,150,96,0.35))]"
        aria-hidden="true"
      />
    </section>
  );
}
