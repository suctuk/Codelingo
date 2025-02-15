export const pythonToCppCurriculum = {
  sections: [
    {
      id: 'basics',
      title: 'C++ Fundamentals for Python Developers',
      description: 'Learn C++ basics coming from Python',
      units: [
        {
          id: 'unit_1',
          title: 'Getting Started with C++',
          lessons: [
            {
              id: 'lesson_1_1',
              title: 'Basic Program Structure',
              content: {
                theory: 'Unlike Python, C++ requires explicit main function and includes',
                examples: [
                  {
                    source: `print("Hello, World!")`,
                    target: `#include <iostream>

int main() {
    std::cout << "Hello, World!" << std::endl;
    return 0;
}`,
                    explanation: 'C++ requires includes, main function, and explicit output streaming'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert this Python program to C++:',
                    code: `print("Learning C++!")
print("It's different from Python")`,
                    solution: `#include <iostream>

int main() {
    std::cout << "Learning C++!" << std::endl;
    std::cout << "It's different from Python" << std::endl;
    return 0;
}`,
                    hints: [
                      'Include iostream',
                      'Add main function',
                      'Use std::cout for output',
                      'End with return 0'
                    ]
                  }
                ]
              }
            },
            {
              id: 'lesson_1_2',
              title: 'Variables and Types',
              content: {
                theory: 'C++ requires explicit type declarations and has value/reference semantics',
                examples: [
                  {
                    source: `name = "Alice"
age = 25
price = 9.99`,
                    target: `#include <string>

string name = "Alice";
int age = 25;
double price = 9.99;`,
                    explanation: 'C++ variables must have explicit types and string requires include'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert these Python variables to C++:',
                    code: `count = 0
message = "Hello"
is_active = True
height = 1.75`,
                    solution: `#include <string>

int count = 0;
string message = "Hello";
bool isActive = true;
double height = 1.75;`,
                    hints: [
                      'Declare types explicitly',
                      'Use bool for boolean',
                      'Convert snake_case to camelCase',
                      'Add semicolons'
                    ]
                  }
                ]
              }
            }
          ]
        },
        {
          id: 'unit_2',
          title: 'Memory Management',
          lessons: [
            {
              id: 'lesson_2_1',
              title: 'Pointers and References',
              content: {
                theory: 'C++ uses pointers and references for memory management',
                examples: [
                  {
                    source: `# Python reference
x = [1, 2, 3]
y = x  # y references x`,
                    target: `// C++ pointer and reference
int* ptr = new int[3]{1, 2, 3};  // pointer
int& ref = *ptr;  // reference

// Don't forget to delete
delete[] ptr;`,
                    explanation: 'C++ requires explicit memory management with new/delete'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert this Python code to C++ with proper memory management:',
                    code: `# Create and modify list
numbers = [10, 20, 30]
numbers[1] = 25
print(numbers[1])`,
                    solution: `#include <iostream>

int main() {
    int* numbers = new int[3]{10, 20, 30};
    numbers[1] = 25;
    std::cout << numbers[1] << std::endl;
    
    delete[] numbers;  // Clean up
    return 0;
}`,
                    hints: [
                      'Use new for allocation',
                      'Access array elements similarly',
                      'Remember to delete array',
                      'Use std::cout for output'
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
      title: 'Advanced C++ Concepts',
      description: 'Learn C++-specific features not found in Python',
      units: [
        {
          id: 'unit_1',
          title: 'Classes and Objects',
          lessons: [
            {
              id: 'lesson_1_1',
              title: 'Class Definition',
              content: {
                theory: 'C++ classes require header files and explicit memory management',
                examples: [
                  {
                    source: `class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
        
    def greet(self):
        print(f"Hello, {self.name}")`,
                    target: `// Person.h
class Person {
private:
    string name;
    int age;
    
public:
    Person(string name, int age);
    void greet();
};

// Person.cpp
#include "Person.h"

Person::Person(string name, int age) {
    this->name = name;
    this->age = age;
}

void Person::greet() {
    cout << "Hello, " << name << endl;
}`,
                    explanation: 'C++ separates declaration and implementation, requires access specifiers'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert this Python class to C++ (header and implementation):',
                    code: `class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height
    
    def area(self):
        return self.width * self.height`,
                    solution: `// Rectangle.h
class Rectangle {
private:
    double width;
    double height;
    
public:
    Rectangle(double width, double height);
    double area();
};

// Rectangle.cpp
#include "Rectangle.h"

Rectangle::Rectangle(double width, double height) {
    this->width = width;
    this->height = height;
}

double Rectangle::area() {
    return width * height;
}`,
                    hints: [
                      'Create header (.h) file',
                      'Create implementation (.cpp) file',
                      'Use access specifiers',
                      'Declare methods in class, define outside'
                    ]
                  }
                ]
              }
            }
          ]
        },
        {
          id: 'unit_2',
          title: 'Templates',
          lessons: [
            {
              id: 'lesson_2_1',
              title: 'Generic Programming',
              content: {
                theory: 'C++ templates provide compile-time generics',
                examples: [
                  {
                    source: `def max_value(a, b):
    return a if a > b else b`,
                    target: `template<typename T>
T maxValue(T a, T b) {
    return (a > b) ? a : b;
}`,
                    explanation: 'C++ templates generate type-safe code at compile time'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert this Python generic function to C++ template:',
                    code: `def first_element(items):
    return items[0] if items else None`,
                    solution: `template<typename T>
T* firstElement(T* items, int size) {
    return (size > 0) ? &items[0] : nullptr;
}

// Usage example
template<typename T>
T firstElementVector(const std::vector<T>& items) {
    return items.empty() ? T() : items[0];
}`,
                    hints: [
                      'Use template syntax',
                      'Handle empty case with nullptr/default',
                      'Consider both array and vector versions',
                      'Return pointer or value based on context'
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
