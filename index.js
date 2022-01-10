const socket = window.io();

const form = document.querySelector('form');
const newMessage = document.querySelector('#messageInput');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  socket.emit('message', { nickaname: socket.id, chatMessage: newMessage.value });
  newMessage.value = '';
});

const createMessage = (message) => {
  const chatMessage = document.querySelector('#messages');
  const li = document.createElement('li');
  li.innerText = message;
  li.setAttribute('data-testid', 'message');
  chatMessage.appendChild(li);
};

socket.on('message', (message) => createMessage(message));
