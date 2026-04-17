'use client';

import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Check, X, RotateCcw, Play, Square } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useT } from '@/i18n/useT';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useExercisePersistence } from '@/hooks/useExercisePersistence';
import { useLanguage } from '@/i18n/LanguageContext';
import { InlineTranslation } from '@/components/InlineTranslation';
import { speakBulgarian, getTtsAudioPath, playTtsAudio, stopTtsAudio } from '@/lib/tts';

const COLUMN_KEY_MAP: Record<string, string> = {
  'мъжки': 'grammar.masculine',
  'женски': 'grammar.feminine',
  'среден': 'grammar.neuter',
  'множествено': 'grammar.plural',
};

interface Paragraph {
  speaker?: string;
  text: string;
}

interface TableCell {
  correctAnswers: string[];
  options: string[];
}

interface TableRow {
  label: string;
  cells: TableCell[];
}

interface Table {
  name: string;
  columns: string[];
  rows: TableRow[];
}

interface TableFillProps {
  tables: Table[];
  paragraphs?: Paragraph[];
  onComplete?: (correct: boolean, score: number) => void;
  exerciseId?: string;
}

export function TableFill({ tables, paragraphs, onComplete, exerciseId }: TableFillProps) {
  const t = useT();
  const { lang } = useLanguage();
  const [revealedParas, setRevealedParas] = useState<Set<number>>(new Set());
  const [sequentialPlaying, setSequentialPlaying] = useState(false);
  const [playingParaIndex, setPlayingParaIndex] = useState<number | null>(null);
  const seqRef = useRef<{ cancelled: boolean } | null>(null);
  const { savedState, saveState } = useExercisePersistence(exerciseId);
  const s = savedState as any;

  const [answers, setAnswers] = useState<Record<string, string>>(() => s?.answers ?? {});
  const [validation, setValidation] = useState<Record<string, boolean | null>>(() => s?.validation ?? {});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(() => s?.isSubmitted ?? false);
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) { mounted.current = true; return; }
    saveState({ answers, validation, isSubmitted });
  }, [answers, validation, isSubmitted]);

  const cellKey = (tableIdx: number, rowIdx: number, cellIdx: number) =>
    `${tableIdx}-${rowIdx}-${cellIdx}`;

  const handleSelect = (key: string, value: string) => {
    setAnswers(prev => {
      const next = { ...prev, [key]: value };

      if (value !== '—') {
        const parts = key.split('-').map(Number);
        const [ti, ri, ci] = parts;
        const row = tables[ti]?.rows[ri];
        if (row) {
          row.cells.forEach((otherCell, otherCi) => {
            if (otherCi === ci) return;
            const hasWord = otherCell.options.some(o => o !== '—');
            const hasDash = otherCell.options.includes('—');
            if (hasWord && hasDash && otherCell.correctAnswers.includes('—')) {
              next[cellKey(ti, ri, otherCi)] = '—';
            }
          });
        }
      }

      return next;
    });
    if (isSubmitted) {
      setIsSubmitted(false);
      setValidation({});
    }
  };

  const stopSequentialPlayback = useCallback(() => {
    if (seqRef.current) seqRef.current.cancelled = true;
    seqRef.current = null;
    stopTtsAudio();
    setSequentialPlaying(false);
    setPlayingParaIndex(null);
  }, []);

  const handleSequentialListen = () => {
    if (!exerciseId || !paragraphs?.length) return;
    if (sequentialPlaying) {
      stopSequentialPlayback();
      return;
    }
    const token = { cancelled: false };
    seqRef.current = token;
    setSequentialPlaying(true);

    const playNext = (i: number) => {
      if (token.cancelled) return;
      if (!paragraphs || i >= paragraphs.length) {
        if (seqRef.current === token) seqRef.current = null;
        setSequentialPlaying(false);
        setPlayingParaIndex(null);
        return;
      }
      const p = paragraphs[i];
      setPlayingParaIndex(i);
      const audioPath = getTtsAudioPath(exerciseId, 'texts', `${exerciseId}-p-${i}`);
      playTtsAudio(audioPath, p.text, undefined, () => {
        if (token.cancelled) return;
        window.setTimeout(() => {
          if (!token.cancelled) playNext(i + 1);
        }, 400);
      });
    };
    playNext(0);
  };

  useEffect(() => {
    return () => {
      if (seqRef.current) seqRef.current.cancelled = true;
      stopTtsAudio();
    };
  }, []);

  const handleReset = () => {
    setAnswers({});
    setValidation({});
    setIsSubmitted(false);
    saveState({ answers: {}, validation: {}, isSubmitted: false });
  };

  const handleSubmit = () => {
    const newValidation: Record<string, boolean> = {};
    let correctCount = 0;
    let totalCells = 0;

    tables.forEach((table, ti) => {
      table.rows.forEach((row, ri) => {
        row.cells.forEach((cell, ci) => {
          if (cell.options.length <= 1) return;
          totalCells++;
          const key = cellKey(ti, ri, ci);
          const answer = answers[key];
          const isCorrect = cell.correctAnswers.some(
            ca => ca.toLowerCase() === answer?.toLowerCase()
          );
          newValidation[key] = isCorrect;
          if (isCorrect) correctCount++;
        });
      });
    });

    setValidation(newValidation);
    setIsSubmitted(true);
    onComplete?.(correctCount === totalCells, correctCount);
  };

  const totalGraded = tables.reduce((sum, table) =>
    sum + table.rows.reduce((rSum, row) =>
      rSum + row.cells.filter(c => c.options.length > 1).length, 0
    ), 0
  );

  const correctCount = Object.values(validation).filter(v => v === true).length;

  const shuffledOptions = useMemo(() => {
    const map: Record<string, string[]> = {};
    tables.forEach((table, ti) => {
      table.rows.forEach((row, ri) => {
        row.cells.forEach((cell, ci) => {
          const key = cellKey(ti, ri, ci);
          if (cell.options.length > 1) {
            const arr = [...cell.options];
            for (let i = arr.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [arr[i], arr[j]] = [arr[j], arr[i]];
            }
            map[key] = arr;
          }
        });
      });
    });
    return map;
  }, [tables]);

  return (
    <div className="bg-white rounded-xl p-4 md:p-8 shadow-md space-y-6">
      {paragraphs && paragraphs.length > 0 && (
        <div className="space-y-4">
          {exerciseId && (
            <div className="flex justify-end">
              <Button
                type="button"
                onClick={handleSequentialListen}
                className={`px-5 py-2.5 rounded-lg font-semibold text-sm md:text-base shadow-md active:scale-95 transition-all flex items-center gap-2 ${
                  sequentialPlaying
                    ? 'bg-red-500 hover:bg-red-600 text-white'
                    : 'bg-[#8FC412] hover:bg-[#7DAD0E] text-white'
                }`}
              >
                {sequentialPlaying ? (
                  <>
                    <Square className="w-4 h-4 md:w-5 md:h-5" />
                    {t('exercise.stop')}
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 md:w-5 md:h-5" />
                    {t('exercise.listen')}
                  </>
                )}
              </Button>
            </div>
          )}
          {lang !== 'bg' && (
            <p className="text-xs text-gray-400 text-center italic">{t('exercise.tapToTranslate')}</p>
          )}
          {paragraphs.map((para, i) => (
            <div
              key={i}
              onClick={() => {
                if (sequentialPlaying) stopSequentialPlayback();
                if (exerciseId) {
                  const audioPath = getTtsAudioPath(exerciseId, 'texts', `${exerciseId}-p-${i}`);
                  setPlayingParaIndex(i);
                  playTtsAudio(audioPath, para.text, undefined, () => setPlayingParaIndex(null));
                } else {
                  speakBulgarian(para.text);
                }
                setRevealedParas(prev => {
                  const next = new Set(prev);
                  if (next.has(i)) next.delete(i); else next.add(i);
                  return next;
                });
              }}
              className={`cursor-pointer rounded-lg p-3 -mx-1 transition-colors active:scale-[0.99] ${
                playingParaIndex === i
                  ? 'bg-[#f4faee] border border-[#8FC412]/40'
                  : 'hover:bg-gray-50 border border-transparent'
              }`}
            >
              {para.speaker && (
                <p className="text-xs font-bold text-[#0279C3] mb-1">{para.speaker}</p>
              )}
              <p className="text-base md:text-lg text-gray-800 leading-relaxed">{para.text}</p>
              <InlineTranslation text={para.text} visible={revealedParas.has(i)} />
            </div>
          ))}
        </div>
      )}

      {tables.map((table, ti) => (
        <div key={ti}>
          {table.name && (
            <h4 className="text-sm md:text-base font-bold text-[#0279C3] mb-3">
              {table.name}
            </h4>
          )}

          <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
            <table className="w-full border-collapse text-sm md:text-base min-w-[400px]">
              <thead>
                <tr className="bg-[#f0f7ff]">
                  <th className="border border-gray-200 px-3 py-2 text-left font-bold text-gray-600 w-28 md:w-36" />
                  {table.columns.map((col, ci) => (
                    <th
                      key={ci}
                      className="border border-gray-200 px-3 py-2 text-center font-bold text-[#0279C3]"
                    >
                      {COLUMN_KEY_MAP[col] ? t(COLUMN_KEY_MAP[col]) : col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {table.rows.map((row, ri) => (
                  <tr key={ri} className={ri % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                    <td className="border border-gray-200 px-3 py-2 font-semibold text-gray-800">
                      {row.label}
                    </td>
                    {row.cells.map((cell, ci) => {
                      const key = cellKey(ti, ri, ci);
                      const isSingleOption = cell.options.length <= 1;

                      if (isSingleOption) {
                        return (
                          <td key={ci} className="border border-gray-200 px-3 py-2 text-center text-gray-500">
                            {cell.correctAnswers[0]}
                          </td>
                        );
                      }

                      return (
                        <td
                          key={ci}
                          className={`border border-gray-200 px-2 py-1.5 text-center ${
                            validation[key] === true ? 'bg-green-50' : ''
                          }${validation[key] === false ? 'bg-red-50' : ''}`}
                        >
                          <div className="flex items-center justify-center gap-1">
                            <Select
                              value={answers[key] || ''}
                              onValueChange={(value) => handleSelect(key, value)}
                            >
                              <SelectTrigger className={`
                                w-full min-w-[80px] h-8 text-xs md:text-sm font-medium
                                ${validation[key] === true ? 'border-green-500 bg-green-50' : ''}
                                ${validation[key] === false ? 'border-red-500 bg-red-50' : ''}
                              `}>
                                <SelectValue placeholder="—" />
                              </SelectTrigger>
                              <SelectContent>
                                {(shuffledOptions[key] || cell.options).map((opt) => (
                                  <SelectItem key={opt} value={opt} className="text-xs md:text-sm">
                                    {opt}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            {validation[key] === true && <Check className="w-4 h-4 text-green-600 flex-shrink-0" />}
                            {validation[key] === false && <X className="w-4 h-4 text-red-600 flex-shrink-0" />}
                          </div>
                          {isSubmitted && validation[key] === false && (
                            <p className="text-[10px] md:text-xs text-yellow-700 mt-1">
                              {cell.correctAnswers[0]}
                            </p>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}

      <div className="flex gap-3 mt-6">
        <Button
          onClick={handleSubmit}
          className="bg-[#8FC412] hover:bg-[#7DAD0E] text-white text-base font-semibold px-8 py-3 w-full sm:w-auto min-h-[48px] active:scale-95 transition-transform rounded-lg"
        >
          {t('exercise.checkAnswers')}
        </Button>
        <Button variant="outline" onClick={handleReset} className="text-base font-semibold px-6 py-3 min-h-[48px] active:scale-95 transition-transform rounded-lg border-2">
          <RotateCcw className="w-4 h-4 mr-2" />
          {t('exercise.reset')}
        </Button>
      </div>

      {isSubmitted && (
        <div className="p-4 rounded-lg bg-white border-2 border-[#8B9D5F] animate-in fade-in duration-300">
          <div className="flex items-center gap-2">
            {correctCount === totalGraded ? (
              <Check className="w-6 h-6 text-green-600" />
            ) : (
              <X className="w-6 h-6 text-red-600" />
            )}
            <p className="text-base font-semibold text-gray-800">
              {t('exercise.result')} {correctCount} / {totalGraded} {t('exercise.correct_n')}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
