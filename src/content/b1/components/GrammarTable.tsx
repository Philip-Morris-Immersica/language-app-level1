'use client';

import React, { useEffect, useRef, useState, type CSSProperties } from 'react';
import { Pause, Play, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/i18n/LanguageContext';
import { useT } from '@/i18n/useT';
import { useTranslate } from '@/i18n/useTranslate';
import { InlineTranslation } from '@/components/InlineTranslation';
import { TtsHint } from '@/components/TtsHint';
import {
  getTtsAudioPath,
  playTtsAudio,
  stopTtsAudio,
  pauseTtsAudio,
  resumeTtsAudio,
} from '@/lib/tts';
import { HIGHLIGHT_CLASS, HIGHLIGHT_STYLE } from './highlight';
import type { B1GrammarTableExercise } from '../types';

/** Tailwind `content[]` does not scan `src/content/` — border utilities are purged. */
const TABLE_FRAME: CSSProperties = {
  border: '2px solid #7ab356',
  borderRadius: '0.75rem',
  overflow: 'hidden',
  boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  width: '100%',
  maxWidth: '42rem',
  minWidth: '20rem',
};
const TABLE_FRAME_WIDE: CSSProperties = {
  ...TABLE_FRAME,
  maxWidth: '100%',
};
const TABLE_INNER: CSSProperties = { borderCollapse: 'collapse', width: '100%' };
const CELL_BORDER: CSSProperties = {
  borderRight: '1px solid #e5e7eb',
  borderBottom: '1px solid #f3f4f6',
};
const HEADER_CELL_BORDER: CSSProperties = {
  borderRight: '1px solid rgba(90, 138, 60, 0.3)',
};
const TITLE_HEADER_BG: CSSProperties = { backgroundColor: '#5a8a3c', color: '#fff' };
const COL_HEADER_BG: CSSProperties = { backgroundColor: '#7ab356', color: '#fff' };
const ROW_BG_EVEN: CSSProperties = { backgroundColor: '#ffffff' };
const ROW_BG_ODD: CSSProperties = { backgroundColor: '#f4faee' };
const ROW_BG_ACTIVE: CSSProperties = { backgroundColor: '#DAF6EB' };
const ROW_BG_NO_AUDIO: CSSProperties = { backgroundColor: '#edf5e4' };
const GREEN_BOX_BORDER: CSSProperties = {
  border: '2px solid #7ab356',
  borderRadius: '0.5rem',
};

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
      return (
        <span key={i} className={HIGHLIGHT_CLASS} style={HIGHLIGHT_STYLE}>
          {part.slice(2, -2)}
        </span>
      );
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
  style,
}: {
  text: string;
  className: string;
  colSpan?: number;
  onClick?: () => void;
  showSpeaker?: boolean;
  style?: CSSProperties;
}) {
  const { lang } = useLanguage();
  const translated = useTranslate(text);
  const isNonBg = lang !== 'bg';

  return (
    <th
      className={`${className} ${onClick ? 'cursor-pointer select-none' : ''}`}
      colSpan={colSpan}
      style={style}
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
  compactPronouns,
  alignLeft,
  disableAudio,
  exerciseId,
  rowIndexOffset = 0,
  activeGlobalRow = null,
  onManualPlay,
}: {
  tableTitle?: string;
  columns: string[];
  pronounHeader?: string;
  rows: TableRow[];
  boldColumns: number[];
  widePronouns: boolean;
  /** Lesson 8 conjugation tables only — hug the pronoun + speaker, don't stretch the first column. */
  compactPronouns: boolean;
  alignLeft: boolean;
  disableAudio: boolean;
  exerciseId?: string;
  /** Global row index offset so panel rows map to flat TTS files (`{id}-row-N`). */
  rowIndexOffset?: number;
  /** Row currently played by the section-wide „Слушай“ chain, as a global index. */
  activeGlobalRow?: number | null;
  onManualPlay?: () => void;
}) {
  const { lang } = useLanguage();

  const playRow = (idx: number) => {
    if (disableAudio) return;
    const row = rows[idx];
    if (row.noAudio) return;
    onManualPlay?.();
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

  // Used only by B1 lesson 8 ГРАМАТИКА 2. Inline styles because Tailwind
  // content[] does not scan `src/content/` — width/padding classes here are purged.
  const compactPronounStyle: CSSProperties | undefined = compactPronouns
    ? { width: 1, paddingLeft: '1.25rem', paddingRight: '1.5rem' }
    : undefined;
  const compactValueStyle: CSSProperties | undefined = compactPronouns
    ? { width: '100%' }
    : undefined;

  return (
    <div className="overflow-x-auto flex justify-center">
      <div style={columns.length === 0 ? TABLE_FRAME : TABLE_FRAME_WIDE}>
      <table style={TABLE_INNER} className={`${cellAlign}`}>
        {tableTitle && (
          <thead>
            <tr style={TITLE_HEADER_BG}>
              <ClickTranslateTh
                text={tableTitle}
                style={TITLE_HEADER_BG}
                className="text-base md:text-lg font-bold py-3 px-4 text-center"
                colSpan={showPronounCol ? colSpan : Math.max(columns.length, rows[0]?.cells.length ?? 1)}
              />
            </tr>
            {columns.length > 0 && (
              <tr style={COL_HEADER_BG}>
                {showPronounCol && (
                  pronounHeader ? (
                    <ClickTranslateTh
                      text={pronounHeader}
                      style={HEADER_CELL_BORDER}
                      className={`py-2 px-3 md:px-5 font-bold text-sm md:text-base ${widePronouns ? 'w-1/2' : 'min-w-[3.5rem] md:min-w-[5rem] w-[3.5rem] md:w-[5rem]'}`}
                    />
                  ) : (
                    <th style={HEADER_CELL_BORDER} className={`py-2 px-3 md:px-5 font-semibold text-sm md:text-base ${widePronouns ? 'w-1/2' : 'min-w-[3.5rem] md:min-w-[5rem] w-[3.5rem] md:w-[5rem]'}`}>{'\u00A0'}</th>
                  )
                )}
                {columns.map((col, i) => (
                  <ClickTranslateTh
                    key={i}
                    text={col}
                    style={i < columns.length - 1 ? HEADER_CELL_BORDER : undefined}
                    className="py-2 px-3 md:px-5 font-bold text-sm md:text-base whitespace-nowrap text-center"
                  />
                ))}
              </tr>
            )}
          </thead>
        )}

        <tbody>
          {rows.map((row, rIdx) => {
            const rowSilent = disableAudio || !!row.noAudio;
            const rowActive = activeGlobalRow === rowIndexOffset + rIdx;
            const rowBg = rowActive
              ? ROW_BG_ACTIVE
              : row.noAudio
                ? ROW_BG_NO_AUDIO
                : rIdx % 2 === 0
                  ? ROW_BG_EVEN
                  : ROW_BG_ODD;
            return (
            <React.Fragment key={rIdx}>
              <tr
                onClick={() => playRow(rIdx)}
                style={rowBg}
                className={`${rowSilent ? '' : 'cursor-pointer'} transition-colors`}
              >
                {showPronounCol && (
                  <td
                    className={`py-2.5 pl-4 pr-3 md:pl-5 md:pr-4 font-bold text-[#1F5741] text-sm md:text-base whitespace-nowrap ${widePronouns ? 'w-1/2' : 'w-[7.5rem] md:w-[9rem]'}`}
                    style={{ ...CELL_BORDER, ...compactPronounStyle }}
                  >
                    <div className={`flex items-center gap-1.5 ${widePronouns ? cellJustify : 'justify-start'}`}>
                      <span>{row.pronoun}</span>
                      {!rowSilent && <Volume2 className="w-3.5 h-3.5 text-[#32C189] opacity-60 flex-shrink-0" />}
                    </div>
                  </td>
                )}
                {row.cells.map((cell, cIdx) => (
                  <td
                    key={cIdx}
                    style={{
                      ...(cIdx < row.cells.length - 1 ? CELL_BORDER : { borderBottom: CELL_BORDER.borderBottom }),
                      ...compactValueStyle,
                    }}
                    className={`py-2.5 px-2 md:px-3 text-sm md:text-base text-gray-800 ${row.noAudio ? 'italic text-[#1F5741] font-semibold' : boldColumns.includes(cIdx) ? 'font-bold text-[#1F5741]' : 'font-medium'}`}
                  >
                    <div className={`flex items-center ${cellJustify} gap-1`}>
                      <span>{renderBoldText(cell)}</span>
                      {/* Speaker sits in the first column so the play affordance is next to
                          the row's opening word instead of trailing the last column. */}
                      {!showPronounCol && !rowSilent && cIdx === 0 && (
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
  activeGlobalRow = null,
  resetSignal = 0,
  onManualPlay,
}: {
  title?: string;
  rows: TableRow[];
  disableAudio: boolean;
  exerciseId?: string;
  rowIndexOffset?: number;
  /** Row currently played by the section-wide „Слушай“ chain, as a global index. */
  activeGlobalRow?: number | null;
  /** Bumped by the parent to drop stale local playback state when it takes over. */
  resetSignal?: number;
  onManualPlay?: () => void;
}) {
  const [playing, setPlaying] = useState(false);
  const [playingLine, setPlayingLine] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const cancelRef = useRef(false);

  useEffect(() => {
    return () => {
      cancelRef.current = true;
      stopTtsAudio();
    };
  }, []);

  useEffect(() => {
    if (resetSignal === 0) return;
    cancelRef.current = true;
    setPlaying(false);
    setPlayingLine(null);
  }, [resetSignal]);

  const externalLine =
    activeGlobalRow !== null &&
    activeGlobalRow >= rowIndexOffset &&
    activeGlobalRow < rowIndexOffset + rows.length
      ? activeGlobalRow - rowIndexOffset
      : null;
  const highlightedLine = playingLine ?? externalLine;

  const speakable = rows
    .map((row, i) => ({ i, text: speakableRowText(row), silent: !!row.noAudio }))
    .filter(x => !x.silent && x.text.length > 0);

  const playOne = (e: React.MouseEvent, idx: number) => {
    e.stopPropagation();
    if (disableAudio) return;
    const row = rows[idx];
    if (row.noAudio) return;
    onManualPlay?.();
    cancelRef.current = true;
    stopTtsAudio();
    setPlaying(false);
    const text = speakableRowText(row);
    const globalIdx = rowIndexOffset + idx;
    const audioPath = exerciseId
      ? getTtsAudioPath(exerciseId, 'grammar', `${exerciseId}-row-${globalIdx}`)
      : '';
    setPlayingLine(idx);
    playTtsAudio(audioPath, text, undefined, () => setPlayingLine(null));
  };

  const playAll = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (disableAudio || !speakable.length) return;
    onManualPlay?.();

    if (playing) {
      cancelRef.current = true;
      stopTtsAudio();
      setPlaying(false);
      setPlayingLine(null);
      return;
    }

    cancelRef.current = false;
    setPlaying(true);
    setPlayingLine(null);
    setRevealed(prev => !prev);

    const step = (pos: number) => {
      if (cancelRef.current) {
        setPlaying(false);
        return;
      }
      if (pos >= speakable.length) {
        setPlaying(false);
        setPlayingLine(null);
        return;
      }
      const { i, text } = speakable[pos];
      setPlayingLine(i);
      const globalIdx = rowIndexOffset + i;
      const audioPath = exerciseId
        ? getTtsAudioPath(exerciseId, 'grammar', `${exerciseId}-row-${globalIdx}`)
        : '';
      playTtsAudio(audioPath, text, undefined, () => {
        if (cancelRef.current) {
          setPlaying(false);
          return;
        }
        window.setTimeout(() => step(pos + 1), 80);
      });
    };
    step(0);
  };

  const cardBody = (
    <>
      {title && (
        <p
          onClick={playAll}
          className="text-sm md:text-base font-bold uppercase tracking-wide text-[#0072BC] mb-3 pb-2 border-b border-[#CDE3F1] cursor-pointer"
        >
          {title}
        </p>
      )}
      <div className="space-y-2.5">
        {rows.map((row, i) => {
          const line = row.cells.join(' ').trim() || row.pronoun;
          if (!line) return null;
          return (
            <div
              key={i}
              onClick={(e) => playOne(e, i)}
              className={`rounded-md px-2 py-1 -mx-2 cursor-pointer transition-colors ${
                highlightedLine === i ? 'bg-[#DAF6EB]/70' : 'hover:bg-[#DAF6EB]/40'
              }`}
            >
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
      className={`w-full rounded-xl border-2 p-5 md:p-6 shadow-sm text-center ${
        playing || externalLine !== null
          ? 'border-[#32C189]/60 bg-[#DAF6EB]/50'
          : 'border-[#CDE3F1] bg-[#f8fbfd]'
      }`}
    >
      {cardBody}
    </div>
  );
}

/** Gap between chained rows — small enough that the block reads as one take. */
const ROW_GAP_MS = 80;

export function GrammarTable({ exercise, exerciseId }: Props) {
  const t = useT();
  const [activeGlobalRow, setActiveGlobalRow] = useState<number | null>(null);
  const [playingAll, setPlayingAll] = useState(false);
  const [pausedAll, setPausedAll] = useState(false);
  const [resetSignal, setResetSignal] = useState(0);
  const chainRef = useRef<{ cancelled: boolean } | null>(null);

  useEffect(() => {
    return () => {
      if (chainRef.current) chainRef.current.cancelled = true;
      stopTtsAudio();
    };
  }, []);

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
    compactPronouns = false,
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

  // Every audible row of the block, in the same order as the `{id}-row-N` files,
  // so one press reads the whole grammar box instead of one card at a time.
  const speakableRows: { globalIdx: number; text: string }[] = [];
  {
    let offset = 0;
    for (const panel of orderedPanels) {
      panel.rows.forEach((row, i) => {
        const text = speakableRowText(row);
        if (!row.noAudio && text) speakableRows.push({ globalIdx: offset + i, text });
      });
      offset += panel.rows.length;
    }
  }

  const makeChain = (tok: { cancelled: boolean }) => {
    const step = (pos: number) => {
      if (tok.cancelled) return;
      if (pos >= speakableRows.length) {
        if (chainRef.current === tok) chainRef.current = null;
        setPlayingAll(false);
        setActiveGlobalRow(null);
        return;
      }
      const { globalIdx, text } = speakableRows[pos];
      setActiveGlobalRow(globalIdx);
      const audioPath = exerciseId
        ? getTtsAudioPath(exerciseId, 'grammar', `${exerciseId}-row-${globalIdx}`)
        : '';
      playTtsAudio(audioPath, text, undefined, () => {
        if (tok.cancelled) return;
        window.setTimeout(() => {
          if (!tok.cancelled) step(pos + 1);
        }, ROW_GAP_MS);
      });
    };
    return step;
  };

  const cancelChain = () => {
    if (chainRef.current) chainRef.current.cancelled = true;
    chainRef.current = null;
    setPlayingAll(false);
    setPausedAll(false);
    setActiveGlobalRow(null);
  };

  /** A row or card was played by hand — give up the running section chain. */
  const handleManualPlay = () => {
    if (chainRef.current || playingAll || pausedAll) cancelChain();
  };

  const handlePlayAll = () => {
    if (disableAudio || speakableRows.length === 0) return;

    if (playingAll) {
      pauseTtsAudio();
      setPlayingAll(false);
      setPausedAll(true);
      return;
    }

    if (pausedAll && chainRef.current && !chainRef.current.cancelled) {
      const token = chainRef.current;
      const pausedPos =
        activeGlobalRow !== null
          ? Math.max(0, speakableRows.findIndex(r => r.globalIdx === activeGlobalRow))
          : 0;
      const step = makeChain(token);
      const resumed = resumeTtsAudio(() => {
        if (token.cancelled) return;
        window.setTimeout(() => {
          if (!token.cancelled) step(pausedPos + 1);
        }, ROW_GAP_MS);
      });
      if (resumed) {
        setPlayingAll(true);
        setPausedAll(false);
        return;
      }
      token.cancelled = true;
      chainRef.current = null;
    }

    cancelChain();
    stopTtsAudio();
    setResetSignal(s => s + 1);
    const token = { cancelled: false };
    chainRef.current = token;
    setPlayingAll(true);
    setPausedAll(false);
    makeChain(token)(0);
  };

  const listenAllButton = disableAudio || speakableRows.length < 2 ? null : (
    <div className="flex justify-end">
      <Button
        onClick={handlePlayAll}
        className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm shadow-md active:scale-95 transition-all ${
          playingAll
            ? 'bg-[#D25A45] hover:bg-[#9C4637] text-white'
            : 'bg-white border-2 border-[#32C189] text-[#1F5741] hover:bg-[#DAF6EB]'
        }`}
      >
        {playingAll ? (
          <><Pause className="w-4 h-4" />{t('exercise.pause')}</>
        ) : pausedAll ? (
          <><Play className="w-4 h-4" />{t('exercise.continue')}</>
        ) : (
          <><Play className="w-4 h-4" />{t('exercise.listen')}</>
        )}
      </Button>
    </div>
  );

  if (variant === 'example-cards') {
    return (
      <div className="bg-white rounded-xl p-6 md:p-10 shadow-md space-y-6">
        {listenAllButton}
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
                    activeGlobalRow={activeGlobalRow}
                    resetSignal={resetSignal}
                    onManualPlay={handleManualPlay}
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
                  activeGlobalRow={activeGlobalRow}
                  resetSignal={resetSignal}
                  onManualPlay={handleManualPlay}
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
      {listenAllButton}
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
                compactPronouns={compactPronouns}
                alignLeft={alignLeft}
                disableAudio={disableAudio}
                exerciseId={exerciseId}
                rowIndexOffset={rowIndexOffset}
                activeGlobalRow={activeGlobalRow}
                onManualPlay={handleManualPlay}
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
            compactPronouns={compactPronouns}
            alignLeft={alignLeft}
            disableAudio={disableAudio}
            exerciseId={exerciseId}
            rowIndexOffset={rowIndexOffset}
            activeGlobalRow={activeGlobalRow}
            onManualPlay={handleManualPlay}
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
              style={GREEN_BOX_BORDER}
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
