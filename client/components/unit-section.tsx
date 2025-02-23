import { LessonCard } from "./lesson-card";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface UnitSectionProps {
  title: string;
  language: string;
  lessons: Array<{
    type: "concept" | "practice" | "challenge";
    status: "locked" | "available" | "completed";
    title: string;
    slug: string;
    xp?: number;
  }>;
  isCompleted?: boolean;
}

export const UnitSection = ({
  title,
  language,
  lessons,
  isCompleted = false,
}: UnitSectionProps) => {
  return (
    <div className={cn("unit-section", isCompleted && "unit-section-completed")}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-slate-700">{title}</h3>
        {isCompleted && (
          <div className="rounded-full bg-[#1cb0f6] px-2 py-1">
            <span className="text-xs font-bold text-white">COMPLETED</span>
          </div>
        )}
      </div>
      <div className="unit-path">
        <div className={cn(
          "flex items-center gap-4",
          isCompleted && "unit-path-completed"
        )}>
          {lessons.map((lesson, index) => (
            <Link 
              key={index} 
              href={lesson.status !== "locked" ? `/learn/${language}/${lesson.slug}` : "#"}
              className={cn(
                "relative",
                lesson.status === "locked" && "cursor-not-allowed"
              )}
            >
              <LessonCard
                type={lesson.type}
                status={lesson.status}
                title={lesson.title}
                xp={lesson.xp}
              />
              {index < lessons.length - 1 && (
                <div className={cn(
                  "absolute top-1/2 left-full w-4 h-0.5 -translate-y-1/2",
                  lesson.status === "completed" ? "bg-[#1cb0f6]" : "bg-slate-200"
                )} />
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
