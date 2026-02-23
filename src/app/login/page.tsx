'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff, LogIn, UserPlus } from 'lucide-react';
import { useAuth } from '@/components/AuthProvider';
import { useT } from '@/i18n/useT';

type Tab = 'login' | 'register';

export default function LoginPage() {
  const router = useRouter();
  const { refresh } = useAuth();
  const t = useT();
  const [tab, setTab] = useState<Tab>('login');

  // Shared fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const url = tab === 'login' ? '/api/auth/login' : '/api/auth/register';
    const body = tab === 'login' ? { email, password } : { name, email, password };

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Грешка. Опитайте отново.');
        return;
      }

      await refresh();
      router.push('/');
    } catch {
      setError('Грешка при свързване. Опитайте отново.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-56px)] flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Tabs */}
          <div className="flex">
            <button
              onClick={() => { setTab('login'); setError(''); }}
              className={`flex-1 py-4 text-sm font-semibold transition-colors flex items-center justify-center gap-2 ${
                tab === 'login'
                  ? 'bg-[#8FC412] text-white'
                  : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
              }`}
            >
              <LogIn className="w-4 h-4" />
              {t('auth.login')}
            </button>
            <button
              onClick={() => { setTab('register'); setError(''); }}
              className={`flex-1 py-4 text-sm font-semibold transition-colors flex items-center justify-center gap-2 ${
                tab === 'register'
                  ? 'bg-[#8FC412] text-white'
                  : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
              }`}
            >
              <UserPlus className="w-4 h-4" />
              {t('auth.register')}
            </button>
          </div>

          <div className="px-8 py-8">
            {/* Title */}
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-[#0279C3]">
                {tab === 'login' ? t('auth.welcome') : t('auth.createAccount')}
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                {tab === 'login' ? t('auth.loginPlatform') : t('auth.registerFree')}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name — register only */}
              {tab === 'register' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('auth.name')}</label>
                  <input
                    type="text"
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t('auth.yourName')}
                    required
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8FC412] focus:border-transparent transition"
                  />
                </div>
              )}

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('auth.email')}</label>
                <input
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@example.com"
                  required
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8FC412] focus:border-transparent transition"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('auth.password')}</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    autoComplete={tab === 'login' ? 'current-password' : 'new-password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    minLength={6}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8FC412] focus:border-transparent transition pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Error */}
              {error && (
                <p className="text-sm text-red-600 bg-red-50 px-4 py-2.5 rounded-lg">{error}</p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#8FC412] hover:bg-[#7DAD0E] disabled:opacity-60 text-white font-semibold py-2.5 rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2 mt-2"
              >
                {loading ? (
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : tab === 'login' ? (
                  <><LogIn className="w-4 h-4" /> {t('auth.doLogin')}</>
                ) : (
                  <><UserPlus className="w-4 h-4" /> {t('auth.doRegister')}</>
                )}
              </button>
            </form>
          </div>
        </div>

        <p className="text-center mt-4 text-sm text-gray-400">
          <Link href="/" className="hover:text-gray-600 transition-colors">
            {t('auth.backHome')}
          </Link>
        </p>
      </div>
    </div>
  );
}
