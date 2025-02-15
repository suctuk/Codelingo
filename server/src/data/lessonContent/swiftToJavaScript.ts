import { createLanguagePairCurriculum } from './languagePairFactory';

export const swiftToJavaScriptCurriculum = {
  ...createLanguagePairCurriculum('swift', 'javascript'),
  sections: [
    {
      id: 'section_1_basics',
      title: 'JavaScript Fundamentals',
      description: 'Learn JavaScript basics from a Swift perspective',
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
                theory: 'Converting Swift variables to JavaScript',
                difficulty: 'beginner',
                xpPoints: 10,
                examples: [
                  {
                    source: `let name: String = "Alice"
var age: Int = 25
let height: Double = 1.75
var isActive: Bool = true
let score = 95 // Type inference`,
                    target: `const name = "Alice"
let age = 25
const height = 1.75
let isActive = true
const score = 95  // Dynamic typing`,
                    explanation: 'JavaScript uses let/const and dynamic typing'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Convert Swift variables to JavaScript',
                    code: '___ message = "Hello"\n___ count = 42\n___ isValid = true',
                    solution: 'const message = "Hello"\nlet count = 42\nlet isValid = true',
                    hints: ['Use const for immutable', 'Use let for mutable', 'No type annotations'],
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
                theory: 'Converting Swift collections to JavaScript',
                difficulty: 'beginner',
                xpPoints: 15,
                examples: [
                  {
                    source: `var numbers: [Int] = [1, 2, 3]
var scores: [String: Int] = [
    "Alice": 95,
    "Bob": 87
]
let tuple = (name: "Alice", age: 25)`,
                    target: `let numbers = [1, 2, 3]
let scores = {
    "Alice": 95,
    "Bob": 87
}
let person = { name: "Alice", age: 25 }  // Objects for tuples`,
                    explanation: 'JavaScript uses arrays and objects'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Convert Swift collections to JavaScript',
                    code: '___ = [1, 2, 3, 4, 5]\n___ = {\n    ___: "Alice",\n    ___: 25\n}',
                    solution: 'const numbers = [1, 2, 3, 4, 5]\nconst user = {\n    name: "Alice",\n    age: 25\n}',
                    hints: ['Use array literals', 'Use object literals'],
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
                theory: 'Converting Swift functions to JavaScript',
                difficulty: 'beginner',
                xpPoints: 20,
                examples: [
                  {
                    source: `func greet(name: String) -> String {
    return "Hello, \\(name)!"
}

func add(_ a: Int, _ b: Int) -> Int {
    return a + b
}`,
                    target: `function greet(name) {
    return \`Hello, \${name}!\`
}

const add = (a, b) => a + b`,
                    explanation: 'JavaScript uses function keyword or arrow functions'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Convert Swift function to JavaScript',
                    code: '___ multiply(x, y) {\n    ___ x * y\n}',
                    solution: 'function multiply(x, y) {\n    return x * y\n}',
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
                theory: 'Converting Swift classes to JavaScript',
                difficulty: 'intermediate',
                xpPoints: 25,
                examples: [
                  {
                    source: `class Person {
    private var name: String
    private var age: Int
    
    init(name: String, age: Int) {
        self.name = name
        self.age = age
    }
    
    func greet() -> String {
        return "Hello, I'm \\(name)!"
    }
}`,
                    target: `class Person {
    constructor(name, age) {
        this.name = name
        this.age = age
    }
    
    greet() {
        return \`Hello, I'm \${this.name}!\`
    }
}`,
                    explanation: 'JavaScript uses constructor and this'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Convert Swift class to JavaScript',
                    code: 'class Rectangle {\n    ___(width, height) {\n        this.___ = width\n        this.___ = height\n    }\n\n    area() {\n        return this.width * this.height\n    }\n}',
                    solution: 'class Rectangle {\n    constructor(width, height) {\n        this.width = width\n        this.height = height\n    }\n\n    area() {\n        return this.width * this.height\n    }\n}',
                    hints: ['Use constructor', 'Use this.property'],
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
        this.name = name
        this.grades = grades
    }
    
    average() {
        return this.grades.reduce((sum, grade) => sum + grade, 0) / this.grades.length
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
          id: 'unit_4_optionals',
          title: 'Optional Handling',
          description: 'Learn JavaScript optional handling',
          skillLevel: 'advanced',
          xpToUnlock: 150,
          lessons: [
            {
              id: 'lesson_4_1',
              title: 'Optional Values',
              estimatedTime: 30,
              content: {
                theory: 'Converting Swift optionals to JavaScript',
                difficulty: 'advanced',
                xpPoints: 30,
                examples: [
                  {
                    source: `var name: String?
if let unwrappedName = name {
    print(unwrappedName)
}

guard let age = optionalAge else {
    return
}

let result = optionalValue ?? defaultValue`,
                    target: `let name = null
if (name !== null && name !== undefined) {
    console.log(name)
}

if (!age) {
    return
}

const result = optionalValue ?? defaultValue`,
                    explanation: 'JavaScript uses null/undefined checks and nullish coalescing'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Convert Swift optional handling to JavaScript',
                    code: 'const value = ___\nif (___ !== null && ___ !== undefined) {\n    console.log(value)\n}\nconst result = value ___ defaultValue',
                    solution: 'const value = null\nif (value !== null && value !== undefined) {\n    console.log(value)\n}\nconst result = value ?? defaultValue',
                    hints: ['Use null', 'Check null and undefined', 'Use ?? operator'],
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
