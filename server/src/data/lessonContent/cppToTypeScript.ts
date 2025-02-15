export const cppToTypeScriptCurriculum = {
  sections: [
    {
      id: 'getting_started',
      title: 'Getting Started with TypeScript',
      description: 'Learn the basics of TypeScript coming from C++',
      units: [
        {
          id: 'unit_1',
          title: 'Basic Syntax',
          lessons: [
            {
              id: 'lesson_1_1',
              title: 'Hello, TypeScript!',
              content: {
                theory: 'Convert C++ console output to TypeScript',
                examples: [
                  {
                    source: `// C++
#include <iostream>

int main() {
    std::cout << "Hello, World!" << std::endl;
    std::cout << "Value: " << 42 << std::endl;
    return 0;
}`,
                    target: `// TypeScript
console.log("Hello, World!");
console.log("Value:", 42);`,
                    explanation: 'TypeScript uses console.log for output'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Complete the console output',
                    code: 'console.___("Hello from TypeScript!");',
                    solution: 'console.log("Hello from TypeScript!");',
                    hints: ['Use console.log', 'String in quotes']
                  }
                ],
                quiz: [
                  {
                    question: 'Which method is used for console output in TypeScript?',
                    options: ['print', 'log', 'cout', 'write'],
                    answer: 1
                  }
                ]
              }
            },
            {
              id: 'lesson_1_2',
              title: 'Variables and Types',
              content: {
                theory: 'Convert C++ variables to TypeScript',
                examples: [
                  {
                    source: `// C++
int age = 25;
double height = 1.75;
std::string name = "Alice";
bool isStudent = true;`,
                    target: `// TypeScript
let age: number = 25;
let height: number = 1.75;
let name: string = "Alice";
let isStudent: boolean = true;`,
                    explanation: 'TypeScript uses type annotations'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Declare a variable with type',
                    code: 'let score: ___ = ___;',
                    solution: 'let score: number = 100;',
                    hints: ['Use number type', 'Assign numeric value']
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
                theory: 'Convert C++ if statements to TypeScript',
                examples: [
                  {
                    source: `// C++
if (age >= 18) {
    std::cout << "Adult" << std::endl;
} else {
    std::cout << "Minor" << std::endl;
}`,
                    target: `// TypeScript
if (age >= 18) {
    console.log("Adult");
} else {
    console.log("Minor");
}`,
                    explanation: 'TypeScript uses similar if syntax'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Complete the if statement',
                    code: 'if (___ > 90) {\n    console.log("___");\n} ___ {\n    console.log("Try again");\n}',
                    solution: 'if (score > 90) {\n    console.log("Excellent");\n} else {\n    console.log("Try again");\n}',
                    hints: ['Use score variable', 'Add else block']
                  }
                ]
              }
            }
          ]
        }
      ]
    },
    {
      id: 'basics',
      title: 'From C++ to TypeScript: Getting Started',
      description: 'Learn how to translate C++ concepts into TypeScript code',
      units: [
        {
          id: 'unit_1',
          title: 'Type System',
          lessons: [
            {
              id: 'lesson_1_1',
              title: 'Classes and Interfaces',
              content: {
                theory: 'Convert C++ classes to TypeScript classes and interfaces',
                examples: [
                  {
                    source: `// C++
class Shape {
public:
    virtual double area() const = 0;
    virtual double perimeter() const = 0;
    virtual ~Shape() {}
};

class Circle : public Shape {
private:
    double radius;

public:
    Circle(double r) : radius(r) {}
    
    double area() const override {
        return M_PI * radius * radius;
    }
    
    double perimeter() const override {
        return 2 * M_PI * radius;
    }
};`,
                    target: `// TypeScript
interface Shape {
    area(): number;
    perimeter(): number;
}

class Circle implements Shape {
    constructor(private radius: number) {}
    
    area(): number {
        return Math.PI * this.radius * this.radius;
    }
    
    perimeter(): number {
        return 2 * Math.PI * this.radius;
    }
}`,
                    explanation: 'TypeScript uses interfaces and class implementation'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert this C++ class hierarchy to TypeScript:',
                    statements: [
                      '// C++',
                      'class Animal {',
                      'public:',
                      '    virtual std::string makeSound() const = 0;',
                      '    virtual ~Animal() {}',
                      '};',
                      '',
                      'class Dog : public Animal {',
                      'private:',
                      '    std::string name;',
                      '',
                      'public:',
                      '    Dog(const std::string& n) : name(n) {}',
                      '    ',
                      '    std::string makeSound() const override {',
                      '        return name + " says: Woof!";',
                      '    }',
                      '    ',
                      '    void setName(const std::string& n) {',
                      '        name = n;',
                      '    }',
                      '};'
                    ],
                    solution: `// TypeScript
interface Animal {
    makeSound(): string;
}

class Dog implements Animal {
    constructor(private name: string) {}
    
    makeSound(): string {
        return \`\${this.name} says: Woof!\`;
    }
    
    setName(name: string): void {
        this.name = name;
    }
    
    // Optional: getter for name
    getName(): string {
        return this.name;
    }
}`,
                    hints: [
                      'Use interface',
                      'Private fields',
                      'Template literals',
                      'Method signatures'
                    ]
                  }
                ]
              }
            },
            {
              id: 'lesson_1_2',
              title: 'Templates to Generics',
              content: {
                theory: 'Convert C++ templates to TypeScript generics',
                examples: [
                  {
                    source: `// C++
template<typename T>
class Stack {
private:
    std::vector<T> items;

public:
    void push(const T& item) {
        items.push_back(item);
    }
    
    T pop() {
        if (items.empty()) {
            throw std::runtime_error("Stack is empty");
        }
        T item = items.back();
        items.pop_back();
        return item;
    }
    
    bool isEmpty() const {
        return items.empty();
    }
};`,
                    target: `// TypeScript
class Stack<T> {
    private items: T[] = [];
    
    push(item: T): void {
        this.items.push(item);
    }
    
    pop(): T {
        if (this.isEmpty()) {
            throw new Error("Stack is empty");
        }
        return this.items.pop()!;
    }
    
    isEmpty(): boolean {
        return this.items.length === 0;
    }
}`,
                    explanation: 'TypeScript uses angle brackets for generics'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert this C++ template code to TypeScript:',
                    statements: [
                      '// C++',
                      'template<typename K, typename V>',
                      'class Pair {',
                      'private:',
                      '    K key;',
                      '    V value;',
                      '',
                      'public:',
                      '    Pair(const K& k, const V& v)',
                      '        : key(k), value(v) {}',
                      '    ',
                      '    K getKey() const { return key; }',
                      '    V getValue() const { return value; }',
                      '    ',
                      '    void setValue(const V& v) {',
                      '        value = v;',
                      '    }',
                      '};',
                      '',
                      'template<typename T>',
                      'T max(const T& a, const T& b) {',
                      '    return a > b ? a : b;',
                      '}'
                    ],
                    solution: `// TypeScript
class Pair<K, V> {
    constructor(
        private key: K,
        private value: V
    ) {}
    
    getKey(): K {
        return this.key;
    }
    
    getValue(): V {
        return this.value;
    }
    
    setValue(value: V): void {
        this.value = value;
    }
}

function max<T>(a: T, b: T): T {
    return a > b ? a : b;
}

// Usage examples
const numberPair = new Pair<number, string>(1, "one");
const maxNum = max<number>(5, 10);
const maxStr = max<string>("apple", "banana");`,
                    hints: [
                      'Multiple type params',
                      'Constructor params',
                      'Generic functions',
                      'Type constraints'
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
              title: 'Threads to Promises',
              content: {
                theory: 'Convert C++ threads to TypeScript async/await',
                examples: [
                  {
                    source: `// C++
#include <thread>
#include <future>

std::string fetchData(const std::string& url) {
    // Simulated network request
    return "data from " + url;
}

void processUrls() {
    std::vector<std::future<std::string>> futures;
    std::vector<std::string> urls = {
        "url1", "url2", "url3"
    };
    
    for (const auto& url : urls) {
        futures.push_back(
            std::async(std::launch::async,
                      fetchData, url)
        );
    }
    
    for (auto& future : futures) {
        std::cout << future.get() << std::endl;
    }
}`,
                    target: `// TypeScript
async function fetchData(url: string): Promise<string> {
    // Simulated network request
    return \`data from \${url}\`;
}

async function processUrls(): Promise<void> {
    const urls = ["url1", "url2", "url3"];
    
    try {
        const promises = urls.map(url => fetchData(url));
        const results = await Promise.all(promises);
        
        results.forEach(result => {
            console.log(result);
        });
    } catch (error) {
        console.error("Error:", error);
    }
}

// Usage
processUrls();`,
                    explanation: 'TypeScript uses Promises and async/await'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert this C++ concurrent code to TypeScript:',
                    statements: [
                      '// C++',
                      'class DataProcessor {',
                      'public:',
                      '    static std::string process(const std::string& data) {',
                      '        return data + " processed";',
                      '    }',
                      '};',
                      '',
                      'void processItems() {',
                      '    std::vector<std::string> items = {',
                      '        "item1", "item2", "item3"',
                      '    };',
                      '    std::vector<std::future<std::string>> futures;',
                      '    ',
                      '    for (const auto& item : items) {',
                      '        futures.push_back(',
                      '            std::async(std::launch::async,',
                      '                      DataProcessor::process,',
                      '                      item)',
                      '        );',
                      '    }',
                      '    ',
                      '    for (auto& future : futures) {',
                      '        try {',
                      '            std::cout << future.get() << std::endl;',
                      '        } catch (const std::exception& e) {',
                      '            std::cerr << e.what() << std::endl;',
                      '        }',
                      '    }',
                      '}'
                    ],
                    solution: `// TypeScript
class DataProcessor {
    static async process(data: string): Promise<string> {
        return \`\${data} processed\`;
    }
}

async function processItems(): Promise<void> {
    const items = ["item1", "item2", "item3"];
    
    try {
        const promises = items.map(item => 
            DataProcessor.process(item)
        );
        
        const results = await Promise.all(promises);
        
        results.forEach(result => {
            console.log(result);
        });
    } catch (error) {
        console.error("Error:", error);
    }
}

// Usage with error handling
async function main() {
    try {
        await processItems();
    } catch (error) {
        console.error("Processing failed:", error);
    }
}

main();`,
                    hints: [
                      'Use async/await',
                      'Promise.all',
                      'Error handling',
                      'Static methods'
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
      id: 'section_1_basics',
      title: 'Fundamentals of TypeScript',
      description: 'Learn the basic concepts of TypeScript coming from C++',
      units: [
        {
          id: 'unit_1_output',
          title: 'Console Output',
          lessons: [
            {
              id: 'lesson_1_1',
              title: 'Basic Console Output',
              content: {
                theory: 'Convert C++ cout to TypeScript console.log',
                examples: [
                  {
                    source: `// C++
std::cout << "Hello" << std::endl;`,
                    target: `// TypeScript
console.log("Hello");`,
                    explanation: 'TypeScript uses console.log instead of cout'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Print "Hello World"',
                    code: 'console.___("Hello World");',
                    solution: 'console.log("Hello World");'
                  }
                ]
              }
            },
            {
              id: 'lesson_1_2',
              title: 'Multiple Values',
              content: {
                theory: 'Print multiple values in TypeScript',
                examples: [
                  {
                    source: `// C++
std::cout << "Name: " << name << ", Age: " << age << std::endl;`,
                    target: `// TypeScript
console.log("Name:", name, "Age:", age);`
                  }
                ]
              }
            },
            {
              id: 'lesson_1_3',
              title: 'String Formatting',
              content: {
                theory: 'Template literals in TypeScript',
                examples: [
                  {
                    source: `// C++
std::cout << "User " << name << " is " << age << " years old" << std::endl;`,
                    target: `// TypeScript
console.log(\`User \${name} is \${age} years old\`);`
                  }
                ]
              }
            },
            {
              id: 'lesson_1_4',
              title: 'Error Output',
              content: {
                theory: 'Error logging in TypeScript',
                examples: [
                  {
                    source: `// C++
std::cerr << "Error occurred" << std::endl;`,
                    target: `// TypeScript
console.error("Error occurred");`
                  }
                ]
              }
            },
            {
              id: 'lesson_1_5',
              title: 'Debug Output',
              content: {
                theory: 'Debug logging in TypeScript',
                examples: [
                  {
                    source: `// C++
#ifdef DEBUG
std::cout << "Debug: " << value << std::endl;
#endif`,
                    target: `// TypeScript
console.debug("Debug:", value);`
                  }
                ]
              }
            },
            {
              id: 'lesson_1_6',
              title: 'Warning Output',
              content: {
                theory: 'Warning messages in TypeScript',
                examples: [
                  {
                    source: `// C++
std::cerr << "Warning: " << message << std::endl;`,
                    target: `// TypeScript
console.warn("Warning:", message);`
                  }
                ]
              }
            },
            {
              id: 'lesson_1_7',
              title: 'Info Output',
              content: {
                theory: 'Information logging in TypeScript',
                examples: [
                  {
                    source: `// C++
std::cout << "Info: " << status << std::endl;`,
                    target: `// TypeScript
console.info("Info:", status);`
                  }
                ]
              }
            },
            {
              id: 'lesson_1_8',
              title: 'Object Output',
              content: {
                theory: 'Printing objects in TypeScript',
                examples: [
                  {
                    source: `// C++
std::cout << "User{name=" << user.name << ", age=" << user.age << "}" << std::endl;`,
                    target: `// TypeScript
console.log("User:", { name: user.name, age: user.age });`
                  }
                ]
              }
            },
            {
              id: 'lesson_1_9',
              title: 'Array Output',
              content: {
                theory: 'Printing arrays in TypeScript',
                examples: [
                  {
                    source: `// C++
std::cout << "Array: [";
for(const auto& item : arr) {
    std::cout << item << " ";
}
std::cout << "]" << std::endl;`,
                    target: `// TypeScript
console.log("Array:", arr);`
                  }
                ]
              }
            },
            {
              id: 'lesson_1_10',
              title: 'Formatted Output',
              content: {
                theory: 'Advanced formatting in TypeScript',
                examples: [
                  {
                    source: `// C++
printf("%.2f", number);`,
                    target: `// TypeScript
console.log(number.toFixed(2));`
                  }
                ]
              }
            }
          ]
        },
        {
          id: 'unit_2_variables',
          title: 'Variables and Types',
          lessons: [
            {
              id: 'lesson_2_1',
              title: 'Number Variables',
              content: {
                theory: 'Convert C++ numeric types to TypeScript',
                examples: [
                  {
                    source: `// C++
int count = 5;
double price = 10.99;`,
                    target: `// TypeScript
let count: number = 5;
let price: number = 10.99;`
                  }
                ]
              }
            },
            {
              id: 'lesson_2_2',
              title: 'String Variables',
              content: {
                theory: 'Convert C++ strings to TypeScript strings',
                examples: [
                  {
                    source: `// C++
std::string name = "John";
char letter = 'A';`,
                    target: `// TypeScript
let name: string = "John";
let letter: string = 'A';`
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Declare a string variable',
                    code: 'let message: ___ = "___";',
                    solution: 'let message: string = "Hello";',
                    hints: ['Use string type', 'Add a text message']
                  }
                ]
              }
            },
            {
              id: 'lesson_2_3',
              title: 'Boolean Variables',
              content: {
                theory: 'Convert C++ booleans to TypeScript',
                examples: [
                  {
                    source: `// C++
bool isActive = true;
bool hasError = false;`,
                    target: `// TypeScript
let isActive: boolean = true;
let hasError: boolean = false;`
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Complete the boolean declaration',
                    code: 'let isValid: ___ = ___;',
                    solution: 'let isValid: boolean = true;',
                    hints: ['Use boolean type', 'true or false value']
                  }
                ]
              }
            },
            {
              id: 'lesson_2_4',
              title: 'Arrays',
              content: {
                theory: 'Convert C++ arrays to TypeScript arrays',
                examples: [
                  {
                    source: `// C++
int numbers[] = {1, 2, 3};
std::vector<string> names = {"Alice", "Bob"};`,
                    target: `// TypeScript
let numbers: number[] = [1, 2, 3];
let names: string[] = ["Alice", "Bob"];`
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Create a number array',
                    code: 'let scores: ___[] = [___];',
                    solution: 'let scores: number[] = [90, 85, 95];',
                    hints: ['Use number type', 'Add comma-separated values']
                  }
                ]
              }
            },
            {
              id: 'lesson_2_5',
              title: 'Object Types',
              content: {
                theory: 'Convert C++ structs to TypeScript objects',
                examples: [
                  {
                    source: `// C++
struct User {
    string name;
    int age;
};
User user = {"John", 25};`,
                    target: `// TypeScript
type User = {
    name: string;
    age: number;
};
let user: User = { name: "John", age: 25 };`
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Define an object type',
                    code: 'type Product = {\n    ___: string;\n    ___: number;\n};',
                    solution: 'type Product = {\n    name: string;\n    price: number;\n};',
                    hints: ['Add name property', 'Add price property']
                  }
                ]
              }
            },
            {
              id: 'lesson_2_6',
              title: 'Type Inference',
              content: {
                theory: 'TypeScript type inference vs C++ auto',
                examples: [
                  {
                    source: `// C++
auto value = 42;
auto text = "Hello";`,
                    target: `// TypeScript
let value = 42;         // inferred as number
let text = "Hello";     // inferred as string`
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Use type inference',
                    code: 'let result = ___;  // should be boolean',
                    solution: 'let result = true;  // should be boolean',
                    hints: ['No type annotation needed', 'Use boolean value']
                  }
                ]
              }
            },
            {
              id: 'lesson_2_7',
              title: 'Const Variables',
              content: {
                theory: 'Convert C++ const to TypeScript const',
                examples: [
                  {
                    source: `// C++
const int MAX_VALUE = 100;
const string VERSION = "1.0";`,
                    target: `// TypeScript
const MAX_VALUE: number = 100;
const VERSION: string = "1.0";`
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Declare a constant',
                    code: '___ PI: number = ___;',
                    solution: 'const PI: number = 3.14;',
                    hints: ['Use const keyword', 'Add numeric value']
                  }
                ]
              }
            },
            {
              id: 'lesson_2_8',
              title: 'Union Types',
              content: {
                theory: 'TypeScript union types (no C++ equivalent)',
                examples: [
                  {
                    source: `// C++
// No direct equivalent
variant<int, string> value;`,
                    target: `// TypeScript
let value: number | string;
value = 42;      // valid
value = "text";  // valid`
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Create a union type',
                    code: 'let id: ___ | ___;',
                    solution: 'let id: number | string;',
                    hints: ['Use number type', 'Use string type']
                  }
                ]
              }
            },
            {
              id: 'lesson_2_9',
              title: 'Type Assertions',
              content: {
                theory: 'TypeScript type assertions vs C++ casts',
                examples: [
                  {
                    source: `// C++
double num = 42.5;
int value = (int)num;`,
                    target: `// TypeScript
let value = 42.5;
let intValue = value as number;`
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Use type assertion',
                    code: 'let someValue: any = "123";\nlet length = (someValue as ___).length;',
                    solution: 'let someValue: any = "123";\nlet length = (someValue as string).length;',
                    hints: ['Assert as string', 'Access string length']
                  }
                ]
              }
            },
            {
              id: 'lesson_2_10',
              title: 'Null and Undefined',
              content: {
                theory: 'TypeScript null/undefined vs C++ nullptr',
                examples: [
                  {
                    source: `// C++
int* ptr = nullptr;`,
                    target: `// TypeScript
let value: number | null = null;
let name: string | undefined;`
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Handle nullable value',
                    code: 'let data: string | ___ = ___;',
                    solution: 'let data: string | null = null;',
                    hints: ['Use null type', 'Assign null value']
                  }
                ]
              }
            }
          ]
        },
        {
          id: 'unit_3_control_flow',
          title: 'Control Flow',
          lessons: [
            {
              id: 'lesson_3_1',
              title: 'If Statements',
              content: {
                theory: 'Convert C++ if statements to TypeScript',
                examples: [
                  {
                    source: `// C++
if (x > 0) {
    cout << "Positive";
} else if (x < 0) {
    cout << "Negative";
} else {
    cout << "Zero";
}`,
                    target: `// TypeScript
if (x > 0) {
    console.log("Positive");
} else if (x < 0) {
    console.log("Negative");
} else {
    console.log("Zero");
}`
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Complete the if statement',
                    code: 'if (___ > 100) {\n    console.log("High");\n} ___ (___ > 50) {\n    console.log("Medium");\n} ___ {\n    console.log("Low");\n}',
                    solution: 'if (score > 100) {\n    console.log("High");\n} else if (score > 50) {\n    console.log("Medium");\n} else {\n    console.log("Low");\n}',
                    hints: ['Use score variable', 'Add else if', 'Add else']
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
