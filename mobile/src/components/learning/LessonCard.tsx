import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ScaleView } from '../animations/ScaleView';
import { theme } from '../../../shared/styles/theme';

interface LessonCardProps {
  title: string;
  description: string;
  icon: string;
  progress: number;
  isLocked: boolean;
  isCompleted: boolean;
  onPress: () => void;
}

export const LessonCard: React.FC<LessonCardProps> = ({
  title,
  description,
  icon,
  progress,
  isLocked,
  isCompleted,
  onPress,
}) => {
  const progressAnim = new Animated.Value(progress);

  React.useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: progress,
      duration: theme.animations.duration.medium,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <ScaleView onPress={isLocked ? undefined : onPress} style={styles.container}>
      <LinearGradient
        colors={isLocked ? ['#E0E0E0', '#CCCCCC'] : [theme.colors.primary, theme.colors.primaryDark]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.card, isLocked && styles.lockedCard]}
      >
        {/* Icon and Status */}
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Icon
              name={icon}
              size={24}
              color={isLocked ? theme.colors.text.disabled : theme.colors.text.inverse}
            />
          </View>
          {isCompleted && (
            <View style={styles.completedBadge}>
              <Icon name="check" size={16} color={theme.colors.text.inverse} />
            </View>
          )}
        </View>

        {/* Content */}
        <View style={styles.content}>
          <Text style={[styles.title, isLocked && styles.lockedText]}>{title}</Text>
          <Text style={[styles.description, isLocked && styles.lockedText]} numberOfLines={2}>
            {description}
          </Text>
        </View>

        {/* Progress Bar */}
        {!isLocked && !isCompleted && (
          <View style={styles.progressContainer}>
            <Animated.View
              style={[
                styles.progressBar,
                {
                  width: progressWidth,
                },
              ]}
            />
          </View>
        )}

        {/* Lock Icon */}
        {isLocked && (
          <View style={styles.lockContainer}>
            <Icon name="lock" size={20} color={theme.colors.text.disabled} />
          </View>
        )}
      </LinearGradient>
    </ScaleView>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    ...theme.shadows.medium,
  },
  card: {
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    minHeight: 140,
  },
  lockedCard: {
    opacity: 0.8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.full,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  completedBadge: {
    width: 24,
    height: 24,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.success,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: theme.typography.fontSize.lg,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.text.inverse,
    marginBottom: theme.spacing.xs,
  },
  description: {
    fontSize: theme.typography.fontSize.sm,
    fontFamily: theme.typography.fontFamily.regular,
    color: theme.colors.text.inverse,
    opacity: 0.8,
  },
  lockedText: {
    color: theme.colors.text.disabled,
  },
  progressContainer: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: theme.borderRadius.full,
    marginTop: theme.spacing.sm,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: theme.colors.text.inverse,
    borderRadius: theme.borderRadius.full,
  },
  lockContainer: {
    position: 'absolute',
    top: theme.spacing.md,
    right: theme.spacing.md,
  },
});
