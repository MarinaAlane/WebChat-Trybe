const socket = window.io();

const generateRandomNick = () => {
  const alfabeto = 'abcdefghijklmnopqrstuvxzwy';
  let nick = '';
  for (let i = 0; i < 16; i += 1) {
    nick += alfabeto[Math.floor(Math.random() * 26)];
  }
  socket.on('nickname', (lala) => console.log(lala));
  return nick;
};

sessionStorage.setItem('nickname', generateRandomNick());

// CHAT

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
  const nickname = sessionStorage.getItem('nickname');
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
  sessionStorage.setItem('nickname', nicknameInput.value);
  nicknameInput.value = '';
});