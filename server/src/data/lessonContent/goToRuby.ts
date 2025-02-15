export const goToRubyCurriculum = {
  sections: [
    {
      id: 'basics',
      title: 'From Go to Ruby: Getting Started',
      description: 'Learn how to translate Go concepts into Ruby code',
      units: [
        {
          id: 'unit_1',
          title: 'Dynamic Types',
          lessons: [
            {
              id: 'lesson_1_1',
              title: 'Types and Variables',
              content: {
                theory: 'Convert Go static types to Ruby dynamic types',
                examples: [
                  {
                    source: `// Go
type Person struct {
    Name string
    Age  int
}

func NewPerson(name string, age int) *Person {
    return &Person{Name: name, Age: age}
}

func (p *Person) Birthday() {
    p.Age++
}`,
                    target: `# Ruby
class Person
  attr_accessor :name, :age
  
  def initialize(name, age)
    @name = name
    @age = age
  end
  
  def birthday
    @age += 1
  end
end`,
                    explanation: 'Ruby uses dynamic typing and instance variables'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert this Go code to Ruby:',
                    statements: [
                      '// Go',
                      'type Book struct {',
                      '    Title  string',
                      '    Author string',
                      '    Pages  int',
                      '    ISBN   string',
                      '}',
                      '',
                      'func (b *Book) Summary() string {',
                      '    return fmt.Sprintf("%s by %s (%s)",',
                      '        b.Title, b.Author, b.ISBN)',
                      '}',
                      '',
                      'func (b *Book) IsLong() bool {',
                      '    return b.Pages > 500',
                      '}'
                    ],
                    solution: `# Ruby
class Book
  attr_accessor :title, :author, :pages, :isbn
  
  def initialize(title, author, pages, isbn)
    @title = title
    @author = author
    @pages = pages
    @isbn = isbn
  end
  
  def summary
    "\#{@title} by \#{@author} (\#{@isbn})"
  end
  
  def long?
    @pages > 500
  end
end`,
                    hints: [
                      'Use attr_accessor',
                      'Instance variables',
                      'String interpolation',
                      'Boolean methods end with ?'
                    ]
                  }
                ]
              }
            },
            {
              id: 'lesson_1_2',
              title: 'Error Handling',
              content: {
                theory: 'Convert Go error handling to Ruby exceptions',
                examples: [
                  {
                    source: `// Go
type ValidationError struct {
    Field   string
    Message string
}

func (e *ValidationError) Error() string {
    return fmt.Sprintf("%s: %s", e.Field, e.Message)
}

func validateAge(age int) error {
    if age < 0 {
        return &ValidationError{
            Field:   "age",
            Message: "must be positive",
        }
    }
    return nil
}`,
                    target: `# Ruby
class ValidationError < StandardError
  attr_reader :field, :message
  
  def initialize(field, message)
    @field = field
    @message = message
    super("\#{field}: \#{message}")
  end
end

def validate_age(age)
  if age < 0
    raise ValidationError.new("age", "must be positive")
  end
end

# Usage
begin
  validate_age(-1)
rescue ValidationError => e
  puts "Validation failed: \#{e.message}"
end`,
                    explanation: 'Ruby uses exceptions and rescue blocks'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert this Go error handling to Ruby:',
                    statements: [
                      '// Go',
                      'type NotFoundError struct {',
                      '    Resource string',
                      '    ID      int',
                      '}',
                      '',
                      'func (e *NotFoundError) Error() string {',
                      '    return fmt.Sprintf("%s with id %d not found",',
                      '        e.Resource, e.ID)',
                      '}',
                      '',
                      'func findUser(id int) (*User, error) {',
                      '    if id <= 0 {',
                      '        return nil, &NotFoundError{"User", id}',
                      '    }',
                      '    // ... implementation',
                      '    return user, nil',
                      '}'
                    ],
                    solution: `# Ruby
class NotFoundError < StandardError
  attr_reader :resource, :id
  
  def initialize(resource, id)
    @resource = resource
    @id = id
    super("\#{resource} with id \#{id} not found")
  end
end

def find_user(id)
  if id <= 0
    raise NotFoundError.new("User", id)
  end
  # ... implementation
  user
end

# Usage
begin
  user = find_user(-1)
rescue NotFoundError => e
  puts "Error: \#{e.message}"
end`,
                    hints: [
                      'Inherit from StandardError',
                      'Use attr_reader',
                      'String interpolation',
                      'begin/rescue blocks'
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
                theory: 'Convert Go concurrency patterns to Ruby threads',
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
                    target: `# Ruby
require 'thread'

class Worker
  def initialize(id, jobs, results)
    @id = id
    @jobs = jobs
    @results = results
  end
  
  def run
    while job = @jobs.pop
      @results.push(job * 2)
    end
  end
end

jobs = Queue.new
results = Queue.new

# Create worker threads
workers = 3.times.map do |i|
  Thread.new do
    Worker.new(i, jobs, results).run
  end
end

# Add jobs
5.times { |j| jobs.push(j + 1) }

# Signal completion
3.times { jobs.push(nil) }

# Wait for workers
workers.each(&:join)`,
                    explanation: 'Ruby uses Thread and Queue for concurrency'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert this Go concurrent code to Ruby:',
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
                    solution: `# Ruby
require 'thread'

def process(data)
  data.upcase
end

input = ["hello", "world", "go"]
results = Queue.new

# Create threads for processing
threads = input.map do |data|
  Thread.new do
    result = process(data)
    results.push(result)
  end
end

# Wait for all threads and print results
threads.each(&:join)
input.length.times do
  puts results.pop
end`,
                    hints: [
                      'Use Thread.new',
                      'Queue for results',
                      'map for threads',
                      'join all threads'
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
