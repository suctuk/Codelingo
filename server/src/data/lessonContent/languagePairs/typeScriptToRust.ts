import { LanguagePairCurriculum } from '../curriculumTemplate';
import { generateLesson, commonConcepts } from '../lessonGenerator';
import { languageConfigs } from '../languagePairFactory';

const typeScriptToRustSpecificConcepts = {
  'null-to-option': {
    source: 'function findUser(id: number): User | null {\n    if (id > 0) {\n        return { id };\n    }\n    return null;\n}',
    target: 'fn find_user(id: i32) -> Option<User> {\n    if id > 0 {\n        Some(User { id })\n    } else {\n        None\n    }\n}',
    explanation: 'TypeScript null unions become Rust Option',
    examples: [
      {
        source: 'if (value !== null) {\n    console.log(value);\n}',
        target: 'if let Some(value) = option {\n    println!("{}", value);\n}',
        explanation: 'Null checks become Option patterns'
      }
    ]
  },
  'error-handling': {
    source: 'type Result<T, E> = { ok: true; value: T } | { ok: false; error: E };\n\nfunction divide(x: number, y: number): Result<number, string> {\n    if (y === 0) {\n        return { ok: false, error: "division by zero" };\n    }\n    return { ok: true, value: x / y };\n}',
    target: 'fn divide(x: f64, y: f64) -> Result<f64, &\'static str> {\n    if y == 0.0 {\n        Err("division by zero")\n    } else {\n        Ok(x / y)\n    }\n}',
    explanation: 'TypeScript discriminated unions become Rust Result',
    examples: [
      {
        source: 'if (result.ok) {\n    console.log(result.value);\n} else {\n    console.error(result.error);\n}',
        target: 'match result {\n    Ok(value) => println!("{}", value),\n    Err(error) => eprintln!("{}", error),\n}',
        explanation: 'Union checks become match expressions'
      }
    ]
  },
  'interfaces-traits': {
    source: 'interface Shape {\n    area(): number;\n}\n\nclass Circle implements Shape {\n    constructor(private radius: number) {}\n    \n    area(): number {\n        return Math.PI * this.radius * this.radius;\n    }\n}',
    target: 'trait Shape {\n    fn area(&self) -> f64;\n}\n\nstruct Circle {\n    radius: f64,\n}\n\nimpl Shape for Circle {\n    fn area(&self) -> f64 {\n        std::f64::consts::PI * self.radius * self.radius\n    }\n}',
    explanation: 'TypeScript interfaces become Rust traits',
    examples: [
      {
        source: 'interface Display {\n    toString(): string;\n}',
        target: 'trait Display {\n    fn to_string(&self) -> String;\n}',
        explanation: 'Interface methods become trait methods'
      }
    ]
  }
};

export const typeScriptToRust: LanguagePairCurriculum = {
  sourceLanguage: 'TypeScript',
  targetLanguage: 'Rust',
  sections: [
    {
      id: 'section_1_fundamentals',
      title: 'Rust Fundamentals for TypeScript Developers',
      description: 'Learn Rust basics coming from TypeScript',
      units: [
        {
          id: 'unit_1_1_basics',
          title: 'Basic Syntax',
          description: 'Learn Rust syntax differences from TypeScript',
          lessons: [
            {
              id: 'lesson_1_1_1',
              title: 'Variables and Types',
              content: {
                theory: 'Rust requires explicit ownership and different type names',
                difficulty: 'beginner',
                xpPoints: 15,
                examples: [
                  {
                    source: 'let x: number = 42;\nlet y: string = "hello";',
                    target: 'let x: i32 = 42;\nlet y: String = String::from("hello");',
                    explanation: 'Rust requires explicit string ownership'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert this TypeScript code to Rust',
                    code: 'const name: string = "John";\nconst age: number = 30;\nconsole.log(`${name} is ${age} years old`);',
                    solution: 'fn main() {\n    let name: String = String::from("John");\n    let age: i32 = 30;\n    println!("{} is {} years old", name, age);\n}',
                    hints: [
                      'Add main function',
                      'Use String::from for strings',
                      'Use i32 for integers',
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
          id: 'unit_1_2_structs',
          title: 'Structs and Implementations',
          description: 'Learn Rust structs compared to TypeScript classes',
          lessons: [
            {
              id: 'lesson_1_2_1',
              title: 'Struct Basics',
              content: {
                theory: 'Rust separates data (structs) from behavior (impl)',
                difficulty: 'beginner',
                xpPoints: 20,
                examples: [
                  {
                    source: 'class User {\n    constructor(\n        private name: string,\n        private age: number\n    ) {}\n}',
                    target: 'struct User {\n    name: String,\n    age: i32,\n}\n\nimpl User {\n    fn new(name: String, age: i32) -> User {\n        User { name, age }\n    }\n}',
                    explanation: 'Classes split into struct and impl blocks'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert this TypeScript class to Rust',
                    code: 'class Circle {\n    constructor(private radius: number) {}\n    \n    area(): number {\n        return Math.PI * this.radius * this.radius;\n    }\n}',
                    solution: 'struct Circle {\n    radius: f64,\n}\n\nimpl Circle {\n    fn new(radius: f64) -> Circle {\n        Circle { radius }\n    }\n    \n    fn area(&self) -> f64 {\n        std::f64::consts::PI * self.radius * self.radius\n    }\n}',
                    hints: [
                      'Split into struct and impl',
                      'Use f64 for floating-point',
                      'Add self parameter',
                      'Use std::f64::consts::PI'
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
      title: 'Advanced Rust Features',
      description: 'Learn Rust-specific patterns coming from TypeScript',
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
                    source: 'function processString(text: string): string {\n    const modified = text.toUpperCase();\n    return modified;\n}',
                    target: 'fn process_string(text: String) -> String {\n    text.to_uppercase()\n}',
                    explanation: 'String ownership must be managed explicitly'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert this TypeScript function to Rust with proper ownership',
                    code: 'function addItem(items: string[], item: string): string[] {\n    items.push(item);\n    return items;\n}',
                    solution: 'fn add_item(mut items: Vec<String>, item: String) -> Vec<String> {\n    items.push(item);\n    items\n}',
                    hints: [
                      'Use Vec instead of Array',
                      'Mark parameter as mutable',
                      'Take ownership of parameters',
                      'Return owned Vec'
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
      'Write Rust code confidently',
      'Understand Rust\'s ownership system',
      'Handle errors with Result',
      'Work with Rust structs and traits',
      'Use Rust\'s type system effectively'
    ]
  }
};
