import { createLanguagePairCurriculum } from './languagePairFactory';

export const pythonToGoCurriculum = {
  ...createLanguagePairCurriculum('python', 'go'),
  sections: [
    {
      id: 'section_1_basics',
      title: 'Go Fundamentals',
      description: 'Learn Go basics from a Python perspective',
      units: [
        {
          id: 'unit_1_types',
          title: 'Variables and Types',
          description: 'Learn Go variables and types',
          skillLevel: 'beginner',
          xpToUnlock: 0,
          lessons: [
            {
              id: 'lesson_1_1',
              title: 'Variable Declaration',
              estimatedTime: 10,
              content: {
                theory: 'Converting Python variables to Go',
                difficulty: 'beginner',
                xpPoints: 10,
                examples: [
                  {
                    source: `name = "Alice"
age = 25
height = 1.75
is_active = True
PI = 3.14159  # Constant by convention`,
                    target: `var name string = "Alice"
var age int = 25
var height float64 = 1.75
var isActive bool = true
const PI float64 = 3.14159`,
                    explanation: 'Go requires explicit types and uses camelCase'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Convert Python variables to Go',
                    code: '___ message ___ = "Hello"\n___ count ___ = 42\n___ isValid ___ = true',
                    solution: 'var message string = "Hello"\nvar count int = 42\nvar isValid bool = true',
                    hints: ['Use var keyword', 'Add type declarations', 'Use camelCase'],
                    xpReward: 5
                  }
                ]
              }
            },
            {
              id: 'lesson_1_2',
              title: 'Collections',
              estimatedTime: 15,
              content: {
                theory: 'Converting Python collections to Go',
                difficulty: 'beginner',
                xpPoints: 15,
                examples: [
                  {
                    source: `numbers = [1, 2, 3]
scores = {
    "Alice": 95,
    "Bob": 87
}
point = (10, 20)  # Tuple`,
                    target: `numbers := []int{1, 2, 3}
scores := map[string]int{
    "Alice": 95,
    "Bob": 87,
}
type Point struct {
    X, Y int
}
point := Point{10, 20}  // Struct for tuple`,
                    explanation: 'Go uses slices, maps, and structs'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Convert Python collections to Go',
                    code: 'numbers := []int{___}\nscores := map[string]int{\n    ___: ___,\n    ___: ___,\n}',
                    solution: 'numbers := []int{1, 2, 3, 4, 5}\nscores := map[string]int{\n    "Alice": 95,\n    "Bob": 87,\n}',
                    hints: ['Use slice syntax', 'Use map syntax', 'Add trailing commas'],
                    xpReward: 8
                  }
                ]
              }
            }
          ]
        },
        {
          id: 'unit_2_functions',
          title: 'Functions',
          description: 'Learn Go functions',
          skillLevel: 'beginner',
          xpToUnlock: 50,
          lessons: [
            {
              id: 'lesson_2_1',
              title: 'Function Definition',
              estimatedTime: 20,
              content: {
                theory: 'Converting Python functions to Go',
                difficulty: 'beginner',
                xpPoints: 20,
                examples: [
                  {
                    source: `def greet(name):
    return f"Hello, {name}!"

def add(a, b=0):
    return a + b`,
                    target: `func greet(name string) string {
    return fmt.Sprintf("Hello, %s!", name)
}

func add(a int, b int) int {
    return a + b
}`,
                    explanation: 'Go requires explicit types and uses fmt.Sprintf'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Convert Python function to Go',
                    code: 'func multiply(___ x, y ___) ___ {\n    ___ x * y\n}',
                    solution: 'func multiply(x, y int) int {\n    return x * y\n}',
                    hints: ['Add parameter types', 'Add return type', 'Use return keyword'],
                    xpReward: 10
                  }
                ]
              }
            }
          ]
        },
        {
          id: 'unit_3_structs',
          title: 'Structs and Methods',
          description: 'Learn Go structs',
          skillLevel: 'intermediate',
          xpToUnlock: 100,
          lessons: [
            {
              id: 'lesson_3_1',
              title: 'Class to Struct',
              estimatedTime: 25,
              content: {
                theory: 'Converting Python classes to Go structs',
                difficulty: 'intermediate',
                xpPoints: 25,
                examples: [
                  {
                    source: `class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def greet(self):
        return f"Hello, I'm {self.name}!"`,
                    target: `type Person struct {
    name string
    age  int
}

func (p Person) Greet() string {
    return fmt.Sprintf("Hello, I'm %s!", p.name)
}`,
                    explanation: 'Go uses structs with methods'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Convert Python class to Go struct',
                    code: 'type Rectangle ___ {\n    ___ float64\n    ___ float64\n}\n\nfunc (r Rectangle) Area() float64 {\n    return ___\n}',
                    solution: 'type Rectangle struct {\n    width float64\n    height float64\n}\n\nfunc (r Rectangle) Area() float64 {\n    return r.width * r.height\n}',
                    hints: ['Use struct keyword', 'Define fields with types', 'Use receiver syntax'],
                    xpReward: 15
                  }
                ]
              }
            }
          ]
        },
        {
          id: 'unit_4_goroutines',
          title: 'Concurrency',
          description: 'Learn Go concurrency',
          skillLevel: 'advanced',
          xpToUnlock: 150,
          lessons: [
            {
              id: 'lesson_4_1',
              title: 'Async to Goroutines',
              estimatedTime: 30,
              content: {
                theory: 'Converting Python async/await to Go goroutines',
                difficulty: 'advanced',
                xpPoints: 30,
                examples: [
                  {
                    source: `async def fetch_data():
    await asyncio.sleep(1)
    return "data"

async def process():
    data = await fetch_data()
    print(data)`,
                    target: `func fetchData() chan string {
    result := make(chan string)
    go func() {
        time.Sleep(time.Second)
        result <- "data"
    }()
    return result
}

func process() {
    data := <-fetchData()
    fmt.Println(data)
}`,
                    explanation: 'Go uses goroutines and channels'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Convert Python async to Go',
                    code: 'func processItems(items []int) chan int {\n    result := make(___)\n    ___() {\n        for _, item := range items {\n            result <- item * 2\n        }\n        ___ result\n    }()\n    return result\n}',
                    solution: 'func processItems(items []int) chan int {\n    result := make(chan int)\n    go func() {\n        for _, item := range items {\n            result <- item * 2\n        }\n        close(result)\n    }()\n    return result\n}',
                    hints: ['Create channel', 'Use go keyword', 'Close channel'],
                    xpReward: 20
                  }
                ],
                practice: {
                  type: 'code_project',
                  instructions: 'Create a concurrent function that processes multiple items',
                  testCases: [
                    {
                      input: 'processParallel([]int{1, 2, 3})',
                      expectedOutput: '[2, 4, 6]',
                      code: `func processParallel(items []int) []int {
    results := make(chan int, len(items))
    for _, item := range items {
        go func(x int) {
            results <- x * 2
        }(item)
    }
    
    var processed []int
    for i := 0; i < len(items); i++ {
        processed = append(processed, <-results)
    }
    return processed
}`
                    }
                  ],
                  xpReward: 25
                }
              }
            }
          ]
        }
      ]
    }
  ]
};
