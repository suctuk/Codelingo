export const rubyToJavaCurriculum = {
  sections: [
    {
      id: 'section_1_basics',
      title: 'Java Fundamentals',
      description: 'Learn the basic concepts of Java coming from Ruby',
      units: [
        {
          id: 'unit_1_output',
          title: 'Console Output',
          lessons: [
            {
              id: 'lesson_1_1',
              title: 'Basic Output',
              content: {
                theory: 'Convert Ruby puts to Java System.out.println',
                examples: [
                  {
                    source: `# Ruby
puts "Hello World"
print "No newline"`,
                    target: `// Java
System.out.println("Hello World");
System.out.print("No newline");`,
                    explanation: 'Java uses System.out.println for output with newline'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Print "Hello Java"',
                    code: 'System.out.___("Hello Java");',
                    solution: 'System.out.println("Hello Java");',
                    hints: ['Use println', 'Add semicolon']
                  }
                ],
                quiz: [
                  {
                    question: 'Which method adds a newline in Java?',
                    options: ['print', 'println', 'puts', 'write'],
                    answer: 1
                  }
                ]
              }
            },
            {
              id: 'lesson_1_2',
              title: 'String Concatenation',
              content: {
                theory: 'Convert Ruby string interpolation to Java concatenation',
                examples: [
                  {
                    source: `# Ruby
name = "Alice"
puts "Hello #{name}"`,
                    target: `// Java
String name = "Alice";
System.out.println("Hello " + name);`,
                    explanation: 'Java uses + for string concatenation'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Concatenate strings',
                    code: 'String name = "Bob";\nSystem.out.println("Welcome " ___ name);',
                    solution: 'String name = "Bob";\nSystem.out.println("Welcome " + name);',
                    hints: ['Use + operator', 'Add spaces']
                  }
                ]
              }
            },
            {
              id: 'lesson_1_3',
              title: 'Formatted Output',
              content: {
                theory: 'Convert Ruby printf to Java String.format',
                examples: [
                  {
                    source: `# Ruby
printf("Score: %.2f", 95.5)`,
                    target: `// Java
System.out.printf("Score: %.2f", 95.5);
// or
System.out.println(String.format("Score: %.2f", 95.5));`,
                    explanation: 'Java supports printf and String.format'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Format a decimal number',
                    code: 'double score = 92.555;\nSystem.out.___("Score: %.2f", ___);',
                    solution: 'double score = 92.555;\nSystem.out.printf("Score: %.2f", score);',
                    hints: ['Use printf', 'Add variable']
                  }
                ]
              }
            },
            {
              id: 'lesson_1_4',
              title: 'Multiple Values',
              content: {
                theory: 'Print multiple values in Java',
                examples: [
                  {
                    source: `# Ruby
name = "Charlie"
age = 25
puts "#{name} is #{age} years old"`,
                    target: `// Java
String name = "Charlie";
int age = 25;
System.out.println(name + " is " + age + " years old");
// or using String.format
System.out.printf("%s is %d years old", name, age);`,
                    explanation: 'Java offers multiple ways to combine strings and values'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Print name and age',
                    code: 'String name = "David";\nint age = 30;\nSystem.out.printf(___, ___, ___);',
                    solution: 'String name = "David";\nint age = 30;\nSystem.out.printf("%s is %d years old", name, age);',
                    hints: ['Use %s for strings', 'Use %d for integers']
                  }
                ]
              }
            },
            {
              id: 'lesson_1_5',
              title: 'Error Output',
              content: {
                theory: 'Convert Ruby STDERR to Java System.err',
                examples: [
                  {
                    source: `# Ruby
STDERR.puts "Error occurred"`,
                    target: `// Java
System.err.println("Error occurred");`,
                    explanation: 'Java uses System.err for error output'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Print error message',
                    code: 'System.___.___("Invalid input");',
                    solution: 'System.err.println("Invalid input");',
                    hints: ['Use err', 'Use println']
                  }
                ]
              }
            },
            {
              id: 'lesson_1_6',
              title: 'String Templates',
              content: {
                theory: 'Convert Ruby string interpolation to Java text blocks',
                examples: [
                  {
                    source: `# Ruby
message = <<-TEXT
Hello
#{name}!
TEXT`,
                    target: `// Java
String message = """
    Hello
    %s!
    """.formatted(name);`,
                    explanation: 'Java 15+ supports text blocks with formatting'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Create a text block',
                    code: 'String message = ___\n    Welcome\n    %s!\n    ___.formatted(name);',
                    solution: 'String message = """\n    Welcome\n    %s!\n    """.formatted(name);',
                    hints: ['Use """ for text blocks', 'Use formatted()']
                  }
                ]
              }
            },
            {
              id: 'lesson_1_7',
              title: 'Number Formatting',
              content: {
                theory: 'Format numbers in Java',
                examples: [
                  {
                    source: `# Ruby
price = 1234.5678
puts "Price: $%.2f" % price`,
                    target: `// Java
double price = 1234.5678;
System.out.printf("Price: $%.2f", price);
// or using NumberFormat
NumberFormat formatter = NumberFormat.getCurrencyInstance();
System.out.println("Price: " + formatter.format(price));`,
                    explanation: 'Java provides multiple number formatting options'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Format currency',
                    code: 'double price = 99.99;\nNumberFormat formatter = NumberFormat.___();\nSystem.out.println(formatter.format(___));',
                    solution: 'double price = 99.99;\nNumberFormat formatter = NumberFormat.getCurrencyInstance();\nSystem.out.println(formatter.format(price));',
                    hints: ['Use getCurrencyInstance', 'Format price']
                  }
                ]
              }
            },
            {
              id: 'lesson_1_8',
              title: 'Console Input',
              content: {
                theory: 'Convert Ruby gets to Java Scanner',
                examples: [
                  {
                    source: `# Ruby
print "Enter name: "
name = gets.chomp`,
                    target: `// Java
Scanner scanner = new Scanner(System.in);
System.out.print("Enter name: ");
String name = scanner.nextLine();`,
                    explanation: 'Java uses Scanner class for input'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Read user input',
                    code: 'Scanner scanner = new Scanner(System.___);\nString input = scanner.___();',
                    solution: 'Scanner scanner = new Scanner(System.in);\nString input = scanner.nextLine();',
                    hints: ['Use System.in', 'Use nextLine()']
                  }
                ]
              }
            },
            {
              id: 'lesson_1_9',
              title: 'Debug Output',
              content: {
                theory: 'Convert Ruby debug output to Java logging',
                examples: [
                  {
                    source: `# Ruby
require 'debug'
debugger`,
                    target: `// Java
import java.util.logging.*;
Logger logger = Logger.getLogger("MyApp");
logger.info("Debug message");
logger.warning("Warning message");`,
                    explanation: 'Java uses the Logger class for debug output'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Add debug logging',
                    code: 'Logger logger = Logger.___("MyApp");\nlogger.___("Debug info");',
                    solution: 'Logger logger = Logger.getLogger("MyApp");\nlogger.info("Debug info");',
                    hints: ['Use getLogger', 'Use info method']
                  }
                ]
              }
            },
            {
              id: 'lesson_1_10',
              title: 'Output Review',
              content: {
                theory: 'Review all output methods',
                examples: [
                  {
                    source: `# Ruby
puts "Normal output"
STDERR.puts "Error"
printf("%.2f", 3.14)
p object # debug`,
                    target: `// Java
System.out.println("Normal output");
System.err.println("Error");
System.out.printf("%.2f", 3.14);
Logger.getLogger("MyApp").info(object.toString());`,
                    explanation: 'Java provides various output methods for different purposes'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Use different output methods',
                    code: 'System.out.___("Status: OK");\nSystem.___.println("Error!");\nSystem.out.___("Score: %.1f", 95.5);',
                    solution: 'System.out.println("Status: OK");\nSystem.err.println("Error!");\nSystem.out.printf("Score: %.1f", 95.5);',
                    hints: ['Use println', 'Use err', 'Use printf']
                  }
                ],
                quiz: [
                  {
                    question: 'Which Java class is used for console input?',
                    options: ['Input', 'Scanner', 'Reader', 'Console'],
                    answer: 1
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
