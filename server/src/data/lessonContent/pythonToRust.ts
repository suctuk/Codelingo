export const pythonToRustCurriculum = {
  sections: [
    {
      id: 'section_1_basics',
      title: 'Rust Fundamentals',
      description: 'Learn Rust fundamentals from a Python perspective',
      units: [
        {
          id: 'unit_1_output',
          title: 'Console Output',
          lessons: [
            {
              id: 'lesson_1_1',
              title: 'Basic Output',
              content: {
                theory: 'Convert Python print to Rust println!',
                examples: [
                  {
                    source: `# Python
print("Hello World")
print("Value:", 42)`,
                    target: `// Rust
println!("Hello World");
println!("Value: {}", 42);`,
                    explanation: 'Rust uses println! macro with {} placeholders'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Print "Hello Rust"',
                    code: '___!("Hello Rust");',
                    solution: 'println!("Hello Rust");',
                    hints: ['Use println! macro']
                  }
                ],
                quiz: [
                  {
                    question: 'What macro is used for output in Rust?',
                    options: ['print()', 'println!()', 'System.out.println()', 'console.log()'],
                    answer: 1
                  }
                ]
              }
            }
          ]
        },
        {
          id: 'unit_2_types',
          title: 'Type System',
          lessons: [
            {
              id: 'lesson_2_1',
              title: 'Type Declarations',
              content: {
                theory: 'Converting Python type hints to Rust types',
                examples: [
                  {
                    source: `# Python
from typing import List

name: str = "Alice"
age: int = 25
active: bool = True
scores: List[int] = [1, 2, 3]`,
                    target: `// Rust
let name: &str = "Alice";
let age: i32 = 25;
let active: bool = true;
let scores: Vec<i32> = vec![1, 2, 3];`,
                    explanation: 'Rust has static typing with different type names'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Add type declarations',
                    code: 'let name: ___ = "Bob";\nlet numbers: ___<___> = vec![1, 2, 3];',
                    solution: 'let name: &str = "Bob";\nlet numbers: Vec<i32> = vec![1, 2, 3];',
                    hints: ['Use &str for string literals', 'Use Vec<T> for vectors']
                  }
                ]
              }
            },
            {
              id: 'lesson_2_2',
              title: 'Structs and Traits',
              content: {
                theory: 'Converting Python classes to Rust structs and traits',
                examples: [
                  {
                    source: `# Python
@dataclass
class User:
    name: str
    age: int
    
    def greet(self):
        print(f"Hello, {self.name}")`,
                    target: `// Rust
struct User {
    name: String,
    age: i32,
}

impl User {
    fn new(name: String, age: i32) -> User {
        User { name, age }
    }
    
    fn greet(&self) {
        println!("Hello, {}", self.name);
    }
}`,
                    explanation: 'Rust separates data (struct) from behavior (impl)'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Create a struct and implementation',
                    code: '___ Product {\n    id: i32,\n    name: String,\n}\n\n___ Product {\n    fn new(id: i32, name: String) -> Product {\n        Product { ___, ___ }\n    }\n}',
                    solution: 'struct Product {\n    id: i32,\n    name: String,\n}\n\nimpl Product {\n    fn new(id: i32, name: String) -> Product {\n        Product { id, name }\n    }\n}',
                    hints: ['Use struct keyword', 'Use impl keyword']
                  }
                ]
              }
            }
          ]
        },
        {
          id: 'unit_3_ownership',
          title: 'Ownership and Borrowing',
          lessons: [
            {
              id: 'lesson_3_1',
              title: 'Understanding Ownership',
              content: {
                theory: 'Learning Rust\'s ownership system (no Python equivalent)',
                examples: [
                  {
                    source: `# Python
# Python handles memory automatically
text = "hello"
another = text  # Creates a reference
print(text)     # Still valid
print(another)  # Also valid`,
                    target: `// Rust
let text = String::from("hello");
let another = text;        // Moves ownership
// println!("{}", text);   // Error: text was moved
println!("{}", another);   // Valid: another owns the string`,
                    explanation: 'Rust enforces single ownership of values'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Fix ownership issues',
                    code: 'let s1 = String::from("hello");\nlet s2 = ___(&s1);\nprintln!("{}, {}", s1, s2);',
                    solution: 'let s1 = String::from("hello");\nlet s2 = String::from(&s1);\nprintln!("{}, {}", s1, s2);',
                    hints: ['Create new String from reference']
                  }
                ]
              }
            },
            {
              id: 'lesson_3_2',
              title: 'References and Borrowing',
              content: {
                theory: 'Understanding Rust\'s borrowing rules',
                examples: [
                  {
                    source: `# Python
class Counter:
    def __init__(self):
        self.count = 0
    
    def increment(self):
        self.count += 1`,
                    target: `// Rust
struct Counter {
    count: i32,
}

impl Counter {
    fn new() -> Counter {
        Counter { count: 0 }
    }
    
    fn increment(&mut self) {
        self.count += 1;
    }
}`,
                    explanation: 'Rust requires explicit mutability'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Implement borrowing',
                    code: 'fn print_name(___ name: &String) {\n    println!("{}", name);\n}\n\nfn change_name(___ name: &mut String) {\n    name.push_str(" Smith");\n}',
                    solution: 'fn print_name(name: &String) {\n    println!("{}", name);\n}\n\nfn change_name(name: &mut String) {\n    name.push_str(" Smith");\n}',
                    hints: ['Use & for immutable references', 'Use &mut for mutable references']
                  }
                ]
              }
            }
          ]
        },
        {
          id: 'unit_4_error_handling',
          title: 'Error Handling',
          lessons: [
            {
              id: 'lesson_4_1',
              title: 'Result Type',
              content: {
                theory: 'Converting Python exceptions to Rust Result',
                examples: [
                  {
                    source: `# Python
def divide(a: int, b: int) -> float:
    if b == 0:
        raise ValueError("Division by zero")
    return a / b`,
                    target: `// Rust
fn divide(a: i32, b: i32) -> Result<f64, &'static str> {
    if b == 0 {
        Err("Division by zero")
    } else {
        Ok(a as f64 / b as f64)
    }
}`,
                    explanation: 'Rust uses Result for error handling'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Implement Result handling',
                    code: 'fn get_index(v: &Vec<i32>, i: usize) -> Result<i32, &\'static str> {\n    if i >= v.len() {\n        ___(\"Index out of bounds\")\n    } else {\n        ___(v[i])\n    }\n}',
                    solution: 'fn get_index(v: &Vec<i32>, i: usize) -> Result<i32, &\'static str> {\n    if i >= v.len() {\n        Err("Index out of bounds")\n    } else {\n        Ok(v[i])\n    }\n}',
                    hints: ['Use Err for errors', 'Use Ok for success']
                  }
                ]
              }
            },
            {
              id: 'lesson_4_2',
              title: 'Option Type',
              content: {
                theory: 'Converting Python None to Rust Option',
                examples: [
                  {
                    source: `# Python
def find_first(items: List[int]) -> Optional[int]:
    return items[0] if items else None`,
                    target: `// Rust
fn find_first(items: &Vec<i32>) -> Option<i32> {
    items.first().copied()
}`,
                    explanation: 'Rust uses Option for optional values'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Implement Option handling',
                    code: 'fn get_name(names: &Vec<String>, index: usize) -> Option<___> {\n    names.get(index).___().___\n}',
                    solution: 'fn get_name(names: &Vec<String>, index: usize) -> Option<String> {\n    names.get(index).cloned().into()\n}',
                    hints: ['Use String type', 'Use cloned() for ownership']
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
