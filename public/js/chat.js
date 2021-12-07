const socket = window.io();

const messageForm = document.querySelector('#messageForm');
const inputMessage = document.querySelector('#messageInput');

const nicknameForm = document.querySelector('#nicknameForm');
const nicknameInput = document.querySelector('#nicknameInput');

const nickNameUser = document.querySelector('#nickname');

messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const chatMessage = inputMessage.value;
  const nickname = sessionStorage.getItem('nickname');
  socket.emit('message', { chatMessage, nickname });
  inputMessage.value = '';
  return false;
});

nicknameForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const newNickname = nicknameInput.value;
  socket.emit('serverMessage', newNickname);
  nicknameInput.value = '';
  return false;
});

const formatMessage = (message) => {
  if (message.name) return message.message;
  return message;
};

const createMessage = async ({ message, origin }) => {
  if (message.name) {
    sessionStorage.setItem('nickname', message.name);
    nickNameUser.innerText = message.name;
  }

  const returnFormatMessage = formatMessage(message);
  const messagesUl = document.querySelector('#messages');
  const li = document.createElement('li');
  li.innerText = returnFormatMessage;
  if (origin === 'message') li.setAttribute('data-testid', 'message');
  messagesUl.appendChild(li);
};

const updateUsers = (users) => {
  const usersList = document.querySelector('#users');
  usersList.innerHTML = '';
  users.forEach((user) => {
    const li = document.createElement('li');
    li.innerText = user;
    li.setAttribute('data-testid', 'online-user');
    usersList.appendChild(li);
  });
};

socket.on('serverMessage', (message) => createMessage({ message, origin: 'serverMessage' }));
socket.on('message', (message) => createMessage({ message, origin: 'message' }));
socket.on('users', (users) => updateUsers(users));