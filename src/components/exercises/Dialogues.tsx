'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Volume2, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useT } from '@/i18n/useT';
import { useLanguage } from '@/i18n/LanguageContext';
import { InlineTranslation } from '@/components/InlineTranslation';
import {
  getTtsAudioPath,
  playTtsAudio,
  stopTtsAudio,
  pauseTtsAudio,
  resumeTtsAudio,
} from '@/lib/tts';
import { ImageLightbox } from '@/components/ImageLightbox';

interface DialogueLine {
  speaker?: string;
  voiceGender?: 'male' | 'female';
  text: string;
  ttsText?: string;
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
  /** Multiple images shown side-by-side at top (desktop: row, mobile: stack). */
  images?: string[];
  /** 'scene' = central image with speech bubbles around it (e.g. ДИАЛОЗИ 1, a2-lesson-01). */
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
        relative rounded-2xl border-2 px-4 pt-5 pb-3 shadow-sm transition-all max-w-full h-full
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
  images,
  displayLayout = 'list',
  exerciseId,
}: DialoguesProps) {
  const t = useT();
  const { lang } = useLanguage();
  const [playingLine, setPlayingLine] = useState<string | null>(null);
  const [playingSection, setPlayingSection] = useState<string | null>(null);
  const [pausedSection, setPausedSection] = useState<string | null>(null);
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
    setPausedSection(null);
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
    if (playingSection || pausedSection) stopSectionPlayback();
    const line = section.lines[lineIndex];
    const lineKey = `${section.id}-line-${lineIndex}`;

    if (playingLine === lineKey) {
      pauseTtsAudio();
      setPlayingLine(null);
      return;
    }

    setPlayingLine(lineKey);
    const audioFile = exerciseId ? `${exerciseId}-${section.id}-line-${lineIndex}` : '';
    const audioPath = audioFile
      ? getTtsAudioPath(exerciseId!, 'dialogues', audioFile)
      : '';
    const spoken = (line.ttsText ?? line.text).replace(/^—\s*/, '');
    playTtsAudio(audioPath, spoken, undefined, () => setPlayingLine(null));

    setRevealedLines(prev => {
      const next = new Set(prev);
      if (next.has(lineKey)) next.delete(lineKey);
      else next.add(lineKey);
      return next;
    });
  };

  const handlePlaySection = (e: React.MouseEvent, section: DialogueSection) => {
    e.stopPropagation();

    const makeChain = (tok: { cancelled: boolean }) => {
      const step = (i: number) => {
        if (tok.cancelled) return;
        if (i >= section.lines.length) {
          if (sectionPlaybackRef.current === tok) sectionPlaybackRef.current = null;
          setPlayingSection(null);
          setPlayingLine(null);
          return;
        }
        setPlayingLine(`${section.id}-line-${i}`);
        const audioPath = getTtsAudioPath(
          exerciseId!,
          'dialogues',
          `${exerciseId}-${section.id}-line-${i}`,
        );
        const spoken = (section.lines[i].ttsText ?? section.lines[i].text).replace(/^—\s*/, '');
        playTtsAudio(audioPath, spoken, undefined, () => {
          if (tok.cancelled) return;
          window.setTimeout(() => { if (!tok.cancelled) step(i + 1); }, 350);
        });
      };
      return step;
    };

    if (playingSection === section.id) {
      pauseTtsAudio();
      setPlayingSection(null);
      setPausedSection(section.id);
      return;
    }

    if (
      pausedSection === section.id &&
      sectionPlaybackRef.current &&
      !sectionPlaybackRef.current.cancelled
    ) {
      const token = sectionPlaybackRef.current;
      const pausedIdx = playingLine?.startsWith(`${section.id}-line-`)
        ? (parseInt(playingLine.split('-line-')[1], 10) || 0)
        : 0;
      const step = makeChain(token);
      const resumed = resumeTtsAudio(() => {
        if (token.cancelled) return;
        window.setTimeout(() => { if (!token.cancelled) step(pausedIdx + 1); }, 350);
      });
      if (resumed) {
        setPlayingSection(section.id);
        setPausedSection(null);
        return;
      }
      token.cancelled = true;
      sectionPlaybackRef.current = null;
    }

    if (sectionPlaybackRef.current) sectionPlaybackRef.current.cancelled = true;
    sectionPlaybackRef.current = null;
    stopTtsAudio();
    setPlayingSection(null);
    setPausedSection(null);
    setPlayingLine(null);
    if (!exerciseId) return;

    const token = { cancelled: false };
    sectionPlaybackRef.current = token;
    setPlayingSection(section.id);
    makeChain(token)(0);
  };

  const renderSectionButton = (section: DialogueSection, compact = false) => {
    const sizeIcon = compact ? 'w-3.5 h-3.5' : 'w-4 h-4';
    const sizeText = compact ? 'text-xs' : 'text-sm';
    const sizePad = compact ? 'px-3 py-1.5' : 'px-4 py-2';
    return (
      <Button
        onClick={(e) => handlePlaySection(e, section)}
        className={`flex items-center gap-2 ${sizePad} rounded-lg font-semibold ${sizeText} ${compact ? 'shadow-sm' : 'shadow-md'} active:scale-95 transition-all ${
          playingSection === section.id
            ? 'bg-[#D25A45] hover:bg-[#9C4637] text-white'
            : 'bg-white border-2 border-[#32C189] text-[#1F5741] hover:bg-[#DAF6EB]'
        }`}
      >
        {playingSection === section.id ? (
          <><Pause className={sizeIcon} /> {t('exercise.pause')}</>
        ) : pausedSection === section.id ? (
          <><Play className={sizeIcon} /> {t('exercise.continue')}</>
        ) : (
          <><Play className={sizeIcon} /> {t('exercise.listen')}</>
        )}
      </Button>
    );
  };

  const renderLineList = (section: DialogueSection, compact = false) => {
    const isRevealed = revealedSections.has(section.id);
    return (
      <div className={compact ? 'space-y-2' : 'space-y-3'}>
        {section.lines.map((line, index) => {
          const lineKey = `${section.id}-line-${index}`;
          const isLinePlaying = playingLine === lineKey;
          return (
            <div
              key={index}
              onClick={(e) => handleLineClick(e, section, index)}
              className={`flex items-start ${compact ? 'gap-2 rounded-lg px-2 py-1.5' : 'gap-3 rounded-lg px-3 py-2 -mx-3'} cursor-pointer transition-colors active:scale-[0.99] ${
                isLinePlaying
                  ? compact
                    ? 'bg-[#DAF6EB]/50'
                    : 'bg-[#DAF6EB]/30 border border-[#32C189]/40'
                  : compact
                    ? 'hover:bg-gray-50'
                    : 'hover:bg-gray-50 border border-transparent'
              }`}
            >
              <Volume2 className={`${compact ? 'w-3.5 h-3.5 mt-0.5' : 'w-4 h-4 mt-1.5'} shrink-0 transition-colors ${
                isLinePlaying ? 'text-[#32C189]' : 'text-gray-300'
              }`} />
              <div className="flex-1 min-w-0">
                <p className={`${compact ? 'text-sm md:text-base leading-snug' : 'text-base md:text-lg leading-relaxed'} text-gray-800`}>
                  {line.speaker && (
                    <span className="font-bold text-[#0072BC] mr-1">{line.speaker}:</span>
                  )}
                  {line.text}
                </p>
                <InlineTranslation
                  text={line.text}
                  visible={revealedLines.has(lineKey) || isRevealed}
                  translations={line.translations}
                />
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderSectionLines = (section: DialogueSection) => (
    <div className="space-y-2">
      <div className="flex items-center justify-end gap-2 mb-1">
        {renderSectionButton(section, true)}
      </div>
      {renderLineList(section, true)}
    </div>
  );

  const isScene = displayLayout === 'scene' && Boolean(imageUrl);

  return (
    <div className="relative bg-white rounded-xl p-6 md:p-10 shadow-md">
      {/* Multiple images (side-by-side on desktop, centered) — not shown in scene mode (image is in the grid) */}
      {!isScene && images && images.length > 0 && (
        <div className="mb-6 flex justify-center">
          <div className={`grid gap-3 w-full ${images.length === 1 ? 'max-w-sm grid-cols-1' : images.length === 2 ? 'max-w-2xl grid-cols-1 md:grid-cols-2' : 'max-w-4xl grid-cols-1 md:grid-cols-3'}`}>
            {images.map((src, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={i} src={src} alt="" className="w-full rounded-xl object-cover shadow-sm" />
            ))}
          </div>
        </div>
      )}

      {/* Legacy single image — not shown in scene mode (image is centered in the grid) */}
      {!isScene && !images && imageUrl && (
        <div className="mb-6 flex justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt=""
            className="w-full max-w-md md:max-w-lg rounded-xl object-cover shadow-sm"
          />
        </div>
      )}

      {lang !== 'bg' && (
        <p className="text-xs text-gray-400 text-center mb-4 italic">
          {t('exercise.tapToTranslate')}
        </p>
      )}

      {isScene ? (
        <div className="w-full mx-auto">
          {/* Image always on top, centered */}
          <div className="mb-6 flex justify-center">
            <div className="w-72 h-96 shrink-0">
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
          </div>

          {/* Dialogue bubbles side by side below the image */}
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
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
          {sections.map((section) => {
            const dotIdx = section.id.indexOf('. ');
            const circleLabel = dotIdx !== -1 ? section.id.slice(0, dotIdx + 1) : section.id;
            const sectionTitle = dotIdx !== -1 ? section.id.slice(dotIdx + 2) : '';
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
                  {sections.length > 1 && (
                    <span className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm bg-[#32C189] text-white shrink-0">
                      {circleLabel}
                    </span>
                  )}
                  {sectionTitle && (
                    <span className="text-sm font-semibold text-gray-600">{sectionTitle}</span>
                  )}
                </div>
                {renderSectionButton(section)}
              </div>
              {renderLineList(section)}
            </div>
          );
          })}
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
