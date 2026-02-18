'use client';

import { useState } from 'react';
import { Check, X, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LetterPuzzle {
  id: string;
  word: string;           // 'Д_Б_Р'
  correctLetters: string[]; // ['О', 'Ъ']
  availableLetters: string[]; // ['О', 'Ъ', 'А', 'Е', 'И']
}

interface LetterChoiceProps {
  exerciseNumber?: number;
  instruction: string;
  puzzles: LetterPuzzle[];
  onComplete?: (correct: boolean, score: number) => void;
}

export function LetterChoice({ exerciseNumber, instruction, puzzles, onComplete }: LetterChoiceProps) {
  const [answers, setAnswers] = useState<{ [key: string]: string[] }>({});
  const [validation, setValidation] = useState<{ [key: string]: boolean | null }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleLetterClick = (puzzleId: string, letter: string) => {
    if (isSubmitted) return;

    const puzzle = puzzles.find(p => p.id === puzzleId);
    if (!puzzle) return;

    const currentAnswers = answers[puzzleId] || [];
    const blankCount = (puzzle.word.match(/_/g) || []).length;

    if (currentAnswers.length < blankCount) {
      setAnswers(prev => ({
        ...prev,
        [puzzleId]: [...currentAnswers, letter]
      }));
    }
  };

  const handleReset = (puzzleId: string) => {
    if (isSubmitted) return;
    setAnswers(prev => ({ ...prev, [puzzleId]: [] }));
  };

  const renderWord = (puzzle: LetterPuzzle, puzzleAnswers: string[]) => {
    const chars = puzzle.word.split('');
    let answerIndex = 0;

    return chars.map((char, index) => {
      if (char === '_') {
        const letter = puzzleAnswers[answerIndex];
        const validationColor = validation[puzzle.id] === true ? 'bg-green-100 border-green-500 text-green-700' :
                                 validation[puzzle.id] === false ? 'bg-red-100 border-red-500 text-red-700' :
                                 'bg-white border-gray-400';
        answerIndex++;
        return (
          <div
            key={index}
            className={`w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-lg md:text-xl font-bold border-2 rounded-lg ${validationColor}`}
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
      const userAnswers = answers[puzzle.id] || [];
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
          const puzzleAnswers = answers[puzzle.id] || [];
          const blankCount = (puzzle.word.match(/_/g) || []).length;

          return (
            <div key={puzzle.id} className="bg-white rounded-xl border-2 border-gray-300 p-5 shadow-sm">
              {/* Word display */}
              <div className="flex justify-center items-center gap-1 mb-4">
                {renderWord(puzzle, puzzleAnswers)}
              </div>

              {/* Available letters */}
              {!isSubmitted && (
                <div className="flex flex-wrap justify-center gap-2 mb-3">
                  {puzzle.availableLetters.map((letter, idx) => (
                    <button
                      key={`${letter}-${idx}`}
                      onClick={() => handleLetterClick(puzzle.id, letter)}
                      disabled={puzzleAnswers.length >= blankCount}
                      className="
                        w-12 h-12 md:w-14 md:h-14 text-xl font-bold
                        bg-[#D8E4C8] border-2 border-[#A8B88A] rounded-lg
                        hover:bg-[#C8D4B8] hover:border-[#6B8543] hover:scale-105
                        active:scale-95 transition-all
                        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                      "
                    >
                      {letter}
                    </button>
                  ))}
                </div>
              )}

              {/* Reset button */}
              {!isSubmitted && puzzleAnswers.length > 0 && (
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
          disabled={puzzles.some(p => (answers[p.id] || []).length < (p.word.match(/_/g) || []).length)}
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
