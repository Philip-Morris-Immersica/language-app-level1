'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    // Mark the user as logged in and redirect to home
    localStorage.setItem('auth_token', 'immersica_' + Date.now());
    router.replace('/');
  }, [router]);

  return (
    <div className="min-h-[calc(100vh-56px)] flex items-center justify-center bg-white">
      <div className="text-center">
        <div className="w-10 h-10 border-4 border-[#8FC412] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-500 text-sm">Влизане в платформата…</p>
      </div>
    </div>
  );
}
