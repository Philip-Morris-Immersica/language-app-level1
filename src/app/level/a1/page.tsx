import { notFound } from 'next/navigation';
import { LevelMapClient } from '@/components/level/LevelMapClient';
import { isLevelEnabled } from '@/lib/enabledLevels';

export default function LevelA1Page() {
  if (!isLevelEnabled('a1')) notFound();
  return <LevelMapClient level="a1" />;
}
