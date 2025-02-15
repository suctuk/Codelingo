import { LanguagePairCurriculum } from '../curriculumTemplate';
import { generateLesson, commonConcepts } from '../lessonGenerator';
import { languageConfigs } from '../languagePairFactory';

const javaToRustSpecificConcepts = {
  'optional-to-option': {
    source: 'public Optional<User> findUser(int id) {\n    if (id > 0) {\n        return Optional.of(new User(id));\n    }\n    return Optional.empty();\n}',
    target: 'fn find_user(id: i32) -> Option<User> {\n    if id > 0 {\n        Some(User { id })\n    } else {\n        None\n    }\n}',
    explanation: 'Java Optional becomes Rust Option',
    examples: [
      {
        source: 'value.ifPresentOrElse(\n    v -> System.out.println(v),\n    () -> System.out.println("None")\n);',
        target: 'match value {\n    Some(v) => println!("{}", v),\n    None => println!("None"),\n}',
        explanation: 'Optional methods become match expressions'
      }
    ]
  },
  'exceptions-to-result': {
    source: 'public double divide(double x, double y) throws ArithmeticException {\n    if (y == 0) {\n        throw new ArithmeticException("division by zero");\n    }\n    return x / y;\n}',
    target: 'fn divide(x: f64, y: f64) -> Result<f64, &\'static str> {\n    if y == 0.0 {\n        Err("division by zero")\n    } else {\n        Ok(x / y)\n    }\n}',
    explanation: 'Java exceptions become Rust Results',
    examples: [
      {
        source: 'try {\n    double result = divide(10, 2);\n} catch (ArithmeticException e) {\n    System.err.println(e.getMessage());\n}',
        target: 'match divide(10.0, 2.0) {\n    Ok(result) => println!("{}", result),\n    Err(e) => eprintln!("{}", e),\n}',
        explanation: 'Try-catch blocks become match expressions'
      }
    ]
  },
  'class-to-struct': {
    source: 'public class Point {\n    private final double x;\n    private final double y;\n    \n    public Point(double x, double y) {\n        this.x = x;\n        this.y = y;\n    }\n}',
    target: 'struct Point {\n    x: f64,\n    y: f64,\n}\n\nimpl Point {\n    fn new(x: f64, y: f64) -> Point {\n        Point { x, y }\n    }\n}',
    explanation: 'Java classes become Rust structs with implementations',
    examples: [
      {
        source: 'public double distance() {\n    return Math.sqrt(x * x + y * y);\n}',
        target: 'fn distance(&self) -> f64 {\n    (self.x * self.x + self.y * self.y).sqrt()\n}',
        explanation: 'Instance methods take self parameter'
      }
    ]
  }
};

export const javaToRust: LanguagePairCurriculum = {
  sourceLanguage: 'Java',
  targetLanguage: 'Rust',
  sections: [
    {
      id: 'section_1_fundamentals',
      title: 'Rust Fundamentals for Java Developers',
      description: 'Learn Rust basics coming from Java',
      units: [
        {
          id: 'unit_1_1_basics',
          title: 'Basic Syntax',
          description: 'Learn Rust syntax differences from Java',
          lessons: [
            {
              id: 'lesson_1_1_1',
              title: 'Variables and Types',
              content: {
                theory: 'Rust uses similar static typing but with ownership system',
                difficulty: 'beginner',
                xpPoints: 15,
                examples: [
                  {
                    source: 'int x = 42;\nString y = "hello";',
                    target: 'let x: i32 = 42;\nlet y: String = String::from("hello");',
                    explanation: 'Rust requires explicit string ownership'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert this Java code to Rust',
                    code: 'public class Main {\n    public static void main(String[] args) {\n        String name = "John";\n        int age = 30;\n        System.out.printf("%s is %d years old%n", name, age);\n    }\n}',
                    solution: 'fn main() {\n    let name = String::from("John");\n    let age: i32 = 30;\n    println!("{} is {} years old", name, age);\n}',
                    hints: [
                      'Remove class wrapper',
                      'Use fn main()',
                      'Use String::from',
                      'Use println! macro'
                    ],
                    xpReward: 10
                  }
                ]
              },
              prerequisites: [],
              estimatedTime: 10
            }
          ],
          skillLevel: 'beginner',
          xpToUnlock: 0
        },
        {
          id: 'unit_1_2_structs',
          title: 'Structs and Implementations',
          description: 'Learn Rust structs compared to Java classes',
          lessons: [
            {
              id: 'lesson_1_2_1',
              title: 'Struct Basics',
              content: {
                theory: 'Rust separates data (structs) from behavior (impl)',
                difficulty: 'beginner',
                xpPoints: 20,
                examples: [
                  {
                    source: 'public class User {\n    private final String name;\n    private final int age;\n    \n    public User(String name, int age) {\n        this.name = name;\n        this.age = age;\n    }\n}',
                    target: 'struct User {\n    name: String,\n    age: i32,\n}\n\nimpl User {\n    fn new(name: String, age: i32) -> User {\n        User { name, age }\n    }\n}',
                    explanation: 'Classes split into struct and impl blocks'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert this Java class to Rust',
                    code: 'public class Circle {\n    private final double radius;\n    \n    public Circle(double radius) {\n        this.radius = radius;\n    }\n    \n    public double area() {\n        return Math.PI * radius * radius;\n    }\n}',
                    solution: 'struct Circle {\n    radius: f64,\n}\n\nimpl Circle {\n    fn new(radius: f64) -> Circle {\n        Circle { radius }\n    }\n    \n    fn area(&self) -> f64 {\n        std::f64::consts::PI * self.radius * self.radius\n    }\n}',
                    hints: [
                      'Split into struct and impl',
                      'Use f64 for double',
                      'Add self parameter',
                      'Use std::f64::consts::PI'
                    ],
                    xpReward: 15
                  }
                ]
              },
              prerequisites: [],
              estimatedTime: 15
            }
          ],
          skillLevel: 'beginner',
          xpToUnlock: 30
        }
      ],
      requiredSections: []
    },
    {
      id: 'section_2_advanced',
      title: 'Advanced Rust Features',
      description: 'Learn Rust-specific patterns coming from Java',
      units: [
        {
          id: 'unit_2_1_ownership',
          title: 'Ownership and Borrowing',
          description: 'Learn Rust\'s ownership system',
          lessons: [
            {
              id: 'lesson_2_1_1',
              title: 'Understanding Ownership',
              content: {
                theory: 'Rust\'s ownership system ensures memory safety without garbage collection',
                difficulty: 'intermediate',
                xpPoints: 30,
                examples: [
                  {
                    source: 'public void processString(String text) {\n    String modified = text.toUpperCase();\n    System.out.println(modified);\n}',
                    target: 'fn process_string(text: String) -> String {\n    let modified = text.to_uppercase();\n    println!("{}", modified);\n    modified\n}',
                    explanation: 'String ownership must be managed explicitly'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert this Java method to Rust with proper ownership',
                    code: 'public List<String> addItem(List<String> items, String item) {\n    items.add(item);\n    return items;\n}',
                    solution: 'fn add_item(mut items: Vec<String>, item: String) -> Vec<String> {\n    items.push(item);\n    items\n}',
                    hints: [
                      'Use Vec instead of List',
                      'Mark parameter as mutable',
                      'Take ownership of parameters',
                      'Return owned Vec'
                    ],
                    xpReward: 20
                  }
                ]
              },
              prerequisites: [],
              estimatedTime: 20
            }
          ],
          skillLevel: 'intermediate',
          xpToUnlock: 100
        }
      ],
      requiredSections: ['section_1_fundamentals']
    }
  ],
  metadata: {
    totalLessons: 300,
    estimatedHours: 40,
    difficulty: 'Beginner to Advanced',
    prerequisites: ['Basic Java knowledge'],
    learningOutcomes: [
      'Write Rust code confidently',
      'Understand Rust\'s ownership system',
      'Handle errors with Result',
      'Work with Rust structs and implementations',
      'Use Rust\'s type system effectively'
    ]
  }
};
