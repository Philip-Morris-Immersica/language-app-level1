'use client';

import { useState, useRef, useEffect } from 'react';
import { Check, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
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
    setAnswers(prev => ({ ...prev, [key]: value }));
    
    // Clear validation for this input
    if (validation[key] !== null) {
      setValidation(prev => ({ ...prev, [key]: null }));
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent,
    sentenceIndex: number,
    blankIndex: number
  ) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      // Find next input
      const allBlanks: string[] = [];
      exercise.sentences.forEach((sentence, sIdx) => {
        sentence.blanks.forEach((_, bIdx) => {
          allBlanks.push(`${sIdx}-${bIdx}`);
        });
      });
      
      const currentKey = `${sentenceIndex}-${blankIndex}`;
      const currentIndex = allBlanks.indexOf(currentKey);
      const nextKey = allBlanks[currentIndex + 1];
      
      if (nextKey && inputRefs.current[nextKey]) {
        inputRefs.current[nextKey]?.focus();
      } else {
        handleSubmit();
      }
    }
  };

  const validateAnswer = (answer: string, correctAnswers: string[]): boolean => {
    const normalized = answer.trim().toLowerCase();
    return correctAnswers.some(correct => 
      correct.toLowerCase() === normalized
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
        const isCorrect = validateAnswer(answer, sentence.correctAnswers);
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

  const renderSentence = (sentence: typeof exercise.sentences[0], sentenceIndex: number) => {
    // Split text by underscores to find blank positions
    const parts = sentence.text.split('_______');
    
    return (
      <div key={sentenceIndex} className="flex flex-wrap items-center gap-2 mb-4">
        {parts.map((part, partIndex) => (
          <span key={partIndex} className="inline-flex items-center gap-2">
            <span className="text-base md:text-lg">{part}</span>
            {partIndex < parts.length - 1 && sentence.blanks[partIndex] !== undefined && (
              <span className="relative inline-flex items-center">
                <Input
                  ref={(el) => {
                    inputRefs.current[`${sentenceIndex}-${partIndex}`] = el;
                  }}
                  type="text"
                  value={answers[`${sentenceIndex}-${partIndex}`] || ''}
                  onChange={(e) => handleChange(sentenceIndex, partIndex, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, sentenceIndex, partIndex)}
                  disabled={isSubmitted}
                  className={`
                    w-36 md:w-44 h-14 text-center text-base md:text-lg font-medium rounded-lg
                    transition-all focus:ring-2 focus:ring-bolt-primary focus:ring-offset-2
                    ${validation[`${sentenceIndex}-${partIndex}`] === true ? 'border-green-500 bg-green-50' : ''}
                    ${validation[`${sentenceIndex}-${partIndex}`] === false ? 'border-red-500 bg-red-50' : ''}
                  `}
                  placeholder="..."
                />
                {validation[`${sentenceIndex}-${partIndex}`] === true && (
                  <Check className="absolute -right-8 w-6 h-6 text-green-600" />
                )}
                {validation[`${sentenceIndex}-${partIndex}`] === false && (
                  <X className="absolute -right-8 w-6 h-6 text-red-600" />
                )}
              </span>
            )}
          </span>
        ))}
      </div>
    );
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
      
      <div className="space-y-6">
        {exercise.sentences.map((sentence, index) => renderSentence(sentence, index))}
      </div>

      {!isSubmitted && (
        <Button
          onClick={handleSubmit}
          className="mt-8 bg-bolt-primary hover:bg-bolt-primary-hover text-base font-semibold px-8 py-6 w-full sm:w-auto min-h-[52px] active:scale-95 transition-transform"
        >
          Провери
        </Button>
      )}

      {isSubmitted && (
        <div className="mt-8 p-5 rounded-xl bg-bolt-secondary-light border-2 border-bolt-secondary animate-in fade-in duration-300">
          <p className="text-base font-semibold text-gray-800">
            Резултат: {Object.values(validation).filter(v => v === true).length} / {Object.keys(validation).length} правилни отговора
          </p>
        </div>
      )}
    </div>
  );
}
