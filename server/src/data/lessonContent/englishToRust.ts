export const englishToRustCurriculum = {
  sections: [
    {
      id: 'basics',
      title: 'From English to Rust: Getting Started',
      description: 'Learn how to translate everyday concepts into Rust code',
      units: [
        {
          id: 'unit_1',
          title: 'Program Structure',
          lessons: [
            {
              id: 'lesson_1_1',
              title: 'Basic Program Setup',
              content: {
                theory: 'Every Rust program starts with a main function',
                examples: [
                  {
                    source: `Create a program that shows "Hello, World!"
Make it the starting point of our program`,
                    target: `fn main() {
    println!("Hello, World!");
}`,
                    explanation: 'Rust programs need a main function and use println! macro for output'
                  }
                ],
                exercises: [
                  {
                    type: 'english_to_code',
                    question: 'Convert these English instructions to Rust:',
                    statements: [
                      'Create a program that:',
                      '1. Shows "Starting..."',
                      '2. Shows "Processing"',
                      '3. Shows "Done!"'
                    ],
                    solution: `fn main() {
    println!("Starting...");
    println!("Processing");
    println!("Done!");
}`,
                    hints: [
                      'Start with fn main()',
                      'Use println! for output',
                      'Each statement ends with ;',
                      'Use ! for macros'
                    ]
                  }
                ]
              }
            },
            {
              id: 'lesson_1_2',
              title: 'Variables and Types',
              content: {
                theory: 'Rust variables are immutable by default and need type annotations',
                examples: [
                  {
                    source: `Create a box labeled "age" that can't change, store 25
Create a box labeled "name" that can change, store "Alice"
Create a box labeled "price" that can't change, store 9.99`,
                    target: `let age: i32 = 25;
let mut name: String = String::from("Alice");
let price: f64 = 9.99;`,
                    explanation: 'Use let for immutable, mut for mutable variables'
                  }
                ],
                exercises: [
                  {
                    type: 'english_to_code',
                    question: 'Convert these English statements to Rust:',
                    statements: [
                      'Create an unchangeable count box, store 100',
                      'Create a changeable message box, store "Hello"',
                      'Create an unchangeable active box, store yes',
                      'Create a changeable score box, store 95.5'
                    ],
                    solution: `let count: i32 = 100;
let mut message: String = String::from("Hello");
let active: bool = true;
let mut score: f64 = 95.5;`,
                    hints: [
                      'Use let for constants',
                      'Add mut for variables',
                      'String::from for text',
                      'Use appropriate types'
                    ]
                  }
                ]
              }
            }
          ]
        },
        {
          id: 'unit_2',
          title: 'Ownership and Borrowing',
          lessons: [
            {
              id: 'lesson_2_1',
              title: 'Understanding Ownership',
              content: {
                theory: 'Rust manages memory through ownership rules',
                examples: [
                  {
                    source: `Create a text box called "message"
Let another box borrow it temporarily
Use the original box again`,
                    target: `let message = String::from("Hello");
let borrowed = &message;  // Borrowing
println!("{}, {}", message, borrowed);  // Both usable`,
                    explanation: 'Rust enforces strict rules about who owns and uses data'
                  }
                ],
                exercises: [
                  {
                    type: 'english_to_code',
                    question: 'Convert these English ownership concepts to Rust:',
                    statements: [
                      'Create a text box called "name"',
                      'Create another box that borrows it',
                      'Try to use both boxes to show the name',
                      'Then change the original name'
                    ],
                    solution: `let mut name = String::from("Alice");
let borrowed_name = &name;
println!("Name: {}, Borrowed: {}", name, borrowed_name);
name = String::from("Bob");  // Can modify after borrow ends`,
                    hints: [
                      'Use String::from for text',
                      'Use & for borrowing',
                      'Multiple borrows okay',
                      'Can\'t modify while borrowed'
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
      title: 'Advanced Rust Concepts',
      description: 'Learn Rust-specific features',
      units: [
        {
          id: 'unit_1',
          title: 'Error Handling',
          lessons: [
            {
              id: 'lesson_1_1',
              title: 'Result and Option',
              content: {
                theory: 'Handle errors and missing values in Rust',
                examples: [
                  {
                    source: `Create a function that might fail:
- Try to convert text to a number
- Return success or failure`,
                    target: `fn parse_number(text: &str) -> Result<i32, String> {
    match text.parse() {
        Ok(num) => Ok(num),
        Err(_) => Err(String::from("Not a number"))
    }
}`,
                    explanation: 'Rust uses Result for operations that might fail'
                  }
                ],
                exercises: [
                  {
                    type: 'english_to_code',
                    question: 'Create these Rust error handling examples:',
                    statements: [
                      'Create a function that:',
                      '- Takes an age as text',
                      '- Converts it to a number',
                      '- Checks if it\'s valid (0-120)',
                      '- Returns success or error'
                    ],
                    solution: `fn validate_age(age_text: &str) -> Result<i32, String> {
    let age: i32 = match age_text.parse() {
        Ok(n) => n,
        Err(_) => return Err(String::from("Not a number"))
    };
    
    if age >= 0 && age <= 120 {
        Ok(age)
    } else {
        Err(String::from("Age out of range"))
    }
}`,
                    hints: [
                      'Use Result for error handling',
                      'match for pattern matching',
                      'parse() returns Result',
                      'Check valid range'
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
