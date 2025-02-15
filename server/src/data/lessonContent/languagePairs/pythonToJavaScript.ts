import { LanguagePairCurriculum } from '../curriculumTemplate';
import { generateLesson, commonConcepts } from '../lessonGenerator';
import { languageConfigs } from '../languagePairFactory';

export const pythonToJavaScript: LanguagePairCurriculum = {
  sourceLanguage: 'Python',
  targetLanguage: 'JavaScript',
  sections: [
    {
      id: 'section_1_basics',
      title: 'Getting Started with JavaScript',
      description: 'Learn the fundamental differences between Python and JavaScript syntax',
      units: [
        {
          id: 'unit_1_1_printing',
          title: 'Print Statements and Basic Output',
          description: 'Learn how to output text and values in JavaScript',
          lessons: [
            {
              id: 'lesson_1_1_1',
              title: 'Your First JavaScript Output',
              content: {
                theory: 'In Python, you use print(). In JavaScript, you use console.log().',
                difficulty: 'beginner',
                xpPoints: 10,
                examples: [
                  {
                    source: 'print("Hello, World!")',
                    target: 'console.log("Hello, World!");',
                    explanation: 'JavaScript uses console.log() instead of print()'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert this Python print statement to JavaScript',
                    code: 'print("I am learning JavaScript")',
                    solution: 'console.log("I am learning JavaScript");',
                    hints: ['Remember to add semicolon', 'Use console.log instead of print'],
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
                theory: 'Like Python, JavaScript can have multiple print statements in sequence.',
                difficulty: 'beginner',
                xpPoints: 10,
                examples: [
                  {
                    source: 'print("First line")\nprint("Second line")',
                    target: 'console.log("First line");\nconsole.log("Second line");',
                    explanation: 'Each statement needs a semicolon in JavaScript'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert these Python print statements to JavaScript',
                    code: 'print("Line 1")\nprint("Line 2")\nprint("Line 3")',
                    solution: 'console.log("Line 1");\nconsole.log("Line 2");\nconsole.log("Line 3");',
                    hints: ['Each line needs console.log', 'Don\'t forget semicolons'],
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
                theory: 'Both Python and JavaScript can print numbers directly.',
                difficulty: 'beginner',
                xpPoints: 10,
                examples: [
                  {
                    source: 'print(42)',
                    target: 'console.log(42);',
                    explanation: 'Numbers don\'t need quotes'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert this Python number print to JavaScript',
                    code: 'print(123)',
                    solution: 'console.log(123);',
                    hints: ['Numbers don\'t need quotes', 'Add semicolon'],
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
                theory: 'JavaScript uses + or template literals for string concatenation',
                difficulty: 'beginner',
                xpPoints: 15,
                examples: [
                  {
                    source: 'name = "John"\nprint("Hello, " + name)',
                    target: 'const name = "John";\nconsole.log("Hello, " + name);',
                    explanation: 'JavaScript uses + for concatenation like Python'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert this Python concatenation to JavaScript',
                    code: 'age = 25\nprint("I am " + str(age) + " years old")',
                    solution: 'const age = 25;\nconsole.log("I am " + age + " years old");',
                    hints: ['Use const for variables', 'No need for str() in JavaScript'],
                    xpReward: 10
                  }
                ]
              },
              prerequisites: ['lesson_1_1_3'],
              estimatedTime: 8
            },
            {
              id: 'lesson_1_1_5',
              title: 'Template Literals',
              content: {
                theory: 'JavaScript\'s template literals are similar to Python\'s f-strings',
                difficulty: 'beginner',
                xpPoints: 15,
                examples: [
                  {
                    source: 'name = "John"\nprint(f"Hello, {name}")',
                    target: 'const name = "John";\nconsole.log(`Hello, ${name}`);',
                    explanation: 'JavaScript uses backticks and ${} for template literals'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert this Python f-string to JavaScript template literal',
                    code: 'age = 25\nprint(f"I am {age} years old")',
                    solution: 'const age = 25;\nconsole.log(`I am ${age} years old`);',
                    hints: ['Use backticks for template literals', 'Use ${} for variables'],
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
          description: 'Learn about JavaScript variables and how they differ from Python',
          lessons: [
            {
              id: 'lesson_1_2_1',
              title: 'Declaring Variables',
              content: {
                theory: 'JavaScript requires let, const, or var for variable declaration',
                difficulty: 'beginner',
                xpPoints: 15,
                examples: [
                  {
                    source: 'name = "John"',
                    target: 'let name = "John";',
                    explanation: 'JavaScript requires let for mutable variables'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert this Python variable to JavaScript',
                    code: 'age = 25',
                    solution: 'let age = 25;',
                    hints: ['Use let for variables', 'Add semicolon'],
                    xpReward: 10
                  }
                ]
              },
              prerequisites: [],
              estimatedTime: 8
            },
            {
              id: 'lesson_1_2_2',
              title: 'Constants',
              content: {
                theory: 'JavaScript uses const for immutable variables',
                difficulty: 'beginner',
                xpPoints: 15,
                examples: [
                  {
                    source: 'PI = 3.14  # constant in Python',
                    target: 'const PI = 3.14;',
                    explanation: 'Use const for values that won\'t change'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert this Python constant to JavaScript',
                    code: 'MAX_VALUE = 100',
                    solution: 'const MAX_VALUE = 100;',
                    hints: ['Use const for constants', 'Add semicolon'],
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
      description: 'Learn how JavaScript handles conditions and loops',
      units: [
        {
          id: 'unit_2_1_conditionals',
          title: 'If Statements and Conditions',
          description: 'Learn JavaScript conditional statements',
          lessons: [
            {
              id: 'lesson_2_1_1',
              title: 'Basic If Statements',
              content: {
                theory: 'JavaScript uses curly braces instead of indentation',
                difficulty: 'beginner',
                xpPoints: 20,
                examples: [
                  {
                    source: 'if x > 0:\n    print("Positive")',
                    target: 'if (x > 0) {\n    console.log("Positive");\n}',
                    explanation: 'JavaScript requires parentheses and curly braces'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert this Python if statement to JavaScript',
                    code: 'if age >= 18:\n    print("Adult")',
                    solution: 'if (age >= 18) {\n    console.log("Adult");\n}',
                    hints: ['Add parentheses around condition', 'Use curly braces', 'Add semicolon'],
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
    prerequisites: ['Basic Python knowledge'],
    learningOutcomes: [
      'Write JavaScript code confidently',
      'Understand key differences from Python',
      'Create basic JavaScript programs',
      'Use JavaScript\'s unique features effectively'
    ]
  }
};
