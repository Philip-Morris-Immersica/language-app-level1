'use client';

import { useState, useEffect, useRef } from 'react';
import { Check, X, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useT } from '@/i18n/useT';
import type { MatchPairsExercise } from '@/content/types';
import { useExercisePersistence } from '@/hooks/useExercisePersistence';

interface MatchPairsProps {
  exercise: MatchPairsExercise;
  onComplete?: (correct: boolean, score: number) => void;
}

function isImagePath(s: string): boolean {
  return (
    (s.startsWith('/') || s.startsWith('http')) &&
    /\.(jpg|jpeg|png|gif|webp)$/i.test((s.split('?')[0] ?? ''))
  );
}

function MatchRightDisplay({ value }: { value: string }) {
  if (isImagePath(value)) {
    return (
      // Public assets; sizes vary — keep flexible for touch targets
      <img src={value} alt="" className="max-h-14 sm:max-h-16 w-auto mx-auto object-contain" />
    );
  }
  return <span className="break-words">{value}</span>;
}

export function MatchPairs({ exercise, onComplete }: MatchPairsProps) {
  const t = useT();
  const { savedState, saveState } = useExercisePersistence(exercise.id);
  const s = savedState as any;

  const [rightItems, setRightItems] = useState<string[]>(() => s?.rightItems ?? []);
  const [matches, setMatches] = useState<{ [leftId: string]: number }>(() => s?.matches ?? {});
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [validation, setValidation] = useState<{ [leftId: string]: boolean | null }>(() => s?.validation ?? {});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(() => s?.isSubmitted ?? false);
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) { mounted.current = true; return; }
    saveState({ matches, validation, isSubmitted, rightItems });
  }, [matches, validation, isSubmitted, rightItems]);

  useEffect(() => {
    if (s?.rightItems?.length) return;
    const rights = exercise.pairs.map(p => p.correctRight);
    const shuffled = exercise.shuffledRights || [...rights].sort(() => Math.random() - 0.5);
    setRightItems(shuffled);
  }, [exercise]);

  const matchedIndices = new Set(Object.values(matches));

  const handleLeftClick = (leftId: string) => {
    if (isSubmitted) {
      setIsSubmitted(false);
      setValidation({});
    }
    if (matches[leftId] !== undefined) {
      setMatches(prev => {
        const next = { ...prev };
        delete next[leftId];
        return next;
      });
      setSelectedLeft(null);
    } else {
      setSelectedLeft(leftId);
    }
  };

  const handleRightClick = (index: number) => {
    if (!selectedLeft) return;
    if (matchedIndices.has(index)) return;
    setMatches(prev => ({ ...prev, [selectedLeft]: index }));
    setSelectedLeft(null);
  };

  const handleReset = () => {
    const rights = exercise.pairs.map(p => p.correctRight);
    const shuffled = exercise.shuffledRights || [...rights].sort(() => Math.random() - 0.5);
    setRightItems(shuffled);
    setMatches({});
    setSelectedLeft(null);
    setValidation({});
    setIsSubmitted(false);
    saveState({ matches: {}, validation: {}, isSubmitted: false, rightItems: shuffled });
  };

  const handleSubmit = () => {
    const newValidation: { [leftId: string]: boolean } = {};
    let correctCount = 0;

    const validRightsForLeft = new Map<string, Set<string>>();
    exercise.pairs.forEach(p => {
      if (!validRightsForLeft.has(p.left)) validRightsForLeft.set(p.left, new Set());
      validRightsForLeft.get(p.left)!.add(p.correctRight);
    });

    exercise.pairs.forEach(pair => {
      const matchedIdx = matches[pair.id];
      const matchedText = matchedIdx !== undefined ? rightItems[matchedIdx] : undefined;
      const validSet = validRightsForLeft.get(pair.left);
      const isCorrect = matchedText !== undefined && (validSet?.has(matchedText) ?? false);
      newValidation[pair.id] = isCorrect;
      if (isCorrect) correctCount++;
    });

    setValidation(newValidation);
    setIsSubmitted(true);

    if (onComplete) {
      const totalPairs = exercise.pairs.length;
      const score = exercise.points ? (correctCount / totalPairs) * exercise.points : correctCount;
      onComplete(correctCount === totalPairs, score);
    }
  };

  const getMatchedText = (leftId: string) => {
    const idx = matches[leftId];
    return idx !== undefined ? rightItems[idx] : undefined;
  };

  const wordPool = (
    <div>
      <p className="text-sm font-medium text-gray-600 mb-3">
        {t('exercise.chooseAnswer')}
      </p>
      <div className="flex flex-wrap gap-2">
        {rightItems.map((rightText, index) => {
          const isUsed = matchedIndices.has(index);
          return (
            <button
              key={index}
              onClick={() => handleRightClick(index)}
              disabled={isUsed || !selectedLeft}
              className={`
                px-3 py-2 rounded-lg border-2 text-base font-medium min-h-[44px] min-w-[44px] shadow-sm
                flex items-center justify-center
                transition-all active:scale-95
                ${isUsed ? 'opacity-30 cursor-not-allowed border-gray-300 bg-gray-100' : ''}
                ${!selectedLeft && !isUsed ? 'opacity-50 cursor-not-allowed border-gray-300 bg-white' : ''}
                ${selectedLeft && !isUsed ? 'border-[#6B7B3F] bg-white hover:border-[#8FC412] hover:bg-[#EEF7C8] cursor-pointer' : ''}
              `}
            >
              <MatchRightDisplay value={rightText} />
            </button>
          );
        })}
      </div>
    </div>
  );

  const pairsList = (
    <div className="space-y-3">
      {exercise.pairs.map((pair, index) => {
        const matchedText = getMatchedText(pair.id);
        const isMatched = matchedText !== undefined;
        const isSelected = selectedLeft === pair.id;
        const validationResult = validation[pair.id];

        return (
          <div key={pair.id} className="flex items-center gap-3">
            <div className="flex-shrink-0 w-8 text-center">
              <span className="text-base font-semibold text-gray-700">{index + 1}.</span>
            </div>

            <div className="flex-shrink-0 w-28 md:w-40 lg:w-48">
              <span className="text-sm md:text-base font-medium text-gray-800 leading-snug">
                {pair.left}
              </span>
            </div>

            <div className="flex-1 min-w-0">
              {isMatched ? (
                <div
                  onClick={() => handleLeftClick(pair.id)}
                  className={`
                    w-full px-4 py-3 rounded-lg border-2 text-center font-medium text-base shadow-sm
                    flex items-center justify-center min-h-[52px]
                    transition-all cursor-pointer
                    ${validationResult === true ? 'border-green-500 bg-green-50' : ''}
                    ${validationResult === false ? 'border-red-500 bg-red-50' : ''}
                    ${validationResult === null || validationResult === undefined ? 'border-[#6B7B3F] bg-white hover:bg-gray-50' : ''}
                  `}
                >
                  <MatchRightDisplay value={matchedText} />
                </div>
              ) : (
                <button
                  onClick={() => handleLeftClick(pair.id)}
                  className={`
                    w-full px-4 py-3 rounded-lg border-2 text-center font-medium text-base shadow-sm
                    transition-all cursor-pointer
                    ${isSelected
                      ? 'border-[#8FC412] bg-[#8FC412] text-white'
                      : 'border-gray-300 bg-white text-gray-400 hover:border-[#6B7B3F] hover:bg-gray-50'
                    }
                  `}
                >
                  {isSelected ? `← ${t('exercise.chooseAnswer')}` : '_______'}
                </button>
              )}
            </div>

            {isSubmitted && (
              <div className="flex-shrink-0 w-6">
                {validationResult === true && <Check className="w-6 h-6 text-green-600" />}
                {validationResult === false && <X className="w-6 h-6 text-red-600" />}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="bg-white rounded-xl p-6 md:p-8 shadow-md">
      {/* Desktop: pairs left, word pool right */}
      <div className="hidden md:grid md:grid-cols-[1fr_auto] md:gap-8 md:items-start">
        <div>{pairsList}</div>
        <div className="w-56 lg:w-72 sticky top-4">{wordPool}</div>
      </div>

      {/* Mobile: pairs on top, word pool below */}
      <div className="md:hidden">
        {pairsList}
        <div className="mt-6 pt-6 border-t-2 border-gray-200">
          {wordPool}
        </div>
      </div>

      <div className="flex gap-3 mt-6">
        <Button
          onClick={handleSubmit}
          className="bg-[#8FC412] hover:bg-[#7DAD0E] text-white text-base font-semibold px-8 py-3 min-h-[48px] active:scale-95 transition-transform rounded-lg"
        >
          {t('exercise.checkAnswers')}
        </Button>
        <Button variant="outline" onClick={handleReset} className="text-base font-semibold px-6 py-3 min-h-[48px] active:scale-95 transition-transform rounded-lg border-2">
          <RotateCcw className="w-4 h-4 mr-2" />
          {t('exercise.reset')}
        </Button>
      </div>

      {isSubmitted && (
        <div className="mt-6 p-4 rounded-lg bg-white border-2 border-[#8B9D5F] animate-in fade-in duration-300">
          <p className="text-base font-semibold text-gray-800">
            {t('exercise.result')} {Object.values(validation).filter(v => v === true).length} / {exercise.pairs.length} {t('exercise.correct_n')}
          </p>
        </div>
      )}
    </div>
  );
}
