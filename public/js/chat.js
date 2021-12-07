const socket = window.io();

const messageForm = document.querySelector('.messageForm');
const nickinameForm = document.querySelector('.nicknameForm');
const nicknameInput = document.querySelector('#messageInput');
const messageInput = document.querySelector('#messageInput');

messageForm.addEventListener('submit', (e) => {
  const message = messageInput.value;
  e.preventDefault();
  socket.emit('message', message);
  messageInput.value = '';
  return false;
});

nickinameForm.addEventListener('submit', (e) => {
  const nickname = nicknameInput.value;
  e.preventDefault();
  socket.emit('message', nickname);
  messageInput.value = '';
  return false;
});