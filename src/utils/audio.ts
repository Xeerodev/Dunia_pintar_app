/**
 * Audio Synthesis & Speech Utility
 * Uses Web Audio API for interactive sound effects and Web Speech API for TTS pronunciation.
 */

// Simple AudioContext singleton
let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Text To Speech synthesis using browser Web Speech API
 */
export function speakText(text: string, lang: 'id-ID' | 'en-US' = 'id-ID'): void {
  if (!('speechSynthesis' in window)) {
    console.warn('Speech synthesis not supported on this browser');
    return;
  }

  // Function to perform the actual speaking
  const performSpeak = () => {
    // Cancel ongoing speech
    window.speechSynthesis.cancel();

    // Small delay to ensure cancel is processed
    setTimeout(() => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;

      // Indonesian voices are often "kaku". Let's optimize.
      utterance.rate = lang === 'id-ID' ? 1.05 : 0.95;
      utterance.pitch = 1.15; // Slightly higher for child-friendly feel
      utterance.volume = 1.0;

      // Get all available voices
      const voices = window.speechSynthesis.getVoices();

      // Look for high quality voices first
      let targetVoice = voices.find(v => v.lang === lang && (v.name.includes('Google') || v.name.includes('Natural')));

      if (!targetVoice) {
        targetVoice = voices.find(v => v.lang === lang);
      }

      if (!targetVoice) {
        const langShort = lang.split('-')[0];
        targetVoice = voices.find(v => v.lang.startsWith(langShort));
      }

      if (targetVoice) {
        utterance.voice = targetVoice;
      }

      window.speechSynthesis.speak(utterance);
    }, 50);
  };

  // Check if voices are already loaded
  if (window.speechSynthesis.getVoices().length > 0) {
    performSpeak();
  } else {
    // Wait for voices to load
    window.speechSynthesis.onvoiceschanged = () => {
      performSpeak();
      window.speechSynthesis.onvoiceschanged = null;
    };
  }
}

/**
 * Play tactile button press sound (soft bubble pop)
 */
export function playPopSound(): void {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.08);
  } catch (e) {
    console.debug('Audio not allowed or supported', e);
  }
}

/**
 * Play card flip sound
 */
export function playCardFlipSound(): void {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(250, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.12);

    gain.gain.setValueAtTime(0.25, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.12);
  } catch (e) {
    console.debug('Audio issue', e);
  }
}

/**
 * Play star chime reward sound
 */
export function playStarChime(): void {
  try {
    const ctx = getAudioContext();
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.value = freq;

      const startTime = ctx.currentTime + idx * 0.07;
      gain.gain.setValueAtTime(0.3, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.25);
    });
  } catch (e) {
    console.debug('Audio issue', e);
  }
}

/**
 * Play victory fanfare sound
 */
export function playVictoryFanfare(): void {
  try {
    const ctx = getAudioContext();
    const notes = [261.63, 329.63, 392.0, 523.25, 659.25, 783.99]; // C4, E4, G4, C5, E5, G5
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = idx === notes.length - 1 ? 'triangle' : 'sine';
      osc.frequency.value = freq;

      const startTime = ctx.currentTime + idx * 0.1;
      const duration = idx === notes.length - 1 ? 0.6 : 0.2;

      gain.gain.setValueAtTime(0.35, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + duration);
    });
  } catch (e) {
    console.debug('Audio issue', e);
  }
}

/**
 * Play synthesized animal sound effects
 */
export function playAnimalSound(type: 'lion' | 'elephant' | 'monkey' | 'bird' | 'cat' | 'dog'): void {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    if (type === 'cat') {
      // Meow: rising then falling pitch
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(850, now + 0.2);
      osc.frequency.exponentialRampToValueAtTime(500, now + 0.5);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.5);
      speakText('Kucing! Miau miau!', 'id-ID');
    } else if (type === 'dog') {
      // Woof woof: two short low burst clicks
      [0, 0.2].forEach((delay) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(200, now + delay);
        osc.frequency.exponentialRampToValueAtTime(90, now + delay + 0.12);

        gain.gain.setValueAtTime(0.4, now + delay);
        gain.gain.exponentialRampToValueAtTime(0.01, now + delay + 0.12);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + delay);
        osc.stop(now + delay + 0.12);
      });
      speakText('Anjing! Guk guk!', 'id-ID');
    } else if (type === 'lion') {
      // Lion Roar: noise / low rumble
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(110, now);
      osc.frequency.linearRampToValueAtTime(70, now + 0.8);

      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.8);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.8);
      speakText('Singa! Roaaar!', 'id-ID');
    } else if (type === 'bird') {
      // Bird Chirp: fast high pitch glides
      [0, 0.12, 0.24].forEach((delay) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1800, now + delay);
        osc.frequency.exponentialRampToValueAtTime(2600, now + delay + 0.08);

        gain.gain.setValueAtTime(0.3, now + delay);
        gain.gain.exponentialRampToValueAtTime(0.01, now + delay + 0.08);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + delay);
        osc.stop(now + delay + 0.08);
      });
      speakText('Burung! Cicit cuit!', 'id-ID');
    } else if (type === 'monkey') {
      // Monkey: Ooh ooh aah aah
      [0, 0.18, 0.36].forEach((delay, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        const freq = idx % 2 === 0 ? 450 : 650;
        osc.frequency.setValueAtTime(freq, now + delay);
        osc.frequency.exponentialRampToValueAtTime(freq * 1.3, now + delay + 0.1);

        gain.gain.setValueAtTime(0.35, now + delay);
        gain.gain.exponentialRampToValueAtTime(0.01, now + delay + 0.12);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + delay);
        osc.stop(now + delay + 0.12);
      });
      speakText('Monyet! U-u a-a!', 'id-ID');
    } else if (type === 'elephant') {
      // Elephant trumpet: high pitch sliding horn
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(300, now);
      osc.frequency.linearRampToValueAtTime(600, now + 0.3);
      osc.frequency.linearRampToValueAtTime(550, now + 0.6);

      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.6);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.6);
      speakText('Gajah! Paaoooh!', 'id-ID');
    }
  } catch (e) {
    console.debug('Animal sound audio exception', e);
  }
}
