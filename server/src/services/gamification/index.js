// src/services/gamification/index.js
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

// Get leaderboard
router.get('/leaderboard', authenticateToken, async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    
    const [leaderboard] = await connection.execute(
      `SELECT 
        u.username,
        up.xp,
        up.streak,
        COUNT(DISTINCT cl.lesson_id) as lessons_completed
       FROM user_profiles up
       JOIN users u ON u.id = up.user_id
       LEFT JOIN completed_lessons cl ON cl.user_id = up.user_id
       GROUP BY up.user_id
       ORDER BY up.xp DESC
       LIMIT 100`,
    );

    await connection.end();
    res.json(leaderboard);
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get user achievements
router.get('/achievements', authenticateToken, async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    
    const [achievements] = await connection.execute(
      `SELECT 
        a.*,
        CASE WHEN ua.achieved_at IS NOT NULL THEN 1 ELSE 0 END as achieved,
        ua.achieved_at
       FROM achievements a
       LEFT JOIN user_achievements ua ON ua.achievement_id = a.id AND ua.user_id = ?`,
      [req.user.userId]
    );

    await connection.end();
    res.json(achievements);
  } catch (error) {
    console.error('Error fetching achievements:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update gems
router.post('/gems/update', authenticateToken, async (req, res) => {
  try {
    const { amount, reason } = req.body;
    const connection = await mysql.createConnection(dbConfig);

    await connection.beginTransaction();

    try {
      // Get current gems
      const [currentGems] = await connection.execute(
        'SELECT gems FROM user_profiles WHERE user_id = ?',
        [req.user.userId]
      );

      const newGemAmount = currentGems[0].gems + amount;
      
      if (newGemAmount < 0) {
        throw new Error('Insufficient gems');
      }

      // Update gems
      await connection.execute(
        'UPDATE user_profiles SET gems = ? WHERE user_id = ?',
        [newGemAmount, req.user.userId]
      );

      // Record transaction
      await connection.execute(
        `INSERT INTO gem_transactions 
         (user_id, amount, reason, transaction_date)
         VALUES (?, ?, ?, NOW())`,
        [req.user.userId, amount, reason]
      );

      await connection.commit();
      res.json({ 
        message: 'Gems updated successfully',
        new_balance: newGemAmount
      });
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      await connection.end();
    }
  } catch (error) {
    console.error('Error updating gems:', error);
    if (error.message === 'Insufficient gems') {
      res.status(400).json({ error: 'Insufficient gems' });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});

// Handle hearts/lives
router.post('/hearts/update', authenticateToken, async (req, res) => {
  try {
    const { amount } = req.body;
    const connection = await mysql.createConnection(dbConfig);

    await connection.beginTransaction();

    try {
      // Get current hearts
      const [currentHearts] = await connection.execute(
        'SELECT hearts FROM user_profiles WHERE user_id = ?',
        [req.user.userId]
      );

      const newHeartAmount = currentHearts[0].hearts + amount;
      
      if (newHeartAmount < 0) {
        throw new Error('No hearts remaining');
      }

      // Update hearts
      await connection.execute(
        'UPDATE user_profiles SET hearts = ? WHERE user_id = ?',
        [newHeartAmount, req.user.userId]
      );

      await connection.commit();
      res.json({ 
        message: 'Hearts updated successfully',
        hearts_remaining: newHeartAmount
      });
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      await connection.end();
    }
  } catch (error) {
    console.error('Error updating hearts:', error);
    if (error.message === 'No hearts remaining') {
      res.status(400).json({ error: 'No hearts remaining' });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});

module.exports = router;