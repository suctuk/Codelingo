import { LanguagePairCurriculum } from '../curriculumTemplate';
import { generateLesson, commonConcepts } from '../lessonGenerator';
import { languageConfigs } from '../languagePairFactory';

const rustToTypeScriptSpecificConcepts = {
  'option-type': {
    source: 'fn find_user(id: i32) -> Option<User> {\n    if id > 0 {\n        Some(User { id })\n    } else {\n        None\n    }\n}',
    target: 'function findUser(id: number): User | null {\n    if (id > 0) {\n        return { id };\n    }\n    return null;\n}',
    explanation: 'Rust Option becomes TypeScript union with null',
    examples: [
      {
        source: 'match result {\n    Some(value) => println!("{}", value),\n    None => println!("No value"),\n}',
        target: 'if (result !== null) {\n    console.log(result);\n} else {\n    console.log("No value");\n}',
        explanation: 'Option matching becomes null checks'
      }
    ]
  },
  'result-type': {
    source: 'fn divide(x: f64, y: f64) -> Result<f64, &\'static str> {\n    if y == 0.0 {\n        Err("division by zero")\n    } else {\n        Ok(x / y)\n    }\n}',
    target: 'type Result<T, E> = { ok: true; value: T } | { ok: false; error: E };\n\nfunction divide(x: number, y: number): Result<number, string> {\n    if (y === 0) {\n        return { ok: false, error: "division by zero" };\n    }\n    return { ok: true, value: x / y };\n}',
    explanation: 'Rust Result becomes TypeScript discriminated union',
    examples: [
      {
        source: 'match result {\n    Ok(v) => v,\n    Err(e) => panic!(e),\n}',
        target: 'if (result.ok) {\n    result.value\n} else {\n    throw new Error(result.error);\n}',
        explanation: 'Result matching becomes discriminated union checks'
      }
    ]
  },
  'traits-interfaces': {
    source: 'trait Shape {\n    fn area(&self) -> f64;\n}\n\nimpl Shape for Circle {\n    fn area(&self) -> f64 {\n        PI * self.radius * self.radius\n    }\n}',
    target: 'interface Shape {\n    area(): number;\n}\n\nclass Circle implements Shape {\n    constructor(private radius: number) {}\n    \n    area(): number {\n        return Math.PI * this.radius * this.radius;\n    }\n}',
    explanation: 'Rust traits become TypeScript interfaces',
    examples: [
      {
        source: 'trait Display {\n    fn to_string(&self) -> String;\n}',
        target: 'interface Display {\n    toString(): string;\n}',
        explanation: 'Trait methods become interface methods'
      }
    ]
  }
};

export const rustToTypeScript: LanguagePairCurriculum = {
  sourceLanguage: 'Rust',
  targetLanguage: 'TypeScript',
  sections: [
    {
      id: 'section_1_fundamentals',
      title: 'TypeScript Fundamentals for Rust Developers',
      description: 'Learn TypeScript basics coming from Rust',
      units: [
        {
          id: 'unit_1_1_basics',
          title: 'Basic Syntax',
          description: 'Learn TypeScript syntax differences from Rust',
          lessons: [
            {
              id: 'lesson_1_1_1',
              title: 'Variables and Types',
              content: {
                theory: 'TypeScript uses similar type annotations but with different syntax',
                difficulty: 'beginner',
                xpPoints: 15,
                examples: [
                  {
                    source: 'let x: i32 = 42;\nlet mut y: String = String::from("hello");',
                    target: 'let x: number = 42;\nlet y: string = "hello";',
                    explanation: 'TypeScript has simpler type annotations'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert this Rust code to TypeScript',
                    code: 'let name: String = String::from("John");\nlet age: i32 = 30;\nprintln!("{} is {} years old", name, age);',
                    solution: 'const name: string = "John";\nconst age: number = 30;\nconsole.log(`${name} is ${age} years old`);',
                    hints: [
                      'Use const for immutable values',
                      'Use string and number types',
                      'Use template literals',
                      'Use console.log'
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
          title: 'Classes and Interfaces',
          description: 'Learn TypeScript classes compared to Rust structs',
          lessons: [
            {
              id: 'lesson_1_2_1',
              title: 'Class Structure',
              content: {
                theory: 'TypeScript combines data and behavior in classes',
                difficulty: 'beginner',
                xpPoints: 20,
                examples: [
                  {
                    source: 'struct User {\n    name: String,\n    age: i32,\n}\n\nimpl User {\n    fn new(name: String, age: i32) -> User {\n        User { name, age }\n    }\n}',
                    target: 'class User {\n    constructor(\n        private name: string,\n        private age: number\n    ) {}\n    \n    static create(name: string, age: number): User {\n        return new User(name, age);\n    }\n}',
                    explanation: 'Structs and impls combine into classes'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert this Rust struct and impl to TypeScript',
                    code: 'struct Circle {\n    radius: f64,\n}\n\nimpl Circle {\n    fn new(radius: f64) -> Circle {\n        Circle { radius }\n    }\n    \n    fn area(&self) -> f64 {\n        std::f64::consts::PI * self.radius * self.radius\n    }\n}',
                    solution: 'class Circle {\n    constructor(private radius: number) {}\n    \n    static create(radius: number): Circle {\n        return new Circle(radius);\n    }\n    \n    area(): number {\n        return Math.PI * this.radius * this.radius;\n    }\n}',
                    hints: [
                      'Combine struct and impl',
                      'Use constructor parameter property',
                      'Add static factory method',
                      'Use Math.PI'
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
      description: 'Learn TypeScript-specific patterns coming from Rust',
      units: [
        {
          id: 'unit_2_1_generics',
          title: 'Generic Types',
          description: 'Learn TypeScript generics compared to Rust',
          lessons: [
            {
              id: 'lesson_2_1_1',
              title: 'Generic Classes',
              content: {
                theory: 'TypeScript and Rust both support generic types with similar syntax',
                difficulty: 'intermediate',
                xpPoints: 30,
                examples: [
                  {
                    source: 'struct Container<T> {\n    value: T,\n}\n\nimpl<T> Container<T> {\n    fn new(value: T) -> Container<T> {\n        Container { value }\n    }\n}',
                    target: 'class Container<T> {\n    constructor(private value: T) {}\n    \n    static create<T>(value: T): Container<T> {\n        return new Container(value);\n    }\n    \n    getValue(): T {\n        return this.value;\n    }\n}',
                    explanation: 'Generic structs become generic classes'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert this Rust generic struct to TypeScript',
                    code: 'struct Pair<T, U> {\n    first: T,\n    second: U,\n}\n\nimpl<T, U> Pair<T, U> {\n    fn new(first: T, second: U) -> Pair<T, U> {\n        Pair { first, second }\n    }\n}',
                    solution: 'class Pair<T, U> {\n    constructor(\n        private first: T,\n        private second: U\n    ) {}\n    \n    static create<T, U>(first: T, second: U): Pair<T, U> {\n        return new Pair(first, second);\n    }\n    \n    getFirst(): T {\n        return this.first;\n    }\n    \n    getSecond(): U {\n        return this.second;\n    }\n}',
                    hints: [
                      'Use class with two type parameters',
                      'Add constructor with parameter properties',
                      'Add static factory method',
                      'Add getter methods'
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
    prerequisites: ['Basic Rust knowledge'],
    learningOutcomes: [
      'Write TypeScript code confidently',
      'Understand key differences between Rust and TypeScript',
      'Use TypeScript\'s type system effectively',
      'Work with classes and interfaces',
      'Handle null and undefined properly'
    ]
  }
};
