/**
 * Tiny procedural audio engine — no external assets, no autoplay.
 * Every sound is generated with the Web Audio API and only ever starts
 * after an explicit user gesture.
 */

let ctx: AudioContext | null = null;
let ambient: { stop: () => void } | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctor) return null;
  if (!ctx) ctx = new Ctor();
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

export function unlockAudio() {
  getCtx();
}

/** Soft rope creak / fibre rustle while dragging. */
export function playCreak(strength = 0.5) {
  const ac = getCtx();
  if (!ac) return;
  const dur = 0.16;
  const buffer = ac.createBuffer(1, Math.floor(ac.sampleRate * dur), ac.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) {
    const t = i / data.length;
    data[i] = (Math.random() * 2 - 1) * (1 - t) ** 2;
  }
  const src = ac.createBufferSource();
  src.buffer = buffer;
  const filter = ac.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.value = 420 + strength * 900;
  filter.Q.value = 1.4;
  const gain = ac.createGain();
  gain.gain.value = Math.min(0.09, 0.03 + strength * 0.07);
  src.connect(filter).connect(gain).connect(ac.destination);
  src.start();
}

/** Temple-bell style chime used for the reveal. */
export function playChime() {
  const ac = getCtx();
  if (!ac) return;
  const now = ac.currentTime;
  const partials = [
    { f: 523.25, g: 0.16, d: 3.4 },
    { f: 784.0, g: 0.1, d: 2.6 },
    { f: 1046.5, g: 0.07, d: 2.0 },
    { f: 1567.98, g: 0.035, d: 1.4 },
  ];
  const bus = ac.createGain();
  bus.gain.value = 1;
  bus.connect(ac.destination);
  for (const p of partials) {
    const osc = ac.createOscillator();
    osc.type = "sine";
    osc.frequency.value = p.f;
    const g = ac.createGain();
    g.gain.setValueAtTime(0.0001, now);
    g.gain.exponentialRampToValueAtTime(p.g, now + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, now + p.d);
    osc.connect(g).connect(bus);
    osc.start(now);
    osc.stop(now + p.d + 0.05);
  }
}

/** Gentle ambient raga-flavoured pad + sparse plucks. */
export function startAmbient() {
  const ac = getCtx();
  if (!ac || ambient) return;

  const master = ac.createGain();
  master.gain.setValueAtTime(0.0001, ac.currentTime);
  master.gain.exponentialRampToValueAtTime(0.5, ac.currentTime + 2.2);
  master.connect(ac.destination);

  const delay = ac.createDelay(1);
  delay.delayTime.value = 0.32;
  const fb = ac.createGain();
  fb.gain.value = 0.32;
  const wet = ac.createGain();
  wet.gain.value = 0.4;
  delay.connect(fb).connect(delay);
  delay.connect(wet).connect(master);

  const droneGain = ac.createGain();
  droneGain.gain.value = 0.045;
  const lp = ac.createBiquadFilter();
  lp.type = "lowpass";
  lp.frequency.value = 780;
  droneGain.connect(lp).connect(master);

  const drones: OscillatorNode[] = [];
  for (const [freq, detune] of [
    [130.81, -4],
    [196.0, 5],
    [261.63, 2],
  ] as const) {
    const osc = ac.createOscillator();
    osc.type = "sine";
    osc.frequency.value = freq;
    osc.detune.value = detune;
    osc.connect(droneGain);
    osc.start();
    drones.push(osc);
  }

  const scale = [523.25, 587.33, 659.25, 783.99, 880.0, 1046.5];
  let step = 0;
  const timer = window.setInterval(() => {
    const now = ac.currentTime;
    const f = scale[(step * 3 + Math.floor(Math.random() * 2)) % scale.length];
    step++;
    const osc = ac.createOscillator();
    osc.type = "triangle";
    osc.frequency.value = f;
    const g = ac.createGain();
    g.gain.setValueAtTime(0.0001, now);
    g.gain.exponentialRampToValueAtTime(0.055, now + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, now + 2.4);
    osc.connect(g);
    g.connect(master);
    g.connect(delay);
    osc.start(now);
    osc.stop(now + 2.5);
  }, 2600);

  ambient = {
    stop: () => {
      window.clearInterval(timer);
      const t = ac.currentTime;
      master.gain.cancelScheduledValues(t);
      master.gain.setValueAtTime(master.gain.value, t);
      master.gain.exponentialRampToValueAtTime(0.0001, t + 1.1);
      window.setTimeout(() => {
        drones.forEach((d) => {
          try {
            d.stop();
          } catch {
            /* already stopped */
          }
        });
        master.disconnect();
      }, 1300);
    },
  };
}

export function stopAmbient() {
  ambient?.stop();
  ambient = null;
}
