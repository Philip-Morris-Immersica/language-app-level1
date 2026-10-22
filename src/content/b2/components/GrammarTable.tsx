'use client';

/**
 * B2 grammar table — a copy of the shared `GrammarTable` look & audio behaviour
 * (so it sits naturally next to the shared `grammar_table` sections) plus:
 *  - `tableSubtitle`: a line right under the green title bar, inside the table;
 *  - list notes: a note containing `\n` renders left-aligned; lines starting
 *    with `- ` become bullets inside the same green box.
 *  - `introText`: a long explanatory text in its own framed box under the header
 *    (so the instruction stays directly under the title);
 *  - `mergePronouns`: a repeated first-column label (e.g. gender) is written once,
 *    on the first row of its run, spanning the whole run.
 * Audio paths are identical to the shared table: `{id}-row-{i}`, `{id}-note-{i}`.
 */

import React, { useState, type CSSProperties } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { useT } from '@/i18n/useT';
import { useTranslate } from '@/i18n/useTranslate';
import { InlineTranslation } from '@/components/InlineTranslation';
import { getTtsAudioPath, playTtsAudio } from '@/lib/tts';
import { renderBoldText } from '@/lib/renderBoldText';
import { AudioIcon } from '@/components/AudioIcon';
import type { B2GrammarTableExercise } from '../types';

interface Props {
  exercise: B2GrammarTableExercise;
  onComplete?: (correct: boolean, score: number) => void;
  exerciseId?: string;
  /** Internal: render without the white card wrapper / hint (used for `thenTable`). */
  bare?: boolean;
  /** Internal: added to every row index when building MP3 paths (`thenTable` shares the main exercise's hidden audio rows). */
  rowAudioOffset?: number;
}

/** Tailwind does not scan `src/content/` — novel styles are inline. */
const SUBTITLE_CELL: CSSProperties = {
  backgroundColor: '#edf5e4',
  color: '#1F5741',
  borderBottom: '1px solid #c9e0b4',
};
const INTRO_BOX: CSSProperties = {
  border: '2px solid #7ab356',
  borderRadius: '0.75rem',
  backgroundColor: '#f4faee',
  color: '#1f2937',
  padding: '1rem 1.25rem',
  textAlign: 'left',
  lineHeight: 1.6,
};
const MERGED_PRONOUN_CELL: CSSProperties = {
  borderLeft: '2px solid #7ab356',
  verticalAlign: 'top',
  backgroundColor: '#ffffff',
};
const MERGED_CELL: CSSProperties = {
  verticalAlign: 'middle',
  backgroundColor: '#ffffff',
};
const NOTE_LIST: CSSProperties = {
  listStyleType: 'disc',
  paddingLeft: '1.25rem',
  margin: '0.25rem 0 0',
  textAlign: 'left',
};
const NOTE_LINE: CSSProperties = { margin: 0, textAlign: 'left' };

/** Textbook-style stacked list (`layout: 'stacked'`). */
const STACK_FRAME: CSSProperties = {
  border: '2px solid #7ab356',
  borderRadius: '0.75rem',
  overflow: 'hidden',
  backgroundColor: '#ffffff',
};
const STACK_ROW: CSSProperties = { padding: '0.6rem 0.5rem', textAlign: 'center' };
const STACK_GREEN_LINE: CSSProperties = {
  margin: '0.15rem 0 0',
  textAlign: 'center',
  color: '#3f9a3a',
  fontWeight: 600,
  lineHeight: 1.5,
};
const STACK_DARK_LINE: CSSProperties = { ...STACK_GREEN_LINE, color: '#111827', fontWeight: 700 };

function ClickTranslateDiv({
  text,
  revealed,
  onClick,
  audio = false,
}: {
  text: string;
  revealed: boolean;
  onClick: () => void;
  audio?: boolean;
}) {
  const { lang } = useLanguage();
  const translated = useTranslate(text);
  const isNonBg = lang !== 'bg';
  return (
    <div
      onClick={onClick}
      className={`bg-[#5a8a3c] text-white text-base md:text-lg font-bold py-3 px-4 text-center ${isNonBg || audio ? 'cursor-pointer' : ''}`}
    >
      <span>{text}</span>
      {audio && <AudioIcon className="w-3.5 h-3.5 inline-block ml-1.5 align-middle" />}
      {isNonBg && revealed && translated !== text && (
        <span className="block text-xs font-normal text-white/75 mt-0.5 italic">{translated}</span>
      )}
    </div>
  );
}

function ClickTranslateTh({
  text,
  className,
  colSpan,
  revealed,
  onAudio,
}: {
  text: string;
  className: string;
  colSpan?: number;
  revealed: boolean;
  /** When set, the heading is spoken on click and shows a speaker icon. */
  onAudio?: () => void;
}) {
  const { lang } = useLanguage();
  const translated = useTranslate(text);
  const isNonBg = lang !== 'bg';

  return (
    <th
      className={`${className}${onAudio ? ' cursor-pointer' : ''}`}
      colSpan={colSpan}
      onClick={onAudio}
    >
      <span>{text}</span>
      {onAudio && <AudioIcon className="w-3.5 h-3.5 inline-block ml-1.5 align-middle" />}
      {isNonBg && revealed && translated !== text && (
        <span className="block text-xs font-normal text-white/75 mt-0.5 italic">{translated}</span>
      )}
    </th>
  );
}

/** Plain note → one centered line (as in the shared table); multi-line note → heading lines + bullets. */
function NoteBody({ note }: { note: string }) {
  if (!note.includes('\n')) {
    return (
      <p className="text-sm md:text-base font-semibold text-gray-800">{renderBoldText(note)}</p>
    );
  }
  const blocks: ({ kind: 'p'; text: string } | { kind: 'ul'; items: string[] })[] = [];
  for (const line of note.split('\n')) {
    if (line.startsWith('- ')) {
      const last = blocks[blocks.length - 1];
      if (last && last.kind === 'ul') last.items.push(line.slice(2));
      else blocks.push({ kind: 'ul', items: [line.slice(2)] });
    } else if (line.trim()) {
      blocks.push({ kind: 'p', text: line });
    }
  }
  return (
    <div
      className="text-sm md:text-base font-semibold text-gray-800"
      style={{ flex: 1, textAlign: 'left' }}
    >
      {blocks.map((b, i) =>
        b.kind === 'p' ? (
          <p key={i} style={NOTE_LINE}>
            {renderBoldText(b.text)}
          </p>
        ) : (
          <ul key={i} style={NOTE_LIST}>
            {b.items.map((item, j) => (
              <li key={j}>{renderBoldText(item)}</li>
            ))}
          </ul>
        ),
      )}
    </div>
  );
}

/** Table cell: plain text, or — when it contains `\n` — a left-aligned bulleted list (one item per line). */
function CellBody({ cell }: { cell: string }) {
  if (!cell.includes('\n')) return <>{renderBoldText(cell)}</>;
  const items = cell
    .split('\n')
    .map(line => line.replace(/^- /, '').trim())
    .filter(Boolean);
  return (
    <ul style={{ ...NOTE_LIST, margin: 0, display: 'inline-block' }}>
      {items.map((item, i) => (
        <li key={i}>{renderBoldText(item)}</li>
      ))}
    </ul>
  );
}

export function GrammarTable({ exercise, exerciseId, bare = false, rowAudioOffset = 0 }: Props) {
  const { lang } = useLanguage();
  const t = useT();
  const {
    tableTitle,
    tableSubtitle,
    columns = [],
    rows = [],
    notes = [],
    ttsNotes = [],
    boldColumns = [],
    widePronouns = false,
    pronounColumnLabel,
    introText,
    mergePronouns = false,
    mergeCells = false,
    lead,
    notesNoAudio = false,
    headerAudio,
  } = exercise;

  const [revealedRows, setRevealedRows] = useState<Set<number>>(new Set());
  const [revealedNotes, setRevealedNotes] = useState<Set<number>>(new Set());
  const [headerRevealed, setHeaderRevealed] = useState(false);
  const [leadRevealed, setLeadRevealed] = useState(false);
  const translatedSubtitle = useTranslate(tableSubtitle ?? '');
  const translatedIntro = useTranslate(introText ?? '');

  /** Size of the run of identical `pronoun` values starting at `idx` (1 when merging is off). */
  const runSize = (idx: number) => {
    if (!mergePronouns) return 1;
    let n = 1;
    while (idx + n < rows.length && rows[idx + n].pronoun === rows[idx].pronoun) n++;
    return n;
  };
  const isRunStart = (idx: number) =>
    !mergePronouns || idx === 0 || rows[idx - 1].pronoun !== rows[idx].pronoun;

  /** `mergeCells`: size of the run of identical cells in column `cIdx` starting at row `idx`. */
  const cellRunSize = (idx: number, cIdx: number) => {
    if (!mergeCells) return 1;
    let n = 1;
    while (idx + n < rows.length && rows[idx + n].cells[cIdx] === rows[idx].cells[cIdx]) n++;
    return n;
  };
  const isCellRunStart = (idx: number, cIdx: number) =>
    !mergeCells || idx === 0 || rows[idx - 1].cells[cIdx] !== rows[idx].cells[cIdx];

  const leadBox = lead ? (
    <div style={{ ...STACK_FRAME, marginBottom: '0.75rem' }}>
      <ClickTranslateDiv
        text={lead.title}
        revealed={leadRevealed}
        onClick={() => setLeadRevealed(v => !v)}
      />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${lead.columns.length}, minmax(0, 1fr))`,
          gap: '0.75rem 1.5rem',
          padding: '1rem 1.25rem',
        }}
      >
        {lead.columns.map((lines, i) => {
          const audioIdx = lead.audio?.[i];
          return (
            <div
              key={i}
              style={{ textAlign: 'center', ...(audioIdx !== undefined ? { cursor: 'pointer' } : {}) }}
              onClick={audioIdx !== undefined ? () => playRowAudio(audioIdx) : undefined}
            >
              {lines.map((line, j) => (
                <p
                  key={j}
                  className="text-sm md:text-base font-medium text-gray-800"
                  style={{ margin: '0.15rem 0' }}
                >
                  {renderBoldText(line)}
                  {audioIdx !== undefined && j === lines.length - 1 && (
                    <AudioIcon className="w-3.5 h-3.5 inline-block ml-1.5 align-middle" />
                  )}
                </p>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  ) : null;

  const introBox = introText ? (
    <div
      style={{ ...INTRO_BOX, ...(headerAudio?.intro !== undefined ? { cursor: 'pointer' } : {}) }}
      className="text-sm md:text-base"
      onClick={() => {
        if (headerAudio?.intro !== undefined) playRowAudio(headerAudio.intro);
      }}
    >
      <p style={{ margin: 0 }}>
        {renderBoldText(introText)}
        {headerAudio?.intro !== undefined && (
          <AudioIcon className="w-3.5 h-3.5 inline-block ml-1.5 align-middle" />
        )}
      </p>
      {lang !== 'bg' && translatedIntro !== introText && (
        <p className="text-xs mt-2 italic text-[#0072BC]" style={{ margin: '0.5rem 0 0' }}>
          {translatedIntro}
        </p>
      )}
    </div>
  ) : null;

  const toggle = (setter: React.Dispatch<React.SetStateAction<Set<number>>>, idx: number) => {
    setter(prev => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  const playRow = (idx: number) => {
    playRowAudio(idx);
    toggle(setRevealedRows, idx);
  };

  /** Plays the MP3 of `rows[idx]` (a visible row or a `hidden` heading row) without touching translations. */
  const playRowAudio = (idx: number) => {
    const row = rows[idx];
    const isNumericPronoun = /^\d[\d\s]*$/.test(row.pronoun.trim());
    // Skip bare endings like "-л, -ла" (but keep list cells that start with "- ").
    const speakableCells = row.cells.filter(c => !/^-(?!\s)/.test(c.trim()));
    const parts = isNumericPronoun ? speakableCells : [row.pronoun, ...speakableCells];
    const audioPath = exerciseId
      ? getTtsAudioPath(exerciseId, 'grammar', `${exerciseId}-row-${idx + rowAudioOffset}`)
      : '';
    const spoken =
      row.ttsText ?? parts.join('. ').replace(/^- /gm, '').replace(/\n+/g, '. ');
    playTtsAudio(audioPath, spoken.replace(/\*\*/g, ''));
  };

  /** Click handler for a heading that has `headerAudio`; `undefined` = heading stays silent. */
  const headingAudio = (idx: number | undefined) =>
    idx === undefined ? undefined : () => playRowAudio(idx);

  const playNote = (idx: number, note: string) => {
    if (notesNoAudio) {
      toggle(setRevealedNotes, idx);
      return;
    }
    const audioPath = exerciseId
      ? getTtsAudioPath(exerciseId, 'grammar', `${exerciseId}-note-${idx}`)
      : '';
    playTtsAudio(audioPath, (ttsNotes[idx] ?? note).replace(/\*\*/g, '').replace(/^- /gm, ''));
    toggle(setRevealedNotes, idx);
  };

  const colSpan = columns.length > 0 ? columns.length + 1 : (rows[0]?.cells.length ?? 0) + 1;

  if (exercise.layout === 'stacked') {
    // Rows with `cardStart` (or every row with `stackDividers`) start a new block separated by a divider line;
    // row indices (audio paths) stay global.
    const stackSegments: { row: (typeof rows)[number]; rIdx: number }[][] = [];
    rows.forEach((row, rIdx) => {
      if (exercise.titleRowAudio && rIdx === rows.length - 1) return; // title row: played from the green title bar
      if (row.hidden) return; // audio-only heading row (see `headerAudio`)
      if (row.cardStart || exercise.stackDividers || stackSegments.length === 0) stackSegments.push([]);
      stackSegments[stackSegments.length - 1].push({ row, rIdx });
    });
    return (
      <div className="bg-white rounded-xl p-6 md:p-10 shadow-md space-y-6">
        {introBox}
        <p className="text-xs text-gray-400 text-center italic flex items-center justify-center gap-1">
          <AudioIcon className="w-3 h-3" />
          {t('exercise.tapRowToHear')}
        </p>

        <div style={STACK_FRAME}>
          {tableTitle && (
            <ClickTranslateDiv
              text={tableTitle}
              revealed={headerRevealed}
              audio={!!exercise.titleRowAudio || headerAudio?.title !== undefined}
              onClick={() => {
                if (exercise.titleRowAudio) playRowAudio(rows.length - 1);
                else if (headerAudio?.title !== undefined) playRowAudio(headerAudio.title);
                setHeaderRevealed(v => !v);
              }}
            />
          )}
          {tableSubtitle && (
            <div
              style={{
                ...SUBTITLE_CELL,
                textAlign: 'center',
                ...(headerAudio?.subtitle !== undefined ? { cursor: 'pointer' } : {}),
              }}
              className="text-sm md:text-base font-medium py-2 px-4"
              onClick={headingAudio(headerAudio?.subtitle)}
            >
              <span>{tableSubtitle}</span>
              {headerAudio?.subtitle !== undefined && (
                <AudioIcon className="w-3.5 h-3.5 inline-block ml-1.5 align-middle" />
              )}
              {lang !== 'bg' && translatedSubtitle !== tableSubtitle && (
                <span className="block text-xs font-normal mt-0.5 italic text-[#0072BC]">
                  {translatedSubtitle}
                </span>
              )}
            </div>
          )}
          {stackSegments.map((segment, sIdx) => (
          <div
            key={sIdx}
            style={{
              padding: '0.5rem 0.75rem 1rem',
              ...(sIdx > 0 ? { borderTop: '2px solid #7ab356', paddingTop: '1rem' } : {}),
            }}
          >
            {segment.map(({ row, rIdx }) => (
              <div
                key={rIdx}
                onClick={() => playRow(rIdx)}
                className="cursor-pointer hover:bg-[#f4faee] transition-colors rounded-lg"
                style={STACK_ROW}
              >
                {row.pronoun && (
                  <div
                    className="flex items-center justify-center gap-1.5 font-bold text-gray-900 text-sm md:text-base"
                    style={{ textAlign: 'center' }}
                  >
                    <span>{row.pronoun}</span>
                    <AudioIcon className="w-3.5 h-3.5" />
                  </div>
                )}
                {row.cells
                  // A cell may hold several lines (`\n`, optional "- " prefix) — one line each.
                  .flatMap(cell => cell.split('\n').map(line => line.replace(/^- /, '').trim()))
                  .filter(Boolean)
                  .map((line, cIdx) => {
                    const dark = /^\*\*[^*]+\*\*$/.test(line);
                    // A row without a heading is a single playable line: its own speaker icon.
                    const icon = !row.pronoun && cIdx === 0;
                    return (
                      <p
                        key={cIdx}
                        style={{
                          ...(dark ? STACK_DARK_LINE : STACK_GREEN_LINE),
                          ...(icon ? { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.375rem' } : {}),
                        }}
                      >
                        <span>{dark ? line.slice(2, -2) : renderBoldText(line)}</span>
                        {icon && <AudioIcon className="w-3.5 h-3.5" />}
                      </p>
                    );
                  })}
                {lang !== 'bg' && row.pronoun && revealedRows.has(rIdx) && (
                  <div style={{ marginTop: '0.35rem' }}>
                    <InlineTranslation text={row.pronoun} visible={true} className="mt-0" />
                  </div>
                )}
              </div>
            ))}
          </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={bare ? 'space-y-6' : 'bg-white rounded-xl p-6 md:p-10 shadow-md space-y-6'}>
      {introBox}
      {leadBox}
      {!bare && (
        <p className="text-xs text-gray-400 text-center italic flex items-center justify-center gap-1">
          <AudioIcon className="w-3 h-3" />
          {t('exercise.tapRowToHear')}
        </p>
      )}

      <div
        className="overflow-x-auto"
        style={exercise.outlined ? { border: '2px solid #7ab356', borderRadius: '0.75rem' } : undefined}
      >
        <table className="w-full border-collapse rounded-xl overflow-hidden shadow-sm text-center">
          {tableTitle && (
            <thead>
              <tr
                onClick={() => setHeaderRevealed(v => !v)}
                className={lang !== 'bg' ? 'cursor-pointer' : undefined}
              >
                <ClickTranslateTh
                  text={tableTitle}
                  className="bg-[#5a8a3c] text-white text-base md:text-lg font-bold py-3 px-4"
                  colSpan={colSpan}
                  revealed={headerRevealed}
                  onAudio={headingAudio(headerAudio?.title)}
                />
              </tr>
              {tableSubtitle && (
                <tr>
                  <th
                    colSpan={colSpan}
                    style={{
                      ...SUBTITLE_CELL,
                      ...(headerAudio?.subtitle !== undefined ? { cursor: 'pointer' } : {}),
                    }}
                    className="text-sm md:text-base font-medium py-2 px-4"
                    onClick={headingAudio(headerAudio?.subtitle)}
                  >
                    <span>{tableSubtitle}</span>
                    {headerAudio?.subtitle !== undefined && (
                      <AudioIcon className="w-3.5 h-3.5 inline-block ml-1.5 align-middle" />
                    )}
                    {lang !== 'bg' && translatedSubtitle !== tableSubtitle && (
                      <span className="block text-xs font-normal mt-0.5 italic text-[#0072BC]">
                        {translatedSubtitle}
                      </span>
                    )}
                  </th>
                </tr>
              )}
              {columns.length > 0 && (
                <tr
                  onClick={() => setHeaderRevealed(v => !v)}
                  className={`bg-[#7ab356] text-white ${lang !== 'bg' ? 'cursor-pointer' : ''}`}
                >
                  {pronounColumnLabel ? (
                    <ClickTranslateTh
                      text={pronounColumnLabel}
                      className={`py-2 px-3 md:px-5 font-bold text-sm md:text-base border-r border-[#5a8a3c]/30 whitespace-nowrap ${widePronouns ? 'w-1/2' : 'min-w-[3.5rem] md:min-w-[5rem] w-[3.5rem] md:w-[5rem]'}`}
                      revealed={headerRevealed}
                      onAudio={headingAudio(headerAudio?.pronounLabel)}
                    />
                  ) : (
                    <th
                      className={`py-2 px-3 md:px-5 font-semibold text-sm md:text-base border-r border-[#5a8a3c]/30 ${widePronouns ? 'w-1/2' : 'min-w-[3.5rem] md:min-w-[5rem] w-[3.5rem] md:w-[5rem]'}`}
                    >
                      {'\u00A0'}
                    </th>
                  )}
                  {columns.map((col, i) => (
                    <ClickTranslateTh
                      key={i}
                      text={col}
                      className="py-2 px-3 md:px-5 font-bold text-sm md:text-base border-r border-[#5a8a3c]/30 last:border-r-0 whitespace-nowrap"
                      revealed={headerRevealed}
                      onAudio={headingAudio(headerAudio?.columns?.[i])}
                    />
                  ))}
                </tr>
              )}
            </thead>
          )}

          <tbody>
            {rows.map((row, rIdx) => row.hidden ? null : (
              <React.Fragment key={rIdx}>
                <tr
                  onClick={() => playRow(rIdx)}
                  className={`cursor-pointer hover:bg-[#edf5e4] transition-colors ${rIdx % 2 === 0 ? 'bg-white' : 'bg-[#f4faee]'}`}
                >
                  {mergePronouns ? (
                    isRunStart(rIdx) && (
                      <td
                        rowSpan={
                          runSize(rIdx) +
                          (lang !== 'bg'
                            ? Array.from({ length: runSize(rIdx) }, (_, k) => rIdx + k).filter(i =>
                                revealedRows.has(i),
                              ).length
                            : 0)
                        }
                        style={MERGED_PRONOUN_CELL}
                        onClick={e => e.stopPropagation()}
                        className={`py-2.5 px-3 md:px-5 font-bold text-[#2d5a1b] text-sm md:text-base border-r border-gray-200 border-b border-b-gray-100 text-left ${widePronouns ? 'w-1/2' : 'min-w-[5rem] md:min-w-[7rem]'}`}
                      >
                        <span>{row.pronoun}</span>
                        {lang !== 'bg' &&
                          Array.from({ length: runSize(rIdx) }, (_, k) => rIdx + k).some(i =>
                            revealedRows.has(i),
                          ) && (
                            <InlineTranslation text={row.pronoun} visible={true} className="mt-0" />
                          )}
                      </td>
                    )
                  ) : (
                    <td
                      className={`py-2.5 px-3 md:px-5 font-bold text-[#2d5a1b] text-sm md:text-base border-r border-gray-200 border-b border-b-gray-100 ${widePronouns ? 'w-1/2' : 'min-w-[5rem] md:min-w-[7rem]'} ${exercise.leftPronouns ? 'text-left whitespace-nowrap' : ''}`}
                    >
                      {exercise.centerPronouns ? (
                        // Текстът е истински центриран; иконата е извън потока (симетричен падинг от двете страни).
                        <div className="relative flex items-center justify-center">
                          <span className="text-center px-5">{row.pronoun}</span>
                          <AudioIcon className="w-3.5 h-3.5 absolute right-0 top-1/2 -translate-y-1/2" />
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 justify-between">
                          <span>{row.pronoun}</span>
                          <AudioIcon className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </td>
                  )}
                  {row.cells.map((cell, cIdx) => {
                    if (!isCellRunStart(rIdx, cIdx)) return null;
                    const cRun = cellRunSize(rIdx, cIdx);
                    const mergedCell = cRun > 1;
                    const revealedInRun = Array.from({ length: cRun }, (_, k) => rIdx + k).filter(i =>
                      revealedRows.has(i),
                    ).length;
                    return (
                    <td
                      key={cIdx}
                      rowSpan={mergedCell ? cRun + (lang !== 'bg' ? revealedInRun : 0) : undefined}
                      style={mergedCell ? MERGED_CELL : undefined}
                      className={`py-2.5 px-3 md:px-5 text-sm md:text-base text-gray-800 border-r border-gray-200 border-b border-b-gray-100 last:border-r-0 ${boldColumns.includes(cIdx) ? 'font-bold text-[#2d5a1b]' : 'font-medium'}`}
                    >
                      {mergePronouns && cIdx === row.cells.length - 1 ? (
                        <div className="flex items-center justify-center gap-1.5">
                          <CellBody cell={cell} />
                          <AudioIcon className="w-3.5 h-3.5" />
                        </div>
                      ) : (
                        <CellBody cell={cell} />
                      )}
                      {mergedCell && lang !== 'bg' && revealedInRun > 0 && (
                        <InlineTranslation
                          text={cell.replace(/^- /gm, '')}
                          visible={true}
                          className="mt-1 whitespace-pre-line"
                        />
                      )}
                    </td>
                    );
                  })}
                </tr>
                {lang !== 'bg' && revealedRows.has(rIdx) && (
                  <tr className="bg-[#e8f4fd]">
                    {!mergePronouns && (
                      <td className="py-1.5 px-3 md:px-5 border-b border-b-gray-100 border-r border-r-gray-200 text-center">
                        <InlineTranslation text={row.pronoun} visible={true} className="mt-0" />
                      </td>
                    )}
                    {row.cells.map((cell, cIdx) =>
                      // Merged cells show their translation inside the merged cell itself.
                      mergeCells && (!isCellRunStart(rIdx, cIdx) || cellRunSize(rIdx, cIdx) > 1) ? null : (
                      <td
                        key={cIdx}
                        className="py-1.5 px-3 md:px-5 border-b border-b-gray-100 border-r border-r-gray-200 last:border-r-0 text-center"
                      >
                        <InlineTranslation
                          text={cell.replace(/^- /gm, '')}
                          visible={true}
                          className="mt-0 whitespace-pre-line"
                        />
                      </td>
                      ),
                    )}
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {notes.length > 0 && (
        <div className="flex flex-col gap-3">
          {notes.map((note, i) => (
            <div
              key={i}
              onClick={() => playNote(i, note)}
              className="border-2 border-[#7ab356] rounded-lg px-5 py-3 bg-[#f4faee] text-center cursor-pointer hover:bg-[#edf5e4] transition-colors"
            >
              <div className="flex items-center justify-center gap-2">
                <NoteBody note={note} />
                {!notesNoAudio && <AudioIcon className="w-3.5 h-3.5" />}
              </div>
              <InlineTranslation
                text={note.replace(/^- /gm, '')}
                visible={revealedNotes.has(i)}
                className="whitespace-pre-line"
              />
            </div>
          ))}
        </div>
      )}

      {exercise.thenTable && (
        <div style={{ marginTop: '2.5rem' }}>
          <GrammarTable
            bare
            exercise={{ outlined: exercise.outlined, ...exercise.thenTable, id: `${exercise.id}-t2`, type: 'b2-grammar-table', title: '' } as B2GrammarTableExercise}
            exerciseId={
              exerciseId
                ? exercise.thenTableAudio !== undefined
                  ? exerciseId
                  : `${exerciseId}-t2`
                : undefined
            }
            rowAudioOffset={exercise.thenTableAudio ?? 0}
          />
        </div>
      )}
    </div>
  );
}
