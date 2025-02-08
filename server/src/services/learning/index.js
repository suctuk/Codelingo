// src/services/learning/index.js
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

// Get learning path
router.get('/path/:language', authenticateToken, async (req, res) => {
  try {
    const { language } = req.params;
    const connection = await mysql.createConnection(dbConfig);

    // Get units with lessons and user progress
    const [units] = await connection.execute(
      `SELECT 
        u.id as unit_id, 
        u.title as unit_title,
        u.order_index,
        u.description,
        JSON_ARRAYAGG(
          JSON_OBJECT(
            'id', l.id,
            'title', l.title,
            'description', l.description,
            'xp_reward', l.xp_reward,
            'completed', CASE WHEN cl.completed_at IS NOT NULL THEN 1 ELSE 0 END
          )
        ) as lessons
       FROM units u
       LEFT JOIN lessons l ON l.unit_id = u.id
       LEFT JOIN completed_lessons cl ON cl.lesson_id = l.id AND cl.user_id = ?
       WHERE u.language = ?
       GROUP BY u.id
       ORDER BY u.order_index`,
      [req.user.userId, language]
    );

    // Process units to determine which are unlocked
    const processedUnits = units.map((unit, index) => {
      const lessons = JSON.parse(unit.lessons);
      const previousUnit = index > 0 ? units[index - 1] : null;
      const previousUnitCompleted = previousUnit
        ? JSON.parse(previousUnit.lessons).every(lesson => lesson.completed)
        : true;

      return {
        ...unit,
        lessons,
        unlocked: index === 0 || previousUnitCompleted,
      };
    });

    await connection.end();
    res.json(processedUnits);
  } catch (error) {
    console.error('Error fetching learning path:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get specific lesson content
router.get('/lesson/:lessonId', authenticateToken, async (req, res) => {
  try {
    const { lessonId } = req.params;
    const connection = await mysql.createConnection(dbConfig);

    // Get lesson details and exercises
    const [lessons] = await connection.execute(
      `SELECT 
        l.*,
        JSON_ARRAYAGG(
          JSON_OBJECT(
            'id', e.id,
            'type', e.type,
            'question', e.question,
            'options', e.options,
            'correct_answer', e.correct_answer,
            'explanation', e.explanation,
            'time_limit', e.time_limit
          )
        ) as exercises
       FROM lessons l
       LEFT JOIN exercises e ON e.lesson_id = l.id
       WHERE l.id = ?
       GROUP BY l.id`,
      [lessonId]
    );

    if (lessons.length === 0) {
      return res.status(404).json({ error: 'Lesson not found' });
    }

    const lesson = lessons[0];
    lesson.exercises = JSON.parse(lesson.exercises);

    await connection.end();
    res.json(lesson);
  } catch (error) {
    console.error('Error fetching lesson:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Submit exercise answer
router.post('/exercise/:exerciseId/submit', authenticateToken, async (req, res) => {
  try {
    const { exerciseId } = req.params;
    const { answer } = req.body;
    const connection = await mysql.createConnection(dbConfig);

    // Get exercise details
    const [exercises] = await connection.execute(
      'SELECT * FROM exercises WHERE id = ?',
      [exerciseId]
    );

    if (exercises.length === 0) {
      await connection.end();
      return res.status(404).json({ error: 'Exercise not found' });
    }

    const exercise = exercises[0];
    const isCorrect = answer === exercise.correct_answer;

    // Record attempt
    await connection.execute(
      `INSERT INTO exercise_attempts 
       (user_id, exercise_id, answer, is_correct, attempted_at)
       VALUES (?, ?, ?, ?, NOW())`,
      [req.user.userId, exerciseId, answer, isCorrect]
    );

    // Update user profile if correct
    if (isCorrect) {
      await connection.execute(
        'UPDATE user_profiles SET xp = xp + ? WHERE user_id = ?',
        [exercise.xp_reward, req.user.userId]
      );
    }

    await connection.end();
    res.json({
      correct: isCorrect,
      explanation: exercise.explanation,
      xp_earned: isCorrect ? exercise.xp_reward : 0
    });
  } catch (error) {
    console.error('Error submitting exercise:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get lesson progress
router.get('/progress/:lessonId', authenticateToken, async (req, res) => {
  try {
    const { lessonId } = req.params;
    const connection = await mysql.createConnection(dbConfig);

    const [progress] = await connection.execute(
      `SELECT 
        COUNT(DISTINCT ea.exercise_id) as completed_exercises,
        COUNT(DISTINCT e.id) as total_exercises,
        MAX(cl.completed_at) as completion_date
       FROM lessons l
       LEFT JOIN exercises e ON e.lesson_id = l.id
       LEFT JOIN exercise_attempts ea ON ea.exercise_id = e.id AND ea.user_id = ? AND ea.is_correct = 1
       LEFT JOIN completed_lessons cl ON cl.lesson_id = l.id AND cl.user_id = ?
       WHERE l.id = ?
       GROUP BY l.id`,
      [req.user.userId, req.user.userId, lessonId]
    );

    await connection.end();
    res.json(progress[0]);
  } catch (error) {
    console.error('Error fetching progress:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;