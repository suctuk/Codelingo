import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Check, Lock, Star } from "lucide-react";

const units = [
  {
    title: "Unit 1",
    description: "Basic Concepts",
    sections: [
      {
        title: "Print Statements",
        lessons: [
          { type: "concept", status: "completed" },
          { type: "practice", status: "completed" },
          { type: "challenge", status: "completed" },
        ],
      },
      {
        title: "Variables",
        lessons: [
          { type: "concept", status: "available" },
          { type: "practice", status: "locked" },
          { type: "challenge", status: "locked" },
        ],
      },
    ],
  },
  {
    title: "Unit 2",
    description: "Data Types",
    sections: [
      {
        title: "Numbers",
        lessons: [
          { type: "concept", status: "locked" },
          { type: "practice", status: "locked" },
          { type: "challenge", status: "locked" },
        ],
      },
      {
        title: "Strings",
        lessons: [
          { type: "concept", status: "locked" },
          { type: "practice", status: "locked" },
          { type: "challenge", status: "locked" },
        ],
      },
    ],
  },
];

const languages = [
  {
    name: "Python",
    description: "Popular general-purpose programming language",
    image: "/python.svg",
    link: "/learn/python",
  },
  {
    name: "JavaScript",
    description: "The language of the web",
    image: "/javascript.svg",
    link: "/learn/javascript",
  },
  {
    name: "Java",
    description: "Versatile, object-oriented programming",
    image: "/java.svg",
    link: "/learn/java",
  },
];

const LessonIcon = ({ status, type }: { status: string; type: string }) => {
  if (status === "locked") {
    return (
      <div className="h-14 w-14 rounded-xl bg-slate-200 flex items-center justify-center">
        <Lock className="h-6 w-6 text-slate-400" />
      </div>
    );
  }

  if (status === "completed") {
    return (
      <div className="h-14 w-14 rounded-xl bg-green-500 flex items-center justify-center">
        <Check className="h-8 w-8 text-white" />
      </div>
    );
  }

  return (
    <div className="h-14 w-14 rounded-xl bg-[#58cc02] flex items-center justify-center hover:bg-[#45a100] cursor-pointer">
      <Star className="h-8 w-8 text-white" />
    </div>
  );
};

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="mb-8 flex items-center gap-4">
        <Image
          src="/mascot.svg"
          alt="CodeLingo Mascot"
          width={80}
          height={80}
          className="h-20 w-20"
        />
        <h1 className="text-4xl font-bold text-slate-900">Welcome to CodeLingo</h1>
      </div>

      <div className="w-full max-w-5xl">
        <h2 className="mb-4 text-2xl font-bold text-slate-900">Choose Your Path</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {languages.map((language) => (
            <Card key={language.name} className="overflow-hidden">
              <div className="p-6">
                <div className="mb-4 flex items-center gap-4">
                  <Image
                    src={language.image}
                    alt={language.name}
                    width={40}
                    height={40}
                    className="h-10 w-10"
                  />
                  <h2 className="text-xl font-semibold text-slate-900">
                    {language.name}
                  </h2>
                </div>
                <p className="mb-4 text-slate-600">{language.description}</p>
                <Link href={language.link} className="block w-full">
                  <Button className="w-full bg-[#58cc02] hover:bg-[#45a100] text-white">
                    Start Learning
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-12">
          <h2 className="mb-4 text-2xl font-bold text-slate-900">Learning Path</h2>
          <div className="space-y-8">
            {units.map((unit, unitIndex) => (
              <div key={unit.title} className="rounded-lg border bg-white p-6">
                <h3 className="mb-2 text-xl font-semibold text-slate-900">
                  {unit.title} - {unit.description}
                </h3>
                <div className="space-y-6">
                  {unit.sections.map((section, sectionIndex) => (
                    <div key={section.title} className="border-t pt-4">
                      <h4 className="mb-4 text-lg font-medium text-slate-900">
                        {section.title}
                      </h4>
                      <div className="flex gap-4">
                        {section.lessons.map((lesson, lessonIndex) => (
                          <LessonIcon
                            key={lessonIndex}
                            status={lesson.status}
                            type={lesson.type}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
