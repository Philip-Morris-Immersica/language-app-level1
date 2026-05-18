'use client';

import { useEffect, useState } from 'react';
import { ShieldCheck, Plus, Trash2 } from 'lucide-react';

interface Admin {
  id: number;
  userId: number;
  role: string;
  createdAt: string;
  name: string;
  email: string;
}

const ROLES = ['it', 'admin', 'viewer'];

export default function AdminAdminsPage() {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(true);
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState('admin');
  const [users, setUsers] = useState<Array<{ id: number; email: string; name: string }>>([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const loadAdmins = () => {
    setLoading(true);
    fetch('/api/admin/admins').then((r) => r.json()).then(({ admins }) => setAdmins(admins ?? [])).finally(() => setLoading(false));
  };

  useEffect(() => {
    loadAdmins();
    fetch('/api/admin/users?limit=100').then((r) => r.json()).then(({ users }) => setUsers(users ?? []));
  }, []);

  const addAdmin = async () => {
    const user = users.find((u) => u.email === newEmail);
    if (!user) { setError('User not found. They must be registered first.'); return; }
    setError('');
    const r = await fetch('/api/admin/admins', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: user.id, role: newRole }),
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
        <span className="text-xs bg-[#FCE2DE] text-[#683229] px-2 py-0.5 rounded-full">IT only</span>
      </div>

      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-5">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Grant admin role</h3>
        <div className="flex gap-2">
          <input
            list="users-list"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            placeholder="User email..."
            className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0072BC]/30"
          />
          <datalist id="users-list">
            {users.map((u) => <option key={u.id} value={u.email} label={u.name} />)}
          </datalist>
          <select value={newRole} onChange={(e) => setNewRole(e.target.value)}
            className="text-sm border border-gray-200 rounded-lg px-2 py-2 focus:outline-none">
            {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
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
                    <button onClick={() => removeAdmin(admin.userId)}
                      className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
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
