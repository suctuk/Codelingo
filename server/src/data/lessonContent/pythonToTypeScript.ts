import { createLanguagePairCurriculum } from './languagePairFactory';

export const pythonToTypeScriptCurriculum = {
  ...createLanguagePairCurriculum('python', 'typescript'),
  sections: [
    {
      id: 'section_1_basics',
      title: 'TypeScript Fundamentals',
      description: 'Learn TypeScript basics from a Python perspective',
      units: [
        {
          id: 'unit_1_types',
          title: 'Type Annotations',
          description: 'Learn TypeScript type system',
          skillLevel: 'beginner',
          xpToUnlock: 0,
          lessons: [
            {
              id: 'lesson_1_1',
              title: 'Basic Types',
              estimatedTime: 10,
              content: {
                theory: 'Converting Python dynamic types to TypeScript static types',
                difficulty: 'beginner',
                xpPoints: 10,
                examples: [
                  {
                    source: `name = "Alice"
age = 25
height = 1.75
active = True`,
                    target: `let name: string = "Alice";
let age: number = 25;
let height: number = 1.75;
let active: boolean = true;`,
                    explanation: 'TypeScript requires explicit type annotations'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Add TypeScript type annotations',
                    code: 'let score: ___ = 95;\nlet message: ___ = "Hello";\nlet isPassed: ___ = true;',
                    solution: 'let score: number = 95;\nlet message: string = "Hello";\nlet isPassed: boolean = true;',
                    hints: ['Use number for integers and floats', 'Use string for text', 'Use boolean for True/False'],
                    xpReward: 5
                  }
                ]
              }
            },
            {
              id: 'lesson_1_2',
              title: 'Arrays and Tuples',
              estimatedTime: 15,
              content: {
                theory: 'Converting Python lists and tuples to TypeScript',
                difficulty: 'beginner',
                xpPoints: 15,
                examples: [
                  {
                    source: `numbers = [1, 2, 3]
point = (10, 20)
mixed = [1, "two", True]`,
                    target: `let numbers: number[] = [1, 2, 3];
let point: [number, number] = [10, 20];
let mixed: (number | string | boolean)[] = [1, "two", true];`,
                    explanation: 'TypeScript has array types and tuple types'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Convert Python collections to TypeScript',
                    code: 'let grades: ___[] = [85, 90, 95];\nlet coordinate: [___, ___] = [0, 0];',
                    solution: 'let grades: number[] = [85, 90, 95];\nlet coordinate: [number, number] = [0, 0];',
                    hints: ['Use type[] for arrays', 'Use [type, type] for tuples'],
                    xpReward: 8
                  }
                ]
              }
            }
          ]
        },
        {
          id: 'unit_2_functions',
          title: 'Function Types',
          description: 'Learn TypeScript function typing',
          skillLevel: 'beginner',
          xpToUnlock: 50,
          lessons: [
            {
              id: 'lesson_2_1',
              title: 'Function Parameters',
              estimatedTime: 20,
              content: {
                theory: 'Converting Python functions to TypeScript',
                difficulty: 'beginner',
                xpPoints: 20,
                examples: [
                  {
                    source: `def greet(name):
    return f"Hello, {name}"

def add(a: int, b: int) -> int:
    return a + b`,
                    target: `function greet(name: string): string {
    return \`Hello, \${name}\`;
}

function add(a: number, b: number): number {
    return a + b;
}`,
                    explanation: 'TypeScript functions need parameter and return types'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Add TypeScript function types',
                    code: 'function multiply(x: ___, y: ___): ___ {\n    return x * y;\n}',
                    solution: 'function multiply(x: number, y: number): number {\n    return x * y;\n}',
                    hints: ['Add parameter types', 'Add return type'],
                    xpReward: 10
                  }
                ]
              }
            }
          ]
        },
        {
          id: 'unit_3_interfaces',
          title: 'Interfaces',
          description: 'Learn TypeScript interfaces',
          skillLevel: 'intermediate',
          xpToUnlock: 100,
          lessons: [
            {
              id: 'lesson_3_1',
              title: 'Interface Definition',
              estimatedTime: 25,
              content: {
                theory: 'Converting Python classes to TypeScript interfaces',
                difficulty: 'intermediate',
                xpPoints: 25,
                examples: [
                  {
                    source: `class Person:
    def __init__(self, name: str, age: int):
        self.name = name
        self.age = age`,
                    target: `interface Person {
    name: string;
    age: number;
}

class PersonImpl implements Person {
    constructor(public name: string, public age: number) {}
}`,
                    explanation: 'TypeScript interfaces define object shapes'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Create TypeScript interface',
                    code: '___ Product {\n    id: ___;\n    name: ___;\n    price: ___;\n}',
                    solution: 'interface Product {\n    id: number;\n    name: string;\n    price: number;\n}',
                    hints: ['Use interface keyword', 'Add property types'],
                    xpReward: 15
                  }
                ],
                practice: {
                  type: 'code_project',
                  instructions: 'Create a Student interface and implementing class',
                  testCases: [
                    {
                      input: 'new StudentImpl("Alice", [85, 90, 95])',
                      expectedOutput: '90',
                      code: `interface Student {
    name: string;
    grades: number[];
    getAverage(): number;
}

class StudentImpl implements Student {
    constructor(public name: string, public grades: number[]) {}

    getAverage(): number {
        return this.grades.reduce((sum, grade) => sum + grade, 0) / this.grades.length;
    }
}`
                    }
                  ],
                  xpReward: 25
                }
              }
            }
          ]
        },
        {
          id: 'unit_4_generics',
          title: 'Generics',
          description: 'Learn TypeScript generics',
          skillLevel: 'advanced',
          xpToUnlock: 150,
          lessons: [
            {
              id: 'lesson_4_1',
              title: 'Generic Functions',
              estimatedTime: 30,
              content: {
                theory: 'Converting Python type hints to TypeScript generics',
                difficulty: 'advanced',
                xpPoints: 30,
                examples: [
                  {
                    source: `from typing import TypeVar, List

T = TypeVar('T')

def first(items: List[T]) -> T:
    return items[0]`,
                    target: `function first<T>(items: T[]): T | undefined {
    return items[0];
}`,
                    explanation: 'TypeScript generics provide type-safe flexibility'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Add TypeScript generics',
                    code: 'function getLastItem<___>(array: ___[]): ___ {\n    return array[array.length - 1];\n}',
                    solution: 'function getLastItem<T>(array: T[]): T | undefined {\n    return array[array.length - 1];\n}',
                    hints: ['Use T for generic type', 'Return type might be undefined'],
                    xpReward: 20
                  }
                ]
              }
            }
          ]
        }
      ]
    }
  ]
};
