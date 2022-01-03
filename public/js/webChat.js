const socket = window.io();
// const { getMessages } = require('../../controllers/messages');

const nicknameForm = document.querySelector('#nickname-form');
const nicknameInput = document.querySelector('#nickname');
const messageForm = document.querySelector('#message-form');
const messageInput = document.querySelector('#messageInput');
const dataTestId = 'data-testid';

nicknameForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const oldNickname = sessionStorage.getItem('userNickname');
  socket.emit('newNickName', {
    newNickname: nicknameInput.value,
    oldNickname,
  });
  sessionStorage.setItem('userNickname', nicknameInput.value);
  nicknameInput.value = '';
  return false;
});

const createUserList = (message) => {
  const userUl = document.querySelector('#users-online');
  userUl.innerHTML = '';
  const pageOwner = sessionStorage.getItem('userNickname');
  message.forEach((user) => {
    const li = document.createElement('li');
    li.innerText = user.randomNickname;
    li.setAttribute(dataTestId, 'online-user');
    li.setAttribute('id', user.randomNickname);
    if (user.randomNickname === pageOwner) {
      userUl.insertBefore(li, userUl.firstChild);
    } else {
      userUl.appendChild(li);
    }
  });
};

messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const userOnline = sessionStorage.getItem('userNickname');
  socket.emit('message', {
    chatMessage: messageInput.value,
    nickname: userOnline,
  });
  messageInput.value = '';
  return false;
});

const createMessage = (message) => {
  const messageUl = document.querySelector('#messages');
  const li = document.createElement('li');
  li.innerText = message;
  li.setAttribute(dataTestId, 'message');
  messageUl.appendChild(li);
};

const firstMessages = (message) => {
  const messageUl = document.querySelector('#messages');
  message.forEach((msg) => {
    const li = document.createElement('li');
    li.innerText = `${msg.timestamp} ${msg.nickname} ${msg.message}`;
    li.setAttribute(dataTestId, 'message');
    messageUl.appendChild(li);
  });
};

const randomId = () => socket.id.slice(-16);

socket.emit('teste', randomId);

socket.on('connect', () => {
  const randomNickname = socket.id.slice(0, 16);
  sessionStorage.setItem('userNickname', randomNickname);
  socket.emit('userLoggedIn', randomNickname);
});

socket.on('userLoggedIn', (message) => {
  createUserList(message);
});

socket.on('histMessages', (histMessages) => {
  firstMessages(histMessages);
});

socket.on('newNickName', (message) => {
  createUserList(message);
});

socket.on('message', (message) => {
  createMessage(message);
});
