import { createLanguagePairCurriculum } from './languagePairFactory';

export const javaScriptToTypeScriptCurriculum = {
  ...createLanguagePairCurriculum('javascript', 'typescript'),
  sections: [
    {
      id: 'section_1_basics',
      title: 'TypeScript Fundamentals',
      description: 'Learn TypeScript basics from a JavaScript perspective',
      units: [
        {
          id: 'unit_1_types',
          title: 'Type Annotations',
          description: 'Learn TypeScript type system',
          skillLevel: 'beginner',
          xpToUnlock: 0,
          lessons: [
            {
              id: 'lesson_1_1',
              title: 'Basic Types',
              estimatedTime: 10,
              content: {
                theory: 'Adding TypeScript type annotations to JavaScript variables',
                difficulty: 'beginner',
                xpPoints: 10,
                examples: [
                  {
                    source: `let name = "Alice";
let age = 25;
let scores = [1, 2, 3];
let tuple = ["hello", 42];`,
                    target: `let name: string = "Alice";
let age: number = 25;
let scores: number[] = [1, 2, 3];
let tuple: [string, number] = ["hello", 42];`,
                    explanation: 'TypeScript adds type annotations after variable names'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Add TypeScript type annotations',
                    code: 'let name: ___ = "Bob";\nlet age: ___ = 30;\nlet scores: ___[] = [85, 90, 95];',
                    solution: 'let name: string = "Bob";\nlet age: number = 30;\nlet scores: number[] = [85, 90, 95];',
                    hints: ['Use string for text', 'Use number for numbers', 'Use array type syntax'],
                    xpReward: 5
                  }
                ]
              }
            },
            {
              id: 'lesson_1_2',
              title: 'Function Types',
              estimatedTime: 15,
              content: {
                theory: 'Adding TypeScript types to JavaScript functions',
                difficulty: 'beginner',
                xpPoints: 15,
                examples: [
                  {
                    source: `function greet(name) {
    return \`Hello, \${name}\`;
}

const add = (a, b) => a + b;`,
                    target: `function greet(name: string): string {
    return \`Hello, \${name}\`;
}

const add = (a: number, b: number): number => a + b;`,
                    explanation: 'TypeScript adds parameter types and return types'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Add function type annotations',
                    code: 'function multiply(a: ___, b: ___): ___ {\n    return a * b;\n}',
                    solution: 'function multiply(a: number, b: number): number {\n    return a * b;\n}',
                    hints: ['Use number type for parameters', 'Use number for return type'],
                    xpReward: 8
                  }
                ]
              }
            }
          ]
        },
        {
          id: 'unit_2_interfaces',
          title: 'Interfaces',
          description: 'Learn TypeScript interfaces',
          skillLevel: 'beginner',
          xpToUnlock: 50,
          lessons: [
            {
              id: 'lesson_2_1',
              title: 'Interface Definition',
              estimatedTime: 20,
              content: {
                theory: 'Converting JavaScript objects to TypeScript interfaces',
                difficulty: 'beginner',
                xpPoints: 20,
                examples: [
                  {
                    source: `const user = {
    name: "Alice",
    age: 25
};

function greetUser(user) {
    console.log(\`Hello, \${user.name}\`);
}`,
                    target: `interface User {
    name: string;
    age: number;
}

const user: User = {
    name: "Alice",
    age: 25
};

function greetUser(user: User): void {
    console.log(\`Hello, \${user.name}\`);
}`,
                    explanation: 'TypeScript interfaces define object shapes'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Create TypeScript interface',
                    code: '___ Product {\n    name: ___;\n    price: ___;\n    inStock: ___;\n}',
                    solution: 'interface Product {\n    name: string;\n    price: number;\n    inStock: boolean;\n}',
                    hints: ['Use interface keyword', 'Add appropriate types'],
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
          description: 'Learn TypeScript classes',
          skillLevel: 'intermediate',
          xpToUnlock: 100,
          lessons: [
            {
              id: 'lesson_3_1',
              title: 'Class Definition',
              estimatedTime: 25,
              content: {
                theory: 'Converting JavaScript classes to TypeScript',
                difficulty: 'intermediate',
                xpPoints: 25,
                examples: [
                  {
                    source: `class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    greet() {
        return \`Hello, I'm \${this.name}\`;
    }
}`,
                    target: `class Person {
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
                    explanation: 'TypeScript adds access modifiers and type annotations to classes'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Convert JavaScript class to TypeScript',
                    code: 'class Car {\n    ___ model: string;\n    ___ year: number;\n\n    constructor(___ model: string, ___ year: number) {\n        this.model = model;\n        this.year = year;\n    }\n}',
                    solution: 'class Car {\n    private model: string;\n    private year: number;\n\n    public constructor(model: string, year: number) {\n        this.model = model;\n        this.year = year;\n    }\n}',
                    hints: ['Add access modifiers', 'Add parameter types'],
                    xpReward: 15
                  }
                ],
                practice: {
                  type: 'code_project',
                  instructions: 'Create a Student class with typed properties and methods',
                  testCases: [
                    {
                      input: 'new Student("Alice", [85, 90, 95])',
                      expectedOutput: '90',
                      code: `class Student {
    private name: string;
    private grades: number[];

    constructor(name: string, grades: number[]) {
        this.name = name;
        this.grades = grades;
    }

    public getAverage(): number {
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
