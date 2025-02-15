import { PrismaClient } from '@prisma/client';

interface ProgressionNode {
  id: string;
  type: 'lesson' | 'practice' | 'challenge';
  requiredXP: number;
  dependencies: string[];
  unlocks: string[];
}

interface UserProgress {
  userId: string;
  nodeId: string;
  xp: number;
  completed: boolean;
  masteryLevel: number;
  attempts: number;
  lastAttempt: Date;
}

export class LessonProgressionService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  private calculateMasteryLevel(performance: number, attempts: number): number {
    // Base mastery from performance (0-1)
    let mastery = performance;

    // Reduce mastery for multiple attempts
    if (attempts > 1) {
      mastery *= Math.pow(0.9, attempts - 1);
    }

    // Convert to 0-5 scale
    return Math.round(mastery * 5);
  }

  private calculateXPReward(
    baseXP: number,
    performance: number,
    streak: number,
    difficulty: string
  ): number {
    let xp = baseXP * performance;

    // Streak bonus (max 2x)
    const streakMultiplier = Math.min(1 + streak * 0.1, 2);
    xp *= streakMultiplier;

    // Difficulty multiplier
    const difficultyMultipliers = {
      beginner: 1,
      intermediate: 1.2,
      advanced: 1.5
    };
    xp *= difficultyMultipliers[difficulty] || 1;

    return Math.round(xp);
  }

  async updateProgress(
    userId: string,
    lessonId: string,
    performance: number,
    timeSpent: number
  ): Promise<void> {
    const lesson = await this.prisma.lesson.findUnique({
      where: { id: lessonId },
      include: {
        unit: {
          include: {
            section: true
          }
        }
      }
    });

    if (!lesson) {
      throw new Error('Lesson not found');
    }

    // Get user's current progress
    const progress = await this.prisma.userProgress.findUnique({
      where: {
        userId_lessonId: {
          userId,
          lessonId
        }
      }
    });

    const attempts = (progress?.attempts || 0) + 1;
    const masteryLevel = this.calculateMasteryLevel(performance, attempts);

    // Calculate XP reward
    const streak = await this.getUserStreak(userId);
    const xpEarned = this.calculateXPReward(
      lesson.baseXP,
      performance,
      streak,
      lesson.unit.section.difficulty
    );

    // Update progress
    await this.prisma.userProgress.upsert({
      where: {
        userId_lessonId: {
          userId,
          lessonId
        }
      },
      update: {
        completed: performance >= 0.8,
        masteryLevel,
        attempts,
        lastAttempt: new Date(),
        timeSpent: (progress?.timeSpent || 0) + timeSpent,
        xpEarned: (progress?.xpEarned || 0) + xpEarned
      },
      create: {
        userId,
        lessonId,
        completed: performance >= 0.8,
        masteryLevel,
        attempts: 1,
        timeSpent,
        xpEarned,
        lastAttempt: new Date()
      }
    });

    // Update user's streak and total XP
    await this.updateUserStats(userId, xpEarned);
  }

  private async getUserStreak(userId: string): Promise<number> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { streak: true }
    });
    return user?.streak || 0;
  }

  private async updateUserStats(userId: string, xpEarned: number): Promise<void> {
    const today = new Date();
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { lastActive: true, streak: true }
    });

    let newStreak = user?.streak || 0;
    const lastActive = user?.lastActive;

    if (lastActive) {
      const daysSinceLastActive = Math.floor(
        (today.getTime() - lastActive.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (daysSinceLastActive === 0) {
        // Same day, streak continues
      } else if (daysSinceLastActive === 1) {
        // Next day, increment streak
        newStreak++;
      } else {
        // Streak broken
        newStreak = 1;
      }
    } else {
      // First activity
      newStreak = 1;
    }

    await this.prisma.user.update({
      where: { id: userId },
      data: {
        totalXP: { increment: xpEarned },
        streak: newStreak,
        lastActive: today
      }
    });
  }

  async getAvailableLessons(userId: string): Promise<any[]> {
    const userProgress = await this.prisma.userProgress.findMany({
      where: { userId },
      include: {
        lesson: {
          include: {
            unit: {
              include: {
                section: true
              }
            }
          }
        }
      }
    });

    const completedLessons = new Set(
      userProgress
        .filter(p => p.completed)
        .map(p => p.lessonId)
    );

    // Get all lessons
    const allLessons = await this.prisma.lesson.findMany({
      include: {
        unit: {
          include: {
            section: true
          }
        },
        prerequisites: true
      }
    });

    // Filter available lessons
    return allLessons.filter(lesson => {
      // If already completed, not available
      if (completedLessons.has(lesson.id)) {
        return false;
      }

      // Check if all prerequisites are completed
      const prereqsMet = lesson.prerequisites.every(prereq =>
        completedLessons.has(prereq.id)
      );

      return prereqsMet;
    });
  }

  async getRecommendedPath(userId: string): Promise<any[]> {
    const available = await this.getAvailableLessons(userId);
    const userStats = await this.getUserStats(userId);

    return available
      .map(lesson => ({
        ...lesson,
        recommendationScore: this.calculateRecommendationScore(lesson, userStats)
      }))
      .sort((a, b) => b.recommendationScore - a.recommendationScore);
  }

  private calculateRecommendationScore(lesson: any, userStats: any): number {
    let score = 0;

    // Base score from lesson difficulty matching user level
    score += this.matchDifficultyScore(lesson.unit.section.difficulty, userStats.level);

    // Bonus for lessons in the current unit
    if (lesson.unit.id === userStats.currentUnitId) {
      score += 2;
    }

    // Penalty for skipping ahead too far
    const unitIndex = parseInt(lesson.unit.orderIndex);
    const userUnitIndex = parseInt(userStats.currentUnitIndex);
    if (unitIndex > userUnitIndex + 2) {
      score -= (unitIndex - userUnitIndex) * 0.5;
    }

    return score;
  }

  private matchDifficultyScore(lessonDifficulty: string, userLevel: number): number {
    const difficultyMap = {
      beginner: [1, 2, 3],
      intermediate: [3, 4, 5],
      advanced: [5, 6, 7]
    };

    const appropriateLevels = difficultyMap[lessonDifficulty] || [];
    return appropriateLevels.includes(userLevel) ? 3 : 1;
  }

  private async getUserStats(userId: string): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        progress: {
          include: {
            lesson: {
              include: {
                unit: true
              }
            }
          }
        }
      }
    });

    // Calculate user level based on XP
    const level = Math.floor(Math.log2(user.totalXP / 100 + 1)) + 1;

    // Find current unit
    const currentUnit = user.progress
      .sort((a, b) => b.lastAttempt.getTime() - a.lastAttempt.getTime())
      .find(p => p.completed)?.lesson.unit;

    return {
      level,
      totalXP: user.totalXP,
      streak: user.streak,
      currentUnitId: currentUnit?.id,
      currentUnitIndex: currentUnit?.orderIndex
    };
  }
}
