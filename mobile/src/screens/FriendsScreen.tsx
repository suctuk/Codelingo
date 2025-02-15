import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useFriends } from '../hooks/useFriends';

interface Friend {
  id: string;
  name: string;
  username: string;
  level: number;
  xp: number;
  streak: number;
  avatar: string;
  online: boolean;
  lastActive: string;
}

interface FriendRequest {
  id: string;
  name: string;
  username: string;
  avatar: string;
}

const FriendsScreen = () => {
  const [selectedTab, setSelectedTab] = useState<'friends' | 'requests'>('friends');
  const [searchQuery, setSearchQuery] = useState('');
  const {
    friends,
    friendRequests,
    loading,
    error,
    sendFriendRequest,
    acceptFriendRequest,
    declineFriendRequest,
    removeFriend,
  } = useFriends();

  const handleAcceptRequest = async (requestId: string) => {
    try {
      await acceptFriendRequest(requestId);
      Alert.alert('Success', 'Friend request accepted!');
    } catch (err) {
      Alert.alert('Error', err.message);
    }
  };

  const handleDeclineRequest = async (requestId: string) => {
    try {
      await declineFriendRequest(requestId);
    } catch (err) {
      Alert.alert('Error', err.message);
    }
  };

  const handleAddFriend = async () => {
    if (!searchQuery.trim()) {
      Alert.alert('Error', 'Please enter a username');
      return;
    }

    try {
      await sendFriendRequest(searchQuery.trim());
      Alert.alert('Success', 'Friend request sent!');
      setSearchQuery('');
    } catch (err) {
      Alert.alert('Error', err.message);
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

  const renderFriendCard = (friend: Friend) => (
    <TouchableOpacity key={friend.id} style={styles.friendCard}>
      <View style={styles.friendHeader}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatar}>{friend.avatar}</Text>
          {friend.online && <View style={styles.onlineIndicator} />}
        </View>
        <View style={styles.friendInfo}>
          <Text style={styles.friendName}>{friend.name}</Text>
          <Text style={styles.username}>{friend.username}</Text>
        </View>
        <TouchableOpacity style={styles.messageButton}>
          <Icon name="message" size={20} color="#58CC02" />
        </TouchableOpacity>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.stat}>
          <Icon name="star" size={16} color="#FFD700" />
          <Text style={styles.statValue}>Level {friend.level}</Text>
        </View>
        <View style={styles.stat}>
          <Icon name="fire" size={16} color="#FF4B4B" />
          <Text style={styles.statValue}>{friend.streak} day streak</Text>
        </View>
        <Text style={styles.lastActive}>
          {friend.online ? 'Online' : friend.lastActive}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderFriendRequest = (request: FriendRequest) => (
    <View key={request.id} style={styles.requestCard}>
      <View style={styles.requestInfo}>
        <Text style={styles.avatar}>{request.avatar}</Text>
        <View>
          <Text style={styles.requestName}>{request.name}</Text>
          <Text style={styles.username}>{request.username}</Text>
        </View>
      </View>
      <View style={styles.requestActions}>
        <TouchableOpacity
          style={[styles.requestButton, styles.acceptButton]}
          onPress={() => handleAcceptRequest(request.id)}
        >
          <Text style={styles.acceptButtonText}>Accept</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.requestButton, styles.declineButton]}
          onPress={() => handleDeclineRequest(request.id)}
        >
          <Text style={styles.declineButtonText}>Decline</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Icon name="magnify" size={20} color="#666" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search friends..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddFriend}>
          <Icon name="account-plus" size={24} color="#fff" />
          <Text style={styles.addButtonText}>Add Friend</Text>
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'friends' && styles.selectedTab]}
          onPress={() => setSelectedTab('friends')}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === 'friends' && styles.selectedTabText,
            ]}
          >
            Friends ({friends.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'requests' && styles.selectedTab]}
          onPress={() => setSelectedTab('requests')}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === 'requests' && styles.selectedTabText,
            ]}
          >
            Requests ({friendRequests.length})
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView style={styles.content}>
        {selectedTab === 'friends' ? (
          friends
            .filter(
              (friend) =>
                friend.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                friend.username.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map(renderFriendCard)
        ) : (
          friendRequests.map(renderFriendRequest)
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
  tabs: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
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
  content: {
    flex: 1,
    padding: 16,
  },
  friendCard: {
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
  friendHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    fontSize: 32,
  },
  onlineIndicator: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#58CC02',
    borderWidth: 2,
    borderColor: '#fff',
  },
  friendInfo: {
    flex: 1,
    marginLeft: 12,
  },
  friendName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  username: {
    fontSize: 12,
    color: '#666',
  },
  messageButton: {
    padding: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  statValue: {
    marginLeft: 4,
    fontSize: 12,
    color: '#666',
  },
  lastActive: {
    marginLeft: 'auto',
    fontSize: 12,
    color: '#666',
  },
  requestCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  requestInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  requestName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginLeft: 12,
  },
  requestActions: {
    flexDirection: 'row',
  },
  requestButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    marginLeft: 8,
  },
  acceptButton: {
    backgroundColor: '#58CC02',
  },
  declineButton: {
    backgroundColor: '#f5f5f5',
  },
  acceptButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  declineButtonText: {
    color: '#666',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#58CC02',
    padding: 16,
    margin: 16,
    borderRadius: 24,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
    marginLeft: 8,
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

export default FriendsScreen;
