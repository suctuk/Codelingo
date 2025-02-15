import { LanguagePairCurriculum } from '../curriculumTemplate';
import { generateLesson, commonConcepts } from '../lessonGenerator';
import { languageConfigs } from '../languagePairFactory';

export const javaScriptToPython: LanguagePairCurriculum = {
  sourceLanguage: 'JavaScript',
  targetLanguage: 'Python',
  sections: [
    {
      id: 'section_1_basics',
      title: 'Getting Started with Python',
      description: 'Learn the fundamental differences between JavaScript and Python syntax',
      units: [
        {
          id: 'unit_1_1_printing',
          title: 'Print Statements and Basic Output',
          description: 'Learn how to output text and values in Python',
          lessons: [
            {
              id: 'lesson_1_1_1',
              title: 'Your First Python Output',
              content: {
                theory: 'In JavaScript, you use console.log(). In Python, you use print().',
                difficulty: 'beginner',
                xpPoints: 10,
                examples: [
                  {
                    source: 'console.log("Hello, World!");',
                    target: 'print("Hello, World!")',
                    explanation: 'Python uses print() and doesn\'t need semicolons'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert this JavaScript console.log to Python',
                    code: 'console.log("I am learning Python");',
                    solution: 'print("I am learning Python")',
                    hints: ['Remove semicolon', 'Use print instead of console.log'],
                    xpReward: 5
                  }
                ]
              },
              prerequisites: [],
              estimatedTime: 5
            },
            {
              id: 'lesson_1_1_2',
              title: 'Multiple Print Statements',
              content: {
                theory: 'Python, like JavaScript, can have multiple print statements in sequence.',
                difficulty: 'beginner',
                xpPoints: 10,
                examples: [
                  {
                    source: 'console.log("First line");\nconsole.log("Second line");',
                    target: 'print("First line")\nprint("Second line")',
                    explanation: 'Python doesn\'t use semicolons'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert these JavaScript console.log statements to Python',
                    code: 'console.log("Line 1");\nconsole.log("Line 2");\nconsole.log("Line 3");',
                    solution: 'print("Line 1")\nprint("Line 2")\nprint("Line 3")',
                    hints: ['Remove all semicolons', 'Replace console.log with print'],
                    xpReward: 5
                  }
                ]
              },
              prerequisites: ['lesson_1_1_1'],
              estimatedTime: 5
            },
            {
              id: 'lesson_1_1_3',
              title: 'Printing Numbers',
              content: {
                theory: 'Both JavaScript and Python can print numbers directly.',
                difficulty: 'beginner',
                xpPoints: 10,
                examples: [
                  {
                    source: 'console.log(42);',
                    target: 'print(42)',
                    explanation: 'Numbers don\'t need quotes in either language'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert this JavaScript number print to Python',
                    code: 'console.log(123);',
                    solution: 'print(123)',
                    hints: ['Remove semicolon', 'Use print'],
                    xpReward: 5
                  }
                ]
              },
              prerequisites: ['lesson_1_1_2'],
              estimatedTime: 5
            },
            {
              id: 'lesson_1_1_4',
              title: 'String Concatenation in Print',
              content: {
                theory: 'Python uses + for string concatenation like JavaScript',
                difficulty: 'beginner',
                xpPoints: 15,
                examples: [
                  {
                    source: 'const name = "John";\nconsole.log("Hello, " + name);',
                    target: 'name = "John"\nprint("Hello, " + name)',
                    explanation: 'Python uses + for concatenation but no semicolons'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert this JavaScript concatenation to Python',
                    code: 'const age = 25;\nconsole.log("I am " + age + " years old");',
                    solution: 'age = 25\nprint("I am " + str(age) + " years old")',
                    hints: ['Remove const', 'Remove semicolons', 'Use str() for number conversion'],
                    xpReward: 10
                  }
                ]
              },
              prerequisites: ['lesson_1_1_3'],
              estimatedTime: 8
            },
            {
              id: 'lesson_1_1_5',
              title: 'Template Strings to F-strings',
              content: {
                theory: 'JavaScript template literals become f-strings in Python',
                difficulty: 'beginner',
                xpPoints: 15,
                examples: [
                  {
                    source: 'const name = "John";\nconsole.log(`Hello, ${name}`);',
                    target: 'name = "John"\nprint(f"Hello, {name}")',
                    explanation: 'Python uses f-strings instead of backticks'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert this JavaScript template literal to Python f-string',
                    code: 'const age = 25;\nconsole.log(`I am ${age} years old`);',
                    solution: 'age = 25\nprint(f"I am {age} years old")',
                    hints: ['Remove const', 'Remove semicolons', 'Use f-string with {}'],
                    xpReward: 10
                  }
                ]
              },
              prerequisites: ['lesson_1_1_4'],
              estimatedTime: 8
            }
          ],
          skillLevel: 'beginner',
          xpToUnlock: 0
        },
        {
          id: 'unit_1_2_variables',
          title: 'Variables and Data Types',
          description: 'Learn about Python variables and how they differ from JavaScript',
          lessons: [
            {
              id: 'lesson_1_2_1',
              title: 'Variable Declaration',
              content: {
                theory: 'Python doesn\'t use let, const, or var - just assign directly',
                difficulty: 'beginner',
                xpPoints: 15,
                examples: [
                  {
                    source: 'let name = "John";',
                    target: 'name = "John"',
                    explanation: 'Python doesn\'t need declaration keywords'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert this JavaScript variable to Python',
                    code: 'let age = 25;',
                    solution: 'age = 25',
                    hints: ['Remove let', 'Remove semicolon'],
                    xpReward: 10
                  }
                ]
              },
              prerequisites: [],
              estimatedTime: 8
            },
            {
              id: 'lesson_1_2_2',
              title: 'Constants and Final Values',
              content: {
                theory: 'Python uses uppercase names by convention for constants',
                difficulty: 'beginner',
                xpPoints: 15,
                examples: [
                  {
                    source: 'const PI = 3.14;',
                    target: 'PI = 3.14',
                    explanation: 'Python uses uppercase names for constants (convention)'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert this JavaScript constant to Python',
                    code: 'const MAX_VALUE = 100;',
                    solution: 'MAX_VALUE = 100',
                    hints: ['Remove const', 'Remove semicolon', 'Keep uppercase for constants'],
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
      description: 'Learn how Python handles conditions and loops',
      units: [
        {
          id: 'unit_2_1_conditionals',
          title: 'If Statements and Conditions',
          description: 'Learn Python conditional statements',
          lessons: [
            {
              id: 'lesson_2_1_1',
              title: 'Basic If Statements',
              content: {
                theory: 'Python uses indentation instead of curly braces',
                difficulty: 'beginner',
                xpPoints: 20,
                examples: [
                  {
                    source: 'if (x > 0) {\n    console.log("Positive");\n}',
                    target: 'if x > 0:\n    print("Positive")',
                    explanation: 'Python uses colon and indentation'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert this JavaScript if statement to Python',
                    code: 'if (age >= 18) {\n    console.log("Adult");\n}',
                    solution: 'if age >= 18:\n    print("Adult")',
                    hints: ['Remove parentheses', 'Add colon', 'Use indentation', 'Remove semicolon'],
                    xpReward: 15
                  }
                ]
              },
              prerequisites: [],
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
    prerequisites: ['Basic JavaScript knowledge'],
    learningOutcomes: [
      'Write Python code confidently',
      'Understand key differences from JavaScript',
      'Create basic Python programs',
      'Use Python\'s unique features effectively'
    ]
  }
};
