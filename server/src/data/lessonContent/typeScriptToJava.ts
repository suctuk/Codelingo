import { createLanguagePairCurriculum } from './languagePairFactory';

export const typeScriptToJavaCurriculum = {
  ...createLanguagePairCurriculum('typescript', 'java'),
  sections: [
    {
      id: 'section_1_basics',
      title: 'Java Fundamentals',
      description: 'Learn Java basics from a TypeScript perspective',
      units: [
        {
          id: 'unit_1_types',
          title: 'Variables and Types',
          description: 'Learn Java variables and types',
          skillLevel: 'beginner',
          xpToUnlock: 0,
          lessons: [
            {
              id: 'lesson_1_1',
              title: 'Variable Declaration',
              estimatedTime: 10,
              content: {
                theory: 'Converting TypeScript variables to Java',
                difficulty: 'beginner',
                xpPoints: 10,
                examples: [
                  {
                    source: `let name: string = "Alice";
const age: number = 25;
let height: number = 1.75;
let isActive: boolean = true;
let score = 95; // Type inference`,
                    target: `String name = "Alice";
final int age = 25;
double height = 1.75;
boolean isActive = true;
int score = 95;  // Explicit type required`,
                    explanation: 'Java requires explicit types and uses final for constants'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Convert TypeScript variables to Java',
                    code: '___ String message = "Hello";\n___ int count = 42;\nboolean ___ = true;',
                    solution: 'final String message = "Hello";\nfinal int count = 42;\nboolean isValid = true;',
                    hints: ['Use final for const', 'Explicit types required', 'Semicolons required'],
                    xpReward: 5
                  }
                ]
              }
            },
            {
              id: 'lesson_1_2',
              title: 'Interfaces',
              estimatedTime: 15,
              content: {
                theory: 'Converting TypeScript interfaces to Java',
                difficulty: 'beginner',
                xpPoints: 15,
                examples: [
                  {
                    source: `interface Person {
  name: string;
  age: number;
  greet(): string;
}

interface Employee extends Person {
  salary: number;
}`,
                    target: `public interface Person {
    String getName();
    int getAge();
    String greet();
}

public interface Employee extends Person {
    double getSalary();
}`,
                    explanation: 'Java uses getter methods in interfaces'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Convert TypeScript interface to Java',
                    code: 'public interface Shape {\n    double ___();\n    String ___();\n}',
                    solution: 'public interface Shape {\n    double getArea();\n    String getName();\n}',
                    hints: ['Use getter methods', 'Return types required'],
                    xpReward: 8
                  }
                ]
              }
            }
          ]
        },
        {
          id: 'unit_2_generics',
          title: 'Generics',
          description: 'Learn Java generics',
          skillLevel: 'beginner',
          xpToUnlock: 50,
          lessons: [
            {
              id: 'lesson_2_1',
              title: 'Generic Classes',
              estimatedTime: 20,
              content: {
                theory: 'Converting TypeScript generics to Java',
                difficulty: 'beginner',
                xpPoints: 20,
                examples: [
                  {
                    source: `class Box<T> {
  private value: T;

  constructor(value: T) {
    this.value = value;
  }

  getValue(): T {
    return this.value;
  }
}`,
                    target: `public class Box<T> {
    private T value;

    public Box(T value) {
        this.value = value;
    }

    public T getValue() {
        return value;
    }
}`,
                    explanation: 'Java generics are similar but require public/private'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Convert TypeScript generic class to Java',
                    code: 'public class Pair<K, V> {\n    private ___ key;\n    private ___ value;\n\n    public Pair(___ key, ___ value) {\n        this.key = key;\n        this.value = value;\n    }\n}',
                    solution: 'public class Pair<K, V> {\n    private K key;\n    private V value;\n\n    public Pair(K key, V value) {\n        this.key = key;\n        this.value = value;\n    }\n}',
                    hints: ['Use type parameters', 'Constructor matches class'],
                    xpReward: 10
                  }
                ]
              }
            }
          ]
        },
        {
          id: 'unit_3_classes',
          title: 'Classes',
          description: 'Learn Java classes',
          skillLevel: 'intermediate',
          xpToUnlock: 100,
          lessons: [
            {
              id: 'lesson_3_1',
              title: 'Class Definition',
              estimatedTime: 25,
              content: {
                theory: 'Converting TypeScript classes to Java',
                difficulty: 'intermediate',
                xpPoints: 25,
                examples: [
                  {
                    source: `class Person {
  private name: string;
  private age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  public greet(): string {
    return \`Hello, I'm \${this.name}!\`;
  }
}`,
                    target: `public class Person {
    private String name;
    private int age;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public String greet() {
        return "Hello, I'm " + name + "!";
    }
}`,
                    explanation: 'Java requires explicit types and access modifiers'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Convert TypeScript class to Java',
                    code: 'public class Rectangle {\n    ___ double width;\n    ___ double height;\n\n    ___ Rectangle(___ width, ___ height) {\n        this.width = width;\n        this.height = height;\n    }\n}',
                    solution: 'public class Rectangle {\n    private double width;\n    private double height;\n\n    public Rectangle(double width, double height) {\n        this.width = width;\n        this.height = height;\n    }\n}',
                    hints: ['Use access modifiers', 'Explicit parameter types', 'public constructor'],
                    xpReward: 15
                  }
                ]
              }
            }
          ]
        },
        {
          id: 'unit_4_async',
          title: 'Asynchronous Programming',
          description: 'Learn Java async programming',
          skillLevel: 'advanced',
          xpToUnlock: 150,
          lessons: [
            {
              id: 'lesson_4_1',
              title: 'Async/Await to CompletableFuture',
              estimatedTime: 30,
              content: {
                theory: 'Converting TypeScript async/await to Java CompletableFuture',
                difficulty: 'advanced',
                xpPoints: 30,
                examples: [
                  {
                    source: `async function fetchUser(id: string): Promise<User> {
  const response = await fetch(\`/api/users/\${id}\`);
  return response.json();
}

async function processUser(id: string): Promise<void> {
  try {
    const user = await fetchUser(id);
    console.log(user);
  } catch (error) {
    console.error(error);
  }
}`,
                    target: `public CompletableFuture<User> fetchUser(String id) {
    return webClient.get()
        .uri("/api/users/" + id)
        .retrieve()
        .bodyToMono(User.class)
        .toFuture();
}

public CompletableFuture<Void> processUser(String id) {
    return fetchUser(id)
        .thenAccept(System.out::println)
        .exceptionally(error -> {
            System.err.println(error);
            return null;
        });
}`,
                    explanation: 'Java uses CompletableFuture for async operations'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Convert TypeScript async to Java',
                    code: 'public CompletableFuture<String> getData() {\n    return ___\n        .___(() -> fetchData())\n        .___((data) -> processData(data))\n        .___((error) -> handleError(error));',
                    solution: 'public CompletableFuture<String> getData() {\n    return CompletableFuture\n        .supplyAsync(() -> fetchData())\n        .thenApply((data) -> processData(data))\n        .exceptionally((error) -> handleError(error));',
                    hints: ['Use CompletableFuture', 'Chain operations', 'Handle errors'],
                    xpReward: 20
                  }
                ],
                practice: {
                  type: 'code_project',
                  instructions: 'Create an async service that fetches and processes user data',
                  testCases: [
                    {
                      input: 'userService.processUserData("123")',
                      expectedOutput: 'CompletableFuture<UserData>',
                      code: `public class UserService {
    private final WebClient webClient;

    public UserService(WebClient webClient) {
        this.webClient = webClient;
    }

    public CompletableFuture<UserData> processUserData(String id) {
        return fetchUser(id)
            .thenCompose(user -> fetchUserDetails(user))
            .thenApply(details -> enrichUserData(details))
            .exceptionally(error -> {
                logger.error("Error processing user data", error);
                return null;
            });
    }
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
