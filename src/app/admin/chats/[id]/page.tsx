'use client';

import { useEffect, useState, use } from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

interface Message {
  id: number;
  role: string;
  content: string;
  createdAt: string;
  lessonContext: string | null;
  model: string | null;
  tokensIn: number | null;
  tokensOut: number | null;
  contentRedacted: boolean;
}

interface Conversation {
  id: number;
  userName: string;
  userEmail: string;
  language: string;
  level: string | null;
  startedAt: string;
}

export default function AdminChatDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [conv, setConv] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/admin/chats/${id}`)
      .then((r) => r.json())
      .then(({ conversation, messages }) => {
        setConv(conversation);
        setMessages(messages ?? []);
      })
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/chats" className="text-sm text-[#0072BC] hover:underline">← Conversations</Link>
        <span className="text-gray-300">/</span>
        <span className="text-sm text-gray-600">Conversation #{id}</span>
      </div>

      {loading ? (
        <div className="text-sm text-gray-400 animate-pulse">Loading...</div>
      ) : (
        <>
          {conv && (
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><span className="text-gray-400">User:</span> <span className="font-medium">{conv.userName}</span></div>
                <div><span className="text-gray-400">Email:</span> {conv.userEmail}</div>
                <div><span className="text-gray-400">Language:</span> <span className="uppercase font-mono">{conv.language}</span></div>
                <div><span className="text-gray-400">Level:</span> {conv.level?.toUpperCase() ?? '—'}</div>
                <div><span className="text-gray-400">Started:</span> {new Date(conv.startedAt).toLocaleString()}</div>
              </div>
            </div>
          )}

          <div className="space-y-3">
            {messages.filter((m) => m.role !== 'system').map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`rounded-2xl px-4 py-2.5 max-w-[85%] text-sm ${
                  msg.role === 'user'
                    ? 'bg-[#0072BC] text-white rounded-tr-sm'
                    : 'bg-gray-100 text-gray-800 rounded-tl-sm'
                }`}>
                  {msg.contentRedacted && (
                    <span className="text-xs opacity-60 block mb-1">[Some content was redacted for privacy]</span>
                  )}
                  {msg.role === 'assistant' ? (
                    <div className="prose prose-sm max-w-none">
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>
                  ) : (
                    msg.content
                  )}
                  <div className="text-xs opacity-50 mt-1">{new Date(msg.createdAt).toLocaleTimeString()}</div>
                </div>
              </div>
            ))}
            {messages.length === 0 && <p className="text-sm text-gray-400 text-center py-8">No messages.</p>}
          </div>
        </>
      )}
    </div>
  );
}
