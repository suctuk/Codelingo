import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../../../shared/styles/theme';
import { ScaleView } from '../../components/animations/ScaleView';
import { ProgressBar } from '../../components/animations/ProgressBar';
import { useApp } from '../../context/AppContext';

interface FriendQuest {
  id: string;
  title: string;
  description: string;
  participants: {
    id: string;
    name: string;
    avatar: string;
    progress: number;
    streak: number;
  }[];
  goal: number;
  reward: {
    xp: number;
    gems: number;
  };
  endTime: string;
  type: 'daily' | 'weekly';
}

export const FriendQuestScreen = () => {
  const navigation = useNavigation();
  const { state } = useApp();
  const [activeQuests, setActiveQuests] = useState<FriendQuest[]>([]);
  const [completedQuests, setCompletedQuests] = useState<FriendQuest[]>([]);

  useEffect(() => {
    // Fetch quests from API
    fetchQuests();
  }, []);

  const fetchQuests = async () => {
    // Mock data - replace with API call
    const mockQuests: FriendQuest[] = [
      {
        id: '1',
        title: 'Code Warriors',
        description: 'Complete 20 lessons together',
        participants: [
          {
            id: '1',
            name: 'John Doe',
            avatar: 'https://example.com/avatar1.jpg',
            progress: 75,
            streak: 5,
          },
          {
            id: '2',
            name: 'Jane Smith',
            avatar: 'https://example.com/avatar2.jpg',
            progress: 60,
            streak: 3,
          },
        ],
        goal: 20,
        reward: {
          xp: 500,
          gems: 50,
        },
        endTime: '2d 5h',
        type: 'weekly',
      },
      // Add more quests...
    ];

    setActiveQuests(mockQuests.filter(q => !isQuestCompleted(q)));
    setCompletedQuests(mockQuests.filter(q => isQuestCompleted(q)));
  };

  const isQuestCompleted = (quest: FriendQuest) => {
    return quest.participants.every(p => p.progress >= 100);
  };

  const renderQuestCard = ({ item }: { item: FriendQuest }) => (
    <ScaleView style={styles.questCard}>
      <LinearGradient
        colors={item.type === 'daily' ? [theme.colors.primary, theme.colors.primaryDark] : [theme.colors.secondary, theme.colors.secondaryDark]}
        style={styles.questContent}
      >
        {/* Header */}
        <View style={styles.questHeader}>
          <View>
            <Text style={styles.questTitle}>{item.title}</Text>
            <Text style={styles.questDescription}>{item.description}</Text>
          </View>
          <View style={styles.reward}>
            <Icon name="star" size={20} color={theme.colors.warning} />
            <Text style={styles.rewardText}>{item.reward.xp} XP</Text>
            <Icon name="diamond-stone" size={20} color="#1CB0F6" />
            <Text style={styles.rewardText}>{item.reward.gems}</Text>
          </View>
        </View>

        {/* Participants */}
        <View style={styles.participants}>
          {item.participants.map((participant) => (
            <View key={participant.id} style={styles.participant}>
              <View style={styles.participantInfo}>
                <Image source={{ uri: participant.avatar }} style={styles.avatar} />
                <View style={styles.participantDetails}>
                  <Text style={styles.participantName}>{participant.name}</Text>
                  <View style={styles.streakContainer}>
                    <Icon name="fire" size={16} color={theme.colors.warning} />
                    <Text style={styles.streakText}>{participant.streak}</Text>
                  </View>
                </View>
                <Text style={styles.progressText}>{participant.progress}%</Text>
              </View>
              <ProgressBar
                progress={participant.progress}
                height={4}
                backgroundColor="rgba(255,255,255,0.2)"
                fillColor="#fff"
              />
            </View>
          ))}
        </View>

        {/* Footer */}
        <View style={styles.questFooter}>
          <View style={styles.timeContainer}>
            <Icon name="clock-outline" size={16} color="#fff" />
            <Text style={styles.timeText}>{item.endTime}</Text>
          </View>
          <TouchableOpacity
            style={styles.inviteButton}
            onPress={() => {/* Implement invite logic */}}
          >
            <Icon name="account-plus" size={20} color="#fff" />
            <Text style={styles.inviteText}>Invite Friends</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </ScaleView>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={[...activeQuests, ...completedQuests]}
        renderItem={renderQuestCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.questList}
        ListHeaderComponent={() => (
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Friend Quests</Text>
            <Text style={styles.headerSubtitle}>
              Complete challenges together to earn rewards!
            </Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    padding: theme.spacing.lg,
  },
  headerTitle: {
    fontSize: theme.typography.fontSize.xl,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  headerSubtitle: {
    fontSize: theme.typography.fontSize.md,
    fontFamily: theme.typography.fontFamily.regular,
    color: theme.colors.text.secondary,
  },
  questList: {
    padding: theme.spacing.sm,
  },
  questCard: {
    marginBottom: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.medium,
  },
  questContent: {
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
  },
  questHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.lg,
  },
  questTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.text.inverse,
    marginBottom: theme.spacing.xs,
  },
  questDescription: {
    fontSize: theme.typography.fontSize.sm,
    fontFamily: theme.typography.fontFamily.regular,
    color: theme.colors.text.inverse,
    opacity: 0.8,
  },
  reward: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
  },
  rewardText: {
    marginLeft: 4,
    marginRight: 8,
    fontSize: theme.typography.fontSize.sm,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.text.inverse,
  },
  participants: {
    marginBottom: theme.spacing.lg,
  },
  participant: {
    marginBottom: theme.spacing.md,
  },
  participantInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: theme.spacing.sm,
  },
  participantDetails: {
    flex: 1,
  },
  participantName: {
    fontSize: theme.typography.fontSize.sm,
    fontFamily: theme.typography.fontFamily.medium,
    color: theme.colors.text.inverse,
  },
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  streakText: {
    marginLeft: 4,
    fontSize: theme.typography.fontSize.sm,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.text.inverse,
  },
  progressText: {
    fontSize: theme.typography.fontSize.sm,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.text.inverse,
  },
  questFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: theme.spacing.md,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    marginLeft: theme.spacing.xs,
    fontSize: theme.typography.fontSize.sm,
    fontFamily: theme.typography.fontFamily.medium,
    color: theme.colors.text.inverse,
  },
  inviteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.full,
  },
  inviteText: {
    marginLeft: theme.spacing.xs,
    fontSize: theme.typography.fontSize.sm,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.text.inverse,
  },
});
