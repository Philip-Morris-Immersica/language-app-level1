'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useT } from '@/i18n/useT';
import type { ImageLabelingExercise } from '@/content/types';

interface ImageLabelingProps {
  exercise: ImageLabelingExercise;
  onComplete?: (correct: boolean, score: number) => void;
}

export function ImageLabeling({ exercise, onComplete }: ImageLabelingProps) {
  const t = useT();
  const [selectedLabels, setSelectedLabels] = useState<{ [imageId: string]: string }>({});
  const [validation, setValidation] = useState<{ [imageId: string]: boolean | null }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [flippedCards, setFlippedCards] = useState<{ [imageId: string]: boolean }>({});

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'bg-BG';
    utterance.rate = 0.85;
    window.speechSynthesis.speak(utterance);
  };

  const handleCardClick = (imageId: string, correctLabel: string) => {
    setFlippedCards(prev => ({ ...prev, [imageId]: !prev[imageId] }));
    if (!flippedCards[imageId]) {
      speak(correctLabel);
    }
  };

  const handleSelect = (imageId: string, label: string) => {
    if (isSubmitted) return;
    
    setSelectedLabels(prev => ({ ...prev, [imageId]: label }));
    
    if (validation[imageId] !== null) {
      setValidation(prev => ({ ...prev, [imageId]: null }));
    }
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

  const isLabelUsed = (label: string) => {
    return Object.values(selectedLabels).includes(label);
  };

  // Flags display type - flip cards
  if (exercise.displayType === 'flags') {
    return (
      <div className="bg-white rounded-xl p-6 md:p-8 shadow-md">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {exercise.images.map((image) => {
            const isFlipped = flippedCards[image.id];

            return (
              <div
                key={image.id}
                className="perspective-1000 h-48"
                style={{ perspective: '1000px' }}
              >
                <div
                  onClick={() => handleCardClick(image.id, image.correctLabel)}
                  className="relative w-full h-full cursor-pointer transition-transform duration-500 preserve-3d"
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                  }}
                >
                  {/* Front - Flag */}
                  <div
                    className="absolute w-full h-full backface-hidden bg-white rounded-xl p-4 shadow-md flex items-center justify-center"
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={image.imageUrl}
                        alt="Flag"
                        fill
                        className="object-contain rounded-lg"
                        sizes="(max-width: 768px) 50vw, 33vw"
                      />
                    </div>
                  </div>

                  {/* Back - Country name */}
                  <div
                    className="absolute w-full h-full backface-hidden bg-[#8FC412] rounded-xl p-4 shadow-md flex items-center justify-center"
                    style={{
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                    }}
                  >
                    <p className="text-lg md:text-xl font-bold text-white text-center">
                      {image.correctLabel}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 p-4 rounded-lg bg-white shadow-sm">
          <p className="text-sm text-gray-700 text-center italic">
            {t('exercise.listen')}
          </p>
        </div>
      </div>
    );
  }

  // Default display type - original grid layout
  return (
    <div className="bg-white rounded-xl p-8 md:p-10 shadow-md">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {exercise.images.map((image) => {
          const selectedLabel = selectedLabels[image.id];
          const validationResult = validation[image.id];

          return (
            <div
              key={image.id}
              className={`
                relative rounded-xl border-2 p-6 transition-all shadow-sm
                ${validationResult === true ? 'border-green-500 bg-green-50' : ''}
                ${validationResult === false ? 'border-red-500 bg-red-50' : ''}
                ${validationResult === null ? 'border-gray-200 bg-white' : ''}
              `}
            >
              {/* Image or Emoji */}
              <div className="flex items-center justify-center mb-4 min-h-[120px]">
                {image.imageUrl?.startsWith('http') || image.imageUrl?.startsWith('/') ? (
                  <Image
                    src={image.imageUrl}
                    alt="Flag"
                    width={200}
                    height={120}
                    className="max-w-full h-auto max-h-[120px] rounded-lg shadow-md"
                  />
                ) : (
                  <div className="text-8xl">
                    {image.imageUrl}
                  </div>
                )}
              </div>

              {/* Label selection */}
              {!isSubmitted && exercise.options ? (
                <select
                  value={selectedLabel || ''}
                  onChange={(e) => handleSelect(image.id, e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 bg-white text-base font-medium focus:border-bolt-primary focus:ring-2 focus:ring-bolt-primary focus:ring-offset-2 transition-all"
                >
                  <option value="">{t('exercise.selectOption')}</option>
                  {exercise.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : !isSubmitted ? (
                <input
                  type="text"
                  value={selectedLabel || ''}
                  onChange={(e) => handleSelect(image.id, e.target.value)}
                  placeholder={t('exercise.selectOption')}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 bg-white text-base font-medium focus:border-bolt-primary focus:ring-2 focus:ring-bolt-primary focus:ring-offset-2 transition-all"
                />
              ) : (
                <div className="text-center">
                  <p className="text-lg font-semibold text-gray-800">
                    {selectedLabel || '(Без отговор)'}
                  </p>
                </div>
              )}

              {/* Validation icon */}
              {isSubmitted && validationResult !== null && (
                <div className="absolute top-3 right-3">
                  {validationResult ? (
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-md">
                      <Check className="w-5 h-5 text-white" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center shadow-md">
                      <X className="w-5 h-5 text-white" />
                    </div>
                  )}
                </div>
              )}

              {/* Show correct answer if wrong */}
              {isSubmitted && validationResult === false && (
                  <p className="mt-3 text-sm text-red-700 font-medium">
                  {t('exercise.correctLabel')} {image.correctLabel}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {!isSubmitted && (
        <Button
          onClick={handleSubmit}
          className="mt-4 bg-[#8FC412] hover:bg-[#8FC412]-hover text-base font-semibold px-8 py-6 w-full sm:w-auto min-h-[52px] active:scale-95 transition-transform"
          disabled={Object.keys(selectedLabels).length < exercise.images.length}
        >
          {t('exercise.check')}
        </Button>
      )}

      {isSubmitted && (
        <div className="mt-6 p-5 rounded-xl bg-[#EEF7C8] animate-in fade-in duration-300">
          <p className="text-base font-semibold text-gray-800">
            {t('exercise.result')} {Object.values(validation).filter(v => v === true).length} / {exercise.images.length} {t('exercise.correct_n')}
          </p>
        </div>
      )}
    </div>
  );
}
