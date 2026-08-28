// Procedural Spatial Audio Engine using Web Audio API (Zero external assets, 100% instant)

class WorldAudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private currentWorld: string | null = null;
  private activeNodes: {
    oscillators: OscillatorNode[];
    gainNode: GainNode;
    filterNode: BiquadFilterNode;
  } | null = null;

  private initContext() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  public playWorldAmbience(worldId: string) {
    if (typeof window === "undefined") return;
    this.initContext();
    if (!this.ctx) return;

    // Fade out previous
    this.stopAmbience();

    if (this.isMuted) return;

    this.currentWorld = worldId;
    const now = this.ctx.currentTime;

    const masterGain = this.ctx.createGain();
    masterGain.gain.setValueAtTime(0.001, now);
    masterGain.gain.exponentialRampToValueAtTime(0.08, now + 2.5); // soft, elegant ambient volume
    masterGain.connect(this.ctx.destination);

    const filter = this.ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.Q.value = 3;
    filter.connect(masterGain);

    const oscillators: OscillatorNode[] = [];

    // Frequencies tailored to each world's emotional frequency
    let freqs = [55, 110, 165, 220]; // Default harmonic drone
    let filterFreq = 450;

    switch (worldId) {
      case "uiux":
        // Ethereal crystal major 9th chord (Clean, expansive, uplifting)
        freqs = [130.81, 164.81, 196.0, 246.94, 293.66]; // C3, E3, G3, B3, D4
        filterFreq = 650;
        break;
      case "engineering":
      case "saas":
        // Cyber deep pulse 432Hz root with sub-octave (Focused, computational, precise)
        freqs = [54.0, 108.0, 216.0, 324.0];
        filterFreq = 380;
        break;
      case "branding":
      case "packaging":
        // Warm golden overtone chord (Luxurious, warm, resonant)
        freqs = [73.42, 110.0, 146.83, 220.0, 293.66]; // D2, A2, D3, A3, D4
        filterFreq = 500;
        break;
      case "ai":
        // Cosmic neural mystery (Minor 11th shimmering nebula)
        freqs = [65.41, 98.0, 146.83, 174.61, 261.63]; // C2, G2, D3, F3, C4
        filterFreq = 750;
        break;
      case "motion":
        // Cinematic deep pulse with slow modulation
        freqs = [58.27, 87.31, 116.54, 174.61]; // Bb1, F2, Bb2, F3
        filterFreq = 420;
        break;
      case "marketing":
      case "ecommerce":
        // Vibrant emerald major pentatonic (Dynamic, thriving, forward momentum)
        freqs = [98.0, 146.83, 196.0, 220.0, 293.66]; // G2, D3, G3, A3, D4
        filterFreq = 580;
        break;
    }

    filter.frequency.setValueAtTime(filterFreq, now);

    // Subtle LFO for breathing movement
    const lfo = this.ctx.createOscillator();
    const lfoGain = this.ctx.createGain();
    lfo.frequency.setValueAtTime(0.15, now); // 0.15 Hz slow breathing
    lfoGain.gain.setValueAtTime(80, now);
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    lfo.start(now);
    oscillators.push(lfo);

    freqs.forEach((f, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      osc.type = idx === 0 ? "sine" : "triangle";
      osc.frequency.setValueAtTime(f, now);
      // Slight detune for rich lush stereo texture
      osc.detune.setValueAtTime((idx - 2) * 3, now);

      const oscGain = this.ctx.createGain();
      oscGain.gain.setValueAtTime(1 / freqs.length, now);

      osc.connect(oscGain);
      oscGain.connect(filter);
      osc.start(now);
      oscillators.push(osc);
    });

    this.activeNodes = {
      oscillators,
      gainNode: masterGain,
      filterNode: filter,
    };
  }

  public stopAmbience() {
    if (!this.activeNodes || !this.ctx) return;
    const now = this.ctx.currentTime;
    try {
      this.activeNodes.gainNode.gain.setValueAtTime(this.activeNodes.gainNode.gain.value, now);
      this.activeNodes.gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.8);
      const oscs = this.activeNodes.oscillators;
      setTimeout(() => {
        oscs.forEach((osc) => {
          try {
            osc.stop();
            osc.disconnect();
          } catch {}
        });
      }, 900);
    } catch {}
    this.activeNodes = null;
    this.currentWorld = null;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stopAmbience();
    } else if (this.currentWorld) {
      this.playWorldAmbience(this.currentWorld);
    }
    return this.isMuted;
  }

  public getMutedState(): boolean {
    return this.isMuted;
  }
}

export const worldAudio = new WorldAudioEngine();
