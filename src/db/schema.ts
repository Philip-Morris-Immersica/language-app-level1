import { integer, pgTable, varchar, text, boolean, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Enums for exercise types and difficulty levels
export const difficultyEnum = pgEnum("difficulty", ["beginner", "intermediate", "advanced"]);
export const exerciseTypeEnum = pgEnum("exercise_type", [
  "multiple_choice",
  "fill_in_blank",
  "translation",
  "listening",
  "speaking",
  "matching"
]);

// Users table
export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Lessons table
export const lessonsTable = pgTable("lessons", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 255 }).notNull(),
  description: text(),
  order: integer().notNull(), // Lesson sequence/order
  difficulty: difficultyEnum().notNull().default("beginner"),
  imageUrl: varchar("image_url", { length: 500 }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Exercises table
export const exercisesTable = pgTable("exercises", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  lessonId: integer("lesson_id").notNull().references(() => lessonsTable.id, { onDelete: "cascade" }),
  type: exerciseTypeEnum().notNull(),
  question: text().notNull(),
  correctAnswer: text("correct_answer").notNull(),
  options: text().array(), // For multiple choice options (JSON array)
  hints: text(), // Optional hints for the exercise
  order: integer().notNull(), // Exercise order within the lesson
  points: integer().notNull().default(10), // Points awarded for correct answer
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// User Progress table - tracks completion and scores
export const userProgressTable = pgTable("user_progress", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: integer("user_id").notNull().references(() => usersTable.id, { onDelete: "cascade" }),
  exerciseId: integer("exercise_id").notNull().references(() => exercisesTable.id, { onDelete: "cascade" }),
  completed: boolean().notNull().default(false),
  score: integer().notNull().default(0), // Points earned
  attempts: integer().notNull().default(0), // Number of attempts
  lastAttemptAt: timestamp("last_attempt_at"),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Lesson Progress table - tracks overall lesson completion
export const lessonProgressTable = pgTable("lesson_progress", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: integer("user_id").notNull().references(() => usersTable.id, { onDelete: "cascade" }),
  lessonId: integer("lesson_id").notNull().references(() => lessonsTable.id, { onDelete: "cascade" }),
  completed: boolean().notNull().default(false),
  totalScore: integer("total_score").notNull().default(0),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Relations
export const usersRelations = relations(usersTable, ({ many }) => ({
  progress: many(userProgressTable),
  lessonProgress: many(lessonProgressTable),
}));

export const lessonsRelations = relations(lessonsTable, ({ many }) => ({
  exercises: many(exercisesTable),
  lessonProgress: many(lessonProgressTable),
}));

export const exercisesRelations = relations(exercisesTable, ({ one, many }) => ({
  lesson: one(lessonsTable, {
    fields: [exercisesTable.lessonId],
    references: [lessonsTable.id],
  }),
  userProgress: many(userProgressTable),
}));

export const userProgressRelations = relations(userProgressTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [userProgressTable.userId],
    references: [usersTable.id],
  }),
  exercise: one(exercisesTable, {
    fields: [userProgressTable.exerciseId],
    references: [exercisesTable.id],
  }),
}));

export const lessonProgressRelations = relations(lessonProgressTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [lessonProgressTable.userId],
    references: [usersTable.id],
  }),
  lesson: one(lessonsTable, {
    fields: [lessonProgressTable.lessonId],
    references: [lessonsTable.id],
  }),
}));
