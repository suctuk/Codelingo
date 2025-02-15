import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface ConceptMapping {
  concept: string;
  sourceLanguage: {
    syntax: string;
    example: string;
    notes: string[];
  };
  targetLanguage: {
    syntax: string;
    example: string;
    notes: string[];
  };
  commonMistakes: {
    mistake: string;
    explanation: string;
    correction: string;
  }[];
}

export class LanguageComparisonService {
  // Language concept mappings
  private conceptMappings: { [key: string]: ConceptMapping[] } = {
    'python-to-javascript': [
      {
        concept: 'print_output',
        sourceLanguage: {
          syntax: 'print(value)',
          example: 'print("Hello, World!")',
          notes: [
            'Automatically adds newline',
            'Can print multiple values with comma separation',
          ],
        },
        targetLanguage: {
          syntax: 'console.log(value)',
          example: 'console.log("Hello, World!");',
          notes: [
            'Automatically adds newline',
            'Can print multiple values with comma separation',
            'Semicolon recommended at end',
          ],
        },
        commonMistakes: [
          {
            mistake: 'print("Hello")',
            explanation: 'Python\'s print() doesn\'t exist in JavaScript',
            correction: 'console.log("Hello");',
          },
        ],
      },
      {
        concept: 'variables',
        sourceLanguage: {
          syntax: 'variable_name = value',
          example: 'name = "Alice"\nage = 25',
          notes: [
            'Dynamic typing',
            'No declaration keyword needed',
          ],
        },
        targetLanguage: {
          syntax: 'let/const variable_name = value',
          example: 'let name = "Alice";\nconst age = 25;',
          notes: [
            'Use let for mutable variables',
            'Use const for immutable variables',
            'Still dynamically typed but with declaration',
          ],
        },
        commonMistakes: [
          {
            mistake: 'name = "Alice"',
            explanation: 'Missing declaration keyword',
            correction: 'let name = "Alice";',
          },
        ],
      },
    ],
    'javascript-to-python': [
      {
        concept: 'console_output',
        sourceLanguage: {
          syntax: 'console.log(value);',
          example: 'console.log("Hello, World!");',
          notes: [
            'Part of console object',
            'Semicolon at end',
          ],
        },
        targetLanguage: {
          syntax: 'print(value)',
          example: 'print("Hello, World!")',
          notes: [
            'Standalone function',
            'No semicolon needed',
          ],
        },
        commonMistakes: [
          {
            mistake: 'console.log("Hello");',
            explanation: 'JavaScript console.log syntax used in Python',
            correction: 'print("Hello")',
          },
        ],
      },
    ],
  };

  // Get comparison data for two languages
  async getLanguageComparison(sourceLanguage: string, targetLanguage: string) {
    const key = `${sourceLanguage}-to-${targetLanguage}`;
    return this.conceptMappings[key] || [];
  }

  // Generate practice exercises based on common mistakes
  async generateTransitionExercises(sourceLanguage: string, targetLanguage: string) {
    const comparisons = await this.getLanguageComparison(sourceLanguage, targetLanguage);
    const exercises = [];

    for (const comparison of comparisons) {
      // Create multiple choice exercises
      exercises.push({
        type: 'multiple_choice',
        prompt: `How would you write this ${sourceLanguage} code in ${targetLanguage}?\n${comparison.sourceLanguage.example}`,
        options: [
          comparison.targetLanguage.example,
          comparison.commonMistakes[0]?.mistake || '',
          // Generate additional plausible but incorrect options
          this.generatePlausibleIncorrectOption(comparison),
          this.generatePlausibleIncorrectOption(comparison),
        ],
        correctAnswer: 0,
      });

      // Create code conversion exercises
      exercises.push({
        type: 'code_conversion',
        prompt: `Convert this ${sourceLanguage} code to ${targetLanguage}:`,
        sourceCode: comparison.sourceLanguage.example,
        solution: comparison.targetLanguage.example,
        hints: comparison.targetLanguage.notes,
      });

      // Create spot the difference exercises
      exercises.push({
        type: 'spot_difference',
        prompt: 'Spot the key differences between these implementations:',
        sourceCode: comparison.sourceLanguage.example,
        targetCode: comparison.targetLanguage.example,
        differences: this.generateKeyDifferences(comparison),
      });
    }

    return exercises;
  }

  // Generate a plausible but incorrect option for multiple choice
  private generatePlausibleIncorrectOption(comparison: ConceptMapping): string {
    // Mix source and target syntax
    const sourceTokens = comparison.sourceLanguage.syntax.split(' ');
    const targetTokens = comparison.targetLanguage.syntax.split(' ');
    
    return sourceTokens[0] + ' ' + targetTokens.slice(1).join(' ');
  }

  // Generate key differences between implementations
  private generateKeyDifferences(comparison: ConceptMapping) {
    const differences = [];
    
    // Compare syntax elements
    const sourceParts = comparison.sourceLanguage.syntax.split(/[\s\(\)]+/);
    const targetParts = comparison.targetLanguage.syntax.split(/[\s\(\)]+/);
    
    for (let i = 0; i < Math.max(sourceParts.length, targetParts.length); i++) {
      if (sourceParts[i] !== targetParts[i]) {
        differences.push({
          source: sourceParts[i],
          target: targetParts[i],
          explanation: this.explainDifference(sourceParts[i], targetParts[i]),
        });
      }
    }

    return differences;
  }

  // Explain the difference between source and target syntax elements
  private explainDifference(source: string, target: string): string {
    if (!source || !target) return 'Syntax structure differs';
    
    if (source.includes('print') && target.includes('console')) {
      return 'Output function name and context differs';
    }
    
    if (source.includes('let') || source.includes('const')) {
      return 'Variable declaration keywords differ';
    }
    
    return 'Syntax element differs';
  }

  // Get recommended learning path based on user's source language
  async getRecommendedPath(sourceLanguage: string, targetLanguage: string) {
    const comparisons = await this.getLanguageComparison(sourceLanguage, targetLanguage);
    
    return {
      sections: [
        {
          title: 'Language Transition Basics',
          units: [
            {
              title: 'Syntax Differences',
              lessons: [
                {
                  title: 'Basic Syntax Comparison',
                  concepts: comparisons.filter(c => 
                    ['print_output', 'variables'].includes(c.concept)
                  ),
                },
                {
                  title: 'Common Gotchas',
                  concepts: comparisons.filter(c => c.commonMistakes.length > 0),
                },
              ],
            },
          ],
        },
        // Add more sections based on concept categories
      ],
    };
  }

  // Get personalized exercises based on user's common mistakes
  async getPersonalizedExercises(userId: string, sourceLanguage: string, targetLanguage: string) {
    const userMistakes = await prisma.userMistake.findMany({
      where: {
        userId,
        sourceLanguage,
        targetLanguage,
      },
      orderBy: {
        frequency: 'desc',
      },
    });

    const exercises = [];
    for (const mistake of userMistakes) {
      exercises.push({
        type: 'code_correction',
        prompt: 'Fix this common mistake in your code:',
        code: mistake.incorrectCode,
        solution: mistake.correctCode,
        explanation: mistake.explanation,
      });
    }

    return exercises;
  }

  // Record user's mistake for personalized learning
  async recordMistake(
    userId: string,
    sourceLanguage: string,
    targetLanguage: string,
    incorrectCode: string,
    correctCode: string,
  ) {
    await prisma.userMistake.upsert({
      where: {
        userId_incorrectCode: {
          userId,
          incorrectCode,
        },
      },
      update: {
        frequency: { increment: 1 },
      },
      create: {
        userId,
        sourceLanguage,
        targetLanguage,
        incorrectCode,
        correctCode,
        frequency: 1,
      },
    });
  }
}
