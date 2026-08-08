import { IMG } from "@/assets";
import { LotusDivider } from "@/components/Ornaments";
import { Reveal } from "@/components/Reveal";
import { WEDDING } from "@/data";

export function Rsvp() {
  return (
    <section id="rsvp" className="relative isolate w-full overflow-hidden bg-navy">
      <img
        src={IMG.nightSky}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
      />
      <div
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,20,38,0.4)_0%,rgba(9,20,38,0.62)_45%,rgba(7,14,28,0.8)_100%)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-[620px] px-6 py-24 text-center sm:py-32">
        <Reveal>
          <LotusDivider className="mx-auto w-full" width={520} color="#dcc9a8" petal="#f4dce4" />
        </Reveal>

        <Reveal delay={80}>
          <p className="mt-14 font-caps text-[clamp(0.7rem,3.3vw,0.88rem)] tracking-royal text-[#c9a24a]">
            JOIN THE CELEBRATION
          </p>
          <h2 className="mt-4 font-serif text-[clamp(3rem,14vw,4.8rem)] font-light leading-[1.05] text-cream">
            Will you join us?
          </h2>
        </Reveal>

        <Reveal delay={160}>
          <p className="mx-auto mt-9 max-w-[36ch] font-serif text-[clamp(1.12rem,4.8vw,1.45rem)] italic leading-[1.95] text-[#eadfd0]/90">
            We&apos;ve saved a seat for you — at our table, in our hearts, and under the royal sky.
            Come celebrate with us as we begin this new chapter together.
          </p>
        </Reveal>

        <Reveal delay={240}>
          <a
            href={WEDDING.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="btn-royal mt-12 flex w-full items-center justify-center border border-[#d9b45b]/60 bg-[linear-gradient(180deg,#94254a_0%,#7c1c33_60%,#651328_100%)] px-8 py-6 font-caps text-[clamp(0.86rem,4vw,1.05rem)] tracking-[0.26em] text-cream shadow-[0_20px_44px_rgba(0,0,0,0.5)] transition-all duration-500 hover:-translate-y-1 hover:border-[#f0d08a] hover:shadow-[0_28px_56px_rgba(0,0,0,0.6)]"
          >
            <span className="relative z-[2]">YES, I&apos;LL BE THERE</span>
          </a>
          <p className="mx-auto mt-6 max-w-[32ch] font-serif text-[clamp(0.98rem,4.2vw,1.15rem)] italic leading-[1.6] text-[#e6dccd]/45">
            You&apos;ll be redirected to WhatsApp to confirm your attendance.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
