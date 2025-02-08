// src/services/social/index.js
const express = require('express');
const mysql = require('mysql2/promise');
const { authenticateToken } = require('../auth');

const router = express.Router();

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

// Get friend list
router.get('/friends', authenticateToken, async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    
    const [friends] = await connection.execute(
      `SELECT 
        u.id,
        u.username,
        up.xp,
        up.streak,
        up.last_activity_date
       FROM friendships f
       JOIN users u ON (u.id = f.user_id_1 OR u.id = f.user_id_2)
       JOIN user_profiles up ON up.user_id = u.id
       WHERE (f.user_id_1 = ? OR f.user_id_2 = ?)
       AND u.id != ?
       AND f.status = 'accepted'`,
      [req.user.userId, req.user.userId, req.user.userId]
    );

    await connection.end();
    res.json(friends);
  } catch (error) {
    console.error('Error fetching friends:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Send friend request
router.post('/friends/request', authenticateToken, async (req, res) => {
  try {
    const { friendId } = req.body;
    const connection = await mysql.createConnection(dbConfig);

    // Check if friendship already exists
    const [existing] = await connection.execute(
      `SELECT * FROM friendships 
       WHERE (user_id_1 = ? AND user_id_2 = ?)
       OR (user_id_1 = ? AND user_id_2 = ?)`,
      [req.user.userId, friendId, friendId, req.user.userId]
    );

    if (existing.length > 0) {
      await connection.end();
      return res.status(400).json({ error: 'Friendship already exists' });
    }

    // Create friendship request
    await connection.execute(
      `INSERT INTO friendships (user_id_1, user_id_2, status, created_at)
       VALUES (?, ?, 'pending', NOW())`,
      [req.user.userId, friendId]
    );

    await connection.end();
    res.json({ message: 'Friend request sent successfully' });
  } catch (error) {
    console.error('Error sending friend request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Handle friend request
router.post('/friends/respond', authenticateToken, async (req, res) => {
  try {
    const { friendshipId, accept } = req.body;
    const connection = await mysql.createConnection(dbConfig);

    // Update friendship status
    await connection.execute(
      `UPDATE friendships 
       SET status = ?, updated_at = NOW()
       WHERE id = ? AND user_id_2 = ?`,
      [accept ? 'accepted' : 'rejected', friendshipId, req.user.userId]
    );

    await connection.end();
    res.json({ 
      message: `Friend request ${accept ? 'accepted' : 'rejected'} successfully` 
    });
  } catch (error) {
    console.error('Error handling friend request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get friend activity feed
router.get('/feed', authenticateToken, async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    
    const [activities] = await connection.execute(
      `SELECT 
        u.username,
        a.type,
        a.data,
        a.created_at
       FROM friend_activities a
       JOIN users u ON u.id = a.user_id
       JOIN friendships f ON (f.user_id_1 = ? AND f.user_id_2 = a.user_id)
          OR (f.user_id_2 = ? AND f.user_id_1 = a.user_id)
       WHERE f.status = 'accepted'
       ORDER BY a.created_at DESC
       LIMIT 50`,
      [req.user.userId, req.user.userId]
    );

    await connection.end();
    res.json(activities);
  } catch (error) {
    console.error('Error fetching activity feed:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create friend quest
router.post('/quests/create', authenticateToken, async (req, res) => {
  try {
    const { friendId, questType } = req.body;
    const connection = await mysql.createConnection(dbConfig);

    // Create new quest
    const [result] = await connection.execute(
      `INSERT INTO friend_quests 
       (creator_id, friend_id, type, status, created_at)
       VALUES (?, ?, ?, 'active', NOW())`,
      [req.user.userId, friendId, questType]
    );

    await connection.end();
    res.json({ 
      message: 'Friend quest created successfully',
      questId: result.insertId
    });
  } catch (error) {
    console.error('Error creating friend quest:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get quest progress
router.get('/quests/:questId', authenticateToken, async (req, res) => {
  try {
    const { questId } = req.params;
    const connection = await mysql.createConnection(dbConfig);

    const [quests] = await connection.execute(
      `SELECT 
        fq.*,
        u1.username as creator_username,
        u2.username as friend_username,
        up1.progress as creator_progress,
        up2.progress as friend_progress
       FROM friend_quests fq
       JOIN users u1 ON u1.id = fq.creator_id
       JOIN users u2 ON u2.id = fq.friend_id
       JOIN user_profiles up1 ON up1.user_id = fq.creator_id
       JOIN user_profiles up2 ON up2.user_id = fq.friend_id
       WHERE fq.id = ?
       AND (fq.creator_id = ? OR fq.friend_id = ?)`,
      [questId, req.user.userId, req.user.userId]
    );

    if (quests.length === 0) {
      await connection.end();
      return res.status(404).json({ error: 'Quest not found' });
    }

    await connection.end();
    res.json(quests[0]);
  } catch (error) {
    console.error('Error fetching quest:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Send message
router.post('/messages/send', authenticateToken, async (req, res) => {
  try {
    const { recipientId, content } = req.body;
    const connection = await mysql.createConnection(dbConfig);

    // Verify friendship exists
    const [friendship] = await connection.execute(
      `SELECT id FROM friendships 
       WHERE ((user_id_1 = ? AND user_id_2 = ?) 
       OR (user_id_1 = ? AND user_id_2 = ?))
       AND status = 'accepted'`,
      [req.user.userId, recipientId, recipientId, req.user.userId]
    );

    if (friendship.length === 0) {
      await connection.end();
      return res.status(403).json({ error: 'Must be friends to send messages' });
    }

    // Send message
    await connection.execute(
      `INSERT INTO messages (sender_id, recipient_id, content, sent_at)
       VALUES (?, ?, ?, NOW())`,
      [req.user.userId, recipientId, content]
    );

    await connection.end();
    res.json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get conversation
router.get('/messages/:friendId', authenticateToken, async (req, res) => {
  try {
    const { friendId } = req.params;
    const connection = await mysql.createConnection(dbConfig);

    const [messages] = await connection.execute(
      `SELECT 
        m.*,
        u.username as sender_username
       FROM messages m
       JOIN users u ON u.id = m.sender_id
       WHERE (m.sender_id = ? AND m.recipient_id = ?)
       OR (m.sender_id = ? AND m.recipient_id = ?)
       ORDER BY m.sent_at DESC
       LIMIT 50`,
      [req.user.userId, friendId, friendId, req.user.userId]
    );

    // Mark messages as read
    await connection.execute(
      `UPDATE messages 
       SET read_at = NOW()
       WHERE recipient_id = ? AND sender_id = ? AND read_at IS NULL`,
      [req.user.userId, friendId]
    );

    await connection.end();
    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;