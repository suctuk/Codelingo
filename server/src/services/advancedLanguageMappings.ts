import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface AdvancedLanguageFeature {
  concept: string;
  category: 'syntax' | 'paradigm' | 'feature' | 'library';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  syntax: string;
  example: string;
  notes: string[];
  visualAid?: {
    type: 'flowchart' | 'comparison' | 'animation';
    data: any;
  };
}

interface InteractiveExercise {
  type: 'code_conversion' | 'debug' | 'complete_code' | 'spot_difference' | 'memory_game' | 'syntax_quiz' | 'code_puzzle';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  content: any;
  hints: string[];
  timeLimit?: number;
  points: number;
}

export class AdvancedLanguageMappingService {
  private readonly languageFeatures: { [key: string]: AdvancedLanguageFeature[] } = {
    python: [
      // Basic Features
      {
        concept: 'list_comprehension',
        category: 'feature',
        difficulty: 'intermediate',
        syntax: '[expression for item in iterable if condition]',
        example: 'squares = [x**2 for x in range(10) if x % 2 == 0]',
        notes: ['Concise way to create lists', 'Can include conditions'],
        visualAid: {
          type: 'flowchart',
          data: {
            steps: ['Start with iterable', 'Apply condition', 'Transform items', 'Create new list']
          }
        }
      },
      // Advanced Features
      {
        concept: 'decorators',
        category: 'feature',
        difficulty: 'advanced',
        syntax: '@decorator\ndef function():',
        example: `@property\ndef name(self):\n    return self._name`,
        notes: ['Function modifiers', 'Common in frameworks'],
        visualAid: {
          type: 'flowchart',
          data: {
            steps: ['Function definition', 'Decorator processing', 'Modified function']
          }
        }
      }
    ],
    javascript: [
      // Basic Features
      {
        concept: 'arrow_functions',
        category: 'syntax',
        difficulty: 'intermediate',
        syntax: 'const func = (params) => expression',
        example: 'const double = x => x * 2;',
        notes: ['Shorter syntax', 'Lexical this binding'],
        visualAid: {
          type: 'comparison',
          data: {
            traditional: 'function(x) { return x * 2; }',
            arrow: 'x => x * 2'
          }
        }
      },
      // Advanced Features
      {
        concept: 'async_await',
        category: 'feature',
        difficulty: 'advanced',
        syntax: 'async function name() { await promise }',
        example: `async function getData() {\n  const result = await fetch(url);\n  return result.json();\n}`,
        notes: ['Cleaner than promises', 'Sequential async code'],
        visualAid: {
          type: 'flowchart',
          data: {
            steps: ['Start function', 'Await promise', 'Continue execution']
          }
        }
      }
    ],
    java: [
      // Basic Features
      {
        concept: 'generics',
        category: 'feature',
        difficulty: 'intermediate',
        syntax: 'class Name<T> { T value; }',
        example: 'List<String> list = new ArrayList<>();',
        notes: ['Type safety', 'Code reusability'],
        visualAid: {
          type: 'comparison',
          data: {
            without: 'List list = new ArrayList();',
            with: 'List<String> list = new ArrayList<>();'
          }
        }
      }
    ],
    rust: [
      // Basic Features
      {
        concept: 'ownership',
        category: 'paradigm',
        difficulty: 'intermediate',
        syntax: 'let owner = String::from("hello");',
        example: `let s1 = String::from("hello");\nlet s2 = s1; // s1 is no longer valid`,
        notes: ['Single owner rule', 'Memory safety'],
        visualAid: {
          type: 'animation',
          data: {
            steps: ['Variable creation', 'Ownership transfer', 'Original invalid']
          }
        }
      }
    ],
    kotlin: [
      // Basic Features
      {
        concept: 'null_safety',
        category: 'feature',
        difficulty: 'intermediate',
        syntax: 'var name: String?',
        example: 'val length = name?.length ?: 0',
        notes: ['Explicit nullable types', 'Safe call operator'],
        visualAid: {
          type: 'flowchart',
          data: {
            steps: ['Check null', 'Access property', 'Use default']
          }
        }
      }
    ]
  };

  private readonly exerciseTemplates: { [key: string]: InteractiveExercise[] } = {
    code_conversion: [
      {
        type: 'code_conversion',
        difficulty: 'intermediate',
        content: {
          title: 'Convert List Comprehension',
          description: 'Convert this Python list comprehension to your target language',
          sourceCode: '[x * 2 for x in range(5)]',
          testCases: [
            { input: 'range(5)', expectedOutput: '[0, 2, 4, 6, 8]' }
          ]
        },
        hints: [
          'Think about the equivalent loop structure',
          'Consider array/list methods in your target language'
        ],
        points: 100
      }
    ],
    debug: [
      {
        type: 'debug',
        difficulty: 'intermediate',
        content: {
          title: 'Fix the Bug',
          description: 'Find and fix the bug in this code',
          buggyCode: 'def calculate_average(numbers):\n    total = 0\n    for num in numbers:\n        total += num\n    return total / len(numbers)',
          issues: ['What happens with an empty list?'],
          solution: 'def calculate_average(numbers):\n    if not numbers:\n        return 0\n    total = 0\n    for num in numbers:\n        total += num\n    return total / len(numbers)'
        },
        hints: [
          'Think about edge cases',
          'What happens when the input is empty?'
        ],
        points: 150
      }
    ],
    code_puzzle: [
      {
        type: 'code_puzzle',
        difficulty: 'intermediate',
        content: {
          title: 'Arrange the Code',
          description: 'Arrange the code blocks in the correct order',
          blocks: [
            'def quicksort(arr):',
            '    if len(arr) <= 1:',
            '        return arr',
            '    pivot = arr[len(arr) // 2]',
            '    left = [x for x in arr if x < pivot]',
            '    middle = [x for x in arr if x == pivot]',
            '    right = [x for x in arr if x > pivot]',
            '    return quicksort(left) + middle + quicksort(right)'
          ],
          correctOrder: [0, 1, 2, 3, 4, 5, 6, 7]
        },
        hints: [
          'Start with the function definition',
          'Think about the base case',
          'Consider the recursive steps'
        ],
        points: 200
      }
    ],
    memory_game: [
      {
        type: 'memory_game',
        difficulty: 'beginner',
        content: {
          title: 'Match Syntax',
          description: 'Match equivalent syntax between languages',
          pairs: [
            {
              python: 'print("Hello")',
              javascript: 'console.log("Hello")'
            },
            {
              python: 'len(array)',
              javascript: 'array.length'
            }
          ]
        },
        hints: [
          'Focus on the function purpose',
          'Look for syntax patterns'
        ],
        timeLimit: 120,
        points: 50
      }
    ]
  };

  async getLanguageFeatures(language: string): Promise<AdvancedLanguageFeature[]> {
    return this.languageFeatures[language.toLowerCase()] || [];
  }

  async generateExercises(sourceLanguage: string, targetLanguage: string, difficulty: string): Promise<InteractiveExercise[]> {
    const exercises: InteractiveExercise[] = [];
    const sourceFeatures = await this.getLanguageFeatures(sourceLanguage);
    const targetFeatures = await this.getLanguageFeatures(targetLanguage);

    // Generate code conversion exercises
    for (const feature of sourceFeatures) {
      if (feature.difficulty === difficulty) {
        const targetFeature = targetFeatures.find(f => f.concept === feature.concept);
        if (targetFeature) {
          exercises.push({
            type: 'code_conversion',
            difficulty: feature.difficulty,
            content: {
              title: `Convert ${feature.concept}`,
              description: `Convert this ${sourceLanguage} code to ${targetLanguage}`,
              sourceCode: feature.example,
              targetCode: targetFeature.example,
              testCases: []
            },
            hints: feature.notes,
            points: 100
          });
        }
      }
    }

    // Add template exercises
    Object.values(this.exerciseTemplates).forEach(templates => {
      exercises.push(...templates.filter(e => e.difficulty === difficulty));
    });

    return exercises;
  }

  async getPersonalizedExercises(userId: string, sourceLanguage: string, targetLanguage: string): Promise<InteractiveExercise[]> {
    // Get user's progress and difficulty level
    const progress = await prisma.userProgress.findMany({
      where: { userId, sourceLanguage, targetLanguage }
    });

    // Calculate user's level for each concept
    const conceptLevels: { [key: string]: string } = {};
    progress.forEach(p => {
      const successRate = p.successCount / (p.successCount + p.failureCount);
      conceptLevels[p.conceptId] = successRate < 0.3 ? 'beginner' : 
                                  successRate < 0.7 ? 'intermediate' : 'advanced';
    });

    // Generate personalized exercises
    const exercises: InteractiveExercise[] = [];
    for (const [concept, level] of Object.entries(conceptLevels)) {
      const templateExercises = await this.generateExercises(sourceLanguage, targetLanguage, level);
      exercises.push(...templateExercises.filter(e => e.content.concept === concept));
    }

    return exercises;
  }

  async trackProgress(userId: string, exerciseId: string, success: boolean, timeSpent: number) {
    await prisma.exerciseAttempt.create({
      data: {
        userId,
        exerciseId,
        success,
        timeSpent,
        timestamp: new Date()
      }
    });
  }
}
