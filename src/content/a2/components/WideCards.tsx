'use client';

// A2-specific variant of the shared `IllustratedCards` grid mode that lays cards
// out 5-per-row on desktop (2 rows of 5 for 10 items). Tap a card to hear the
// pronunciation and reveal the translation. Why a fork: the shared component
// caps at 3–4 columns and lives outside the A2 domain.
//
// TTS note: this type is not collected by `scripts/generate-tts.ts` (which keys
// on `illustrated_cards`). Until a pre-generated MP3 exists, playback falls back
// to the browser speech synthesiser via `playTtsAudio`.

import { useState } from 'react';
import { Volume2 } from 'lucide-react';
import { useT } from '@/i18n/useT';
import { useLanguage } from '@/i18n/LanguageContext';
import { InlineTranslation } from '@/components/InlineTranslation';
import { getTtsAudioPath, playTtsAudio } from '@/lib/tts';
import type { A2WideCardsExercise } from '../types';

interface Props {
  exercise: A2WideCardsExercise;
  onComplete?: (correct: boolean, score: number) => void;
  exerciseId?: string;
}

type CardItem = A2WideCardsExercise['cards'][number];

/** Mirrors `getIllustratedCardSpokenText` in IllustratedCards.tsx. */
function getSpokenText(card: CardItem): string {
  const tts = card.ttsLabel?.trim();
  if (tts) return tts;
  return card.label.replace(/\s*=\s*/g, ', ');
}

export function WideCards({ exercise, exerciseId }: Props) {
  const [revealedCards, setRevealedCards] = useState<Set<string>>(new Set());
  const [visitedCards, setVisitedCards] = useState<Set<string>>(new Set());
  const t = useT();
  const { lang } = useLanguage();

  const handleCardClick = (card: CardItem) => {
    if (!exercise.disableAudio) {
      const audioPath = exerciseId ? getTtsAudioPath(exerciseId, 'words', card.id) : '';
      playTtsAudio(audioPath, getSpokenText(card));
    }
    setRevealedCards(prev => {
      const next = new Set(prev);
      if (next.has(card.id)) next.delete(card.id);
      else next.add(card.id);
      return next;
    });
    setVisitedCards(prev => new Set(prev).add(card.id));
  };

  return (
    <div className="relative bg-white rounded-xl p-6 md:p-8 shadow-md">
      {lang !== 'bg' && (
        <p className="text-xs text-gray-400 text-center mb-3 italic">
          {t('exercise.tapToTranslate')}
        </p>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
        {exercise.cards.map((card) => (
          <div
            key={card.id}
            onClick={() => handleCardClick(card)}
            className={`relative flex flex-col rounded-xl border-2 p-4 shadow-sm hover:shadow-md transition-all hover:scale-105 cursor-pointer active:scale-95 ${
              visitedCards.has(card.id)
                ? 'bg-green-50 border-[#32C189]/40'
                : 'bg-white border-gray-200'
            }`}
          >
            {!exercise.disableAudio && (
              <div className="absolute top-2 right-2 text-gray-400">
                <Volume2 className="w-4 h-4" />
              </div>
            )}

            {card.imageUrl && (
              <div className="flex items-center justify-center mb-3 h-[120px] md:h-[140px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={card.imageUrl}
                  alt={card.label}
                  className="max-h-full max-w-full w-auto object-contain rounded-lg"
                  loading="lazy"
                />
              </div>
            )}

            <div className="text-center mt-auto">
              <p className="text-base md:text-lg font-semibold text-gray-800">
                {card.label}
              </p>
              <InlineTranslation
                text={card.label}
                visible={revealedCards.has(card.id)}
                translations={card.translations}
              />
              {card.sublabels && card.sublabels.length > 0 && (
                <div className="mt-2 space-y-0.5">
                  {card.sublabels.map((sublabel, index) => (
                    <p key={index} className="text-sm md:text-base text-gray-700">
                      {sublabel}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
