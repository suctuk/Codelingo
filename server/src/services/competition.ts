import { db } from '../db';
import { eq, and, gte, lte, desc } from 'drizzle-orm';
import {
  userProgress,
  learningClubs,
  clubMembers,
  codeReviews,
  challenges,
  achievements,
} from '../db/schema';

interface LeagueRanking {
  userId: string;
  username: string;
  xp: number;
  rank: number;
  league: string;
}

interface Tournament {
  id: number;
  name: string;
  startDate: Date;
  endDate: Date;
  type: 'CODE_REVIEW' | 'CHALLENGE' | 'TEAM';
  participants: string[];
  scores: { [userId: string]: number };
}

const LEAGUE_TIERS = {
  BRONZE: { min: 0, max: 1000 },
  SILVER: { min: 1001, max: 2500 },
  GOLD: { min: 2501, max: 5000 },
  PLATINUM: { min: 5001, max: 10000 },
  DIAMOND: { min: 10001, max: Infinity },
};

export class CompetitionService {
  async getWeeklyLeague(userId: string): Promise<LeagueRanking[]> {
    const now = new Date();
    const weekStart = new Date(now.setDate(now.getDate() - now.getDay()));
    const weekEnd = new Date(now.setDate(now.getDate() - now.getDay() + 6));

    const userXP = await db.query.userProgress.findMany({
      where: and(
        gte(userProgress.lastActiveDate, weekStart),
        lte(userProgress.lastActiveDate, weekEnd)
      ),
      orderBy: [desc(userProgress.xp)],
    });

    return userXP.map((user, index) => ({
      userId: user.userId,
      username: user.userName,
      xp: user.xp,
      rank: index + 1,
      league: this.determineLeague(user.xp),
    }));
  }

  private determineLeague(xp: number): string {
    for (const [league, range] of Object.entries(LEAGUE_TIERS)) {
      if (xp >= range.min && xp <= range.max) {
        return league;
      }
    }
    return 'BRONZE';
  }

  async startCodeReviewTournament(name: string, duration: number) {
    const now = new Date();
    const endDate = new Date(now.getTime() + duration * 24 * 60 * 60 * 1000);

    const tournament: Tournament = {
      id: Date.now(),
      name,
      startDate: now,
      endDate,
      type: 'CODE_REVIEW',
      participants: [],
      scores: {},
    };

    // Store tournament in database
    await db.insert(tournaments).values(tournament);

    return tournament;
  }

  async updateTournamentScore(tournamentId: number, userId: string, score: number) {
    const tournament = await db.query.tournaments.findFirst({
      where: eq(tournaments.id, tournamentId),
    });

    if (!tournament) {
      throw new Error('Tournament not found');
    }

    if (new Date() > tournament.endDate) {
      throw new Error('Tournament has ended');
    }

    await db
      .update(tournaments)
      .set({
        scores: {
          ...tournament.scores,
          [userId]: (tournament.scores[userId] || 0) + score,
        },
      })
      .where(eq(tournaments.id, tournamentId));

    // Update user achievements
    await this.checkAndAwardAchievements(userId, 'TOURNAMENT_PARTICIPATION');
  }

  async checkAndAwardAchievements(userId: string, type: string) {
    const user = await db.query.userProgress.findFirst({
      where: eq(userProgress.userId, userId),
    });

    if (!user) {
      throw new Error('User not found');
    }

    const existingAchievements = await db.query.achievements.findMany({
      where: and(
        eq(achievements.userId, userId),
        eq(achievements.type, type)
      ),
    });

    let newAchievement;
    switch (type) {
      case 'TOURNAMENT_PARTICIPATION':
        if (existingAchievements.length === 0) {
          newAchievement = {
            name: 'Tournament Rookie',
            description: 'Participated in first tournament',
            xpReward: 100,
          };
        } else if (existingAchievements.length === 4) {
          newAchievement = {
            name: 'Tournament Veteran',
            description: 'Participated in 5 tournaments',
            xpReward: 500,
          };
        }
        break;
      case 'CODE_REVIEW':
        if (user.reviewScore >= 1000) {
          newAchievement = {
            name: 'Code Review Master',
            description: 'Achieved 1000+ review score',
            xpReward: 1000,
          };
        }
        break;
    }

    if (newAchievement) {
      await db.insert(achievements).values({
        userId,
        type,
        ...newAchievement,
        awardedAt: new Date(),
      });

      // Update user XP
      await db
        .update(userProgress)
        .set({
          xp: user.xp + newAchievement.xpReward,
        })
        .where(eq(userProgress.userId, userId));

      return newAchievement;
    }

    return null;
  }

  async shareAchievement(userId: string, achievementId: number) {
    const achievement = await db.query.achievements.findFirst({
      where: and(
        eq(achievements.id, achievementId),
        eq(achievements.userId, userId)
      ),
    });

    if (!achievement) {
      throw new Error('Achievement not found');
    }

    // Create social feed item
    await db.insert(feedItems).values({
      userId,
      type: 'ACHIEVEMENT',
      content: `🏆 Earned the "${achievement.name}" achievement!`,
      achievementId,
      createdAt: new Date(),
    });

    return {
      shared: true,
      achievement,
    };
  }
}
