export const englishToJavaCurriculum = {
  sections: [
    {
      id: 'basics',
      title: 'From English to Java: Getting Started',
      description: 'Learn how to translate everyday concepts into Java code',
      units: [
        {
          id: 'unit_1',
          title: 'Program Structure',
          lessons: [
            {
              id: 'lesson_1_1',
              title: 'Basic Program Setup',
              content: {
                theory: 'Every Java program needs a basic structure',
                examples: [
                  {
                    source: `Create a program called HelloWorld
Make it show "Hello, World!"`,
                    target: `public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
                    explanation: 'Java programs need a class and a main method to run'
                  }
                ],
                exercises: [
                  {
                    type: 'english_to_code',
                    question: 'Convert these English instructions to Java:',
                    statements: [
                      'Create a program called Calculator',
                      'Make it show "Starting calculator..."',
                      'Then make it show "Ready!"'
                    ],
                    solution: `public class Calculator {
    public static void main(String[] args) {
        System.out.println("Starting calculator...");
        System.out.println("Ready!");
    }
}`,
                    hints: [
                      'Start with public class',
                      'Add main method',
                      'Use System.out.println for output',
                      'Don\'t forget semicolons'
                    ]
                  }
                ]
              }
            },
            {
              id: 'lesson_1_2',
              title: 'Variables and Types',
              content: {
                theory: 'Java requires you to specify what type of information each variable will store',
                examples: [
                  {
                    source: `Store the number 42 in a box labeled "age"
Store the text "Alice" in a box labeled "name"
Store whether someone is a student (yes) in a box labeled "isStudent"`,
                    target: `int age = 42;
String name = "Alice";
boolean isStudent = true;`,
                    explanation: 'Java variables need type declarations: int for whole numbers, String for text, boolean for yes/no'
                  }
                ],
                exercises: [
                  {
                    type: 'english_to_code',
                    question: 'Convert these English statements to Java:',
                    statements: [
                      'Store the price 9.99 in a box labeled "itemPrice"',
                      'Store the text "Welcome" in a box labeled "message"',
                      'Store whether the shop is open (no) in a box labeled "isOpen"',
                      'Store the number 1000000 in a box labeled "population"'
                    ],
                    solution: `double itemPrice = 9.99;
String message = "Welcome";
boolean isOpen = false;
int population = 1000000;`,
                    hints: [
                      'Use double for decimal numbers',
                      'Use String for text (with quotes)',
                      'Use boolean for true/false',
                      'Use int for whole numbers'
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
                theory: 'Convert decision-making statements to Java if conditions',
                examples: [
                  {
                    source: `If age is greater than 18, then
    Show "Can vote"
Otherwise
    Show "Cannot vote"`,
                    target: `if (age > 18) {
    System.out.println("Can vote");
} else {
    System.out.println("Cannot vote");
}`,
                    explanation: 'Java uses if, else, and curly braces for decisions'
                  }
                ],
                exercises: [
                  {
                    type: 'english_to_code',
                    question: 'Convert these English decisions to Java:',
                    statements: [
                      'If score is at least 60',
                      '    Show "Pass"',
                      'Otherwise if score is at least 50',
                      '    Show "Borderline"',
                      'Otherwise',
                      '    Show "Fail"'
                    ],
                    solution: `if (score >= 60) {
    System.out.println("Pass");
} else if (score >= 50) {
    System.out.println("Borderline");
} else {
    System.out.println("Fail");
}`,
                    hints: [
                      'Use >= for "at least"',
                      'Use else if for additional conditions',
                      'Use curly braces for each block',
                      'End statements with semicolons'
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
      title: 'Working with Data',
      description: 'Learn how to handle different types of data in Java',
      units: [
        {
          id: 'unit_1',
          title: 'Lists and Arrays',
          lessons: [
            {
              id: 'lesson_1_1',
              title: 'Creating and Using Arrays',
              content: {
                theory: 'Store multiple items using Java arrays',
                examples: [
                  {
                    source: `Create a list of numbers: 1, 2, 3, 4, 5
Show the first number
Show how many numbers there are`,
                    target: `int[] numbers = {1, 2, 3, 4, 5};
System.out.println(numbers[0]);
System.out.println(numbers.length);`,
                    explanation: 'Java arrays have fixed size and use square brackets'
                  }
                ],
                exercises: [
                  {
                    type: 'english_to_code',
                    question: 'Convert these English array operations to Java:',
                    statements: [
                      'Create a list of names: "Alice", "Bob", "Charlie"',
                      'Show the second name',
                      'Show how many names there are',
                      'Show the last name'
                    ],
                    solution: `String[] names = {"Alice", "Bob", "Charlie"};
System.out.println(names[1]);
System.out.println(names.length);
System.out.println(names[names.length - 1]);`,
                    hints: [
                      'Use String[] for text arrays',
                      'Array indices start at 0',
                      'length gives array size',
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
              title: 'Loops',
              content: {
                theory: 'Repeat tasks using Java loops',
                examples: [
                  {
                    source: `Count from 1 to 5:
    Show each number

For each name in the list:
    Show "Hello" and the name`,
                    target: `for (int i = 1; i <= 5; i++) {
    System.out.println(i);
}

for (String name : names) {
    System.out.println("Hello " + name);
}`,
                    explanation: 'Java has different types of loops for different needs'
                  }
                ],
                exercises: [
                  {
                    type: 'english_to_code',
                    question: 'Convert these English loops to Java:',
                    statements: [
                      'Count from 10 down to 1:',
                      '    Show each number',
                      '',
                      'For each color in colors:',
                      '    Show "I like" and the color'
                    ],
                    solution: `for (int i = 10; i >= 1; i--) {
    System.out.println(i);
}

for (String color : colors) {
    System.out.println("I like " + color);
}`,
                    hints: [
                      'Use -- to count down',
                      'Use >= for counting down',
                      'Use enhanced for loop for arrays',
                      'Use + to join strings'
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
