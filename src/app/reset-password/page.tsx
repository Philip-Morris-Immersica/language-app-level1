'use client';

import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Eye, EyeOff, KeyRound, CheckCircle2, AlertTriangle } from 'lucide-react';
import { useAuth } from '@/components/AuthProvider';
import { useT } from '@/i18n/useT';

function ResetPasswordInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { refresh } = useAuth();
  const t = useT();

  const token = searchParams.get('token') ?? '';

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // If the URL has no token, fail fast with a friendly message.
  const missingToken = !token;

  useEffect(() => {
    if (!success) return;
    // Redirect to home after the user has seen the success state for a moment.
    const id = setTimeout(() => router.push('/'), 1800);
    return () => clearTimeout(id);
  }, [success, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
      setError(t('auth.passwordTooShort'));
      return;
    }
    if (password !== confirm) {
      setError(t('auth.passwordsDontMatch'));
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data.error || t('auth.resetInvalidLink'));
        return;
      }

      setSuccess(true);
      await refresh();
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
          <div className="px-8 py-8">
            {success ? (
              <div className="text-center space-y-4">
                <div className="mx-auto w-14 h-14 rounded-full bg-[#DAF6EB] flex items-center justify-center">
                  <CheckCircle2 className="w-7 h-7 text-[#32C189]" />
                </div>
                <h1 className="text-xl font-bold text-[#0072BC]">{t('auth.resetSuccess')}</h1>
                <p className="text-sm text-gray-500">{t('home.continue')}…</p>
              </div>
            ) : missingToken ? (
              <div className="text-center space-y-4">
                <div className="mx-auto w-14 h-14 rounded-full bg-[#FCE2DE] flex items-center justify-center">
                  <AlertTriangle className="w-7 h-7 text-[#D25A45]" />
                </div>
                <h1 className="text-xl font-bold text-[#D25A45]">{t('auth.resetInvalidLink')}</h1>
                <p className="text-sm text-gray-500 leading-relaxed">{t('auth.resetMissingToken')}</p>
                <Link
                  href="/forgot-password"
                  className="inline-block w-full bg-[#0072BC] hover:bg-[#05568B] text-white font-semibold py-2.5 rounded-xl transition-colors shadow-sm mt-2"
                >
                  {t('auth.requestNewLink')}
                </Link>
              </div>
            ) : (
              <>
                <div className="text-center mb-6">
                  <div className="mx-auto w-14 h-14 rounded-full bg-[#CDE3F1] flex items-center justify-center mb-4">
                    <KeyRound className="w-7 h-7 text-[#0072BC]" />
                  </div>
                  <h1 className="text-xl font-bold text-[#0072BC]">{t('auth.resetTitle')}</h1>
                  <p className="text-gray-500 text-sm mt-2 leading-relaxed">{t('auth.resetIntro')}</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('auth.newPassword')}</label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="new-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                        minLength={6}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0072BC] focus:border-transparent transition pr-10"
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

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('auth.confirmPassword')}</label>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      value={confirm}
                      onChange={(e) => setConfirm(e.target.value)}
                      placeholder="••••••••"
                      required
                      minLength={6}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0072BC] focus:border-transparent transition"
                    />
                  </div>

                  {error && (
                    <p className="text-sm text-[#D25A45] bg-[#FCE2DE]/40 px-4 py-2.5 rounded-lg">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={loading || !password || !confirm}
                    className="w-full bg-[#0072BC] hover:bg-[#05568B] disabled:opacity-60 text-white font-semibold py-2.5 rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2 mt-2 min-h-[48px]"
                  >
                    {loading ? (
                      <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      t('auth.resetSubmit')
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>

        {!success && (
          <p className="text-center mt-4 text-sm text-gray-400">
            <Link href="/login" className="hover:text-gray-600 transition-colors">
              {t('auth.forgotBackToLogin')}
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  // useSearchParams() requires a Suspense boundary in app router.
  return (
    <Suspense fallback={<div className="min-h-[calc(100vh-56px)] flex items-center justify-center bg-gray-50" />}>
      <ResetPasswordInner />
    </Suspense>
  );
}
