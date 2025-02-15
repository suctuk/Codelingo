import { PrismaClient } from '@prisma/client';
import { addDays, differenceInDays } from 'date-fns';

const prisma = new PrismaClient();

interface ReviewItem {
  id: string;
  userId: string;
  conceptId: string;
  easeFactor: number;
  interval: number;
  repetitions: number;
  dueDate: Date;
  lastReviewDate: Date | null;
}

interface ReviewResponse {
  itemId: string;
  quality: 0 | 1 | 2 | 3 | 4 | 5; // 0 = complete blackout, 5 = perfect response
  responseTime: number; // in milliseconds
}

export class SpacedRepetitionService {
  private readonly MIN_EASE_FACTOR = 1.3;
  private readonly MAX_EASE_FACTOR = 2.5;
  private readonly INITIAL_EASE_FACTOR = 2.5;
  private readonly EASE_BONUS = 0.15;
  private readonly EASE_PENALTY = 0.2;

  /**
   * Initialize a new review item for a user
   */
  async initializeReviewItem(userId: string, conceptId: string): Promise<ReviewItem> {
    return await prisma.reviewItem.create({
      data: {
        userId,
        conceptId,
        easeFactor: this.INITIAL_EASE_FACTOR,
        interval: 0,
        repetitions: 0,
        dueDate: new Date(),
        lastReviewDate: null,
      },
    });
  }

  /**
   * Process a review response and calculate next review date
   */
  async processReview(response: ReviewResponse): Promise<ReviewItem> {
    const item = await prisma.reviewItem.findUnique({
      where: { id: response.itemId },
    });

    if (!item) {
      throw new Error('Review item not found');
    }

    const { interval, easeFactor, repetitions } = this.calculateNextReview(
      response.quality,
      item.interval,
      item.easeFactor,
      item.repetitions,
      response.responseTime
    );

    const dueDate = addDays(new Date(), interval);

    return await prisma.reviewItem.update({
      where: { id: item.id },
      data: {
        interval,
        easeFactor,
        repetitions,
        dueDate,
        lastReviewDate: new Date(),
      },
    });
  }

  /**
   * Calculate next review parameters using a modified SuperMemo 2 algorithm
   * with response time consideration
   */
  private calculateNextReview(
    quality: number,
    previousInterval: number,
    previousEaseFactor: number,
    previousRepetitions: number,
    responseTime: number
  ) {
    // Adjust quality based on response time
    const normalizedResponseTime = this.normalizeResponseTime(responseTime);
    const adjustedQuality = Math.max(0, Math.min(5, quality - normalizedResponseTime));

    let interval: number;
    let easeFactor = previousEaseFactor;
    let repetitions = previousRepetitions;

    if (adjustedQuality < 3) {
      // Failed recall - reset intervals
      interval = 1;
      repetitions = 0;
      easeFactor = Math.max(
        this.MIN_EASE_FACTOR,
        previousEaseFactor - this.EASE_PENALTY
      );
    } else {
      // Successful recall
      repetitions++;

      if (repetitions === 1) {
        interval = 1;
      } else if (repetitions === 2) {
        interval = 6;
      } else {
        interval = Math.round(previousInterval * previousEaseFactor);
      }

      // Adjust ease factor based on quality
      const easeChange = (adjustedQuality - 3) * this.EASE_BONUS;
      easeFactor = Math.min(
        this.MAX_EASE_FACTOR,
        Math.max(this.MIN_EASE_FACTOR, previousEaseFactor + easeChange)
      );
    }

    return { interval, easeFactor, repetitions };
  }

  /**
   * Normalize response time to a penalty between 0 and 1
   */
  private normalizeResponseTime(responseTime: number): number {
    const expectedTime = 10000; // 10 seconds
    const maxPenalty = 1;
    
    if (responseTime <= expectedTime) {
      return 0;
    }
    
    const penalty = Math.min(
      maxPenalty,
      Math.log2(responseTime / expectedTime)
    );
    
    return penalty;
  }

  /**
   * Get due reviews for a user
   */
  async getDueReviews(userId: string): Promise<ReviewItem[]> {
    return await prisma.reviewItem.findMany({
      where: {
        userId,
        dueDate: {
          lte: new Date(),
        },
      },
      orderBy: {
        dueDate: 'asc',
      },
    });
  }

  /**
   * Get review statistics for a user
   */
  async getReviewStats(userId: string) {
    const now = new Date();
    const reviews = await prisma.reviewItem.findMany({
      where: {
        userId,
        lastReviewDate: {
          not: null,
        },
      },
    });

    const stats = {
      totalReviews: reviews.length,
      averageEaseFactor: 0,
      retentionRate: 0,
      upcomingReviews: 0,
    };

    if (reviews.length > 0) {
      const totalEaseFactor = reviews.reduce((sum, item) => sum + item.easeFactor, 0);
      stats.averageEaseFactor = totalEaseFactor / reviews.length;

      const successfulReviews = reviews.filter(item => item.repetitions > 0);
      stats.retentionRate = (successfulReviews.length / reviews.length) * 100;

      const upcoming = await prisma.reviewItem.count({
        where: {
          userId,
          dueDate: {
            gt: now,
            lte: addDays(now, 7),
          },
        },
      });
      stats.upcomingReviews = upcoming;
    }

    return stats;
  }

  /**
   * Adjust review schedule based on performance patterns
   */
  async optimizeSchedule(userId: string) {
    const reviews = await prisma.reviewItem.findMany({
      where: {
        userId,
        lastReviewDate: {
          not: null,
        },
      },
    });

    for (const review of reviews) {
      const performancePattern = await this.analyzePerformancePattern(review.id);
      const adjustedInterval = this.calculateOptimalInterval(
        review.interval,
        performancePattern
      );

      if (adjustedInterval !== review.interval) {
        const newDueDate = addDays(new Date(), adjustedInterval);
        await prisma.reviewItem.update({
          where: { id: review.id },
          data: {
            interval: adjustedInterval,
            dueDate: newDueDate,
          },
        });
      }
    }
  }

  /**
   * Analyze user's performance pattern for a review item
   */
  private async analyzePerformancePattern(reviewId: string) {
    const reviewHistory = await prisma.reviewHistory.findMany({
      where: { reviewItemId: reviewId },
      orderBy: { reviewedAt: 'desc' },
      take: 5,
    });

    return {
      averageQuality: reviewHistory.reduce((sum, r) => sum + r.quality, 0) / reviewHistory.length,
      consistentPerformance: this.calculateConsistency(reviewHistory.map(r => r.quality)),
      averageResponseTime: reviewHistory.reduce((sum, r) => sum + r.responseTime, 0) / reviewHistory.length,
    };
  }

  /**
   * Calculate consistency of review performance
   */
  private calculateConsistency(qualities: number[]): number {
    if (qualities.length < 2) return 1;

    const differences = qualities.slice(1).map((q, i) => Math.abs(q - qualities[i]));
    const averageDifference = differences.reduce((sum, diff) => sum + diff, 0) / differences.length;
    
    return 1 - (averageDifference / 5); // Normalize to 0-1 range
  }

  /**
   * Calculate optimal interval based on performance pattern
   */
  private calculateOptimalInterval(currentInterval: number, pattern: any): number {
    const baseAdjustment = pattern.averageQuality >= 4 ? 1.2 : 0.8;
    const consistencyAdjustment = pattern.consistentPerformance >= 0.8 ? 1.1 : 0.9;
    
    return Math.round(currentInterval * baseAdjustment * consistencyAdjustment);
  }
}
