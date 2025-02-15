import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { friendApi } from '../services/api';

export const useFriends = () => {
  const { state } = useApp();
  const [friends, setFriends] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFriends = async () => {
    try {
      setLoading(true);
      const response = await friendApi.getFriends();
      setFriends(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchFriendRequests = async () => {
    try {
      setLoading(true);
      const response = await friendApi.getFriendRequests();
      setFriendRequests(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const sendFriendRequest = async (username: string) => {
    try {
      await friendApi.sendFriendRequest(username);
      return true;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const acceptFriendRequest = async (requestId: string) => {
    try {
      await friendApi.acceptFriendRequest(requestId);
      await Promise.all([
        fetchFriends(),
        fetchFriendRequests(),
      ]);
      return true;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const declineFriendRequest = async (requestId: string) => {
    try {
      await friendApi.declineFriendRequest(requestId);
      await fetchFriendRequests();
      return true;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const removeFriend = async (friendId: string) => {
    try {
      await friendApi.removeFriend(friendId);
      await fetchFriends();
      return true;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  useEffect(() => {
    if (state.isAuthenticated) {
      Promise.all([
        fetchFriends(),
        fetchFriendRequests(),
      ]);
    }
  }, [state.isAuthenticated]);

  return {
    friends,
    friendRequests,
    loading,
    error,
    sendFriendRequest,
    acceptFriendRequest,
    declineFriendRequest,
    removeFriend,
    refresh: () => Promise.all([fetchFriends(), fetchFriendRequests()]),
  };
};
