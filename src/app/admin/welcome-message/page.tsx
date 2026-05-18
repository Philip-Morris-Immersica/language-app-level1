'use client';

import { useEffect, useState } from 'react';
import { MessageCircle, Save, Languages } from 'lucide-react';
import { HARDCODED_WELCOME_MESSAGES } from '@/lib/chat/welcomeMessages';

const DEFAULT_CHIPS_BG = [
  'Как можеш да ми помогнеш?',
  'Дай ми примери',
  'Какво означава тази дума?',
];

export default function AdminWelcomePage() {
  const [text, setText] = useState(HARDCODED_WELCOME_MESSAGES['bg'] ?? '');
  const [chips, setChips] = useState<string[]>([...DEFAULT_CHIPS_BG]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch('/api/admin/welcome-message')
      .then((r) => r.json())
      .then(({ messages: rows }) => {
        if (!rows?.length) return;
        const bgRow = rows.find((r: { lang: string }) => r.lang === 'bg');
        if (bgRow?.text) setText(bgRow.text);
        if (bgRow?.suggestionChips) {
          try { setChips(JSON.parse(bgRow.suggestionChips)); } catch {}
        }
      })
      .catch(() => {});
  }, []);

  const save = async () => {
    setSaving(true);
    await fetch('/api/admin/welcome-message', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: [{ lang: 'bg', text, suggestionChips: JSON.stringify(chips) }],
      }),
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    setSaving(false);
  };

  return (
    <div className="max-w-xl">
      <div className="flex items-center gap-2 mb-2">
        <MessageCircle className="w-5 h-5 text-[#0072BC]" />
        <h1 className="text-2xl font-bold text-gray-900">Welcome Message & Suggestion Chips</h1>
        <span className="text-xs bg-[#FCE2DE] text-[#683229] px-2 py-0.5 rounded-full">IT only</span>
      </div>
      <div className="flex items-center gap-1.5 text-xs text-[#0072BC] bg-[#EBF5FB] rounded-lg px-3 py-2 mb-5">
        <Languages className="w-3.5 h-3.5 flex-shrink-0" />
        Write in Bulgarian — translations to all 7 languages happen automatically for each user.
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 space-y-4">
        <div>
          <label className="text-sm font-semibold text-gray-700 block mb-1">Welcome message 🇧🇬</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={3}
            placeholder="Здравей! Аз съм Robi..."
            className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0072BC]/30 resize-none"
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-gray-700 block mb-1">
            Suggestion chips (3 quick-reply buttons) 🇧🇬
          </label>
          <div className="space-y-2">
            {[0, 1, 2].map((i) => (
              <input
                key={i}
                value={chips[i] ?? ''}
                onChange={(e) => {
                  const updated = [...chips];
                  updated[i] = e.target.value;
                  setChips(updated);
                }}
                placeholder={`Chip ${i + 1} (на български)`}
                className="w-full text-sm border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#0072BC]/30"
              />
            ))}
          </div>
        </div>

        {/* Live preview */}
        <div>
          <label className="text-xs text-gray-400 block mb-2">Preview (Bulgarian)</label>
          <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
            <div className="bg-gray-100 rounded-2xl rounded-tl-sm px-3 py-2 text-sm text-gray-800 mb-2 max-w-[90%]">
              {text || '(empty)'}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {chips.filter(Boolean).map((chip) => (
                <span key={chip} className="text-xs bg-[#CDE3F1] text-[#05568B] rounded-full px-3 py-1">
                  {chip}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <button onClick={save} disabled={saving}
        className={`mt-4 flex items-center gap-2 text-sm px-6 py-2.5 rounded-lg transition-colors ${saved ? 'bg-green-600' : 'bg-[#0072BC] hover:bg-[#005A8E]'} text-white disabled:opacity-50`}>
        <Save className="w-4 h-4" />
        {saving ? 'Saving...' : saved ? 'Saved!' : 'Save'}
      </button>
    </div>
  );
}
