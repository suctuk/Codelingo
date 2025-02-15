export const javaScriptToJavaCurriculum = {
  sections: [
    {
      id: 'basics',
      title: 'Java Fundamentals for JavaScript Developers',
      description: 'Learn Java\'s static typing and class-based structure',
      units: [
        {
          id: 'unit_1',
          title: 'Java Program Structure',
          lessons: [
            {
              id: 'lesson_1_1',
              title: 'From Scripts to Classes',
              content: {
                theory: 'JavaScript files can contain loose code, but Java requires everything to be in a class',
                examples: [
                  {
                    source: `console.log("Hello World");
const name = "Alice";`,
                    target: `public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello World");
        String name = "Alice";
    }
}`,
                    explanation: 'Java requires a class and main method as the entry point'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert this JavaScript code to Java:',
                    code: `console.log("Starting app...");
const version = "1.0";
console.log(\`Version: \${version}\`);`,
                    solution: `public class Application {
    public static void main(String[] args) {
        System.out.println("Starting app...");
        String version = "1.0";
        System.out.println("Version: " + version);
    }
}`,
                    hints: [
                      'Create a class',
                      'Add main method',
                      'Use System.out.println',
                      'Use + for string concatenation'
                    ]
                  }
                ]
              }
            },
            {
              id: 'lesson_1_2',
              title: 'Variables and Types',
              content: {
                theory: 'JavaScript uses dynamic typing with let/const, Java requires explicit type declarations',
                examples: [
                  {
                    source: `let count = 0;
const name = "Alice";
let price = 9.99;`,
                    target: `int count = 0;
final String name = "Alice";
double price = 9.99;`,
                    explanation: 'Java requires type declarations and uses final instead of const'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert these JavaScript variables to Java:',
                    code: `let age = 25;
const PI = 3.14159;
let isActive = true;
let message = "Hello";`,
                    solution: `int age = 25;
final double PI = 3.14159;
boolean isActive = true;
String message = "Hello";`,
                    hints: [
                      'Add type declarations',
                      'Use final for constants',
                      'Match types: number -> int/double',
                      'boolean stays boolean'
                    ]
                  }
                ]
              }
            }
          ]
        },
        {
          id: 'unit_2',
          title: 'Functions to Methods',
          lessons: [
            {
              id: 'lesson_2_1',
              title: 'Converting Functions',
              content: {
                theory: 'JavaScript functions become methods in Java classes',
                examples: [
                  {
                    source: `function add(a, b) {
    return a + b;
}`,
                    target: `public class Calculator {
    public static int add(int a, int b) {
        return a + b;
    }
}`,
                    explanation: 'Java methods need a class, access modifier, and type declarations'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert this JavaScript function to a Java method:',
                    code: `function calculateArea(width, height) {
    return width * height;
}`,
                    solution: `public class Geometry {
    public static double calculateArea(double width, double height) {
        return width * height;
    }
}`,
                    hints: [
                      'Create a class',
                      'Add public static',
                      'Specify return type',
                      'Add parameter types'
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
      id: 'objects',
      title: 'Objects and Classes',
      description: 'Learn Java\'s class-based OOP coming from JavaScript',
      units: [
        {
          id: 'unit_1',
          title: 'From Objects to Classes',
          lessons: [
            {
              id: 'lesson_1_1',
              title: 'Object Literals to Classes',
              content: {
                theory: 'JavaScript object literals become full classes in Java',
                examples: [
                  {
                    source: `const user = {
    name: "Alice",
    age: 25,
    greet() {
        console.log("Hello, " + this.name);
    }
};`,
                    target: `public class User {
    private String name;
    private int age;
    
    public User(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    public void greet() {
        System.out.println("Hello, " + name);
    }
}`,
                    explanation: 'Java requires explicit class definition with constructor and fields'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert this JavaScript object to a Java class:',
                    code: `const product = {
    id: 1,
    name: "Phone",
    price: 599.99,
    getInfo() {
        return \`\${this.name}: $\${this.price}\`;
    }
};`,
                    solution: `public class Product {
    private int id;
    private String name;
    private double price;
    
    public Product(int id, String name, double price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
    
    public String getInfo() {
        return name + ": $" + price;
    }
}`,
                    hints: [
                      'Create fields with types',
                      'Add constructor',
                      'Convert method',
                      'Use + for string concatenation'
                    ]
                  }
                ]
              }
            }
          ]
        },
        {
          id: 'unit_2',
          title: 'Arrays and Collections',
          lessons: [
            {
              id: 'lesson_2_1',
              title: 'Array Methods',
              content: {
                theory: 'JavaScript array methods need to be converted to Java collections or loops',
                examples: [
                  {
                    source: `const numbers = [1, 2, 3];
const doubled = numbers.map(n => n * 2);
const sum = numbers.reduce((a, b) => a + b, 0);`,
                    target: `import java.util.ArrayList;
import java.util.List;

public class ArrayDemo {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3);
        List<Integer> doubled = numbers.stream()
            .map(n -> n * 2)
            .collect(Collectors.toList());
        int sum = numbers.stream()
            .reduce(0, (a, b) -> a + b);
    }
}`,
                    explanation: 'Java uses streams for functional operations on collections'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert this JavaScript array code to Java:',
                    code: `const names = ["Alice", "Bob", "Charlie"];
const filtered = names.filter(name => name.length > 3);
const upper = names.map(name => name.toUpperCase());`,
                    solution: `import java.util.List;
import java.util.stream.Collectors;

public class ArrayDemo {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("Alice", "Bob", "Charlie");
        List<String> filtered = names.stream()
            .filter(name -> name.length() > 3)
            .collect(Collectors.toList());
        List<String> upper = names.stream()
            .map(String::toUpperCase)
            .collect(Collectors.toList());
    }
}`,
                    hints: [
                      'Use List instead of array',
                      'Import necessary classes',
                      'Use stream() for operations',
                      'Collect results to new List'
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
