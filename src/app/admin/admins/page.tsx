'use client';

import { useEffect, useRef, useState } from 'react';
import { ShieldCheck, Plus, Trash2 } from 'lucide-react';

interface Admin {
  id: number;
  userId: number;
  role: string;
  createdAt: string;
  name: string;
  email: string;
}

interface UserSuggestion {
  id: number;
  name: string;
  email: string;
}

const ALL_ROLES = ['it', 'admin', 'viewer'];

export default function AdminAdminsPage() {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(true);
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState('admin');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [myRole, setMyRole] = useState<string | null>(null);
  const isIt = myRole === 'it';
  // Non-IT admins can grant 'admin'/'viewer' but never 'it' — that stays IT-only.
  const assignableRoles = isIt ? ALL_ROLES : ALL_ROLES.filter((r) => r !== 'it');

  const [suggestions, setSuggestions] = useState<UserSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searching, setSearching] = useState(false);
  const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const loadAdmins = () => {
    setLoading(true);
    fetch('/api/admin/admins').then((r) => r.json()).then(({ admins }) => setAdmins(admins ?? [])).finally(() => setLoading(false));
  };

  useEffect(() => {
    loadAdmins();
    fetch('/api/admin/me').then((r) => r.json()).then(({ admin }) => setMyRole(admin?.role ?? null));
  }, []);

  // Live "starts with" search on name + email as the IT admin types, so
  // matches show up immediately regardless of total registered user count.
  useEffect(() => {
    const q = newEmail.trim();
    if (searchTimer.current) clearTimeout(searchTimer.current);
    if (q.length < 2) { setSuggestions([]); setSearching(false); return; }

    setSearching(true);
    searchTimer.current = setTimeout(() => {
      fetch(`/api/admin/users/search?q=${encodeURIComponent(q)}`)
        .then((r) => r.json())
        .then(({ users }) => setSuggestions(users ?? []))
        .finally(() => setSearching(false));
    }, 250);

    return () => { if (searchTimer.current) clearTimeout(searchTimer.current); };
  }, [newEmail]);

  const pickSuggestion = (u: UserSuggestion) => {
    setNewEmail(u.email);
    setShowSuggestions(false);
    setSuggestions([]);
  };

  const addAdmin = async () => {
    const email = newEmail.trim();
    if (!email) { setError('Enter an email.'); return; }
    setError('');
    setSuccess('');
    setShowSuggestions(false);
    // The server resolves the user by email itself (case-insensitive, no
    // pagination cap) — no need to match against a locally cached list.
    const r = await fetch('/api/admin/admins', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, role: newRole }),
    });
    if (r.ok) { setSuccess('Admin role granted.'); setNewEmail(''); loadAdmins(); }
    else { const d = await r.json(); setError(d.error ?? 'Error'); }
  };

  const removeAdmin = async (userId: number) => {
    if (!confirm('Remove this admin role?')) return;
    await fetch(`/api/admin/admins?userId=${userId}`, { method: 'DELETE' });
    loadAdmins();
  };

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-2 mb-6">
        <ShieldCheck className="w-5 h-5 text-[#0072BC]" />
        <h1 className="text-2xl font-bold text-gray-900">Admin Management</h1>
        <span className="text-xs bg-[#FCE2DE] text-[#683229] px-2 py-0.5 rounded-full">
          {isIt ? 'IT' : 'Admin'} access
        </span>
      </div>

      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-5">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Grant admin role</h3>
        {!isIt && (
          <p className="text-xs text-gray-400 mb-3">
            You can grant &quot;admin&quot; or &quot;viewer&quot; access. Only IT can grant IT access or remove admins.
          </p>
        )}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <input
              value={newEmail}
              onChange={(e) => { setNewEmail(e.target.value); setShowSuggestions(true); }}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
              onKeyDown={(e) => { if (e.key === 'Enter') addAdmin(); }}
              placeholder="Search by name or email..."
              autoComplete="off"
              className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0072BC]/30"
            />
            {showSuggestions && newEmail.trim().length >= 2 && (
              <div className="absolute z-10 top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-64 overflow-y-auto">
                {searching ? (
                  <p className="px-3 py-2 text-xs text-gray-400">Searching...</p>
                ) : suggestions.length > 0 ? (
                  suggestions.map((u) => (
                    <button
                      key={u.id}
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => pickSuggestion(u)}
                      className="w-full text-left px-3 py-2 hover:bg-[#CDE3F1]/40 border-b border-gray-50 last:border-b-0"
                    >
                      <p className="text-sm font-medium text-gray-800">{u.name}</p>
                      <p className="text-xs text-gray-400">{u.email}</p>
                    </button>
                  ))
                ) : (
                  <p className="px-3 py-2 text-xs text-gray-400">No matches.</p>
                )}
              </div>
            )}
          </div>
          <select value={newRole} onChange={(e) => setNewRole(e.target.value)}
            className="text-sm border border-gray-200 rounded-lg px-2 py-2 focus:outline-none">
            {assignableRoles.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
          <button onClick={addAdmin}
            className="flex items-center gap-1.5 bg-[#0072BC] text-white text-sm px-4 py-2 rounded-lg hover:bg-[#005A8E] transition-colors">
            <Plus className="w-4 h-4" /> Grant
          </button>
        </div>
        {error && <p className="text-xs text-red-600 mt-2">{error}</p>}
        {success && <p className="text-xs text-green-600 mt-2">{success}</p>}
      </div>

      {loading ? (
        <div className="text-sm text-gray-400 animate-pulse">Loading...</div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-4 py-3 text-left font-medium text-gray-600">User</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Role</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Since</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {admins.map((admin) => (
                <tr key={admin.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <p className="font-medium text-gray-800">{admin.name}</p>
                    <p className="text-xs text-gray-400">{admin.email}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded font-medium capitalize ${
                      admin.role === 'it' ? 'bg-[#FCE2DE] text-[#683229]' :
                      admin.role === 'admin' ? 'bg-[#CDE3F1] text-[#05568B]' :
                      'bg-[#FEF1D1] text-[#684D0B]'
                    }`}>{admin.role}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-xs">{new Date(admin.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-3">
                    {isIt && (
                      <button onClick={() => removeAdmin(admin.userId)}
                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {admins.length === 0 && <tr><td colSpan={4} className="px-4 py-8 text-center text-gray-400">No admins configured.</td></tr>}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
