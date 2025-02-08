// src/services/auth/index.js
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const mysql = require('mysql2/promise');

const router = express.Router();

// Database connection configuration
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

// Middleware for input validation
const validateRegistration = [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 8 }),
  body('username').isLength({ min: 3 }),
];

// User registration
router.post('/register', validateRegistration, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, username } = req.body;
    const connection = await mysql.createConnection(dbConfig);

    // Check if user already exists
    const [existingUsers] = await connection.execute(
      'SELECT id FROM users WHERE email = ? OR username = ?',
      [email, username]
    );

    if (existingUsers.length > 0) {
      await connection.end();
      return res.status(409).json({ error: 'User already exists' });
    }

    // Hash password and create user
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await connection.execute(
      'INSERT INTO users (email, password, username) VALUES (?, ?, ?)',
      [email, hashedPassword, username]
    );

    // Create initial user profile
    await connection.execute(
      'INSERT INTO user_profiles (user_id, xp, gems, hearts, streak) VALUES (?, 0, 100, 5, 0)',
      [result.insertId]
    );

    await connection.end();

    // Generate JWT token
    const token = jwt.sign(
      { userId: result.insertId, username },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
      userId: result.insertId,
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// User login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const connection = await mysql.createConnection(dbConfig);

    // Get user from database
    const [users] = await connection.execute(
      'SELECT id, username, password FROM users WHERE email = ?',
      [email]
    );

    await connection.end();

    if (users.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = users[0];
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login successful',
      token,
      userId: user.id,
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

module.exports = { router, authenticateToken };