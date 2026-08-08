import { useCallback, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { playChime, playCreak, unlockAudio } from "@/audio";

type Props = {
  onRevealStart: () => void;
  onEnter: () => void;
};

type Node = { x: number; y: number; px: number; py: number };

const SEGMENTS = 26;
const ITERATIONS = 14;
const GRAVITY = 0.62;
const DAMPING = 0.986;

const prefersReduced = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function RopeIntro({ onRevealStart, onEnter }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const veilRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);

  const nodesRef = useRef<Node[]>([]);
  const sizeRef = useRef({ w: 0, h: 0, len: 260, seg: 10, threshold: 180 });
  const dragRef = useRef(false);
  const targetRef = useRef({ x: 0, y: 0 });
  const progressRef = useRef(0);
  const enteringRef = useRef(false);
  const lastCreakRef = useRef(0);

  /* ----------------------------- reveal ----------------------------- */
  const reveal = useCallback(
    (instant = false) => {
      if (enteringRef.current) return;
      enteringRef.current = true;
      dragRef.current = false;
      unlockAudio();
      playChime();
      onRevealStart();

      const tl = gsap.timeline({
        defaults: { ease: "power3.inOut" },
        onComplete: onEnter,
      });

      if (instant) {
        tl.to([contentRef.current, canvasRef.current], { opacity: 0, duration: 0.28 })
          .to([veilRef.current, leftRef.current, rightRef.current], { opacity: 0, duration: 0.5 }, 0.1)
          .to(rootRef.current, { opacity: 0, duration: 0.35 }, 0.3);
        return;
      }

      tl.to(flashRef.current, { opacity: 1, duration: 0.22, ease: "power2.out" })
        .to(contentRef.current, { opacity: 0, y: 26, duration: 0.45 }, 0)
        .to(canvasRef.current, { opacity: 0, y: -40, duration: 0.7 }, 0.12)
        .to(flashRef.current, { opacity: 0, duration: 0.85 }, 0.28)
        .to(veilRef.current, { opacity: 0, duration: 0.8 }, 0.3)
        .to(
          leftRef.current,
          { xPercent: -102, scale: 1.08, duration: 1.35, ease: "power4.inOut" },
          0.34,
        )
        .to(
          rightRef.current,
          { xPercent: 102, scale: 1.08, duration: 1.35, ease: "power4.inOut" },
          0.34,
        )
        .to(rootRef.current, { autoAlpha: 0, duration: 0.4 }, 1.35);
    },
    [onEnter, onRevealStart],
  );

  /* ---------------------------- physics ----------------------------- */
  useEffect(() => {
    const canvas = canvasRef.current;
    const root = rootRef.current;
    if (!canvas || !root) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = prefersReduced();
    let raf = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const build = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const len = Math.max(170, Math.min(h * 0.3, 330));
      const seg = len / (SEGMENTS - 1);
      sizeRef.current = { w, h, len, seg, threshold: Math.max(110, Math.min(h * 0.2, 230)) };

      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const cx = w / 2;
      nodesRef.current = Array.from({ length: SEGMENTS }, (_, i) => ({
        x: cx,
        y: -6 + i * seg,
        px: cx,
        py: -6 + i * seg,
      }));
    };

    build();

    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(build, 140);
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);

    /* -------------------------- interaction ------------------------- */
    const handlePos = () => nodesRef.current[nodesRef.current.length - 1];

    const onDown = (e: PointerEvent) => {
      if (enteringRef.current) return;
      const h = handlePos();
      if (!h) return;
      const dist = Math.hypot(e.clientX - h.x, e.clientY - h.y);
      const nearRope = nodesRef.current
        .slice(Math.floor(SEGMENTS * 0.45))
        .some((n) => Math.hypot(e.clientX - n.x, e.clientY - n.y) < 34);
      if (dist > 78 && !nearRope) return;
      dragRef.current = true;
      targetRef.current = { x: e.clientX, y: e.clientY };
      unlockAudio();
      playCreak(0.25);
      root.setPointerCapture?.(e.pointerId);
      e.preventDefault();
    };

    const onMove = (e: PointerEvent) => {
      if (!dragRef.current) return;
      targetRef.current = { x: e.clientX, y: e.clientY };
      const now = performance.now();
      if (now - lastCreakRef.current > 220) {
        lastCreakRef.current = now;
        playCreak(0.2 + progressRef.current * 0.6);
      }
      e.preventDefault();
    };

    const onUp = () => {
      dragRef.current = false;
    };

    root.addEventListener("pointerdown", onDown, { passive: false });
    root.addEventListener("pointermove", onMove, { passive: false });
    root.addEventListener("pointerup", onUp);
    root.addEventListener("pointercancel", onUp);
    root.addEventListener("pointerleave", onUp);

    /* ---------------------------- solver ---------------------------- */
    const simulate = (t: number) => {
      const { w, seg, len, threshold } = sizeRef.current;
      const nodes = nodesRef.current;
      const anchor = { x: w / 2, y: -6 };
      const breeze = dragRef.current ? 0 : Math.sin(t * 0.0013) * 0.06;

      for (let i = 1; i < nodes.length; i++) {
        const n = nodes[i];
        const vx = (n.x - n.px) * DAMPING;
        const vy = (n.y - n.py) * DAMPING;
        n.px = n.x;
        n.py = n.y;
        n.x += vx + breeze * (i / nodes.length) * 1.4;
        n.y += vy + GRAVITY;
      }

      for (let k = 0; k < ITERATIONS; k++) {
        nodes[0].x = anchor.x;
        nodes[0].y = anchor.y;

        if (dragRef.current) {
          const last = nodes[nodes.length - 1];
          const t2 = targetRef.current;
          const maxReach = len * 1.75;
          let tx = Math.max(24, Math.min(w - 24, t2.x));
          let ty = Math.max(anchor.y + 40, t2.y);
          const dx = tx - anchor.x;
          const dy = ty - anchor.y;
          const d = Math.hypot(dx, dy);
          if (d > maxReach) {
            tx = anchor.x + (dx / d) * maxReach;
            ty = anchor.y + (dy / d) * maxReach;
          }
          last.x = tx;
          last.y = ty;
        }

        for (let i = 0; i < nodes.length - 1; i++) {
          const a = nodes[i];
          const b = nodes[i + 1];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const d = Math.hypot(dx, dy) || 0.0001;
          const diff = (d - seg) / d;
          const mA = i === 0 ? 0 : 0.5;
          const mB = dragRef.current && i + 1 === nodes.length - 1 ? 0 : i === 0 ? 1 : 0.5;
          a.x += dx * diff * mA;
          a.y += dy * diff * mA;
          b.x -= dx * diff * mB;
          b.y -= dy * diff * mB;
        }
      }

      const last = nodes[nodes.length - 1];
      const restY = anchor.y + len;
      const p = Math.max(0, Math.min(1, (last.y - restY) / threshold));
      progressRef.current = p;

      if (barRef.current) barRef.current.style.transform = `scaleX(${p.toFixed(3)})`;
      if (labelRef.current) {
        const text = p >= 0.99 ? "Welcome" : p > 0.5 ? "Almost there…" : "Pull the Rope to Enter";
        if (labelRef.current.textContent !== text) labelRef.current.textContent = text;
      }
      if (p >= 1 && !enteringRef.current) reveal();
    };

    /* ---------------------------- render ---------------------------- */
    const drawRope = () => {
      const nodes = nodesRef.current;
      const n = nodes.length;

      const trace = () => {
        ctx.beginPath();
        ctx.moveTo(nodes[0].x, nodes[0].y);
        for (let i = 1; i < n - 1; i++) {
          const xc = (nodes[i].x + nodes[i + 1].x) / 2;
          const yc = (nodes[i].y + nodes[i + 1].y) / 2;
          ctx.quadraticCurveTo(nodes[i].x, nodes[i].y, xc, yc);
        }
        ctx.lineTo(nodes[n - 1].x, nodes[n - 1].y);
      };

      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      ctx.save();
      ctx.translate(3, 4);
      trace();
      ctx.strokeStyle = "rgba(12,4,10,0.45)";
      ctx.lineWidth = 13;
      ctx.stroke();
      ctx.restore();

      const grad = ctx.createLinearGradient(0, 0, 0, sizeRef.current.h);
      grad.addColorStop(0, "#c39a5c");
      grad.addColorStop(0.5, "#a97f42");
      grad.addColorStop(1, "#8a6533");
      trace();
      ctx.strokeStyle = grad;
      ctx.lineWidth = 12;
      ctx.stroke();

      trace();
      ctx.strokeStyle = "rgba(255,232,186,0.35)";
      ctx.lineWidth = 4;
      ctx.stroke();

      // braided twist marks
      ctx.strokeStyle = "rgba(74,52,26,0.42)";
      ctx.lineWidth = 2.4;
      let acc = 0;
      for (let i = 1; i < n; i++) {
        const a = nodes[i - 1];
        const b = nodes[i];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const d = Math.hypot(dx, dy) || 0.0001;
        let s = 0;
        while (acc + (d - s) >= 9) {
          s += 9 - acc;
          acc = 0;
          const px = a.x + (dx / d) * s;
          const py = a.y + (dy / d) * s;
          const nx = -dy / d;
          const ny = dx / d;
          const tx = dx / d;
          const ty = dy / d;
          ctx.beginPath();
          ctx.moveTo(px - nx * 5.4 - tx * 2.6, py - ny * 5.4 - ty * 2.6);
          ctx.lineTo(px + nx * 5.4 + tx * 2.6, py + ny * 5.4 + ty * 2.6);
          ctx.stroke();
        }
        acc += d - s;
      }
    };

    const drawAnchor = () => {
      const { w } = sizeRef.current;
      const cx = w / 2;
      ctx.save();
      ctx.fillStyle = "rgba(20,7,15,0.55)";
      ctx.fillRect(cx - 46, -30, 92, 42);
      const g = ctx.createLinearGradient(cx - 40, 0, cx + 40, 0);
      g.addColorStop(0, "#8d6a32");
      g.addColorStop(0.5, "#e6c47f");
      g.addColorStop(1, "#8d6a32");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.roundRect?.(cx - 40, -6, 80, 13, 6);
      ctx.fill();
      ctx.strokeStyle = "rgba(60,38,12,0.6)";
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();
    };

    const drawHandle = () => {
      const nodes = nodesRef.current;
      const last = nodes[nodes.length - 1];
      const prev = nodes[nodes.length - 2];
      const angle = Math.atan2(last.y - prev.y, last.x - prev.x) - Math.PI / 2;
      const p = progressRef.current;

      ctx.save();
      ctx.translate(last.x, last.y);
      ctx.rotate(angle);

      const glow = ctx.createRadialGradient(0, 24, 4, 0, 24, 96);
      glow.addColorStop(0, `rgba(255,214,138,${0.22 + p * 0.5})`);
      glow.addColorStop(1, "rgba(255,214,138,0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(0, 24, 96, 0, Math.PI * 2);
      ctx.fill();

      // ring
      ctx.strokeStyle = "#e2bd76";
      ctx.lineWidth = 3.2;
      ctx.beginPath();
      ctx.arc(0, 4, 7, 0, Math.PI * 2);
      ctx.stroke();

      // bell body
      const bell = ctx.createLinearGradient(-18, 0, 18, 0);
      bell.addColorStop(0, "#9a7128");
      bell.addColorStop(0.35, "#f2d491");
      bell.addColorStop(0.62, "#d3a94f");
      bell.addColorStop(1, "#8c6522");
      ctx.fillStyle = bell;
      ctx.beginPath();
      ctx.moveTo(-8, 11);
      ctx.bezierCurveTo(-11, 26, -20, 32, -21, 42);
      ctx.lineTo(21, 42);
      ctx.bezierCurveTo(20, 32, 11, 26, 8, 11);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = "rgba(80,52,12,0.55)";
      ctx.lineWidth = 1.1;
      ctx.stroke();

      ctx.fillStyle = "#f0d091";
      ctx.beginPath();
      ctx.ellipse(0, 42, 21, 5.4, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "rgba(80,52,12,0.5)";
      ctx.stroke();

      ctx.fillStyle = "rgba(120,78,20,0.45)";
      ctx.beginPath();
      ctx.ellipse(0, 30, 13, 3, 0, 0, Math.PI * 2);
      ctx.fill();

      // tassel
      ctx.strokeStyle = "#c9424f";
      ctx.lineWidth = 2;
      for (let i = -3; i <= 3; i++) {
        ctx.beginPath();
        ctx.moveTo(i * 2.4, 44);
        ctx.quadraticCurveTo(i * 5, 58, i * 6.6, 70 - Math.abs(i) * 3);
        ctx.stroke();
      }
      ctx.fillStyle = "#8e2233";
      ctx.beginPath();
      ctx.ellipse(0, 47, 9, 5, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    let prevT = performance.now();
    let accMs = 0;
    const loop = (t: number) => {
      raf = requestAnimationFrame(loop);
      const dt = Math.min(48, t - prevT);
      prevT = t;

      if (!reduced) {
        accMs += dt;
        let guard = 0;
        while (accMs >= 16.667 && guard < 4) {
          simulate(t);
          accMs -= 16.667;
          guard++;
        }
      }

      const { w, h } = sizeRef.current;
      ctx.clearRect(0, 0, w, h);
      drawAnchor();
      drawRope();
      drawHandle();
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
      root.removeEventListener("pointerdown", onDown);
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerup", onUp);
      root.removeEventListener("pointercancel", onUp);
      root.removeEventListener("pointerleave", onUp);
    };
  }, [reveal]);

  /* ----------------------------- markup ----------------------------- */
  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[100] touch-none select-none overflow-hidden"
      aria-label="Intro — pull the rope to enter"
    >
      <div ref={leftRef} className="curtain-panel absolute inset-y-0 left-0 w-[50.6%] origin-left" />
      <div ref={rightRef} className="curtain-panel absolute inset-y-0 right-0 w-[50.6%] origin-right" />
      <div ref={veilRef} className="intro-veil absolute inset-0" />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 0%, rgba(255,214,140,0.6) 0 2px, transparent 2px), radial-gradient(circle at 20% 30%, rgba(255,214,140,0.35) 0 1.5px, transparent 2px)",
          backgroundSize: "64px 64px, 96px 96px",
        }}
        aria-hidden="true"
      />

      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0" aria-hidden="true" />

      <div
        ref={flashRef}
        className="pointer-events-none absolute inset-0 opacity-0"
        style={{
          background:
            "radial-gradient(circle at 50% 42%, rgba(255,238,200,0.95), rgba(255,205,130,0.5) 32%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div
        ref={contentRef}
        className="absolute inset-x-0 bottom-0 top-[46%] flex flex-col items-center justify-between px-6 pb-8 text-center sm:pb-10"
      >
        <div className="pointer-events-none">
          <span
            ref={labelRef}
            className="block font-caps text-[clamp(0.82rem,4vw,1.05rem)] tracking-[0.3em] text-[#f4e3c4] drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]"
          >
            Pull the Rope to Enter
          </span>
          <span className="mx-auto mt-5 block h-px w-[190px] overflow-hidden bg-white/15">
            <span
              ref={barRef}
              className="block h-full w-full origin-left scale-x-0 bg-[linear-gradient(90deg,#e6c07a,#fff0cd)]"
            />
          </span>
          <svg
            viewBox="0 0 24 24"
            className="mx-auto mt-5 h-5 w-5 text-[#e6c07a]/70"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            style={{ animation: "breathe 2.4s ease-in-out infinite" }}
            aria-hidden="true"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>

        <div className="flex flex-col items-center gap-6">
          <div className="pointer-events-none">
            <p className="font-script text-[clamp(1.9rem,9vw,2.8rem)] leading-none text-[#f7ead0]">
              Tanya &amp; Rohan
            </p>
            <p className="mt-3 font-caps text-[0.62rem] tracking-[0.34em] text-[#c9a24a] sm:text-[0.72rem]">
              12 · DECEMBER · 2026
            </p>
          </div>

          <button
            type="button"
            onClick={() => reveal(true)}
            className="btn-royal rounded-full border border-[#e3c79a]/40 bg-black/25 px-7 py-3 font-caps text-[0.68rem] tracking-[0.28em] text-[#f0dfbe] backdrop-blur-sm transition-all duration-500 hover:border-[#e3c79a] hover:text-white sm:text-[0.76rem]"
          >
            <span className="relative z-[2]">SKIP INTRO</span>
          </button>
        </div>
      </div>
    </div>
  );
}
