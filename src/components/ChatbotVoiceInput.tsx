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
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const silenceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const interimRef = useRef('');

  useEffect(() => {
    const SR = window.SpeechRecognition ?? window.webkitSpeechRecognition;
    if (!SR) {
      setIsSupported(false);
    }
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

  const startListening = useCallback(() => {
    const SR = window.SpeechRecognition ?? window.webkitSpeechRecognition;
    if (!SR) return;

    const recognition = new SR();
    recognition.lang = getSpeechLang(lang);
    recognition.continuous = true;
    recognition.interimResults = true;
    interimRef.current = '';

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
      if (combined) onTranscript(combined);

      if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = setTimeout(() => {
        stopListening();
      }, 2500);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
  }, [lang, onTranscript, stopListening]);

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
    <button
      type="button"
      disabled={disabled}
      onClick={isListening ? stopListening : startListening}
      title={isListening ? t('chat.micStop') : t('chat.micStart')}
      className={`p-2 rounded-full transition-colors ${
        isListening
          ? 'bg-red-100 text-red-600 hover:bg-red-200 animate-pulse'
          : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
      } ${disabled ? 'opacity-40 cursor-not-allowed' : ''}`}
    >
      {isListening ? <Square className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
    </button>
  );
}
