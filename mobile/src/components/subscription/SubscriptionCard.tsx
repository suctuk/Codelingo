import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ScaleView } from '../animations/ScaleView';
import { theme } from '../../../shared/styles/theme';

interface Feature {
  icon: string;
  text: string;
}

interface SubscriptionCardProps {
  tier: 1 | 2;
  title: string;
  price: string;
  features: Feature[];
  isPopular?: boolean;
  onPress: () => void;
}

export const SubscriptionCard: React.FC<SubscriptionCardProps> = ({
  tier,
  title,
  price,
  features,
  isPopular,
  onPress,
}) => {
  const getGradientColors = () => {
    return tier === 1
      ? ['#1CB0F6', '#0C8AD9']
      : ['#9C27B0', '#7B1FA2'];
  };

  return (
    <ScaleView onPress={onPress} style={styles.container}>
      <LinearGradient
        colors={getGradientColors()}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.card, isPopular && styles.popularCard]}
      >
        {isPopular && (
          <View style={styles.popularBadge}>
            <Text style={styles.popularText}>Most Popular</Text>
          </View>
        )}

        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.price}>{price}</Text>
          <Text style={styles.period}>per month</Text>
        </View>

        <View style={styles.features}>
          {features.map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <Icon name={feature.icon} size={20} color={theme.colors.text.inverse} />
              <Text style={styles.featureText}>{feature.text}</Text>
            </View>
          ))}
        </View>

        <View style={styles.buttonContainer}>
          <LinearGradient
            colors={['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.1)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Subscribe Now</Text>
          </LinearGradient>
        </View>
      </LinearGradient>
    </ScaleView>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: theme.spacing.sm,
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.medium,
  },
  card: {
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    minHeight: 400,
  },
  popularCard: {
    transform: [{ scale: 1.05 }],
  },
  popularBadge: {
    position: 'absolute',
    top: -12,
    left: '50%',
    transform: [{ translateX: -50 }],
    backgroundColor: theme.colors.warning,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.full,
  },
  popularText: {
    color: theme.colors.text.inverse,
    fontSize: theme.typography.fontSize.sm,
    fontFamily: theme.typography.fontFamily.bold,
  },
  header: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  title: {
    fontSize: theme.typography.fontSize.xl,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.text.inverse,
    marginBottom: theme.spacing.sm,
  },
  price: {
    fontSize: theme.typography.fontSize.xxl,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.text.inverse,
  },
  period: {
    fontSize: theme.typography.fontSize.sm,
    fontFamily: theme.typography.fontFamily.regular,
    color: theme.colors.text.inverse,
    opacity: 0.8,
  },
  features: {
    marginBottom: theme.spacing.xl,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  featureText: {
    marginLeft: theme.spacing.sm,
    fontSize: theme.typography.fontSize.md,
    fontFamily: theme.typography.fontFamily.medium,
    color: theme.colors.text.inverse,
  },
  buttonContainer: {
    marginTop: 'auto',
  },
  button: {
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: theme.typography.fontSize.md,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.text.inverse,
  },
});
