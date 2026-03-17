'use client';

import { useState, useRef, useEffect } from 'react';
import { useT } from '@/i18n/useT';

interface Dot {
  id: string;
  label: string;
  position: number;
}

interface ConnectDotsProps {
  dots: Dot[];
  onComplete?: (isCorrect: boolean) => void;
}

function getDotCoords(position: number, total: number, radius: number, cx: number, cy: number) {
  const angle = (-90 + (position / total) * 360) * (Math.PI / 180);
  return {
    x: cx + radius * Math.cos(angle),
    y: cy + radius * Math.sin(angle),
  };
}

export function ConnectDots({ dots, onComplete }: ConnectDotsProps) {
  const sortedDots = [...dots].sort((a, b) => a.position - b.position);
  const total = sortedDots.length;

  const [connected, setConnected] = useState<number[]>([]);
  const [shakeId, setShakeId] = useState<string | null>(null);
  const [completed, setCompleted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState(340);
  const completedRef = useRef(false);
  const t = useT();

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const w = containerRef.current.offsetWidth;
        setSize(Math.min(w, 420));
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const cx = size / 2;
  const cy = size / 2;
  const radius = size * 0.38;
  const dotRadius = size < 360 ? 28 : 34;

  const nextExpected = connected.length;
  const isAllConnected = connected.length === total;

  const handleDotClick = (position: number, dotId: string) => {
    if (completed) return;

    if (position === nextExpected) {
      const next = [...connected, position];
      setConnected(next);

      if (next.length === total && !completedRef.current) {
        completedRef.current = true;
        setCompleted(true);
        onComplete?.(true);
      }
    } else {
      setShakeId(dotId);
      setTimeout(() => setShakeId(null), 500);
    }
  };

  const handAngle = (() => {
    if (isAllConnected) return null;
    const target = nextExpected;
    return -90 + (target / total) * 360;
  })();

  const handLength = radius * 0.55;

  return (
    <div className="bg-white rounded-xl p-4 md:p-8 shadow-md">
      <div className="flex justify-center" ref={containerRef}>
        <div className="relative" style={{ width: size, height: size }}>
          <svg
            width={size}
            height={size}
            className="absolute inset-0"
            style={{ pointerEvents: 'none' }}
          >
            {/* Connected lines */}
            {connected.map((pos, i) => {
              if (i === 0) return null;
              const prev = getDotCoords(connected[i - 1], total, radius, cx, cy);
              const curr = getDotCoords(pos, total, radius, cx, cy);
              return (
                <line
                  key={`line-${i}`}
                  x1={prev.x}
                  y1={prev.y}
                  x2={curr.x}
                  y2={curr.y}
                  stroke="#8B9D5F"
                  strokeWidth={3}
                  strokeLinecap="round"
                  className="animate-in fade-in duration-300"
                />
              );
            })}

            {/* Closing line when done */}
            {isAllConnected && total > 1 && (() => {
              const last = getDotCoords(connected[total - 1], total, radius, cx, cy);
              const first = getDotCoords(connected[0], total, radius, cx, cy);
              return (
                <line
                  x1={last.x}
                  y1={last.y}
                  x2={first.x}
                  y2={first.y}
                  stroke="#8B9D5F"
                  strokeWidth={3}
                  strokeLinecap="round"
                  className="animate-in fade-in duration-500"
                />
              );
            })()}

            {/* Clock hand pointing to next dot */}
            {handAngle !== null && (
              <>
                <line
                  x1={cx}
                  y1={cy}
                  x2={cx + handLength * Math.cos(handAngle * Math.PI / 180)}
                  y2={cy + handLength * Math.sin(handAngle * Math.PI / 180)}
                  stroke="#D97706"
                  strokeWidth={3}
                  strokeLinecap="round"
                  opacity={0.6}
                  className="transition-all duration-500 ease-in-out"
                />
                <circle cx={cx} cy={cy} r={5} fill="#D97706" opacity={0.6} />
              </>
            )}
          </svg>

          {/* Dot buttons */}
          {sortedDots.map((dot) => {
            const coords = getDotCoords(dot.position, total, radius, cx, cy);
            const isConnected = connected.includes(dot.position);
            const isNext = dot.position === nextExpected;
            const isShaking = shakeId === dot.id;

            return (
              <button
                key={dot.id}
                onClick={() => handleDotClick(dot.position, dot.id)}
                className={`
                  absolute flex flex-col items-center justify-center rounded-full
                  font-bold transition-all duration-200
                  ${isConnected
                    ? 'bg-[#8B9D5F] text-white border-2 border-[#6B7D3F] shadow-lg scale-105'
                    : isNext && !completed
                    ? 'bg-amber-100 text-amber-800 border-2 border-amber-400 shadow-md animate-pulse'
                    : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-gray-400 shadow-sm'
                  }
                  ${isShaking ? 'animate-shake' : ''}
                  ${completed && !isConnected ? 'opacity-50' : ''}
                `}
                style={{
                  width: dotRadius * 2,
                  height: dotRadius * 2,
                  left: coords.x - dotRadius,
                  top: coords.y - dotRadius,
                }}
                disabled={completed}
              >
                <span className={`leading-none ${size < 360 ? 'text-[10px]' : 'text-xs'}`}>
                  {dot.label}
                </span>
                <span className={`font-extrabold leading-none ${size < 360 ? 'text-sm' : 'text-base'}`}>
                  {dot.position}
                </span>
              </button>
            );
          })}

          {/* Center completion indicator */}
          {completed && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-[#8FC412] text-white rounded-full w-20 h-20 flex items-center justify-center shadow-xl animate-in zoom-in duration-500">
                <span className="text-3xl">✓</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Progress text */}
      <div className="text-center mt-4">
        {!completed ? (
          <p className="text-sm text-gray-500">
            {connected.length} / {total}
          </p>
        ) : (
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-[#8FC412] text-white rounded-lg font-bold text-base shadow-md">
            ✓ {t('exercise.excellent')}
          </div>
        )}
      </div>
    </div>
  );
}
