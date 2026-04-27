let cachedVoice: SpeechSynthesisVoice | null = null;
let voicesLoaded = false;

function getBulgarianVoice(): SpeechSynthesisVoice | null {
  if (cachedVoice && voicesLoaded) return cachedVoice;
  if (typeof window === 'undefined') return null;

  const voices = window.speechSynthesis.getVoices();
  if (voices.length === 0) return null;
  voicesLoaded = true;

  const bgVoices = voices.filter(v => v.lang.startsWith('bg'));

  // Prefer Google female voices (highest quality in Chrome)
  const googleFemale = bgVoices.find(v =>
    v.name.toLowerCase().includes('google') && !v.name.toLowerCase().includes('male')
  );
  if (googleFemale) { cachedVoice = googleFemale; return cachedVoice; }

  // Then any Google voice
  const google = bgVoices.find(v => v.name.toLowerCase().includes('google'));
  if (google) { cachedVoice = google; return cachedVoice; }

  // Prefer female voices over male
  const female = bgVoices.find(v =>
    v.name.toLowerCase().includes('female') || v.name.toLowerCase().includes('жен')
  );
  if (female) { cachedVoice = female; return cachedVoice; }

  // Any Bulgarian voice
  if (bgVoices.length > 0) { cachedVoice = bgVoices[0]; return cachedVoice; }

  return null;
}

// Pre-load voices (they load asynchronously in some browsers)
if (typeof window !== 'undefined' && window.speechSynthesis) {
  window.speechSynthesis.onvoiceschanged = () => {
    voicesLoaded = false;
    cachedVoice = null;
    getBulgarianVoice();
  };
  getBulgarianVoice();
}

export function cleanForTTS(raw: string): string {
  return raw
    .replace(/\s*\/\s*/g, ', ')
    .replace(/\s*[–—]\s*/g, ', ')
    .replace(/\s*\([^)]*\)\s*/g, ' ')
    .replace(/[=→⇒]/g, ', ')
    .replace(/!/g, '.')
    .replace(/[€¢№]/g, '')
    .replace(/\bм\.р\./g, 'мъжки род')
    .replace(/\bж\.р\./g, 'женски род')
    .replace(/\bср\.р\./g, 'среден род')
    .replace(/\bмн\.ч\./g, 'множествено число')
    .replace(/\bгр\./g, 'град')
    .replace(/\bс\.\s/g, 'село ')
    .replace(/\bкв\./g, 'квартал')
    .replace(/\bжк\b/g, 'жилищен комплекс')
    .replace(/\bул\./g, 'улица')
    .replace(/\bбул\./g, 'булевард')
    .replace(/\bбл\./g, 'блок')
    .replace(/\bвх\./g, 'вход')
    .replace(/\bет\./g, 'етаж')
    .replace(/\bап\./g, 'апартамент')
    .replace(/\bтел\./g, 'телефон')
    .replace(/\(вие,\s*Вие\)/g, '')
    .replace(/\(ти\)/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export function speakBulgarian(text: string, rate = 0.85): void {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(cleanForTTS(text));
  utterance.lang = 'bg-BG';
  utterance.rate = rate;

  const voice = getBulgarianVoice();
  if (voice) utterance.voice = voice;

  // Mobile Safari workaround: resume after pause on backgrounding
  const resumeTimer = setInterval(() => {
    if (window.speechSynthesis.paused) window.speechSynthesis.resume();
  }, 300);
  utterance.onend = () => clearInterval(resumeTimer);
  utterance.onerror = () => clearInterval(resumeTimer);

  window.speechSynthesis.speak(utterance);
}

export function stopSpeaking(): void {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
}

export function isTtsAvailable(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

// ---------------------------------------------------------------------------
// TTS Audio file helpers (pre-generated MP3 via Google Cloud TTS)
// ---------------------------------------------------------------------------

let currentAudio: HTMLAudioElement | null = null;
let currentAudioUrl: string | null = null;

export function getTtsAudioPath(
  exerciseId: string,
  category: 'words' | 'dialogues' | 'grammar' | 'texts' | 'listening',
  filename: string,
): string {
  const lessonMatch = exerciseId.match(/^l(\d+)/);
  if (lessonMatch) return `/assets/lesson-${lessonMatch[1]}/audio/tts/${category}/${filename}.mp3`;

  const testMatch = exerciseId.match(/^t(\d+)/);
  if (testMatch) {
    const testNum = parseInt(testMatch[1], 10);
    return `/assets/test-a1-${testNum}/audio/tts/${category}/${filename}.mp3`;
  }

  return '';
}

export function playTtsAudio(
  audioUrl: string,
  fallbackText?: string,
  rate?: number,
  onPlaybackEnd?: () => void,
): void {
  // Toggle: if the same audio is already playing, stop it (second click = pause).
  // Components benefit from this without any per-component changes.
  if (
    currentAudio &&
    currentAudioUrl === audioUrl &&
    !currentAudio.paused &&
    !currentAudio.ended
  ) {
    const cb = onPlaybackEnd;
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
    currentAudioUrl = null;
    cb?.();
    return;
  }

  // Different URL (or no audio): stop the current one and play the new one.
  if (currentAudio) {
    currentAudio.pause();
    currentAudio = null;
    currentAudioUrl = null;
  }

  if (!audioUrl) {
    if (fallbackText) speakBulgarian(fallbackText, rate);
    return;
  }

  const audio = new Audio(audioUrl);
  currentAudio = audio;
  currentAudioUrl = audioUrl;
  const finish = () => {
    if (currentAudio === audio) {
      currentAudio = null;
      currentAudioUrl = null;
    }
    onPlaybackEnd?.();
  };
  audio.onended = finish;
  audio.play().catch(() => {
    if (currentAudio === audio) {
      currentAudio = null;
      currentAudioUrl = null;
    }
    if (fallbackText) speakBulgarian(fallbackText, rate);
    onPlaybackEnd?.();
  });
}

/**
 * Toggle audio playback: if the same URL is already playing, pause it.
 * If a different URL is playing, stop it and start the new one.
 * Returns true if audio started playing, false if it was paused/stopped.
 */
export function toggleTtsAudio(
  audioUrl: string,
  fallbackText?: string,
  rate?: number,
  onPlaybackEnd?: () => void,
): boolean {
  if (currentAudio && currentAudioUrl === audioUrl) {
    // Same audio — toggle pause/resume
    if (currentAudio.paused) {
      currentAudio.play().catch(() => {});
      return true;
    } else {
      currentAudio.pause();
      return false;
    }
  }
  // Different or no audio — start fresh
  playTtsAudio(audioUrl, fallbackText, rate, onPlaybackEnd);
  return true;
}

export function stopTtsAudio(): void {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio = null;
    currentAudioUrl = null;
  }
  stopSpeaking();
}
