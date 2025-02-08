-- Create database
CREATE DATABASE IF NOT EXISTS code_learning_platform;
USE code_learning_platform;

-- Users table
CREATE TABLE users (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  stripe_customer_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User profiles table
CREATE TABLE user_profiles (
  user_id BIGINT PRIMARY KEY,
  xp INT DEFAULT 0,
  gems INT DEFAULT 100,
  hearts INT DEFAULT 5,
  streak INT DEFAULT 0,
  last_activity_date TIMESTAMP,
  preferred_language VARCHAR(50),
  target_language VARCHAR(50),
  experience_level VARCHAR(20),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Units table
CREATE TABLE units (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(100) NOT NULL,
  description TEXT,
  language VARCHAR(50) NOT NULL,
  order_index INT NOT NULL,
  prerequisites JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Lessons table
CREATE TABLE lessons (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  unit_id BIGINT NOT NULL,
  title VARCHAR(100) NOT NULL,
  description TEXT,
  content TEXT,
  xp_reward INT DEFAULT 10,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (unit_id) REFERENCES units(id)
);

-- Exercises table
CREATE TABLE exercises (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  lesson_id BIGINT NOT NULL,
  type ENUM('multiple_choice', 'coding', 'translation') NOT NULL,
  question TEXT NOT NULL,
  options JSON,
  correct_answer TEXT NOT NULL,
  explanation TEXT,
  time_limit INT,
  xp_reward INT DEFAULT 5,
  FOREIGN KEY (lesson_id) REFERENCES lessons(id)
);

-- Completed lessons table
CREATE TABLE completed_lessons (
  user_id BIGINT NOT NULL,
  lesson_id BIGINT NOT NULL,
  completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, lesson_id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (lesson_id) REFERENCES lessons(id)
);

-- Exercise attempts table
CREATE TABLE exercise_attempts (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL,
  exercise_id BIGINT NOT NULL,
  answer TEXT NOT NULL,
  is_correct BOOLEAN NOT NULL,
  attempted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (exercise_id) REFERENCES exercises(id)
);

-- Achievements table
CREATE TABLE achievements (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  criteria JSON,
  reward_gems INT DEFAULT 0
);

-- User achievements table
CREATE TABLE user_achievements (
  user_id BIGINT NOT NULL,
  achievement_id BIGINT NOT NULL,
  achieved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, achievement_id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (achievement_id) REFERENCES achievements(id)
);

-- Friendships table
CREATE TABLE friendships (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id_1 BIGINT NOT NULL,
  user_id_2 BIGINT NOT NULL,
  status ENUM('pending', 'accepted', 'rejected') NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id_1) REFERENCES users(id),
  FOREIGN KEY (user_id_2) REFERENCES users(id)
);

-- Friend quests table
CREATE TABLE friend_quests (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  creator_id BIGINT NOT NULL,
  friend_id BIGINT NOT NULL,
  type VARCHAR(50) NOT NULL,
  status ENUM('active', 'completed', 'failed') NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP,
  FOREIGN KEY (creator_id) REFERENCES users(id),
  FOREIGN KEY (friend_id) REFERENCES users(id)
);

-- Messages table
CREATE TABLE messages (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  sender_id BIGINT NOT NULL,
  recipient_id BIGINT NOT NULL,
  content TEXT NOT NULL,
  sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  read_at TIMESTAMP,
  FOREIGN KEY (sender_id) REFERENCES users(id),
  FOREIGN KEY (recipient_id) REFERENCES users(id)
);

-- Friend activities table
CREATE TABLE friend_activities (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL,
  type VARCHAR(50) NOT NULL,
  data JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Subscription plans table
CREATE TABLE subscription_plans (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  stripe_price_id VARCHAR(100) NOT NULL,
  features JSON NOT NULL,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User subscriptions table
CREATE TABLE user_subscriptions (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL,
  plan_id BIGINT NOT NULL,
  stripe_subscription_id VARCHAR(100) NOT NULL,
  status VARCHAR(50) NOT NULL,
  started_at TIMESTAMP NOT NULL,
  ended_at TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (plan_id) REFERENCES subscription_plans(id)
);

-- Gem transactions table
CREATE TABLE gem_transactions (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL,
  amount INT NOT NULL,
  reason VARCHAR(100) NOT NULL,
  transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Create indexes for performance
CREATE INDEX idx_friendships_users ON friendships(user_id_1, user_id_2);
CREATE INDEX idx_messages_users ON messages(sender_id, recipient_id);
CREATE INDEX idx_completed_lessons_user ON completed_lessons(user_id);
CREATE INDEX idx_exercise_attempts_user ON exercise_attempts(user_id);
CREATE INDEX idx_user_achievements_user ON user_achievements(user_id);
CREATE INDEX idx_friend_activities_user ON friend_activities(user_id);
CREATE INDEX idx_user_subscriptions_user ON user_subscriptions(user_id);
CREATE INDEX idx_gem_transactions_user ON gem_transactions(user_id);

-- Insert default subscription plans
INSERT INTO subscription_plans (name, description, price, stripe_price_id, features) VALUES
(
  'Tier 1',
  'Basic premium features including ad-free experience and unlimited hearts',
  9.99,
  'price_tier1_monthly',
  '{"ad_free": true, "unlimited_hearts": true, "streak_freezes": 5, "unit_skip": true}'
),
(
  'Tier 2',
  'All Tier 1 features plus AI tutor and personalized learning path',
  19.99,
  'price_tier2_monthly',
  '{"ad_free": true, "unlimited_hearts": true, "streak_freezes": 10, "unit_skip": true, "ai_tutor": true, "personalized_path": true}'
);

-- Insert some achievement types
INSERT INTO achievements (name, description, reward_gems) VALUES
('First Steps', 'Complete your first lesson', 10),
('Quick Learner', 'Complete 5 lessons in one day', 20),
('Streak Master', 'Maintain a 7-day streak', 30),
('Social Butterfly', 'Add 5 friends', 25),
('Perfect Score', 'Complete a unit with no mistakes', 50),
('Language Explorer', 'Try lessons in 3 different programming languages', 40),
('Helping Hand', 'Complete 5 friend quests', 35),
('Code Warrior', 'Earn 1000 XP', 45);