import { PrismaClient } from '@prisma/client';

interface LearningStyle {
  visualLearning: number;  // 0-1 preference for visual content
  practicalLearning: number;  // 0-1 preference for hands-on exercises
  theoreticalLearning: number;  // 0-1 preference for theoretical explanations
  socialLearning: number;  // 0-1 preference for peer learning
}

interface PerformanceMetrics {
  accuracy: number;  // 0-1 success rate in exercises
  speed: number;  // average completion time relative to baseline
  consistency: number;  // 0-1 measure of steady progress
  retention: number;  // 0-1 success in review exercises
}

interface DifficultyLevel {
  conceptComplexity: number;  // 0-1 complexity of concepts
  exerciseChallenge: number;  // 0-1 difficulty of exercises
  timeConstraint: number;  // factor for time limits
  hintAvailability: number;  // 0-1 frequency of hints
}

export class AdaptiveLearningService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async updateLearningProfile(
    userId: string,
    lessonId: string,
    performance: any
  ): Promise<void> {
    const profile = await this.getLearningProfile(userId);
    const updatedProfile = this.calculateProfileUpdates(profile, performance);
    await this.saveLearningProfile(userId, updatedProfile);
  }

  private async getLearningProfile(userId: string): Promise<any> {
    const profile = await this.prisma.learningProfile.findUnique({
      where: { userId }
    });

    if (!profile) {
      return this.createInitialProfile(userId);
    }

    return profile;
  }

  private async createInitialProfile(userId: string): Promise<any> {
    return this.prisma.learningProfile.create({
      data: {
        userId,
        learningStyle: {
          visualLearning: 0.5,
          practicalLearning: 0.5,
          theoreticalLearning: 0.5,
          socialLearning: 0.5
        },
        performanceMetrics: {
          accuracy: 0.5,
          speed: 1.0,
          consistency: 0.5,
          retention: 0.5
        },
        difficultyLevel: {
          conceptComplexity: 0.3,
          exerciseChallenge: 0.3,
          timeConstraint: 1.0,
          hintAvailability: 0.7
        }
      }
    });
  }

  private calculateProfileUpdates(profile: any, performance: any): any {
    const updatedProfile = { ...profile };

    // Update learning style based on exercise type preferences
    if (performance.exerciseTypes) {
      updatedProfile.learningStyle = this.updateLearningStyle(
        profile.learningStyle,
        performance.exerciseTypes
      );
    }

    // Update performance metrics
    updatedProfile.performanceMetrics = this.updatePerformanceMetrics(
      profile.performanceMetrics,
      performance
    );

    // Adjust difficulty based on performance
    updatedProfile.difficultyLevel = this.adjustDifficulty(
      profile.difficultyLevel,
      performance
    );

    return updatedProfile;
  }

  private updateLearningStyle(
    currentStyle: LearningStyle,
    exercisePreferences: any
  ): LearningStyle {
    const alpha = 0.1; // Learning rate for style updates
    return {
      visualLearning: this.weightedAverage(
        currentStyle.visualLearning,
        exercisePreferences.visual || 0,
        alpha
      ),
      practicalLearning: this.weightedAverage(
        currentStyle.practicalLearning,
        exercisePreferences.practical || 0,
        alpha
      ),
      theoreticalLearning: this.weightedAverage(
        currentStyle.theoreticalLearning,
        exercisePreferences.theoretical || 0,
        alpha
      ),
      socialLearning: this.weightedAverage(
        currentStyle.socialLearning,
        exercisePreferences.social || 0,
        alpha
      )
    };
  }

  private updatePerformanceMetrics(
    current: PerformanceMetrics,
    performance: any
  ): PerformanceMetrics {
    const alpha = 0.2; // Learning rate for performance updates
    return {
      accuracy: this.weightedAverage(
        current.accuracy,
        performance.successRate || 0,
        alpha
      ),
      speed: this.weightedAverage(
        current.speed,
        performance.completionTimeRatio || 1,
        alpha
      ),
      consistency: this.weightedAverage(
        current.consistency,
        performance.steadyProgress || 0,
        alpha
      ),
      retention: this.weightedAverage(
        current.retention,
        performance.reviewSuccess || 0,
        alpha
      )
    };
  }

  private adjustDifficulty(
    current: DifficultyLevel,
    performance: any
  ): DifficultyLevel {
    const alpha = 0.15; // Learning rate for difficulty adjustments
    const performanceScore = this.calculateOverallPerformance(performance);

    // Adjust difficulty based on performance
    const targetDifficulty = performanceScore > 0.8 ? 1 : performanceScore > 0.6 ? 0.5 : 0;

    return {
      conceptComplexity: this.weightedAverage(
        current.conceptComplexity,
        targetDifficulty,
        alpha
      ),
      exerciseChallenge: this.weightedAverage(
        current.exerciseChallenge,
        targetDifficulty,
        alpha
      ),
      timeConstraint: this.weightedAverage(
        current.timeConstraint,
        performanceScore > 0.7 ? 0.8 : 1.2,
        alpha
      ),
      hintAvailability: this.weightedAverage(
        current.hintAvailability,
        performanceScore < 0.4 ? 1 : 0.3,
        alpha
      )
    };
  }

  private weightedAverage(current: number, target: number, alpha: number): number {
    return current * (1 - alpha) + target * alpha;
  }

  private calculateOverallPerformance(performance: any): number {
    const weights = {
      successRate: 0.4,
      completionTimeRatio: 0.2,
      steadyProgress: 0.2,
      reviewSuccess: 0.2
    };

    return (
      (performance.successRate || 0) * weights.successRate +
      (performance.completionTimeRatio || 0) * weights.completionTimeRatio +
      (performance.steadyProgress || 0) * weights.steadyProgress +
      (performance.reviewSuccess || 0) * weights.reviewSuccess
    );
  }

  async getPersonalizedLearningPath(userId: string, languageId: string): Promise<any[]> {
    const profile = await this.getLearningProfile(userId);
    const availableLessons = await this.getAvailableLessons(userId, languageId);

    return this.rankLessonsByPersonalization(availableLessons, profile);
  }

  private async getAvailableLessons(
    userId: string,
    languageId: string
  ): Promise<any[]> {
    const completedLessons = await this.prisma.userProgress.findMany({
      where: {
        userId,
        completed: true
      },
      select: {
        lessonId: true
      }
    });

    const completedLessonIds = new Set(completedLessons.map(l => l.lessonId));

    const lessons = await this.prisma.lesson.findMany({
      where: {
        languageId,
        id: {
          notIn: Array.from(completedLessonIds)
        }
      },
      include: {
        prerequisites: true,
        content: true
      }
    });

    return lessons.filter(lesson =>
      lesson.prerequisites.every(prereq => completedLessonIds.has(prereq.id))
    );
  }

  private rankLessonsByPersonalization(lessons: any[], profile: any): any[] {
    return lessons
      .map(lesson => ({
        ...lesson,
        score: this.calculateLessonScore(lesson, profile)
      }))
      .sort((a, b) => b.score - a.score);
  }

  private calculateLessonScore(lesson: any, profile: any): number {
    const styleMatch = this.calculateStyleMatch(lesson.content, profile.learningStyle);
    const difficultyMatch = this.calculateDifficultyMatch(
      lesson.content,
      profile.difficultyLevel
    );
    const performanceAlignment = this.calculatePerformanceAlignment(
      lesson.content,
      profile.performanceMetrics
    );

    return (
      styleMatch * 0.4 +
      difficultyMatch * 0.4 +
      performanceAlignment * 0.2
    );
  }

  private calculateStyleMatch(content: any, learningStyle: LearningStyle): number {
    let score = 0;
    const weights = {
      visual: content.visualContent ? learningStyle.visualLearning : 0,
      practical: content.practicalExercises ? learningStyle.practicalLearning : 0,
      theoretical: content.theoreticalContent ? learningStyle.theoreticalLearning : 0,
      social: content.peerLearning ? learningStyle.socialLearning : 0
    };

    const totalWeight = Object.values(weights).reduce((a, b) => a + b, 0);
    return totalWeight > 0 ? Object.values(weights).reduce((a, b) => a + b) / totalWeight : 0.5;
  }

  private calculateDifficultyMatch(
    content: any,
    difficultyLevel: DifficultyLevel
  ): number {
    const contentDifficulty = {
      conceptComplexity: content.complexity || 0.5,
      exerciseChallenge: content.difficulty || 0.5
    };

    const diffDelta = Math.abs(
      contentDifficulty.conceptComplexity - difficultyLevel.conceptComplexity
    ) + Math.abs(
      contentDifficulty.exerciseChallenge - difficultyLevel.exerciseChallenge
    );

    return 1 - diffDelta / 2;
  }

  private calculatePerformanceAlignment(
    content: any,
    performanceMetrics: PerformanceMetrics
  ): number {
    const timeAlignment = 1 -
      Math.abs(content.expectedTime * performanceMetrics.speed - content.expectedTime) /
      content.expectedTime;

    const difficultyAlignment = 1 -
      Math.abs(content.difficulty - performanceMetrics.accuracy);

    return (timeAlignment + difficultyAlignment) / 2;
  }

  async generatePersonalizedExercises(
    userId: string,
    lessonId: string
  ): Promise<any[]> {
    const profile = await this.getLearningProfile(userId);
    const lesson = await this.prisma.lesson.findUnique({
      where: { id: lessonId },
      include: { content: true }
    });

    return this.adaptExercises(lesson.content.exercises, profile);
  }

  private adaptExercises(exercises: any[], profile: any): any[] {
    return exercises.map(exercise => ({
      ...exercise,
      timeLimit: this.adjustTimeLimit(exercise.baseTimeLimit, profile),
      hints: this.adjustHints(exercise.hints, profile),
      difficulty: this.adjustExerciseDifficulty(exercise, profile)
    }));
  }

  private adjustTimeLimit(baseTime: number, profile: any): number {
    return Math.round(
      baseTime * profile.difficultyLevel.timeConstraint * 
      (1 / profile.performanceMetrics.speed)
    );
  }

  private adjustHints(hints: string[], profile: any): string[] {
    const hintCount = Math.ceil(
      hints.length * profile.difficultyLevel.hintAvailability
    );
    return hints.slice(0, hintCount);
  }

  private adjustExerciseDifficulty(exercise: any, profile: any): any {
    const difficulty = profile.difficultyLevel.exerciseChallenge;

    return {
      ...exercise,
      requirements: this.adjustRequirements(exercise.requirements, difficulty),
      testCases: this.adjustTestCases(exercise.testCases, difficulty),
      scoring: this.adjustScoring(exercise.scoring, difficulty)
    };
  }

  private adjustRequirements(requirements: any[], difficulty: number): any[] {
    return requirements.filter((_, index) => 
      index < Math.ceil(requirements.length * (0.5 + difficulty * 0.5))
    );
  }

  private adjustTestCases(testCases: any[], difficulty: number): any[] {
    const baseCount = Math.max(2, Math.ceil(testCases.length * difficulty));
    return testCases
      .sort((a, b) => a.complexity - b.complexity)
      .slice(0, baseCount);
  }

  private adjustScoring(scoring: any, difficulty: number): any {
    return {
      ...scoring,
      passingThreshold: Math.max(0.6, 0.8 - (1 - difficulty) * 0.2),
      bonusThreshold: 0.9 + difficulty * 0.1
    };
  }
}
