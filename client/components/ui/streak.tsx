import { Flame } from "lucide-react";

interface StreakProps {
  count: number;
}

export const Streak = ({
  count,
}: StreakProps) => {
  return (
    <div className="flex items-center gap-1 py-2 px-3 text-orange-500 bg-orange-500/10 rounded-xl">
      <Flame className="h-5 w-5 fill-current" />
      <span className="text-sm font-bold">{count}</span>
    </div>
  );
};
