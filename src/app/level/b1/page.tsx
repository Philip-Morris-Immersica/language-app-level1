import { notFound } from 'next/navigation';
import { headers } from 'next/headers';
import { LevelMapClient } from '@/components/level/LevelMapClient';
import { isLevelEnabledForHost } from '@/lib/enabledLevels';

export default async function LevelB1Page() {
  const host = (await headers()).get('host');
  if (!isLevelEnabledForHost('b1', host)) notFound();
  return <LevelMapClient level="b1" />;
}
