'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { useT } from '@/i18n/useT';
import { useTranslate } from '@/i18n/useTranslate';
import { InlineTranslation } from '@/components/InlineTranslation';
import { getTtsAudioPath, playTtsAudio } from '@/lib/tts';
import { renderBoldText } from '@/lib/renderBoldText';
import { AudioIcon } from '@/components/AudioIcon';

interface GrammarTableProps {
  tableTitle?: string;
  columns?: string[];
  rows?: { pronoun: string; cells: string[]; pronunciations?: Record<string, string> }[];
  notes?: string[];
  /**
   * Browser-TTS fallback text per note, used when no pre-generated MP3 exists.
   * `notes[]` may contain markdown and symbols (`**`, `~~`, `→`, ⚠️) that a
   * speech synthesiser reads literally; these are the clean spoken versions.
   */
  ttsNotes?: string[];
  subtitle?: string;
  exerciseId?: string;
  boldColumns?: number[];
  /** When true, makes the pronoun column equal width to the data columns (50/50 split). */
  widePronouns?: boolean;
  /** Header label for the pronoun column (light-green header row). Defaults to blank. */
  pronounColumnLabel?: string;
}

/**
 * Table header — Bulgarian text stays primary; the translation for
 * non-Bulgarian users is revealed on tap (click the header row), matching the
 * tap-to-reveal behaviour used across the rest of the platform.
 */
function ClickTranslateTh({ text, className, colSpan, revealed }: { text: string; className: string; colSpan?: number; revealed: boolean }) {
  const { lang } = useLanguage();
  const translated = useTranslate(text);
  const isNonBg = lang !== 'bg';

  return (
    <th className={className} colSpan={colSpan}>
      <span>{text}</span>
      {isNonBg && revealed && translated !== text && (
        <span className="block text-xs font-normal text-white/75 mt-0.5 italic">
          {translated}
        </span>
      )}
    </th>
  );
}

export function GrammarTable({
  tableTitle,
  columns = [],
  rows = [],
  notes = [],
  ttsNotes = [],
  subtitle,
  exerciseId,
  boldColumns = [],
  widePronouns = false,
  pronounColumnLabel,
}: GrammarTableProps) {
  const { lang } = useLanguage();
  const t = useT();
  const [revealedRows, setRevealedRows] = useState<Set<number>>(new Set());
  const [revealedNotes, setRevealedNotes] = useState<Set<number>>(new Set());
  const [headerRevealed, setHeaderRevealed] = useState(false);

  const toggle = (setter: React.Dispatch<React.SetStateAction<Set<number>>>, idx: number) => {
    setter(prev => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  // Clicking a row/note plays its pronunciation AND reveals its translation
  // (tap-to-reveal, consistent with cards, dialogues and reading texts).
  const playRow = (idx: number) => {
    const isNumericPronoun = /^\d[\d\s]*$/.test(rows[idx].pronoun.trim());
    const speakableCells = rows[idx].cells.filter(c => !c.trim().startsWith('-'));
    const parts = isNumericPronoun ? speakableCells : [rows[idx].pronoun, ...speakableCells];
    const audioPath = exerciseId
      ? getTtsAudioPath(exerciseId, 'grammar', `${exerciseId}-row-${idx}`)
      : '';
    playTtsAudio(audioPath, parts.join('. '));
    toggle(setRevealedRows, idx);
  };

  const playNote = (idx: number, note: string) => {
    const audioPath = exerciseId
      ? getTtsAudioPath(exerciseId, 'grammar', `${exerciseId}-note-${idx}`)
      : '';
    playTtsAudio(audioPath, ttsNotes[idx] ?? note);
    toggle(setRevealedNotes, idx);
  };

  return (
    <div className="bg-white rounded-xl p-6 md:p-10 shadow-md space-y-6">
      <p className="text-xs text-gray-400 text-center italic flex items-center justify-center gap-1">
        <AudioIcon className="w-3 h-3" />
        {t('exercise.tapRowToHear')}
      </p>

      {/* Conjugation table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse rounded-xl overflow-hidden shadow-sm text-center">

          {/* Table title spanning all columns */}
          {tableTitle && (
            <thead>
              <tr onClick={() => setHeaderRevealed(v => !v)} className={lang !== 'bg' ? 'cursor-pointer' : undefined}>
                <ClickTranslateTh
                  text={tableTitle}
                  className="bg-[#5a8a3c] text-white text-base md:text-lg font-bold py-3 px-4"
                  colSpan={columns.length > 0 ? columns.length + 1 : (rows[0]?.cells.length ?? 0) + 1}
                  revealed={headerRevealed}
                />
              </tr>
              {columns.length > 0 && (
                <tr onClick={() => setHeaderRevealed(v => !v)} className={`bg-[#7ab356] text-white ${lang !== 'bg' ? 'cursor-pointer' : ''}`}>
                  {pronounColumnLabel ? (
                    <ClickTranslateTh
                      text={pronounColumnLabel}
                      className={`py-2 px-3 md:px-5 font-bold text-sm md:text-base border-r border-[#5a8a3c]/30 whitespace-nowrap ${widePronouns ? 'w-1/2' : 'min-w-[3.5rem] md:min-w-[5rem] w-[3.5rem] md:w-[5rem]'}`}
                      revealed={headerRevealed}
                    />
                  ) : (
                    <th className={`py-2 px-3 md:px-5 font-semibold text-sm md:text-base border-r border-[#5a8a3c]/30 ${widePronouns ? 'w-1/2' : 'min-w-[3.5rem] md:min-w-[5rem] w-[3.5rem] md:w-[5rem]'}`}>{'\u00A0'}</th>
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
            {rows.map((row, rIdx) => {
              return (
                <React.Fragment key={rIdx}>
                  <tr
                    onClick={() => playRow(rIdx)}
                    className={`cursor-pointer hover:bg-[#edf5e4] transition-colors ${rIdx % 2 === 0 ? 'bg-white' : 'bg-[#f4faee]'}`}
                  >
                    <td className={`py-2.5 px-3 md:px-5 font-bold text-[#2d5a1b] text-sm md:text-base border-r border-gray-200 border-b border-b-gray-100 ${widePronouns ? 'w-1/2' : 'min-w-[5rem] md:min-w-[7rem]'}`}>
                      <div className="flex items-center justify-between gap-1">
                        <span>{row.pronoun}</span>
                        <AudioIcon className="w-3.5 h-3.5" />
                      </div>
                    </td>
                    {row.cells.map((cell, cIdx) => (
                      <td
                        key={cIdx}
                        className={`py-2.5 px-3 md:px-5 text-sm md:text-base text-gray-800 border-r border-gray-200 border-b border-b-gray-100 last:border-r-0 ${boldColumns.includes(cIdx) ? 'font-bold text-[#2d5a1b]' : 'font-medium'}`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                  {lang !== 'bg' && revealedRows.has(rIdx) && (
                    <tr className="bg-[#e8f4fd]">
                      {row.pronunciations ? (
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
                          <td className="py-1.5 px-3 md:px-5 border-b border-b-gray-100 border-r border-r-gray-200 text-center">
                            <InlineTranslation text={row.pronoun} visible={true} className="mt-0" />
                          </td>
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

      {/* Notes — green bordered boxes like in the textbook */}
      {notes.length > 0 && (
        <div className="flex flex-col gap-3">
          {notes.map((note, i) => (
            <div
              key={i}
              onClick={() => playNote(i, note)}
              className="border-2 border-[#7ab356] rounded-lg px-5 py-3 bg-[#f4faee] text-center cursor-pointer hover:bg-[#edf5e4] transition-colors"
            >
              <div className="flex items-center justify-center gap-2">
                <p className="text-sm md:text-base font-semibold text-gray-800">{renderBoldText(note)}</p>
                <AudioIcon className="w-3.5 h-3.5" />
              </div>
              <InlineTranslation text={note} visible={revealedNotes.has(i)} />
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
