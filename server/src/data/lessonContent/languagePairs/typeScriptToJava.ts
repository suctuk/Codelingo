import { LanguagePairCurriculum } from '../curriculumTemplate';
import { generateLesson, commonConcepts } from '../lessonGenerator';
import { languageConfigs } from '../languagePairFactory';

export const typeScriptToJava: LanguagePairCurriculum = {
  sourceLanguage: 'TypeScript',
  targetLanguage: 'Java',
  sections: [
    {
      id: 'section_1_basics',
      title: 'Getting Started with Java',
      description: 'Learn the fundamental differences between TypeScript and Java syntax',
      units: [
        {
          id: 'unit_1_1_printing',
          title: 'Print Statements and Basic Output',
          description: 'Learn how to output text and values in Java',
          lessons: [
            {
              id: 'lesson_1_1_1',
              title: 'Your First Java Output',
              content: {
                theory: 'In TypeScript, you use console.log(). In Java, you use System.out.println().',
                difficulty: 'beginner',
                xpPoints: 10,
                examples: [
                  {
                    source: 'console.log("Hello, World!");',
                    target: 'System.out.println("Hello, World!");',
                    explanation: 'Java uses System.out.println() instead of console.log()'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert this TypeScript print statement to Java',
                    code: 'console.log("I am learning Java");',
                    solution: 'System.out.println("I am learning Java");',
                    hints: ['Use System.out.println', 'Keep the semicolon'],
                    xpReward: 5
                  }
                ]
              },
              prerequisites: [],
              estimatedTime: 5
            },
            {
              id: 'lesson_1_1_2',
              title: 'String Formatting',
              content: {
                theory: 'Java uses String.format() or printf() instead of template literals',
                difficulty: 'beginner',
                xpPoints: 15,
                examples: [
                  {
                    source: 'console.log(`Hello, ${name}!`);',
                    target: 'System.out.printf("Hello, %s!%n", name);',
                    explanation: 'Java uses %s for strings, %d for numbers, etc.'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert this TypeScript template literal to Java',
                    code: 'console.log(`Age: ${age}, Name: ${name}`);',
                    solution: 'System.out.printf("Age: %d, Name: %s%n", age, name);',
                    hints: ['Use printf', 'Use %d for numbers, %s for strings', 'Add %n for newline'],
                    xpReward: 10
                  }
                ]
              },
              prerequisites: ['lesson_1_1_1'],
              estimatedTime: 8
            }
          ],
          skillLevel: 'beginner',
          xpToUnlock: 0
        },
        {
          id: 'unit_1_2_variables',
          title: 'Variables and Data Types',
          description: 'Learn about Java variables compared to TypeScript',
          lessons: [
            {
              id: 'lesson_1_2_1',
              title: 'Variable Declaration',
              content: {
                theory: 'Java requires explicit type declarations, unlike TypeScript\'s type inference',
                difficulty: 'beginner',
                xpPoints: 15,
                examples: [
                  {
                    source: 'let name: string = "John";\nlet age: number = 25;',
                    target: 'String name = "John";\nint age = 25;',
                    explanation: 'Java uses specific types like String and int'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert these TypeScript variables to Java',
                    code: 'let count: number = 10;\nlet message: string = "Hello";',
                    solution: 'int count = 10;\nString message = "Hello";',
                    hints: ['Use int for numbers', 'Use String for strings', 'Type comes before name'],
                    xpReward: 10
                  }
                ]
              },
              prerequisites: [],
              estimatedTime: 8
            },
            {
              id: 'lesson_1_2_2',
              title: 'Constants',
              content: {
                theory: 'Java uses final instead of const',
                difficulty: 'beginner',
                xpPoints: 15,
                examples: [
                  {
                    source: 'const PI: number = 3.14159;',
                    target: 'final double PI = 3.14159;',
                    explanation: 'Java uses final keyword and requires type'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert this TypeScript constant to Java',
                    code: 'const MAX_VALUE: number = 100;',
                    solution: 'final int MAX_VALUE = 100;',
                    hints: ['Use final instead of const', 'Add type declaration'],
                    xpReward: 10
                  }
                ]
              },
              prerequisites: ['lesson_1_2_1'],
              estimatedTime: 8
            }
          ],
          skillLevel: 'beginner',
          xpToUnlock: 50
        }
      ],
      requiredSections: []
    },
    {
      id: 'section_2_control_flow',
      title: 'Control Flow',
      description: 'Learn how Java handles conditions and loops',
      units: [
        {
          id: 'unit_2_1_conditionals',
          title: 'If Statements and Conditions',
          description: 'Learn Java conditional statements',
          lessons: [
            {
              id: 'lesson_2_1_1',
              title: 'Basic If Statements',
              content: {
                theory: 'Java if statements are similar to TypeScript but with stricter type checking',
                difficulty: 'beginner',
                xpPoints: 20,
                examples: [
                  {
                    source: 'if (x > 0) {\n    console.log("Positive");\n}',
                    target: 'if (x > 0) {\n    System.out.println("Positive");\n}',
                    explanation: 'Structure is the same, just different print method'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert this TypeScript if statement to Java',
                    code: 'if (age >= 18) {\n    console.log("Adult");\n}',
                    solution: 'if (age >= 18) {\n    System.out.println("Adult");\n}',
                    hints: ['Keep the structure', 'Change console.log to System.out.println'],
                    xpReward: 15
                  }
                ]
              },
              prerequisites: [],
              estimatedTime: 10
            },
            {
              id: 'lesson_2_1_2',
              title: 'Type Checking',
              content: {
                theory: 'Java uses instanceof instead of TypeScript\'s typeof',
                difficulty: 'beginner',
                xpPoints: 20,
                examples: [
                  {
                    source: 'if (typeof value === "string") {\n    console.log("Is string");\n}',
                    target: 'if (value instanceof String) {\n    System.out.println("Is string");\n}',
                    explanation: 'Java uses instanceof for type checking'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert this TypeScript type check to Java',
                    code: 'if (typeof obj === "object") {\n    console.log("Is object");\n}',
                    solution: 'if (obj instanceof Object) {\n    System.out.println("Is object");\n}',
                    hints: ['Use instanceof', 'Use proper Java class names'],
                    xpReward: 15
                  }
                ]
              },
              prerequisites: ['lesson_2_1_1'],
              estimatedTime: 10
            }
          ],
          skillLevel: 'beginner',
          xpToUnlock: 100
        }
      ],
      requiredSections: ['section_1_basics']
    }
  ],
  metadata: {
    totalLessons: 300,
    estimatedHours: 40,
    difficulty: 'Beginner to Advanced',
    prerequisites: ['Basic TypeScript knowledge'],
    learningOutcomes: [
      'Write Java code confidently',
      'Understand key differences from TypeScript',
      'Create basic Java programs',
      'Use Java\'s type system effectively'
    ]
  }
};
