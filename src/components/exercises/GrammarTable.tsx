'use client';

import React from 'react';
import { Volume2 } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { useT } from '@/i18n/useT';
import { useTranslate } from '@/i18n/useTranslate';
import { InlineTranslation } from '@/components/InlineTranslation';
import { getTtsAudioPath, playTtsAudio } from '@/lib/tts';

interface GrammarTableProps {
  tableTitle?: string;
  columns?: string[];
  rows?: { pronoun: string; cells: string[]; pronunciations?: Record<string, string> }[];
  notes?: string[];
  subtitle?: string;
  exerciseId?: string;
  boldColumns?: number[];
  /** When true, makes the pronoun column equal width to the data columns (50/50 split). */
  widePronouns?: boolean;
}

/**
 * Table header — Bulgarian text stays primary; the translation for
 * non-Bulgarian users is shown automatically underneath (no click needed).
 */
function ClickTranslateTh({ text, className, colSpan }: { text: string; className: string; colSpan?: number }) {
  const { lang } = useLanguage();
  const translated = useTranslate(text);
  const isNonBg = lang !== 'bg';

  return (
    <th className={className} colSpan={colSpan}>
      <span>{text}</span>
      {isNonBg && translated !== text && (
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
  subtitle,
  exerciseId,
  boldColumns = [],
  widePronouns = false,
}: GrammarTableProps) {
  const { lang } = useLanguage();
  const t = useT();

  // Clicking a row/note plays its pronunciation. Translations are shown
  // automatically for non-Bulgarian users (no click needed to reveal them).
  const playRow = (idx: number) => {
    const isNumericPronoun = /^\d[\d\s]*$/.test(rows[idx].pronoun.trim());
    const speakableCells = rows[idx].cells.filter(c => !c.trim().startsWith('-'));
    const parts = isNumericPronoun ? speakableCells : [rows[idx].pronoun, ...speakableCells];
    const audioPath = exerciseId
      ? getTtsAudioPath(exerciseId, 'grammar', `${exerciseId}-row-${idx}`)
      : '';
    playTtsAudio(audioPath, parts.join('. '));
  };

  const playNote = (idx: number, note: string) => {
    const audioPath = exerciseId
      ? getTtsAudioPath(exerciseId, 'grammar', `${exerciseId}-note-${idx}`)
      : '';
    playTtsAudio(audioPath, note);
  };

  return (
    <div className="bg-white rounded-xl p-6 md:p-10 shadow-md space-y-6">
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
                  colSpan={columns.length > 0 ? columns.length + 1 : (rows[0]?.cells.length ?? 0) + 1}
                />
              </tr>
              {columns.length > 0 && (
                <tr className="bg-[#7ab356] text-white">
                  <th className={`py-2 px-3 md:px-5 font-semibold text-sm md:text-base border-r border-[#5a8a3c]/30 ${widePronouns ? 'w-1/2' : 'min-w-[3.5rem] md:min-w-[5rem] w-[3.5rem] md:w-[5rem]'}`}>{'\u00A0'}</th>
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
                        <Volume2 className="w-3.5 h-3.5 text-[#32C189] opacity-60 flex-shrink-0" />
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
                  {lang !== 'bg' && (
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
                <p className="text-sm md:text-base font-semibold text-gray-800">{note}</p>
                <Volume2 className="w-3.5 h-3.5 text-[#32C189] opacity-60 flex-shrink-0" />
              </div>
              <InlineTranslation text={note} visible={true} />
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
