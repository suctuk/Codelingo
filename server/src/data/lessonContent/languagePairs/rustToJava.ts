import { LanguagePairCurriculum } from '../curriculumTemplate';
import { generateLesson, commonConcepts } from '../lessonGenerator';
import { languageConfigs } from '../languagePairFactory';

const rustToJavaSpecificConcepts = {
  'option-to-optional': {
    source: 'fn find_user(id: i32) -> Option<User> {\n    if id > 0 {\n        Some(User { id })\n    } else {\n        None\n    }\n}',
    target: 'public Optional<User> findUser(int id) {\n    if (id > 0) {\n        return Optional.of(new User(id));\n    }\n    return Optional.empty();\n}',
    explanation: 'Rust Option becomes Java Optional',
    examples: [
      {
        source: 'match result {\n    Some(value) => println!("{}", value),\n    None => println!("No value"),\n}',
        target: 'result.ifPresentOrElse(\n    value -> System.out.println(value),\n    () -> System.out.println("No value")\n);',
        explanation: 'Option matching becomes Optional methods'
      }
    ]
  },
  'result-to-exception': {
    source: 'fn divide(x: f64, y: f64) -> Result<f64, &\'static str> {\n    if y == 0.0 {\n        Err("division by zero")\n    } else {\n        Ok(x / y)\n    }\n}',
    target: 'public double divide(double x, double y) throws ArithmeticException {\n    if (y == 0.0) {\n        throw new ArithmeticException("division by zero");\n    }\n    return x / y;\n}',
    explanation: 'Rust Results become Java exceptions',
    examples: [
      {
        source: 'let result = match divide(10.0, 2.0) {\n    Ok(v) => v,\n    Err(e) => panic!(e),\n};',
        target: 'double result;\ntry {\n    result = divide(10.0, 2.0);\n} catch (ArithmeticException e) {\n    throw new RuntimeException(e);\n}',
        explanation: 'Result matching becomes try-catch'
      }
    ]
  },
  'struct-impl': {
    source: 'struct Point {\n    x: f64,\n    y: f64,\n}\n\nimpl Point {\n    fn new(x: f64, y: f64) -> Point {\n        Point { x, y }\n    }\n}',
    target: 'public class Point {\n    private final double x;\n    private final double y;\n    \n    public Point(double x, double y) {\n        this.x = x;\n        this.y = y;\n    }\n    \n    public static Point of(double x, double y) {\n        return new Point(x, y);\n    }\n}',
    explanation: 'Rust structs and impls become Java classes',
    examples: [
      {
        source: 'impl Point {\n    fn distance(&self) -> f64 {\n        (self.x * self.x + self.y * self.y).sqrt()\n    }\n}',
        target: 'public class Point {\n    public double distance() {\n        return Math.sqrt(x * x + y * y);\n    }\n}',
        explanation: 'Methods become instance methods'
      }
    ]
  }
};

export const rustToJava: LanguagePairCurriculum = {
  sourceLanguage: 'Rust',
  targetLanguage: 'Java',
  sections: [
    {
      id: 'section_1_fundamentals',
      title: 'Java Fundamentals for Rust Developers',
      description: 'Learn Java basics coming from Rust',
      units: [
        {
          id: 'unit_1_1_basics',
          title: 'Basic Syntax',
          description: 'Learn Java syntax differences from Rust',
          lessons: [
            {
              id: 'lesson_1_1_1',
              title: 'Variables and Types',
              content: {
                theory: 'Java uses similar static typing but with different type names',
                difficulty: 'beginner',
                xpPoints: 15,
                examples: [
                  {
                    source: 'let x: i32 = 42;\nlet mut y: String = String::from("hello");',
                    target: 'int x = 42;\nString y = "hello";',
                    explanation: 'Java has similar but simpler type declarations'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert this Rust code to Java',
                    code: 'let name: String = String::from("John");\nlet age: i32 = 30;\nprintln!("{} is {} years old", name, age);',
                    solution: 'public class Main {\n    public static void main(String[] args) {\n        String name = "John";\n        int age = 30;\n        System.out.printf("%s is %d years old%n", name, age);\n    }\n}',
                    hints: [
                      'Add class wrapper',
                      'Add main method',
                      'Use System.out.printf',
                      'Use %s for strings, %d for integers'
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
          id: 'unit_1_2_classes',
          title: 'Classes and Objects',
          description: 'Learn Java classes compared to Rust structs',
          lessons: [
            {
              id: 'lesson_1_2_1',
              title: 'Class Structure',
              content: {
                theory: 'Java uses classes for both data and behavior',
                difficulty: 'beginner',
                xpPoints: 20,
                examples: [
                  {
                    source: 'struct User {\n    name: String,\n    age: i32,\n}\n\nimpl User {\n    fn new(name: String, age: i32) -> User {\n        User { name, age }\n    }\n}',
                    target: 'public class User {\n    private final String name;\n    private final int age;\n    \n    public User(String name, int age) {\n        this.name = name;\n        this.age = age;\n    }\n    \n    public static User of(String name, int age) {\n        return new User(name, age);\n    }\n}',
                    explanation: 'Structs and impls combine into classes'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert this Rust struct and impl to Java',
                    code: 'struct Circle {\n    radius: f64,\n}\n\nimpl Circle {\n    fn new(radius: f64) -> Circle {\n        Circle { radius }\n    }\n    \n    fn area(&self) -> f64 {\n        std::f64::consts::PI * self.radius * self.radius\n    }\n}',
                    solution: 'public class Circle {\n    private final double radius;\n    \n    public Circle(double radius) {\n        this.radius = radius;\n    }\n    \n    public static Circle of(double radius) {\n        return new Circle(radius);\n    }\n    \n    public double area() {\n        return Math.PI * radius * radius;\n    }\n}',
                    hints: [
                      'Combine struct and impl',
                      'Add access modifiers',
                      'Use Math.PI constant',
                      'Add factory method'
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
      title: 'Advanced Java Features',
      description: 'Learn Java-specific patterns coming from Rust',
      units: [
        {
          id: 'unit_2_1_generics',
          title: 'Generic Types',
          description: 'Learn Java generics compared to Rust',
          lessons: [
            {
              id: 'lesson_2_1_1',
              title: 'Generic Classes',
              content: {
                theory: 'Java and Rust both support generic types with similar syntax',
                difficulty: 'intermediate',
                xpPoints: 30,
                examples: [
                  {
                    source: 'struct Container<T> {\n    value: T,\n}\n\nimpl<T> Container<T> {\n    fn new(value: T) -> Container<T> {\n        Container { value }\n    }\n}',
                    target: 'public class Container<T> {\n    private final T value;\n    \n    public Container(T value) {\n        this.value = value;\n    }\n    \n    public static <T> Container<T> of(T value) {\n        return new Container<>(value);\n    }\n}',
                    explanation: 'Generic structs become generic classes'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert this Rust generic struct to Java',
                    code: 'struct Pair<T, U> {\n    first: T,\n    second: U,\n}\n\nimpl<T, U> Pair<T, U> {\n    fn new(first: T, second: U) -> Pair<T, U> {\n        Pair { first, second }\n    }\n}',
                    solution: 'public class Pair<T, U> {\n    private final T first;\n    private final U second;\n    \n    public Pair(T first, U second) {\n        this.first = first;\n        this.second = second;\n    }\n    \n    public static <T, U> Pair<T, U> of(T first, U second) {\n        return new Pair<>(first, second);\n    }\n    \n    public T getFirst() {\n        return first;\n    }\n    \n    public U getSecond() {\n        return second;\n    }\n}',
                    hints: [
                      'Add access modifiers',
                      'Create getters',
                      'Add factory method',
                      'Use diamond operator'
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
    prerequisites: ['Basic Rust knowledge'],
    learningOutcomes: [
      'Write Java code confidently',
      'Understand key differences between Rust and Java',
      'Use Java\'s object-oriented features',
      'Work with Java classes and interfaces',
      'Handle exceptions effectively'
    ]
  }
};
