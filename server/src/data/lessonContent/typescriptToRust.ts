export const typescriptToRustCurriculum = {
  sections: [
    {
      id: 'basics',
      title: 'From TypeScript to Rust: Getting Started',
      description: 'Learn how to translate TypeScript concepts into Rust code',
      units: [
        {
          id: 'unit_1',
          title: 'Type System Translation',
          lessons: [
            {
              id: 'lesson_1_1',
              title: 'Basic Types',
              content: {
                theory: 'Convert TypeScript types to Rust types',
                examples: [
                  {
                    source: `// TypeScript
let count: number = 42;
let name: string = "Alice";
let active: boolean = true;
let numbers: number[] = [1, 2, 3];
let tuple: [string, number] = ["hello", 42];`,
                    target: `// Rust
let count: i32 = 42;
let name: String = String::from("Alice");
let active: bool = true;
let numbers: Vec<i32> = vec![1, 2, 3];
let tuple: (String, i32) = (String::from("hello"), 42);`,
                    explanation: 'Rust has more specific numeric types and explicit string ownership'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert these TypeScript types to Rust:',
                    statements: [
                      '// TypeScript',
                      'let id: number | null = null;',
                      'let names: string[] = ["A", "B"];',
                      'let pair: [number, string] = [1, "one"];',
                      'let size: "small" | "medium" | "large" = "medium";'
                    ],
                    solution: `// Rust
let id: Option<i32> = None;
let names: Vec<String> = vec![String::from("A"), String::from("B")];
let pair: (i32, String) = (1, String::from("one"));

enum Size {
    Small,
    Medium,
    Large,
}
let size: Size = Size::Medium;`,
                    hints: [
                      'Use Option for nullable',
                      'Vec for arrays',
                      'Tuples with ()',
                      'Enums for unions'
                    ]
                  }
                ]
              }
            },
            {
              id: 'lesson_1_2',
              title: 'Interfaces and Traits',
              content: {
                theory: 'Convert TypeScript interfaces to Rust traits',
                examples: [
                  {
                    source: `// TypeScript
interface Animal {
    name: string;
    makeSound(): void;
    getAge(): number;
}

class Dog implements Animal {
    constructor(private name: string, private age: number) {}
    
    makeSound(): void {
        console.log("Woof!");
    }
    
    getAge(): number {
        return this.age;
    }
}`,
                    target: `// Rust
trait Animal {
    fn make_sound(&self);
    fn get_age(&self) -> i32;
    fn get_name(&self) -> &str;
}

struct Dog {
    name: String,
    age: i32,
}

impl Dog {
    fn new(name: String, age: i32) -> Dog {
        Dog { name, age }
    }
}

impl Animal for Dog {
    fn make_sound(&self) {
        println!("Woof!");
    }
    
    fn get_age(&self) -> i32 {
        self.age
    }
    
    fn get_name(&self) -> &str {
        &self.name
    }
}`,
                    explanation: 'Rust uses traits instead of interfaces and separates data from implementation'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert this TypeScript interface to Rust:',
                    statements: [
                      '// TypeScript',
                      'interface Shape {',
                      '    area(): number;',
                      '    perimeter(): number;',
                      '}',
                      '',
                      'class Circle implements Shape {',
                      '    constructor(private radius: number) {}',
                      '',
                      '    area(): number {',
                      '        return Math.PI * this.radius ** 2;',
                      '    }',
                      '',
                      '    perimeter(): number {',
                      '        return 2 * Math.PI * this.radius;',
                      '    }',
                      '}'
                    ],
                    solution: `// Rust
trait Shape {
    fn area(&self) -> f64;
    fn perimeter(&self) -> f64;
}

struct Circle {
    radius: f64,
}

impl Circle {
    fn new(radius: f64) -> Circle {
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
                      'Separate data and impl',
                      'Use f64 for float',
                      'Add &self for methods'
                    ]
                  }
                ]
              }
            }
          ]
        },
        {
          id: 'unit_2',
          title: 'Ownership and Borrowing',
          lessons: [
            {
              id: 'lesson_2_1',
              title: 'Understanding Ownership',
              content: {
                theory: 'Learn how Rust\'s ownership model differs from TypeScript references',
                examples: [
                  {
                    source: `// TypeScript
class Container {
    constructor(private data: string) {}
    
    getData(): string {
        return this.data;
    }
}

let c1 = new Container("hello");
let c2 = c1;  // Both reference same data
console.log(c1.getData());  // Works fine`,
                    target: `// Rust
struct Container {
    data: String,
}

impl Container {
    fn new(data: String) -> Container {
        Container { data }
    }
    
    fn get_data(&self) -> &str {
        &self.data
    }
}

let c1 = Container::new(String::from("hello"));
let c2 = c1;  // Ownership moved to c2
// println!("{}", c1.get_data());  // Would not compile!
println!("{}", c2.get_data());  // Works`,
                    explanation: 'Rust enforces single ownership, while TypeScript allows multiple references'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert this TypeScript code to handle Rust ownership:',
                    statements: [
                      '// TypeScript',
                      'class Message {',
                      '    constructor(private text: string) {}',
                      '    ',
                      '    share(): Message {',
                      '        return new Message(this.text);',
                      '    }',
                      '    ',
                      '    append(other: Message): void {',
                      '        this.text += other.text;',
                      '    }',
                      '}'
                    ],
                    solution: `// Rust
struct Message {
    text: String,
}

impl Message {
    fn new(text: String) -> Message {
        Message { text }
    }
    
    fn share(&self) -> Message {
        Message { text: self.text.clone() }
    }
    
    fn append(&mut self, other: &Message) {
        self.text.push_str(&other.text);
    }
}`,
                    hints: [
                      'Use clone for copying',
                      'Use &mut for mutable refs',
                      'Use & for borrowing',
                      'Explicit ownership transfer'
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
      title: 'Advanced Type Patterns',
      description: 'Learn how to translate advanced TypeScript types to Rust',
      units: [
        {
          id: 'unit_1',
          title: 'Generics and Constraints',
          lessons: [
            {
              id: 'lesson_1_1',
              title: 'Generic Types',
              content: {
                theory: 'Convert TypeScript generics to Rust generics',
                examples: [
                  {
                    source: `// TypeScript
interface Box<T> {
    value: T;
}

interface Printable {
    toString(): string;
}

class PrintableBox<T extends Printable> {
    constructor(private value: T) {}
    
    print(): void {
        console.log(this.value.toString());
    }
}`,
                    target: `// Rust
struct Box<T> {
    value: T,
}

trait Printable {
    fn to_string(&self) -> String;
}

struct PrintableBox<T: Printable> {
    value: T,
}

impl<T: Printable> PrintableBox<T> {
    fn new(value: T) -> PrintableBox<T> {
        PrintableBox { value }
    }
    
    fn print(&self) {
        println!("{}", self.value.to_string());
    }
}`,
                    explanation: 'Rust uses trait bounds instead of extends for constraints'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert these TypeScript generics to Rust:',
                    statements: [
                      '// TypeScript',
                      'interface Pair<T, U> {',
                      '    first: T;',
                      '    second: U;',
                      '}',
                      '',
                      'interface Sized {',
                      '    getSize(): number;',
                      '}',
                      '',
                      'class Container<T extends Sized> {',
                      '    constructor(private item: T) {}',
                      '    ',
                      '    size(): number {',
                      '        return this.item.getSize();',
                      '    }',
                      '}'
                    ],
                    solution: `// Rust
struct Pair<T, U> {
    first: T,
    second: U,
}

trait Sized {
    fn get_size(&self) -> i32;
}

struct Container<T: Sized> {
    item: T,
}

impl<T: Sized> Container<T> {
    fn new(item: T) -> Container<T> {
        Container { item }
    }
    
    fn size(&self) -> i32 {
        self.item.get_size()
    }
}`,
                    hints: [
                      'Use trait bounds',
                      'Implement for generic type',
                      'Separate impl block',
                      'Use associated functions'
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
