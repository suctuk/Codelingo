import { LanguagePairCurriculum } from '../curriculumTemplate';
import { generateLesson, commonConcepts } from '../lessonGenerator';
import { languageConfigs } from '../languagePairFactory';

const pythonSpecificConcepts = {
  'type-hints': {
    source: 'def greet(name: str) -> str:\n    return f"Hello {name}"',
    target: 'function greet(name: string): string {\n    return `Hello ${name}`;\n}',
    explanation: 'Python type hints convert to TypeScript type annotations',
    examples: [
      {
        source: 'count: int = 0',
        target: 'let count: number = 0;',
        explanation: 'Python type hints become TypeScript type annotations'
      },
      {
        source: 'from typing import List\n\nitems: List[str] = ["a", "b"]',
        target: 'const items: string[] = ["a", "b"];',
        explanation: 'Python typing module types map to TypeScript built-in types'
      }
    ]
  },
  'dataclasses': {
    source: '@dataclass\nclass User:\n    name: str\n    age: int',
    target: 'interface User {\n    name: string;\n    age: number;\n}\n\nclass UserImpl implements User {\n    constructor(\n        public name: string,\n        public age: number\n    ) {}\n}',
    explanation: 'Python dataclasses often become TypeScript interfaces with implementing classes',
    examples: [
      {
        source: '@dataclass\nclass Point:\n    x: int\n    y: int',
        target: 'interface Point {\n    x: number;\n    y: number;\n}',
        explanation: 'Simple dataclasses can be interfaces'
      }
    ]
  },
  'duck-typing': {
    source: 'def process(obj):\n    obj.do_something()',
    target: 'interface Processable {\n    doSomething(): void;\n}\n\nfunction process(obj: Processable): void {\n    obj.doSomething();\n}',
    explanation: 'Python\'s duck typing becomes explicit interfaces in TypeScript',
    examples: [
      {
        source: 'def print_name(obj):\n    print(obj.name)',
        target: 'interface Named {\n    name: string;\n}\n\nfunction printName(obj: Named): void {\n    console.log(obj.name);\n}',
        explanation: 'Implicit contracts become explicit interfaces'
      }
    ]
  }
};

export const pythonToTypeScript: LanguagePairCurriculum = {
  sourceLanguage: 'Python',
  targetLanguage: 'TypeScript',
  sections: [
    {
      id: 'section_1_fundamentals',
      title: 'TypeScript Fundamentals for Python Developers',
      description: 'Learn TypeScript basics coming from Python',
      units: [
        {
          id: 'unit_1_1_syntax',
          title: 'Basic Syntax',
          description: 'Learn TypeScript syntax differences from Python',
          lessons: [
            generateLesson('python', 'typescript', 'print', commonConcepts.print),
            generateLesson('python', 'typescript', 'variables', commonConcepts.variables),
            generateLesson('python', 'typescript', 'functions', commonConcepts.functions),
            {
              id: 'lesson_1_1_4',
              title: 'Type System',
              content: {
                theory: 'TypeScript requires explicit type annotations and has a more sophisticated type system than Python',
                difficulty: 'beginner',
                xpPoints: 15,
                examples: [
                  {
                    source: 'name: str = "John"\nage: int = 30',
                    target: 'let name: string = "John";\nlet age: number = 30;',
                    explanation: 'TypeScript uses different type names and requires declarations'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert this Python code to TypeScript with type annotations',
                    code: 'def add(a: int, b: int) -> int:\n    return a + b',
                    solution: 'function add(a: number, b: number): number {\n    return a + b;\n}',
                    hints: [
                      'Use number for numeric types',
                      'Add function keyword',
                      'Add curly braces',
                      'Add semicolons'
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
          description: 'Learn TypeScript interfaces compared to Python type hints',
          lessons: [
            {
              id: 'lesson_1_2_1',
              title: 'Interface Definition',
              content: {
                theory: 'TypeScript interfaces provide a way to define contracts that classes must follow',
                difficulty: 'beginner',
                xpPoints: 20,
                examples: [
                  {
                    source: 'class User:\n    name: str\n    age: int\n    \n    def __init__(self, name: str, age: int):\n        self.name = name\n        self.age = age',
                    target: 'interface User {\n    name: string;\n    age: number;\n}\n\nclass UserImpl implements User {\n    constructor(\n        public name: string,\n        public age: number\n    ) {}\n}',
                    explanation: 'Python classes often map to interface + implementation'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert this Python class to TypeScript interface and class',
                    code: 'class Point:\n    x: float\n    y: float\n    \n    def __init__(self, x: float, y: float):\n        self.x = x\n        self.y = y\n    \n    def distance_from_origin(self) -> float:\n        return (self.x ** 2 + self.y ** 2) ** 0.5',
                    solution: 'interface Point {\n    x: number;\n    y: number;\n    distanceFromOrigin(): number;\n}\n\nclass PointImpl implements Point {\n    constructor(\n        public x: number,\n        public y: number\n    ) {}\n    \n    distanceFromOrigin(): number {\n        return Math.sqrt(this.x ** 2 + this.y ** 2);\n    }\n}',
                    hints: [
                      'Create interface first',
                      'Implement with class',
                      'Use Math.sqrt',
                      'Use camelCase for methods'
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
      description: 'Learn TypeScript-specific concepts and patterns',
      units: [
        {
          id: 'unit_2_1_generics',
          title: 'Generic Types',
          description: 'Learn TypeScript generics compared to Python typing',
          lessons: [
            {
              id: 'lesson_2_1_1',
              title: 'Generic Functions and Classes',
              content: {
                theory: 'TypeScript generics provide type-safe containers and functions',
                difficulty: 'intermediate',
                xpPoints: 30,
                examples: [
                  {
                    source: 'from typing import TypeVar, Generic\n\nT = TypeVar("T")\n\nclass Box(Generic[T]):\n    def __init__(self, value: T):\n        self.value = value',
                    target: 'class Box<T> {\n    constructor(private value: T) {}\n    \n    getValue(): T {\n        return this.value;\n    }\n}',
                    explanation: 'Python generics become TypeScript generics with angle brackets'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert this Python generic function to TypeScript',
                    code: 'T = TypeVar("T")\n\ndef first(items: List[T]) -> T:\n    return items[0]',
                    solution: 'function first<T>(items: T[]): T {\n    return items[0];\n}',
                    hints: [
                      'Use angle brackets for type parameter',
                      'Use array type syntax',
                      'Add function keyword and braces'
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
    prerequisites: ['Basic Python knowledge'],
    learningOutcomes: [
      'Write TypeScript code confidently',
      'Understand key differences between Python and TypeScript',
      'Use TypeScript\'s type system effectively',
      'Work with interfaces and classes',
      'Handle TypeScript-specific patterns and idioms'
    ]
  }
};
