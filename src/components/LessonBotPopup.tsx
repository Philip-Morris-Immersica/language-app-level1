'use client';

import { useState, useEffect } from 'react';

export function LessonBotPopup() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const showTimer = setTimeout(() => setVisible(true), 3000);
    const hideTimer = setTimeout(() => setVisible(false), 5000); // show at 3s, hide at 5s (2s visible)
    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-24 right-20 z-[59] flex items-end gap-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
      {/* Speech bubble */}
      <div className="relative bg-white border border-gray-200 rounded-2xl rounded-br-sm px-4 py-3 shadow-lg flex items-center gap-2.5">
        <img
          src="/robi.jpg"
          alt="Robi"
          className="w-8 h-8 rounded-full object-cover flex-shrink-0 border border-gray-200"
        />
        <p className="text-sm font-medium text-gray-800 whitespace-nowrap">
          I&apos;m here to help!
        </p>
        {/* Tail pointing right-bottom toward the FAB */}
        <span className="absolute -bottom-2 right-3 w-0 h-0 border-l-[8px] border-l-transparent border-t-[8px] border-t-white drop-shadow-sm" />
      </div>
    </div>
  );
}
