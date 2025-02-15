const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createConnection } = require('../utils/database');

// Middleware to verify JWT token
const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Register new user
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  let connection;

  try {
    connection = await createConnection();
    await connection.beginTransaction();

    // Check if user already exists
    const [existingUsers] = await connection.query(
      'SELECT id FROM users WHERE email = ? OR username = ?',
      [email, username]
    );

    if (existingUsers.length > 0) {
      return res.status(409).json({ error: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    const [result] = await connection.query(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, email, hashedPassword]
    );

    // Create user profile
    await connection.query(
      'INSERT INTO user_profiles (user_id, xp, streak) VALUES (?, 0, 0)',
      [result.insertId]
    );

    await connection.commit();

    // Generate JWT token
    const token = jwt.sign(
      { userId: result.insertId, email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token
    });

  } catch (error) {
    if (connection) {
      await connection.rollback();
    }
    res.status(500).json({ error: 'Failed to register user' });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
});

// Login user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  let connection;

  try {
    connection = await createConnection();

    // Get user
    const [users] = await connection.query(
      'SELECT id, password FROM users WHERE email = ?',
      [email]
    );

    if (users.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = users[0];

    // Check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login successful',
      token
    });

  } catch (error) {
    res.status(500).json({ error: 'Failed to login' });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
});

module.exports = {
  router,
  requireAuth
};
