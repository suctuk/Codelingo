export const javascriptToGoCurriculum = {
  sections: [
    {
      id: 'basics',
      title: 'From JavaScript to Go: Getting Started',
      description: 'Learn how to translate JavaScript concepts into Go code',
      units: [
        {
          id: 'unit_1',
          title: 'Basic Syntax Differences',
          lessons: [
            {
              id: 'lesson_1_1',
              title: 'Variables and Types',
              content: {
                theory: 'Convert JavaScript\'s dynamic typing to Go\'s static typing',
                examples: [
                  {
                    source: `// JavaScript
let age = 42;
let name = "Alice";
let isActive = true;
const PI = 3.14;`,
                    target: `// Go
var age int = 42
var name string = "Alice"
var isActive bool = true
const PI = 3.14

// Or with type inference:
age := 42
name := "Alice"
isActive := true`,
                    explanation: 'Go uses := for declaration with type inference, or var with explicit types'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert these JavaScript variables to Go:',
                    statements: [
                      '// JavaScript',
                      'let count = 100;',
                      'let price = 9.99;',
                      'let message = "Hello";',
                      'const MAX_SIZE = 1000;'
                    ],
                    solution: `// Go
count := 100
price := 9.99
message := "Hello"
const MAX_SIZE = 1000

// Or with explicit types:
var count int = 100
var price float64 = 9.99
var message string = "Hello"`,
                    hints: [
                      'Use := for short declaration',
                      'var for explicit types',
                      'const for constants',
                      'No semicolons needed'
                    ]
                  }
                ]
              }
            },
            {
              id: 'lesson_1_2',
              title: 'Functions and Methods',
              content: {
                theory: 'Convert JavaScript functions to Go functions with type signatures',
                examples: [
                  {
                    source: `// JavaScript
function add(a, b) {
    return a + b;
}

const greet = (name) => {
    console.log(\`Hello, \${name}!\`);
};`,
                    target: `// Go
func add(a, b int) int {
    return a + b
}

func greet(name string) {
    fmt.Printf("Hello, %s!\\n", name)
}`,
                    explanation: 'Go requires parameter types and return types'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert these JavaScript functions to Go:',
                    statements: [
                      '// JavaScript',
                      'function multiply(x, y) {',
                      '    return x * y;',
                      '}',
                      '',
                      'const isAdult = (age) => age >= 18;'
                    ],
                    solution: `// Go
func multiply(x, y int) int {
    return x * y
}

func isAdult(age int) bool {
    return age >= 18
}`,
                    hints: [
                      'Add parameter types',
                      'Specify return type',
                      'No arrow functions in Go',
                      'Use explicit return'
                    ]
                  }
                ]
              }
            }
          ]
        },
        {
          id: 'unit_2',
          title: 'Arrays and Slices',
          lessons: [
            {
              id: 'lesson_2_1',
              title: 'Working with Collections',
              content: {
                theory: 'Convert JavaScript arrays to Go slices and arrays',
                examples: [
                  {
                    source: `// JavaScript
const numbers = [1, 2, 3];
numbers.push(4);
numbers.forEach(n => console.log(n));`,
                    target: `// Go
numbers := []int{1, 2, 3}
numbers = append(numbers, 4)
for _, n := range numbers {
    fmt.Println(n)
}`,
                    explanation: 'Go uses slices for dynamic arrays and append for adding elements'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert this JavaScript array code to Go:',
                    statements: [
                      '// JavaScript',
                      'const fruits = ["apple", "banana"];',
                      'fruits.push("orange");',
                      'fruits.forEach(fruit => {',
                      '    console.log(fruit.toUpperCase());',
                      '});'
                    ],
                    solution: `// Go
fruits := []string{"apple", "banana"}
fruits = append(fruits, "orange")
for _, fruit := range fruits {
    fmt.Println(strings.ToUpper(fruit))
}`,
                    hints: [
                      'Use []type for slices',
                      'append for adding items',
                      'for range for iteration',
                      'strings.ToUpper for uppercase'
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
      description: 'Learn Go\'s concurrency model coming from JavaScript',
      units: [
        {
          id: 'unit_1',
          title: 'From Promises to Goroutines',
          lessons: [
            {
              id: 'lesson_1_1',
              title: 'Async Operations',
              content: {
                theory: 'Convert JavaScript async/await to Go goroutines and channels',
                examples: [
                  {
                    source: `// JavaScript
async function fetchData() {
    const result = await fetch(url);
    console.log(result);
}

fetchData();`,
                    target: `// Go
func fetchData(done chan bool) {
    go func() {
        result := makeRequest()  // Hypothetical function
        fmt.Println(result)
        done <- true
    }()
}

func main() {
    done := make(chan bool)
    fetchData(done)
    <-done
}`,
                    explanation: 'Go uses goroutines and channels instead of promises'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert this JavaScript async code to Go:',
                    statements: [
                      '// JavaScript',
                      'async function processItems(items) {',
                      '    for (const item of items) {',
                      '        await processItem(item);',
                      '        console.log("Processed:", item);',
                      '    }',
                      '}'
                    ],
                    solution: `// Go
func processItems(items []string, done chan bool) {
    go func() {
        for _, item := range items {
            processItem(item)  // Assume this exists
            fmt.Printf("Processed: %s\\n", item)
        }
        done <- true
    }()
}

func main() {
    items := []string{"a", "b", "c"}
    done := make(chan bool)
    processItems(items, done)
    <-done
}`,
                    hints: [
                      'Use goroutines with go',
                      'Create channels with make',
                      'Send/receive with <-',
                      'for range for iteration'
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
