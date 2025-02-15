import { createLanguagePairCurriculum } from './languagePairFactory';

export const rustToPythonCurriculum = {
  ...createLanguagePairCurriculum('rust', 'python'),
  sections: [
    {
      id: 'section_1_basics',
      title: 'Python Fundamentals',
      description: 'Learn Python basics from a Rust perspective',
      units: [
        {
          id: 'unit_1_types',
          title: 'Variables and Types',
          description: 'Learn Python variables and types',
          skillLevel: 'beginner',
          xpToUnlock: 0,
          lessons: [
            {
              id: 'lesson_1_1',
              title: 'Variable Declaration',
              estimatedTime: 10,
              content: {
                theory: 'Converting Rust variables to Python',
                difficulty: 'beginner',
                xpPoints: 10,
                examples: [
                  {
                    source: `let name: String = String::from("Alice");
let age: i32 = 25;
let height: f64 = 1.75;
let is_active: bool = true;
let mut score = 95; // Mutable variable`,
                    target: `name = "Alice"  # All variables are mutable
age = 25
height = 1.75
is_active = True
score = 95`,
                    explanation: 'Python uses dynamic typing and all variables are mutable'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Convert Rust variables to Python',
                    code: '___ = "Hello"\n___ = 42\n___ = True',
                    solution: 'message = "Hello"\ncount = 42\nis_valid = True',
                    hints: ['No type declarations', 'True not true', 'All variables mutable'],
                    xpReward: 5
                  }
                ]
              }
            },
            {
              id: 'lesson_1_2',
              title: 'Collections',
              estimatedTime: 15,
              content: {
                theory: 'Converting Rust collections to Python',
                difficulty: 'beginner',
                xpPoints: 15,
                examples: [
                  {
                    source: `let numbers: Vec<i32> = vec![1, 2, 3];
let mut scores = HashMap::new();
scores.insert(String::from("Alice"), 95);

let tuple: (String, i32) = (String::from("Bob"), 30);`,
                    target: `numbers = [1, 2, 3]  # List
scores = {"Alice": 95}  # Dict

person = ("Bob", 30)  # Tuple`,
                    explanation: 'Python uses lists, dicts, and tuples'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Convert Rust collections to Python',
                    code: '___ = [1, 2, 3, 4, 5]\n___ = {"name": ___, "age": ___}\n___ = (42, "Hello")',
                    solution: 'numbers = [1, 2, 3, 4, 5]\nuser = {"name": "Alice", "age": 25}\ndata = (42, "Hello")',
                    hints: ['Use list syntax', 'Use dict syntax', 'Use tuple syntax'],
                    xpReward: 8
                  }
                ]
              }
            }
          ]
        },
        {
          id: 'unit_2_functions',
          title: 'Functions',
          description: 'Learn Python functions',
          skillLevel: 'beginner',
          xpToUnlock: 50,
          lessons: [
            {
              id: 'lesson_2_1',
              title: 'Function Definition',
              estimatedTime: 20,
              content: {
                theory: 'Converting Rust functions to Python',
                difficulty: 'beginner',
                xpPoints: 20,
                examples: [
                  {
                    source: `fn greet(name: &str) -> String {
    format!("Hello, {}!", name)
}

fn add(a: i32, b: i32) -> i32 {
    a + b
}`,
                    target: `def greet(name):
    return f"Hello, {name}!"

def add(a, b):
    return a + b`,
                    explanation: 'Python uses def and no type annotations by default'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Convert Rust function to Python',
                    code: '___ multiply(x, y):\n    ___ x * y',
                    solution: 'def multiply(x, y):\n    return x * y',
                    hints: ['Use def keyword', 'Add return statement'],
                    xpReward: 10
                  }
                ]
              }
            }
          ]
        },
        {
          id: 'unit_3_structs',
          title: 'Classes',
          description: 'Learn Python classes',
          skillLevel: 'intermediate',
          xpToUnlock: 100,
          lessons: [
            {
              id: 'lesson_3_1',
              title: 'Struct to Class',
              estimatedTime: 25,
              content: {
                theory: 'Converting Rust structs to Python classes',
                difficulty: 'intermediate',
                xpPoints: 25,
                examples: [
                  {
                    source: `struct Person {
    name: String,
    age: i32,
}

impl Person {
    fn new(name: String, age: i32) -> Person {
        Person { name, age }
    }
    
    fn greet(&self) -> String {
        format!("Hello, I'm {}!", self.name)
    }
}`,
                    target: `class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def greet(self):
        return f"Hello, I'm {self.name}!"`,
                    explanation: 'Python combines struct and impl into class'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Convert Rust struct to Python class',
                    code: 'class Rectangle:\n    def ___(self, width, height):\n        self.___ = width\n        self.___ = height\n\n    def area(self):\n        return self.width * self.height',
                    solution: 'class Rectangle:\n    def __init__(self, width, height):\n        self.width = width\n        self.height = height\n\n    def area(self):\n        return self.width * self.height',
                    hints: ['Use __init__', 'Use self.attribute'],
                    xpReward: 15
                  }
                ]
              }
            }
          ]
        },
        {
          id: 'unit_4_traits',
          title: 'Abstract Base Classes',
          description: 'Learn Python abstract classes',
          skillLevel: 'advanced',
          xpToUnlock: 150,
          lessons: [
            {
              id: 'lesson_4_1',
              title: 'Traits to ABC',
              estimatedTime: 30,
              content: {
                theory: 'Converting Rust traits to Python abstract base classes',
                difficulty: 'advanced',
                xpPoints: 30,
                examples: [
                  {
                    source: `trait Shape {
    fn area(&self) -> f64;
    fn name(&self) -> &str;
}

struct Circle {
    radius: f64,
}

impl Shape for Circle {
    fn area(&self) -> f64 {
        std::f64::consts::PI * self.radius * self.radius
    }
    
    fn name(&self) -> &str {
        "Circle"
    }
}`,
                    target: `from abc import ABC, abstractmethod
import math

class Shape(ABC):
    @abstractmethod
    def area(self) -> float:
        pass
    
    @abstractmethod
    def name(self) -> str:
        pass

class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius
    
    def area(self):
        return math.pi * self.radius ** 2
    
    def name(self):
        return "Circle"`,
                    explanation: 'Python uses ABC and @abstractmethod for traits'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Convert Rust trait to Python ABC',
                    code: 'from abc import ABC, abstractmethod\n\nclass Animal(___):\n    @___\n    def speak(self):\n        ___\n\nclass Dog(Animal):\n    def ___(self):\n        return "Woof!"',
                    solution: 'from abc import ABC, abstractmethod\n\nclass Animal(ABC):\n    @abstractmethod\n    def speak(self):\n        pass\n\nclass Dog(Animal):\n    def speak(self):\n        return "Woof!"',
                    hints: ['Inherit from ABC', 'Use @abstractmethod', 'Implement abstract methods'],
                    xpReward: 20
                  }
                ],
                practice: {
                  type: 'code_project',
                  instructions: 'Create a Vehicle abstract base class with Car and Bike implementations',
                  testCases: [
                    {
                      input: 'Car("Toyota").describe()',
                      expectedOutput: 'Toyota with 4 wheels',
                      code: `from abc import ABC, abstractmethod

class Vehicle(ABC):
    def __init__(self, brand):
        self.brand = brand
    
    @abstractmethod
    def wheel_count(self) -> int:
        pass
    
    def describe(self):
        return f"{self.brand} with {self.wheel_count()} wheels"

class Car(Vehicle):
    def wheel_count(self):
        return 4

class Bike(Vehicle):
    def wheel_count(self):
        return 2`
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
