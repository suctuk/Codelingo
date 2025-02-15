import { LanguagePairCurriculum } from '../curriculumTemplate';
import { generateLesson, commonConcepts } from '../lessonGenerator';
import { languageConfigs } from '../languagePairFactory';

const rustToJavaScriptSpecificConcepts = {
  'option-handling': {
    source: 'fn find_user(id: i32) -> Option<User> {\n    if id > 0 {\n        Some(User { id })\n    } else {\n        None\n    }\n}',
    target: 'function findUser(id) {\n    if (id > 0) {\n        return { id };\n    }\n    return null;\n}',
    explanation: 'Rust Option becomes null/undefined checks in JavaScript',
    examples: [
      {
        source: 'match result {\n    Some(value) => println!("{}", value),\n    None => println!("No value"),\n}',
        target: 'if (result != null) {\n    console.log(result);\n} else {\n    console.log("No value");\n}',
        explanation: 'Option matching becomes null checks'
      }
    ]
  },
  'result-handling': {
    source: 'fn divide(x: f64, y: f64) -> Result<f64, &\'static str> {\n    if y == 0.0 {\n        Err("division by zero")\n    } else {\n        Ok(x / y)\n    }\n}',
    target: 'function divide(x, y) {\n    if (y === 0) {\n        throw new Error("division by zero");\n    }\n    return x / y;\n}',
    explanation: 'Rust Results become try-catch in JavaScript',
    examples: [
      {
        source: 'let result = match divide(10.0, 2.0) {\n    Ok(v) => v,\n    Err(e) => panic!(e),\n};',
        target: 'let result;\ntry {\n    result = divide(10, 2);\n} catch (e) {\n    console.error(e);\n    throw e;\n}',
        explanation: 'Result matching becomes try-catch'
      }
    ]
  },
  'struct-to-class': {
    source: 'struct Point {\n    x: f64,\n    y: f64,\n}\n\nimpl Point {\n    fn new(x: f64, y: f64) -> Point {\n        Point { x, y }\n    }\n}',
    target: 'class Point {\n    constructor(x, y) {\n        this.x = x;\n        this.y = y;\n    }\n    \n    static new(x, y) {\n        return new Point(x, y);\n    }\n}',
    explanation: 'Rust structs and impls become JavaScript classes',
    examples: [
      {
        source: 'impl Point {\n    fn distance(&self) -> f64 {\n        (self.x * self.x + self.y * self.y).sqrt()\n    }\n}',
        target: 'class Point {\n    distance() {\n        return Math.sqrt(this.x * this.x + this.y * this.y);\n    }\n}',
        explanation: 'Methods become class methods'
      }
    ]
  }
};

export const rustToJavaScript: LanguagePairCurriculum = {
  sourceLanguage: 'Rust',
  targetLanguage: 'JavaScript',
  sections: [
    {
      id: 'section_1_fundamentals',
      title: 'JavaScript Fundamentals for Rust Developers',
      description: 'Learn JavaScript basics coming from Rust',
      units: [
        {
          id: 'unit_1_1_basics',
          title: 'Basic Syntax',
          description: 'Learn JavaScript syntax differences from Rust',
          lessons: [
            {
              id: 'lesson_1_1_1',
              title: 'Variables and Types',
              content: {
                theory: 'JavaScript uses dynamic typing and simpler variable declarations',
                difficulty: 'beginner',
                xpPoints: 15,
                examples: [
                  {
                    source: 'let x: i32 = 42;\nlet mut y: String = String::from("hello");',
                    target: 'let x = 42;\nlet y = "hello";',
                    explanation: 'JavaScript variables are simpler with no type annotations'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert this Rust code to JavaScript',
                    code: 'let name: String = String::from("John");\nlet age: i32 = 30;\nprintln!("{} is {} years old", name, age);',
                    solution: 'const name = "John";\nconst age = 30;\nconsole.log(`${name} is ${age} years old`);',
                    hints: [
                      'Remove type annotations',
                      'Use const for immutable values',
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
          id: 'unit_1_2_functions',
          title: 'Functions and Methods',
          description: 'Learn JavaScript functions compared to Rust',
          lessons: [
            {
              id: 'lesson_1_2_1',
              title: 'Function Definitions',
              content: {
                theory: 'JavaScript functions are more flexible with dynamic parameters',
                difficulty: 'beginner',
                xpPoints: 20,
                examples: [
                  {
                    source: 'fn add(a: i32, b: i32) -> i32 {\n    a + b\n}',
                    target: 'function add(a, b) {\n    return a + b;\n}',
                    explanation: 'JavaScript functions are simpler with no type annotations'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert this Rust function to JavaScript',
                    code: 'fn calculate_area(radius: f64) -> f64 {\n    std::f64::consts::PI * radius * radius\n}',
                    solution: 'function calculateArea(radius) {\n    return Math.PI * radius * radius;\n}',
                    hints: [
                      'Use camelCase naming',
                      'Remove type annotations',
                      'Use Math.PI constant',
                      'Add explicit return'
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
      title: 'Advanced JavaScript Patterns',
      description: 'Learn JavaScript-specific patterns coming from Rust',
      units: [
        {
          id: 'unit_2_1_async',
          title: 'Asynchronous Programming',
          description: 'Learn JavaScript async patterns compared to Rust',
          lessons: [
            {
              id: 'lesson_2_1_1',
              title: 'Promises and Async/Await',
              content: {
                theory: 'JavaScript uses Promises for asynchronous operations',
                difficulty: 'intermediate',
                xpPoints: 30,
                examples: [
                  {
                    source: 'async fn fetch_data() -> Result<String, Error> {\n    // async operation\n}',
                    target: 'async function fetchData() {\n    try {\n        // async operation\n    } catch (error) {\n        throw error;\n    }\n}',
                    explanation: 'Async functions use try-catch for error handling'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert this Rust async function to JavaScript',
                    code: 'async fn process_user(id: i32) -> Result<User, Error> {\n    let data = fetch_data(id).await?;\n    Ok(User::new(data))\n}',
                    solution: 'async function processUser(id) {\n    try {\n        const data = await fetchData(id);\n        return new User(data);\n    } catch (error) {\n        throw error;\n    }\n}',
                    hints: [
                      'Use try-catch',
                      'Keep async/await',
                      'Remove Result wrapper',
                      'Throw errors directly'
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
      'Write JavaScript code confidently',
      'Understand key differences between Rust and JavaScript',
      'Handle asynchronous operations',
      'Work with JavaScript objects and classes',
      'Use JavaScript\'s dynamic features effectively'
    ]
  }
};
