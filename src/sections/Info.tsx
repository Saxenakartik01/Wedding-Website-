import { CornerBrackets, InfoIcon, Lotus } from "@/components/Ornaments";
import { Reveal } from "@/components/Reveal";
import { INFO_CARDS } from "@/data";

export function Info() {
  return (
    <section
      id="info"
      className="relative isolate w-full overflow-hidden bg-[linear-gradient(175deg,#c2244b_0%,#a8143c_35%,#87102f_70%,#6d0a25_100%)]"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.16] mix-blend-overlay"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 12%, rgba(255,255,255,0.5) 0 1px, transparent 1px), radial-gradient(circle at 65% 48%, rgba(255,255,255,0.4) 0 1px, transparent 1px)",
          backgroundSize: "38px 38px, 52px 52px",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[linear-gradient(180deg,rgba(120,10,40,0.45),transparent)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-[1120px] px-5 py-20 sm:py-28">
        <Reveal className="text-center">
          <p className="font-caps text-[clamp(0.7rem,3.2vw,0.85rem)] tracking-royal text-[#f0c88a]">
            GUEST ESSENTIALS
          </p>
          <h2 className="mt-2 font-script text-[clamp(3rem,13vw,4.6rem)] leading-[1.15] text-cream">
            Things to Know
          </h2>
          <div className="mt-4 flex items-center justify-center gap-3">
            <span className="h-px w-16 bg-[linear-gradient(90deg,transparent,#e6c07a)] sm:w-24" />
            <span className="h-1.5 w-1.5 rotate-45 bg-[#e6c07a]" />
            <Lotus className="h-4 w-6" color="#f2d0b9" />
            <span className="h-1.5 w-1.5 rotate-45 bg-[#e6c07a]" />
            <span className="h-px w-16 bg-[linear-gradient(270deg,transparent,#e6c07a)] sm:w-24" />
          </div>
          <p className="mx-auto mt-7 max-w-[34ch] font-serif text-[clamp(1.1rem,4.7vw,1.42rem)] italic leading-[1.6] text-[#f7dbe0]">
            A few thoughtful details to help you celebrate in ease.
          </p>
        </Reveal>

        <div className="mx-auto mt-12 grid max-w-[600px] grid-cols-2 gap-4 sm:gap-5 lg:max-w-none lg:grid-cols-4">
          {INFO_CARDS.map((card, i) => (
            <Reveal key={card.title} delay={i * 90}>
              <article className="group relative flex h-full flex-col items-center overflow-hidden rounded-[16px] bg-[linear-gradient(180deg,#fdf6e2_0%,#faefd4_55%,#f4e6c4_100%)] px-4 py-7 text-center shadow-[0_18px_38px_rgba(60,4,22,0.4)] ring-1 ring-[#e8cf9d]/70 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_26px_50px_rgba(60,4,22,0.5)] sm:px-6 sm:py-9">
                <span className="pointer-events-none absolute inset-3">
                  <CornerBrackets color="rgba(193,154,63,0.5)" />
                </span>

                <span className="relative flex h-[86px] w-[86px] items-center justify-center rounded-full bg-[radial-gradient(circle_at_50%_38%,#fffaec,#f3e4c4)] ring-1 ring-[#e6d0a4]/80 transition-transform duration-500 group-hover:scale-[1.04] sm:h-[100px] sm:w-[100px]">
                  <InfoIcon name={card.icon} className="h-11 w-11 sm:h-12 sm:w-12" />
                </span>

                <span className="mt-5 block h-px w-2/3 bg-[linear-gradient(90deg,transparent,#d3b478,transparent)]" />

                <h3 className="mt-5 font-caps text-[clamp(0.86rem,3.7vw,1rem)] font-semibold uppercase leading-tight tracking-[0.18em] text-maroon">
                  {card.title}
                </h3>
                <p className="mt-4 font-serif text-[clamp(1rem,4.3vw,1.16rem)] italic leading-[1.55] text-[#4a3a33]">
                  {card.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
