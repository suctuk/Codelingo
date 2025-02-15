import { db } from '../db';
import { eq, and, lt, desc } from 'drizzle-orm';
import OpenAI from 'openai';
import {
  userProgress,
  challenges,
  userChallengeProgress,
  programmingConcepts,
  learningPaths,
} from '../db/schema';

// Spaced repetition intervals in days
const SRS_INTERVALS = [1, 3, 7, 14, 30, 90, 180];

interface LearningItem {
  id: number;
  type: 'challenge' | 'concept';
  difficulty: string;
  lastReviewed: Date;
  nextReview: Date;
  stage: number;
  strength: number;
}

export class LearningService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async getNextReviewItems(userId: string): Promise<LearningItem[]> {
    const now = new Date();
    const progress = await db.query.userChallengeProgress.findMany({
      where: and(
        eq(userChallengeProgress.userId, userId),
        lt(userChallengeProgress.nextReview, now)
      ),
      orderBy: [desc(userChallengeProgress.strength)],
      limit: 5,
    });

    return progress.map(p => ({
      id: p.challengeId,
      type: 'challenge',
      difficulty: p.difficulty,
      lastReviewed: p.lastReviewedAt,
      nextReview: p.nextReview,
      stage: p.srsStage,
      strength: p.strength,
    }));
  }

  async updateSpacedRepetition(userId: string, challengeId: number, performance: number) {
    const progress = await db.query.userChallengeProgress.findFirst({
      where: and(
        eq(userChallengeProgress.userId, userId),
        eq(userChallengeProgress.challengeId, challengeId)
      ),
    });

    if (!progress) {
      throw new Error('Progress not found');
    }

    let newStage = progress.srsStage;
    if (performance >= 0.8) {
      newStage = Math.min(progress.srsStage + 1, SRS_INTERVALS.length - 1);
    } else if (performance < 0.6) {
      newStage = Math.max(progress.srsStage - 1, 0);
    }

    const nextReview = new Date();
    nextReview.setDate(nextReview.getDate() + SRS_INTERVALS[newStage]);

    const strength = this.calculateStrength(performance, progress.attempts);

    await db
      .update(userChallengeProgress)
      .set({
        srsStage: newStage,
        nextReview,
        strength,
        lastReviewedAt: new Date(),
      })
      .where(
        and(
          eq(userChallengeProgress.userId, userId),
          eq(userChallengeProgress.challengeId, challengeId)
        )
      );
  }

  private calculateStrength(performance: number, attempts: number): number {
    return Math.round((performance * 100) * (1 + Math.log(attempts + 1)) * 10) / 10;
  }

  async getPersonalizedPath(userId: string) {
    const user = await db.query.userProgress.findFirst({
      where: eq(userProgress.userId, userId),
    });

    if (!user) {
      throw new Error('User not found');
    }

    const progress = await db.query.userChallengeProgress.findMany({
      where: eq(userChallengeProgress.userId, userId),
    });

    // Analyze user's performance patterns
    const strengths: { [key: string]: number } = {};
    const weaknesses: { [key: string]: number } = {};

    progress.forEach(p => {
      const challenge = challenges.find(c => c.id === p.challengeId);
      if (challenge) {
        if (p.bestScore >= 80) {
          strengths[challenge.type] = (strengths[challenge.type] || 0) + 1;
        } else if (p.bestScore < 60) {
          weaknesses[challenge.type] = (weaknesses[challenge.type] || 0) + 1;
        }
      }
    });

    // Get recommended concepts based on user's level and performance
    const recommendedConcepts = await db.query.programmingConcepts.findMany({
      where: and(
        eq(programmingConcepts.language, user.preferredLanguage),
        eq(programmingConcepts.difficulty, user.experienceLevel)
      ),
      limit: 5,
    });

    return {
      strengths,
      weaknesses,
      recommendedConcepts,
      nextReviewDate: this.getNextReviewDate(progress),
    };
  }

  async getAICodeSuggestions(userId: string, code: string) {
    try {
      const completion = await this.openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are a helpful coding assistant. Analyze the code and provide specific suggestions for improvement."
          },
          {
            role: "user",
            content: `Please analyze this code and provide specific suggestions for improvement: ${code}`
          }
        ],
        temperature: 0.7,
        max_tokens: 500,
      });

      return {
        suggestions: completion.choices[0].message.content,
        timestamp: new Date(),
      };
    } catch (error) {
      console.error('Error getting AI suggestions:', error);
      throw new Error('Failed to get AI suggestions');
    }
  }

  private getNextReviewDate(progress: any[]): Date {
    const now = new Date();
    const nextReview = progress
      .filter(p => p.nextReview > now)
      .sort((a, b) => a.nextReview.getTime() - b.nextReview.getTime())[0];

    return nextReview ? nextReview.nextReview : now;
  }
}
