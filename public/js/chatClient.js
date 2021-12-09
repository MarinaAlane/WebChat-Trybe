const socket = window.io();

const form = document.querySelector('#form');
// const nickName = document.querySelector('#nickname');
const input = document.querySelector('#input');
const messages = document.querySelector('#messages');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (input.value) {
    socket.emit('message', { chatMessage: input.value, nickname: socket.id });
    input.value = '';
  }
});

const createMessage = (message) => {
  const li = document.createElement('li');
  li.textContent = message;
  messages.appendChild(li);
  window.scrollTo(0, document.body.scrollHeight);
};

// evento será disparado pelo message
socket.on('message', (message) => createMessage(message));