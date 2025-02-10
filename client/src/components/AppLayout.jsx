import React, { useState } from 'react';
import { Heart, Gem, Trophy, Users, BookOpen } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const AppLayout = ({ children }) => {
  const [lives, setLives] = useState(5);
  const [gems, setGems] = useState(100);
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);
  
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Navigation Bar */}
      <nav className="bg-white shadow-md p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-red-500">
              <Heart className="w-6 h-6" />
              <span className="ml-1 font-bold">{lives}</span>
            </div>
            <div className="flex items-center text-yellow-500">
              <Gem className="w-6 h-6" />
              <span className="ml-1 font-bold">{gems}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-purple-500">
              <Trophy className="w-6 h-6" />
              <span className="ml-1 font-bold">{xp} XP</span>
            </div>
            <div className="flex items-center text-blue-500">
              <span className="font-bold">🔥 {streak}</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-4">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t">
        <div className="flex justify-around p-4">
          <button className="flex flex-col items-center text-gray-600 hover:text-blue-500">
            <BookOpen className="w-6 h-6" />
            <span className="text-xs mt-1">Learn</span>
          </button>
          <button className="flex flex-col items-center text-gray-600 hover:text-blue-500">
            <Trophy className="w-6 h-6" />
            <span className="text-xs mt-1">Leaders</span>
          </button>
          <button className="flex flex-col items-center text-gray-600 hover:text-blue-500">
            <Users className="w-6 h-6" />
            <span className="text-xs mt-1">Friends</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default AppLayout;