'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Volume2 } from 'lucide-react';
import type { IllustratedCardsExercise } from '@/content/types';
import { useT } from '@/i18n/useT';
import { useLanguage } from '@/i18n/LanguageContext';
import { InlineTranslation } from '@/components/InlineTranslation';
import { getTtsAudioPath, playTtsAudio } from '@/lib/tts';
import { ImageLightbox } from '@/components/ImageLightbox';

interface IllustratedCardsProps {
  exercise: IllustratedCardsExercise;
  onComplete?: (correct: boolean, score: number) => void;
  exerciseId?: string;
}

/** Matches `collectIllustratedCardJobs` in scripts/generate-tts.ts — audio must match visible phrasing policy. */
function getIllustratedCardSpokenText(card: IllustratedCardsExercise['cards'][number]): string {
  const tts = card.ttsLabel?.trim();
  if (tts) return tts;
  const parts = card.ttsIncludeSublabels ? [card.label, ...(card.sublabels ?? [])] : [card.label];
  return parts.join('. ').replace(/\s*=\s*/g, ', ');
}

export function IllustratedCards({ exercise, onComplete, exerciseId }: IllustratedCardsProps) {
  const [revealedCards, setRevealedCards] = useState<Set<string>>(new Set());
  const [visitedCards, setVisitedCards] = useState<Set<string>>(new Set());
  const t = useT();
  const { lang } = useLanguage();

  const toggleTranslation = (cardId: string) => {
    setRevealedCards(prev => {
      const next = new Set(prev);
      if (next.has(cardId)) {
        next.delete(cardId);
      } else {
        next.add(cardId);
      }
      return next;
    });
  };

  const handleCardClick = (card: IllustratedCardsExercise['cards'][number]) => {
    const spoken = getIllustratedCardSpokenText(card);
    const audioPath = exerciseId
      ? getTtsAudioPath(exerciseId, 'words', card.id)
      : '';
    playTtsAudio(audioPath, spoken);
    toggleTranslation(card.id);
    setVisitedCards(prev => new Set(prev).add(card.id));
  };

  return (
    <div className="relative bg-white rounded-xl p-6 md:p-8 shadow-md">
      {/* Optional hero image above the cards (e.g. house cross-section, table setting) */}
      {exercise.headerImageUrl && (
        <div className="mb-6 max-w-3xl mx-auto">
          <ImageLightbox src={exercise.headerImageUrl} alt={exercise.title}>
            <div className="relative flex justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={exercise.headerImageUrl}
                alt={exercise.title}
                className="max-w-full max-h-[min(480px,65vh)] w-auto rounded-xl shadow-md object-contain border border-gray-100"
              />
            </div>
          </ImageLightbox>
          <p className="mt-2 text-center text-xs text-gray-400 select-none">
            Кликнете върху картинката, за да я увеличите.
          </p>
        </div>
      )}

      {/* Tap hint for non-Bulgarian users */}
      {lang !== 'bg' && (
        <p className="text-xs text-gray-400 text-center mb-3 italic">
          {t('exercise.tapToTranslate')}
        </p>
      )}

      {/* Cards Grid — default scales to 4 cols on lg; optional max 3 cols for symmetric rows */}
      {exercise.textOnly ? (
        /* Text-only mode: compact boxes with just the numbered label, no images */
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {exercise.cards.map((card) => (
            <div
              key={card.id}
              onClick={() => handleCardClick(card)}
              className={`relative flex flex-col items-center justify-center gap-1 rounded-lg border-2 px-3 py-4 min-h-[64px] cursor-pointer transition-all hover:scale-105 active:scale-95 hover:shadow-md ${
                visitedCards.has(card.id)
                  ? 'bg-[#DAF6EB] border-[#32C189]/60'
                  : 'bg-white border-gray-200 hover:border-[#32C189]/40'
              }`}
            >
              <Volume2 className="absolute top-2 right-2 w-3.5 h-3.5 text-gray-300" />
              <p className="text-base md:text-lg font-semibold text-[#262626] text-center leading-tight">
                {card.label}
              </p>
              <InlineTranslation
                text={card.label}
                visible={revealedCards.has(card.id)}
                translations={card.translations}
              />
            </div>
          ))}
        </div>
      ) : (
        <div
          className={
            exercise.cardsGridMaxCols === 3
              ? 'grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6'
              : 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6'
          }
        >
          {exercise.cards.map((card) => (
            <div
              key={card.id}
              onClick={() => handleCardClick(card)}
              className={`relative rounded-xl border-2 p-4 shadow-sm hover:shadow-md transition-all hover:scale-105 cursor-pointer active:scale-95 ${
                visitedCards.has(card.id)
                  ? 'bg-green-50 border-[#32C189]/40'
                  : 'bg-white border-gray-200'
              }`}
            >
              {/* Speaker icon */}
              <div className="absolute top-2 right-2 text-gray-400">
                <Volume2 className="w-4 h-4" />
              </div>

              {/* Image */}
              {card.imageUrl && (
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
              )}

              {/* Label */}
              <div className="text-center">
                <p className="text-base md:text-lg font-semibold text-gray-800">
                  {card.label}
                </p>
                <InlineTranslation
                  text={card.label}
                  visible={revealedCards.has(card.id)}
                  translations={card.translations}
                />
                {/* Sublabels */}
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
      )}

    </div>
  );
}
