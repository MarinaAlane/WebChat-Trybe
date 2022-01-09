const socket = window.io();

const form = document.querySelector('form');
const input = document.querySelector('#message-input');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log(input.value);
  socket.emit('message', { message: input.value, nickname: 'henrique' });
  input.value = '';
  return false;
});

socket.on('message', (message) => {
  const chat = document.querySelector('#message-list');
  const li = document.createElement('li');
  li.innerText = message;
  chat.appendChild(li);
});