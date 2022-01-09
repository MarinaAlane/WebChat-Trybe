const socket = window.io();

const form = document.querySelector('#form');
const inputName = document.querySelector('#nickname-box');
const inputMsg = document.querySelector('#message-box');
const btnSalvar = document.querySelector('#nickname-button');
const ulMsg = document.querySelector('#message');
const ulUsers = document.querySelector('#users');

let nickname = '';

form.addEventListener('submit', (event) => {
  event.preventDefault();
  
  socket.emit('message', { nickname, chatMessage: inputMsg.value });
});

function createUser(user) {
  const li = document.createElement('li');
  li.innerText = user;

  li.setAttribute('data-testid', 'online-user');
  ulUsers.appendChild(li);
}

btnSalvar.addEventListener('click', () => {
  nickname = inputName.value;
});

function createMessage(msg) {
  const li = document.createElement('li');
  li.innerText = msg;

  li.setAttribute('data-testid', 'message');
  ulMsg.appendChild(li);
}

socket.on('message', createMessage);
socket.on('user', createUser);
