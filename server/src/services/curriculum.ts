import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface LessonContent {
  title: string;
  description: string;
  theory: string;
  examples: CodeExample[];
  exercises: Exercise[];
  tips: string[];
}

interface CodeExample {
  description: string;
  code: string;
  explanation: string;
}

interface Exercise {
  type: 'multiple_choice' | 'code_completion' | 'write_code' | 'debug' | 'match_output';
  prompt: string;
  difficulty: 'easy' | 'medium' | 'hard';
  hints: string[];
  solution: string;
  testCases?: TestCase[];
}

interface TestCase {
  input: string;
  expectedOutput: string;
  explanation: string;
}

export class CurriculumService {
  // Python curriculum structure
  private pythonCurriculum = {
    sections: [
      {
        id: 'python_basics',
        title: 'Python Basics',
        description: 'Start your Python journey with fundamental concepts',
        units: [
          {
            id: 'introduction_to_python',
            title: 'Introduction to Python',
            description: 'Learn what Python is and write your first program',
            lessons: [
              {
                id: 'what_is_python',
                title: 'What is Python?',
                content: {
                  title: 'What is Python?',
                  description: 'Learn about Python and why it\'s a great first programming language',
                  theory: 'Python is a high-level programming language known for its simplicity and readability. It\'s widely used in web development, data science, and automation.',
                  examples: [
                    {
                      description: 'Your first Python program',
                      code: 'print("Hello, World!")',
                      explanation: 'This simple program outputs the text "Hello, World!" to the screen.'
                    }
                  ],
                  exercises: [
                    {
                      type: 'multiple_choice',
                      prompt: 'Which of these is true about Python?',
                      difficulty: 'easy',
                      hints: ['Think about what makes Python different from other languages'],
                      solution: 'Python is known for its simple and readable syntax'
                    },
                    {
                      type: 'code_completion',
                      prompt: 'Complete the code to print "I love coding!"',
                      difficulty: 'easy',
                      hints: ['Use the print function'],
                      solution: 'print("I love coding!")'
                    }
                  ],
                  tips: [
                    'Python is case-sensitive',
                    'Indentation is important in Python',
                    'You don\'t need semicolons at the end of lines'
                  ]
                }
              },
              {
                id: 'print_statements',
                title: 'Print Statements',
                content: {
                  title: 'Using Print Statements',
                  description: 'Learn how to output text and variables using print()',
                  theory: 'The print() function is used to output text and variables to the console. It\'s one of the most basic and frequently used functions in Python.',
                  examples: [
                    {
                      description: 'Printing text',
                      code: 'print("Hello!")\nprint("How are you?")',
                      explanation: 'This prints two lines of text'
                    },
                    {
                      description: 'Printing variables',
                      code: 'name = "Alice"\nprint("Hello,", name)',
                      explanation: 'This prints "Hello, Alice" using a variable'
                    }
                  ],
                  exercises: [
                    {
                      type: 'code_completion',
                      prompt: 'Print your name using a variable',
                      difficulty: 'easy',
                      hints: ['First create a variable with your name, then print it'],
                      solution: 'name = "YourName"\nprint(name)'
                    }
                  ],
                  tips: [
                    'You can print multiple items by separating them with commas',
                    'print() automatically adds a new line at the end',
                    'Use \\n for manual line breaks'
                  ]
                }
              }
            ]
          },
          {
            id: 'variables_and_types',
            title: 'Variables and Data Types',
            description: 'Learn about different types of data and how to store them',
            lessons: [
              {
                id: 'variables_intro',
                title: 'Introduction to Variables',
                content: {
                  title: 'Variables in Python',
                  description: 'Learn how to store and manipulate data using variables',
                  theory: 'Variables are containers for storing data values. In Python, you don\'t need to declare variable types explicitly.',
                  examples: [
                    {
                      description: 'Creating variables',
                      code: 'age = 25\nname = "John"\nheight = 1.75',
                      explanation: 'This creates variables of different types: integer, string, and float'
                    }
                  ],
                  exercises: [
                    {
                      type: 'write_code',
                      prompt: 'Create three variables: name, age, and is_student (boolean)',
                      difficulty: 'easy',
                      hints: ['Use appropriate data types for each variable'],
                      solution: 'name = "Alice"\nage = 20\nis_student = True'
                    }
                  ],
                  tips: [
                    'Variable names can\'t start with numbers',
                    'Use descriptive variable names',
                    'Python variables are case-sensitive'
                  ]
                }
              }
            ]
          }
        ]
      },
      {
        id: 'python_control_flow',
        title: 'Control Flow',
        description: 'Learn how to control program execution with conditions and loops',
        units: [
          {
            id: 'conditionals',
            title: 'Conditional Statements',
            description: 'Learn about if, elif, and else statements',
            lessons: []
          }
        ]
      }
    ]
  };

  // JavaScript curriculum structure
  private javascriptCurriculum = {
    sections: [
      {
        id: 'js_basics',
        title: 'JavaScript Basics',
        description: 'Start your JavaScript journey with fundamental concepts',
        units: [
          {
            id: 'introduction_to_js',
            title: 'Introduction to JavaScript',
            description: 'Learn what JavaScript is and write your first program',
            lessons: [
              {
                id: 'what_is_js',
                title: 'What is JavaScript?',
                content: {
                  title: 'What is JavaScript?',
                  description: 'Learn about JavaScript and its role in web development',
                  theory: 'JavaScript is a programming language that powers the interactive elements of websites. It runs in web browsers and can also be used for server-side development.',
                  examples: [
                    {
                      description: 'Your first JavaScript program',
                      code: 'console.log("Hello, World!");',
                      explanation: 'This outputs "Hello, World!" to the browser console'
                    }
                  ],
                  exercises: [
                    {
                      type: 'code_completion',
                      prompt: 'Use console.log to output "I\'m learning JavaScript!"',
                      difficulty: 'easy',
                      hints: ['Use console.log()'],
                      solution: 'console.log("I\'m learning JavaScript!");'
                    }
                  ],
                  tips: [
                    'JavaScript is case-sensitive',
                    'Semicolons are recommended at the end of statements',
                    'Use the browser console to see output'
                  ]
                }
              }
            ]
          }
        ]
      }
    ]
  };

  async createCurriculum() {
    // Create Python curriculum
    for (const section of this.pythonCurriculum.sections) {
      const createdSection = await prisma.section.create({
        data: {
          id: section.id,
          title: section.title,
          description: section.description,
          language: 'PYTHON'
        }
      });

      for (const unit of section.units) {
        const createdUnit = await prisma.unit.create({
          data: {
            id: unit.id,
            title: unit.title,
            description: unit.description,
            sectionId: createdSection.id
          }
        });

        for (const lesson of unit.lessons) {
          await prisma.lesson.create({
            data: {
              id: lesson.id,
              title: lesson.title,
              content: lesson.content,
              unitId: createdUnit.id
            }
          });
        }
      }
    }

    // Create JavaScript curriculum similarly
    // ... (similar structure for JavaScript)
  }

  async getLessonContent(lessonId: string): Promise<LessonContent> {
    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId }
    });

    if (!lesson) {
      throw new Error('Lesson not found');
    }

    return lesson.content as LessonContent;
  }

  async getUserProgress(userId: string) {
    return await prisma.userProgress.findUnique({
      where: { userId },
      include: {
        completedLessons: true,
        currentLesson: true
      }
    });
  }

  async markLessonComplete(userId: string, lessonId: string, score: number) {
    await prisma.userProgress.update({
      where: { userId },
      data: {
        completedLessons: {
          connect: { id: lessonId }
        },
        totalXP: { increment: score }
      }
    });

    // Get next lesson in sequence
    const currentLesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
      include: { unit: true }
    });

    if (currentLesson) {
      const nextLesson = await prisma.lesson.findFirst({
        where: {
          unitId: currentLesson.unitId,
          id: { gt: lessonId }
        },
        orderBy: { id: 'asc' }
      });

      if (nextLesson) {
        await prisma.userProgress.update({
          where: { userId },
          data: {
            currentLesson: { connect: { id: nextLesson.id } }
          }
        });
      }
    }
  }
}
