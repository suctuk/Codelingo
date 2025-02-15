-- Add hearts and last heart loss time to user_profiles
ALTER TABLE user_profiles
ADD COLUMN hearts INT DEFAULT 5 NOT NULL,
ADD COLUMN last_heart_loss_time TIMESTAMP NULL;

-- Create friend quests table
CREATE TABLE friend_quests (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    creator_id VARCHAR(255) NOT NULL,
    type ENUM('daily', 'weekly') NOT NULL,
    status ENUM('active', 'completed', 'expired') NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    end_time TIMESTAMP NOT NULL,
    completed_at TIMESTAMP NULL,
    goal INT NOT NULL,
    reward_xp INT NOT NULL,
    reward_gems INT NOT NULL,
    FOREIGN KEY (creator_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create quest participants table
CREATE TABLE quest_participants (
    quest_id BIGINT NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    progress INT DEFAULT 0 NOT NULL,
    joined_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (quest_id, user_id),
    FOREIGN KEY (quest_id) REFERENCES friend_quests(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Add unit bypass test history
CREATE TABLE unit_bypass_tests (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id VARCHAR(255) NOT NULL,
    score INT NOT NULL,
    units_bypassed INT NOT NULL,
    xp_earned INT NOT NULL,
    gems_earned INT NOT NULL,
    taken_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Add indices for performance
CREATE INDEX idx_user_profiles_hearts ON user_profiles(hearts);
CREATE INDEX idx_friend_quests_status ON friend_quests(status);
CREATE INDEX idx_friend_quests_end_time ON friend_quests(end_time);
CREATE INDEX idx_quest_participants_progress ON quest_participants(progress);
CREATE INDEX idx_unit_bypass_tests_user ON unit_bypass_tests(user_id);
