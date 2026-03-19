'use client';

import { useState, useEffect, useRef } from 'react';
import { Check, X } from 'lucide-react';
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
  onComplete?: (correct: boolean, score: number) => void;
  exerciseId?: string;
}

export function TableFill({ tables, onComplete, exerciseId }: TableFillProps) {
  const t = useT();
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
    setAnswers(prev => ({ ...prev, [key]: value }));
    if (isSubmitted) {
      setIsSubmitted(false);
      setValidation({});
    }
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

  return (
    <div className="bg-white rounded-xl p-4 md:p-8 shadow-md space-y-6">
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
                      {col}
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
                                {cell.options.map((opt) => (
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

      <Button
        onClick={handleSubmit}
        className="bg-[#8FC412] hover:bg-[#7DAD0E] text-white text-base font-semibold px-8 py-3 w-full sm:w-auto min-h-[48px] active:scale-95 transition-transform rounded-lg"
      >
        {t('exercise.checkAnswers')}
      </Button>

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
