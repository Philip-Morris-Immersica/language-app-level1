'use client';

import { useState, useMemo } from 'react';

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
        draggedIndex: number | null;
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
        draggedIndex: null,
      };
    });
    return initial;
  }, [puzzles]);

  const [wordStates, setWordStates] = useState(initialStates);

  const handleDragStart = (wordId: string, index: number) => {
    setWordStates(prev => ({
      ...prev,
      [wordId]: {
        ...prev[wordId],
        draggedIndex: index,
      },
    }));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (wordId: string, dropIndex: number) => {
    setWordStates(prev => {
      const state = prev[wordId];
      if (state.draggedIndex === null || state.draggedIndex === dropIndex) {
        return prev;
      }

      const newBlocks = [...state.blocks];
      [newBlocks[state.draggedIndex], newBlocks[dropIndex]] = 
        [newBlocks[dropIndex], newBlocks[state.draggedIndex]];

      return {
        ...prev,
        [wordId]: {
          blocks: newBlocks,
          draggedIndex: null,
        },
      };
    });
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
              className="bg-white rounded-xl border-2 border-gray-300 p-5 shadow-sm"
            >
              {/* Draggable syllable blocks */}
              <div className="flex flex-wrap gap-2 mb-6 min-h-[60px] items-center justify-center">
                {state.blocks.map((block, index) => (
                  <div
                    key={block.id}
                    draggable
                    onDragStart={() => handleDragStart(puzzle.id, index)}
                    onDragOver={handleDragOver}
                    onDrop={() => handleDrop(puzzle.id, index)}
                    className={`
                      px-4 py-3 rounded-lg border-2 border-[#A8B88A] bg-[#D8E4C8]
                      font-bold text-lg text-gray-800
                      hover:bg-[#C8D4B8] hover:border-[#6B8543] hover:scale-105
                      active:scale-95 transition-all cursor-move select-none
                      ${state.draggedIndex === index ? 'opacity-50' : ''}
                    `}
                  >
                    {block.syllable}
                  </div>
                ))}
              </div>

              {/* Correct answer (hint) */}
              <div className="text-center pt-3 border-t-2 border-gray-200">
                <p className="text-sm text-gray-500 mb-1 italic">Правилен отговор:</p>
                <p className="font-bold text-lg text-[#6B8543]">
                  {puzzle.correctWord}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
