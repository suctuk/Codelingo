import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface NaturalLanguageConcept {
  id: string;
  englishDescription: string;
  realWorldAnalogy: string;
  visualExample: {
    type: 'image' | 'animation' | 'interactive';
    content: string;
  };
  codeImplementations: {
    [language: string]: {
      code: string;
      explanation: string;
      steps: string[];
    };
  };
}

interface LearningPath {
  level: 'absolute_beginner' | 'beginner' | 'intermediate' | 'advanced';
  concepts: string[];
  prerequisites: string[];
  estimatedHours: number;
}

export class NaturalLanguageLearningService {
  private concepts: { [key: string]: NaturalLanguageConcept } = {
    'store_information': {
      id: 'store_information',
      englishDescription: 'Save a piece of information to use later',
      realWorldAnalogy: 'Like writing a note in a notebook to remember something',
      visualExample: {
        type: 'animation',
        content: 'box-storing-item-animation'
      },
      codeImplementations: {
        python: {
          code: 'name = "John"',
          explanation: 'This is like labeling a box "name" and putting "John" inside it',
          steps: [
            'Think of a label (variable name)',
            'Use = to show you\'re storing something',
            'Put the information you want to store in quotes'
          ]
        },
        javascript: {
          code: 'let name = "John";',
          explanation: 'We create a container labeled "name" and put "John" inside it',
          steps: [
            'Use let to create a new container',
            'Choose a name for your container',
            'Use = to put something in it',
            'End with a semicolon'
          ]
        }
      }
    },
    'repeat_action': {
      id: 'repeat_action',
      englishDescription: 'Do something multiple times',
      realWorldAnalogy: 'Like following a recipe that says "stir 10 times"',
      visualExample: {
        type: 'animation',
        content: 'loop-stirring-animation'
      },
      codeImplementations: {
        python: {
          code: 'for i in range(10):\n    print("Hello")',
          explanation: 'This tells the computer to say "Hello" 10 times',
          steps: [
            'Use for to start the repetition',
            'range(10) means "do it 10 times"',
            'Put what you want to repeat after the colon',
            'Indent the repeated action'
          ]
        },
        javascript: {
          code: 'for (let i = 0; i < 10; i++) {\n    console.log("Hello");\n}',
          explanation: 'This repeats "Hello" 10 times',
          steps: [
            'Use for to start the repetition',
            'Set up a counter with let i = 0',
            'Keep going while counter is less than 10',
            'i++ means "add 1 to the counter each time"',
            'Put the repeated action between { }'
          ]
        }
      }
    },
    'make_decision': {
      id: 'make_decision',
      englishDescription: 'Do something only if a condition is true',
      realWorldAnalogy: 'Like checking if it\'s raining before taking an umbrella',
      visualExample: {
        type: 'interactive',
        content: 'weather-decision-interactive'
      },
      codeImplementations: {
        python: {
          code: 'if weather == "rainy":\n    take_umbrella()',
          explanation: 'This checks if it\'s rainy and takes an umbrella if it is',
          steps: [
            'Use if to start the decision',
            'Write what you\'re checking for',
            'Put : at the end of the condition',
            'Indent what should happen'
          ]
        },
        javascript: {
          code: 'if (weather === "rainy") {\n    takeUmbrella();\n}',
          explanation: 'This checks the weather and takes an umbrella if needed',
          steps: [
            'Use if to start the decision',
            'Put the condition in ()',
            'Use === to check if something equals something else',
            'Put the action in { }'
          ]
        }
      }
    }
  };

  private learningPaths: { [key: string]: LearningPath[] } = {
    python: [
      {
        level: 'absolute_beginner',
        concepts: ['store_information', 'show_message', 'basic_math'],
        prerequisites: [],
        estimatedHours: 2
      },
      {
        level: 'beginner',
        concepts: ['make_decision', 'repeat_action', 'make_list'],
        prerequisites: ['store_information'],
        estimatedHours: 4
      }
    ],
    javascript: [
      {
        level: 'absolute_beginner',
        concepts: ['store_information', 'show_message', 'basic_math'],
        prerequisites: [],
        estimatedHours: 2
      },
      {
        level: 'beginner',
        concepts: ['make_decision', 'repeat_action', 'make_list'],
        prerequisites: ['store_information'],
        estimatedHours: 4
      }
    ]
  };

  async getConcept(conceptId: string): Promise<NaturalLanguageConcept | null> {
    return this.concepts[conceptId] || null;
  }

  async getLearningPath(language: string, level: string): Promise<LearningPath | null> {
    return this.learningPaths[language]?.find(path => path.level === level) || null;
  }

  async generateExercise(conceptId: string, language: string): Promise<any> {
    const concept = await this.getConcept(conceptId);
    if (!concept) return null;

    return {
      type: 'natural_to_code',
      difficulty: 'absolute_beginner',
      content: {
        englishPrompt: `How would you ${concept.englishDescription.toLowerCase()}?`,
        realWorldExample: concept.realWorldAnalogy,
        hints: [
          'Think about the real-world example',
          ...concept.codeImplementations[language].steps
        ],
        solution: concept.codeImplementations[language].code
      }
    };
  }

  async generatePracticeExercise(conceptId: string, language: string): Promise<any> {
    const concept = await this.getConcept(conceptId);
    if (!concept) return null;

    // Generate variations of the concept
    const variations = [
      {
        type: 'fill_in_blanks',
        prompt: 'Complete the code:',
        template: concept.codeImplementations[language].code.replace(/["'\w]+/g, '___'),
        solution: concept.codeImplementations[language].code
      },
      {
        type: 'english_to_code',
        prompt: `Write code to ${concept.englishDescription.toLowerCase()}`,
        solution: concept.codeImplementations[language].code
      },
      {
        type: 'match_steps',
        prompt: 'Put these steps in order:',
        steps: [...concept.codeImplementations[language].steps].sort(() => Math.random() - 0.5),
        solution: concept.codeImplementations[language].steps
      }
    ];

    return variations[Math.floor(Math.random() * variations.length)];
  }

  async trackProgress(userId: string, conceptId: string, success: boolean) {
    await prisma.userConceptProgress.upsert({
      where: {
        userId_conceptId: {
          userId,
          conceptId
        }
      },
      update: {
        attempts: { increment: 1 },
        successfulAttempts: success ? { increment: 1 } : undefined,
        lastAttemptAt: new Date()
      },
      create: {
        userId,
        conceptId,
        attempts: 1,
        successfulAttempts: success ? 1 : 0,
        lastAttemptAt: new Date()
      }
    });
  }

  async getNextConcepts(userId: string, language: string): Promise<string[]> {
    // Get user's progress
    const progress = await prisma.userConceptProgress.findMany({
      where: { userId }
    });

    // Find the appropriate learning path
    const masteredConcepts = progress
      .filter(p => p.successfulAttempts / p.attempts > 0.8)
      .map(p => p.conceptId);

    // Find the first learning path where user hasn't mastered all concepts
    const appropriatePath = this.learningPaths[language].find(path =>
      path.concepts.some(concept => !masteredConcepts.includes(concept)) &&
      path.prerequisites.every(prereq => masteredConcepts.includes(prereq))
    );

    return appropriatePath?.concepts.filter(concept => !masteredConcepts.includes(concept)) || [];
  }

  async getPersonalizedExercises(userId: string, language: string): Promise<any[]> {
    const nextConcepts = await this.getNextConcepts(userId, language);
    const exercises = [];

    for (const conceptId of nextConcepts) {
      exercises.push(await this.generateExercise(conceptId, language));
      exercises.push(await this.generatePracticeExercise(conceptId, language));
    }

    return exercises;
  }
}
