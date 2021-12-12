const socket = window.io();

const nickname = 'sergio';

const sendMessage = (e) => {
  e.preventDefault();
  const chatInput = document.querySelector('#chat-input');

  socket.emit('message', { 
    chatMessage: chatInput.value, 
    nickname, 
  });

  chatInput.value = '';
};

document.querySelector('#chat-form').addEventListener('submit', sendMessage);

const displayMessage = (data) => {
  const { message } = JSON.parse(data);
  const messagesContainer = document.querySelector('.messages-container');

  const messageBox = document.createElement('li');
  messageBox.innerHTML = message;

  messagesContainer.appendChild(messageBox);
};

socket.on('message', displayMessage);