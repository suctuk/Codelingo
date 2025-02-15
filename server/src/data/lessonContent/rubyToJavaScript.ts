import { createLanguagePairCurriculum } from './languagePairFactory';

export const rubyToJavaScriptCurriculum = {
  ...createLanguagePairCurriculum('ruby', 'javascript'),
  sections: [
    {
      id: 'section_1_basics',
      title: 'JavaScript Fundamentals',
      description: 'Learn JavaScript basics from a Ruby perspective',
      units: [
        {
          id: 'unit_1_types',
          title: 'Variables and Types',
          description: 'Learn JavaScript variables and types',
          skillLevel: 'beginner',
          xpToUnlock: 0,
          lessons: [
            {
              id: 'lesson_1_1',
              title: 'Variable Declaration',
              estimatedTime: 10,
              content: {
                theory: 'Converting Ruby variables to JavaScript',
                difficulty: 'beginner',
                xpPoints: 10,
                examples: [
                  {
                    source: `name = "Alice"
age = 25
height = 1.75
active = true`,
                    target: `let name = "Alice";
let age = 25;
let height = 1.75;
let active = true;`,
                    explanation: 'JavaScript requires let/const declarations'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Convert Ruby variables to JavaScript',
                    code: '___ score = 95;\n___ message = "Hello";\n___ isPassed = true;',
                    solution: 'let score = 95;\nlet message = "Hello";\nlet isPassed = true;',
                    hints: ['Use let keyword', 'Add semicolons'],
                    xpReward: 5
                  }
                ]
              }
            },
            {
              id: 'lesson_1_2',
              title: 'Arrays and Objects',
              estimatedTime: 15,
              content: {
                theory: 'Converting Ruby arrays and hashes to JavaScript',
                difficulty: 'beginner',
                xpPoints: 15,
                examples: [
                  {
                    source: `numbers = [1, 2, 3]
person = {
  name: "Alice",
  age: 25
}`,
                    target: `let numbers = [1, 2, 3];
let person = {
  name: "Alice",
  age: 25
};`,
                    explanation: 'JavaScript uses similar array and object syntax'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Convert Ruby collections to JavaScript',
                    code: 'let grades = [___];\nlet user = {\n  ___: "Alice",\n  ___: 25\n};',
                    solution: 'let grades = [85, 90, 95];\nlet user = {\n  name: "Alice",\n  age: 25\n};',
                    hints: ['Use array literals', 'Use object property syntax'],
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
          description: 'Learn JavaScript functions',
          skillLevel: 'beginner',
          xpToUnlock: 50,
          lessons: [
            {
              id: 'lesson_2_1',
              title: 'Function Definition',
              estimatedTime: 20,
              content: {
                theory: 'Converting Ruby methods to JavaScript functions',
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
                    target: `function greet(name) {
  return \`Hello, \${name}\`;
}

const add = (a, b) => a + b;`,
                    explanation: 'JavaScript has function declarations and arrow functions'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Convert Ruby method to JavaScript',
                    code: '___ multiply(a, b) {\n  ___ a * b;\n}',
                    solution: 'function multiply(a, b) {\n  return a * b;\n}',
                    hints: ['Use function keyword', 'Add return statement'],
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
          description: 'Learn JavaScript classes',
          skillLevel: 'intermediate',
          xpToUnlock: 100,
          lessons: [
            {
              id: 'lesson_3_1',
              title: 'Class Definition',
              estimatedTime: 25,
              content: {
                theory: 'Converting Ruby classes to JavaScript',
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
                    target: `class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    return \`Hello, I'm \${this.name}\`;
  }
}`,
                    explanation: 'JavaScript uses constructor and this instead of initialize and @'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Convert Ruby class to JavaScript',
                    code: 'class Car {\n  ___(model, year) {\n    this.___ = model;\n    this.___ = year;\n  }\n\n  getInfo() {\n    return ___\`\${this.model} (\${this.year})\`___;\n  }\n}',
                    solution: 'class Car {\n  constructor(model, year) {\n    this.model = model;\n    this.year = year;\n  }\n\n  getInfo() {\n    return \`\${this.model} (\${this.year})\`;\n  }\n}',
                    hints: ['Use constructor', 'Use this.property', 'Use template literals'],
                    xpReward: 15
                  }
                ],
                practice: {
                  type: 'code_project',
                  instructions: 'Create a Student class with name, grades array, and average method',
                  testCases: [
                    {
                      input: 'new Student("Alice", [85, 90, 95])',
                      expectedOutput: '90',
                      code: `class Student {
  constructor(name, grades) {
    this.name = name;
    this.grades = grades;
  }

  getAverage() {
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
          id: 'unit_4_modules',
          title: 'Modules',
          description: 'Learn JavaScript modules',
          skillLevel: 'advanced',
          xpToUnlock: 150,
          lessons: [
            {
              id: 'lesson_4_1',
              title: 'Module System',
              estimatedTime: 30,
              content: {
                theory: 'Converting Ruby requires to JavaScript imports',
                difficulty: 'advanced',
                xpPoints: 30,
                examples: [
                  {
                    source: `require 'json'
require_relative './helper'

module MyModule
  class MyClass
  end
end`,
                    target: `import { JSON } from 'json';
import { helper } from './helper';

export class MyClass {
}`,
                    explanation: 'JavaScript uses ES6 module system'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Convert Ruby module system to JavaScript',
                    code: '___ { calculateArea } ___ "./math";\n___ class Circle {\n  // ...\n}',
                    solution: 'import { calculateArea } from "./math";\nexport class Circle {\n  // ...\n}',
                    hints: ['Use import/from', 'Use export keyword'],
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
