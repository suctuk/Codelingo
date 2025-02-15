import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface LanguageFeature {
  concept: string;
  syntax: string;
  example: string;
  notes: string[];
}

interface LanguageMapping {
  source: LanguageFeature;
  target: LanguageFeature;
  commonMistakes: {
    mistake: string;
    explanation: string;
    correction: string;
  }[];
  exercises: {
    type: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    content: any;
  }[];
}

export class LanguageMappingService {
  private languageMappings: { [key: string]: { [key: string]: LanguageMapping[] } } = {
    python: {
      javascript: [
        {
          source: {
            concept: 'print_output',
            syntax: 'print(value)',
            example: 'print("Hello")\nprint("a", "b", sep="-")',
            notes: ['Automatic newline', 'Optional separator'],
          },
          target: {
            concept: 'console_output',
            syntax: 'console.log(value)',
            example: 'console.log("Hello");\nconsole.log("a", "b");',
            notes: ['Part of console object', 'Semicolon recommended'],
          },
          commonMistakes: [
            {
              mistake: 'print("Hello");',
              explanation: 'Python print() not available in JavaScript',
              correction: 'console.log("Hello");',
            },
          ],
          exercises: [
            {
              type: 'code_conversion',
              difficulty: 'beginner',
              content: {
                prompt: 'Convert this Python print to JavaScript',
                code: 'print("Hello", "World", sep=" - ")',
                solution: 'console.log("Hello", "-", "World");',
              },
            },
          ],
        },
      ],
      java: [
        {
          source: {
            concept: 'print_output',
            syntax: 'print(value)',
            example: 'print("Hello")',
            notes: ['Simple function call'],
          },
          target: {
            concept: 'system_out',
            syntax: 'System.out.println(value)',
            example: 'System.out.println("Hello");',
            notes: ['Static method call', 'Requires semicolon'],
          },
          commonMistakes: [
            {
              mistake: 'print("Hello");',
              explanation: 'Python print() not available in Java',
              correction: 'System.out.println("Hello");',
            },
          ],
          exercises: [
            {
              type: 'code_conversion',
              difficulty: 'beginner',
              content: {
                prompt: 'Convert this Python print to Java',
                code: 'print("Hello World")',
                solution: 'System.out.println("Hello World");',
              },
            },
          ],
        },
      ],
      cpp: [
        {
          source: {
            concept: 'print_output',
            syntax: 'print(value)',
            example: 'print("Hello")',
            notes: ['Simple function call'],
          },
          target: {
            concept: 'cout',
            syntax: 'std::cout << value << std::endl',
            example: 'std::cout << "Hello" << std::endl;',
            notes: ['Stream operator', 'Requires iostream'],
          },
          commonMistakes: [
            {
              mistake: 'print("Hello");',
              explanation: 'Python print() not available in C++',
              correction: 'std::cout << "Hello" << std::endl;',
            },
          ],
          exercises: [
            {
              type: 'code_conversion',
              difficulty: 'beginner',
              content: {
                prompt: 'Convert this Python print to C++',
                code: 'print("Hello World")',
                solution: 'std::cout << "Hello World" << std::endl;',
              },
            },
          ],
        },
      ],
    },
    javascript: {
      python: [
        {
          source: {
            concept: 'array_methods',
            syntax: 'array.map(callback)',
            example: '[1, 2, 3].map(x => x * 2)',
            notes: ['Returns new array', 'Arrow function'],
          },
          target: {
            concept: 'list_comprehension',
            syntax: '[expression for item in iterable]',
            example: '[x * 2 for x in [1, 2, 3]]',
            notes: ['Concise syntax', 'Creates new list'],
          },
          commonMistakes: [
            {
              mistake: 'numbers.map(lambda x: x * 2)',
              explanation: 'JavaScript map() not available in Python',
              correction: '[x * 2 for x in numbers]',
            },
          ],
          exercises: [
            {
              type: 'code_conversion',
              difficulty: 'intermediate',
              content: {
                prompt: 'Convert this JavaScript map to Python',
                code: 'const doubled = numbers.map(x => x * 2);',
                solution: 'doubled = [x * 2 for x in numbers]',
              },
            },
          ],
        },
      ],
    },
  };

  async getLanguageMapping(sourceLanguage: string, targetLanguage: string): Promise<LanguageMapping[]> {
    return this.languageMappings[sourceLanguage.toLowerCase()]?.[targetLanguage.toLowerCase()] || [];
  }

  async generateExercises(sourceLanguage: string, targetLanguage: string, difficulty: string): Promise<any[]> {
    const mappings = await this.getLanguageMapping(sourceLanguage, targetLanguage);
    return mappings
      .filter(mapping => mapping.exercises.some(ex => ex.difficulty === difficulty))
      .flatMap(mapping => mapping.exercises.filter(ex => ex.difficulty === difficulty));
  }

  async getCommonMistakes(sourceLanguage: string, targetLanguage: string): Promise<any[]> {
    const mappings = await this.getLanguageMapping(sourceLanguage, targetLanguage);
    return mappings.flatMap(mapping => mapping.commonMistakes);
  }

  async getSyntaxComparison(sourceLanguage: string, targetLanguage: string, concept: string): Promise<any> {
    const mappings = await this.getLanguageMapping(sourceLanguage, targetLanguage);
    return mappings.find(mapping => mapping.source.concept === concept);
  }

  async generateLearningPath(sourceLanguage: string, targetLanguage: string): Promise<any> {
    const mappings = await this.getLanguageMapping(sourceLanguage, targetLanguage);
    
    // Group concepts by difficulty
    const concepts = {
      beginner: mappings.filter(m => m.exercises.some(ex => ex.difficulty === 'beginner')),
      intermediate: mappings.filter(m => m.exercises.some(ex => ex.difficulty === 'intermediate')),
      advanced: mappings.filter(m => m.exercises.some(ex => ex.difficulty === 'advanced')),
    };

    return {
      sections: [
        {
          title: 'Basic Syntax and Output',
          concepts: concepts.beginner.filter(c => 
            ['print_output', 'variables', 'basic_types'].includes(c.source.concept)
          ),
        },
        {
          title: 'Control Flow and Functions',
          concepts: concepts.beginner.filter(c => 
            ['conditionals', 'loops', 'functions'].includes(c.source.concept)
          ),
        },
        {
          title: 'Data Structures',
          concepts: concepts.intermediate.filter(c => 
            ['arrays', 'objects', 'dictionaries'].includes(c.source.concept)
          ),
        },
        {
          title: 'Advanced Concepts',
          concepts: concepts.advanced,
        },
      ],
    };
  }

  async trackUserProgress(userId: string, sourceLanguage: string, targetLanguage: string, conceptId: string, success: boolean) {
    await prisma.userProgress.upsert({
      where: {
        userId_sourceLanguage_targetLanguage_conceptId: {
          userId,
          sourceLanguage,
          targetLanguage,
          conceptId,
        },
      },
      update: {
        successCount: { increment: success ? 1 : 0 },
        failureCount: { increment: success ? 0 : 1 },
        lastAttemptAt: new Date(),
      },
      create: {
        userId,
        sourceLanguage,
        targetLanguage,
        conceptId,
        successCount: success ? 1 : 0,
        failureCount: success ? 0 : 1,
        lastAttemptAt: new Date(),
      },
    });
  }

  async getPersonalizedSuggestions(userId: string, sourceLanguage: string, targetLanguage: string) {
    const progress = await prisma.userProgress.findMany({
      where: {
        userId,
        sourceLanguage,
        targetLanguage,
      },
      orderBy: {
        failureCount: 'desc',
      },
    });

    const suggestions = [];
    for (const item of progress) {
      if (item.failureCount > item.successCount) {
        const mapping = (await this.getLanguageMapping(sourceLanguage, targetLanguage))
          .find(m => m.source.concept === item.conceptId);
        
        if (mapping) {
          suggestions.push({
            concept: mapping.source.concept,
            difficulty: 'needs_practice',
            exercises: mapping.exercises,
            mistakes: mapping.commonMistakes,
          });
        }
      }
    }

    return suggestions;
  }
}
