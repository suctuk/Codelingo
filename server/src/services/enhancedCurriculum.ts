import { PrismaClient } from '@prisma/client';

interface Lesson {
  id: string;
  title: string;
  type: 'concept' | 'practice' | 'challenge';
  content: {
    theory: string;
    examples: Array<{
      description: string;
      sourceCode: string;
      targetCode: string;
    }>;
    exercises: Array<{
      type: 'multiple_choice' | 'code_completion' | 'code_conversion' | 'debug';
      question: string;
      options?: string[];
      correctAnswer: string;
      hints: string[];
    }>;
  };
  xpReward: number;
  requiredCompletions: number;
}

interface Unit {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  requiredXP: number;
}

interface Section {
  id: string;
  title: string;
  description: string;
  units: Unit[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

interface LanguageCurriculum {
  sections: Section[];
  totalLessons: number;
  estimatedHours: number;
}

export class EnhancedCurriculumService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  private pythonToJavaScriptCurriculum: LanguageCurriculum = {
    sections: [
      {
        id: 'basics',
        title: 'Getting Started with JavaScript',
        description: 'Learn JavaScript basics coming from Python',
        difficulty: 'beginner',
        units: [
          {
            id: 'first_steps',
            title: 'Your First JavaScript Code',
            description: 'Convert basic Python concepts to JavaScript',
            requiredXP: 0,
            lessons: [
              {
                id: 'hello_world',
                title: 'Print to Console',
                type: 'concept',
                content: {
                  theory: 'In Python, you use print(). In JavaScript, you use console.log()',
                  examples: [
                    {
                      description: 'Basic printing',
                      sourceCode: 'print("Hello, World!")',
                      targetCode: 'console.log("Hello, World!");'
                    },
                    {
                      description: 'Printing variables',
                      sourceCode: 'name = "Alice"\nprint(name)',
                      targetCode: 'let name = "Alice";\nconsole.log(name);'
                    }
                  ],
                  exercises: [
                    {
                      type: 'code_conversion',
                      question: 'Convert this Python print statement to JavaScript:',
                      correctAnswer: 'console.log("I am learning JavaScript!");',
                      hints: [
                        'JavaScript uses console.log instead of print',
                        'Don\'t forget the semicolon at the end'
                      ]
                    }
                  ]
                },
                xpReward: 10,
                requiredCompletions: 1
              }
            ]
          }
        ]
      }
    ],
    totalLessons: 300,
    estimatedHours: 40
  };

  private createBasicSection(language: string): Section {
    return {
      id: \`\${language}_basics\`,
      title: \`${language.charAt(0).toUpperCase() + language.slice(1)} Basics\`,
      description: 'Learn the fundamental concepts',
      difficulty: 'beginner',
      units: [
        {
          id: 'output',
          title: 'Output and Printing',
          description: 'Learn to display information',
          requiredXP: 0,
          lessons: Array(10).fill(null).map((_, i) => ({
            id: \`output_\${i + 1}\`,
            title: \`Printing Lesson \${i + 1}\`,
            type: 'concept',
            content: {
              theory: 'Basic output operations',
              examples: [],
              exercises: []
            },
            xpReward: 10,
            requiredCompletions: 1
          }))
        }
      ]
    };
  }

  async createLanguageCurriculum(sourceLanguage: string, targetLanguage: string): Promise<void> {
    const sections = [
      {
        id: 'basics',
        title: 'Basic Concepts',
        units: this.generateUnits(20, [
          'Output and Printing',
          'Variables and Data Types',
          'Basic Operators',
          'Comments and Documentation'
        ])
      },
      {
        id: 'control_flow',
        title: 'Control Flow',
        units: this.generateUnits(25, [
          'If Statements',
          'Loops',
          'Switch/Match Statements',
          'Error Handling'
        ])
      },
      {
        id: 'functions',
        title: 'Functions and Methods',
        units: this.generateUnits(30, [
          'Function Basics',
          'Parameters and Returns',
          'Lambda Functions',
          'Built-in Functions'
        ])
      },
      {
        id: 'data_structures',
        title: 'Data Structures',
        units: this.generateUnits(35, [
          'Lists/Arrays',
          'Dictionaries/Objects',
          'Sets',
          'Advanced Collections'
        ])
      },
      {
        id: 'oop',
        title: 'Object-Oriented Programming',
        units: this.generateUnits(30, [
          'Classes and Objects',
          'Inheritance',
          'Polymorphism',
          'Encapsulation'
        ])
      },
      {
        id: 'advanced',
        title: 'Advanced Topics',
        units: this.generateUnits(25, [
          'Modules and Packages',
          'File Operations',
          'Regular Expressions',
          'Advanced Language Features'
        ])
      },
      {
        id: 'practical',
        title: 'Practical Programming',
        units: this.generateUnits(20, [
          'Common Algorithms',
          'Data Processing',
          'API Integration',
          'Testing and Debugging'
        ])
      }
    ];

    await this.prisma.curriculum.create({
      data: {
        sourceLanguage,
        targetLanguage,
        sections: {
          create: sections.map(section => ({
            id: section.id,
            title: section.title,
            units: {
              create: section.units
            }
          }))
        }
      }
    });
  }

  private generateUnits(count: number, topics: string[]): any[] {
    return Array(count).fill(null).map((_, i) => {
      const topic = topics[Math.floor(i / (count / topics.length))];
      return {
        id: \`unit_\${i + 1}\`,
        title: \`\${topic} - Unit \${i + 1}\`,
        lessons: this.generateLessons(10, topic)
      };
    });
  }

  private generateLessons(count: number, topic: string): any[] {
    return Array(count).fill(null).map((_, i) => ({
      id: \`lesson_\${i + 1}\`,
      title: \`\${topic} Lesson \${i + 1}\`,
      type: i < 7 ? 'concept' : 'practice',
      content: this.generateLessonContent(topic, i),
      xpReward: 10 + i * 2,
      requiredCompletions: 1
    }));
  }

  private generateLessonContent(topic: string, lessonIndex: number): any {
    return {
      theory: \`Theory content for \${topic}\`,
      examples: [
        {
          description: 'Basic example',
          sourceCode: '# Source code example',
          targetCode: '// Target code example'
        }
      ],
      exercises: [
        {
          type: 'code_conversion',
          question: \`Convert this code for \${topic}\`,
          correctAnswer: '// Correct implementation',
          hints: ['Think about the syntax differences', 'Remember the language conventions']
        }
      ]
    };
  }

  async getLessonContent(lessonId: string): Promise<Lesson> {
    const lesson = await this.prisma.lesson.findUnique({
      where: { id: lessonId },
      include: {
        content: true,
        exercises: true
      }
    });

    if (!lesson) {
      throw new Error('Lesson not found');
    }

    return lesson as unknown as Lesson;
  }

  async trackProgress(userId: string, lessonId: string, completed: boolean, score: number): Promise<void> {
    await this.prisma.userProgress.upsert({
      where: {
        userId_lessonId: {
          userId,
          lessonId
        }
      },
      update: {
        completed,
        score,
        attempts: {
          increment: 1
        },
        lastAttempt: new Date()
      },
      create: {
        userId,
        lessonId,
        completed,
        score,
        attempts: 1,
        lastAttempt: new Date()
      }
    });
  }

  async getNextLesson(userId: string, currentLessonId: string): Promise<Lesson | null> {
    const currentLesson = await this.prisma.lesson.findUnique({
      where: { id: currentLessonId },
      include: { unit: true }
    });

    if (!currentLesson) {
      throw new Error('Current lesson not found');
    }

    const nextLesson = await this.prisma.lesson.findFirst({
      where: {
        unitId: currentLesson.unit.id,
        orderIndex: {
          gt: currentLesson.orderIndex
        }
      },
      orderBy: {
        orderIndex: 'asc'
      }
    });

    return nextLesson as unknown as Lesson;
  }

  async getUserProgress(userId: string): Promise<any> {
    return this.prisma.userProgress.findMany({
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
  }
}
