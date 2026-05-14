'use client';

import { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { MessageSquare, Sparkles } from 'lucide-react';

interface User {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  adminRole: string | null;
}

interface Conversation {
  id: number;
  language: string;
  level: string | null;
  startedAt: string;
  lastMessageAt: string;
}

export default function AdminUserDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [user, setUser] = useState<User | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [summary, setSummary] = useState<string | null>(null);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/admin/users/${id}`)
      .then((r) => r.json())
      .then(({ user, conversations }) => {
        setUser(user);
        setConversations(conversations ?? []);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const generateSummary = async () => {
    setSummaryLoading(true);
    try {
      const r = await fetch(`/api/admin/users/${id}/summary`, { method: 'POST' });
      const { summary } = await r.json();
      setSummary(summary);
    } finally {
      setSummaryLoading(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/users" className="text-sm text-[#0072BC] hover:underline">← Users</Link>
        <span className="text-gray-300">/</span>
        <span className="text-sm text-gray-600">User #{id}</span>
      </div>

      {loading ? (
        <div className="text-sm text-gray-400 animate-pulse">Loading...</div>
      ) : (
        <>
          {user && (
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-4">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">{user.name}</h2>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
                {user.adminRole && (
                  <span className="bg-[#FCE2DE] text-[#683229] px-2 py-0.5 rounded text-xs font-medium capitalize">{user.adminRole}</span>
                )}
              </div>
              <p className="text-xs text-gray-400">Joined: {new Date(user.createdAt).toLocaleDateString()}</p>
            </div>
          )}

          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-gray-800">AI Learning Summary</h3>
              <button
                onClick={generateSummary}
                disabled={summaryLoading}
                className="flex items-center gap-1.5 text-xs bg-[#0072BC] text-white px-3 py-1.5 rounded-lg hover:bg-[#005A8E] transition-colors disabled:opacity-50"
              >
                <Sparkles className="w-3.5 h-3.5" />
                {summaryLoading ? 'Generating...' : 'Generate summary'}
              </button>
            </div>
            {summary ? (
              <p className="text-sm text-gray-700 whitespace-pre-line">{summary}</p>
            ) : (
              <p className="text-sm text-gray-400">Click "Generate summary" to get an AI analysis of this user's learning conversations.</p>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-gray-400" />
              <h3 className="text-sm font-semibold text-gray-800">Conversations ({conversations.length})</h3>
            </div>
            <div className="divide-y divide-gray-50">
              {conversations.map((conv) => (
                <div key={conv.id} className="px-4 py-3 flex items-center justify-between hover:bg-gray-50">
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-[#CDE3F1] text-[#05568B] px-1.5 py-0.5 rounded font-medium">{conv.language}</span>
                    {conv.level && <span className="text-xs bg-[#FEF1D1] text-[#684D0B] px-1.5 py-0.5 rounded font-medium">{conv.level.toUpperCase()}</span>}
                    <span className="text-xs text-gray-400">{new Date(conv.startedAt).toLocaleDateString()}</span>
                  </div>
                  <Link href={`/admin/chats/${conv.id}`} className="text-xs text-[#0072BC] hover:underline">View →</Link>
                </div>
              ))}
              {conversations.length === 0 && (
                <p className="px-4 py-6 text-sm text-gray-400 text-center">No conversations yet.</p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
