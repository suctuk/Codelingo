const express = require('express');
const router = express.Router();
const { createConnection } = require('../utils/database');
const { requireAuth } = require('../middleware/auth');

/**
 * Get available programming languages
 */
async function getLanguages(req, res) {
  let connection;
  try {
    connection = await createConnection();
    const [languages] = await connection.query(
      'SELECT * FROM programming_languages ORDER BY name'
    );
    
    res.json({ success: true, data: languages });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch languages'
    });
  } finally {
    if (connection) await connection.end();
  }
}

/**
 * Set user's language preferences and experience level
 */
async function setLanguagePreferences(req, res) {
  const { userId } = req.user;
  const { 
    preferredLanguageId,
    targetLanguageId,
    experienceLevel,
    dailyGoalMinutes
  } = req.body;

  let connection;
  try {
    connection = await createConnection();
    await connection.query(
      `UPDATE user_profiles 
       SET preferred_language_id = ?,
           target_language_id = ?,
           experience_level = ?,
           daily_goal_minutes = ?
       WHERE id = ?`,
      [preferredLanguageId, targetLanguageId, experienceLevel, dailyGoalMinutes, userId]
    );
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to update preferences'
    });
  } finally {
    if (connection) await connection.end();
  }
}

/**
 * Get user's learning path (units and their completion status)
 */
async function getLearningPath(req, res) {
  const { userId } = req.user;
  
  let connection;
  try {
    connection = await createConnection();
    
    // Get user's target language and progress
    const [[userProfile]] = await connection.query(
      `SELECT target_language_id, xp FROM user_profiles WHERE id = ?`,
      [userId]
    );

    if (!userProfile) {
      return res.status(404).json({
        success: false,
        error: 'User profile not found'
      });
    }

    // Get all units for the target language
    const [units] = await connection.query(
      `SELECT u.*,
              (SELECT COUNT(*) FROM user_lesson_progress ulp
               JOIN lessons l ON l.id = ulp.lesson_id
               JOIN sections s ON s.id = l.section_id
               WHERE s.unit_id = u.id AND ulp.user_id = ? AND ulp.completed = 1) as completed_lessons,
              (SELECT COUNT(*) FROM lessons l
               JOIN sections s ON s.id = l.section_id
               WHERE s.unit_id = u.id) as total_lessons
       FROM units u
       WHERE u.language_id = ?
       ORDER BY u.order_index`,
      [userId, userProfile.target_language_id]
    );

    // Calculate unit status (locked/unlocked/completed)
    const unitsWithStatus = units.map(unit => ({
      ...unit,
      status: unit.unlock_requirement > userProfile.xp ? 'locked' :
              unit.completed_lessons === unit.total_lessons ? 'completed' : 'unlocked'
    }));

    res.json({ 
      success: true,
      data: unitsWithStatus
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch learning path'
    });
  } finally {
    if (connection) await connection.end();
  }
}

/**
 * Get detailed unit information including sections and lessons
 */
async function getUnitDetails(req, res) {
  const { userId } = req.user;
  const { unitId } = req.params;
  
  let connection;
  try {
    connection = await createConnection();
    
    // Get unit info
    const [[unit]] = await connection.query(
      'SELECT * FROM units WHERE id = ?',
      [unitId]
    );

    if (!unit) {
      return res.status(404).json({
        success: false,
        error: 'Unit not found'
      });
    }

    // Get sections with their lessons
    const [sections] = await connection.query(
      `SELECT s.*,
              c.name as concept_name,
              c.description as concept_description,
              JSON_ARRAYAGG(
                JSON_OBJECT(
                  'id', l.id,
                  'title', l.title,
                  'description', l.description,
                  'lessonType', l.lesson_type,
                  'baseXp', l.base_xp,
                  'timeLimit', l.time_limit_seconds,
                  'completed', IFNULL(ulp.completed, 0)
                )
              ) as lessons
       FROM sections s
       JOIN programming_concepts c ON c.id = s.concept_id
       JOIN lessons l ON l.section_id = s.id
       LEFT JOIN user_lesson_progress ulp ON ulp.lesson_id = l.id AND ulp.user_id = ?
       WHERE s.unit_id = ?
       GROUP BY s.id
       ORDER BY s.order_index`,
      [userId, unitId]
    );

    res.json({
      success: true,
      data: {
        ...unit,
        sections: sections.map(section => ({
          ...section,
          lessons: JSON.parse(section.lessons)
        }))
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch unit details'
    });
  } finally {
    if (connection) await connection.end();
  }
}

/**
 * Get lesson content and track progress
 */
async function getLesson(req, res) {
  const { userId } = req.user;
  const { lessonId } = req.params;
  
  let connection;
  try {
    connection = await createConnection();
    
    // Get lesson info and content
    const [[lesson]] = await connection.query(
      `SELECT l.*, s.unit_id
       FROM lessons l
       JOIN sections s ON s.id = l.section_id
       WHERE l.id = ?`,
      [lessonId]
    );

    if (!lesson) {
      return res.status(404).json({
        success: false,
        error: 'Lesson not found'
      });
    }

    // Get lesson content
    const [content] = await connection.query(
      `SELECT id, content_type, question, options, hints, order_index
       FROM lesson_content
       WHERE lesson_id = ?
       ORDER BY order_index`,
      [lessonId]
    );

    // Track lesson start
    await connection.query(
      `INSERT INTO user_lesson_progress (user_id, lesson_id)
       VALUES (?, ?)
       ON DUPLICATE KEY UPDATE
       completed = FALSE,
       score = 0,
       mistakes = 0,
       time_spent_seconds = 0`,
      [userId, lessonId]
    );

    res.json({
      success: true,
      data: {
        ...lesson,
        content: content.map(item => ({
          ...item,
          options: JSON.parse(item.options),
          hints: JSON.parse(item.hints)
        }))
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch lesson'
    });
  } finally {
    if (connection) await connection.end();
  }
}

/**
 * Submit lesson answers and calculate results
 */
async function submitLesson(req, res) {
  const { userId } = req.user;
  const { lessonId } = req.params;
  const { 
    answers,
    timeSpentSeconds,
    hearts
  } = req.body;

  let connection;
  try {
    connection = await createConnection();
    await connection.beginTransaction();

    // Get lesson content with correct answers
    const [content] = await connection.query(
      `SELECT id, correct_answer, content_type
       FROM lesson_content
       WHERE lesson_id = ?
       ORDER BY order_index`,
      [lessonId]
    );

    // Calculate score and mistakes
    let correctCount = 0;
    let mistakes = 0;
    content.forEach((item, index) => {
      if (answers[index] === item.correct_answer) {
        correctCount++;
      } else {
        mistakes++;
      }
    });

    const score = Math.round((correctCount / content.length) * 100);
    const completed = score >= 60; // Pass threshold: 60%

    // Get lesson info for XP calculation
    const [[lesson]] = await connection.query(
      'SELECT base_xp, required_hearts FROM lessons WHERE id = ?',
      [lessonId]
    );

    // Calculate XP
    const baseXP = lesson.base_xp;
    const heartsLost = Math.min(mistakes, lesson.required_hearts);
    const remainingHearts = Math.max(0, hearts - heartsLost);

    // Get user's XP multiplier
    const [[userProgress]] = await connection.query(
      'SELECT xp_multiplier FROM user_progress WHERE user_id = ?',
      [userId]
    );

    const xpMultiplier = userProgress?.xp_multiplier || 1;
    const earnedXP = completed ? 
      Math.round(baseXP * (score / 100) * xpMultiplier) : 
      Math.round(baseXP * 0.2); // Minimum XP for attempting

    // Update user progress
    await connection.query(
      `UPDATE user_lesson_progress
       SET completed = ?,
           score = ?,
           mistakes = ?,
           time_spent_seconds = ?,
           completed_at = NOW()
       WHERE user_id = ? AND lesson_id = ?`,
      [completed, score, mistakes, timeSpentSeconds, userId, lessonId]
    );

    // Update user profile
    await connection.query(
      `UPDATE user_profiles
       SET xp = xp + ?,
           hearts = ?
       WHERE id = ?`,
      [earnedXP, remainingHearts, userId]
    );

    await connection.commit();

    res.json({
      success: true,
      data: {
        completed,
        score,
        mistakes,
        earnedXP,
        remainingHearts
      }
    });
  } catch (error) {
    if (connection) {
      await connection.rollback();
    }
    res.status(500).json({
      success: false,
      error: 'Failed to submit lesson'
    });
  } finally {
    if (connection) await connection.end();
  }
}

/**
 * Take a placement test to skip units
 */
async function takePlacementTest(req, res) {
  const { userId } = req.user;
  const { targetLanguageId } = req.body;

  let connection;
  try {
    connection = await createConnection();
    
    // Get test questions from various units
    const [questions] = await connection.query(
      `SELECT lc.*, l.base_xp, u.order_index as unit_order
       FROM lesson_content lc
       JOIN lessons l ON l.id = lc.lesson_id
       JOIN sections s ON s.id = l.section_id
       JOIN units u ON u.id = s.unit_id
       WHERE u.language_id = ?
       AND lc.content_type IN ('MULTIPLE_CHOICE', 'FILL_BLANK')
       ORDER BY RAND()
       LIMIT 20`,
      [targetLanguageId]
    );

    res.json({
      success: true,
      data: questions.map(q => ({
        ...q,
        options: JSON.parse(q.options),
        correct_answer: undefined // Don't send correct answers to client
      }))
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to generate placement test'
    });
  } finally {
    if (connection) await connection.end();
  }
}

/**
 * Submit placement test results
 */
async function submitPlacementTest(req, res) {
  const { userId } = req.user;
  const { 
    answers,
    questionIds,
    targetLanguageId
  } = req.body;

  let connection;
  try {
    connection = await createConnection();
    await connection.beginTransaction();

    // Get correct answers and question metadata
    const [questions] = await connection.query(
      `SELECT lc.id, lc.correct_answer, u.order_index as unit_order
       FROM lesson_content lc
       JOIN lessons l ON l.id = lc.lesson_id
       JOIN sections s ON s.id = l.section_id
       JOIN units u ON u.id = s.unit_id
       WHERE lc.id IN (?)`,
      [questionIds]
    );

    // Calculate results
    let correctByUnit = {};
    questions.forEach((q, index) => {
      if (answers[index] === q.correct_answer) {
        correctByUnit[q.unit_order] = (correctByUnit[q.unit_order] || 0) + 1;
      }
    });

    // Determine highest unit to unlock (need 70% correct in a unit to skip it)
    let highestUnitToUnlock = 0;
    Object.entries(correctByUnit).forEach(([unitOrder, correct]) => {
      const questionsInUnit = questions.filter(q => q.unit_order === parseInt(unitOrder)).length;
      if (correct / questionsInUnit >= 0.7) {
        highestUnitToUnlock = Math.max(highestUnitToUnlock, parseInt(unitOrder));
      }
    });

    // Calculate initial XP based on performance
    const totalCorrect = Object.values(correctByUnit).reduce((sum, count) => sum + count, 0);
    const initialXP = Math.round((totalCorrect / questions.length) * 1000); // Up to 1000 XP for perfect score

    // Update user profile
    await connection.query(
      `UPDATE user_profiles
       SET target_language_id = ?,
           xp = ?,
           hearts = 5
       WHERE id = ?`,
      [targetLanguageId, initialXP, userId]
    );

    // Mark earlier units as completed
    if (highestUnitToUnlock > 0) {
      const [units] = await connection.query(
        `SELECT u.id, 
                (SELECT GROUP_CONCAT(l.id) 
                 FROM lessons l 
                 JOIN sections s ON s.id = l.section_id 
                 WHERE s.unit_id = u.id) as lesson_ids
         FROM units u
         WHERE u.language_id = ? AND u.order_index < ?`,
        [targetLanguageId, highestUnitToUnlock]
      );

      // Mark lessons as completed
      for (const unit of units) {
        const lessonIds = unit.lesson_ids.split(',');
        await connection.query(
          `INSERT INTO user_lesson_progress (user_id, lesson_id, completed, score)
           VALUES ${lessonIds.map(() => '(?, ?, 1, 100)').join(',')}}`,
          lessonIds.flatMap(id => [userId, id])
        );
      }
    }

    await connection.commit();

    res.json({
      success: true,
      data: {
        initialXP,
        unlockedUnits: highestUnitToUnlock
      }
    });
  } catch (error) {
    if (connection) {
      await connection.rollback();
    }
    res.status(500).json({
      success: false,
      error: 'Failed to process placement test'
    });
  } finally {
    if (connection) await connection.end();
  }
}

// Routes
router.get('/languages', getLanguages);
router.post('/preferences', requireAuth, setLanguagePreferences);
router.get('/path', requireAuth, getLearningPath);
router.get('/units/:unitId', requireAuth, getUnitDetails);
router.get('/lessons/:lessonId', requireAuth, getLesson);
router.post('/lessons/:lessonId/submit', requireAuth, submitLesson);
router.post('/placement-test', requireAuth, takePlacementTest);
router.post('/placement-test/submit', requireAuth, submitPlacementTest);

module.exports = router;
