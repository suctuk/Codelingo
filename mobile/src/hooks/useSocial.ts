import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { socialApi } from '../services/api';
import { CacheService, CACHE_KEYS } from '../services/cache';

export const useSocial = () => {
  const { state } = useApp();
  const [feed, setFeed] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFeed = async (forceRefresh = false) => {
    try {
      setLoading(true);
      setError(null);

      // Try cache first
      if (!forceRefresh) {
        const cachedFeed = await CacheService.get(CACHE_KEYS.SOCIAL_FEED, { expiryMinutes: 5 });
        if (cachedFeed) {
          setFeed(cachedFeed);
          return;
        }
      }

      const response = await socialApi.getFeed();
      setFeed(response.data);
      await CacheService.set(CACHE_KEYS.SOCIAL_FEED, response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchLeaderboard = async (forceRefresh = false) => {
    try {
      setLoading(true);
      setError(null);

      // Try cache first
      if (!forceRefresh) {
        const cachedLeaderboard = await CacheService.get(CACHE_KEYS.LEADERBOARD, { expiryMinutes: 15 });
        if (cachedLeaderboard) {
          setLeaderboard(cachedLeaderboard);
          return;
        }
      }

      const response = await socialApi.getLeaderboard();
      setLeaderboard(response.data);
      await CacheService.set(CACHE_KEYS.LEADERBOARD, response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const likeActivity = async (activityId: string) => {
    try {
      await socialApi.likeActivity(activityId);
      setFeed(feed.map(activity => 
        activity.id === activityId
          ? { ...activity, likes: activity.likes + 1, isLiked: true }
          : activity
      ));
    } catch (err) {
      setError(err.message);
    }
  };

  const unlikeActivity = async (activityId: string) => {
    try {
      await socialApi.unlikeActivity(activityId);
      setFeed(feed.map(activity => 
        activity.id === activityId
          ? { ...activity, likes: activity.likes - 1, isLiked: false }
          : activity
      ));
    } catch (err) {
      setError(err.message);
    }
  };

  const commentOnActivity = async (activityId: string, comment: string) => {
    try {
      const response = await socialApi.commentOnActivity(activityId, comment);
      setFeed(feed.map(activity => 
        activity.id === activityId
          ? { 
              ...activity, 
              comments: [...activity.comments, response.data],
              commentCount: activity.commentCount + 1,
            }
          : activity
      ));
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const shareActivity = async (activityId: string) => {
    try {
      await socialApi.shareActivity(activityId);
      setFeed(feed.map(activity => 
        activity.id === activityId
          ? { ...activity, shares: activity.shares + 1 }
          : activity
      ));
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    if (state.isAuthenticated) {
      Promise.all([
        fetchFeed(),
        fetchLeaderboard(),
      ]);
    }
  }, [state.isAuthenticated]);

  return {
    feed,
    leaderboard,
    loading,
    error,
    likeActivity,
    unlikeActivity,
    commentOnActivity,
    shareActivity,
    refresh: () => Promise.all([fetchFeed(true), fetchLeaderboard(true)]),
  };
};
