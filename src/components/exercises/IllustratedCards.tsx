'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { BookOpen, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { IllustratedCardsExercise } from '@/content/types';

interface IllustratedCardsProps {
  exercise: IllustratedCardsExercise;
  onComplete?: (correct: boolean, score: number) => void;
  exerciseNumber?: number;
}

export function IllustratedCards({ exercise, onComplete, exerciseNumber }: IllustratedCardsProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlayAudio = () => {
    if (!exercise.audioUrl) return;

    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    } else {
      const audio = new Audio(exercise.audioUrl);
      audioRef.current = audio;
      
      audio.onended = () => setIsPlaying(false);
      audio.onerror = () => {
        console.error('Audio failed to load');
        setIsPlaying(false);
      };
      
      audio.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="relative bg-[#F8F5EE] rounded-xl border-2 border-[#8B9D5F] p-6 md:p-8 shadow-sm">
      {/* Exercise number badge */}
      {exerciseNumber && (
        <div className="absolute -top-4 -left-4 w-12 h-12 bg-bolt-primary text-white rounded-full flex items-center justify-center font-bold text-lg shadow-md z-10">
          {exerciseNumber}
        </div>
      )}

      {/* Header with title and audio button */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#6B8543] rounded-lg flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-gray-800">
            {exercise.title}
          </h3>
        </div>
        
        {exercise.audioUrl && (
          <Button
            onClick={handlePlayAudio}
            className="bg-[#6B8543] hover:bg-[#5A7238] text-white px-6 py-3 rounded-lg font-semibold text-base shadow-md active:scale-95 transition-all flex items-center gap-2"
          >
            {isPlaying ? (
              <>
                <Pause className="w-5 h-5" />
                Спри
              </>
            ) : (
              <>
                <Play className="w-5 h-5" />
                Слушай
              </>
            )}
          </Button>
        )}
      </div>

      {/* Instruction */}
      {exercise.instruction && (
        <p className="text-lg text-gray-700 mb-6">
          {exercise.instruction}
        </p>
      )}

      {/* Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {exercise.cards.map((card) => (
          <div
            key={card.id}
            className="bg-white rounded-xl border-2 border-gray-200 p-4 shadow-sm hover:shadow-md transition-all hover:scale-105 cursor-pointer"
          >
            {/* Image */}
            <div className="flex items-center justify-center mb-3 min-h-[120px] md:min-h-[150px]">
              <div className="relative w-full h-[120px] md:h-[150px]">
                <Image
                  src={card.imageUrl}
                  alt={card.label}
                  fill
                  className="object-contain rounded-lg"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              </div>
            </div>

            {/* Label */}
            <div className="text-center">
              <p className="text-base md:text-lg font-semibold text-gray-800">
                {card.label}
              </p>
              {/* Sublabels */}
              {card.sublabels && card.sublabels.length > 0 && (
                <div className="mt-2 space-y-0.5">
                  {card.sublabels.map((sublabel, index) => (
                    <p key={index} className="text-sm md:text-base text-gray-700">
                      {sublabel}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Optional note at bottom */}
      <div className="mt-6 text-sm text-gray-600 text-center italic">
        Речник – Урок 1
      </div>
    </div>
  );
}
