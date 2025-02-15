export const goToPythonCurriculum = {
  sections: [
    {
      id: 'basics',
      title: 'From Go to Python: Getting Started',
      description: 'Learn how to translate Go concepts into Python code',
      units: [
        {
          id: 'unit_1',
          title: 'Basic Syntax and Types',
          lessons: [
            {
              id: 'lesson_1_1',
              title: 'Variables and Types',
              content: {
                theory: 'Convert Go static types to Python dynamic types',
                examples: [
                  {
                    source: `// Go
var name string = "Alice"
age := 42
isActive := true
price := 9.99
numbers := []int{1, 2, 3}
person := map[string]interface{}{
    "name": "Bob",
    "age":  30,
}`,
                    target: `# Python
name = "Alice"
age = 42
is_active = True
price = 9.99
numbers = [1, 2, 3]
person = {
    "name": "Bob",
    "age": 30
}`,
                    explanation: 'Python uses dynamic typing without type declarations'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert these Go variables to Python:',
                    statements: [
                      '// Go',
                      'const PI float64 = 3.14159',
                      'colors := []string{"red", "green", "blue"}',
                      'point := struct {',
                      '    x, y int',
                      '}{10, 20}',
                      'grades := map[string]int{',
                      '    "math":    95,',
                      '    "science": 88,',
                      '}'
                    ],
                    solution: `# Python
PI = 3.14159
colors = ["red", "green", "blue"]

class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

point = Point(10, 20)
grades = {
    "math": 95,
    "science": 88
}`,
                    hints: [
                      'No type declarations',
                      'Use class for structs',
                      'Simple dict syntax',
                      'Lists for slices'
                    ]
                  }
                ]
              }
            },
            {
              id: 'lesson_1_2',
              title: 'Functions and Methods',
              content: {
                theory: 'Convert Go functions to Python functions',
                examples: [
                  {
                    source: `// Go
func greet(name string) string {
    return fmt.Sprintf("Hello, %s!", name)
}

func sum(numbers ...int) int {
    total := 0
    for _, n := range numbers {
        total += n
    }
    return total
}

func processUser(name string, age int, city string) string {
    if city == "" {
        city = "Unknown"
    }
    return fmt.Sprintf("%s (%d) from %s", name, age, city)
}`,
                    target: `# Python
def greet(name: str) -> str:
    return f"Hello, {name}!"

def sum(*numbers: int) -> int:
    return sum(numbers)

def process_user(name: str, age: int, city: str = "Unknown") -> str:
    return f"{name} ({age}) from {city}"`,
                    explanation: 'Python uses type hints and f-strings for formatting'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert these Go functions to Python:',
                    statements: [
                      '// Go',
                      'func multiply(nums ...int) int {',
                      '    result := 1',
                      '    for _, n := range nums {',
                      '        result *= n',
                      '    }',
                      '    return result',
                      '}',
                      '',
                      'func formatName(first, last string, title string) string {',
                      '    if title == "" {',
                      '        return fmt.Sprintf("%s %s", first, last)',
                      '    }',
                      '    return fmt.Sprintf("%s %s %s", title, first, last)',
                      '}'
                    ],
                    solution: `# Python
from functools import reduce
from operator import mul
from typing import Optional

def multiply(*nums: int) -> int:
    return reduce(mul, nums, 1)

def format_name(first: str, last: str, title: Optional[str] = None) -> str:
    if not title:
        return f"{first} {last}"
    return f"{title} {first} {last}"`,
                    hints: [
                      'Use reduce for multiply',
                      'Optional for nullable',
                      'Type hints',
                      'f-strings'
                    ]
                  }
                ]
              }
            }
          ]
        },
        {
          id: 'unit_2',
          title: 'Concurrency and Error Handling',
          lessons: [
            {
              id: 'lesson_2_1',
              title: 'From Goroutines to AsyncIO',
              content: {
                theory: 'Convert Go concurrency patterns to Python async/await',
                examples: [
                  {
                    source: `// Go
func fetchURL(url string) (string, error) {
    resp, err := http.Get(url)
    if err != nil {
        return "", err
    }
    defer resp.Body.Close()
    
    body, err := ioutil.ReadAll(resp.Body)
    if err != nil {
        return "", err
    }
    return string(body), nil
}

func main() {
    ch := make(chan string)
    urls := []string{"url1", "url2", "url3"}
    
    for _, url := range urls {
        go func(url string) {
            result, _ := fetchURL(url)
            ch <- result
        }(url)
    }
    
    for range urls {
        fmt.Println(<-ch)
    }
}`,
                    target: `# Python
import aiohttp
import asyncio
from typing import List

async def fetch_url(url: str) -> str:
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as response:
            return await response.text()

async def main():
    urls = ["url1", "url2", "url3"]
    async with aiohttp.ClientSession() as session:
        tasks = [fetch_url(url) for url in urls]
        results = await asyncio.gather(*tasks)
        for result in results:
            print(result)

if __name__ == "__main__":
    asyncio.run(main())`,
                    explanation: 'Python uses async/await instead of goroutines and channels'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert this Go concurrent code to Python:',
                    statements: [
                      '// Go',
                      'func worker(id int, jobs <-chan int, results chan<- int) {',
                      '    for j := range jobs {',
                      '        results <- j * 2',
                      '    }',
                      '}',
                      '',
                      'func main() {',
                      '    jobs := make(chan int, 100)',
                      '    results := make(chan int, 100)',
                      '',
                      '    for w := 1; w <= 3; w++ {',
                      '        go worker(w, jobs, results)',
                      '    }',
                      '',
                      '    for j := 1; j <= 5; j++ {',
                      '        jobs <- j',
                      '    }',
                      '    close(jobs)',
                      '',
                      '    for a := 1; a <= 5; a++ {',
                      '        <-results',
                      '    }',
                      '}'
                    ],
                    solution: `# Python
import asyncio
from typing import List

async def worker(id: int, queue: asyncio.Queue, results: asyncio.Queue):
    while True:
        try:
            job = await queue.get()
            result = job * 2
            await results.put(result)
            queue.task_done()
        except asyncio.CancelledError:
            break

async def main():
    queue = asyncio.Queue()
    results = asyncio.Queue()
    
    # Create workers
    workers = [
        asyncio.create_task(worker(i, queue, results))
        for i in range(3)
    ]
    
    # Add jobs
    for j in range(1, 6):
        await queue.put(j)
    
    # Wait for queue to be processed
    await queue.join()
    
    # Cancel workers
    for w in workers:
        w.cancel()
    
    # Get results
    while not results.empty():
        result = await results.get()
        print(result)

if __name__ == "__main__":
    asyncio.run(main())`,
                    hints: [
                      'Use asyncio.Queue',
                      'async def for coroutines',
                      'create_task for workers',
                      'await for async ops'
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
