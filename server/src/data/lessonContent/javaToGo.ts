export const javaToGoCurriculum = {
  sections: [
    {
      id: 'basics',
      title: 'From Java to Go: Getting Started',
      description: 'Learn how to translate Java concepts into Go code',
      units: [
        {
          id: 'unit_1',
          title: 'Basic Syntax Differences',
          lessons: [
            {
              id: 'lesson_1_1',
              title: 'Types and Variables',
              content: {
                theory: 'Convert Java types and variables to Go',
                examples: [
                  {
                    source: `// Java
int count = 42;
String name = "Alice";
boolean isActive = true;
double price = 9.99;
Integer nullableCount = null;`,
                    target: `// Go
count := 42
name := "Alice"
isActive := true
price := 9.99
var nullableCount *int // nil by default

// Or with explicit types:
var count int = 42
var name string = "Alice"
var isActive bool = true
var price float64 = 9.99`,
                    explanation: 'Go uses := for type inference or var for explicit types'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert these Java variables to Go:',
                    statements: [
                      '// Java',
                      'long id = 1000L;',
                      'String[] names = {"Alice", "Bob"};',
                      'List<Integer> numbers = new ArrayList<>();',
                      'final double PI = 3.14159;'
                    ],
                    solution: `// Go
id := int64(1000)
names := []string{"Alice", "Bob"}
numbers := make([]int, 0)
const PI = 3.14159`,
                    hints: [
                      'Use type conversion for specifics',
                      'slice[] for dynamic arrays',
                      'make() for initialization',
                      'const for constants'
                    ]
                  }
                ]
              }
            },
            {
              id: 'lesson_1_2',
              title: 'Structs and Methods',
              content: {
                theory: 'Convert Java classes to Go structs and methods',
                examples: [
                  {
                    source: `// Java
public class Person {
    private String name;
    private int age;
    
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    public String getName() {
        return name;
    }
}`,
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

func (p *Person) GetName() string {
    return p.name
}`,
                    explanation: 'Go uses structs and receiver functions instead of classes'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert this Java class to Go:',
                    statements: [
                      '// Java',
                      'public class Product {',
                      '    private int id;',
                      '    private String name;',
                      '    private double price;',
                      '',
                      '    public Product(int id, String name) {',
                      '        this.id = id;',
                      '        this.name = name;',
                      '    }',
                      '',
                      '    public void setPrice(double price) {',
                      '        this.price = price;',
                      '    }',
                      '}'
                    ],
                    solution: `// Go
type Product struct {
    id    int
    name  string
    price float64
}

func NewProduct(id int, name string) *Product {
    return &Product{
        id:   id,
        name: name,
    }
}

func (p *Product) SetPrice(price float64) {
    p.price = price
}`,
                    hints: [
                      'Use type struct',
                      'Constructor as NewX function',
                      'Methods with receivers',
                      'Pointer receivers for mutating'
                    ]
                  }
                ]
              }
            }
          ]
        },
        {
          id: 'unit_2',
          title: 'Interfaces and Error Handling',
          lessons: [
            {
              id: 'lesson_2_1',
              title: 'Interface Implementation',
              content: {
                theory: 'Convert Java interfaces to Go interfaces',
                examples: [
                  {
                    source: `// Java
public interface Vehicle {
    void start();
    boolean isRunning();
    int getSpeed();
}

public class Car implements Vehicle {
    private boolean running;
    private int speed;
    
    @Override
    public void start() {
        running = true;
    }
    
    @Override
    public boolean isRunning() {
        return running;
    }
    
    @Override
    public int getSpeed() {
        return speed;
    }
}`,
                    target: `// Go
type Vehicle interface {
    Start()
    IsRunning() bool
    GetSpeed() int
}

type Car struct {
    running bool
    speed   int
}

func (c *Car) Start() {
    c.running = true
}

func (c *Car) IsRunning() bool {
    return c.running
}

func (c *Car) GetSpeed() int {
    return c.speed
}`,
                    explanation: 'Go interfaces are implicit and methods use PascalCase for export'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert this Java interface to Go:',
                    statements: [
                      '// Java',
                      'public interface Drawable {',
                      '    void draw();',
                      '    Point getPosition();',
                      '}',
                      '',
                      'public class Circle implements Drawable {',
                      '    private Point center;',
                      '',
                      '    public void draw() {',
                      '        // Drawing logic',
                      '    }',
                      '',
                      '    public Point getPosition() {',
                      '        return center;',
                      '    }',
                      '}'
                    ],
                    solution: `// Go
type Point struct {
    X, Y int
}

type Drawable interface {
    Draw()
    GetPosition() Point
}

type Circle struct {
    center Point
}

func (c *Circle) Draw() {
    // Drawing logic
}

func (c *Circle) GetPosition() Point {
    return c.center
}`,
                    hints: [
                      'Interfaces are implicit',
                      'Use PascalCase for export',
                      'Methods with receivers',
                      'Struct for data'
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
      description: 'Learn Go\'s concurrency model coming from Java',
      units: [
        {
          id: 'unit_1',
          title: 'From Threads to Goroutines',
          lessons: [
            {
              id: 'lesson_1_1',
              title: 'Basic Concurrency',
              content: {
                theory: 'Convert Java threads to Go goroutines',
                examples: [
                  {
                    source: `// Java
new Thread(() -> {
    System.out.println("Working...");
    try {
        Thread.sleep(1000);
    } catch (InterruptedException e) {
        e.printStackTrace();
    }
}).start();`,
                    target: `// Go
go func() {
    fmt.Println("Working...")
    time.Sleep(time.Second)
}()`,
                    explanation: 'Go uses lightweight goroutines instead of threads'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert this Java concurrent code to Go:',
                    statements: [
                      '// Java',
                      'ExecutorService executor = Executors.newFixedThreadPool(2);',
                      'Future<Integer> future = executor.submit(() -> {',
                      '    Thread.sleep(1000);',
                      '    return 42;',
                      '});',
                      'int result = future.get();'
                    ],
                    solution: `// Go
resultChan := make(chan int)

go func() {
    time.Sleep(time.Second)
    resultChan <- 42
}()

result := <-resultChan`,
                    hints: [
                      'Use channels for communication',
                      'go keyword for concurrency',
                      'make() for channels',
                      '<- for send/receive'
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
