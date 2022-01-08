const socket = window.io();

const form = document.querySelector('form');
const inputMessage = document.querySelector('#messageInput');

// let userNick = (socket.id).slice(0, 15);

form.addEventListener('submit', (e) => {
  e.preventDefault();
  socket.emit('message', { chatMessage: inputMessage.value });
  inputMessage.value = '';
  return false;
});

const createUser = (user) => {
  const usersUl = document.querySelector('#online-users');
  const li = document.createElement('li');
  li.setAttribute('data-testid', 'online-user');
  li.innerText = user;
  usersUl.appendChild(li);
};

const createMessage = (message) => {
  const messagesUl = document.querySelector('#messages');
  const li = document.createElement('li');
  li.setAttribute('data-testid', 'message');
  li.innerText = message;
  messagesUl.appendChild(li);
};

socket.on('message', (mensagem) => createMessage(mensagem));
socket.on('newUser', (newUser) => createUser(newUser));
