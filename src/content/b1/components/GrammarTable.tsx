'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Volume2 } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { useT } from '@/i18n/useT';
import { useTranslate } from '@/i18n/useTranslate';
import { InlineTranslation } from '@/components/InlineTranslation';
import { TtsHint } from '@/components/TtsHint';
import { getTtsAudioPath, playTtsAudio, stopTtsAudio } from '@/lib/tts';
import type { B1GrammarTableExercise } from '../types';

interface Props {
  exercise: B1GrammarTableExercise;
  onComplete?: (correct: boolean, score: number) => void;
  exerciseId?: string;
}

type TableRow = {
  pronoun: string;
  cells: string[];
  pronunciations?: Record<string, string>;
  ttsText?: string;
  noAudio?: boolean;
};

function renderBoldText(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      // Inline color: Tailwind content[] does not scan src/content/, so text-[#…] classes here are dropped.
      return <span key={i} className="font-extrabold" style={{ color: '#32C189' }}>{part.slice(2, -2)}</span>;
    }
    return part;
  });
}

function ClickTranslateTh({
  text,
  className,
  colSpan,
  onClick,
  showSpeaker,
}: {
  text: string;
  className: string;
  colSpan?: number;
  onClick?: () => void;
  showSpeaker?: boolean;
}) {
  const { lang } = useLanguage();
  const translated = useTranslate(text);
  const isNonBg = lang !== 'bg';

  return (
    <th
      className={`${className} ${onClick ? 'cursor-pointer select-none' : ''}`}
      colSpan={colSpan}
      onClick={onClick ? (e) => { e.stopPropagation(); onClick(); } : undefined}
    >
      <span className="inline-flex items-center justify-center gap-2">
        <span>{text}</span>
        {showSpeaker ? <Volume2 className="w-3.5 h-3.5 text-white/80 shrink-0" /> : null}
      </span>
      {isNonBg && translated !== text && (
        <span className="block text-xs font-normal text-white/75 mt-0.5 italic">
          {translated}
        </span>
      )}
    </th>
  );
}

function speakableRowText(row: TableRow): string {
  if (row.ttsText) return row.ttsText;
  const isNumericPronoun = /^\d[\d\s]*$/.test(row.pronoun.trim());
  const speakableCells = row.cells.filter(c => !c.trim().startsWith('-'));
  const parts = isNumericPronoun ? speakableCells : [row.pronoun, ...speakableCells].filter(Boolean);
  return parts.join('. ').replace(/\*\*(.+?)\*\*/g, '$1');
}

function SingleTable({
  tableTitle,
  columns,
  pronounHeader,
  rows,
  boldColumns,
  widePronouns,
  alignLeft,
  disableAudio,
  exerciseId,
  rowIndexOffset = 0,
}: {
  tableTitle?: string;
  columns: string[];
  pronounHeader?: string;
  rows: TableRow[];
  boldColumns: number[];
  widePronouns: boolean;
  alignLeft: boolean;
  disableAudio: boolean;
  exerciseId?: string;
  /** Global row index offset so panel rows map to flat TTS files (`{id}-row-N`). */
  rowIndexOffset?: number;
}) {
  const { lang } = useLanguage();

  const playRow = (idx: number) => {
    if (disableAudio) return;
    const row = rows[idx];
    if (row.noAudio) return;
    const text = speakableRowText(row);
    const globalIdx = rowIndexOffset + idx;
    const audioPath = exerciseId
      ? getTtsAudioPath(exerciseId, 'grammar', `${exerciseId}-row-${globalIdx}`)
      : '';
    playTtsAudio(audioPath, text);
  };

  const colSpan = columns.length > 0 ? columns.length + 1 : (rows[0]?.cells.length ?? 0) + 1;
  const showPronounCol = rows.some(r => (r.pronoun ?? '').trim() !== '');

  const cellAlign = alignLeft ? 'text-left' : 'text-center';
  const cellJustify = alignLeft ? 'justify-start' : 'justify-center';

  return (
    <div className="overflow-x-auto">
      <table className={`w-full border-collapse rounded-xl overflow-hidden shadow-sm ${cellAlign} border-2 border-[#7ab356]`}>
        {tableTitle && (
          <thead>
            <tr>
              <ClickTranslateTh
                text={tableTitle}
                className="bg-[#5a8a3c] text-white text-base md:text-lg font-bold py-3 px-4 text-center"
                colSpan={showPronounCol ? colSpan : Math.max(columns.length, rows[0]?.cells.length ?? 1)}
              />
            </tr>
            {columns.length > 0 && (
              <tr className="bg-[#7ab356] text-white">
                {showPronounCol && (
                  pronounHeader ? (
                    <ClickTranslateTh
                      text={pronounHeader}
                      className={`py-2 px-3 md:px-5 font-bold text-sm md:text-base border-r border-[#5a8a3c]/30 ${widePronouns ? 'w-1/2' : 'min-w-[3.5rem] md:min-w-[5rem] w-[3.5rem] md:w-[5rem]'}`}
                    />
                  ) : (
                    <th className={`py-2 px-3 md:px-5 font-semibold text-sm md:text-base border-r border-[#5a8a3c]/30 ${widePronouns ? 'w-1/2' : 'min-w-[3.5rem] md:min-w-[5rem] w-[3.5rem] md:w-[5rem]'}`}>{'\u00A0'}</th>
                  )
                )}
                {columns.map((col, i) => (
                  <ClickTranslateTh
                    key={i}
                    text={col}
                    className="py-2 px-3 md:px-5 font-bold text-sm md:text-base border-r border-[#5a8a3c]/30 last:border-r-0 whitespace-nowrap text-center"
                  />
                ))}
              </tr>
            )}
          </thead>
        )}

        <tbody>
          {rows.map((row, rIdx) => {
            const rowSilent = disableAudio || !!row.noAudio;
            return (
            <React.Fragment key={rIdx}>
              <tr
                onClick={() => playRow(rIdx)}
                className={`${rowSilent ? '' : 'cursor-pointer hover:bg-[#edf5e4]'} transition-colors ${row.noAudio ? 'bg-[#edf5e4]' : rIdx % 2 === 0 ? 'bg-white' : 'bg-[#f4faee]'}`}
              >
                {showPronounCol && (
                  <td className={`py-2.5 px-3 md:px-5 font-bold text-[#1F5741] text-sm md:text-base border-r border-gray-200 border-b border-b-gray-100 ${widePronouns ? 'w-1/2' : 'min-w-[5rem] md:min-w-[7rem]'}`}>
                    <div className="flex items-center justify-between gap-1">
                      <span>{row.pronoun}</span>
                      {!rowSilent && <Volume2 className="w-3.5 h-3.5 text-[#32C189] opacity-60 flex-shrink-0" />}
                    </div>
                  </td>
                )}
                {row.cells.map((cell, cIdx) => (
                  <td
                    key={cIdx}
                    className={`py-2.5 px-3 md:px-5 text-sm md:text-base text-gray-800 border-r border-gray-200 border-b border-b-gray-100 last:border-r-0 ${row.noAudio ? 'italic text-[#1F5741] font-semibold' : boldColumns.includes(cIdx) ? 'font-bold text-[#32C189]' : 'font-medium'}`}
                  >
                    <div className={`flex items-center ${cellJustify} gap-1`}>
                      <span>{renderBoldText(cell)}</span>
                      {!showPronounCol && !rowSilent && cIdx === row.cells.length - 1 && (
                        <Volume2 className="w-3.5 h-3.5 text-[#32C189] opacity-60 flex-shrink-0" />
                      )}
                    </div>
                  </td>
                ))}
              </tr>
              {lang !== 'bg' && (
                <tr className="bg-[#e8f4fd]">
                  {row.pronunciations ? (
                    <td
                      colSpan={(showPronounCol ? 1 : 0) + row.cells.length}
                      className="py-1.5 px-3 md:px-5 border-b border-b-gray-100 text-center"
                    >
                      <InlineTranslation
                        text={row.pronoun || row.cells.join(' ')}
                        visible={true}
                        translations={row.pronunciations}
                        className="mt-0"
                      />
                    </td>
                  ) : (
                    <>
                      {showPronounCol && (
                        <td className="py-1.5 px-3 md:px-5 border-b border-b-gray-100 border-r border-r-gray-200 text-center">
                          <InlineTranslation text={row.pronoun} visible={true} className="mt-0" />
                        </td>
                      )}
                      {row.cells.map((cell, cIdx) => (
                        <td
                          key={cIdx}
                          className="py-1.5 px-3 md:px-5 border-b border-b-gray-100 border-r border-r-gray-200 last:border-r-0 text-center"
                        >
                          <InlineTranslation text={cell} visible={true} className="mt-0" />
                        </td>
                      ))}
                    </>
                  )}
                </tr>
              )}
            </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

/** A2-style blue example card: title + divider + centered lines. Click plays all rows in order. */
function ExampleCard({
  title,
  rows,
  disableAudio,
  exerciseId,
  rowIndexOffset = 0,
}: {
  title?: string;
  rows: TableRow[];
  disableAudio: boolean;
  exerciseId?: string;
  rowIndexOffset?: number;
}) {
  const [playing, setPlaying] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const cancelRef = useRef(false);

  useEffect(() => {
    return () => {
      cancelRef.current = true;
      stopTtsAudio();
    };
  }, []);

  const speakable = rows
    .map((row, i) => ({ i, text: speakableRowText(row), silent: !!row.noAudio }))
    .filter(x => !x.silent && x.text.length > 0);

  const playAll = () => {
    if (disableAudio || !speakable.length) return;

    if (playing) {
      cancelRef.current = true;
      stopTtsAudio();
      setPlaying(false);
      return;
    }

    cancelRef.current = false;
    setPlaying(true);
    setRevealed(prev => !prev);

    const step = (pos: number) => {
      if (cancelRef.current) {
        setPlaying(false);
        return;
      }
      if (pos >= speakable.length) {
        setPlaying(false);
        return;
      }
      const { i, text } = speakable[pos];
      const globalIdx = rowIndexOffset + i;
      const audioPath = exerciseId
        ? getTtsAudioPath(exerciseId, 'grammar', `${exerciseId}-row-${globalIdx}`)
        : '';
      playTtsAudio(audioPath, text, undefined, () => {
        if (cancelRef.current) {
          setPlaying(false);
          return;
        }
        window.setTimeout(() => step(pos + 1), 300);
      });
    };
    step(0);
  };

  const cardBody = (
    <>
      {title && (
        <p className="text-sm md:text-base font-bold uppercase tracking-wide text-[#0072BC] mb-3 pb-2 border-b border-[#CDE3F1]">
          {title}
        </p>
      )}
      <div className="space-y-2.5">
        {rows.map((row, i) => {
          const line = row.cells.join(' ').trim() || row.pronoun;
          if (!line) return null;
          return (
            <div key={i}>
              <p className="text-sm md:text-base text-gray-800 leading-relaxed">
                {renderBoldText(line)}
              </p>
              <InlineTranslation
                text={line.replace(/\*\*(.+?)\*\*/g, '$1')}
                visible={revealed}
                translations={row.pronunciations}
              />
            </div>
          );
        })}
      </div>
    </>
  );

  if (disableAudio) {
    return (
      <div className="w-full rounded-xl border-2 border-[#CDE3F1] bg-[#f8fbfd] p-5 md:p-6 shadow-sm text-center">
        {cardBody}
      </div>
    );
  }

  return (
    <div
      onClick={playAll}
      className={`w-full rounded-xl border-2 p-5 md:p-6 shadow-sm cursor-pointer transition-all active:scale-[0.99] text-center ${
        playing
          ? 'border-[#32C189]/60 bg-[#DAF6EB]/50'
          : 'border-[#CDE3F1] bg-[#f8fbfd] hover:border-[#32C189]/60'
      }`}
    >
      {cardBody}
    </div>
  );
}

export function GrammarTable({ exercise, exerciseId }: Props) {
  const t = useT();
  const {
    tableTitle,
    columns = [],
    pronounHeader,
    rows = [],
    panels,
    notes = [],
    ttsNotes,
    boldColumns = [],
    widePronouns = false,
    alignLeft = false,
    disableAudio = false,
    variant = 'table',
  } = exercise;

  const playNote = (idx: number, note: string) => {
    if (disableAudio) return;
    const audioPath = exerciseId
      ? getTtsAudioPath(exerciseId, 'grammar', `${exerciseId}-note-${idx}`)
      : '';
    playTtsAudio(audioPath, ttsNotes?.[idx] ?? note);
  };

  const resolvedPanels = panels?.length
    ? panels
    : [{ tableTitle, columns, pronounHeader, rows, fullWidth: true as boolean | undefined }];

  // Keep side-by-side panels first, then full-width — same order as flattened
  // `rows` used by generate-tts.ts (global row-0, row-1, …).
  const orderedPanels = [
    ...resolvedPanels.filter(p => !p.fullWidth),
    ...resolvedPanels.filter(p => p.fullWidth),
  ];
  const sideBySide = orderedPanels.filter(p => !p.fullWidth);
  const fullWidth = orderedPanels.filter(p => p.fullWidth);
  const sideBySideRowCount = sideBySide.reduce((n, p) => n + p.rows.length, 0);

  if (variant === 'example-cards') {
    return (
      <div className="bg-white rounded-xl p-6 md:p-10 shadow-md space-y-6">
        {!disableAudio && <TtsHint messageKey="exercise.tapCardToHear" />}

        {sideBySide.length > 0 && (
          <div className={`flex flex-wrap justify-center gap-4 md:gap-6 ${sideBySide.length >= 2 ? '' : ''}`}>
            {sideBySide.map((panel, i) => {
              const rowIndexOffset = sideBySide
                .slice(0, i)
                .reduce((n, p) => n + p.rows.length, 0);
              return (
                <div
                  key={i}
                  className={sideBySide.length >= 2 ? 'w-full sm:w-[calc(50%-0.75rem)]' : 'w-full max-w-xl'}
                >
                  <ExampleCard
                    title={panel.tableTitle}
                    rows={panel.rows}
                    disableAudio={disableAudio}
                    exerciseId={exerciseId}
                    rowIndexOffset={rowIndexOffset}
                  />
                </div>
              );
            })}
          </div>
        )}

        {fullWidth.map((panel, i) => {
          const rowIndexOffset = sideBySideRowCount
            + fullWidth.slice(0, i).reduce((n, p) => n + p.rows.length, 0);
          return (
            <div key={`fw-${i}`} className="flex justify-center">
              <div className="w-full max-w-xl">
                <ExampleCard
                  title={panel.tableTitle}
                  rows={panel.rows}
                  disableAudio={disableAudio}
                  exerciseId={exerciseId}
                  rowIndexOffset={rowIndexOffset}
                />
              </div>
            </div>
          );
        })}

        {notes.length > 0 && (
          <div className="flex flex-col gap-3">
            {notes.map((note, i) => (
              <div
                key={i}
                onClick={() => playNote(i, note)}
                className={`border-2 border-[#CDE3F1] rounded-lg px-5 py-3 bg-[#f8fbfd] text-center transition-colors ${disableAudio ? '' : 'cursor-pointer hover:border-[#32C189]/60'}`}
              >
                <div className="flex items-center justify-center gap-2">
                  <p className="text-sm md:text-base font-semibold text-gray-800">{renderBoldText(note)}</p>
                  {!disableAudio && <Volume2 className="w-3.5 h-3.5 text-[#32C189] opacity-60 flex-shrink-0" />}
                </div>
                <InlineTranslation text={note} visible={true} />
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 md:p-10 shadow-md space-y-6">
      {!disableAudio && (
        <p className="text-xs text-gray-400 text-center italic flex items-center justify-center gap-1">
          <Volume2 className="w-3 h-3" />
          {t('exercise.tapCardToHear')}
        </p>
      )}

      {sideBySide.length > 0 && (
        <div className={`grid grid-cols-1 gap-4 ${sideBySide.length >= 2 ? 'md:grid-cols-2' : ''}`}>
          {sideBySide.map((panel, i) => {
            const rowIndexOffset = sideBySide
              .slice(0, i)
              .reduce((n, p) => n + p.rows.length, 0);
            return (
              <SingleTable
                key={i}
                tableTitle={panel.tableTitle}
                columns={panel.columns ?? []}
                pronounHeader={panel.pronounHeader}
                rows={panel.rows}
                boldColumns={boldColumns}
                widePronouns={widePronouns}
                alignLeft={alignLeft}
                disableAudio={disableAudio}
                exerciseId={exerciseId}
                rowIndexOffset={rowIndexOffset}
              />
            );
          })}
        </div>
      )}

      {fullWidth.map((panel, i) => {
        const rowIndexOffset = sideBySideRowCount
          + fullWidth.slice(0, i).reduce((n, p) => n + p.rows.length, 0);
        return (
          <SingleTable
            key={`fw-${i}`}
            tableTitle={panel.tableTitle}
            columns={panel.columns ?? []}
            pronounHeader={panel.pronounHeader}
            rows={panel.rows}
            boldColumns={boldColumns}
            widePronouns={widePronouns}
            alignLeft={alignLeft}
            disableAudio={disableAudio}
            exerciseId={exerciseId}
            rowIndexOffset={rowIndexOffset}
          />
        );
      })}

      {notes.length > 0 && (
        <div className="flex flex-col gap-3">
          {notes.map((note, i) => (
            <div
              key={i}
              onClick={() => playNote(i, note)}
              className={`border-2 border-[#7ab356] rounded-lg px-5 py-3 bg-[#f4faee] text-center transition-colors ${disableAudio ? '' : 'cursor-pointer hover:bg-[#edf5e4]'}`}
            >
              <div className="flex items-center justify-center gap-2">
                <p className="text-sm md:text-base font-semibold text-gray-800">{renderBoldText(note)}</p>
                {!disableAudio && <Volume2 className="w-3.5 h-3.5 text-[#32C189] opacity-60 flex-shrink-0" />}
              </div>
              <InlineTranslation text={note} visible={true} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
