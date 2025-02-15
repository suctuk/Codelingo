import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Animated,
} from 'react-native';
import { useTheme } from '../../hooks/useTheme';

interface TeamMember {
  id: string;
  name: string;
  avatar: string;
  score: number;
  rank: number;
  streak: number;
  recentAchievements: {
    id: string;
    name: string;
    icon: string;
    earnedAt: string;
  }[];
}

interface Team {
  id: string;
  name: string;
  logo: string;
  score: number;
  rank: number;
  members: TeamMember[];
  weeklyProgress: number[];
}

interface Props {
  userTeam: Team;
  competingTeams: Team[];
  onChallengeTeam: (teamId: string) => void;
  onViewTeamDetails: (teamId: string) => void;
}

export const TeamCompetition: React.FC<Props> = ({
  userTeam,
  competingTeams,
  onChallengeTeam,
  onViewTeamDetails,
}) => {
  const { colors } = useTheme();
  const [expandedTeam, setExpandedTeam] = useState<string | null>(null);
  const [progressAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, []);

  const renderTeamProgress = (team: Team) => {
    const maxProgress = Math.max(...team.weeklyProgress);
    
    return (
      <View style={styles.progressContainer}>
        {team.weeklyProgress.map((progress, index) => (
          <Animated.View
            key={`progress-${index}`}
            style={[
              styles.progressBar,
              {
                backgroundColor: colors.primary,
                height: progressAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, (progress / maxProgress) * 100],
                }),
              },
            ]}
          />
        ))}
      </View>
    );
  };

  const renderTeamMembers = (team: Team) => {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.membersContainer}
      >
        {team.members.map(member => (
          <View key={member.id} style={styles.memberCard}>
            <Image
              source={{ uri: member.avatar }}
              style={styles.memberAvatar}
            />
            <Text style={[styles.memberName, { color: colors.text.primary }]}>
              {member.name}
            </Text>
            <Text style={[styles.memberScore, { color: colors.text.secondary }]}>
              {member.score} XP
            </Text>
            {member.recentAchievements.length > 0 && (
              <View style={styles.achievementsRow}>
                {member.recentAchievements.slice(0, 3).map(achievement => (
                  <Image
                    key={achievement.id}
                    source={{ uri: achievement.icon }}
                    style={styles.achievementIcon}
                  />
                ))}
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    );
  };

  const renderTeamCard = (team: Team, isUserTeam: boolean) => {
    const isExpanded = expandedTeam === team.id;

    return (
      <TouchableOpacity
        style={[
          styles.teamCard,
          {
            backgroundColor: colors.surface,
            borderColor: isUserTeam ? colors.primary : colors.border,
          },
        ]}
        onPress={() => setExpandedTeam(isExpanded ? null : team.id)}
      >
        <View style={styles.teamHeader}>
          <Image source={{ uri: team.logo }} style={styles.teamLogo} />
          <View style={styles.teamInfo}>
            <Text style={[styles.teamName, { color: colors.text.primary }]}>
              {team.name}
            </Text>
            <Text style={[styles.teamRank, { color: colors.text.secondary }]}>
              Rank #{team.rank}
            </Text>
          </View>
          <Text style={[styles.teamScore, { color: colors.primary }]}>
            {team.score} XP
          </Text>
        </View>

        {renderTeamProgress(team)}

        {isExpanded && (
          <View style={styles.expandedContent}>
            {renderTeamMembers(team)}
            
            {!isUserTeam && (
              <TouchableOpacity
                style={[styles.challengeButton, { backgroundColor: colors.primary }]}
                onPress={() => onChallengeTeam(team.id)}
              >
                <Text style={[styles.challengeButtonText, { color: colors.text.inverse }]}>
                  Challenge Team
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
        Your Team
      </Text>
      {renderTeamCard(userTeam, true)}

      <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
        Competing Teams
      </Text>
      {competingTeams.map(team => renderTeamCard(team, false))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  teamCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
  },
  teamHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  teamLogo: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  teamInfo: {
    flex: 1,
    marginLeft: 12,
  },
  teamName: {
    fontSize: 18,
    fontWeight: '600',
  },
  teamRank: {
    fontSize: 14,
  },
  teamScore: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  progressContainer: {
    flexDirection: 'row',
    height: 40,
    gap: 4,
  },
  progressBar: {
    flex: 1,
    borderRadius: 4,
  },
  expandedContent: {
    marginTop: 16,
  },
  membersContainer: {
    marginBottom: 16,
  },
  memberCard: {
    padding: 12,
    marginRight: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.05)',
    alignItems: 'center',
  },
  memberAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginBottom: 8,
  },
  memberName: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  memberScore: {
    fontSize: 12,
  },
  achievementsRow: {
    flexDirection: 'row',
    marginTop: 8,
    gap: 4,
  },
  achievementIcon: {
    width: 24,
    height: 24,
  },
  challengeButton: {
    padding: 12,
    borderRadius: 20,
    alignItems: 'center',
  },
  challengeButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
