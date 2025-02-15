import { relations } from "drizzle-orm";
import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  jsonb,
} from "drizzle-orm/pg-core";

export const difficultyLevel = pgEnum("difficulty_level", [
  "BEGINNER",
  "INTERMEDIATE",
  "ADVANCED",
  "EXPERT",
]);

export const subscriptionTier = pgEnum("subscription_tier", [
  "FREE",
  "PRO",
  "ENTERPRISE",
]);

export const experienceLevel = pgEnum("experience_level", [
  "NOVICE",
  "INTERMEDIATE",
  "PROFICIENT",
  "EXPERT",
]);

export const questTypes = pgEnum("quest_type", [
  "LESSON_COMPLETION",
  "CODE_REVIEW",
  "CHALLENGE_CREATION",
  "PEER_REVIEW",
  "BUG_FINDING",
  "PERFORMANCE_OPTIMIZATION",
]);

export const challengeType = pgEnum("challenge_type", [
  "CODE_TRANSLATION",
  "SYNTAX_ERROR",
  "OUTPUT_PREDICTION",
  "CODE_REVIEW",
  "PERFORMANCE",
  "SECURITY",
]);

// Programming Languages table
export const programmingLanguages = pgTable("programming_languages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  imageSrc: text("image_src").notNull(),
  description: text("description").notNull(),
  popularity: integer("popularity").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
});

// Programming Concepts table
export const programmingConcepts = pgTable("programming_concepts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  difficulty: difficultyLevel("difficulty").notNull(),
  category: text("category").notNull(),
  prerequisites: text("prerequisites").array(),
  learningPath: integer("learning_path_id").references(() => learningPaths.id),
});

// Learning Paths table
export const learningPaths = pgTable("learning_paths", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  difficulty: difficultyLevel("difficulty").notNull(),
  estimatedHours: integer("estimated_hours").notNull(),
  language: text("language").notNull(),
  isPublished: boolean("is_published").notNull().default(false),
});

// User Progress table
export const userProgress = pgTable("user_progress", {
  userId: text("user_id").primaryKey(),
  userName: text("user_name").notNull(),
  email: text("email").notNull(),
  subscriptionTier: subscriptionTier("subscription_tier").notNull().default("FREE"),
  preferredLanguage: text("preferred_language"),
  experienceLevel: experienceLevel("experience_level"),
  dailyGoalMinutes: integer("daily_goal_minutes").default(30),
  hearts: integer("hearts").notNull().default(5),
  points: integer("points").notNull().default(0),
  gems: integer("gems").notNull().default(0),
  xp: integer("xp").notNull().default(0),
  streakCount: integer("streak_count").notNull().default(0),
  lastActiveDate: timestamp("last_active_date"),
  xpMultiplier: integer("xp_multiplier").notNull().default(1),
  streakFreezeCount: integer("streak_freeze_count").notNull().default(0),
  powerUps: text("power_ups").array(),
  achievements: text("achievements").array(),
  level: integer("level").notNull().default(1),
  reviewScore: integer("review_score").notNull().default(0),
  contributionScore: integer("contribution_score").notNull().default(0),
});

// Language Pairs table
export const languagePairs = pgTable("language_pairs", {
  id: serial("id").primaryKey(),
  fromLanguage: text("from_language").notNull(),
  toLanguage: text("to_language").notNull(),
  active: boolean("active").notNull().default(true),
  popularity: integer("popularity").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Units table
export const units = pgTable("units", {
  id: serial("id").primaryKey(),
  languagePairId: integer("language_pair_id")
    .references(() => languagePairs.id)
    .notNull(),
  order: integer("order").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
  requiredXp: integer("required_xp").notNull().default(0),
  unlockPrice: integer("unlock_price").notNull().default(0),
});

// Sections table
export const sections = pgTable("sections", {
  id: serial("id").primaryKey(),
  unitId: integer("unit_id")
    .references(() => units.id)
    .notNull(),
  order: integer("order").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  conceptType: text("concept_type").notNull(), // e.g., "print_statements", "variables", "loops"
  icon: text("icon").notNull(),
  characterId: integer("character_id")
    .references(() => characters.id),
});

// Lessons table
export const lessons = pgTable("lessons", {
  id: serial("id").primaryKey(),
  sectionId: integer("section_id")
    .references(() => sections.id)
    .notNull(),
  order: integer("order").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  type: text("type").notNull(), // "concept", "practice", "review", "challenge"
  format: text("format").notNull(), // "text", "multiple_choice", "fill_blank", "matching", "word_pool"
  xpReward: integer("xp_reward").notNull().default(10),
  requiredHearts: integer("required_hearts").notNull().default(1),
});

// Characters table
export const characters = pgTable("characters", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(), // "robot", "computer", "ai"
  personality: text("personality").notNull(),
  avatarUrl: text("avatar_url").notNull(),
  specialty: text("specialty").notNull(), // e.g., "debugging", "algorithms", "web_dev"
});

// Challenges table
export const challenges = pgTable("challenges", {
  id: serial("id").primaryKey(),
  lessonId: integer("lesson_id")
    .references(() => lessons.id)
    .notNull(),
  order: integer("order").notNull(),
  type: text("type").notNull(), // "translation", "matching", "fill_blank", "word_pool"
  prompt: text("prompt").notNull(),
  fromCode: text("from_code"),
  toCode: text("to_code"),
  options: text("options").array(),
  correctAnswer: text("correct_answer").notNull(),
  explanation: text("explanation").notNull(),
  hints: text("hints").array(),
});

// Unit Tests table
export const unitTests = pgTable("unit_tests", {
  id: serial("id").primaryKey(),
  languagePairId: integer("language_pair_id")
    .references(() => languagePairs.id)
    .notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  difficulty: text("difficulty").notNull(),
  questions: jsonb("questions").notNull(),
  passingScore: integer("passing_score").notNull().default(80),
  timeLimit: integer("time_limit").notNull().default(1800), // in seconds
  unlocksUnitIds: integer("unlocks_unit_ids").array(),
});

// Language Pair Progress table
export const languagePairProgress = pgTable("language_pair_progress", {
  id: serial("id").primaryKey(),
  userId: text("user_id")
    .references(() => userProgress.userId)
    .notNull(),
  languagePairId: integer("language_pair_id")
    .references(() => languagePairs.id)
    .notNull(),
  currentUnitId: integer("current_unit_id")
    .references(() => units.id),
  currentSectionId: integer("current_section_id")
    .references(() => sections.id),
  currentLessonId: integer("current_lesson_id")
    .references(() => lessons.id),
  totalXp: integer("total_xp").notNull().default(0),
  streak: integer("streak").notNull().default(0),
  lastCompletedAt: timestamp("last_completed_at"),
});

// Lesson Progress table
export const lessonProgress = pgTable("lesson_progress", {
  id: serial("id").primaryKey(),
  userId: text("user_id")
    .references(() => userProgress.userId)
    .notNull(),
  lessonId: integer("lesson_id")
    .references(() => lessons.id)
    .notNull(),
  completed: boolean("completed").notNull().default(false),
  score: integer("score").notNull().default(0),
  mistakes: jsonb("mistakes"),
  completedAt: timestamp("completed_at"),
});

// Unit Test Results table
export const unitTestResults = pgTable("unit_test_results", {
  id: serial("id").primaryKey(),
  userId: text("user_id")
    .references(() => userProgress.userId)
    .notNull(),
  unitTestId: integer("unit_test_id")
    .references(() => unitTests.id)
    .notNull(),
  score: integer("score").notNull(),
  passed: boolean("passed").notNull(),
  unlockedUnits: integer("unlocked_units").array(),
  completedAt: timestamp("completed_at").notNull(),
});

// User Challenge Progress table
export const userChallengeProgress = pgTable("user_challenge_progress", {
  id: serial("id").primaryKey(),
  userId: text("user_id").references(() => userProgress.userId),
  challengeId: integer("challenge_id").references(() => challenges.id),
  completed: boolean("completed").notNull().default(false),
  attempts: integer("attempts").notNull().default(0),
  bestScore: integer("best_score"),
  lastAttemptAt: timestamp("last_attempt_at"),
  timeSpent: integer("time_spent"),
  mistakes: text("mistakes").array(),
});

// Code Reviews table
export const codeReviews = pgTable("code_reviews", {
  id: serial("id").primaryKey(),
  challengeId: integer("challenge_id").references(() => challenges.id),
  reviewerId: text("reviewer_id").references(() => userProgress.userId),
  code: text("code").notNull(),
  feedback: text("feedback").notNull(),
  rating: integer("rating").notNull(),
  issues: text("issues").array(),
  suggestions: text("suggestions").array(),
  helpfulness: integer("helpfulness").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Daily Quests table
export const dailyQuests = pgTable("daily_quests", {
  id: serial("id").primaryKey(),
  userId: text("user_id").references(() => userProgress.userId),
  type: questTypes("type").notNull(),
  description: text("description").notNull(),
  target: integer("target").notNull(),
  progress: integer("progress").notNull().default(0),
  completed: boolean("completed").notNull().default(false),
  xpReward: integer("xp_reward").notNull(),
  gemReward: integer("gem_reward").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
});

// Learning Clubs table
export const learningClubs = pgTable("learning_clubs", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  language: text("language").notNull(),
  level: difficultyLevel("level").notNull(),
  maxMembers: integer("max_members").notNull(),
  createdBy: text("created_by").references(() => userProgress.userId),
  isPrivate: boolean("is_private").notNull().default(false),
  inviteCode: text("invite_code"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Club Members table
export const clubMembers = pgTable("club_members", {
  id: serial("id").primaryKey(),
  clubId: integer("club_id").references(() => learningClubs.id),
  userId: text("user_id").references(() => userProgress.userId),
  role: text("role").notNull().default("member"),
  joinedAt: timestamp("joined_at").notNull().defaultNow(),
  contributionPoints: integer("contribution_points").notNull().default(0),
});

// Relations
export const userProgressRelations = relations(userProgress, ({ many }) => ({
  challenges: many(userChallengeProgress),
  reviews: many(codeReviews),
  quests: many(dailyQuests),
  clubs: many(clubMembers),
  languagePairs: many(languagePairProgress),
  completedLessons: many(lessonProgress),
  unitTestResults: many(unitTestResults),
}));

export const challengeRelations = relations(challenges, ({ one, many }) => ({
  language: one(programmingLanguages, {
    fields: [challenges.languageId],
    references: [programmingLanguages.id],
  }),
  concept: one(programmingConcepts, {
    fields: [challenges.conceptId],
    references: [programmingConcepts.id],
  }),
  progress: many(userChallengeProgress),
  reviews: many(codeReviews),
}));

export const learningClubRelations = relations(learningClubs, ({ many }) => ({
  members: many(clubMembers),
}));
