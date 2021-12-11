const socket = window.io();

const form = document.getElementById('form');
const messageBox = document.getElementById('message-box');
// const nickname = 'Admin';

form.addEventListener('submit', (e) => {
  e.preventDefault();
  socket.emit('message', {
    nickname: 'Admin',
    chatMessage: messageBox.value,
  });
  messageBox.value = '';
});

const newMessage = (message) => {
  console.log(
    `${message.createdAt} - ${message.nickname}: ${message.chatMessage}`,
  );
};

socket.on('message', newMessage);
socket.on('joined', (msg) => console.log(msg));
socket.on('endConnection', (msg) => console.log(msg));
