'use client';

import { useEffect, useState } from 'react';
import { BookOpen, Save, Play, History, ChevronDown, ChevronUp, AlertCircle, Eye, Info } from 'lucide-react';
import { AVAILABLE_MODELS } from '@/lib/chat/availableModels';

const SCOPES = ['base', 'a1', 'a2', 'b1', 'b2'] as const;
type Scope = typeof SCOPES[number];

/** Short help text shown above the editor per scope. */
const SCOPE_HELP: Record<Scope, string> = {
  base: 'BASE = behavior rules applied to every chat (role, tone, language rules, boundaries, pedagogy, test policy, dialog style). This text REPLACES the hardcoded default. The CAPABILITIES + PLATFORM_KNOWLEDGE blocks (hardcoded in promptBuilder.ts) are always prepended automatically — you do NOT need to write them here.',
  a1: 'A1 = additional rules appended AFTER base, only when the user is on an A1 lesson. Use for level-specific tweaks (e.g. "Stick to present tense", "Avoid abstract nouns"). Leave empty if not needed.',
  a2: 'A2 = additional rules appended AFTER base, only when the user is on an A2 lesson.',
  b1: 'B1 = additional rules appended AFTER base, only when the user is on a B1 lesson.',
  b2: 'B2 = additional rules appended AFTER base, only when the user is on a B2 lesson.',
};

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

const LANG_OPTIONS = [
  { code: 'bg', label: 'Български' },
  { code: 'en', label: 'English' },
  { code: 'ar', label: 'العربية' },
  { code: 'fr', label: 'Français' },
  { code: 'fa', label: 'فارسی' },
  { code: 'uk', label: 'Українська' },
  { code: 'ru', label: 'Русский' },
];

export default function AdminPromptsPage() {
  const [scope, setScope] = useState<Scope>('base');
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [text, setText] = useState('');
  const [temperature, setTemperature] = useState(70);
  const [model, setModel] = useState('gpt-4o-mini');
  const [maxTokens, setMaxTokens] = useState(1000);
  const [testMsg, setTestMsg] = useState('');
  const [testResult, setTestResult] = useState('');
  const [testError, setTestError] = useState('');
  const [testing, setTesting] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [saved, setSaved] = useState(false);

  // Preview state
  const [previewLessonId, setPreviewLessonId] = useState('lesson-01');
  const [previewLang, setPreviewLang] = useState('en');
  const [previewIncludeProgress, setPreviewIncludeProgress] = useState(false);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [previewResult, setPreviewResult] = useState<{ systemPrompt: string; charCount: number; approxTokens: number } | null>(null);
  const [showPreview, setShowPreview] = useState(false);

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
    setTestError('');
    try {
      const r = await fetch('/api/admin/prompts/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ promptText: text, testMessage: testMsg, temperature, model, maxTokens }),
      });
      const data = await r.json();
      if (!r.ok) {
        setTestError(data.error ?? `HTTP ${r.status}`);
      } else if (data.response) {
        setTestResult(data.response);
      } else {
        setTestError('Empty response from server.');
      }
    } catch (e) {
      setTestError(e instanceof Error ? e.message : String(e));
    } finally {
      setTesting(false);
    }
  };

  const runPreview = async () => {
    setPreviewLoading(true);
    setShowPreview(true);
    try {
      const body: Record<string, unknown> = {
        userLanguage: previewLang,
        lessonId: previewLessonId.trim() || undefined,
        includeProgress: previewIncludeProgress,
      };
      if (scope === 'base') {
        body.basePromptOverride = text;
      } else {
        body.levelPromptOverride = text;
      }
      const r = await fetch('/api/admin/prompts/preview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await r.json();
      if (!r.ok) {
        setPreviewResult({ systemPrompt: `ERROR: ${data.error ?? r.status}`, charCount: 0, approxTokens: 0 });
      } else {
        setPreviewResult(data);
      }
    } catch (e) {
      setPreviewResult({ systemPrompt: `ERROR: ${e instanceof Error ? e.message : String(e)}`, charCount: 0, approxTokens: 0 });
    } finally {
      setPreviewLoading(false);
    }
  };

  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-2 mb-6">
        <BookOpen className="w-5 h-5 text-[#0072BC]" />
        <h1 className="text-2xl font-bold text-gray-900">AI Prompts</h1>
        <span className="text-xs bg-[#FCE2DE] text-[#683229] px-2 py-0.5 rounded-full">IT only</span>
      </div>

      <div className="flex gap-1.5 mb-3">
        {SCOPES.map((s) => (
          <button key={s} onClick={() => setScope(s)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              scope === s ? 'bg-[#0072BC] text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}>
            {s === 'base' ? 'Base' : s.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Per-scope help banner */}
      <div className="flex items-start gap-2 mb-4 text-xs text-[#05568B] bg-[#CDE3F1]/50 border border-[#CDE3F1] rounded-lg px-3 py-2">
        <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
        <span>{SCOPE_HELP[scope]}</span>
      </div>

      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-4 space-y-4">
        <div>
          <label className="text-xs font-medium text-gray-600 block mb-1.5">Prompt text</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={14}
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
            <div className="flex gap-1 mb-1.5">
              {[
                { label: 'Precise', value: 20, hint: '0.2 — strict grammar Q&A' },
                { label: 'Balanced', value: 70, hint: '0.7 — default' },
                { label: 'Creative', value: 120, hint: '1.2 — conversational warmth' },
              ].map((preset) => (
                <button
                  key={preset.value}
                  type="button"
                  title={preset.hint}
                  onClick={() => setTemperature(preset.value)}
                  className={`flex-1 text-[11px] px-2 py-1 rounded border transition-colors ${
                    temperature === preset.value
                      ? 'bg-[#0072BC] text-white border-[#0072BC]'
                      : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
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

      {/* Full system prompt preview */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-1.5">
          <Eye className="w-4 h-4 text-[#0072BC]" /> Preview full system prompt
        </h3>
        <p className="text-xs text-gray-500 mb-3">
          See exactly what the model receives (CAPABILITIES + PLATFORM_KNOWLEDGE + your editor text + dynamic data for the chosen lesson and language).
        </p>
        <div className="grid grid-cols-3 gap-3 mb-3">
          <div>
            <label className="text-xs font-medium text-gray-600 block mb-1">Lesson ID</label>
            <input value={previewLessonId} onChange={(e) => setPreviewLessonId(e.target.value)}
              placeholder="lesson-01 / a2-lesson-01"
              className="w-full text-sm border border-gray-200 rounded-lg px-2 py-2 focus:outline-none focus:ring-2 focus:ring-[#0072BC]/30" />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600 block mb-1">User language</label>
            <select value={previewLang} onChange={(e) => setPreviewLang(e.target.value)}
              className="w-full text-sm border border-gray-200 rounded-lg px-2 py-2 focus:outline-none focus:ring-2 focus:ring-[#0072BC]/30">
              {LANG_OPTIONS.map((l) => <option key={l.code} value={l.code}>{l.label}</option>)}
            </select>
          </div>
          <div className="flex items-end">
            <label className="flex items-center gap-2 text-xs text-gray-600 cursor-pointer">
              <input type="checkbox" checked={previewIncludeProgress}
                onChange={(e) => setPreviewIncludeProgress(e.target.checked)} />
              Include my own progress
            </label>
          </div>
        </div>
        <button onClick={runPreview} disabled={previewLoading}
          className="bg-[#0072BC] text-white text-sm px-4 py-2 rounded-lg hover:bg-[#005A8E] transition-colors disabled:opacity-50">
          {previewLoading ? 'Building...' : 'Preview'}
        </button>
        {showPreview && previewResult && (
          <div className="mt-3 space-y-2">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>{previewResult.charCount.toLocaleString()} chars / ~{previewResult.approxTokens.toLocaleString()} input tokens</span>
              <button onClick={() => navigator.clipboard.writeText(previewResult.systemPrompt)}
                className="text-[#0072BC] hover:underline">Copy</button>
            </div>
            <pre className="bg-gray-50 rounded-lg p-3 text-xs text-gray-800 whitespace-pre-wrap font-mono max-h-96 overflow-y-auto border border-gray-200">
{previewResult.systemPrompt}
            </pre>
          </div>
        )}
      </div>

      {/* Test prompt */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-1.5">
          <Play className="w-4 h-4 text-[#32C189]" /> Test prompt
        </h3>
        <p className="text-xs text-gray-500 mb-3">
          Sends ONLY this scope&apos;s text as the system message (no CAPABILITIES, no PLATFORM, no lesson data). Use to validate the wording in isolation. For a real-world preview use the panel above.
        </p>
        <div className="flex gap-2 mb-3">
          <input value={testMsg} onChange={(e) => setTestMsg(e.target.value)}
            placeholder="Enter a test message..."
            className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0072BC]/30" />
          <button onClick={test} disabled={testing || !testMsg.trim()}
            className="bg-[#32C189] text-white text-sm px-4 py-2 rounded-lg hover:bg-[#257958] transition-colors disabled:opacity-50">
            {testing ? 'Testing...' : 'Test'}
          </button>
        </div>
        {testError && (
          <div className="flex items-start gap-2 bg-[#FCE2DE] border border-[#D25A45]/40 rounded-lg p-3 text-sm text-[#683229]">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <div className="font-mono text-xs whitespace-pre-wrap">{testError}</div>
          </div>
        )}
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
