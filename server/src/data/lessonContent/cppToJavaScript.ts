import { createLanguagePairCurriculum } from './languagePairFactory';

export const cppToJavaScriptCurriculum = {
  ...createLanguagePairCurriculum('cpp', 'javascript'),
  sections: [
    {
      id: 'section_1_basics',
      title: 'JavaScript Fundamentals',
      description: 'Learn JavaScript basics from a C++ perspective',
      units: [
        {
          id: 'unit_1_types',
          title: 'Variables and Types',
          description: 'Learn JavaScript variables and types',
          skillLevel: 'beginner',
          xpToUnlock: 0,
          lessons: [
            {
              id: 'lesson_1_1',
              title: 'Variable Declaration',
              estimatedTime: 10,
              content: {
                theory: 'Converting C++ variables to JavaScript',
                difficulty: 'beginner',
                xpPoints: 10,
                examples: [
                  {
                    source: `int age = 25;
double height = 1.75;
string name = "Alice";
bool active = true;`,
                    target: `let age = 25;
let height = 1.75;
let name = "Alice";
let active = true;`,
                    explanation: 'JavaScript uses let/const and dynamic typing'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Convert C++ variables to JavaScript',
                    code: '___ score = 95;\n___ message = "Hello";\n___ isValid = true;',
                    solution: 'let score = 95;\nlet message = "Hello";\nlet isValid = true;',
                    hints: ['Use let keyword', 'Add semicolons'],
                    xpReward: 5
                  }
                ]
              }
            },
            {
              id: 'lesson_1_2',
              title: 'Collections',
              estimatedTime: 15,
              content: {
                theory: 'Converting C++ arrays and vectors to JavaScript',
                difficulty: 'beginner',
                xpPoints: 15,
                examples: [
                  {
                    source: `int numbers[] = {1, 2, 3};
vector<int> scores;
scores.push_back(85);
map<string, int> grades;
grades["Alice"] = 95;`,
                    target: `let numbers = [1, 2, 3];
let scores = [];
scores.push(85);
let grades = {};
grades["Alice"] = 95;`,
                    explanation: 'JavaScript uses arrays and objects'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Convert C++ collections to JavaScript',
                    code: 'let numbers = [___];\nlet user = {\n  ___: "Alice",\n  ___: 25\n};',
                    solution: 'let numbers = [1, 2, 3, 4, 5];\nlet user = {\n  name: "Alice",\n  age: 25\n};',
                    hints: ['Use array literals', 'Use object property syntax'],
                    xpReward: 8
                  }
                ]
              }
            }
          ]
        },
        {
          id: 'unit_2_functions',
          title: 'Functions',
          description: 'Learn JavaScript functions',
          skillLevel: 'beginner',
          xpToUnlock: 50,
          lessons: [
            {
              id: 'lesson_2_1',
              title: 'Function Definition',
              estimatedTime: 20,
              content: {
                theory: 'Converting C++ functions to JavaScript',
                difficulty: 'beginner',
                xpPoints: 20,
                examples: [
                  {
                    source: `string greet(string name) {
    return "Hello, " + name;
}

int add(int a, int b) {
    return a + b;
}`,
                    target: `function greet(name) {
  return \`Hello, \${name}\`;
}

const add = (a, b) => a + b;`,
                    explanation: 'JavaScript has function declarations and arrow functions'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Convert C++ function to JavaScript',
                    code: '___ multiply(a, b) {\n  ___ a * b;\n}',
                    solution: 'function multiply(a, b) {\n  return a * b;\n}',
                    hints: ['Use function keyword', 'Add return statement'],
                    xpReward: 10
                  }
                ]
              }
            }
          ]
        },
        {
          id: 'unit_3_classes',
          title: 'Classes',
          description: 'Learn JavaScript classes',
          skillLevel: 'intermediate',
          xpToUnlock: 100,
          lessons: [
            {
              id: 'lesson_3_1',
              title: 'Class Definition',
              estimatedTime: 25,
              content: {
                theory: 'Converting C++ classes to JavaScript',
                difficulty: 'intermediate',
                xpPoints: 25,
                examples: [
                  {
                    source: `class Person {
private:
    string name;
    int age;
public:
    Person(string n, int a) : name(n), age(a) {}
    string getName() { return name; }
    void setName(string n) { name = n; }
};`,
                    target: `class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  getName() {
    return this.name;
  }

  setName(name) {
    this.name = name;
  }
}`,
                    explanation: 'JavaScript uses constructor and this'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Convert C++ class to JavaScript',
                    code: 'class Rectangle {\n  ___(width, height) {\n    this.___ = width;\n    this.___ = height;\n  }\n\n  getArea() {\n    return this.width * this.height;\n  }\n}',
                    solution: 'class Rectangle {\n  constructor(width, height) {\n    this.width = width;\n    this.height = height;\n  }\n\n  getArea() {\n    return this.width * this.height;\n  }\n}',
                    hints: ['Use constructor', 'Use this.property'],
                    xpReward: 15
                  }
                ],
                practice: {
                  type: 'code_project',
                  instructions: 'Create a Student class with name, grades array, and average method',
                  testCases: [
                    {
                      input: 'new Student("Alice", [85, 90, 95])',
                      expectedOutput: '90',
                      code: `class Student {
  constructor(name, grades) {
    this.name = name;
    this.grades = grades;
  }

  getAverage() {
    return this.grades.reduce((sum, grade) => sum + grade, 0) / this.grades.length;
  }
}`
                    }
                  ],
                  xpReward: 25
                }
              }
            }
          ]
        },
        {
          id: 'unit_4_error_handling',
          title: 'Error Handling',
          description: 'Learn JavaScript error handling',
          skillLevel: 'advanced',
          xpToUnlock: 150,
          lessons: [
            {
              id: 'lesson_4_1',
              title: 'Try-Catch',
              estimatedTime: 30,
              content: {
                theory: 'Converting C++ try-catch to JavaScript',
                difficulty: 'advanced',
                xpPoints: 30,
                examples: [
                  {
                    source: `try {
    int result = divide(10, 0);
} catch (const std::exception& e) {
    std::cerr << "Error: " << e.what() << std::endl;
}`,
                    target: `try {
  const result = divide(10, 0);
} catch (error) {
  console.error("Error:", error.message);
}`,
                    explanation: 'JavaScript uses try-catch with Error objects'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Convert C++ error handling to JavaScript',
                    code: '___ {\n  const value = parseInt("abc");\n} ___ (error) {\n  console.error(\`Invalid conversion: \${___}\`);\n}',
                    solution: 'try {\n  const value = parseInt("abc");\n} catch (error) {\n  console.error(\`Invalid conversion: \${error.message}\`);\n}',
                    hints: ['Use try and catch', 'Use error.message'],
                    xpReward: 20
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
