import { LanguagePairCurriculum } from '../curriculumTemplate';
import { generateLesson, commonConcepts } from '../lessonGenerator';
import { languageConfigs } from '../languagePairFactory';

const javaScriptToRustSpecificConcepts = {
  'null-to-option': {
    source: 'function findUser(id) {\n    if (id > 0) {\n        return { id };\n    }\n    return null;\n}',
    target: 'fn find_user(id: i32) -> Option<User> {\n    if id > 0 {\n        Some(User { id })\n    } else {\n        None\n    }\n}',
    explanation: 'JavaScript null/undefined checks become Option in Rust',
    examples: [
      {
        source: 'if (value !== null) {\n    console.log(value);\n}',
        target: 'if let Some(value) = option {\n    println!("{}", value);\n}',
        explanation: 'Null checks become Option matching'
      }
    ]
  },
  'try-catch-to-result': {
    source: 'function divide(x, y) {\n    if (y === 0) {\n        throw new Error("division by zero");\n    }\n    return x / y;\n}',
    target: 'fn divide(x: f64, y: f64) -> Result<f64, &\'static str> {\n    if y == 0.0 {\n        Err("division by zero")\n    } else {\n        Ok(x / y)\n    }\n}',
    explanation: 'JavaScript try-catch becomes Result in Rust',
    examples: [
      {
        source: 'try {\n    const result = divide(10, 2);\n} catch (e) {\n    console.error(e);\n}',
        target: 'match divide(10.0, 2.0) {\n    Ok(result) => println!("{}", result),\n    Err(e) => eprintln!("{}", e),\n}',
        explanation: 'Try-catch blocks become match expressions'
      }
    ]
  },
  'class-to-struct': {
    source: 'class Point {\n    constructor(x, y) {\n        this.x = x;\n        this.y = y;\n    }\n    \n    distance() {\n        return Math.sqrt(this.x * this.x + this.y * this.y);\n    }\n}',
    target: 'struct Point {\n    x: f64,\n    y: f64,\n}\n\nimpl Point {\n    fn new(x: f64, y: f64) -> Point {\n        Point { x, y }\n    }\n    \n    fn distance(&self) -> f64 {\n        (self.x * self.x + self.y * self.y).sqrt()\n    }\n}',
    explanation: 'JavaScript classes become Rust structs with implementations',
    examples: [
      {
        source: 'class Rectangle {\n    constructor(width, height) {\n        this.width = width;\n        this.height = height;\n    }\n}',
        target: 'struct Rectangle {\n    width: f64,\n    height: f64,\n}\n\nimpl Rectangle {\n    fn new(width: f64, height: f64) -> Rectangle {\n        Rectangle { width, height }\n    }\n}',
        explanation: 'Constructor becomes new associated function'
      }
    ]
  }
};

export const javaScriptToRust: LanguagePairCurriculum = {
  sourceLanguage: 'JavaScript',
  targetLanguage: 'Rust',
  sections: [
    {
      id: 'section_1_fundamentals',
      title: 'Rust Fundamentals for JavaScript Developers',
      description: 'Learn Rust basics coming from JavaScript',
      units: [
        {
          id: 'unit_1_1_basics',
          title: 'Basic Syntax',
          description: 'Learn Rust syntax differences from JavaScript',
          lessons: [
            {
              id: 'lesson_1_1_1',
              title: 'Variables and Types',
              content: {
                theory: 'Rust requires explicit type annotations and ownership management',
                difficulty: 'beginner',
                xpPoints: 15,
                examples: [
                  {
                    source: 'let x = 42;\nlet y = "hello";',
                    target: 'let x: i32 = 42;\nlet y: String = String::from("hello");',
                    explanation: 'Rust requires explicit types and string ownership'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert this JavaScript code to Rust',
                    code: 'const name = "John";\nconst age = 30;\nconsole.log(`${name} is ${age} years old`);',
                    solution: 'fn main() {\n    let name: String = String::from("John");\n    let age: i32 = 30;\n    println!("{} is {} years old", name, age);\n}',
                    hints: [
                      'Add main function',
                      'Add type annotations',
                      'Use String::from for strings',
                      'Use println! macro'
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
          id: 'unit_1_2_functions',
          title: 'Functions and Methods',
          description: 'Learn Rust functions compared to JavaScript',
          lessons: [
            {
              id: 'lesson_1_2_1',
              title: 'Function Definitions',
              content: {
                theory: 'Rust functions require explicit type annotations',
                difficulty: 'beginner',
                xpPoints: 20,
                examples: [
                  {
                    source: 'function add(a, b) {\n    return a + b;\n}',
                    target: 'fn add(a: i32, b: i32) -> i32 {\n    a + b\n}',
                    explanation: 'Rust functions need parameter and return types'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert this JavaScript function to Rust',
                    code: 'function calculateArea(radius) {\n    return Math.PI * radius * radius;\n}',
                    solution: 'fn calculate_area(radius: f64) -> f64 {\n    std::f64::consts::PI * radius * radius\n}',
                    hints: [
                      'Use snake_case naming',
                      'Add type annotations',
                      'Use f64::consts::PI',
                      'Remove return keyword'
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
      title: 'Advanced Rust Patterns',
      description: 'Learn Rust-specific patterns coming from JavaScript',
      units: [
        {
          id: 'unit_2_1_ownership',
          title: 'Ownership and Borrowing',
          description: 'Learn Rust\'s ownership system',
          lessons: [
            {
              id: 'lesson_2_1_1',
              title: 'Understanding Ownership',
              content: {
                theory: 'Rust\'s ownership system ensures memory safety without garbage collection',
                difficulty: 'intermediate',
                xpPoints: 30,
                examples: [
                  {
                    source: 'function processArray(arr) {\n    arr.push(4);\n    return arr;\n}',
                    target: 'fn process_array(mut arr: Vec<i32>) -> Vec<i32> {\n    arr.push(4);\n    arr\n}',
                    explanation: 'Functions take ownership or borrow values'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert this JavaScript code to Rust with proper ownership',
                    code: 'function processString(text) {\n    const modified = text.toUpperCase();\n    return modified;\n}',
                    solution: 'fn process_string(text: String) -> String {\n    text.to_uppercase()\n}',
                    hints: [
                      'Take ownership of String',
                      'Use to_uppercase()',
                      'Return owned String',
                      'Remove const and return'
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
    prerequisites: ['Basic JavaScript knowledge'],
    learningOutcomes: [
      'Write Rust code confidently',
      'Understand Rust\'s ownership system',
      'Handle errors with Result',
      'Work with Rust structs and implementations',
      'Use Rust\'s type system effectively'
    ]
  }
};
