import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";
import Link from "next/link";

interface PageProps {
  params: {
    language: string;
    lesson: string;
  };
}

const lessons: Record<string, Record<string, {
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
      content: "Control flow lets you control how your program runs. This includes if statements and loops.",
      exercise: "Write an if statement that checks if a number is positive or negative.",
    },
    "functions": {
      title: "Functions in Python",
      content: "Functions are reusable blocks of code that perform specific tasks.",
      exercise: "Create a function that takes two numbers and returns their sum.",
    },
  },
  javascript: {
    "variables-and-data-types": {
      title: "Variables and Data Types in JavaScript",
      content: "In JavaScript, you can declare variables using let, const, or var.",
      exercise: "Create a constant called 'PI' and assign it the value 3.14159.",
    },
    "control-flow": {
      title: "Control Flow in JavaScript",
      content: "JavaScript provides various control structures like if, else, while, and for.",
      exercise: "Write a for loop that counts from 1 to 10.",
    },
    "functions": {
      title: "Functions in JavaScript",
      content: "Functions in JavaScript can be declared or expressed.",
      exercise: "Create an arrow function that calculates the square of a number.",
    },
  },
  java: {
    "variables-and-data-types": {
      title: "Variables and Data Types in Java",
      content: "Java is statically typed, meaning you must declare variable types.",
      exercise: "Declare an integer variable called 'age' and assign it a value.",
    },
    "control-flow": {
      title: "Control Flow in Java",
      content: "Java provides control structures similar to other languages.",
      exercise: "Write a while loop that prints numbers from 10 to 1.",
    },
    "functions": {
      title: "Methods in Java",
      content: "In Java, functions are called methods and must be part of a class.",
      exercise: "Create a method that returns the maximum of two numbers.",
    },
  },
};

export default function LessonPage({ params }: PageProps) {
  const language = params.language.toLowerCase();
  const lessonSlug = params.lesson.toLowerCase();
  
  const lessonContent = lessons[language]?.[lessonSlug];

  if (!lessonContent) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold text-slate-900">
        {lessonContent.title}
      </h1>

      <div className="mb-8 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold text-slate-900">Lesson</h2>
        <div className="prose max-w-none text-slate-600">
          {lessonContent.content.split('\\n').map((paragraph, index) => (
            <p key={index} className="mb-4">{paragraph}</p>
          ))}
        </div>
      </div>

      <div className="mb-8 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold text-slate-900">Exercise</h2>
        <p className="mb-4 text-slate-600">{lessonContent.exercise}</p>
        <div className="relative">
          <textarea
            className="min-h-[200px] w-full rounded-lg border border-slate-200 bg-slate-50 p-4 font-mono text-slate-900"
            placeholder="Write your code here..."
          />
          <Button className="absolute bottom-4 right-4">Run Code</Button>
        </div>
      </div>

      <div className="flex justify-between">
        <Link href={`/learn/${language}`}>
          <Button variant="outline">Back to Course</Button>
        </Link>
        <Button>Next Lesson</Button>
      </div>
    </div>
  );
}
