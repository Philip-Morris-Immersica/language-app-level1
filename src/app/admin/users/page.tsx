'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Users, ArrowUp, ArrowDown } from 'lucide-react';
import AdminSearchInput from '@/components/admin/AdminSearchInput';
import AdminPagination from '@/components/admin/AdminPagination';

const PAGE_SIZE = 20;

interface User {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  adminRole: string | null;
  conversationCount: number;
  progressLevel: 'a1' | 'a2' | 'b1' | 'b2' | null;
  progressPct: number;
  lessonsAttempted: number;
  lessonsCompleted: number;
  costUsd30d: number;
}

type SortKey = 'name' | 'progress' | 'cost' | 'created';

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [sort, setSort] = useState<SortKey>('created');
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');
  const [search, setSearch] = useState('');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    const params = new URLSearchParams({
      page: String(page),
      limit: String(PAGE_SIZE),
      sort,
      order,
    });
    if (search) params.set('search', search);
    fetch(`/api/admin/users?${params}`)
      .then((r) => r.json())
      .then(({ users, total }) => {
        if (cancelled) return;
        setUsers(users ?? []);
        setTotal(Number(total) || 0);
      })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [page, sort, order, search]);

  const setSorting = (key: SortKey) => {
    if (key === sort) {
      setOrder(order === 'asc' ? 'desc' : 'asc');
    } else {
      setSort(key);
      setOrder(key === 'name' ? 'asc' : 'desc');
    }
    setPage(1);
  };

  const headerCell = (key: SortKey, label: string) => (
    <th
      className="px-4 py-3 text-left font-medium text-gray-600 cursor-pointer select-none hover:bg-gray-100"
      onClick={() => setSorting(key)}
    >
      <span className="flex items-center gap-1">
        {label}
        {sort === key && (
          order === 'asc' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />
        )}
      </span>
    </th>
  );

  const renderProgressCell = (u: User) => {
    if (!u.progressLevel) {
      return <span className="text-xs text-gray-400">No activity</span>;
    }
    return (
      <div className="min-w-[140px]">
        <div className="flex items-center gap-2" title="Current level and level progress">
          <span className="text-[11px] font-semibold text-gray-700 uppercase tabular-nums">
            {u.progressLevel}: {u.progressPct}%
          </span>
          <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#32C189]"
              style={{ width: `${Math.min(100, Math.max(2, u.progressPct))}%` }}
            />
          </div>
        </div>
        <p className="text-[10px] text-gray-400 mt-0.5">
          {u.lessonsCompleted} lesson{u.lessonsCompleted === 1 ? '' : 's'} completed
        </p>
      </div>
    );
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Users</h1>
        <div className="flex flex-wrap items-center gap-3">
          <AdminSearchInput
            value={search}
            onChange={(v) => { setSearch(v); setPage(1); }}
            placeholder="Search by name or email…"
          />
          <span className="text-sm text-gray-400 flex items-center gap-1">
            <Users className="w-4 h-4" /> {total} {search ? 'found' : 'total'} · {users.length} shown
          </span>
        </div>
      </div>

      {loading ? (
        <div className="text-sm text-gray-400 animate-pulse">Loading...</div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                {headerCell('name', 'User')}
                <th className="px-4 py-3 text-left font-medium text-gray-600">Role</th>
                {headerCell('progress', 'Current level · level %')}
                {headerCell('cost', 'Cost / 30d')}
                {headerCell('created', 'Joined')}
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <p className="font-medium text-gray-800">{user.name}</p>
                    <p className="text-xs text-gray-400">{user.email}</p>
                  </td>
                  <td className="px-4 py-3">
                    {user.adminRole ? (
                      <span className="bg-[#FCE2DE] text-[#683229] px-2 py-0.5 rounded text-xs font-medium capitalize">{user.adminRole}</span>
                    ) : (
                      <span className="text-gray-400 text-xs">learner</span>
                    )}
                  </td>
                  <td className="px-4 py-3">{renderProgressCell(user)}</td>
                  <td className="px-4 py-3">
                    <span className="text-xs font-medium text-gray-700 tabular-nums">
                      ${user.costUsd30d.toFixed(2)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-xs">{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-3">
                    <Link href={`/admin/users/${user.id}`} className="text-xs text-[#0072BC] hover:underline">View →</Link>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr><td colSpan={6} className="px-4 py-8 text-center text-gray-400">No users found.</td></tr>
              )}
            </tbody>
          </table>
          <AdminPagination
            page={page}
            totalPages={Math.max(1, Math.ceil(total / PAGE_SIZE))}
            onPageChange={setPage}
          />
        </div>
      )}
    </div>
  );
}
