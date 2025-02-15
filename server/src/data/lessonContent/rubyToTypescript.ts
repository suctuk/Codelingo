export const rubyToTypescriptCurriculum = {
  sections: [
    {
      id: 'basics',
      title: 'From Ruby to TypeScript: Getting Started',
      description: 'Learn how to translate Ruby concepts into TypeScript code',
      units: [
        {
          id: 'unit_1',
          title: 'Type System Basics',
          lessons: [
            {
              id: 'lesson_1_1',
              title: 'Variables and Types',
              content: {
                theory: 'Convert Ruby dynamic types to TypeScript static types',
                examples: [
                  {
                    source: `# Ruby
name = "Alice"
age = 42
is_active = true
price = 9.99
numbers = [1, 2, 3]
person = { name: "Bob", age: 30 }`,
                    target: `// TypeScript
let name: string = "Alice";
let age: number = 42;
let isActive: boolean = true;
let price: number = 9.99;
let numbers: number[] = [1, 2, 3];
interface Person {
    name: string;
    age: number;
}
let person: Person = { name: "Bob", age: 30 };`,
                    explanation: 'TypeScript requires type annotations and interfaces for objects'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert these Ruby variables to TypeScript:',
                    statements: [
                      '# Ruby',
                      'PI = 3.14159',
                      'colors = %w[red green blue]',
                      'point = { x: 10, y: 20 }',
                      'grades = { math: 95, science: 88 }'
                    ],
                    solution: `// TypeScript
const PI: number = 3.14159;
const colors: string[] = ["red", "green", "blue"];

interface Point {
    x: number;
    y: number;
}
const point: Point = { x: 10, y: 20 };

interface Grades {
    math: number;
    science: number;
}
const grades: Grades = { math: 95, science: 88 };`,
                    hints: [
                      'Use const for constants',
                      'Define interfaces',
                      'Array type with []',
                      'Type annotations with :'
                    ]
                  }
                ]
              }
            },
            {
              id: 'lesson_1_2',
              title: 'Methods and Functions',
              content: {
                theory: 'Convert Ruby methods to TypeScript functions',
                examples: [
                  {
                    source: `# Ruby
def greet(name)
  "Hello, #{name}!"
end

def calculate_total(*numbers)
  numbers.sum
end

def process_user(name, age, city: "Unknown")
  "#{name} (#{age}) from #{city}"
end`,
                    target: `// TypeScript
function greet(name: string): string {
    return `Hello, ${name}!`;
}

function calculateTotal(...numbers: number[]): number {
    return numbers.reduce((sum, n) => sum + n, 0);
}

interface UserOptions {
    city?: string;
}

function processUser(name: string, age: number, options: UserOptions = { city: "Unknown" }): string {
    return `${name} (${age}) from ${options.city}`;
}`,
                    explanation: 'TypeScript uses type annotations and interfaces for options'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert these Ruby methods to TypeScript:',
                    statements: [
                      '# Ruby',
                      'def multiply(*nums)',
                      '  nums.inject(1, :*)',
                      'end',
                      '',
                      'def format_name(first, last, title: "")',
                      '  return "#{first} #{last}" if title.empty?',
                      '  "#{title} #{first} #{last}"',
                      'end'
                    ],
                    solution: `// TypeScript
function multiply(...nums: number[]): number {
    return nums.reduce((result, n) => result * n, 1);
}

interface NameOptions {
    title?: string;
}

function formatName(first: string, last: string, options: NameOptions = {}): string {
    if (!options.title) {
        return \`\${first} \${last}\`;
    }
    return \`\${options.title} \${first} \${last}\`;
}`,
                    hints: [
                      'Use rest parameters',
                      'Define option interfaces',
                      'Type annotations',
                      'Template literals'
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
              title: 'Class Definition',
              content: {
                theory: 'Convert Ruby classes to TypeScript classes',
                examples: [
                  {
                    source: `# Ruby
class Person
  attr_reader :name, :age
  
  def initialize(name, age)
    @name = name
    @age = age
  end
  
  def greet
    "Hi, I'm #{@name}"
  end
  
  def birthday
    @age += 1
  end
end`,
                    target: `// TypeScript
class Person {
    private name: string;
    private age: number;
    
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
    
    getName(): string {
        return this.name;
    }
    
    getAge(): number {
        return this.age;
    }
    
    greet(): string {
        return \`Hi, I'm \${this.name}\`;
    }
    
    birthday(): void {
        this.age += 1;
    }
}`,
                    explanation: 'TypeScript uses access modifiers and type annotations'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert this Ruby class to TypeScript:',
                    statements: [
                      '# Ruby',
                      'class BankAccount',
                      '  def initialize(balance = 0)',
                      '    @balance = balance',
                      '  end',
                      '',
                      '  def balance',
                      '    @balance',
                      '  end',
                      '',
                      '  def deposit(amount)',
                      '    @balance += amount',
                      '  end',
                      '',
                      '  def withdraw(amount)',
                      '    return false if amount > @balance',
                      '    @balance -= amount',
                      '    true',
                      '  end',
                      'end'
                    ],
                    solution: `// TypeScript
class BankAccount {
    private balance: number;
    
    constructor(balance: number = 0) {
        this.balance = balance;
    }
    
    getBalance(): number {
        return this.balance;
    }
    
    deposit(amount: number): void {
        this.balance += amount;
    }
    
    withdraw(amount: number): boolean {
        if (amount > this.balance) {
            return false;
        }
        this.balance -= amount;
        return true;
    }
}`,
                    hints: [
                      'Use private fields',
                      'Type annotations',
                      'Return types',
                      'Default parameters'
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
      title: 'Advanced Features',
      description: 'Learn TypeScript-specific features coming from Ruby',
      units: [
        {
          id: 'unit_1',
          title: 'Generics and Type Guards',
          lessons: [
            {
              id: 'lesson_1_1',
              title: 'Generic Types',
              content: {
                theory: 'Convert Ruby duck typing to TypeScript generics',
                examples: [
                  {
                    source: `# Ruby
class Box
  def initialize(value)
    @value = value
  end
  
  def get
    @value
  end
end

class Printable
  def to_s
    "Printable object"
  end
end`,
                    target: `// TypeScript
class Box<T> {
    private value: T;
    
    constructor(value: T) {
        this.value = value;
    }
    
    getValue(): T {
        return this.value;
    }
}

interface Printable {
    toString(): string;
}

class PrintableBox<T extends Printable> {
    private value: T;
    
    constructor(value: T) {
        this.value = value;
    }
    
    print(): void {
        console.log(this.value.toString());
    }
}`,
                    explanation: 'TypeScript uses generics and interfaces for type constraints'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert this Ruby code to TypeScript generics:',
                    statements: [
                      '# Ruby',
                      'class Stack',
                      '  def initialize',
                      '    @items = []',
                      '  end',
                      '',
                      '  def push(item)',
                      '    @items.push(item)',
                      '  end',
                      '',
                      '  def pop',
                      '    @items.pop',
                      '  end',
                      '',
                      '  def empty?',
                      '    @items.empty?',
                      '  end',
                      'end'
                    ],
                    solution: `// TypeScript
class Stack<T> {
    private items: T[] = [];
    
    push(item: T): void {
        this.items.push(item);
    }
    
    pop(): T | undefined {
        return this.items.pop();
    }
    
    isEmpty(): boolean {
        return this.items.length === 0;
    }
}

// Usage:
const numberStack = new Stack<number>();
const stringStack = new Stack<string>();`,
                    hints: [
                      'Use generic type T',
                      'Array of type T',
                      'Union with undefined',
                      'Type-specific stacks'
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
