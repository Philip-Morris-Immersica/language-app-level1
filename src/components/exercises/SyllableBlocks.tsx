'use client';

import { useState, useMemo } from 'react';
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

// Shuffle array deterministically based on puzzle ID
function shuffleArray<T>(array: T[], seed: string): T[] {
  const arr = [...array];
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = ((hash << 5) - hash) + seed.charCodeAt(i);
    hash = hash & hash;
  }
  
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.abs(hash % (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
    hash = ((hash << 5) - hash) + i;
  }
  return arr;
}

// Remove dashes from syllables
function cleanSyllable(syllable: string): string {
  return syllable.replace(/-/g, '');
}

export function SyllableBlocks({ exerciseNumber, instruction, puzzles, onComplete }: SyllableBlocksProps) {
  const initialStates = useMemo(() => {
    const initial: {
      [wordId: string]: {
        blocks: SyllableBlock[];
        selectedIndex: number | null;
        validation: boolean | null;
      };
    } = {};
    
    puzzles.forEach(puzzle => {
      const shuffled = shuffleArray(
        puzzle.syllables.map((syl, idx) => ({
          syllable: cleanSyllable(syl),
          id: `${puzzle.id}-${idx}`
        })),
        puzzle.id
      );
      initial[puzzle.id] = {
        blocks: shuffled,
        selectedIndex: null,
        validation: null,
      };
    });
    return initial;
  }, [puzzles]);

  const [wordStates, setWordStates] = useState(initialStates);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleBlockClick = (wordId: string, clickedIndex: number) => {
    if (isSubmitted) return;

    setWordStates(prev => {
      const state = prev[wordId];
      
      if (state.selectedIndex === null) {
        return {
          ...prev,
          [wordId]: {
            ...state,
            selectedIndex: clickedIndex,
          },
        };
      } else {
        if (state.selectedIndex === clickedIndex) {
          return {
            ...prev,
            [wordId]: {
              ...state,
              selectedIndex: null,
            },
          };
        } else {
          const newBlocks = [...state.blocks];
          [newBlocks[state.selectedIndex], newBlocks[clickedIndex]] = 
            [newBlocks[clickedIndex], newBlocks[state.selectedIndex]];
          
          return {
            ...prev,
            [wordId]: {
              ...state,
              blocks: newBlocks,
              selectedIndex: null,
            },
          };
        }
      }
    });
  };

  const handleSubmit = () => {
    const newStates = { ...wordStates };
    let correctCount = 0;

    puzzles.forEach(puzzle => {
      const state = wordStates[puzzle.id];
      const currentWord = state.blocks.map(b => b.syllable).join('');
      const isCorrect = currentWord.toUpperCase() === puzzle.correctWord.toUpperCase();
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
          
          const currentWord = state.blocks.map(b => b.syllable).join('');

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
              {/* Syllable blocks - tap to swap */}
              <div className="flex flex-wrap gap-2 mb-4 min-h-[60px] items-center justify-center">
                {state.blocks.map((block, index) => (
                  <button
                    key={block.id}
                    onClick={() => handleBlockClick(puzzle.id, index)}
                    disabled={isSubmitted}
                    className={`
                      px-4 py-3 rounded-lg border-2 font-bold text-lg
                      transition-all cursor-pointer
                      ${state.selectedIndex === index
                        ? 'bg-yellow-300 border-yellow-500 scale-110 shadow-lg'
                        : 'bg-[#D8E4C8] border-[#A8B88A] hover:bg-[#C8D4B8] hover:border-[#6B8543] hover:scale-105'
                      }
                      active:scale-95
                      disabled:cursor-default disabled:hover:scale-100
                    `}
                  >
                    {block.syllable}
                  </button>
                ))}
              </div>

              {/* Current word */}
              <div className="text-center mb-3 pb-2 border-b-2 border-gray-300">
                <p className="font-bold text-xl text-gray-800">
                  {currentWord || '_______________'}
                </p>
              </div>

              {/* Validation */}
              {isSubmitted && (
                <div className="flex items-center justify-center mt-3">
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

              {/* Hint */}
              {!isSubmitted && (
                <p className="text-xs text-gray-500 text-center mt-2 italic">
                  Кликнете на две сричкита да разменят местата
                </p>
              )}
            </div>
          );
        })}
      </div>

      {!isSubmitted && (
        <Button
          onClick={handleSubmit}
          className="mt-6 bg-[#6B8543] hover:bg-[#5A7238] text-white text-base font-semibold px-8 py-3 w-full sm:w-auto min-h-[48px] active:scale-95 transition-transform rounded-lg"
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
