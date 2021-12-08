const socket = window.io();

// inputs
const nameInput = document.querySelector('#nameInput');
const messageInput = document.querySelector('#messageInput');

// uls
const usersUl = document.querySelector('#usersUl');
const chatUl = document.querySelector('#chatUl');

// buttons
const enterButton = document.querySelector('#enterButton');
const sendButton = document.querySelector('#sendButton');

let nickHash;

socket.on('connection', (hashNick) => {
  nickHash = hashNick;
  const usersLi = document.createElement('li');
  usersLi.innerText = hashNick;
  usersUl.appendChild(usersLi);
});

// Insere os usuários
enterButton.addEventListener('click', (e) => {
  e.preventDefault();
  socket.emit('userEnter', nameInput.value);
});

const showUsers = (user) => {
  const usersLi = document.createElement('li');
  usersLi.innerText = user;
  usersUl.appendChild(usersLi);
};

socket.on('userLogin', (user) => showUsers(user));

// Insere as mensagens
sendButton.addEventListener('click', (e) => {
  e.preventDefault();
  const chatMessage = messageInput.value;
  const nickname = nickHash;
  socket.emit('message', { chatMessage, nickname });
});

const showMessages = (message) => {
  const messageLi = document.createElement('li');
  messageLi.innerText = message;
  chatUl.appendChild(messageLi);
};

socket.on('message', (message) => showMessages(message));
