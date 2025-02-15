import { createLanguagePairCurriculum } from './languagePairFactory';

export const scalaToJavaScriptCurriculum = {
  ...createLanguagePairCurriculum('scala', 'javascript'),
  sections: [
    {
      id: 'section_1_basics',
      title: 'JavaScript Fundamentals',
      description: 'Learn JavaScript basics from a Scala perspective',
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
                theory: 'Converting Scala variables to JavaScript',
                difficulty: 'beginner',
                xpPoints: 10,
                examples: [
                  {
                    source: `val name: String = "Alice"
var age: Int = 25
val height: Double = 1.75
val isActive: Boolean = true
val score = 95 // Type inference`,
                    target: `const name = "Alice"
let age = 25
const height = 1.75
const isActive = true
const score = 95  // Dynamic typing`,
                    explanation: 'JavaScript uses let/const and dynamic typing'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Convert Scala variables to JavaScript',
                    code: '___ message = "Hello"\n___ count = 42\n___ isValid = true',
                    solution: 'const message = "Hello"\nlet count = 42\nconst isValid = true',
                    hints: ['Use const for val', 'Use let for var', 'No type annotations'],
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
                theory: 'Converting Scala collections to JavaScript',
                difficulty: 'beginner',
                xpPoints: 15,
                examples: [
                  {
                    source: `val numbers = List(1, 2, 3)
val scores = Map(
  "Alice" -> 95,
  "Bob" -> 87
)
val tuple = (name, age)`,
                    target: `const numbers = [1, 2, 3]
const scores = {
  "Alice": 95,
  "Bob": 87
}
const [name, age] = [name, age]  // Destructuring for tuples`,
                    explanation: 'JavaScript uses arrays and objects'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Convert Scala collections to JavaScript',
                    code: '___ = [1, 2, 3, 4, 5]\n___ = {\n  ___: "Alice",\n  ___: 25\n}',
                    solution: 'const numbers = [1, 2, 3, 4, 5]\nconst user = {\n  name: "Alice",\n  age: 25\n}',
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
                theory: 'Converting Scala functions to JavaScript',
                difficulty: 'beginner',
                xpPoints: 20,
                examples: [
                  {
                    source: `def greet(name: String): String = {
  s"Hello, $name!"
}

val add = (a: Int, b: Int) => a + b

def multiply(x: Int)(y: Int): Int = x * y`,
                    target: `function greet(name) {
  return \`Hello, \${name}!\`
}

const add = (a, b) => a + b

function multiply(x) {
  return function(y) {
    return x * y
  }
}`,
                    explanation: 'JavaScript uses function keyword or arrow functions'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Convert Scala function to JavaScript',
                    code: '___ divide(x, y) {\n  ___ x / y\n}\n\nconst power = ___ => ___',
                    solution: 'function divide(x, y) {\n  return x / y\n}\n\nconst power = (x, y) => x ** y',
                    hints: ['Use function keyword', 'Use arrow function', 'Add return'],
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
              title: 'Case Classes',
              estimatedTime: 25,
              content: {
                theory: 'Converting Scala case classes to JavaScript',
                difficulty: 'intermediate',
                xpPoints: 25,
                examples: [
                  {
                    source: `case class Person(name: String, age: Int) {
  def greet: String = s"Hello, I'm $name!"
}

object Person {
  def apply(name: String): Person = new Person(name, 0)
}`,
                    target: `class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
  }

  greet() {
    return \`Hello, I'm \${this.name}!\`
  }

  toString() {
    return \`Person(name=\${this.name}, age=\${this.age})\`
  }

  static create(name) {
    return new Person(name, 0)
  }
}`,
                    explanation: 'JavaScript needs explicit methods for case class features'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Convert Scala case class to JavaScript',
                    code: 'class Rectangle {\n  ___(width, height) {\n    this.___ = width\n    this.___ = height\n  }\n\n  toString() {\n    return ___\n  }\n}',
                    solution: 'class Rectangle {\n  constructor(width, height) {\n    this.width = width\n    this.height = height\n  }\n\n  toString() {\n    return `Rectangle(width=${this.width}, height=${this.height})`\n  }\n}',
                    hints: ['Use constructor', 'Use this.property', 'Template literals'],
                    xpReward: 15
                  }
                ]
              }
            }
          ]
        },
        {
          id: 'unit_4_patterns',
          title: 'Pattern Matching',
          description: 'Learn JavaScript alternatives to pattern matching',
          skillLevel: 'advanced',
          xpToUnlock: 150,
          lessons: [
            {
              id: 'lesson_4_1',
              title: 'Pattern Matching',
              estimatedTime: 30,
              content: {
                theory: 'Converting Scala pattern matching to JavaScript',
                difficulty: 'advanced',
                xpPoints: 30,
                examples: [
                  {
                    source: `def describe(x: Any): String = x match {
  case i: Int if i > 0 => "positive number"
  case 0 => "zero"
  case s: String => s"string: $s"
  case _ => "something else"
}`,
                    target: `function describe(x) {
  if (typeof x === "number") {
    if (x > 0) return "positive number"
    if (x === 0) return "zero"
  }
  if (typeof x === "string") {
    return \`string: \${x}\`
  }
  return "something else"
}`,
                    explanation: 'JavaScript uses if/else and typeof checks'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Convert Scala pattern matching to JavaScript',
                    code: 'function processShape(shape) {\n  if (___ shape === ___) {\n    return \`Circle with radius \${shape.radius}\`\n  } else if (___ shape === ___) {\n    return \`Rectangle \${shape.width}x\${shape.height}\`\n  } else {\n    return ___\n  }',
                    solution: 'function processShape(shape) {\n  if (shape instanceof Circle) {\n    return `Circle with radius ${shape.radius}`\n  } else if (shape instanceof Rectangle) {\n    return `Rectangle ${shape.width}x${shape.height}`\n  } else {\n    return "Unknown shape"\n  }',
                    hints: ['Use instanceof', 'Check class types', 'Template literals'],
                    xpReward: 20
                  }
                ],
                practice: {
                  type: 'code_project',
                  instructions: 'Create a function that processes different types of data using type checks',
                  testCases: [
                    {
                      input: 'processData([1, 2, 3])',
                      expectedOutput: 'Sum: 6',
                      code: `function processData(data) {
  if (Array.isArray(data)) {
    return \`Sum: \${data.reduce((a, b) => a + b, 0)}\`
  } else if (typeof data === "object" && data !== null) {
    return \`Keys: \${Object.keys(data).join(", ")}\`
  } else if (typeof data === "string") {
    return \`Length: \${data.length}\`
  } else {
    return "Unsupported type"
  }
}`
                    }
                  ],
                  xpReward: 25
                }
              }
            }
          ]
        }
      ]
    }
  ]
};
