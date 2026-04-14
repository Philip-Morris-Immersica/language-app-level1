'use client';

import { useState } from 'react';
import { Volume2 } from 'lucide-react';
import { useT } from '@/i18n/useT';
import { useLanguage } from '@/i18n/LanguageContext';
import { InlineTranslation } from '@/components/InlineTranslation';
import { getTtsAudioPath, playTtsAudio, speakBulgarian, stopTtsAudio } from '@/lib/tts';

interface DialogueLine {
  speaker?: string;
  /** TTS generation only; not rendered */
  voiceGender?: 'male' | 'female';
  text: string;
  translations?: Record<string, string>;
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
  exerciseId?: string;
}

export function Dialogues({ subtitle, sections, exerciseId }: DialoguesProps) {
  const t = useT();
  const { lang } = useLanguage();
  const [playingLine, setPlayingLine] = useState<string | null>(null);
  const [revealedSections, setRevealedSections] = useState<Set<string>>(new Set());

  const toggleSection = (sectionId: string) => {
    setRevealedSections(prev => {
      const next = new Set(prev);
      if (next.has(sectionId)) next.delete(sectionId);
      else next.add(sectionId);
      return next;
    });
  };

  const handleLineClick = (e: React.MouseEvent, section: DialogueSection, lineIndex: number) => {
    e.stopPropagation();
    const line = section.lines[lineIndex];
    const lineKey = `${section.id}-line-${lineIndex}`;

    if (playingLine === lineKey) {
      stopTtsAudio();
      setPlayingLine(null);
      return;
    }

    setPlayingLine(lineKey);
    const audioFile = exerciseId ? `${exerciseId}-${section.id}-line-${lineIndex}` : '';
    const audioPath = audioFile
      ? getTtsAudioPath(exerciseId!, 'dialogues', audioFile)
      : '';
    const rawText = line.text.replace(/^—\s*/, '');
    playTtsAudio(audioPath, rawText);
    setTimeout(() => setPlayingLine(null), 3000);
  };

  return (
    <div className="relative bg-white rounded-xl p-6 md:p-10 shadow-md">
      {lang !== 'bg' && (
        <p className="text-xs text-gray-400 text-center mb-4 italic">
          {t('exercise.tapToTranslate')}
        </p>
      )}

      <div className="space-y-6">
        {sections.map((section) => {
          const isRevealed = revealedSections.has(section.id);
          return (
            <div
              key={section.id}
              className="bg-white rounded-xl border-2 border-gray-200 p-6 shadow-sm transition-all hover:border-[#8FC412]/50"
            >
              <div
                onClick={() => toggleSection(section.id)}
                className="flex items-center gap-2 mb-4 cursor-pointer"
              >
                <span className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm bg-[#8FC412] text-white">
                  {section.id}
                </span>
              </div>

              <div className="space-y-3">
                {section.lines.map((line, index) => {
                  const lineKey = `${section.id}-line-${index}`;
                  const isLinePlaying = playingLine === lineKey;
                  return (
                    <div
                      key={index}
                      onClick={(e) => handleLineClick(e, section, index)}
                      className={`flex items-start gap-3 rounded-lg px-3 py-2 -mx-3 cursor-pointer transition-colors active:scale-[0.99] ${
                        isLinePlaying
                          ? 'bg-[#f4faee] border border-[#8FC412]/40'
                          : 'hover:bg-gray-50 border border-transparent'
                      }`}
                    >
                      <Volume2 className={`w-4 h-4 mt-1.5 shrink-0 transition-colors ${
                        isLinePlaying ? 'text-[#8FC412]' : 'text-gray-300'
                      }`} />
                      <div className="flex-1">
                        <p className="text-base md:text-lg text-gray-800 leading-relaxed">
                          {line.speaker && (
                            <span className="font-bold text-[#0279C3] mr-1">{line.speaker}:</span>
                          )}
                          {line.text}
                        </p>
                        <InlineTranslation text={line.text} visible={isRevealed} translations={line.translations} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 p-4 rounded-lg bg-[#f4faee] border-2 border-[#8FC412]/40">
        <p className="text-sm text-gray-600 text-center">
          {t('exercise.clickLineToListen')}
        </p>
      </div>
    </div>
  );
}
