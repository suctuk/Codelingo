import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";

interface PageProps {
  params: {
    language: string;
  };
}

const languages: Record<string, {
  name: string;
  icon: string;
  lessons: Array<{
    title: string;
    description: string;
    completed: boolean;
    slug: string;
  }>;
}> = {
  python: {
    name: "Python",
    icon: "/python.svg",
    lessons: [
      {
        title: "Variables and Data Types",
        description: "Learn about variables, strings, numbers, and basic data types in Python",
        completed: false,
        slug: "variables-and-data-types"
      },
      {
        title: "Control Flow",
        description: "Master if statements, loops, and control structures",
        completed: false,
        slug: "control-flow"
      },
      {
        title: "Functions",
        description: "Learn how to create and use functions in Python",
        completed: false,
        slug: "functions"
      },
    ],
  },
  javascript: {
    name: "JavaScript",
    icon: "/javascript.svg",
    lessons: [
      {
        title: "Variables and Data Types",
        description: "Learn about variables, strings, numbers, and basic data types in JavaScript",
        completed: false,
        slug: "variables-and-data-types"
      },
      {
        title: "Control Flow",
        description: "Master if statements, loops, and control structures",
        completed: false,
        slug: "control-flow"
      },
      {
        title: "Functions",
        description: "Learn how to create and use functions in JavaScript",
        completed: false,
        slug: "functions"
      },
    ],
  },
  java: {
    name: "Java",
    icon: "/java.svg",
    lessons: [
      {
        title: "Variables and Data Types",
        description: "Learn about variables, strings, numbers, and basic data types in Java",
        completed: false,
        slug: "variables-and-data-types"
      },
      {
        title: "Control Flow",
        description: "Master if statements, loops, and control structures",
        completed: false,
        slug: "control-flow"
      },
      {
        title: "Functions and Methods",
        description: "Learn how to create and use methods in Java",
        completed: false,
        slug: "functions"
      },
    ],
  },
};

export default function LearnPage({ params }: PageProps) {
  const language = languages[params.language.toLowerCase()];

  if (!language) {
    notFound();
  }

  const progress = 0; // This will be connected to the backend later

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Image
            src={language.icon}
            alt={language.name}
            width={48}
            height={48}
            className="h-12 w-12"
          />
          <h1 className="text-3xl font-bold text-slate-900">
            Learning {language.name}
          </h1>
        </div>
        <Progress value={progress} className="h-3 w-full" />
        <p className="mt-2 text-sm text-slate-600">
          {progress}% Complete
        </p>
      </div>

      <div className="grid gap-4">
        {language.lessons.map((lesson, index) => (
          <div
            key={index}
            className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-slate-900">
                  {lesson.title}
                </h3>
                <p className="mt-1 text-slate-600">{lesson.description}</p>
              </div>
              <Link 
                href={`/learn/${params.language}/${lesson.slug}`}
                className="ml-4"
              >
                <Button>
                  {lesson.completed ? "Review" : "Start"}
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
