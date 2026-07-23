import { notFound } from 'next/navigation';
import { LevelMapClient } from '@/components/level/LevelMapClient';
import { isLevelEnabled } from '@/lib/enabledLevels';

export default function LevelA2Page() {
  if (!isLevelEnabled('a2')) notFound();
  return <LevelMapClient level="a2" />;
}
