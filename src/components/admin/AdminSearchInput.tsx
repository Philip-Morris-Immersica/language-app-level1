'use client';

import { useEffect, useRef, useState } from 'react';
import { Search, X } from 'lucide-react';

interface Props {
  /** Committed (debounced) value used for fetching. */
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  debounceMs?: number;
}

/** Debounced search box: updates parent only after the user stops typing. */
export default function AdminSearchInput({
  value,
  onChange,
  placeholder = 'Search by name or email…',
  debounceMs = 350,
}: Props) {
  const [text, setText] = useState(value);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  useEffect(() => {
    if (text.trim() === value) return;
    const t = setTimeout(() => onChangeRef.current(text.trim()), debounceMs);
    return () => clearTimeout(t);
  }, [text, value, debounceMs]);

  return (
    <div className="relative w-full sm:w-72">
      <Search className="w-4 h-4 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') onChangeRef.current(text.trim());
        }}
        placeholder={placeholder}
        className="w-full text-sm border border-gray-200 rounded-lg pl-8 pr-8 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#0072BC]/30"
      />
      {text && (
        <button
          type="button"
          aria-label="Clear search"
          onClick={() => {
            setText('');
            onChangeRef.current('');
          }}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
