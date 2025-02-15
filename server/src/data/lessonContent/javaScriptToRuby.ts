import { createLanguagePairCurriculum } from './languagePairFactory';

export const javaScriptToRubyCurriculum = {
  ...createLanguagePairCurriculum('javascript', 'ruby'),
  sections: [
    {
      id: 'section_1_basics',
      title: 'Ruby Fundamentals',
      description: 'Learn Ruby basics from a JavaScript perspective',
      units: [
        {
          id: 'unit_1_variables',
          title: 'Variables and Types',
          description: 'Learn Ruby variables and types',
          skillLevel: 'beginner',
          xpToUnlock: 0,
          lessons: [
            {
              id: 'lesson_1_1',
              title: 'Variable Declaration',
              estimatedTime: 10,
              content: {
                theory: 'Converting JavaScript variables to Ruby',
                difficulty: 'beginner',
                xpPoints: 10,
                examples: [
                  {
                    source: `let name = "Alice";
const age = 25;
let height = 1.75;
let isActive = true;`,
                    target: `name = "Alice"
AGE = 25  # Constants are uppercase
height = 1.75
is_active = true`,
                    explanation: 'Ruby uses no declarations and snake_case'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Convert JavaScript variables to Ruby',
                    code: '___ = "Hello"\n___ = 42\n___ = true',
                    solution: 'message = "Hello"\nCOUNT = 42\nis_valid = true',
                    hints: ['No let/const', 'Use snake_case', 'Constants uppercase'],
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
                theory: 'Converting JavaScript arrays and objects to Ruby',
                difficulty: 'beginner',
                xpPoints: 15,
                examples: [
                  {
                    source: `let numbers = [1, 2, 3];
let person = {
  name: "Alice",
  age: 25
};`,
                    target: `numbers = [1, 2, 3]
person = {
  name: "Alice",
  age: 25
}`,
                    explanation: 'Ruby uses similar array and hash syntax'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Convert JavaScript collections to Ruby',
                    code: '___ = [1, 2, 3, 4, 5]\n___ = { ___: "Alice", ___: 25 }',
                    solution: 'numbers = [1, 2, 3, 4, 5]\nuser = { name: "Alice", age: 25 }',
                    hints: ['No let/const', 'Use symbol keys'],
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
                theory: 'Converting JavaScript functions to Ruby methods',
                difficulty: 'beginner',
                xpPoints: 20,
                examples: [
                  {
                    source: `function greet(name) {
  return "Hello, " + name;
}

const add = (a, b) => a + b;`,
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
                    question: 'Convert JavaScript function to Ruby',
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
                theory: 'Converting JavaScript classes to Ruby',
                difficulty: 'intermediate',
                xpPoints: 25,
                examples: [
                  {
                    source: `class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    return \`Hello, I'm \${this.name}\`;
  }
}`,
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
                    question: 'Convert JavaScript class to Ruby',
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
                theory: 'Converting JavaScript imports to Ruby requires',
                difficulty: 'advanced',
                xpPoints: 30,
                examples: [
                  {
                    source: `import { sqrt } from 'math';
import json from 'json';
import { Helper } from './helper';`,
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
                    question: 'Convert JavaScript imports to Ruby',
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
