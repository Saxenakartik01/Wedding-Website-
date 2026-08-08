import { IMG } from "@/assets";
import { CornerBrackets, LotusDivider } from "@/components/Ornaments";
import { Reveal } from "@/components/Reveal";
import { WEDDING } from "@/data";

export function Footer() {
  return (
    <footer className="relative isolate w-full overflow-hidden bg-[#0a0806]">
      <img
        src={IMG.nightSky}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full scale-110 object-cover object-bottom opacity-40"
        loading="lazy"
      />
      <div
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,8,6,0.55)_0%,rgba(8,6,5,0.92)_28%,rgba(6,5,4,0.97)_100%)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-[620px] px-8 py-24 text-center sm:py-32">
        <div className="relative px-4 py-10 sm:px-8 sm:py-14">
          <CornerBrackets color="rgba(193,154,63,0.45)" />

          <Reveal>
            <LotusDivider className="mx-auto w-[52%]" width={170} color="#8a7343" petal="#d9a3b6" />
            <p className="mt-9 font-caps text-[clamp(0.68rem,3.1vw,0.82rem)] tracking-royal text-[#c9a24a]">
              WITH ALL OUR LOVE
            </p>
            <p className="mt-5 font-script text-[clamp(3.1rem,14vw,4.8rem)] leading-[1.12] text-cream">
              {WEDDING.bride} &amp; {WEDDING.groom}
            </p>
            <span className="mx-auto mt-7 block h-4 w-4 rotate-45 bg-[radial-gradient(circle,#d9b45b,#a97f2c)] opacity-80" />
            <p className="mt-8 font-serif text-[clamp(1.05rem,4.4vw,1.25rem)] italic text-[#e7dcc8]/70">
              You make this moment complete.
            </p>
            <p className="font-num mt-8 font-caps text-[clamp(0.74rem,3.3vw,0.9rem)] tracking-[0.3em] text-[#c9a24a]/80">
              {WEDDING.dateSplit.join(" · ")}
            </p>
          </Reveal>
        </div>
      </div>

      <div className="relative border-t border-white/5 bg-black/40 py-6 text-center">
        <p className="font-serif text-[clamp(0.95rem,4vw,1.1rem)] text-[#c9a24a]/80">
          Crafted with love on{" "}
          <a
            href="#home"
            className="border-b border-[#c9a24a]/60 text-[#e2c67d] transition-colors duration-300 hover:text-cream"
          >
            ShaadiPath
          </a>
        </p>
      </div>
    </footer>
  );
}
