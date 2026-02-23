'use client';

import { useState, useRef } from 'react';
import { Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useT } from '@/i18n/useT';

interface DialogueLine {
  speaker?: string;
  text: string;
}

interface DialogueSection {
  id: string;
  lines: DialogueLine[];
}

interface DialoguesProps {
  order?: number;
  title?: string;
  subtitle?: string;
  audioUrl?: string;
  sections: DialogueSection[];
}

export function Dialogues({ subtitle, audioUrl, sections }: DialoguesProps) {
  const t = useT();
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
    <div className="relative bg-white rounded-xl p-6 md:p-10 shadow-md">
      {/* Audio button */}
      {audioUrl && (
        <div className="flex justify-end mb-6">
          <Button
            onClick={handlePlayAudio}
            className="bg-[#8FC412] hover:bg-[#7DAD0E] text-white px-6 py-3 rounded-lg font-semibold text-base shadow-md active:scale-95 transition-all flex items-center gap-2"
          >
            {isPlaying ? (
              <>
                <Pause className="w-5 h-5" />
                {t('exercise.stop')}
              </>
            ) : (
              <>
                <Play className="w-5 h-5" />
                {t('exercise.listen')}
              </>
            )}
          </Button>
        </div>
      )}

      {/* Dialogue sections */}
      <div className="space-y-6">
        {sections.map((section) => (
          <div
            key={section.id}
            className="bg-white rounded-xl border-2 border-gray-200 p-6 shadow-sm"
          >
            {/* Section label */}
            <div className="flex items-center gap-2 mb-4">
              <span className="w-8 h-8 bg-[#8FC412] text-white rounded-full flex items-center justify-center font-bold text-sm">
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
          {t('exercise.readInPairs')}
        </p>
      </div>
    </div>
  );
}
