// src/services/subscription/index.js
const express = require('express');
const mysql = require('mysql2/promise');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { authenticateToken } = require('../auth');

const router = express.Router();

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

// Get subscription plans
router.get('/plans', async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    
    const [plans] = await connection.execute(
      'SELECT * FROM subscription_plans WHERE active = 1'
    );

    await connection.end();
    res.json(plans);
  } catch (error) {
    console.error('Error fetching plans:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Subscribe to a plan
router.post('/subscribe', authenticateToken, async (req, res) => {
  try {
    const { planId, paymentMethodId } = req.body;
    const connection = await mysql.createConnection(dbConfig);

    // Get plan details
    const [plans] = await connection.execute(
      'SELECT * FROM subscription_plans WHERE id = ?',
      [planId]
    );

    if (plans.length === 0) {
      await connection.end();
      return res.status(404).json({ error: 'Plan not found' });
    }

    const plan = plans[0];

    // Create Stripe customer if not exists
    const [users] = await connection.execute(
      'SELECT stripe_customer_id FROM users WHERE id = ?',
      [req.user.userId]
    );

    let stripeCustomerId = users[0].stripe_customer_id;

    if (!stripeCustomerId) {
      const customer = await stripe.customers.create({
        payment_method: paymentMethodId,
        email: users[0].email,
        invoice_settings: {
          default_payment_method: paymentMethodId,
        },
      });

      stripeCustomerId = customer.id;

      await connection.execute(
        'UPDATE users SET stripe_customer_id = ? WHERE id = ?',
        [stripeCustomerId, req.user.userId]
      );
    }

    // Create subscription
    const subscription = await stripe.subscriptions.create({
      customer: stripeCustomerId,
      items: [{ price: plan.stripe_price_id }],
      expand: ['latest_invoice.payment_intent'],
    });

    // Record subscription in database
    await connection.execute(
      `INSERT INTO user_subscriptions 
       (user_id, plan_id, stripe_subscription_id, status, started_at)
       VALUES (?, ?, ?, ?, NOW())`,
      [req.user.userId, planId, subscription.id, subscription.status]
    );

    await connection.end();
    res.json({
      subscriptionId: subscription.id,
      clientSecret: subscription.latest_invoice.payment_intent.client_secret,
    });
  } catch (error) {
    console.error('Error creating subscription:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Cancel subscription
router.post('/cancel', authenticateToken, async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);

    // Get active subscription
    const [subscriptions] = await connection.execute(
      `SELECT * FROM user_subscriptions 
       WHERE user_id = ? AND status = 'active'
       ORDER BY started_at DESC LIMIT 1`,
      [req.user.userId]
    );

    if (subscriptions.length === 0) {
      await connection.end();
      return res.status(404).json({ error: 'No active subscription found' });
    }

    // Cancel in Stripe
    await stripe.subscriptions.del(subscriptions[0].stripe_subscription_id);

    // Update status in database
    await connection.execute(
      `UPDATE user_subscriptions 
       SET status = 'cancelled', ended_at = NOW()
       WHERE id = ?`,
      [subscriptions[0].id]
    );

    await connection.end();
    res.json({ message: 'Subscription cancelled successfully' });
  } catch (error) {
    console.error('Error cancelling subscription:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get subscription status
router.get('/status', authenticateToken, async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);

    const [subscriptions] = await connection.execute(
      `SELECT 
        us.*,
        sp.name as plan_name,
        sp.features
       FROM user_subscriptions us
       JOIN subscription_plans sp ON sp.id = us.plan_id
       WHERE us.user_id = ?
       ORDER BY us.started_at DESC
       LIMIT 1`,
      [req.user.userId]
    );

    await connection.end();
    res.json(subscriptions[0] || { status: 'none' });
  } catch (error) {
    console.error('Error fetching subscription status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;