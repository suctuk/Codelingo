import { LessonContent, Lesson } from './curriculumTemplate';
import { languageConfigs } from './languagePairFactory';

interface ConceptMapping {
  source: string;
  target: string;
  explanation: string;
  examples: Array<{
    source: string;
    target: string;
    explanation: string;
  }>;
}

export function generateLesson(
  sourceLanguage: string,
  targetLanguage: string,
  concept: string,
  conceptMapping: ConceptMapping
): Lesson {
  const sourceConfig = languageConfigs[sourceLanguage.toLowerCase()];
  const targetConfig = languageConfigs[targetLanguage.toLowerCase()];

  const content: LessonContent = {
    theory: `Learn how to use ${concept} in ${targetConfig.name} coming from ${sourceConfig.name}. ${conceptMapping.explanation}`,
    difficulty: 'beginner',
    xpPoints: 10,
    examples: conceptMapping.examples,
    exercises: [
      {
        type: 'code_conversion',
        question: `Convert this ${sourceConfig.name} code to ${targetConfig.name}:`,
        code: conceptMapping.source,
        solution: conceptMapping.target,
        hints: [
          `Look at how ${concept} differs between the languages`,
          'Pay attention to syntax differences'
        ],
        xpReward: 10
      },
      {
        type: 'multiple_choice',
        question: `Which is the correct ${targetConfig.name} equivalent of this ${sourceConfig.name} code?`,
        code: conceptMapping.source,
        solution: conceptMapping.target,
        hints: ['Compare the syntax carefully'],
        xpReward: 5
      }
    ],
    practice: {
      type: 'interactive_terminal',
      instructions: `Write a ${targetConfig.name} program that demonstrates the use of ${concept}`,
      testCases: [
        {
          input: '',
          expectedOutput: '',
          code: conceptMapping.target
        }
      ],
      xpReward: 15
    }
  };

  return {
    id: `lesson_${concept.toLowerCase().replace(/\s+/g, '_')}`,
    title: concept,
    content,
    estimatedTime: 10
  };
}

// Common concept mappings between languages
export const commonConcepts: { [key: string]: ConceptMapping } = {
  'print': {
    source: 'console.log("Hello World");',
    target: 'print("Hello World")',
    explanation: 'Learn how to output text and values to the console',
    examples: [
      {
        source: 'console.log("Hello");',
        target: 'print("Hello")',
        explanation: 'Basic string output'
      },
      {
        source: 'console.log(42);',
        target: 'print(42)',
        explanation: 'Number output'
      }
    ]
  },
  'variables': {
    source: 'let x = 42;\nconst y = "hello";',
    target: 'x = 42\ny = "hello"',
    explanation: 'Learn how variables are declared and used',
    examples: [
      {
        source: 'let name = "John";',
        target: 'name = "John"',
        explanation: 'String variable assignment'
      },
      {
        source: 'const PI = 3.14;',
        target: 'PI = 3.14',
        explanation: 'Number constant assignment'
      }
    ]
  },
  'functions': {
    source: 'function greet(name) {\n  return "Hello, " + name;\n}',
    target: 'def greet(name):\n    return "Hello, " + name',
    explanation: 'Learn how to define and use functions',
    examples: [
      {
        source: 'function add(a, b) { return a + b; }',
        target: 'def add(a, b):\n    return a + b',
        explanation: 'Basic function with parameters'
      },
      {
        source: 'const square = (x) => x * x;',
        target: 'def square(x):\n    return x * x',
        explanation: 'Function with single parameter'
      }
    ]
  }
};
