export const javaToRustCurriculum = {
  sections: [
    {
      id: 'basics',
      title: 'From Java to Rust: Getting Started',
      description: 'Learn how to translate Java concepts into Rust code',
      units: [
        {
          id: 'unit_1',
          title: 'Basic Type System',
          lessons: [
            {
              id: 'lesson_1_1',
              title: 'Types and Variables',
              content: {
                theory: 'Convert Java types to Rust types',
                examples: [
                  {
                    source: `// Java
int count = 42;
String name = "Alice";
boolean isActive = true;
double price = 9.99;
Integer nullableCount = null;
final double PI = 3.14159;`,
                    target: `// Rust
let count: i32 = 42;
let name: String = String::from("Alice");
let is_active: bool = true;
let price: f64 = 9.99;
let nullable_count: Option<i32> = None;
const PI: f64 = 3.14159;`,
                    explanation: 'Rust uses explicit types and Option for nullable values'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert these Java variables to Rust:',
                    statements: [
                      '// Java',
                      'long id = 1000L;',
                      'String[] names = {"Alice", "Bob"};',
                      'List<Integer> numbers = new ArrayList<>();',
                      'Map<String, Integer> scores = new HashMap<>();'
                    ],
                    solution: `// Rust
let id: i64 = 1000;
let names: Vec<String> = vec![String::from("Alice"), String::from("Bob")];
let mut numbers: Vec<i32> = Vec::new();
let mut scores: HashMap<String, i32> = HashMap::new();

// With type inference:
let id = 1000_i64;
let names = vec![String::from("Alice"), String::from("Bob")];
let mut numbers = Vec::new();
let mut scores = HashMap::new();`,
                    hints: [
                      'Use Vec for arrays/lists',
                      'HashMap for maps',
                      'String::from for strings',
                      'mut for mutability'
                    ]
                  }
                ]
              }
            },
            {
              id: 'lesson_1_2',
              title: 'Methods and Functions',
              content: {
                theory: 'Convert Java methods to Rust functions',
                examples: [
                  {
                    source: `// Java
public class Utils {
    public static String greet(String name) {
        return "Hello, " + name + "!";
    }
    
    public static int sum(int... numbers) {
        int total = 0;
        for (int n : numbers) {
            total += n;
        }
        return total;
    }
    
    public static String processUser(String name, int age, String city) {
        if (city == null) city = "Unknown";
        return name + " (" + age + ") from " + city;
    }
}`,
                    target: `// Rust
pub struct Utils;

impl Utils {
    pub fn greet(name: &str) -> String {
        format!("Hello, {}!", name)
    }
    
    pub fn sum(numbers: &[i32]) -> i32 {
        numbers.iter().sum()
    }
    
    pub fn process_user(name: &str, age: i32, city: Option<&str>) -> String {
        let city = city.unwrap_or("Unknown");
        format!("{} ({}) from {}", name, age, city)
    }
}`,
                    explanation: 'Rust uses impl blocks and references instead of static methods'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert these Java methods to Rust:',
                    statements: [
                      '// Java',
                      'public class StringUtils {',
                      '    public static String join(String... words) {',
                      '        return String.join(" ", words);',
                      '    }',
                      '    ',
                      '    public static String capitalize(String text) {',
                      '        if (text == null || text.isEmpty()) {',
                      '            return text;',
                      '        }',
                      '        return text.substring(0, 1).toUpperCase() +',
                      '               text.substring(1);',
                      '    }',
                      '}'
                    ],
                    solution: `// Rust
pub struct StringUtils;

impl StringUtils {
    pub fn join(words: &[&str]) -> String {
        words.join(" ")
    }
    
    pub fn capitalize(text: &str) -> String {
        if text.is_empty() {
            return String::new();
        }
        let mut chars = text.chars();
        match chars.next() {
            None => String::new(),
            Some(first) => first.to_uppercase().chain(chars).collect()
        }
    }
}`,
                    hints: [
                      'Use &str for string slices',
                      'String for owned strings',
                      'match for pattern matching',
                      'chain for concatenation'
                    ]
                  }
                ]
              }
            }
          ]
        },
        {
          id: 'unit_2',
          title: 'Classes and Traits',
          lessons: [
            {
              id: 'lesson_2_1',
              title: 'Class to Struct Conversion',
              content: {
                theory: 'Convert Java classes to Rust structs and traits',
                examples: [
                  {
                    source: `// Java
public interface Animal {
    String makeSound();
    String getName();
}

public class Dog implements Animal {
    private String name;
    private int age;
    
    public Dog(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    @Override
    public String makeSound() {
        return "Woof!";
    }
    
    @Override
    public String getName() {
        return name;
    }
    
    public void birthday() {
        age++;
    }
}`,
                    target: `// Rust
pub trait Animal {
    fn make_sound(&self) -> &str;
    fn get_name(&self) -> &str;
}

pub struct Dog {
    name: String,
    age: i32,
}

impl Dog {
    pub fn new(name: String, age: i32) -> Dog {
        Dog { name, age }
    }
    
    pub fn birthday(&mut self) {
        self.age += 1;
    }
}

impl Animal for Dog {
    fn make_sound(&self) -> &str {
        "Woof!"
    }
    
    fn get_name(&self) -> &str {
        &self.name
    }
}`,
                    explanation: 'Rust uses traits instead of interfaces and separates implementation'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert this Java class hierarchy to Rust:',
                    statements: [
                      '// Java',
                      'public interface Shape {',
                      '    double area();',
                      '    double perimeter();',
                      '}',
                      '',
                      'public class Circle implements Shape {',
                      '    private double radius;',
                      '    ',
                      '    public Circle(double radius) {',
                      '        this.radius = radius;',
                      '    }',
                      '    ',
                      '    @Override',
                      '    public double area() {',
                      '        return Math.PI * radius * radius;',
                      '    }',
                      '    ',
                      '    @Override',
                      '    public double perimeter() {',
                      '        return 2 * Math.PI * radius;',
                      '    }',
                      '}'
                    ],
                    solution: `// Rust
pub trait Shape {
    fn area(&self) -> f64;
    fn perimeter(&self) -> f64;
}

pub struct Circle {
    radius: f64,
}

impl Circle {
    pub fn new(radius: f64) -> Circle {
        Circle { radius }
    }
}

impl Shape for Circle {
    fn area(&self) -> f64 {
        std::f64::consts::PI * self.radius * self.radius
    }
    
    fn perimeter(&self) -> f64 {
        2.0 * std::f64::consts::PI * self.radius
    }
}`,
                    hints: [
                      'Use trait for interface',
                      'Separate impl blocks',
                      'f64 for double',
                      'std::f64::consts::PI'
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
      title: 'Advanced Features',
      description: 'Learn Rust-specific features coming from Java',
      units: [
        {
          id: 'unit_1',
          title: 'Error Handling',
          lessons: [
            {
              id: 'lesson_1_1',
              title: 'From Exceptions to Results',
              content: {
                theory: 'Convert Java exceptions to Rust Result type',
                examples: [
                  {
                    source: `// Java
public class DivisionException extends Exception {
    public DivisionException(String message) {
        super(message);
    }
}

public class Calculator {
    public static double divide(double a, double b) throws DivisionException {
        if (b == 0) {
            throw new DivisionException("division by zero");
        }
        return a / b;
    }
}

try {
    double result = Calculator.divide(10, 0);
} catch (DivisionException e) {
    System.err.println(e.getMessage());
}`,
                    target: `// Rust
#[derive(Debug)]
pub struct DivisionError(String);

impl std::fmt::Display for DivisionError {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
        write!(f, "{}", self.0)
    }
}

impl std::error::Error for DivisionError {}

pub struct Calculator;

impl Calculator {
    pub fn divide(a: f64, b: f64) -> Result<f64, DivisionError> {
        if b == 0.0 {
            Err(DivisionError(String::from("division by zero")))
        } else {
            Ok(a / b)
        }
    }
}

match Calculator::divide(10.0, 0.0) {
    Ok(result) => println!("Result: {}", result),
    Err(e) => eprintln!("Error: {}", e),
}`,
                    explanation: 'Rust uses Result type and match expressions for error handling'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert this Java error handling to Rust:',
                    statements: [
                      '// Java',
                      'public class ParseError extends Exception {',
                      '    public ParseError(String message) {',
                      '        super(message);',
                      '    }',
                      '}',
                      '',
                      'public class Parser {',
                      '    public static int parse(String text) throws ParseError {',
                      '        try {',
                      '            return Integer.parseInt(text);',
                      '        } catch (NumberFormatException e) {',
                      '            throw new ParseError("invalid number");',
                      '        }',
                      '    }',
                      '}'
                    ],
                    solution: `// Rust
#[derive(Debug)]
pub struct ParseError(String);

impl std::fmt::Display for ParseError {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
        write!(f, "{}", self.0)
    }
}

impl std::error::Error for ParseError {}

pub struct Parser;

impl Parser {
    pub fn parse(text: &str) -> Result<i32, ParseError> {
        text.parse()
            .map_err(|_| ParseError(String::from("invalid number")))
    }
}`,
                    hints: [
                      'Use Result for errors',
                      'impl Display trait',
                      'map_err for conversion',
                      'parse() for strings'
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
