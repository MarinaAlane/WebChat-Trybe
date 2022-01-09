const generateNickname = require('../../utils/generateNick');

const socket = window.io();

window.onbeforeunload = () => {
  socket.disconnect();
};

let nickname = generateNickname();
let currentNickname = nickname;
const online = 'online-user';
const users = document.getElementById('users');
const userForm = document.getElementById('users-form');
const userInput = document.getElementById('user-input');
const messages = document.getElementById('messages');
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');

const user = document.createElement('li');
user.textContent = nickname;
user.dataset.testid = online;

window.onload = () => {
  if (!users.firstChild) {
    users.appendChild(user);
  } else {
    users.insertBefore(user, users.firstChild);
  }
  socket.emit('createUser', { currentNickname });
};

userForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (userInput.value) {
    currentNickname = nickname;
    nickname = userInput.value;
    socket.emit('changeNickname', { currentNickname, nickname });
    userInput.value = '';
  }
});

messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (messageInput.value) {
    socket.emit('message', { chatMessage: messageInput.value, nickname });
    messageInput.value = '';
  }
});

socket.on('changeNickname', (arrayUsers) => {
  users.textContent = '';
  const liUser = document.createElement('li');
  liUser.textContent = nickname;
  liUser.dataset.testid = online;
  users.appendChild(liUser);
  arrayUsers.forEach((element) => {
    const item = document.createElement('li');
    item.textContent = element;
    item.dataset.testid = online;
    if (element !== nickname) users.appendChild(item);
  });
});

socket.on('message', (message) => {
  const li = document.createElement('li');
  li.textContent = message;
  li.dataset.testid = 'message';
  messages.appendChild(li);
  window.scrollTo(0, document.body.scrollHeight);
}); 