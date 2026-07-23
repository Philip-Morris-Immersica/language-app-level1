import { notFound } from 'next/navigation';
import { LevelMapClient } from '@/components/level/LevelMapClient';
import { isLevelEnabled } from '@/lib/enabledLevels';

export default function LevelB1Page() {
  if (!isLevelEnabled('b1')) notFound();
  return <LevelMapClient level="b1" />;
}
