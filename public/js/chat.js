const socket = window.io();

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
  li.setAttribute('data-testid', 'message'); 
  allMessages.appendChild(li); 
}; 

const createNewUser = (newNick) => {
  nickname = newNick;
  socket.emit('onlineUsers');
};

const settleListUsers = (listUsers) => {
  Allusers.innerText = '';
  const user = listUsers.find((useR) => useR.id === socket.id);
  const li = document.createElement('li'); 
  li.innerText = user.nickname;
  li.setAttribute('data-testid', 'online-user');
  Allusers.appendChild(li);
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
