const socket = window.io();

const form = document.querySelector('#form');
const zoeiro = document.querySelector('#zoeiros');
const zoeira = document.querySelector('#zoeiras');
const messageBox = document.querySelector('#message-box');
const nicknameBox = document.querySelector('#nickname-box');
const nicknameButton = document.querySelector('#nickname-button');

let nickname = '';

form.addEventListener('submit', (event) => {
  event.preventDefault();

  socket.emit('message', {
    nickname,
    chatMessage: messageBox.value,
  });
  
  messageBox.value = '';
});

nicknameButton.addEventListener('click', () => {
  nickname = nicknameBox.value;
  nicknameBox.value = '';

  socket.emit('saveZoeiro', nickname);
});

const createMessage = (message) => {
  const li = document.createElement('li');
  li.innerText = message;

  li.setAttribute('data-testid', 'message');
  zoeira.appendChild(li);
};

const createUser = (newZoeiro) => {
  nickname = newZoeiro;

  socket.emit('usersOnline');
};

const setUserList = (zoeiroList) => {
  zoeiro.innerHTML = '';

  const clientUser = zoeiroList.find((zoador) => zoador.id === socket.id);

  const li = document.createElement('li');
  li.innerText = clientUser.nickname;

  li.setAttribute('data-testid', 'online-user');
  
  zoeiro.appendChild(li);
};

socket.on('message', createMessage);
socket.on('newUser', createUser);
socket.on('usersOnline', setUserList);
