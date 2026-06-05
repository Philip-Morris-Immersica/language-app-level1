import { neon } from '@neondatabase/serverless';
import { readFileSync } from 'fs';

for (const file of ['.env', '.env.local']) {
  try {
    const content = readFileSync(file, 'utf8');
    for (const line of content.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const idx = trimmed.indexOf('=');
      if (idx < 0) continue;
      const key = trimmed.slice(0, idx).trim();
      const val = trimmed.slice(idx + 1).trim().replace(/^["']|["']$/g, '');
      process.env[key] = process.env[key] ?? val;
    }
  } catch {}
}

const sql = neon(process.env.DATABASE_URL);

const admins = await sql`
  SELECT au.user_id, au.role, u.email, u.name 
  FROM admin_users au 
  JOIN users u ON u.id = au.user_id
`;

console.log('Admin users in DB:');
admins.forEach(a => console.log(`  user_id=${a.user_id} | ${a.email} | role=${a.role}`));
process.exit(0);
