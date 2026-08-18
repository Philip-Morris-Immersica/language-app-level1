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

function BoldLine({ text, color = '#1F5741' }: { text: string; color?: string }) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1
          // Inline color: Tailwind content[] does not scan src/content/, so text-[#…] classes here are dropped.
          // Light green bg (#DAF6EB) paired with the AAA-contrast green text (#1F5741) from the
          // design system's green "trio" — brighter greens (#2BB673 / #32C189) read as nearly
          // invisible on this light background (too little contrast).
          ? <span key={i} className="font-extrabold rounded-sm px-0.5" style={{ color, backgroundColor: '#DAF6EB' }}>{part}</span>
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
  // Explicit ttsText (even empty) wins — lets authors silence a card while showing lines/subtext.
  if (example.ttsText !== undefined) return example.ttsText.trim();
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
  // Opt-in only — lightbox zoom is off unless zoomable: true on the example.
  const zoomable = imageExample?.zoomable === true;
  // Multi-card photo grid (each example has its own image) — like shared GrammarWithExamples,
  // but body text stays black (shared paints Аз/Ти/Това… lines blue).
  const withImages = examples.filter(e => !!e.imageUrl);
  const isCardGrid = withImages.length >= 2 && withImages.length === examples.length;

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
        }, 80);
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
        }, 80);
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

  /** Direct speech above; reported-speech explanation in a separate green box below. */
  const renderSpeechBlock = (
    example: B1GrammarExamplesExercise['examples'][number],
    opts: { lineClass: string; align?: 'left' | 'center' },
  ) => {
    const hasSub = !!example.subtext?.trim();
    const lines = (example.lines ?? []).filter(Boolean);
    const alignCls = opts.align === 'left' ? 'text-left' : 'text-center';
    return (
      <div className={`space-y-2 ${alignCls}`}>
        {lines.length > 0 ? (
          <div
            className={`rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 space-y-1 ${alignCls}`}
          >
            {lines.map((line, i) => (
              <p key={i} className={`${opts.lineClass} text-slate-800`}>
                <BoldLine text={line} color="#1e3a5f" />
              </p>
            ))}
          </div>
        ) : null}
        {hasSub ? (
          <div
            className={`rounded-lg border border-[#32C189]/50 bg-[#DAF6EB]/40 px-3 py-2.5 ${alignCls}`}
          >
            <p className={`${opts.lineClass} text-[#1F5741]`}>
              <BoldLine text={example.subtext!} />
            </p>
          </div>
        ) : null}
      </div>
    );
  };

  const renderFlatLine = (index: number, example: B1GrammarExamplesExercise['examples'][number]) => {
    const canPlay = !!speakableText(example);
    return (
      <div
        key={index}
        onClick={() => canPlay && play(index)}
        className={`rounded-lg border px-3 py-2.5 transition-colors ${
          canPlay ? 'cursor-pointer' : ''
        } ${
          playingIndex === index
            ? 'border-[#32C189]/60 bg-[#DAF6EB]/50'
            : canPlay
              ? 'border-transparent hover:border-[#32C189]/40 hover:bg-[#DAF6EB]/40'
              : 'border-transparent'
        }`}
      >
        {renderSpeechBlock(example, {
          lineClass: 'text-base md:text-lg font-semibold text-gray-800 leading-relaxed',
          align: 'center',
        })}
        <InlineTranslation
          text={(example.lines ?? []).map(l => l.replace(/\*\*(.+?)\*\*/g, '$1')).join(' ')}
          visible={revealed.has(index)}
        />
      </div>
    );
  };

  const renderBubbleLine = (
    index: number,
    example: B1GrammarExamplesExercise['examples'][number],
    opts?: { linesOnly?: boolean },
  ) => {
    const isPlaying = playingIndex === index;
    const canPlay = !!speakableText(example);
    const lines = (example.lines ?? []).filter(Boolean);
    return (
      <div
        key={index}
        onClick={() => canPlay && play(index)}
        className={`flex items-start gap-2 rounded-lg px-2 py-1.5 transition-colors active:scale-[0.99] ${
          canPlay ? 'cursor-pointer' : ''
        } ${
          isPlaying ? 'bg-[#DAF6EB]/50' : canPlay ? 'hover:bg-gray-50' : ''
        }`}
      >
        {canPlay ? (
          <Volume2
            className={`w-3.5 h-3.5 mt-0.5 shrink-0 transition-colors ${
              isPlaying ? 'text-[#32C189]' : 'text-gray-300'
            }`}
          />
        ) : (
          <span className="w-3.5 h-3.5 mt-0.5 shrink-0" />
        )}
        <div className="flex-1 min-w-0">
          {opts?.linesOnly ? (
            <div className="text-left space-y-1">
              {lines.map((line, i) => (
                <p key={i} className="text-sm md:text-base text-gray-800 leading-snug">
                  <BoldLine text={line} />
                </p>
              ))}
            </div>
          ) : (
            renderSpeechBlock(example, {
              lineClass: 'text-sm md:text-base text-gray-800 leading-snug',
              align: 'left',
            })
          )}
          <InlineTranslation
            text={lines.map(l => l.replace(/\*\*(.+?)\*\*/g, '$1')).join(' ')}
            visible={revealed.has(index)}
          />
        </div>
      </div>
    );
  };

  if (isCardGrid) {
    return (
      <div className="relative bg-white rounded-xl p-6 md:p-10 shadow-md">
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
        <div className={`grid gap-6 md:gap-8 ${
          examples.length === 1
            ? 'grid-cols-1 max-w-md mx-auto'
            : examples.length === 4
              ? 'grid-cols-1 sm:grid-cols-2 max-w-3xl mx-auto'
              : examples.length === 2
                ? 'grid-cols-1 md:grid-cols-2 max-w-3xl mx-auto'
                : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
        }`}>
          {examples.map((example, index) => {
            const cardZoomable = example.zoomable === true;
            const img = (
              <div className="relative w-full h-56 md:h-64 rounded-lg overflow-hidden bg-white">
                <ImageWithFallback
                  src={example.imageUrl}
                  alt={example.lines?.[0] ?? example.text}
                />
              </div>
            );
            return (
              <div
                key={index}
                onClick={() => play(index)}
                className={`relative bg-white rounded-xl border-2 p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer flex flex-col items-center ${
                  playingIndex === index ? 'border-[#32C189]' : 'border-gray-200'
                }`}
              >
                {!disableTts && (
                  <Volume2 className="absolute top-2 right-2 w-4 h-4 text-gray-300" />
                )}
                {example.imageUrl && (
                  cardZoomable ? (
                    <div className="w-full" onClick={(e) => e.stopPropagation()}>
                      <ImageLightbox src={example.imageUrl} alt={example.lines?.[0] ?? example.text}>
                        {img}
                      </ImageLightbox>
                    </div>
                  ) : img
                )}
                <div className="mt-4 text-center space-y-2 w-full">
                  {example.text?.trim() ? (
                    <p className="text-base md:text-lg font-semibold text-gray-900">{example.text}</p>
                  ) : null}
                  {example.subtext?.trim() ? (
                    renderSpeechBlock(example, {
                      lineClass: 'text-base md:text-lg font-normal text-gray-900 leading-relaxed',
                      align: 'center',
                    })
                  ) : (
                    (example.lines ?? []).filter(Boolean).map((line, i) => (
                      <p key={i} className="text-base md:text-lg font-normal text-gray-900 leading-relaxed">
                        <BoldLine text={line} />
                      </p>
                    ))
                  )}
                  <InlineTranslation
                    text={(example.lines ?? []).map(l => l.replace(/\*\*(.+?)\*\*/g, '$1')).join(' ')}
                    visible={revealed.has(index)}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Text-only example cards (no images): 2×2 for 4 cards (avoid 3+1 on large screens).
  // Keep 1–2 card sections on the stacked/centered path below.
  const isTextCardGrid =
    !hasNumberedDialogues &&
    examples.length >= 3 &&
    examples.every(e => (e.lines?.length ?? 0) > 0 || !!e.text?.trim());

  if (isTextCardGrid) {
    return (
      <div className="relative bg-white rounded-xl p-6 md:p-10 shadow-md">
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
        <div className={`grid gap-4 md:gap-6 ${
          examples.length === 4 || examples.length % 2 === 0
            ? 'grid-cols-1 sm:grid-cols-2 max-w-3xl mx-auto'
            : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
        }`}>
          {examples.map((example, index) => (
            <div
              key={index}
              onClick={() => play(index)}
              className={`relative bg-white rounded-xl border-2 p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer flex flex-col items-center text-center ${
                playingIndex === index ? 'border-[#32C189]' : 'border-gray-200'
              }`}
            >
              {!disableTts && (
                <Volume2 className="absolute top-2 right-2 w-4 h-4 text-gray-300" />
              )}
              <div className="space-y-2 w-full">
                {(example.lines ?? []).filter(Boolean).map((line, i) => (
                  <p key={i} className="text-base md:text-lg font-normal text-gray-900 leading-relaxed">
                    <BoldLine text={line} />
                  </p>
                ))}
                {!example.lines?.length && example.text ? (
                  <p className="text-base md:text-lg font-semibold text-gray-900">{example.text}</p>
                ) : null}
              </div>
              <InlineTranslation
                text={(example.lines ?? []).map(l => l.replace(/\*\*(.+?)\*\*/g, '$1')).join(' ') || example.text}
                visible={revealed.has(index)}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

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

        {exercise.introText?.trim() ? (
          <p className="text-base md:text-lg text-gray-800 leading-relaxed">
            {exercise.introText}
          </p>
        ) : null}

        {hasNumberedDialogues ? (
          <div className="flex flex-col gap-5 md:gap-6">
            {dialogueGroups.map((group, gIdx) => {
              const groupPlaying = group.items.some(({ index }) => playingIndex === index);
              const dialogueItems = group.items.filter(({ example }) =>
                (example.lines ?? []).some(l => !!l?.trim()),
              );
              const subtexts = group.items
                .map(({ example }) => example.subtext?.trim())
                .filter((s): s is string => !!s);
              return (
                <div
                  key={gIdx}
                  className={`relative rounded-2xl border-2 px-4 pt-5 pb-3 shadow-sm transition-all ${
                    groupPlaying
                      ? 'border-[#32C189] bg-[#f4fbf8]'
                      : 'border-[#32C189]/40 bg-white'
                  }`}
                >
                  {group.label ? (
                    <span className="absolute -top-3 left-3 min-w-[1.75rem] h-7 px-1.5 rounded-full bg-[#32C189] text-white text-xs font-bold flex items-center justify-center shadow-sm lowercase">
                      {group.label}
                    </span>
                  ) : null}
                  {/* Dialogue lines share one green box; explanation sits below. */}
                  <div className="rounded-lg border border-[#32C189]/50 bg-[#DAF6EB]/40 px-2 py-1.5 space-y-0.5">
                    {dialogueItems.map(({ index, example }) =>
                      renderBubbleLine(index, example, { linesOnly: true }),
                    )}
                  </div>
                  {subtexts.map((sub, sIdx) => (
                    <div
                      key={`sub-${sIdx}`}
                      className="mt-2 rounded-lg border border-[#32C189]/40 bg-[#DAF6EB]/25 px-3 py-2.5 text-sm md:text-base text-gray-800 leading-snug"
                    >
                      <BoldLine text={sub} />
                    </div>
                  ))}
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
