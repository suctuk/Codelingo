export interface Exercise {
  type: 'multipleChoice' | 'codeComplete' | 'codeWrite';
  prompt: string;
  sourceCode?: string;
  targetCode?: string;
  options?: string[];
  correctAnswer: string | string[];
  timeLimit: number;
  xpReward: number;
}

export interface LessonNode {
  id: string;
  title: string;
  type: 'basics' | 'functions' | 'objects' | 'advanced';
  status: 'locked' | 'available' | 'completed' | 'golden';
  position: {
    x: number;
    y: number;
  };
  connections: string[];
  xp: number;
  skillLevel: number;
}

export interface ExerciseProps {
  exercise: Exercise;
  onComplete: (correct: boolean) => void;
  hearts: number;
  onHeartLost: () => void;
}

export interface LessonTreeProps {
  nodes: LessonNode[];
  onNodeClick: (nodeId: string) => void;
}

export interface GamificationState {
  xp: number;
  streak: number;
  lastPracticeDate: string;
  gems: number;
  hearts: number;
  maxHearts: number;
  dailyGoal: number;
  dailyProgress: number;
  skillLevels: Record<string, number>;
  unlockedLessons: string[];
  completedLessons: string[];
  goldenLessons: string[];
  achievements: Achievement[];
  
  // Actions
  addXP: (amount: number) => void;
  updateStreak: () => void;
  useGems: (amount: number) => boolean;
  addGems: (amount: number) => void;
  loseHeart: () => void;
  refillHearts: () => void;
  completeLesson: (lessonId: string, score: number) => void;
  updateSkillLevel: (lessonId: string) => void;
  checkAchievements: () => void;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  achieved: boolean;
  date?: string;
}
