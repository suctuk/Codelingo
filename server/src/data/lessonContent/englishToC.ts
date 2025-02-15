export const englishToCCurriculum = {
  sections: [
    {
      id: 'basics',
      title: 'From English to C: Getting Started',
      description: 'Learn how to translate everyday concepts into C code',
      units: [
        {
          id: 'unit_1',
          title: 'Program Structure',
          lessons: [
            {
              id: 'lesson_1_1',
              title: 'Basic Program Setup',
              content: {
                theory: 'Every C program needs includes and a main function',
                examples: [
                  {
                    source: `Create a program that:
1. Includes basic input/output tools
2. Has a main function
3. Shows "Hello, World!"`,
                    target: `#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}`,
                    explanation: 'C programs need header files and a main function that returns an integer'
                  }
                ],
                exercises: [
                  {
                    type: 'english_to_code',
                    question: 'Convert these English instructions to C:',
                    statements: [
                      'Create a program that:',
                      '1. Shows "Starting program"',
                      '2. Shows "Processing..."',
                      '3. Shows "Done!"'
                    ],
                    solution: `#include <stdio.h>

int main() {
    printf("Starting program\\n");
    printf("Processing...\\n");
    printf("Done!\\n");
    return 0;
}`,
                    hints: [
                      'Include stdio.h',
                      'Use printf for output',
                      'Add \\n for new lines',
                      'Return 0 from main'
                    ]
                  }
                ]
              }
            },
            {
              id: 'lesson_1_2',
              title: 'Variables and Memory',
              content: {
                theory: 'C requires explicit type declarations and manages memory manually',
                examples: [
                  {
                    source: `Store the whole number 42 in a box labeled "age"
Store the decimal number 3.14 in a box labeled "pi"
Store a single character 'A' in a box labeled "grade"`,
                    target: `int age = 42;
double pi = 3.14;
char grade = 'A';`,
                    explanation: 'C variables need specific types and careful memory management'
                  }
                ],
                exercises: [
                  {
                    type: 'english_to_code',
                    question: 'Convert these English statements to C:',
                    statements: [
                      'Store the number 100 in a box labeled "count"',
                      'Store the decimal 98.6 in a box labeled "temperature"',
                      'Store the character \'X\' in a box labeled "symbol"',
                      'Store a small number 5 in a box labeled "level"'
                    ],
                    solution: `int count = 100;
double temperature = 98.6;
char symbol = 'X';
short level = 5;`,
                    hints: [
                      'Use int for whole numbers',
                      'Use double for decimals',
                      'Use char for single characters',
                      'Use short for small numbers'
                    ]
                  }
                ]
              }
            }
          ]
        },
        {
          id: 'unit_2',
          title: 'Memory Management',
          lessons: [
            {
              id: 'lesson_2_1',
              title: 'Arrays and Pointers',
              content: {
                theory: 'C uses pointers to manage memory and arrays',
                examples: [
                  {
                    source: `Create a list of 5 numbers
Create a pointer to store a memory address
Allocate memory for 10 numbers`,
                    target: `int numbers[5] = {1, 2, 3, 4, 5};
int* ptr = NULL;
ptr = (int*)malloc(10 * sizeof(int));

// Don't forget to free
free(ptr);`,
                    explanation: 'C requires manual memory allocation and deallocation'
                  }
                ],
                exercises: [
                  {
                    type: 'english_to_code',
                    question: 'Convert these English memory operations to C:',
                    statements: [
                      'Create a list of 3 grades: 90, 85, 95',
                      'Create space for 100 characters',
                      'Remember to clean up the space after'
                    ],
                    solution: `#include <stdlib.h>

int grades[3] = {90, 85, 95};
char* text = (char*)malloc(100 * sizeof(char));

// Use the memory...

free(text);`,
                    hints: [
                      'Include stdlib.h for malloc',
                      'Use [] for fixed arrays',
                      'Use malloc for dynamic memory',
                      'Always free malloc\'d memory'
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
      title: 'Advanced C Concepts',
      description: 'Learn C-specific features',
      units: [
        {
          id: 'unit_1',
          title: 'Structures',
          lessons: [
            {
              id: 'lesson_1_1',
              title: 'Creating Custom Types',
              content: {
                theory: 'Group related data using structures',
                examples: [
                  {
                    source: `Create a Person type that has:
- a name (up to 50 characters)
- an age (whole number)
- a height (decimal)`,
                    target: `struct Person {
    char name[50];
    int age;
    double height;
};

struct Person person = {"Alice", 25, 1.75};`,
                    explanation: 'Structures group related data under one name'
                  }
                ],
                exercises: [
                  {
                    type: 'english_to_code',
                    question: 'Create these C structures:',
                    statements: [
                      'Create a Student type with:',
                      '- id (whole number)',
                      '- name (up to 30 characters)',
                      '- gpa (decimal)',
                      'Then create a student'
                    ],
                    solution: `struct Student {
    int id;
    char name[30];
    double gpa;
};

struct Student student = {12345, "Bob", 3.85};`,
                    hints: [
                      'Use struct keyword',
                      'Define members with types',
                      'Use arrays for strings',
                      'Initialize with { }'
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
