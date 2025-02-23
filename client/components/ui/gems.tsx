import { Diamond } from "lucide-react";

interface GemsProps {
  count: number;
}

export const Gems = ({
  count,
}: GemsProps) => {
  return (
    <div className="flex items-center gap-1 py-2 px-3 text-blue-500 bg-blue-500/10 rounded-xl">
      <Diamond className="h-5 w-5 fill-current" />
      <span className="text-sm font-bold">{count}</span>
    </div>
  );
};
