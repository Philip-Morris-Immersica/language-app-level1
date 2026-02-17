'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { ImageLabelingExercise } from '@/content/types';

interface ImageLabelingProps {
  exercise: ImageLabelingExercise;
  onComplete?: (correct: boolean, score: number) => void;
  exerciseNumber?: number;
}

export function ImageLabeling({ exercise, onComplete, exerciseNumber }: ImageLabelingProps) {
  const [selectedLabels, setSelectedLabels] = useState<{ [imageId: string]: string }>({});
  const [validation, setValidation] = useState<{ [imageId: string]: boolean | null }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSelect = (imageId: string, label: string) => {
    if (isSubmitted) return;
    
    setSelectedLabels(prev => ({ ...prev, [imageId]: label }));
    
    // Clear validation for this image
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

  // Flags display type - special layout
  if (exercise.displayType === 'flags') {
    return (
      <div className="relative bg-[#F5F1E8] rounded-xl border-2 border-[#8B9D5F] p-6 md:p-8 shadow-sm">
        {/* Exercise number badge */}
        {exerciseNumber && (
          <div className="absolute -top-4 -left-4 w-12 h-12 bg-bolt-primary text-white rounded-full flex items-center justify-center font-bold text-lg shadow-md z-10">
            {exerciseNumber}
          </div>
        )}
        
        <p className="text-xl font-bold text-gray-800 mb-6">
          {exercise.instruction}
        </p>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Flags grid */}
          <div className="flex-1">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {exercise.images.map((image) => {
                const selectedLabel = selectedLabels[image.id];
                const validationResult = validation[image.id];

                return (
                  <div
                    key={image.id}
                    className={`
                      relative rounded-xl border-2 p-4 transition-all shadow-sm bg-white
                      ${validationResult === true ? 'border-green-500 bg-green-50' : ''}
                      ${validationResult === false ? 'border-red-500 bg-red-50' : ''}
                      ${validationResult === null ? 'border-gray-300' : ''}
                    `}
                  >
                    {/* Flag Image */}
                    <div className="flex items-center justify-center mb-3 min-h-[80px]">
                      <div className="relative w-full h-[80px]">
                        <Image
                          src={image.imageUrl}
                          alt="Flag"
                          fill
                          className="object-contain rounded-lg"
                          sizes="(max-width: 768px) 50vw, 33vw"
                        />
                      </div>
                    </div>

                    {/* Input line or label */}
                    {!isSubmitted ? (
                      <div className="border-b-2 border-gray-400 min-h-[30px] text-center py-1">
                        <span className="text-sm text-gray-600 font-medium">
                          {selectedLabel || '___________'}
                        </span>
                      </div>
                    ) : (
                      <div className="text-center py-1">
                        <p className="text-sm font-semibold text-gray-800">
                          {selectedLabel || '(Без отговор)'}
                        </p>
                      </div>
                    )}

                    {/* Validation icon */}
                    {isSubmitted && validationResult !== null && (
                      <div className="absolute top-2 right-2">
                        {validationResult ? (
                          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                        ) : (
                          <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                            <X className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </div>
                    )}

                    {/* Show correct answer if wrong */}
                    {isSubmitted && validationResult === false && (
                      <p className="mt-2 text-xs text-red-700 font-medium text-center">
                        Правилно: {image.correctLabel}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Dropdown list on the side */}
          {!isSubmitted && exercise.options && (
            <div className="lg:w-64">
              <div className="bg-[#FFFAED] border-2 border-[#6B7B3F] rounded-xl p-4 sticky top-4">
                <p className="text-sm font-bold text-gray-700 mb-3">Изберете държава:</p>
                <div className="space-y-2">
                  {exercise.options.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        // Find first unmatched image and assign this option
                        const unmatchedImage = exercise.images.find(
                          img => !selectedLabels[img.id]
                        );
                        if (unmatchedImage) {
                          handleSelect(unmatchedImage.id, option);
                        }
                      }}
                      disabled={isLabelUsed(option)}
                      className={`
                        w-full px-3 py-2 rounded-lg text-left text-sm font-medium transition-all
                        ${isLabelUsed(option) 
                          ? 'bg-gray-200 text-gray-400 cursor-not-allowed line-through' 
                          : 'bg-white hover:bg-[#F5F1E8] border border-gray-300 hover:border-[#6B7B3F] cursor-pointer'
                        }
                      `}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {!isSubmitted && (
          <Button
            onClick={handleSubmit}
            className="mt-6 bg-[#6B8543] hover:bg-[#5A7238] text-white text-base font-semibold px-8 py-6 w-full sm:w-auto min-h-[52px] active:scale-95 transition-transform"
            disabled={Object.keys(selectedLabels).length < exercise.images.length}
          >
            Провери
          </Button>
        )}

        {isSubmitted && (
          <div className="mt-6 p-5 rounded-xl bg-white border-2 border-[#8B9D5F] animate-in fade-in duration-300">
            <p className="text-base font-semibold text-gray-800">
              Резултат: {Object.values(validation).filter(v => v === true).length} / {exercise.images.length} правилни отговора
            </p>
          </div>
        )}
      </div>
    );
  }

  // Default display type - original grid layout
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
                ${validationResult === null ? 'border-bolt-secondary bg-white' : ''}
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
                  <option value="">Изберете...</option>
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
                  placeholder="Въведете..."
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
                  Правилно: {image.correctLabel}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {!isSubmitted && (
        <Button
          onClick={handleSubmit}
          className="mt-4 bg-bolt-primary hover:bg-bolt-primary-hover text-base font-semibold px-8 py-6 w-full sm:w-auto min-h-[52px] active:scale-95 transition-transform"
          disabled={Object.keys(selectedLabels).length < exercise.images.length}
        >
          Провери
        </Button>
      )}

      {isSubmitted && (
        <div className="mt-6 p-5 rounded-xl bg-bolt-secondary-light border-2 border-bolt-secondary animate-in fade-in duration-300">
          <p className="text-base font-semibold text-gray-800">
            Резултат: {Object.values(validation).filter(v => v === true).length} / {exercise.images.length} правилни отговора
          </p>
        </div>
      )}
    </div>
  );
}
