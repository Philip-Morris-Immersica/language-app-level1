'use client';

import { useState } from 'react';

interface Props {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

/** Returns page numbers with `null` as ellipsis: 1 … 4 5 [6] 7 8 … 58 */
function buildPages(page: number, totalPages: number): Array<number | null> {
  if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
  const set = new Set<number>([1, totalPages, page - 1, page, page + 1]);
  if (page <= 3) [2, 3, 4].forEach((n) => set.add(n));
  if (page >= totalPages - 2) [totalPages - 1, totalPages - 2, totalPages - 3].forEach((n) => set.add(n));
  const sorted = [...set].filter((n) => n >= 1 && n <= totalPages).sort((a, b) => a - b);
  const out: Array<number | null> = [];
  sorted.forEach((n, i) => {
    if (i > 0 && n - sorted[i - 1] > 1) out.push(null);
    out.push(n);
  });
  return out;
}

const btn = 'text-xs min-w-[32px] px-2.5 py-1.5 border rounded-lg disabled:opacity-40';

export default function AdminPagination({ page, totalPages, onPageChange }: Props) {
  const [jump, setJump] = useState('');

  const go = (p: number) => onPageChange(Math.min(totalPages, Math.max(1, p)));

  const submitJump = () => {
    const n = parseInt(jump, 10);
    if (Number.isFinite(n)) go(n);
    setJump('');
  };

  return (
    <div className="px-4 py-3 border-t border-gray-100 flex flex-wrap items-center gap-2">
      <button
        onClick={() => go(page - 1)}
        disabled={page <= 1}
        className={`${btn} border-gray-200 hover:bg-gray-50`}
      >
        ← Prev
      </button>

      {buildPages(page, totalPages).map((p, i) =>
        p === null ? (
          <span key={`e${i}`} className="text-xs text-gray-400 px-1">…</span>
        ) : (
          <button
            key={p}
            onClick={() => go(p)}
            className={`${btn} ${
              p === page
                ? 'bg-[#0072BC] border-[#0072BC] text-white font-semibold'
                : 'border-gray-200 hover:bg-gray-50 text-gray-700'
            }`}
          >
            {p}
          </button>
        ),
      )}

      <button
        onClick={() => go(page + 1)}
        disabled={page >= totalPages}
        className={`${btn} border-gray-200 hover:bg-gray-50`}
      >
        Next →
      </button>

      <div className="flex items-center gap-1.5 ml-auto text-xs text-gray-500">
        <span>Page {page} of {totalPages} · Go to</span>
        <input
          type="number"
          min={1}
          max={totalPages}
          value={jump}
          onChange={(e) => setJump(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') submitJump(); }}
          placeholder="#"
          className="w-16 text-xs border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#0072BC]/30"
        />
        <button
          onClick={submitJump}
          disabled={!jump}
          className={`${btn} border-gray-200 hover:bg-gray-50`}
        >
          Go
        </button>
      </div>
    </div>
  );
}
