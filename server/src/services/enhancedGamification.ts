import { PrismaClient } from '@prisma/client';

interface Achievement {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  icon: string;
  requirements: {
    type: 'lessons_completed' | 'streak' | 'perfect_scores' | 'languages_learned' | 'challenges_won';
    count: number;
  };
}

interface Quest {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  gemReward: number;
  timeLimit: number; // in hours
  requirements: {
    type: 'complete_lessons' | 'practice_minutes' | 'help_others' | 'win_challenges';
    count: number;
  };
}

interface PowerUp {
  id: string;
  name: string;
  description: string;
  cost: number;
  duration: number; // in minutes
  effect: {
    type: 'xp_boost' | 'mistake_protection' | 'hint_boost' | 'time_freeze';
    multiplier: number;
  };
}

export class EnhancedGamificationService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  private readonly achievements: Achievement[] = [
    {
      id: 'first_steps',
      title: 'First Steps',
      description: 'Complete your first lesson',
      xpReward: 50,
      icon: '🎯',
      requirements: { type: 'lessons_completed', count: 1 }
    },
    {
      id: 'consistent_coder',
      title: 'Consistent Coder',
      description: 'Maintain a 7-day streak',
      xpReward: 100,
      icon: '🔥',
      requirements: { type: 'streak', count: 7 }
    },
    {
      id: 'polyglot_beginner',
      title: 'Polyglot Beginner',
      description: 'Start learning a second programming language',
      xpReward: 200,
      icon: '🌐',
      requirements: { type: 'languages_learned', count: 2 }
    }
  ];

  private readonly quests: Quest[] = [
    {
      id: 'daily_practice',
      title: 'Daily Practice',
      description: 'Complete 5 lessons today',
      xpReward: 100,
      gemReward: 10,
      timeLimit: 24,
      requirements: { type: 'complete_lessons', count: 5 }
    },
    {
      id: 'coding_marathon',
      title: 'Coding Marathon',
      description: 'Practice for 30 minutes',
      xpReward: 150,
      gemReward: 15,
      timeLimit: 24,
      requirements: { type: 'practice_minutes', count: 30 }
    }
  ];

  private readonly powerUps: PowerUp[] = [
    {
      id: 'double_xp',
      name: 'Double XP',
      description: 'Double XP for 30 minutes',
      cost: 100,
      duration: 30,
      effect: { type: 'xp_boost', multiplier: 2 }
    },
    {
      id: 'mistake_shield',
      name: 'Mistake Shield',
      description: 'Protect against one mistake',
      cost: 50,
      duration: 60,
      effect: { type: 'mistake_protection', multiplier: 1 }
    }
  ];

  async updateProgress(userId: string, eventType: string, data: any): Promise<void> {
    // Check achievements
    const newAchievements = await this.checkAchievements(userId, eventType, data);
    
    // Update quests
    await this.updateQuests(userId, eventType, data);
    
    // Apply active power-ups
    const rewards = await this.applyPowerUps(userId, data);
    
    // Update user stats
    await this.updateUserStats(userId, {
      achievements: newAchievements,
      rewards
    });
  }

  private async checkAchievements(
    userId: string,
    eventType: string,
    data: any
  ): Promise<Achievement[]> {
    const userStats = await this.getUserStats(userId);
    const newAchievements: Achievement[] = [];

    for (const achievement of this.achievements) {
      const alreadyEarned = await this.prisma.userAchievement.findUnique({
        where: {
          userId_achievementId: {
            userId,
            achievementId: achievement.id
          }
        }
      });

      if (!alreadyEarned && this.meetsRequirements(achievement, userStats)) {
        await this.prisma.userAchievement.create({
          data: {
            userId,
            achievementId: achievement.id,
            earnedAt: new Date()
          }
        });
        newAchievements.push(achievement);
      }
    }

    return newAchievements;
  }

  private async updateQuests(userId: string, eventType: string, data: any): Promise<void> {
    const activeQuests = await this.prisma.userQuest.findMany({
      where: {
        userId,
        completedAt: null,
        expiresAt: {
          gt: new Date()
        }
      },
      include: {
        quest: true
      }
    });

    for (const userQuest of activeQuests) {
      const progress = await this.getQuestProgress(userId, userQuest.quest);
      
      if (progress >= userQuest.quest.requirements.count) {
        await this.completeQuest(userId, userQuest);
      } else {
        await this.updateQuestProgress(userId, userQuest, progress);
      }
    }
  }

  private async applyPowerUps(userId: string, data: any): Promise<any> {
    const activePowerUps = await this.prisma.activePowerUp.findMany({
      where: {
        userId,
        expiresAt: {
          gt: new Date()
        }
      },
      include: {
        powerUp: true
      }
    });

    let modifications = {
      xpMultiplier: 1,
      mistakeProtection: 0,
      hintBoost: 0
    };

    for (const active of activePowerUps) {
      switch (active.powerUp.effect.type) {
        case 'xp_boost':
          modifications.xpMultiplier *= active.powerUp.effect.multiplier;
          break;
        case 'mistake_protection':
          modifications.mistakeProtection += active.powerUp.effect.multiplier;
          break;
        case 'hint_boost':
          modifications.hintBoost += active.powerUp.effect.multiplier;
          break;
      }
    }

    return modifications;
  }

  async assignDailyQuests(userId: string): Promise<Quest[]> {
    // Clear expired quests
    await this.prisma.userQuest.deleteMany({
      where: {
        userId,
        expiresAt: {
          lt: new Date()
        }
      }
    });

    // Assign new quests
    const dailyQuests = this.quests.filter(q => q.timeLimit === 24);
    const assignedQuests: Quest[] = [];

    for (const quest of dailyQuests) {
      const existing = await this.prisma.userQuest.findFirst({
        where: {
          userId,
          questId: quest.id,
          completedAt: null
        }
      });

      if (!existing) {
        await this.prisma.userQuest.create({
          data: {
            userId,
            questId: quest.id,
            progress: 0,
            expiresAt: new Date(Date.now() + quest.timeLimit * 60 * 60 * 1000)
          }
        });
        assignedQuests.push(quest);
      }
    }

    return assignedQuests;
  }

  async usePowerUp(userId: string, powerUpId: string): Promise<boolean> {
    const powerUp = this.powerUps.find(p => p.id === powerUpId);
    if (!powerUp) {
      throw new Error('Power-up not found');
    }

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { gems: true }
    });

    if (!user || user.gems < powerUp.cost) {
      return false;
    }

    await this.prisma.$transaction([
      this.prisma.user.update({
        where: { id: userId },
        data: { gems: { decrement: powerUp.cost } }
      }),
      this.prisma.activePowerUp.create({
        data: {
          userId,
          powerUpId,
          expiresAt: new Date(Date.now() + powerUp.duration * 60 * 1000)
        }
      })
    ]);

    return true;
  }

  private async getUserStats(userId: string): Promise<any> {
    const [
      lessonsCompleted,
      streak,
      perfectScores,
      languagesLearned,
      challengesWon
    ] = await Promise.all([
      this.prisma.userProgress.count({
        where: { userId, completed: true }
      }),
      this.prisma.user.findUnique({
        where: { id: userId },
        select: { streak: true }
      }),
      this.prisma.userProgress.count({
        where: { userId, score: 100 }
      }),
      this.prisma.userLanguage.count({
        where: { userId }
      }),
      this.prisma.challengeParticipation.count({
        where: { userId, won: true }
      })
    ]);

    return {
      lessonsCompleted,
      streak: streak?.streak || 0,
      perfectScores,
      languagesLearned,
      challengesWon
    };
  }

  private meetsRequirements(achievement: Achievement, stats: any): boolean {
    const { type, count } = achievement.requirements;
    return stats[type] >= count;
  }

  private async completeQuest(userId: string, userQuest: any): Promise<void> {
    await this.prisma.$transaction([
      this.prisma.userQuest.update({
        where: {
          id: userQuest.id
        },
        data: {
          completedAt: new Date(),
          progress: userQuest.quest.requirements.count
        }
      }),
      this.prisma.user.update({
        where: { id: userId },
        data: {
          xp: { increment: userQuest.quest.xpReward },
          gems: { increment: userQuest.quest.gemReward }
        }
      })
    ]);
  }

  private async updateQuestProgress(
    userId: string,
    userQuest: any,
    progress: number
  ): Promise<void> {
    await this.prisma.userQuest.update({
      where: {
        id: userQuest.id
      },
      data: {
        progress
      }
    });
  }

  private async getQuestProgress(userId: string, quest: Quest): Promise<number> {
    switch (quest.requirements.type) {
      case 'complete_lessons':
        return this.prisma.userProgress.count({
          where: {
            userId,
            completed: true,
            completedAt: {
              gt: new Date(Date.now() - quest.timeLimit * 60 * 60 * 1000)
            }
          }
        });
      case 'practice_minutes':
        const practices = await this.prisma.practiceSession.findMany({
          where: {
            userId,
            startedAt: {
              gt: new Date(Date.now() - quest.timeLimit * 60 * 60 * 1000)
            }
          },
          select: {
            duration: true
          }
        });
        return practices.reduce((sum, p) => sum + p.duration, 0);
      default:
        return 0;
    }
  }

  async getLeaderboard(type: 'daily' | 'weekly' | 'all-time'): Promise<any[]> {
    const dateFilter = this.getLeaderboardDateFilter(type);

    return this.prisma.user.findMany({
      where: {
        progress: {
          some: {
            completedAt: dateFilter
          }
        }
      },
      select: {
        id: true,
        username: true,
        xp: true,
        streak: true,
        _count: {
          select: {
            achievements: true
          }
        }
      },
      orderBy: {
        xp: 'desc'
      },
      take: 100
    });
  }

  private getLeaderboardDateFilter(type: 'daily' | 'weekly' | 'all-time'): any {
    const now = new Date();
    switch (type) {
      case 'daily':
        return {
          gte: new Date(now.setHours(0, 0, 0, 0))
        };
      case 'weekly':
        const weekStart = new Date(now.setDate(now.getDate() - now.getDay()));
        return {
          gte: new Date(weekStart.setHours(0, 0, 0, 0))
        };
      default:
        return undefined;
    }
  }
}
