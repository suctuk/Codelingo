export const rubyToRustCurriculum = {
  sections: [
    {
      id: 'getting_started',
      title: 'Getting Started with Rust',
      description: 'Learn the basics of Rust coming from Ruby',
      units: [
        {
          id: 'unit_1',
          title: 'Basic Syntax',
          lessons: [
            {
              id: 'lesson_1_1',
              title: 'Hello, Rust!',
              content: {
                theory: 'Convert Ruby print statements to Rust',
                examples: [
                  {
                    source: `# Ruby
puts "Hello, World!"
print "No newline"
puts "With newline"`,
                    target: `// Rust
fn main() {
    println!("Hello, World!");
    print!("No newline");
    println!("With newline");
}`,
                    explanation: 'Rust uses macros for printing'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Complete the Rust code to print "Hello from Rust!"',
                    code: 'fn main() {\n    println!("___");\n}',
                    solution: 'fn main() {\n    println!("Hello from Rust!");\n}',
                    hints: ['Use println! macro', 'Include the string in quotes']
                  }
                ],
                quiz: [
                  {
                    question: 'Which Rust macro adds a newline after printing?',
                    options: ['print!', 'println!', 'printf!', 'putstr!'],
                    answer: 1
                  }
                ]
              }
            },
            {
              id: 'lesson_1_2',
              title: 'Variables and Types',
              content: {
                theory: 'Convert Ruby variables to Rust variables with explicit types',
                examples: [
                  {
                    source: `# Ruby
name = "Alice"
age = 25
height = 1.75`,
                    target: `// Rust
let name: &str = "Alice";
let age: i32 = 25;
let height: f64 = 1.75;`,
                    explanation: 'Rust requires explicit type annotations'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Declare a variable age with type i32',
                    code: 'let ___ ___ = 30;',
                    solution: 'let age: i32 = 30;',
                    hints: ['Variable name is age', 'Type is i32']
                  }
                ]
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
                theory: 'Convert Ruby if statements to Rust',
                examples: [
                  {
                    source: `# Ruby
if age >= 18
  puts "Adult"
else
  puts "Minor"
end`,
                    target: `// Rust
if age >= 18 {
    println!("Adult");
} else {
    println!("Minor");
}`,
                    explanation: 'Rust uses curly braces for blocks'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Complete the if statement',
                    code: 'if score > 90 {\n    ___!("Excellent");\n} ___ {\n    ___!("Keep trying");\n}',
                    solution: 'if score > 90 {\n    println!("Excellent");\n} else {\n    println!("Keep trying");\n}',
                    hints: ['Use println!', 'Add else block']
                  }
                ]
              }
            }
          ]
        }
      ]
    },
    {
      id: 'ownership',
      title: 'Understanding Ownership',
      description: 'Learn Rust\'s unique ownership system',
      units: [
        {
          id: 'unit_1',
          title: 'Basic Ownership',
          lessons: [
            {
              id: 'lesson_1_1',
              title: 'Variable Ownership',
              content: {
                theory: 'Understand how Rust ownership differs from Ruby references',
                examples: [
                  {
                    source: `# Ruby
str1 = "hello"
str2 = str1  # Both reference same string`,
                    target: `// Rust
let str1 = String::from("hello");
let str2 = str1;  # str1 is moved to str2`,
                    explanation: 'Rust moves ownership instead of sharing references'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Complete the ownership transfer',
                    code: 'let s1 = String::from("hello");\nlet ___ = ___;',
                    solution: 'let s1 = String::from("hello");\nlet s2 = s1;',
                    hints: ['Move ownership to s2', 'Use assignment']
                  }
                ]
              }
            }
          ]
        }
      ]
    },
    {
      id: 'data_structures',
      title: 'Data Structures and Collections',
      description: 'Learn how to work with Rust collections',
      units: [
        {
          id: 'unit_1',
          title: 'Arrays and Vectors',
          lessons: [
            {
              id: 'lesson_1_1',
              title: 'From Ruby Arrays to Rust Arrays',
              content: {
                theory: 'Convert Ruby arrays to Rust arrays and vectors',
                examples: [
                  {
                    source: `# Ruby
numbers = [1, 2, 3]
numbers << 4  # Append
numbers[0]    # Access`,
                    target: `// Rust
let mut numbers = vec![1, 2, 3];
numbers.push(4);  // Append
numbers[0]        // Access`,
                    explanation: 'Rust uses Vec for dynamic arrays'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Create a vector and add elements',
                    code: 'let mut nums = ___![1, 2];\nnums.___(___);\n',
                    solution: 'let mut nums = vec![1, 2];\nnums.push(3);\n',
                    hints: ['Use vec! macro', 'push adds elements']
                  }
                ],
                quiz: [
                  {
                    question: 'Which method adds an element to a Vec?',
                    options: ['add', 'push', 'append', 'insert'],
                    answer: 1
                  }
                ]
              }
            }
          ]
        }
      ]
    },
    {
      id: 'functions_methods',
      title: 'Functions and Methods',
      description: 'Learn how to write functions and methods in Rust',
      units: [
        {
          id: 'unit_1',
          title: 'Basic Functions',
          lessons: [
            {
              id: 'lesson_1_1',
              title: 'Function Declarations',
              content: {
                theory: 'Convert Ruby methods to Rust functions',
                examples: [
                  {
                    source: `# Ruby
def greet(name)
  "Hello, #{name}!"
end`,
                    target: `// Rust
fn greet(name: &str) -> String {
    format!("Hello, {}!", name)
}`,
                    explanation: 'Rust requires type annotations'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Complete the function declaration',
                    code: '___ add(a: i32, b: i32) ___ {\n    a + b\n}',
                    solution: 'fn add(a: i32, b: i32) -> i32 {\n    a + b\n}',
                    hints: ['Use fn keyword', 'Specify return type']
                  }
                ]
              }
            }
          ]
        }
      ]
    },
    {
      id: 'error_handling',
      title: 'Error Handling',
      description: 'Learn Rust\'s robust error handling system',
      units: [
        {
          id: 'unit_1',
          title: 'Result Type',
          lessons: [
            {
              id: 'lesson_1_1',
              title: 'From Ruby Exceptions to Result',
              content: {
                theory: 'Convert Ruby exception handling to Rust Result type',
                examples: [
                  {
                    source: `# Ruby
def divide(a, b)
  raise "Division by zero!" if b == 0
  a / b
rescue => e
  puts "Error: #{e.message}"
end`,
                    target: `// Rust
fn divide(a: f64, b: f64) -> Result<f64, String> {
    if b == 0.0 {
        Err("Division by zero!".to_string())
    } else {
        Ok(a / b)
    }
}

// Usage
match divide(10.0, 0.0) {
    Ok(result) => println!("Result: {}", result),
    Err(e) => println!("Error: {}", e),
}`,
                    explanation: 'Rust uses Result for error handling'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Complete the Result handling',
                    code: 'match divide(10.0, 2.0) {\n    ___(result) => println!("Success: {}", result),\n    ___(e) => println!("Failed: {}", e)\n}',
                    solution: 'match divide(10.0, 2.0) {\n    Ok(result) => println!("Success: {}", result),\n    Err(e) => println!("Failed: {}", e)\n}',
                    hints: ['Use Ok for success', 'Use Err for error']
                  }
                ]
              }
            }
          ]
        }
      ]
    },
    {
      id: 'advanced_types',
      title: 'Advanced Type System',
      description: 'Master Rust\'s powerful type system',
      units: [
        {
          id: 'unit_1',
          title: 'Generics',
          lessons: [
            {
              id: 'lesson_1_1',
              title: 'Generic Types and Functions',
              content: {
                theory: 'Convert Ruby duck typing to Rust generics',
                examples: [
                  {
                    source: `# Ruby
def print_array(arr)
  arr.each { |x| puts x }
end

print_array([1, 2, 3])
print_array(["a", "b", "c"])`,
                    target: `// Rust
fn print_array<T: std::fmt::Display>(arr: &[T]) {
    for x in arr {
        println!("{}", x);
    }
}

// Usage
print_array(&[1, 2, 3]);
print_array(&["a", "b", "c"]);`,
                    explanation: 'Rust uses explicit generic parameters'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Complete the generic function',
                    code: 'fn largest<___>(list: &[T]) -> &T\nwhere\n    T: ___,\n{\n    list.iter().max().unwrap()\n}',
                    solution: 'fn largest<T>(list: &[T]) -> &T\nwhere\n    T: Ord,\n{\n    list.iter().max().unwrap()\n}',
                    hints: ['Use T for type parameter', 'Ord trait for comparison']
                  }
                ]
              }
            }
          ]
        }
      ]
    },
    {
      id: 'concurrency',
      title: 'Concurrency and Parallelism',
      description: 'Learn safe concurrent programming in Rust',
      units: [
        {
          id: 'unit_1',
          title: 'Threads and Channels',
          lessons: [
            {
              id: 'lesson_1_1',
              title: 'Basic Threading',
              content: {
                theory: 'Convert Ruby threads to Rust threads',
                examples: [
                  {
                    source: `# Ruby
threads = []
3.times do |i|
  threads << Thread.new do
    puts "Thread #{i}"
  end
end
threads.each(&:join)`,
                    target: `// Rust
use std::thread;

let mut handles = vec![];

for i in 0..3 {
    handles.push(thread::spawn(move || {
        println!("Thread {}", i);
    }));
}

for handle in handles {
    handle.join().unwrap();
}`,
                    explanation: 'Rust ensures thread safety at compile time'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Complete the thread spawning code',
                    code: 'let handle = thread::___(___ || {\n    println!("Hello from thread!");\n});\nhandle.___().unwrap();',
                    solution: 'let handle = thread::spawn(move || {\n    println!("Hello from thread!");\n});\nhandle.join().unwrap();',
                    hints: ['Use spawn to create thread', 'Join to wait for completion']
                  }
                ]
              }
            }
          ]
        }
      ]
    },
    {
      id: 'project_organization',
      title: 'Project Organization',
      description: 'Learn how to structure Rust projects',
      units: [
        {
          id: 'unit_1',
          title: 'Modules and Crates',
          lessons: [
            {
              id: 'lesson_1_1',
              title: 'Module System',
              content: {
                theory: 'Convert Ruby modules to Rust modules',
                examples: [
                  {
                    source: `# Ruby
module Utils
  def self.helper
    puts "Helper function"
  end
end

Utils.helper`,
                    target: `// Rust
mod utils {
    pub fn helper() {
        println!("Helper function");
    }
}

fn main() {
    utils::helper();
}`,
                    explanation: 'Rust uses explicit visibility rules'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Complete the module definition',
                    code: 'mod math {\n    ___ fn add(a: i32, b: i32) -> i32 {\n        a + b\n    }\n}',
                    solution: 'mod math {\n    pub fn add(a: i32, b: i32) -> i32 {\n        a + b\n    }\n}',
                    hints: ['Use pub for public items', 'Functions are private by default']
                  }
                ]
              }
            }
          ]
        }
      ]
    },
    {
      id: 'smart_pointers',
      title: 'Smart Pointers and Memory Management',
      description: 'Master Rust\'s advanced memory management features',
      units: [
        {
          id: 'unit_1',
          title: 'Box<T>',
          lessons: [
            {
              id: 'lesson_1_1',
              title: 'Heap Allocation',
              content: {
                theory: 'Learn about heap allocation in Rust',
                examples: [
                  {
                    source: `# Ruby
class Node
  attr_accessor :value, :next
  
  def initialize(value)
    @value = value
    @next = nil
  end
end

head = Node.new(1)
head.next = Node.new(2)`,
                    target: `// Rust
struct Node {
    value: i32,
    next: Option<Box<Node>>,
}

impl Node {
    fn new(value: i32) -> Node {
        Node {
            value,
            next: None,
        }
    }
}

let mut head = Node::new(1);
head.next = Some(Box::new(Node::new(2)));`,
                    explanation: 'Box<T> provides heap allocation'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Create a boxed value',
                    code: 'let boxed = Box::___(___);\nlet value = *boxed;',
                    solution: 'let boxed = Box::new(42);\nlet value = *boxed;',
                    hints: ['Use Box::new', 'Dereference with *']
                  }
                ]
              }
            }
          ]
        }
      ]
    },
    {
      id: 'unsafe_rust',
      title: 'Unsafe Rust',
      description: 'Learn when and how to use unsafe Rust features',
      units: [
        {
          id: 'unit_1',
          title: 'Raw Pointers',
          lessons: [
            {
              id: 'lesson_1_1',
              title: 'Working with Raw Pointers',
              content: {
                theory: 'Learn about raw pointers in Rust',
                examples: [
                  {
                    source: `# Ruby
ptr = FFI::MemoryPointer.new(:int)
ptr.write_int(42)
value = ptr.read_int`,
                    target: `// Rust
fn main() {
    let mut value = 42;
    let ptr = &mut value as *mut i32;
    
    unsafe {
        *ptr = 43;
        println!("Value: {}", *ptr);
    }
}`,
                    explanation: 'Unsafe blocks allow raw pointer operations'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Complete the unsafe pointer code',
                    code: 'let mut num = 10;\nlet ptr = &mut num as *mut i32;\n___ {\n    *___ = 20;\n}',
                    solution: 'let mut num = 10;\nlet ptr = &mut num as *mut i32;\nunsafe {\n    *ptr = 20;\n}',
                    hints: ['Use unsafe block', 'Dereference pointer']
                  }
                ]
              }
            }
          ]
        }
      ]
    },
    {
      id: 'advanced_concurrency',
      title: 'Advanced Concurrency',
      description: 'Master advanced concurrent programming patterns',
      units: [
        {
          id: 'unit_1',
          title: 'Atomic Types',
          lessons: [
            {
              id: 'lesson_1_1',
              title: 'Using Atomic Types',
              content: {
                theory: 'Learn about atomic operations in Rust',
                examples: [
                  {
                    source: `# Ruby
require 'concurrent'
counter = Concurrent::AtomicFixnum.new(0)
counter.increment`,
                    target: `// Rust
use std::sync::atomic::{AtomicI32, Ordering};

let counter = AtomicI32::new(0);
counter.fetch_add(1, Ordering::SeqCst);`,
                    explanation: 'Atomic types provide thread-safe operations'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Increment atomic counter',
                    code: 'let counter = AtomicI32::new(0);\ncounter.___(___, Ordering::SeqCst);',
                    solution: 'let counter = AtomicI32::new(0);\ncounter.fetch_add(1, Ordering::SeqCst);',
                    hints: ['Use fetch_add', 'Specify ordering']
                  }
                ]
              }
            }
          ]
        }
      ]
    },
    {
      id: 'final_project',
      title: 'Final Project',
      description: 'Build a complete application in Rust',
      units: [
        {
          id: 'unit_1',
          title: 'HTTP Server',
          lessons: [
            {
              id: 'lesson_1_1',
              title: 'Basic HTTP Server',
              content: {
                theory: 'Convert a Ruby Sinatra app to Rust Actix-web',
                examples: [
                  {
                    source: `# Ruby
require 'sinatra'

get '/' do
  'Hello World!'
end

post '/echo' do
  request.body.read
end`,
                    target: `// Rust
use actix_web::{web, App, HttpServer, HttpResponse};

async fn hello() -> HttpResponse {
    HttpResponse::Ok().body("Hello World!")
}

async fn echo(body: String) -> HttpResponse {
    HttpResponse::Ok().body(body)
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new()
            .route("/", web::get().to(hello))
            .route("/echo", web::post().to(echo))
    })
    .bind("127.0.0.1:8080")?
    .run()
    .await
}`,
                    explanation: 'Rust web servers use async/await'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Add a new route handler',
                    code: 'async fn greet(name: web::Path<String>) -> HttpResponse {\n    HttpResponse::Ok().body(___)\n}',
                    solution: 'async fn greet(name: web::Path<String>) -> HttpResponse {\n    HttpResponse::Ok().body(format!("Hello, {}!", name))\n}',
                    hints: ['Use format!', 'Access path parameter']
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
