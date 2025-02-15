import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface RealWorldAnalogy {
  concept: string;
  analogy: string;
  visualization: string;
  examples: string[];
  interactive: {
    type: 'simulation' | 'game' | 'story';
    content: any;
  };
}

interface BeginnerExercise {
  type: 'story_based' | 'visual_puzzle' | 'real_world' | 'interactive_game' | 'daily_life';
  difficulty: 'first_time' | 'beginner' | 'getting_comfortable';
  content: any;
  visualAids: any[];
  hints: string[];
  rewards: any;
}

export class BeginnerPracticeService {
  private readonly realWorldAnalogies: { [key: string]: RealWorldAnalogy[] } = {
    variables: [
      {
        concept: 'storing_data',
        analogy: 'Like labeling boxes in your room',
        visualization: 'box-labeling-animation',
        examples: [
          'Putting your toys in a labeled box',
          'Writing your name on your lunchbox',
          'Having different drawers for different clothes'
        ],
        interactive: {
          type: 'game',
          content: {
            scenario: 'bedroom_organization',
            items: ['books', 'toys', 'clothes'],
            actions: ['label', 'store', 'retrieve']
          }
        }
      },
      {
        concept: 'changing_values',
        analogy: 'Like updating a scoreboard',
        visualization: 'scoreboard-update-animation',
        examples: [
          'Changing scores during a game',
          'Updating a temperature display',
          'Changing price tags in a store'
        ],
        interactive: {
          type: 'simulation',
          content: {
            scenario: 'sports_game',
            actions: ['score_point', 'update_display', 'announce_score']
          }
        }
      }
    ],
    loops: [
      {
        concept: 'repeat_actions',
        analogy: 'Like following a recipe',
        visualization: 'recipe-steps-animation',
        examples: [
          'Stirring cake batter 50 times',
          'Doing 10 jumping jacks',
          'Dealing cards to 4 players'
        ],
        interactive: {
          type: 'game',
          content: {
            scenario: 'cooking_kitchen',
            actions: ['stir', 'count', 'check_result']
          }
        }
      },
      {
        concept: 'while_loops',
        analogy: 'Like washing dishes until all clean',
        visualization: 'dish-washing-animation',
        examples: [
          'Washing dishes until none are left',
          'Filling water until bucket is full',
          'Walking until reaching destination'
        ],
        interactive: {
          type: 'simulation',
          content: {
            scenario: 'dish_washing',
            conditions: ['is_dirty', 'has_soap', 'is_clean']
          }
        }
      }
    ],
    functions: [
      {
        concept: 'reusable_actions',
        analogy: 'Like following a recipe card',
        visualization: 'recipe-card-animation',
        examples: [
          'Using same recipe multiple times',
          'Following morning routine checklist',
          'Using washing machine preset programs'
        ],
        interactive: {
          type: 'story',
          content: {
            scenario: 'cooking_show',
            recipes: ['cake', 'cookies', 'bread'],
            steps: ['mix', 'bake', 'decorate']
          }
        }
      }
    ]
  };

  private readonly beginnerExercises: BeginnerExercise[] = [
    {
      type: 'story_based',
      difficulty: 'first_time',
      content: {
        title: 'Help Robot Organize Room',
        story: 'Robot needs to organize different items in the room',
        tasks: [
          {
            description: 'Create a box for books',
            code_concept: 'variables',
            visual_help: 'box-creation-animation'
          },
          {
            description: 'Put 5 books in the box',
            code_concept: 'loops',
            visual_help: 'item-storage-animation'
          }
        ]
      },
      visualAids: [
        {
          type: 'animation',
          content: 'robot-room-organization'
        },
        {
          type: 'comparison',
          realWorld: 'Putting books in box',
          code: 'books = []'
        }
      ],
      hints: [
        'Think about how you organize your own room',
        'Each box is like a variable in code'
      ],
      rewards: {
        points: 100,
        badge: 'room_organizer',
        unlocks: 'basic_variables'
      }
    },
    {
      type: 'visual_puzzle',
      difficulty: 'beginner',
      content: {
        title: 'Build a Sandwich Maker',
        scenario: 'Create a program to make different sandwiches',
        steps: [
          {
            visual: 'bread-selection',
            code_concept: 'variables',
            task: 'Store bread type'
          },
          {
            visual: 'ingredient-loop',
            code_concept: 'loops',
            task: 'Add ingredients'
          }
        ]
      },
      visualAids: [
        {
          type: 'interactive',
          content: 'sandwich-builder-game'
        }
      ],
      hints: [
        'Think of ingredients as items in a list',
        'Adding ingredients is like a loop'
      ],
      rewards: {
        points: 150,
        badge: 'sandwich_chef',
        unlocks: 'basic_loops'
      }
    }
  ];

  async getAnalogy(concept: string): Promise<RealWorldAnalogy[]> {
    return this.realWorldAnalogies[concept] || [];
  }

  async getExercise(difficulty: string): Promise<BeginnerExercise[]> {
    return this.beginnerExercises.filter(ex => ex.difficulty === difficulty);
  }

  async generatePersonalizedExercise(userId: string): Promise<BeginnerExercise> {
    // Get user's progress
    const progress = await prisma.userProgress.findUnique({
      where: { userId }
    });

    // Determine appropriate difficulty
    const difficulty = this.calculateDifficulty(progress);

    // Get exercises at appropriate difficulty
    const exercises = await this.getExercise(difficulty);

    // Customize exercise based on user's interests
    const userPreferences = await prisma.userPreferences.findUnique({
      where: { userId }
    });

    return this.customizeExercise(exercises[0], userPreferences);
  }

  private calculateDifficulty(progress: any): string {
    if (!progress || progress.completedExercises < 5) {
      return 'first_time';
    }
    if (progress.completedExercises < 20) {
      return 'beginner';
    }
    return 'getting_comfortable';
  }

  private customizeExercise(exercise: BeginnerExercise, preferences: any): BeginnerExercise {
    // Customize exercise theme based on user preferences
    if (preferences?.interests?.includes('gaming')) {
      exercise.content.story = exercise.content.story.replace('Robot', 'Game Character');
    }
    if (preferences?.interests?.includes('cooking')) {
      exercise.content.story = exercise.content.story.replace('Room', 'Kitchen');
    }
    return exercise;
  }

  async trackProgress(userId: string, exerciseId: string, performance: any) {
    await prisma.exerciseAttempt.create({
      data: {
        userId,
        exerciseId,
        score: performance.score,
        timeSpent: performance.timeSpent,
        mistakes: performance.mistakes,
        completedAt: new Date()
      }
    });

    // Update user's overall progress
    await prisma.userProgress.update({
      where: { userId },
      data: {
        completedExercises: { increment: 1 },
        totalScore: { increment: performance.score },
        lastActive: new Date()
      }
    });
  }

  async getProgressReport(userId: string): Promise<any> {
    const attempts = await prisma.exerciseAttempt.findMany({
      where: { userId },
      orderBy: { completedAt: 'desc' },
      take: 10
    });

    return {
      recentPerformance: attempts.map(a => ({
        exercise: a.exerciseId,
        score: a.score,
        improvement: this.calculateImprovement(attempts, a.exerciseId)
      })),
      recommendations: this.generateRecommendations(attempts)
    };
  }

  private calculateImprovement(attempts: any[], exerciseId: string): number {
    const exerciseAttempts = attempts
      .filter(a => a.exerciseId === exerciseId)
      .sort((a, b) => a.completedAt.getTime() - b.completedAt.getTime());

    if (exerciseAttempts.length < 2) return 0;

    const firstScore = exerciseAttempts[0].score;
    const lastScore = exerciseAttempts[exerciseAttempts.length - 1].score;

    return ((lastScore - firstScore) / firstScore) * 100;
  }

  private generateRecommendations(attempts: any[]): string[] {
    const recommendations = [];
    const averageScore = attempts.reduce((sum, a) => sum + a.score, 0) / attempts.length;

    if (averageScore < 50) {
      recommendations.push('Try more basic exercises to build confidence');
    } else if (averageScore < 80) {
      recommendations.push('Practice similar exercises to improve speed');
    } else {
      recommendations.push('Ready to try more challenging concepts');
    }

    return recommendations;
  }
}
