const socket = window.io();

const form = document.querySelector('form');
const inputMessage = document.querySelector('#messageInput');
const nicknameInput = document.getElementById('nicknameInput');
const nicknameSubmitButton = document.getElementById('nickButton');
const onlineUser = document.getElementById('onlineUser');

const datatest = 'data-testid';

nicknameSubmitButton.addEventListener('click', () => {
  sessionStorage.setItem((socket.id).substring(0, 16), nicknameInput.value);

  onlineUser.innerText = sessionStorage.getItem((socket.id).substring(0, 16));

  socket.emit('nickname', { socketId: (socket.id).substring(0, 16),
    nickname: sessionStorage.getItem((socket.id).substring(0, 16)) });

  const usernicks = document.getElementsByClassName('online');
  for (let i = 0; i < usernicks.length; i += 1) {
    if (usernicks[i].innerText === (socket.id).substring(0, 16)) {
      usernicks[i].innerText = nicknameInput.value;
    }
  }
});

form.addEventListener('submit', (e) => {
  e.preventDefault();

  socket.emit('message', { chatMessage: inputMessage.value, 
    nickname: sessionStorage
      .getItem((socket.id).substring(0, 16)) || (socket.id).substring(0, 16) });

  inputMessage.value = '';
  return false;
});

const createMessage = (message) => {
  const messagesUl = document.querySelector('#messages');
  const messagesLi = document.createElement('li');
  messagesLi.setAttribute(datatest, 'message');
  messagesLi.innerText = message;
  messagesUl.appendChild(messagesLi);
};

const createUsersBox = (user) => {
  const usersUl = document.getElementById('usersBox');
  const li = document.createElement('li');
  li.setAttribute(datatest, 'online-user');
  li.setAttribute('class', 'online');
  usersUl.appendChild(li);
  li.innerText = user;
};

socket.on('messageServer', (message) => {
  onlineUser.innerText = (socket.id).substring(0, 16);

  createMessage(message);
});

socket.on('onLineUsers', (usersId) => {
  const lastPosition = usersId[usersId.length - 1];
  createUsersBox(lastPosition);
  for (let i = 0; i < usersId.length; i += 1) {
    if (usersId[i] !== usersId[usersId.length - 1]) {
      createUsersBox(usersId[i]);
    }
  }
});

socket.on('message', (message) => createMessage(message));

socket.on('connection', (onLineUser) => createUsersBox(onLineUser));

socket.on('users', (id) => {
  const usernicks = document.getElementsByClassName('online');
  for (let i = 0; i < usernicks.length; i += 1) {
    if (usernicks[i].innerText === id) return usernicks[i].remove();
  }
});

socket.on('usersUpdate', (socketId, nickname) => {
  const usernicks = document.getElementsByClassName('online');
  for (let i = 0; i < usernicks.length; i += 1) {
    if (usernicks[i].innerText === socketId) {
      usernicks[i].innerText = nickname;
    }
  }
});

window.onbeforeunload = () => {
  socket.disconnect();
};
