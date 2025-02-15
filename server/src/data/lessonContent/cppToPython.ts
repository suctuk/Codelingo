import { createLanguagePairCurriculum } from './languagePairFactory';

export const cppToPythonCurriculum = {
  ...createLanguagePairCurriculum('cpp', 'python'),
  sections: [
    {
      id: 'section_1_basics',
      title: 'Python Fundamentals',
      description: 'Learn Python basics from a C++ perspective',
      units: [
        {
          id: 'unit_1_types',
          title: 'Dynamic Typing',
          description: 'Learn Python dynamic typing',
          skillLevel: 'beginner',
          xpToUnlock: 0,
          lessons: [
            {
              id: 'lesson_1_1',
              title: 'Variable Types',
              estimatedTime: 10,
              content: {
                theory: 'Converting C++ static types to Python dynamic types',
                difficulty: 'beginner',
                xpPoints: 10,
                examples: [
                  {
                    source: `int age = 25;
double height = 1.75;
string name = "Alice";
bool active = true;`,
                    target: `age = 25
height = 1.75
name = "Alice"
active = True`,
                    explanation: 'Python uses dynamic typing without type declarations'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Convert C++ variables to Python',
                    code: '___ = 95\n___ = "Hello"\n___ = True',
                    solution: 'score = 95\nmessage = "Hello"\nis_active = True',
                    hints: ['Remove type declarations', 'Use True instead of true'],
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
                theory: 'Converting C++ arrays and vectors to Python lists',
                difficulty: 'beginner',
                xpPoints: 15,
                examples: [
                  {
                    source: `int numbers[] = {1, 2, 3};
vector<int> scores = {85, 90, 95};
pair<int, int> point = {10, 20};`,
                    target: `numbers = [1, 2, 3]
scores = [85, 90, 95]
point = (10, 20)`,
                    explanation: 'Python uses lists and tuples for collections'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Convert C++ collections to Python',
                    code: '___ = [1, 2, 3, 4, 5]\n___ = [(1, "one"), (2, "two")]',
                    solution: 'numbers = [1, 2, 3, 4, 5]\npairs = [(1, "one"), (2, "two")]',
                    hints: ['Use [] for lists', 'Use () for tuples'],
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
                theory: 'Converting C++ functions to Python',
                difficulty: 'beginner',
                xpPoints: 20,
                examples: [
                  {
                    source: `string greet(string name) {
    return "Hello, " + name;
}

int add(int a, int b) {
    return a + b;
}`,
                    target: `def greet(name):
    return f"Hello, {name}"

def add(a, b):
    return a + b`,
                    explanation: 'Python functions use def and are dynamically typed'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Convert C++ function to Python',
                    code: '___ multiply(x, y):\n    ___ x * y',
                    solution: 'def multiply(x, y):\n    return x * y',
                    hints: ['Use def keyword', 'Use return keyword'],
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
                theory: 'Converting C++ classes to Python',
                difficulty: 'intermediate',
                xpPoints: 25,
                examples: [
                  {
                    source: `class Person {
private:
    string name;
    int age;
public:
    Person(string n, int a) : name(n), age(a) {}
    string getName() { return name; }
    void setName(string n) { name = n; }
};`,
                    target: `class Person:
    def __init__(self, name: str, age: int):
        self.name = name
        self.age = age
    
    def get_name(self) -> str:
        return self.name
    
    def set_name(self, name: str) -> None:
        self.name = name`,
                    explanation: 'Python uses __init__ for constructor and self for instance'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Convert C++ class to Python',
                    code: 'class Rectangle:\n    def ___(self, width, height):\n        self.___ = width\n        self.___ = height\n\n    def get_area(self):\n        return self.width * self.height',
                    solution: 'class Rectangle:\n    def __init__(self, width, height):\n        self.width = width\n        self.height = height\n\n    def get_area(self):\n        return self.width * self.height',
                    hints: ['Use __init__', 'Use self.attribute'],
                    xpReward: 15
                  }
                ],
                practice: {
                  type: 'code_project',
                  instructions: 'Create a Student class with name, grades list, and average method',
                  testCases: [
                    {
                      input: 'Student("Alice", [85, 90, 95])',
                      expectedOutput: '90.0',
                      code: `class Student:
    def __init__(self, name: str, grades: list[float]):
        self.name = name
        self.grades = grades
    
    def get_average(self) -> float:
        return sum(self.grades) / len(self.grades)`
                    }
                  ],
                  xpReward: 25
                }
              }
            }
          ]
        },
        {
          id: 'unit_4_error_handling',
          title: 'Error Handling',
          description: 'Learn Python exceptions',
          skillLevel: 'advanced',
          xpToUnlock: 150,
          lessons: [
            {
              id: 'lesson_4_1',
              title: 'Try-Except',
              estimatedTime: 30,
              content: {
                theory: 'Converting C++ try-catch to Python try-except',
                difficulty: 'advanced',
                xpPoints: 30,
                examples: [
                  {
                    source: `try {
    int result = divide(10, 0);
} catch (const std::exception& e) {
    std::cerr << "Error: " << e.what() << std::endl;
}`,
                    target: `try:
    result = divide(10, 0)
except ZeroDivisionError as e:
    print(f"Error: {str(e)}")`,
                    explanation: 'Python uses try-except with specific exception types'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Convert C++ error handling to Python',
                    code: '___ :\n    value = int("abc")\n___ ValueError as e:\n    print(f"Invalid conversion: {e}")',
                    solution: 'try:\n    value = int("abc")\nexcept ValueError as e:\n    print(f"Invalid conversion: {e}")',
                    hints: ['Use try and except', 'Specify exception type'],
                    xpReward: 20
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
