import { db } from '../db';
import { eq } from 'drizzle-orm';
import {
  userProgress,
  challenges,
  userChallengeProgress,
  dailyQuests,
  codeReviews,
} from '../db/schema';

const XP_MULTIPLIER = {
  STREAK_3: 1.5,
  STREAK_7: 2,
  STREAK_14: 2.5,
  STREAK_30: 3,
};

const DIFFICULTY_MULTIPLIER = {
  BEGINNER: 1,
  INTERMEDIATE: 1.5,
  ADVANCED: 2,
  EXPERT: 3,
};

export class GamificationService {
  async updateUserProgress(userId: string, challengeData: {
    challengeId: number;
    correctAnswers: number;
    totalQuestions: number;
    timeSpent: number;
    mistakes: string[];
    xpBoost?: number;
  }) {
    const {
      challengeId,
      correctAnswers,
      totalQuestions,
      timeSpent,
      mistakes,
      xpBoost = 1,
    } = challengeData;

    const user = await db.query.userProgress.findFirst({
      where: eq(userProgress.userId, userId),
    });

    if (!user) {
      throw new Error('User not found');
    }

    const challenge = await db.query.challenges.findFirst({
      where: eq(challenges.id, challengeId),
    });

    if (!challenge) {
      throw new Error('Challenge not found');
    }

    // Calculate accuracy and base XP
    const accuracy = correctAnswers / totalQuestions;
    let baseXP = challenge.xpReward * accuracy;

    // Apply difficulty multiplier
    baseXP *= DIFFICULTY_MULTIPLIER[challenge.difficulty];

    // Apply streak multiplier
    if (user.streakCount >= 30) baseXP *= XP_MULTIPLIER.STREAK_30;
    else if (user.streakCount >= 14) baseXP *= XP_MULTIPLIER.STREAK_14;
    else if (user.streakCount >= 7) baseXP *= XP_MULTIPLIER.STREAK_7;
    else if (user.streakCount >= 3) baseXP *= XP_MULTIPLIER.STREAK_3;

    // Apply user's XP multiplier and boost
    const totalXP = Math.round(baseXP * user.xpMultiplier * xpBoost);

    // Calculate gems earned (based on performance and time efficiency)
    const timeEfficiency = challenge.timeLimit ? Math.min(1, challenge.timeLimit / timeSpent) : 1;
    const gemsEarned = Math.round(challenge.gemReward * accuracy * timeEfficiency);

    // Update user progress
    await db
      .update(userProgress)
      .set({
        xp: user.xp + totalXP,
        gems: user.gems + gemsEarned,
        hearts: Math.min(user.hearts + (accuracy > 0.8 ? 1 : 0), 5),
        points: user.points + Math.round(totalXP * accuracy),
      })
      .where(eq(userProgress.userId, userId));

    // Update challenge progress
    await db.insert(userChallengeProgress).values({
      userId,
      challengeId,
      completed: accuracy >= 0.6,
      attempts: 1,
      bestScore: Math.round(accuracy * 100),
      timeSpent,
      mistakes,
    });

    // Check and update daily quests
    await this.updateDailyQuests(userId, {
      challengeType: challenge.type,
      xpEarned: totalXP,
      completed: accuracy >= 0.6,
    });

    return {
      xpEarned: totalXP,
      gemsEarned,
      accuracy: Math.round(accuracy * 100),
      streakCount: user.streakCount,
    };
  }

  async updateDailyQuests(userId: string, progress: {
    challengeType: string;
    xpEarned: number;
    completed: boolean;
  }) {
    const { challengeType, xpEarned, completed } = progress;

    const quests = await db.query.dailyQuests.findMany({
      where: eq(dailyQuests.userId, userId),
      and: eq(dailyQuests.completed, false),
    });

    for (const quest of quests) {
      let questProgress = quest.progress;

      switch (quest.type) {
        case 'LESSON_COMPLETION':
          if (completed) questProgress += 1;
          break;
        case 'XP_GAIN':
          questProgress += xpEarned;
          break;
        case 'CODE_REVIEW':
          if (challengeType === 'CODE_REVIEW') questProgress += 1;
          break;
        case 'BUG_FINDING':
          if (challengeType === 'SYNTAX_ERROR') questProgress += 1;
          break;
        case 'PERFORMANCE_OPTIMIZATION':
          if (challengeType === 'PERFORMANCE') questProgress += 1;
          break;
      }

      if (questProgress >= quest.target) {
        await db
          .update(dailyQuests)
          .set({
            progress: quest.target,
            completed: true,
          })
          .where(eq(dailyQuests.id, quest.id));

        // Award quest rewards
        await db
          .update(userProgress)
          .set({
            xp: { increment: quest.xpReward },
            gems: { increment: quest.gemReward },
          })
          .where(eq(userProgress.userId, userId));
      } else {
        await db
          .update(dailyQuests)
          .set({
            progress: questProgress,
          })
          .where(eq(dailyQuests.id, quest.id));
      }
    }
  }

  async updateStreak(userId: string) {
    const user = await db.query.userProgress.findFirst({
      where: eq(userProgress.userId, userId),
    });

    if (!user) {
      throw new Error('User not found');
    }

    const lastActive = user.lastActiveDate ? new Date(user.lastActiveDate) : null;
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    let newStreakCount = user.streakCount;
    let streakFreezeUsed = false;

    if (!lastActive || lastActive < yesterday) {
      if (user.streakFreezeCount > 0) {
        newStreakCount = user.streakCount;
        streakFreezeUsed = true;
      } else {
        newStreakCount = 0;
      }
    } else if (lastActive < today) {
      newStreakCount += 1;
    }

    await db
      .update(userProgress)
      .set({
        streakCount: newStreakCount,
        lastActiveDate: now,
        streakFreezeCount: streakFreezeUsed ? user.streakFreezeCount - 1 : user.streakFreezeCount,
      })
      .where(eq(userProgress.userId, userId));

    return {
      newStreakCount,
      streakFreezeUsed,
    };
  }

  async updateCodeReviewScore(userId: string, reviewData: {
    rating: number;
    helpfulness: number;
  }) {
    const { rating, helpfulness } = reviewData;

    const user = await db.query.userProgress.findFirst({
      where: eq(userProgress.userId, userId),
    });

    if (!user) {
      throw new Error('User not found');
    }

    const reviewScore = Math.round((rating + helpfulness) / 2);
    const xpEarned = reviewScore * 10;

    await db
      .update(userProgress)
      .set({
        reviewScore: user.reviewScore + reviewScore,
        xp: user.xp + xpEarned,
        contributionScore: user.contributionScore + 1,
      })
      .where(eq(userProgress.userId, userId));

    return {
      reviewScore,
      xpEarned,
    };
  }
}
