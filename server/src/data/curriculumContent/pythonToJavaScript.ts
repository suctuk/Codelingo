export const pythonToJavaScriptCurriculum = {
  sections: [
    {
      id: 'basics',
      title: 'JavaScript Fundamentals',
      description: 'Learn JavaScript basics coming from Python',
      difficulty: 'beginner',
      units: [
        {
          id: 'output_basics',
          title: 'Basic Output',
          description: 'Learn to display information in JavaScript',
          lessons: [
            {
              id: 'console_log',
              title: 'Print to Console',
              content: {
                theory: 'In Python, you use print(). In JavaScript, we use console.log()',
                examples: [
                  {
                    python: 'print("Hello")',
                    javascript: 'console.log("Hello");',
                    explanation: 'JavaScript uses console.log() and requires a semicolon'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert this Python code to JavaScript:',
                    code: 'print("Learning JavaScript!")',
                    solution: 'console.log("Learning JavaScript!");',
                    hints: ['Remember to use console.log', 'Don\'t forget the semicolon']
                  }
                ]
              }
            },
            {
              id: 'string_concatenation',
              title: 'String Output',
              content: {
                theory: 'JavaScript uses + or template literals (``) for string concatenation',
                examples: [
                  {
                    python: 'name = "Alice"\nprint("Hello " + name)',
                    javascript: 'let name = "Alice";\nconsole.log("Hello " + name);',
                    explanation: 'JavaScript requires let/const for variable declaration'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Complete the JavaScript code:',
                    code: 'let name = "Bob";\nconsole.log(__ + name + __);',
                    solution: 'let name = "Bob";\nconsole.log("Hello " + name + "!");',
                    hints: ['Fill in the string parts']
                  }
                ]
              }
            }
          ]
        },
        {
          id: 'variables',
          title: 'Variables and Data Types',
          description: 'Learn JavaScript variable declarations',
          lessons: [
            {
              id: 'variable_declaration',
              title: 'Declaring Variables',
              content: {
                theory: 'JavaScript requires let, const, or var for variable declaration',
                examples: [
                  {
                    python: 'x = 42',
                    javascript: 'let x = 42;',
                    explanation: 'JavaScript variables must be declared with let/const/var'
                  }
                ],
                exercises: [
                  {
                    type: 'multiple_choice',
                    question: 'Which is the correct way to declare a variable in JavaScript?',
                    options: [
                      'x = 5;',
                      'let x = 5;',
                      'variable x = 5;',
                      'def x = 5;'
                    ],
                    solution: 1,
                    explanation: 'JavaScript requires let for variable declaration'
                  }
                ]
              }
            }
          ]
        }
      ]
    },
    {
      id: 'control_flow',
      title: 'Control Flow',
      description: 'Master JavaScript control structures',
      difficulty: 'beginner',
      units: [
        {
          id: 'conditionals',
          title: 'Conditional Statements',
          description: 'Learn JavaScript if statements and comparisons',
          lessons: [
            {
              id: 'if_statements',
              title: 'If Statements',
              content: {
                theory: 'JavaScript if statements use curly braces {} instead of indentation',
                examples: [
                  {
                    python: 'if x > 0:\n    print("Positive")',
                    javascript: 'if (x > 0) {\n    console.log("Positive");\n}',
                    explanation: 'JavaScript uses curly braces for blocks'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert this Python if statement to JavaScript:',
                    code: 'if age >= 18:\n    print("Adult")',
                    solution: 'if (age >= 18) {\n    console.log("Adult");\n}',
                    hints: ['Use curly braces', 'Add semicolons']
                  }
                ]
              }
            }
          ]
        }
      ]
    },
    {
      id: 'functions',
      title: 'Functions',
      description: 'Learn JavaScript function syntax and usage',
      difficulty: 'intermediate',
      units: [
        {
          id: 'function_basics',
          title: 'Function Basics',
          description: 'Define and call functions in JavaScript',
          lessons: [
            {
              id: 'function_declaration',
              title: 'Declaring Functions',
              content: {
                theory: 'JavaScript functions use the function keyword or arrow syntax',
                examples: [
                  {
                    python: 'def greet(name):\n    return f"Hello {name}"',
                    javascript: 'function greet(name) {\n    return `Hello ${name}`;\n}',
                    explanation: 'JavaScript uses function keyword and template literals'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert this Python function to JavaScript:',
                    code: 'def add(a, b):\n    return a + b',
                    solution: 'function add(a, b) {\n    return a + b;\n}',
                    hints: ['Use function keyword', 'Add curly braces']
                  }
                ]
              }
            }
          ]
        }
      ]
    }
  ]
};

// Add more language transition curricula here
export const javaScriptToPythonCurriculum = {
  // Similar structure but reversed
};

export const pythonToJavaCurriculum = {
  // Similar structure but for Java
};

export const javaToPythonCurriculum = {
  // Similar structure but reversed
};
