import { headers } from 'next/headers';
import { HomePageClient } from '@/components/HomePageClient';
import { getEnabledLevelsForHost } from '@/lib/enabledLevels';

export default async function Home() {
  const host = (await headers()).get('host');
  const enabledLevels = getEnabledLevelsForHost(host);
  return <HomePageClient enabledLevels={enabledLevels} />;
}
