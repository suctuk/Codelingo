export const goToJavaCurriculum = {
  sections: [
    {
      id: 'basics',
      title: 'From Go to Java: Getting Started',
      description: 'Learn how to translate Go concepts into Java code',
      units: [
        {
          id: 'unit_1',
          title: 'Object-Oriented Programming',
          lessons: [
            {
              id: 'lesson_1_1',
              title: 'Structs to Classes',
              content: {
                theory: 'Convert Go structs and interfaces to Java classes and interfaces',
                examples: [
                  {
                    source: `// Go
type User struct {
    ID   int
    Name string
    Age  int
}

func (u *User) UpdateName(name string) {
    u.Name = name
}

type UserService interface {
    GetUser(id int) (*User, error)
    SaveUser(user *User) error
}`,
                    target: `// Java
public class User {
    private int id;
    private String name;
    private int age;
    
    public User(int id, String name, int age) {
        this.id = id;
        this.name = name;
        this.age = age;
    }
    
    public void updateName(String name) {
        this.name = name;
    }
}

public interface UserService {
    User getUser(int id) throws Exception;
    void saveUser(User user) throws Exception;
}`,
                    explanation: 'Java uses classes with constructors and access modifiers'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert this Go code to Java:',
                    statements: [
                      '// Go',
                      'type Product struct {',
                      '    ID    int',
                      '    Name  string',
                      '    Price float64',
                      '}',
                      '',
                      'func (p *Product) ApplyDiscount(percent float64) {',
                      '    p.Price = p.Price * (1 - percent/100)',
                      '}',
                      '',
                      'type ProductRepository interface {',
                      '    FindByID(id int) (*Product, error)',
                      '    Save(product *Product) error',
                      '    Delete(id int) error',
                      '}'
                    ],
                    solution: `// Java
import java.math.BigDecimal;

public class Product {
    private int id;
    private String name;
    private BigDecimal price;
    
    public Product(int id, String name, BigDecimal price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
    
    public void applyDiscount(double percent) {
        this.price = this.price.multiply(
            BigDecimal.ONE.subtract(
                BigDecimal.valueOf(percent).divide(BigDecimal.valueOf(100))
            )
        );
    }
    
    // Getters and setters
    public int getId() { return id; }
    public String getName() { return name; }
    public BigDecimal getPrice() { return price; }
}

public interface ProductRepository {
    Product findById(int id) throws Exception;
    void save(Product product) throws Exception;
    void delete(int id) throws Exception;
}`,
                    hints: [
                      'Use BigDecimal for money',
                      'Add getters/setters',
                      'Throw exceptions',
                      'Private fields'
                    ]
                  }
                ]
              }
            },
            {
              id: 'lesson_1_2',
              title: 'Error Handling',
              content: {
                theory: 'Convert Go error handling to Java exceptions',
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

func validateUser(user *User) error {
    if user.Age < 0 {
        return &ValidationError{
            Field:   "age",
            Message: "must be positive",
        }
    }
    return nil
}`,
                    target: `// Java
public class ValidationException extends Exception {
    private String field;
    private String message;
    
    public ValidationException(String field, String message) {
        super(field + ": " + message);
        this.field = field;
        this.message = message;
    }
    
    public String getField() {
        return field;
    }
}

public class UserValidator {
    public void validateUser(User user) throws ValidationException {
        if (user.getAge() < 0) {
            throw new ValidationException("age", "must be positive");
        }
    }
}`,
                    explanation: 'Java uses checked exceptions for error handling'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert this Go error handling to Java:',
                    statements: [
                      '// Go',
                      'type NotFoundError struct {',
                      '    Entity string',
                      '    ID    int',
                      '}',
                      '',
                      'func (e *NotFoundError) Error() string {',
                      '    return fmt.Sprintf("%s with id %d not found", e.Entity, e.ID)',
                      '}',
                      '',
                      'func findProduct(id int) (*Product, error) {',
                      '    if id <= 0 {',
                      '        return nil, &NotFoundError{"Product", id}',
                      '    }',
                      '    // ... implementation',
                      '    return product, nil',
                      '}'
                    ],
                    solution: `// Java
public class NotFoundException extends Exception {
    private String entity;
    private int id;
    
    public NotFoundException(String entity, int id) {
        super(String.format("%s with id %d not found", entity, id));
        this.entity = entity;
        this.id = id;
    }
    
    public String getEntity() { return entity; }
    public int getId() { return id; }
}

public class ProductService {
    public Product findProduct(int id) throws NotFoundException {
        if (id <= 0) {
            throw new NotFoundException("Product", id);
        }
        // ... implementation
        return product;
    }
}`,
                    hints: [
                      'Extend Exception',
                      'Use String.format',
                      'Add getters',
                      'throws clause'
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
                theory: 'Convert Go concurrency patterns to Java threads and executors',
                examples: [
                  {
                    source: `// Go
func worker(jobs <-chan int, results chan<- int) {
    for j := range jobs {
        results <- j * 2
    }
}

func main() {
    jobs := make(chan int, 100)
    results := make(chan int, 100)

    for w := 1; w <= 3; w++ {
        go worker(jobs, results)
    }

    for j := 1; j <= 5; j++ {
        jobs <- j
    }
}`,
                    target: `// Java
import java.util.concurrent.*;

public class Worker implements Runnable {
    private BlockingQueue<Integer> jobs;
    private BlockingQueue<Integer> results;
    
    public Worker(BlockingQueue<Integer> jobs, 
                 BlockingQueue<Integer> results) {
        this.jobs = jobs;
        this.results = results;
    }
    
    @Override
    public void run() {
        try {
            while (true) {
                Integer job = jobs.take();
                results.put(job * 2);
            }
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}

public class Main {
    public static void main(String[] args) {
        BlockingQueue<Integer> jobs = new LinkedBlockingQueue<>();
        BlockingQueue<Integer> results = new LinkedBlockingQueue<>();
        
        ExecutorService executor = Executors.newFixedThreadPool(3);
        for (int w = 1; w <= 3; w++) {
            executor.submit(new Worker(jobs, results));
        }
        
        for (int j = 1; j <= 5; j++) {
            jobs.offer(j);
        }
        
        executor.shutdown();
    }
}`,
                    explanation: 'Java uses ExecutorService and BlockingQueue for concurrency'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert this Go concurrent code to Java:',
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
                    solution: `// Java
import java.util.concurrent.*;
import java.util.List;
import java.util.ArrayList;

public class DataProcessor {
    private static String process(String data) {
        return data.toUpperCase();
    }
    
    public static void main(String[] args) throws Exception {
        List<String> input = List.of("hello", "world", "go");
        ExecutorService executor = Executors.newFixedThreadPool(
            Runtime.getRuntime().availableProcessors()
        );
        
        List<Future<String>> futures = new ArrayList<>();
        
        for (String data : input) {
            Future<String> future = executor.submit(
                () -> process(data)
            );
            futures.add(future);
        }
        
        for (Future<String> future : futures) {
            System.out.println(future.get());
        }
        
        executor.shutdown();
    }
}`,
                    hints: [
                      'Use ExecutorService',
                      'Submit Callable tasks',
                      'Collect Future results',
                      'Proper shutdown'
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
