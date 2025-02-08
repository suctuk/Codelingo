// src/server.js
const app = require('./app');
const http = require('http');
const socketIo = require('socket.io');

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST']
  }
});

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('Client connected');

  // Handle real-time friend activity updates
  socket.on('joinUserRoom', (userId) => {
    socket.join(`user_${userId}`);
  });

  // Handle real-time messaging
  socket.on('sendMessage', (data) => {
    io.to(`user_${data.recipientId}`).emit('newMessage', {
      senderId: data.senderId,
      content: data.content
    });
  });

  // Handle friend quest updates
  socket.on('questUpdate', (data) => {
    io.to(`user_${data.friendId}`).emit('questProgress', {
      questId: data.questId,
      progress: data.progress
    });
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});