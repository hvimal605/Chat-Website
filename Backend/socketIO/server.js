const { Server } = require('socket.io');
const http = require('http');
const { app } = require('../index'); // Adjust the path as per your actual directory structure

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://harshspark-chat-web.netlify.app",
    methods: ["GET", "POST"],
  },
});

const users = {};

// Function to get recipient's socket ID
const getRececiverSocketId = (receiverId) => {
  return users[receiverId];
};

io.on("connection", (socket) => {
  console.log('A user connected', socket.id);
  const userId = socket.handshake.query.userId;

  if (userId) {
    users[userId] = socket.id;
    console.log("Hello", users);
  }

  io.emit('getOnlineUsers', Object.keys(users));

  socket.on('typing', (data) => {
    const { senderId, receiverId, isTyping } = data;
    const receiverSocketId = getRececiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit('typing', { senderId, isTyping });
    }
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected', socket.id);
    delete users[userId];
    io.emit('getOnlineUsers', Object.keys(users));
  });
});

module.exports = { server, io, getRececiverSocketId };
