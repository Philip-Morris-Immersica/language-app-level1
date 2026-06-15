import { NextResponse } from 'next/server';
import { db } from '@/db';
import { usersTable } from '@/db/schema';

export async function GET() {
  const result: Record<string, unknown> = {
    envVars: {
      DATABASE_URL: !!process.env.DATABASE_URL,
      JWT_SECRET: !!process.env.JWT_SECRET,
      IT_ADMIN_EMAILS: !!process.env.IT_ADMIN_EMAILS,
      RESEND_API_KEY: !!process.env.RESEND_API_KEY,
      NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL ?? null,
      NODE_ENV: process.env.NODE_ENV ?? null,
    },
    databaseUrlHost: process.env.DATABASE_URL
      ? (process.env.DATABASE_URL.match(/@([^/]+)/)?.[1] ?? 'unparseable')
      : null,
  };

  try {
    const users = await db.select({ id: usersTable.id }).from(usersTable).limit(1);
    result.dbConnection = 'ok';
    result.userCount = users.length;
  } catch (err) {
    result.dbConnection = 'failed';
    result.dbError = err instanceof Error ? err.message : String(err);
    result.dbErrorStack = err instanceof Error ? err.stack : undefined;
  }

  return NextResponse.json(result, { status: 200 });
}
