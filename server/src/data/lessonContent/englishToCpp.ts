export const englishToCppCurriculum = {
  sections: [
    {
      id: 'basics',
      title: 'From English to C++: Getting Started',
      description: 'Learn how to translate everyday concepts into C++ code',
      units: [
        {
          id: 'unit_1',
          title: 'Program Structure',
          lessons: [
            {
              id: 'lesson_1_1',
              title: 'Basic Program Setup',
              content: {
                theory: 'Every C++ program needs some basic setup code',
                examples: [
                  {
                    source: `Create a program that shows "Hello, World!"
Include the necessary tools for input/output`,
                    target: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`,
                    explanation: 'C++ programs need includes, main function, and input/output tools'
                  }
                ],
                exercises: [
                  {
                    type: 'english_to_code',
                    question: 'Convert these English instructions to C++:',
                    statements: [
                      'Create a program that:',
                      '1. Shows "Starting program..."',
                      '2. Shows "Processing..."',
                      '3. Shows "Done!"'
                    ],
                    solution: `#include <iostream>
using namespace std;

int main() {
    cout << "Starting program..." << endl;
    cout << "Processing..." << endl;
    cout << "Done!" << endl;
    return 0;
}`,
                    hints: [
                      'Include iostream for input/output',
                      'Add main function',
                      'Use cout for output',
                      'End with return 0'
                    ]
                  }
                ]
              }
            },
            {
              id: 'lesson_1_2',
              title: 'Variables and Memory',
              content: {
                theory: 'C++ requires you to specify what type of information each variable will store',
                examples: [
                  {
                    source: `Store the whole number 42 in a box labeled "age"
Store the decimal number 3.14 in a box labeled "pi"
Store the text "Hello" in a box labeled "message"`,
                    target: `int age = 42;
double pi = 3.14;
string message = "Hello";  // Need #include <string>`,
                    explanation: 'C++ variables need type declarations and proper memory management'
                  }
                ],
                exercises: [
                  {
                    type: 'english_to_code',
                    question: 'Convert these English statements to C++:',
                    statements: [
                      'Store the price 9.99 in a box labeled "itemPrice"',
                      'Store yes/no about being active in "isActive"',
                      'Store the text "Welcome" in "greeting"',
                      'Store the whole number 1000 in "count"'
                    ],
                    solution: `#include <string>

double itemPrice = 9.99;
bool isActive = true;
string greeting = "Welcome";
int count = 1000;`,
                    hints: [
                      'Include string for text',
                      'Use double for decimals',
                      'Use bool for yes/no',
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
                theory: 'Convert decision-making statements to C++ if conditions',
                examples: [
                  {
                    source: `If temperature is above 30:
    Show "It's hot!"
Otherwise if temperature is above 20:
    Show "It's nice!"
Otherwise:
    Show "It's cool!"`,
                    target: `if (temperature > 30) {
    cout << "It's hot!" << endl;
} else if (temperature > 20) {
    cout << "It's nice!" << endl;
} else {
    cout << "It's cool!" << endl;
}`,
                    explanation: 'C++ uses if, else if, else, and curly braces for decisions'
                  }
                ],
                exercises: [
                  {
                    type: 'english_to_code',
                    question: 'Convert these English decisions to C++:',
                    statements: [
                      'If score is 100:',
                      '    Show "Perfect!"',
                      'Otherwise if score is at least 70:',
                      '    Show "Good job!"',
                      'Otherwise:',
                      '    Show "Keep practicing!"'
                    ],
                    solution: `if (score == 100) {
    cout << "Perfect!" << endl;
} else if (score >= 70) {
    cout << "Good job!" << endl;
} else {
    cout << "Keep practicing!" << endl;
}`,
                    hints: [
                      'Use == for equality',
                      'Use >= for "at least"',
                      'Add curly braces',
                      'Use cout for output'
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
      description: 'Learn how to handle different types of data in C++',
      units: [
        {
          id: 'unit_1',
          title: 'Arrays and Vectors',
          lessons: [
            {
              id: 'lesson_1_1',
              title: 'Creating and Using Collections',
              content: {
                theory: 'Store multiple items using C++ arrays or vectors',
                examples: [
                  {
                    source: `Create a list of numbers: 1, 2, 3, 4, 5
Add 6 to the list
Show how many numbers are in the list`,
                    target: `#include <vector>

vector<int> numbers = {1, 2, 3, 4, 5};
numbers.push_back(6);
cout << numbers.size() << endl;

// Or using array:
int numbers[] = {1, 2, 3, 4, 5};
// Fixed size, can't add more`,
                    explanation: 'C++ offers both fixed arrays and flexible vectors'
                  }
                ],
                exercises: [
                  {
                    type: 'english_to_code',
                    question: 'Convert these English collection operations to C++:',
                    statements: [
                      'Create a list of names that can grow',
                      'Add "Alice" to it',
                      'Add "Bob" to it',
                      'Show the first name',
                      'Show how many names there are'
                    ],
                    solution: `#include <vector>
#include <string>

vector<string> names;
names.push_back("Alice");
names.push_back("Bob");
cout << names[0] << endl;
cout << names.size() << endl;`,
                    hints: [
                      'Include vector and string',
                      'Use vector for flexible size',
                      'push_back adds items',
                      'size() shows count'
                    ]
                  }
                ]
              }
            }
          ]
        },
        {
          id: 'unit_2',
          title: 'Loops and Iteration',
          lessons: [
            {
              id: 'lesson_2_1',
              title: 'Repeating Tasks',
              content: {
                theory: 'Repeat tasks using C++ loops',
                examples: [
                  {
                    source: `Count from 1 to 5:
    Show each number

For each name in names:
    Show "Hello" and the name`,
                    target: `for (int i = 1; i <= 5; i++) {
    cout << i << endl;
}

for (const string& name : names) {
    cout << "Hello " << name << endl;
}`,
                    explanation: 'C++ has traditional for loops and range-based for loops'
                  }
                ],
                exercises: [
                  {
                    type: 'english_to_code',
                    question: 'Convert these English loops to C++:',
                    statements: [
                      'Count down from 5 to 1:',
                      '    Show each number',
                      '',
                      'For each color in colors:',
                      '    Show the color followed by "!"'
                    ],
                    solution: `for (int i = 5; i >= 1; i--) {
    cout << i << endl;
}

for (const string& color : colors) {
    cout << color << "!" << endl;
}`,
                    hints: [
                      'Use -- to count down',
                      'Use >= for counting down',
                      'Use range-based for with vectors',
                      'Use const reference for efficiency'
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
