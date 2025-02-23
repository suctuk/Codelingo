export const lessons: Record<string, Record<string, {
  title: string;
  content: string;
  exercise: string;
}>> = {
  python: {
    "variables-and-data-types": {
      title: "Variables and Data Types in Python",
      content: "In Python, variables are used to store data. Python is dynamically typed, which means you don't need to declare the type of variable. Let's look at some examples:\n\n```python\nname = 'John'  # String\nage = 25      # Integer\nheight = 1.75 # Float\n```",
      exercise: "Create a variable called 'name' and assign your name to it as a string.",
    },
    "control-flow": {
      title: "Control Flow in Python",
      content: "Control flow lets you control how your program runs. This includes if statements and loops.\n\n```python\nif number > 0:\n    print('Positive')\nelse:\n    print('Negative')\n```",
      exercise: "Write an if statement that checks if a number is positive or negative.",
    },
    "functions": {
      title: "Functions in Python",
      content: "Functions are reusable blocks of code that perform specific tasks.\n\n```python\ndef add(a, b):\n    return a + b\n\nresult = add(5, 3)  # Returns 8\n```",
      exercise: "Create a function that takes two numbers and returns their sum.",
    },
  },
  javascript: {
    "variables-and-data-types": {
      title: "Variables and Data Types in JavaScript",
      content: "In JavaScript, you can declare variables using let, const, or var.\n\n```javascript\nconst PI = 3.14159;\nlet count = 0;\nvar name = 'John';\n```",
      exercise: "Create a constant called 'PI' and assign it the value 3.14159.",
    },
    "control-flow": {
      title: "Control Flow in JavaScript",
      content: "JavaScript provides various control structures like if, else, while, and for.\n\n```javascript\nfor (let i = 1; i <= 10; i++) {\n    console.log(i);\n}\n```",
      exercise: "Write a for loop that counts from 1 to 10.",
    },
    "functions": {
      title: "Functions in JavaScript",
      content: "Functions in JavaScript can be declared or expressed.\n\n```javascript\nconst square = (x) => x * x;\nconsole.log(square(5));  // Outputs: 25\n```",
      exercise: "Create an arrow function that calculates the square of a number.",
    },
  },
  java: {
    "variables-and-data-types": {
      title: "Variables and Data Types in Java",
      content: "Java is statically typed, meaning you must declare variable types.\n\n```java\nint age = 25;\nString name = \"John\";\ndouble height = 1.75;\n```",
      exercise: "Declare an integer variable called 'age' and assign it a value.",
    },
    "control-flow": {
      title: "Control Flow in Java",
      content: "Java provides control structures similar to other languages.\n\n```java\nint i = 10;\nwhile (i > 0) {\n    System.out.println(i);\n    i--;\n}\n```",
      exercise: "Write a while loop that prints numbers from 10 to 1.",
    },
    "functions": {
      title: "Methods in Java",
      content: "In Java, functions are called methods and must be part of a class.\n\n```java\npublic static int max(int a, int b) {\n    return a > b ? a : b;\n}\n```",
      exercise: "Create a method that returns the maximum of two numbers.",
    },
  },
};
