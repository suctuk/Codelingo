import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  useWindowDimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';

const HomeScreen = () => {
  const navigation = useNavigation();
  const { width } = useWindowDimensions();

  const dailyGoals = [
    { id: 1, title: 'Complete 3 Lessons', progress: 1, total: 3, xp: 50 },
    { id: 2, title: 'Earn 100 XP', progress: 75, total: 100, xp: 30 },
    { id: 3, title: 'Practice Python', progress: 0, total: 1, xp: 20 },
  ];

  const quickActions = [
    { id: 1, title: 'Continue Learning', icon: 'play', color: '#58CC02' },
    { id: 2, title: 'Practice Mode', icon: 'refresh', color: '#FF9600' },
    { id: 3, title: 'Friends', icon: 'account-group', color: '#1CB0F6' },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header Stats */}
      <LinearGradient
        colors={['#58CC02', '#4CAF50']}
        style={styles.statsContainer}
      >
        <View style={styles.stat}>
          <Icon name="fire" size={24} color="#FFD700" />
          <Text style={styles.statValue}>7</Text>
          <Text style={styles.statLabel}>Day Streak</Text>
        </View>
        <View style={styles.stat}>
          <Icon name="star" size={24} color="#FFD700" />
          <Text style={styles.statValue}>2,450</Text>
          <Text style={styles.statLabel}>Total XP</Text>
        </View>
        <View style={styles.stat}>
          <Icon name="heart" size={24} color="#FF4B4B" />
          <Text style={styles.statValue}>4</Text>
          <Text style={styles.statLabel}>Hearts</Text>
        </View>
      </LinearGradient>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActions}>
          {quickActions.map((action) => (
            <TouchableOpacity
              key={action.id}
              style={[styles.quickAction, { backgroundColor: action.color }]}
              onPress={() => {
                switch (action.title) {
                  case 'Continue Learning':
                    navigation.navigate('Learn');
                    break;
                  case 'Practice Mode':
                    navigation.navigate('Learn', { mode: 'practice' });
                    break;
                  case 'Friends':
                    navigation.navigate('Friends');
                    break;
                }
              }}
            >
              <Icon name={action.icon} size={24} color="#FFF" />
              <Text style={styles.quickActionText}>{action.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Daily Goals */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Daily Goals</Text>
        {dailyGoals.map((goal) => (
          <View key={goal.id} style={styles.goalCard}>
            <View style={styles.goalHeader}>
              <Text style={styles.goalTitle}>{goal.title}</Text>
              <Text style={styles.goalXP}>+{goal.xp} XP</Text>
            </View>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${(goal.progress / goal.total) * 100}%`,
                    backgroundColor:
                      goal.progress >= goal.total ? '#58CC02' : '#1CB0F6',
                  },
                ]}
              />
            </View>
            <Text style={styles.progressText}>
              {goal.progress}/{goal.total} completed
            </Text>
          </View>
        ))}
      </View>

      {/* Achievements */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Achievements</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.achievementsScroll}
        >
          {[1, 2, 3].map((i) => (
            <View key={i} style={styles.achievementCard}>
              <Icon name="trophy" size={32} color="#FFD700" />
              <Text style={styles.achievementTitle}>Perfect Lesson</Text>
              <Text style={styles.achievementDesc}>
                Complete a lesson without any mistakes
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.8,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickAction: {
    width: '31%',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  quickActionText: {
    color: '#fff',
    marginTop: 8,
    fontSize: 12,
    textAlign: 'center',
  },
  goalCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  goalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  goalTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  goalXP: {
    fontSize: 14,
    color: '#58CC02',
    fontWeight: '600',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    marginTop: 8,
    fontSize: 12,
    color: '#666',
  },
  achievementsScroll: {
    marginHorizontal: -16,
  },
  achievementCard: {
    width: 160,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    alignItems: 'center',
  },
  achievementTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginTop: 8,
    textAlign: 'center',
  },
  achievementDesc: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    textAlign: 'center',
  },
});

export default HomeScreen;
