import { Server } from 'socket.io';

export default function handler(req, res) {
  if (res.socket.server.io) {
    console.log("Socket.io is already running");
    res.end();
    return;
  }

  const io = new Server(res.socket.server);

  io.on('connection', (socket) => {
    console.log('A user connected');
    
    socket.on('message', (msg) => {
      io.emit('message', msg);  // Broadcast message to all users
    });

    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  });

  res.socket.server.io = io;
  res.end();
}
