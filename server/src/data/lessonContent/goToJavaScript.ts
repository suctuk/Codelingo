export const goToJavaScriptCurriculum = {
  sections: [
    {
      id: 'basics',
      title: 'From Go to JavaScript: Getting Started',
      description: 'Learn how to translate Go concepts into JavaScript code',
      units: [
        {
          id: 'unit_1',
          title: 'Basic Syntax and Types',
          lessons: [
            {
              id: 'lesson_1_1',
              title: 'Variables and Types',
              content: {
                theory: 'Convert Go static types to JavaScript dynamic types',
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
                    target: `// JavaScript
const name = "Alice";
let age = 42;
const isActive = true;
const price = 9.99;
const numbers = [1, 2, 3];
const person = {
    name: "Bob",
    age: 30
};`,
                    explanation: 'JavaScript uses dynamic typing and object literals'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert these Go variables to JavaScript:',
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
                    solution: `// JavaScript
const PI = 3.14159;
const colors = ["red", "green", "blue"];
const point = { x: 10, y: 20 };
const grades = {
    math: 95,
    science: 88
};`,
                    hints: [
                      'Use const/let',
                      'Object literals',
                      'Array literals',
                      'No type declarations'
                    ]
                  }
                ]
              }
            },
            {
              id: 'lesson_1_2',
              title: 'Functions and Methods',
              content: {
                theory: 'Convert Go functions to JavaScript functions',
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

type Person struct {
    Name string
    Age  int
}

func (p *Person) Birthday() {
    p.Age++
}`,
                    target: `// JavaScript
function greet(name) {
    return \`Hello, \${name}!\`;
}

function sum(...numbers) {
    return numbers.reduce((total, n) => total + n, 0);
}

class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    
    birthday() {
        this.age++;
    }
}`,
                    explanation: 'JavaScript uses classes and template literals'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert these Go functions to JavaScript:',
                    statements: [
                      '// Go',
                      'type Calculator struct {',
                      '    value int',
                      '}',
                      '',
                      'func (c *Calculator) Add(x int) {',
                      '    c.value += x',
                      '}',
                      '',
                      'func (c *Calculator) Multiply(x int) {',
                      '    c.value *= x',
                      '}',
                      '',
                      'func (c *Calculator) GetValue() int {',
                      '    return c.value',
                      '}'
                    ],
                    solution: `// JavaScript
class Calculator {
    constructor(value = 0) {
        this.value = value;
    }
    
    add(x) {
        this.value += x;
    }
    
    multiply(x) {
        this.value *= x;
    }
    
    getValue() {
        return this.value;
    }
}`,
                    hints: [
                      'Use class syntax',
                      'Constructor init',
                      'Method definitions',
                      'No type annotations'
                    ]
                  }
                ]
              }
            }
          ]
        },
        {
          id: 'unit_2',
          title: 'Concurrency and Async',
          lessons: [
            {
              id: 'lesson_2_1',
              title: 'From Goroutines to Promises',
              content: {
                theory: 'Convert Go concurrency patterns to JavaScript async/await',
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
                    target: `// JavaScript
async function fetchURL(url) {
    try {
        const response = await fetch(url);
        const text = await response.text();
        return text;
    } catch (error) {
        throw error;
    }
}

async function main() {
    const urls = ["url1", "url2", "url3"];
    try {
        const promises = urls.map(url => fetchURL(url));
        const results = await Promise.all(promises);
        results.forEach(result => console.log(result));
    } catch (error) {
        console.error(error);
    }
}

main();`,
                    explanation: 'JavaScript uses Promises and async/await for concurrency'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert this Go concurrent code to JavaScript:',
                    statements: [
                      '// Go',
                      'func processData(data int) int {',
                      '    return data * 2',
                      '}',
                      '',
                      'func main() {',
                      '    ch := make(chan int)',
                      '    data := []int{1, 2, 3, 4, 5}',
                      '',
                      '    for _, d := range data {',
                      '        go func(d int) {',
                      '            result := processData(d)',
                      '            ch <- result',
                      '        }(d)',
                      '    }',
                      '',
                      '    for range data {',
                      '        fmt.Println(<-ch)',
                      '    }',
                      '}'
                    ],
                    solution: `// JavaScript
function processData(data) {
    return data * 2;
}

async function main() {
    const data = [1, 2, 3, 4, 5];
    
    // Create array of promises
    const promises = data.map(async d => {
        return processData(d);
    });
    
    try {
        // Wait for all promises to resolve
        const results = await Promise.all(promises);
        results.forEach(result => console.log(result));
    } catch (error) {
        console.error(error);
    }
}

main();`,
                    hints: [
                      'Use Promise.all',
                      'async/await syntax',
                      'Array.map for tasks',
                      'Error handling'
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
