const socket = window.io();
const formMessages = document.querySelector('#formMessages');

formMessages.addEventListener('submit', (e) => {
  const messageInput = document.querySelector('#messageInput');
  const nicknameInput = document.querySelector('#nicknameInput');
  e.preventDefault();
 
  const message = messageInput.value;
  messageInput.value = '';
  const nickname = nicknameInput.value;
  // nicknameInput.value = '';

  const data = {
    chatMessage: message,
    nickname,
  };
  
  // console.log({ data });

  socket.emit('message', data);
}); 