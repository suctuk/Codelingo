import { createLanguagePairCurriculum } from './languagePairFactory';

export const typeScriptToPythonCurriculum = {
  ...createLanguagePairCurriculum('typescript', 'python'),
  sections: [
    {
      id: 'section_1_basics',
      title: 'Python Fundamentals',
      description: 'Learn Python basics from a TypeScript perspective',
      units: [
        {
          id: 'unit_1_types',
          title: 'Dynamic Typing',
          description: 'Learn Python dynamic typing',
          skillLevel: 'beginner',
          xpToUnlock: 0,
          lessons: [
            {
              id: 'lesson_1_1',
              title: 'Variable Types',
              estimatedTime: 10,
              content: {
                theory: 'Converting TypeScript static types to Python dynamic types',
                difficulty: 'beginner',
                xpPoints: 10,
                examples: [
                  {
                    source: `let name: string = "Alice";
let age: number = 25;
let height: number = 1.75;
let active: boolean = true;`,
                    target: `name = "Alice"
age = 25
height = 1.75
active = True`,
                    explanation: 'Python uses dynamic typing without type annotations'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Convert TypeScript variables to Python',
                    code: '___ = 95\n___ = "Hello"\n___ = True',
                    solution: 'score = 95\nmessage = "Hello"\nis_passed = True',
                    hints: ['Remove type annotations', 'Use True instead of true'],
                    xpReward: 5
                  }
                ]
              }
            },
            {
              id: 'lesson_1_2',
              title: 'Collections',
              estimatedTime: 15,
              content: {
                theory: 'Converting TypeScript arrays and tuples to Python',
                difficulty: 'beginner',
                xpPoints: 15,
                examples: [
                  {
                    source: `let numbers: number[] = [1, 2, 3];
let point: [number, number] = [10, 20];
let mixed: (number | string | boolean)[] = [1, "two", true];`,
                    target: `numbers = [1, 2, 3]
point = (10, 20)
mixed = [1, "two", True]`,
                    explanation: 'Python lists and tuples are dynamically typed'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Convert TypeScript collections to Python',
                    code: '___ = [85, 90, 95]\n___ = (0, 0)',
                    solution: 'grades = [85, 90, 95]\ncoordinate = (0, 0)',
                    hints: ['Use [] for lists', 'Use () for tuples'],
                    xpReward: 8
                  }
                ]
              }
            }
          ]
        },
        {
          id: 'unit_2_functions',
          title: 'Functions',
          description: 'Learn Python functions',
          skillLevel: 'beginner',
          xpToUnlock: 50,
          lessons: [
            {
              id: 'lesson_2_1',
              title: 'Function Definition',
              estimatedTime: 20,
              content: {
                theory: 'Converting TypeScript functions to Python',
                difficulty: 'beginner',
                xpPoints: 20,
                examples: [
                  {
                    source: `function greet(name: string): string {
    return \`Hello, \${name}\`;
}

function add(a: number, b: number): number {
    return a + b;
}`,
                    target: `def greet(name):
    return f"Hello, {name}"

def add(a, b):
    return a + b`,
                    explanation: 'Python functions use def and optional type hints'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Convert TypeScript function to Python',
                    code: '___ multiply(x, y):\n    ___ x * y',
                    solution: 'def multiply(x, y):\n    return x * y',
                    hints: ['Use def keyword', 'Use return keyword'],
                    xpReward: 10
                  }
                ]
              }
            }
          ]
        },
        {
          id: 'unit_3_classes',
          title: 'Classes',
          description: 'Learn Python classes',
          skillLevel: 'intermediate',
          xpToUnlock: 100,
          lessons: [
            {
              id: 'lesson_3_1',
              title: 'Class Definition',
              estimatedTime: 25,
              content: {
                theory: 'Converting TypeScript classes and interfaces to Python',
                difficulty: 'intermediate',
                xpPoints: 25,
                examples: [
                  {
                    source: `interface Person {
    name: string;
    age: number;
}

class PersonImpl implements Person {
    constructor(public name: string, public age: number) {}
}`,
                    target: `class Person:
    def __init__(self, name: str, age: int):
        self.name = name
        self.age = age`,
                    explanation: 'Python classes use __init__ for constructor'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Convert TypeScript class to Python',
                    code: 'class Car:\n    def ___(self, model, year):\n        self.___ = model\n        self.___ = year',
                    solution: 'class Car:\n    def __init__(self, model, year):\n        self.model = model\n        self.year = year',
                    hints: ['Use __init__', 'Use self.attribute'],
                    xpReward: 15
                  }
                ],
                practice: {
                  type: 'code_project',
                  instructions: 'Create a Student class with name, grades list, and average method',
                  testCases: [
                    {
                      input: 'Student("Alice", [85, 90, 95])',
                      expectedOutput: '90.0',
                      code: `class Student:
    def __init__(self, name: str, grades: list[float]):
        self.name = name
        self.grades = grades
    
    def get_average(self) -> float:
        return sum(self.grades) / len(self.grades)`
                    }
                  ],
                  xpReward: 25
                }
              }
            }
          ]
        },
        {
          id: 'unit_4_type_hints',
          title: 'Type Hints',
          description: 'Learn Python type hints',
          skillLevel: 'advanced',
          xpToUnlock: 150,
          lessons: [
            {
              id: 'lesson_4_1',
              title: 'Optional Type Hints',
              estimatedTime: 30,
              content: {
                theory: 'Converting TypeScript types to Python type hints',
                difficulty: 'advanced',
                xpPoints: 30,
                examples: [
                  {
                    source: `function first<T>(items: T[]): T | undefined {
    return items[0];
}`,
                    target: `from typing import TypeVar, List, Optional

T = TypeVar('T')

def first(items: List[T]) -> Optional[T]:
    return items[0] if items else None`,
                    explanation: 'Python type hints are optional but useful'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Add Python type hints',
                    code: 'from typing import List, Optional\n\ndef get_last_item(array: ___[___]) -> ___[___]:\n    return array[-1] if array else None',
                    solution: 'from typing import List, Optional\n\ndef get_last_item(array: List[T]) -> Optional[T]:\n    return array[-1] if array else None',
                    hints: ['Use List from typing', 'Use Optional for nullable'],
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
