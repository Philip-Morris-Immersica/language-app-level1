import 'dotenv/config';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

async function resetSchema() {
  console.log('🔄 Resetting database schema...');

  try {
    // Drop existing tables
    console.log('Dropping old tables...');
    await sql`DROP TABLE IF EXISTS user_progress CASCADE`;
    await sql`DROP TABLE IF EXISTS lesson_progress CASCADE`;
    await sql`DROP TABLE IF EXISTS exercises CASCADE`;
    await sql`DROP TABLE IF EXISTS lessons CASCADE`;
    await sql`DROP TABLE IF EXISTS users CASCADE`;
    await sql`DROP TYPE IF EXISTS difficulty CASCADE`;
    await sql`DROP TYPE IF EXISTS exercise_type CASCADE`;
    
    console.log('✅ Old tables dropped');

    // Create enums
    console.log('Creating enums...');
    await sql`CREATE TYPE difficulty AS ENUM ('beginner', 'intermediate', 'advanced')`;
    await sql`CREATE TYPE exercise_type AS ENUM ('multiple_choice', 'fill_in_blank', 'translation', 'listening', 'speaking', 'matching')`;
    console.log('✅ Enums created');

    // Create users table
    console.log('Creating users table...');
    await sql`
      CREATE TABLE users (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        created_at TIMESTAMP NOT NULL DEFAULT NOW()
      )
    `;
    console.log('✅ Users table created');

    // Create lessons table
    console.log('Creating lessons table...');
    await sql`
      CREATE TABLE lessons (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        "order" INTEGER NOT NULL,
        difficulty difficulty NOT NULL DEFAULT 'beginner',
        image_url VARCHAR(500),
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW()
      )
    `;
    console.log('✅ Lessons table created');

    // Create exercises table
    console.log('Creating exercises table...');
    await sql`
      CREATE TABLE exercises (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        lesson_id INTEGER NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
        type exercise_type NOT NULL,
        question TEXT NOT NULL,
        correct_answer TEXT NOT NULL,
        options TEXT[],
        hints TEXT,
        "order" INTEGER NOT NULL,
        points INTEGER NOT NULL DEFAULT 10,
        created_at TIMESTAMP NOT NULL DEFAULT NOW()
      )
    `;
    console.log('✅ Exercises table created');

    // Create user_progress table
    console.log('Creating user_progress table...');
    await sql`
      CREATE TABLE user_progress (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        exercise_id INTEGER NOT NULL REFERENCES exercises(id) ON DELETE CASCADE,
        completed BOOLEAN NOT NULL DEFAULT false,
        score INTEGER NOT NULL DEFAULT 0,
        attempts INTEGER NOT NULL DEFAULT 0,
        last_attempt_at TIMESTAMP,
        completed_at TIMESTAMP,
        created_at TIMESTAMP NOT NULL DEFAULT NOW()
      )
    `;
    console.log('✅ User progress table created');

    // Create lesson_progress table
    console.log('Creating lesson_progress table...');
    await sql`
      CREATE TABLE lesson_progress (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        lesson_id INTEGER NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
        completed BOOLEAN NOT NULL DEFAULT false,
        total_score INTEGER NOT NULL DEFAULT 0,
        completed_at TIMESTAMP,
        created_at TIMESTAMP NOT NULL DEFAULT NOW()
      )
    `;
    console.log('✅ Lesson progress table created');

    console.log('\n🎉 Database schema reset successfully!');
    console.log('Tables created:');
    console.log('  - users');
    console.log('  - lessons');
    console.log('  - exercises');
    console.log('  - user_progress');
    console.log('  - lesson_progress');
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

resetSchema();
