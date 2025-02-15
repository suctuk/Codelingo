import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../../../shared/styles/theme';
import { ScaleView } from '../../components/animations/ScaleView';

interface LeaderboardUser {
  id: string;
  username: string;
  avatar: string;
  xp: number;
  rank: number;
  streak: number;
  league: string;
  isCurrentUser: boolean;
  isFriend: boolean;
  recentAchievements: string[];
}

type LeaderboardPeriod = 'daily' | 'weekly' | 'monthly' | 'allTime';
type LeaderboardScope = 'friends' | 'global' | 'league';

export const LeaderboardScreen = () => {
  const [period, setPeriod] = useState<LeaderboardPeriod>('weekly');
  const [scope, setScope] = useState<LeaderboardScope>('friends');
  const [users, setUsers] = useState<LeaderboardUser[]>([]);
  const [userRank, setUserRank] = useState<LeaderboardUser | null>(null);
  const scrollY = new Animated.Value(0);

  useEffect(() => {
    fetchLeaderboardData();
  }, [period, scope]);

  const fetchLeaderboardData = async () => {
    // Mock data - replace with API call
    const mockUsers: LeaderboardUser[] = [
      {
        id: '1',
        username: 'pythonmaster',
        avatar: 'https://example.com/avatar1.jpg',
        xp: 5000,
        rank: 1,
        streak: 15,
        league: 'Diamond',
        isCurrentUser: false,
        isFriend: true,
        recentAchievements: ['Perfect Week', '100 Day Streak'],
      },
      {
        id: '2',
        username: 'javascriptNinja',
        avatar: 'https://example.com/avatar2.jpg',
        xp: 4800,
        rank: 2,
        streak: 20,
        league: 'Diamond',
        isCurrentUser: true,
        isFriend: false,
        recentAchievements: ['Code Master'],
      },
      // Add more users...
    ];

    setUsers(mockUsers);
    setUserRank(mockUsers.find(user => user.isCurrentUser) || null);
  };

  const renderHeader = () => {
    const topUsers = users.slice(0, 3);
    const secondPlaceScale = 0.85;
    const thirdPlaceScale = 0.7;

    return (
      <View style={styles.podiumContainer}>
        {topUsers.map((user, index) => {
          const isFirst = index === 0;
          const isSecond = index === 1;
          const isThird = index === 2;
          const scale = isFirst ? 1 : isSecond ? secondPlaceScale : thirdPlaceScale;

          return (
            <View
              key={user.id}
              style={[
                styles.podiumItem,
                {
                  transform: [{ scale }],
                  zIndex: isFirst ? 3 : isSecond ? 2 : 1,
                },
              ]}
            >
              <LinearGradient
                colors={[theme.colors.primary, theme.colors.primaryDark]}
                style={styles.podiumGradient}
              >
                <Image source={{ uri: user.avatar }} style={styles.podiumAvatar} />
                <Text style={styles.podiumUsername}>{user.username}</Text>
                <Text style={styles.podiumXP}>{user.xp} XP</Text>
                <View style={styles.podiumRank}>
                  <Icon
                    name={isFirst ? 'crown' : 'medal'}
                    size={24}
                    color={
                      isFirst
                        ? theme.colors.warning
                        : isSecond
                        ? '#C0C0C0'
                        : '#CD7F32'
                    }
                  />
                  <Text style={styles.podiumRankText}>#{user.rank}</Text>
                </View>
              </LinearGradient>
            </View>
          );
        })}
      </View>
    );
  };

  const renderUserItem = ({ item, index }: { item: LeaderboardUser; index: number }) => {
    const isTop3 = index < 3;
    if (isTop3) return null;

    const animatedStyle = {
      transform: [
        {
          scale: scrollY.interpolate({
            inputRange: [
              (index - 4) * 90,
              (index - 3) * 90,
              (index - 2) * 90,
            ],
            outputRange: [1, 1.02, 1],
            extrapolate: 'clamp',
          }),
        },
      ],
    };

    return (
      <Animated.View style={[styles.userItemContainer, animatedStyle]}>
        <ScaleView style={styles.userItem}>
          <Text style={styles.rank}>#{item.rank}</Text>
          <Image source={{ uri: item.avatar }} style={styles.avatar} />
          <View style={styles.userInfo}>
            <Text style={styles.username}>{item.username}</Text>
            <View style={styles.userStats}>
              <Icon name="fire" size={16} color={theme.colors.warning} />
              <Text style={styles.streakText}>{item.streak}</Text>
              <View style={styles.leagueBadge}>
                <Text style={styles.leagueText}>{item.league}</Text>
              </View>
            </View>
          </View>
          <Text style={styles.xp}>{item.xp} XP</Text>
          {!item.isCurrentUser && !item.isFriend && (
            <TouchableOpacity style={styles.addFriendButton}>
              <Icon name="account-plus" size={20} color={theme.colors.primary} />
            </TouchableOpacity>
          )}
        </ScaleView>
      </Animated.View>
    );
  };

  const renderPeriodSelector = () => (
    <View style={styles.selectorContainer}>
      {(['daily', 'weekly', 'monthly', 'allTime'] as LeaderboardPeriod[]).map(
        (p) => (
          <TouchableOpacity
            key={p}
            style={[styles.selectorButton, period === p && styles.selectedButton]}
            onPress={() => setPeriod(p)}
          >
            <Text
              style={[
                styles.selectorText,
                period === p && styles.selectedButtonText,
              ]}
            >
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </Text>
          </TouchableOpacity>
        )
      )}
    </View>
  );

  const renderScopeSelector = () => (
    <View style={styles.selectorContainer}>
      {(['friends', 'global', 'league'] as LeaderboardScope[]).map((s) => (
        <TouchableOpacity
          key={s}
          style={[styles.selectorButton, scope === s && styles.selectedButton]}
          onPress={() => setScope(s)}
        >
          <Text
            style={[
              styles.selectorText,
              scope === s && styles.selectedButtonText,
            ]}
          >
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      {renderPeriodSelector()}
      {renderScopeSelector()}

      <FlatList
        data={users}
        renderItem={renderUserItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      />

      {userRank && (
        <View style={styles.currentUserContainer}>
          <ScaleView style={styles.currentUserContent}>
            <Text style={styles.rank}>#{userRank.rank}</Text>
            <Image source={{ uri: userRank.avatar }} style={styles.avatar} />
            <View style={styles.userInfo}>
              <Text style={styles.username}>{userRank.username}</Text>
              <View style={styles.userStats}>
                <Icon name="fire" size={16} color={theme.colors.warning} />
                <Text style={styles.streakText}>{userRank.streak}</Text>
                <View style={styles.leagueBadge}>
                  <Text style={styles.leagueText}>{userRank.league}</Text>
                </View>
              </View>
            </View>
            <Text style={styles.xp}>{userRank.xp} XP</Text>
          </ScaleView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  selectorContainer: {
    flexDirection: 'row',
    padding: theme.spacing.sm,
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  selectorButton: {
    flex: 1,
    paddingVertical: theme.spacing.sm,
    marginHorizontal: theme.spacing.xs,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: theme.colors.primary,
  },
  selectorText: {
    fontSize: theme.typography.fontSize.sm,
    fontFamily: theme.typography.fontFamily.medium,
    color: theme.colors.text.secondary,
  },
  selectedButtonText: {
    color: theme.colors.text.inverse,
  },
  podiumContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    padding: theme.spacing.lg,
    height: 200,
  },
  podiumItem: {
    margin: theme.spacing.xs,
  },
  podiumGradient: {
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
    ...theme.shadows.medium,
  },
  podiumAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: theme.colors.text.inverse,
  },
  podiumUsername: {
    marginTop: theme.spacing.sm,
    fontSize: theme.typography.fontSize.md,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.text.inverse,
  },
  podiumXP: {
    fontSize: theme.typography.fontSize.sm,
    fontFamily: theme.typography.fontFamily.medium,
    color: theme.colors.text.inverse,
  },
  podiumRank: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: theme.spacing.xs,
  },
  podiumRankText: {
    marginLeft: theme.spacing.xs,
    fontSize: theme.typography.fontSize.md,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.text.inverse,
  },
  userItemContainer: {
    padding: theme.spacing.sm,
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    ...theme.shadows.small,
  },
  rank: {
    width: 40,
    fontSize: theme.typography.fontSize.md,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.text.primary,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: theme.spacing.md,
  },
  userInfo: {
    flex: 1,
  },
  username: {
    fontSize: theme.typography.fontSize.md,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.text.primary,
  },
  userStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  streakText: {
    marginLeft: theme.spacing.xs,
    marginRight: theme.spacing.sm,
    fontSize: theme.typography.fontSize.sm,
    fontFamily: theme.typography.fontFamily.medium,
    color: theme.colors.warning,
  },
  leagueBadge: {
    backgroundColor: theme.colors.primary + '20',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.full,
  },
  leagueText: {
    fontSize: theme.typography.fontSize.xs,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.primary,
  },
  xp: {
    fontSize: theme.typography.fontSize.md,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.primary,
    marginLeft: theme.spacing.md,
  },
  addFriendButton: {
    padding: theme.spacing.sm,
    marginLeft: theme.spacing.sm,
  },
  currentUserContainer: {
    padding: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
  },
  currentUserContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.md,
    backgroundColor: theme.colors.primary + '10',
    borderRadius: theme.borderRadius.md,
  },
});
