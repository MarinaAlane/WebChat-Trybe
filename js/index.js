const socket = window.io();

const form = document.querySelector('form');
const inputMessage = document.querySelector('#messageInput');
const nicknameInput = document.getElementById('nicknameInput');
const nicknameSubmitButton = document.getElementById('nickButton');
const onlineUser = document.getElementById('onlineUser');

const userIdPone = Math.ceil((Math.random() * 9).toFixed(2));
const userIdPtwo = Math.ceil((Math.random() * 2).toFixed(2));
const connectUserName = `CoCoNuTStRaWOn${userIdPone}${userIdPtwo}`;
const datatest = 'data-testid';

nicknameSubmitButton.addEventListener('click', () => {
  sessionStorage.setItem(socket.id, nicknameInput.value);

  onlineUser.innerText = sessionStorage.getItem(socket.id);

  socket.emit('onLineUsers', sessionStorage.getItem(socket.id));
});

form.addEventListener('submit', (e) => {
  e.preventDefault();

  socket.emit('message', { chatMessage: inputMessage.value, 
    nickname: sessionStorage.getItem(socket.id) || connectUserName });

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

const createUsersBox = (users) => {
  const usersUl = document.getElementById('usersBox');
  usersUl.innerHTML = '';
  users.forEach((user) => {
    const li = document.createElement('li');
    li.setAttribute(datatest, 'online-user');
    usersUl.appendChild(li);
    li.innerText = user;
  });
};

socket.on('messageServer', (message) => {
  socket.emit('onLineUsers', socket.id);
  createMessage(message);
});

socket.on('messageServer', () => {
  onlineUser.innerText = connectUserName;
});

socket.on('message', (message) => createMessage(message));

socket.on('onLineUsers', (onLineUsers) => {
  createUsersBox(onLineUsers);
});

window.onbeforeunload = () => {
  socket.disconnect();
};
