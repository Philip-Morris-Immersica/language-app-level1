'use client';

import { useState, useEffect } from 'react';
import { Check, X, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { WordOrderExercise } from '@/content/types';

interface WordOrderProps {
  exercise: WordOrderExercise;
  onComplete?: (correct: boolean, score: number) => void;
  exerciseNumber?: number;
}

export function WordOrder({ exercise, onComplete, exerciseNumber }: WordOrderProps) {
  const [questionStates, setQuestionStates] = useState<{
    [qIndex: number]: {
      available: string[];
      built: string[];
      validation: boolean | null;
    };
  }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    // Initialize each question with shuffled words
    const initialStates: typeof questionStates = {};
    exercise.questions.forEach((question, index) => {
      const shuffled = [...question.words].sort(() => Math.random() - 0.5);
      initialStates[index] = {
        available: shuffled,
        built: [],
        validation: null,
      };
    });
    setQuestionStates(initialStates);
  }, [exercise]);

  const handleWordClick = (questionIndex: number, word: string, fromBuilt: boolean) => {
    if (isSubmitted) return;

    setQuestionStates(prev => {
      const state = prev[questionIndex];
      if (fromBuilt) {
        // Move from built to available
        return {
          ...prev,
          [questionIndex]: {
            ...state,
            built: state.built.filter(w => w !== word),
            available: [...state.available, word],
          },
        };
      } else {
        // Move from available to built
        return {
          ...prev,
          [questionIndex]: {
            ...state,
            available: state.available.filter(w => w !== word),
            built: [...state.built, word],
          },
        };
      }
    });
  };

  const handleReset = (questionIndex: number) => {
    if (isSubmitted) return;

    setQuestionStates(prev => ({
      ...prev,
      [questionIndex]: {
        ...prev[questionIndex],
        available: [...prev[questionIndex].available, ...prev[questionIndex].built],
        built: [],
      },
    }));
  };

  const handleSubmit = () => {
    const newStates = { ...questionStates };
    let correctCount = 0;

    exercise.questions.forEach((question, index) => {
      const builtSentence = questionStates[index].built.join(' ');
      const isCorrect = builtSentence.toLowerCase().trim() === question.correctSentence.toLowerCase().trim();
      newStates[index] = {
        ...newStates[index],
        validation: isCorrect,
      };
      if (isCorrect) correctCount++;
    });

    setQuestionStates(newStates);
    setIsSubmitted(true);

    if (onComplete) {
      const totalQuestions = exercise.questions.length;
      const score = exercise.points ? (correctCount / totalQuestions) * exercise.points : correctCount;
      onComplete(correctCount === totalQuestions, score);
    }
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

      <div className="space-y-10">
        {exercise.questions.map((question, qIndex) => {
          const state = questionStates[qIndex];
          if (!state) return null;

          return (
            <div key={qIndex} className="space-y-5">
              <div className="flex items-start justify-between gap-4">
                <p className="text-lg font-semibold text-gray-800">
                  {qIndex + 1}.
                </p>
                {question.hint && (
                  <div className="flex-1 text-right">
                    <span className="text-base text-gray-600 italic bg-gray-100 px-3 py-1 rounded-lg">
                      {question.hint}
                    </span>
                  </div>
                )}
                {!isSubmitted && state.built.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleReset(qIndex)}
                    className="text-gray-600 hover:text-gray-800 shrink-0"
                  >
                    <RotateCcw className="w-4 h-4 mr-1" />
                    Нулирай
                  </Button>
                )}
              </div>

              {/* Built sentence area */}
              <div className={`
                min-h-[100px] p-5 rounded-xl border-2 flex flex-wrap gap-3 items-center shadow-sm
                ${state.validation === true ? 'border-green-500 bg-green-50' : ''}
                ${state.validation === false ? 'border-red-500 bg-red-50' : ''}
                ${state.validation === null ? 'border-gray-300 bg-gray-50' : ''}
              `}>
                {state.built.length === 0 ? (
                  <span className="text-gray-400 text-base">Изберете думи, за да построите изречението...</span>
                ) : (
                  <>
                    {state.built.map((word, wIndex) => (
                      <button
                        key={wIndex}
                        onClick={() => handleWordClick(qIndex, word, true)}
                        disabled={isSubmitted}
                        className={`
                          px-4 py-3 rounded-xl border-2 border-bolt-primary bg-bolt-secondary-light shadow-sm
                          font-semibold text-base min-h-[52px] active:scale-95 transition-all
                          ${!isSubmitted ? 'hover:bg-white hover:shadow-md cursor-pointer' : 'cursor-default'}
                        `}
                      >
                        {word}
                      </button>
                    ))}
                    {isSubmitted && (
                      <span className="ml-2">
                        {state.validation ? (
                          <Check className="w-7 h-7 text-green-600" />
                        ) : (
                          <X className="w-7 h-7 text-red-600" />
                        )}
                      </span>
                    )}
                  </>
                )}
              </div>

              {/* Available words */}
              {!isSubmitted && state.available.length > 0 && (
                <div className="p-5 rounded-xl bg-bolt-secondary-light border-2 border-bolt-secondary">
                  <div className="flex flex-wrap gap-3">
                    {state.available.map((word, wIndex) => (
                      <button
                        key={wIndex}
                        onClick={() => handleWordClick(qIndex, word, false)}
                        className="
                          px-4 py-3 rounded-xl border-2 border-gray-300 bg-white shadow-sm
                          font-semibold text-base min-h-[52px] active:scale-95
                          hover:border-bolt-primary hover:bg-bolt-secondary-light hover:shadow-md
                          cursor-pointer transition-all
                        "
                      >
                        {word}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Show correct answer if wrong */}
              {isSubmitted && state.validation === false && (
                <div className="p-3 rounded-lg bg-yellow-50 border border-yellow-200">
                  <p className="text-sm text-yellow-800">
                    <strong>Правилен отговор:</strong> {question.correctSentence}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {!isSubmitted && (
        <Button
          onClick={handleSubmit}
          className="mt-8 bg-bolt-primary hover:bg-bolt-primary-hover text-base font-semibold px-8 py-6 w-full sm:w-auto min-h-[52px] active:scale-95 transition-transform"
          disabled={exercise.questions.some((_, idx) => 
            !questionStates[idx] || questionStates[idx].built.length === 0
          )}
        >
          Провери
        </Button>
      )}

      {isSubmitted && (
        <div className="mt-8 p-5 rounded-xl bg-bolt-secondary-light border-2 border-bolt-secondary animate-in fade-in duration-300">
          <p className="text-base font-semibold text-gray-800">
            Резултат: {Object.values(questionStates).filter(s => s.validation === true).length} / {exercise.questions.length} правилни изречения
          </p>
        </div>
      )}
    </div>
  );
}
