import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

const EXTERNAL_LOGIN_BASE = 'https://immersica.skillie.ai/Account/Login';

export default async function LoginPage() {
  const headersList = await headers();
  const host = headersList.get('host') ?? 'localhost:3000';
  const proto = host.startsWith('localhost') ? 'http' : 'https';

  const appUrl =
    process.env.NEXT_PUBLIC_APP_URL ??
    process.env.NEXTAUTH_URL ??
    `${proto}://${host}`;

  const returnUrl = `${appUrl}/auth/callback`;
  const loginUrl = `${EXTERNAL_LOGIN_BASE}?returnUrl=${encodeURIComponent(returnUrl)}`;

  redirect(loginUrl);
}
