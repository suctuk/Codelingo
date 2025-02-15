import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Pressable,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [selectedMascot, setSelectedMascot] = useState('robot1');

  const stats = [
    { icon: 'star', label: 'Total XP', value: '2,450' },
    { icon: 'fire', label: 'Current Streak', value: '7 days' },
    { icon: 'trophy', label: 'Achievements', value: '12/50' },
    { icon: 'crown', label: 'League Rank', value: '#5' },
  ];

  const mascots = [
    { id: 'robot1', name: 'Byte', image: '🤖' },
    { id: 'robot2', name: 'Circuit', image: '🦾' },
    { id: 'computer1', name: 'Pixel', image: '💻' },
    { id: 'computer2', name: 'Data', image: '🖥️' },
  ];

  const achievements = [
    { 
      title: 'Perfect Streak',
      description: '7 days of learning',
      icon: 'fire',
      progress: 7,
      total: 7,
      completed: true
    },
    {
      title: 'Code Master',
      description: 'Complete 50 lessons',
      icon: 'code-tags',
      progress: 35,
      total: 50,
      completed: false
    },
    {
      title: 'Social Coder',
      description: 'Add 5 friends',
      icon: 'account-group',
      progress: 3,
      total: 5,
      completed: false
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <LinearGradient
        colors={['#58CC02', '#4CAF50']}
        style={styles.header}
      >
        <View style={styles.profileInfo}>
          <View style={styles.mascotContainer}>
            <Text style={styles.mascot}>{
              mascots.find(m => m.id === selectedMascot)?.image
            }</Text>
          </View>
          <Text style={styles.username}>John Doe</Text>
          <Text style={styles.email}>john.doe@example.com</Text>
        </View>
      </LinearGradient>

      {/* Stats Grid */}
      <View style={styles.statsGrid}>
        {stats.map((stat, index) => (
          <View key={index} style={styles.statItem}>
            <Icon name={stat.icon} size={24} color="#58CC02" />
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>

      {/* Mascot Selection */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>My Mascots</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.mascotsScroll}
        >
          {mascots.map((mascot) => (
            <Pressable
              key={mascot.id}
              style={[
                styles.mascotOption,
                selectedMascot === mascot.id && styles.selectedMascot,
              ]}
              onPress={() => setSelectedMascot(mascot.id)}
            >
              <Text style={styles.mascotEmoji}>{mascot.image}</Text>
              <Text style={styles.mascotName}>{mascot.name}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      {/* Achievements */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Achievements</Text>
        {achievements.map((achievement, index) => (
          <View key={index} style={styles.achievementCard}>
            <View style={styles.achievementHeader}>
              <View style={styles.achievementIcon}>
                <Icon 
                  name={achievement.icon} 
                  size={24} 
                  color={achievement.completed ? '#FFD700' : '#666'} 
                />
              </View>
              <View style={styles.achievementInfo}>
                <Text style={styles.achievementTitle}>{achievement.title}</Text>
                <Text style={styles.achievementDesc}>{achievement.description}</Text>
              </View>
              {achievement.completed && (
                <Icon name="check-circle" size={24} color="#58CC02" />
              )}
            </View>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill,
                  { width: `${(achievement.progress / achievement.total) * 100}%` }
                ]} 
              />
            </View>
            <Text style={styles.progressText}>
              {achievement.progress}/{achievement.total}
            </Text>
          </View>
        ))}
      </View>

      {/* Action Buttons */}
      <View style={styles.actions}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => navigation.navigate('Friends')}
        >
          <Icon name="account-group" size={24} color="#666" />
          <Text style={styles.actionText}>Friends</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => navigation.navigate('Settings')}
        >
          <Icon name="cog" size={24} color="#666" />
          <Text style={styles.actionText}>Settings</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  profileInfo: {
    alignItems: 'center',
  },
  mascotContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  mascot: {
    fontSize: 40,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.8,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 16,
    marginTop: -20,
    marginHorizontal: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statItem: {
    width: '50%',
    alignItems: 'center',
    paddingVertical: 12,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
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
  mascotsScroll: {
    marginHorizontal: -16,
  },
  mascotOption: {
    width: 100,
    height: 100,
    margin: 8,
    borderRadius: 12,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
  },
  selectedMascot: {
    backgroundColor: '#e3f2fd',
    borderColor: '#1976d2',
    borderWidth: 2,
  },
  mascotEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  mascotName: {
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
  },
  achievementCard: {
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
  achievementHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  achievementIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  achievementDesc: {
    fontSize: 12,
    color: '#666',
  },
  progressBar: {
    height: 4,
    backgroundColor: '#f0f0f0',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#58CC02',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    color: '#666',
    marginTop: 8,
    textAlign: 'right',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  actionButton: {
    alignItems: 'center',
  },
  actionText: {
    marginTop: 4,
    fontSize: 12,
    color: '#666',
  },
});

export default ProfileScreen;
