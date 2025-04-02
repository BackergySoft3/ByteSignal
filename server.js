// Import required modules
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

// Initialize express app and HTTP server
const app = express();
const server = http.createServer(app);

// Initialize Socket.IO
const io = socketIo(server);

// Serve static files from 'public' directory
app.use(express.static('public'));

// Handle incoming connections from clients
io.on('connection', (socket) => {
  console.log('a user connected');

  // Listen for messages from clients and broadcast them to all users
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

// Serve the index.html file when the user accesses the root route
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Listen on port 3000
server.listen(3000, () => {
  console.log('listening on *:3000');
});
