'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';

export default function AuthCallbackPage() {
  const router = useRouter();
  const { refresh } = useAuth();

  useEffect(() => {
    // If opened as a popup — notify the parent window and close
    if (window.opener && !window.opener.closed) {
      window.opener.postMessage({ type: 'auth_complete' }, window.location.origin);
      window.close();
      return;
    }

    // Opened via full-page redirect — refresh auth and go home
    refresh().then(() => {
      router.replace('/');
    });
  }, [router, refresh]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <div className="w-10 h-10 border-4 border-[#8FC412] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-500 text-sm">Влизане в платформата…</p>
      </div>
    </div>
  );
}
