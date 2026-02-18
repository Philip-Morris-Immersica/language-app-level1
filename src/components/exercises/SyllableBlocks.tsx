'use client';

import { useState } from 'react';
import { Check, X, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SyllableBlock {
  syllable: string;
  id: string;
}

interface WordPuzzle {
  id: string;
  syllables: string[];
  correctWord: string;
  hint?: string;
}

interface SyllableBlocksProps {
  exerciseNumber?: number;
  instruction: string;
  puzzles: WordPuzzle[];
  onComplete?: (correct: boolean, score: number) => void;
}

export function SyllableBlocks({ exerciseNumber, instruction, puzzles, onComplete }: SyllableBlocksProps) {
  const [wordStates, setWordStates] = useState<{
    [wordId: string]: {
      available: SyllableBlock[];
      selected: SyllableBlock[];
      answer: string;
      validation: boolean | null;
    };
  }>(() => {
    const initial: typeof wordStates = {};
    puzzles.forEach(puzzle => {
      const shuffled = [...puzzle.syllables]
        .sort(() => Math.random() - 0.5)
        .map((syl, idx) => ({ syllable: syl, id: `${puzzle.id}-${idx}` }));
      initial[puzzle.id] = {
        available: shuffled,
        selected: [],
        answer: '',
        validation: null,
      };
    });
    return initial;
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSyllableClick = (wordId: string, block: SyllableBlock, fromSelected: boolean) => {
    if (isSubmitted) return;

    setWordStates(prev => {
      const state = prev[wordId];
      if (fromSelected) {
        // Remove from selected, add back to available
        return {
          ...prev,
          [wordId]: {
            ...state,
            selected: state.selected.filter(b => b.id !== block.id),
            available: [...state.available, block],
            answer: state.selected.filter(b => b.id !== block.id).map(b => b.syllable).join(''),
          },
        };
      } else {
        // Add to selected, remove from available
        const newSelected = [...state.selected, block];
        return {
          ...prev,
          [wordId]: {
            ...state,
            available: state.available.filter(b => b.id !== block.id),
            selected: newSelected,
            answer: newSelected.map(b => b.syllable).join(''),
          },
        };
      }
    });
  };

  const handleReset = (wordId: string) => {
    if (isSubmitted) return;

    setWordStates(prev => {
      const state = prev[wordId];
      return {
        ...prev,
        [wordId]: {
          ...state,
          available: [...state.available, ...state.selected],
          selected: [],
          answer: '',
        },
      };
    });
  };

  const handleSubmit = () => {
    const newStates = { ...wordStates };
    let correctCount = 0;

    puzzles.forEach(puzzle => {
      const state = wordStates[puzzle.id];
      const isCorrect = state.answer.toLowerCase() === puzzle.correctWord.toLowerCase();
      newStates[puzzle.id] = {
        ...newStates[puzzle.id],
        validation: isCorrect,
      };
      if (isCorrect) correctCount++;
    });

    setWordStates(newStates);
    setIsSubmitted(true);

    if (onComplete) {
      const score = (correctCount / puzzles.length) * puzzles.length;
      onComplete(correctCount === puzzles.length, score);
    }
  };

  return (
    <div className="relative bg-[#F8F5EE] rounded-xl border-2 border-[#8B9D5F] p-6 md:p-8 shadow-sm">
      {exerciseNumber && (
        <div className="absolute -top-4 -left-4 w-12 h-12 bg-[#6B8543] text-white rounded-full flex items-center justify-center font-bold text-lg shadow-md z-10">
          {exerciseNumber}
        </div>
      )}

      <p className="text-lg md:text-xl font-bold text-gray-800 mb-6">
        {instruction}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {puzzles.map((puzzle) => {
          const state = wordStates[puzzle.id];
          if (!state) return null;

          return (
            <div
              key={puzzle.id}
              className={`
                bg-white rounded-xl border-2 p-5 shadow-sm transition-all
                ${state.validation === true ? 'border-green-500 bg-green-50' : ''}
                ${state.validation === false ? 'border-red-500 bg-red-50' : ''}
                ${state.validation === null ? 'border-gray-300' : ''}
              `}
            >
              {/* Syllable blocks (available) */}
              <div className="flex flex-wrap gap-2 mb-4 min-h-[60px] items-center justify-center">
                {state.available.map((block) => (
                  <button
                    key={block.id}
                    onClick={() => handleSyllableClick(puzzle.id, block, false)}
                    disabled={isSubmitted}
                    className="
                      px-3 py-2 rounded-lg border-2 border-[#A8B88A] bg-[#D8E4C8]
                      font-bold text-base text-gray-800
                      hover:bg-[#C8D4B8] hover:border-[#6B8543] hover:scale-105
                      active:scale-95 transition-all cursor-pointer
                      disabled:cursor-default disabled:hover:scale-100
                    "
                  >
                    {block.syllable}
                  </button>
                ))}
              </div>

              {/* Answer line */}
              <div className="border-b-2 border-gray-400 mb-3 pb-1 min-h-[40px] flex items-center justify-center">
                {state.selected.length > 0 ? (
                  <div className="flex gap-1">
                    {state.selected.map((block) => (
                      <button
                        key={block.id}
                        onClick={() => handleSyllableClick(puzzle.id, block, true)}
                        disabled={isSubmitted}
                        className="
                          px-2 py-1 rounded border border-gray-300 bg-white
                          font-bold text-sm text-gray-700
                          hover:bg-gray-100 transition-all
                          disabled:cursor-default
                        "
                      >
                        {block.syllable}
                      </button>
                    ))}
                  </div>
                ) : (
                  <span className="text-gray-400 text-sm">_______________</span>
                )}
              </div>

              {/* Word result */}
              <div className="text-center mb-3">
                <p className="font-bold text-lg text-gray-800">
                  {state.answer || ''}
                </p>
              </div>

              {/* Validation icon */}
              {isSubmitted && (
                <div className="flex items-center justify-center">
                  {state.validation ? (
                    <div className="flex items-center gap-2 text-green-600">
                      <Check className="w-6 h-6" />
                      <span className="font-semibold">Правилно!</span>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-red-600 justify-center">
                        <X className="w-6 h-6" />
                        <span className="font-semibold">Грешно</span>
                      </div>
                      <p className="text-sm text-gray-700 text-center">
                        Правилно: <strong>{puzzle.correctWord}</strong>
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Reset button */}
              {!isSubmitted && state.selected.length > 0 && (
                <div className="flex justify-center mt-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleReset(puzzle.id)}
                    className="text-gray-600 hover:text-gray-800 text-xs"
                  >
                    <RotateCcw className="w-3 h-3 mr-1" />
                    Нулирай
                  </Button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {!isSubmitted && (
        <Button
          onClick={handleSubmit}
          className="mt-6 bg-[#6B8543] hover:bg-[#5A7238] text-white text-base font-semibold px-8 py-3 w-full sm:w-auto min-h-[48px] active:scale-95 transition-transform rounded-lg"
          disabled={puzzles.some(p => !wordStates[p.id] || wordStates[p.id].selected.length === 0)}
        >
          Провери отговорите
        </Button>
      )}

      {isSubmitted && (
        <div className="mt-6 p-4 rounded-lg bg-white border-2 border-[#8B9D5F] animate-in fade-in duration-300">
          <div className="flex items-center gap-2">
            {Object.values(wordStates).every(s => s.validation === true) ? (
              <Check className="w-6 h-6 text-green-600" />
            ) : (
              <X className="w-6 h-6 text-red-600" />
            )}
            <p className="text-base font-semibold text-gray-800">
              Резултат: {Object.values(wordStates).filter(s => s.validation === true).length} / {puzzles.length} правилни думи
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
