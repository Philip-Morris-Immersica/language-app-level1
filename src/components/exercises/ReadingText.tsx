'use client';

import { useState, useRef } from 'react';
import { Play, Pause, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useT } from '@/i18n/useT';
import { useLanguage } from '@/i18n/LanguageContext';
import { InlineTranslation } from '@/components/InlineTranslation';

interface ChecklistItem {
  id: string;
  text: string;
  isTrue: boolean;
}

interface ReadingTextProps {
  audioUrl?: string;
  paragraphs: string[];
  showDictionary?: boolean;
  checklist?: {
    instruction: string;
    items: ChecklistItem[];
  };
  onComplete?: (isCorrect: boolean) => void;
}

export function ReadingText({ audioUrl, paragraphs, showDictionary, checklist, onComplete }: ReadingTextProps) {
  const t = useT();
  const { lang } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);
  const [revealedParas, setRevealedParas] = useState<Set<number>>(new Set());
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [checkAnswers, setCheckAnswers] = useState<Record<string, boolean | null>>({});
  const [checkSubmitted, setCheckSubmitted] = useState(false);
  const completedRef = useRef(false);

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
      {(audioUrl || showDictionary) && (
        <div className="flex justify-end gap-2 mb-6">
          {showDictionary && (
            <Button
              variant="outline"
              className="px-5 py-3 rounded-lg font-semibold text-base shadow-sm active:scale-95 transition-all flex items-center gap-2 border-2 border-amber-400 text-amber-700 hover:bg-amber-50"
              onClick={() => {/* Future: navigate to dictionary */}}
            >
              <span className="text-lg">📖</span>
              {t('exercise.dictionary')}
            </Button>
          )}
          {audioUrl && (
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
          )}
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

      {checklist && (
        <div className="mt-8 pt-6 border-t-2 border-gray-200">
          <p className="text-sm md:text-base font-semibold text-gray-700 mb-4">
            {checklist.instruction}
          </p>
          <div className="space-y-2">
            {checklist.items.map((item) => {
              const answer = checkAnswers[item.id];
              const isCorrect = checkSubmitted && answer === item.isTrue;
              const isWrong = checkSubmitted && answer !== null && answer !== undefined && answer !== item.isTrue;

              return (
                <div
                  key={item.id}
                  className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-all ${
                    isCorrect ? 'border-green-400 bg-green-50' :
                    isWrong ? 'border-red-400 bg-red-50' :
                    answer !== null && answer !== undefined ? 'border-[#8B9D5F] bg-[#f4faee]' :
                    'border-gray-200 bg-gray-50'
                  }`}
                >
                  <span className="flex-1 text-sm md:text-base font-medium text-gray-800">
                    {item.text}
                  </span>
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => {
                        if (checkSubmitted) return;
                        setCheckAnswers(prev => ({ ...prev, [item.id]: true }));
                      }}
                      disabled={checkSubmitted}
                      className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                        answer === true
                          ? isCorrect ? 'bg-green-500 text-white' : isWrong ? 'bg-red-500 text-white' : 'bg-[#8FC412] text-white'
                          : 'bg-white border-2 border-gray-300 text-gray-500 hover:border-green-400 hover:text-green-600'
                      }`}
                    >
                      ✓
                    </button>
                    <button
                      onClick={() => {
                        if (checkSubmitted) return;
                        setCheckAnswers(prev => ({ ...prev, [item.id]: false }));
                      }}
                      disabled={checkSubmitted}
                      className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                        answer === false
                          ? isCorrect ? 'bg-green-500 text-white' : isWrong ? 'bg-red-500 text-white' : 'bg-[#8FC412] text-white'
                          : 'bg-white border-2 border-gray-300 text-gray-500 hover:border-red-400 hover:text-red-600'
                      }`}
                    >
                      ✗
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {!checkSubmitted ? (
            <Button
              onClick={() => {
                const allAnswered = checklist.items.every(item => checkAnswers[item.id] !== null && checkAnswers[item.id] !== undefined);
                if (!allAnswered) return;
                setCheckSubmitted(true);
                const allCorrect = checklist.items.every(item => checkAnswers[item.id] === item.isTrue);
                if (!completedRef.current) {
                  completedRef.current = true;
                  onComplete?.(allCorrect);
                }
              }}
              disabled={!checklist.items.every(item => checkAnswers[item.id] !== null && checkAnswers[item.id] !== undefined)}
              className="mt-4 bg-[#8FC412] hover:bg-[#7DAD0E] text-white px-6 py-3 rounded-lg font-semibold text-base shadow-md active:scale-95 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {t('exercise.check')}
            </Button>
          ) : (
            <div className={`mt-4 inline-flex items-center gap-2 px-5 py-3 rounded-lg font-bold text-white text-base shadow-md ${
              checklist.items.every(item => checkAnswers[item.id] === item.isTrue) ? 'bg-[#8FC412]' : 'bg-red-500'
            }`}>
              {checklist.items.every(item => checkAnswers[item.id] === item.isTrue)
                ? `✓ ${t('exercise.excellent')}`
                : `${checklist.items.filter(item => checkAnswers[item.id] === item.isTrue).length} / ${checklist.items.length}`
              }
            </div>
          )}
        </div>
      )}
    </div>
  );
}
