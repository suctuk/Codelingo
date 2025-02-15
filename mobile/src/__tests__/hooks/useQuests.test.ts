import { renderHook, act } from '@testing-library/react-hooks';
import { useQuests } from '../../hooks/useQuests';
import { questApi } from '../../services/api';

jest.mock('../../services/api', () => ({
  questApi: {
    getDailyQuests: jest.fn(),
    getWeeklyQuests: jest.fn(),
    getAchievements: jest.fn(),
    completeQuest: jest.fn(),
    claimReward: jest.fn(),
  },
}));

describe('useQuests Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch quests on mount', async () => {
    const mockDailyQuests = [{ id: '1', title: 'Daily Quest' }];
    const mockWeeklyQuests = [{ id: '2', title: 'Weekly Quest' }];
    const mockAchievements = [{ id: '3', title: 'Achievement' }];

    (questApi.getDailyQuests as jest.Mock).mockResolvedValue({ data: mockDailyQuests });
    (questApi.getWeeklyQuests as jest.Mock).mockResolvedValue({ data: mockWeeklyQuests });
    (questApi.getAchievements as jest.Mock).mockResolvedValue({ data: mockAchievements });

    const { result, waitForNextUpdate } = renderHook(() => useQuests());

    expect(result.current.loading).toBe(true);
    await waitForNextUpdate();

    expect(result.current.dailyQuests).toEqual(mockDailyQuests);
    expect(result.current.weeklyQuests).toEqual(mockWeeklyQuests);
    expect(result.current.achievements).toEqual(mockAchievements);
    expect(result.current.loading).toBe(false);
  });

  it('should handle quest completion', async () => {
    const mockCompletionData = { xp: 100, gems: 10 };
    (questApi.completeQuest as jest.Mock).mockResolvedValue({ data: mockCompletionData });

    const { result } = renderHook(() => useQuests());

    await act(async () => {
      await result.current.completeQuest('1');
    });

    expect(questApi.completeQuest).toHaveBeenCalledWith('1');
  });

  it('should handle reward claiming', async () => {
    const mockRewardData = { xp: 50, gems: 5 };
    (questApi.claimReward as jest.Mock).mockResolvedValue({ data: mockRewardData });

    const { result } = renderHook(() => useQuests());

    await act(async () => {
      await result.current.claimReward('1');
    });

    expect(questApi.claimReward).toHaveBeenCalledWith('1');
  });

  it('should handle errors', async () => {
    const mockError = new Error('Failed to fetch quests');
    (questApi.getDailyQuests as jest.Mock).mockRejectedValue(mockError);

    const { result, waitForNextUpdate } = renderHook(() => useQuests());

    await waitForNextUpdate();

    expect(result.current.error).toBe(mockError.message);
  });
});
