'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useT } from '@/i18n/useT';

interface TrueFalseSentence {
  id: string;
  text: string;
  isTrue: boolean;
}

interface TrueFalseProps {
  sentences: TrueFalseSentence[];
  onComplete?: (correct: boolean, score: number) => void;
}

type Answer = 'true' | 'false' | null;

export function TrueFalse({ sentences, onComplete }: TrueFalseProps) {
  const t = useT();
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [checked, setChecked] = useState(false);

  const handleSelect = (id: string, value: Answer) => {
    if (checked) return;
    setAnswers(prev => ({ ...prev, [id]: value }));
  };

  const handleCheck = () => {
    setChecked(true);
    const correct = sentences.filter(s =>
      (answers[s.id] === 'true') === s.isTrue
    ).length;
    onComplete?.(correct === sentences.length, correct);
  };

  const handleReset = () => {
    setAnswers({});
    setChecked(false);
  };

  const allAnswered = sentences.every(s => answers[s.id] != null);
  const correctCount = sentences.filter(s => (answers[s.id] === 'true') === s.isTrue).length;
  const allCorrect = checked && correctCount === sentences.length;

  return (
    <div className="space-y-2">
      {sentences.map((sentence, index) => {
        const answer = answers[sentence.id];
        const isAnsweredCorrectly = checked && (answer === 'true') === sentence.isTrue;
        const isAnsweredWrongly = checked && answer != null && (answer === 'true') !== sentence.isTrue;

        return (
          <div
            key={sentence.id}
            className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-colors ${
              isAnsweredCorrectly ? 'border-green-400 bg-green-50' :
              isAnsweredWrongly   ? 'border-red-400 bg-red-50' :
                                    'border-gray-200 bg-white'
            }`}
          >
            <span className="text-gray-400 font-medium w-6 text-right shrink-0 text-sm">
              {index + 1}.
            </span>
            <p className="flex-1 text-base text-gray-800 leading-snug">{sentence.text}</p>
            <div className="flex gap-2 shrink-0">
              {/* ✓ button */}
              <button
                onClick={() => handleSelect(sentence.id, 'true')}
                disabled={checked}
                className={`w-10 h-10 rounded-lg font-bold text-lg border-2 transition-all
                  ${answer === 'true'
                    ? checked
                      ? sentence.isTrue
                        ? 'bg-green-500 border-green-500 text-white'
                        : 'bg-red-500 border-red-500 text-white'
                      : 'bg-[#8FC412] border-[#8FC412] text-white scale-105'
                    : 'bg-white border-gray-300 text-gray-500 hover:border-[#8FC412] hover:text-[#8FC412]'
                  } disabled:cursor-not-allowed`}
              >
                ✓
              </button>
              {/* ✗ button */}
              <button
                onClick={() => handleSelect(sentence.id, 'false')}
                disabled={checked}
                className={`w-10 h-10 rounded-lg font-bold text-lg border-2 transition-all
                  ${answer === 'false'
                    ? checked
                      ? !sentence.isTrue
                        ? 'bg-green-500 border-green-500 text-white'
                        : 'bg-red-500 border-red-500 text-white'
                      : 'bg-[#8FC412] border-[#8FC412] text-white scale-105'
                    : 'bg-white border-gray-300 text-gray-500 hover:border-[#8FC412] hover:text-[#8FC412]'
                  } disabled:cursor-not-allowed`}
              >
                ✗
              </button>
            </div>
          </div>
        );
      })}

      {/* Result banner */}
      {checked && (
        <div className={`mt-2 p-4 rounded-lg border-2 text-center font-semibold text-base ${
          allCorrect
            ? 'border-green-400 bg-green-50 text-green-700'
            : 'border-orange-300 bg-orange-50 text-orange-700'
        }`}>
          {allCorrect
            ? t('exercise.allCorrect')
            : `${t('exercise.result')} ${correctCount} / ${sentences.length}`
          }
        </div>
      )}

      {/* Action buttons */}
      <div className="flex gap-3 pt-2">
        {!checked ? (
          <Button
            onClick={handleCheck}
            disabled={!allAnswered}
            className="bg-[#8FC412] hover:bg-[#7DAD0E] text-white disabled:opacity-50"
          >
            {t('exercise.check')}
          </Button>
        ) : (
          <Button onClick={handleReset} variant="outline">
            {t('exercise.reset')}
          </Button>
        )}
      </div>
    </div>
  );
}
