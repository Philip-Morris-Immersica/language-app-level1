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
  const [speakingSection, setSpeakingSection] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Audio file playback (when audioUrl is provided)
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

  // TTS for a section (when no audioUrl)
  const handleSectionClick = (section: DialogueSection) => {
    if (audioUrl) return;

    window.speechSynthesis.cancel();

    if (speakingSection === section.id) {
      setSpeakingSection(null);
      return;
    }

    const fullText = section.lines.map(l => l.text).join('. ');
    const utterance = new SpeechSynthesisUtterance(fullText);
    utterance.lang = 'bg-BG';
    utterance.rate = 0.85;
    utterance.onend = () => setSpeakingSection(null);
    utterance.onerror = () => setSpeakingSection(null);

    setSpeakingSection(section.id);
    window.speechSynthesis.speak(utterance);
  };

  const useTTS = !audioUrl;

  return (
    <div className="relative bg-white rounded-xl p-6 md:p-10 shadow-md">
      {/* Audio file button */}
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
        {sections.map((section) => {
          const isSpeaking = speakingSection === section.id;
          return (
            <div
              key={section.id}
              onClick={() => handleSectionClick(section)}
              className={`
                bg-white rounded-xl border-2 p-6 shadow-sm transition-all
                ${useTTS
                  ? isSpeaking
                    ? 'border-[#8FC412] bg-[#f4faee] cursor-pointer scale-[1.01]'
                    : 'border-gray-200 cursor-pointer hover:border-[#8FC412] hover:bg-[#f9fdf2] active:scale-[0.99]'
                  : 'border-gray-200'
                }
              `}
            >
              {/* Section label + speaking indicator */}
              <div className="flex items-center gap-2 mb-4">
                <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
                  isSpeaking ? 'bg-[#8FC412] text-white' : 'bg-[#8FC412] text-white'
                }`}>
                  {section.id}
                </span>
                {isSpeaking && (
                  <span className="flex gap-0.5 items-end h-4">
                    {[1, 2, 3].map(i => (
                      <span
                        key={i}
                        className="w-1 bg-[#8FC412] rounded-full animate-bounce"
                        style={{ height: `${8 + i * 4}px`, animationDelay: `${i * 0.15}s` }}
                      />
                    ))}
                  </span>
                )}
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
          );
        })}
      </div>

      {/* Note at bottom */}
      <div className="mt-8 p-4 rounded-lg bg-white border-2 border-[#8B9D5F]">
        <p className="text-sm text-gray-700 text-center italic">
          {useTTS ? t('exercise.clickToRead') : t('exercise.readInPairs')}
        </p>
      </div>
    </div>
  );
}
