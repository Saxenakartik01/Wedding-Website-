/**
 * Wedding Website Audio Engine
 *
 * - Background music uses an external MP3 file.
 * - Music does not autoplay.
 * - Music starts only after explicit user interaction.
 * - Rope creak and reveal chime are still generated
 *   using the Web Audio API.
 */

import musicFile from "@/assets/music.mp3";

let ctx: AudioContext | null = null;
let ambient: { stop: () => void } | null = null;
let backgroundMusic: HTMLAudioElement | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;

  const Ctor =
    window.AudioContext ??
    (
      window as unknown as {
        webkitAudioContext?: typeof AudioContext;
      }
    ).webkitAudioContext;

  if (!Ctor) return null;

  if (!ctx) {
    ctx = new Ctor();
  }

  if (ctx.state === "suspended") {
    void ctx.resume();
  }

  return ctx;
}

export function unlockAudio() {
  getCtx();
}

/**
 * Soft rope creak / fibre rustle while dragging.
 */
export function playCreak(strength = 0.5) {
  const ac = getCtx();
  if (!ac) return;

  const dur = 0.16;

  const buffer = ac.createBuffer(
    1,
    Math.floor(ac.sampleRate * dur),
    ac.sampleRate
  );

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

/**
 * Temple-bell style chime used for the reveal.
 */
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

/**
 * Start background MP3 music.
 *
 * Music only starts after a user interaction.
 * The MP3 loops continuously until stopAmbient() is called.
 */
export function startAmbient() {
  if (typeof window === "undefined") return;

  // If music is already playing, do nothing.
  if (backgroundMusic && !backgroundMusic.paused) {
    return;
  }

  // Create the audio element only once.
  if (!backgroundMusic) {
    backgroundMusic = new Audio(musicFile);

    // Loop the wedding background music.
    backgroundMusic.loop = true;

    // Background music volume.
    backgroundMusic.volume = 0.5;

    // Let the browser load the music when needed.
    backgroundMusic.preload = "auto";
  }

  const playPromise = backgroundMusic.play();

  if (playPromise !== undefined) {
    playPromise.catch((error) => {
      console.warn("Background music could not be played:", error);
    });
  }

  ambient = {
    stop: () => {
      if (!backgroundMusic) return;

      backgroundMusic.pause();
      backgroundMusic.currentTime = 0;
    },
  };
}

/**
 * Stop background music.
 */
export function stopAmbient() {
  if (backgroundMusic) {
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
  }

  ambient = null;
}
