import { LanguagePairCurriculum } from '../curriculumTemplate';
import { generateLesson, commonConcepts } from '../lessonGenerator';
import { languageConfigs } from '../languagePairFactory';

const typeScriptToJavaScriptSpecificConcepts = {
  'type-erasure': {
    source: 'function identity<T>(arg: T): T {\n    return arg;\n}',
    target: 'function identity(arg) {\n    return arg;\n}',
    explanation: 'TypeScript types are removed during compilation to JavaScript',
    examples: [
      {
        source: 'const value: string = "hello";',
        target: 'const value = "hello";',
        explanation: 'Type annotations are removed'
      },
      {
        source: 'interface User { name: string; age: number; }',
        target: '// No runtime representation needed',
        explanation: 'Interfaces are completely removed'
      }
    ]
  },
  'enum-conversion': {
    source: 'enum Direction {\n    Up = "UP",\n    Down = "DOWN"\n}',
    target: 'const Direction = {\n    Up: "UP",\n    Down: "DOWN"\n} as const;',
    explanation: 'TypeScript enums become objects in JavaScript',
    examples: [
      {
        source: 'enum Status { Active = 1, Inactive = 0 }',
        target: 'const Status = {\n    Active: 1,\n    Inactive: 0\n} as const;',
        explanation: 'Numeric enums become object with number values'
      }
    ]
  },
  'type-guards': {
    source: 'function isString(value: any): value is string {\n    return typeof value === "string";\n}',
    target: 'function isString(value) {\n    return typeof value === "string";\n}',
    explanation: 'Type guards become regular runtime checks in JavaScript',
    examples: [
      {
        source: 'if (value instanceof Error) {\n    console.log(value.message);\n}',
        target: 'if (value instanceof Error) {\n    console.log(value.message);\n}',
        explanation: 'instanceof checks work the same in both languages'
      }
    ]
  }
};

export const typeScriptToJavaScript: LanguagePairCurriculum = {
  sourceLanguage: 'TypeScript',
  targetLanguage: 'JavaScript',
  sections: [
    {
      id: 'section_1_fundamentals',
      title: 'JavaScript Fundamentals for TypeScript Developers',
      description: 'Learn how TypeScript code becomes JavaScript',
      units: [
        {
          id: 'unit_1_1_basics',
          title: 'Type Erasure',
          description: 'Learn how TypeScript types are removed in JavaScript',
          lessons: [
            {
              id: 'lesson_1_1_1',
              title: 'Basic Type Removal',
              content: {
                theory: 'TypeScript types are development-time only and are removed when converting to JavaScript',
                difficulty: 'beginner',
                xpPoints: 15,
                examples: [
                  {
                    source: 'let name: string = "John";\nlet age: number = 30;',
                    target: 'let name = "John";\nlet age = 30;',
                    explanation: 'Type annotations are removed in JavaScript'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert this TypeScript code to JavaScript',
                    code: 'function greet(name: string): string {\n    return `Hello ${name}`;\n}',
                    solution: 'function greet(name) {\n    return `Hello ${name}`;\n}',
                    hints: [
                      'Remove parameter types',
                      'Remove return type',
                      'Keep the function logic'
                    ],
                    xpReward: 10
                  }
                ]
              },
              prerequisites: [],
              estimatedTime: 10
            }
          ],
          skillLevel: 'beginner',
          xpToUnlock: 0
        },
        {
          id: 'unit_1_2_runtime',
          title: 'Runtime Behavior',
          description: 'Learn how TypeScript features work at runtime in JavaScript',
          lessons: [
            {
              id: 'lesson_1_2_1',
              title: 'Interface Removal',
              content: {
                theory: 'TypeScript interfaces have no runtime representation in JavaScript',
                difficulty: 'beginner',
                xpPoints: 20,
                examples: [
                  {
                    source: 'interface User {\n    name: string;\n    age: number;\n}\n\nclass Employee implements User {\n    constructor(public name: string, public age: number) {}\n}',
                    target: 'class Employee {\n    constructor(name, age) {\n        this.name = name;\n        this.age = age;\n    }\n}',
                    explanation: 'Interfaces and their implementations are removed'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert this TypeScript interface and class to JavaScript',
                    code: 'interface Shape {\n    area(): number;\n}\n\nclass Circle implements Shape {\n    constructor(private radius: number) {}\n    \n    area(): number {\n        return Math.PI * this.radius * this.radius;\n    }\n}',
                    solution: 'class Circle {\n    constructor(radius) {\n        this.radius = radius;\n    }\n    \n    area() {\n        return Math.PI * this.radius * this.radius;\n    }\n}',
                    hints: [
                      'Remove the interface',
                      'Remove type annotations',
                      'Keep the implementation logic',
                      'Remove access modifiers'
                    ],
                    xpReward: 15
                  }
                ]
              },
              prerequisites: [],
              estimatedTime: 15
            }
          ],
          skillLevel: 'beginner',
          xpToUnlock: 30
        }
      ],
      requiredSections: []
    },
    {
      id: 'section_2_advanced',
      title: 'Advanced Runtime Patterns',
      description: 'Learn advanced JavaScript patterns from TypeScript code',
      units: [
        {
          id: 'unit_2_1_patterns',
          title: 'Runtime Type Checking',
          description: 'Learn how to handle types at runtime in JavaScript',
          lessons: [
            {
              id: 'lesson_2_1_1',
              title: 'Type Guards',
              content: {
                theory: 'TypeScript type guards become runtime checks in JavaScript',
                difficulty: 'intermediate',
                xpPoints: 30,
                examples: [
                  {
                    source: 'function processValue(value: string | number) {\n    if (typeof value === "string") {\n        return value.toUpperCase();\n    } else {\n        return value * 2;\n    }\n}',
                    target: 'function processValue(value) {\n    if (typeof value === "string") {\n        return value.toUpperCase();\n    } else {\n        return value * 2;\n    }\n}',
                    explanation: 'Runtime type checks remain the same'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert this TypeScript type guard to JavaScript',
                    code: 'interface Dog { bark(): void; }\ninterface Cat { meow(): void; }\n\nfunction isDog(animal: Dog | Cat): animal is Dog {\n    return "bark" in animal;\n}',
                    solution: 'function isDog(animal) {\n    return "bark" in animal;\n}',
                    hints: [
                      'Remove interfaces',
                      'Keep the runtime check',
                      'Remove type predicate',
                      'Keep the function logic'
                    ],
                    xpReward: 20
                  }
                ]
              },
              prerequisites: [],
              estimatedTime: 20
            }
          ],
          skillLevel: 'intermediate',
          xpToUnlock: 100
        }
      ],
      requiredSections: ['section_1_fundamentals']
    }
  ],
  metadata: {
    totalLessons: 300,
    estimatedHours: 40,
    difficulty: 'Beginner to Advanced',
    prerequisites: ['Basic TypeScript knowledge'],
    learningOutcomes: [
      'Understand TypeScript compilation to JavaScript',
      'Handle runtime type checking in JavaScript',
      'Work with JavaScript\'s dynamic nature',
      'Implement TypeScript patterns in JavaScript',
      'Debug JavaScript code compiled from TypeScript'
    ]
  }
};
