'use client';

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
  return (
    <div className="bg-white rounded-xl p-6 md:p-10 shadow-md space-y-6">

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
              {/* Column headers */}
              {columns.length > 0 && (
                <tr className="bg-[#7ab356] text-white">
                  <th className="py-2 px-3 md:px-5 font-semibold text-sm md:text-base border-r border-[#5a8a3c]/30 w-16 md:w-20" />
                  {columns.map((col, i) => (
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
            {rows.map((row, rIdx) => (
              <tr
                key={rIdx}
                className={rIdx % 2 === 0 ? 'bg-white' : 'bg-[#f4faee]'}
              >
                {/* Pronoun cell */}
                <td className="py-2.5 px-3 md:px-5 font-bold text-[#2d5a1b] text-sm md:text-base border-r border-gray-200 border-b border-b-gray-100">
                  {row.pronoun}
                </td>
                {/* Data cells */}
                {row.cells.map((cell, cIdx) => (
                  <td
                    key={cIdx}
                    className="py-2.5 px-3 md:px-5 text-sm md:text-base text-gray-800 border-r border-gray-200 border-b border-b-gray-100 last:border-r-0 font-medium"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Notes — green bordered boxes like in the textbook */}
      {notes.length > 0 && (
        <div className="flex flex-col gap-3">
          {notes.map((note, i) => (
            <div
              key={i}
              className="border-2 border-[#7ab356] rounded-lg px-5 py-3 bg-[#f4faee] text-center"
            >
              <p className="text-sm md:text-base font-semibold text-gray-800">{note}</p>
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
