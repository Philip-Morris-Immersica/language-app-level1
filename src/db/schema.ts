import { integer, pgTable, varchar, text, boolean, timestamp, pgEnum, unique } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const adminRoleEnum = pgEnum("admin_role", ["it", "admin", "viewer"]);

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
  passwordHash: varchar("password_hash", { length: 255 }).notNull().default(''),
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

// Exercise state persistence — stores all user answers per exercise
export const exerciseStatesTable = pgTable("exercise_states", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: integer("user_id").notNull().references(() => usersTable.id, { onDelete: "cascade" }),
  lessonId: varchar("lesson_id", { length: 50 }).notNull(),
  exerciseId: varchar("exercise_id", { length: 50 }).notNull(),
  state: text().notNull().default('{}'),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
}, (t) => [unique().on(t.userId, t.exerciseId)]);

// ── Chat tables ────────────────────────────────────────────────────────────────

export const chatConversationsTable = pgTable("chat_conversations", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: integer("user_id").notNull().references(() => usersTable.id, { onDelete: "cascade" }),
  language: varchar({ length: 5 }).notNull(),
  level: varchar({ length: 5 }),
  startedAt: timestamp("started_at").notNull().defaultNow(),
  lastMessageAt: timestamp("last_message_at").notNull().defaultNow(),
  totalTokensIn: integer("total_tokens_in").notNull().default(0),
  totalTokensOut: integer("total_tokens_out").notNull().default(0),
  totalCostUsdMicro: integer("total_cost_usd_micro").notNull().default(0),
});

export const chatMessagesTable = pgTable("chat_messages", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  conversationId: integer("conversation_id").notNull().references(() => chatConversationsTable.id, { onDelete: "cascade" }),
  role: varchar({ length: 16 }).notNull(),
  content: text().notNull(),
  contentRedacted: boolean("content_redacted").notNull().default(false),
  lessonContext: varchar("lesson_context", { length: 64 }),
  model: varchar({ length: 64 }),
  tokensIn: integer("tokens_in").default(0),
  tokensOut: integer("tokens_out").default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// ── Admin tables ───────────────────────────────────────────────────────────────

export const adminUsersTable = pgTable("admin_users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: integer("user_id").notNull().unique().references(() => usersTable.id, { onDelete: "cascade" }),
  role: adminRoleEnum().notNull(),
  createdBy: integer("created_by").references(() => usersTable.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const adminAuditLogTable = pgTable("admin_audit_log", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  adminUserId: integer("admin_user_id").notNull().references(() => usersTable.id),
  action: varchar({ length: 64 }).notNull(),
  target: varchar({ length: 128 }),
  beforeJson: text("before_json"),
  afterJson: text("after_json"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const adminPromptsTable = pgTable("admin_prompts", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  scope: varchar({ length: 16 }).notNull(),
  promptText: text("prompt_text").notNull(),
  temperature: integer().notNull().default(70),
  model: varchar({ length: 64 }).notNull().default("gpt-4o-mini"),
  maxTokens: integer("max_tokens").notNull().default(1000),
  isActive: boolean("is_active").notNull().default(true),
  version: integer().notNull().default(1),
  updatedBy: integer("updated_by").references(() => usersTable.id),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
}, (t) => [unique().on(t.scope, t.version)]);

export const adminWelcomeMessageTable = pgTable("admin_welcome_message", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  lang: varchar({ length: 5 }).notNull().unique(),
  text: text().notNull(),
  suggestionChips: text("suggestion_chips"),  // JSON array of 3 strings
  isActive: boolean("is_active").notNull().default(true),
  updatedBy: integer("updated_by").references(() => usersTable.id),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const adminApiKeysTable = pgTable("admin_api_keys", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  provider: varchar({ length: 32 }).notNull(),
  encryptedKey: text("encrypted_key").notNull(),
  isActive: boolean("is_active").notNull().default(true),
  createdBy: integer("created_by").notNull().references(() => usersTable.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  lastUsedAt: timestamp("last_used_at"),
});

// ── Relations ──────────────────────────────────────────────────────────────────

export const usersRelations = relations(usersTable, ({ many }) => ({
  progress: many(userProgressTable),
  lessonProgress: many(lessonProgressTable),
  chatConversations: many(chatConversationsTable),
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

export const chatConversationsRelations = relations(chatConversationsTable, ({ one, many }) => ({
  user: one(usersTable, {
    fields: [chatConversationsTable.userId],
    references: [usersTable.id],
  }),
  messages: many(chatMessagesTable),
}));

export const chatMessagesRelations = relations(chatMessagesTable, ({ one }) => ({
  conversation: one(chatConversationsTable, {
    fields: [chatMessagesTable.conversationId],
    references: [chatConversationsTable.id],
  }),
}));
