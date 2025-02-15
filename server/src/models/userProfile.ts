export interface UserIcon {
  id: string;
  name: string;
  imageUrl: string;
  isLocked: boolean;
  gemCost?: number;
}

export interface UserSubscription {
  tier: 0 | 1 | 2; // 0 = free, 1 = premium, 2 = premium + AI tutor
  expiresAt: Date;
  features: {
    skipAds: boolean;
    unlimitedHearts: boolean;
    extraStreakFreezes: boolean;
    skipUnits: boolean;
    advancedPractice: boolean;
    aiTutor: boolean;
  };
}

export interface UserProgress {
  languagePair: {
    source: string;
    target: string;
  };
  experienceLevel: 'beginner' | 'intermediate' | 'advanced';
  dailyGoal: 5 | 10 | 15 | 20; // minutes
  xp: number;
  streak: number;
  streakFreezes: number;
  hearts: number;
  gems: number;
  completedUnits: string[];
  unlockedUnits: string[];
  testScores: {
    unitId: string;
    score: number;
    date: Date;
  }[];
}

export interface UserFriend {
  userId: string;
  username: string;
  iconUrl: string;
  status: 'online' | 'offline';
  lastActive: Date;
}

export interface FriendQuest {
  id: string;
  participants: string[];
  targetStreak: number;
  currentStreak: number;
  expiresAt: Date;
  rewards: {
    xp: number;
    gems: number;
  };
}

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  selectedIcon: UserIcon;
  unlockedIcons: UserIcon[];
  subscription: UserSubscription;
  progress: UserProgress;
  friends: UserFriend[];
  activeQuests: FriendQuest[];
  practiceHub: {
    mistakeTypes: {
      category: string;
      count: number;
      lastPracticed: Date;
    }[];
    customFocus: {
      topic: string;
      strength: number;
    }[];
  };
  notifications: {
    id: string;
    type: 'quest' | 'friend' | 'streak' | 'achievement';
    message: string;
    read: boolean;
    createdAt: Date;
  }[];
}
