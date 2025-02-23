const Redis = require("ioredis");

const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: 6379, // Default Redis port
  tls: {} // Enable TLS for encrypted connection
});

redis.on("connect", () => {
  console.log("Connected to AWS Redis with TLS");
});

redis.on("error", (err) => {
  console.error("Redis connection error:", err);
});

module.exports = redis;
