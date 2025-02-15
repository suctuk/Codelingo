import { PrismaClient } from '@prisma/client';
import { EventEmitter } from 'events';

const prisma = new PrismaClient();

interface Achievement {
  id: string;
  title: string;
  description: string;
  category: AchievementCategory;
  type: AchievementType;
  tier: AchievementTier;
  points: number;
  requirements: AchievementRequirement[];
  icon: string;
  unlockedIcon: string;
}

type AchievementCategory =
  | 'learning'
  | 'social'
  | 'challenges'
  | 'streaks'
  | 'mastery'
  | 'community'
  | 'competition';

type AchievementType =
  | 'milestone'    // One-time achievements
  | 'progressive'  // Multiple tiers
  | 'hidden'       // Secret achievements
  | 'seasonal'     // Time-limited
  | 'competitive'; // Leaderboard-based

type AchievementTier = 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';

interface AchievementRequirement {
  type: string;
  value: number;
  operator: 'equals' | 'greater' | 'less' | 'between';
  compareValue?: number;
}

export class AchievementService {
  private eventEmitter: EventEmitter;
  private achievementDefinitions: Map<string, Achievement>;

  constructor() {
    this.eventEmitter = new EventEmitter();
    this.achievementDefinitions = new Map();
    this.initializeAchievements();
  }

  private initializeAchievements() {
    // Learning Achievements
    this.registerAchievement({
      id: 'first_lesson',
      title: 'First Steps',
      description: 'Complete your first lesson',
      category: 'learning',
      type: 'milestone',
      tier: 'bronze',
      points: 10,
      requirements: [{ type: 'lessons_completed', value: 1, operator: 'equals' }],
      icon: '/icons/achievements/first-lesson.svg',
      unlockedIcon: '/icons/achievements/first-lesson-unlocked.svg',
    });

    this.registerAchievement({
      id: 'perfect_streak',
      title: 'Perfect Perfectionist',
      description: 'Complete 10 lessons with perfect scores',
      category: 'learning',
      type: 'progressive',
      tier: 'silver',
      points: 50,
      requirements: [{ type: 'perfect_lessons', value: 10, operator: 'greater' }],
      icon: '/icons/achievements/perfect-streak.svg',
      unlockedIcon: '/icons/achievements/perfect-streak-unlocked.svg',
    });

    // Social Achievements
    this.registerAchievement({
      id: 'team_player',
      title: 'Team Player',
      description: 'Join a team and participate in 5 team challenges',
      category: 'social',
      type: 'milestone',
      tier: 'silver',
      points: 30,
      requirements: [{ type: 'team_challenges', value: 5, operator: 'greater' }],
      icon: '/icons/achievements/team-player.svg',
      unlockedIcon: '/icons/achievements/team-player-unlocked.svg',
    });

    // Challenge Achievements
    this.registerAchievement({
      id: 'algorithm_master',
      title: 'Algorithm Master',
      description: 'Successfully complete all sorting algorithm challenges',
      category: 'challenges',
      type: 'progressive',
      tier: 'gold',
      points: 100,
      requirements: [{ type: 'algorithm_challenges', value: 5, operator: 'equals' }],
      icon: '/icons/achievements/algorithm-master.svg',
      unlockedIcon: '/icons/achievements/algorithm-master-unlocked.svg',
    });

    // Mastery Achievements
    this.registerAchievement({
      id: 'concept_master',
      title: 'Concept Master',
      description: 'Achieve mastery in 10 different programming concepts',
      category: 'mastery',
      type: 'progressive',
      tier: 'platinum',
      points: 200,
      requirements: [{ type: 'concepts_mastered', value: 10, operator: 'greater' }],
      icon: '/icons/achievements/concept-master.svg',
      unlockedIcon: '/icons/achievements/concept-master-unlocked.svg',
    });

    // Competitive Achievements
    this.registerAchievement({
      id: 'leaderboard_champion',
      title: 'Leaderboard Champion',
      description: 'Reach the top 10 on the weekly leaderboard',
      category: 'competition',
      type: 'competitive',
      tier: 'diamond',
      points: 500,
      requirements: [{ type: 'leaderboard_rank', value: 10, operator: 'less' }],
      icon: '/icons/achievements/leaderboard-champion.svg',
      unlockedIcon: '/icons/achievements/leaderboard-champion-unlocked.svg',
    });
  }

  private registerAchievement(achievement: Achievement) {
    this.achievementDefinitions.set(achievement.id, achievement);
  }

  async checkAchievements(userId: string, eventType: string, eventData: any) {
    const userAchievements = await prisma.userAchievement.findMany({
      where: { userId },
    });

    const unlockedAchievements = [];

    for (const [id, achievement] of this.achievementDefinitions) {
      if (!userAchievements.some(ua => ua.achievementId === id)) {
        const isUnlocked = await this.checkAchievementRequirements(
          userId,
          achievement,
          eventType,
          eventData
        );

        if (isUnlocked) {
          await this.unlockAchievement(userId, achievement);
          unlockedAchievements.push(achievement);
        }
      }
    }

    return unlockedAchievements;
  }

  private async checkAchievementRequirements(
    userId: string,
    achievement: Achievement,
    eventType: string,
    eventData: any
  ): Promise<boolean> {
    for (const requirement of achievement.requirements) {
      const value = await this.getRequirementValue(userId, requirement.type);
      
      switch (requirement.operator) {
        case 'equals':
          if (value !== requirement.value) return false;
          break;
        case 'greater':
          if (value <= requirement.value) return false;
          break;
        case 'less':
          if (value >= requirement.value) return false;
          break;
        case 'between':
          if (value < requirement.value || value > requirement.compareValue!) return false;
          break;
      }
    }

    return true;
  }

  private async getRequirementValue(userId: string, type: string): Promise<number> {
    switch (type) {
      case 'lessons_completed':
        return await prisma.lesson.count({
          where: { userId, completed: true },
        });
      case 'perfect_lessons':
        return await prisma.lesson.count({
          where: { userId, completed: true, score: 100 },
        });
      case 'team_challenges':
        return await prisma.teamChallenge.count({
          where: {
            participants: {
              some: { userId },
            },
          },
        });
      case 'algorithm_challenges':
        return await prisma.challenge.count({
          where: {
            userId,
            type: 'algorithm',
            completed: true,
          },
        });
      case 'concepts_mastered':
        return await prisma.conceptMastery.count({
          where: {
            userId,
            level: { gte: 90 },
          },
        });
      case 'leaderboard_rank':
        const leaderboard = await this.getWeeklyLeaderboard();
        const userRank = leaderboard.findIndex(entry => entry.userId === userId);
        return userRank === -1 ? Infinity : userRank + 1;
      default:
        return 0;
    }
  }

  private async unlockAchievement(userId: string, achievement: Achievement) {
    const unlockedAchievement = await prisma.userAchievement.create({
      data: {
        userId,
        achievementId: achievement.id,
        unlockedAt: new Date(),
      },
    });

    // Update user points
    await prisma.user.update({
      where: { id: userId },
      data: {
        points: {
          increment: achievement.points,
        },
      },
    });

    // Notify friends
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { friends: true },
    });

    if (user) {
      const notification = {
        type: 'achievement_unlocked',
        title: 'Achievement Unlocked!',
        message: `${user.name} unlocked ${achievement.title}!`,
        achievement: achievement,
      };

      user.friends.forEach(friend => {
        this.eventEmitter.emit('notification', {
          userId: friend.id,
          notification,
        });
      });
    }

    return unlockedAchievement;
  }

  async getAchievementProgress(userId: string, achievementId: string) {
    const achievement = this.achievementDefinitions.get(achievementId);
    if (!achievement) throw new Error('Achievement not found');

    const progress = await Promise.all(
      achievement.requirements.map(async req => {
        const currentValue = await this.getRequirementValue(userId, req.type);
        const targetValue = req.value;
        const percentage = Math.min(100, (currentValue / targetValue) * 100);

        return {
          type: req.type,
          current: currentValue,
          target: targetValue,
          percentage,
        };
      })
    );

    return {
      achievement,
      progress,
    };
  }

  async getWeeklyLeaderboard() {
    const startOfWeek = new Date();
    startOfWeek.setHours(0, 0, 0, 0);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());

    return await prisma.user.findMany({
      where: {
        lessons: {
          some: {
            completedAt: {
              gte: startOfWeek,
            },
          },
        },
      },
      select: {
        id: true,
        name: true,
        points: true,
      },
      orderBy: {
        points: 'desc',
      },
      take: 100,
    });
  }
}
