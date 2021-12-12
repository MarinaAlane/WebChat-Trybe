const socket = window.io();

socket.emit('message', { chatMessage: 'ola', nickname: 'sergio' });

socket.on('message', (message) => {
  console.log(message);
});