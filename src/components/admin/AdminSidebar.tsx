'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, MessageSquare, Users, FileText,
  MessageCircle, Key, ShieldCheck, BookOpen, ClipboardList
} from 'lucide-react';
import type { AdminRole } from '@/lib/admin/getCurrentAdmin';

interface Props {
  role: AdminRole;
}

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
  minRole?: AdminRole; // defaults to 'viewer' (everyone with any admin role)
}

const ROLE_RANK: Record<AdminRole, number> = { viewer: 0, admin: 1, it: 2 };

const NAV_ITEMS: NavItem[] = [
  { href: '/admin', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
  { href: '/admin/chats', label: 'Conversations', icon: <MessageSquare className="w-4 h-4" /> },
  { href: '/admin/users', label: 'Users', icon: <Users className="w-4 h-4" /> },
  { href: '/admin/reports', label: 'Reports', icon: <FileText className="w-4 h-4" /> },
  { href: '/admin/prompts', label: 'Prompts (IT)', icon: <BookOpen className="w-4 h-4" />, minRole: 'it' },
  { href: '/admin/welcome-message', label: 'Welcome Msg (IT)', icon: <MessageCircle className="w-4 h-4" />, minRole: 'it' },
  { href: '/admin/api-keys', label: 'API Keys (IT)', icon: <Key className="w-4 h-4" />, minRole: 'it' },
  { href: '/admin/admins', label: 'Admins', icon: <ShieldCheck className="w-4 h-4" />, minRole: 'admin' },
  { href: '/admin/audit', label: 'Audit Log (IT)', icon: <ClipboardList className="w-4 h-4" />, minRole: 'it' },
];

export function AdminSidebar({ role }: Props) {
  const pathname = usePathname();

  const visibleItems = NAV_ITEMS.filter((item) => ROLE_RANK[role] >= ROLE_RANK[item.minRole ?? 'viewer']);

  return (
    <aside className="w-56 min-h-screen bg-white border-r border-gray-200 flex flex-col">
      <div className="px-4 py-5 border-b border-gray-100">
        <div className="text-xs font-semibold text-[#0072BC] uppercase tracking-wider">Admin Panel</div>
        <div className="text-xs text-gray-500 mt-0.5 capitalize">{role} access</div>
      </div>

      <nav className="flex-1 px-2 py-4 space-y-0.5">
        {visibleItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                isActive
                  ? 'bg-[#CDE3F1] text-[#05568B] font-medium'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-4 py-3 border-t border-gray-100">
        <Link href="/" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
          ← Back to platform
        </Link>
      </div>
    </aside>
  );
}
