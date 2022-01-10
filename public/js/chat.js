const socket = window.io();

const DATA_TEST_ID = 'data-testid';
const Allusers = document.querySelector('#users');
const form = document.querySelector('#form');
const nickNameInput = document.querySelector('#nickname-box');
const allMessages = document.querySelector('#messages');
const messageInput = document.querySelector('#message-box');
const nicknameBtn = document.querySelector('#nickname-button');

let nickname = '';

form.addEventListener('submit', (event) => {
  event.preventDefault();
  socket.emit('message', {
    nickname,
    chatMessage: messageInput.value,
  });
});

nicknameBtn.addEventListener('click', () => {
  nickname = nickNameInput.value;
  nickNameInput.value = '';
  socket.emit('saveNick', nickname);
});

const createnewMessage = (message) => { 
  const li = document.createElement('li'); 
  li.innerText = message; 
  li.setAttribute(DATA_TEST_ID, 'message'); 
  allMessages.appendChild(li); 
};

const createNewUser = (newNick) => {
  nickname = newNick;
  socket.emit('onlineUsers');
};

const listingUsers = (user) => {
  const li = document.createElement('li');
  li.innerText = user.nickname;
  li.setAttribute(DATA_TEST_ID, 'online-user');
  Allusers.appendChild(li);
};

const settleListUsers = (listUsers) => {
  Allusers.innerText = '';
  const user = listUsers.find((useR) => useR.id === socket.id);
  listingUsers(user);
  listUsers.forEach((u) => u.id !== socket.id && listingUsers(u));
};

const getAllMessages = (listMsgs) => {
  listMsgs.forEach((message) => {
    createnewMessage(`${message.timestamp} - ${message.nickname}: ${message.message}`);
  });
};

socket.on('message', createnewMessage);
socket.on('newUser', createNewUser);
socket.on('onlineUsers', settleListUsers);
socket.on('getAllMessages', getAllMessages);
