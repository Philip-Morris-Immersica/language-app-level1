'use client';

import { useState, useRef, useEffect } from 'react';
import { Volume2, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useT } from '@/i18n/useT';
import { useLanguage } from '@/i18n/LanguageContext';
import { InlineTranslation } from '@/components/InlineTranslation';
import { getTtsAudioPath, playTtsAudio, stopTtsAudio, pauseTtsAudio, resumeTtsAudio } from '@/lib/tts';

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
  imageUrl?: string;
  /** Multiple images shown side-by-side at top (desktop: row, mobile: stack). */
  images?: string[];
  sections: DialogueSection[];
  exerciseId?: string;
}

export function Dialogues({ subtitle, imageUrl, images, sections, exerciseId }: DialoguesProps) {
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

    // Build the sequential playback chain for a given token.
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

    // 1. PAUSE — currently playing this section.
    if (playingSection === section.id) {
      pauseTtsAudio(); // keeps currentAudio for resume
      setPlayingSection(null);
      setPausedSection(section.id);
      // Token stays alive; playingLine marks the paused position.
      return;
    }

    // 2. RESUME — this section is paused with a live token.
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
      // resumeTtsAudio updates onended so the chain continues correctly.
      const resumed = resumeTtsAudio(() => {
        if (token.cancelled) return;
        window.setTimeout(() => { if (!token.cancelled) step(pausedIdx + 1); }, 350);
      });
      if (resumed) {
        setPlayingSection(section.id);
        setPausedSection(null);
        return;
      }
      // Resume failed (audio was garbage-collected) — fall through to fresh start.
      token.cancelled = true;
      sectionPlaybackRef.current = null;
    }

    // 3. FRESH START — cancel any stale state and start from line 0.
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

  return (
    <div className="relative bg-white rounded-xl p-6 md:p-10 shadow-md">
      {/* Multiple images (side-by-side on desktop, centered) */}
      {images && images.length > 0 && (
        <div className="mb-6 flex justify-center">
          <div className={`grid gap-3 w-full ${images.length === 1 ? 'max-w-sm grid-cols-1' : images.length === 2 ? 'max-w-2xl grid-cols-1 md:grid-cols-2' : 'max-w-4xl grid-cols-1 md:grid-cols-3'}`}>
            {images.map((src, i) => (
              <img key={i} src={src} alt="" className="w-full rounded-xl object-cover shadow-sm" />
            ))}
          </div>
        </div>
      )}

      {/* Legacy single image */}
      {!images && imageUrl && (
        <div className="mb-6 flex justify-center">
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
                  {sections.length > 1 && (
                    <span className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm bg-[#32C189] text-white">
                      {section.id}
                    </span>
                  )}
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
                    <><Pause className="w-4 h-4" /> {t('exercise.pause')}</>
                  ) : pausedSection === section.id ? (
                    <><Play className="w-4 h-4" /> {t('exercise.continue')}</>
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
