'use client';

import { useState, useEffect, useRef } from 'react';
import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useT } from '@/i18n/useT';
import type { MatchPairsExercise } from '@/content/types';
import { useExercisePersistence } from '@/hooks/useExercisePersistence';

interface MatchPairsProps {
  exercise: MatchPairsExercise;
  onComplete?: (correct: boolean, score: number) => void;
}

export function MatchPairs({ exercise, onComplete }: MatchPairsProps) {
  const t = useT();
  const { savedState, saveState } = useExercisePersistence(exercise.id);
  const s = savedState as any;
  const [rightItems, setRightItems] = useState<string[]>(() => s?.rightItems ?? []);
  const [matches, setMatches] = useState<{ [leftId: string]: string }>(() => s?.matches ?? {});
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [validation, setValidation] = useState<{ [leftId: string]: boolean | null }>(() => s?.validation ?? {});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(() => s?.isSubmitted ?? false);
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) { mounted.current = true; return; }
    saveState({ matches, validation, isSubmitted, rightItems });
  }, [matches, validation, isSubmitted, rightItems]);

  useEffect(() => {
    // Shuffle right items only if no saved state
    if (s?.rightItems?.length) return;
    const rights = exercise.pairs.map(p => p.correctRight);
    const shuffled = exercise.shuffledRights || [...rights].sort(() => Math.random() - 0.5);
    setRightItems(shuffled);
  }, [exercise]);

  const handleLeftClick = (leftId: string) => {
    if (isSubmitted) {
      setIsSubmitted(false);
      setValidation({});
    }
    if (matches[leftId]) {
      setMatches(prev => {
        const newMatches = { ...prev };
        delete newMatches[leftId];
        return newMatches;
      });
      setSelectedLeft(null);
    } else {
      setSelectedLeft(leftId);
    }
  };

  const handleRightClick = (rightText: string) => {
    if (!selectedLeft) return;
    const alreadyMatched = Object.values(matches).includes(rightText);
    if (alreadyMatched) return;
    setMatches(prev => ({ ...prev, [selectedLeft]: rightText }));
    setSelectedLeft(null);
  };

  const handleSubmit = () => {
    const newValidation: { [leftId: string]: boolean } = {};
    let correctCount = 0;

    exercise.pairs.forEach(pair => {
      const matched = matches[pair.id];
      const isCorrect = matched === pair.correctRight;
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

  const isRightItemMatched = (rightText: string) => {
    return Object.values(matches).includes(rightText);
  };

  return (
    <div className="bg-white rounded-xl p-6 md:p-8 shadow-md">
      <div className="space-y-3">
        {exercise.pairs.map((pair, index) => {
          const isMatched = !!matches[pair.id];
          const isSelected = selectedLeft === pair.id;
          const validationResult = validation[pair.id];

          return (
            <div key={pair.id} className="flex items-center gap-3">
              {/* Number */}
              <div className="flex-shrink-0 w-8 text-center">
                <span className="text-base font-semibold text-gray-700">{index + 1}.</span>
              </div>

              {/* Left item - just text */}
              <div className="flex-shrink-0 w-24 md:w-32">
                <span className="text-base md:text-lg font-medium text-gray-800">
                  {pair.left}
                </span>
              </div>

              {/* Matched right item or clickable area */}
              <div className="flex-1 min-w-0">
                {isMatched ? (
                  <div
                    onClick={() => handleLeftClick(pair.id)}
                    className={`
                      w-full px-4 py-3 rounded-lg border-2 text-center font-medium text-base shadow-sm
                      transition-all cursor-pointer
                      ${validationResult === true ? 'border-green-500 bg-green-50' : ''}
                      ${validationResult === false ? 'border-red-500 bg-red-50' : ''}
                      ${!isSubmitted ? 'border-[#6B7B3F] bg-white hover:bg-gray-50' : 'border-[#6B7B3F] bg-white hover:bg-gray-50'}
                    `}
                  >
                    {matches[pair.id]}
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

              {/* Validation icon */}
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

      {/* Right items pool (only show unmatched) */}
      <div className="mt-6 pt-6 border-t-2 border-gray-200">
          <p className="text-sm font-medium text-gray-600 mb-3">
            {selectedLeft ? t('exercise.chooseAnswer') : t('exercise.chooseAnswer')}
          </p>
          <div className="flex flex-wrap gap-2">
            {rightItems.map((rightText, index) => (
              <button
                key={index}
                onClick={() => handleRightClick(rightText)}
                disabled={isRightItemMatched(rightText) || !selectedLeft}
                className={`
                  px-4 py-2 rounded-lg border-2 text-base font-medium min-h-[44px] shadow-sm
                  transition-all active:scale-95
                  ${isRightItemMatched(rightText) ? 'opacity-30 cursor-not-allowed border-gray-300 bg-gray-100' : ''}
                  ${!selectedLeft ? 'opacity-50 cursor-not-allowed border-gray-300 bg-white' : 'border-[#6B7B3F] bg-white hover:border-[#8FC412] hover:bg-[#EEF7C8] cursor-pointer'}
                `}
              >
                {rightText}
              </button>
            ))}
          </div>
        </div>

      <Button
        onClick={handleSubmit}
        className="mt-6 bg-[#8FC412] hover:bg-[#7DAD0E] text-white text-base font-semibold px-8 py-3 w-full sm:w-auto min-h-[48px] active:scale-95 transition-transform rounded-lg"
      >
        {t('exercise.checkAnswers')}
      </Button>

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
