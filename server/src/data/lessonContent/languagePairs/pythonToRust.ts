import { LanguagePairCurriculum } from '../curriculumTemplate';
import { generateLesson, commonConcepts } from '../lessonGenerator';
import { languageConfigs } from '../languagePairFactory';

export const pythonToRust: LanguagePairCurriculum = {
  sourceLanguage: 'Python',
  targetLanguage: 'Rust',
  sections: [
    {
      id: 'section_1_basics',
      title: 'Getting Started with Rust',
      description: 'Learn the fundamental differences between Python and Rust syntax',
      units: [
        {
          id: 'unit_1_1_printing',
          title: 'Print Statements and Basic Output',
          description: 'Learn how to output text and values in Rust',
          lessons: [
            {
              id: 'lesson_1_1_1',
              title: 'Your First Rust Output',
              content: {
                theory: 'In Python, you use print(). In Rust, you use println!() macro.',
                difficulty: 'beginner',
                xpPoints: 10,
                examples: [
                  {
                    source: 'print("Hello, World!")',
                    target: 'println!("Hello, World!");',
                    explanation: 'Rust uses println! macro and requires semicolons'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert this Python print statement to Rust',
                    code: 'print("I am learning Rust")',
                    solution: 'println!("I am learning Rust");',
                    hints: ['Use println! macro', 'Add semicolon at the end'],
                    xpReward: 5
                  }
                ]
              },
              prerequisites: [],
              estimatedTime: 5
            },
            {
              id: 'lesson_1_1_2',
              title: 'String Formatting',
              content: {
                theory: 'Rust uses format! macro instead of Python\'s f-strings',
                difficulty: 'beginner',
                xpPoints: 15,
                examples: [
                  {
                    source: 'name = "Alice"\nprint(f"Hello, {name}!")',
                    target: 'let name = "Alice";\nprintln!("Hello, {}!", name);',
                    explanation: 'Rust uses {} for placeholders in format strings'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert this Python f-string to Rust',
                    code: 'age = 25\nname = "Bob"\nprint(f"Age: {age}, Name: {name}")',
                    solution: 'let age = 25;\nlet name = "Bob";\nprintln!("Age: {}, Name: {}", age, name);',
                    hints: ['Use println! macro', 'Replace {var} with {}', 'List variables after format string'],
                    xpReward: 10
                  }
                ]
              },
              prerequisites: ['lesson_1_1_1'],
              estimatedTime: 8
            }
          ],
          skillLevel: 'beginner',
          xpToUnlock: 0
        },
        {
          id: 'unit_1_2_variables',
          title: 'Variables and Data Types',
          description: 'Learn about Rust variables compared to Python',
          lessons: [
            {
              id: 'lesson_1_2_1',
              title: 'Variable Declaration',
              content: {
                theory: 'Rust requires let keyword and type annotations for clarity',
                difficulty: 'beginner',
                xpPoints: 15,
                examples: [
                  {
                    source: 'name = "John"\nage = 25',
                    target: 'let name: &str = "John";\nlet age: i32 = 25;',
                    explanation: 'Rust uses let and explicit types'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert these Python variables to Rust',
                    code: 'count = 10\nmessage = "Hello"',
                    solution: 'let count: i32 = 10;\nlet message: &str = "Hello";',
                    hints: ['Use let keyword', 'Add type annotations', 'Use i32 for integers'],
                    xpReward: 10
                  }
                ]
              },
              prerequisites: [],
              estimatedTime: 8
            },
            {
              id: 'lesson_1_2_2',
              title: 'Mutability',
              content: {
                theory: 'Rust variables are immutable by default, unlike Python',
                difficulty: 'beginner',
                xpPoints: 15,
                examples: [
                  {
                    source: 'counter = 0\ncounter += 1',
                    target: 'let mut counter = 0;\ncounter += 1;',
                    explanation: 'Use mut keyword for mutable variables'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert this Python mutable variable to Rust',
                    code: 'score = 0\nscore = score + 10',
                    solution: 'let mut score = 0;\nscore = score + 10;',
                    hints: ['Use mut for mutable variables', 'Add semicolons'],
                    xpReward: 10
                  }
                ]
              },
              prerequisites: ['lesson_1_2_1'],
              estimatedTime: 8
            }
          ],
          skillLevel: 'beginner',
          xpToUnlock: 50
        }
      ],
      requiredSections: []
    },
    {
      id: 'section_2_control_flow',
      title: 'Control Flow',
      description: 'Learn how Rust handles conditions and loops',
      units: [
        {
          id: 'unit_2_1_conditionals',
          title: 'If Statements and Conditions',
          description: 'Learn Rust conditional statements',
          lessons: [
            {
              id: 'lesson_2_1_1',
              title: 'Basic If Statements',
              content: {
                theory: 'Rust if statements are expressions and don\'t need parentheses',
                difficulty: 'beginner',
                xpPoints: 20,
                examples: [
                  {
                    source: 'if x > 0:\n    print("Positive")',
                    target: 'if x > 0 {\n    println!("Positive");\n}',
                    explanation: 'Rust uses curly braces instead of indentation'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert this Python if statement to Rust',
                    code: 'if age >= 18:\n    print("Adult")',
                    solution: 'if age >= 18 {\n    println!("Adult");\n}',
                    hints: ['Remove parentheses', 'Use curly braces', 'Add semicolon'],
                    xpReward: 15
                  }
                ]
              },
              prerequisites: [],
              estimatedTime: 10
            },
            {
              id: 'lesson_2_1_2',
              title: 'If Expressions',
              content: {
                theory: 'Rust if statements can be used as expressions to assign values',
                difficulty: 'beginner',
                xpPoints: 20,
                examples: [
                  {
                    source: 'result = "even" if x % 2 == 0 else "odd"',
                    target: 'let result = if x % 2 == 0 {\n    "even"\n} else {\n    "odd"\n};',
                    explanation: 'Rust if expressions return the last expression in each block'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert this Python ternary to Rust if expression',
                    code: 'status = "pass" if score >= 60 else "fail"',
                    solution: 'let status = if score >= 60 {\n    "pass"\n} else {\n    "fail"\n};',
                    hints: ['Use if as expression', 'Put values in blocks', 'Add semicolon at end'],
                    xpReward: 15
                  }
                ]
              },
              prerequisites: ['lesson_2_1_1'],
              estimatedTime: 10
            }
          ],
          skillLevel: 'beginner',
          xpToUnlock: 100
        }
      ],
      requiredSections: ['section_1_basics']
    }
  ],
  metadata: {
    totalLessons: 300,
    estimatedHours: 40,
    difficulty: 'Beginner to Advanced',
    prerequisites: ['Basic Python knowledge'],
    learningOutcomes: [
      'Write Rust code confidently',
      'Understand key differences from Python',
      'Create basic Rust programs',
      'Use Rust\'s ownership system effectively'
    ]
  }
};
