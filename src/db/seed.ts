import 'dotenv/config';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { usersTable, lessonsTable, exercisesTable, userProgressTable, lessonProgressTable } from './schema';

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle({ client: sql });

async function seed() {
  console.log('🌱 Seeding database...\n');

  try {
    // Create sample users
    console.log('Creating users...');
    const [user1] = await db.insert(usersTable).values([
      { name: 'John Doe', email: 'john@example.com' },
      { name: 'Jane Smith', email: 'jane@example.com' },
    ]).returning();
    console.log('✅ Users created\n');

    // Create sample lessons
    console.log('Creating lessons...');
    const [lesson1, lesson2] = await db.insert(lessonsTable).values([
      {
        title: 'Bulgarian Alphabet',
        description: 'Learn the Bulgarian Cyrillic alphabet and basic pronunciation',
        order: 1,
        difficulty: 'beginner',
      },
      {
        title: 'Basic Greetings',
        description: 'Common greetings and introductions in Bulgarian',
        order: 2,
        difficulty: 'beginner',
      },
      {
        title: 'Numbers 1-10',
        description: 'Learn to count from 1 to 10 in Bulgarian',
        order: 3,
        difficulty: 'beginner',
      },
    ]).returning();
    console.log('✅ Lessons created\n');

    // Create sample exercises for Lesson 1
    console.log('Creating exercises...');
    const exercises = await db.insert(exercisesTable).values([
      // Lesson 1: Bulgarian Alphabet
      {
        lessonId: lesson1.id,
        type: 'multiple_choice',
        question: 'How do you say "Hello" in Bulgarian?',
        correctAnswer: 'Здравей',
        options: ['Здравей', 'Довиждане', 'Благодаря', 'Моля'],
        order: 1,
        points: 10,
      },
      {
        lessonId: lesson1.id,
        type: 'translation',
        question: 'Translate "Good morning" to Bulgarian',
        correctAnswer: 'Добро утро',
        hints: 'Think about the time of day',
        order: 2,
        points: 15,
      },
      // Lesson 2: Basic Greetings
      {
        lessonId: lesson2.id,
        type: 'multiple_choice',
        question: 'What does "Довиждане" mean?',
        correctAnswer: 'Goodbye',
        options: ['Hello', 'Goodbye', 'Thank you', 'Please'],
        order: 1,
        points: 10,
      },
      {
        lessonId: lesson2.id,
        type: 'fill_in_blank',
        question: 'Complete: Казвам се _____ (My name is _____)',
        correctAnswer: 'Иван',
        hints: 'Fill in with any Bulgarian name',
        order: 2,
        points: 10,
      },
    ]).returning();
    console.log('✅ Exercises created\n');

    // Create sample user progress
    console.log('Creating user progress...');
    await db.insert(userProgressTable).values([
      {
        userId: user1.id,
        exerciseId: exercises[0].id,
        completed: true,
        score: 10,
        attempts: 1,
        completedAt: new Date(),
        lastAttemptAt: new Date(),
      },
      {
        userId: user1.id,
        exerciseId: exercises[1].id,
        completed: true,
        score: 15,
        attempts: 2,
        completedAt: new Date(),
        lastAttemptAt: new Date(),
      },
    ]);
    console.log('✅ User progress created\n');

    // Create lesson progress
    console.log('Creating lesson progress...');
    await db.insert(lessonProgressTable).values([
      {
        userId: user1.id,
        lessonId: lesson1.id,
        completed: true,
        totalScore: 25,
        completedAt: new Date(),
      },
    ]);
    console.log('✅ Lesson progress created\n');

    // Display summary
    console.log('📊 Seed Summary:');
    console.log('  - 2 users created');
    console.log('  - 3 lessons created');
    console.log('  - 4 exercises created');
    console.log('  - User progress tracked');
    console.log('  - Lesson completion recorded');
    console.log('\n🎉 Database seeded successfully!');

  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

seed();
