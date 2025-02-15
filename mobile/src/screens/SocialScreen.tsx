import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSocial } from '../hooks/useSocial';
import { FadeInView } from '../components/animations/FadeInView';
import { ScaleView } from '../components/animations/ScaleView';

const SocialScreen = () => {
  const [selectedTab, setSelectedTab] = useState<'feed' | 'leaderboard'>('feed');
  const [comment, setComment] = useState('');
  const [selectedActivity, setSelectedActivity] = useState(null);
  const {
    feed,
    leaderboard,
    loading,
    error,
    likeActivity,
    unlikeActivity,
    commentOnActivity,
    shareActivity,
    refresh,
  } = useSocial();

  const handleComment = async (activityId: string) => {
    if (!comment.trim()) return;

    try {
      await commentOnActivity(activityId, comment.trim());
      setComment('');
      setSelectedActivity(null);
    } catch (err) {
      // Error is handled by the hook
    }
  };

  if (loading && !feed.length && !leaderboard.length) {
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

  const renderActivity = (activity: any) => (
    <FadeInView key={activity.id} style={styles.activityCard}>
      <View style={styles.activityHeader}>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{activity.user.name}</Text>
          <Text style={styles.timestamp}>{activity.timestamp}</Text>
        </View>
      </View>

      <Text style={styles.activityText}>{activity.text}</Text>

      <View style={styles.activityStats}>
        <ScaleView onPress={() => activity.isLiked ? unlikeActivity(activity.id) : likeActivity(activity.id)}>
          <View style={styles.statItem}>
            <Icon
              name={activity.isLiked ? 'heart' : 'heart-outline'}
              size={24}
              color={activity.isLiked ? '#FF4B4B' : '#666'}
            />
            <Text style={styles.statText}>{activity.likes}</Text>
          </View>
        </ScaleView>

        <ScaleView onPress={() => setSelectedActivity(selectedActivity === activity.id ? null : activity.id)}>
          <View style={styles.statItem}>
            <Icon name="comment-outline" size={24} color="#666" />
            <Text style={styles.statText}>{activity.commentCount}</Text>
          </View>
        </ScaleView>

        <ScaleView onPress={() => shareActivity(activity.id)}>
          <View style={styles.statItem}>
            <Icon name="share-outline" size={24} color="#666" />
            <Text style={styles.statText}>{activity.shares}</Text>
          </View>
        </ScaleView>
      </View>

      {selectedActivity === activity.id && (
        <View style={styles.commentSection}>
          <TextInput
            style={styles.commentInput}
            value={comment}
            onChangeText={setComment}
            placeholder="Write a comment..."
            multiline
          />
          <TouchableOpacity
            style={styles.commentButton}
            onPress={() => handleComment(activity.id)}
          >
            <Text style={styles.commentButtonText}>Post</Text>
          </TouchableOpacity>
        </View>
      )}
    </FadeInView>
  );

  const renderLeaderboardItem = (user: any, index: number) => (
    <FadeInView
      key={user.id}
      style={styles.leaderboardItem}
      delay={index * 100}
    >
      <Text style={styles.rank}>#{index + 1}</Text>
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{user.name}</Text>
        <Text style={styles.userStats}>
          Level {user.level} • {user.xp} XP
        </Text>
      </View>
      {index < 3 && (
        <Icon
          name="trophy"
          size={24}
          color={['#FFD700', '#C0C0C0', '#CD7F32'][index]}
        />
      )}
    </FadeInView>
  );

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'feed' && styles.activeTab]}
          onPress={() => setSelectedTab('feed')}
        >
          <Text style={[styles.tabText, selectedTab === 'feed' && styles.activeTabText]}>
            Feed
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'leaderboard' && styles.activeTab]}
          onPress={() => setSelectedTab('leaderboard')}
        >
          <Text style={[styles.tabText, selectedTab === 'leaderboard' && styles.activeTabText]}>
            Leaderboard
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.content}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refresh} />
        }
      >
        {selectedTab === 'feed'
          ? feed.map(renderActivity)
          : leaderboard.map(renderLeaderboardItem)
        }
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  errorText: {
    marginTop: 8,
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#58CC02',
  },
  tabText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '600',
  },
  activeTabText: {
    color: '#58CC02',
  },
  content: {
    flex: 1,
  },
  activityCard: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  activityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  timestamp: {
    fontSize: 12,
    color: '#666',
  },
  activityText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 12,
  },
  activityStats: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  statText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#666',
  },
  commentSection: {
    marginTop: 12,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 8,
    minHeight: 40,
    maxHeight: 80,
  },
  commentButton: {
    alignSelf: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginTop: 8,
    backgroundColor: '#58CC02',
    borderRadius: 4,
  },
  commentButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  leaderboardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  rank: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    width: 48,
  },
  userStats: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
});

export default SocialScreen;
