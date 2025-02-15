import { Database } from '../database';
import { UserProfile } from '../models/UserProfile';
import { Achievement } from '../models/Achievement';
import { League } from '../models/League';

export class ProgressService {
  private static XP_PER_LESSON = 20;
  private static XP_PERFECT_BONUS = 5;
  private static STREAK_BONUS_MULTIPLIER = 1.5;
  private static MAX_DAILY_XP_CAP = 1000;

  constructor(private db: Database) {}

  async calculateLessonXP(
    userId: string,
    correctAnswers: number,
    totalQuestions: number,
    streakDays: number
  ): Promise<number> {
    const baseXP = this.calculateBaseXP(correctAnswers, totalQuestions);
    const streakBonus = this.calculateStreakBonus(streakDays);
    const totalXP = Math.round(baseXP * streakBonus);

    await this.updateDailyXP(userId, totalXP);
    return totalXP;
  }

  private calculateBaseXP(correctAnswers: number, totalQuestions: number): number {
    const baseXP = ProgressService.XP_PER_LESSON;
    const accuracy = correctAnswers / totalQuestions;
    
    // Perfect lesson bonus
    if (accuracy === 1) {
      return baseXP + ProgressService.XP_PERFECT_BONUS;
    }
    
    return Math.round(baseXP * accuracy);
  }

  private calculateStreakBonus(streakDays: number): number {
    if (streakDays >= 30) return ProgressService.STREAK_BONUS_MULTIPLIER;
    if (streakDays >= 14) return 1.25;
    if (streakDays >= 7) return 1.1;
    return 1;
  }

  async updateDailyXP(userId: string, xpEarned: number): Promise<void> {
    const today = new Date().toISOString().split('T')[0];
    
    await this.db.transaction(async (tx) => {
      const dailyXP = await tx.one(
        'SELECT xp FROM daily_xp WHERE user_id = ? AND date = ?',
        [userId, today]
      );

      if (dailyXP) {
        const newXP = Math.min(
          dailyXP.xp + xpEarned,
          ProgressService.MAX_DAILY_XP_CAP
        );
        await tx.query(
          'UPDATE daily_xp SET xp = ? WHERE user_id = ? AND date = ?',
          [newXP, userId, today]
        );
      } else {
        await tx.query(
          'INSERT INTO daily_xp (user_id, date, xp) VALUES (?, ?, ?)',
          [userId, today, xpEarned]
        );
      }
    });
  }

  async updateStreak(userId: string): Promise<number> {
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000)
      .toISOString()
      .split('T')[0];

    return await this.db.transaction(async (tx) => {
      const profile = await tx.one<UserProfile>(
        'SELECT streak_days, last_streak_date FROM user_profiles WHERE user_id = ?',
        [userId]
      );

      if (!profile) return 0;

      let newStreak = profile.streak_days;
      
      if (profile.last_streak_date === yesterday) {
        newStreak += 1;
      } else if (profile.last_streak_date !== today) {
        newStreak = 1;
      }

      await tx.query(
        'UPDATE user_profiles SET streak_days = ?, last_streak_date = ? WHERE user_id = ?',
        [newStreak, today, userId]
      );

      return newStreak;
    });
  }

  async checkAchievements(userId: string): Promise<Achievement[]> {
    const newAchievements: Achievement[] = [];
    
    await this.db.transaction(async (tx) => {
      const stats = await tx.one(
        `SELECT 
          (SELECT COUNT(*) FROM completed_lessons WHERE user_id = ?) as lessons_completed,
          (SELECT MAX(streak_days) FROM user_profiles WHERE user_id = ?) as max_streak,
          (SELECT COUNT(DISTINCT language_id) FROM user_languages WHERE user_id = ?) as languages_learned
        `,
        [userId, userId, userId]
      );

      // Check lesson completion achievements
      const lessonMilestones = [10, 50, 100, 500, 1000];
      for (const milestone of lessonMilestones) {
        if (stats.lessons_completed >= milestone) {
          await this.unlockAchievement(
            userId,
            `lessons_${milestone}`,
            `Completed ${milestone} Lessons`,
            milestone
          );
        }
      }

      // Check streak achievements
      const streakMilestones = [7, 30, 100, 365];
      for (const milestone of streakMilestones) {
        if (stats.max_streak >= milestone) {
          await this.unlockAchievement(
            userId,
            `streak_${milestone}`,
            `${milestone} Day Streak`,
            milestone * 2
          );
        }
      }

      // Check language achievements
      const languageMilestones = [1, 3, 5, 10];
      for (const milestone of languageMilestones) {
        if (stats.languages_learned >= milestone) {
          await this.unlockAchievement(
            userId,
            `languages_${milestone}`,
            `Learning ${milestone} Languages`,
            milestone * 25
          );
        }
      }
    });

    return newAchievements;
  }

  private async unlockAchievement(
    userId: string,
    id: string,
    title: string,
    xpReward: number
  ): Promise<void> {
    const exists = await this.db.one(
      'SELECT 1 FROM user_achievements WHERE user_id = ? AND achievement_id = ?',
      [userId, id]
    );

    if (!exists) {
      await this.db.query(
        'INSERT INTO user_achievements (user_id, achievement_id, title, xp_reward, unlocked_at) VALUES (?, ?, ?, ?, NOW())',
        [userId, id, title, xpReward]
      );
    }
  }

  async updateLeague(userId: string): Promise<League> {
    const LEAGUE_RANKS = [
      'Bronze',
      'Silver',
      'Gold',
      'Sapphire',
      'Ruby',
      'Diamond',
    ];

    return await this.db.transaction(async (tx) => {
      const weeklyXP = await tx.one<{ xp: number }>(
        `SELECT SUM(xp) as xp 
         FROM daily_xp 
         WHERE user_id = ? 
         AND date >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)`,
        [userId]
      );

      let leagueIndex = 0;
      if (weeklyXP.xp >= 1000) leagueIndex = 5; // Diamond
      else if (weeklyXP.xp >= 750) leagueIndex = 4; // Ruby
      else if (weeklyXP.xp >= 500) leagueIndex = 3; // Sapphire
      else if (weeklyXP.xp >= 250) leagueIndex = 2; // Gold
      else if (weeklyXP.xp >= 100) leagueIndex = 1; // Silver

      const league: League = {
        rank: LEAGUE_RANKS[leagueIndex],
        weeklyXP: weeklyXP.xp,
        position: await this.getLeaguePosition(userId, weeklyXP.xp),
      };

      await tx.query(
        'UPDATE user_profiles SET league_rank = ? WHERE user_id = ?',
        [league.rank, userId]
      );

      return league;
    });
  }

  private async getLeaguePosition(
    userId: string,
    weeklyXP: number
  ): Promise<number> {
    const result = await this.db.one<{ position: number }>(
      `SELECT COUNT(*) + 1 as position
       FROM (
         SELECT user_id, SUM(xp) as weekly_xp
         FROM daily_xp
         WHERE date >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
         GROUP BY user_id
         HAVING weekly_xp > ?
       ) better_performers`,
      [weeklyXP]
    );

    return result.position;
  }
}
