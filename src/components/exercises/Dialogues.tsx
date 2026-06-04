'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Volume2, Play, Square } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useT } from '@/i18n/useT';
import { useLanguage } from '@/i18n/LanguageContext';
import { InlineTranslation } from '@/components/InlineTranslation';
import { getTtsAudioPath, playTtsAudio, stopTtsAudio } from '@/lib/tts';
import { ImageLightbox } from '@/components/ImageLightbox';

interface DialogueLine {
  speaker?: string;
  voiceGender?: 'male' | 'female';
  text: string;
  translations?: Record<string, string>;
}

interface DialogueSection {
  id: string;
  bubbleSide?: 'left' | 'right';
  lines: DialogueLine[];
}

interface DialoguesProps {
  order?: number;
  title?: string;
  subtitle?: string;
  audioUrl?: string;
  imageUrl?: string;
  displayLayout?: 'list' | 'scene';
  sections: DialogueSection[];
  exerciseId?: string;
}

function SpeechBubble({
  side,
  sectionId,
  children,
  isPlaying,
}: {
  side: 'left' | 'right';
  sectionId: string;
  children: React.ReactNode;
  isPlaying?: boolean;
}) {
  return (
    <div
      className={`
        relative rounded-2xl border-2 px-4 pt-5 pb-3 shadow-sm transition-all max-w-full
        ${side === 'left' ? 'mr-auto lg:mr-4' : 'ml-auto lg:ml-4'}
        ${isPlaying ? 'border-[#32C189] bg-[#DAF6EB]/40' : 'border-[#CDE3F1] bg-white'}
      `}
    >
      <span className="absolute -top-3 left-3 min-w-[1.75rem] h-7 px-1.5 rounded-full bg-[#32C189] text-white text-xs font-bold flex items-center justify-center shadow-sm">
        {sectionId}
      </span>
      {children}
    </div>
  );
}

export function Dialogues({
  subtitle,
  sections,
  imageUrl,
  displayLayout = 'list',
  exerciseId,
}: DialoguesProps) {
  const t = useT();
  const { lang } = useLanguage();
  const [playingLine, setPlayingLine] = useState<string | null>(null);
  const [playingSection, setPlayingSection] = useState<string | null>(null);
  const [revealedSections, setRevealedSections] = useState<Set<string>>(new Set());
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
        window.setTimeout(() => {
          if (!token.cancelled) playNext(i + 1);
        }, 350);
      });
    };

    playNext(0);
  };

  const renderSectionLines = (section: DialogueSection) => {
    const isRevealed = revealedSections.has(section.id);
    return (
      <div className="space-y-2">
        <div className="flex items-center justify-end gap-2 mb-1">
          <Button
            onClick={(e) => handlePlaySection(e, section)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold text-xs shadow-sm active:scale-95 transition-all ${
              playingSection === section.id
                ? 'bg-[#D25A45] hover:bg-[#9C4637] text-white'
                : 'bg-white border-2 border-[#32C189] text-[#1F5741] hover:bg-[#DAF6EB]'
            }`}
          >
            {playingSection === section.id ? (
              <><Square className="w-3.5 h-3.5" /> {t('exercise.stop')}</>
            ) : (
              <><Play className="w-3.5 h-3.5" /> {t('exercise.listen')}</>
            )}
          </Button>
        </div>
        {section.lines.map((line, index) => {
          const lineKey = `${section.id}-line-${index}`;
          const isLinePlaying = playingLine === lineKey;
          return (
            <div
              key={index}
              onClick={(e) => handleLineClick(e, section, index)}
              className={`flex items-start gap-2 rounded-lg px-2 py-1.5 cursor-pointer transition-colors active:scale-[0.99] ${
                isLinePlaying ? 'bg-[#DAF6EB]/50' : 'hover:bg-gray-50'
              }`}
            >
              <Volume2 className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${
                isLinePlaying ? 'text-[#32C189]' : 'text-gray-300'
              }`} />
              <div className="flex-1 min-w-0">
                <p className="text-sm md:text-base text-gray-800 leading-snug">
                  {line.speaker && (
                    <span className="font-bold text-[#0072BC] mr-1">{line.speaker}:</span>
                  )}
                  {line.text}
                </p>
                <InlineTranslation text={line.text} visible={isRevealed} translations={line.translations} />
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderListSection = (section: DialogueSection) => {
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
                  <InlineTranslation text={line.text} visible={isRevealed} translations={line.translations} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const isScene = displayLayout === 'scene' && Boolean(imageUrl);
  const leftSections = sections.filter((s, i) => s.bubbleSide === 'left' || (!s.bubbleSide && i % 2 === 0));
  const rightSections = sections.filter((s, i) => s.bubbleSide === 'right' || (!s.bubbleSide && i % 2 === 1));

  return (
    <div className="relative bg-white rounded-xl p-6 md:p-10 shadow-md">
      {lang !== 'bg' && (
        <p className="text-xs text-gray-400 text-center mb-4 italic">
          {t('exercise.tapToTranslate')}
        </p>
      )}

      {isScene ? (
        <div className="max-w-5xl mx-auto">
          {/* Mobile: image on top */}
          <div className="flex justify-center mb-6 lg:hidden">
            <ImageLightbox src={imageUrl!} alt="">
              <div className="relative w-72 h-96">
                <Image
                  src={imageUrl!}
                  alt=""
                  fill
                  className="object-contain"
                  sizes="288px"
                />
              </div>
            </ImageLightbox>
          </div>

          <div className="hidden lg:grid lg:grid-cols-[minmax(0,1fr)_300px_minmax(0,1fr)] gap-x-4 gap-y-4 items-start">
            <div className="space-y-4">
              {leftSections.map((section) => (
                <div key={section.id} onClick={() => toggleSection(section.id)} role="presentation">
                <SpeechBubble
                  side="left"
                  sectionId={section.id}
                  isPlaying={playingSection === section.id}
                >
                  {renderSectionLines(section)}
                </SpeechBubble>
                </div>
              ))}
            </div>
            <div className="flex justify-center sticky top-4">
              <ImageLightbox src={imageUrl!} alt="">
                <div className="relative w-[300px] h-[380px]">
                  <Image src={imageUrl!} alt="" fill className="object-contain" sizes="300px" />
                </div>
              </ImageLightbox>
            </div>
            <div className="space-y-4">
              {rightSections.map((section) => (
                <div key={section.id} onClick={() => toggleSection(section.id)} role="presentation">
                <SpeechBubble
                  side="right"
                  sectionId={section.id}
                  isPlaying={playingSection === section.id}
                >
                  {renderSectionLines(section)}
                </SpeechBubble>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile / tablet: stacked bubbles */}
          <div className="lg:hidden space-y-4">
            {sections.map((section) => (
              <SpeechBubble
                key={section.id}
                side={section.bubbleSide ?? 'left'}
                sectionId={section.id}
                isPlaying={playingSection === section.id}
              >
                {renderSectionLines(section)}
              </SpeechBubble>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {sections.map((section) => renderListSection(section))}
        </div>
      )}

      <div className="mt-8 p-4 rounded-lg bg-[#DAF6EB]/30 border-2 border-[#32C189]/40">
        <p className="text-sm text-gray-600 text-center">
          {t('exercise.clickLineToListen')}
        </p>
      </div>
    </div>
  );
}
