'use client';

import { useEffect, useState } from 'react';
import { BookOpen, Save, Play, History, ChevronDown, ChevronUp } from 'lucide-react';
import { AVAILABLE_MODELS } from '@/lib/chat/availableModels';

const SCOPES = ['base', 'a1', 'a2', 'b1', 'b2'];

interface Prompt {
  id: number;
  scope: string;
  promptText: string;
  temperature: number;
  model: string;
  maxTokens: number;
  version: number;
  isActive: boolean;
  updatedAt: string;
}

export default function AdminPromptsPage() {
  const [scope, setScope] = useState('base');
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [text, setText] = useState('');
  const [temperature, setTemperature] = useState(70);
  const [model, setModel] = useState('gpt-4o-mini');
  const [maxTokens, setMaxTokens] = useState(1000);
  const [testMsg, setTestMsg] = useState('');
  const [testResult, setTestResult] = useState('');
  const [testing, setTesting] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [saved, setSaved] = useState(false);

  const loadPrompts = () => {
    fetch(`/api/admin/prompts?scope=${scope}`)
      .then((r) => r.json())
      .then(({ prompts }) => {
        setPrompts(prompts ?? []);
        const active = (prompts ?? []).find((p: Prompt) => p.isActive);
        if (active) {
          setText(active.promptText);
          setTemperature(active.temperature);
          setModel(active.model);
          setMaxTokens(active.maxTokens);
        } else {
          setText('');
          setTemperature(70);
          setModel('gpt-4o-mini');
          setMaxTokens(1000);
        }
      });
  };

  useEffect(() => { loadPrompts(); }, [scope]);

  const save = async () => {
    setSaving(true);
    await fetch('/api/admin/prompts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ scope, promptText: text, temperature, model, maxTokens }),
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    setSaving(false);
    loadPrompts();
  };

  const test = async () => {
    if (!testMsg.trim()) return;
    setTesting(true);
    setTestResult('');
    const r = await fetch('/api/admin/prompts/test', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ promptText: text, testMessage: testMsg, temperature, model, maxTokens }),
    });
    const { response } = await r.json();
    setTestResult(response ?? 'Error');
    setTesting(false);
  };

  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-2 mb-6">
        <BookOpen className="w-5 h-5 text-[#0072BC]" />
        <h1 className="text-2xl font-bold text-gray-900">AI Prompts</h1>
        <span className="text-xs bg-[#FCE2DE] text-[#683229] px-2 py-0.5 rounded-full">IT only</span>
      </div>

      <div className="flex gap-1.5 mb-5">
        {SCOPES.map((s) => (
          <button key={s} onClick={() => setScope(s)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              scope === s ? 'bg-[#0072BC] text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}>
            {s === 'base' ? 'Base' : s.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-4 space-y-4">
        <div>
          <label className="text-xs font-medium text-gray-600 block mb-1.5">Prompt text</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={12}
            className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#0072BC]/30 font-mono resize-y"
            placeholder={`System prompt for ${scope === 'base' ? 'all levels (base)' : scope.toUpperCase() + ' level'}...`}
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-medium text-gray-600 block mb-1.5">Model</label>
            <select value={model} onChange={(e) => setModel(e.target.value)}
              className="w-full text-sm border border-gray-200 rounded-lg px-2 py-2 focus:outline-none focus:ring-2 focus:ring-[#0072BC]/30">
              {AVAILABLE_MODELS.map((m) => <option key={m.id} value={m.id}>{m.label}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600 block mb-1.5">Temperature: {(temperature / 100).toFixed(2)}</label>
            <input type="range" min={0} max={200} value={temperature} onChange={(e) => setTemperature(Number(e.target.value))}
              className="w-full accent-[#0072BC]" />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600 block mb-1.5">Max tokens</label>
            <input type="number" value={maxTokens} onChange={(e) => setMaxTokens(Number(e.target.value))}
              min={100} max={4000} step={100}
              className="w-full text-sm border border-gray-200 rounded-lg px-2 py-2 focus:outline-none focus:ring-2 focus:ring-[#0072BC]/30" />
          </div>
        </div>

        <div className="flex gap-2">
          <button onClick={save} disabled={saving || !text.trim()}
            className={`flex items-center gap-1.5 text-sm px-4 py-2 rounded-lg transition-colors ${saved ? 'bg-green-600' : 'bg-[#0072BC] hover:bg-[#005A8E]'} text-white disabled:opacity-50`}>
            <Save className="w-4 h-4" />
            {saving ? 'Saving...' : saved ? 'Saved!' : 'Save as new version'}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-1.5"><Play className="w-4 h-4 text-[#32C189]" /> Test prompt</h3>
        <div className="flex gap-2 mb-3">
          <input value={testMsg} onChange={(e) => setTestMsg(e.target.value)}
            placeholder="Enter a test message..."
            className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0072BC]/30" />
          <button onClick={test} disabled={testing || !testMsg.trim()}
            className="bg-[#32C189] text-white text-sm px-4 py-2 rounded-lg hover:bg-[#257958] transition-colors disabled:opacity-50">
            {testing ? 'Testing...' : 'Test'}
          </button>
        </div>
        {testResult && (
          <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-700 whitespace-pre-wrap">{testResult}</div>
        )}
      </div>

      {prompts.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <button onClick={() => setShowHistory(!showHistory)}
            className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50">
            <span className="flex items-center gap-1.5"><History className="w-4 h-4" /> Version history ({prompts.length})</span>
            {showHistory ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          {showHistory && (
            <div className="border-t border-gray-100 divide-y divide-gray-50">
              {prompts.map((p) => (
                <div key={p.id} className="px-4 py-3 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-medium text-gray-700">v{p.version}</span>
                    {p.isActive && <span className="ml-2 text-xs bg-[#DAF6EB] text-[#1F5741] px-1.5 py-0.5 rounded">active</span>}
                    <span className="ml-2 text-xs text-gray-400">{p.model}</span>
                  </div>
                  <span className="text-xs text-gray-400">{new Date(p.updatedAt).toLocaleString()}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
