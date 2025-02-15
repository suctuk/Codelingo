import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';
import { useQuests } from '../hooks/useQuests';
import { useApp } from '../context/AppContext';

interface Quest {
  id: string;
  title: string;
  description: string;
  xp: number;
  gems: number;
  progress: number;
  total: number;
  type: 'daily' | 'weekly' | 'achievement';
  icon: string;
  completed: boolean;
}

const QuestsScreen = () => {
  const [selectedTab, setSelectedTab] = useState<'daily' | 'weekly' | 'achievements'>('daily');
  const { dailyQuests, weeklyQuests, achievements, loading, error, claimReward } = useQuests();
  const { state } = useApp();

  const filteredQuests = () => {
    switch (selectedTab) {
      case 'daily':
        return dailyQuests;
      case 'weekly':
        return weeklyQuests;
      case 'achievements':
        return achievements;
      default:
        return [];
    }
  };

  const handleClaimReward = async (questId: string) => {
    try {
      await claimReward(questId);
    } catch (err) {
      // Handle error
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#58CC02" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Icon name="alert-circle" size={48} color="#FF4B4B" />
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  const renderQuestCard = (quest: Quest) => {
    const progressPercentage = (quest.progress / quest.total) * 100;
    const isCompleted = quest.progress >= quest.total;

    return (
      <View key={quest.id} style={styles.questCard}>
        <View style={styles.questHeader}>
          <View style={[styles.questIcon, isCompleted && styles.completedIcon]}>
            <Icon
              name={quest.icon}
              size={24}
              color={isCompleted ? '#fff' : '#666'}
            />
          </View>
          <View style={styles.questInfo}>
            <Text style={styles.questTitle}>{quest.title}</Text>
            <Text style={styles.questDescription}>{quest.description}</Text>
          </View>
        </View>

        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View
              style={[styles.progressFill, { width: `${progressPercentage}%` }]}
            />
          </View>
          <Text style={styles.progressText}>
            {quest.progress}/{quest.total}
          </Text>
        </View>

        <View style={styles.rewards}>
          <View style={styles.reward}>
            <Icon name="star" size={16} color="#FFD700" />
            <Text style={styles.rewardText}>{quest.xp} XP</Text>
          </View>
          <View style={styles.reward}>
            <Icon name="diamond-stone" size={16} color="#1CB0F6" />
            <Text style={styles.rewardText}>{quest.gems} Gems</Text>
          </View>
          {isCompleted && (
            <TouchableOpacity style={styles.claimButton} onPress={() => handleClaimReward(quest.id)}>
              <Text style={styles.claimText}>Claim</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#58CC02', '#4CAF50']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Daily Quests</Text>
        <View style={styles.stats}>
          <View style={styles.stat}>
            <Icon name="star" size={20} color="#FFD700" />
            <Text style={styles.statValue}>250</Text>
            <Text style={styles.statLabel}>XP Today</Text>
          </View>
          <View style={styles.stat}>
            <Icon name="diamond-stone" size={20} color="#1CB0F6" />
            <Text style={styles.statValue}>25</Text>
            <Text style={styles.statLabel}>Gems Today</Text>
          </View>
        </View>
      </LinearGradient>

      {/* Tabs */}
      <View style={styles.tabs}>
        {['daily', 'weekly', 'achievements'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, selectedTab === tab && styles.selectedTab]}
            onPress={() => setSelectedTab(tab as typeof selectedTab)}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === tab && styles.selectedTabText,
              ]}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Quests List */}
      <ScrollView style={styles.questsList}>
        {filteredQuests().map(renderQuestCard)}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
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
  tabs: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
  },
  selectedTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#58CC02',
  },
  tabText: {
    color: '#666',
    fontWeight: '500',
  },
  selectedTabText: {
    color: '#58CC02',
  },
  questsList: {
    flex: 1,
    padding: 16,
  },
  questCard: {
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
  questHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  questIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  completedIcon: {
    backgroundColor: '#58CC02',
  },
  questInfo: {
    flex: 1,
  },
  questTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  questDescription: {
    fontSize: 12,
    color: '#666',
  },
  progressContainer: {
    marginBottom: 12,
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
    marginTop: 4,
    textAlign: 'right',
  },
  rewards: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reward: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  rewardText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#333',
  },
  claimButton: {
    marginLeft: 'auto',
    backgroundColor: '#58CC02',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
  },
  claimText: {
    color: '#fff',
    fontWeight: '600',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
  },
  errorText: {
    marginTop: 8,
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default QuestsScreen;
