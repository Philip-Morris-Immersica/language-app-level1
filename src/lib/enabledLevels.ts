/**
 * Level gating — which CEFR levels are publicly reachable, decided PER DOMAIN.
 *
 * Goal: one Vercel project (one Neon DB, one set of secrets) serving TWO links:
 *   • the public release domain  → shows ONLY A1
 *   • every other domain (internal, previews, localhost) → shows ALL levels
 *
 * This is done at request time from the `Host` header, so a single deployment
 * behaves differently depending on which domain the visitor used — no second
 * project and no copying of secrets required.
 *
 * The A1-only domains are listed below. You can also extend the list without a
 * code change via the optional env var `NEXT_PUBLIC_A1_ONLY_HOSTS`
 * (comma-separated hostnames).
 *
 * A legacy global override `NEXT_PUBLIC_ENABLED_LEVELS` is still honoured (it
 * forces the enabled set for the whole deployment regardless of host) — handy
 * for a fully locked build if ever needed.
 *
 * NOTE: this is a UX/navigation gate, not a security boundary. Disabled levels
 * are hidden and their routes return `notFound()`; the (lazy-loaded) content
 * chunks are never fetched because nothing links to them.
 */

import { LEVELS, type Level } from '@/content';

/** Domains that must show ONLY A1 (the public release link). */
const A1_ONLY_HOSTS: readonly string[] = [
  'bulgarian-for-refugees-unhcr.vercel.app',
];

/** Normalises a Host header value: lowercased, port stripped. */
function normaliseHost(host: string | null | undefined): string {
  if (!host) return '';
  return host.toLowerCase().split(':')[0].trim();
}

/** Extra A1-only hosts supplied via env (comma-separated), if any. */
function extraA1OnlyHosts(): string[] {
  const raw = process.env.NEXT_PUBLIC_A1_ONLY_HOSTS?.trim();
  if (!raw) return [];
  return raw.split(',').map((s) => s.trim().toLowerCase()).filter(Boolean);
}

/** Whether the given host is one of the A1-only public domains. */
function isA1OnlyHost(host: string | null | undefined): boolean {
  const h = normaliseHost(host);
  if (!h) return false;
  return A1_ONLY_HOSTS.includes(h) || extraA1OnlyHosts().includes(h);
}

/** Parses the legacy global override, or `null` if unset/empty. */
function globalOverride(): Level[] | null {
  const raw = process.env.NEXT_PUBLIC_ENABLED_LEVELS?.trim();
  if (!raw) return null;
  const requested = raw.split(',').map((s) => s.trim().toLowerCase());
  const enabled = LEVELS.filter((lvl) => requested.includes(lvl));
  // Never lock everything out — fall back to A1 if the value matches nothing.
  return enabled.length > 0 ? enabled : ['a1'];
}

/**
 * Returns the levels reachable for a given request host.
 *  1. A global `NEXT_PUBLIC_ENABLED_LEVELS` override wins if present.
 *  2. Otherwise, A1-only public domains → `['a1']`.
 *  3. Otherwise (internal domain / preview / localhost) → all levels.
 */
export function getEnabledLevelsForHost(host: string | null | undefined): Level[] {
  const override = globalOverride();
  if (override) return override;
  if (isA1OnlyHost(host)) return ['a1'];
  return [...LEVELS];
}

/** Whether a specific level is reachable for the given request host. */
export function isLevelEnabledForHost(
  level: Level,
  host: string | null | undefined,
): boolean {
  return getEnabledLevelsForHost(host).includes(level);
}
