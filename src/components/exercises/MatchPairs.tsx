'use client';

import { useState, useEffect } from 'react';
import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useT } from '@/i18n/useT';
import type { MatchPairsExercise } from '@/content/types';

interface MatchPairsProps {
  exercise: MatchPairsExercise;
  onComplete?: (correct: boolean, score: number) => void;
}

export function MatchPairs({ exercise, onComplete }: MatchPairsProps) {
  const t = useT();
  const [rightItems, setRightItems] = useState<string[]>([]);
  const [matches, setMatches] = useState<{ [leftId: string]: string }>({});
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [validation, setValidation] = useState<{ [leftId: string]: boolean | null }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    // Shuffle right items
    const rights = exercise.pairs.map(p => p.correctRight);
    const shuffled = exercise.shuffledRights || [...rights].sort(() => Math.random() - 0.5);
    setRightItems(shuffled);
  }, [exercise]);

  const handleLeftClick = (leftId: string) => {
    if (isSubmitted) return;
    
    // If already matched, unmatch it
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
    if (isSubmitted || !selectedLeft) return;
    
    // Check if this right item is already matched
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
                    onClick={() => !isSubmitted && handleLeftClick(pair.id)}
                    className={`
                      w-full px-4 py-3 rounded-lg border-2 text-center font-medium text-base shadow-sm
                      transition-all
                      ${validationResult === true ? 'border-green-500 bg-green-50' : ''}
                      ${validationResult === false ? 'border-red-500 bg-red-50' : ''}
                      ${!isSubmitted ? 'border-[#6B7B3F] bg-white cursor-pointer hover:bg-gray-50' : 'cursor-default'}
                    `}
                  >
                    {matches[pair.id]}
                  </div>
                ) : (
                  <button
                    onClick={() => handleLeftClick(pair.id)}
                    disabled={isSubmitted}
                    className={`
                      w-full px-4 py-3 rounded-lg border-2 text-center font-medium text-base shadow-sm
                      transition-all
                      ${isSelected 
                        ? 'border-[#8FC412] bg-[#8FC412] text-white' 
                        : 'border-gray-300 bg-white text-gray-400 hover:border-[#6B7B3F] hover:bg-gray-50'
                      }
                      ${!isSubmitted ? 'cursor-pointer' : 'cursor-not-allowed'}
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
      {!isSubmitted && (
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
      )}

      {!isSubmitted && (
        <Button
          onClick={handleSubmit}
          className="mt-6 bg-[#8FC412] hover:bg-[#7DAD0E] text-white text-base font-semibold px-8 py-3 w-full sm:w-auto min-h-[48px] active:scale-95 transition-transform rounded-lg"
          disabled={Object.keys(matches).length < exercise.pairs.length}
        >
          {t('exercise.checkAnswers')}
        </Button>
      )}

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
