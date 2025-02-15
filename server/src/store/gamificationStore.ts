import create from 'zustand';
import { persist } from 'zustand/middleware';

interface GamificationState {
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
  goldenLessons: string[]; // Lessons with 5 crowns
  achievements: {
    id: string;
    title: string;
    description: string;
    achieved: boolean;
    date?: string;
  }[];
  
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

export const useGamificationStore = create<GamificationState>()(
  persist(
    (set, get) => ({
      xp: 0,
      streak: 0,
      lastPracticeDate: new Date().toISOString().split('T')[0],
      gems: 0,
      hearts: 5,
      maxHearts: 5,
      dailyGoal: 20,
      dailyProgress: 0,
      skillLevels: {},
      unlockedLessons: ['basics_1'],
      completedLessons: [],
      goldenLessons: [],
      achievements: [
        {
          id: 'first_lesson',
          title: 'First Steps',
          description: 'Complete your first lesson',
          achieved: false
        },
        {
          id: 'streak_7',
          title: 'Week Warrior',
          description: 'Maintain a 7-day streak',
          achieved: false
        },
        {
          id: 'golden_skill',
          title: 'Golden Master',
          description: 'Get your first golden skill',
          achieved: false
        }
      ],

      addXP: (amount) => set((state) => {
        const newXP = state.xp + amount;
        const newDailyProgress = state.dailyProgress + 1;
        return { 
          xp: newXP,
          dailyProgress: Math.min(newDailyProgress, state.dailyGoal)
        };
      }),

      updateStreak: () => set((state) => {
        const today = new Date().toISOString().split('T')[0];
        const lastDate = state.lastPracticeDate;
        
        if (today === lastDate) return state;
        
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];
        
        const newStreak = lastDate === yesterdayStr 
          ? state.streak + 1 
          : 1;
        
        return {
          streak: newStreak,
          lastPracticeDate: today,
          dailyProgress: 0 // Reset daily progress
        };
      }),

      useGems: (amount) => {
        const state = get();
        if (state.gems >= amount) {
          set({ gems: state.gems - amount });
          return true;
        }
        return false;
      },

      addGems: (amount) => set((state) => ({
        gems: state.gems + amount
      })),

      loseHeart: () => set((state) => ({
        hearts: Math.max(0, state.hearts - 1)
      })),

      refillHearts: () => set((state) => ({
        hearts: state.maxHearts
      })),

      completeLesson: (lessonId, score) => set((state) => {
        const newCompletedLessons = [...state.completedLessons];
        if (!newCompletedLessons.includes(lessonId)) {
          newCompletedLessons.push(lessonId);
        }

        // Unlock next lessons based on curriculum structure
        const newUnlockedLessons = [...state.unlockedLessons];
        // Add logic to unlock next lessons based on your curriculum graph

        return {
          completedLessons: newCompletedLessons,
          unlockedLessons: newUnlockedLessons
        };
      }),

      updateSkillLevel: (lessonId) => set((state) => {
        const currentLevel = state.skillLevels[lessonId] || 0;
        const newLevel = Math.min(5, currentLevel + 1);
        
        const newGoldenLessons = [...state.goldenLessons];
        if (newLevel === 5 && !newGoldenLessons.includes(lessonId)) {
          newGoldenLessons.push(lessonId);
        }

        return {
          skillLevels: {
            ...state.skillLevels,
            [lessonId]: newLevel
          },
          goldenLessons: newGoldenLessons
        };
      }),

      checkAchievements: () => set((state) => {
        const newAchievements = state.achievements.map(achievement => {
          if (achievement.achieved) return achievement;

          let achieved = false;
          switch (achievement.id) {
            case 'first_lesson':
              achieved = state.completedLessons.length > 0;
              break;
            case 'streak_7':
              achieved = state.streak >= 7;
              break;
            case 'golden_skill':
              achieved = state.goldenLessons.length > 0;
              break;
          }

          if (achieved && !achievement.achieved) {
            return {
              ...achievement,
              achieved: true,
              date: new Date().toISOString()
            };
          }

          return achievement;
        });

        return { achievements: newAchievements };
      })
    }),
    {
      name: 'gamification-storage'
    }
  )
);
