'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { useT } from '@/i18n/useT';
import { RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface AlphabetMazeProps {
  grid: string[][];
  correctPath: { row: number; col: number }[];
  startImageUrl?: string;
  endImageUrl?: string;
  onComplete?: (isCorrect: boolean) => void;
}

export function AlphabetMaze({
  grid,
  correctPath,
  startImageUrl,
  endImageUrl,
  onComplete,
}: AlphabetMazeProps) {
  const [step, setStep] = useState(0);
  const [shakeCell, setShakeCell] = useState<string | null>(null);
  const [completed, setCompleted] = useState(false);
  const completedRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [cellPx, setCellPx] = useState(52);
  const t = useT();

  const rows = grid.length;
  const cols = grid[0]?.length ?? 0;
  const GAP = 5;

  useEffect(() => {
    const measure = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.offsetWidth;
      setCellPx(Math.floor((w - GAP * (cols - 1)) / cols));
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [cols]);

  const currentTarget = step < correctPath.length ? correctPath[step] : null;
  const expectedLetter = currentTarget
    ? grid[currentTarget.row][currentTarget.col]
    : '';

  const pathIndexOf = (r: number, c: number): number => {
    for (let i = 0; i < correctPath.length; i++) {
      if (correctPath[i].row === r && correctPath[i].col === c) return i;
    }
    return -1;
  };

  const handleCellClick = useCallback(
    (r: number, c: number) => {
      if (completed || !currentTarget) return;
      if (r === currentTarget.row && c === currentTarget.col) {
        const next = step + 1;
        setStep(next);
        if (next === correctPath.length && !completedRef.current) {
          completedRef.current = true;
          setCompleted(true);
          onComplete?.(true);
        }
      } else {
        setShakeCell(`${r}-${c}`);
        setTimeout(() => setShakeCell(null), 500);
      }
    },
    [completed, currentTarget, step, correctPath.length, onComplete],
  );

  const handleReset = useCallback(() => {
    setStep(0);
    setCompleted(false);
    completedRef.current = false;
    setShakeCell(null);
  }, []);

  const cx = (c: number) => c * (cellPx + GAP) + cellPx / 2;
  const cy = (r: number) => r * (cellPx + GAP) + cellPx / 2;
  const gridW = cols * cellPx + (cols - 1) * GAP;
  const gridH = rows * cellPx + (rows - 1) * GAP;

  const pts = correctPath.map((p) => ({ x: cx(p.col), y: cy(p.row) }));

  // Detect direction changes → place small arrow markers
  const arrows: { x: number; y: number; angle: number }[] = [];
  for (let i = 1; i < pts.length - 1; i++) {
    const a = pts[i - 1];
    const b = pts[i];
    const c2 = pts[i + 1];
    const d1x = Math.sign(b.x - a.x);
    const d1y = Math.sign(b.y - a.y);
    const d2x = Math.sign(c2.x - b.x);
    const d2y = Math.sign(c2.y - b.y);
    if (d1x !== d2x || d1y !== d2y) {
      const angle = Math.atan2(c2.y - b.y, c2.x - b.x) * (180 / Math.PI);
      arrows.push({ x: b.x, y: b.y, angle });
    }
  }
  // Arrow at the end
  if (pts.length >= 2) {
    const last = pts[pts.length - 1];
    const prev = pts[pts.length - 2];
    const angle =
      Math.atan2(last.y - prev.y, last.x - prev.x) * (180 / Math.PI);
    arrows.push({ x: last.x, y: last.y, angle });
  }

  return (
    <div className="bg-white rounded-xl p-4 md:p-6 shadow-md">
      {/* Start image */}
      {startImageUrl && (
        <div className="flex justify-center mb-3">
          <Image
            src={startImageUrl}
            alt=""
            width={90}
            height={90}
            className="object-contain rounded-lg"
          />
        </div>
      )}

      {/* Hint: next letter */}
      {!completed && currentTarget && (
        <div className="text-center mb-3">
          <span className="text-sm text-gray-500">
            {t('exercise.find')}:
          </span>
          <span className="ms-2 text-2xl font-bold text-amber-600">
            {expectedLetter}
          </span>
        </div>
      )}

      {/* Grid wrapper */}
      <div ref={containerRef} className="mx-auto" style={{ maxWidth: 400 }}>
        <div
          className="relative mx-auto"
          style={{ width: gridW, height: gridH }}
        >
          {/* SVG guide path + turn arrows */}
          <svg
            className="absolute inset-0 pointer-events-none z-0"
            width={gridW}
            height={gridH}
          >
            <polyline
              points={pts.map((p) => `${p.x},${p.y}`).join(' ')}
              fill="none"
              stroke="#d1d5db"
              strokeWidth={2}
              strokeDasharray="6 4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {arrows.map((a, i) => (
              <polygon
                key={`arr-${i}`}
                points="-6,-4 6,0 -6,4"
                fill="#c5c9d0"
                transform={`translate(${a.x},${a.y}) rotate(${a.angle})`}
              />
            ))}
          </svg>

          {/* Active green trail over solved segments */}
          {step >= 2 && (
            <svg
              className="absolute inset-0 pointer-events-none z-[1]"
              width={gridW}
              height={gridH}
            >
              <polyline
                points={pts
                  .slice(0, step)
                  .map((p) => `${p.x},${p.y}`)
                  .join(' ')}
                fill="none"
                stroke="#8FC412"
                strokeWidth={3}
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity={0.5}
              />
            </svg>
          )}

          {/* Cell buttons */}
          {grid.map((row, r) =>
            row.map((letter, c) => {
              const key = `${r}-${c}`;
              const pi = pathIndexOf(r, c);
              const onPath = pi !== -1;
              const done = onPath && pi < step;
              const isTarget =
                currentTarget?.row === r && currentTarget?.col === c;
              const shaking = shakeCell === key;

              return (
                <button
                  key={key}
                  onClick={() => handleCellClick(r, c)}
                  disabled={completed}
                  className={`
                    absolute rounded-lg flex items-center justify-center
                    font-bold text-base md:text-lg select-none z-10
                    transition-all duration-150
                    ${
                      done
                        ? 'bg-[#8FC412] text-white border-2 border-[#6A940C] shadow-sm'
                        : isTarget
                          ? 'bg-amber-50 text-gray-800 border-2 border-amber-400 shadow-md animate-pulse'
                          : onPath
                            ? 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                            : 'bg-gray-100/80 text-gray-400 border border-dashed border-gray-200'
                    }
                    ${shaking ? 'animate-shake' : ''}
                  `}
                  style={{
                    width: cellPx,
                    height: cellPx,
                    left: c * (cellPx + GAP),
                    top: r * (cellPx + GAP),
                  }}
                >
                  {letter}
                </button>
              );
            }),
          )}
        </div>
      </div>

      {/* End image */}
      {endImageUrl && (
        <div className="flex justify-center mt-3">
          <Image
            src={endImageUrl}
            alt=""
            width={80}
            height={80}
            className="object-contain rounded-lg"
          />
        </div>
      )}

      {/* Progress + reset */}
      <div className="flex items-center justify-between mt-5">
        <div>
          {step > 0 && !completed && (
            <Button variant="outline" onClick={handleReset} className="gap-2">
              <RotateCcw className="w-4 h-4" />
              {t('exercise.reset')}
            </Button>
          )}
        </div>
        {!completed ? (
          <p className="text-sm text-gray-500">
            {step} / {correctPath.length}
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
