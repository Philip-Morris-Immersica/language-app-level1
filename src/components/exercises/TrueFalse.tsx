'use client';

import { useState, useEffect, useRef } from 'react';
import { RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useT } from '@/i18n/useT';
import { useExercisePersistence } from '@/hooks/useExercisePersistence';

interface TrueFalseSentence {
  id: string;
  text: string;
  isTrue: boolean;
}

interface TrueFalseModel {
  text: string;
  isTrue: boolean;
}

interface TrueFalseProps {
  sentences: TrueFalseSentence[];
  imageUrl?: string;
  model?: TrueFalseModel;
  onComplete?: (correct: boolean, score: number) => void;
  exerciseId?: string;
}

type Answer = 'true' | 'false' | null;

function isImagePath(s: string): boolean {
  return (
    (s.startsWith('/') || s.startsWith('http')) &&
    /\.(jpg|jpeg|png|gif|webp)$/i.test(s.split('?')[0] ?? '')
  );
}

export function TrueFalse({ sentences, imageUrl, model, onComplete, exerciseId }: TrueFalseProps) {
  const t = useT();
  const { savedState, saveState } = useExercisePersistence(exerciseId);
  const s = savedState as any;
  const [answers, setAnswers] = useState<Record<string, Answer>>(() => s?.answers ?? {});
  const [checked, setChecked] = useState<boolean>(() => s?.checked ?? false);
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) { mounted.current = true; return; }
    saveState({ answers, checked });
  }, [answers, checked]);

  const handleSelect = (id: string, value: Answer) => {
    setAnswers(prev => ({ ...prev, [id]: value }));
    if (checked) {
      setChecked(false);
    }
  };

  const handleCheck = () => {
    setChecked(true);
    const correct = sentences.filter(s =>
      answers[s.id] != null && (answers[s.id] === 'true') === s.isTrue
    ).length;
    onComplete?.(correct === sentences.length, correct);
  };

  const handleReset = () => {
    setAnswers({});
    setChecked(false);
  };

  const allAnswered = sentences.every(s => answers[s.id] != null);
  const correctCount = sentences.filter(s => answers[s.id] != null && (answers[s.id] === 'true') === s.isTrue).length;
  const allCorrect = checked && correctCount === sentences.length;

  return (
    <div className="space-y-2">
      {imageUrl && isImagePath(imageUrl) && (
        <div className="mb-4 rounded-xl border-2 border-gray-200 bg-gray-50 p-3 overflow-auto">
          <img
            src={imageUrl}
            alt=""
            className="max-h-[min(55vh,420px)] w-full max-w-2xl mx-auto object-contain"
          />
        </div>
      )}
      {model && (
          <div className="flex items-center gap-3 p-3 rounded-lg border-2 border-gray-300 bg-gray-50 opacity-70">
          <span className="text-gray-400 font-medium w-6 text-right shrink-0 text-[10px] italic leading-tight">
            {t('exercise.model')}
          </span>
          <p className="flex-1 text-base text-gray-600 leading-snug italic">{model.text}</p>
          <div className="flex gap-2 shrink-0">
            <span className={`w-10 h-10 rounded-lg font-bold text-base border-2 flex items-center justify-center ${
              model.isTrue ? 'bg-gray-200 border-gray-400 text-green-700' : 'bg-white border-gray-300 text-green-600'
            }`}>да</span>
            <span className={`w-10 h-10 rounded-lg font-bold text-base border-2 flex items-center justify-center ${
              !model.isTrue ? 'bg-gray-200 border-gray-400 text-red-700' : 'bg-white border-gray-300 text-red-600'
            }`}>не</span>
          </div>
        </div>
      )}
      {sentences.map((sentence, index) => {
        const answer = answers[sentence.id];
        const isAnsweredCorrectly = checked && answer != null && (answer === 'true') === sentence.isTrue;
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
              {/* да — зелен шрифт; при избор (преди Check) — сив фон, за да се чете „да“ */}
              <button
                type="button"
                onClick={() => handleSelect(sentence.id, 'true')}
                className={`w-10 h-10 rounded-lg font-bold text-base border-2 transition-all flex items-center justify-center
                  ${answer === 'true'
                    ? checked
                      ? sentence.isTrue
                        ? 'bg-green-100 border-green-500 text-green-800'
                        : 'bg-red-100 border-red-500 text-red-800'
                      : 'bg-gray-200 border-gray-400 text-green-700 scale-105'
                    : 'bg-white border-gray-300 text-green-600 hover:border-green-400 hover:bg-gray-50'
                  }`}
              >
                да
              </button>
              {/* не — червен шрифт; при избор — сив фон */}
              <button
                type="button"
                onClick={() => handleSelect(sentence.id, 'false')}
                className={`w-10 h-10 rounded-lg font-bold text-base border-2 transition-all flex items-center justify-center
                  ${answer === 'false'
                    ? checked
                      ? !sentence.isTrue
                        ? 'bg-green-100 border-green-500 text-red-700'
                        : 'bg-red-100 border-red-500 text-red-800'
                      : 'bg-gray-200 border-gray-400 text-red-700 scale-105'
                    : 'bg-white border-gray-300 text-red-600 hover:border-red-400 hover:bg-gray-50'
                  }`}
              >
                не
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
        <Button
          onClick={handleCheck}
          disabled={!allAnswered}
          className="bg-[#8FC412] hover:bg-[#7DAD0E] text-white disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {t('exercise.check')}
        </Button>
        <Button onClick={handleReset} variant="outline">
          <RotateCcw className="w-4 h-4 mr-2" />
          {t('exercise.reset')}
        </Button>
      </div>
    </div>
  );
}
