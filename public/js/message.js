const socket = window.io();

const userNicknameBox = document.querySelector('#online-user');
const nickname = [...Array(16)].map(() => Math.floor(Math.random() * 10)).join('');
userNicknameBox.innerText = nickname;
window.sessionStorage.setItem('nickname', nickname);

const form = document.querySelector('form');
const inputMessage = document.querySelector('#message-box');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const nick = window.sessionStorage.getItem('nickname');
  socket.emit('message', { nickname: nick, chatMessage: inputMessage.value });
  inputMessage.value = '';
  return false;
});

const messagesList = document.querySelector('#messages-list');
socket.on('message', (message) => {
  const li = document.createElement('li');
  li.innerText = message;
  li.setAttribute('data-testid', 'message');
  messagesList.appendChild(li);
});

const nicknameBox = document.querySelector('#nickname-box');
const nicknameButton = document.querySelector('#nickname-button');
nicknameButton.addEventListener('click', () => {
  window.sessionStorage.setItem('nickname', nicknameBox.value);
  userNicknameBox.innerText = nicknameBox.value;
  nicknameBox.value = '';
});