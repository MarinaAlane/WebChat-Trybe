const socket = window.io();

const randomName = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 16);

const userNicknameContainer = document.querySelector('#online-user');
userNicknameContainer.innerText = randomName;
window.sessionStorage.setItem('nickname', randomName);
socket.emit('connectUser', { randomName });

const form = document.querySelector('form');
const inputMessage = document.querySelector('#messageInput');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const username = window.sessionStorage.getItem('nickname');
  socket.emit('message', { nickname: username, chatMessage: inputMessage.value });
  inputMessage.value = '';
  return false;
});

const createMessage = (message) => {
  const messagesUl = document.querySelector('#chat-messages');
  const li = document.createElement('li');
  li.innerText = message;
  li.setAttribute('data-testid', 'message');
  messagesUl.appendChild(li);
};

const nicknameBox = document.querySelector('#nickname-box');
const nicknameButton = document.querySelector('#nickname-button');
nicknameButton.addEventListener('click', () => {
  window.sessionStorage.setItem('nickname', nicknameBox.value);
  socket.emit('connectUser', { nickname: nicknameBox.value });
  userNicknameContainer.innerText = nicknameBox.value;
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

socket.on('message', (message) => createMessage(message));
