import { LanguagePairCurriculum } from '../curriculumTemplate';
import { generateLesson, commonConcepts } from '../lessonGenerator';
import { languageConfigs } from '../languagePairFactory';

const typeScriptSpecificConcepts = {
  'type-annotations': {
    source: 'function greet(name: string): string {\n    return `Hello ${name}`;\n}',
    target: 'def greet(name: str) -> str:\n    return f"Hello {name}"',
    explanation: 'TypeScript type annotations can be converted to Python type hints (Python 3.5+)',
    examples: [
      {
        source: 'let count: number = 0;',
        target: 'count: int = 0',
        explanation: 'Variable type annotations become Python type hints'
      },
      {
        source: 'const items: string[] = ["a", "b"];',
        target: 'from typing import List\n\nitems: List[str] = ["a", "b"]',
        explanation: 'Array types use Python\'s typing module'
      }
    ]
  },
  'interfaces': {
    source: 'interface User {\n    name: string;\n    age: number;\n}',
    target: 'from dataclasses import dataclass\n\n@dataclass\nclass User:\n    name: str\n    age: int',
    explanation: 'TypeScript interfaces often become Python dataclasses',
    examples: [
      {
        source: 'interface Point {\n    x: number;\n    y: number;\n}',
        target: '@dataclass\nclass Point:\n    x: int\n    y: int',
        explanation: 'Simple interfaces map well to dataclasses'
      }
    ]
  },
  'generics': {
    source: 'class Container<T> {\n    private value: T;\n    constructor(value: T) {\n        this.value = value;\n    }\n}',
    target: 'from typing import Generic, TypeVar\n\nT = TypeVar("T")\n\nclass Container(Generic[T]):\n    def __init__(self, value: T) -> None:\n        self.value = value',
    explanation: 'TypeScript generics use Python\'s typing module with TypeVar',
    examples: [
      {
        source: 'function first<T>(arr: T[]): T {\n    return arr[0];\n}',
        target: 'T = TypeVar("T")\n\ndef first(arr: List[T]) -> T:\n    return arr[0]',
        explanation: 'Generic functions use TypeVar'
      }
    ]
  }
};

export const typeScriptToPython: LanguagePairCurriculum = {
  sourceLanguage: 'TypeScript',
  targetLanguage: 'Python',
  sections: [
    {
      id: 'section_1_fundamentals',
      title: 'Python Fundamentals for TypeScript Developers',
      description: 'Learn Python basics coming from TypeScript',
      units: [
        {
          id: 'unit_1_1_syntax',
          title: 'Basic Syntax',
          description: 'Learn Python syntax differences from TypeScript',
          lessons: [
            generateLesson('typescript', 'python', 'print', commonConcepts.print),
            generateLesson('typescript', 'python', 'variables', commonConcepts.variables),
            generateLesson('typescript', 'python', 'functions', commonConcepts.functions),
            {
              id: 'lesson_1_1_4',
              title: 'Type Hints',
              content: {
                theory: 'Python supports type hints similar to TypeScript, but they\'re optional and require the typing module',
                difficulty: 'beginner',
                xpPoints: 15,
                examples: [
                  {
                    source: 'let name: string = "John";\nlet age: number = 30;',
                    target: 'name: str = "John"\nage: int = 30',
                    explanation: 'Python type hints are similar but use different type names'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert this TypeScript code to Python with type hints',
                    code: 'function add(a: number, b: number): number {\n    return a + b;\n}',
                    solution: 'def add(a: int, b: int) -> int:\n    return a + b',
                    hints: [
                      'Use : for parameter types',
                      'Use -> for return type',
                      'number becomes int or float'
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
          id: 'unit_1_2_classes',
          title: 'Classes and Types',
          description: 'Learn Python classes and type hints compared to TypeScript',
          lessons: [
            {
              id: 'lesson_1_2_1',
              title: 'Class Definition',
              content: {
                theory: 'Python classes can use type hints and decorators for TypeScript-like functionality',
                difficulty: 'beginner',
                xpPoints: 20,
                examples: [
                  {
                    source: 'class User {\n    name: string;\n    age: number;\n    \n    constructor(name: string, age: number) {\n        this.name = name;\n        this.age = age;\n    }\n}',
                    target: 'class User:\n    name: str\n    age: int\n    \n    def __init__(self, name: str, age: int) -> None:\n        self.name = name\n        self.age = age',
                    explanation: 'Python classes use type hints and __init__'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert this TypeScript class to Python',
                    code: 'class Point {\n    x: number;\n    y: number;\n    \n    constructor(x: number, y: number) {\n        this.x = x;\n        this.y = y;\n    }\n    \n    distanceFromOrigin(): number {\n        return Math.sqrt(this.x * this.x + this.y * this.y);\n    }\n}',
                    solution: 'from math import sqrt\n\nclass Point:\n    x: float\n    y: float\n    \n    def __init__(self, x: float, y: float) -> None:\n        self.x = x\n        self.y = y\n    \n    def distance_from_origin(self) -> float:\n        return sqrt(self.x * self.x + self.y * self.y)',
                    hints: [
                      'Use type hints for fields',
                      'Convert constructor to __init__',
                      'Use snake_case for method names',
                      'Import math functions explicitly'
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
      title: 'Advanced Python Features',
      description: 'Learn Python-specific concepts and patterns',
      units: [
        {
          id: 'unit_2_1_typing',
          title: 'Advanced Type Hints',
          description: 'Learn Python\'s typing module features compared to TypeScript',
          lessons: [
            {
              id: 'lesson_2_1_1',
              title: 'Generic Types',
              content: {
                theory: 'Python\'s typing module provides similar generic type functionality to TypeScript',
                difficulty: 'intermediate',
                xpPoints: 30,
                examples: [
                  {
                    source: 'function identity<T>(value: T): T {\n    return value;\n}',
                    target: 'from typing import TypeVar\n\nT = TypeVar("T")\n\ndef identity(value: T) -> T:\n    return value',
                    explanation: 'TypeScript generics use TypeVar in Python'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert this TypeScript generic class to Python',
                    code: 'class Box<T> {\n    private value: T;\n    \n    constructor(value: T) {\n        this.value = value;\n    }\n    \n    getValue(): T {\n        return this.value;\n    }\n}',
                    solution: 'from typing import Generic, TypeVar\n\nT = TypeVar("T")\n\nclass Box(Generic[T]):\n    def __init__(self, value: T) -> None:\n        self.value = value\n    \n    def get_value(self) -> T:\n        return self.value',
                    hints: [
                      'Use TypeVar for the generic type',
                      'Inherit from Generic[T]',
                      'Convert methods to Python style'
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
      'Write Python code confidently',
      'Understand key differences between TypeScript and Python',
      'Use Python type hints effectively',
      'Work with Python\'s typing module',
      'Handle Python-specific patterns and idioms'
    ]
  }
};
