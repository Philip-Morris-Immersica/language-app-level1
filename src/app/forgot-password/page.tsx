'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, Send, CheckCircle2 } from 'lucide-react';
import { useT } from '@/i18n/useT';

export default function ForgotPasswordPage() {
  const t = useT();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data.error || 'Грешка. Опитайте отново.');
        return;
      }

      setSent(true);
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
            {sent ? (
              <div className="text-center space-y-4">
                <div className="mx-auto w-14 h-14 rounded-full bg-[#DAF6EB] flex items-center justify-center">
                  <CheckCircle2 className="w-7 h-7 text-[#32C189]" />
                </div>
                <h1 className="text-xl font-bold text-[#0072BC]">{t('auth.forgotSentTitle')}</h1>
                <p className="text-sm text-gray-600 leading-relaxed">{t('auth.forgotSentBody')}</p>
                <Link
                  href="/login"
                  className="inline-block w-full bg-[#0072BC] hover:bg-[#05568B] text-white font-semibold py-2.5 rounded-xl transition-colors shadow-sm mt-2"
                >
                  {t('auth.forgotBackToLogin')}
                </Link>
              </div>
            ) : (
              <>
                <div className="text-center mb-6">
                  <div className="mx-auto w-14 h-14 rounded-full bg-[#CDE3F1] flex items-center justify-center mb-4">
                    <Mail className="w-7 h-7 text-[#0072BC]" />
                  </div>
                  <h1 className="text-xl font-bold text-[#0072BC]">{t('auth.forgotTitle')}</h1>
                  <p className="text-gray-500 text-sm mt-2 leading-relaxed">{t('auth.forgotIntro')}</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('auth.email')}</label>
                    <input
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="email@example.com"
                      required
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0072BC] focus:border-transparent transition"
                    />
                  </div>

                  {error && (
                    <p className="text-sm text-[#D25A45] bg-[#FCE2DE]/40 px-4 py-2.5 rounded-lg">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={loading || !email}
                    className="w-full bg-[#0072BC] hover:bg-[#05568B] disabled:opacity-60 text-white font-semibold py-2.5 rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2 mt-2 min-h-[48px]"
                  >
                    {loading ? (
                      <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        {t('auth.forgotSubmit')}
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>

        <p className="text-center mt-4 text-sm text-gray-400">
          <Link href="/login" className="hover:text-gray-600 transition-colors">
            {t('auth.forgotBackToLogin')}
          </Link>
        </p>
      </div>
    </div>
  );
}
