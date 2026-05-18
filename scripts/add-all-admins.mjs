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

// Add ALL Philip accounts as IT admin
const philipIds = [3, 4, 16, 17, 11]; // all philip/filip accounts + filip@abv.bg

for (const userId of philipIds) {
  const existing = await sql`SELECT id FROM admin_users WHERE user_id = ${userId}`;
  if (existing.length === 0) {
    await sql`INSERT INTO admin_users (user_id, role, created_by) VALUES (${userId}, 'it', 3)`;
    console.log(`✅ Added IT admin for user_id=${userId}`);
  } else {
    await sql`UPDATE admin_users SET role = 'it' WHERE user_id = ${userId}`;
    console.log(`✅ Updated IT role for user_id=${userId}`);
  }
}

const admins = await sql`SELECT au.user_id, au.role, u.email FROM admin_users au JOIN users u ON u.id = au.user_id`;
console.log('\nAll admins now:');
admins.forEach(a => console.log(`  [${a.user_id}] ${a.email} → ${a.role}`));
process.exit(0);
