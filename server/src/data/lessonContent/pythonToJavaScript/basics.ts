export const basicsSection = {
  id: 'basics',
  title: 'JavaScript Basics',
  description: 'Start your JavaScript journey from Python',
  units: [
    {
      id: 'unit_1',
      title: 'Output and Basic Syntax',
      lessons: [
        {
          id: 'lesson_1_1',
          title: 'Your First JavaScript Code',
          content: {
            theory: 'In Python, we use print() for output. JavaScript uses console.log()',
            examples: [
              {
                source: 'print("Hello, World!")',
                target: 'console.log("Hello, World!");',
                explanation: 'Notice the semicolon at the end - JavaScript statements end with semicolons'
              }
            ],
            exercises: [
              {
                type: 'code_conversion',
                question: 'Convert this Python code to JavaScript:',
                code: 'print("I am learning JavaScript")',
                solution: 'console.log("I am learning JavaScript");',
                hints: [
                  'Replace print with console.log',
                  'Add a semicolon at the end'
                ]
              }
            ]
          }
        },
        {
          id: 'lesson_1_2',
          title: 'Multiple Print Statements',
          content: {
            theory: 'Like Python, JavaScript can have multiple print statements',
            examples: [
              {
                source: 'print("First line")\nprint("Second line")',
                target: 'console.log("First line");\nconsole.log("Second line");',
                explanation: 'Each statement needs its own semicolon'
              }
            ],
            exercises: [
              {
                type: 'code_completion',
                question: 'Complete the JavaScript code:',
                code: 'console.log("Line 1");\n___("Line 2");',
                solution: 'console.log("Line 1");\nconsole.log("Line 2");',
                hints: ['Use the same method for both lines']
              }
            ]
          }
        }
      ]
    },
    {
      id: 'unit_2',
      title: 'Variables and Data Types',
      lessons: [
        {
          id: 'lesson_2_1',
          title: 'Declaring Variables',
          content: {
            theory: 'Python variables are created by assignment. JavaScript requires let, const, or var',
            examples: [
              {
                source: 'name = "Alice"',
                target: 'let name = "Alice";',
                explanation: 'JavaScript requires let for variable declaration'
              },
              {
                source: 'age = 25',
                target: 'const age = 25;',
                explanation: 'Use const for values that won\'t change'
              }
            ],
            exercises: [
              {
                type: 'multiple_choice',
                question: 'Which is the correct way to declare a variable in JavaScript?',
                options: [
                  'name = "Bob"',
                  'let name = "Bob";',
                  'var name = "Bob"',
                  'const name = "Bob";'
                ],
                correctIndex: 1,
                explanation: 'let is the modern way to declare variables in JavaScript'
              },
              {
                type: 'code_conversion',
                question: 'Convert these Python variables to JavaScript:',
                code: 'count = 0\nname = "User"',
                solution: 'let count = 0;\nlet name = "User";',
                hints: [
                  'Add let before each variable',
                  'Add semicolons'
                ]
              }
            ]
          }
        },
        {
          id: 'lesson_2_2',
          title: 'Numbers and Strings',
          content: {
            theory: 'Python and JavaScript handle numbers and strings similarly',
            examples: [
              {
                source: 'num = 42\ntext = "Hello"',
                target: 'let num = 42;\nlet text = "Hello";',
                explanation: 'Numbers and strings work the same way, just add let and semicolons'
              }
            ],
            exercises: [
              {
                type: 'code_conversion',
                question: 'Convert this Python code to JavaScript:',
                code: 'price = 9.99\nitem = "Book"',
                solution: 'let price = 9.99;\nlet item = "Book";',
                hints: [
                  'Declare variables with let',
                  'Keep the same number and string values',
                  'Add semicolons'
                ]
              }
            ]
          }
        }
      ]
    },
    {
      id: 'unit_3',
      title: 'Basic Operators',
      lessons: [
        {
          id: 'lesson_3_1',
          title: 'Arithmetic Operators',
          content: {
            theory: 'Python and JavaScript share most arithmetic operators',
            examples: [
              {
                source: 'x = 5 + 3\ny = 10 - 2',
                target: 'let x = 5 + 3;\nlet y = 10 - 2;',
                explanation: 'Basic arithmetic works the same way'
              }
            ],
            exercises: [
              {
                type: 'code_conversion',
                question: 'Convert these Python calculations to JavaScript:',
                code: 'result = 15 * 2\naverage = total / count',
                solution: 'let result = 15 * 2;\nlet average = total / count;',
                hints: [
                  'Add let for variable declarations',
                  'Keep the arithmetic operators the same',
                  'Add semicolons'
                ]
              }
            ]
          }
        }
      ]
    }
  ]
};
