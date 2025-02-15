import { Section, SECTION_TEMPLATES } from './lessonStructure';

export const javaScriptToPythonCurriculum = {
  sections: [
    {
      ...SECTION_TEMPLATES.BASICS,
      units: [
        {
          id: 'unit_hello_world',
          title: 'Hello World',
          description: 'Learn to write your first Python program',
          lessons: [
            {
              id: 'lesson_print',
              title: 'Print Statements',
              description: 'Learn how console.log() translates to print()',
              exercises: [
                {
                  id: 'ex_print_1',
                  type: 'matchCode',
                  prompt: 'Match the JavaScript code with its Python equivalent',
                  timeLimit: 30,
                  difficulty: 'beginner',
                  sourceCode: 'console.log("Hello, World!");',
                  options: [
                    'print("Hello, World!")',
                    'printf("Hello, World!")',
                    'echo("Hello, World!")',
                    'System.out.println("Hello, World!")'
                  ],
                  correctAnswer: 'print("Hello, World!")',
                  hints: ['In Python, we use print() instead of console.log()'],
                  explanation: 'JavaScript uses console.log() for printing to the console, while Python uses the simpler print() function.',
                  xpReward: 10
                },
                {
                  id: 'ex_print_2',
                  type: 'codeComplete',
                  prompt: 'Complete the Python code to print "Hello!" (use the Python equivalent of console.log)',
                  timeLimit: 30,
                  difficulty: 'beginner',
                  sourceCode: '___("Hello!")',
                  correctAnswer: 'print',
                  hints: ['Think about what replaces console.log in Python'],
                  explanation: 'The print() function in Python is used for output, just like console.log() in JavaScript.',
                  xpReward: 10
                },
                {
                  id: 'ex_print_3',
                  type: 'codeWrite',
                  prompt: 'Convert this JavaScript code to Python:\nconsole.log("First line");\nconsole.log("Second line");',
                  timeLimit: 60,
                  difficulty: 'beginner',
                  correctAnswer: [
                    'print("First line")',
                    'print("Second line")'
                  ],
                  hints: [
                    'Each console.log becomes print',
                    'Python doesn\'t use semicolons'
                  ],
                  explanation: 'In Python, we don\'t need semicolons at the end of lines, and we use print() instead of console.log().',
                  xpReward: 15
                }
              ],
              practiceExercises: [
                {
                  id: 'ex_print_practice_1',
                  type: 'bugFix',
                  prompt: 'Fix the Python code to match the JavaScript output:\n// JavaScript:\nconsole.log("Hello");\nconsole.log("World");\n\n# Python (broken):\nprint("Hello")\nprint World',
                  timeLimit: 45,
                  difficulty: 'beginner',
                  correctAnswer: [
                    'print("Hello")',
                    'print("World")'
                  ],
                  hints: [
                    'Check the string quotes',
                    'Both print statements should follow the same format'
                  ],
                  explanation: 'String literals in Python need to be enclosed in quotes, just like in JavaScript.',
                  xpReward: 12
                }
              ],
              requiredXp: 0
            },
            {
              id: 'lesson_string_concat',
              title: 'String Concatenation',
              description: 'Learn how to join strings in Python vs JavaScript',
              exercises: [
                {
                  id: 'ex_concat_1',
                  type: 'multipleChoice',
                  prompt: 'In JavaScript we write: console.log("Hello " + name);\nWhat\'s the Python equivalent?',
                  timeLimit: 30,
                  difficulty: 'beginner',
                  options: [
                    'print("Hello " + name)',
                    'print("Hello", name)',
                    'print("Hello".concat(name))',
                    'print(f"Hello {name}")'
                  ],
                  correctAnswer: 'print(f"Hello {name}")',
                  hints: ['Python has a special way to format strings using f-strings'],
                  explanation: 'While JavaScript uses + for concatenation, Python\'s f-strings provide a more readable way to include variables in strings.',
                  xpReward: 10
                }
              ],
              practiceExercises: [],
              requiredXp: 20
            }
          ],
          quiz: [
            {
              id: 'quiz_hello_world_1',
              type: 'codeWrite',
              prompt: 'Convert this JavaScript code to Python:\nconsole.log("Hello " + firstName + " " + lastName);',
              timeLimit: 60,
              difficulty: 'beginner',
              correctAnswer: [
                'print(f"Hello {firstName} {lastName}")'
              ],
              hints: [
                'Use an f-string',
                'Variables go inside curly braces'
              ],
              explanation: 'Python\'s f-strings (formatted string literals) provide a cleaner way to include variables in strings compared to JavaScript\'s + concatenation.',
              xpReward: 20
            }
          ],
          requiredXp: 0
        }
      ]
    },
    {
      ...SECTION_TEMPLATES.CONTROL_FLOW,
      units: [
        {
          id: 'unit_if_statements',
          title: 'If Statements',
          description: 'Learn how Python handles conditional logic',
          lessons: [
            {
              id: 'lesson_if_basic',
              title: 'Basic If Statements',
              description: 'Convert JavaScript if statements to Python',
              exercises: [
                {
                  id: 'ex_if_1',
                  type: 'matchCode',
                  prompt: 'Match the JavaScript if statement with its Python equivalent',
                  timeLimit: 45,
                  difficulty: 'beginner',
                  sourceCode: 'if (x > 0) {\n    console.log("Positive");\n}',
                  options: [
                    'if x > 0:\n    print("Positive")',
                    'if (x > 0):\n    print("Positive")',
                    'if x > 0 then\n    print("Positive")',
                    'if x > 0 {\n    print("Positive")\n}'
                  ],
                  correctAnswer: 'if x > 0:\n    print("Positive")',
                  hints: [
                    'Python uses : instead of {}',
                    'Python uses indentation for blocks',
                    'Parentheses are optional in Python if statements'
                  ],
                  explanation: 'Python if statements use a colon and indentation instead of curly braces, and parentheses are optional.',
                  xpReward: 15
                }
              ],
              practiceExercises: [],
              requiredXp: 30
            }
          ],
          quiz: [],
          requiredXp: 50
        }
      ]
    }
    // Additional sections following SECTION_TEMPLATES...
  ]
} as const;

// Helper function to get lesson by ID
export function getLesson(lessonId: string) {
  for (const section of javaScriptToPythonCurriculum.sections) {
    for (const unit of section.units) {
      const lesson = unit.lessons.find(l => l.id === lessonId);
      if (lesson) return lesson;
    }
  }
  return null;
}

// Helper function to get next lesson
export function getNextLesson(currentLessonId: string) {
  let foundCurrent = false;
  for (const section of javaScriptToPythonCurriculum.sections) {
    for (const unit of section.units) {
      for (const lesson of unit.lessons) {
        if (foundCurrent) return lesson;
        if (lesson.id === currentLessonId) foundCurrent = true;
      }
    }
  }
  return null;
}
