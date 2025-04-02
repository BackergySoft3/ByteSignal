// Connect to the server using Socket.IO
const socket = io();

// DOM elements
const sendButton = document.getElementById('send');
const messageInput = document.getElementById('message');
const messagesContainer = document.getElementById('messages');
const usernameInput = document.getElementById('username');

let username = '';

// Handle the 'send' button click event
sendButton.addEventListener('click', () => {
  // Ensure the username is set
  if (!username && usernameInput.value) {
    username = usernameInput.value;
    usernameInput.style.display = 'none'; // Hide username input after it's entered
  }

  // Get the message and ensure it's not empty
  const message = messageInput.value.trim();
  if (message === '') {
    return;
  }

  // Emit the message to the server
  socket.emit('chat message', { username, message });

  // Clear the message input
  messageInput.value = '';
});

// Listen for 'chat message' events from the server
socket.on('chat message', (data) => {
  // Create a message div for the incoming message
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message');
  messageDiv.innerHTML = `<span>${data.username}</span>: ${data.message}`;

  // Append the new message to the messages container
  messagesContainer.appendChild(messageDiv);

  // Scroll to the bottom of the messages container
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
});

// Send message when Enter key is pressed
messageInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    sendButton.click();
  }
});
