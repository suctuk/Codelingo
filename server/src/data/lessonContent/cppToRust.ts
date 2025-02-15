export const cppToRustCurriculum = {
  sections: [
    {
      id: 'basics',
      title: 'From C++ to Rust: Getting Started',
      description: 'Learn how to translate C++ concepts into Rust code',
      units: [
        {
          id: 'unit_1',
          title: 'Basic Memory Management',
          lessons: [
            {
              id: 'lesson_1_1',
              title: 'Ownership and References',
              content: {
                theory: 'Convert C++ pointers and references to Rust ownership model',
                examples: [
                  {
                    source: `// C++
std::string* name = new std::string("Alice");
std::cout << *name;
delete name;

std::string value = "Hello";
std::string& ref = value;
ref = "World";

std::shared_ptr<int> count = std::make_shared<int>(42);
std::unique_ptr<int> id(new int(100));`,
                    target: `// Rust
let name = String::from("Alice");
println!("{}", name);
// No manual deletion needed

let mut value = String::from("Hello");
let ref_value = &mut value;
*ref_value = String::from("World");

// No shared_ptr needed - Rust handles sharing through references
let count = 42;
let id = 100;`,
                    explanation: 'Rust manages memory through ownership and borrowing'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert this C++ memory management code to Rust:',
                    statements: [
                      '// C++',
                      'class Buffer {',
                      '    int* data;',
                      '    size_t size;',
                      'public:',
                      '    Buffer(size_t n) : size(n) {',
                      '        data = new int[n];',
                      '    }',
                      '    ~Buffer() {',
                      '        delete[] data;',
                      '    }',
                      '    void set(size_t i, int v) {',
                      '        if (i < size) data[i] = v;',
                      '    }',
                      '};'
                    ],
                    solution: `// Rust
struct Buffer {
    data: Vec<i32>,
}

impl Buffer {
    fn new(size: usize) -> Buffer {
        Buffer {
            data: vec![0; size],
        }
    }
    
    fn set(&mut self, i: usize, v: i32) {
        if i < self.data.len() {
            self.data[i] = v;
        }
    }
}`,
                    hints: [
                      'Use Vec for dynamic arrays',
                      'No manual deallocation',
                      'Methods take &mut self',
                      'Bounds checking included'
                    ]
                  }
                ]
              }
            },
            {
              id: 'lesson_1_2',
              title: 'Smart Pointers',
              content: {
                theory: 'Convert C++ smart pointers to Rust types',
                examples: [
                  {
                    source: `// C++
class Resource {
    std::string data;
public:
    Resource(const std::string& d) : data(d) {}
};

std::unique_ptr<Resource> r1(new Resource("unique"));
std::shared_ptr<Resource> r2 = std::make_shared<Resource>("shared");
std::weak_ptr<Resource> r3 = r2;`,
                    target: `// Rust
struct Resource {
    data: String,
}

impl Resource {
    fn new(data: &str) -> Resource {
        Resource {
            data: String::from(data),
        }
    }
}

// Unique ownership
let r1 = Resource::new("unique");

// Shared ownership using Rc
use std::rc::Rc;
let r2 = Rc::new(Resource::new("shared"));

// Weak reference
use std::rc::Weak;
let r3 = Rc::downgrade(&r2);`,
                    explanation: 'Rust uses Rc and Weak for shared ownership when needed'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert these C++ smart pointers to Rust:',
                    statements: [
                      '// C++',
                      'class Node {',
                      '    std::shared_ptr<Node> next;',
                      '    std::weak_ptr<Node> prev;',
                      '    int value;',
                      'public:',
                      '    Node(int v) : value(v) {}',
                      '    void setNext(std::shared_ptr<Node> n) {',
                      '        next = n;',
                      '    }',
                      '    void setPrev(std::shared_ptr<Node> p) {',
                      '        prev = p;',
                      '    }',
                      '};'
                    ],
                    solution: `// Rust
use std::rc::{Rc, Weak};
use std::cell::RefCell;

struct Node {
    next: Option<Rc<RefCell<Node>>>,
    prev: Option<Weak<RefCell<Node>>>,
    value: i32,
}

impl Node {
    fn new(value: i32) -> Node {
        Node {
            next: None,
            prev: None,
            value,
        }
    }
    
    fn set_next(&mut self, next: Rc<RefCell<Node>>) {
        self.next = Some(next);
    }
    
    fn set_prev(&mut self, prev: Rc<RefCell<Node>>) {
        self.prev = Some(Rc::downgrade(&prev));
    }
}`,
                    hints: [
                      'Use Rc for shared ownership',
                      'Weak for back references',
                      'RefCell for interior mutability',
                      'Option for nullable pointers'
                    ]
                  }
                ]
              }
            }
          ]
        },
        {
          id: 'unit_2',
          title: 'Templates and Generics',
          lessons: [
            {
              id: 'lesson_2_1',
              title: 'Generic Types',
              content: {
                theory: 'Convert C++ templates to Rust generics',
                examples: [
                  {
                    source: `// C++
template<typename T>
class Box {
    T value;
public:
    Box(T v) : value(v) {}
    T get() const { return value; }
};

template<typename T>
T max(T a, T b) {
    return a > b ? a : b;
}`,
                    target: `// Rust
struct Box<T> {
    value: T,
}

impl<T> Box<T> {
    fn new(value: T) -> Box<T> {
        Box { value }
    }
    
    fn get(&self) -> &T {
        &self.value
    }
}

fn max<T: PartialOrd>(a: T, b: T) -> T {
    if a > b { a } else { b }
}`,
                    explanation: 'Rust uses similar generic syntax but with trait bounds'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert this C++ template code to Rust:',
                    statements: [
                      '// C++',
                      'template<typename T>',
                      'class Stack {',
                      '    std::vector<T> items;',
                      'public:',
                      '    void push(T item) {',
                      '        items.push_back(item);',
                      '    }',
                      '    ',
                      '    T pop() {',
                      '        T item = items.back();',
                      '        items.pop_back();',
                      '        return item;',
                      '    }',
                      '    ',
                      '    bool empty() const {',
                      '        return items.empty();',
                      '    }',
                      '};'
                    ],
                    solution: `// Rust
struct Stack<T> {
    items: Vec<T>,
}

impl<T> Stack<T> {
    fn new() -> Stack<T> {
        Stack {
            items: Vec::new(),
        }
    }
    
    fn push(&mut self, item: T) {
        self.items.push(item);
    }
    
    fn pop(&mut self) -> Option<T> {
        self.items.pop()
    }
    
    fn is_empty(&self) -> bool {
        self.items.is_empty()
    }
}`,
                    hints: [
                      'Use Vec for vector',
                      'Option for nullable return',
                      'Methods take &mut self',
                      'Generic type parameter T'
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
      description: 'Learn Rust-specific features coming from C++',
      units: [
        {
          id: 'unit_1',
          title: 'Error Handling',
          lessons: [
            {
              id: 'lesson_1_1',
              title: 'From Exceptions to Results',
              content: {
                theory: 'Convert C++ exceptions to Rust Result type',
                examples: [
                  {
                    source: `// C++
class DivisionError : public std::exception {
    const char* what() const noexcept override {
        return "division by zero";
    }
};

double divide(double a, double b) {
    if (b == 0) {
        throw DivisionError();
    }
    return a / b;
}

try {
    double result = divide(10, 0);
} catch (const DivisionError& e) {
    std::cerr << e.what() << std::endl;
}`,
                    target: `// Rust
#[derive(Debug)]
struct DivisionError;

impl std::fmt::Display for DivisionError {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
        write!(f, "division by zero")
    }
}

fn divide(a: f64, b: f64) -> Result<f64, DivisionError> {
    if b == 0.0 {
        Err(DivisionError)
    } else {
        Ok(a / b)
    }
}

match divide(10.0, 0.0) {
    Ok(result) => println!("Result: {}", result),
    Err(e) => eprintln!("Error: {}", e),
}`,
                    explanation: 'Rust uses Result type instead of exceptions'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert this C++ error handling to Rust:',
                    statements: [
                      '// C++',
                      'class FileError : public std::exception {',
                      'public:',
                      '    const char* what() const noexcept override {',
                      '        return "file not found";',
                      '    }',
                      '};',
                      '',
                      'std::string readFile(const std::string& path) {',
                      '    if (!std::filesystem::exists(path)) {',
                      '        throw FileError();',
                      '    }',
                      '    // Read file...',
                      '    return "content";',
                      '}'
                    ],
                    solution: `// Rust
use std::fs;
use std::path::Path;

#[derive(Debug)]
struct FileError;

impl std::fmt::Display for FileError {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
        write!(f, "file not found")
    }
}

fn read_file(path: &str) -> Result<String, FileError> {
    if !Path::new(path).exists() {
        return Err(FileError);
    }
    // Read file...
    Ok(String::from("content"))
}`,
                    hints: [
                      'Use Result type',
                      'Custom error type',
                      'impl Display',
                      'Return Ok or Err'
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
