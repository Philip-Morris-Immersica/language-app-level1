/**
 * Level gating — which CEFR levels are publicly accessible.
 *
 * Controlled by a single environment variable so we can ship the SAME codebase
 * to production (A1 only) and to the internal/dev deployment (all levels)
 * without maintaining a separate branch or clone.
 *
 *   NEXT_PUBLIC_ENABLED_LEVELS="a1"        → only A1 is reachable (production)
 *   NEXT_PUBLIC_ENABLED_LEVELS="a1,a2"     → A1 + A2 reachable
 *   (unset / empty)                        → ALL levels reachable (dev default)
 *
 * The variable is `NEXT_PUBLIC_` so the same value is available both on the
 * server (route guards) and in the browser (home page cards). It is inlined at
 * build time, so flipping it requires a redeploy — which is exactly what we
 * want for a controlled public release.
 *
 * NOTE: this is a UX/navigation gate, not a security boundary. Disabled levels
 * are hidden and their routes return `notFound()`; the (lazy-loaded) content
 * chunks are never fetched because nothing links to them.
 */

import { LEVELS, type Level } from '@/content';

/** Returns the set of levels that are currently enabled/reachable. */
export function getEnabledLevels(): Level[] {
  const raw = process.env.NEXT_PUBLIC_ENABLED_LEVELS?.trim();

  // Unset or empty → everything on (keeps dev/local behaviour unchanged).
  if (!raw) return [...LEVELS];

  const requested = raw
    .split(',')
    .map((s) => s.trim().toLowerCase());

  const enabled = LEVELS.filter((lvl) => requested.includes(lvl));

  // Safety net: never lock out A1 (the always-shipped level). If the env value
  // is malformed and matches nothing, fall back to A1 so the app is never empty.
  if (enabled.length === 0) return ['a1'];

  return enabled;
}

/** Whether a specific level is currently enabled/reachable. */
export function isLevelEnabled(level: Level): boolean {
  return getEnabledLevels().includes(level);
}
