import Image from "next/image";
import { notFound } from "next/navigation";
import { UnitSection } from "@/components/unit-section";
import { UserProgress } from "@/components/user-progress";

interface PageProps {
  params: {
    language: string;
  };
}

const languages: Record<string, {
  name: string;
  icon: string;
  units: Array<{
    title: string;
    description: string;
    sections: Array<{
      title: string;
      isCompleted: boolean;
      lessons: Array<{
        type: "concept" | "practice" | "challenge";
        status: "locked" | "available" | "completed";
        title: string;
        slug: string;
        xp: number;
      }>;
    }>;
  }>;
}> = {
  python: {
    name: "Python",
    icon: "/python.svg",
    units: [
      {
        title: "Unit 1",
        description: "Basic Concepts",
        sections: [
          {
            title: "Print Statements",
            isCompleted: true,
            lessons: [
              { type: "concept", status: "completed", title: "Introduction to Print", slug: "print-intro", xp: 10 },
              { type: "practice", status: "completed", title: "Print Practice", slug: "print-practice", xp: 15 },
              { type: "challenge", status: "completed", title: "Print Challenge", slug: "print-challenge", xp: 20 },
            ],
          },
          {
            title: "Variables",
            isCompleted: false,
            lessons: [
              { type: "concept", status: "available", title: "Variable Basics", slug: "variables-and-data-types", xp: 10 },
              { type: "practice", status: "locked", title: "Variable Practice", slug: "variable-practice", xp: 15 },
              { type: "challenge", status: "locked", title: "Variable Challenge", slug: "variable-challenge", xp: 20 },
            ],
          },
        ],
      },
      {
        title: "Unit 2",
        description: "Control Flow",
        sections: [
          {
            title: "Conditionals",
            isCompleted: false,
            lessons: [
              { type: "concept", status: "locked", title: "If Statements", slug: "control-flow", xp: 10 },
              { type: "practice", status: "locked", title: "If-Else Practice", slug: "if-else-practice", xp: 15 },
              { type: "challenge", status: "locked", title: "Conditionals Challenge", slug: "conditionals-challenge", xp: 20 },
            ],
          },
          {
            title: "Loops",
            isCompleted: false,
            lessons: [
              { type: "concept", status: "locked", title: "For Loops", slug: "for-loops", xp: 10 },
              { type: "practice", status: "locked", title: "Loop Practice", slug: "loop-practice", xp: 15 },
              { type: "challenge", status: "locked", title: "Loop Challenge", slug: "loop-challenge", xp: 20 },
            ],
          },
        ],
      },
    ],
  },
  javascript: {
    name: "JavaScript",
    icon: "/javascript.svg",
    units: [
      {
        title: "Unit 1",
        description: "Basic Concepts",
        sections: [
          {
            title: "Variables",
            isCompleted: false,
            lessons: [
              { type: "concept", status: "available", title: "Variable Basics", slug: "variables-and-data-types", xp: 10 },
              { type: "practice", status: "locked", title: "Variable Practice", slug: "variable-practice", xp: 15 },
              { type: "challenge", status: "locked", title: "Variable Challenge", slug: "variable-challenge", xp: 20 },
            ],
          },
        ],
      },
    ],
  },
};

export default function LearnPage({ params }: PageProps) {
  const language = params.language.toLowerCase();
  const languageData = languages[language];

  if (!languageData) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center gap-4">
        <div className="h-16 w-16 relative">
          <Image
            src={languageData.icon}
            alt={languageData.name}
            fill
            className="object-contain"
          />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            {languageData.name} Course
          </h1>
          <p className="text-slate-500">Master the basics of {languageData.name}</p>
        </div>
      </div>

      <div className="space-y-12">
        {languageData.units.map((unit, unitIndex) => (
          <div key={unitIndex} className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-slate-900">{unit.title}</h2>
              <p className="text-slate-500">{unit.description}</p>
            </div>

            <div className="space-y-4">
              {unit.sections.map((section, sectionIndex) => (
                <UnitSection
                  key={sectionIndex}
                  title={section.title}
                  language={language}
                  lessons={section.lessons}
                  isCompleted={section.isCompleted}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <UserProgress
          hearts={5}
          maxHearts={5}
          streak={3}
          gems={100}
          xp={150}
          dailyGoal={200}
          dailyProgress={150}
        />
      </div>
    </div>
  );
}
