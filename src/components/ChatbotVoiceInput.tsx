'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Mic, MicOff, Square, Loader2 } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { useT } from '@/i18n/useT';

/**
 * Voice input button for the chatbot.
 *
 * Records audio on the client with MediaRecorder and uploads it to
 * /api/chat/transcribe (OpenAI Whisper). This replaces the previous
 * browser-native SpeechRecognition implementation, which was unreliable for
 * Bulgarian/Russian/Persian/etc. on Edge (Microsoft's online speech service
 * has limited language coverage and is regionally gated).
 *
 * UI states:
 *   idle         → grey mic icon
 *   recording    → red pulsing square + elapsed seconds badge
 *   transcribing → spinning loader (Whisper request in flight)
 *
 * Errors surface as a small auto-dismissing toast above the button. All
 * notable events are also logged to the console for diagnostics.
 */

interface Props {
  onTranscript: (text: string) => void;
  disabled?: boolean;
}

type Status = 'idle' | 'recording' | 'transcribing';

// Hard cap on a single utterance. 60 s is plenty for a chat message and keeps
// the upload <2 MB at typical opus bitrates — well under the API's 25 MB max.
const MAX_RECORDING_MS = 60_000;
// Stop automatically after 5 s of measured silence so users don't have to
// remember to press Stop. We piggy-back on Web Audio's analyser node for this
// (no heuristics on the encoded blob).
const SILENCE_MS = 5_000;
const SILENCE_RMS_THRESHOLD = 0.012;

function pickMimeType(): string {
  if (typeof MediaRecorder === 'undefined') return '';
  // Preference order: opus in webm (Chrome/Edge/Firefox), opus in ogg
  // (some Firefoxes), mp4/aac (Safari). Empty string => browser default.
  const candidates = [
    'audio/webm;codecs=opus',
    'audio/webm',
    'audio/ogg;codecs=opus',
    'audio/mp4',
    'audio/mpeg',
  ];
  for (const c of candidates) {
    if (MediaRecorder.isTypeSupported(c)) return c;
  }
  return '';
}

export function ChatbotVoiceInput({ onTranscript, disabled }: Props) {
  const { lang } = useLanguage();
  const t = useT();
  const [status, setStatus] = useState<Status>('idle');
  const [isSupported, setIsSupported] = useState(true);
  const [elapsedSec, setElapsedSec] = useState(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const recorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const startedAtRef = useRef<number>(0);
  const tickTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const maxTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const errorTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Silence detector wiring (Web Audio API). All three are kept on refs so
  // teardown can null them out from any code path.
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const silenceFrameRef = useRef<number | null>(null);
  const silenceStartedAtRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const ok = typeof MediaRecorder !== 'undefined'
      && !!navigator.mediaDevices?.getUserMedia;
    if (!ok) setIsSupported(false);
  }, []);

  // Centralised teardown — releases the mic, stops timers and disconnects the
  // Web Audio graph. Safe to call multiple times; each ref is nulled out as
  // soon as it's been handled.
  const cleanup = useCallback(() => {
    if (tickTimerRef.current) {
      clearInterval(tickTimerRef.current);
      tickTimerRef.current = null;
    }
    if (maxTimerRef.current) {
      clearTimeout(maxTimerRef.current);
      maxTimerRef.current = null;
    }
    if (silenceFrameRef.current !== null) {
      cancelAnimationFrame(silenceFrameRef.current);
      silenceFrameRef.current = null;
    }
    silenceStartedAtRef.current = null;

    if (sourceRef.current) {
      try { sourceRef.current.disconnect(); } catch { /* already disconnected */ }
      sourceRef.current = null;
    }
    if (analyserRef.current) {
      try { analyserRef.current.disconnect(); } catch { /* already disconnected */ }
      analyserRef.current = null;
    }
    if (audioCtxRef.current) {
      audioCtxRef.current.close().catch(() => { /* ignore */ });
      audioCtxRef.current = null;
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((tr) => tr.stop());
      streamRef.current = null;
    }
    recorderRef.current = null;
  }, []);

  useEffect(() => {
    return () => {
      if (errorTimerRef.current) clearTimeout(errorTimerRef.current);
      cleanup();
    };
  }, [cleanup]);

  const showError = useCallback((msg: string) => {
    setErrorMsg(msg);
    if (errorTimerRef.current) clearTimeout(errorTimerRef.current);
    errorTimerRef.current = setTimeout(() => setErrorMsg(null), 6000);
  }, []);

  const messageForMediaError = useCallback((name: string): string => {
    switch (name) {
      case 'NotAllowedError':
      case 'SecurityError':
        return t('chat.micErrorBlocked');
      case 'NotFoundError':
      case 'OverconstrainedError':
        return t('chat.micErrorNoDevice');
      case 'NotReadableError':
      case 'AbortError':
        return t('chat.micErrorBusy');
      default:
        return `${t('chat.micErrorGeneric')} (${name})`;
    }
  }, [t]);

  const transcribe = useCallback(async (blob: Blob, mime: string) => {
    setStatus('transcribing');
    try {
      const form = new FormData();
      form.append('audio', blob, mime.includes('mp4') ? 'audio.mp4' : 'audio.webm');
      form.append('language', lang);

      const res = await fetch('/api/chat/transcribe', {
        method: 'POST',
        body: form,
      });

      if (!res.ok) {
        const { error } = await res.json().catch(() => ({ error: 'Transcription failed' }));
        console.error('[voice] transcribe http error', res.status, error);
        showError(error ?? t('chat.micErrorTranscribe'));
        return;
      }

      const { text } = (await res.json()) as { text: string };
      console.log('[voice] transcript', { len: text.length, preview: text.slice(0, 60) });
      if (text.trim()) {
        onTranscript(text.trim());
      } else {
        // Whisper occasionally returns an empty string for silent / very short
        // audio — treat that as "didn't catch it" rather than a hard error so
        // the user understands why nothing happened.
        showError(t('chat.micErrorNoSpeech'));
      }
    } catch (err) {
      console.error('[voice] transcribe fetch failed', err);
      showError(t('chat.micErrorTranscribe'));
    } finally {
      setStatus('idle');
    }
  }, [lang, onTranscript, showError, t]);

  const stopRecording = useCallback(() => {
    const rec = recorderRef.current;
    if (rec && rec.state !== 'inactive') {
      // The actual upload happens in `onstop` below — calling stop() here
      // simply flushes the final chunk so MediaRecorder fires that event.
      try { rec.stop(); } catch { /* already stopped */ }
    } else {
      // Nothing was actually recording (e.g. preflight failure). Just reset.
      cleanup();
      setStatus('idle');
    }
  }, [cleanup]);

  // Lightweight silence detector. We sample the time-domain waveform every
  // animation frame, compute an RMS amplitude and stop the recording once the
  // signal stays below `SILENCE_RMS_THRESHOLD` for `SILENCE_MS` consecutively.
  // This is intentionally crude — we don't need VAD-quality accuracy, only a
  // "the user stopped talking" hint so the UI doesn't depend on a Stop click.
  const startSilenceDetector = useCallback((stream: MediaStream) => {
    try {
      const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!Ctor) return;
      const ctx = new Ctor();
      const source = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 1024;
      source.connect(analyser);

      audioCtxRef.current = ctx;
      sourceRef.current = source;
      analyserRef.current = analyser;

      const buffer = new Float32Array(analyser.fftSize);
      const tick = () => {
        if (!analyserRef.current) return;
        analyserRef.current.getFloatTimeDomainData(buffer);
        let sumSq = 0;
        for (let i = 0; i < buffer.length; i++) sumSq += buffer[i] * buffer[i];
        const rms = Math.sqrt(sumSq / buffer.length);

        if (rms > SILENCE_RMS_THRESHOLD) {
          silenceStartedAtRef.current = null;
        } else {
          const now = performance.now();
          if (silenceStartedAtRef.current === null) {
            silenceStartedAtRef.current = now;
          } else if (now - silenceStartedAtRef.current >= SILENCE_MS) {
            // Long enough silence — stop the recording. The onstop handler
            // will pick up the chunks and trigger transcription.
            stopRecording();
            return;
          }
        }
        silenceFrameRef.current = requestAnimationFrame(tick);
      };
      silenceFrameRef.current = requestAnimationFrame(tick);
    } catch (err) {
      // The silence detector is best-effort — if the browser refuses to give
      // us an AudioContext, recording still works via the manual Stop button
      // and the MAX_RECORDING_MS timeout.
      console.warn('[voice] silence detector unavailable', err);
    }
  }, [stopRecording]);

  const startRecording = useCallback(async () => {
    if (!isSupported) return;
    setErrorMsg(null);

    let stream: MediaStream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch (err) {
      const name = err instanceof Error ? err.name : String(err);
      console.error('[voice] getUserMedia failed', name, err);
      showError(messageForMediaError(name));
      return;
    }
    streamRef.current = stream;

    const mimeType = pickMimeType();
    let recorder: MediaRecorder;
    try {
      recorder = mimeType
        ? new MediaRecorder(stream, { mimeType })
        : new MediaRecorder(stream);
    } catch (err) {
      console.error('[voice] MediaRecorder construction failed', err);
      cleanup();
      showError(t('chat.micErrorGeneric'));
      return;
    }
    recorderRef.current = recorder;
    chunksRef.current = [];

    recorder.ondataavailable = (e: BlobEvent) => {
      if (e.data && e.data.size > 0) chunksRef.current.push(e.data);
    };

    recorder.onstop = () => {
      const effectiveMime = recorder.mimeType || mimeType || 'audio/webm';
      const blob = new Blob(chunksRef.current, { type: effectiveMime });
      chunksRef.current = [];
      cleanup();

      console.log('[voice] recording stopped', {
        bytes: blob.size,
        mime: effectiveMime,
        durationMs: Date.now() - startedAtRef.current,
      });

      if (blob.size === 0) {
        setStatus('idle');
        showError(t('chat.micErrorNoSpeech'));
        return;
      }
      void transcribe(blob, effectiveMime);
    };

    recorder.onerror = (e) => {
      const evt = e as unknown as { error?: { name?: string; message?: string } };
      console.error('[voice] MediaRecorder error', evt.error);
      cleanup();
      setStatus('idle');
      showError(`${t('chat.micErrorGeneric')} (${evt.error?.name ?? 'recorder'})`);
    };

    startedAtRef.current = Date.now();
    try {
      recorder.start();
    } catch (err) {
      console.error('[voice] recorder.start() threw', err);
      cleanup();
      showError(t('chat.micErrorGeneric'));
      return;
    }

    setStatus('recording');
    setElapsedSec(0);
    tickTimerRef.current = setInterval(() => {
      setElapsedSec(Math.floor((Date.now() - startedAtRef.current) / 1000));
    }, 250);
    maxTimerRef.current = setTimeout(() => {
      console.log('[voice] max duration reached, stopping');
      stopRecording();
    }, MAX_RECORDING_MS);

    startSilenceDetector(stream);
    console.log('[voice] recording started', { mimeType, menuLang: lang });
  }, [
    isSupported,
    showError,
    messageForMediaError,
    cleanup,
    t,
    transcribe,
    stopRecording,
    startSilenceDetector,
    lang,
  ]);

  if (!isSupported) {
    return (
      <button
        type="button"
        disabled
        title={t('chat.micNotSupported')}
        className="p-2 rounded-full text-gray-300 cursor-not-allowed"
      >
        <MicOff className="w-5 h-5" />
      </button>
    );
  }

  const isRecording = status === 'recording';
  const isTranscribing = status === 'transcribing';
  const isBusy = disabled || isTranscribing;

  const handleClick = () => {
    if (isRecording) {
      stopRecording();
    } else if (status === 'idle') {
      void startRecording();
    }
  };

  const title = isTranscribing
    ? t('chat.micTranscribing')
    : isRecording
      ? t('chat.micRecording')
      : t('chat.micStart');

  return (
    <div className="relative">
      <button
        type="button"
        disabled={isBusy}
        onClick={handleClick}
        title={title}
        aria-label={title}
        className={`p-2 rounded-full transition-colors ${
          isRecording
            ? 'bg-[#FCE2DE] text-[#D25A45] hover:bg-[#f7cfc7] animate-pulse'
            : isTranscribing
              ? 'text-[#0072BC]'
              : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
        } ${isBusy && !isTranscribing ? 'opacity-40 cursor-not-allowed' : ''}`}
      >
        {isTranscribing ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : isRecording ? (
          <Square className="w-5 h-5 fill-current" />
        ) : (
          <Mic className="w-5 h-5" />
        )}
      </button>

      {isRecording && (
        <span
          className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 rounded-full bg-[#D25A45] text-white text-[10px] font-bold flex items-center justify-center pointer-events-none"
          aria-hidden
        >
          {elapsedSec}
        </span>
      )}

      {errorMsg && (
        <div
          role="alert"
          className="absolute bottom-full left-0 mb-2 z-20 max-w-[260px] bg-[#683229] text-white text-xs rounded-lg px-3 py-1.5 shadow-lg"
        >
          {errorMsg}
        </div>
      )}
    </div>
  );
}
