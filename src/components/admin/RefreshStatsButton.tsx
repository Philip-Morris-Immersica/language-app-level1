'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { RefreshCw } from 'lucide-react';

export function RefreshStatsButton() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(false);

  const refresh = async () => {
    setBusy(true);
    setError(false);
    try {
      const r = await fetch('/api/admin/stats/refresh', { method: 'POST', credentials: 'include' });
      if (!r.ok) throw new Error('refresh failed');
      router.refresh();
    } catch {
      setError(true);
    } finally {
      setBusy(false);
    }
  };

  return (
    <span className="inline-flex items-center gap-2">
      <button
        type="button"
        onClick={refresh}
        disabled={busy}
        className="inline-flex items-center gap-1.5 text-xs bg-[#0072BC] text-white px-3 py-1.5 rounded-lg hover:bg-[#005A8E] transition-colors disabled:opacity-50"
      >
        <RefreshCw className={`w-3.5 h-3.5 ${busy ? 'animate-spin' : ''}`} />
        {busy ? 'Refreshing...' : 'Refresh now'}
      </button>
      {error && <span className="text-xs text-[#D25A45]">Refresh failed</span>}
    </span>
  );
}
