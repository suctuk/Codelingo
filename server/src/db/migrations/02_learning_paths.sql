-- Create programming_languages table
CREATE TABLE IF NOT EXISTS programming_languages (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    image_src VARCHAR(255) NOT NULL DEFAULT '/icons/default-language.svg',
    description TEXT NOT NULL
);

-- Create programming_concepts table
CREATE TABLE IF NOT EXISTS programming_concepts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    difficulty ENUM('BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT') NOT NULL DEFAULT 'BEGINNER',
    category VARCHAR(50) NOT NULL -- e.g., 'data_types', 'control_flow', 'functions', etc.
);

-- Create language_concepts table (mapping concepts to their implementation in each language)
CREATE TABLE IF NOT EXISTS language_concepts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    language_id INT NOT NULL,
    concept_id INT NOT NULL,
    implementation_example TEXT NOT NULL,
    explanation TEXT NOT NULL,
    FOREIGN KEY (language_id) REFERENCES programming_languages(id) ON DELETE CASCADE,
    FOREIGN KEY (concept_id) REFERENCES programming_concepts(id) ON DELETE CASCADE
);

-- Create units table
CREATE TABLE IF NOT EXISTS units (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    order_index INT NOT NULL,
    language_id INT NOT NULL,
    difficulty ENUM('BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT') NOT NULL,
    prerequisite_unit_id INT,
    unlock_requirement INT DEFAULT 0, -- XP required to unlock this unit
    icon_src VARCHAR(255) DEFAULT '/icons/default-unit.svg',
    FOREIGN KEY (language_id) REFERENCES programming_languages(id) ON DELETE CASCADE,
    FOREIGN KEY (prerequisite_unit_id) REFERENCES units(id) ON DELETE SET NULL
);

-- Create sections table (groupings within units)
CREATE TABLE IF NOT EXISTS sections (
    id INT PRIMARY KEY AUTO_INCREMENT,
    unit_id INT NOT NULL,
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    order_index INT NOT NULL,
    concept_id INT NOT NULL,
    FOREIGN KEY (unit_id) REFERENCES units(id) ON DELETE CASCADE,
    FOREIGN KEY (concept_id) REFERENCES programming_concepts(id) ON DELETE CASCADE
);

-- Create lessons table
CREATE TABLE IF NOT EXISTS lessons (
    id INT PRIMARY KEY AUTO_INCREMENT,
    section_id INT NOT NULL,
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    order_index INT NOT NULL,
    lesson_type ENUM('TUTORIAL', 'PRACTICE', 'CHALLENGE', 'REVIEW') NOT NULL,
    time_limit_seconds INT DEFAULT 300,
    base_xp INT DEFAULT 50,
    required_hearts INT DEFAULT 1,
    FOREIGN KEY (section_id) REFERENCES sections(id) ON DELETE CASCADE
);

-- Create lesson_content table
CREATE TABLE IF NOT EXISTS lesson_content (
    id INT PRIMARY KEY AUTO_INCREMENT,
    lesson_id INT NOT NULL,
    content_type ENUM('TEXT', 'CODE', 'MULTIPLE_CHOICE', 'FILL_BLANK', 'MATCHING', 'WORD_BANK') NOT NULL,
    question TEXT NOT NULL,
    correct_answer TEXT NOT NULL,
    explanation TEXT,
    options JSON, -- For multiple choice, matching, or word bank questions
    hints JSON,   -- Array of hint strings
    order_index INT NOT NULL,
    FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE
);

-- Add subscription-related fields to user_profiles
ALTER TABLE user_profiles
ADD COLUMN subscription_status ENUM('FREE', 'TIER_1', 'TIER_2') DEFAULT 'FREE',
ADD COLUMN stripe_customer_id VARCHAR(255),
ADD COLUMN stripe_subscription_id VARCHAR(255),
ADD COLUMN stripe_price_id VARCHAR(255),
ADD COLUMN stripe_current_period_end DATETIME,
ADD COLUMN preferred_language_id INT,
ADD COLUMN target_language_id INT,
ADD COLUMN experience_level ENUM('NOVICE', 'INTERMEDIATE', 'PROFICIENT', 'EXPERT') DEFAULT 'NOVICE',
ADD COLUMN daily_goal_minutes INT DEFAULT 10,
ADD COLUMN hearts INT DEFAULT 5,
ADD COLUMN gems INT DEFAULT 0,
ADD COLUMN streak_freeze_count INT DEFAULT 0,
ADD FOREIGN KEY (preferred_language_id) REFERENCES programming_languages(id),
ADD FOREIGN KEY (target_language_id) REFERENCES programming_languages(id);

-- Create user_customization table
CREATE TABLE IF NOT EXISTS user_customization (
    user_id INT PRIMARY KEY,
    selected_icon VARCHAR(255) DEFAULT '/mascots/default.svg',
    unlocked_icons JSON DEFAULT '[]',
    selected_theme VARCHAR(50) DEFAULT 'default',
    unlocked_themes JSON DEFAULT '[]',
    FOREIGN KEY (user_id) REFERENCES user_profiles(id) ON DELETE CASCADE
);

-- Create user_lesson_progress table
CREATE TABLE IF NOT EXISTS user_lesson_progress (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    lesson_id INT NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    score INT DEFAULT 0,
    mistakes INT DEFAULT 0,
    time_spent_seconds INT DEFAULT 0,
    completed_at DATETIME,
    FOREIGN KEY (user_id) REFERENCES user_profiles(id) ON DELETE CASCADE,
    FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE
);

-- Create friend_connections table
CREATE TABLE IF NOT EXISTS friend_connections (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    friend_id INT NOT NULL,
    status ENUM('PENDING', 'ACCEPTED', 'REJECTED') DEFAULT 'PENDING',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user_profiles(id) ON DELETE CASCADE,
    FOREIGN KEY (friend_id) REFERENCES user_profiles(id) ON DELETE CASCADE
);

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
    id INT PRIMARY KEY AUTO_INCREMENT,
    sender_id INT NOT NULL,
    receiver_id INT NOT NULL,
    content TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    read BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (sender_id) REFERENCES user_profiles(id) ON DELETE CASCADE,
    FOREIGN KEY (receiver_id) REFERENCES user_profiles(id) ON DELETE CASCADE
);

-- Create feed_items table
CREATE TABLE IF NOT EXISTS feed_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    type VARCHAR(50) NOT NULL,
    content TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user_profiles(id) ON DELETE CASCADE
);

-- Create friend_quests table
CREATE TABLE IF NOT EXISTS friend_quests (
    id INT PRIMARY KEY AUTO_INCREMENT,
    quest_name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    xp_reward INT NOT NULL,
    gem_reward INT NOT NULL,
    start_date DATETIME NOT NULL,
    end_date DATETIME NOT NULL,
    participants JSON NOT NULL, -- Array of user IDs
    completed BOOLEAN DEFAULT FALSE
);
