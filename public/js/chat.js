const io = require('socket.io');

const socket = io('http://localhost:3000');

function renderMessage(message) {
  const divMsgs = document.querySelector('.messages');
  const paragraph = document.createElement('p');
  divMsgs.append(message, paragraph);
}

socket.on('prevMsg', (messages) => {
  messages.forEach((message) => {
    renderMessage(message);
  });
});

socket.on('message', (message) => {
  renderMessage(message);
});

const chatForm = document.querySelector('#chat');

chatForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const user = document.querySelector('input[name="username"]').value;

  const message = document.querySelector('input[name="message"]').value;

  if (user.length && message.length) {
    const messageObject = {
      chatMessage: message,
      nickname: user,
    };

    renderMessage(messageObject);

    socket.emit('message', messageObject);
  }
});