'use client';

import { Info, Volume2 } from 'lucide-react';
import { useT } from '@/i18n/useT';
import { useTranslate } from '@/i18n/useTranslate';
import type { GrammarHighlight as GrammarHighlightProps } from '@/content/types';
import { getTtsAudioPath, playTtsAudio } from '@/lib/tts';

interface Props {
  highlight: GrammarHighlightProps;
  /** Enables MP3 path convention `grammar/{id}-highlight-{n}.mp3` + fallback speech. */
  exerciseId?: string;
}

export function GrammarHighlight({ highlight, exerciseId }: Props) {
  const t = useT();
  const translatedText = useTranslate(highlight.text ?? '');
  const displayText = highlight.textKey ? t(highlight.textKey as Parameters<typeof t>[0]) : translatedText;

  const examples = highlight.examples;
  const canInteract =
    Boolean(exerciseId) &&
    highlight.interactiveExamples === true &&
    Array.isArray(examples) &&
    examples.length > 0;

  if (!displayText && !examples?.length) return null;

  const playExampleLine = (index: number) => {
    if (!canInteract || !exerciseId || !examples) return;
    const fallback =
      highlight.exampleTtsTexts?.[index]?.trim() || examples[index];
    const audioPath = getTtsAudioPath(exerciseId, 'grammar', `${exerciseId}-highlight-${index}`);
    playTtsAudio(audioPath, fallback);
  };

  return (
    <div className="flex gap-3 rounded-r-xl border-0 border-l-[4px] border-l-[#32C189] bg-white shadow-sm px-4 py-3 text-sm text-[#1F5741] ring-1 ring-gray-100">
      <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#32C189]" aria-hidden />
      <div className="min-w-0 flex-1 space-y-1.5">
        {displayText && <p>{displayText}</p>}
        {examples && examples.length > 0 && (
          <>
            {canInteract && (
              <p className="text-xs text-gray-500 font-normal not-italic">
                {t('exercise.tapLineForAudio')}
              </p>
            )}
            <ul className="space-y-1 font-medium">
              {examples.map((ex, i) =>
                canInteract ? (
                  <li key={i} className="list-none">
                    <button
                      type="button"
                      onClick={() => playExampleLine(i)}
                      className="group flex w-full items-start gap-2 rounded-lg border border-transparent px-2 py-1.5 text-left transition-colors hover:border-[#32C189]/40 hover:bg-[#DAF6EB]/50 active:scale-[0.99]"
                    >
                      <Volume2 className="mt-0.5 h-4 w-4 shrink-0 text-[#32C189] opacity-70 group-hover:opacity-100" aria-hidden />
                      <span>{ex}</span>
                    </button>
                  </li>
                ) : (
                  <li key={i}>{ex}</li>
                ),
              )}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
