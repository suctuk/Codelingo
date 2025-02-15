export const javaScriptToCppCurriculum = {
  sections: [
    {
      id: 'basics',
      title: 'C++ Fundamentals for JavaScript Developers',
      description: 'Learn C++ coming from JavaScript',
      units: [
        {
          id: 'unit_1',
          title: 'Static Typing and Memory',
          lessons: [
            {
              id: 'lesson_1_1',
              title: 'Variables and Types',
              content: {
                theory: 'Convert JavaScript\'s dynamic types to C++ static types',
                examples: [
                  {
                    source: `let name = "Alice";
const age = 25;
let price = 9.99;`,
                    target: `#include <string>

string name = "Alice";
const int age = 25;
double price = 9.99;`,
                    explanation: 'C++ requires explicit types and string header'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert these JavaScript variables to C++:',
                    code: `let count = 0;
const PI = 3.14159;
let isActive = true;
let message = "Hello";`,
                    solution: `int count = 0;
const double PI = 3.14159;
bool isActive = true;
string message = "Hello";`,
                    hints: [
                      'Use appropriate C++ types',
                      'const for constants',
                      'bool for boolean',
                      'string for text'
                    ]
                  }
                ]
              }
            },
            {
              id: 'lesson_1_2',
              title: 'Arrays and Memory',
              content: {
                theory: 'JavaScript arrays become C++ arrays or vectors with manual memory management',
                examples: [
                  {
                    source: `const numbers = [1, 2, 3];
numbers.push(4);`,
                    target: `#include <vector>

vector<int> numbers = {1, 2, 3};
numbers.push_back(4);

// Or with raw array
int* numbers = new int[4]{1, 2, 3, 4};
// ... use array
delete[] numbers;`,
                    explanation: 'Use std::vector for dynamic arrays or manage memory manually'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert this JavaScript array code to C++:',
                    code: `const items = ["a", "b", "c"];
items.push("d");
console.log(items[1]);`,
                    solution: `#include <iostream>
#include <vector>
#include <string>

int main() {
    vector<string> items = {"a", "b", "c"};
    items.push_back("d");
    cout << items[1] << endl;
    return 0;
}`,
                    hints: [
                      'Include necessary headers',
                      'Use vector for dynamic size',
                      'push_back instead of push',
                      'cout for output'
                    ]
                  }
                ]
              }
            }
          ]
        },
        {
          id: 'unit_2',
          title: 'Functions and Objects',
          lessons: [
            {
              id: 'lesson_2_1',
              title: 'Function Declarations',
              content: {
                theory: 'Convert JavaScript functions to C++ with type declarations',
                examples: [
                  {
                    source: `function add(a, b) {
    return a + b;
}

const greet = (name) => {
    return "Hello, " + name;
};`,
                    target: `int add(int a, int b) {
    return a + b;
}

string greet(const string& name) {
    return "Hello, " + name;
}`,
                    explanation: 'C++ requires type declarations for parameters and return values'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert these JavaScript functions to C++:',
                    code: `function multiply(x, y) {
    return x * y;
}

const calculateArea = (width, height) => width * height;`,
                    solution: `double multiply(double x, double y) {
    return x * y;
}

double calculateArea(double width, double height) {
    return width * height;
}`,
                    hints: [
                      'Add parameter types',
                      'Add return types',
                      'Consider numeric types carefully',
                      'No arrow functions in C++'
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
      title: 'Advanced C++ Features',
      description: 'Master C++-specific concepts',
      units: [
        {
          id: 'unit_1',
          title: 'Classes and Objects',
          lessons: [
            {
              id: 'lesson_1_1',
              title: 'Class Structure',
              content: {
                theory: 'Convert JavaScript classes to C++ classes with header files',
                examples: [
                  {
                    source: `class User {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    
    greet() {
        return "Hello, " + this.name;
    }
}`,
                    target: `// User.h
class User {
private:
    string name;
    int age;
    
public:
    User(string name, int age);
    string greet();
};

// User.cpp
User::User(string name, int age) {
    this->name = name;
    this->age = age;
}

string User::greet() {
    return "Hello, " + name;
}`,
                    explanation: 'C++ separates interface and implementation'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert this JavaScript class to C++:',
                    code: `class Product {
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
    
    getInfo() {
        return \`\${this.name}: $\${this.price}\`;
    }
}`,
                    solution: `// Product.h
class Product {
private:
    int id;
    string name;
    double price;
    
public:
    Product(int id, string name, double price);
    string getInfo();
};

// Product.cpp
#include <sstream>

Product::Product(int id, string name, double price) {
    this->id = id;
    this->name = name;
    this->price = price;
}

string Product::getInfo() {
    ostringstream oss;
    oss << name << ": $" << price;
    return oss.str();
}`,
                    hints: [
                      'Create header and implementation files',
                      'Use access specifiers',
                      'Use stringstream for string formatting',
                      'Declare constructor and methods'
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
              title: 'Smart Pointers',
              content: {
                theory: 'Use modern C++ smart pointers for automatic memory management',
                examples: [
                  {
                    source: `let obj = {
    data: "some data"
};
// JavaScript handles memory automatically`,
                    target: `#include <memory>

auto obj = make_unique<MyClass>("some data");
// Memory cleaned up automatically when obj goes out of scope

// Shared ownership
auto shared = make_shared<MyClass>("shared data");`,
                    explanation: 'Smart pointers provide automatic memory management in C++'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert this JavaScript code to use C++ smart pointers:',
                    code: `class Resource {
    constructor(data) {
        this.data = data;
    }
}

let resource = new Resource("important data");`,
                    solution: `#include <memory>

class Resource {
private:
    string data;
    
public:
    Resource(string data) : data(data) {}
    string getData() { return data; }
};

int main() {
    auto resource = make_unique<Resource>("important data");
    // Use resource->getData() to access data
    return 0;
}`,
                    hints: [
                      'Include memory header',
                      'Use make_unique for single ownership',
                      'Use make_shared for shared ownership',
                      'Access members with arrow operator'
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
