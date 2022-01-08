const socket = window.io();

const nickname = 'Leandro';
const chatMessage = 'Olá à todos';

socket.emit('message', { nickname, chatMessage });
socket.on('message', (msg) => {
  console.log(msg);
});
