const socket = window.io();

const nickName = document.getElementById('nickname-box');
const messageBox = document.getElementById('message-box');
const buttonMessage = document.getElementById('send-message');

buttonMessage.addEventListener('click', (event) => {
  event.preventDefault();

  socket.emit('sendMessage', {
    nickname: nickName.value,
    chatMessage: messageBox.value,
  });
});

socket.on('resMessage', (res) => {
  console.log(res);
});
