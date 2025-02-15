import { createLanguagePairCurriculum } from './languagePairFactory';

export const rubyToPythonCurriculum = {
  ...createLanguagePairCurriculum('ruby', 'python'),
  sections: [
    {
      id: 'section_1_basics',
      title: 'Python Fundamentals',
      description: 'Learn Python basics from a Ruby perspective',
      units: [
        {
          id: 'unit_1_types',
          title: 'Variables and Types',
          description: 'Learn Python variables and types',
          skillLevel: 'beginner',
          xpToUnlock: 0,
          lessons: [
            {
              id: 'lesson_1_1',
              title: 'Variable Names',
              estimatedTime: 10,
              content: {
                theory: 'Converting Ruby variables to Python',
                difficulty: 'beginner',
                xpPoints: 10,
                examples: [
                  {
                    source: `name = "Ruby"
AGE = 42
my_array = [1, 2, 3]`,
                    target: `name = "Python"
AGE = 42
my_list = [1, 2, 3]`,
                    explanation: 'Python uses similar naming conventions as Ruby'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Convert Ruby variables to Python',
                    code: '___ = "Hello"\n___ = 42\n___ = [1, 2, 3]',
                    solution: 'message = "Hello"\nCOUNT = 42\nnumbers = [1, 2, 3]',
                    hints: ['Use snake_case', 'Constants uppercase'],
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
                theory: 'Converting Ruby collections to Python',
                difficulty: 'beginner',
                xpPoints: 15,
                examples: [
                  {
                    source: `# Ruby
my_array = [1, 2, 3]
my_hash = { name: "Alice", age: 25 }
my_array = [1, 2]  # Arrays used for tuples`,
                    target: `# Python
my_list = [1, 2, 3]
my_dict = {"name": "Alice", "age": 25}
my_tuple = (1, 2)  # Python has tuples`,
                    explanation: 'Python uses lists, dicts, and tuples'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Convert Ruby collections to Python',
                    code: '___ = [1, 2, 3, 4, 5]\n___ = {"name": ___, "age": ___}',
                    solution: 'numbers = [1, 2, 3, 4, 5]\nuser = {"name": "Alice", "age": 25}',
                    hints: ['Use list syntax', 'Use string keys'],
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
                theory: 'Converting Ruby methods to Python functions',
                difficulty: 'beginner',
                xpPoints: 20,
                examples: [
                  {
                    source: `def greet(name)
  "Hello, #{name}"
end

def add(a, b)
  a + b
end`,
                    target: `def greet(name):
    return f"Hello, {name}"

def add(a, b):
    return a + b`,
                    explanation: 'Python uses def with indentation and explicit returns'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Convert Ruby method to Python',
                    code: '___ multiply(x, y):\n    ___ x * y',
                    solution: 'def multiply(x, y):\n    return x * y',
                    hints: ['Use def with :', 'Add return keyword'],
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
                theory: 'Converting Ruby classes to Python',
                difficulty: 'intermediate',
                xpPoints: 25,
                examples: [
                  {
                    source: `class Person
  def initialize(name, age)
    @name = name
    @age = age
  end

  def greet
    "Hello, I'm #{@name}"
  end
end`,
                    target: `class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def greet(self):
        return f"Hello, I'm {self.name}"`,
                    explanation: 'Python uses __init__ and self instead of initialize and @'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Convert Ruby class to Python',
                    code: 'class Rectangle:\n    def ___(self, width, height):\n        self.___ = width\n        self.___ = height\n\n    def area(self):\n        return self.width * self.height',
                    solution: 'class Rectangle:\n    def __init__(self, width, height):\n        self.width = width\n        self.height = height\n\n    def area(self):\n        return self.width * self.height',
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
    def __init__(self, name, grades):
        self.name = name
        self.grades = grades
    
    def average(self):
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
          id: 'unit_4_modules',
          title: 'Modules',
          description: 'Learn Python modules',
          skillLevel: 'advanced',
          xpToUnlock: 150,
          lessons: [
            {
              id: 'lesson_4_1',
              title: 'Module System',
              estimatedTime: 30,
              content: {
                theory: 'Converting Ruby requires to Python imports',
                difficulty: 'advanced',
                xpPoints: 30,
                examples: [
                  {
                    source: `require "math"
require "json"
require_relative "./helper"

include Math  # For sqrt`,
                    target: `from math import sqrt
import json
from .helper import Helper`,
                    explanation: 'Python uses import statements'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Convert Ruby requires to Python',
                    code: '___ datetime ___ datetime\n___ .calculator ___ Calculator\n___ math ___ sqrt',
                    solution: 'from datetime import datetime\nfrom .calculator import Calculator\nfrom math import sqrt',
                    hints: ['Use from/import', 'Use relative imports'],
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
