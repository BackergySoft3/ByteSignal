// script.js or wherever your frontend code is

import io from 'socket.io-client';

// Use polling fallback in serverless environments
const socket = io({
  transports: ['polling', 'websocket'],  // Fallback to polling if WebSockets are not supported
});

const sendButton = document.getElementById('send');
const messageInput = document.getElementById('message');

sendButton.addEventListener('click', () => {
  const message = messageInput.value;
  socket.emit('message', message);  // Send message to the server
  messageInput.value = '';  // Clear input field
});

// Listen for incoming messages
socket.on('message', (msg) => {
  const messageContainer = document.getElementById('messages');
  const newMessage = document.createElement('div');
  newMessage.textContent = msg;
  messageContainer.appendChild(newMessage);  // Append new message to the message container
});
