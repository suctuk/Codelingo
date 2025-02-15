import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaHeart, 
  FaGem, 
  FaFire, 
  FaBell, 
  FaCrown,
  FaUserFriends
} from 'react-icons/fa';

interface HeaderProps {
  user: {
    hearts: number | 'unlimited';
    gems: number;
    streak: number;
    xp: number;
    isPremium: boolean;
  };
  notifications: number;
}

const Header: React.FC<HeaderProps> = ({ user, notifications }) => {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white shadow-md z-50">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <img src="/logo.svg" alt="CodeLingo" className="h-8 w-8" />
          <span className="text-xl font-bold text-primary">CodeLingo</span>
        </Link>

        <div className="flex items-center space-x-6">
          {/* Hearts */}
          <div className="flex items-center space-x-1">
            <FaHeart className="text-red-500" />
            <span className="font-medium">
              {user.hearts === 'unlimited' ? '∞' : user.hearts}
            </span>
          </div>

          {/* Gems */}
          <div className="flex items-center space-x-1">
            <FaGem className="text-blue-500" />
            <span className="font-medium">{user.gems}</span>
          </div>

          {/* Streak */}
          <div className="flex items-center space-x-1">
            <FaFire className="text-orange-500" />
            <span className="font-medium">{user.streak}</span>
          </div>

          {/* XP */}
          <div className="flex items-center space-x-1">
            <span className="text-sm font-bold text-green-500">XP</span>
            <span className="font-medium">{user.xp}</span>
          </div>

          {/* Premium Status */}
          {user.isPremium && (
            <div className="text-yellow-500">
              <FaCrown />
            </div>
          )}

          {/* Friends */}
          <Link to="/friends" className="text-gray-600 hover:text-primary">
            <FaUserFriends size={20} />
          </Link>

          {/* Notifications */}
          <Link to="/notifications" className="relative">
            <FaBell size={20} className="text-gray-600 hover:text-primary" />
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {notifications}
              </span>
            )}
          </Link>

          {/* User Menu */}
          <div className="relative">
            <button className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
              <img 
                src="/default-avatar.svg" 
                alt="User" 
                className="w-full h-full object-cover"
              />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
