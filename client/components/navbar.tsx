import Link from "next/link";
import { Hearts } from "@/components/ui/hearts";
import { Streak } from "@/components/ui/streak";
import { Gems } from "@/components/ui/gems";
import { Bell, Settings, Menu } from "lucide-react";

export const Navbar = () => {
  return (
    <header className="sticky top-0 w-full h-16 border-b bg-white z-50">
      <nav className="container h-full mx-auto flex items-center justify-between gap-2 px-4">
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-slate-100 rounded-full lg:hidden">
            <Menu className="h-6 w-6" />
          </button>
          <Link href="/" className="font-bold text-2xl text-green-500">
            CodeLingo
          </Link>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-4">
            <Hearts count={5} maxHearts={5} />
            <Streak count={0} />
            <Gems count={0} />
          </div>
          
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-slate-100 rounded-full">
              <Bell className="h-6 w-6" />
            </button>
            <button className="p-2 hover:bg-slate-100 rounded-full">
              <Settings className="h-6 w-6" />
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};
