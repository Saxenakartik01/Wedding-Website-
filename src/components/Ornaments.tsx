import { useMemo, type ReactNode } from "react";
import { IMG } from "@/assets";
import { cn } from "@/utils/cn";

/* ------------------------------------------------------------------ */
/*  Cusped (multifoil) Mughal arch geometry                            */
/* ------------------------------------------------------------------ */

type Pt = [number, number];

const W = 100;
const H = 150;

const f = (n: number) => Math.round(n * 1000) / 1000;

function cubicAt(p0: Pt, p1: Pt, p2: Pt, p3: Pt, t: number): Pt {
  const u = 1 - t;
  return [
    u * u * u * p0[0] + 3 * u * u * t * p1[0] + 3 * u * t * t * p2[0] + t * t * t * p3[0],
    u * u * u * p0[1] + 3 * u * u * t * p1[1] + 3 * u * t * t * p2[1] + t * t * t * p3[1],
  ];
}

/** Builds a scalloped, pointed Mughal arch inset by `inset` units. */
export function archPath(inset = 0, lobes = 5, bottom = H, shoulderBase = 74) {
  const x0 = inset;
  const x1 = W - inset;
  const half = (x1 - x0) / 2;
  const mid = x0 + half;
  const shoulder = shoulderBase + inset * 0.55;
  const apexY = inset * 1.7;

  const p0: Pt = [x0, shoulder];
  const p1: Pt = [x0, shoulder * 0.32];
  const p2: Pt = [x0 + half * 0.42, apexY + 9];
  const p3: Pt = [mid, apexY];

  const pts: Pt[] = [];
  for (let i = 0; i <= lobes; i++) pts.push(cubicAt(p0, p1, p2, p3, i / lobes));

  let d = `M ${f(x0)} ${f(bottom)} L ${f(x0)} ${f(shoulder)}`;
  for (let i = 1; i < pts.length; i++) {
    const [ax, ay] = pts[i - 1];
    const [bx, by] = pts[i];
    const r = f(Math.hypot(bx - ax, by - ay) * 0.62);
    d += ` A ${r} ${r} 0 0 0 ${f(bx)} ${f(by)}`;
  }
  for (let i = pts.length - 2; i >= 0; i--) {
    const [ax, ay] = pts[i + 1];
    const [bx, by] = pts[i];
    const r = f(Math.hypot(bx - ax, by - ay) * 0.62);
    d += ` A ${r} ${r} 0 0 0 ${f(2 * mid - bx)} ${f(by)}`;
    void ay;
  }
  d += ` L ${f(x1)} ${f(bottom)} Z`;
  return d;
}

const FINIAL = "M50 6c-4.2-5-4.6-10.4 0-19.5 4.6 9.1 4.2 14.5 0 19.5Z";

type ArchFrameProps = {
  uid: string;
  children?: ReactNode;
  photo?: { src: string; alt: string };
  className?: string;
  contentClassName?: string;
  lobes?: number;
  finial?: boolean;
  tone?: "ivory" | "gold";
};

/**
 * Ornate ivory arch frame with a painted lotus-vine band.
 * Renders either free content (invitation panel) or a clipped photograph.
 */
export function ArchFrame({
  uid,
  children,
  photo,
  className,
  contentClassName,
  lobes = 5,
  finial = false,
  tone = "ivory",
}: ArchFrameProps) {
  const outer = useMemo(() => archPath(0, lobes), [lobes]);
  const band = useMemo(() => archPath(2.4, lobes), [lobes]);
  const inner = useMemo(() => archPath(tone === "gold" ? 7.5 : 9.5, lobes), [lobes, tone]);

  return (
    <div className={cn("relative", className)}>
      <svg
        viewBox="-3 -22 106 172"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full drop-shadow-[0_18px_38px_rgba(66,20,34,0.28)]"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={`${uid}-ivory`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fffaf0" />
            <stop offset="45%" stopColor="#f8edd6" />
            <stop offset="100%" stopColor="#f0e0c2" />
          </linearGradient>
          <linearGradient id={`${uid}-paper`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fffdf6" />
            <stop offset="55%" stopColor="#fdf6e5" />
            <stop offset="100%" stopColor="#f7ecd5" />
          </linearGradient>
          <pattern
            id={`${uid}-vine`}
            patternUnits="userSpaceOnUse"
            width="13"
            height="15"
            patternTransform="translate(0 0)"
          >
            <rect width="13" height="15" fill="#fdf7e8" />
            <image
              href={IMG.vine}
              width="13"
              height="15"
              preserveAspectRatio="xMidYMid slice"
              opacity="0.95"
            />
          </pattern>
          <clipPath id={`${uid}-clip`}>
            <path d={inner} />
          </clipPath>
        </defs>

        {finial && (
          <path d={FINIAL} fill={`url(#${uid}-ivory)`} stroke="#c9a24a" strokeWidth="0.45" />
        )}
        <path d={outer} fill={`url(#${uid}-ivory)`} stroke="#c9a24a" strokeWidth="0.55" />
        <path d={band} fill={`url(#${uid}-vine)`} />
        <path d={band} fill="none" stroke="#c9a24a" strokeWidth="0.3" opacity="0.7" />
        <path d={inner} fill={photo ? "#efe3c9" : `url(#${uid}-paper)`} />
        {photo && (
          <image
            href={photo.src}
            x="-3"
            y="-22"
            width="106"
            height="172"
            preserveAspectRatio="xMidYMid slice"
            clipPath={`url(#${uid}-clip)`}
          />
        )}
        <path d={inner} fill="none" stroke="#d8bf8c" strokeWidth="0.45" />
      </svg>
      {photo && <span className="sr-only">{photo.alt}</span>}
      {children && <div className={cn("relative", contentClassName)}>{children}</div>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Arch panel — fixed-ratio ornamental crown + flexible body           */
/* ------------------------------------------------------------------ */

const CROWN_FINIAL =
  "M50 5c-4.3-4.8-4.7-10 0-18.6 4.7 8.6 4.3 13.8 0 18.6Z";

export function ArchPanel({
  uid,
  children,
  className,
  contentClassName,
  lobes = 5,
}: {
  uid: string;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  lobes?: number;
}) {
  const { outer, band, inner } = useMemo(
    () => ({
      outer: archPath(0, lobes, 66, 46),
      band: archPath(2.4, lobes, 66, 46),
      inner: archPath(9.5, lobes, 66, 46),
    }),
    [lobes],
  );

  const vineStyle = { backgroundImage: `url(${IMG.vine})` };

  return (
    <div className={cn("relative", className)}>
      <svg
        viewBox="0 -20 100 86"
        className="relative z-[1] block h-auto w-full overflow-hidden"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={`${uid}-iv`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#efdfc0" />
            <stop offset="18%" stopColor="#fffaf0" />
            <stop offset="70%" stopColor="#f8edd6" />
            <stop offset="100%" stopColor="#ecdab8" />
          </linearGradient>
          <linearGradient id={`${uid}-pp`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fffdf7" />
            <stop offset="100%" stopColor="#fdf6e5" />
          </linearGradient>
          <pattern id={`${uid}-vn`} patternUnits="userSpaceOnUse" width="11" height="13">
            <rect width="11" height="13" fill="#fdf7e8" />
            <image href={IMG.vine} width="11" height="13" preserveAspectRatio="xMidYMid slice" />
          </pattern>
          <filter id={`${uid}-sh`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.2" />
          </filter>
        </defs>
        <path
          d={outer}
          fill="#4a1126"
          opacity="0.3"
          filter={`url(#${uid}-sh)`}
          transform="translate(0 2.6)"
        />
        <path d={CROWN_FINIAL} fill={`url(#${uid}-iv)`} stroke="#c9a24a" strokeWidth="0.4" />
        <circle cx="50" cy="6.5" r="2.1" fill={`url(#${uid}-iv)`} stroke="#c9a24a" strokeWidth="0.35" />
        <path d={outer} fill={`url(#${uid}-iv)`} stroke="#c9a24a" strokeWidth="0.5" />
        <path d={band} fill={`url(#${uid}-vn)`} />
        <path d={band} fill="none" stroke="#cfae62" strokeWidth="0.28" opacity=".75" />
        <path d={inner} fill={`url(#${uid}-pp)`} />
        <path d={inner} fill="none" stroke="#d8bf8c" strokeWidth="0.4" />
      </svg>

      <div className="relative -mt-px bg-[linear-gradient(180deg,#fdf6e5_0%,#faf0dc_45%,#f5e9d1_100%)] shadow-[0_26px_54px_rgba(74,17,38,0.34)]">
        <span
          className="pointer-events-none absolute inset-y-0 left-0 w-[9.5%] border-l border-r border-l-[#c9a24a] border-r-[#d8bf8c] bg-[linear-gradient(90deg,#efdfc0,#fffaf0_22%,#f8edd6_75%,#ecdab8)]"
          aria-hidden="true"
        >
          <span className="vine-col absolute inset-y-0 left-[24%] right-[2%]" style={vineStyle} />
        </span>
        <span
          className="pointer-events-none absolute inset-y-0 right-0 w-[9.5%] border-l border-r border-l-[#d8bf8c] border-r-[#c9a24a] bg-[linear-gradient(270deg,#efdfc0,#fffaf0_22%,#f8edd6_75%,#ecdab8)]"
          aria-hidden="true"
        >
          <span className="vine-col absolute inset-y-0 right-[24%] left-[2%]" style={vineStyle} />
        </span>
        <div className={cn("paper-grain relative z-[2]", contentClassName)}>{children}</div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Small ornaments                                                     */
/* ------------------------------------------------------------------ */

export function Lotus({ className, color = "#d88ba6" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 40 24" className={className} aria-hidden="true">
      <path
        d="M20 22c-5.6 0-11.4-2.2-14.6-5.6 3.2-1.6 7-2.2 10.6-1.6C18.2 15.2 19.4 18 20 22Z"
        fill={color}
        opacity=".62"
      />
      <path
        d="M20 22c5.6 0 11.4-2.2 14.6-5.6-3.2-1.6-7-2.2-10.6-1.6C21.8 15.2 20.6 18 20 22Z"
        fill={color}
        opacity=".62"
      />
      <path
        d="M20 22c-3.4-.8-7.4-3-9-6.2-1.5-3-1.2-6 -.4-8.1 2.7 1.2 5.8 3.5 7.2 6.5 1 2.2 1.9 5 2.2 7.8Z"
        fill={color}
        opacity=".82"
      />
      <path
        d="M20 22c3.4-.8 7.4-3 9-6.2 1.5-3 1.2-6 .4-8.1-2.7 1.2-5.8 3.5-7.2 6.5-1 2.2-1.9 5-2.2 7.8Z"
        fill={color}
        opacity=".82"
      />
      <path d="M20 2.4c2.9 3.7 4.3 7.6 4.3 11.4 0 3.5-1.8 6.5-4.3 8.2-2.5-1.7-4.3-4.7-4.3-8.2 0-3.8 1.4-7.7 4.3-11.4Z" fill={color} />
    </svg>
  );
}

export function LotusDivider({
  className,
  color = "#c19a3f",
  petal = "#d88ba6",
  width = 240,
}: {
  className?: string;
  color?: string;
  petal?: string;
  width?: number;
}) {
  return (
    <div className={cn("flex items-center justify-center gap-3", className)} style={{ maxWidth: width }}>
      <svg viewBox="0 0 100 12" className="h-3 flex-1" aria-hidden="true">
        <path d="M0 6h62" stroke={color} strokeWidth="0.8" opacity=".55" />
        <circle cx="70" cy="6" r="1.6" fill={color} opacity=".7" />
        <circle cx="78" cy="6" r="1" fill={color} opacity=".5" />
        <circle cx="86" cy="6" r="1.6" fill={color} opacity=".7" />
        <path d="M92 6h8" stroke={color} strokeWidth="0.8" opacity=".4" />
      </svg>
      <Lotus className="h-5 w-8 shrink-0" color={petal} />
      <svg viewBox="0 0 100 12" className="h-3 flex-1 -scale-x-100" aria-hidden="true">
        <path d="M0 6h62" stroke={color} strokeWidth="0.8" opacity=".55" />
        <circle cx="70" cy="6" r="1.6" fill={color} opacity=".7" />
        <circle cx="78" cy="6" r="1" fill={color} opacity=".5" />
        <circle cx="86" cy="6" r="1.6" fill={color} opacity=".7" />
        <path d="M92 6h8" stroke={color} strokeWidth="0.8" opacity=".4" />
      </svg>
    </div>
  );
}

export function DotRule({ className, color = "#c19a3f" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 200 12" className={cn("h-3 w-40", className)} aria-hidden="true">
      <path d="M8 6h68" stroke={color} strokeWidth="0.9" opacity=".45" />
      <circle cx="86" cy="6" r="2" fill={color} opacity=".6" />
      <circle cx="100" cy="6" r="3.4" fill={color} opacity=".85" />
      <circle cx="114" cy="6" r="2" fill={color} opacity=".6" />
      <path d="M124 6h68" stroke={color} strokeWidth="0.9" opacity=".45" />
    </svg>
  );
}

export function SprigRule({ className, color = "#c19a3f" }: { className?: string; color?: string }) {
  return (
    <div className={cn("flex items-center justify-center gap-4", className)}>
      <span className="h-px w-14 sm:w-20" style={{ background: `linear-gradient(90deg,transparent,${color})` }} />
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
        <g fill={color}>
          <ellipse cx="12" cy="6.4" rx="2.1" ry="4.2" />
          <ellipse cx="12" cy="17.6" rx="2.1" ry="4.2" />
          <ellipse cx="6.4" cy="12" rx="4.2" ry="2.1" />
          <ellipse cx="17.6" cy="12" rx="4.2" ry="2.1" />
          <circle cx="12" cy="12" r="2.4" />
        </g>
      </svg>
      <span className="h-px w-14 sm:w-20" style={{ background: `linear-gradient(90deg,${color},transparent)` }} />
    </div>
  );
}

export function CornerBrackets({ color = "rgba(193,154,63,0.55)" }: { color?: string }) {
  const base = "pointer-events-none absolute h-10 w-10 sm:h-14 sm:w-14";
  return (
    <>
      <span className={cn(base, "left-0 top-0 border-l border-t")} style={{ borderColor: color }} />
      <span className={cn(base, "right-0 top-0 border-r border-t")} style={{ borderColor: color }} />
      <span className={cn(base, "bottom-0 left-0 border-b border-l")} style={{ borderColor: color }} />
      <span className={cn(base, "bottom-0 right-0 border-b border-r")} style={{ borderColor: color }} />
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Falling petals                                                      */
/* ------------------------------------------------------------------ */

export function Petals({ count = 9, className }: { count?: number; className?: string }) {
  const petals = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const r = (n: number) => ((Math.sin(i * 12.9898 + n * 78.233) * 43758.5453) % 1 + 1) % 1;
        return {
          left: 6 + r(1) * 88,
          dur: 11 + r(2) * 10,
          delay: -r(3) * 18,
          size: 11 + r(4) * 12,
          dx: (r(5) - 0.5) * 160,
        };
      }),
    [count],
  );

  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden="true">
      {petals.map((p, i) => (
        <span
          key={i}
          className="petal"
          style={{
            left: `${p.left}%`,
            animationDuration: `${p.dur}s`,
            animationDelay: `${p.delay}s`,
            ["--dx" as string]: `${p.dx}px`,
          }}
        >
          <svg width={p.size} height={p.size * 0.72} viewBox="0 0 24 17" aria-hidden="true">
            <defs>
              <linearGradient id={`pt${i}`} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#f0574f" />
                <stop offset="60%" stopColor="#d8202e" />
                <stop offset="100%" stopColor="#e8b04a" />
              </linearGradient>
            </defs>
            <path d="M1 12C6 3 15 0 23 1c1 7-6 15-14 15-4 0-7-2-8-4Z" fill={`url(#pt${i})`} />
          </svg>
        </span>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Icons                                                               */
/* ------------------------------------------------------------------ */

export function MapPin({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 2.6c-3.9 0-7 3-7 6.8 0 5 6 11.4 6.3 11.7.2.2.6.2.8 0 .3-.3 6.3-6.7 6.3-11.7 0-3.8-3.1-6.8-6.4-6.8Zm0 9.4a2.6 2.6 0 1 1 0-5.2 2.6 2.6 0 0 1 0 5.2Z" />
    </svg>
  );
}

export function MusicIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M20 3.2 9.2 5.6v9.9a3.4 3.4 0 1 0 1.7 2.9V9.1l7.4-1.6v5.9a3.4 3.4 0 1 0 1.7 2.9V3.2Z" />
    </svg>
  );
}

export function CompassIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="m15.4 8.6-1.9 4.9-4.9 1.9 1.9-4.9 4.9-1.9Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function CloseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" aria-hidden="true">
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function InfoIcon({ name, className }: { name: string; className?: string }) {
  const c = "#8c2440";
  if (name === "dress")
    return (
      <svg viewBox="0 0 48 48" className={className} fill="none" aria-hidden="true">
        <path d="M14 10.5 18 8l2.4 2.6L23 8l3.4 2.5-3.2 5.2L27 40H12l3.9-24.3-1.9-5.2Z" fill="#f2d6d6" stroke={c} strokeWidth="1.1" />
        <path d="M33 9.5 36.6 8 40 9.6V40h-9.6V13l2.6-3.5Z" fill="#f7ece0" stroke={c} strokeWidth="1.1" />
        <path d="M36.5 9v31" stroke={c} strokeWidth=".8" opacity=".6" />
      </svg>
    );
  if (name === "venue")
    return (
      <svg viewBox="0 0 48 48" className={className} fill="none" aria-hidden="true">
        <path d="M24 5c3.6 3.7 5.2 6.7 5.2 9.6 0 2.4-1.6 4.4-5.2 6-3.6-1.6-5.2-3.6-5.2-6C18.8 11.7 20.4 8.7 24 5Z" fill="#f3dcdc" stroke={c} strokeWidth="1.1" />
        <path d="M11 42V22c0-3.4 2.6-6 6-6h14c3.4 0 6 2.6 6 6v20H11Z" fill="#faeee2" stroke={c} strokeWidth="1.1" />
        <path d="M20 42V30a4 4 0 0 1 8 0v12" stroke={c} strokeWidth="1.1" />
        <path d="M6 42h36" stroke={c} strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    );
  if (name === "stay")
    return (
      <svg viewBox="0 0 48 48" className={className} fill="none" aria-hidden="true">
        <path d="M8 42V19l16-11 16 11v23H8Z" fill="#faeee2" stroke={c} strokeWidth="1.1" />
        <path d="M19 42V31a5 5 0 0 1 10 0v11" stroke={c} strokeWidth="1.1" />
        <path d="M14 24h5v6h-5zM29 24h5v6h-5z" fill="#f3dcdc" stroke={c} strokeWidth=".9" />
        <path d="M4 42h40" stroke={c} strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    );
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" stroke={c} strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
      <path d="M19 9 15 39M33 9l-4 30M10 18h29M8 30h29" />
    </svg>
  );
}
