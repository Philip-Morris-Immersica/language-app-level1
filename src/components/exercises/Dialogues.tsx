'use client';

import { useState, useRef } from 'react';
import { MessageSquare, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DialogueLine {
  speaker?: string;
  text: string;
}

interface DialogueSection {
  id: string;
  lines: DialogueLine[];
}

interface DialoguesProps {
  order: number;
  title: string;
  subtitle?: string;
  audioUrl?: string;
  sections: DialogueSection[];
}

export function Dialogues({ order, title, subtitle, audioUrl, sections }: DialoguesProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlayAudio = () => {
    if (!audioUrl) return;

    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    } else {
      const audio = new Audio(audioUrl);
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
    <div className="relative bg-gradient-to-br from-[#F8F5EE] to-[#F0EDE0] rounded-xl border-2 border-[#8B9D5F] p-6 md:p-10 shadow-md">
      {/* Header with icon and audio button */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-[#6B8543] rounded-xl flex items-center justify-center shadow-md">
            <MessageSquare className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              {title}
            </h2>
            {subtitle && (
              <p className="text-sm md:text-base text-gray-600 mt-1">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {audioUrl && (
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

      {/* Dialogue sections */}
      <div className="space-y-6">
        {sections.map((section) => (
          <div
            key={section.id}
            className="bg-white rounded-xl border-2 border-gray-200 p-6 shadow-sm"
          >
            {/* Section label */}
            <div className="flex items-center gap-2 mb-4">
              <span className="w-8 h-8 bg-[#6B8543] text-white rounded-full flex items-center justify-center font-bold text-sm">
                {section.id}
              </span>
            </div>

            {/* Dialogue lines */}
            <div className="space-y-3">
              {section.lines.map((line, index) => (
                <div key={index} className="flex items-start gap-3">
                  <span className="text-2xl text-gray-400 leading-none mt-1">–</span>
                  <p className="text-base md:text-lg text-gray-800 leading-relaxed">
                    {line.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Note at bottom */}
      <div className="mt-8 p-4 rounded-lg bg-white border-2 border-[#8B9D5F]">
        <p className="text-sm text-gray-700 text-center italic">
          Прочетете диалозите по двойки
        </p>
      </div>
    </div>
  );
}
