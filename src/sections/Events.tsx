import { IMG } from "@/assets";
import { DotRule, LotusDivider, MapPin } from "@/components/Ornaments";
import { Reveal } from "@/components/Reveal";
import { EVENTS, WEDDING, type WeddingEvent } from "@/data";

function Roller() {
  return (
    <div className="relative z-20 h-[26px] sm:h-[30px]">
      <div className="absolute inset-x-[18px] inset-y-0 rounded-[14px] bg-[linear-gradient(180deg,#fffbf1_0%,#f7ecd4_42%,#e3cfa6_78%,#c9ad78_100%)] shadow-[0_8px_18px_rgba(20,4,14,0.45)]" />
      <div className="absolute inset-x-[18px] top-[6px] h-px bg-white/70" />
      <span className="absolute left-0 top-1/2 h-[calc(100%_+_12px)] w-[30px] -translate-y-1/2 rounded-full bg-[linear-gradient(180deg,#f3d896,#c9922f_55%,#8a5f1c)] shadow-[0_6px_14px_rgba(0,0,0,0.45)]" />
      <span className="absolute right-0 top-1/2 h-[calc(100%_+_12px)] w-[30px] -translate-y-1/2 rounded-full bg-[linear-gradient(180deg,#f3d896,#c9922f_55%,#8a5f1c)] shadow-[0_6px_14px_rgba(0,0,0,0.45)]" />
      <span className="absolute left-[6px] top-1/2 h-[16px] w-[10px] -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_35%_30%,#fff2cd,#b8863a)]" />
      <span className="absolute right-[6px] top-1/2 h-[16px] w-[10px] -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_35%_30%,#fff2cd,#b8863a)]" />
    </div>
  );
}

function Garland({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 300 34"
      preserveAspectRatio="none"
      className={`pointer-events-none absolute inset-x-0 h-[34px] w-full ${flip ? "bottom-0 rotate-180" : "top-0"}`}
      aria-hidden="true"
    >
      <path
        d="M4 6c40 22 96 24 146 24s106-2 146-24"
        fill="none"
        stroke="#b9c39a"
        strokeWidth="1.1"
        opacity=".85"
      />
      <path d="M40 14c-8-5-14-4-18 1 6 4 13 3 18-1Z" fill="#c3cf9f" />
      <path d="M262 14c8-5 14-4 18 1-6 4-13 3-18-1Z" fill="#c3cf9f" />
      <path d="M96 22c-9-4-16-2-19 3 7 4 15 2 19-3Z" fill="#c3cf9f" />
      <path d="M206 22c9-4 16-2 19 3-7 4-15 2-19-3Z" fill="#c3cf9f" />
      <g fill="#e2a3b6">
        <circle cx="150" cy="29" r="5.4" />
        <circle cx="118" cy="26" r="3.4" />
        <circle cx="182" cy="26" r="3.4" />
        <circle cx="70" cy="19" r="3" />
        <circle cx="230" cy="19" r="3" />
        <circle cx="26" cy="10" r="2.6" />
        <circle cx="274" cy="10" r="2.6" />
      </g>
      <g fill="#f0c6d2">
        <circle cx="150" cy="26" r="2.2" />
        <circle cx="100" cy="23" r="1.8" />
        <circle cx="200" cy="23" r="1.8" />
      </g>
    </svg>
  );
}

function ScrollCard({ event, index }: { event: WeddingEvent; index: number }) {
  const vine = { backgroundImage: `url(${IMG.vine})` };
  return (
    <Reveal className="relative mx-auto w-full max-w-[430px]" delay={index * 90}>
      <article className="relative">
        <Roller />
        <div className="relative z-10 -my-[6px] px-[10px]">
          <div className="relative overflow-hidden bg-[linear-gradient(180deg,#fdf6e2_0%,#fbf1d9_50%,#f6e8cb_100%)] shadow-[0_24px_50px_rgba(12,3,10,0.55)]">
            <span
              className="vine-col pointer-events-none absolute inset-y-0 left-0 w-[13%]"
              style={vine}
              aria-hidden="true"
            />
            <span
              className="vine-col pointer-events-none absolute inset-y-0 right-0 w-[13%] -scale-x-100"
              style={vine}
              aria-hidden="true"
            />
            <span className="pointer-events-none absolute inset-[13px] border border-[#e2c9a0]" aria-hidden="true" />
            <Garland />
            <Garland flip />

            <div className="paper-grain relative px-[16%] pb-12 pt-12 text-center sm:pb-14 sm:pt-14">
              <div
                className="mx-auto h-[112px] w-full max-w-[190px] bg-no-repeat mix-blend-multiply sm:h-[128px]"
                style={{
                  backgroundImage: `url(${IMG.eventIcons})`,
                  backgroundSize: "300% 100%",
                  backgroundPosition: `${event.icon * 50}% 50%`,
                }}
                aria-hidden="true"
              />

              <h3 className="mt-6 font-script text-[clamp(2.7rem,12vw,3.6rem)] leading-[1.05] text-maroon">
                {event.name}
              </h3>

              <div className="mx-auto mt-5 h-px w-[46%] bg-[linear-gradient(90deg,transparent,#cbab68,transparent)]" />

              <p className="font-num mt-5 font-serif text-[clamp(1.15rem,5.2vw,1.5rem)] font-medium uppercase tracking-[0.1em] text-maroon">
                {event.date} · {event.time}
              </p>
              <p className="mt-3 font-serif text-[clamp(1.15rem,5vw,1.45rem)] italic text-[#4a3a33]">
                {event.venue}
              </p>
              <p className="mt-2 font-serif text-[clamp(1rem,4.4vw,1.22rem)] italic text-[#7a6355]">
                {event.note}
              </p>

              <a
                href={WEDDING.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="group mt-5 inline-flex items-center gap-2 font-serif text-[clamp(1.02rem,4.4vw,1.22rem)] italic text-maroon transition-colors duration-300 hover:text-maroon-deep"
              >
                <MapPin className="h-[1.05em] w-[1.05em] transition-transform duration-300 group-hover:-translate-y-0.5" />
                <span className="border-b border-transparent transition-colors duration-300 group-hover:border-maroon/50">
                  Open in Maps
                </span>
              </a>

              <div className="mx-auto mt-7 h-px w-[46%] bg-[linear-gradient(90deg,transparent,#cbab68,transparent)]" />
            </div>
          </div>
        </div>
        <Roller />
      </article>
    </Reveal>
  );
}

export function Events() {
  return (
    <section id="events" className="relative isolate w-full overflow-hidden bg-plum-deep">
      <img
        src={IMG.darkPalace}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
      />
      <div
        className="absolute inset-0 bg-[linear-gradient(180deg,#170713_0%,rgba(23,7,19,0.55)_18%,rgba(28,9,22,0.5)_60%,#170713_100%)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-[600px] px-4 py-20 sm:py-28">
        <Reveal className="text-center">
          <p className="font-caps text-[clamp(0.68rem,3.1vw,0.82rem)] tracking-royal text-[#c8a67a]">
            CELEBRATION JOURNEY
          </p>
          <h2 className="mt-4 font-serif text-[clamp(2.8rem,13vw,4.2rem)] font-light italic leading-[1.05] text-cream">
            Our Events
          </h2>
          <LotusDivider className="mx-auto mt-6 w-[58%]" width={240} color="#b99657" petal="#e6a2bb" />
        </Reveal>

        <div className="mt-14 space-y-4">
          {EVENTS.map((event, i) => (
            <div key={event.id}>
              <ScrollCard event={event} index={i} />
              {i < EVENTS.length - 1 && (
                <div className="flex justify-center py-10">
                  <DotRule color="#b08a55" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
