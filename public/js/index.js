const socket = window.io();

const form = document.getElementById('form');
const messageBox = document.getElementById('message-box');
const nicknameBox = document.getElementById('nickname-box');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  socket.emit('message', {
    nickname: nicknameBox.value,
    chatMessage: messageBox.value,
  });
  messageBox.value = '';
});

const newMessage = (message) => {
  console.log(message);
};

socket.on('message', newMessage);
socket.on('joined', (msg) => console.log(msg));
socket.on('endConnection', (msg) => console.log(msg));
