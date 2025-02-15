const express = require('express');
const router = express.Router();
const { createConnection } = require('../utils/database');
const { requireAuth } = require('../middleware/auth');

// Subscription tiers and their features
const SUBSCRIPTION_TIERS = {
  FREE: {
    name: 'Free',
    features: [
      'Limited hearts',
      'Basic practice options',
      'Standard learning path'
    ]
  },
  TIER_1: {
    name: 'Premium',
    price: 9.99,
    features: [
      'Unlimited hearts',
      'No ads',
      'Advanced practice options',
      'Personalized Practice Hub',
      'Unit skipping tests',
      'Extra streak freezes'
    ]
  },
  TIER_2: {
    name: 'Premium Plus',
    price: 19.99,
    features: [
      'All Premium features',
      'AI Tutor assistance',
      'Personalized learning recommendations',
      'Advanced error analysis',
      'Priority support'
    ]
  }
};

/**
 * Get subscription plans and features
 */
async function getSubscriptionPlans(req, res) {
  try {
    res.json({
      success: true,
      data: SUBSCRIPTION_TIERS
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch subscription plans'
    });
  }
}

/**
 * Get user's current subscription status and features
 */
async function getSubscriptionStatus(req, res) {
  const { userId } = req.user;

  let connection;
  try {
    connection = await createConnection();
    
    const [[subscription]] = await connection.query(
      `SELECT subscription_status,
              stripe_subscription_id,
              stripe_current_period_end,
              hearts,
              streak_freeze_count
       FROM user_profiles
       WHERE id = ?`,
      [userId]
    );

    if (!subscription) {
      return res.status(404).json({
        success: false,
        error: 'User profile not found'
      });
    }

    const tier = SUBSCRIPTION_TIERS[subscription.subscription_status];
    const hasUnlimitedHearts = subscription.subscription_status !== 'FREE';

    res.json({
      success: true,
      data: {
        status: subscription.subscription_status,
        tier,
        hearts: hasUnlimitedHearts ? 'unlimited' : subscription.hearts,
        streakFreezes: subscription.streak_freeze_count,
        renewalDate: subscription.stripe_current_period_end,
        active: subscription.stripe_subscription_id !== null
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch subscription status'
    });
  } finally {
    if (connection) await connection.end();
  }
}

/**
 * Purchase hearts with gems
 */
async function purchaseHearts(req, res) {
  const { userId } = req.user;
  const { quantity } = req.body;
  const HEART_COST = 50; // gems per heart

  let connection;
  try {
    connection = await createConnection();
    await connection.beginTransaction();

    // Get user's current gems and subscription status
    const [[user]] = await connection.query(
      'SELECT gems, subscription_status FROM user_profiles WHERE id = ?',
      [userId]
    );

    if (user.subscription_status !== 'FREE') {
      return res.status(400).json({
        success: false,
        error: 'Premium subscribers have unlimited hearts'
      });
    }

    const totalCost = quantity * HEART_COST;
    if (user.gems < totalCost) {
      return res.status(400).json({
        success: false,
        error: 'Insufficient gems'
      });
    }

    // Update user's gems and hearts
    await connection.query(
      `UPDATE user_profiles 
       SET gems = gems - ?,
           hearts = hearts + ?
       WHERE id = ?`,
      [totalCost, quantity, userId]
    );

    await connection.commit();

    res.json({
      success: true,
      data: {
        gemsSpent: totalCost,
        heartsGained: quantity
      }
    });
  } catch (error) {
    if (connection) {
      await connection.rollback();
    }
    res.status(500).json({
      success: false,
      error: 'Failed to purchase hearts'
    });
  } finally {
    if (connection) await connection.end();
  }
}

/**
 * Purchase streak freeze with gems
 */
async function purchaseStreakFreeze(req, res) {
  const { userId } = req.user;
  const FREEZE_COST = 100; // gems per freeze
  const MAX_FREEZES = 2;

  let connection;
  try {
    connection = await createConnection();
    await connection.beginTransaction();

    // Get user's current gems and freeze count
    const [[user]] = await connection.query(
      'SELECT gems, streak_freeze_count FROM user_profiles WHERE id = ?',
      [userId]
    );

    if (user.streak_freeze_count >= MAX_FREEZES) {
      return res.status(400).json({
        success: false,
        error: 'Maximum streak freezes reached'
      });
    }

    if (user.gems < FREEZE_COST) {
      return res.status(400).json({
        success: false,
        error: 'Insufficient gems'
      });
    }

    // Update user's gems and freeze count
    await connection.query(
      `UPDATE user_profiles 
       SET gems = gems - ?,
           streak_freeze_count = streak_freeze_count + 1
       WHERE id = ?`,
      [FREEZE_COST, userId]
    );

    await connection.commit();

    res.json({
      success: true,
      data: {
        gemsSpent: FREEZE_COST,
        remainingGems: user.gems - FREEZE_COST,
        freezeCount: user.streak_freeze_count + 1
      }
    });
  } catch (error) {
    if (connection) {
      await connection.rollback();
    }
    res.status(500).json({
      success: false,
      error: 'Failed to purchase streak freeze'
    });
  } finally {
    if (connection) await connection.end();
  }
}

/**
 * Use a streak freeze to prevent streak loss
 */
async function useStreakFreeze(req, res) {
  const { userId } = req.user;

  let connection;
  try {
    connection = await createConnection();
    await connection.beginTransaction();

    // Get user's streak freeze count
    const [[user]] = await connection.query(
      'SELECT streak_freeze_count FROM user_profiles WHERE id = ?',
      [userId]
    );

    if (user.streak_freeze_count <= 0) {
      return res.status(400).json({
        success: false,
        error: 'No streak freezes available'
      });
    }

    // Use streak freeze
    await connection.query(
      `UPDATE user_profiles 
       SET streak_freeze_count = streak_freeze_count - 1,
           last_activity_date = NOW()
       WHERE id = ?`,
      [userId]
    );

    await connection.commit();

    res.json({
      success: true,
      data: {
        remainingFreezes: user.streak_freeze_count - 1
      }
    });
  } catch (error) {
    if (connection) {
      await connection.rollback();
    }
    res.status(500).json({
      success: false,
      error: 'Failed to use streak freeze'
    });
  } finally {
    if (connection) await connection.end();
  }
}

// AI Tutor responses for different scenarios
const AI_TUTOR_RESPONSES = {
  SYNTAX_ERROR: {
    explanation: "I noticed you're having trouble with syntax. Let's break down the correct structure:",
    examples: [
      "Here's a similar but simpler example to help you understand:",
      "Try following this pattern:"
    ],
    practice: "Let's practice with a few similar problems:"
  },
  LOGIC_ERROR: {
    explanation: "The logic in your solution needs some adjustment. Here's what's happening:",
    visualization: "Let's visualize how the code executes step by step:",
    alternative: "Here's an alternative approach that might be clearer:"
  },
  CONCEPT_MISUNDERSTANDING: {
    explanation: "Let's review this concept from a different angle:",
    realWorld: "Here's a real-world analogy that might help:",
    breakdown: "Breaking this down into smaller pieces:"
  }
};

/**
 * Get AI Tutor assistance (Premium Plus feature)
 */
async function getAITutorHelp(req, res) {
  const { userId } = req.user;
  const { 
    lessonId,
    questionId,
    userAnswer,
    errorType
  } = req.body;

  let connection;
  try {
    connection = await createConnection();
    
    // Verify premium plus subscription
    const [[user]] = await connection.query(
      'SELECT subscription_status FROM user_profiles WHERE id = ?',
      [userId]
    );

    if (user.subscription_status !== 'TIER_2') {
      return res.status(403).json({
        success: false,
        error: 'AI Tutor is a Premium Plus feature'
      });
    }

    // Get question details
    const [[question]] = await connection.query(
      `SELECT lc.*, l.title as lesson_title, pc.name as concept_name
       FROM lesson_content lc
       JOIN lessons l ON l.id = lc.lesson_id
       JOIN sections s ON s.id = l.section_id
       JOIN programming_concepts pc ON pc.id = s.concept_id
       WHERE lc.id = ?`,
      [questionId]
    );

    // Generate personalized help based on error type
    const tutorResponse = AI_TUTOR_RESPONSES[errorType] || AI_TUTOR_RESPONSES.CONCEPT_MISUNDERSTANDING;
    
    // Get similar questions for practice
    const [similarQuestions] = await connection.query(
      `SELECT lc.id, lc.question, lc.content_type
       FROM lesson_content lc
       JOIN lessons l ON l.id = lc.lesson_id
       JOIN sections s ON s.id = l.section_id
       WHERE s.concept_id = (
         SELECT concept_id 
         FROM sections s2 
         JOIN lessons l2 ON l2.section_id = s2.id 
         WHERE l2.id = ?
       )
       AND lc.id != ?
       ORDER BY RAND()
       LIMIT 3`,
      [lessonId, questionId]
    );

    res.json({
      success: true,
      data: {
        concept: question.concept_name,
        explanation: tutorResponse.explanation,
        correctAnswer: question.correct_answer,
        userMistake: userAnswer,
        helpContent: {
          ...tutorResponse,
          similarQuestions
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to get AI Tutor help'
    });
  } finally {
    if (connection) await connection.end();
  }
}

// Routes
router.get('/plans', getSubscriptionPlans);
router.get('/status', requireAuth, getSubscriptionStatus);
router.post('/hearts/purchase', requireAuth, purchaseHearts);
router.post('/streak-freeze/purchase', requireAuth, purchaseStreakFreeze);
router.post('/streak-freeze/use', requireAuth, useStreakFreeze);
router.post('/ai-tutor/help', requireAuth, getAITutorHelp);

module.exports = router;
