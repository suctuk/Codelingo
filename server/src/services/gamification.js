const express = require('express');
const router = express.Router();
const { createConnection } = require('../utils/database');
const { requireAuth } = require('../middleware/auth');
const GamificationService = require('./gamificationService');

// Constants
const DAILY_QUESTS_REQUIRED = 3;
const MIN_XP_PERCENTAGE = 0.2;
const DEFAULT_BASE_XP = 50;
const MAX_HEARTS = 5;
const HEART_REFILL_TIME = 4 * 60 * 60 * 1000; // 4 hours in milliseconds
const HEART_COST_GEMS = 5;

const gamificationService = new GamificationService();

/**
 * Calculate XP boost based on consecutive daily quest completions
 * @param {number} consecutiveDays - Number of consecutive days completing daily quests
 * @returns {number} XP multiplier
 */
function calculateXPBoost(consecutiveDays) {
  const boosts = {
    0: 1,    // No boost
    1: 1.5,  // 1.5x boost
    2: 2,    // 2x boost
    3: 3     // 3x boost (max)
  };
  return boosts[Math.min(consecutiveDays, 3)] || 1;
}

/**
 * Calculate XP for a lesson based on performance and boosts
 * @param {number} baseXP - Base XP for the lesson
 * @param {number} correctAnswers - Number of correct answers
 * @param {number} totalQuestions - Total number of questions
 * @param {number} xpBoost - Current XP boost multiplier
 * @returns {number} Final XP amount
 */
function calculateLessonXP(baseXP, correctAnswers, totalQuestions, xpBoost) {
  if (totalQuestions <= 0) throw new Error('Total questions must be greater than 0');
  if (correctAnswers < 0) throw new Error('Correct answers cannot be negative');
  if (correctAnswers > totalQuestions) throw new Error('Correct answers cannot exceed total questions');
  if (baseXP < 0) throw new Error('Base XP cannot be negative');
  if (xpBoost < 1) throw new Error('XP boost must be at least 1');

  const percentageCorrect = correctAnswers / totalQuestions;
  let xp = Math.round(baseXP * Math.max(percentageCorrect, MIN_XP_PERCENTAGE));
  return Math.round(xp * xpBoost);
}

/**
 * Update user's XP, streak, and daily quest progress
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
async function updateUserProgress(req, res) {
  const { userId } = req.user;
  const { 
    correctAnswers,
    totalQuestions,
    baseXP = DEFAULT_BASE_XP,
    isDailyQuest = false
  } = req.body;

  // Input validation
  if (!Number.isInteger(correctAnswers) || !Number.isInteger(totalQuestions)) {
    return res.status(400).json({
      success: false,
      error: 'Invalid input: correctAnswers and totalQuestions must be integers'
    });
  }

  let connection;
  try {
    connection = await createConnection();
    await connection.beginTransaction();

    // Get user's current profile
    const [userProfile] = await connection.query(
      `SELECT xp, streak_count, last_activity_date, 
              daily_quest_count, consecutive_quest_days
       FROM user_profiles 
       WHERE user_id = ?`,
      [userId]
    );

    if (!userProfile.length) {
      throw new Error('User profile not found');
    }

    const profile = userProfile[0];
    const now = new Date();
    const lastActivity = profile.last_activity_date ? new Date(profile.last_activity_date) : null;

    // Handle streak logic
    const { newStreak, newConsecutiveQuestDays, newDailyQuestCount } = 
      calculateStreakAndQuests(lastActivity, profile, isDailyQuest);

    // Calculate XP with boosts
    const xpBoost = calculateXPBoost(newConsecutiveQuestDays);
    const xpEarned = calculateLessonXP(baseXP, correctAnswers, totalQuestions, xpBoost);
    const newXP = profile.xp + xpEarned;

    // Update user profile
    await connection.query(
      `UPDATE user_profiles 
       SET xp = ?,
           streak_count = ?,
           last_activity_date = NOW(),
           daily_quest_count = ?,
           consecutive_quest_days = ?
       WHERE user_id = ?`,
      [newXP, newStreak, newDailyQuestCount, newConsecutiveQuestDays, userId]
    );

    await connection.commit();

    // Send response with detailed progress information
    res.json({
      success: true,
      data: {
        xp: newXP,
        xpEarned,
        xpBoost,
        streak: newStreak,
        dailyQuestProgress: {
          questCount: newDailyQuestCount,
          consecutiveDays: newConsecutiveQuestDays,
          questsRequired: DAILY_QUESTS_REQUIRED
        },
        message: formatProgressMessage(xpEarned, xpBoost)
      }
    });

  } catch (error) {
    if (connection) {
      await connection.rollback();
    }
    console.error('Error in updateUserProgress:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to update progress'
    });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

/**
 * Calculate new streak and quest progress
 * @param {Date} lastActivity - Last activity date
 * @param {Object} profile - User profile
 * @param {boolean} isDailyQuest - Whether this is a daily quest
 * @returns {Object} New streak and quest values
 */
function calculateStreakAndQuests(lastActivity, profile, isDailyQuest) {
  let newStreak = profile.streak_count;
  let newConsecutiveQuestDays = profile.consecutive_quest_days;
  let newDailyQuestCount = profile.daily_quest_count;

  if (lastActivity) {
    const lastActivityDate = new Date(lastActivity);
    lastActivityDate.setHours(0, 0, 0, 0);
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (lastActivityDate.getTime() === yesterday.getTime()) {
      newStreak += 1;
    } else if (lastActivityDate.getTime() < yesterday.getTime()) {
      newStreak = 1;
      newConsecutiveQuestDays = 0;
      newDailyQuestCount = 0;
    }
  } else {
    newStreak = 1;
  }

  if (isDailyQuest) {
    newDailyQuestCount += 1;
    if (newDailyQuestCount >= DAILY_QUESTS_REQUIRED) {
      newConsecutiveQuestDays += 1;
      newDailyQuestCount = 0;
    }
  }

  return { newStreak, newConsecutiveQuestDays, newDailyQuestCount };
}

/**
 * Format progress message
 * @param {number} xpEarned - XP earned
 * @param {number} xpBoost - XP boost multiplier
 * @returns {string} Formatted message
 */
function formatProgressMessage(xpEarned, xpBoost) {
  return `Earned ${xpEarned} XP${xpBoost > 1 ? ` (${xpBoost}x boost!)` : ''}`;
}

/**
 * Get user's current hearts and next refill time
 * @param {string} userId - User ID
 * @returns {Object} Hearts info
 */
async function getUserHearts(userId) {
  let connection;
  try {
    connection = await createConnection();
    const [result] = await connection.query(
      `SELECT hearts, last_heart_loss_time 
       FROM user_profiles 
       WHERE user_id = ?`,
      [userId]
    );

    if (!result.length) {
      throw new Error('User profile not found');
    }

    const profile = result[0];
    const now = new Date();
    const lastHeartLoss = profile.last_heart_loss_time ? new Date(profile.last_heart_loss_time) : null;

    // Calculate natural heart refills
    let heartsToAdd = 0;
    if (lastHeartLoss && profile.hearts < MAX_HEARTS) {
      const timeDiff = now.getTime() - lastHeartLoss.getTime();
      heartsToAdd = Math.floor(timeDiff / HEART_REFILL_TIME);
    }

    const newHearts = Math.min(profile.hearts + heartsToAdd, MAX_HEARTS);
    const nextRefillTime = lastHeartLoss ? 
      new Date(lastHeartLoss.getTime() + (Math.ceil(heartsToAdd) + 1) * HEART_REFILL_TIME) :
      null;

    if (heartsToAdd > 0) {
      await connection.query(
        `UPDATE user_profiles 
         SET hearts = ? 
         WHERE user_id = ?`,
        [newHearts, userId]
      );
    }

    return {
      hearts: newHearts,
      maxHearts: MAX_HEARTS,
      nextRefillTime,
    };
  } finally {
    if (connection) connection.release();
  }
}

/**
 * Purchase hearts using gems
 * @param {string} userId - User ID
 * @param {number} amount - Number of hearts to purchase
 * @returns {Object} Updated hearts and gems
 */
async function purchaseHearts(userId, amount) {
  let connection;
  try {
    connection = await createConnection();
    await connection.beginTransaction();

    const [userProfile] = await connection.query(
      `SELECT hearts, gems 
       FROM user_profiles 
       WHERE user_id = ?`,
      [userId]
    );

    if (!userProfile.length) {
      throw new Error('User profile not found');
    }

    const profile = userProfile[0];
    const totalCost = amount * HEART_COST_GEMS;

    if (profile.gems < totalCost) {
      throw new Error('Insufficient gems');
    }

    const newHearts = Math.min(profile.hearts + amount, MAX_HEARTS);
    const newGems = profile.gems - totalCost;

    await connection.query(
      `UPDATE user_profiles 
       SET hearts = ?, gems = ? 
       WHERE user_id = ?`,
      [newHearts, newGems, userId]
    );

    await connection.commit();
    return { hearts: newHearts, gems: newGems };
  } catch (error) {
    if (connection) await connection.rollback();
    throw error;
  } finally {
    if (connection) connection.release();
  }
}

/**
 * Start a friend quest
 * @param {string} userId - User ID
 * @param {string} questType - Quest type (daily/weekly)
 * @param {Array} friendIds - Array of friend IDs
 * @returns {Object} Created quest
 */
async function startFriendQuest(userId, questType, friendIds) {
  let connection;
  try {
    connection = await createConnection();
    await connection.beginTransaction();

    // Create quest
    const [result] = await connection.query(
      `INSERT INTO friend_quests (
        creator_id, type, status, created_at, 
        end_time, goal, reward_xp, reward_gems
      ) VALUES (?, ?, 'active', NOW(), 
        DATE_ADD(NOW(), INTERVAL ? DAY), ?, ?, ?)`,
      [
        userId,
        questType,
        questType === 'daily' ? 1 : 7,
        questType === 'daily' ? 10 : 50,
        questType === 'daily' ? 100 : 500,
        questType === 'daily' ? 10 : 50,
      ]
    );

    const questId = result.insertId;

    // Add participants
    const participants = [userId, ...friendIds];
    await Promise.all(participants.map(participantId =>
      connection.query(
        `INSERT INTO quest_participants (
          quest_id, user_id, progress, joined_at
        ) VALUES (?, ?, 0, NOW())`,
        [questId, participantId]
      )
    ));

    await connection.commit();
    return { questId, participants };
  } catch (error) {
    if (connection) await connection.rollback();
    throw error;
  } finally {
    if (connection) connection.release();
  }
}

/**
 * Update friend quest progress
 * @param {string} userId - User ID
 * @param {string} questId - Quest ID
 * @param {number} progress - New progress value
 * @returns {Object} Updated quest info
 */
async function updateQuestProgress(userId, questId, progress) {
  let connection;
  try {
    connection = await createConnection();
    await connection.beginTransaction();

    // Update participant progress
    await connection.query(
      `UPDATE quest_participants 
       SET progress = ? 
       WHERE quest_id = ? AND user_id = ?`,
      [progress, questId, userId]
    );

    // Check if quest is completed
    const [participants] = await connection.query(
      `SELECT user_id, progress 
       FROM quest_participants 
       WHERE quest_id = ?`,
      [questId]
    );

    const isCompleted = participants.every(p => p.progress >= 100);

    if (isCompleted) {
      // Update quest status
      await connection.query(
        `UPDATE friend_quests 
         SET status = 'completed', completed_at = NOW() 
         WHERE id = ?`,
        [questId]
      );

      // Award rewards to participants
      const [quest] = await connection.query(
        `SELECT reward_xp, reward_gems 
         FROM friend_quests 
         WHERE id = ?`,
        [questId]
      );

      await Promise.all(participants.map(participant =>
        connection.query(
          `UPDATE user_profiles 
           SET xp = xp + ?, gems = gems + ? 
           WHERE user_id = ?`,
          [quest[0].reward_xp, quest[0].reward_gems, participant.user_id]
        )
      ));
    }

    await connection.commit();
    return {
      isCompleted,
      participants: participants.map(p => ({
        userId: p.user_id,
        progress: p.progress,
      })),
    };
  } catch (error) {
    if (connection) await connection.rollback();
    throw error;
  } finally {
    if (connection) connection.release();
  }
}

/**
 * Take a unit bypass test
 * @param {string} userId - User ID
 * @param {number} score - Test score
 * @returns {Object} Units bypassed and rewards
 */
async function processUnitBypassTest(userId, score) {
  let connection;
  try {
    connection = await createConnection();
    await connection.beginTransaction();

    // Calculate units to bypass and rewards
    const unitsToBypass = Math.floor(score / 50);
    const xpEarned = score * 2;
    const gemsEarned = Math.floor(score / 10);

    // Update user progress
    await connection.query(
      `UPDATE user_profiles 
       SET units_completed = units_completed + ?,
           xp = xp + ?,
           gems = gems + ?
       WHERE user_id = ?`,
      [unitsToBypass, xpEarned, gemsEarned, userId]
    );

    await connection.commit();
    return {
      unitsToBypass,
      rewards: {
        xp: xpEarned,
        gems: gemsEarned,
      },
    };
  } catch (error) {
    if (connection) await connection.rollback();
    throw error;
  } finally {
    if (connection) connection.release();
  }
}

// Routes
router.post('/progress', requireAuth, updateUserProgress);

router.get('/hearts', requireAuth, async (req, res) => {
  try {
    const hearts = await getUserHearts(req.user.userId);
    res.json({ success: true, data: hearts });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post('/hearts/purchase', requireAuth, async (req, res) => {
  try {
    const { amount } = req.body;
    const result = await purchaseHearts(req.user.userId, amount);
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post('/quests/start', requireAuth, async (req, res) => {
  try {
    const { questType, friendIds } = req.body;
    const quest = await startFriendQuest(req.user.userId, questType, friendIds);
    res.json({ success: true, data: quest });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.put('/quests/:questId/progress', requireAuth, async (req, res) => {
  try {
    const { questId } = req.params;
    const { progress } = req.body;
    const result = await updateQuestProgress(req.user.userId, questId, progress);
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post('/bypass-test', requireAuth, async (req, res) => {
  try {
    const { score } = req.body;
    const result = await processUnitBypassTest(req.user.userId, score);
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Gamification routes
router.post('/gamification/award-xp', requireAuth, async (req, res) => {
  const { userId } = req.user;
  const { amount, source } = req.body;
  const result = await gamificationService.awardXP(userId, amount, source);
  res.json(result);
});

router.post('/gamification/update-streak', requireAuth, async (req, res) => {
  const { userId } = req.user;
  const streak = await gamificationService.updateStreak(userId);
  res.json({ streak });
});

router.post('/gamification/complete-quest', requireAuth, async (req, res) => {
  const { userId } = req.user;
  const { questId } = req.body;
  const result = await gamificationService.completeQuest(userId, questId);
  res.json(result);
});

router.post('/gamification/generate-daily-quests', requireAuth, async (req, res) => {
  const { userId } = req.user;
  const quests = await gamificationService.generateDailyQuests(userId);
  res.json(quests);
});

router.post('/gamification/check-achievements', requireAuth, async (req, res) => {
  const { userId } = req.user;
  const achievements = await gamificationService.checkAchievements(userId);
  res.json(achievements);
});

router.post('/gamification/get-friends-leaderboard', requireAuth, async (req, res) => {
  const { userId } = req.user;
  const leaderboard = await gamificationService.getFriendsLeaderboard(userId);
  res.json(leaderboard);
});

import { UserProfile, UserProgress, FriendQuest } from '../models/userProfile';

export class GamificationService {
  private static readonly XP_PER_CORRECT = 10;
  private static readonly XP_PER_INCORRECT = -5;
  private static readonly GEMS_PER_STREAK_MILESTONE = 5;
  private static readonly HEARTS_MAX = 5;
  private static readonly STREAK_FREEZE_COST = 20; // gems
  private static readonly HEART_REFILL_COST = 15; // gems
  private static readonly TIMER_EXTENSION_COST = 10; // gems

  async updateUserProgress(userId: string, exerciseResult: {
    correct: boolean;
    unitId: string;
    timeSpent: number;
    mistakeType?: string;
  }): Promise<UserProgress> {
    const user = await this.getUserProfile(userId);
    const progress = user.progress;

    if (exerciseResult.correct) {
      progress.xp += GamificationService.XP_PER_CORRECT;
      this.checkStreakMilestone(progress);
    } else {
      progress.xp = Math.max(0, progress.xp + GamificationService.XP_PER_INCORRECT);
      progress.hearts--;
      
      if (progress.hearts <= 0 && !user.subscription.features.unlimitedHearts) {
        await this.lockProgress(userId);
      }

      // Track mistake for Practice Hub
      if (exerciseResult.mistakeType) {
        await this.updatePracticeHub(userId, exerciseResult.mistakeType);
      }
    }

    // Update unit progress
    if (!progress.completedUnits.includes(exerciseResult.unitId)) {
      progress.completedUnits.push(exerciseResult.unitId);
      await this.unlockNextUnits(userId, exerciseResult.unitId);
    }

    return this.saveProgress(userId, progress);
  }

  async useGems(userId: string, action: 'freezeStreak' | 'refillHearts' | 'extendTimer'): Promise<boolean> {
    const user = await this.getUserProfile(userId);
    let cost = 0;

    switch (action) {
      case 'freezeStreak':
        cost = GamificationService.STREAK_FREEZE_COST;
        break;
      case 'refillHearts':
        cost = GamificationService.HEART_REFILL_COST;
        break;
      case 'extendTimer':
        cost = GamificationService.TIMER_EXTENSION_COST;
        break;
    }

    if (user.progress.gems < cost) {
      return false;
    }

    user.progress.gems -= cost;
    
    switch (action) {
      case 'freezeStreak':
        user.progress.streakFreezes++;
        break;
      case 'refillHearts':
        user.progress.hearts = GamificationService.HEARTS_MAX;
        break;
      case 'extendTimer':
        // Timer extension handled by exercise component
        break;
    }

    await this.saveProgress(userId, user.progress);
    return true;
  }

  async startFriendQuest(userId: string, friendIds: string[]): Promise<FriendQuest> {
    const quest: FriendQuest = {
      id: generateId(),
      participants: [userId, ...friendIds],
      targetStreak: 7,
      currentStreak: 0,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      rewards: {
        xp: 100,
        gems: 20
      }
    };

    await this.saveFriendQuest(quest);
    await this.notifyQuestParticipants(quest);
    return quest;
  }

  private async checkStreakMilestone(progress: UserProgress): Promise<void> {
    const milestoneReached = progress.streak > 0 && progress.streak % 5 === 0;
    if (milestoneReached) {
      progress.gems += GamificationService.GEMS_PER_STREAK_MILESTONE;
    }
  }

  private async updatePracticeHub(userId: string, mistakeType: string): Promise<void> {
    const user = await this.getUserProfile(userId);
    const mistake = user.practiceHub.mistakeTypes.find(m => m.category === mistakeType);

    if (mistake) {
      mistake.count++;
      mistake.lastPracticed = new Date();
    } else {
      user.practiceHub.mistakeTypes.push({
        category: mistakeType,
        count: 1,
        lastPracticed: new Date()
      });
    }

    await this.saveUserProfile(user);
  }

  // Additional methods for leaderboard, notifications, etc.
  {{ ... }}
}

const ACHIEVEMENT_TYPES = {
  // XP Achievements
  XP_MILESTONES: [100, 500, 1000, 5000, 10000],
  
  // Streak Achievements
  STREAK_MILESTONES: [7, 30, 100, 365],
  
  // Challenge Achievements
  PERFECT_LESSONS: [1, 10, 50, 100],
  FAST_LEARNER: [5, 20, 100],
  CODE_REVIEWER: [10, 50, 200],
  PATTERN_MASTER: [5, 25, 100],
  COMPLEXITY_EXPERT: [5, 25, 100],
  
  // Social Achievements
  FRIEND_MILESTONES: [1, 5, 10, 50],
  TEAM_COMPETITIONS: [1, 5, 20, 100],
  LEAGUE_PROMOTIONS: ['SILVER', 'GOLD', 'PLATINUM', 'DIAMOND'],
  
  // Special Achievements
  LANGUAGE_PAIRS: [1, 3, 5, 10],
  CONTRIBUTIONS: [1, 10, 50, 200],
  MENTOR_POINTS: [100, 500, 2000, 10000],
};

const ACHIEVEMENT_ICONS = {
  xp: '🏆',
  streak: '🔥',
  perfect: '⭐',
  fast: '⚡',
  reviewer: '👀',
  pattern: '🧩',
  complexity: '⚖️',
  friend: '👥',
  team: '🤝',
  league: '🏅',
  language: '🌐',
  contribution: '🛠️',
  mentor: '👨‍🏫',
};

export class GamificationService {
  async checkAndAwardAchievements(user) {
    const newAchievements = [];

    // XP Milestones
    for (const milestone of ACHIEVEMENT_TYPES.XP_MILESTONES) {
      if (user.xp >= milestone && !user.achievements.some(a => a.type === `xp_${milestone}`)) {
        newAchievements.push(await this.createAchievement(user.id, {
          type: `xp_${milestone}`,
          title: `XP Master ${milestone}`,
          description: `Earned ${milestone} XP`,
          icon: ACHIEVEMENT_ICONS.xp,
        }));
      }
    }

    // Perfect Lessons
    for (const count of ACHIEVEMENT_TYPES.PERFECT_LESSONS) {
      const perfectLessons = await prisma.lessonProgress.count({
        where: {
          userId: user.id,
          score: 100,
        },
      });
      
      if (perfectLessons >= count && !user.achievements.some(a => a.type === `perfect_${count}`)) {
        newAchievements.push(await this.createAchievement(user.id, {
          type: `perfect_${count}`,
          title: `Perfect ${count}`,
          description: `Complete ${count} lessons with a perfect score`,
          icon: ACHIEVEMENT_ICONS.perfect,
        }));
      }
    }

    // Fast Learner
    for (const count of ACHIEVEMENT_TYPES.FAST_LEARNER) {
      const fastLessons = await prisma.lessonProgress.count({
        where: {
          userId: user.id,
          completionTime: {
            lt: 60, // Less than 60 seconds
          },
        },
      });
      
      if (fastLessons >= count && !user.achievements.some(a => a.type === `fast_${count}`)) {
        newAchievements.push(await this.createAchievement(user.id, {
          type: `fast_${count}`,
          title: `Speed Demon ${count}`,
          description: `Complete ${count} lessons in under 60 seconds`,
          icon: ACHIEVEMENT_ICONS.fast,
        }));
      }
    }

    // Code Review Master
    for (const count of ACHIEVEMENT_TYPES.CODE_REVIEWER) {
      const reviews = await prisma.codeReview.count({
        where: {
          reviewerId: user.id,
          helpful: true,
        },
      });
      
      if (reviews >= count && !user.achievements.some(a => a.type === `reviewer_${count}`)) {
        newAchievements.push(await this.createAchievement(user.id, {
          type: `reviewer_${count}`,
          title: `Code Reviewer ${count}`,
          description: `Provide ${count} helpful code reviews`,
          icon: ACHIEVEMENT_ICONS.reviewer,
        }));
      }
    }

    // Pattern Recognition
    for (const count of ACHIEVEMENT_TYPES.PATTERN_MASTER) {
      const patterns = await prisma.lessonProgress.count({
        where: {
          userId: user.id,
          lessonType: 'pattern_matching',
          score: 100,
        },
      });
      
      if (patterns >= count && !user.achievements.some(a => a.type === `pattern_${count}`)) {
        newAchievements.push(await this.createAchievement(user.id, {
          type: `pattern_${count}`,
          title: `Pattern Master ${count}`,
          description: `Master ${count} design patterns`,
          icon: ACHIEVEMENT_ICONS.pattern,
        }));
      }
    }

    // Complexity Analysis
    for (const count of ACHIEVEMENT_TYPES.COMPLEXITY_EXPERT) {
      const complexityLessons = await prisma.lessonProgress.count({
        where: {
          userId: user.id,
          lessonType: 'time_complexity',
          score: 100,
        },
      });
      
      if (complexityLessons >= count && !user.achievements.some(a => a.type === `complexity_${count}`)) {
        newAchievements.push(await this.createAchievement(user.id, {
          type: `complexity_${count}`,
          title: `Complexity Expert ${count}`,
          description: `Master ${count} algorithm complexity analyses`,
          icon: ACHIEVEMENT_ICONS.complexity,
        }));
      }
    }

    // Social Achievements
    const friends = await prisma.friendship.count({
      where: {
        OR: [
          { userId: user.id },
          { friendId: user.id },
        ],
        status: 'ACCEPTED',
      },
    });

    for (const count of ACHIEVEMENT_TYPES.FRIEND_MILESTONES) {
      if (friends >= count && !user.achievements.some(a => a.type === `friend_${count}`)) {
        newAchievements.push(await this.createAchievement(user.id, {
          type: `friend_${count}`,
          title: `Social Butterfly ${count}`,
          description: `Make ${count} friends`,
          icon: ACHIEVEMENT_ICONS.friend,
        }));
      }
    }

    // If new achievements were earned, play sound and vibrate
    if (newAchievements.length > 0) {
      sounds.achievement.play();
      Vibration.vibrate([0, 100, 50, 100]);
    }

    return newAchievements;
  }

  async createAchievement(userId, achievement) {
    const created = await prisma.achievement.create({
      data: {
        userId,
        ...achievement,
      },
    });

    // Notify friends
    await this.notifyFriendsOfAchievement(userId, created);

    return created;
  }

  async notifyFriendsOfAchievement(userId, achievement) {
    const friends = await prisma.friendship.findMany({
      where: {
        OR: [
          { userId },
          { friendId: userId },
        ],
        status: 'ACCEPTED',
      },
      include: {
        user: true,
        friend: true,
      },
    });

    const notifications = friends.map(friendship => {
      const friendId = friendship.userId === userId ? friendship.friendId : friendship.userId;
      return prisma.notification.create({
        data: {
          userId: friendId,
          type: 'ACHIEVEMENT',
          title: 'Friend Achievement Unlocked!',
          message: `Your friend unlocked "${achievement.title}"!`,
          metadata: {
            achievementId: achievement.id,
            achievementTitle: achievement.title,
            achievementIcon: achievement.icon,
          },
        },
      });
    });

    await Promise.all(notifications);
  }

  async getLeaderboardForChallenge(challengeId) {
    return await prisma.lessonProgress.findMany({
      where: {
        lessonId: challengeId,
      },
      select: {
        user: {
          select: {
            id: true,
            username: true,
            avatar: true,
          },
        },
        score: true,
        completionTime: true,
      },
      orderBy: [
        { score: 'desc' },
        { completionTime: 'asc' },
      ],
      take: 100,
    });
  }

  async startTeamCompetition(teamId, challengeType) {
    const competition = await prisma.teamCompetition.create({
      data: {
        teamId,
        challengeType,
        startTime: new Date(),
        endTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week
      },
    });

    // Notify team members
    const team = await prisma.team.findUnique({
      where: { id: teamId },
      include: { members: true },
    });

    const notifications = team.members.map(member =>
      prisma.notification.create({
        data: {
          userId: member.id,
          type: 'COMPETITION_START',
          title: 'New Team Competition!',
          message: `A new ${challengeType} competition has started!`,
          metadata: {
            competitionId: competition.id,
            challengeType,
          },
        },
      })
    );

    await Promise.all(notifications);

    return competition;
  }

  {{ ... }}
}

module.exports = router;
