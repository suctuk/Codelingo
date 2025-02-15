export const rubyToGoCurriculum = {
  sections: [
    {
      id: 'basics',
      title: 'From Ruby to Go: Getting Started',
      description: 'Learn how to translate Ruby concepts into Go code',
      units: [
        {
          id: 'unit_1',
          title: 'Basic Syntax Differences',
          lessons: [
            {
              id: 'lesson_1_1',
              title: 'Variables and Types',
              content: {
                theory: 'Convert Ruby dynamic types to Go static types',
                examples: [
                  {
                    source: `# Ruby
name = "Alice"
age = 42
is_active = true
price = 9.99
numbers = [1, 2, 3]
person = { name: "Bob", age: 30 }`,
                    target: `// Go
name := "Alice"
age := 42
isActive := true
price := 9.99
numbers := []int{1, 2, 3}
person := struct {
    name string
    age  int
}{
    name: "Bob",
    age:  30,
}`,
                    explanation: 'Go requires explicit types and uses := for type inference'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert these Ruby variables to Go:',
                    statements: [
                      '# Ruby',
                      'PI = 3.14159',
                      'colors = ["red", "green", "blue"]',
                      'scores = { math: 95, science: 88 }',
                      'matrix = [[1, 2], [3, 4]]'
                    ],
                    solution: `// Go
const PI = 3.14159
colors := []string{"red", "green", "blue"}
scores := map[string]int{
    "math":    95,
    "science": 88,
}
matrix := [][]int{{1, 2}, {3, 4}}`,
                    hints: [
                      'Use const for constants',
                      'Specify slice types',
                      'Use map[K]V for hashes',
                      'Nested slices for arrays'
                    ]
                  }
                ]
              }
            },
            {
              id: 'lesson_1_2',
              title: 'Methods and Functions',
              content: {
                theory: 'Convert Ruby methods to Go functions',
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
                    target: `// Go
func greet(name string) string {
    return fmt.Sprintf("Hello, %s!", name)
}

func calculateTotal(numbers ...int) int {
    total := 0
    for _, n := range numbers {
        total += n
    }
    return total
}

type UserOptions struct {
    city string
}

func processUser(name string, age int, opts UserOptions) string {
    if opts.city == "" {
        opts.city = "Unknown"
    }
    return fmt.Sprintf("%s (%d) from %s", name, age, opts.city)
}`,
                    explanation: 'Go uses explicit types and structs for optional parameters'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert these Ruby methods to Go:',
                    statements: [
                      '# Ruby',
                      'def multiply(*nums)',
                      '  nums.reduce(1, :*)',
                      'end',
                      '',
                      'def format_name(first, last, title: "")',
                      '  title.empty? ? "#{first} #{last}" : "#{title} #{first} #{last}"',
                      'end'
                    ],
                    solution: `// Go
func multiply(nums ...int) int {
    result := 1
    for _, n := range nums {
        result *= n
    }
    return result
}

type NameOptions struct {
    title string
}

func formatName(first, last string, opts NameOptions) string {
    if opts.title == "" {
        return fmt.Sprintf("%s %s", first, last)
    }
    return fmt.Sprintf("%s %s %s", opts.title, first, last)
}`,
                    hints: [
                      'Use variadic params',
                      'Explicit return types',
                      'Struct for options',
                      'fmt.Sprintf for formatting'
                    ]
                  }
                ]
              }
            }
          ]
        },
        {
          id: 'unit_2',
          title: 'Classes and Structs',
          lessons: [
            {
              id: 'lesson_2_1',
              title: 'Class to Struct Conversion',
              content: {
                theory: 'Convert Ruby classes to Go structs and methods',
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
                    target: `// Go
type Person struct {
    name string
    age  int
}

func NewPerson(name string, age int) *Person {
    return &Person{
        name: name,
        age:  age,
    }
}

func (p *Person) Name() string {
    return p.name
}

func (p *Person) Age() int {
    return p.age
}

func (p *Person) Greet() string {
    return fmt.Sprintf("Hi, I'm %s", p.name)
}

func (p *Person) Birthday() {
    p.age++
}`,
                    explanation: 'Go uses structs with methods and constructor functions'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert this Ruby class to Go:',
                    statements: [
                      '# Ruby',
                      'class BankAccount',
                      '  def initialize(balance = 0)',
                      '    @balance = balance',
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
                      '',
                      '  def balance',
                      '    @balance',
                      '  end',
                      'end'
                    ],
                    solution: `// Go
type BankAccount struct {
    balance float64
}

func NewBankAccount(balance float64) *BankAccount {
    return &BankAccount{balance: balance}
}

func (ba *BankAccount) Deposit(amount float64) {
    ba.balance += amount
}

func (ba *BankAccount) Withdraw(amount float64) bool {
    if amount > ba.balance {
        return false
    }
    ba.balance -= amount
    return true
}

func (ba *BankAccount) Balance() float64 {
    return ba.balance
}`,
                    hints: [
                      'Use struct for state',
                      'Constructor returns pointer',
                      'Methods with receivers',
                      'Explicit return types'
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
      description: 'Learn Go\'s concurrency model coming from Ruby',
      units: [
        {
          id: 'unit_1',
          title: 'From Threads to Goroutines',
          lessons: [
            {
              id: 'lesson_1_1',
              title: 'Basic Concurrency',
              content: {
                theory: 'Convert Ruby threads to Go goroutines',
                examples: [
                  {
                    source: `# Ruby
Thread.new do
  puts "Working..."
  sleep 1
end.join

threads = 3.times.map do |i|
  Thread.new do
    puts "Thread #{i}"
  end
end
threads.each(&:join)`,
                    target: `// Go
go func() {
    fmt.Println("Working...")
    time.Sleep(time.Second)
}()

var wg sync.WaitGroup
for i := 0; i < 3; i++ {
    wg.Add(1)
    go func(i int) {
        defer wg.Done()
        fmt.Printf("Goroutine %d\\n", i)
    }(i)
}
wg.Wait()`,
                    explanation: 'Go uses lightweight goroutines and WaitGroups for synchronization'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert this Ruby concurrent code to Go:',
                    statements: [
                      '# Ruby',
                      'queue = Queue.new',
                      '',
                      'producer = Thread.new do',
                      '  5.times do |i|',
                      '    queue.push(i)',
                      '    sleep 0.1',
                      '  end',
                      'end',
                      '',
                      'consumer = Thread.new do',
                      '  5.times do',
                      '    value = queue.pop',
                      '    puts "Got: #{value}"',
                      '  end',
                      'end',
                      '',
                      '[producer, consumer].each(&:join)'
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
            time.Sleep(100 * time.Millisecond)
        }
        close(queue)
    }()

    // Consumer
    go func() {
        defer wg.Done()
        for value := range queue {
            fmt.Printf("Got: %d\\n", value)
        }
    }()

    wg.Wait()
}`,
                    hints: [
                      'Use channels for queues',
                      'WaitGroup for sync',
                      'close channel when done',
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
