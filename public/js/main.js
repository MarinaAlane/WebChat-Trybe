const socket = window.io();
const btnSendMessage = document.getElementById('send');

btnSendMessage.addEventListener('click', () => {
  const messageInput = document.getElementById('message');
  const nickname = document.getElementById('nickname').value;
  const message = messageInput.value;
  messageInput.value = '';
  
  const data = {
    chatMessage: message,
    nickname,
  };

  socket.emit('message', data);
});