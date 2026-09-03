'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Volume2 } from 'lucide-react';
import type { B1IllustratedCardsGroupedExercise } from '../types';
import { useT } from '@/i18n/useT';
import { useLanguage } from '@/i18n/LanguageContext';
import { InlineTranslation } from '@/components/InlineTranslation';
import { getTtsAudioPath, playTtsAudio } from '@/lib/tts';

interface Props {
  exercise: B1IllustratedCardsGroupedExercise;
  onComplete?: (correct: boolean, score: number) => void;
  exerciseId?: string;
}

type CardItem = B1IllustratedCardsGroupedExercise['cards'][number];

/** Mirrors `getIllustratedCardSpokenText` in the shared `IllustratedCards.tsx`
 * so generated TTS stays consistent between the shared and B1 variants. */
function getSpokenText(card: CardItem): string {
  const tts = card.ttsLabel?.trim();
  if (tts) return tts;
  const parts = card.ttsIncludeSublabels ? [card.label, ...(card.sublabels ?? [])] : [card.label];
  return parts.join('. ').replace(/\s*=\s*/g, ', ');
}

export function IllustratedCardsGrouped({ exercise, exerciseId }: Props) {
  const [revealedCards, setRevealedCards] = useState<Set<string>>(new Set());
  const [visitedCards, setVisitedCards] = useState<Set<string>>(new Set());
  const t = useT();
  const { lang } = useLanguage();

  const handleCardClick = (card: CardItem) => {
    if (!exercise.disableAudio) {
      const spoken = getSpokenText(card);
      const audioPath = exerciseId ? getTtsAudioPath(exerciseId, 'words', card.id) : '';
      playTtsAudio(audioPath, spoken);
    }
    setRevealedCards(prev => {
      const next = new Set(prev);
      if (next.has(card.id)) next.delete(card.id); else next.add(card.id);
      return next;
    });
    setVisitedCards(prev => new Set(prev).add(card.id));
  };

  // Split cards into consecutive groups by `groupLabel`.
  const groups: { label: string; cards: CardItem[] }[] = [];
  for (const card of exercise.cards) {
    const last = groups[groups.length - 1];
    if (last && last.label === card.groupLabel) {
      last.cards.push(card);
    } else {
      groups.push({ label: card.groupLabel, cards: [card] });
    }
  }

  return (
    <div className="relative bg-white rounded-xl p-6 md:p-8 shadow-md">
      {lang !== 'bg' && (
        <p className="text-xs text-gray-400 text-center mb-3 italic">
          {t('exercise.tapToTranslate')}
        </p>
      )}

      <div className="space-y-8">
        {groups.map((group, gIdx) => (
          <div key={gIdx}>
            <h3 className="text-sm md:text-base font-bold text-[#1F5741] mb-4 text-center uppercase tracking-wide">
              {group.label}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {group.cards.map((card) => (
                <div
                  key={card.id}
                  onClick={() => handleCardClick(card)}
                  className={`relative rounded-xl border-2 p-4 shadow-sm hover:shadow-md transition-all hover:scale-105 cursor-pointer active:scale-95 ${
                    visitedCards.has(card.id)
                      ? 'bg-green-50 border-[#32C189]/40'
                      : 'bg-white border-gray-200'
                  }`}
                >
                  <div className="absolute top-2 right-2 text-gray-400">
                    <Volume2 className="w-4 h-4" />
                  </div>

                  <div className="flex items-center justify-center mb-3 min-h-[120px] md:min-h-[150px]">
                    <div className="relative w-full h-[120px] md:h-[150px] bg-white">
                      <Image
                        src={card.imageUrl}
                        alt={card.label}
                        fill
                        className="object-contain rounded-lg"
                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />
                    </div>
                  </div>

                  <div className="text-center">
                    <p className="text-base md:text-lg font-semibold text-gray-800">
                      {card.label}
                    </p>
                    <InlineTranslation
                      text={card.label}
                      visible={revealedCards.has(card.id)}
                      translations={card.translations}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
