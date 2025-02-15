export const pythonToJavaScriptCurriculum = {
  sections: [
    {
      id: 'section_1_basics',
      title: 'JavaScript Fundamentals',
      description: 'Learn the basic concepts of JavaScript coming from Python',
      units: [
        {
          id: 'unit_1_output',
          title: 'Console Output',
          lessons: [
            {
              id: 'lesson_1_1',
              title: 'Basic Output',
              content: {
                theory: 'Convert Python print to JavaScript console.log',
                examples: [
                  {
                    source: `# Python
print("Hello World")
print("Value:", 42)`,
                    target: `// JavaScript
console.log("Hello World");
console.log("Value:", 42);`,
                    explanation: 'JavaScript uses console.log() instead of print()'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Print "Hello JavaScript"',
                    code: '___.___(___);',
                    solution: 'console.log("Hello JavaScript");',
                    hints: ['Use console object', 'Use log method']
                  }
                ],
                quiz: [
                  {
                    question: 'What method is used for output in JavaScript?',
                    options: ['print()', 'console.log()', 'System.out.println()', 'echo'],
                    answer: 1
                  }
                ]
              }
            },
            {
              id: 'lesson_1_2',
              title: 'Multiple Values',
              content: {
                theory: 'Print multiple values in JavaScript',
                examples: [
                  {
                    source: `# Python
name = "Alice"
age = 25
print(name, "is", age, "years old")  # Using comma
print(f"{name} is {age} years old")  # Using f-string`,
                    target: `// JavaScript
const name = "Alice";
const age = 25;
console.log(name, "is", age, "years old");  // Using comma
console.log(\`\${name} is \${age} years old\`);  // Using template literal`,
                    explanation: 'JavaScript offers multiple ways to combine values in console.log'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Print name and age using template literal',
                    code: 'const name = "Bob";\nconst age = 30;\nconsole.log(___\`${___} is ${___} years old\`___);',
                    solution: 'const name = "Bob";\nconst age = 30;\nconsole.log(`${name} is ${age} years old`);',
                    hints: ['Use backticks', 'Use ${} for variables']
                  }
                ]
              }
            },
            {
              id: 'lesson_1_3',
              title: 'Formatted Strings',
              content: {
                theory: 'Convert Python format strings to JavaScript template literals',
                examples: [
                  {
                    source: `# Python
print(f"{3.14159:.2f}")
print(f"{year}-{month:02d}-{day:02d}")`,
                    target: `// JavaScript
console.log(3.14159.toFixed(2));
console.log(\`\${year}-\${month.toString().padStart(2, '0')}-\${day.toString().padStart(2, '0')}\`);`,
                    explanation: 'JavaScript uses different methods for formatting'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Format a decimal number',
                    code: 'const price = 42.9876;\nconsole.log(price.___(___))',
                    solution: 'const price = 42.9876;\nconsole.log(price.toFixed(2))',
                    hints: ['Use toFixed()', 'Specify decimal places']
                  }
                ]
              }
            },
            {
              id: 'lesson_1_4',
              title: 'String Methods',
              content: {
                theory: 'Convert Python string operations to JavaScript string methods',
                examples: [
                  {
                    source: `# Python
text = "Hello"
print(len(text))
print(text[0:2])`,
                    target: `// JavaScript
const text = "Hello";
console.log(text.length);
console.log(text.substring(0, 2));`,
                    explanation: 'JavaScript uses different string methods'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Get string length and slice',
                    code: 'const text = "JavaScript";\nconsole.log(text.___);\nconsole.log(text.___(0, 3));',
                    solution: 'const text = "JavaScript";\nconsole.log(text.length);\nconsole.log(text.substring(0, 3));',
                    hints: ['Use length property', 'Use substring()']
                  }
                ]
              }
            },
            {
              id: 'lesson_1_5',
              title: 'Error Output',
              content: {
                theory: 'Convert Python error output to JavaScript',
                examples: [
                  {
                    source: `# Python
import sys
print("Error occurred", file=sys.stderr)`,
                    target: `// JavaScript
console.error("Error occurred");
// or for warnings
console.warn("Warning message");`,
                    explanation: 'JavaScript console has specific error methods'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Print error message',
                    code: 'const message = "Invalid input";\nconsole.___(message);',
                    solution: 'const message = "Invalid input";\nconsole.error(message);',
                    hints: ['Use error method']
                  }
                ]
              }
            },
            {
              id: 'lesson_1_6',
              title: 'String Formatting',
              content: {
                theory: 'Advanced string formatting in JavaScript',
                examples: [
                  {
                    source: `# Python
name = "Alice"
score = 95
print(f"{name} scored {score} points")
print("{} scored {} points".format(name, score))`,
                    target: `// JavaScript
const name = "Alice";
const score = 95;
console.log(\`\${name} scored \${score} points\`);  // Template literal
console.log("%s scored %d points", name, score);  // printf-style`,
                    explanation: 'JavaScript offers multiple formatting methods'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Format using different methods',
                    code: 'const name = "Bob";\nconst score = 85;\nconsole.log(___\`${___} scored ${___} points\`);  // Template literal\nconsole.log("%s: %d", ___, ___);  // printf-style',
                    solution: 'const name = "Bob";\nconst score = 85;\nconsole.log(`${name} scored ${score} points`);  // Template literal\nconsole.log("%s: %d", name, score);  // printf-style',
                    hints: ['Use backticks', 'Use ${variables}', 'Add arguments']
                  }
                ]
              }
            },
            {
              id: 'lesson_1_7',
              title: 'Console Methods',
              content: {
                theory: 'JavaScript console object methods',
                examples: [
                  {
                    source: `# Python
print("Debug info")
print("Error:", error)
print("Warning:", warning)`,
                    target: `// JavaScript
console.debug("Debug info");
console.error("Error:", error);
console.warn("Warning:", warning);
console.info("Info message");
console.table([obj1, obj2]);  // Table format`,
                    explanation: 'JavaScript console has many specialized methods'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Use console methods',
                    code: 'console.___(["debug info"]);  // Debug\nconsole.___(["user data"]);  // Table format\nconsole.___("Processing...");  // Info',
                    solution: 'console.debug(["debug info"]);  // Debug\nconsole.table(["user data"]);  // Table format\nconsole.info("Processing...");  // Info',
                    hints: ['Use debug()', 'Use table()', 'Use info()']
                  }
                ]
              }
            },
            {
              id: 'lesson_1_8',
              title: 'Debug Output',
              content: {
                theory: 'Debugging output in JavaScript',
                examples: [
                  {
                    source: `# Python
import logging
logging.debug("Debug: %s", x)
# or
import pdb; pdb.set_trace()`,
                    target: `// JavaScript
console.debug("Debug:", x);
// or
debugger;  // Browser debugging
console.trace();  // Stack trace`,
                    explanation: 'JavaScript has built-in debugging tools'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Add debug output',
                    code: 'const value = 42;\nconsole.___(___);  // Debug output\n___;  // Debugger statement',
                    solution: 'const value = 42;\nconsole.debug(value);  // Debug output\ndebugger;  // Debugger statement',
                    hints: ['Use debug()', 'Add value', 'Add debugger']
                  }
                ]
              }
            },
            {
              id: 'lesson_1_9',
              title: 'Pretty Printing',
              content: {
                theory: 'Convert Python pretty printing to JavaScript',
                examples: [
                  {
                    source: `# Python
from pprint import pprint
data = {"a": 1, "b": 2}
pprint(data)`,
                    target: `// JavaScript
const data = {a: 1, b: 2};
console.log(JSON.stringify(data, null, 2));  // Pretty print
console.table(data);  // Table format`,
                    explanation: 'JavaScript has multiple ways to format output'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Pretty print object',
                    code: 'const data = {name: "Alice", scores: [95, 87, 92]};\nconsole.log(JSON.___(data, ___, ___));\nconsole.___(data);',
                    solution: 'const data = {name: "Alice", scores: [95, 87, 92]};\nconsole.log(JSON.stringify(data, null, 2));\nconsole.table(data);',
                    hints: ['Use stringify()', 'Add null', 'Add indent', 'Use table']
                  }
                ]
              }
            },
            {
              id: 'lesson_1_10',
              title: 'Output Review',
              content: {
                theory: 'Review all output methods',
                examples: [
                  {
                    source: `# Python
print("Normal output")
print("Error:", file=sys.stderr)
print(f"Formatted: {3.14:.2f}")`,
                    target: `// JavaScript
console.log("Normal output");
console.error("Error");
console.log(\`Formatted: \${3.14.toFixed(2)}\`);`,
                    explanation: 'JavaScript provides various console methods'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Use different output methods',
                    code: '// Normal output\nconsole.___("Hello");\n\n// Error output\nconsole.___("Error");\n\n// Formatted output\nconst x = 3.14159;\nconsole.log(___\`\${x.toFixed(2)}\`);',
                    solution: '// Normal output\nconsole.log("Hello");\n\n// Error output\nconsole.error("Error");\n\n// Formatted output\nconst x = 3.14159;\nconsole.log(`${x.toFixed(2)}`);',
                    hints: ['Use log()', 'Use error()', 'Use template literal']
                  }
                ],
                quiz: [
                  {
                    question: 'Which is NOT a valid console method in JavaScript?',
                    options: ['console.log()', 'console.error()', 'console.print()', 'console.warn()'],
                    answer: 2
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
