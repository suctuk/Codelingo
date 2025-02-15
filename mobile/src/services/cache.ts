import AsyncStorage from '@react-native-async-storage/async-storage';

interface CacheConfig {
  expiryMinutes?: number;
  forceRefresh?: boolean;
}

interface CacheItem<T> {
  data: T;
  timestamp: number;
}

export class CacheService {
  static async get<T>(key: string, config: CacheConfig = {}): Promise<T | null> {
    try {
      const cached = await AsyncStorage.getItem(key);
      if (!cached) return null;

      const item: CacheItem<T> = JSON.parse(cached);
      
      if (config.forceRefresh) return null;
      
      if (config.expiryMinutes) {
        const now = Date.now();
        const expiryTime = item.timestamp + (config.expiryMinutes * 60 * 1000);
        if (now > expiryTime) return null;
      }

      return item.data;
    } catch (error) {
      console.error('Cache get error:', error);
      return null;
    }
  }

  static async set<T>(key: string, data: T): Promise<void> {
    try {
      const item: CacheItem<T> = {
        data,
        timestamp: Date.now(),
      };
      await AsyncStorage.setItem(key, JSON.stringify(item));
    } catch (error) {
      console.error('Cache set error:', error);
    }
  }

  static async remove(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error('Cache remove error:', error);
    }
  }

  static async clear(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Cache clear error:', error);
    }
  }
}

// Cache keys
export const CACHE_KEYS = {
  USER: 'user',
  DAILY_QUESTS: 'daily_quests',
  WEEKLY_QUESTS: 'weekly_quests',
  ACHIEVEMENTS: 'achievements',
  SHOP_ITEMS: 'shop_items',
  FRIENDS: 'friends',
  FRIEND_REQUESTS: 'friend_requests',
  CUSTOMIZATION: 'customization',
};
