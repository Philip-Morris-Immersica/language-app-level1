import 'dotenv/config';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { eq, and, desc } from 'drizzle-orm';
import { 
  usersTable, 
  lessonsTable, 
  exercisesTable, 
  userProgressTable,
  lessonProgressTable 
} from './schema';

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle({ client: sql });

async function queryExamples() {
  console.log('📚 Query Examples for Language Learning App\n');
  console.log('='.repeat(50) + '\n');

  try {
    // 1. Get all lessons ordered by sequence
    console.log('1️⃣  All Lessons (ordered):');
    const allLessons = await db
      .select()
      .from(lessonsTable)
      .orderBy(lessonsTable.order);
    console.log(allLessons);
    console.log('\n');

    // 2. Get exercises for a specific lesson
    console.log('2️⃣  Exercises for Lesson 1:');
    const lesson1Exercises = await db
      .select()
      .from(exercisesTable)
      .where(eq(exercisesTable.lessonId, 1))
      .orderBy(exercisesTable.order);
    console.log(lesson1Exercises);
    console.log('\n');

    // 3. Get a specific user's progress
    console.log('3️⃣  User Progress for User 1:');
    const userProgress = await db
      .select({
        exerciseId: userProgressTable.exerciseId,
        question: exercisesTable.question,
        completed: userProgressTable.completed,
        score: userProgressTable.score,
        attempts: userProgressTable.attempts,
      })
      .from(userProgressTable)
      .innerJoin(exercisesTable, eq(userProgressTable.exerciseId, exercisesTable.id))
      .where(eq(userProgressTable.userId, 1));
    console.log(userProgress);
    console.log('\n');

    // 4. Get lesson completion status for a user
    console.log('4️⃣  Lesson Progress for User 1:');
    const lessonProgress = await db
      .select({
        lessonTitle: lessonsTable.title,
        completed: lessonProgressTable.completed,
        totalScore: lessonProgressTable.totalScore,
        completedAt: lessonProgressTable.completedAt,
      })
      .from(lessonProgressTable)
      .innerJoin(lessonsTable, eq(lessonProgressTable.lessonId, lessonsTable.id))
      .where(eq(lessonProgressTable.userId, 1));
    console.log(lessonProgress);
    console.log('\n');

    // 5. Get user statistics
    console.log('5️⃣  User Statistics:');
    const user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, 1))
      .limit(1);
    
    const completedExercises = await db
      .select()
      .from(userProgressTable)
      .where(
        and(
          eq(userProgressTable.userId, 1),
          eq(userProgressTable.completed, true)
        )
      );
    
    const totalScore = completedExercises.reduce((sum, ex) => sum + ex.score, 0);
    
    console.log({
      user: user[0],
      completedExercises: completedExercises.length,
      totalScore: totalScore,
    });
    console.log('\n');

    // 6. Get incomplete exercises for a user
    console.log('6️⃣  Incomplete Exercises for User 1:');
    const incompleteExercises = await db
      .select({
        lessonTitle: lessonsTable.title,
        exerciseQuestion: exercisesTable.question,
        exerciseType: exercisesTable.type,
        points: exercisesTable.points,
      })
      .from(exercisesTable)
      .innerJoin(lessonsTable, eq(exercisesTable.lessonId, lessonsTable.id))
      .leftJoin(
        userProgressTable,
        and(
          eq(userProgressTable.exerciseId, exercisesTable.id),
          eq(userProgressTable.userId, 1)
        )
      )
      .where(eq(userProgressTable.completed, false));
    console.log(incompleteExercises);
    console.log('\n');

    console.log('='.repeat(50));
    console.log('✅ Query examples completed successfully!');

  } catch (error) {
    console.error('❌ Query failed:', error);
    process.exit(1);
  }
}

queryExamples();
