import { UserSubscription } from '../models/userProfile';

export interface SubscriptionTier {
  id: 0 | 1 | 2;
  name: string;
  price: number;
  features: {
    skipAds: boolean;
    unlimitedHearts: boolean;
    extraStreakFreezes: boolean;
    skipUnits: boolean;
    advancedPractice: boolean;
    aiTutor: boolean;
  };
}

export class SubscriptionService {
  private static readonly SUBSCRIPTION_TIERS: SubscriptionTier[] = [
    {
      id: 0,
      name: 'Free',
      price: 0,
      features: {
        skipAds: false,
        unlimitedHearts: false,
        extraStreakFreezes: false,
        skipUnits: false,
        advancedPractice: false,
        aiTutor: false
      }
    },
    {
      id: 1,
      name: 'Premium',
      price: 9.99,
      features: {
        skipAds: true,
        unlimitedHearts: true,
        extraStreakFreezes: true,
        skipUnits: true,
        advancedPractice: true,
        aiTutor: false
      }
    },
    {
      id: 2,
      name: 'Premium Plus',
      price: 19.99,
      features: {
        skipAds: true,
        unlimitedHearts: true,
        extraStreakFreezes: true,
        skipUnits: true,
        advancedPractice: true,
        aiTutor: true
      }
    }
  ];

  async getUserSubscription(userId: string): Promise<UserSubscription> {
    // Fetch from database
    return {
      tier: 0,
      expiresAt: new Date(),
      features: SubscriptionService.SUBSCRIPTION_TIERS[0].features
    };
  }

  async updateSubscription(userId: string, tierId: 0 | 1 | 2): Promise<UserSubscription> {
    const tier = SubscriptionService.SUBSCRIPTION_TIERS.find(t => t.id === tierId);
    if (!tier) {
      throw new Error('Invalid subscription tier');
    }

    const subscription: UserSubscription = {
      tier: tierId,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      features: tier.features
    };

    // Save to database
    return subscription;
  }

  async cancelSubscription(userId: string): Promise<void> {
    const subscription: UserSubscription = {
      tier: 0,
      expiresAt: new Date(),
      features: SubscriptionService.SUBSCRIPTION_TIERS[0].features
    };

    // Save to database
  }

  getSubscriptionTiers(): SubscriptionTier[] {
    return SubscriptionService.SUBSCRIPTION_TIERS;
  }

  async processPayment(userId: string, tierId: 1 | 2): Promise<boolean> {
    const tier = SubscriptionService.SUBSCRIPTION_TIERS.find(t => t.id === tierId);
    if (!tier) {
      return false;
    }

    try {
      // Process payment through payment gateway
      // Update user's subscription
      await this.updateSubscription(userId, tierId);
      return true;
    } catch (error) {
      console.error('Payment processing failed:', error);
      return false;
    }
  }
}
