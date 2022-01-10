const socket = window.io();
const messages = document.querySelector('#messages');
const form = document.querySelector('#form');
const inputNickname = document.querySelector('#input-nickname');
const inputChat = document.querySelector('#input-chat');
const buttonChangeNickName = document.querySelector('#button-change-nickname');
const nickname = document.querySelector('#nickname');
const dataTestId = 'data-testid';

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (inputChat.value) {
    socket.emit('message', {
      chatMessage: inputChat.value, nickname: nickname.innerText,
    });

    inputChat.value = '';
  }
});

nickname.innerText = ([...Array(2)]
.map((_i) => ((Math.random() * 36)).toString(36)).join('').slice(2, 10) + [...Array(2)]
.map((_i) => ((Math.random() * 36)).toString(36)).join('').slice(2, 10));

buttonChangeNickName.addEventListener('click', () => {
  nickname.innerText = inputNickname.value;
  socket.emit('changeNickname', nickname.innerText);
});

socket.on('message', (msg) => {
const newMessage = document
  .createElement('li');
  newMessage.setAttribute(dataTestId, 'message');
newMessage.innerText = msg;
messages.appendChild(newMessage);
});

socket.on('conectedUsers', (users) => {
  const conUsers = document.getElementById('users');
  conUsers.innerHTML = '';
  const conectedUsers = [];
  const liUser = document.createElement('li');
  liUser.setAttribute(dataTestId, 'online-user');
  liUser.innerText = nickname.innerText;
  conectedUsers.push(liUser);

  users.forEach((user) => {
    if (user !== nickname.innerText) {
      const li = document.createElement('li');
      li.setAttribute(dataTestId, 'online-user');
      li.innerText = user;
      conectedUsers.push(li);
    }
  });

  conectedUsers.forEach((user) => {
    conUsers.appendChild(user);
  });
});

window.onload = () => {
  socket.emit('newUser', nickname.innerText);
};
