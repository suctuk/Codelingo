import { createLanguagePairCurriculum } from './languagePairFactory';

export const pythonToJavaCurriculum = {
  ...createLanguagePairCurriculum('python', 'java'),
  sections: [
    {
      id: 'section_1_basics',
      title: 'Java Fundamentals',
      description: 'Learn Java basics from a Python perspective',
      units: [
        {
          id: 'unit_1_output',
          title: 'Console Output',
          description: 'Learn Java print statements',
          skillLevel: 'beginner',
          xpToUnlock: 0,
          lessons: [
            {
              id: 'lesson_1_1',
              title: 'Hello Java',
              estimatedTime: 10,
              content: {
                theory: 'Converting Python print to Java System.out.println',
                difficulty: 'beginner',
                xpPoints: 10,
                examples: [
                  {
                    source: `print("Hello World")
print("Value:", 42)`,
                    target: `System.out.println("Hello World");
System.out.println("Value: " + 42);`,
                    explanation: 'Java uses System.out.println instead of print'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Convert Python print to Java',
                    code: '___.out.___("Hello Java");',
                    solution: 'System.out.println("Hello Java");',
                    hints: ['Use System.out.println'],
                    xpReward: 5
                  }
                ],
                practice: {
                  type: 'interactive_terminal',
                  instructions: 'Write a Java program that prints your name',
                  testCases: [
                    {
                      input: '',
                      expectedOutput: 'Alice',
                      code: `public class Main {
    public static void main(String[] args) {
        System.out.println("Alice");
    }
}`
                    }
                  ],
                  xpReward: 10
                }
              }
            },
            {
              id: 'lesson_1_2',
              title: 'Static Typing',
              estimatedTime: 15,
              content: {
                theory: 'Converting Python variables to Java with static typing',
                difficulty: 'beginner',
                xpPoints: 15,
                examples: [
                  {
                    source: `name = "Alice"    # str
age = 25         # int
height = 1.75    # float
active = True    # bool`,
                    target: `String name = "Alice";
int age = 25;
double height = 1.75;
boolean active = true;`,
                    explanation: 'Java requires explicit type declarations'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Add Java type declarations',
                    code: '___ name = "Bob";\n___ age = 30;\n___ score = 95.5;\n___ isActive = true;',
                    solution: 'String name = "Bob";\nint age = 30;\ndouble score = 95.5;\nboolean isActive = true;',
                    hints: ['Use String for text', 'Use int for integers', 'Use double for decimals'],
                    xpReward: 8
                  }
                ]
              }
            }
          ]
        },
        {
          id: 'unit_2_functions',
          title: 'Methods',
          description: 'Learn Java methods',
          skillLevel: 'beginner',
          xpToUnlock: 50,
          lessons: [
            {
              id: 'lesson_2_1',
              title: 'Method Definition',
              estimatedTime: 20,
              content: {
                theory: 'Converting Python functions to Java methods',
                difficulty: 'beginner',
                xpPoints: 20,
                examples: [
                  {
                    source: `def greet(name: str) -> str:
    return f"Hello, {name}"

def add(a: int, b: int) -> int:
    return a + b`,
                    target: `public static String greet(String name) {
    return "Hello, " + name;
}

public static int add(int a, int b) {
    return a + b;
}`,
                    explanation: 'Java methods need access modifiers and explicit return types'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Convert Python function to Java method',
                    code: '___ ___ int multiply(int a, int b) {\n    ___ a * b;\n}',
                    solution: 'public static int multiply(int a, int b) {\n    return a * b;\n}',
                    hints: ['Add public static', 'Use return keyword'],
                    xpReward: 10
                  }
                ]
              }
            }
          ]
        },
        {
          id: 'unit_3_classes',
          title: 'Classes',
          description: 'Learn Java classes',
          skillLevel: 'intermediate',
          xpToUnlock: 100,
          lessons: [
            {
              id: 'lesson_3_1',
              title: 'Class Definition',
              estimatedTime: 25,
              content: {
                theory: 'Converting Python classes to Java',
                difficulty: 'intermediate',
                xpPoints: 25,
                examples: [
                  {
                    source: `class Person:
    def __init__(self, name: str, age: int):
        self.name = name
        self.age = age
    
    def greet(self) -> str:
        return f"Hello, I'm {self.name}"`,
                    target: `public class Person {
    private String name;
    private int age;
    
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    public String greet() {
        return "Hello, I'm " + this.name;
    }
}`,
                    explanation: 'Java uses access modifiers and explicit constructors'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Convert Python class to Java',
                    code: 'public class Car {\n    ___ String model;\n    ___ int year;\n\n    ___ Car(___ model, ___ year) {\n        this.model = model;\n        this.year = year;\n    }\n}',
                    solution: 'public class Car {\n    private String model;\n    private int year;\n\n    public Car(String model, int year) {\n        this.model = model;\n        this.year = year;\n    }\n}',
                    hints: ['Use private for fields', 'Add public constructor', 'Add parameter types'],
                    xpReward: 15
                  }
                ],
                practice: {
                  type: 'code_project',
                  instructions: 'Create a Student class with name, grade, and a method to check if they passed',
                  testCases: [
                    {
                      input: 'new Student("Alice", 85)',
                      expectedOutput: 'true',
                      code: `public class Student {
    private String name;
    private int grade;
    
    public Student(String name, int grade) {
        this.name = name;
        this.grade = grade;
    }
    
    public boolean hasPassed() {
        return grade >= 60;
    }
}`
                    }
                  ],
                  xpReward: 25
                }
              }
            }
          ]
        }
      ]
    }
  ]
};
