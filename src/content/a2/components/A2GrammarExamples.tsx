'use client';

/**
 * A2 variant of the shared GrammarWithExamples (centered layout only).
 *
 * Why: the shared `layout: 'centered'` renders the two example boxes in a full
 * width 2-column grid (`repeat(N, 1fr)` inside `max-w-5xl`), which reads as
 * left-shifted / over-wide. This variant lays the cards out content-width and
 * truly centered (`flex flex-wrap justify-center`), and renders plain `text`
 * examples (ако/ще sentences) as normal centered statements instead of tiny
 * uppercase headers.
 *
 * For any non-centered layout it delegates to the shared component unchanged, so
 * default grammar_examples keep identical behaviour.
 *
 * Registered as the opt-in type `'a2-grammar-examples'` in
 * `../exercise-components.ts` (A1 + other A2 lessons are NOT affected).
 *
 * SYNC: if the shared GrammarWithExamples centered branch changes, mirror here.
 */

import { useState } from 'react';
import { GrammarWithExamples } from '@/components/exercises/GrammarWithExamples';
import { InlineTranslation } from '@/components/InlineTranslation';
import { TtsHint } from '@/components/TtsHint';
import { getTtsAudioPath, playTtsAudio } from '@/lib/tts';

interface GrammarExample {
  imageUrl?: string;
  text?: string;
  subtext?: string;
  label?: string;
  lines?: string[];
  translations?: Record<string, string>;
  ttsText?: string;
}

interface A2GrammarExamplesShape {
  id: string;
  type: string;
  subtitle?: string;
  disableTts?: boolean;
  /** 'image-rows' → картинъчни примери в решетка от 2 колони (3 реда × 2). */
  layout?: 'default' | 'centered' | 'image-rows';
  examples: GrammarExample[];
}

function BoldLine({ text }: { text: string }) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1
          ? <span key={i} className="font-extrabold text-[#2d5a1b]">{part}</span>
          : <span key={i}>{part}</span>,
      )}
    </>
  );
}

function CenteredGrammar({
  examples,
  disableTts,
  exerciseId,
}: {
  examples: GrammarExample[];
  disableTts?: boolean;
  exerciseId?: string;
}) {
  const [revealed, setRevealed] = useState<Set<number>>(new Set());

  const handleClick = (index: number, example: GrammarExample) => {
    if (!disableTts) {
      const stripGrammarLinePrefix = (l: string) =>
        l.replace(/^\s*\S+:\s+/, '').replace(/^\s*[✓✗]\s*/, '');
      const textToSpeak =
        example.ttsText?.trim() ||
        (example.lines
          ? example.lines.filter(l => l.trim() !== '').map(stripGrammarLinePrefix).join(' ')
          : [example.text, example.subtext].filter(Boolean).join(' '));
      const audioPath = exerciseId
        ? getTtsAudioPath(exerciseId, 'grammar', `${exerciseId}-card-${index}`)
        : '';
      playTtsAudio(audioPath, textToSpeak);
    }

    setRevealed(prev => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  return (
    <div className="relative bg-white rounded-xl p-6 md:p-10 shadow-md">
      {!disableTts && <TtsHint messageKey="exercise.tapCardToHear" />}
      <div className="flex flex-wrap justify-center gap-6 md:gap-8">
        {examples.map((example, index) => {
          const hasLines = Array.isArray(example.lines) && example.lines.filter(Boolean).length > 0;
          const plainText = (example.text ?? '').replace(/\*\*(.+?)\*\*/g, '$1');
          return (
            <div
              key={index}
              onClick={() => handleClick(index, example)}
              className="w-full sm:w-[20rem] md:w-[22rem] rounded-xl border-2 border-[#CDE3F1] bg-[#f8fbfd] p-5 md:p-6 shadow-sm cursor-pointer hover:border-[#32C189]/60 transition-all active:scale-[0.99] text-center"
            >
              {hasLines ? (
                <>
                  {example.text && (
                    <p className="text-xs font-bold uppercase tracking-widest text-[#0072BC] mb-4 pb-2 border-b border-[#CDE3F1]">
                      {example.text}
                    </p>
                  )}
                  <div className="space-y-2">
                    {example.lines!.filter(Boolean).map((line, lineIndex) => (
                      <div key={lineIndex}>
                        <p className="text-sm md:text-base text-gray-800 leading-relaxed">
                          <BoldLine text={line} />
                        </p>
                        <InlineTranslation
                          text={line.replace(/\*\*(.+?)\*\*/g, '$1')}
                          visible={revealed.has(index)}
                        />
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <p className="text-base md:text-lg font-bold text-gray-800 leading-relaxed">
                    <BoldLine text={example.text ?? ''} />
                  </p>
                  <InlineTranslation
                    text={plainText}
                    visible={revealed.has(index)}
                    translations={example.translations}
                  />
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Картинъчни примери в решетка от 2 колони (за да се получат 3 реда × 2
 * картинки). Всяка карта: картинка + текст + TTS на клик. Пътят за MP3 е
 * `${exerciseId}-card-{index}` — съвпада с generate-tts.ts.
 */
function ImageRowsGrammar({
  examples,
  disableTts,
  exerciseId,
}: {
  examples: GrammarExample[];
  disableTts?: boolean;
  exerciseId?: string;
}) {
  const [revealed, setRevealed] = useState<Set<number>>(new Set());

  const handleClick = (index: number, example: GrammarExample) => {
    if (!disableTts) {
      const textToSpeak =
        example.ttsText?.trim() ||
        (example.lines
          ? example.lines.filter(l => l.trim() !== '').join(' ')
          : [example.text, example.subtext].filter(Boolean).join(' '));
      const audioPath = exerciseId
        ? getTtsAudioPath(exerciseId, 'grammar', `${exerciseId}-card-${index}`)
        : '';
      playTtsAudio(audioPath, textToSpeak);
    }

    setRevealed(prev => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  return (
    <div className="relative bg-white rounded-xl p-6 md:p-10 shadow-md">
      {!disableTts && <TtsHint messageKey="exercise.tapCardToHear" />}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 max-w-3xl mx-auto">
        {examples.map((example, index) => (
          <div
            key={index}
            onClick={() => handleClick(index, example)}
            className="rounded-xl border-2 border-gray-200 bg-white p-4 md:p-5 shadow-sm cursor-pointer hover:shadow-md hover:scale-[1.02] transition-all active:scale-95 flex flex-col items-center text-center"
          >
            {example.imageUrl && (
              <div className="relative w-full h-52 md:h-60 rounded-lg overflow-hidden bg-white">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={example.imageUrl}
                  alt={example.text ?? ''}
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              </div>
            )}
            <div className="mt-4 w-full">
              <p className="text-base md:text-lg font-bold text-gray-800 leading-relaxed">
                <BoldLine text={example.text ?? ''} />
              </p>
              <InlineTranslation
                text={(example.text ?? '').replace(/\*\*(.+?)\*\*/g, '$1')}
                visible={revealed.has(index)}
                translations={example.translations}
              />
              {example.lines?.filter(Boolean).map((line, lineIndex) => (
                <div key={lineIndex} className="mt-1">
                  <p className="text-sm md:text-base text-gray-800 leading-relaxed">
                    <BoldLine text={line} />
                  </p>
                  <InlineTranslation
                    text={line.replace(/\*\*(.+?)\*\*/g, '$1')}
                    visible={revealed.has(index)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function A2GrammarExamples({
  exercise,
  exerciseId,
}: {
  exercise: { id: string; type: string; [key: string]: unknown };
  onComplete?: (correct: boolean, score: number) => void;
  exerciseId?: string;
}) {
  const ex = exercise as unknown as A2GrammarExamplesShape;
  if (ex.layout === 'image-rows') {
    return (
      <ImageRowsGrammar
        examples={ex.examples}
        disableTts={ex.disableTts}
        exerciseId={exerciseId ?? exercise.id}
      />
    );
  }
  if (ex.layout === 'centered') {
    return (
      <CenteredGrammar
        examples={ex.examples}
        disableTts={ex.disableTts}
        exerciseId={exerciseId ?? exercise.id}
      />
    );
  }
  // Non-centered → delegate to the shared component unchanged.
  return (
    <GrammarWithExamples
      subtitle={ex.subtitle}
      examples={ex.examples as never}
      disableTts={ex.disableTts}
      layout={ex.layout}
      exerciseId={exerciseId ?? exercise.id}
    />
  );
}
