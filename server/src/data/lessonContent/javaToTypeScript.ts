export const javaToTypeScriptCurriculum = {
  sections: [
    {
      id: 'basics',
      title: 'From Java to TypeScript: Getting Started',
      description: 'Learn how to translate Java concepts into TypeScript code',
      units: [
        {
          id: 'unit_1',
          title: 'Basic Type Mappings',
          lessons: [
            {
              id: 'lesson_1_1',
              title: 'Type System Differences',
              content: {
                theory: 'Map Java types to TypeScript types',
                examples: [
                  {
                    source: `// Java
int count = 42;
String name = "Alice";
boolean isActive = true;
double price = 9.99;
Integer nullableCount = null;`,
                    target: `// TypeScript
let count: number = 42;
let name: string = "Alice";
let isActive: boolean = true;
let price: number = 9.99;
let nullableCount: number | null = null;`,
                    explanation: 'TypeScript uses number for both int and double, and union types for nullables'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert these Java types to TypeScript:',
                    statements: [
                      '// Java',
                      'long id = 1000L;',
                      'String[] names = {"Alice", "Bob"};',
                      'List<Integer> numbers = new ArrayList<>();',
                      'Double average = null;'
                    ],
                    solution: `// TypeScript
let id: number = 1000;
let names: string[] = ["Alice", "Bob"];
let numbers: number[] = [];
let average: number | null = null;`,
                    hints: [
                      'Use number for numeric types',
                      'Array<T> or T[] for arrays',
                      'Union with null for nullables',
                      'No need for new keyword'
                    ]
                  }
                ]
              }
            },
            {
              id: 'lesson_1_2',
              title: 'Class Conversion',
              content: {
                theory: 'Convert Java classes to TypeScript classes',
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
    
    public void setName(String name) {
        this.name = name;
    }
}`,
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
    
    setName(name: string): void {
        this.name = name;
    }
}`,
                    explanation: 'TypeScript classes are similar but use TypeScript types'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert this Java class to TypeScript:',
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
                    solution: `// TypeScript
class Product {
    private id: number;
    private name: string;
    private price: number;
    
    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }
    
    setPrice(price: number): void {
        this.price = price;
    }
}`,
                    hints: [
                      'Remove public keyword',
                      'Use TypeScript types',
                      'Constructor stays similar',
                      'void for no return'
                    ]
                  }
                ]
              }
            }
          ]
        },
        {
          id: 'unit_2',
          title: 'Interfaces and Generics',
          lessons: [
            {
              id: 'lesson_2_1',
              title: 'Interface Translation',
              content: {
                theory: 'Convert Java interfaces to TypeScript interfaces',
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
                    target: `// TypeScript
interface Vehicle {
    start(): void;
    isRunning(): boolean;
    getSpeed(): number;
}

class Car implements Vehicle {
    private running: boolean;
    private speed: number;
    
    start(): void {
        this.running = true;
    }
    
    isRunning(): boolean {
        return this.running;
    }
    
    getSpeed(): number {
        return this.speed;
    }
}`,
                    explanation: 'TypeScript interfaces are similar but use TypeScript syntax'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert this Java interface to TypeScript:',
                    statements: [
                      '// Java',
                      'public interface Drawable {',
                      '    void draw();',
                      '    int getX();',
                      '    int getY();',
                      '}',
                      '',
                      'public class Circle implements Drawable {',
                      '    private int x, y;',
                      '',
                      '    public void draw() {',
                      '        // Drawing logic',
                      '    }',
                      '',
                      '    public int getX() { return x; }',
                      '    public int getY() { return y; }',
                      '}'
                    ],
                    solution: `// TypeScript
interface Drawable {
    draw(): void;
    getX(): number;
    getY(): number;
}

class Circle implements Drawable {
    private x: number;
    private y: number;
    
    draw(): void {
        // Drawing logic
    }
    
    getX(): number { return this.x; }
    getY(): number { return this.y; }
}`,
                    hints: [
                      'Remove public keyword',
                      'Method signatures use ()',
                      'Use number for int',
                      'Add this. in methods'
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
      description: 'Learn TypeScript-specific features not present in Java',
      units: [
        {
          id: 'unit_1',
          title: 'Union Types and Type Guards',
          lessons: [
            {
              id: 'lesson_1_1',
              title: 'Using Union Types',
              content: {
                theory: 'Learn TypeScript-specific type features',
                examples: [
                  {
                    source: `// Java
public class Result {
    private final boolean success;
    private final String data;
    private final String error;
    
    private Result(boolean success, String data, String error) {
        this.success = success;
        this.data = data;
        this.error = error;
    }
    
    public static Result success(String data) {
        return new Result(true, data, null);
    }
    
    public static Result error(String error) {
        return new Result(false, null, error);
    }
}`,
                    target: `// TypeScript
type Result = 
  | { success: true; data: string }
  | { success: false; error: string };

function createSuccess(data: string): Result {
    return { success: true, data };
}

function createError(error: string): Result {
    return { success: false, error };
}

// Using type guard
function isSuccess(result: Result): result is { success: true; data: string } {
    return result.success;
}`,
                    explanation: 'TypeScript union types provide more type-safe alternatives to Java patterns'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert this Java code to use TypeScript unions:',
                    statements: [
                      '// Java',
                      'public class Shape {',
                      '    private final String type;',
                      '    private final int radius;  // for circle',
                      '    private final int width;   // for square',
                      '',
                      '    private Shape(String type, int size) {',
                      '        this.type = type;',
                      '        this.radius = type.equals("circle") ? size : 0;',
                      '        this.width = type.equals("square") ? size : 0;',
                      '    }',
                      '}'
                    ],
                    solution: `// TypeScript
type Shape = 
  | { type: "circle"; radius: number }
  | { type: "square"; width: number };

function createCircle(radius: number): Shape {
    return { type: "circle", radius };
}

function createSquare(width: number): Shape {
    return { type: "square", width };
}

function isCircle(shape: Shape): shape is { type: "circle"; radius: number } {
    return shape.type === "circle";
}`,
                    hints: [
                      'Use discriminated unions',
                      'Create factory functions',
                      'Add type guards',
                      'Use literal types'
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
