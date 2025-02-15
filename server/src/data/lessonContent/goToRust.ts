export const goToRustCurriculum = {
  sections: [
    {
      id: 'basics',
      title: 'From Go to Rust: Getting Started',
      description: 'Learn how to translate Go concepts into Rust code',
      units: [
        {
          id: 'unit_1',
          title: 'Memory Management',
          lessons: [
            {
              id: 'lesson_1_1',
              title: 'Ownership and Borrowing',
              content: {
                theory: 'Convert Go pointer semantics to Rust ownership model',
                examples: [
                  {
                    source: `// Go
type Person struct {
    Name string
}

func updateName(p *Person, newName string) {
    p.Name = newName
}

func main() {
    person := &Person{Name: "Alice"}
    updateName(person, "Bob")
    fmt.Println(person.Name)  // Bob
}`,
                    target: `// Rust
struct Person {
    name: String,
}

fn update_name(person: &mut Person, new_name: String) {
    person.name = new_name;
}

fn main() {
    let mut person = Person {
        name: String::from("Alice"),
    };
    update_name(&mut person, String::from("Bob"));
    println!("{}", person.name);  // Bob
}`,
                    explanation: 'Rust uses explicit borrowing with &mut for mutable references'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert this Go code to use Rust ownership:',
                    statements: [
                      '// Go',
                      'type Counter struct {',
                      '    value int',
                      '}',
                      '',
                      'func (c *Counter) increment() {',
                      '    c.value++',
                      '}',
                      '',
                      'func (c *Counter) getValue() int {',
                      '    return c.value',
                      '}',
                      '',
                      'func main() {',
                      '    counter := &Counter{}',
                      '    counter.increment()',
                      '    fmt.Println(counter.getValue())',
                      '}'
                    ],
                    solution: `// Rust
struct Counter {
    value: i32,
}

impl Counter {
    fn new() -> Counter {
        Counter { value: 0 }
    }
    
    fn increment(&mut self) {
        self.value += 1;
    }
    
    fn get_value(&self) -> i32 {
        self.value
    }
}

fn main() {
    let mut counter = Counter::new();
    counter.increment();
    println!("{}", counter.get_value());
}`,
                    hints: [
                      'Use &mut self',
                      'impl blocks',
                      'new() constructor',
                      'let mut for mutability'
                    ]
                  }
                ]
              }
            },
            {
              id: 'lesson_1_2',
              title: 'Error Handling',
              content: {
                theory: 'Convert Go error handling to Rust Result type',
                examples: [
                  {
                    source: `// Go
func divide(a, b float64) (float64, error) {
    if b == 0 {
        return 0, fmt.Errorf("division by zero")
    }
    return a / b, nil
}

func main() {
    result, err := divide(10, 0)
    if err != nil {
        fmt.Println("Error:", err)
        return
    }
    fmt.Println("Result:", result)
}`,
                    target: `// Rust
use std::error::Error;
use std::fmt;

#[derive(Debug)]
struct DivisionError(String);

impl fmt::Display for DivisionError {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "{}", self.0)
    }
}

impl Error for DivisionError {}

fn divide(a: f64, b: f64) -> Result<f64, DivisionError> {
    if b == 0.0 {
        Err(DivisionError("division by zero".to_string()))
    } else {
        Ok(a / b)
    }
}

fn main() {
    match divide(10.0, 0.0) {
        Ok(result) => println!("Result: {}", result),
        Err(e) => println!("Error: {}", e),
    }
}`,
                    explanation: 'Rust uses Result enum and match expressions for error handling'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert this Go error handling to Rust:',
                    statements: [
                      '// Go',
                      'type ValidationError struct {',
                      '    Field string',
                      '    Message string',
                      '}',
                      '',
                      'func (e *ValidationError) Error() string {',
                      '    return fmt.Sprintf("%s: %s", e.Field, e.Message)',
                      '}',
                      '',
                      'func validateAge(age int) error {',
                      '    if age < 0 {',
                      '        return &ValidationError{',
                      '            Field: "age",',
                      '            Message: "must be positive",',
                      '        }',
                      '    }',
                      '    return nil',
                      '}'
                    ],
                    solution: `// Rust
use std::error::Error;
use std::fmt;

#[derive(Debug)]
struct ValidationError {
    field: String,
    message: String,
}

impl fmt::Display for ValidationError {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "{}: {}", self.field, self.message)
    }
}

impl Error for ValidationError {}

fn validate_age(age: i32) -> Result<(), ValidationError> {
    if age < 0 {
        Err(ValidationError {
            field: "age".to_string(),
            message: "must be positive".to_string(),
        })
    } else {
        Ok(())
    }
}`,
                    hints: [
                      'Use Result type',
                      'impl Display',
                      'Custom error type',
                      'String ownership'
                    ]
                  }
                ]
              }
            }
          ]
        },
        {
          id: 'unit_2',
          title: 'Concurrency',
          lessons: [
            {
              id: 'lesson_2_1',
              title: 'Channels to Message Passing',
              content: {
                theory: 'Convert Go channels to Rust channels and message passing',
                examples: [
                  {
                    source: `// Go
func worker(id int, jobs <-chan int, results chan<- int) {
    for j := range jobs {
        results <- j * 2
    }
}

func main() {
    jobs := make(chan int, 100)
    results := make(chan int, 100)

    for w := 1; w <= 3; w++ {
        go worker(w, jobs, results)
    }

    for j := 1; j <= 5; j++ {
        jobs <- j
    }
    close(jobs)

    for a := 1; a <= 5; a++ {
        <-results
    }
}`,
                    target: `// Rust
use std::sync::mpsc;
use std::thread;

fn worker(id: i32, receiver: mpsc::Receiver<i32>, sender: mpsc::Sender<i32>) {
    while let Ok(j) = receiver.recv() {
        sender.send(j * 2).unwrap();
    }
}

fn main() {
    let (job_sender, job_receiver) = mpsc::channel();
    let (result_sender, result_receiver) = mpsc::channel();
    
    // Create multiple workers
    for w in 1..=3 {
        let job_receiver = job_receiver.clone();
        let result_sender = result_sender.clone();
        
        thread::spawn(move || {
            worker(w, job_receiver, result_sender);
        });
    }
    
    // Send jobs
    for j in 1..=5 {
        job_sender.send(j).unwrap();
    }
    drop(job_sender);
    
    // Collect results
    for _ in 1..=5 {
        let result = result_receiver.recv().unwrap();
        println!("Got result: {}", result);
    }
}`,
                    explanation: 'Rust uses mpsc channels and explicit thread spawning'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert this Go concurrent code to Rust:',
                    statements: [
                      '// Go',
                      'func generator(done chan bool) <-chan int {',
                      '    ch := make(chan int)',
                      '    go func() {',
                      '        for i := 1; i <= 5; i++ {',
                      '            ch <- i',
                      '        }',
                      '        close(ch)',
                      '        done <- true',
                      '    }()',
                      '    return ch',
                      '}',
                      '',
                      'func main() {',
                      '    done := make(chan bool)',
                      '    ch := generator(done)',
                      '    for num := range ch {',
                      '        fmt.Println(num)',
                      '    }',
                      '    <-done',
                      '}'
                    ],
                    solution: `// Rust
use std::sync::mpsc;
use std::thread;

fn generator(done_sender: mpsc::Sender<()>) -> mpsc::Receiver<i32> {
    let (sender, receiver) = mpsc::channel();
    
    thread::spawn(move || {
        for i in 1..=5 {
            sender.send(i).unwrap();
        }
        drop(sender);
        done_sender.send(()).unwrap();
    });
    
    receiver
}

fn main() {
    let (done_sender, done_receiver) = mpsc::channel();
    let receiver = generator(done_sender);
    
    while let Ok(num) = receiver.recv() {
        println!("{}", num);
    }
    
    done_receiver.recv().unwrap();
}`,
                    hints: [
                      'Use mpsc channels',
                      'thread::spawn',
                      'while let pattern',
                      'Unit type ()'
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
