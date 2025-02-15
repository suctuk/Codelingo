export const goToCppCurriculum = {
  sections: [
    {
      id: 'basics',
      title: 'From Go to C++: Getting Started',
      description: 'Learn how to translate Go concepts into C++ code',
      units: [
        {
          id: 'unit_1',
          title: 'Memory Management',
          lessons: [
            {
              id: 'lesson_1_1',
              title: 'Manual Memory Management',
              content: {
                theory: 'Convert Go garbage collection to C++ manual memory management',
                examples: [
                  {
                    source: `// Go
type Node struct {
    Value int
    Next  *Node
}

func NewNode(value int) *Node {
    return &Node{Value: value}
}

func (n *Node) SetNext(next *Node) {
    n.Next = next
}

func main() {
    head := NewNode(1)
    head.SetNext(NewNode(2))
}`,
                    target: `// C++
#include <memory>

class Node {
public:
    int value;
    std::unique_ptr<Node> next;
    
    Node(int val) : value(val), next(nullptr) {}
    
    void setNext(std::unique_ptr<Node> nextNode) {
        next = std::move(nextNode);
    }
};

int main() {
    auto head = std::make_unique<Node>(1);
    head->setNext(std::make_unique<Node>(2));
    return 0;
}`,
                    explanation: 'C++ uses smart pointers for automatic memory management'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert this Go code to C++ with proper memory management:',
                    statements: [
                      '// Go',
                      'type Resource struct {',
                      '    data []byte',
                      '}',
                      '',
                      'func NewResource(size int) *Resource {',
                      '    return &Resource{',
                      '        data: make([]byte, size),',
                      '    }',
                      '}',
                      '',
                      'func (r *Resource) Update(index int, value byte) bool {',
                      '    if index >= len(r.data) {',
                      '        return false',
                      '    }',
                      '    r.data[index] = value',
                      '    return true',
                      '}'
                    ],
                    solution: `// C++
#include <vector>
#include <memory>

class Resource {
private:
    std::vector<uint8_t> data;

public:
    explicit Resource(size_t size) : data(size) {}
    
    bool update(size_t index, uint8_t value) {
        if (index >= data.size()) {
            return false;
        }
        data[index] = value;
        return true;
    }
    
    // Optional: getter for data
    const std::vector<uint8_t>& getData() const {
        return data;
    }
};

// Usage
std::unique_ptr<Resource> createResource(size_t size) {
    return std::make_unique<Resource>(size);
}`,
                    hints: [
                      'Use std::vector',
                      'unique_ptr for ownership',
                      'Explicit constructor',
                      'Size checks'
                    ]
                  }
                ]
              }
            },
            {
              id: 'lesson_1_2',
              title: 'Error Handling',
              content: {
                theory: 'Convert Go error handling to C++ exceptions',
                examples: [
                  {
                    source: `// Go
type DivisionError struct {
    message string
}

func (e *DivisionError) Error() string {
    return e.message
}

func divide(a, b float64) (float64, error) {
    if b == 0 {
        return 0, &DivisionError{"division by zero"}
    }
    return a / b, nil
}`,
                    target: `// C++
#include <stdexcept>
#include <string>

class DivisionError : public std::runtime_error {
public:
    explicit DivisionError(const std::string& message)
        : std::runtime_error(message) {}
};

double divide(double a, double b) {
    if (b == 0) {
        throw DivisionError("division by zero");
    }
    return a / b;
}

// Usage with try-catch
try {
    double result = divide(10.0, 0.0);
} catch (const DivisionError& e) {
    std::cerr << "Error: " << e.what() << std::endl;
}`,
                    explanation: 'C++ uses exceptions and RAII for error handling'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert this Go error handling to C++:',
                    statements: [
                      '// Go',
                      'type ValidationError struct {',
                      '    Field   string',
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
                      '            Field:   "age",',
                      '            Message: "must be positive",',
                      '        }',
                      '    }',
                      '    return nil',
                      '}'
                    ],
                    solution: `// C++
#include <stdexcept>
#include <string>
#include <sstream>

class ValidationError : public std::runtime_error {
private:
    std::string field;
    std::string message;

public:
    ValidationError(const std::string& field, const std::string& message)
        : std::runtime_error(field + ": " + message)
        , field(field)
        , message(message) {}
    
    const std::string& getField() const { return field; }
    const std::string& getMessage() const { return message; }
};

void validateAge(int age) {
    if (age < 0) {
        throw ValidationError("age", "must be positive");
    }
}

// Usage
try {
    validateAge(-1);
} catch (const ValidationError& e) {
    std::cerr << "Validation failed: " << e.what() << std::endl;
}`,
                    hints: [
                      'Inherit from runtime_error',
                      'Use const references',
                      'Throw exceptions',
                      'Try-catch blocks'
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
              title: 'Goroutines to Threads',
              content: {
                theory: 'Convert Go concurrency patterns to C++ threads',
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
}`,
                    target: `// C++
#include <thread>
#include <queue>
#include <mutex>
#include <condition_variable>

template<typename T>
class ThreadSafeQueue {
private:
    std::queue<T> queue;
    mutable std::mutex mutex;
    std::condition_variable cond;
    bool closed = false;

public:
    void push(T value) {
        std::lock_guard<std::mutex> lock(mutex);
        queue.push(std::move(value));
        cond.notify_one();
    }
    
    bool pop(T& value) {
        std::unique_lock<std::mutex> lock(mutex);
        cond.wait(lock, [this] {
            return !queue.empty() || closed;
        });
        if (closed && queue.empty()) {
            return false;
        }
        value = std::move(queue.front());
        queue.pop();
        return true;
    }
    
    void close() {
        std::lock_guard<std::mutex> lock(mutex);
        closed = true;
        cond.notify_all();
    }
};

void worker(int id, ThreadSafeQueue<int>& jobs, 
           ThreadSafeQueue<int>& results) {
    int job;
    while (jobs.pop(job)) {
        results.push(job * 2);
    }
}

int main() {
    ThreadSafeQueue<int> jobs;
    ThreadSafeQueue<int> results;
    
    std::vector<std::thread> workers;
    for (int w = 1; w <= 3; w++) {
        workers.emplace_back(worker, w, 
                           std::ref(jobs), 
                           std::ref(results));
    }
    
    for (int j = 1; j <= 5; j++) {
        jobs.push(j);
    }
    
    jobs.close();
    
    for (auto& w : workers) {
        w.join();
    }
    
    return 0;
}`,
                    explanation: 'C++ uses std::thread and thread-safe queues for concurrency'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert this Go concurrent code to C++:',
                    statements: [
                      '// Go',
                      'func process(data string) string {',
                      '    return strings.ToUpper(data)',
                      '}',
                      '',
                      'func main() {',
                      '    input := []string{"hello", "world", "go"}',
                      '    results := make(chan string, len(input))',
                      '',
                      '    for _, data := range input {',
                      '        go func(d string) {',
                      '            results <- process(d)',
                      '        }(data)',
                      '    }',
                      '',
                      '    for range input {',
                      '        fmt.Println(<-results)',
                      '    }',
                      '}'
                    ],
                    solution: `// C++
#include <string>
#include <vector>
#include <thread>
#include <future>
#include <algorithm>
#include <iostream>

std::string process(const std::string& data) {
    std::string result = data;
    std::transform(result.begin(), result.end(),
                  result.begin(), ::toupper);
    return result;
}

int main() {
    std::vector<std::string> input = {"hello", "world", "go"};
    std::vector<std::future<std::string>> futures;
    
    // Launch tasks
    for (const auto& data : input) {
        futures.push_back(
            std::async(std::launch::async,
                      process, data)
        );
    }
    
    // Collect results
    for (auto& future : futures) {
        std::cout << future.get() << std::endl;
    }
    
    return 0;
}`,
                    hints: [
                      'Use std::async',
                      'Collect futures',
                      'Transform for uppercase',
                      'Future::get for results'
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
