import { createLanguagePairCurriculum } from './languagePairFactory';

export const phpToPythonCurriculum = {
  ...createLanguagePairCurriculum('php', 'python'),
  sections: [
    {
      id: 'section_1_basics',
      title: 'Python Fundamentals',
      description: 'Learn Python basics from a PHP perspective',
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
                theory: 'Converting PHP variables to Python',
                difficulty: 'beginner',
                xpPoints: 10,
                examples: [
                  {
                    source: `$name = "Alice";
$age = 25;
$height = 1.75;
$is_active = true;
define("PI", 3.14159);`,
                    target: `name = "Alice"
age = 25
height = 1.75
is_active = True
PI = 3.14159  # Constants are just variables`,
                    explanation: 'Python does not use $ and uses True/False'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Convert PHP variables to Python',
                    code: '___ = "Hello"\n___ = 42\n___ = True',
                    solution: 'message = "Hello"\ncount = 42\nis_valid = True',
                    hints: ['No $ prefix', 'Use True not true', 'Snake case naming'],
                    xpReward: 5
                  }
                ]
              }
            },
            {
              id: 'lesson_1_2',
              title: 'Arrays and Dictionaries',
              estimatedTime: 15,
              content: {
                theory: 'Converting PHP arrays to Python collections',
                difficulty: 'beginner',
                xpPoints: 15,
                examples: [
                  {
                    source: `$numbers = array(1, 2, 3);
$scores = [
    "Alice" => 95,
    "Bob" => 87
];
$mixed = array(1, "two", true);`,
                    target: `numbers = [1, 2, 3]  # List
scores = {
    "Alice": 95,
    "Bob": 87
}  # Dictionary
mixed = [1, "two", True]  # Lists can mix types`,
                    explanation: 'Python uses lists and dicts instead of arrays'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Convert PHP arrays to Python',
                    code: '___ = [1, 2, 3, 4, 5]\n___ = {"name": ___, "age": ___}',
                    solution: 'numbers = [1, 2, 3, 4, 5]\nuser = {"name": "Alice", "age": 25}',
                    hints: ['Use list syntax', 'Use dict syntax'],
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
                theory: 'Converting PHP functions to Python',
                difficulty: 'beginner',
                xpPoints: 20,
                examples: [
                  {
                    source: `function greet($name) {
    return "Hello, " . $name . "!";
}

function add($a, $b = 0) {
    return $a + $b;
}`,
                    target: `def greet(name):
    return f"Hello, {name}!"

def add(a, b=0):
    return a + b`,
                    explanation: 'Python uses def and no $ for parameters'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Convert PHP function to Python',
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
                theory: 'Converting PHP classes to Python',
                difficulty: 'intermediate',
                xpPoints: 25,
                examples: [
                  {
                    source: `class Person {
    private $name;
    private $age;

    public function __construct($name, $age) {
        $this->name = $name;
        $this->age = $age;
    }

    public function greet() {
        return "Hello, I'm " . $this->name . "!";
    }
}`,
                    target: `class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def greet(self):
        return f"Hello, I'm {self.name}!"`,
                    explanation: 'Python uses self instead of $this'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Convert PHP class to Python',
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
          id: 'unit_4_namespaces',
          title: 'Modules and Packages',
          description: 'Learn Python modules',
          skillLevel: 'advanced',
          xpToUnlock: 150,
          lessons: [
            {
              id: 'lesson_4_1',
              title: 'Namespace to Module',
              estimatedTime: 30,
              content: {
                theory: 'Converting PHP namespaces to Python modules',
                difficulty: 'advanced',
                xpPoints: 30,
                examples: [
                  {
                    source: `namespace App\\Utils;

use App\\Models\\User;
use App\\Services\\AuthService;

class Helper {
    public function process(User $user) {
        // ...
    }
}`,
                    target: `from app.models import User
from app.services import AuthService

class Helper:
    def process(self, user: User):
        # ...`,
                    explanation: 'Python uses import statements and module paths'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Convert PHP namespace to Python',
                    code: '___ math ___ sqrt\n___ .models ___ User\n___ .services ___ *',
                    solution: 'from math import sqrt\nfrom .models import User\nfrom .services import *',
                    hints: ['Use from/import', 'Relative imports with .'],
                    xpReward: 20
                  }
                ],
                practice: {
                  type: 'code_project',
                  instructions: 'Create a module structure with imports and a main class',
                  testCases: [
                    {
                      input: 'UserService("config.json")',
                      expectedOutput: 'UserService instance',
                      code: `from .config import Config
from .models import User
from .utils import load_json

class UserService:
    def __init__(self, config_path: str):
        self.config = Config(load_json(config_path))
    
    def get_user(self, user_id: int) -> User:
        # Implementation
        pass`
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
