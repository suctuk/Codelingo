import { Check, Lock, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface LessonCardProps {
  type: "concept" | "practice" | "challenge";
  status: "locked" | "available" | "completed";
  title: string;
  xp?: number;
  onClick?: () => void;
}

export const LessonCard = ({
  type,
  status,
  title,
  xp = 10,
  onClick,
}: LessonCardProps) => {
  const isLocked = status === "locked";
  const isCompleted = status === "completed";

  const Icon = isLocked ? Lock : isCompleted ? Check : Star;

  return (
    <button
      onClick={onClick}
      disabled={isLocked}
      className={cn(
        "lesson-button",
        isLocked && "lesson-button-locked",
        isCompleted && "lesson-button-completed",
        !isLocked && !isCompleted && "lesson-button-available"
      )}
    >
      <div className="flex flex-col items-center gap-1">
        <Icon className={cn("h-8 w-8", isCompleted && "text-white")} />
        {!isLocked && (
          <span className="text-xs font-bold text-white">
            {xp} XP
          </span>
        )}
      </div>
    </button>
  );
};
