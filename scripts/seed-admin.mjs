import { neon } from '@neondatabase/serverless';
import { readFileSync } from 'fs';

// Load .env files manually
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

// Show all users
const users = await sql`SELECT id, name, email FROM users ORDER BY id`;
console.log('\nRegistered users:');
users.forEach(u => console.log(`  [${u.id}] ${u.email} — ${u.name}`));

// Show existing admins
const admins = await sql`SELECT au.user_id, au.role, u.email FROM admin_users au JOIN users u ON u.id = au.user_id`;
console.log('\nCurrent admins:');
admins.forEach(a => console.log(`  ${a.email} → ${a.role}`));

// Check IT_ADMIN_EMAILS
const itEmails = (process.env.IT_ADMIN_EMAILS ?? '').split(',').map(e => e.trim().toLowerCase()).filter(Boolean);
console.log('\nIT_ADMIN_EMAILS from .env.local:', itEmails);

// Auto-seed
for (const user of users) {
  if (itEmails.includes(user.email.toLowerCase())) {
    const existing = await sql`SELECT id FROM admin_users WHERE user_id = ${user.id}`;
    if (existing.length === 0) {
      await sql`INSERT INTO admin_users (user_id, role, created_by) VALUES (${user.id}, 'it', ${user.id})`;
      console.log(`\n✅ Added IT admin: ${user.email}`);
    } else {
      await sql`UPDATE admin_users SET role = 'it' WHERE user_id = ${user.id}`;
      console.log(`\n✅ Updated to IT: ${user.email}`);
    }
  }
}

console.log('\nDone.');
process.exit(0);
