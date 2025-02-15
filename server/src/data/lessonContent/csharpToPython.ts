import { createLanguagePairCurriculum } from './languagePairFactory';

export const csharpToPythonCurriculum = {
  ...createLanguagePairCurriculum('csharp', 'python'),
  sections: [
    {
      id: 'section_1_basics',
      title: 'Python Fundamentals',
      description: 'Learn Python basics from a C# perspective',
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
                theory: 'Converting C# variables to Python',
                difficulty: 'beginner',
                xpPoints: 10,
                examples: [
                  {
                    source: `string name = "Alice";
int age = 25;
double height = 1.75;
bool isActive = true;
var score = 95;`,
                    target: `name = "Alice"
age = 25
height = 1.75
is_active = True
score = 95`,
                    explanation: 'Python uses dynamic typing and snake_case'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Convert C# variables to Python',
                    code: '___ = "Hello"\n___ = 42\n___ = True',
                    solution: 'message = "Hello"\ncount = 42\nis_valid = True',
                    hints: ['No type declarations', 'Use snake_case', 'True not true'],
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
                theory: 'Converting C# collections to Python',
                difficulty: 'beginner',
                xpPoints: 15,
                examples: [
                  {
                    source: `List<int> numbers = new List<int> { 1, 2, 3 };
Dictionary<string, int> scores = new Dictionary<string, int>
{
    { "Alice", 95 },
    { "Bob", 87 }
};
int[] array = new int[] { 1, 2, 3 };`,
                    target: `numbers = [1, 2, 3]
scores = {
    "Alice": 95,
    "Bob": 87
}
array = [1, 2, 3]  # Python lists for arrays`,
                    explanation: 'Python uses lists and dicts'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Convert C# collections to Python',
                    code: '___ = [1, 2, 3, 4, 5]\n___ = {"name": ___, "age": ___}',
                    solution: 'numbers = [1, 2, 3, 4, 5]\nuser = {"name": "Alice", "age": 25}',
                    hints: ['Use list literals', 'Use dict literals'],
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
                theory: 'Converting C# methods to Python functions',
                difficulty: 'beginner',
                xpPoints: 20,
                examples: [
                  {
                    source: `public string Greet(string name)
{
    return $"Hello, {name}!";
}

public int Add(int a, int b)
{
    return a + b;
}`,
                    target: `def greet(name):
    return f"Hello, {name}!"

def add(a, b):
    return a + b`,
                    explanation: 'Python uses def and no access modifiers'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Convert C# method to Python',
                    code: '___ multiply(x, y):\n    ___ x * y',
                    solution: 'def multiply(x, y):\n    return x * y',
                    hints: ['Use def', 'Add return statement'],
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
                theory: 'Converting C# classes to Python',
                difficulty: 'intermediate',
                xpPoints: 25,
                examples: [
                  {
                    source: `public class Person
{
    private string name;
    private int age;

    public Person(string name, int age)
    {
        this.name = name;
        this.age = age;
    }

    public string Greet()
    {
        return $"Hello, I'm {name}!";
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
                    question: 'Convert C# class to Python',
                    code: 'class Rectangle:\n    def ___(self, width, height):\n        self.___ = width\n        self.___ = height\n\n    def area(self):\n        return self.width * self.height',
                    solution: 'class Rectangle:\n    def __init__(self, width, height):\n        self.width = width\n        self.height = height\n\n    def area(self):\n        return self.width * self.height',
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
    def __init__(self, name, grades):
        self.name = name
        self.grades = grades
    
    def average(self):
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
          id: 'unit_4_properties',
          title: 'Properties',
          description: 'Learn Python properties',
          skillLevel: 'advanced',
          xpToUnlock: 150,
          lessons: [
            {
              id: 'lesson_4_1',
              title: 'Property Definition',
              estimatedTime: 30,
              content: {
                theory: 'Converting C# properties to Python',
                difficulty: 'advanced',
                xpPoints: 30,
                examples: [
                  {
                    source: `public class Temperature
{
    private double celsius;

    public double Celsius
    {
        get { return celsius; }
        set { celsius = value; }
    }

    public double Fahrenheit
    {
        get { return celsius * 9/5 + 32; }
        set { celsius = (value - 32) * 5/9; }
    }
}`,
                    target: `class Temperature:
    def __init__(self):
        self._celsius = 0

    @property
    def celsius(self):
        return self._celsius

    @celsius.setter
    def celsius(self, value):
        self._celsius = value

    @property
    def fahrenheit(self):
        return self._celsius * 9/5 + 32

    @fahrenheit.setter
    def fahrenheit(self, value):
        self._celsius = (value - 32) * 5/9`,
                    explanation: 'Python uses @property and @property.setter'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Convert C# property to Python',
                    code: 'class Circle:\n    def __init__(self, radius):\n        self._radius = radius\n\n    @___\n    def radius(self):\n        return self._radius\n\n    @___.___\n    def radius(self, value):\n        if value >= 0:\n            self._radius = value',
                    solution: 'class Circle:\n    def __init__(self, radius):\n        self._radius = radius\n\n    @property\n    def radius(self):\n        return self._radius\n\n    @radius.setter\n    def radius(self, value):\n        if value >= 0:\n            self._radius = value',
                    hints: ['Use @property', 'Use @property_name.setter'],
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
