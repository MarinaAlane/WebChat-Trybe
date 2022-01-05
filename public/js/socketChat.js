// const { delMsg } = require("../../models/msgsModel");

const socket = window.io();

const formMsg = document.querySelector('#form-messages');
const inputMsg = document.querySelector('#messageInput');
const formNick = document.querySelector('#form-nickname');
const inputNick = document.querySelector('#nicknameInput');
const msg = document.querySelector('#messages');
const users = document.querySelector('#online-users');

let list = [];

// sessionStorage
const setNick = (nickname) => sessionStorage.setItem('nickname', nickname);
const getNick = () => sessionStorage.nickname || (socket.id.substr(1, 16));
const firstNick = () => {
  if (typeof socket.id === 'string') {
    const nick = socket.id.substr(1, 16);
    setNick(nick);
  }
};

const firstMessage = (message) => {
  const li = document.createElement('li');
  li.innerText = message;
  msg.appendChild(li);
};

const createMessage = (message) => {
  const li = document.createElement('li');
  li.setAttribute('data-testid', 'message');
  li.innerText = message;
  msg.appendChild(li);
};

const createUser = (nick) => {
  const li = document.createElement('li');
  li.setAttribute('data-testid', 'online-user');
  li.innerText = nick;
  users.appendChild(li);
};

const renderAll = () => {
  users.innerHTML = '';
  const newName = getNick();
  console.log('get session', newName);
  createUser(newName);
  list.forEach((e) => {
    if (newName !== e) {
      createUser(e);
    }
  });
};

const sendoToUser = () => {
  socket.emit('userListFromClient', list);
};

const addNewUserInList = (user) => {
  list.push(user);
  renderAll();
  sendoToUser();
};

const updateUserList = (user) => {
  if (user.length > list.length) {
    list = user;
    renderAll();
  }
};

const updateUserServer = () => {
  const prev = getNick();
  const newNick = inputNick.value;
  const index = list.indexOf(prev);
  list[index] = newNick;
  setNick(newNick);
  socket.emit('serverUpdateNickname', newNick);
  inputNick.value = '';
  renderAll();
};

const updateUserToList = ({ previewNickname, nickname }) => {
  const index = list.indexOf(previewNickname);
  list[index] = nickname;
  renderAll();
};

const removeUserList = (name) => {
  // console.log('remove before', name);
  const index = list.indexOf(name);
  list.splice(index, 1);
  renderAll();
};

const reqMessage = () => {
  socket.emit('serverAllMessage');
  // delMsg();
};

const loadMessages = (messages) => {
  messages.forEach((e) => {
    const { text, nickname, timestamp } = e;
    const renderMsg = `${timestamp} - ${nickname}: ${text}`;
    createMessage(renderMsg);
  });
};

formMsg.addEventListener('submit', (e) => {
  e.preventDefault();
  const nick = getNick();
  socket.emit('message', { chatMessage: inputMsg.value, nickname: nick });
  inputMsg.value = '';
  return false;
});

formNick.addEventListener('submit', (e) => {
  e.preventDefault();
  updateUserServer();
  return false;
});

socket.on('serverMessage', (message) => firstMessage(message));
socket.on('message', (message) => createMessage(message));
socket.on('serverUser', (newUser) => addNewUserInList(newUser));
socket.on('serverAllUsers', (all) => updateUserList(all));
socket.on('serverUpdateNickname', (newNick) => updateUserToList(newNick));
socket.on('serverRemoveUser', (user) => removeUserList(user));
socket.on('serverLoadMessage', (messages) => loadMessages(messages));

window.onload = () => {
  firstNick();
  reqMessage();
};
