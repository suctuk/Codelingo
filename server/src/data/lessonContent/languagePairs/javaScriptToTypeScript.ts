import { LanguagePairCurriculum } from '../curriculumTemplate';
import { generateLesson, commonConcepts } from '../lessonGenerator';
import { languageConfigs } from '../languagePairFactory';

const javaScriptToTypeScriptSpecificConcepts = {
  'type-inference': {
    source: 'const name = "John";\nconst age = 30;',
    target: 'const name = "John"; // TypeScript infers string\nconst age = 30; // TypeScript infers number',
    explanation: 'TypeScript can infer types from JavaScript initialization',
    examples: [
      {
        source: 'const items = ["a", "b", "c"];',
        target: 'const items = ["a", "b", "c"]; // TypeScript infers string[]',
        explanation: 'Array types are inferred from contents'
      }
    ]
  },
  'function-types': {
    source: 'function add(a, b) {\n    return a + b;\n}',
    target: 'function add(a: number, b: number): number {\n    return a + b;\n}',
    explanation: 'Add type annotations to JavaScript functions',
    examples: [
      {
        source: 'const greet = (name) => `Hello ${name}`;',
        target: 'const greet = (name: string): string => `Hello ${name}`;',
        explanation: 'Arrow functions can have type annotations'
      }
    ]
  },
  'class-types': {
    source: 'class User {\n    constructor(name, age) {\n        this.name = name;\n        this.age = age;\n    }\n}',
    target: 'class User {\n    name: string;\n    age: number;\n    \n    constructor(name: string, age: number) {\n        this.name = name;\n        this.age = age;\n    }\n}',
    explanation: 'Add property declarations and constructor types',
    examples: [
      {
        source: 'class Point {\n    constructor(x, y) {\n        this.x = x;\n        this.y = y;\n    }\n}',
        target: 'class Point {\n    constructor(private x: number, private y: number) {}\n}',
        explanation: 'Use parameter properties for cleaner code'
      }
    ]
  }
};

export const javaScriptToTypeScript: LanguagePairCurriculum = {
  sourceLanguage: 'JavaScript',
  targetLanguage: 'TypeScript',
  sections: [
    {
      id: 'section_1_fundamentals',
      title: 'TypeScript Fundamentals for JavaScript Developers',
      description: 'Learn how to add types to JavaScript code',
      units: [
        {
          id: 'unit_1_1_basics',
          title: 'Basic Types',
          description: 'Learn TypeScript\'s basic type system',
          lessons: [
            {
              id: 'lesson_1_1_1',
              title: 'Type Annotations',
              content: {
                theory: 'TypeScript adds type annotations to JavaScript code',
                difficulty: 'beginner',
                xpPoints: 15,
                examples: [
                  {
                    source: 'let name = "John";\nlet age = 30;',
                    target: 'let name: string = "John";\nlet age: number = 30;',
                    explanation: 'Basic type annotations in TypeScript'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Add TypeScript types to this JavaScript code',
                    code: 'function greet(name) {\n    return `Hello ${name}`;\n}',
                    solution: 'function greet(name: string): string {\n    return `Hello ${name}`;\n}',
                    hints: [
                      'Add parameter type',
                      'Add return type',
                      'Use string type for text'
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
          id: 'unit_1_2_interfaces',
          title: 'Interfaces and Types',
          description: 'Learn how to define types for JavaScript objects',
          lessons: [
            {
              id: 'lesson_1_2_1',
              title: 'Object Types',
              content: {
                theory: 'TypeScript interfaces define shapes for JavaScript objects',
                difficulty: 'beginner',
                xpPoints: 20,
                examples: [
                  {
                    source: 'const user = {\n    name: "John",\n    age: 30\n};',
                    target: 'interface User {\n    name: string;\n    age: number;\n}\n\nconst user: User = {\n    name: "John",\n    age: 30\n};',
                    explanation: 'Define interfaces for object shapes'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Add TypeScript interface to this JavaScript code',
                    code: 'class Circle {\n    constructor(radius) {\n        this.radius = radius;\n    }\n    \n    area() {\n        return Math.PI * this.radius * this.radius;\n    }\n}',
                    solution: 'interface Shape {\n    area(): number;\n}\n\nclass Circle implements Shape {\n    constructor(private radius: number) {}\n    \n    area(): number {\n        return Math.PI * this.radius * this.radius;\n    }\n}',
                    hints: [
                      'Create Shape interface',
                      'Add implements clause',
                      'Add type annotations',
                      'Use parameter property'
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
      title: 'Advanced TypeScript Features',
      description: 'Learn advanced TypeScript patterns for JavaScript code',
      units: [
        {
          id: 'unit_2_1_generics',
          title: 'Generic Types',
          description: 'Learn how to add generic types to JavaScript code',
          lessons: [
            {
              id: 'lesson_2_1_1',
              title: 'Generic Functions',
              content: {
                theory: 'Add generic type parameters to make functions type-safe',
                difficulty: 'intermediate',
                xpPoints: 30,
                examples: [
                  {
                    source: 'function first(arr) {\n    return arr[0];\n}',
                    target: 'function first<T>(arr: T[]): T | undefined {\n    return arr[0];\n}',
                    explanation: 'Generic types preserve type information'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Add generic types to this JavaScript class',
                    code: 'class Box {\n    constructor(value) {\n        this.value = value;\n    }\n    \n    getValue() {\n        return this.value;\n    }\n}',
                    solution: 'class Box<T> {\n    constructor(private value: T) {}\n    \n    getValue(): T {\n        return this.value;\n    }\n}',
                    hints: [
                      'Add type parameter T',
                      'Use T in constructor',
                      'Add return type',
                      'Use parameter property'
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
    prerequisites: ['Basic JavaScript knowledge'],
    learningOutcomes: [
      'Add type safety to JavaScript code',
      'Use TypeScript\'s type system effectively',
      'Define interfaces and types',
      'Work with generics',
      'Understand type inference'
    ]
  }
};
