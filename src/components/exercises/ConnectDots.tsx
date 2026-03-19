'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { useT } from '@/i18n/useT';
import { RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Dot {
  id: string;
  label: string;
  position: number;
}

interface ConnectDotsProps {
  dots: Dot[];
  onComplete?: (isCorrect: boolean) => void;
}

const MOBILE_COLS = 3;
const DESKTOP_COLS = 10;

function getSnakePos(index: number, cols: number) {
  const row = Math.floor(index / cols);
  const colInRow = index % cols;
  const col = row % 2 === 0 ? colInRow : cols - 1 - colInRow;
  return { row, col };
}

function buildBodyPath(
  points: { x: number; y: number }[],
  gridMidX: number,
  cellW: number,
): string {
  if (points.length < 2) return '';
  const bulge = cellW * 0.8;
  let d = `M ${points[0].x} ${points[0].y}`;

  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const dx = Math.abs(curr.x - prev.x);
    const dy = Math.abs(curr.y - prev.y);

    if (dy > dx * 0.5 && dx < cellW * 0.3) {
      const isRight = prev.x > gridMidX;
      const b = isRight ? bulge : -bulge;
      d +=
        ` C ${prev.x + b} ${prev.y + (curr.y - prev.y) * 0.4},` +
        ` ${curr.x + b} ${curr.y - (curr.y - prev.y) * 0.4},` +
        ` ${curr.x} ${curr.y}`;
    } else {
      d += ` L ${curr.x} ${curr.y}`;
    }
  }
  return d;
}

export function ConnectDots({ dots, onComplete }: ConnectDotsProps) {
  const sortedDots = [...dots].sort((a, b) => a.position - b.position);
  const total = sortedDots.length;

  const [connected, setConnected] = useState<number[]>([]);
  const [shakeId, setShakeId] = useState<string | null>(null);
  const [completed, setCompleted] = useState(false);
  const completedRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [cols, setCols] = useState(MOBILE_COLS);
  const [cellW, setCellW] = useState(80);
  const t = useT();

  useEffect(() => {
    const measure = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.offsetWidth;
      const isDesktop = w >= 640;
      const c = isDesktop ? DESKTOP_COLS : MOBILE_COLS;
      setCols(c);
      setCellW(Math.floor(w / c));
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const nextExpected = connected.length;
  const rows = Math.ceil(total / cols);
  const cellH = cellW;
  const rowGap = cols === MOBILE_COLS ? 32 : 24;
  const dotR = Math.min(22, Math.max(16, (cellW - 12) / 2));
  const bodyW = dotR * 2.2;
  const gridW = cols * cellW;
  const gridH = rows * cellH + (rows - 1) * rowGap;

  const handleDotClick = useCallback(
    (positionIndex: number, dotId: string) => {
      if (completed) return;
      if (positionIndex === nextExpected) {
        const next = [...connected, positionIndex];
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
    },
    [completed, connected, nextExpected, total, onComplete],
  );

  const handleReset = useCallback(() => {
    setConnected([]);
    setCompleted(false);
    completedRef.current = false;
    setShakeId(null);
  }, []);

  function center(index: number) {
    const { row, col } = getSnakePos(index, cols);
    return {
      x: col * cellW + cellW / 2,
      y: row * (cellH + rowGap) + cellH / 2,
    };
  }

  const allPts = Array.from({ length: total }, (_, i) => center(i));
  const gridMidX = gridW / 2;
  const fullBody = buildBodyPath(allPts, gridMidX, cellW);
  const tracedBody =
    connected.length >= 2
      ? buildBodyPath(
          allPts.slice(0, connected.length),
          gridMidX,
          cellW,
        )
      : '';

  // Head direction (facing toward the 2nd dot)
  const headAngle =
    allPts.length >= 2
      ? Math.atan2(allPts[1].y - allPts[0].y, allPts[1].x - allPts[0].x) *
        (180 / Math.PI)
      : 0;

  // Tail direction
  const tailAngle =
    allPts.length >= 2
      ? Math.atan2(
          allPts[total - 1].y - allPts[total - 2].y,
          allPts[total - 1].x - allPts[total - 2].x,
        ) *
        (180 / Math.PI)
      : 0;

  const headPt = allPts[0];
  const tailPt = allPts[total - 1];

  return (
    <div className="bg-white rounded-xl p-4 md:p-8 shadow-md">
      <div
        className="mx-auto"
        ref={containerRef}
        style={{ maxWidth: cols === MOBILE_COLS ? 260 : undefined }}
      >
        <div className="relative" style={{ width: '100%', height: gridH }}>
          <svg
            className="absolute inset-0 pointer-events-none"
            width={gridW}
            height={gridH}
          >
            {/* Full snake body — light green */}
            <path
              d={fullBody}
              fill="none"
              stroke="#b8de6f"
              strokeWidth={bodyW}
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Traced portion — darker green */}
            {tracedBody && (
              <path
                d={tracedBody}
                fill="none"
                stroke="#5a8a0a"
                strokeWidth={bodyW}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}

            {/* Snake scales pattern (subtle dashes on the body) */}
            <path
              d={fullBody}
              fill="none"
              stroke="#a0cc5a"
              strokeWidth={bodyW * 0.6}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={`${dotR * 0.8} ${dotR * 1.6}`}
              opacity={0.3}
            />

            {/* Snake tail — narrows away from the body */}
            <g
              transform={`translate(${tailPt.x},${tailPt.y}) rotate(${tailAngle})`}
            >
              <polygon
                points={`${dotR + 2},-7 ${dotR + 2},7 ${dotR + 24},0`}
                fill="#b8de6f"
              />
              <polygon
                points={`${dotR + 6},-4 ${dotR + 6},4 ${dotR + 22},0`}
                fill="#9cc44e"
              />
            </g>

            {/* Snake head */}
            <g
              transform={`translate(${headPt.x},${headPt.y}) rotate(${headAngle})`}
            >
              {/* Head shape — slightly larger ellipse */}
              <ellipse
                cx={2}
                cy={0}
                rx={dotR + 8}
                ry={dotR + 4}
                fill="#4a7a0a"
              />
              {/* Eyes — white circles with black pupils */}
              <circle cx={dotR * 0.4} cy={-dotR * 0.45} r={4.5} fill="white" />
              <circle cx={dotR * 0.4} cy={dotR * 0.45} r={4.5} fill="white" />
              <circle
                cx={dotR * 0.55}
                cy={-dotR * 0.45}
                r={2.5}
                fill="#111"
              />
              <circle
                cx={dotR * 0.55}
                cy={dotR * 0.45}
                r={2.5}
                fill="#111"
              />
              {/* Tongue — red fork, starts at ellipse edge */}
              <path
                d={`M ${dotR + 10} 0 L ${dotR + 22} 0 L ${dotR + 28} -6 M ${dotR + 22} 0 L ${dotR + 28} 6`}
                fill="none"
                stroke="#cc0000"
                strokeWidth={2.5}
                strokeLinecap="round"
              />
            </g>
          </svg>

          {/* Letter dots on the snake body */}
          {sortedDots.map((dot, index) => {
            const pos = center(index);
            const isConnected = connected.includes(index);
            const isNext = index === nextExpected && !completed;
            const isShaking = shakeId === dot.id;

            return (
              <button
                key={dot.id}
                onClick={() => handleDotClick(index, dot.id)}
                disabled={completed && !isConnected}
                className={`
                  absolute rounded-full flex items-center justify-center
                  font-bold text-sm md:text-base transition-all duration-200
                  select-none z-10
                  ${
                    isConnected
                      ? 'bg-[#3d5f06] text-white border-2 border-[#2a4204] shadow-sm'
                      : isNext
                        ? 'bg-yellow-100 text-yellow-900 border-2 border-yellow-400 shadow-lg animate-pulse'
                        : 'bg-white/90 text-gray-600 border-2 border-[#b8de6f] hover:border-[#8FC412] hover:bg-white'
                  }
                  ${isShaking ? 'animate-shake' : ''}
                `}
                style={{
                  width: dotR * 2,
                  height: dotR * 2,
                  left: pos.x - dotR,
                  top: pos.y - dotR,
                }}
              >
                {dot.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Progress + controls */}
      <div className="flex items-center justify-between mt-6">
        <div className="flex gap-3">
          {connected.length > 0 && !completed && (
            <Button variant="outline" onClick={handleReset} className="gap-2">
              <RotateCcw className="w-4 h-4" />
              {t('exercise.reset')}
            </Button>
          )}
        </div>

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
