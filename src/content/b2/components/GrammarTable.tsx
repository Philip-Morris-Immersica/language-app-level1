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
  verticalAlign: 'top',
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
}: {
  text: string;
  revealed: boolean;
  onClick: () => void;
}) {
  const { lang } = useLanguage();
  const translated = useTranslate(text);
  const isNonBg = lang !== 'bg';
  return (
    <div
      onClick={onClick}
      className={`bg-[#5a8a3c] text-white text-base md:text-lg font-bold py-3 px-4 text-center ${isNonBg ? 'cursor-pointer' : ''}`}
    >
      <span>{text}</span>
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
}: {
  text: string;
  className: string;
  colSpan?: number;
  revealed: boolean;
}) {
  const { lang } = useLanguage();
  const translated = useTranslate(text);
  const isNonBg = lang !== 'bg';

  return (
    <th className={className} colSpan={colSpan}>
      <span>{text}</span>
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

export function GrammarTable({ exercise, exerciseId }: Props) {
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
  } = exercise;

  const [revealedRows, setRevealedRows] = useState<Set<number>>(new Set());
  const [revealedNotes, setRevealedNotes] = useState<Set<number>>(new Set());
  const [headerRevealed, setHeaderRevealed] = useState(false);
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

  const introBox = introText ? (
    <div style={INTRO_BOX} className="text-sm md:text-base">
      <p style={{ margin: 0 }}>{renderBoldText(introText)}</p>
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
    const row = rows[idx];
    const isNumericPronoun = /^\d[\d\s]*$/.test(row.pronoun.trim());
    // Skip bare endings like "-л, -ла" (but keep list cells that start with "- ").
    const speakableCells = row.cells.filter(c => !/^-(?!\s)/.test(c.trim()));
    const parts = isNumericPronoun ? speakableCells : [row.pronoun, ...speakableCells];
    const audioPath = exerciseId
      ? getTtsAudioPath(exerciseId, 'grammar', `${exerciseId}-row-${idx}`)
      : '';
    const spoken =
      row.ttsText ?? parts.join('. ').replace(/^- /gm, '').replace(/\n+/g, '. ');
    playTtsAudio(audioPath, spoken.replace(/\*\*/g, ''));
    toggle(setRevealedRows, idx);
  };

  const playNote = (idx: number, note: string) => {
    const audioPath = exerciseId
      ? getTtsAudioPath(exerciseId, 'grammar', `${exerciseId}-note-${idx}`)
      : '';
    playTtsAudio(audioPath, (ttsNotes[idx] ?? note).replace(/\*\*/g, '').replace(/^- /gm, ''));
    toggle(setRevealedNotes, idx);
  };

  const colSpan = columns.length > 0 ? columns.length + 1 : (rows[0]?.cells.length ?? 0) + 1;

  if (exercise.layout === 'stacked') {
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
              onClick={() => setHeaderRevealed(v => !v)}
            />
          )}
          {tableSubtitle && (
            <div
              style={{ ...SUBTITLE_CELL, textAlign: 'center' }}
              className="text-sm md:text-base font-medium py-2 px-4"
            >
              <span>{tableSubtitle}</span>
              {lang !== 'bg' && translatedSubtitle !== tableSubtitle && (
                <span className="block text-xs font-normal mt-0.5 italic text-[#0072BC]">
                  {translatedSubtitle}
                </span>
              )}
            </div>
          )}
          <div style={{ padding: '0.5rem 0.75rem 1rem' }}>
            {rows.map((row, rIdx) => (
              <div
                key={rIdx}
                onClick={() => playRow(rIdx)}
                className="cursor-pointer hover:bg-[#f4faee] transition-colors rounded-lg"
                style={STACK_ROW}
              >
                <div
                  className="flex items-center justify-center gap-1.5 font-bold text-gray-900 text-sm md:text-base"
                  style={{ textAlign: 'center' }}
                >
                  <span>{row.pronoun}</span>
                  <AudioIcon className="w-3.5 h-3.5" />
                </div>
                {row.cells
                  // A cell may hold several lines (`\n`, optional "- " prefix) — one line each.
                  .flatMap(cell => cell.split('\n').map(line => line.replace(/^- /, '').trim()))
                  .filter(Boolean)
                  .map((line, cIdx) => {
                    const dark = /^\*\*[^*]+\*\*$/.test(line);
                    return (
                      <p key={cIdx} style={dark ? STACK_DARK_LINE : STACK_GREEN_LINE}>
                        {dark ? line.slice(2, -2) : renderBoldText(line)}
                      </p>
                    );
                  })}
                {lang !== 'bg' && revealedRows.has(rIdx) && (
                  <div style={{ marginTop: '0.35rem' }}>
                    <InlineTranslation text={row.pronoun} visible={true} className="mt-0" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 md:p-10 shadow-md space-y-6">
      {introBox}
      <p className="text-xs text-gray-400 text-center italic flex items-center justify-center gap-1">
        <AudioIcon className="w-3 h-3" />
        {t('exercise.tapRowToHear')}
      </p>

      <div className="overflow-x-auto">
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
                />
              </tr>
              {tableSubtitle && (
                <tr>
                  <th
                    colSpan={colSpan}
                    style={SUBTITLE_CELL}
                    className="text-sm md:text-base font-medium py-2 px-4"
                  >
                    <span>{tableSubtitle}</span>
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
                    />
                  ))}
                </tr>
              )}
            </thead>
          )}

          <tbody>
            {rows.map((row, rIdx) => (
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
                      className={`py-2.5 px-3 md:px-5 font-bold text-[#2d5a1b] text-sm md:text-base border-r border-gray-200 border-b border-b-gray-100 ${widePronouns ? 'w-1/2' : 'min-w-[5rem] md:min-w-[7rem]'}`}
                    >
                      <div className="flex items-center justify-between gap-1">
                        <span>{row.pronoun}</span>
                        <AudioIcon className="w-3.5 h-3.5" />
                      </div>
                    </td>
                  )}
                  {row.cells.map((cell, cIdx) => (
                    <td
                      key={cIdx}
                      className={`py-2.5 px-3 md:px-5 text-sm md:text-base text-gray-800 border-r border-gray-200 border-b border-b-gray-100 last:border-r-0 ${boldColumns.includes(cIdx) ? 'font-bold text-[#2d5a1b]' : 'font-medium'}`}
                    >
                      <CellBody cell={cell} />
                    </td>
                  ))}
                </tr>
                {lang !== 'bg' && revealedRows.has(rIdx) && (
                  <tr className="bg-[#e8f4fd]">
                    {!mergePronouns && (
                      <td className="py-1.5 px-3 md:px-5 border-b border-b-gray-100 border-r border-r-gray-200 text-center">
                        <InlineTranslation text={row.pronoun} visible={true} className="mt-0" />
                      </td>
                    )}
                    {row.cells.map((cell, cIdx) => (
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
                    ))}
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
                <AudioIcon className="w-3.5 h-3.5" />
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
    </div>
  );
}
