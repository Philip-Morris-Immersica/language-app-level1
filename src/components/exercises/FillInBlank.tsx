'use client';

import { useState, useRef } from 'react';
import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { FillInBlankExercise } from '@/content/types';

interface FillInBlankProps {
  exercise: FillInBlankExercise;
  onComplete?: (correct: boolean, score: number) => void;
  exerciseNumber?: number;
}

export function FillInBlank({ exercise, onComplete, exerciseNumber }: FillInBlankProps) {
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [validation, setValidation] = useState<{ [key: string]: boolean | null }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const inputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  const handleChange = (sentenceIndex: number, blankIndex: number, value: string) => {
    const key = `${sentenceIndex}-${blankIndex}`;
    // Only allow single uppercase letter
    const upperValue = value.toUpperCase().slice(0, 1);
    setAnswers(prev => ({ ...prev, [key]: upperValue }));
    
    // Auto-move to next field if letter entered
    if (upperValue && !isSubmitted) {
      const allBlanks = getAllBlanks();
      const currentIdx = allBlanks.indexOf(key);
      const nextKey = allBlanks[currentIdx + 1];
      
      if (nextKey && inputRefs.current[nextKey]) {
        inputRefs.current[nextKey]?.focus();
      }
    }
    
    // Clear validation for this input
    if (validation[key] !== null) {
      setValidation(prev => ({ ...prev, [key]: null }));
    }
  };

  const getAllBlanks = (): string[] => {
    const allBlanks: string[] = [];
    exercise.sentences.forEach((sentence, sIdx) => {
      sentence.blanks.forEach((_, bIdx) => {
        allBlanks.push(`${sIdx}-${bIdx}`);
      });
    });
    return allBlanks;
  };

  const handleKeyDown = (
    e: React.KeyboardEvent,
    sentenceIndex: number,
    blankIndex: number
  ) => {
    const key = `${sentenceIndex}-${blankIndex}`;
    
    if (e.key === 'Backspace' && !answers[key]) {
      e.preventDefault();
      const allBlanks = getAllBlanks();
      const currentIdx = allBlanks.indexOf(key);
      const prevKey = allBlanks[currentIdx - 1];
      
      if (prevKey && inputRefs.current[prevKey]) {
        inputRefs.current[prevKey]?.focus();
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  const validateAnswer = (answer: string, correctAnswers: string[]): boolean => {
    const normalized = answer.trim().toUpperCase();
    return correctAnswers.some(correct => 
      correct.toUpperCase() === normalized
    );
  };

  const handleSubmit = () => {
    const newValidation: { [key: string]: boolean } = {};
    let correctCount = 0;
    let totalCount = 0;

    exercise.sentences.forEach((sentence, sIdx) => {
      sentence.blanks.forEach((_, bIdx) => {
        const key = `${sIdx}-${bIdx}`;
        const answer = answers[key] || '';
        const isCorrect = validateAnswer(answer, [sentence.correctAnswers[bIdx]]);
        newValidation[key] = isCorrect;
        if (isCorrect) correctCount++;
        totalCount++;
      });
    });

    setValidation(newValidation);
    setIsSubmitted(true);

    if (onComplete) {
      const score = exercise.points ? (correctCount / totalCount) * exercise.points : correctCount;
      onComplete(correctCount === totalCount, score);
    }
  };

  const renderLetterBoxes = (sentence: typeof exercise.sentences[0], sentenceIndex: number) => {
    // Parse the text to show letters and blanks
    const chars = sentence.text.split('');
    let blankCounter = 0;
    
    return (
      <div className="flex flex-wrap items-center justify-center gap-1 md:gap-2">
        {chars.map((char, charIndex) => {
          if (char === '_') {
            // This is a blank - show input box
            const currentBlankIndex = blankCounter;
            blankCounter++;
            const key = `${sentenceIndex}-${currentBlankIndex}`;
            const validationResult = validation[key];
            
            return (
              <input
                key={charIndex}
                ref={(el) => {
                  inputRefs.current[key] = el;
                }}
                type="text"
                value={answers[key] || ''}
                onChange={(e) => handleChange(sentenceIndex, currentBlankIndex, e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, sentenceIndex, currentBlankIndex)}
                disabled={isSubmitted}
                maxLength={1}
                className={`
                  w-10 h-10 md:w-12 md:h-12 text-center text-lg md:text-xl font-bold 
                  border-2 rounded-lg transition-all uppercase
                  focus:ring-2 focus:ring-[#6B8543] focus:ring-offset-1 focus:outline-none
                  ${validationResult === true ? 'border-green-500 bg-green-50 text-green-700' : ''}
                  ${validationResult === false ? 'border-red-500 bg-red-50 text-red-700' : ''}
                  ${validationResult === null ? 'border-gray-400 bg-white' : ''}
                  ${!isSubmitted ? 'hover:border-[#6B8543]' : ''}
                `}
                autoComplete="off"
                inputMode="text"
              />
            );
          } else if (char === ' ') {
            // Space between words
            return <div key={charIndex} className="w-3 md:w-4" />;
          } else {
            // Regular letter
            return (
              <div
                key={charIndex}
                className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-lg md:text-xl font-bold text-gray-800"
              >
                {char}
              </div>
            );
          }
        })}
      </div>
    );
  };

  return (
    <div className="relative bg-[#F8F5EE] rounded-xl border-2 border-[#8B9D5F] p-6 md:p-8 shadow-sm">
      {/* Exercise number badge */}
      {exerciseNumber && (
        <div className="absolute -top-4 -left-4 w-12 h-12 bg-[#6B8543] text-white rounded-full flex items-center justify-center font-bold text-lg shadow-md z-10">
          {exerciseNumber}
        </div>
      )}
      
      <p className="text-lg md:text-xl font-bold text-gray-800 mb-6">
        {exercise.instruction}
      </p>
      
      <div className="space-y-4 md:space-y-6 mb-6">
        {exercise.sentences.map((sentence, index) => (
          <div key={index} className="bg-white rounded-lg p-4 md:p-6 shadow-sm">
            {renderLetterBoxes(sentence, index)}
          </div>
        ))}
      </div>

      {!isSubmitted && (
        <Button
          onClick={handleSubmit}
          className="bg-[#6B8543] hover:bg-[#5A7238] text-white text-base font-semibold px-8 py-3 w-full sm:w-auto min-h-[48px] active:scale-95 transition-transform rounded-lg"
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
              Резултат: {Object.values(validation).filter(v => v === true).length} / {Object.keys(validation).length} правилни отговора
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
