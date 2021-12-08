const socket = window.io('http://localhost:3000');

let nickname = null;

const divUser = document.querySelector('#users');
socket.on('connection', (id) => {
  nickname = id;
  const liUsers = document.createElement('li');
  liUsers.innerText = id;
  divUser.appendChild(liUsers);
});

const divMessages = document.querySelector('#messages');
const inputMessage = document.querySelector('#message');
const formMessage = document.querySelector('#message_form');
formMessage.addEventListener('submit', (e) => {
  e.preventDefault();
  const chatMessage = inputMessage.value;
  socket.emit('message', { chatMessage, nickname });
});

socket.on('message', (inform) => {
  const liMessage = document.createElement('li');
  liMessage.innerText = inform;
  divMessages.appendChild(liMessage);
});
