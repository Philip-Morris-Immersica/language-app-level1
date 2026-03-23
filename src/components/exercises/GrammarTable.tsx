'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { useT } from '@/i18n/useT';
import { InlineTranslation } from '@/components/InlineTranslation';

interface GrammarTableProps {
  tableTitle?: string;
  columns?: string[];
  rows?: { pronoun: string; cells: string[] }[];
  notes?: string[];
  subtitle?: string;
}

export function GrammarTable({
  tableTitle,
  columns = [],
  rows = [],
  notes = [],
  subtitle,
}: GrammarTableProps) {
  const [revealedRows, setRevealedRows] = useState<Set<number>>(new Set());
  const [revealedNotes, setRevealedNotes] = useState<Set<number>>(new Set());
  const { lang } = useLanguage();
  const t = useT();

  const toggleRow = (idx: number) => {
    const utterance = new SpeechSynthesisUtterance(
      [rows[idx].pronoun, ...rows[idx].cells].join(', ')
    );
    utterance.lang = 'bg-BG';
    utterance.rate = 0.85;
    window.speechSynthesis.speak(utterance);

    setRevealedRows(prev => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  const toggleNote = (idx: number) => {
    setRevealedNotes(prev => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  return (
    <div className="bg-white rounded-xl p-6 md:p-10 shadow-md space-y-6">
      {lang !== 'bg' && (
        <p className="text-xs text-gray-400 text-center italic">
          {t('exercise.tapToTranslate')}
        </p>
      )}

      {/* Conjugation table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse rounded-xl overflow-hidden shadow-sm text-center">

          {/* Table title spanning all columns */}
          {tableTitle && (
            <thead>
              <tr>
                <th
                  colSpan={columns.length + 1}
                  className="bg-[#5a8a3c] text-white text-base md:text-lg font-bold py-3 px-4"
                >
                  {tableTitle}
                </th>
              </tr>
              {/* Column headers — columns[0] labels the pronoun column; columns[1..] label the cells */}
              {columns.length > 0 && (
                <tr className="bg-[#7ab356] text-white">
                  <th className="py-2 px-3 md:px-5 font-semibold text-sm md:text-base border-r border-[#5a8a3c]/30 w-16 md:w-20">
                    {columns[0]}
                  </th>
                  {columns.slice(1).map((col, i) => (
                    <th
                      key={i}
                      className="py-2 px-3 md:px-5 font-bold text-sm md:text-base border-r border-[#5a8a3c]/30 last:border-r-0"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              )}
            </thead>
          )}

          <tbody>
            {rows.map((row, rIdx) => {
              const fullPhrase = [row.pronoun, ...row.cells].join(' ');
              const totalCols = (columns.length || row.cells.length) + 1;
              return (
                <React.Fragment key={rIdx}>
                  <tr
                    onClick={() => toggleRow(rIdx)}
                    className={`cursor-pointer hover:bg-[#edf5e4] transition-colors ${rIdx % 2 === 0 ? 'bg-white' : 'bg-[#f4faee]'}`}
                  >
                    <td className="py-2.5 px-3 md:px-5 font-bold text-[#2d5a1b] text-sm md:text-base border-r border-gray-200 border-b border-b-gray-100">
                      {row.pronoun}
                    </td>
                    {row.cells.map((cell, cIdx) => (
                      <td
                        key={cIdx}
                        className="py-2.5 px-3 md:px-5 text-sm md:text-base text-gray-800 border-r border-gray-200 border-b border-b-gray-100 last:border-r-0 font-medium"
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                  {revealedRows.has(rIdx) && lang !== 'bg' && (
                    <tr className="bg-[#e8f4fd]">
                      <td
                        colSpan={totalCols}
                        className="py-1.5 px-3 md:px-5 border-b border-b-gray-100"
                      >
                        <InlineTranslation text={fullPhrase} visible={true} className="mt-0" />
                      </td>
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
              onClick={() => toggleNote(i)}
              className="border-2 border-[#7ab356] rounded-lg px-5 py-3 bg-[#f4faee] text-center cursor-pointer hover:bg-[#edf5e4] transition-colors"
            >
              <p className="text-sm md:text-base font-semibold text-gray-800">{note}</p>
              <InlineTranslation text={note} visible={revealedNotes.has(i)} />
            </div>
          ))}
        </div>
      )}

      {/* Subtitle */}
      {subtitle && (
        <div className="p-4 rounded-lg bg-white border-2 border-[#8B9D5F]">
          <p className="text-sm text-gray-700 text-center italic">{subtitle}</p>
        </div>
      )}
    </div>
  );
}
