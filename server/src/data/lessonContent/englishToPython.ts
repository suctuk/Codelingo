export const englishToPythonCurriculum = {
  sections: [
    {
      id: 'basics',
      title: 'From English to Python: Getting Started',
      description: 'Learn how to translate everyday concepts into Python code',
      units: [
        {
          id: 'unit_1',
          title: 'Basic Concepts',
          lessons: [
            {
              id: 'lesson_1_1',
              title: 'Variables as Containers',
              content: {
                theory: 'Variables are like labeled boxes that store information',
                examples: [
                  {
                    source: `Store the number 42 in a box labeled "age"
Store the text "Alice" in a box labeled "name"
Store whether someone is a student (yes) in a box labeled "is_student"`,
                    target: `age = 42
name = "Alice"
is_student = True`,
                    explanation: 'Variables store different types of data: numbers, text (strings), and true/false values (booleans)'
                  }
                ],
                exercises: [
                  {
                    type: 'english_to_code',
                    question: 'Convert these English statements to Python code:',
                    statements: [
                      'Store the price 9.99 in a box labeled "item_price"',
                      'Store the text "Hello World" in a box labeled "message"',
                      'Store whether the shop is open (no) in a box labeled "is_open"'
                    ],
                    solution: `item_price = 9.99
message = "Hello World"
is_open = False`,
                    hints: [
                      'Use = to store values',
                      'Text needs quotes around it',
                      'True/False for yes/no values',
                      'Numbers don\'t need quotes'
                    ]
                  }
                ]
              }
            },
            {
              id: 'lesson_1_2',
              title: 'Simple Operations',
              content: {
                theory: 'Translate basic math and text operations into Python',
                examples: [
                  {
                    source: `Add 5 and 3
Multiply 4 by 2
Join the text "Hello" with the text "World"`,
                    target: `result = 5 + 3
product = 4 * 2
greeting = "Hello" + " " + "World"  # or "Hello World"`,
                    explanation: 'Python uses familiar math symbols and + for joining text'
                  }
                ],
                exercises: [
                  {
                    type: 'english_to_code',
                    question: 'Convert these English operations to Python:',
                    statements: [
                      'Subtract 10 from 20',
                      'Multiply 5 by 3',
                      'Join the text "Good" with "Morning"'
                    ],
                    solution: `result = 20 - 10
product = 5 * 3
greeting = "Good" + "Morning"  # or "Good Morning"`,
                    hints: [
                      'Use - for subtraction',
                      'Use * for multiplication',
                      'Use + to join text'
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
              title: 'If-Then Statements',
              content: {
                theory: 'Convert decision-making statements to Python if conditions',
                examples: [
                  {
                    source: `If age is greater than 18, then
    Show "Can vote"
Otherwise
    Show "Cannot vote"`,
                    target: `if age > 18:
    print("Can vote")
else:
    print("Cannot vote")`,
                    explanation: 'Python uses if, else, and indentation to show decision structure'
                  }
                ],
                exercises: [
                  {
                    type: 'english_to_code',
                    question: 'Convert these English decisions to Python:',
                    statements: [
                      'If temperature is greater than 30, then',
                      '    Show "It\'s hot!"',
                      'Otherwise',
                      '    Show "It\'s nice"'
                    ],
                    solution: `if temperature > 30:
    print("It's hot!")
else:
    print("It's nice")`,
                    hints: [
                      'Use if for conditions',
                      'Use : after conditions',
                      'Indent the code inside',
                      'Use else for otherwise'
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
      description: 'Learn how to translate everyday tasks into Python code',
      units: [
        {
          id: 'unit_1',
          title: 'Working with Lists',
          lessons: [
            {
              id: 'lesson_1_1',
              title: 'Creating and Using Lists',
              content: {
                theory: 'Lists are like ordered collections of items',
                examples: [
                  {
                    source: `Create a shopping list with: apples, bananas, oranges
Add milk to the shopping list
Remove oranges from the list
Show the first item in the list`,
                    target: `shopping_list = ["apples", "bananas", "oranges"]
shopping_list.append("milk")
shopping_list.remove("oranges")
first_item = shopping_list[0]
print(first_item)`,
                    explanation: 'Lists store multiple items and can be modified'
                  }
                ],
                exercises: [
                  {
                    type: 'english_to_code',
                    question: 'Convert these English list operations to Python:',
                    statements: [
                      'Create a list of colors: red, blue, green',
                      'Add yellow to the list',
                      'Show how many colors are in the list',
                      'Show the last color in the list'
                    ],
                    solution: `colors = ["red", "blue", "green"]
colors.append("yellow")
print(len(colors))
print(colors[-1])`,
                    hints: [
                      'Use [] for lists',
                      'append() adds items',
                      'len() counts items',
                      '-1 gets last item'
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
                theory: 'Convert repetitive tasks into Python loops',
                examples: [
                  {
                    source: `For each number from 1 to 5:
    Show the number

For each item in the shopping list:
    Show the item`,
                    target: `for number in range(1, 6):
    print(number)

for item in shopping_list:
    print(item)`,
                    explanation: 'Python for loops can iterate over ranges or collections'
                  }
                ],
                exercises: [
                  {
                    type: 'english_to_code',
                    question: 'Convert these English repetition tasks to Python:',
                    statements: [
                      'For each number from 1 to 3:',
                      '    Show "Count: " followed by the number',
                      '',
                      'For each color in the colors list:',
                      '    Show "Color: " followed by the color'
                    ],
                    solution: `for number in range(1, 4):
    print("Count:", number)

for color in colors:
    print("Color:", color)`,
                    hints: [
                      'Use for with range()',
                      'range() end is exclusive',
                      'Use in for lists',
                      'Indent repeated code'
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
