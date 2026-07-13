'use client';

import { useMemo } from 'react';

interface ConfettiProps {
  /** Number of confetti pieces. */
  count?: number;
  /** Bigger burst (finale) vs. small (section toast). */
  variant?: 'small' | 'large';
}

// UNHCR-ish celebratory palette (kept festive but on-brand).
const COLORS = ['#32C189', '#0072BC', '#FFC740', '#D25A45', '#2B9C70'];

/**
 * Lightweight, dependency-free confetti burst. Pieces fall + fade over ~2.4s
 * and the layer is `pointer-events-none`, so it never blocks the UI. Renders
 * nothing when the user prefers reduced motion.
 */
export function Confetti({ count = 24, variant = 'small' }: ConfettiProps) {
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  const pieces = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: Math.random() * 100,
        delay: Math.random() * 0.4,
        duration: 1.8 + Math.random() * 1.2,
        color: COLORS[i % COLORS.length],
        size: (variant === 'large' ? 8 : 6) + Math.random() * 6,
        rotate: Math.random() * 360,
        drift: (Math.random() - 0.5) * 120,
      })),
    [count, variant],
  );

  if (prefersReducedMotion) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {pieces.map((p, i) => (
        <span
          key={i}
          className="confetti-piece"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size * 0.6}px`,
            backgroundColor: p.color,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            // Custom props consumed by the keyframes below.
            ['--drift' as string]: `${p.drift}px`,
            ['--rot' as string]: `${p.rotate}deg`,
          }}
        />
      ))}
      <style jsx>{`
        .confetti-piece {
          position: absolute;
          top: -12px;
          border-radius: 2px;
          opacity: 0;
          animation-name: confetti-fall;
          animation-timing-function: cubic-bezier(0.25, 0.6, 0.4, 1);
          animation-fill-mode: forwards;
        }
        @keyframes confetti-fall {
          0% {
            transform: translate3d(0, -12px, 0) rotate(0deg);
            opacity: 0;
          }
          12% {
            opacity: 1;
          }
          100% {
            transform: translate3d(var(--drift), 120%, 0) rotate(var(--rot));
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
