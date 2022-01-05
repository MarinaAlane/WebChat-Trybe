const socket = window.io();

const userNicknameBox = document.querySelector('#online-user');
const nickname = [...Array(16)].map(() => Math.floor(Math.random() * 10)).join('');
userNicknameBox.innerText = nickname;
window.sessionStorage.setItem('nickname', nickname);
socket.emit('connectUser', { nickname });

const form = document.querySelector('form');
const inputMessage = document.querySelector('#message-box');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const nick = window.sessionStorage.getItem('nickname');
  socket.emit('message', { nickname: nick, chatMessage: inputMessage.value });
  inputMessage.value = '';
  return false;
});

const messagesFeed = document.querySelector('#messages-list');

const createMessage = (message) => {
  const li = document.createElement('li');
  li.innerText = message;
  li.setAttribute('data-testid', 'message');
  messagesFeed.appendChild(li);
};

socket.on('message', (message) => createMessage(message));

const nicknameBox = document.querySelector('#nickname-box');
const nicknameButton = document.querySelector('#nickname-button');

nicknameButton.addEventListener('click', () => {
  window.sessionStorage.setItem('nickname', nicknameBox.value);
  socket.emit('connectUser', { nickname: nicknameBox.value });
  userNicknameBox.innerText = nicknameBox.value;
  nicknameBox.value = '';
});

const usersList = document.querySelector('#online-users-list');
socket.on('updateConnectedUsers', (connectedUsers) => {
  usersList.innerHTML = '';
  connectedUsers.forEach((user) => {
    if (user.id === socket.id) return null;
    const li = document.createElement('li');
    li.innerText = user.nickname;
    li.setAttribute('data-testid', 'online-user');
    usersList.appendChild(li);
  });
});