import { prisma } from '../db';
import { calculateXPMultiplier } from './gamification';

export interface PowerUp {
  id: string;
  type: PowerUpType;
  name: string;
  description: string;
  duration: number; // in minutes
  cost: number;
  multiplier: number;
}

export enum PowerUpType {
  XP_BOOST = 'XP_BOOST',
  STREAK_FREEZE = 'STREAK_FREEZE',
  HEART_REFILL = 'HEART_REFILL',
  TIME_EXTENSION = 'TIME_EXTENSION',
  HINT_BOOST = 'HINT_BOOST',
}

export const POWER_UPS: Record<PowerUpType, PowerUp> = {
  [PowerUpType.XP_BOOST]: {
    id: 'xp_boost',
    type: PowerUpType.XP_BOOST,
    name: 'XP Boost',
    description: 'Double XP for all completed lessons',
    duration: 60,
    cost: 100,
    multiplier: 2,
  },
  [PowerUpType.STREAK_FREEZE]: {
    id: 'streak_freeze',
    type: PowerUpType.STREAK_FREEZE,
    name: 'Streak Freeze',
    description: 'Maintains your streak even if you miss a day',
    duration: 1440, // 24 hours
    cost: 150,
    multiplier: 1,
  },
  [PowerUpType.HEART_REFILL]: {
    id: 'heart_refill',
    type: PowerUpType.HEART_REFILL,
    name: 'Heart Refill',
    description: 'Instantly refill all hearts',
    duration: 0,
    cost: 50,
    multiplier: 1,
  },
  [PowerUpType.TIME_EXTENSION]: {
    id: 'time_extension',
    type: PowerUpType.TIME_EXTENSION,
    name: 'Time Extension',
    description: 'Extra time for timed challenges',
    duration: 30,
    cost: 75,
    multiplier: 1.5,
  },
  [PowerUpType.HINT_BOOST]: {
    id: 'hint_boost',
    type: PowerUpType.HINT_BOOST,
    name: 'Hint Boost',
    description: 'Get more detailed hints during challenges',
    duration: 60,
    cost: 80,
    multiplier: 1,
  },
};

export class PowerUpsService {
  async getUserPowerUps(userId: string) {
    return await prisma.userPowerUp.findMany({
      where: { userId },
      include: {
        powerUp: true,
      },
    });
  }

  async purchasePowerUp(userId: string, powerUpType: PowerUpType) {
    const powerUp = POWER_UPS[powerUpType];
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { gems: true },
    });

    if (!user || user.gems < powerUp.cost) {
      throw new Error('Insufficient gems');
    }

    const expiresAt = new Date();
    if (powerUp.duration > 0) {
      expiresAt.setMinutes(expiresAt.getMinutes() + powerUp.duration);
    }

    await prisma.$transaction([
      prisma.user.update({
        where: { id: userId },
        data: { gems: { decrement: powerUp.cost } },
      }),
      prisma.userPowerUp.create({
        data: {
          userId,
          powerUpId: powerUp.id,
          expiresAt: powerUp.duration > 0 ? expiresAt : null,
          isActive: true,
        },
      }),
    ]);

    return { success: true, message: `${powerUp.name} purchased successfully` };
  }

  async activateStreakFreeze(userId: string) {
    const streakFreeze = await prisma.userPowerUp.findFirst({
      where: {
        userId,
        powerUpId: PowerUpType.STREAK_FREEZE,
        isActive: true,
        expiresAt: { gt: new Date() },
      },
    });

    if (!streakFreeze) {
      throw new Error('No active streak freeze available');
    }

    await prisma.userPowerUp.update({
      where: { id: streakFreeze.id },
      data: { isActive: false },
    });

    return { success: true, message: 'Streak freeze activated' };
  }

  async checkActiveXPBoost(userId: string): Promise<number> {
    const activeBoost = await prisma.userPowerUp.findFirst({
      where: {
        userId,
        powerUpId: PowerUpType.XP_BOOST,
        isActive: true,
        expiresAt: { gt: new Date() },
      },
    });

    return activeBoost ? POWER_UPS[PowerUpType.XP_BOOST].multiplier : 1;
  }

  async useHeartRefill(userId: string) {
    const heartRefill = await prisma.userPowerUp.findFirst({
      where: {
        userId,
        powerUpId: PowerUpType.HEART_REFILL,
        isActive: true,
      },
    });

    if (!heartRefill) {
      throw new Error('No heart refill available');
    }

    await prisma.$transaction([
      prisma.userPowerUp.update({
        where: { id: heartRefill.id },
        data: { isActive: false },
      }),
      prisma.user.update({
        where: { id: userId },
        data: { hearts: 5 }, // Reset to max hearts
      }),
    ]);

    return { success: true, message: 'Hearts refilled' };
  }

  async getTimeExtension(userId: string, challengeId: string) {
    const timeExtension = await prisma.userPowerUp.findFirst({
      where: {
        userId,
        powerUpId: PowerUpType.TIME_EXTENSION,
        isActive: true,
        expiresAt: { gt: new Date() },
      },
    });

    if (!timeExtension) {
      throw new Error('No active time extension available');
    }

    await prisma.userPowerUp.update({
      where: { id: timeExtension.id },
      data: { isActive: false },
    });

    return {
      success: true,
      timeExtension: POWER_UPS[PowerUpType.TIME_EXTENSION].multiplier,
    };
  }

  async getHintBoost(userId: string, challengeId: string) {
    const hintBoost = await prisma.userPowerUp.findFirst({
      where: {
        userId,
        powerUpId: PowerUpType.HINT_BOOST,
        isActive: true,
        expiresAt: { gt: new Date() },
      },
    });

    if (!hintBoost) {
      throw new Error('No active hint boost available');
    }

    // Get enhanced hints for the challenge
    const challenge = await prisma.challenge.findUnique({
      where: { id: challengeId },
      select: { hints: true },
    });

    return {
      success: true,
      hints: challenge?.hints || [],
      isEnhanced: true,
    };
  }

  async cleanupExpiredPowerUps() {
    await prisma.userPowerUp.updateMany({
      where: {
        expiresAt: { lt: new Date() },
        isActive: true,
      },
      data: { isActive: false },
    });
  }
}
