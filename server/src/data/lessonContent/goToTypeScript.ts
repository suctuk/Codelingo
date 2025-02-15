export const goToTypeScriptCurriculum = {
  sections: [
    {
      id: 'basics',
      title: 'From Go to TypeScript: Getting Started',
      description: 'Learn how to translate Go concepts into TypeScript code',
      units: [
        {
          id: 'unit_1',
          title: 'Type System',
          lessons: [
            {
              id: 'lesson_1_1',
              title: 'Basic Types',
              content: {
                theory: 'Convert Go types to TypeScript types',
                examples: [
                  {
                    source: `// Go
var name string = "Alice"
age := 42
isActive := true
price := 9.99
numbers := []int{1, 2, 3}
person := struct {
    Name string
    Age  int
}{
    Name: "Bob",
    Age:  30,
}`,
                    target: `// TypeScript
const name: string = "Alice";
let age: number = 42;
const isActive: boolean = true;
const price: number = 9.99;
const numbers: number[] = [1, 2, 3];

interface Person {
    name: string;
    age: number;
}

const person: Person = {
    name: "Bob",
    age: 30
};`,
                    explanation: 'TypeScript uses similar type annotations but with different syntax'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert these Go types to TypeScript:',
                    statements: [
                      '// Go',
                      'type Point struct {',
                      '    X, Y float64',
                      '}',
                      '',
                      'type Circle struct {',
                      '    Center Point',
                      '    Radius float64',
                      '}',
                      '',
                      'type Shape interface {',
                      '    Area() float64',
                      '    Perimeter() float64',
                      '}'
                    ],
                    solution: `// TypeScript
interface Point {
    x: number;
    y: number;
}

interface Circle {
    center: Point;
    radius: number;
}

interface Shape {
    area(): number;
    perimeter(): number;
}`,
                    hints: [
                      'Use interface for structs',
                      'Methods in interfaces',
                      'number for float64',
                      'Camel case naming'
                    ]
                  }
                ]
              }
            },
            {
              id: 'lesson_1_2',
              title: 'Generics',
              content: {
                theory: 'Convert Go generics to TypeScript generics',
                examples: [
                  {
                    source: `// Go
type Stack[T any] struct {
    items []T
}

func (s *Stack[T]) Push(item T) {
    s.items = append(s.items, item)
}

func (s *Stack[T]) Pop() (T, bool) {
    if len(s.items) == 0 {
        var zero T
        return zero, false
    }
    item := s.items[len(s.items)-1]
    s.items = s.items[:len(s.items)-1]
    return item, true
}`,
                    target: `// TypeScript
class Stack<T> {
    private items: T[] = [];

    push(item: T): void {
        this.items.push(item);
    }

    pop(): T | undefined {
        if (this.items.length === 0) {
            return undefined;
        }
        return this.items.pop();
    }
}`,
                    explanation: 'TypeScript uses similar generic syntax with angle brackets'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert this Go generic code to TypeScript:',
                    statements: [
                      '// Go',
                      'type Result[T any] struct {',
                      '    Data T',
                      '    Error error',
                      '}',
                      '',
                      'func Map[T, U any](items []T, fn func(T) U) []U {',
                      '    result := make([]U, len(items))',
                      '    for i, item := range items {',
                      '        result[i] = fn(item)',
                      '    }',
                      '    return result',
                      '}'
                    ],
                    solution: `// TypeScript
interface Result<T> {
    data: T;
    error: Error | null;
}

function map<T, U>(items: T[], fn: (item: T) => U): U[] {
    return items.map(fn);
}`,
                    hints: [
                      'Use interface for Result',
                      'Error | null for error',
                      'Array.map method',
                      'Arrow function type'
                    ]
                  }
                ]
              }
            }
          ]
        },
        {
          id: 'unit_2',
          title: 'Async Programming',
          lessons: [
            {
              id: 'lesson_2_1',
              title: 'Goroutines to Async/Await',
              content: {
                theory: 'Convert Go concurrency patterns to TypeScript async/await',
                examples: [
                  {
                    source: `// Go
func fetchData(url string) ([]byte, error) {
    resp, err := http.Get(url)
    if err != nil {
        return nil, err
    }
    defer resp.Body.Close()
    return ioutil.ReadAll(resp.Body)
}

func main() {
    urls := []string{"url1", "url2"}
    results := make(chan []byte)
    
    for _, url := range urls {
        go func(url string) {
            data, _ := fetchData(url)
            results <- data
        }(url)
    }
    
    for range urls {
        data := <-results
        // process data
    }
}`,
                    target: `// TypeScript
async function fetchData(url: string): Promise<ArrayBuffer> {
    const response = await fetch(url);
    return response.arrayBuffer();
}

async function main() {
    const urls: string[] = ["url1", "url2"];
    try {
        const promises = urls.map(url => fetchData(url));
        const results = await Promise.all(promises);
        results.forEach(data => {
            // process data
        });
    } catch (error) {
        console.error(error);
    }
}`,
                    explanation: 'TypeScript uses Promises and async/await for concurrency'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert this Go concurrent code to TypeScript:',
                    statements: [
                      '// Go',
                      'type Job struct {',
                      '    ID int',
                      '    Data string',
                      '}',
                      '',
                      'func worker(jobs <-chan Job, results chan<- string) {',
                      '    for job := range jobs {',
                      '        results <- processJob(job)',
                      '    }',
                      '}',
                      '',
                      'func processJob(job Job) string {',
                      '    return fmt.Sprintf("Processed %d: %s", job.ID, job.Data)',
                      '}'
                    ],
                    solution: `// TypeScript
interface Job {
    id: number;
    data: string;
}

async function worker(
    jobs: AsyncIterableIterator<Job>
): Promise<string[]> {
    const results: string[] = [];
    for await (const job of jobs) {
        results.push(await processJob(job));
    }
    return results;
}

async function processJob(job: Job): Promise<string> {
    return \`Processed \${job.id}: \${job.data}\`;
}

// Usage
async function main() {
    async function* jobGenerator(): AsyncIterableIterator<Job> {
        yield { id: 1, data: "test1" };
        yield { id: 2, data: "test2" };
    }

    const results = await worker(jobGenerator());
    console.log(results);
}`,
                    hints: [
                      'Use interfaces',
                      'Async generators',
                      'Promise arrays',
                      'Template literals'
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
