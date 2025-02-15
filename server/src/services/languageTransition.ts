import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface LanguageFeature {
  name: string;
  description: string;
  sourceExample: string;
  targetExample: string;
  commonMistakes: string[];
  practiceExercises: any[];
}

interface SyntaxMapping {
  concept: string;
  source: string;
  target: string;
  explanation: string;
}

export class LanguageTransitionService {
  private readonly supportedLanguages = [
    'python',
    'javascript',
    'java',
    'cpp',
    'typescript',
    'rust',
    'kotlin'
  ];

  private readonly languageFeatures: { [key: string]: { [key: string]: LanguageFeature[] } } = {
    'python-to-javascript': [
      {
        name: 'List/Array Operations',
        description: 'Converting Python list operations to JavaScript array methods',
        sourceExample: 'numbers.append(5)\nlen(numbers)',
        targetExample: 'numbers.push(5)\nnumbers.length',
        commonMistakes: [
          'Using append() instead of push()',
          'Using len() instead of .length',
        ],
        practiceExercises: [
          {
            type: 'code_conversion',
            source: 'fruits = ["apple"]\nfruits.append("banana")\nprint(len(fruits))',
            target: 'const fruits = ["apple"];\nfruits.push("banana");\nconsole.log(fruits.length);'
          }
        ]
      },
      {
        name: 'String Formatting',
        description: 'Converting f-strings to template literals',
        sourceExample: 'f"Hello {name}"',
        targetExample: '`Hello ${name}`',
        commonMistakes: [
          'Using % formatting in JavaScript',
          'Forgetting to use backticks',
        ],
        practiceExercises: []
      }
    ],
    'javascript-to-python': [
      {
        name: 'Array/List Operations',
        description: 'Converting JavaScript array methods to Python list operations',
        sourceExample: 'numbers.push(5)\nnumbers.length',
        targetExample: 'numbers.append(5)\nlen(numbers)',
        commonMistakes: [
          'Using push() instead of append()',
          'Using .length instead of len()',
        ],
        practiceExercises: []
      }
    ],
    'python-to-java': [
      {
        name: 'List/ArrayList Operations',
        description: 'Converting Python lists to Java ArrayLists',
        sourceExample: 'numbers = [1, 2, 3]\nnumbers.append(4)',
        targetExample: 'ArrayList<Integer> numbers = new ArrayList<>();\nnumbers.add(4);',
        commonMistakes: [
          'Forgetting type declarations',
          'Using append() instead of add()',
        ],
        practiceExercises: []
      }
    ]
  };

  private readonly syntaxMappings: { [key: string]: { [key: string]: SyntaxMapping[] } } = {
    'python-to-javascript': {
      'variables': [
        {
          concept: 'Variable Declaration',
          source: 'x = 5',
          target: 'let x = 5;',
          explanation: 'JavaScript requires let, const, or var for variable declarations'
        }
      ],
      'functions': [
        {
          concept: 'Function Definition',
          source: 'def greet(name):',
          target: 'function greet(name) {',
          explanation: 'JavaScript uses the function keyword and requires curly braces'
        }
      ]
    }
  };

  async getTransitionPath(sourceLanguage: string, targetLanguage: string) {
    if (sourceLanguage === 'english') {
      throw new Error('English can only be used as a starting point for learning the first language');
    }

    if (!this.supportedLanguages.includes(sourceLanguage) || 
        !this.supportedLanguages.includes(targetLanguage)) {
      throw new Error('Unsupported language');
    }

    const key = `${sourceLanguage}-to-${targetLanguage}`;
    return {
      features: this.languageFeatures[key] || [],
      syntax: this.syntaxMappings[key] || {},
      exercises: await this.generateTransitionExercises(sourceLanguage, targetLanguage)
    };
  }

  async generateTransitionExercises(sourceLanguage: string, targetLanguage: string) {
    const exercises = [];
    
    // Basic syntax conversion exercises
    exercises.push({
      type: 'syntax_conversion',
      difficulty: 'beginner',
      content: {
        source: this.getBasicSyntaxExample(sourceLanguage),
        target: this.getBasicSyntaxExample(targetLanguage),
        concepts: ['variables', 'functions', 'loops']
      }
    });

    // Feature comparison exercises
    exercises.push({
      type: 'feature_comparison',
      difficulty: 'intermediate',
      content: {
        source: this.getFeatureExample(sourceLanguage),
        target: this.getFeatureExample(targetLanguage),
        features: ['collections', 'error_handling', 'async']
      }
    });

    // Idiomatic code exercises
    exercises.push({
      type: 'idiomatic_code',
      difficulty: 'advanced',
      content: {
        source: this.getIdiomaticExample(sourceLanguage),
        target: this.getIdiomaticExample(targetLanguage),
        patterns: ['list_comprehension', 'error_handling', 'async_await']
      }
    });

    return exercises;
  }

  private getBasicSyntaxExample(language: string): string {
    const examples = {
      python: `
def calculate_sum(numbers):
    total = 0
    for num in numbers:
        total += num
    return total
`,
      javascript: `
function calculateSum(numbers) {
    let total = 0;
    for (const num of numbers) {
        total += num;
    }
    return total;
}
`,
      java: `
public int calculateSum(List<Integer> numbers) {
    int total = 0;
    for (Integer num : numbers) {
        total += num;
    }
    return total;
}
`,
      typescript: `
function calculateSum(numbers: number[]): number {
    let total = 0;
    for (const num of numbers) {
        total += num;
    }
    return total;
}
`
    };
    return examples[language] || '';
  }

  private getFeatureExample(language: string): string {
    const examples = {
      python: `
try:
    result = await async_operation()
    numbers = [x * 2 for x in result if x > 0]
except Exception as e:
    print(f"Error: {e}")
`,
      javascript: `
try {
    const result = await asyncOperation();
    const numbers = result.filter(x => x > 0).map(x => x * 2);
} catch (e) {
    console.log(\`Error: \${e}\`);
}
`
    };
    return examples[language] || '';
  }

  private getIdiomaticExample(language: string): string {
    const examples = {
      python: `
from contextlib import contextmanager

@contextmanager
def managed_resource():
    try:
        yield resource
    finally:
        resource.close()
`,
      javascript: `
class ManagedResource {
    constructor() {
        this.resource = null;
    }
    
    async with(fn) {
        try {
            this.resource = await this.acquire();
            return await fn(this.resource);
        } finally {
            await this.release();
        }
    }
}
`
    };
    return examples[language] || '';
  }

  async generatePersonalizedTransitionPlan(userId: string, sourceLanguage: string, targetLanguage: string) {
    // Get user's proficiency in source language
    const proficiency = await prisma.userProficiency.findFirst({
      where: {
        userId,
        language: sourceLanguage
      }
    });

    // Get transition path
    const transitionPath = await this.getTransitionPath(sourceLanguage, targetLanguage);

    // Customize based on proficiency
    return {
      ...transitionPath,
      recommendedPath: this.customizePath(transitionPath, proficiency),
      estimatedTime: this.calculateEstimatedTime(proficiency),
      focusAreas: this.identifyFocusAreas(sourceLanguage, targetLanguage, proficiency)
    };
  }

  private customizePath(path: any, proficiency: any) {
    const level = proficiency?.level || 'beginner';
    
    switch (level) {
      case 'beginner':
        return {
          ...path,
          exercises: path.exercises.filter(ex => ex.difficulty === 'beginner')
        };
      case 'intermediate':
        return {
          ...path,
          exercises: path.exercises.filter(ex => 
            ex.difficulty === 'beginner' || ex.difficulty === 'intermediate'
          )
        };
      case 'advanced':
        return path;
      default:
        return path;
    }
  }

  private calculateEstimatedTime(proficiency: any) {
    const baseTime = 40; // hours
    const proficiencyMultiplier = {
      beginner: 1.5,
      intermediate: 1,
      advanced: 0.7
    };
    
    return baseTime * (proficiencyMultiplier[proficiency?.level] || 1);
  }

  private identifyFocusAreas(sourceLanguage: string, targetLanguage: string, proficiency: any) {
    const commonFocusAreas = [
      'syntax_differences',
      'standard_library_differences',
      'ecosystem_tools',
      'testing_practices',
      'error_handling',
      'async_programming'
    ];

    // Prioritize focus areas based on language pair and proficiency
    return commonFocusAreas
      .map(area => ({
        area,
        priority: this.calculatePriority(area, sourceLanguage, targetLanguage, proficiency)
      }))
      .sort((a, b) => b.priority - a.priority)
      .map(({ area }) => area);
  }

  private calculatePriority(area: string, sourceLanguage: string, targetLanguage: string, proficiency: any) {
    let priority = 1;

    // Increase priority for fundamental differences
    if (area === 'syntax_differences') {
      priority += 2;
    }

    // Adjust based on language pair
    if (sourceLanguage === 'python' && targetLanguage === 'java' && area === 'type_system') {
      priority += 2;
    }

    // Adjust based on proficiency
    if (proficiency?.level === 'beginner' && area === 'syntax_differences') {
      priority += 1;
    }

    return priority;
  }

  async trackTransitionProgress(userId: string, sourceLanguage: string, targetLanguage: string, progress: any) {
    await prisma.languageTransition.upsert({
      where: {
        userId_sourceLanguage_targetLanguage: {
          userId,
          sourceLanguage,
          targetLanguage
        }
      },
      update: {
        progress: progress.completed,
        lastActive: new Date(),
        challengesCompleted: {
          increment: progress.challengesCompleted
        }
      },
      create: {
        userId,
        sourceLanguage,
        targetLanguage,
        progress: progress.completed,
        lastActive: new Date(),
        challengesCompleted: progress.challengesCompleted
      }
    });
  }
}
