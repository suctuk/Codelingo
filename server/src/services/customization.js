const express = require('express');
const router = express.Router();
const { createConnection } = require('../utils/database');
const { requireAuth } = require('../middleware/auth');
const CustomizationService = require('./customizationService');

const customizationService = new CustomizationService();

// Available mascots with their unlock requirements
const AVAILABLE_MASCOTS = {
  'default': { src: '/mascots/default.svg', name: 'Bitbot', unlocked: true },
  'pythonista': { src: '/mascots/python-bot.svg', name: 'Pythonista', gems: 100 },
  'javascriptor': { src: '/mascots/js-bot.svg', name: 'JavaScriptor', gems: 100 },
  'rustacean': { src: '/mascots/rust-bot.svg', name: 'Rustacean', gems: 150 },
  'gopher': { src: '/mascots/go-bot.svg', name: 'Gopher', gems: 150 },
  'java-duke': { src: '/mascots/java-bot.svg', name: 'Duke', gems: 100 },
  'cpp-bot': { src: '/mascots/cpp-bot.svg', name: 'Binary', gems: 100 },
  'quantum': { src: '/mascots/quantum-bot.svg', name: 'Quantum', xp: 5000 },
  'cyber': { src: '/mascots/cyber-bot.svg', name: 'Cyber', streak: 30 },
  'neural': { src: '/mascots/neural-bot.svg', name: 'Neural', lessons: 100 }
};

// Available themes with their unlock requirements
const AVAILABLE_THEMES = {
  'default': { name: 'Default', unlocked: true },
  'dark': { name: 'Dark Mode', unlocked: true },
  'cyberpunk': { name: 'Cyberpunk', gems: 200 },
  'matrix': { name: 'Matrix', gems: 250 },
  'retro': { name: 'Retro Terminal', gems: 150 },
  'neon': { name: 'Neon Nights', streak: 20 },
  'minimal': { name: 'Minimal', xp: 2000 }
};

/**
 * Get user's customization options
 */
async function getCustomizationOptions(req, res) {
  const { userId } = req.user;
  
  let connection;
  try {
    connection = await createConnection();
    
    // Get user's progress data
    const [[userProgress]] = await connection.query(
      `SELECT xp, gems, streak_count,
              (SELECT COUNT(*) FROM user_lesson_progress WHERE user_id = ? AND completed = 1) as completed_lessons
       FROM user_profiles WHERE id = ?`,
      [userId, userId]
    );

    // Get user's current customization
    const [[customization]] = await connection.query(
      'SELECT * FROM user_customization WHERE user_id = ?',
      [userId]
    );

    // Calculate available options based on user's progress
    const mascots = Object.entries(AVAILABLE_MASCOTS).map(([id, mascot]) => ({
      id,
      ...mascot,
      unlocked: mascot.unlocked ||
                (customization && JSON.parse(customization.unlocked_icons).includes(id)) ||
                (mascot.gems && userProgress.gems >= mascot.gems) ||
                (mascot.xp && userProgress.xp >= mascot.xp) ||
                (mascot.streak && userProgress.streak_count >= mascot.streak) ||
                (mascot.lessons && userProgress.completed_lessons >= mascot.lessons)
    }));

    const themes = Object.entries(AVAILABLE_THEMES).map(([id, theme]) => ({
      id,
      ...theme,
      unlocked: theme.unlocked ||
                (customization && JSON.parse(customization.unlocked_themes).includes(id)) ||
                (theme.gems && userProgress.gems >= theme.gems) ||
                (theme.xp && userProgress.xp >= theme.xp) ||
                (theme.streak && userProgress.streak_count >= theme.streak)
    }));

    res.json({
      success: true,
      data: {
        mascots,
        themes,
        selected: {
          mascot: customization?.selected_icon || 'default',
          theme: customization?.selected_theme || 'default'
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch customization options'
    });
  } finally {
    if (connection) await connection.end();
  }
}

/**
 * Update user's customization
 */
async function updateCustomization(req, res) {
  const { userId } = req.user;
  const { mascot, theme } = req.body;

  let connection;
  try {
    connection = await createConnection();
    
    // Verify the selections are valid and unlocked
    const [[userProgress]] = await connection.query(
      `SELECT xp, gems, streak_count,
              (SELECT COUNT(*) FROM user_lesson_progress WHERE user_id = ? AND completed = 1) as completed_lessons
       FROM user_profiles WHERE id = ?`,
      [userId, userId]
    );

    const [[customization]] = await connection.query(
      'SELECT * FROM user_customization WHERE user_id = ?',
      [userId]
    );

    // Validate mascot selection
    if (mascot && !AVAILABLE_MASCOTS[mascot]) {
      return res.status(400).json({
        success: false,
        error: 'Invalid mascot selection'
      });
    }

    // Validate theme selection
    if (theme && !AVAILABLE_THEMES[theme]) {
      return res.status(400).json({
        success: false,
        error: 'Invalid theme selection'
      });
    }

    // Update customization
    if (customization) {
      await connection.query(
        `UPDATE user_customization
         SET selected_icon = COALESCE(?, selected_icon),
             selected_theme = COALESCE(?, selected_theme)
         WHERE user_id = ?`,
        [mascot, theme, userId]
      );
    } else {
      await connection.query(
        `INSERT INTO user_customization (user_id, selected_icon, selected_theme)
         VALUES (?, ?, ?)`,
        [userId, mascot || 'default', theme || 'default']
      );
    }

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to update customization'
    });
  } finally {
    if (connection) await connection.end();
  }
}

/**
 * Purchase a customization item with gems
 */
async function purchaseCustomization(req, res) {
  const { userId } = req.user;
  const { itemType, itemId } = req.body;

  let connection;
  try {
    connection = await createConnection();
    await connection.beginTransaction();

    // Get user's current gems
    const [[userProfile]] = await connection.query(
      'SELECT gems FROM user_profiles WHERE id = ?',
      [userId]
    );

    // Get current customization
    const [[customization]] = await connection.query(
      'SELECT * FROM user_customization WHERE user_id = ?',
      [userId]
    );

    // Validate and get item cost
    let item;
    let unlockedField;
    let currentUnlocked;

    if (itemType === 'mascot') {
      item = AVAILABLE_MASCOTS[itemId];
      unlockedField = 'unlocked_icons';
      currentUnlocked = customization ? JSON.parse(customization.unlocked_icons) : [];
    } else if (itemType === 'theme') {
      item = AVAILABLE_THEMES[itemId];
      unlockedField = 'unlocked_themes';
      currentUnlocked = customization ? JSON.parse(customization.unlocked_themes) : [];
    } else {
      throw new Error('Invalid item type');
    }

    if (!item || !item.gems) {
      return res.status(400).json({
        success: false,
        error: 'Item not available for purchase'
      });
    }

    if (currentUnlocked.includes(itemId)) {
      return res.status(400).json({
        success: false,
        error: 'Item already unlocked'
      });
    }

    if (userProfile.gems < item.gems) {
      return res.status(400).json({
        success: false,
        error: 'Insufficient gems'
      });
    }

    // Update user's gems
    await connection.query(
      'UPDATE user_profiles SET gems = gems - ? WHERE id = ?',
      [item.gems, userId]
    );

    // Update unlocked items
    const newUnlocked = [...currentUnlocked, itemId];
    if (customization) {
      await connection.query(
        `UPDATE user_customization 
         SET ${unlockedField} = ?
         WHERE user_id = ?`,
        [JSON.stringify(newUnlocked), userId]
      );
    } else {
      await connection.query(
        `INSERT INTO user_customization (user_id, ${unlockedField})
         VALUES (?, ?)`,
        [userId, JSON.stringify(newUnlocked)]
      );
    }

    await connection.commit();

    res.json({
      success: true,
      data: {
        remainingGems: userProfile.gems - item.gems,
        unlockedItem: itemId
      }
    });
  } catch (error) {
    if (connection) {
      await connection.rollback();
    }
    res.status(500).json({
      success: false,
      error: 'Failed to purchase item'
    });
  } finally {
    if (connection) await connection.end();
  }
}

/**
 * Get available items for a category
 */
async function getItems(req, res) {
  const { category } = req.params;
  try {
    const items = await customizationService.getItems(category);
    res.json({
      success: true,
      data: items
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch items'
    });
  }
}

/**
 * Get user's inventory
 */
async function getUserInventory(req, res) {
  const { userId } = req.user;
  try {
    const inventory = await customizationService.getUserInventory(userId);
    res.json({
      success: true,
      data: inventory
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch inventory'
    });
  }
}

/**
 * Purchase an item
 */
async function purchaseItem(req, res) {
  const { userId } = req.user;
  const { itemId } = req.body;
  try {
    const result = await customizationService.purchaseItem(userId, itemId);
    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
}

/**
 * Update user's selected mascot
 */
async function updateSelectedMascot(req, res) {
  const { userId } = req.user;
  const { mascotId } = req.body;
  try {
    const user = await customizationService.updateSelectedMascot(userId, mascotId);
    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
}

/**
 * Update user's theme
 */
async function updateTheme(req, res) {
  const { userId } = req.user;
  const { themeId } = req.body;
  try {
    const user = await customizationService.updateTheme(userId, themeId);
    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
}

/**
 * Use a power-up
 */
async function usePowerUp(req, res) {
  const { userId } = req.user;
  const { powerUpId } = req.body;
  try {
    const user = await customizationService.usePowerUp(userId, powerUpId);
    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
}

// Routes
router.get('/options', requireAuth, getCustomizationOptions);
router.post('/update', requireAuth, updateCustomization);
router.post('/purchase', requireAuth, purchaseCustomization);
router.get('/items/:category', requireAuth, getItems);
router.get('/inventory', requireAuth, getUserInventory);
router.post('/purchase-item', requireAuth, purchaseItem);
router.post('/update-mascot', requireAuth, updateSelectedMascot);
router.post('/update-theme', requireAuth, updateTheme);
router.post('/use-power-up', requireAuth, usePowerUp);

module.exports = router;
