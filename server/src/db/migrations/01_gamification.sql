-- Add gamification fields to user_profiles table
ALTER TABLE user_profiles
ADD COLUMN IF NOT EXISTS xp INT DEFAULT 0,
ADD COLUMN IF NOT EXISTS streak_count INT DEFAULT 0,
ADD COLUMN IF NOT EXISTS last_activity_date DATETIME,
ADD COLUMN IF NOT EXISTS daily_quest_count INT DEFAULT 0,
ADD COLUMN IF NOT EXISTS consecutive_quest_days INT DEFAULT 0;

-- Create lessons table if it doesn't exist
CREATE TABLE IF NOT EXISTS lessons (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    base_xp INT DEFAULT 50,
    difficulty_level ENUM('beginner', 'intermediate', 'advanced') NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create user_lesson_progress table if it doesn't exist
CREATE TABLE IF NOT EXISTS user_lesson_progress (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    lesson_id INT NOT NULL,
    correct_answers INT DEFAULT 0,
    total_questions INT NOT NULL,
    xp_earned INT NOT NULL,
    completed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (lesson_id) REFERENCES lessons(id)
);
