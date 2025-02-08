// src/services/user/index.js
const express = require('express');
const mysql = require('mysql2/promise');
const { authenticateToken } = require('../auth');

const router = express.Router();

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

// Get user profile
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [profiles] = await connection.execute(
      `SELECT up.*, u.username, u.email,
        (SELECT COUNT(*) FROM completed_lessons WHERE user_id = up.user_id) as completed_lessons
       FROM user_profiles up
       JOIN users u ON u.id = up.user_id
       WHERE up.user_id = ?`,
      [req.user.userId]
    );

    await connection.end();

    if (profiles.length === 0) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    res.json(profiles[0]);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update user preferences
router.put('/preferences', authenticateToken, async (req, res) => {
  try {
    const { preferred_language, target_language, experience_level } = req.body;
    const connection = await mysql.createConnection(dbConfig);

    await connection.execute(
      `UPDATE user_profiles 
       SET preferred_language = ?, target_language = ?, experience_level = ?
       WHERE user_id = ?`,
      [preferred_language, target_language, experience_level, req.user.userId]
    );

    await connection.end();
    res.json({ message: 'Preferences updated successfully' });
  } catch (error) {
    console.error('Error updating preferences:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update user progress
router.post('/progress', authenticateToken, async (req, res) => {
  try {
    const { lesson_id, xp_earned, completed } = req.body;
    const connection = await mysql.createConnection(dbConfig);

    await connection.beginTransaction();

    try {
      // Update XP
      await connection.execute(
        'UPDATE user_profiles SET xp = xp + ? WHERE user_id = ?',
        [xp_earned, req.user.userId]
      );

      // Record completed lesson
      if (completed) {
        await connection.execute(
          `INSERT INTO completed_lessons (user_id, lesson_id, completed_at) 
           VALUES (?, ?, NOW())
           ON DUPLICATE KEY UPDATE completed_at = NOW()`,
          [req.user.userId, lesson_id]
        );
      }

      await connection.commit();
      res.json({ message: 'Progress updated successfully' });
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      await connection.end();
    }
  } catch (error) {
    console.error('Error updating progress:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get user streak
router.get('/streak', authenticateToken, async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [streaks] = await connection.execute(
      `SELECT streak, last_activity_date 
       FROM user_profiles 
       WHERE user_id = ?`,
      [req.user.userId]
    );

    await connection.end();

    if (streaks.length === 0) {
      return res.status(404).json({ error: 'Streak information not found' });
    }

    const { streak, last_activity_date } = streaks[0];
    const today = new Date();
    const lastActivity = new Date(last_activity_date);

    // Check if streak is broken (more than 1 day since last activity)
    const daysSinceLastActivity = Math.floor(
      (today - lastActivity) / (1000 * 60 * 60 * 24)
    );

    res.json({
      current_streak: daysSinceLastActivity > 1 ? 0 : streak,
      days_since_last_activity: daysSinceLastActivity,
    });
  } catch (error) {
    console.error('Error fetching streak:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update streak
router.post('/streak/update', authenticateToken, async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [currentStreak] = await connection.execute(
      `SELECT streak, last_activity_date 
       FROM user_profiles 
       WHERE user_id = ?`,
      [req.user.userId]
    );

    const today = new Date();
    const lastActivity = new Date(currentStreak[0].last_activity_date);
    const daysSinceLastActivity = Math.floor(
      (today - lastActivity) / (1000 * 60 * 60 * 24)
    );

    let newStreak = currentStreak[0].streak;

    if (daysSinceLastActivity === 1) {
      // Consecutive day, increment streak
      newStreak += 1;
    } else if (daysSinceLastActivity > 1) {
      // Streak broken, reset to 1
      newStreak = 1;
    }

    await connection.execute(
      `UPDATE user_profiles 
       SET streak = ?, last_activity_date = NOW() 
       WHERE user_id = ?`,
      [newStreak, req.user.userId]
    );

    await connection.end();
    res.json({ message: 'Streak updated successfully', new_streak: newStreak });
  } catch (error) {
    console.error('Error updating streak:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;