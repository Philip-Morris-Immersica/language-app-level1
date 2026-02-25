'use client';

import { useState, useRef } from 'react';
import { Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useT } from '@/i18n/useT';

interface ReadingTextProps {
  audioUrl?: string;
  paragraphs: string[];
}

export function ReadingText({ audioUrl, paragraphs }: ReadingTextProps) {
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
      audio.onerror = () => setIsPlaying(false);
      audio.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="relative bg-white rounded-xl p-6 md:p-10 shadow-md">
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

      <div className="space-y-4">
        {paragraphs.map((paragraph, index) => (
          <p key={index} className="text-base md:text-lg text-gray-800 leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}
