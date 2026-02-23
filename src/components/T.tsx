'use client';

import { useT } from '@/i18n/useT';
import type { UIKey } from '@/i18n/ui';

/**
 * Renders a translated UI string by key.
 * Useful for embedding translations inside Server Components.
 */
export function T({ k }: { k: UIKey }) {
  const t = useT();
  return <>{t(k)}</>;
}
