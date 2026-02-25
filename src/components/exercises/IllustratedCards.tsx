'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { Play, Pause, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { IllustratedCardsExercise } from '@/content/types';

interface IllustratedCardsProps {
  exercise: IllustratedCardsExercise;
  onComplete?: (correct: boolean, score: number) => void;
}

export function IllustratedCards({ exercise, onComplete }: IllustratedCardsProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const speak = (label: string, sublabels?: string[]) => {
    window.speechSynthesis.cancel();
    const parts = [label, ...(sublabels || [])];
    const text = parts.join('. ');
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'bg-BG';
    utterance.rate = 0.85;
    window.speechSynthesis.speak(utterance);
  };

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
    <div className="relative bg-white rounded-xl p-6 md:p-8 shadow-md">
      {/* Audio button */}
      {exercise.audioUrl && (
        <div className="flex justify-end mb-4">
          <Button
            onClick={handlePlayAudio}
            className="bg-[#8FC412] hover:bg-[#7DAD0E] text-white px-6 py-3 rounded-lg font-semibold text-base shadow-md active:scale-95 transition-all flex items-center gap-2"
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
        </div>
      )}

      {/* Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {exercise.cards.map((card) => (
          <div
            key={card.id}
            onClick={() => speak(card.label, card.sublabels)}
            className="relative bg-white rounded-xl border-2 border-gray-200 p-4 shadow-sm hover:shadow-md transition-all hover:scale-105 cursor-pointer active:scale-95"
          >
            {/* Speaker icon */}
            <div className="absolute top-2 right-2 text-gray-400">
              <Volume2 className="w-4 h-4" />
            </div>

            {/* Image */}
            <div className="flex items-center justify-center mb-3 min-h-[120px] md:min-h-[150px]">
              <div className="relative w-full h-[120px] md:h-[150px] bg-white">
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
