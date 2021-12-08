const socket = window.io();

const messagesList = document.querySelector('#messages-list');
const sendButton = document.querySelector('#send-button');
const messageInput = document.querySelector('#message-box');

const createMessage = (msg) => {
  const li = document.createElement('li');
  li.innerHTML = msg;
  messagesList.appendChild(li);
  messageInput.value = '';
};

sendButton.addEventListener('click', () => {
  const msg = messageInput.value;
  socket.emit('sendMessage', msg);
});

socket.on('serverMessage', (msg) => createMessage(msg));