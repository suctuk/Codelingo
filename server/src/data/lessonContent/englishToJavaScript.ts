export const englishToJavaScriptCurriculum = {
  sections: [
    {
      id: 'basics',
      title: 'From English to JavaScript: Getting Started',
      description: 'Learn how to translate everyday concepts into JavaScript code',
      units: [
        {
          id: 'unit_1',
          title: 'Basic Concepts',
          lessons: [
            {
              id: 'lesson_1_1',
              title: 'Variables and Values',
              content: {
                theory: 'Store information using JavaScript variables',
                examples: [
                  {
                    source: `Create a box called "age" and store 25 in it
Create a box called "name" and store "Bob" in it
Create a box called "isStudent" and store yes in it`,
                    target: `let age = 25;
let name = "Bob";
let isStudent = true;`,
                    explanation: 'JavaScript uses let to create variables, and different types of values'
                  }
                ],
                exercises: [
                  {
                    type: 'english_to_code',
                    question: 'Convert these English statements to JavaScript:',
                    statements: [
                      'Create a box called "price" and store 19.99 in it',
                      'Create a permanent box called "TAX_RATE" and store 0.2 in it',
                      'Create a box called "isOpen" and store no in it'
                    ],
                    solution: `let price = 19.99;
const TAX_RATE = 0.2;
let isOpen = false;`,
                    hints: [
                      'Use let for changeable values',
                      'Use const for permanent values',
                      'Use true/false for yes/no',
                      'Add semicolons at the end'
                    ]
                  }
                ]
              }
            },
            {
              id: 'lesson_1_2',
              title: 'Basic Operations',
              content: {
                theory: 'Perform calculations and text operations in JavaScript',
                examples: [
                  {
                    source: `Calculate 10 plus 5
Join the text "Hello" with someone's name
Check if age is greater than 18`,
                    target: `let sum = 10 + 5;
let greeting = "Hello " + name;  // or \`Hello \${name}\`
let isAdult = age > 18;`,
                    explanation: 'JavaScript can perform math, join text, and make comparisons'
                  }
                ],
                exercises: [
                  {
                    type: 'english_to_code',
                    question: 'Convert these English operations to JavaScript:',
                    statements: [
                      'Calculate the total by adding price and tax',
                      'Join "Welcome" with the user\'s name',
                      'Check if temperature is less than 0'
                    ],
                    solution: `let total = price + tax;
let welcome = \`Welcome \${userName}\`;  // or "Welcome " + userName
let isFreezing = temperature < 0;`,
                    hints: [
                      'Use + for addition',
                      'Use template literals with ${} or + for text',
                      'Use < > <= >= for comparisons'
                    ]
                  }
                ]
              }
            }
          ]
        },
        {
          id: 'unit_2',
          title: 'Making Decisions',
          lessons: [
            {
              id: 'lesson_2_1',
              title: 'Conditions and Actions',
              content: {
                theory: 'Make decisions in code using if statements',
                examples: [
                  {
                    source: `If score is greater than 60
    Show "Pass"
Otherwise
    Show "Fail"`,
                    target: `if (score > 60) {
    console.log("Pass");
} else {
    console.log("Fail");
}`,
                    explanation: 'JavaScript uses if/else and curly braces for decisions'
                  }
                ],
                exercises: [
                  {
                    type: 'english_to_code',
                    question: 'Convert these English decisions to JavaScript:',
                    statements: [
                      'If balance is less than 0',
                      '    Show "Overdraft"',
                      'Otherwise if balance is less than 100',
                      '    Show "Low Balance"',
                      'Otherwise',
                      '    Show "OK"'
                    ],
                    solution: `if (balance < 0) {
    console.log("Overdraft");
} else if (balance < 100) {
    console.log("Low Balance");
} else {
    console.log("OK");
}`,
                    hints: [
                      'Use parentheses around conditions',
                      'Use curly braces for code blocks',
                      'Use else if for additional conditions',
                      'Use console.log to show messages'
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
      id: 'intermediate',
      title: 'Common Tasks',
      description: 'Learn how to translate everyday tasks into JavaScript code',
      units: [
        {
          id: 'unit_1',
          title: 'Working with Lists (Arrays)',
          lessons: [
            {
              id: 'lesson_1_1',
              title: 'Creating and Using Arrays',
              content: {
                theory: 'Work with collections of items using arrays',
                examples: [
                  {
                    source: `Create a todo list with: "buy milk", "clean room", "exercise"
Add "call mom" to the list
Remove "clean room" from the list
Show how many items are in the list`,
                    target: `let todoList = ["buy milk", "clean room", "exercise"];
todoList.push("call mom");
todoList = todoList.filter(item => item !== "clean room");
console.log(todoList.length);`,
                    explanation: 'JavaScript arrays can store and manipulate lists of items'
                  }
                ],
                exercises: [
                  {
                    type: 'english_to_code',
                    question: 'Convert these English array operations to JavaScript:',
                    statements: [
                      'Create a list of numbers: 1, 2, 3, 4, 5',
                      'Add 6 to the list',
                      'Remove the first number',
                      'Show the last number'
                    ],
                    solution: `let numbers = [1, 2, 3, 4, 5];
numbers.push(6);
numbers.shift();
console.log(numbers[numbers.length - 1]);`,
                    hints: [
                      'Use [] for arrays',
                      'push() adds to end',
                      'shift() removes from start',
                      'length - 1 is last index'
                    ]
                  }
                ]
              }
            }
          ]
        },
        {
          id: 'unit_2',
          title: 'Repeating Tasks',
          lessons: [
            {
              id: 'lesson_2_1',
              title: 'Loops and Iteration',
              content: {
                theory: 'Repeat tasks using loops',
                examples: [
                  {
                    source: `For each item in the shopping list:
    Show the item

Count from 1 to 5:
    Show each number`,
                    target: `for (let item of shoppingList) {
    console.log(item);
}

for (let i = 1; i <= 5; i++) {
    console.log(i);
}`,
                    explanation: 'JavaScript has different types of loops for repetition'
                  }
                ],
                exercises: [
                  {
                    type: 'english_to_code',
                    question: 'Convert these English repetition tasks to JavaScript:',
                    statements: [
                      'For each name in the list:',
                      '    Show "Hello" and the name',
                      '',
                      'Repeat 3 times:',
                      '    Show the current number'
                    ],
                    solution: `for (let name of nameList) {
    console.log("Hello", name);
}

for (let i = 1; i <= 3; i++) {
    console.log(i);
}`,
                    hints: [
                      'Use for...of for arrays',
                      'Use for with counter for repetition',
                      'Use console.log to show output',
                      'Remember curly braces'
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
