const socket = window.io();

let nickname = '';

const messagesList = document.querySelector('#messages-list');
const sendButton = document.querySelector('#send-button');
const messageInput = document.querySelector('#message-box');

const createMessage = (msg) => {
  const li = document.createElement('li');
  li.innerHTML = msg;
  messagesList.appendChild(li);
  messageInput.value = '';
};

sendButton.addEventListener('click', () => {
  const chatMessage = messageInput.value;
  socket.emit('message', { chatMessage, nickname });
});

socket.on('message', (message) => {
  createMessage(message);
});

// Nickname

const nicknameInput = document.querySelector('#nickname-input');
const nicknameButton = document.querySelector('#nickname-button');

nicknameButton.addEventListener('click', (e) => {
  e.preventDefault();
  nickname = nicknameInput.value;
  nicknameInput.value = '';
});