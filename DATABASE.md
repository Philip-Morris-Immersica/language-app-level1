# Database Schema Documentation

## Overview

This database schema is designed for a Bulgarian Language Learning App (Level A1) using PostgreSQL with Neon and Drizzle ORM.

## Schema Structure

### Tables

#### 1. **users**
Stores user account information.

| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER (PK) | Auto-incrementing primary key |
| name | VARCHAR(255) | User's full name |
| email | VARCHAR(255) | Unique email address |
| created_at | TIMESTAMP | Account creation timestamp |

#### 2. **lessons**
Contains all language learning lessons.

| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER (PK) | Auto-incrementing primary key |
| title | VARCHAR(255) | Lesson title |
| description | TEXT | Detailed lesson description |
| order | INTEGER | Lesson sequence number |
| difficulty | ENUM | beginner, intermediate, or advanced |
| image_url | VARCHAR(500) | Optional lesson image |
| created_at | TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp |

#### 3. **exercises**
Individual exercises within lessons.

| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER (PK) | Auto-incrementing primary key |
| lesson_id | INTEGER (FK) | References lessons.id |
| type | ENUM | Exercise type (see types below) |
| question | TEXT | The exercise question/prompt |
| correct_answer | TEXT | The correct answer |
| options | TEXT[] | Array of options for multiple choice |
| hints | TEXT | Optional hints for the learner |
| order | INTEGER | Exercise order within lesson |
| points | INTEGER | Points awarded (default: 10) |
| created_at | TIMESTAMP | Creation timestamp |

**Exercise Types:**
- `multiple_choice` - Choose from multiple options
- `fill_in_blank` - Complete the sentence
- `translation` - Translate text
- `listening` - Audio comprehension
- `speaking` - Pronunciation practice
- `matching` - Match pairs

#### 4. **user_progress**
Tracks individual exercise completion and scores.

| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER (PK) | Auto-incrementing primary key |
| user_id | INTEGER (FK) | References users.id |
| exercise_id | INTEGER (FK) | References exercises.id |
| completed | BOOLEAN | Exercise completion status |
| score | INTEGER | Points earned |
| attempts | INTEGER | Number of attempts |
| last_attempt_at | TIMESTAMP | Last attempt timestamp |
| completed_at | TIMESTAMP | Completion timestamp |
| created_at | TIMESTAMP | Record creation timestamp |

#### 5. **lesson_progress**
Tracks overall lesson completion status.

| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER (PK) | Auto-incrementing primary key |
| user_id | INTEGER (FK) | References users.id |
| lesson_id | INTEGER (FK) | References lessons.id |
| completed | BOOLEAN | Lesson completion status |
| total_score | INTEGER | Total points earned in lesson |
| completed_at | TIMESTAMP | Completion timestamp |
| created_at | TIMESTAMP | Record creation timestamp |

## Relationships

```
users (1) ─────< (many) user_progress
users (1) ─────< (many) lesson_progress

lessons (1) ───< (many) exercises
lessons (1) ───< (many) lesson_progress

exercises (1) ─< (many) user_progress
```

## Database Commands

### Setup & Migration

```bash
# Reset database schema (drops all tables and recreates)
npm run db:reset

# Seed database with sample data
npm run db:seed

# Reset and seed in one command
npm run db:setup

# Run query examples
npm run db:query

# Open Drizzle Studio (visual database browser)
npm run db:studio

# Push schema changes (for development)
npm run db:push

# Generate migration files
npm run db:generate
```

## Sample Queries

### Get all lessons for a user with progress
```typescript
const lessons = await db
  .select({
    id: lessonsTable.id,
    title: lessonsTable.title,
    completed: lessonProgressTable.completed,
    score: lessonProgressTable.totalScore,
  })
  .from(lessonsTable)
  .leftJoin(
    lessonProgressTable,
    and(
      eq(lessonProgressTable.lessonId, lessonsTable.id),
      eq(lessonProgressTable.userId, userId)
    )
  )
  .orderBy(lessonsTable.order);
```

### Get exercises for a lesson with user progress
```typescript
const exercises = await db
  .select({
    id: exercisesTable.id,
    question: exercisesTable.question,
    type: exercisesTable.type,
    points: exercisesTable.points,
    completed: userProgressTable.completed,
    score: userProgressTable.score,
  })
  .from(exercisesTable)
  .leftJoin(
    userProgressTable,
    and(
      eq(userProgressTable.exerciseId, exercisesTable.id),
      eq(userProgressTable.userId, userId)
    )
  )
  .where(eq(exercisesTable.lessonId, lessonId))
  .orderBy(exercisesTable.order);
```

### Update user progress
```typescript
await db.insert(userProgressTable).values({
  userId: 1,
  exerciseId: 5,
  completed: true,
  score: 10,
  attempts: 1,
  completedAt: new Date(),
  lastAttemptAt: new Date(),
});
```

### Calculate user statistics
```typescript
const stats = await db
  .select({
    totalExercises: count(userProgressTable.id),
    completedExercises: count(userProgressTable.completed),
    totalScore: sum(userProgressTable.score),
  })
  .from(userProgressTable)
  .where(eq(userProgressTable.userId, userId));
```

## Sample Data

The seed file creates:
- 2 sample users
- 3 beginner lessons (Alphabet, Greetings, Numbers)
- 4 exercises across the lessons
- Progress tracking for one user

## Next Steps

1. **Add more lessons and exercises** - Expand the curriculum
2. **Implement authentication** - Add user login/registration
3. **Add streaks and achievements** - Gamification features
4. **Add audio support** - For listening exercises
5. **Add vocabulary tables** - Track learned words
6. **Add review system** - Spaced repetition for exercises

## Files

- `src/db/schema.ts` - Drizzle schema definitions
- `src/db/reset-schema.ts` - Database reset script
- `src/db/seed.ts` - Sample data seeding script
- `src/db/query-examples.ts` - Query examples and demonstrations
- `drizzle.config.ts` - Drizzle Kit configuration
