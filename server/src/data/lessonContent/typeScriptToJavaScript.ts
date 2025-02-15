import { createLanguagePairCurriculum } from './languagePairFactory';

export const typeScriptToJavaScriptCurriculum = {
  ...createLanguagePairCurriculum('typescript', 'javascript'),
  sections: [
    {
      id: 'section_1_basics',
      title: 'JavaScript Fundamentals',
      description: 'Learn JavaScript basics from a TypeScript perspective',
      units: [
        {
          id: 'unit_1_variables',
          title: 'Variables and Types',
          description: 'Learn JavaScript dynamic typing',
          skillLevel: 'beginner',
          xpToUnlock: 0,
          lessons: [
            {
              id: 'lesson_1_1',
              title: 'Dynamic Typing',
              estimatedTime: 10,
              content: {
                theory: 'Converting TypeScript type annotations to JavaScript',
                difficulty: 'beginner',
                xpPoints: 10,
                examples: [
                  {
                    source: `let name: string = "Alice";
let age: number = 25;
let scores: number[] = [1, 2, 3];
let tuple: [string, number] = ["hello", 42];`,
                    target: `let name = "Alice";
let age = 25;
let scores = [1, 2, 3];
let tuple = ["hello", 42];`,
                    explanation: 'JavaScript uses dynamic typing, no type annotations needed'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Convert TypeScript variables to JavaScript',
                    code: 'let name = ___;\nlet age = ___;\nlet isActive = ___;',
                    solution: 'let name = "Bob";\nlet age = 30;\nlet isActive = true;',
                    hints: ['Remove type annotations', 'Keep the values'],
                    xpReward: 5
                  }
                ]
              }
            },
            {
              id: 'lesson_1_2',
              title: 'Function Parameters',
              estimatedTime: 15,
              content: {
                theory: 'Converting TypeScript function signatures to JavaScript',
                difficulty: 'beginner',
                xpPoints: 15,
                examples: [
                  {
                    source: `function greet(name: string): string {
    return \`Hello, \${name}\`;
}

const add = (a: number, b: number): number => a + b;`,
                    target: `function greet(name) {
    return \`Hello, \${name}\`;
}

const add = (a, b) => a + b;`,
                    explanation: 'JavaScript functions do not need type annotations'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Convert TypeScript function to JavaScript',
                    code: 'function multiply(___) {\n    return a * b;\n}',
                    solution: 'function multiply(a, b) {\n    return a * b;\n}',
                    hints: ['Remove parameter types', 'Remove return type'],
                    xpReward: 8
                  }
                ]
              }
            }
          ]
        },
        {
          id: 'unit_2_interfaces',
          title: 'Objects and Interfaces',
          description: 'Learn JavaScript objects',
          skillLevel: 'beginner',
          xpToUnlock: 50,
          lessons: [
            {
              id: 'lesson_2_1',
              title: 'Object Types',
              estimatedTime: 20,
              content: {
                theory: 'Converting TypeScript interfaces to JavaScript objects',
                difficulty: 'beginner',
                xpPoints: 20,
                examples: [
                  {
                    source: `interface User {
    name: string;
    age: number;
}

const user: User = {
    name: "Alice",
    age: 25
};`,
                    target: `const user = {
    name: "Alice",
    age: 25
};`,
                    explanation: 'JavaScript uses plain objects without interfaces'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Convert TypeScript interface to JavaScript object',
                    code: 'const product = {\n    ___: "Laptop",\n    ___: 999.99\n};',
                    solution: 'const product = {\n    name: "Laptop",\n    price: 999.99\n};',
                    hints: ['Remove interface', 'Keep object properties'],
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
                theory: 'Converting TypeScript classes to JavaScript',
                difficulty: 'intermediate',
                xpPoints: 25,
                examples: [
                  {
                    source: `class Person {
    private name: string;
    private age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    public greet(): string {
        return \`Hello, I'm \${this.name}\`;
    }
}`,
                    target: `class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    greet() {
        return \`Hello, I'm \${this.name}\`;
    }
}`,
                    explanation: 'JavaScript classes do not have access modifiers or type annotations'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Convert TypeScript class to JavaScript',
                    code: 'class Car {\n    ___(model, year) {\n        this.model = model;\n        this.year = year;\n    }\n\n    ___() {\n        return \`\${this.model} (\${this.year})\`;\n    }\n}',
                    solution: 'class Car {\n    constructor(model, year) {\n        this.model = model;\n        this.year = year;\n    }\n\n    toString() {\n        return \`\${this.model} (\${this.year})\`;\n    }\n}',
                    hints: ['Use constructor', 'Remove type annotations', 'Remove access modifiers'],
                    xpReward: 15
                  }
                ],
                practice: {
                  type: 'code_project',
                  instructions: 'Create a Student class with name, grades array, and a method to calculate average',
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
        }
      ]
    }
  ]
};
