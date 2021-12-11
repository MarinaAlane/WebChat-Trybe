const socket = window.io();

const form = document.querySelector('form');
const nick = document.querySelector('#nickName');
const msg = document.querySelector('#messageInput');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (nick.value === '') nick.value = socket.id;
  socket.emit('message', { chatMessage: msg.value, nickname: nick.value });
  msg.value = '';
  return false;
});

const createMessage = (message) => {
  const messagesUl = document.querySelector('#messages');
  const li = document.createElement('li');
  li.innerText = message;
  messagesUl.appendChild(li);
};

// socket.on('message', (messages) => messages.map(
//   (message) => createMessage(message),
// ));
socket.on('message', (message) => createMessage(message));
