import { createLanguagePairCurriculum } from './languagePairFactory';

export const pythonToRubyCurriculum = {
  ...createLanguagePairCurriculum('python', 'ruby'),
  sections: [
    {
      id: 'section_1_basics',
      title: 'Ruby Fundamentals',
      description: 'Learn Ruby basics from a Python perspective',
      units: [
        {
          id: 'unit_1_types',
          title: 'Variables and Types',
          description: 'Learn Ruby variables and types',
          skillLevel: 'beginner',
          xpToUnlock: 0,
          lessons: [
            {
              id: 'lesson_1_1',
              title: 'Variable Names',
              estimatedTime: 10,
              content: {
                theory: 'Converting Python variables to Ruby',
                difficulty: 'beginner',
                xpPoints: 10,
                examples: [
                  {
                    source: `snake_case = "Python"
CONSTANT = 42
my_list = [1, 2, 3]`,
                    target: `snake_case = "Ruby"
CONSTANT = 42
my_array = [1, 2, 3]`,
                    explanation: 'Ruby uses similar naming conventions as Python'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Convert Python variables to Ruby',
                    code: '___ = "Hello"\n___ = 42\n___ = [1, 2, 3]',
                    solution: 'message = "Hello"\ncount = 42\nnumbers = [1, 2, 3]',
                    hints: ['Use snake_case', 'No type hints needed'],
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
                theory: 'Converting Python collections to Ruby',
                difficulty: 'beginner',
                xpPoints: 15,
                examples: [
                  {
                    source: `# Python
my_list = [1, 2, 3]
my_dict = {"name": "Alice", "age": 25}
my_tuple = (1, 2)`,
                    target: `# Ruby
my_array = [1, 2, 3]
my_hash = { name: "Alice", age: 25 }
my_array = [1, 2]  # Arrays used instead of tuples`,
                    explanation: 'Ruby uses arrays and hashes with symbol keys'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Convert Python collections to Ruby',
                    code: '___ = [1, 2, 3, 4, 5]\n___ = { ___: "Alice", ___: 25 }',
                    solution: 'numbers = [1, 2, 3, 4, 5]\nuser = { name: "Alice", age: 25 }',
                    hints: ['Use array syntax', 'Use symbol keys'],
                    xpReward: 8
                  }
                ]
              }
            }
          ]
        },
        {
          id: 'unit_2_functions',
          title: 'Methods',
          description: 'Learn Ruby methods',
          skillLevel: 'beginner',
          xpToUnlock: 50,
          lessons: [
            {
              id: 'lesson_2_1',
              title: 'Method Definition',
              estimatedTime: 20,
              content: {
                theory: 'Converting Python functions to Ruby methods',
                difficulty: 'beginner',
                xpPoints: 20,
                examples: [
                  {
                    source: `def greet(name):
    return f"Hello, {name}"

def add(a, b):
    return a + b`,
                    target: `def greet(name)
  "Hello, #{name}"
end

def add(a, b)
  a + b
end`,
                    explanation: 'Ruby uses def/end and implicit returns'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Convert Python function to Ruby',
                    code: '___ multiply(x, y)\n  x * y\n___',
                    solution: 'def multiply(x, y)\n  x * y\nend',
                    hints: ['Use def/end', 'No return needed'],
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
          description: 'Learn Ruby classes',
          skillLevel: 'intermediate',
          xpToUnlock: 100,
          lessons: [
            {
              id: 'lesson_3_1',
              title: 'Class Definition',
              estimatedTime: 25,
              content: {
                theory: 'Converting Python classes to Ruby',
                difficulty: 'intermediate',
                xpPoints: 25,
                examples: [
                  {
                    source: `class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def greet(self):
        return f"Hello, I'm {self.name}"`,
                    target: `class Person
  def initialize(name, age)
    @name = name
    @age = age
  end

  def greet
    "Hello, I'm #{@name}"
  end
end`,
                    explanation: 'Ruby uses initialize and @ for instance variables'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Convert Python class to Ruby',
                    code: 'class Rectangle\n  def ___(width, height)\n    @___ = width\n    @___ = height\n  end\n\n  def area\n    @width * @height\n  end\nend',
                    solution: 'class Rectangle\n  def initialize(width, height)\n    @width = width\n    @height = height\n  end\n\n  def area\n    @width * @height\n  end\nend',
                    hints: ['Use initialize', 'Use @ for instance vars'],
                    xpReward: 15
                  }
                ],
                practice: {
                  type: 'code_project',
                  instructions: 'Create a Student class with name, grades array, and average method',
                  testCases: [
                    {
                      input: 'Student.new("Alice", [85, 90, 95])',
                      expectedOutput: '90.0',
                      code: `class Student
  def initialize(name, grades)
    @name = name
    @grades = grades
  end

  def average
    @grades.sum.to_f / @grades.size
  end
end`
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
          description: 'Learn Ruby modules',
          skillLevel: 'advanced',
          xpToUnlock: 150,
          lessons: [
            {
              id: 'lesson_4_1',
              title: 'Module System',
              estimatedTime: 30,
              content: {
                theory: 'Converting Python imports to Ruby requires',
                difficulty: 'advanced',
                xpPoints: 30,
                examples: [
                  {
                    source: `from math import sqrt
import json
from .helper import Helper`,
                    target: `require "math"
require "json"
require_relative "./helper"

include Math  # For sqrt`,
                    explanation: 'Ruby uses require and include'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Convert Python imports to Ruby',
                    code: '___ "date"\n___-___ "./calculator"\n___ Math',
                    solution: 'require "date"\nrequire_relative "./calculator"\ninclude Math',
                    hints: ['Use require', 'Use require_relative', 'Use include'],
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
