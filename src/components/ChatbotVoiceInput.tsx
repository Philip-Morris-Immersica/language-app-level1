'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Mic, MicOff, Square } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { useT } from '@/i18n/useT';
import { getSpeechLang } from '@/lib/chat/speechLangMap';

interface Props {
  onTranscript: (text: string) => void;
  disabled?: boolean;
}

type SpeechRecognitionInstance = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onresult: ((e: SpeechRecognitionEvent) => void) | null;
  onend: (() => void) | null;
  onerror: ((e: { error: string }) => void) | null;
  start: () => void;
  stop: () => void;
};

type SpeechRecognitionEvent = {
  results: SpeechRecognitionResultList;
};

type SpeechRecognitionResultList = {
  length: number;
  [index: number]: SpeechRecognitionResult;
};

type SpeechRecognitionResult = {
  [index: number]: { transcript: string };
  isFinal: boolean;
};

declare global {
  interface Window {
    SpeechRecognition?: new () => SpeechRecognitionInstance;
    webkitSpeechRecognition?: new () => SpeechRecognitionInstance;
  }
}

export function ChatbotVoiceInput({ onTranscript, disabled }: Props) {
  const { lang } = useLanguage();
  const t = useT();
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const silenceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const errorTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const interimRef = useRef('');

  useEffect(() => {
    const SR = window.SpeechRecognition ?? window.webkitSpeechRecognition;
    if (!SR) {
      setIsSupported(false);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (errorTimerRef.current) clearTimeout(errorTimerRef.current);
      if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
    };
  }, []);

  // Temporary diagnostic toast. Auto-hides after 6s so it doesn't linger.
  const showError = useCallback((msg: string) => {
    setErrorMsg(msg);
    if (errorTimerRef.current) clearTimeout(errorTimerRef.current);
    errorTimerRef.current = setTimeout(() => setErrorMsg(null), 6000);
  }, []);

  const stopListening = useCallback(() => {
    if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
    recognitionRef.current?.stop();
    setIsListening(false);
    if (interimRef.current.trim()) {
      onTranscript(interimRef.current.trim());
      interimRef.current = '';
    }
  }, [onTranscript]);

  // Map a SpeechRecognition error code (defined by the Web Speech API) to a
  // localised user-facing message.
  const messageForSpeechError = useCallback((code: string): string => {
    switch (code) {
      case 'not-allowed':
      case 'service-not-allowed':
        return t('chat.micErrorBlocked');
      case 'no-speech':
        return t('chat.micErrorNoSpeech');
      case 'network':
        return t('chat.micErrorNetwork');
      case 'audio-capture':
        return t('chat.micErrorBusy');
      case 'language-not-supported':
      case 'bad-grammar':
        return t('chat.micErrorLangNotSupported');
      default:
        return `${t('chat.micErrorGeneric')} (${code})`;
    }
  }, [t]);

  // Map a getUserMedia DOMException name to a localised user-facing message.
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

  const startListening = useCallback(async () => {
    const SR = window.SpeechRecognition ?? window.webkitSpeechRecognition;
    if (!SR) return;

    setErrorMsg(null);
    const speechLang = getSpeechLang(lang);

    // Preflight: explicitly request mic permission via getUserMedia. This
    // forces the browser to show its permission prompt (which SpeechRecognition
    // does not always trigger on its own) and gives us specific DOMException
    // names so we can show useful errors instead of a silent failure.
    if (!navigator.mediaDevices?.getUserMedia) {
      console.error('[voice] mediaDevices.getUserMedia unavailable (likely insecure context)');
      showError(t('chat.micErrorBlocked'));
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      // We only needed the prompt + a sanity check — SpeechRecognition opens
      // its own internal mic handle, so close ours immediately.
      stream.getTracks().forEach((track) => track.stop());
      console.log('[voice] preflight ok');
    } catch (err) {
      const name = err instanceof Error ? err.name : String(err);
      console.error('[voice] preflight failed', name, err);
      // Dump the list of devices the browser actually sees so we can tell
      // apart "no hardware" vs "blocked at OS level" vs "permission denied".
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const audioInputs = devices.filter((d) => d.kind === 'audioinput');
        console.log('[voice] enumerateDevices audioinputs:', audioInputs.map((d) => ({
          deviceId: d.deviceId,
          label: d.label || '(empty — permission not granted)',
          groupId: d.groupId,
        })));
        console.log('[voice] all devices:', devices.map((d) => ({ kind: d.kind, label: d.label })));
      } catch (enumErr) {
        console.error('[voice] enumerateDevices failed', enumErr);
      }
      showError(messageForMediaError(name));
      return;
    }

    const recognition = new SR();
    recognition.lang = speechLang;
    recognition.continuous = true;
    recognition.interimResults = true;
    interimRef.current = '';

    console.log('[voice] start', { speechLang, menuLang: lang, origin: window.location.origin });

    recognition.onresult = (e: SpeechRecognitionEvent) => {
      let interim = '';
      let final = '';
      for (let i = 0; i < e.results.length; i++) {
        const r = e.results[i];
        if (r.isFinal) {
          final += r[0].transcript;
        } else {
          interim += r[0].transcript;
        }
      }

      const combined = final + interim;
      interimRef.current = combined;
      if (combined) {
        console.log('[voice] transcript', { final, interim });
        onTranscript(combined);
      }

      if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = setTimeout(() => {
        stopListening();
      }, 2500);
    };

    recognition.onend = () => {
      console.log('[voice] end');
      setIsListening(false);
    };

    recognition.onerror = (e: { error: string }) => {
      console.error('[voice] error', e.error, { speechLang, menuLang: lang });
      // 'aborted' fires when we call stop() ourselves — that's expected, not
      // a real error worth surfacing to the user.
      if (e.error !== 'aborted') {
        showError(messageForSpeechError(e.error));
      }
      setIsListening(false);
    };

    try {
      recognitionRef.current = recognition;
      recognition.start();
      setIsListening(true);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error('[voice] start() threw', err);
      showError(`${t('chat.micErrorGeneric')} (${msg})`);
    }
  }, [lang, onTranscript, stopListening, showError, t, messageForMediaError, messageForSpeechError]);

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

  return (
    <div className="relative">
      <button
        type="button"
        disabled={disabled}
        onClick={isListening ? stopListening : startListening}
        title={isListening ? t('chat.micStop') : `${t('chat.micStart')} (${getSpeechLang(lang)})`}
        className={`p-2 rounded-full transition-colors ${
          isListening
            ? 'bg-red-100 text-red-600 hover:bg-red-200 animate-pulse'
            : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
        } ${disabled ? 'opacity-40 cursor-not-allowed' : ''}`}
      >
        {isListening ? <Square className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
      </button>
      {errorMsg && (
        <div
          role="alert"
          className="absolute bottom-full left-0 mb-2 z-20 whitespace-nowrap bg-[#683229] text-white text-xs rounded-lg px-3 py-1.5 shadow-lg"
        >
          {errorMsg}
        </div>
      )}
    </div>
  );
}
