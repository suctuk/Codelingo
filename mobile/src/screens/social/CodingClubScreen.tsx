import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../../../shared/styles/theme';
import { ScaleView } from '../../components/animations/ScaleView';

interface ClubMember {
  id: string;
  username: string;
  avatar: string;
  xp: number;
  role: 'owner' | 'admin' | 'member';
  weeklyXP: number;
  streak: number;
  lastActive: string;
}

interface ClubChallenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  participants: number;
  deadline: string;
  reward: {
    xp: number;
    gems: number;
  };
}

interface CodingClub {
  id: string;
  name: string;
  description: string;
  language: string;
  icon: string;
  memberCount: number;
  weeklyXP: number;
  level: number;
  members: ClubMember[];
  challenges: ClubChallenge[];
  achievements: string[];
}

export const CodingClubScreen = () => {
  const navigation = useNavigation();
  const [club, setClub] = useState<CodingClub | null>(null);
  const [selectedTab, setSelectedTab] = useState<'members' | 'challenges' | 'achievements'>('members');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchClubData();
  }, []);

  const fetchClubData = async () => {
    // Mock data - replace with API call
    const mockClub: CodingClub = {
      id: '1',
      name: 'Python Pioneers',
      description: 'A community of Python enthusiasts helping each other learn and grow',
      language: 'Python',
      icon: '🐍',
      memberCount: 42,
      weeklyXP: 12500,
      level: 5,
      members: [
        {
          id: '1',
          username: 'pythonmaster',
          avatar: 'https://example.com/avatar1.jpg',
          xp: 5000,
          role: 'owner',
          weeklyXP: 850,
          streak: 15,
          lastActive: '2025-02-14T20:00:00Z',
        },
        // Add more members...
      ],
      challenges: [
        {
          id: '1',
          title: 'List Comprehension Challenge',
          description: 'Create the most elegant list comprehension solution',
          difficulty: 'medium',
          participants: 12,
          deadline: '2025-02-17T23:59:59Z',
          reward: {
            xp: 100,
            gems: 50,
          },
        },
        // Add more challenges...
      ],
      achievements: [
        'First 1000 XP',
        'Week-long Winning Streak',
        'Community Champions',
      ],
    };

    setClub(mockClub);
    setIsLoading(false);
  };

  const renderMemberItem = ({ item }: { item: ClubMember }) => (
    <ScaleView style={styles.memberCard}>
      <View style={styles.memberHeader}>
        <Image
          source={{ uri: item.avatar }}
          style={styles.avatar}
        />
        <View style={styles.memberInfo}>
          <Text style={styles.username}>{item.username}</Text>
          <View style={styles.roleContainer}>
            <Icon
              name={
                item.role === 'owner'
                  ? 'crown'
                  : item.role === 'admin'
                  ? 'shield-star'
                  : 'account'
              }
              size={16}
              color={
                item.role === 'owner'
                  ? theme.colors.warning
                  : theme.colors.text.secondary
              }
            />
            <Text style={styles.roleText}>{item.role}</Text>
          </View>
        </View>
        <View style={styles.statsContainer}>
          <Text style={styles.xpText}>{item.weeklyXP} XP</Text>
          <View style={styles.streakContainer}>
            <Icon name="fire" size={16} color={theme.colors.warning} />
            <Text style={styles.streakText}>{item.streak}</Text>
          </View>
        </View>
      </View>
    </ScaleView>
  );

  const renderChallengeItem = ({ item }: { item: ClubChallenge }) => (
    <ScaleView style={styles.challengeCard}>
      <LinearGradient
        colors={[theme.colors.surface, theme.colors.background]}
        style={styles.challengeContent}
      >
        <View style={styles.challengeHeader}>
          <View style={styles.challengeTitleContainer}>
            <Text style={styles.challengeTitle}>{item.title}</Text>
            <View
              style={[
                styles.difficultyBadge,
                {
                  backgroundColor:
                    item.difficulty === 'easy'
                      ? theme.colors.success
                      : item.difficulty === 'medium'
                      ? theme.colors.warning
                      : theme.colors.error,
                },
              ]}
            >
              <Text style={styles.difficultyText}>{item.difficulty}</Text>
            </View>
          </View>
          <Text style={styles.challengeDescription}>{item.description}</Text>
        </View>

        <View style={styles.challengeFooter}>
          <View style={styles.challengeStats}>
            <Icon name="account-group" size={20} color={theme.colors.text.secondary} />
            <Text style={styles.statsText}>{item.participants} participants</Text>
          </View>
          <View style={styles.challengeReward}>
            <Text style={styles.rewardText}>
              +{item.reward.xp} XP • {item.reward.gems} 💎
            </Text>
          </View>
        </View>

        <TouchableOpacity style={styles.joinButton}>
          <Text style={styles.joinButtonText}>Join Challenge</Text>
        </TouchableOpacity>
      </LinearGradient>
    </ScaleView>
  );

  const renderAchievements = () => (
    <View style={styles.achievementsContainer}>
      {club?.achievements.map((achievement, index) => (
        <View key={index} style={styles.achievementItem}>
          <Icon name="trophy" size={24} color={theme.colors.warning} />
          <Text style={styles.achievementText}>{achievement}</Text>
        </View>
      ))}
    </View>
  );

  if (isLoading || !club) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading club data...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.clubInfo}>
          <Text style={styles.clubIcon}>{club.icon}</Text>
          <View>
            <Text style={styles.clubName}>{club.name}</Text>
            <Text style={styles.clubDescription}>{club.description}</Text>
          </View>
        </View>
        <View style={styles.clubStats}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{club.memberCount}</Text>
            <Text style={styles.statLabel}>Members</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{club.weeklyXP}</Text>
            <Text style={styles.statLabel}>Weekly XP</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{club.level}</Text>
            <Text style={styles.statLabel}>Level</Text>
          </View>
        </View>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'members' && styles.activeTab]}
          onPress={() => setSelectedTab('members')}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === 'members' && styles.activeTabText,
            ]}
          >
            Members
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'challenges' && styles.activeTab]}
          onPress={() => setSelectedTab('challenges')}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === 'challenges' && styles.activeTabText,
            ]}
          >
            Challenges
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            selectedTab === 'achievements' && styles.activeTab,
          ]}
          onPress={() => setSelectedTab('achievements')}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === 'achievements' && styles.activeTabText,
            ]}
          >
            Achievements
          </Text>
        </TouchableOpacity>
      </View>

      {selectedTab === 'members' && (
        <FlatList
          data={club.members}
          renderItem={renderMemberItem}
          keyExtractor={(item) => item.id}
          style={styles.content}
        />
      )}

      {selectedTab === 'challenges' && (
        <FlatList
          data={club.challenges}
          renderItem={renderChallengeItem}
          keyExtractor={(item) => item.id}
          style={styles.content}
        />
      )}

      {selectedTab === 'achievements' && (
        <ScrollView style={styles.content}>{renderAchievements()}</ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    padding: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  clubInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  clubIcon: {
    fontSize: 48,
    marginRight: theme.spacing.md,
  },
  clubName: {
    fontSize: theme.typography.fontSize.xl,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.text.primary,
  },
  clubDescription: {
    fontSize: theme.typography.fontSize.md,
    fontFamily: theme.typography.fontFamily.regular,
    color: theme.colors.text.secondary,
  },
  clubStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: theme.typography.fontSize.lg,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.text.primary,
  },
  statLabel: {
    fontSize: theme.typography.fontSize.sm,
    fontFamily: theme.typography.fontFamily.regular,
    color: theme.colors.text.secondary,
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  tab: {
    flex: 1,
    paddingVertical: theme.spacing.md,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: theme.colors.primary,
  },
  tabText: {
    fontSize: theme.typography.fontSize.md,
    fontFamily: theme.typography.fontFamily.medium,
    color: theme.colors.text.secondary,
  },
  activeTabText: {
    color: theme.colors.primary,
  },
  content: {
    flex: 1,
    padding: theme.spacing.md,
  },
  memberCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    ...theme.shadows.small,
  },
  memberHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: theme.spacing.md,
  },
  memberInfo: {
    flex: 1,
  },
  username: {
    fontSize: theme.typography.fontSize.md,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.text.primary,
  },
  roleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  roleText: {
    marginLeft: theme.spacing.xs,
    fontSize: theme.typography.fontSize.sm,
    fontFamily: theme.typography.fontFamily.medium,
    color: theme.colors.text.secondary,
    textTransform: 'capitalize',
  },
  statsContainer: {
    alignItems: 'flex-end',
  },
  xpText: {
    fontSize: theme.typography.fontSize.md,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.primary,
  },
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  streakText: {
    marginLeft: theme.spacing.xs,
    fontSize: theme.typography.fontSize.sm,
    fontFamily: theme.typography.fontFamily.medium,
    color: theme.colors.warning,
  },
  challengeCard: {
    marginBottom: theme.spacing.md,
  },
  challengeContent: {
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    ...theme.shadows.small,
  },
  challengeHeader: {
    marginBottom: theme.spacing.md,
  },
  challengeTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  challengeTitle: {
    flex: 1,
    fontSize: theme.typography.fontSize.lg,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.text.primary,
  },
  difficultyBadge: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.full,
  },
  difficultyText: {
    fontSize: theme.typography.fontSize.xs,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.text.inverse,
    textTransform: 'capitalize',
  },
  challengeDescription: {
    fontSize: theme.typography.fontSize.md,
    fontFamily: theme.typography.fontFamily.regular,
    color: theme.colors.text.secondary,
  },
  challengeFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  challengeStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statsText: {
    marginLeft: theme.spacing.xs,
    fontSize: theme.typography.fontSize.sm,
    fontFamily: theme.typography.fontFamily.medium,
    color: theme.colors.text.secondary,
  },
  challengeReward: {
    backgroundColor: theme.colors.primary + '20',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.full,
  },
  rewardText: {
    fontSize: theme.typography.fontSize.sm,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.primary,
  },
  joinButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
  },
  joinButtonText: {
    fontSize: theme.typography.fontSize.md,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.text.inverse,
  },
  achievementsContainer: {
    padding: theme.spacing.md,
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.md,
    ...theme.shadows.small,
  },
  achievementText: {
    marginLeft: theme.spacing.md,
    fontSize: theme.typography.fontSize.md,
    fontFamily: theme.typography.fontFamily.medium,
    color: theme.colors.text.primary,
  },
});
