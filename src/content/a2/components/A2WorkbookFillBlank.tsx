'use client';

/**
 * A2 wrapper around the shared WorkbookFillBlank.
 *
 * Why: listening fill-in exercises (e.g. A2 урок 7 упр. 30) play a long MP3
 * at 1× with no speed control. Dictation `reading_text` already has the
 * turtle 0.85× toggle. Nina cannot edit `src/components/exercises/`, so this
 * wrapper intercepts `listeningText` and adds the same slow-mode control.
 *
 * Non-listening workbook_fill_blank exercises pass through unchanged.
 */

import { useCallback, useEffect, useState } from 'react';
import { Pause, Play, Turtle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useT } from '@/i18n/useT';
import { WorkbookFillBlank } from '@/components/exercises/WorkbookFillBlank';
import {
  getTtsAudioPath,
  playTtsAudio,
  setTtsAudioRate,
  stopTtsAudio,
} from '@/lib/tts';
import type { WorkbookFillBlankExercise } from '@/content/types';

interface Props {
  exercise: { id: string; type: string; [key: string]: unknown };
  onComplete?: (correct: boolean, score: number) => void;
  exerciseId?: string;
}

export function A2WorkbookFillBlank({ exercise, onComplete, exerciseId }: Props) {
  const t = useT();
  const ex = exercise as unknown as WorkbookFillBlankExercise;
  const id = exerciseId ?? ex.id;
  const listeningText = ex.listeningText?.trim() || '';

  const [slowMode, setSlowMode] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    return window.localStorage.getItem('tts-slow-mode') !== '0';
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const ttsRate = listeningText && slowMode ? 0.85 : 1;

  const toggleSlowMode = useCallback(() => {
    setSlowMode(prev => {
      const next = !prev;
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('tts-slow-mode', next ? '1' : '0');
      }
      setTtsAudioRate(listeningText && next ? 0.85 : 1);
      return next;
    });
  }, [listeningText]);

  useEffect(() => {
    return () => stopTtsAudio();
  }, []);

  const handlePlayListening = () => {
    if (!listeningText) return;
    if (isPlaying) {
      stopTtsAudio();
      setIsPlaying(false);
      return;
    }
    const audioPath = getTtsAudioPath(id, 'listening', id);
    setIsPlaying(true);
    playTtsAudio(audioPath, listeningText, ttsRate, () => setIsPlaying(false));
  };

  return (
    <div>
      {listeningText ? (
        <div className="flex justify-end gap-2 mb-3 flex-wrap">
          <Button
            type="button"
            onClick={toggleSlowMode}
            title={slowMode ? 'Нормална скорост' : 'По-бавно четене (0.85x)'}
            className={`px-4 py-2.5 rounded-lg font-semibold text-sm shadow-md active:scale-95 transition-all flex items-center gap-2 ${
              slowMode
                ? 'bg-[#0072BC] text-white hover:bg-[#05568B]'
                : 'bg-white border-2 border-[#0072BC]/40 text-[#0072BC] hover:bg-[#CDE3F1]/40'
            }`}
          >
            <Turtle className="w-4 h-4" />
            {slowMode ? '0.85x' : '1x'}
          </Button>
          <Button
            type="button"
            onClick={handlePlayListening}
            className={`px-6 py-3 rounded-lg font-semibold text-base shadow-md min-h-[48px] active:scale-95 transition-all flex items-center gap-2 ${
              isPlaying
                ? 'bg-[#D25A45] hover:bg-[#9C4637] text-white'
                : 'bg-white border-2 border-[#32C189] text-[#1F5741] hover:bg-[#DAF6EB]'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-5 h-5" />
                {t('exercise.pause')}
              </>
            ) : (
              <>
                <Play className="w-5 h-5" />
                {t('exercise.listen')}
              </>
            )}
          </Button>
        </div>
      ) : null}

      <WorkbookFillBlank
        sentences={ex.sentences}
        layout={ex.layout}
        columnSplitAt={ex.columnSplitAt}
        hideSentenceNumbers={ex.hideSentenceNumbers}
        columnLabels={ex.columnLabels}
        imageUrl={ex.imageUrl}
        noZoom={ex.noZoom}
        images={ex.images}
        headerImages={ex.headerImages}
        listeningText={undefined}
        onComplete={onComplete}
        exerciseId={id}
      />
    </div>
  );
}
