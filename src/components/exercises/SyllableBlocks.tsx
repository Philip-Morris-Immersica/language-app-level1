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
  
  // Create seeded random function
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = ((hash << 5) - hash) + seed.charCodeAt(i);
    hash = hash & hash;
  }
  
  // Fisher-Yates shuffle with better randomization
  for (let i = arr.length - 1; i > 0; i--) {
    hash = ((hash * 1103515245) + 12345) & 0x7fffffff;
    const j = Math.floor((hash / 0x7fffffff) * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
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
        dragOverIndex: number | null;
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
        dragOverIndex: null,
      };
    });
    return initial;
  }, [puzzles]);

  const [wordStates, setWordStates] = useState(initialStates);
  const [touchState, setTouchState] = useState<{
    wordId: string | null;
    startIndex: number | null;
    currentElement: HTMLElement | null;
  }>({ wordId: null, startIndex: null, currentElement: null });

  const handleDragStart = (e: React.DragEvent, wordId: string, index: number) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.currentTarget.innerHTML);
    
    setWordStates(prev => ({
      ...prev,
      [wordId]: {
        ...prev[wordId],
        draggedIndex: index,
      },
    }));
  };

  const handleDragOver = (e: React.DragEvent, wordId: string, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    
    setWordStates(prev => ({
      ...prev,
      [wordId]: {
        ...prev[wordId],
        dragOverIndex: index,
      },
    }));
  };

  const handleDragLeave = (wordId: string) => {
    setWordStates(prev => ({
      ...prev,
      [wordId]: {
        ...prev[wordId],
        dragOverIndex: null,
      },
    }));
  };

  const handleDrop = (e: React.DragEvent, wordId: string, dropIndex: number) => {
    e.preventDefault();
    
    setWordStates(prev => {
      const state = prev[wordId];
      if (state.draggedIndex === null || state.draggedIndex === dropIndex) {
        return {
          ...prev,
          [wordId]: {
            ...state,
            draggedIndex: null,
            dragOverIndex: null,
          },
        };
      }

      const newBlocks = [...state.blocks];
      [newBlocks[state.draggedIndex], newBlocks[dropIndex]] = 
        [newBlocks[dropIndex], newBlocks[state.draggedIndex]];

      return {
        ...prev,
        [wordId]: {
          blocks: newBlocks,
          draggedIndex: null,
          dragOverIndex: null,
        },
      };
    });
  };

  const handleDragEnd = (wordId: string) => {
    setWordStates(prev => ({
      ...prev,
      [wordId]: {
        ...prev[wordId],
        draggedIndex: null,
        dragOverIndex: null,
      },
    }));
  };

  // Touch handlers for mobile
  const handleTouchStart = (e: React.TouchEvent, wordId: string, index: number) => {
    const element = e.currentTarget as HTMLElement;
    setTouchState({
      wordId,
      startIndex: index,
      currentElement: element,
    });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchState.currentElement) return;
    
    const touch = e.touches[0];
    const element = document.elementFromPoint(touch.clientX, touch.clientY);
    
    // Find if we're over another syllable block
    const overBlock = element?.closest('[data-syllable-index]');
    if (overBlock && touchState.wordId) {
      const overIndex = parseInt(overBlock.getAttribute('data-syllable-index') || '-1');
      if (overIndex >= 0) {
        setWordStates(prev => ({
          ...prev,
          [touchState.wordId!]: {
            ...prev[touchState.wordId!],
            dragOverIndex: overIndex,
          },
        }));
      }
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchState.wordId || touchState.startIndex === null) return;
    
    const touch = e.changedTouches[0];
    const element = document.elementFromPoint(touch.clientX, touch.clientY);
    const overBlock = element?.closest('[data-syllable-index]');
    
    if (overBlock && touchState.wordId) {
      const dropIndex = parseInt(overBlock.getAttribute('data-syllable-index') || '-1');
      if (dropIndex >= 0 && dropIndex !== touchState.startIndex) {
        setWordStates(prev => {
          const state = prev[touchState.wordId!];
          const newBlocks = [...state.blocks];
          [newBlocks[touchState.startIndex!], newBlocks[dropIndex]] = 
            [newBlocks[dropIndex], newBlocks[touchState.startIndex!]];

          return {
            ...prev,
            [touchState.wordId!]: {
              blocks: newBlocks,
              draggedIndex: null,
              dragOverIndex: null,
            },
          };
        });
      }
    }
    
    setWordStates(prev => ({
      ...prev,
      [touchState.wordId!]: {
        ...prev[touchState.wordId!],
        draggedIndex: null,
        dragOverIndex: null,
      },
    }));
    
    setTouchState({ wordId: null, startIndex: null, currentElement: null });
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
                    data-syllable-index={index}
                    draggable
                    onDragStart={(e) => handleDragStart(e, puzzle.id, index)}
                    onDragOver={(e) => handleDragOver(e, puzzle.id, index)}
                    onDragLeave={() => handleDragLeave(puzzle.id)}
                    onDrop={(e) => handleDrop(e, puzzle.id, index)}
                    onDragEnd={() => handleDragEnd(puzzle.id)}
                    onTouchStart={(e) => handleTouchStart(e, puzzle.id, index)}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    className={`
                      px-4 py-3 rounded-lg border-2 font-bold text-lg text-gray-800
                      transition-all cursor-move select-none
                      ${state.draggedIndex === index ? 'opacity-50 scale-110' : ''}
                      ${state.dragOverIndex === index && state.draggedIndex !== index 
                        ? 'bg-yellow-200 border-yellow-400 scale-105' 
                        : 'bg-[#D8E4C8] border-[#A8B88A]'
                      }
                      ${state.draggedIndex !== index && state.dragOverIndex !== index
                        ? 'hover:bg-[#C8D4B8] hover:border-[#6B8543] hover:scale-105'
                        : ''
                      }
                      active:scale-95 touch-none
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
