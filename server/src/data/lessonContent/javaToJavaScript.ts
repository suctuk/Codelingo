import { createLanguagePairCurriculum } from './languagePairFactory';

export const javaToJavaScriptCurriculum = {
  ...createLanguagePairCurriculum('java', 'javascript'),
  sections: [
    {
      id: 'section_1_basics',
      title: 'JavaScript Fundamentals',
      description: 'Learn JavaScript basics from a Java perspective',
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
                theory: 'Converting Java static types to JavaScript',
                difficulty: 'beginner',
                xpPoints: 10,
                examples: [
                  {
                    source: `String name = "Alice";
int age = 25;
double height = 1.75;
boolean active = true;`,
                    target: `let name = "Alice";
let age = 25;
let height = 1.75;
let active = true;`,
                    explanation: 'JavaScript uses let/const and dynamic typing'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Convert Java variables to JavaScript',
                    code: '___ name = "Bob";\n___ age = 30;\n___ score = 95.5;',
                    solution: 'let name = "Bob";\nlet age = 30;\nlet score = 95.5;',
                    hints: ['Use let keyword', 'Remove type declarations'],
                    xpReward: 5
                  }
                ]
              }
            },
            {
              id: 'lesson_1_2',
              title: 'Arrays and Objects',
              estimatedTime: 15,
              content: {
                theory: 'Converting Java arrays and objects to JavaScript',
                difficulty: 'beginner',
                xpPoints: 15,
                examples: [
                  {
                    source: `int[] numbers = {1, 2, 3};
String[] names = new String[]{"Alice", "Bob"};

class Point {
    int x;
    int y;
}
Point point = new Point();
point.x = 10;
point.y = 20;`,
                    target: `let numbers = [1, 2, 3];
let names = ["Alice", "Bob"];

let point = {
    x: 10,
    y: 20
};`,
                    explanation: 'JavaScript has simpler array and object literals'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Convert Java array and object to JavaScript',
                    code: 'let scores = [___];\nlet user = {\n    ___: "Alice",\n    ___: 25\n};',
                    solution: 'let scores = [85, 90, 95];\nlet user = {\n    name: "Alice",\n    age: 25\n};',
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
                theory: 'Converting Java methods to JavaScript functions',
                difficulty: 'beginner',
                xpPoints: 20,
                examples: [
                  {
                    source: `public static String greet(String name) {
    return "Hello, " + name;
}

public static int add(int a, int b) {
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
                    question: 'Convert Java method to JavaScript function',
                    code: '___ multiply(a, b) {\n    return a * b;\n}\n\nconst square = ___ => ___;',
                    solution: 'function multiply(a, b) {\n    return a * b;\n}\n\nconst square = x => x * x;',
                    hints: ['Use function keyword', 'Use arrow function syntax'],
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
                theory: 'Converting Java classes to JavaScript',
                difficulty: 'intermediate',
                xpPoints: 25,
                examples: [
                  {
                    source: `public class Person {
    private String name;
    private int age;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public String greet() {
        return "Hello, I'm " + this.name;
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
                    explanation: 'JavaScript classes are simpler with no access modifiers'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Convert Java class to JavaScript',
                    code: 'class Car {\n    ___(model, year) {\n        this.model = model;\n        this.year = year;\n    }\n\n    getInfo() {\n        return ___\`\${this.model} (\${this.year})\`___;\n    }\n}',
                    solution: 'class Car {\n    constructor(model, year) {\n        this.model = model;\n        this.year = year;\n    }\n\n    getInfo() {\n        return \`\${this.model} (\${this.year})\`;\n    }\n}',
                    hints: ['Use constructor', 'Use template literals'],
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
