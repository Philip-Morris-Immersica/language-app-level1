'use client';

import { useState, useRef, useEffect } from 'react';
import { Volume2, Play, Square } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useT } from '@/i18n/useT';
import { useLanguage } from '@/i18n/LanguageContext';
import { InlineTranslation } from '@/components/InlineTranslation';
import { getTtsAudioPath, playTtsAudio, stopTtsAudio } from '@/lib/tts';

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
  const [playingSection, setPlayingSection] = useState<string | null>(null);
  const [revealedSections, setRevealedSections] = useState<Set<string>>(new Set());
  const [revealedLines, setRevealedLines] = useState<Set<string>>(new Set());
  const sectionPlaybackRef = useRef<{ cancelled: boolean } | null>(null);

  useEffect(() => {
    return () => {
      if (sectionPlaybackRef.current) sectionPlaybackRef.current.cancelled = true;
      stopTtsAudio();
    };
  }, []);

  const stopSectionPlayback = () => {
    if (sectionPlaybackRef.current) sectionPlaybackRef.current.cancelled = true;
    sectionPlaybackRef.current = null;
    stopTtsAudio();
    setPlayingSection(null);
    setPlayingLine(null);
  };

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
    if (playingSection) stopSectionPlayback();
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
    playTtsAudio(audioPath, rawText, undefined, () => setPlayingLine(null));

    // Reveal translation for this specific line
    setRevealedLines(prev => {
      const next = new Set(prev);
      if (next.has(lineKey)) next.delete(lineKey);
      else next.add(lineKey);
      return next;
    });
  };

  const handlePlaySection = (e: React.MouseEvent, section: DialogueSection) => {
    e.stopPropagation();
    if (playingSection === section.id) {
      stopSectionPlayback();
      return;
    }
    if (playingSection || playingLine) stopSectionPlayback();
    if (!exerciseId) return;

    const token = { cancelled: false };
    sectionPlaybackRef.current = token;
    setPlayingSection(section.id);

    const playNext = (i: number) => {
      if (token.cancelled) return;
      if (i >= section.lines.length) {
        if (sectionPlaybackRef.current === token) sectionPlaybackRef.current = null;
        setPlayingSection(null);
        setPlayingLine(null);
        return;
      }
      const line = section.lines[i];
      const lineKey = `${section.id}-line-${i}`;
      setPlayingLine(lineKey);
      const audioPath = getTtsAudioPath(
        exerciseId,
        'dialogues',
        `${exerciseId}-${section.id}-line-${i}`,
      );
      const rawText = line.text.replace(/^—\s*/, '');
      playTtsAudio(audioPath, rawText, undefined, () => {
        if (token.cancelled) return;
        // Small gap between lines so the dialogue feels natural
        window.setTimeout(() => {
          if (!token.cancelled) playNext(i + 1);
        }, 350);
      });
    };

    playNext(0);
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
              className="bg-white rounded-xl border-2 border-gray-200 p-6 shadow-sm transition-all hover:border-[#32C189]/50"
            >
              <div className="flex items-center justify-between gap-2 mb-4">
                <div
                  onClick={() => toggleSection(section.id)}
                  className="flex items-center gap-2 cursor-pointer flex-1"
                >
                  <span className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm bg-[#32C189] text-white">
                    {section.id}
                  </span>
                </div>
                <Button
                  onClick={(e) => handlePlaySection(e, section)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm shadow-md active:scale-95 transition-all ${
                    playingSection === section.id
                      ? 'bg-[#D25A45] hover:bg-[#9C4637] text-white'
                      : 'bg-white border-2 border-[#32C189] text-[#1F5741] hover:bg-[#DAF6EB]'
                  }`}
                >
                  {playingSection === section.id ? (
                    <><Square className="w-4 h-4" /> {t('exercise.stop')}</>
                  ) : (
                    <><Play className="w-4 h-4" /> {t('exercise.listen')}</>
                  )}
                </Button>
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
                          ? 'bg-[#DAF6EB]/30 border border-[#32C189]/40'
                          : 'hover:bg-gray-50 border border-transparent'
                      }`}
                    >
                      <Volume2 className={`w-4 h-4 mt-1.5 shrink-0 transition-colors ${
                        isLinePlaying ? 'text-[#32C189]' : 'text-gray-300'
                      }`} />
                      <div className="flex-1">
                        <p className="text-base md:text-lg text-gray-800 leading-relaxed">
                          {line.speaker && (
                            <span className="font-bold text-[#0072BC] mr-1">{line.speaker}:</span>
                          )}
                          {line.text}
                        </p>
                        <InlineTranslation text={line.text} visible={revealedLines.has(lineKey) || isRevealed} translations={line.translations} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 p-4 rounded-lg bg-[#DAF6EB]/30 border-2 border-[#32C189]/40">
        <p className="text-sm text-gray-600 text-center">
          {t('exercise.clickLineToListen')}
        </p>
      </div>
    </div>
  );
}
