'use client';

import { useEffect, useState } from 'react';
import { Key, Plus, Trash2, Eye, EyeOff } from 'lucide-react';

interface ApiKey {
  id: number;
  provider: string;
  isActive: boolean;
  createdAt: string;
  lastUsedAt: string | null;
}

const PROVIDERS = ['openai', 'anthropic', 'google'];

export default function AdminApiKeysPage() {
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [provider, setProvider] = useState('openai');
  const [keyValue, setKeyValue] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const loadKeys = () => {
    setLoading(true);
    fetch('/api/admin/api-keys').then((r) => r.json()).then(({ keys }) => setKeys(keys ?? [])).finally(() => setLoading(false));
  };

  useEffect(loadKeys, []);

  const addKey = async () => {
    if (!keyValue.trim()) return;
    setSaving(true);
    setError('');
    const r = await fetch('/api/admin/api-keys', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ provider, key: keyValue }),
    });
    const data = await r.json();
    if (r.ok) {
      setSuccess(`Key saved: ${data.masked}`);
      setKeyValue('');
      loadKeys();
    } else {
      setError(data.error ?? 'Error saving key');
    }
    setSaving(false);
  };

  const deleteKey = async (id: number) => {
    if (!confirm('Delete this API key?')) return;
    await fetch(`/api/admin/api-keys?id=${id}`, { method: 'DELETE' });
    loadKeys();
  };

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-2 mb-6">
        <Key className="w-5 h-5 text-[#0072BC]" />
        <h1 className="text-2xl font-bold text-gray-900">API Keys</h1>
        <span className="text-xs bg-[#FCE2DE] text-[#683229] px-2 py-0.5 rounded-full">IT only</span>
      </div>

      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-5">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Add new key</h3>
        <div className="space-y-3">
          <select value={provider} onChange={(e) => setProvider(e.target.value)}
            className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0072BC]/30">
            {PROVIDERS.map((p) => <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>)}
          </select>
          <div className="relative">
            <input
              type={showKey ? 'text' : 'password'}
              value={keyValue}
              onChange={(e) => setKeyValue(e.target.value)}
              placeholder="sk-..."
              className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-[#0072BC]/30 font-mono"
            />
            <button onClick={() => setShowKey(!showKey)} type="button"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          <button onClick={addKey} disabled={saving || !keyValue.trim()}
            className="flex items-center gap-1.5 bg-[#0072BC] text-white text-sm px-4 py-2 rounded-lg hover:bg-[#005A8E] transition-colors disabled:opacity-50">
            <Plus className="w-4 h-4" /> {saving ? 'Saving...' : 'Save key'}
          </button>
          {error && <p className="text-xs text-red-600">{error}</p>}
          {success && <p className="text-xs text-green-600">{success}</p>}
        </div>
        <p className="text-xs text-gray-400 mt-3">Keys are encrypted with AES-256-GCM before storage. You won't be able to view the key again after saving.</p>
      </div>

      {loading ? (
        <div className="text-sm text-gray-400 animate-pulse">Loading...</div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {keys.length === 0 ? (
            <p className="px-4 py-8 text-sm text-gray-400 text-center">No API keys configured.</p>
          ) : (
            <div className="divide-y divide-gray-50">
              {keys.map((k) => (
                <div key={k.id} className="px-4 py-3 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm text-gray-800 capitalize">{k.provider}</span>
                      {k.isActive && <span className="text-xs bg-[#DAF6EB] text-[#1F5741] px-1.5 py-0.5 rounded">active</span>}
                    </div>
                    <div className="text-xs text-gray-400 mt-0.5">
                      Added: {new Date(k.createdAt).toLocaleDateString()}
                      {k.lastUsedAt && ` · Last used: ${new Date(k.lastUsedAt).toLocaleDateString()}`}
                    </div>
                  </div>
                  <button onClick={() => deleteKey(k.id)}
                    className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
