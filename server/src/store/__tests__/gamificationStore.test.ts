import { act, renderHook } from '@testing-library/react';
import { useGamificationStore } from '../gamificationStore';

describe('Gamification Store', () => {
  beforeEach(() => {
    // Clear the store before each test
    const store = useGamificationStore.getState();
    act(() => {
      useGamificationStore.setState({
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
        achievements: store.achievements
      });
    });
  });

  describe('XP Management', () => {
    it('adds XP correctly', () => {
      const { result } = renderHook(() => useGamificationStore());
      
      act(() => {
        result.current.addXP(10);
      });

      expect(result.current.xp).toBe(10);
      expect(result.current.dailyProgress).toBe(1);
    });

    it('caps daily progress at daily goal', () => {
      const { result } = renderHook(() => useGamificationStore());
      
      act(() => {
        for (let i = 0; i < 25; i++) {
          result.current.addXP(10);
        }
      });

      expect(result.current.dailyProgress).toBe(20); // Capped at dailyGoal
    });
  });

  describe('Streak Management', () => {
    it('increments streak for consecutive days', () => {
      const { result } = renderHook(() => useGamificationStore());
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      
      act(() => {
        useGamificationStore.setState({
          lastPracticeDate: yesterday.toISOString().split('T')[0],
          streak: 3
        });
        result.current.updateStreak();
      });

      expect(result.current.streak).toBe(4);
    });

    it('resets streak for missed days', () => {
      const { result } = renderHook(() => useGamificationStore());
      const twoDaysAgo = new Date();
      twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
      
      act(() => {
        useGamificationStore.setState({
          lastPracticeDate: twoDaysAgo.toISOString().split('T')[0],
          streak: 5
        });
        result.current.updateStreak();
      });

      expect(result.current.streak).toBe(1);
    });
  });

  describe('Gems Management', () => {
    it('adds gems correctly', () => {
      const { result } = renderHook(() => useGamificationStore());
      
      act(() => {
        result.current.addGems(50);
      });

      expect(result.current.gems).toBe(50);
    });

    it('handles gem usage correctly', () => {
      const { result } = renderHook(() => useGamificationStore());
      
      act(() => {
        result.current.addGems(100);
      });

      let success;
      act(() => {
        success = result.current.useGems(50);
      });

      expect(success).toBe(true);
      expect(result.current.gems).toBe(50);

      act(() => {
        success = result.current.useGems(100);
      });

      expect(success).toBe(false);
      expect(result.current.gems).toBe(50); // Unchanged
    });
  });

  describe('Hearts Management', () => {
    it('handles heart loss correctly', () => {
      const { result } = renderHook(() => useGamificationStore());
      
      act(() => {
        result.current.loseHeart();
      });

      expect(result.current.hearts).toBe(4);
    });

    it('prevents hearts from going below zero', () => {
      const { result } = renderHook(() => useGamificationStore());
      
      act(() => {
        for (let i = 0; i < 7; i++) {
          result.current.loseHeart();
        }
      });

      expect(result.current.hearts).toBe(0);
    });

    it('refills hearts correctly', () => {
      const { result } = renderHook(() => useGamificationStore());
      
      act(() => {
        result.current.loseHeart();
        result.current.loseHeart();
        result.current.refillHearts();
      });

      expect(result.current.hearts).toBe(5);
    });
  });

  describe('Lesson Progress', () => {
    it('completes lessons correctly', () => {
      const { result } = renderHook(() => useGamificationStore());
      
      act(() => {
        result.current.completeLesson('basics_1', 100);
      });

      expect(result.current.completedLessons).toContain('basics_1');
    });

    it('updates skill levels correctly', () => {
      const { result } = renderHook(() => useGamificationStore());
      
      act(() => {
        result.current.updateSkillLevel('basics_1');
      });

      expect(result.current.skillLevels['basics_1']).toBe(1);
    });

    it('adds golden lessons when skill level reaches 5', () => {
      const { result } = renderHook(() => useGamificationStore());
      
      act(() => {
        for (let i = 0; i < 5; i++) {
          result.current.updateSkillLevel('basics_1');
        }
      });

      expect(result.current.skillLevels['basics_1']).toBe(5);
      expect(result.current.goldenLessons).toContain('basics_1');
    });
  });

  describe('Achievements', () => {
    it('unlocks first lesson achievement correctly', () => {
      const { result } = renderHook(() => useGamificationStore());
      
      act(() => {
        result.current.completeLesson('basics_1', 100);
        result.current.checkAchievements();
      });

      const firstLessonAchievement = result.current.achievements.find(
        a => a.id === 'first_lesson'
      );
      expect(firstLessonAchievement?.achieved).toBe(true);
    });

    it('unlocks streak achievement correctly', () => {
      const { result } = renderHook(() => useGamificationStore());
      
      act(() => {
        useGamificationStore.setState({ streak: 7 });
        result.current.checkAchievements();
      });

      const streakAchievement = result.current.achievements.find(
        a => a.id === 'streak_7'
      );
      expect(streakAchievement?.achieved).toBe(true);
    });

    it('unlocks golden skill achievement correctly', () => {
      const { result } = renderHook(() => useGamificationStore());
      
      act(() => {
        for (let i = 0; i < 5; i++) {
          result.current.updateSkillLevel('basics_1');
        }
        result.current.checkAchievements();
      });

      const goldenSkillAchievement = result.current.achievements.find(
        a => a.id === 'golden_skill'
      );
      expect(goldenSkillAchievement?.achieved).toBe(true);
    });
  });
});
