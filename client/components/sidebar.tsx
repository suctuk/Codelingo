import Link from "next/link";
import { Home, Trophy, Users, MessageSquare } from "lucide-react";

export const Sidebar = () => {
  return (
    <div className="fixed left-0 h-full w-[70px] bg-white border-r hidden lg:flex flex-col items-center gap-4 py-4">
      <Link
        href="/learn"
        className="p-2 hover:bg-slate-100 rounded-xl transition"
      >
        <Home className="h-6 w-6" />
      </Link>
      <Link
        href="/leaderboard"
        className="p-2 hover:bg-slate-100 rounded-xl transition"
      >
        <Trophy className="h-6 w-6" />
      </Link>
      <Link
        href="/friends"
        className="p-2 hover:bg-slate-100 rounded-xl transition"
      >
        <Users className="h-6 w-6" />
      </Link>
      <Link
        href="/messages"
        className="p-2 hover:bg-slate-100 rounded-xl transition"
      >
        <MessageSquare className="h-6 w-6" />
      </Link>
    </div>
  );
};
