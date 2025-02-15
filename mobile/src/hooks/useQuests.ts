import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { questApi } from '../services/api';
import { CacheService, CACHE_KEYS } from '../services/cache';
import NetInfo from '@react-native-community/netinfo';

export const useQuests = () => {
  const { state, dispatch } = useApp();
  const [dailyQuests, setDailyQuests] = useState([]);
  const [weeklyQuests, setWeeklyQuests] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchQuests = async (forceRefresh = false) => {
    try {
      setLoading(true);
      setError(null);

      const netInfo = await NetInfo.fetch();
      const isConnected = netInfo.isConnected;

      // Try to get cached data first
      if (!forceRefresh) {
        const [cachedDaily, cachedWeekly, cachedAchievements] = await Promise.all([
          CacheService.get(CACHE_KEYS.DAILY_QUESTS, { expiryMinutes: 60 }),
          CacheService.get(CACHE_KEYS.WEEKLY_QUESTS, { expiryMinutes: 60 }),
          CacheService.get(CACHE_KEYS.ACHIEVEMENTS),
        ]);

        if (cachedDaily) setDailyQuests(cachedDaily);
        if (cachedWeekly) setWeeklyQuests(cachedWeekly);
        if (cachedAchievements) setAchievements(cachedAchievements);
      }

      // If online, fetch fresh data
      if (isConnected) {
        const [dailyResponse, weeklyResponse, achievementsResponse] = await Promise.all([
          questApi.getDailyQuests(),
          questApi.getWeeklyQuests(),
          questApi.getAchievements(),
        ]);

        setDailyQuests(dailyResponse.data);
        setWeeklyQuests(weeklyResponse.data);
        setAchievements(achievementsResponse.data);

        // Cache the fresh data
        await Promise.all([
          CacheService.set(CACHE_KEYS.DAILY_QUESTS, dailyResponse.data),
          CacheService.set(CACHE_KEYS.WEEKLY_QUESTS, weeklyResponse.data),
          CacheService.set(CACHE_KEYS.ACHIEVEMENTS, achievementsResponse.data),
        ]);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const completeQuest = async (questId: string) => {
    try {
      const response = await questApi.completeQuest(questId);
      await fetchQuests(); // Refresh quests
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const claimReward = async (questId: string) => {
    try {
      const response = await questApi.claimReward(questId);
      await fetchQuests(); // Refresh quests
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  useEffect(() => {
    if (state.isAuthenticated) {
      fetchQuests();
    }
  }, [state.isAuthenticated]);

  return {
    dailyQuests,
    weeklyQuests,
    achievements,
    loading,
    error,
    completeQuest,
    claimReward,
    refresh: () => fetchQuests(true),
  };
};
