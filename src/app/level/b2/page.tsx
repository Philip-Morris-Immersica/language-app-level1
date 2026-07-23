import { notFound } from 'next/navigation';
import { LevelMapClient } from '@/components/level/LevelMapClient';
import { isLevelEnabled } from '@/lib/enabledLevels';

export default function LevelB2Page() {
  if (!isLevelEnabled('b2')) notFound();
  return <LevelMapClient level="b2" />;
}
