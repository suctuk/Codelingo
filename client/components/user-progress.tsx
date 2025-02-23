import { Progress } from "@/components/ui/progress";
import { Hearts } from "@/components/ui/hearts";
import { Streak } from "@/components/ui/streak";
import { Gems } from "@/components/ui/gems";

interface UserProgressProps {
  hearts: number;
  maxHearts: number;
  streak: number;
  gems: number;
  xp: number;
  dailyGoal: number;
  dailyProgress: number;
}

export const UserProgress = ({
  hearts,
  maxHearts,
  streak,
  gems,
  xp,
  dailyGoal,
  dailyProgress,
}: UserProgressProps) => {
  const progressPercentage = (dailyProgress / dailyGoal) * 100;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 lg:left-[70px]">
      <div className="container mx-auto flex items-center justify-between">
        <div className="md:hidden flex items-center gap-4">
          <Hearts count={hearts} maxHearts={maxHearts} />
          <Streak count={streak} />
          <Gems count={gems} />
        </div>
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-slate-700">Daily Goal:</span>
            <span className="text-sm font-bold text-[#1cb0f6]">{dailyProgress}/{dailyGoal} XP</span>
          </div>
          <div className="w-48">
            <Progress value={progressPercentage} className="h-3" />
          </div>
        </div>
      </div>
    </div>
  );
};
