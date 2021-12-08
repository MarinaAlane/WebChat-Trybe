const socket = window.io();

const chatMessage = document.getElementById('chatMessage');
const nickname = document.getElementById('nickname');
const sendMessageButton = document.getElementById('sendButton');
// const messageList = document.getElementById('user-message');

sendMessageButton.addEventListener('click', () => {
  const data = { nickname: nickname.value, chatMessage: chatMessage.value };

  socket.emit('message', data);

  socket.on('message', (newMessage) => {
    console.log(newMessage);
  });
});
