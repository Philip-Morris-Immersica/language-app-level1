'use client';

/**
 * B1 ReadingText — wraps the shared ReadingText, but renders numbered task
 * lists (multi-line paragraphs like the Калоян plan on lesson 08) as green
 * tables matching the textbook layout. All other reading_text exercises pass
 * through unchanged.
 */

import { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { Play, Pause, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useT } from '@/i18n/useT';
import { InlineTranslation } from '@/components/InlineTranslation';
import { TtsHint } from '@/components/TtsHint';
import {
  playTtsAudio,
  stopTtsAudio,
  pauseTtsAudio,
  resumeTtsAudio,
  getTtsAudioPath,
} from '@/lib/tts';
import { ReadingText as SharedReadingText } from '@/components/exercises/ReadingText';
import { A2_CUSTOM_RENDERERS } from '@/content/a2/exercise-components';

interface TaskListParsed {
  title?: string;
  rows: { num: string; text: string }[];
  footer?: string;
}

interface ReadingImage {
  imageUrl: string;
  label: string;
  ttsWordId?: string;
  labelTranslations?: Record<string, string>;
}

type ReadingExercise = {
  id: string;
  type: string;
  audioUrl?: string;
  songUrl?: string;
  disableParagraphAudio?: boolean;
  textTitle?: string;
  images?: ReadingImage[];
  imageFlashcards?: boolean;
  imageColumns?: number;
  imageEqualHeight?: boolean;
  /** Smaller side-by-side photos without captions / image audio (decorative only). */
  compactImages?: boolean;
  /** Center the textTitle above the shared reading body. */
  centerTitle?: boolean;
  paragraphs: string[];
  /** TTS-only text per paragraph (e.g. without list numbers). Used as browser-TTS fallback. */
  ttsParagraphs?: string[];
  paragraphTranslations?: Record<string, string>[];
  showDictionary?: boolean;
  hideText?: boolean;
  noTranslation?: boolean;
  checklist?: {
    instruction: string;
    items: { id: string; text: string; isTrue: boolean }[];
  };
  points?: number;
  [key: string]: unknown;
};

function BoldLine({ text }: { text: string }) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1
          ? <span key={i} className="font-extrabold" style={{ color: '#2d5a1b' }}>{part}</span>
          : <span key={i}>{part}</span>
      )}
    </>
  );
}

function stripBold(text: string) {
  return text.replace(/\*\*(.+?)\*\*/g, '$1');
}

function CompactImageStrip({ images, columns = 3 }: { images: ReadingImage[]; columns?: number }) {
  const cols = Math.min(Math.max(columns, 2), 4);
  return (
    <div
      className="grid gap-2 md:gap-3 mb-6 max-w-2xl mx-auto"
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
    >
      {images.map((img, i) => (
        <div key={i} className="relative w-full aspect-[4/3] max-h-28 md:max-h-36">
          <Image
            src={img.imageUrl}
            alt=""
            fill
            className="object-cover rounded-md"
            sizes="(max-width: 768px) 30vw, 180px"
          />
        </div>
      ))}
    </div>
  );
}

/** Prefer ttsParagraphs for spoken audio; keep display paragraphs for the UI. */
function speakTextFor(ex: ReadingExercise, index: number): string {
  const tts = ex.ttsParagraphs;
  if (tts && tts.length === ex.paragraphs.length && tts[index]?.trim()) {
    return stripBold(tts[index]);
  }
  return stripBold(ex.paragraphs[index] ?? '');
}

function parseTaskList(text: string): TaskListParsed | null {
  if (!text.includes('\n')) return null;
  const lines = text.split('\n').map((l) => l.trim()).filter(Boolean);
  const numberedCount = lines.filter((l) => /^\d+\./.test(l)).length;
  if (numberedCount < 3) return null;

  let title: string | undefined;
  let footer: string | undefined;
  const rows: { num: string; text: string }[] = [];

  for (const line of lines) {
    const m = line.match(/^(\d+)\.\s*(.+)$/);
    if (m) {
      rows.push({ num: m[1], text: m[2] });
    } else if (rows.length === 0) {
      title = line.replace(/:$/, '').trim();
    } else {
      footer = footer ? `${footer} ${line}` : line;
    }
  }

  return rows.length >= 3 ? { title, rows, footer } : null;
}

function TaskListTable({ list }: { list: TaskListParsed }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-[#32C189]/40">
      <table className="w-full border-collapse text-left">
        {list.title && (
          <thead>
            <tr>
              <th
                colSpan={2}
                className="bg-[#32C189] text-white text-sm md:text-base font-bold px-3 py-2.5 text-center"
              >
                {list.title}
              </th>
            </tr>
          </thead>
        )}
        <tbody>
          {list.rows.map((row) => (
            <tr key={row.num} className="border-t border-[#DAF6EB]">
              <td className="align-top w-10 md:w-12 px-2.5 py-2 text-sm md:text-base font-semibold text-[#1F5741] bg-[#DAF6EB]/50 whitespace-nowrap">
                {row.num}.
              </td>
              <td className="px-3 py-2 text-base md:text-lg text-gray-800 leading-relaxed">
                {row.text}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {list.footer && (
        <p className="px-3 py-2.5 text-base md:text-lg text-gray-800 leading-relaxed border-t border-[#DAF6EB] bg-white">
          {list.footer}
        </p>
      )}
    </div>
  );
}

function SharedAdapter({
  exercise,
  onComplete,
  exerciseId,
}: {
  exercise: ReadingExercise;
  onComplete?: (correct: boolean, score: number) => void;
  exerciseId?: string;
}) {
  const scoreIfCorrect = exercise.checklist?.items.length ?? exercise.points ?? 1;
  const compact = !!exercise.compactImages && (exercise.images?.length ?? 0) > 0;
  const centerTitle = !!exercise.centerTitle;
  return (
    <div className="space-y-3">
      {compact && (
        <CompactImageStrip
          images={exercise.images!}
          columns={exercise.imageColumns ?? exercise.images!.length}
        />
      )}
      {centerTitle && exercise.textTitle ? (
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-1 text-center">
          {exercise.textTitle}
        </h2>
      ) : null}
      <SharedReadingText
        audioUrl={exercise.audioUrl}
        songUrl={exercise.songUrl}
        disableParagraphAudio={exercise.disableParagraphAudio}
        textTitle={centerTitle ? undefined : exercise.textTitle}
        images={compact ? undefined : exercise.images}
        imageFlashcards={compact ? false : exercise.imageFlashcards}
        imageColumns={exercise.imageColumns}
        imageEqualHeight={exercise.imageEqualHeight}
        paragraphs={exercise.paragraphs}
        paragraphTranslations={exercise.paragraphTranslations}
        showDictionary={exercise.showDictionary}
        hideText={exercise.hideText}
        noTranslation={exercise.noTranslation}
        checklist={exercise.checklist}
        exerciseId={exerciseId ?? exercise.id}
        onComplete={
          onComplete
            ? (correct: boolean) => onComplete(correct, correct ? scoreIfCorrect : 0)
            : undefined
        }
      />
    </div>
  );
}

function ReadingTextWithTaskTables({
  exercise,
  exerciseId,
}: {
  exercise: ReadingExercise;
  exerciseId: string;
}) {
  const t = useT();
  const paragraphs = exercise.paragraphs;
  const {
    images,
    textTitle,
    showDictionary,
    noTranslation,
    paragraphTranslations,
  } = exercise;

  const [sequentialPlaying, setSequentialPlaying] = useState(false);
  const [sequentialPaused, setSequentialPaused] = useState(false);
  const [playingParaIndex, setPlayingParaIndex] = useState<number | null>(null);
  const [revealedParas, setRevealedParas] = useState<Set<number>>(new Set());
  const seqRef = useRef<{ cancelled: boolean } | null>(null);

  const stopSequentialPlayback = useCallback(() => {
    if (seqRef.current) seqRef.current.cancelled = true;
    seqRef.current = null;
    stopTtsAudio();
    setSequentialPlaying(false);
    setSequentialPaused(false);
    setPlayingParaIndex(null);
  }, []);

  useEffect(() => {
    return () => {
      if (seqRef.current) seqRef.current.cancelled = true;
      stopTtsAudio();
    };
  }, []);

  const handleSequentialListen = () => {
    const makeChain = (tok: { cancelled: boolean }) => {
      const step = (i: number) => {
        if (tok.cancelled) return;
        if (i >= paragraphs.length) {
          if (seqRef.current === tok) seqRef.current = null;
          setSequentialPlaying(false);
          setSequentialPaused(false);
          setPlayingParaIndex(null);
          return;
        }
        setPlayingParaIndex(i);
        const audioPath = getTtsAudioPath(exerciseId, 'texts', `${exerciseId}-p-${i}`);
        playTtsAudio(audioPath, speakTextFor(exercise, i), 1, () => {
          if (tok.cancelled) return;
          window.setTimeout(() => {
            if (!tok.cancelled) step(i + 1);
          }, 80);
        });
      };
      return step;
    };

    if (sequentialPlaying) {
      pauseTtsAudio();
      setSequentialPlaying(false);
      setSequentialPaused(true);
      return;
    }

    if (sequentialPaused && seqRef.current && !seqRef.current.cancelled && playingParaIndex !== null) {
      const token = seqRef.current;
      const pausedIdx = playingParaIndex;
      const step = makeChain(token);
      const resumed = resumeTtsAudio(() => {
        if (token.cancelled) return;
        window.setTimeout(() => {
          if (!token.cancelled) step(pausedIdx + 1);
        }, 80);
      });
      if (resumed) {
        setSequentialPlaying(true);
        setSequentialPaused(false);
        return;
      }
      token.cancelled = true;
      seqRef.current = null;
    }

    stopSequentialPlayback();
    const token = { cancelled: false };
    seqRef.current = token;
    setSequentialPlaying(true);
    setSequentialPaused(false);
    makeChain(token)(0);
  };

  return (
    <div className="relative bg-white rounded-xl p-6 md:p-10 shadow-md">
      <div className="flex justify-end gap-2 mb-6 flex-wrap">
        {showDictionary && (
          <Button
            className="px-5 py-3 md:px-6 md:py-3.5 rounded-lg font-semibold text-base shadow-md active:scale-95 transition-all flex items-center gap-2 bg-[#0072BC] hover:bg-[#05568B] text-white"
            onClick={() => window.dispatchEvent(new CustomEvent('open-vocabulary-drawer'))}
          >
            <span className="text-lg">📖</span>
            {t('exercise.dictionary')}
          </Button>
        )}
        <Button
          onClick={handleSequentialListen}
          className={`px-6 py-3 md:px-7 md:py-3.5 rounded-lg font-semibold text-base shadow-md active:scale-95 transition-all flex items-center gap-2 ${
            sequentialPlaying
              ? 'bg-[#D25A45] hover:bg-[#9C4637] text-white'
              : 'bg-white border-2 border-[#32C189] text-[#1F5741] hover:bg-[#DAF6EB]'
          }`}
        >
          {sequentialPlaying ? (
            <>
              <Pause className="w-5 h-5" />
              {t('exercise.pause')}
            </>
          ) : sequentialPaused ? (
            <>
              <Play className="w-5 h-5" />
              {t('exercise.continue')}
            </>
          ) : (
            <>
              <Play className="w-5 h-5" />
              {t('exercise.listen')}
            </>
          )}
        </Button>
      </div>

      {textTitle && (
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">{textTitle}</h2>
      )}

      {images && images.length > 0 && (
        <div className={`grid gap-4 md:gap-6 mb-6 ${images.length === 1 ? 'grid-cols-1 max-w-md mx-auto' : 'grid-cols-2 md:grid-cols-3'}`}>
          {images.map((img, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="relative w-full aspect-[4/3] max-h-72">
                <Image
                  src={img.imageUrl}
                  alt={img.label}
                  fill
                  className="object-contain rounded-lg"
                  sizes="(max-width: 768px) 90vw, 400px"
                />
              </div>
              {img.label && (
                <span className="mt-2 text-xs md:text-sm text-gray-500 font-medium text-center">
                  {img.label}
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      <TtsHint messageKey="exercise.tapTextToHear" />

      <div className="space-y-4">
        {paragraphs.map((paragraph, index) => {
          const taskList = parseTaskList(paragraph);
          return (
            <div
              key={index}
              onClick={() => {
                if (sequentialPlaying) stopSequentialPlayback();
                const audioPath = getTtsAudioPath(exerciseId, 'texts', `${exerciseId}-p-${index}`);
                setPlayingParaIndex(index);
                playTtsAudio(audioPath, speakTextFor(exercise, index), undefined, () =>
                  setPlayingParaIndex(null),
                );

                if (!noTranslation) {
                  setRevealedParas((prev) => {
                    const next = new Set(prev);
                    if (next.has(index)) next.delete(index);
                    else next.add(index);
                    return next;
                  });
                }
              }}
              className={`cursor-pointer rounded-lg p-2 -mx-2 transition-colors active:scale-[0.99] ${
                playingParaIndex === index
                  ? 'bg-[#DAF6EB]/30 border border-[#32C189]/40'
                  : 'hover:bg-gray-50 border border-transparent'
              }`}
            >
              <div className="flex items-start gap-2">
                <Volume2
                  className={`w-4 h-4 mt-1.5 flex-shrink-0 transition-colors ${
                    playingParaIndex === index ? 'text-[#32C189]' : 'text-gray-300'
                  }`}
                />
                <div className="flex-1 min-w-0">
                  {taskList ? (
                    <TaskListTable list={taskList} />
                  ) : (
                    <p className="text-base md:text-lg text-gray-800 leading-relaxed">
                      <BoldLine text={paragraph} />
                    </p>
                  )}
                  {!noTranslation && (
                    <InlineTranslation
                      text={stripBold(paragraph)}
                      visible={revealedParas.has(index)}
                      translations={paragraphTranslations?.[index]}
                    />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function ReadingText({
  exercise,
  onComplete,
  exerciseId,
}: {
  exercise: { id: string; type: string; [key: string]: unknown };
  onComplete?: (correct: boolean, score: number) => void;
  exerciseId?: string;
}) {
  // B1 registers `reading_text` last in ExerciseRenderer's map, so this
  // component is also hit for A1/A2. Hand those back to A2's renderer (or
  // shared) — never apply B1 table styling outside B1 lessons.
  const isB1 = String(exercise.id).startsWith('b1-');
  if (!isB1) {
    const A2Reading = A2_CUSTOM_RENDERERS['reading_text'];
    if (A2Reading) {
      return (
        <A2Reading
          exercise={exercise}
          onComplete={onComplete}
          exerciseId={exerciseId}
        />
      );
    }
  }

  const ex = exercise as ReadingExercise;
  const paragraphs = ex.paragraphs ?? [];

  // Non-B1 / hideText → shared renderer. All other B1 reading_text uses the
  // local path so `**bold**` markers render as bold (not literal asterisks)
  // and `ttsParagraphs` are used for playback.
  if (!isB1 || ex.hideText || paragraphs.length === 0) {
    return (
      <SharedAdapter
        exercise={ex}
        onComplete={onComplete}
        exerciseId={exerciseId}
      />
    );
  }

  return (
    <ReadingTextWithTaskTables
      exercise={ex}
      exerciseId={exerciseId ?? exercise.id}
    />
  );
}
