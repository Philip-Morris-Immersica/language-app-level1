import { notFound } from 'next/navigation';
import { headers } from 'next/headers';
import { LevelMapClient } from '@/components/level/LevelMapClient';
import { isLevelEnabledForHost } from '@/lib/enabledLevels';

export default async function LevelA2Page() {
  const host = (await headers()).get('host');
  if (!isLevelEnabledForHost('a2', host)) notFound();
  return <LevelMapClient level="a2" />;
}
