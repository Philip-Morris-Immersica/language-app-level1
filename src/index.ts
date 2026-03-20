import 'dotenv/config';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { eq } from 'drizzle-orm';
import { usersTable } from './db/schema';

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle({ client: sql });

async function main() {
  try {
    console.log('Starting seed operations...');
    
    const user: typeof usersTable.$inferInsert = {
      name: 'John',
      email: 'john@example.com',
    };

    await db.insert(usersTable).values(user);
    console.log('✅ New user created!');

    const users = await db.select().from(usersTable);
    console.log('📋 Getting all users from the database:', users);

    await db
      .update(usersTable)
      .set({
        name: 'John Updated',
      })
      .where(eq(usersTable.email, user.email));
    console.log('✅ User info updated!');

    const updatedUsers = await db.select().from(usersTable);
    console.log('📋 Updated user:', updatedUsers);

    await db.delete(usersTable).where(eq(usersTable.email, user.email));
    console.log('✅ User deleted!');
    
    console.log('\n🎉 All CRUD operations completed successfully!');
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

main();
