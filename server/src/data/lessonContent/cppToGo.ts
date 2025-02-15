export const cppToGoCurriculum = {
  sections: [
    {
      id: 'basics',
      title: 'From C++ to Go: Getting Started',
      description: 'Learn how to translate C++ concepts into Go code',
      units: [
        {
          id: 'unit_1',
          title: 'Basic Type System',
          lessons: [
            {
              id: 'lesson_1_1',
              title: 'Types and Variables',
              content: {
                theory: 'Convert C++ types and variables to Go',
                examples: [
                  {
                    source: `// C++
int count = 42;
std::string name = "Alice";
bool isActive = true;
double price = 9.99;
std::vector<int> numbers = {1, 2, 3};
const double PI = 3.14159;`,
                    target: `// Go
count := 42
name := "Alice"
isActive := true
price := 9.99
numbers := []int{1, 2, 3}
const PI = 3.14159

// With explicit types:
var count int = 42
var name string = "Alice"
var isActive bool = true
var price float64 = 9.99
var numbers = []int{1, 2, 3}`,
                    explanation: 'Go uses := for type inference and simpler type declarations'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert these C++ variables to Go:',
                    statements: [
                      '// C++',
                      'unsigned long id = 1000UL;',
                      'std::array<std::string, 3> names = {"A", "B", "C"};',
                      'std::map<std::string, int> scores = {{"math", 95}};',
                      'const char* message = "Hello";'
                    ],
                    solution: `// Go
id := uint64(1000)
names := [3]string{"A", "B", "C"}
scores := map[string]int{"math": 95}
message := "Hello"

// Or with explicit types:
var id uint64 = 1000
var names [3]string = [3]string{"A", "B", "C"}
var scores = map[string]int{"math": 95}
var message string = "Hello"`,
                    hints: [
                      'Use built-in types',
                      'Arrays have fixed size',
                      'map for associative arrays',
                      'strings are UTF-8'
                    ]
                  }
                ]
              }
            },
            {
              id: 'lesson_1_2',
              title: 'Memory Management',
              content: {
                theory: 'Convert C++ memory management to Go',
                examples: [
                  {
                    source: `// C++
class Person {
    std::string* name;
public:
    Person(const std::string& n) {
        name = new std::string(n);
    }
    ~Person() {
        delete name;
    }
    void setName(const std::string& n) {
        *name = n;
    }
};

std::unique_ptr<Person> person(new Person("Alice"));
std::shared_ptr<int> count = std::make_shared<int>(42);`,
                    target: `// Go
type Person struct {
    name string
}

func NewPerson(name string) *Person {
    return &Person{name: name}
}

func (p *Person) SetName(name string) {
    p.name = name
}

// Usage:
person := NewPerson("Alice")
count := 42  // Go handles memory management automatically`,
                    explanation: 'Go uses garbage collection instead of manual memory management'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert this C++ memory management code to Go:',
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
                    solution: `// Go
type Buffer struct {
    data []int
}

func NewBuffer(size int) *Buffer {
    return &Buffer{
        data: make([]int, size),
    }
}

func (b *Buffer) Set(i int, v int) {
    if i < len(b.data) {
        b.data[i] = v
    }
}`,
                    hints: [
                      'Use slices for arrays',
                      'make() for allocation',
                      'No manual cleanup',
                      'len() for size check'
                    ]
                  }
                ]
              }
            }
          ]
        },
        {
          id: 'unit_2',
          title: 'Classes and Interfaces',
          lessons: [
            {
              id: 'lesson_2_1',
              title: 'Class Translation',
              content: {
                theory: 'Convert C++ classes to Go structs and interfaces',
                examples: [
                  {
                    source: `// C++
class Shape {
public:
    virtual double area() = 0;
    virtual ~Shape() {}
};

class Circle : public Shape {
    double radius;
public:
    Circle(double r) : radius(r) {}
    double area() override {
        return M_PI * radius * radius;
    }
};`,
                    target: `// Go
type Shape interface {
    Area() float64
}

type Circle struct {
    radius float64
}

func NewCircle(radius float64) *Circle {
    return &Circle{radius: radius}
}

func (c *Circle) Area() float64 {
    return math.Pi * c.radius * c.radius
}`,
                    explanation: 'Go uses interfaces and structs instead of inheritance'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert this C++ class hierarchy to Go:',
                    statements: [
                      '// C++',
                      'class Animal {',
                      'public:',
                      '    virtual std::string speak() = 0;',
                      '};',
                      '',
                      'class Dog : public Animal {',
                      '    std::string name;',
                      'public:',
                      '    Dog(const std::string& n) : name(n) {}',
                      '    std::string speak() override {',
                      '        return name + " says Woof!";',
                      '    }',
                      '};'
                    ],
                    solution: `// Go
type Animal interface {
    Speak() string
}

type Dog struct {
    name string
}

func NewDog(name string) *Dog {
    return &Dog{name: name}
}

func (d *Dog) Speak() string {
    return d.name + " says Woof!"
}`,
                    hints: [
                      'Interface for virtual class',
                      'Struct for concrete class',
                      'Constructor function',
                      'Method implements interface'
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
      title: 'Concurrency Patterns',
      description: 'Learn Go\'s concurrency model coming from C++',
      units: [
        {
          id: 'unit_1',
          title: 'From Threads to Goroutines',
          lessons: [
            {
              id: 'lesson_1_1',
              title: 'Basic Concurrency',
              content: {
                theory: 'Convert C++ threads to Go goroutines',
                examples: [
                  {
                    source: `// C++
#include <thread>
#include <mutex>

std::mutex mtx;
int shared = 0;

void increment() {
    std::lock_guard<std::mutex> lock(mtx);
    shared++;
}

std::thread t1(increment);
std::thread t2(increment);
t1.join();
t2.join();`,
                    target: `// Go
var (
    mu     sync.Mutex
    shared int
)

func increment() {
    mu.Lock()
    shared++
    mu.Unlock()
}

func main() {
    var wg sync.WaitGroup
    wg.Add(2)
    
    go func() {
        defer wg.Done()
        increment()
    }()
    
    go func() {
        defer wg.Done()
        increment()
    }()
    
    wg.Wait()
}`,
                    explanation: 'Go uses goroutines and sync.Mutex for synchronization'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert this C++ concurrent code to Go:',
                    statements: [
                      '// C++',
                      '#include <thread>',
                      '#include <queue>',
                      '#include <mutex>',
                      '',
                      'std::queue<int> q;',
                      'std::mutex mtx;',
                      '',
                      'void producer() {',
                      '    for (int i = 0; i < 5; i++) {',
                      '        std::lock_guard<std::mutex> lock(mtx);',
                      '        q.push(i);',
                      '    }',
                      '}',
                      '',
                      'void consumer() {',
                      '    while (!q.empty()) {',
                      '        std::lock_guard<std::mutex> lock(mtx);',
                      '        if (!q.empty()) {',
                      '            std::cout << q.front() << std::endl;',
                      '            q.pop();',
                      '        }',
                      '    }',
                      '}'
                    ],
                    solution: `// Go
func main() {
    queue := make(chan int)
    var wg sync.WaitGroup
    wg.Add(2)

    // Producer
    go func() {
        defer wg.Done()
        for i := 0; i < 5; i++ {
            queue <- i
        }
        close(queue)
    }()

    // Consumer
    go func() {
        defer wg.Done()
        for val := range queue {
            fmt.Println(val)
        }
    }()

    wg.Wait()
}`,
                    hints: [
                      'Use channels instead of queue',
                      'No explicit locks needed',
                      'close() channel when done',
                      'range over channel'
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
