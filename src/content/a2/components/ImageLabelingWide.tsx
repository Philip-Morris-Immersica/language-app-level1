'use client';

// A2-specific variant of the shared `ImageLabeling` (select + check) that lays
// the image/dropdown cards out 5-per-row on desktop (2 rows of 5 for 10 items).
// Why a fork: the shared component caps at 3–4 columns and lives in
// `src/components/exercises/` (outside the A2 domain). Behaviour mirrors the
// shared default layout — only the grid width differs.

import { useState, useEffect, useRef, useMemo } from 'react';
import Image from 'next/image';
import { Check, X, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useT } from '@/i18n/useT';
import { useExercisePersistence } from '@/hooks/useExercisePersistence';
import type { A2ImageLabelingExercise } from '../types';

interface Props {
  exercise: A2ImageLabelingExercise;
  onComplete?: (correct: boolean, score: number) => void;
  exerciseId?: string;
}

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function ImageLabelingWide({ exercise, onComplete }: Props) {
  const t = useT();
  const { savedState, saveState } = useExercisePersistence(exercise.id);
  const s = savedState as any;
  const [selectedLabels, setSelectedLabels] = useState<{ [imageId: string]: string }>(() => s?.selectedLabels ?? {});
  const [validation, setValidation] = useState<{ [imageId: string]: boolean | null }>(() => s?.validation ?? {});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(() => s?.isSubmitted ?? false);
  const mounted = useRef(false);

  const shuffledOptions = useMemo(
    () => (exercise.options ? shuffleArray(exercise.options) : undefined),
    [exercise.options],
  );

  // Per-image options take priority over the shared pool (shuffled once per image).
  const shuffledOptionsByImage = useMemo(() => {
    const map: Record<string, string[]> = {};
    exercise.images.forEach(img => {
      if (img.options && img.options.length > 0) {
        map[img.id] = shuffleArray(img.options);
      }
    });
    return map;
  }, [exercise.images]);

  useEffect(() => {
    if (!mounted.current) { mounted.current = true; return; }
    saveState({ selectedLabels, validation, isSubmitted });
  }, [selectedLabels, validation, isSubmitted]);

  const handleSelect = (imageId: string, label: string) => {
    setSelectedLabels(prev => ({ ...prev, [imageId]: label }));
    if (isSubmitted) {
      setIsSubmitted(false);
      setValidation({});
    }
  };

  const handleReset = () => {
    setSelectedLabels({});
    setValidation({});
    setIsSubmitted(false);
    saveState({ selectedLabels: {}, validation: {}, isSubmitted: false });
  };

  const handleSubmit = () => {
    const newValidation: { [imageId: string]: boolean } = {};
    let correctCount = 0;

    exercise.images.forEach(image => {
      const selected = selectedLabels[image.id];
      const isCorrect = selected === image.correctLabel;
      newValidation[image.id] = isCorrect;
      if (isCorrect) correctCount++;
    });

    setValidation(newValidation);
    setIsSubmitted(true);

    if (onComplete) {
      const totalImages = exercise.images.length;
      const score = exercise.points ? (correctCount / totalImages) * exercise.points : correctCount;
      onComplete(correctCount === totalImages, score);
    }
  };

  return (
    <div className="bg-white rounded-xl p-8 md:p-10 shadow-md">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5 mb-8">
        {exercise.images.map((image) => {
          const selectedLabel = selectedLabels[image.id];
          const validationResult = validation[image.id];
          const imageOptions = shuffledOptionsByImage[image.id] ?? shuffledOptions;

          return (
            <div
              key={image.id}
              className={`
                relative rounded-xl border-2 p-3 md:p-4 transition-all shadow-sm flex flex-col
                ${validationResult === true ? 'border-green-500 bg-green-50' : ''}
                ${validationResult === false ? 'border-[#D25A45] bg-[#FCE2DE]/40' : ''}
                ${validationResult == null ? 'border-gray-200 bg-white' : ''}
              `}
            >
              <div className="flex items-center justify-center mb-3 min-h-[120px] md:min-h-[140px]">
                {image.imageUrl?.startsWith('http') || image.imageUrl?.startsWith('/') ? (
                  <Image
                    src={image.imageUrl}
                    alt=""
                    width={140}
                    height={140}
                    className="object-contain rounded-lg w-full max-h-[120px] md:max-h-[140px] h-auto"
                  />
                ) : (
                  <div className="text-7xl">{image.imageUrl}</div>
                )}
              </div>

              {imageOptions ? (
                <select
                  value={selectedLabel || ''}
                  onChange={(e) => handleSelect(image.id, e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-300 bg-white text-base font-medium focus:border-bolt-primary focus:ring-2 focus:ring-bolt-primary focus:ring-offset-2 transition-all"
                >
                  <option value="">{t('exercise.selectOption')}</option>
                  {imageOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  value={selectedLabel || ''}
                  onChange={(e) => handleSelect(image.id, e.target.value)}
                  placeholder={t('exercise.selectOption')}
                  className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-300 bg-white text-base font-medium focus:border-bolt-primary focus:ring-2 focus:ring-bolt-primary focus:ring-offset-2 transition-all"
                />
              )}

              {isSubmitted && validationResult != null && (
                <div className="absolute top-3 right-3">
                  {validationResult ? (
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-md">
                      <Check className="w-5 h-5 text-white" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 bg-[#D25A45] rounded-full flex items-center justify-center shadow-md">
                      <X className="w-5 h-5 text-white" />
                    </div>
                  )}
                </div>
              )}

              {isSubmitted && validationResult === false && (
                <p className="mt-3 text-sm text-[#683229] font-medium">
                  {t('exercise.correctLabel')} {image.correctLabel}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex gap-3 mt-6">
        <Button
          onClick={handleSubmit}
          className="bg-[#32C189] hover:bg-[#257958] text-base font-semibold px-8 py-6 w-full sm:w-auto min-h-[52px] active:scale-95 transition-transform"
        >
          {t('exercise.check')}
        </Button>
        <Button variant="outline" onClick={handleReset} className="text-base font-semibold px-6 py-3 min-h-[48px] active:scale-95 transition-transform rounded-lg border-2">
          <RotateCcw className="w-4 h-4 mr-2" />
          {t('exercise.reset')}
        </Button>
      </div>

      {isSubmitted && (
        <div className="mt-6 p-5 rounded-xl bg-[#DAF6EB] animate-in fade-in duration-300">
          <p className="text-base font-semibold text-gray-800">
            {t('exercise.result')} {Object.values(validation).filter(v => v === true).length} / {exercise.images.length} {t('exercise.correct_n')}
          </p>
        </div>
      )}
    </div>
  );
}
