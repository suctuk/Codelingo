import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../../../shared/styles/theme';
import { PowerUpType, POWER_UPS } from '../../../server/src/services/powerups';
import { ScaleView } from '../../components/animations/ScaleView';

interface PowerUpCardProps {
  powerUp: typeof POWER_UPS[PowerUpType];
  onPurchase: () => void;
  disabled: boolean;
}

const PowerUpCard: React.FC<PowerUpCardProps> = ({
  powerUp,
  onPurchase,
  disabled,
}) => {
  const getIcon = (type: PowerUpType) => {
    switch (type) {
      case PowerUpType.XP_BOOST:
        return 'star';
      case PowerUpType.STREAK_FREEZE:
        return 'snowflake';
      case PowerUpType.HEART_REFILL:
        return 'heart';
      case PowerUpType.TIME_EXTENSION:
        return 'clock-plus';
      case PowerUpType.HINT_BOOST:
        return 'lightbulb-on';
      default:
        return 'gift';
    }
  };

  return (
    <ScaleView style={styles.cardContainer}>
      <LinearGradient
        colors={[theme.colors.primary + '40', theme.colors.primaryDark + '40']}
        style={styles.cardGradient}
      >
        <View style={styles.cardHeader}>
          <Icon
            name={getIcon(powerUp.type)}
            size={32}
            color={theme.colors.primary}
          />
          <Text style={styles.cardTitle}>{powerUp.name}</Text>
        </View>

        <Text style={styles.cardDescription}>{powerUp.description}</Text>

        {powerUp.duration > 0 && (
          <View style={styles.durationContainer}>
            <Icon name="clock-outline" size={16} color={theme.colors.warning} />
            <Text style={styles.durationText}>
              {powerUp.duration >= 1440
                ? `${powerUp.duration / 1440} days`
                : powerUp.duration >= 60
                ? `${powerUp.duration / 60} hours`
                : `${powerUp.duration} minutes`}
            </Text>
          </View>
        )}

        <TouchableOpacity
          style={[styles.purchaseButton, disabled && styles.disabledButton]}
          onPress={onPurchase}
          disabled={disabled}
        >
          <Icon name="gem" size={20} color={theme.colors.warning} />
          <Text style={styles.purchaseButtonText}>{powerUp.cost}</Text>
        </TouchableOpacity>
      </LinearGradient>
    </ScaleView>
  );
};

export const PowerUpShop = () => {
  const [userGems, setUserGems] = useState(500); // Mock initial gems
  const [activePowerUps, setActivePowerUps] = useState<PowerUpType[]>([]);

  useEffect(() => {
    // Fetch user's gems and active power-ups
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      // Mock API call
      // const response = await api.getUserPowerUps();
      // setActivePowerUps(response.activePowerUps);
      // setUserGems(response.gems);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handlePurchase = async (powerUp: typeof POWER_UPS[PowerUpType]) => {
    if (userGems < powerUp.cost) {
      Alert.alert(
        'Insufficient Gems',
        'You need more gems to purchase this power-up!',
        [
          {
            text: 'Get More Gems',
            onPress: () => {/* Navigate to gem shop */},
          },
          { text: 'Cancel', style: 'cancel' },
        ]
      );
      return;
    }

    try {
      // Mock API call
      // await api.purchasePowerUp(powerUp.type);
      setUserGems(prev => prev - powerUp.cost);
      setActivePowerUps(prev => [...prev, powerUp.type]);
      Alert.alert('Success', `${powerUp.name} purchased successfully!`);
    } catch (error) {
      console.error('Error purchasing power-up:', error);
      Alert.alert('Error', 'Failed to purchase power-up. Please try again.');
    }
  };

  const renderPowerUp = ({ item: powerUp }: { item: typeof POWER_UPS[PowerUpType] }) => (
    <PowerUpCard
      powerUp={powerUp}
      onPurchase={() => handlePurchase(powerUp)}
      disabled={userGems < powerUp.cost}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Power-Up Shop</Text>
        <View style={styles.gemsContainer}>
          <Icon name="gem" size={24} color={theme.colors.warning} />
          <Text style={styles.gemsText}>{userGems}</Text>
        </View>
      </View>

      <FlatList
        data={Object.values(POWER_UPS)}
        renderItem={renderPowerUp}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />

      {activePowerUps.length > 0 && (
        <View style={styles.activePowerUpsContainer}>
          <Text style={styles.activePowerUpsTitle}>Active Power-Ups</Text>
          <View style={styles.activePowerUpsList}>
            {activePowerUps.map(type => (
              <View key={type} style={styles.activePowerUpItem}>
                <Icon
                  name={
                    type === PowerUpType.XP_BOOST
                      ? 'star'
                      : type === PowerUpType.STREAK_FREEZE
                      ? 'snowflake'
                      : 'heart'
                  }
                  size={20}
                  color={theme.colors.primary}
                />
                <Text style={styles.activePowerUpText}>
                  {POWER_UPS[type].name}
                </Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  title: {
    fontSize: theme.typography.fontSize.xl,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.text.primary,
  },
  gemsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.full,
    ...theme.shadows.small,
  },
  gemsText: {
    marginLeft: theme.spacing.xs,
    fontSize: theme.typography.fontSize.md,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.text.primary,
  },
  listContainer: {
    paddingBottom: theme.spacing.xl,
  },
  cardContainer: {
    marginBottom: theme.spacing.md,
  },
  cardGradient: {
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    backgroundColor: theme.colors.surface,
    ...theme.shadows.medium,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  cardTitle: {
    marginLeft: theme.spacing.md,
    fontSize: theme.typography.fontSize.lg,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.text.primary,
  },
  cardDescription: {
    fontSize: theme.typography.fontSize.md,
    fontFamily: theme.typography.fontFamily.regular,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.md,
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  durationText: {
    marginLeft: theme.spacing.xs,
    fontSize: theme.typography.fontSize.sm,
    fontFamily: theme.typography.fontFamily.medium,
    color: theme.colors.text.secondary,
  },
  purchaseButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
  },
  disabledButton: {
    opacity: 0.5,
  },
  purchaseButtonText: {
    marginLeft: theme.spacing.xs,
    fontSize: theme.typography.fontSize.md,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.text.inverse,
  },
  activePowerUpsContainer: {
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    paddingTop: theme.spacing.md,
  },
  activePowerUpsTitle: {
    fontSize: theme.typography.fontSize.md,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
  },
  activePowerUpsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  activePowerUpItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.full,
    marginRight: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
    ...theme.shadows.small,
  },
  activePowerUpText: {
    marginLeft: theme.spacing.xs,
    fontSize: theme.typography.fontSize.sm,
    fontFamily: theme.typography.fontFamily.medium,
    color: theme.colors.text.primary,
  },
});
