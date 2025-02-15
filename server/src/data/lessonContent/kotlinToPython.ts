import { createLanguagePairCurriculum } from './languagePairFactory';

export const kotlinToPythonCurriculum = {
  ...createLanguagePairCurriculum('kotlin', 'python'),
  sections: [
    {
      id: 'section_1_basics',
      title: 'Python Fundamentals',
      description: 'Learn Python basics from a Kotlin perspective',
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
                theory: 'Converting Kotlin variables to Python',
                difficulty: 'beginner',
                xpPoints: 10,
                examples: [
                  {
                    source: `val name: String = "Alice"
var age: Int = 25
val height: Double = 1.75
val isActive: Boolean = true
val score = 95 // Type inference`,
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
                    question: 'Convert Kotlin variables to Python',
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
                theory: 'Converting Kotlin collections to Python',
                difficulty: 'beginner',
                xpPoints: 15,
                examples: [
                  {
                    source: `val numbers = listOf(1, 2, 3)
val scores = mapOf(
    "Alice" to 95,
    "Bob" to 87
)
val pair = Pair("name", "Alice")`,
                    target: `numbers = [1, 2, 3]  # List
scores = {
    "Alice": 95,
    "Bob": 87
}  # Dictionary
pair = ("name", "Alice")  # Tuple`,
                    explanation: 'Python uses lists, dicts, and tuples'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Convert Kotlin collections to Python',
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
                theory: 'Converting Kotlin functions to Python',
                difficulty: 'beginner',
                xpPoints: 20,
                examples: [
                  {
                    source: `fun greet(name: String): String {
    return "Hello, $name!"
}

fun add(a: Int, b: Int = 0) = a + b`,
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
                    question: 'Convert Kotlin function to Python',
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
                theory: 'Converting Kotlin classes to Python',
                difficulty: 'intermediate',
                xpPoints: 25,
                examples: [
                  {
                    source: `data class Person(
    private val name: String,
    private var age: Int
) {
    fun greet(): String {
        return "Hello, I'm $name!"
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
                    question: 'Convert Kotlin class to Python',
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
          id: 'unit_4_nullables',
          title: 'Null Safety',
          description: 'Learn Python null safety',
          skillLevel: 'advanced',
          xpToUnlock: 150,
          lessons: [
            {
              id: 'lesson_4_1',
              title: 'Nullable to Optional',
              estimatedTime: 30,
              content: {
                theory: 'Converting Kotlin null safety to Python',
                difficulty: 'advanced',
                xpPoints: 30,
                examples: [
                  {
                    source: `var name: String? = null
name?.let { println(it) }

val age: Int = optionalAge ?: 0

val result = value?.toString() ?: "default"`,
                    target: `name = None
if name is not None:
    print(name)

age = optional_age if optional_age is not None else 0

result = str(value) if value is not None else "default"`,
                    explanation: 'Python uses None and is/is not None'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Convert Kotlin null safety to Python',
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
