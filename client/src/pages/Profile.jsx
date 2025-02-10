// client/src/pages/Profile.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Trophy, Star, Clock } from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    // Fetch user stats
  }, []);

  return (
    <div className="container mx-auto py-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="text-4xl">{user.avatar}</div>
          <div>
            <h1 className="text-2xl font-bold">{user.username}</h1>
            <p className="text-gray-600">Learning {user.targetLanguage}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2">
              <Trophy className="w-5 h-5 text-blue-500" />
              <span className="font-bold">XP: {user.xp}</span>
            </div>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-green-500" />
              <span className="font-bold">Completed Lessons: {stats?.completedLessons}</span>
            </div>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-purple-500" />
              <span className="font-bold">Current Streak: {user.streak} days</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;