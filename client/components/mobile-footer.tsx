import Link from "next/link";
import { Home, Trophy, Users, MessageSquare } from "lucide-react";

export const MobileFooter = () => {
  return (
    <div className="fixed bottom-0 w-full border-t bg-white lg:hidden">
      <div className="flex items-center justify-around py-4">
        <Link
          href="/learn"
          className="flex flex-col items-center gap-1"
        >
          <Home className="h-6 w-6" />
          <span className="text-xs">Learn</span>
        </Link>
        <Link
          href="/leaderboard"
          className="flex flex-col items-center gap-1"
        >
          <Trophy className="h-6 w-6" />
          <span className="text-xs">Leaderboard</span>
        </Link>
        <Link
          href="/friends"
          className="flex flex-col items-center gap-1"
        >
          <Users className="h-6 w-6" />
          <span className="text-xs">Friends</span>
        </Link>
        <Link
          href="/messages"
          className="flex flex-col items-center gap-1"
        >
          <MessageSquare className="h-6 w-6" />
          <span className="text-xs">Messages</span>
        </Link>
      </div>
    </div>
  );
};
