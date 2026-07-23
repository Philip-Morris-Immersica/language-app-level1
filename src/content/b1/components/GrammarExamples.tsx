/**
 * B1 grammar-examples variant for dialogues / illustrated example cards.
 * Differences from shared GrammarWithExamples:
 *  - Always renders **bold** (shared hero mode prints literal asterisks)
 *  - Vertical dialogue layout under one shared image
 *  - One TTS card per example (use one line per example + voiceGender)
 *  - „Слушай“ plays the whole dialogue in order (card-0 → card-1 → …)
 */
'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Pause, Play, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { InlineTranslation } from '@/components/InlineTranslation';
import { useT } from '@/i18n/useT';
import {
  getTtsAudioPath,
  playTtsAudio,
  stopTtsAudio,
  pauseTtsAudio,
  resumeTtsAudio,
} from '@/lib/tts';
import { ImageLightbox } from '@/components/ImageLightbox';
import { TtsHint } from '@/components/TtsHint';
import type { B1GrammarExamplesExercise } from '../types';

function ImageWithFallback({ src, alt }: { src: string; alt?: string }) {
  const [error, setError] = useState(false);
  const safeAlt = alt ?? '';
  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100">
        <p className="text-xs text-gray-400">{safeAlt}</p>
      </div>
    );
  }
  return (
    <Image
      src={src}
      alt={safeAlt}
      fill
      className="object-contain"
      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
      onError={() => setError(true)}
    />
  );
}

function BoldLine({ text }: { text: string }) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1
          ? <span key={i} className="font-extrabold text-[#2d5a1b]">{part}</span>
          : <span key={i}>{part}</span>
      )}
    </>
  );
}

interface Props {
  exercise: B1GrammarExamplesExercise;
  onComplete?: (correct: boolean, score: number) => void;
  exerciseId?: string;
}

function speakableText(example: B1GrammarExamplesExercise['examples'][number]): string {
  if (example.ttsText?.trim()) return example.ttsText.trim();
  if (example.lines?.length) {
    return example.lines
      .map(l => l.replace(/\*\*(.+?)\*\*/g, '$1').replace(/^–\s*/, '').trim())
      .filter(Boolean)
      .join(' ');
  }
  return (example.text ?? '').trim();
}

export function GrammarExamples({ exercise, exerciseId }: Props) {
  const t = useT();
  const { examples, disableTts } = exercise;
  const [revealed, setRevealed] = useState<Set<number>>(new Set());
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [playingAll, setPlayingAll] = useState(false);
  const [pausedAll, setPausedAll] = useState(false);
  const playbackRef = useRef<{ cancelled: boolean } | null>(null);
  const id = exerciseId ?? exercise.id;
  const imageExample = examples.find(e => e.imageUrl);
  const zoomable = imageExample?.zoomable !== false;

  const speakableIndexes = examples
    .map((ex, i) => ({ i, text: speakableText(ex) }))
    .filter(x => x.text.length > 0)
    .map(x => x.i);

  useEffect(() => {
    return () => {
      if (playbackRef.current) playbackRef.current.cancelled = true;
      stopTtsAudio();
    };
  }, []);

  const stopAllPlayback = () => {
    if (playbackRef.current) playbackRef.current.cancelled = true;
    playbackRef.current = null;
    stopTtsAudio();
    setPlayingAll(false);
    setPausedAll(false);
    setPlayingIndex(null);
  };

  const playCard = (index: number, onEnd?: () => void) => {
    if (disableTts) return;
    const example = examples[index];
    const textToSpeak = speakableText(example);
    if (!textToSpeak) {
      onEnd?.();
      return;
    }
    const audioPath = getTtsAudioPath(id, 'grammar', `${id}-card-${index}`);
    setPlayingIndex(index);
    playTtsAudio(audioPath, textToSpeak, undefined, () => {
      setPlayingIndex(null);
      onEnd?.();
    });
  };

  const play = (index: number) => {
    if (disableTts) return;
    if (playingAll || pausedAll) stopAllPlayback();
    if (playingIndex === index) {
      stopTtsAudio();
      setPlayingIndex(null);
      return;
    }
    playCard(index);
    setRevealed(prev => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  const makeChain = (tok: { cancelled: boolean }) => {
    const step = (pos: number) => {
      if (tok.cancelled) return;
      if (pos >= speakableIndexes.length) {
        if (playbackRef.current === tok) playbackRef.current = null;
        setPlayingAll(false);
        setPlayingIndex(null);
        return;
      }
      const cardIndex = speakableIndexes[pos];
      playCard(cardIndex, () => {
        if (tok.cancelled) return;
        window.setTimeout(() => {
          if (!tok.cancelled) step(pos + 1);
        }, 350);
      });
    };
    return step;
  };

  const handlePlayAll = () => {
    if (disableTts || !speakableIndexes.length) return;

    if (playingAll) {
      pauseTtsAudio();
      setPlayingAll(false);
      setPausedAll(true);
      return;
    }

    if (pausedAll && playbackRef.current && !playbackRef.current.cancelled) {
      const token = playbackRef.current;
      const pausedPos = playingIndex !== null
        ? Math.max(0, speakableIndexes.indexOf(playingIndex))
        : 0;
      const step = makeChain(token);
      const resumed = resumeTtsAudio(() => {
        if (token.cancelled) return;
        window.setTimeout(() => {
          if (!token.cancelled) step(pausedPos + 1);
        }, 350);
      });
      if (resumed) {
        setPlayingAll(true);
        setPausedAll(false);
        return;
      }
      token.cancelled = true;
      playbackRef.current = null;
    }

    stopAllPlayback();
    const token = { cancelled: false };
    playbackRef.current = token;
    setPlayingAll(true);
    setPausedAll(false);
    makeChain(token)(0);
  };

  const heroImage = imageExample?.imageUrl ? (
    <div className="relative w-full h-64 md:h-[26rem] lg:h-[32rem] rounded-xl overflow-hidden bg-gray-50 border border-gray-100 shadow-sm">
      <ImageWithFallback
        src={imageExample.imageUrl}
        alt={imageExample.lines?.[0] ?? imageExample.text}
      />
    </div>
  ) : null;

  // Group by letter labels (а. / б. / в.) — Dialogues-style green badge + bubble.
  type DialogueGroup = { label: string; items: { index: number; example: B1GrammarExamplesExercise['examples'][number] }[] };
  const hasNumberedDialogues = examples.some(ex => (ex.text ?? '').trim().length > 0);
  const dialogueGroups: DialogueGroup[] = [];
  if (hasNumberedDialogues) {
    for (let index = 0; index < examples.length; index++) {
      const example = examples[index];
      const label = (example.text ?? '').trim();
      if (label || dialogueGroups.length === 0) {
        dialogueGroups.push({ label, items: [{ index, example }] });
      } else {
        dialogueGroups[dialogueGroups.length - 1].items.push({ index, example });
      }
    }
  }

  const renderFlatLine = (index: number, example: B1GrammarExamplesExercise['examples'][number]) => (
    <div
      key={index}
      onClick={() => play(index)}
      className={`text-center cursor-pointer rounded-lg border px-3 py-2.5 transition-colors ${
        playingIndex === index
          ? 'border-[#32C189]/60 bg-[#DAF6EB]/50'
          : 'border-transparent hover:border-[#32C189]/40 hover:bg-[#DAF6EB]/40'
      }`}
    >
      {(example.lines ?? []).filter(Boolean).map((line, i) => (
        <p key={i} className="text-base md:text-lg font-semibold text-gray-800 leading-relaxed">
          <BoldLine text={line} />
        </p>
      ))}
      <InlineTranslation
        text={(example.lines ?? []).map(l => l.replace(/\*\*(.+?)\*\*/g, '$1')).join(' ')}
        visible={revealed.has(index)}
      />
    </div>
  );

  const renderBubbleLine = (index: number, example: B1GrammarExamplesExercise['examples'][number]) => {
    const isPlaying = playingIndex === index;
    return (
      <div
        key={index}
        onClick={() => play(index)}
        className={`flex items-start gap-2 rounded-lg px-2 py-1.5 cursor-pointer transition-colors active:scale-[0.99] ${
          isPlaying ? 'bg-[#DAF6EB]/50' : 'hover:bg-gray-50'
        }`}
      >
        <Volume2
          className={`w-3.5 h-3.5 mt-0.5 shrink-0 transition-colors ${
            isPlaying ? 'text-[#32C189]' : 'text-gray-300'
          }`}
        />
        <div className="flex-1 min-w-0 text-left">
          {(example.lines ?? []).filter(Boolean).map((line, i) => (
            <p key={i} className="text-sm md:text-base text-gray-800 leading-snug">
              <BoldLine text={line} />
            </p>
          ))}
          <InlineTranslation
            text={(example.lines ?? []).map(l => l.replace(/\*\*(.+?)\*\*/g, '$1')).join(' ')}
            visible={revealed.has(index)}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="relative bg-white rounded-xl p-4 md:p-6 shadow-md">
      {!disableTts && (
        <div className="flex justify-end mb-4">
          <Button
            onClick={handlePlayAll}
            className={`flex items-center gap-2 px-6 py-3 md:px-7 md:py-3.5 rounded-lg font-semibold text-base shadow-md active:scale-95 transition-all ${
              playingAll
                ? 'bg-[#D25A45] hover:bg-[#9C4637] text-white'
                : 'bg-white border-2 border-[#32C189] text-[#1F5741] hover:bg-[#DAF6EB]'
            }`}
          >
            {playingAll ? (
              <><Pause className="w-5 h-5" />{t('exercise.pause')}</>
            ) : pausedAll ? (
              <><Play className="w-5 h-5" />{t('exercise.continue')}</>
            ) : (
              <><Play className="w-5 h-5" />{t('exercise.listen')}</>
            )}
          </Button>
        </div>
      )}
      {!disableTts && <TtsHint messageKey="exercise.tapCardToHear" />}
      <div className="max-w-4xl mx-auto space-y-4">
        {heroImage && (
          zoomable && imageExample?.imageUrl ? (
            <ImageLightbox src={imageExample.imageUrl} alt={imageExample.lines?.[0] ?? imageExample.text}>
              {heroImage}
            </ImageLightbox>
          ) : heroImage
        )}

        {hasNumberedDialogues ? (
          <div className="flex flex-col gap-5 md:gap-6">
            {dialogueGroups.map((group, gIdx) => {
              const groupPlaying = group.items.some(({ index }) => playingIndex === index);
              return (
                <div
                  key={gIdx}
                  className={`relative rounded-2xl border-2 px-4 pt-5 pb-3 shadow-sm transition-all ${
                    groupPlaying
                      ? 'border-[#32C189] bg-[#DAF6EB]/40'
                      : 'border-[#32C189]/50 bg-[#f4fbf8]'
                  }`}
                >
                  {group.label ? (
                    <span className="absolute -top-3 left-3 min-w-[1.75rem] h-7 px-1.5 rounded-full bg-[#32C189] text-white text-xs font-bold flex items-center justify-center shadow-sm lowercase">
                      {group.label}
                    </span>
                  ) : null}
                  <div className="space-y-1">
                    {group.items.map(({ index, example }) => renderBubbleLine(index, example))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="space-y-1">
            {examples.map((example, index) => renderFlatLine(index, example))}
          </div>
        )}
      </div>
    </div>
  );
}
