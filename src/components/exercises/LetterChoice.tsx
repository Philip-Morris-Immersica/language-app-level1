'use client';

import { useState } from 'react';
import { Check, X, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LetterPuzzle {
  id: string;
  word: string;           // 'Д_Б_Р'
  correctLetters: string[]; // ['О', 'Ъ']
  availableLetters?: string[]; // Ignored - we use only correctLetters
}

interface LetterChoiceProps {
  exerciseNumber?: number;
  instruction: string;
  puzzles: LetterPuzzle[];
  onComplete?: (correct: boolean, score: number) => void;
}

// Get letters still in pool (not yet placed in slots)
function getRemainingLetters(correctLetters: string[], placedLetters: (string | null)[]): string[] {
  const placed = placedLetters.filter(Boolean) as string[];
  const remaining: string[] = [];
  for (const letter of correctLetters) {
    const needCount = correctLetters.filter(c => c === letter).length;
    const placedCount = placed.filter(p => p === letter).length;
    for (let i = 0; i < needCount - placedCount; i++) {
      remaining.push(letter);
    }
  }
  return remaining;
}

export function LetterChoice({ exerciseNumber, instruction, puzzles, onComplete }: LetterChoiceProps) {
  const [answers, setAnswers] = useState<{ [key: string]: (string | null)[] }>({});
  const [validation, setValidation] = useState<{ [key: string]: boolean | null }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [draggedLetter, setDraggedLetter] = useState<{ puzzleId: string; letter: string } | null>(null);
  const [touchState, setTouchState] = useState<{ puzzleId: string; letter: string } | null>(null);

  const handleLetterDragStart = (e: React.DragEvent, puzzleId: string, letter: string) => {
    if (isSubmitted) return;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', JSON.stringify({ puzzleId, letter }));
    setDraggedLetter({ puzzleId, letter });
  };

  const handleLetterTouchStart = (puzzleId: string, letter: string) => {
    if (isSubmitted) return;
    setTouchState({ puzzleId, letter });
  };

  const handleLetterTouchEnd = (e: React.TouchEvent, puzzleId: string) => {
    if (!touchState || touchState.puzzleId !== puzzleId) return;

    const touch = e.changedTouches[0];
    const el = document.elementFromPoint(touch.clientX, touch.clientY);
    const slot = el?.closest('[data-letter-slot]');
    if (slot) {
      const slotPuzzleId = slot.getAttribute('data-puzzle-id');
      const slotIndex = parseInt(slot.getAttribute('data-slot-index') || '-1');
      if (slotPuzzleId === puzzleId && slotIndex >= 0) {
        const puzzle = puzzles.find(p => p.id === puzzleId);
        if (puzzle) {
          const currentAnswers = answers[puzzleId] || Array((puzzle.word.match(/_/g) || []).length).fill(null);
          if (currentAnswers[slotIndex] === null) {
            setAnswers(prev => {
              const arr = [...(prev[puzzleId] || Array((puzzle.word.match(/_/g) || []).length).fill(null))];
              arr[slotIndex] = touchState.letter;
              return { ...prev, [puzzleId]: arr };
            });
          }
        }
      }
    }
    setTouchState(null);
  };

  const handleSlotDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleSlotDrop = (e: React.DragEvent, puzzleId: string, slotIndex: number) => {
    e.preventDefault();
    if (isSubmitted) return;

    try {
      const data = JSON.parse(e.dataTransfer.getData('text/plain'));
      if (data.puzzleId !== puzzleId) return;

      const puzzle = puzzles.find(p => p.id === puzzleId);
      if (!puzzle) return;

      const currentAnswers = answers[puzzleId] || Array((puzzle.word.match(/_/g) || []).length).fill(null);
      if (currentAnswers[slotIndex] !== null) return; // Already filled

      setAnswers(prev => {
        const arr = [...(prev[puzzleId] || Array((puzzle.word.match(/_/g) || []).length).fill(null))];
        arr[slotIndex] = data.letter;
        return { ...prev, [puzzleId]: arr };
      });
    } catch (_) {}
    setDraggedLetter(null);
  };

  const handleSlotDragStart = (e: React.DragEvent, puzzleId: string, slotIndex: number) => {
    if (isSubmitted) return;
    const currentAnswers = answers[puzzleId] || [];
    const letter = currentAnswers[slotIndex];
    if (!letter) return;

    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', JSON.stringify({ puzzleId, letter, fromSlot: slotIndex }));
    setDraggedLetter({ puzzleId, letter });
  };

  const handleLetterPoolDrop = (e: React.DragEvent, puzzleId: string) => {
    e.preventDefault();
    if (isSubmitted) return;

    try {
      const data = JSON.parse(e.dataTransfer.getData('text/plain'));
      if (data.puzzleId !== puzzleId) return;

      const puzzle = puzzles.find(p => p.id === puzzleId);
      if (!puzzle) return;

      const slotIndex = data.fromSlot;
      if (typeof slotIndex !== 'number') return;

      setAnswers(prev => {
        const arr = [...(prev[puzzleId] || [])];
        arr[slotIndex] = null;
        return { ...prev, [puzzleId]: arr };
      });
    } catch (_) {}
    setDraggedLetter(null);
  };

  const handleReset = (puzzleId: string) => {
    if (isSubmitted) return;
    setAnswers(prev => ({ ...prev, [puzzleId]: [] }));
  };

  const renderWord = (puzzle: LetterPuzzle, puzzleAnswers: (string | null)[]) => {
    const chars = puzzle.word.split('');
    let answerIndex = 0;

    return chars.map((char, index) => {
      if (char === '_') {
        const letter = puzzleAnswers[answerIndex];
        const slotIndex = answerIndex;
        const validationColor = validation[puzzle.id] === true ? 'bg-green-100 border-green-500 text-green-700' :
                                 validation[puzzle.id] === false ? 'bg-red-100 border-red-500 text-red-700' :
                                 'bg-white border-gray-400 border-dashed';
        answerIndex++;
        return (
          <div
            key={index}
            data-letter-slot
            data-puzzle-id={puzzle.id}
            data-slot-index={slotIndex}
            draggable={!!letter && !isSubmitted}
            onDragStart={(e) => letter && handleSlotDragStart(e, puzzle.id, slotIndex)}
            onDragOver={handleSlotDragOver}
            onDrop={(e) => handleSlotDrop(e, puzzle.id, slotIndex)}
            onDragEnd={() => setDraggedLetter(null)}
            className={`
              w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-lg md:text-xl font-bold border-2 rounded-lg
              min-w-[2.5rem] min-h-[2.5rem]
              ${validationColor}
              ${!letter && !isSubmitted ? 'cursor-copy' : ''}
              ${letter && !isSubmitted ? 'cursor-move' : ''}
            `}
          >
            {letter || ''}
          </div>
        );
      } else if (char === ' ') {
        return <div key={index} className="w-3 md:w-4" />;
      } else {
        return (
          <div
            key={index}
            className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-lg md:text-xl font-bold text-gray-800"
          >
            {char}
          </div>
        );
      }
    });
  };

  const handleSubmit = () => {
    const newValidation: { [key: string]: boolean } = {};
    let correctCount = 0;

    puzzles.forEach(puzzle => {
      const userAnswers = (answers[puzzle.id] || []).filter(Boolean) as string[];
      const isCorrect = userAnswers.length === puzzle.correctLetters.length &&
                       userAnswers.every((letter, idx) => letter.toUpperCase() === puzzle.correctLetters[idx].toUpperCase());
      newValidation[puzzle.id] = isCorrect;
      if (isCorrect) correctCount++;
    });

    setValidation(newValidation);
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

      <div className="space-y-6">
        {puzzles.map((puzzle) => {
          const blankCount = (puzzle.word.match(/_/g) || []).length;
          const puzzleAnswers: (string | null)[] = answers[puzzle.id] || Array(blankCount).fill(null);
          const remainingLetters = getRemainingLetters(puzzle.correctLetters, puzzleAnswers);

          return (
            <div key={puzzle.id} className="bg-white rounded-xl border-2 border-gray-300 p-5 shadow-sm">
              {/* Word display with blanks */}
              <div className="flex justify-center items-center gap-1 mb-4 flex-wrap">
                {renderWord(puzzle, puzzleAnswers)}
              </div>

              {/* Letter pool - only missing letters, draggable */}
              {!isSubmitted && (
                <div
                  className="flex flex-wrap justify-center gap-2 mb-3 min-h-[3rem]"
                  onDragOver={handleSlotDragOver}
                  onDrop={(e) => handleLetterPoolDrop(e, puzzle.id)}
                >
                  {remainingLetters.map((letter, idx) => (
                    <div
                      key={`${letter}-${idx}`}
                      draggable
                      onDragStart={(e) => handleLetterDragStart(e, puzzle.id, letter)}
                      onDragEnd={() => setDraggedLetter(null)}
                      onTouchStart={() => handleLetterTouchStart(puzzle.id, letter)}
                      onTouchEnd={(e) => handleLetterTouchEnd(e, puzzle.id)}
                      className={`
                        w-12 h-12 md:w-14 md:h-14 text-xl font-bold flex items-center justify-center
                        bg-[#D8E4C8] border-2 border-[#A8B88A] rounded-lg
                        hover:bg-[#C8D4B8] hover:border-[#6B8543] hover:scale-105
                        active:scale-95 transition-all cursor-move select-none touch-none
                        ${draggedLetter?.letter === letter && draggedLetter?.puzzleId === puzzle.id ? 'opacity-50' : ''}
                        ${touchState?.letter === letter && touchState?.puzzleId === puzzle.id ? 'opacity-50' : ''}
                      `}
                    >
                      {letter}
                    </div>
                  ))}
                </div>
              )}

              {/* Reset button */}
              {!isSubmitted && puzzleAnswers.some(Boolean) && (
                <div className="flex justify-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleReset(puzzle.id)}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    <RotateCcw className="w-4 h-4 mr-1" />
                    Нулирай
                  </Button>
                </div>
              )}

              {/* Validation */}
              {isSubmitted && (
                <div className="flex justify-center mt-3">
                  {validation[puzzle.id] ? (
                    <div className="flex items-center gap-2 text-green-600">
                      <Check className="w-5 h-5" />
                      <span className="font-semibold">Правилно!</span>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-red-600 justify-center">
                        <X className="w-5 h-5" />
                        <span className="font-semibold">Грешно</span>
                      </div>
                      <p className="text-sm text-gray-700 text-center">
                        Правилно: <strong>{puzzle.word.split('').map((c, i) => {
                          if (c === '_') return puzzle.correctLetters[puzzle.word.slice(0, i).split('').filter(ch => ch === '_').length];
                          return c;
                        }).join('')}</strong>
                      </p>
                    </div>
                  )}
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
          disabled={puzzles.some(p => {
            const userAnswers = (answers[p.id] || []).filter(Boolean);
            return userAnswers.length < (p.word.match(/_/g) || []).length;
          })}
        >
          Провери отговорите
        </Button>
      )}

      {isSubmitted && (
        <div className="mt-6 p-4 rounded-lg bg-white border-2 border-[#8B9D5F] animate-in fade-in duration-300">
          <div className="flex items-center gap-2">
            {Object.values(validation).every(v => v === true) ? (
              <Check className="w-6 h-6 text-green-600" />
            ) : (
              <X className="w-6 h-6 text-red-600" />
            )}
            <p className="text-base font-semibold text-gray-800">
              Резултат: {Object.values(validation).filter(v => v === true).length} / {puzzles.length} правилни думи
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
