'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { MessageSquare, Filter } from 'lucide-react';

interface Conversation {
  id: number;
  userId: number;
  userName: string;
  userEmail: string;
  language: string;
  level: string | null;
  startedAt: string;
  lastMessageAt: string;
  messageCount: number;
}

const LANGS = ['', 'bg', 'ar', 'en', 'fr', 'fa', 'uk', 'ru'];
const LEVELS = ['', 'a1', 'a2', 'b1', 'b2'];

export default function AdminChatsPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState('');
  const [level, setLevel] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams({ page: String(page), limit: '20' });
    if (lang) params.set('lang', lang);
    if (level) params.set('level', level);
    fetch(`/api/admin/chats?${params}`)
      .then((r) => r.json())
      .then(({ conversations }) => setConversations(conversations ?? []))
      .finally(() => setLoading(false));
  }, [lang, level, page]);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Conversations</h1>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <select value={lang} onChange={(e) => { setLang(e.target.value); setPage(1); }}
            className="text-sm border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#0072BC]/30">
            {LANGS.map((l) => <option key={l} value={l}>{l || 'All languages'}</option>)}
          </select>
          <select value={level} onChange={(e) => { setLevel(e.target.value); setPage(1); }}
            className="text-sm border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#0072BC]/30">
            {LEVELS.map((l) => <option key={l} value={l}>{l ? l.toUpperCase() : 'All levels'}</option>)}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="text-sm text-gray-400 animate-pulse">Loading...</div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-4 py-3 text-left font-medium text-gray-600">User</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Lang / Level</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Messages</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Started</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Last</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {conversations.map((conv) => (
                <tr key={conv.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <p className="font-medium text-gray-800">{conv.userName}</p>
                    <p className="text-xs text-gray-400">{conv.userEmail}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1">
                      <span className="bg-[#CDE3F1] text-[#05568B] px-1.5 py-0.5 rounded text-xs font-medium">{conv.language}</span>
                      {conv.level && <span className="bg-[#FEF1D1] text-[#684D0B] px-1.5 py-0.5 rounded text-xs font-medium">{conv.level.toUpperCase()}</span>}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    <span className="flex items-center gap-1"><MessageSquare className="w-3.5 h-3.5 text-gray-400" />{conv.messageCount}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-xs">{new Date(conv.startedAt).toLocaleDateString()}</td>
                  <td className="px-4 py-3 text-gray-500 text-xs">{new Date(conv.lastMessageAt).toLocaleDateString()}</td>
                  <td className="px-4 py-3">
                    <Link href={`/admin/chats/${conv.id}`} className="text-xs text-[#0072BC] hover:underline">View →</Link>
                  </td>
                </tr>
              ))}
              {conversations.length === 0 && (
                <tr><td colSpan={6} className="px-4 py-8 text-center text-gray-400">No conversations found.</td></tr>
              )}
            </tbody>
          </table>
          <div className="px-4 py-3 border-t border-gray-100 flex items-center gap-3">
            <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}
              className="text-xs px-3 py-1.5 border border-gray-200 rounded-lg disabled:opacity-40 hover:bg-gray-50">← Prev</button>
            <span className="text-xs text-gray-500">Page {page}</span>
            <button onClick={() => setPage((p) => p + 1)} disabled={conversations.length < 20}
              className="text-xs px-3 py-1.5 border border-gray-200 rounded-lg disabled:opacity-40 hover:bg-gray-50">Next →</button>
          </div>
        </div>
      )}
    </div>
  );
}
