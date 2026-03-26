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

function cleanForTTS(raw: string): string {
  return raw
    .replace(/[=→⇒]/g, ', ')
    .replace(/[€¢]/g, '')
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
