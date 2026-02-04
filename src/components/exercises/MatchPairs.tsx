'use client';

import { useState, useEffect } from 'react';
import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { MatchPairsExercise } from '@/content/types';

interface MatchPairsProps {
  exercise: MatchPairsExercise;
  onComplete?: (correct: boolean, score: number) => void;
  exerciseNumber?: number;
}

export function MatchPairs({ exercise, onComplete, exerciseNumber }: MatchPairsProps) {
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
    <div className="relative bg-white rounded-xl border-2 border-bolt-secondary p-8 md:p-10 shadow-sm">
      {/* Exercise number badge */}
      {exerciseNumber && (
        <div className="absolute -top-4 -left-4 w-12 h-12 bg-bolt-primary text-white rounded-full flex items-center justify-center font-bold text-lg shadow-md">
          {exerciseNumber}
        </div>
      )}
      
      <p className="text-xl font-bold text-gray-800 mb-8">
        {exercise.instruction}
      </p>

      <div className="space-y-5">
        {exercise.pairs.map((pair) => {
          const isMatched = !!matches[pair.id];
          const isSelected = selectedLeft === pair.id;
          const validationResult = validation[pair.id];

          return (
            <div key={pair.id} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {/* Left item */}
              <button
                onClick={() => handleLeftClick(pair.id)}
                disabled={isSubmitted}
                className={`
                  flex-1 min-h-[60px] px-5 py-4 rounded-xl border-2 font-semibold text-base
                  transition-all text-left shadow-sm active:scale-95
                  ${isSelected ? 'border-bolt-primary bg-bolt-primary text-white shadow-md' : 'border-bolt-secondary bg-white'}
                  ${isMatched && !isSubmitted ? 'border-bolt-primary bg-bolt-secondary-light' : ''}
                  ${validationResult === true ? 'border-green-500 bg-green-50' : ''}
                  ${validationResult === false ? 'border-red-500 bg-red-50' : ''}
                  ${!isSubmitted && !isMatched ? 'hover:border-bolt-primary hover:bg-bolt-secondary-light hover:shadow-md cursor-pointer' : ''}
                  ${isSubmitted ? 'cursor-default' : ''}
                `}
              >
                {pair.left}
              </button>

              {/* Arrow or matched right item */}
              <div className="flex items-center justify-center min-w-[140px] sm:min-w-[200px]">
                {isMatched ? (
                  <div className={`
                    w-full px-5 py-4 rounded-xl border-2 text-center font-semibold text-base shadow-sm
                    ${validationResult === true ? 'border-green-500 bg-green-50' : ''}
                    ${validationResult === false ? 'border-red-500 bg-red-50' : ''}
                    ${!isSubmitted ? 'border-bolt-secondary bg-bolt-secondary-light' : ''}
                  `}>
                    {matches[pair.id]}
                  </div>
                ) : (
                  <div className="text-gray-400 text-center text-base font-medium">
                    {isSelected ? '← Избери отговор' : '→'}
                  </div>
                )}
              </div>

              {/* Validation icon */}
              {isSubmitted && (
                <div className="flex items-center justify-center sm:w-8">
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
        <div className="mt-8 pt-8 border-t-2 border-gray-200">
          <p className="text-base font-bold text-gray-700 mb-4">Изберете отговори:</p>
          <div className="flex flex-wrap gap-3">
            {rightItems.map((rightText, index) => (
              <button
                key={index}
                onClick={() => handleRightClick(rightText)}
                disabled={isRightItemMatched(rightText) || !selectedLeft}
                className={`
                  px-5 py-3 rounded-xl border-2 text-base font-semibold min-h-[52px] shadow-sm
                  transition-all active:scale-95
                  ${isRightItemMatched(rightText) ? 'opacity-30 cursor-not-allowed border-gray-300' : ''}
                  ${!selectedLeft ? 'opacity-50 cursor-not-allowed border-gray-300' : 'border-bolt-secondary hover:border-bolt-primary hover:bg-bolt-secondary-light hover:shadow-md cursor-pointer'}
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
          className="mt-8 bg-bolt-primary hover:bg-bolt-primary-hover text-base font-semibold px-8 py-6 w-full sm:w-auto min-h-[52px] active:scale-95 transition-transform"
          disabled={Object.keys(matches).length < exercise.pairs.length}
        >
          Провери
        </Button>
      )}

      {isSubmitted && (
        <div className="mt-8 p-5 rounded-xl bg-bolt-secondary-light border-2 border-bolt-secondary animate-in fade-in duration-300">
          <p className="text-base font-semibold text-gray-800">
            Резултат: {Object.values(validation).filter(v => v === true).length} / {exercise.pairs.length} правилни съвпадения
          </p>
        </div>
      )}
    </div>
  );
}
