export const basicsSection = {
  id: 'basics',
  title: 'Java Basics from Python',
  description: 'Learn Java fundamentals using your Python knowledge',
  units: [
    {
      id: 'unit_1',
      title: 'Getting Started with Java',
      lessons: [
        {
          id: 'lesson_1_1',
          title: 'Hello Java',
          content: {
            theory: `In Python, we write simple scripts that run directly. Java requires a class and main method structure.
                    Python's print() becomes System.out.println() in Java.`,
            examples: [
              {
                source: `print("Hello, World!")`,
                target: `public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
                explanation: 'Java requires more boilerplate but follows a consistent structure'
              }
            ],
            exercises: [
              {
                type: 'code_conversion',
                question: 'Convert this Python code to Java:',
                code: 'print("Learning Java!")',
                solution: `public class Main {
    public static void main(String[] args) {
        System.out.println("Learning Java!");
    }
}`,
                hints: [
                  'Remember to create a class',
                  'Add the main method',
                  'Use System.out.println()'
                ]
              },
              {
                type: 'fill_in_blanks',
                question: 'Complete the Java code:',
                template: `public class Welcome {
    public static void main(String[] args) {
        _____._____._____(_____ + "!");
    }
}`,
                blanks: ['System', 'out', 'println', '"Welcome to Java"'],
                explanation: 'System.out.println() is Java\'s print statement'
              },
              {
                type: 'spot_the_difference',
                question: 'Find 3 differences between Python and Java printing:',
                pythonCode: 'print("Hello")\nprint("World")',
                javaCode: `System.out.println("Hello");
System.out.println("World");`,
                differences: [
                  'Java uses System.out.println instead of print',
                  'Java statements end with semicolons',
                  'Java method calls require parentheses'
                ]
              }
            ],
            challenge: {
              type: 'mini_project',
              title: 'Greeting Program',
              description: 'Create a Java program that prints three lines: your name, age, and favorite programming language',
              template: `public class Greeting {
    public static void main(String[] args) {
        // Your code here
    }
}`,
              solution: `public class Greeting {
    public static void main(String[] args) {
        System.out.println("Name: Alice");
        System.out.println("Age: 25");
        System.out.println("Favorite Language: Java");
    }
}`,
              hints: [
                'Use System.out.println() for each line',
                'Don\'t forget semicolons',
                'Keep the class and main method structure'
              ]
            }
          }
        },
        {
          id: 'lesson_1_2',
          title: 'Variables and Types',
          content: {
            theory: `Python variables are dynamically typed, while Java requires explicit type declarations.
                    Python's type hints are similar to Java's required type declarations.`,
            examples: [
              {
                source: `name = "Alice"  # str
age = 25      # int`,
                target: `String name = "Alice";
int age = 25;`,
                explanation: 'Java requires explicit type declarations before variable names'
              }
            ],
            exercises: [
              {
                type: 'code_conversion',
                question: 'Convert these Python variables to Java:',
                code: `count = 42
price = 9.99
message = "Hello"`,
                solution: `int count = 42;
double price = 9.99;
String message = "Hello";`,
                hints: [
                  'Use int for whole numbers',
                  'Use double for decimal numbers',
                  'Use String for text'
                ]
              },
              {
                type: 'type_matching',
                question: 'Match Python types to Java types:',
                pairs: [
                  ['str', 'String'],
                  ['int', 'int'],
                  ['float', 'double'],
                  ['bool', 'boolean'],
                  ['list', 'ArrayList']
                ]
              },
              {
                type: 'code_analysis',
                question: 'What\'s wrong with these Java variables?',
                code: `string name = "Bob";
Int age = 30;
double price = 5;
String message;
message = "Hi";`,
                issues: [
                  'string should be String (uppercase)',
                  'Int should be int (lowercase)',
                  'Variable declaration and initialization can be combined'
                ]
              }
            ],
            challenge: {
              type: 'debug_challenge',
              title: 'Fix the Types',
              description: 'Fix all type-related errors in this Java program',
              buggyCode: `public class Variables {
    public static void main(String[] args) {
        string firstName = "Alice";
        Int age = 25;
        Boolean isStudent = "true";
        double grade = "95.5";
        System.out.println(firstName + " is " + age);
    }
}`,
              solution: `public class Variables {
    public static void main(String[] args) {
        String firstName = "Alice";
        int age = 25;
        boolean isStudent = true;
        double grade = 95.5;
        System.out.println(firstName + " is " + age);
    }
}`,
              hints: [
                'Check capitalization of type names',
                'Make sure boolean values aren\'t strings',
                'Remove quotes from numeric values'
              ]
            }
          }
        }
      ]
    },
    {
      id: 'unit_2',
      title: 'Control Flow',
      lessons: [
        {
          id: 'lesson_2_1',
          title: 'If Statements',
          content: {
            theory: `Python uses indentation for code blocks, while Java uses curly braces {}.
                    Java conditions must be in parentheses ().`,
            examples: [
              {
                source: `if age >= 18:
    print("Adult")
else:
    print("Minor")`,
                target: `if (age >= 18) {
    System.out.println("Adult");
} else {
    System.out.println("Minor");
}`,
                explanation: 'Java requires parentheses and curly braces'
              }
            ],
            exercises: [
              {
                type: 'code_conversion',
                question: 'Convert this Python if statement to Java:',
                code: `if score > 90:
    print("A grade")
elif score > 80:
    print("B grade")
else:
    print("Study more")`,
                solution: `if (score > 90) {
    System.out.println("A grade");
} else if (score > 80) {
    System.out.println("B grade");
} else {
    System.out.println("Study more");
}`,
                hints: [
                  'Use else if instead of elif',
                  'Add parentheses around conditions',
                  'Use curly braces for each block'
                ]
              },
              {
                type: 'syntax_correction',
                question: 'Fix the Java if statement syntax:',
                buggyCode: `if score >= 75 {
    System.out.println("Passed");
} else
    System.out.println("Failed");`,
                solution: `if (score >= 75) {
    System.out.println("Passed");
} else {
    System.out.println("Failed");
}`,
                hints: [
                  'Add parentheses around the condition',
                  'Add curly braces for the else block'
                ]
              }
            ]
          }
        }
      ]
    }
  ]
};
