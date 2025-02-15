import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ScaleView } from '../animations/ScaleView';
import { theme } from '../../../shared/styles/theme';
import { ProgressBar } from '../animations/ProgressBar';

interface Participant {
  id: string;
  name: string;
  avatar: string;
  progress: number;
}

interface ChallengeCardProps {
  title: string;
  description: string;
  type: 'daily' | 'weekly' | 'group';
  participants: Participant[];
  endTime: string;
  reward: {
    xp: number;
    gems: number;
  };
  onPress: () => void;
}

export const ChallengeCard: React.FC<ChallengeCardProps> = ({
  title,
  description,
  type,
  participants,
  endTime,
  reward,
  onPress,
}) => {
  const getGradientColors = () => {
    switch (type) {
      case 'daily':
        return [theme.colors.primary, theme.colors.primaryDark];
      case 'weekly':
        return [theme.colors.secondary, theme.colors.secondaryDark];
      case 'group':
        return ['#9C27B0', '#7B1FA2'];
      default:
        return [theme.colors.primary, theme.colors.primaryDark];
    }
  };

  return (
    <ScaleView onPress={onPress} style={styles.container}>
      <LinearGradient
        colors={getGradientColors()}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
          </View>
          <View style={styles.reward}>
            <Icon name="star" size={20} color={theme.colors.warning} />
            <Text style={styles.rewardText}>{reward.xp} XP</Text>
            <Icon name="diamond-stone" size={20} color="#1CB0F6" />
            <Text style={styles.rewardText}>{reward.gems}</Text>
          </View>
        </View>

        {/* Participants */}
        <View style={styles.participants}>
          {participants.map((participant, index) => (
            <View key={participant.id} style={styles.participant}>
              <View style={styles.participantHeader}>
                <Image source={{ uri: participant.avatar }} style={styles.avatar} />
                <Text style={styles.participantName}>{participant.name}</Text>
                <Text style={styles.progress}>{participant.progress}%</Text>
              </View>
              <ProgressBar
                progress={participant.progress}
                height={4}
                backgroundColor="rgba(255, 255, 255, 0.2)"
                fillColor="#fff"
              />
            </View>
          ))}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Icon name="clock-outline" size={16} color="#fff" />
          <Text style={styles.timeText}>Ends in {endTime}</Text>
        </View>
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
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.md,
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
  reward: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
  },
  rewardText: {
    color: theme.colors.text.inverse,
    fontSize: theme.typography.fontSize.sm,
    fontFamily: theme.typography.fontFamily.bold,
    marginLeft: 4,
    marginRight: 8,
  },
  participants: {
    marginBottom: theme.spacing.md,
  },
  participant: {
    marginBottom: theme.spacing.sm,
  },
  participantHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: theme.borderRadius.full,
    marginRight: theme.spacing.xs,
  },
  participantName: {
    flex: 1,
    fontSize: theme.typography.fontSize.sm,
    fontFamily: theme.typography.fontFamily.medium,
    color: theme.colors.text.inverse,
  },
  progress: {
    fontSize: theme.typography.fontSize.sm,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.text.inverse,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    marginLeft: theme.spacing.xs,
    fontSize: theme.typography.fontSize.sm,
    fontFamily: theme.typography.fontFamily.medium,
    color: theme.colors.text.inverse,
  },
});
