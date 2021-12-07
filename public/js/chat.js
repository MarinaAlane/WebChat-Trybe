const socket = window.io();

const form = document.querySelector('form');
const inputMessage = document.querySelector('#messageInput');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  socket.emit('message', inputMessage.value);
  inputMessage.value = '';
  return false;
});

const createMessage = (message) => {
  const messagesUl = document.querySelector('#messages');
  const li = document.createElement('li');
  li.innerText = message;
  messagesUl.appendChild(li);
};

socket.on('messageServer', (message) => createMessage(message));

socket.on('message', (message) => createMessage(message.chatMessage));
