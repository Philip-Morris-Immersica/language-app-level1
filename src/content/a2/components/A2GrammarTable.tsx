'use client';

/**
 * A2 override of the shared GrammarTable component.
 *
 * Difference from the shared version: accepts `ttsNotes` and uses them as the
 * browser-TTS fallback text when clicking a note (instead of the raw `notes`
 * display text that may contain markdown symbols like ⚠️, ~~, →).
 *
 * Registered in exercise-components.ts as the handler for 'grammar_table' so
 * all A2 grammar tables automatically benefit — no per-exercise changes needed.
 */

import React, { useState } from 'react';
import { Volume2 } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { useT } from '@/i18n/useT';
import { useTranslate } from '@/i18n/useTranslate';
import { InlineTranslation } from '@/components/InlineTranslation';
import { getTtsAudioPath, playTtsAudio } from '@/lib/tts';
import type { CustomExerciseRendererProps } from '../exercise-components';

interface A2GrammarTableProps extends CustomExerciseRendererProps {
  exercise: {
    id: string;
    type: string;
    tableTitle?: string;
    columns?: string[];
    rows?: {
      pronoun: string;
      cells: string[];
      pronunciations?: Record<string, string>;
      /** TTS-only override text (e.g. adds "Мъжки род." prefix, drops markdown/parentheses). Mirrors generate-tts.ts. */
      ttsText?: string;
    }[];
    notes?: string[];
    ttsNotes?: string[];
    subtitle?: string;
    boldColumns?: number[];
    widePronouns?: boolean;
    /** When true, the first (pronoun/label) column is not rendered — the row shows
     *  only the example cell(s). Used for reference tables where the key word is
     *  already highlighted inside the sentence (e.g. „Въпросителни думи"). */
    hidePronounColumn?: boolean;
    [key: string]: unknown;
  };
}

/**
 * Renders inline `**bold**` markdown inside a single line of table-cell text
 * (e.g. `лимон**и**` → „лимон**и**" with the ending bold, matching the textbook
 * convention of bolding noun/adjective endings in example tables).
 */
function renderLineWithBold(text: string, keyPrefix: string): React.ReactNode {
  if (!text.includes('**')) return text;
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? <strong key={`${keyPrefix}-${i}`}>{part}</strong> : part,
  );
}

/**
 * Renders a table cell. A newline (`\n`) inside the cell text splits the value
 * into separate stacked lines — used for example lists where each example
 * should sit on its own row (e.g. the „Предлози за време" table), matching the
 * printed textbook layout. Inline `**bold**` still works within each line.
 */
function renderCellWithBold(text: string): React.ReactNode {
  if (!text.includes('\n')) return renderLineWithBold(text, 'l0');
  return text.split('\n').map((line, i) => (
    <span key={i} className="block">
      {renderLineWithBold(line, `l${i}`)}
    </span>
  ));
}

function ClickTranslateTh({
  text,
  className,
  colSpan,
}: {
  text: string;
  className: string;
  colSpan?: number;
}) {
  const [revealed, setRevealed] = useState(false);
  const { lang } = useLanguage();
  const translated = useTranslate(text);
  const isNonBg = lang !== 'bg';
  const showTranslation = isNonBg && revealed;

  return (
    <th
      className={`${className}${isNonBg ? ' cursor-pointer select-none' : ''}`}
      colSpan={colSpan}
      onClick={isNonBg ? () => setRevealed(prev => !prev) : undefined}
    >
      <span>{text}</span>
      {showTranslation && translated !== text && (
        <span className="block text-xs font-normal text-white/75 mt-0.5 italic">
          {translated}
        </span>
      )}
    </th>
  );
}

export function A2GrammarTable({ exercise }: A2GrammarTableProps) {
  const {
    id: exerciseId,
    tableTitle,
    columns = [],
    rows = [],
    notes = [],
    ttsNotes = [],
    subtitle,
    boldColumns = [],
    widePronouns = false,
    hidePronounColumn = false,
  } = exercise;

  const [revealedRows, setRevealedRows] = useState<Set<number>>(new Set());
  const [revealedNotes, setRevealedNotes] = useState<Set<number>>(new Set());
  const { lang } = useLanguage();
  const t = useT();

  const toggleRow = (idx: number) => {
    const row = rows[idx];
    const isNumericPronoun = /^\d[\d\s]*$/.test(row.pronoun.trim());
    const speakableCells = row.cells.filter(c => !c.trim().startsWith('-'));
    const parts = isNumericPronoun
      ? speakableCells
      : [row.pronoun, ...speakableCells];
    const audioPath = exerciseId
      ? getTtsAudioPath(exerciseId, 'grammar', `${exerciseId}-row-${idx}`)
      : '';
    // Mirror generate-tts.ts: a `ttsText` override (cleaner wording, no
    // markdown/parentheses) takes priority over the raw displayed cells for
    // the browser-TTS fallback used when the MP3 hasn't been generated yet.
    playTtsAudio(audioPath, row.ttsText ?? parts.join('. ').replace(/\*\*/g, ''));

    setRevealedRows(prev => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  const handleNoteClick = (idx: number) => {
    // Use ttsNote (clean text) as fallback; fall back to display note if absent.
    const fallbackText = ttsNotes[idx] ?? notes[idx];
    const audioPath = exerciseId
      ? getTtsAudioPath(exerciseId, 'grammar', `${exerciseId}-note-${idx}`)
      : '';
    playTtsAudio(audioPath, fallbackText);

    setRevealedNotes(prev => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  return (
    <div className="bg-white rounded-xl p-6 md:p-10 shadow-md space-y-6">
      {subtitle && (
        <p className="text-sm text-gray-500 text-center italic">{subtitle}</p>
      )}
      <p className="text-xs text-gray-400 text-center italic flex items-center justify-center gap-1">
        <Volume2 className="w-3 h-3" />
        {t('exercise.tapRowToHear')}
      </p>

      {/* Conjugation table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse rounded-xl overflow-hidden shadow-sm text-center">

          {/* Table title spanning all columns */}
          {tableTitle && (
            <thead>
              <tr>
                <ClickTranslateTh
                  text={tableTitle}
                  className="bg-[#5a8a3c] text-white text-base md:text-lg font-bold py-3 px-4"
                  colSpan={
                    (columns.length > 0
                      ? columns.length
                      : (rows[0]?.cells.length ?? 0)) + (hidePronounColumn ? 0 : 1)
                  }
                />
              </tr>
              {columns.length > 0 && (
                <tr className="bg-[#7ab356] text-white">
                  {!hidePronounColumn && (
                    <th
                      className={`py-2 px-3 md:px-5 font-semibold text-sm md:text-base border-r border-[#5a8a3c]/30 ${
                        widePronouns
                          ? 'w-1/2'
                          : 'min-w-[3.5rem] md:min-w-[5rem] w-[3.5rem] md:w-[5rem]'
                      }`}
                    >
                      {'\u00A0'}
                    </th>
                  )}
                  {columns.map((col, i) => (
                    <ClickTranslateTh
                      key={i}
                      text={col}
                      className="py-2 px-3 md:px-5 font-bold text-sm md:text-base border-r border-[#5a8a3c]/30 last:border-r-0 whitespace-nowrap"
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
                  onClick={() => toggleRow(rIdx)}
                  className={`cursor-pointer hover:bg-[#edf5e4] transition-colors ${
                    rIdx % 2 === 0 ? 'bg-white' : 'bg-[#f4faee]'
                  }`}
                >
                  {!hidePronounColumn && (
                    <td
                      className={`py-2.5 px-3 md:px-5 font-bold text-[#2d5a1b] text-sm md:text-base border-r border-gray-200 border-b border-b-gray-100 ${
                        widePronouns ? 'w-1/2' : 'min-w-[5rem] md:min-w-[7rem]'
                      }`}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <span>{row.pronoun}</span>
                        <Volume2 className="w-3.5 h-3.5 text-[#32C189] opacity-60 flex-shrink-0" />
                      </div>
                    </td>
                  )}
                  {row.cells.map((cell, cIdx) => (
                    <td
                      key={cIdx}
                      className={`py-2.5 px-3 md:px-5 text-sm md:text-base text-gray-800 border-r border-gray-200 border-b border-b-gray-100 last:border-r-0 ${
                        (boldColumns as number[]).includes(cIdx)
                          ? 'font-bold text-[#2d5a1b]'
                          : 'font-medium'
                      }`}
                    >
                      {hidePronounColumn && cIdx === row.cells.length - 1 ? (
                        <div className="flex items-center justify-center gap-2">
                          <span>{renderCellWithBold(cell)}</span>
                          <Volume2 className="w-3.5 h-3.5 text-[#32C189] opacity-60 flex-shrink-0" />
                        </div>
                      ) : (
                        renderCellWithBold(cell)
                      )}
                    </td>
                  ))}
                </tr>
                {revealedRows.has(rIdx) && lang !== 'bg' && (
                  <tr className="bg-[#e8f4fd]">
                    {row.pronunciations && !hidePronounColumn ? (
                      <td
                        colSpan={row.cells.length + 1}
                        className="py-1.5 px-3 md:px-5 border-b border-b-gray-100 text-center"
                      >
                        <InlineTranslation
                          text={row.pronoun}
                          visible={true}
                          translations={row.pronunciations}
                          className="mt-0"
                        />
                      </td>
                    ) : (
                      <>
                        {!hidePronounColumn && (
                          <td className="py-1.5 px-3 md:px-5 border-b border-b-gray-100 border-r border-r-gray-200 text-center">
                            <InlineTranslation
                              text={row.pronoun}
                              visible={true}
                              className="mt-0"
                            />
                          </td>
                        )}
                        {row.cells.map((cell, cIdx) => (
                          <td
                            key={cIdx}
                            className="py-1.5 px-3 md:px-5 border-b border-b-gray-100 border-r border-r-gray-200 last:border-r-0 text-center"
                          >
                            <InlineTranslation
                              text={cell}
                              visible={true}
                              className="mt-0"
                            />
                          </td>
                        ))}
                      </>
                    )}
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* Notes — green bordered boxes */}
      {notes.length > 0 && (
        <div className="flex flex-col gap-3">
          {notes.map((note, i) => (
            <div
              key={i}
              onClick={() => handleNoteClick(i)}
              className="border-2 border-[#7ab356] rounded-lg px-5 py-3 bg-[#f4faee] text-center cursor-pointer hover:bg-[#edf5e4] transition-colors"
            >
              <div className="flex items-center justify-center gap-2">
                <p className="text-sm md:text-base font-semibold text-gray-800">
                  {note}
                </p>
                <Volume2 className="w-3.5 h-3.5 text-[#32C189] opacity-60 flex-shrink-0" />
              </div>
              <InlineTranslation text={note} visible={revealedNotes.has(i)} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
