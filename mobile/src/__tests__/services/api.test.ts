import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { userApi, questApi, shopApi, friendApi, gamificationApi } from '../../services/api';

const mock = new MockAdapter(axios);

describe('API Services', () => {
  beforeEach(() => {
    mock.reset();
  });

  describe('User API', () => {
    it('should fetch current user', async () => {
      const userData = { id: '1', name: 'Test User' };
      mock.onGet('/users/me').reply(200, userData);

      const response = await userApi.getCurrentUser();
      expect(response.data).toEqual(userData);
    });

    it('should update user profile', async () => {
      const profileData = { name: 'New Name' };
      mock.onPut('/users/profile').reply(200, profileData);

      const response = await userApi.updateProfile(profileData);
      expect(response.data).toEqual(profileData);
    });
  });

  describe('Quest API', () => {
    it('should fetch daily quests', async () => {
      const questsData = [{ id: '1', title: 'Test Quest' }];
      mock.onGet('/quests/daily').reply(200, questsData);

      const response = await questApi.getDailyQuests();
      expect(response.data).toEqual(questsData);
    });

    it('should complete a quest', async () => {
      const questId = '1';
      const completionData = { xp: 100, gems: 10 };
      mock.onPost(`/quests/${questId}/complete`).reply(200, completionData);

      const response = await questApi.completeQuest(questId);
      expect(response.data).toEqual(completionData);
    });
  });

  describe('Shop API', () => {
    it('should fetch shop items', async () => {
      const category = 'power-ups';
      const itemsData = [{ id: '1', name: 'Test Item' }];
      mock.onGet(`/shop/items?category=${category}`).reply(200, itemsData);

      const response = await shopApi.getItems(category);
      expect(response.data).toEqual(itemsData);
    });

    it('should purchase an item', async () => {
      const itemId = '1';
      const purchaseData = { success: true };
      mock.onPost(`/shop/purchase/${itemId}`).reply(200, purchaseData);

      const response = await shopApi.purchaseItem(itemId);
      expect(response.data).toEqual(purchaseData);
    });
  });

  describe('Friend API', () => {
    it('should fetch friends list', async () => {
      const friendsData = [{ id: '1', name: 'Test Friend' }];
      mock.onGet('/friends').reply(200, friendsData);

      const response = await friendApi.getFriends();
      expect(response.data).toEqual(friendsData);
    });

    it('should send friend request', async () => {
      const username = 'testuser';
      mock.onPost('/friends/request').reply(200, { success: true });

      const response = await friendApi.sendFriendRequest(username);
      expect(response.data).toEqual({ success: true });
    });
  });

  describe('Gamification API', () => {
    it('should fetch user stats', async () => {
      const statsData = { xp: 1000, level: 5 };
      mock.onGet('/gamification/stats').reply(200, statsData);

      const response = await gamificationApi.getStats();
      expect(response.data).toEqual(statsData);
    });

    it('should update streak', async () => {
      const streakData = { streak: 7 };
      mock.onPost('/gamification/streak').reply(200, streakData);

      const response = await gamificationApi.updateStreak();
      expect(response.data).toEqual(streakData);
    });
  });
});
