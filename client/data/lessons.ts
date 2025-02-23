export const lessons: Record<string, Record<string, {
  title: string;
  content: string;
  exercise: string | {
    instruction: string;
    template: string;
  };
  template?: string;
}>> = {
  python: {
    "variables-and-data-types": {
      title: "Variables and Data Types in Python",
      content: "In Python, variables are used to store data. Python is dynamically typed, which means you don't need to declare the type of variable. Let's look at some examples:\n\n```python\n# String example\ngreeting = 'Hello, World!'\nprint(greeting)\n\n# Number examples\ntemperature = 25.5\ncount = 100\n\n# Boolean example\nis_sunny = True\n```",
      exercise: "Create a variable called 'name' and assign your name to it as a string. Then print it.",
      template: "# Create a variable called 'name' and assign your name to it\n\n\n# Print the variable\n",
    },
    "control-flow": {
      title: 'Control Flow',
      content: `Control flow lets you control how your program runs. Let's look at some examples:

First, let's check a temperature:
\`\`\`python
temperature = 25

if temperature > 30:
    print('Hot day!')
elif temperature > 20:
    print('Nice day!')
else:
    print('Cool day!')
\`\`\`

Now, let's see how we can use the modulo operator (%) to check if a number is divisible by another number:
\`\`\`python
number = 10

# The modulo operator (%) gives us the remainder after division
# If number % 2 equals 0, it means the number is divisible by 2 (even)
if number % 2 == 0:
    print('This is an even number')
else:
    print('This is an odd number')
\`\`\`
`,
      exercise: {
        instruction: 'Create a function called check_number that takes a number as input and returns "Even" if the number is even, and "Odd" if the number is odd.',
        template: `def check_number(n):
    # Use the modulo operator % to check if n is even
    # Return "Even" if the number is even
    # Return "Odd" if the number is odd
    return "Even"

print(check_number(4))  # Should print: Even
print(check_number(7))  # Should print: Odd`,
      }
    },
    "functions": {
      title: "Functions in Python",
      content: "Functions help us organize and reuse code. Here's an example of a function that calculates the area of a rectangle:\n\n```python\ndef calculate_area(length, width):\n    area = length * width\n    return area\n\n# Using the function\nroom_area = calculate_area(10, 8)\nprint(f'The room area is {room_area} square meters')\n```",
      exercise: "Create a function called add_numbers that takes two parameters (a and b) and returns their sum.",
      template: "def add_numbers(a, b):\n    # Write your code here\n\n\n# Test your function\nresult = add_numbers(5, 3)\nprint(result)  # Should print: 8",
    },
  },
  javascript: {
    "variables-and-data-types": {
      title: "Variables and Data Types in JavaScript",
      content: "JavaScript has several ways to declare variables. Each serves a different purpose:\n\n```javascript\n// Constants can't be changed\nconst TAX_RATE = 0.2;\n\n// Variables that can be reassigned\nlet score = 0;\nscore += 10;\n\n// Template literals for strings\nconst greeting = `Score: ${score}`;\nconsole.log(greeting);\n```",
      exercise: "Declare a constant called PI with the value 3.14159 and use it to calculate the area of a circle with radius 5.",
      template: "// Declare PI constant here\n\n\n// Calculate and print the area of a circle with radius 5\n// Area = PI * radius * radius\n",
    },
    "control-flow": {
      title: "Control Flow in JavaScript",
      content: "JavaScript offers many ways to control program flow. Here's an example using a switch statement:\n\n```javascript\nconst day = 'Monday';\n\nswitch (day) {\n  case 'Monday':\n    console.log('Start of work week');\n    break;\n  case 'Friday':\n    console.log('Weekend is coming!');\n    break;\n  default:\n    console.log('Regular day');\n}\n```",
      exercise: "Complete the for loop to count from 1 to 10 and print each number:",
      template: "// Write a for loop that counts from 1 to 10\n// and prints each number using console.log\n\n",
    },
    "functions": {
      title: "Functions in JavaScript",
      content: "Modern JavaScript often uses arrow functions. Here's an example that formats a price:\n\n```javascript\nconst formatPrice = (price) => {\n  return `$${price.toFixed(2)}`;\n};\n\nconst total = formatPrice(29.99);\nconsole.log(`Total: ${total}`);\n```",
      exercise: "Create an arrow function called square that takes a number and returns its square:",
      template: "// Create an arrow function called square\n// that takes a number and returns its square\nconst square = \n\n// Test your function\nconsole.log(square(5));  // Should print 25\nconsole.log(square(3));  // Should print 9",
    },
  },
  java: {
    "variables-and-data-types": {
      title: "Variables and Data Types in Java",
      content: "Java is statically typed, meaning you must declare variable types.\n\n```java\nint age = 25;\nString name = \"John\";\ndouble height = 1.75;\n```",
      exercise: "Declare an integer variable called 'age' and assign it a value.",
      template: "// Declare an integer variable called 'age'\n// and assign it a value\n\n",
    },
    "control-flow": {
      title: "Control Flow in Java",
      content: "Java provides control structures similar to other languages.\n\n```java\nint i = 10;\nwhile (i > 0) {\n    System.out.println(i);\n    i--;\n}\n```",
      exercise: "Write a while loop that prints numbers from 10 to 1.",
      template: "// Write a while loop that prints numbers from 10 to 1\n// Use System.out.println to print each number\n\n",
    },
    "functions": {
      title: "Methods in Java",
      content: "In Java, functions are called methods and must be part of a class.\n\n```java\npublic static int max(int a, int b) {\n    return a > b ? a : b;\n}\n```",
      exercise: "Create a method that returns the maximum of two numbers.",
      template: "// Create a method that returns the maximum of two numbers\n// Use the ternary operator to compare the numbers\n\n",
    },
  },
};
