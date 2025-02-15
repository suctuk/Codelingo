import { LanguagePairCurriculum } from './curriculumTemplate';
import { languageConfigs } from './languagePairFactory';

export const javaScriptToPythonCurriculum: LanguagePairCurriculum = {
  sourceLanguage: 'JavaScript',
  targetLanguage: 'Python',
  sections: [
    {
      id: 'section_1_fundamentals',
      title: 'Python Fundamentals for JavaScript Developers',
      description: 'Learn Python basics coming from JavaScript',
      units: [
        {
          id: 'unit_1_1_output',
          title: 'Console Output',
          description: 'Learn how Python handles console output compared to JavaScript',
          lessons: [
            {
              id: 'lesson_1_1_1',
              title: 'Hello World',
              content: {
                theory: 'In JavaScript, we use console.log() for output. Python uses the print() function.',
                difficulty: 'beginner',
                xpPoints: 10,
                examples: [
                  {
                    source: 'console.log("Hello World");',
                    target: 'print("Hello World")',
                    explanation: 'Python\'s print() function is simpler - no semicolon needed!'
                  },
                  {
                    source: 'console.log(42);',
                    target: 'print(42)',
                    explanation: 'Printing numbers works the same way in both languages'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert this JavaScript console.log to Python print',
                    code: 'console.log("Welcome to Python!");',
                    solution: 'print("Welcome to Python!")',
                    hints: [
                      'Python uses print instead of console.log',
                      'Python doesn\'t use semicolons'
                    ],
                    xpReward: 5
                  },
                  {
                    type: 'multiple_choice',
                    question: 'Which is the correct way to print "Hello" in Python?',
                    code: 'console.log("Hello");',
                    solution: 'print("Hello")',
                    hints: ['Look at the syntax differences'],
                    xpReward: 5
                  }
                ]
              },
              prerequisites: [],
              estimatedTime: 5
            },
            {
              id: 'lesson_1_1_2',
              title: 'Multiple Values',
              content: {
                theory: 'Python\'s print can handle multiple values with comma separation, while JavaScript needs concatenation or template literals.',
                difficulty: 'beginner',
                xpPoints: 15,
                examples: [
                  {
                    source: 'console.log("Count:", 1, 2, 3);',
                    target: 'print("Count:", 1, 2, 3)',
                    explanation: 'Python automatically adds spaces between values'
                  },
                  {
                    source: 'console.log(`${name} is ${age} years old`);',
                    target: 'print(name, "is", age, "years old")',
                    explanation: 'Python can mix strings and variables with commas'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert this JavaScript output to Python',
                    code: 'console.log("Score:", score, "points");',
                    solution: 'print("Score:", score, "points")',
                    hints: [
                      'Use commas to separate values',
                      'Python adds spaces automatically'
                    ],
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
          title: 'Variables and Types',
          description: 'Learn how Python handles variables differently from JavaScript',
          lessons: [
            {
              id: 'lesson_1_2_1',
              title: 'Variable Declaration',
              content: {
                theory: 'JavaScript uses let, const, and var for variables. Python just uses the name directly.',
                difficulty: 'beginner',
                xpPoints: 20,
                examples: [
                  {
                    source: 'let name = "John";\nconst age = 30;',
                    target: 'name = "John"\nage = 30',
                    explanation: 'Python doesn\'t need declaration keywords'
                  },
                  {
                    source: 'let count = 0;\ncount += 1;',
                    target: 'count = 0\ncount += 1',
                    explanation: 'Assignment operators work the same way'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert these JavaScript variables to Python',
                    code: 'let x = 100;\nconst y = "hello";',
                    solution: 'x = 100\ny = "hello"',
                    hints: [
                      'Remove let and const',
                      'Remove semicolons'
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
          xpToUnlock: 30
        }
      ],
      requiredSections: []
    }
  ],
  metadata: {
    totalLessons: 300,
    estimatedHours: 40,
    difficulty: 'Beginner to Advanced',
    prerequisites: ['Basic JavaScript knowledge'],
    learningOutcomes: [
      'Write Python code confidently',
      'Understand key differences between JavaScript and Python',
      'Build Python applications using JavaScript knowledge'
    ]
  }
};
