import { pgTable, serial, text, timestamp, integer, jsonb, boolean, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  username: varchar('username', { length: 100 }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  preferences: jsonb('preferences').default({}),
});

export const userProfiles = pgTable('user_profiles', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull(),
  diagnosisTypes: jsonb('diagnosis_types').default([]),
  sensoryPreferences: jsonb('sensory_preferences').default({}),
  communicationStyle: text('communication_style'),
  learningPreferences: jsonb('learning_preferences').default({}),
});

export const communicationHistory = pgTable('communication_history', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull(),
  originalText: text('original_text').notNull(),
  analyzedTone: jsonb('analyzed_tone'),
  formattedMessage: text('formatted_message'),
  context: text('context'),
  timestamp: timestamp('timestamp').defaultNow(),
});

export const conversationSimulations = pgTable('conversation_simulations', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull(),
  scenarioType: varchar('scenario_type', { length: 50 }),
  conversationData: jsonb('conversation_data'),
  feedback: text('feedback'),
  difficultyLevel: integer('difficulty_level'),
  completedAt: timestamp('completed_at'),
});

export const learningContent = pgTable('learning_content', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull(),
  originalContent: text('original_content').notNull(),
  simplifiedContent: text('simplified_content'),
  readingLevel: integer('reading_level'),
  domainType: varchar('domain_type', { length: 50 }),
  visualSummaryUrl: text('visual_summary_url'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const tasks = pgTable('tasks', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  dueDate: timestamp('due_date'),
  energyLevel: varchar('energy_level', { length: 20 }),
  category: varchar('category', { length: 50 }),
  status: varchar('status', { length: 20 }).default('pending'),
  priority: integer('priority').default(0),
  createdAt: timestamp('created_at').defaultNow(),
});

export const timelineEvents = pgTable('timeline_events', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull(),
  taskId: integer('task_id').references(() => tasks.id),
  startTime: timestamp('start_time').notNull(),
  endTime: timestamp('end_time').notNull(),
  color: varchar('color', { length: 20 }),
  reminders: jsonb('reminders').default([]),
});

export const accessibilitySettings = pgTable('accessibility_settings', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull().unique(),
  theme: varchar('theme', { length: 20 }).default('light'),
  fontFamily: varchar('font_family', { length: 50 }).default('professional'),
  fontSize: integer('font_size').default(100),
  motionReduced: boolean('motion_reduced').default(false),
  highContrast: boolean('high_contrast').default(false),
  screenReaderMode: boolean('screen_reader_mode').default(false),
});
