export const englishToTypeScriptCurriculum = {
  sections: [
    {
      id: 'basics',
      title: 'From English to TypeScript: Getting Started',
      description: 'Learn how to translate everyday concepts into TypeScript code',
      units: [
        {
          id: 'unit_1',
          title: 'Basic Concepts with Types',
          lessons: [
            {
              id: 'lesson_1_1',
              title: 'Variables and Types',
              content: {
                theory: 'TypeScript adds type information to variables',
                examples: [
                  {
                    source: `Store the number 42 in a box labeled "age" that only accepts numbers
Store the text "Alice" in a box labeled "name" that only accepts text
Store yes/no in a box labeled "isActive" that only accepts true/false`,
                    target: `let age: number = 42;
let name: string = "Alice";
let isActive: boolean = true;`,
                    explanation: 'TypeScript variables have explicit types that prevent wrong data types'
                  }
                ],
                exercises: [
                  {
                    type: 'english_to_code',
                    question: 'Convert these English statements to TypeScript with types:',
                    statements: [
                      'Create a price box that only accepts numbers, store 9.99',
                      'Create a message box that only accepts text, store "Hello"',
                      'Create an isOpen box that only accepts yes/no, store no',
                      'Create a count box that only accepts whole numbers, store 100'
                    ],
                    solution: `let price: number = 9.99;
let message: string = "Hello";
let isOpen: boolean = false;
let count: number = 100;`,
                    hints: [
                      'Use : to specify types',
                      'number for any numbers',
                      'string for text',
                      'boolean for true/false'
                    ]
                  }
                ]
              }
            },
            {
              id: 'lesson_1_2',
              title: 'Object Types',
              content: {
                theory: 'Define the shape of objects using interfaces',
                examples: [
                  {
                    source: `Create a blueprint for a Person that must have:
- a name (text)
- an age (number)
- whether they are a student (yes/no)`,
                    target: `interface Person {
    name: string;
    age: number;
    isStudent: boolean;
}

let person: Person = {
    name: "Alice",
    age: 25,
    isStudent: true
};`,
                    explanation: 'Interfaces define what properties an object must have'
                  }
                ],
                exercises: [
                  {
                    type: 'english_to_code',
                    question: 'Create TypeScript interfaces for these descriptions:',
                    statements: [
                      'Create a blueprint for a Product with:',
                      '- an id (number)',
                      '- a name (text)',
                      '- a price (number)',
                      '- whether it\'s in stock (yes/no)',
                      'Then create a product using this blueprint'
                    ],
                    solution: `interface Product {
    id: number;
    name: string;
    price: number;
    inStock: boolean;
}

let product: Product = {
    id: 1,
    name: "Phone",
    price: 599.99,
    inStock: true
};`,
                    hints: [
                      'Define interface first',
                      'List all properties',
                      'Specify types for each',
                      'Create object matching interface'
                    ]
                  }
                ]
              }
            }
          ]
        },
        {
          id: 'unit_2',
          title: 'Functions with Types',
          lessons: [
            {
              id: 'lesson_2_1',
              title: 'Typed Functions',
              content: {
                theory: 'Functions in TypeScript specify input and output types',
                examples: [
                  {
                    source: `Create a function called "add" that:
- takes two numbers as input
- returns their sum as a number`,
                    target: `function add(a: number, b: number): number {
    return a + b;
}

// Or arrow function
const add = (a: number, b: number): number => a + b;`,
                    explanation: 'TypeScript functions specify types for parameters and return value'
                  }
                ],
                exercises: [
                  {
                    type: 'english_to_code',
                    question: 'Create these TypeScript functions with types:',
                    statements: [
                      'Create a function called "greet" that:',
                      '- takes a name (text) as input',
                      '- returns a greeting (text)',
                      '',
                      'Create a function called "isAdult" that:',
                      '- takes an age (number)',
                      '- returns yes/no'
                    ],
                    solution: `function greet(name: string): string {
    return \`Hello, \${name}!\`;
}

function isAdult(age: number): boolean {
    return age >= 18;
}`,
                    hints: [
                      'Specify parameter types',
                      'Add return type after ()',
                      'Use string for text',
                      'Use boolean for yes/no'
                    ]
                  }
                ]
              }
            }
          ]
        }
      ]
    },
    {
      id: 'advanced',
      title: 'Advanced TypeScript Features',
      description: 'Learn TypeScript-specific concepts',
      units: [
        {
          id: 'unit_1',
          title: 'Generic Types',
          lessons: [
            {
              id: 'lesson_1_1',
              title: 'Creating Flexible Types',
              content: {
                theory: 'Make types that work with different data types',
                examples: [
                  {
                    source: `Create a Box that can hold any type of item
Create a List that can hold any type of items`,
                    target: `interface Box<T> {
    content: T;
}

let numberBox: Box<number> = { content: 42 };
let stringBox: Box<string> = { content: "Hello" };

interface List<T> {
    items: T[];
}

let numberList: List<number> = { items: [1, 2, 3] };`,
                    explanation: 'Generic types use <T> to work with any data type'
                  }
                ],
                exercises: [
                  {
                    type: 'english_to_code',
                    question: 'Create these generic TypeScript types:',
                    statements: [
                      'Create a Pair that holds two items of any types',
                      'Create a Result that can be either:',
                      '- Success with data of any type',
                      '- Error with an error message'
                    ],
                    solution: `interface Pair<T, U> {
    first: T;
    second: U;
}

type Result<T> = {
    success: true;
    data: T;
} | {
    success: false;
    error: string;
};

// Example usage:
let pair: Pair<string, number> = {
    first: "Age",
    second: 25
};

let result: Result<number> = {
    success: true,
    data: 42
};`,
                    hints: [
                      'Use multiple type parameters',
                      'Use union types with |',
                      'Make success/error distinct',
                      'Show example usage'
                    ]
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
