'use client';

import { useState, useRef } from 'react';
import { Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useT } from '@/i18n/useT';
import { useLanguage } from '@/i18n/LanguageContext';
import { InlineTranslation } from '@/components/InlineTranslation';

interface ReadingTextProps {
  audioUrl?: string;
  paragraphs: string[];
}

export function ReadingText({ audioUrl, paragraphs }: ReadingTextProps) {
  const t = useT();
  const { lang } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);
  const [revealedParas, setRevealedParas] = useState<Set<number>>(new Set());
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlayAudio = () => {
    if (!audioUrl) return;
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    } else {
      const audio = new Audio(audioUrl);
      audioRef.current = audio;
      audio.onended = () => setIsPlaying(false);
      audio.onerror = () => setIsPlaying(false);
      audio.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="relative bg-white rounded-xl p-6 md:p-10 shadow-md">
      {audioUrl && (
        <div className="flex justify-end mb-6">
          <Button
            onClick={handlePlayAudio}
            className="bg-[#8FC412] hover:bg-[#7DAD0E] text-white px-6 py-3 rounded-lg font-semibold text-base shadow-md active:scale-95 transition-all flex items-center gap-2"
          >
            {isPlaying ? (
              <>
                <Pause className="w-5 h-5" />
                {t('exercise.stop')}
              </>
            ) : (
              <>
                <Play className="w-5 h-5" />
                {t('exercise.listen')}
              </>
            )}
          </Button>
        </div>
      )}

      {lang !== 'bg' && (
        <p className="text-xs text-gray-400 text-center mb-4 italic">
          {t('exercise.tapToTranslate')}
        </p>
      )}

      <div className="space-y-4">
        {paragraphs.map((paragraph, index) => (
          <div
            key={index}
            onClick={() => {
              const utterance = new SpeechSynthesisUtterance(paragraph);
              utterance.lang = 'bg-BG';
              utterance.rate = 0.85;
              window.speechSynthesis.speak(utterance);

              setRevealedParas(prev => {
                const next = new Set(prev);
                if (next.has(index)) next.delete(index);
                else next.add(index);
                return next;
              });
            }}
            className="cursor-pointer hover:bg-gray-50 rounded-lg p-2 -mx-2 transition-colors active:scale-[0.99]"
          >
            <p className="text-base md:text-lg text-gray-800 leading-relaxed">
              {paragraph}
            </p>
            <InlineTranslation text={paragraph} visible={revealedParas.has(index)} />
          </div>
        ))}
      </div>
    </div>
  );
}
