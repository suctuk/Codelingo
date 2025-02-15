import { prisma } from '../db';
import { calculateXPReward } from './gamification';

export enum CodeReviewType {
  CODE_QUALITY = 'CODE_QUALITY',
  BUG_FINDING = 'BUG_FINDING',
  PERFORMANCE = 'PERFORMANCE',
}

export enum CodeQualityMetric {
  READABILITY = 'READABILITY',
  MAINTAINABILITY = 'MAINTAINABILITY',
  MODULARITY = 'MODULARITY',
  DOCUMENTATION = 'DOCUMENTATION',
  NAMING = 'NAMING',
}

export interface CodeIssue {
  id: string;
  type: 'bug' | 'performance' | 'quality';
  line: number;
  description: string;
  severity: 'low' | 'medium' | 'high';
  suggestion?: string;
}

export interface ReviewMetrics {
  accuracy: number;
  completeness: number;
  timeSpent: number;
  issuesFound: number;
}

export class CodeReviewService {
  async createReviewChallenge(data: {
    title: string;
    description: string;
    type: CodeReviewType;
    code: string;
    language: string;
    difficulty: 'easy' | 'medium' | 'hard';
    issues: CodeIssue[];
    timeLimit?: number;
    xpReward: number;
  }) {
    return await prisma.codeReviewChallenge.create({
      data: {
        ...data,
        issues: {
          create: data.issues,
        },
      },
    });
  }

  async submitReview(data: {
    userId: string;
    challengeId: string;
    foundIssues: CodeIssue[];
    metrics: ReviewMetrics;
  }) {
    const { userId, challengeId, foundIssues, metrics } = data;

    const challenge = await prisma.codeReviewChallenge.findUnique({
      where: { id: challengeId },
      include: { issues: true },
    });

    if (!challenge) {
      throw new Error('Challenge not found');
    }

    // Calculate accuracy based on correctly identified issues
    const correctIssues = foundIssues.filter(found =>
      challenge.issues.some(
        actual =>
          actual.type === found.type &&
          actual.line === found.line &&
          actual.severity === found.severity
      )
    );

    const accuracy = correctIssues.length / challenge.issues.length;
    const completeness = foundIssues.length / challenge.issues.length;
    
    // Calculate XP reward based on performance
    const baseXP = challenge.xpReward;
    const accuracyBonus = accuracy >= 0.9 ? 1.5 : accuracy >= 0.7 ? 1.2 : 1;
    const timeBonus = challenge.timeLimit
      ? metrics.timeSpent < challenge.timeLimit ? 1.2 : 1
      : 1;
    
    const finalXP = Math.round(baseXP * accuracyBonus * timeBonus);

    // Create review submission
    const submission = await prisma.codeReviewSubmission.create({
      data: {
        userId,
        challengeId,
        foundIssues: {
          create: foundIssues,
        },
        metrics: {
          accuracy,
          completeness,
          timeSpent: metrics.timeSpent,
          issuesFound: foundIssues.length,
        },
        xpEarned: finalXP,
      },
    });

    // Update user's progress
    await this.updateUserProgress(userId, submission);

    return {
      submission,
      xpEarned: finalXP,
      accuracy,
      completeness,
    };
  }

  async submitPeerReview(data: {
    reviewerId: string;
    submissionId: string;
    rating: number;
    feedback: string;
    helpfulness: number;
  }) {
    const { reviewerId, submissionId, rating, feedback, helpfulness } = data;

    const submission = await prisma.codeReviewSubmission.findUnique({
      where: { id: submissionId },
      include: { user: true },
    });

    if (!submission) {
      throw new Error('Submission not found');
    }

    // Prevent self-review
    if (submission.userId === reviewerId) {
      throw new Error('Cannot review your own submission');
    }

    const peerReview = await prisma.peerReview.create({
      data: {
        reviewerId,
        submissionId,
        rating,
        feedback,
        helpfulness,
      },
    });

    // Award XP for peer review
    const reviewXP = 50; // Base XP for completing a peer review
    await prisma.user.update({
      where: { id: reviewerId },
      data: {
        xp: { increment: reviewXP },
        reviewsCompleted: { increment: 1 },
      },
    });

    return peerReview;
  }

  async getPerformanceMetrics(code: string, language: string) {
    // Analyze code performance using static analysis
    const metrics = {
      timeComplexity: this.analyzeTimeComplexity(code),
      spaceComplexity: this.analyzeSpaceComplexity(code),
      resourceUsage: this.analyzeResourceUsage(code),
      optimizationSuggestions: this.generateOptimizationSuggestions(code),
    };

    return metrics;
  }

  async getCodeQualityMetrics(code: string, language: string) {
    // Analyze code quality using static analysis
    const metrics = {
      readability: this.analyzeReadability(code),
      maintainability: this.analyzeMaintainability(code),
      modularity: this.analyzeModularity(code),
      documentation: this.analyzeDocumentation(code),
      namingConventions: this.analyzeNamingConventions(code),
    };

    return metrics;
  }

  private async updateUserProgress(userId: string, submission: any) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        achievements: true,
        stats: true,
      },
    });

    if (!user) return;

    // Update user stats
    await prisma.userStats.update({
      where: { userId },
      data: {
        reviewsCompleted: { increment: 1 },
        totalIssuesFound: { increment: submission.metrics.issuesFound },
        averageAccuracy: {
          set: (user.stats.averageAccuracy * user.stats.reviewsCompleted + submission.metrics.accuracy) /
            (user.stats.reviewsCompleted + 1),
        },
      },
    });

    // Check and award achievements
    await this.checkAndAwardAchievements(userId, user);
  }

  private async checkAndAwardAchievements(userId: string, user: any) {
    const achievements = [];

    // Review count achievements
    if (user.stats.reviewsCompleted >= 100 && !user.achievements.includes('MASTER_REVIEWER')) {
      achievements.push('MASTER_REVIEWER');
    }

    // Accuracy achievements
    if (user.stats.averageAccuracy >= 0.9 && !user.achievements.includes('SHARP_EYE')) {
      achievements.push('SHARP_EYE');
    }

    // Issue finding achievements
    if (user.stats.totalIssuesFound >= 500 && !user.achievements.includes('BUG_HUNTER')) {
      achievements.push('BUG_HUNTER');
    }

    if (achievements.length > 0) {
      await prisma.user.update({
        where: { id: userId },
        data: {
          achievements: {
            push: achievements,
          },
        },
      });
    }
  }

  // Static analysis methods
  private analyzeTimeComplexity(code: string) {
    // Implement time complexity analysis
    return {
      overall: 'O(n)',
      details: [],
    };
  }

  private analyzeSpaceComplexity(code: string) {
    // Implement space complexity analysis
    return {
      overall: 'O(1)',
      details: [],
    };
  }

  private analyzeResourceUsage(code: string) {
    // Implement resource usage analysis
    return {
      memory: 'low',
      cpu: 'medium',
      suggestions: [],
    };
  }

  private generateOptimizationSuggestions(code: string) {
    // Generate optimization suggestions
    return [];
  }

  private analyzeReadability(code: string) {
    // Implement readability analysis
    return {
      score: 0.8,
      issues: [],
    };
  }

  private analyzeMaintainability(code: string) {
    // Implement maintainability analysis
    return {
      score: 0.75,
      issues: [],
    };
  }

  private analyzeModularity(code: string) {
    // Implement modularity analysis
    return {
      score: 0.9,
      issues: [],
    };
  }

  private analyzeDocumentation(code: string) {
    // Implement documentation analysis
    return {
      score: 0.6,
      issues: [],
    };
  }

  private analyzeNamingConventions(code: string) {
    // Implement naming convention analysis
    return {
      score: 0.85,
      issues: [],
    };
  }
}
