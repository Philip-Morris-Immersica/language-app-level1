'use client';

import { useState } from 'react';
import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface DropdownQuestion {
  id: string;
  left: string;
  options: string[];
  correctAnswer: string;
}

interface DropdownMatchProps {
  exerciseNumber?: number;
  instruction: string;
  questions: DropdownQuestion[];
  onComplete?: (correct: boolean, score: number) => void;
}

export function DropdownMatch({ exerciseNumber, instruction, questions, onComplete }: DropdownMatchProps) {
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [validation, setValidation] = useState<{ [key: string]: boolean | null }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSelect = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
    if (validation[questionId] !== null) {
      setValidation(prev => ({ ...prev, [questionId]: null }));
    }
  };

  const handleSubmit = () => {
    const newValidation: { [key: string]: boolean } = {};
    let correctCount = 0;

    questions.forEach(q => {
      const isCorrect = answers[q.id]?.toLowerCase() === q.correctAnswer.toLowerCase();
      newValidation[q.id] = isCorrect;
      if (isCorrect) correctCount++;
    });

    setValidation(newValidation);
    setIsSubmitted(true);

    if (onComplete) {
      const score = (correctCount / questions.length) * questions.length;
      onComplete(correctCount === questions.length, score);
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

      <div className="space-y-4">
        {questions.map((question, index) => (
          <div
            key={question.id}
            className={`
              bg-white rounded-xl border-2 p-4 md:p-5 transition-all
              ${validation[question.id] === true ? 'border-green-500 bg-green-50' : ''}
              ${validation[question.id] === false ? 'border-red-500 bg-red-50' : ''}
              ${validation[question.id] === null ? 'border-gray-300' : ''}
            `}
          >
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-lg font-semibold text-gray-700 min-w-[2rem]">
                {index + 1}.
              </span>
              <span className="text-lg md:text-xl font-bold text-gray-800">
                {question.left}
              </span>

              <Select
                value={answers[question.id] || ''}
                onValueChange={(value) => handleSelect(question.id, value)}
                disabled={isSubmitted}
              >
                <SelectTrigger className={`
                  w-full sm:w-48 h-12 text-base font-semibold
                  ${validation[question.id] === true ? 'border-green-500 bg-green-50' : ''}
                  ${validation[question.id] === false ? 'border-red-500 bg-red-50' : ''}
                `}>
                  <SelectValue placeholder="Избери..." />
                </SelectTrigger>
                <SelectContent>
                  {question.options.map((option) => (
                    <SelectItem key={option} value={option} className="text-base">
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {validation[question.id] === true && (
                <Check className="w-6 h-6 text-green-600 flex-shrink-0" />
              )}
              {validation[question.id] === false && (
                <X className="w-6 h-6 text-red-600 flex-shrink-0" />
              )}
            </div>

            {isSubmitted && validation[question.id] === false && (
              <div className="mt-3 p-2 rounded bg-yellow-50 border border-yellow-200">
                <p className="text-sm text-yellow-800">
                  <strong>Правилно:</strong> {question.left} {question.correctAnswer}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {!isSubmitted && (
        <Button
          onClick={handleSubmit}
          className="mt-6 bg-[#6B8543] hover:bg-[#5A7238] text-white text-base font-semibold px-8 py-3 w-full sm:w-auto min-h-[48px] active:scale-95 transition-transform rounded-lg"
          disabled={questions.some(q => !answers[q.id])}
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
              Резултат: {Object.values(validation).filter(v => v === true).length} / {questions.length} правилни отговора
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
