import { createLanguagePairCurriculum } from './languagePairFactory';

export const javaToPythonCurriculum = {
  ...createLanguagePairCurriculum('java', 'python'),
  sections: [
    {
      id: 'section_1_basics',
      title: 'Python Fundamentals',
      description: 'Learn Python basics from a Java perspective',
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
                theory: 'Converting Java static types to Python dynamic types',
                difficulty: 'beginner',
                xpPoints: 10,
                examples: [
                  {
                    source: `int age = 25;
double height = 1.75;
String name = "Alice";
boolean active = true;`,
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
                    question: 'Convert Java variables to Python',
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
                theory: 'Converting Java collections to Python',
                difficulty: 'beginner',
                xpPoints: 15,
                examples: [
                  {
                    source: `int[] numbers = {1, 2, 3};
ArrayList<Integer> scores = new ArrayList<>();
scores.add(85);
HashMap<String, Integer> grades = new HashMap<>();
grades.put("Alice", 95);`,
                    target: `numbers = [1, 2, 3]
scores = [85]
grades = {"Alice": 95}`,
                    explanation: 'Python uses simple list and dictionary literals'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Convert Java collections to Python',
                    code: '___ = [1, 2, 3, 4, 5]\n___ = {"name": "Alice", "age": 25}',
                    solution: 'numbers = [1, 2, 3, 4, 5]\nuser = {"name": "Alice", "age": 25}',
                    hints: ['Use list literals []', 'Use dict literals {}'],
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
                theory: 'Converting Java methods to Python functions',
                difficulty: 'beginner',
                xpPoints: 20,
                examples: [
                  {
                    source: `public String greet(String name) {
    return "Hello, " + name;
}

public int add(int a, int b) {
    return a + b;
}`,
                    target: `def greet(name):
    return f"Hello, {name}"

def add(a, b):
    return a + b`,
                    explanation: 'Python uses def keyword and no type declarations'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Convert Java method to Python',
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
                theory: 'Converting Java classes to Python',
                difficulty: 'intermediate',
                xpPoints: 25,
                examples: [
                  {
                    source: `public class Person {
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
                    question: 'Convert Java class to Python',
                    code: 'class Rectangle:\n    def ___(self, width, height):\n        self.___ = width\n        self.___ = height\n\n    def get_area(self):\n        return self.width * self.height',
                    solution: 'class Rectangle:\n    def __init__(self, width, height):\n        self.width = width\n        self.height = height\n\n    def get_area(self):\n        return self.width * self.height',
                    hints: ['Use __init__', 'Use self.attribute'],
                    xpReward: 15
                  }
                ]
              }
            }
          ]
        },
        {
          id: 'unit_4_exceptions',
          title: 'Exception Handling',
          description: 'Learn Python exceptions',
          skillLevel: 'advanced',
          xpToUnlock: 150,
          lessons: [
            {
              id: 'lesson_4_1',
              title: 'Try-Except',
              estimatedTime: 30,
              content: {
                theory: 'Converting Java try-catch to Python try-except',
                difficulty: 'advanced',
                xpPoints: 30,
                examples: [
                  {
                    source: `try {
    int result = divide(10, 0);
} catch (ArithmeticException e) {
    System.err.println("Error: " + e.getMessage());
} finally {
    System.out.println("Done");
}`,
                    target: `try:
    result = divide(10, 0)
except ZeroDivisionError as e:
    print(f"Error: {str(e)}")
finally:
    print("Done")`,
                    explanation: 'Python uses try-except with specific exception types'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Convert Java exception handling to Python',
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
