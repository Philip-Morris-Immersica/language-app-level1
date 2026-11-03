// Locks an email for 15 minutes after 5 failed logins in a row; a successful
// login clears the counter. Kept in the server instance's memory (same approach
// as the forgot-password limiter), so no database table is needed.
const MAX_FAILURES = 5;
export const LOGIN_LOCK_MINUTES = 15;
const LOCK_MS = LOGIN_LOCK_MINUTES * 60 * 1000;

type Entry = { failures: number; lastFailureAt: number; lockedUntil: number };
const entries = new Map<string, Entry>();

const keyOf = (email: string) => email.trim().toLowerCase();

export function isLoginLocked(email: string): boolean {
  const entry = entries.get(keyOf(email));
  return !!entry && entry.lockedUntil > Date.now();
}

export function recordLoginFailure(email: string): void {
  const now = Date.now();
  prune(now);
  const key = keyOf(email);
  const prev = entries.get(key);
  // Failures older than the lock window do not count towards a new lock.
  const failures = prev && now - prev.lastFailureAt < LOCK_MS ? prev.failures + 1 : 1;
  entries.set(key, {
    failures,
    lastFailureAt: now,
    lockedUntil: failures >= MAX_FAILURES ? now + LOCK_MS : 0,
  });
}

export function clearLoginFailures(email: string): void {
  entries.delete(keyOf(email));
}

function prune(now: number): void {
  if (entries.size < 10_000) return;
  for (const [key, entry] of entries) {
    if (entry.lockedUntil < now && now - entry.lastFailureAt >= LOCK_MS) entries.delete(key);
  }
}
