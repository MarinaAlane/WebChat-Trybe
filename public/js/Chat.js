const socket = window.io();

// PAGE ELEMENTS

const nicknameList = document.querySelector('#online-list');
const nicknameBox = document.querySelector('#nickname-box');
const nicknameButton = document.querySelector('#nickname-button');

const messageList = document.querySelector('#message-list');
const sendButton = document.querySelector('#send-button');
const messageBox = document.querySelector('#message-box');

// HELP FUNCTIONS

const createLi = (html, className) => {
  const li = document.createElement('li');
  li.innerHTML = html;
  li.className = className;
  return li;
};

const createUser = (nickname, user) => {
  const nicknameHTML = createLi(nickname, user);
  nicknameHTML.setAttribute('data-testid', 'online-user');
  nicknameList.appendChild(nicknameHTML);
};

const updateUser = (user, nickname) => {
  const userTag = document.querySelector(`.${user}`);
  userTag.innerHTML = nickname;
};

// ENTER CHAT

socket.on('enterChat', () => {
  const user = `_${socket.id.substring(0, 15)}`;
  sessionStorage.setItem(user, user);
  socket.emit('addOnlineUser', user);
});

// NICKNAME CREATING

socket.on('addOnlineUser', (user) => {
  createUser(user, user);
});

// NICKNAME UPDATE

nicknameButton.addEventListener('click', () => {
  const newNickname = nicknameBox.value;
  const user = `_${socket.id.substring(0, 15)}`; 
  socket.emit('updateNickname', { user, newNickname });
  return false;
});

socket.on('updateNickname', ({ user, newNickname }) => {
  sessionStorage.setItem(user, newNickname);
  updateUser(user, newNickname);
});

// MESSAGE CREATING

const createMessage = (date, chatMessage, nickname) => {
  const li = document.createElement('li');

  li.className = 'message';
  li.setAttribute('data-testid', 'message');
  li.innerHTML = `${nickname}: ${chatMessage}`;

  messageList.appendChild(li);
  return false;
};

sendButton.addEventListener('click', (e) => {
  e.preventDefault();
  const user = `_${socket.id.substring(0, 15)}`; 
  const nickname = sessionStorage.getItem(user);
  const chatMessage = messageBox.value;

  socket.emit('message', { chatMessage, nickname });
});

socket.on('message', ({ date, chatMessage, nickname }) => {
  createMessage(date, chatMessage, nickname);
});
