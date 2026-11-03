// Procedural Web Audio API sound generator tailored for Jujutsu Kaisen / Sukuna Cursed Energy soundscapes

let audioCtx: AudioContext | null = null;
let isAudioMuted = false; // Enabled by default for interactive immersive anime experience

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

export function toggleAudioMute(): boolean {
  isAudioMuted = !isAudioMuted;
  if (!isAudioMuted) {
    playCursedSlash();
  }
  return isAudioMuted;
}

export function getIsAudioMuted(): boolean {
  return isAudioMuted;
}

export function setAudioMuted(muted: boolean) {
  isAudioMuted = muted;
}

// Cursed Energy Hover Tone
export function playHoverSound(freq = 440, duration = 0.05) {
  if (isAudioMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.8, ctx.currentTime + duration);
    
    gain.gain.setValueAtTime(0.02, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch {
    // Ignore audio errors
  }
}

// Sukuna Cleave / Dismantle Slicing Sound
export function playCursedSlash() {
  if (isAudioMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // Fast white noise buffer for metallic blade whip
    const bufferSize = ctx.sampleRate * 0.15;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(3200, now);
    filter.frequency.exponentialRampToValueAtTime(400, now + 0.12);
    filter.Q.setValueAtTime(4, now);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

    whiteNoise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    whiteNoise.start(now);
    whiteNoise.stop(now + 0.15);

    // Sub-bass slice impact
    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(40, now + 0.15);
    oscGain.gain.setValueAtTime(0.06, now);
    oscGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.15);

    osc.connect(oscGain);
    oscGain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.15);
  } catch {
    // Ignore audio errors
  }
}

// Domain Expansion Bell & Energy Shimmer
export function playDomainExpansionSound() {
  if (isAudioMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // Deep temple bell / gong resonance
    const freqs = [110, 220, 330, 550, 880];
    freqs.forEach((f, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = i === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(f, now);

      gain.gain.setValueAtTime(0.06 / (i + 1), now);
      gain.gain.exponentialRampToValueAtTime(0.00001, now + 2.4);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 2.5);
    });

    // Cursed energy surge sweep
    const sweep = ctx.createOscillator();
    const sweepGain = ctx.createGain();
    sweep.type = 'sawtooth';
    sweep.frequency.setValueAtTime(150, now);
    sweep.frequency.exponentialRampToValueAtTime(1200, now + 0.6);
    sweep.frequency.exponentialRampToValueAtTime(300, now + 1.8);

    sweepGain.gain.setValueAtTime(0.03, now);
    sweepGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

    sweep.connect(sweepGain);
    sweepGain.connect(ctx.destination);
    sweep.start(now);
    sweep.stop(now + 1.8);
  } catch {
    // Ignore audio errors
  }
}

// Black Flash Thunder Strike
export function playBlackFlashSound() {
  if (isAudioMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // Explosive sub drop
    const sub = ctx.createOscillator();
    const subGain = ctx.createGain();
    sub.type = 'sine';
    sub.frequency.setValueAtTime(180, now);
    sub.frequency.exponentialRampToValueAtTime(25, now + 0.35);

    subGain.gain.setValueAtTime(0.12, now);
    subGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);

    sub.connect(subGain);
    subGain.connect(ctx.destination);
    sub.start(now);
    sub.stop(now + 0.4);

    // Distortion spark crackle
    const spark = ctx.createOscillator();
    const sparkGain = ctx.createGain();
    spark.type = 'sawtooth';
    spark.frequency.setValueAtTime(800, now);
    spark.frequency.exponentialRampToValueAtTime(1800, now + 0.1);
    spark.frequency.exponentialRampToValueAtTime(100, now + 0.3);

    sparkGain.gain.setValueAtTime(0.05, now);
    sparkGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.3);

    spark.connect(sparkGain);
    sparkGain.connect(ctx.destination);
    spark.start(now);
    spark.stop(now + 0.3);
  } catch {
    // Ignore audio errors
  }
}

// Hollow Purple Convergence Tone
export function playHollowPurpleSound() {
  if (isAudioMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // Red (Repulsion) & Blue (Attraction) dual oscillation
    const redOsc = ctx.createOscillator();
    const blueOsc = ctx.createOscillator();
    const gain = ctx.createGain();

    redOsc.type = 'sine';
    blueOsc.type = 'sine';

    redOsc.frequency.setValueAtTime(320, now);
    redOsc.frequency.linearRampToValueAtTime(640, now + 0.5);

    blueOsc.frequency.setValueAtTime(640, now);
    blueOsc.frequency.linearRampToValueAtTime(320, now + 0.5);

    gain.gain.setValueAtTime(0.04, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.8);

    redOsc.connect(gain);
    blueOsc.connect(gain);
    gain.connect(ctx.destination);

    redOsc.start(now);
    blueOsc.start(now);
    redOsc.stop(now + 0.8);
    blueOsc.stop(now + 0.8);
  } catch {
    // Ignore audio errors
  }
}

export function playClickSound() {
  playHoverSound(580, 0.04);
}

export function playSuccessSound() {
  playBlackFlashSound();
}
