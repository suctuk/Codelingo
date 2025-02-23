import { Heart } from "lucide-react";

interface HeartsProps {
  count: number;
  maxHearts: number;
}

export const Hearts = ({
  count,
  maxHearts = 5,
}: HeartsProps) => {
  return (
    <div className="flex items-center gap-1 py-2 px-3 text-rose-500 bg-rose-500/10 rounded-xl">
      <Heart className="h-5 w-5 fill-current" />
      <span className="text-sm font-bold">{count}</span>
    </div>
  );
};
