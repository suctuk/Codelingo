import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'http://localhost:3000/api'; // Change this to your server URL

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// User API
export const userApi = {
  getCurrentUser: () => api.get('/users/me'),
  updateProfile: (data: any) => api.put('/users/profile', data),
  updateSettings: (data: any) => api.put('/users/settings', data),
};

// Quest API
export const questApi = {
  getDailyQuests: () => api.get('/quests/daily'),
  getWeeklyQuests: () => api.get('/quests/weekly'),
  getAchievements: () => api.get('/quests/achievements'),
  completeQuest: (questId: string) => api.post(`/quests/${questId}/complete`),
  claimReward: (questId: string) => api.post(`/quests/${questId}/claim`),
};

// Shop API
export const shopApi = {
  getItems: (category: string) => api.get(`/shop/items?category=${category}`),
  purchaseItem: (itemId: string) => api.post(`/shop/purchase/${itemId}`),
  getUserInventory: () => api.get('/shop/inventory'),
};

// Friends API
export const friendApi = {
  getFriends: () => api.get('/friends'),
  getFriendRequests: () => api.get('/friends/requests'),
  sendFriendRequest: (username: string) => api.post('/friends/request', { username }),
  acceptFriendRequest: (requestId: string) => api.post(`/friends/accept/${requestId}`),
  declineFriendRequest: (requestId: string) => api.post(`/friends/decline/${requestId}`),
  removeFriend: (friendId: string) => api.delete(`/friends/${friendId}`),
};

// Gamification API
export const gamificationApi = {
  getStats: () => api.get('/gamification/stats'),
  updateStreak: () => api.post('/gamification/streak'),
  earnXP: (amount: number) => api.post('/gamification/xp', { amount }),
  earnGems: (amount: number) => api.post('/gamification/gems', { amount }),
};

// Customization API
export const customizationApi = {
  getOptions: () => api.get('/customization/options'),
  updateMascot: (mascotId: string) => api.post('/customization/update-mascot', { mascotId }),
  updateTheme: (themeId: string) => api.post('/customization/update-theme', { themeId }),
  usePowerUp: (powerUpId: string) => api.post('/customization/use-power-up', { powerUpId }),
};

export default api;
