import { createLanguagePairCurriculum } from './languagePairFactory';

export const swiftToPythonCurriculum = {
  ...createLanguagePairCurriculum('swift', 'python'),
  sections: [
    {
      id: 'section_1_basics',
      title: 'Python Fundamentals',
      description: 'Learn Python basics from a Swift perspective',
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
                theory: 'Converting Swift variables to Python',
                difficulty: 'beginner',
                xpPoints: 10,
                examples: [
                  {
                    source: `let name: String = "Alice"
var age: Int = 25
let height: Double = 1.75
let isActive: Bool = true
let score = 95 // Type inference`,
                    target: `name = "Alice"
age = 25
height = 1.75
is_active = True
score = 95  # Dynamic typing`,
                    explanation: 'Python uses dynamic typing and snake_case'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Convert Swift variables to Python',
                    code: '___ = "Hello"\n___ = 42\n___ = True',
                    solution: 'message = "Hello"\ncount = 42\nis_valid = True',
                    hints: ['No type annotations', 'Use snake_case', 'True not true'],
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
                theory: 'Converting Swift collections to Python',
                difficulty: 'beginner',
                xpPoints: 15,
                examples: [
                  {
                    source: `let numbers: [Int] = [1, 2, 3]
let scores: [String: Int] = [
    "Alice": 95,
    "Bob": 87
]
let tuple = (name: "Alice", age: 25)`,
                    target: `numbers = [1, 2, 3]  # List
scores = {
    "Alice": 95,
    "Bob": 87
}  # Dictionary
person = {"name": "Alice", "age": 25}  # Dict instead of named tuple`,
                    explanation: 'Python uses lists and dicts'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Convert Swift collections to Python',
                    code: '___ = [1, 2, 3, 4, 5]\n___ = {\n    ___: "Alice",\n    ___: 25\n}',
                    solution: 'numbers = [1, 2, 3, 4, 5]\nuser = {\n    "name": "Alice",\n    "age": 25\n}',
                    hints: ['Use list syntax', 'Use dict syntax', 'String keys'],
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
                theory: 'Converting Swift functions to Python',
                difficulty: 'beginner',
                xpPoints: 20,
                examples: [
                  {
                    source: `func greet(name: String) -> String {
    return "Hello, \\(name)!"
}

func add(_ a: Int, to b: Int = 0) -> Int {
    return a + b
}`,
                    target: `def greet(name):
    return f"Hello, {name}!"

def add(a, b=0):
    return a + b`,
                    explanation: 'Python uses def and no type annotations'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Convert Swift function to Python',
                    code: '___ multiply(x, y):\n    ___ x * y',
                    solution: 'def multiply(x, y):\n    return x * y',
                    hints: ['Use def keyword', 'No type annotations', 'Add return'],
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
          description: 'Learn Python classes',
          skillLevel: 'intermediate',
          xpToUnlock: 100,
          lessons: [
            {
              id: 'lesson_3_1',
              title: 'Class Definition',
              estimatedTime: 25,
              content: {
                theory: 'Converting Swift classes to Python',
                difficulty: 'intermediate',
                xpPoints: 25,
                examples: [
                  {
                    source: `class Person {
    private let name: String
    private var age: Int
    
    init(name: String, age: Int) {
        self.name = name
        self.age = age
    }
    
    func greet() -> String {
        return "Hello, I'm \\(name)!"
    }
}`,
                    target: `class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def greet(self):
        return f"Hello, I'm {self.name}!"`,
                    explanation: 'Python uses __init__ and self'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Convert Swift class to Python',
                    code: 'class Rectangle:\n    def ___(self, width, height):\n        self.___ = width\n        self.___ = height\n\n    def area(self):\n        return ___',
                    solution: 'class Rectangle:\n    def __init__(self, width, height):\n        self.width = width\n        self.height = height\n\n    def area(self):\n        return self.width * self.height',
                    hints: ['Use __init__', 'Use self.attribute', 'Calculate area'],
                    xpReward: 15
                  }
                ]
              }
            }
          ]
        },
        {
          id: 'unit_4_optionals',
          title: 'Optional Handling',
          description: 'Learn Python optional handling',
          skillLevel: 'advanced',
          xpToUnlock: 150,
          lessons: [
            {
              id: 'lesson_4_1',
              title: 'Optional to None',
              estimatedTime: 30,
              content: {
                theory: 'Converting Swift optionals to Python None',
                difficulty: 'advanced',
                xpPoints: 30,
                examples: [
                  {
                    source: `var name: String?
if let unwrappedName = name {
    print(unwrappedName)
}

guard let age = optionalAge else {
    return
}

let result = optionalValue ?? defaultValue`,
                    target: `name = None
if name is not None:
    print(name)

if age is None:
    return

result = optional_value if optional_value is not None else default_value`,
                    explanation: 'Python uses None and is/is not None'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Convert Swift optional handling to Python',
                    code: 'def process_data(data):\n    if data ___ ___:\n        return None\n    return data.value\n\nresult = value ___ value ___ ___ ___ default',
                    solution: 'def process_data(data):\n    if data is None:\n        return None\n    return data.value\n\nresult = value if value is not None else default',
                    hints: ['Use is None', 'Use if/else', 'Ternary operator'],
                    xpReward: 20
                  }
                ],
                practice: {
                  type: 'code_project',
                  instructions: 'Create a function that safely processes optional data',
                  testCases: [
                    {
                      input: 'process_user_data({"name": None, "age": 25})',
                      expectedOutput: 'Default User (age: 25)',
                      code: `def process_user_data(user_data):
    name = user_data.get("name", "Default User")
    age = user_data.get("age")
    
    if age is None:
        return f"{name} (age: unknown)"
    return f"{name} (age: {age})"`
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
