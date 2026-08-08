import { IMG } from "@/assets";
import { ArchPanel, LotusDivider, Petals } from "@/components/Ornaments";
import { WEDDING } from "@/data";

function Rule({ className = "" }: { className?: string }) {
  return (
    <div
      className={`mx-auto h-px w-full bg-[linear-gradient(90deg,transparent,rgba(146,112,78,0.45)_18%,rgba(146,112,78,0.45)_82%,transparent)] ${className}`}
    />
  );
}

export function Hero({ onViewEvents }: { onViewEvents: () => void }) {
  return (
    <section id="home" className="relative isolate w-full overflow-hidden">
      <img
        src={IMG.heroFloral}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
        fetchPriority="high"
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(72%_52%_at_50%_44%,rgba(214,86,120,0.24),transparent_70%),linear-gradient(180deg,rgba(150,25,64,0.24),transparent_28%,transparent_72%,rgba(120,18,52,0.34))]"
        aria-hidden="true"
      />
      <Petals count={9} />

      <div className="relative mx-auto flex min-h-[100svh] w-full max-w-[600px] flex-col justify-center px-3 py-8 sm:px-6 sm:py-14">
        <ArchPanel
          uid="hero"
          className="rise"
          contentClassName="-mt-[8%] px-[13.5%] pb-[9%] text-center"
        >
          <p className="font-serif text-[clamp(1.05rem,4.6vw,1.45rem)] italic leading-[1.7] text-[#6b4a3d]">
            With the blessings of the divine
            <br />
            and the love of our families
          </p>

          <Rule className="mt-5" />
          <LotusDivider className="mx-auto mt-5 w-[62%]" width={190} />

          <h1 className="text-gold-grad mt-3 font-serif text-[clamp(3.1rem,15.5vw,5.6rem)] font-medium italic leading-[1.02] tracking-[-0.01em]">
            {WEDDING.bride} &amp;
            <br />
            {WEDDING.groom}
          </h1>

          <LotusDivider className="mx-auto mt-4 w-[62%]" width={190} />

          <div className="mt-5 space-y-4 font-serif text-[clamp(1.02rem,4.4vw,1.3rem)] italic leading-[1.6] text-[#4a3a33]">
            <p>{WEDDING.brideParents}</p>
            <Rule />
            <p>{WEDDING.groomParents}</p>
            <p className="text-[#5a4438]">invite you to celebrate their wedding</p>
          </div>

          <Rule className="mt-5" />

          <p className="font-num mt-5 font-serif text-[clamp(1.45rem,6.6vw,2.15rem)] font-medium tracking-[0.16em] text-maroon">
            {WEDDING.dateLong}
          </p>
          <p className="mt-2 font-serif text-[clamp(1.05rem,4.5vw,1.3rem)] italic text-[#8a7263]">
            {WEDDING.venue}
          </p>

          <div id="invite" className="scroll-mt-24" />

          <button
            type="button"
            onClick={onViewEvents}
            className="btn-royal group mt-7 inline-flex w-full max-w-[300px] items-center justify-center border border-[rgba(230,206,150,0.35)] bg-[linear-gradient(180deg,rgba(58,26,32,0.86),rgba(34,12,20,0.9))] px-8 py-4 font-caps text-[clamp(0.72rem,3.1vw,0.86rem)] tracking-[0.3em] text-[#f6e6c8] shadow-[0_10px_26px_rgba(60,15,30,0.35)] transition-all duration-500 hover:-translate-y-0.5 hover:border-[rgba(230,206,150,0.7)] hover:text-white"
          >
            <span className="relative z-[2]">VIEW EVENTS</span>
          </button>
        </ArchPanel>
      </div>
    </section>
  );
}
