const socket = window.io();

socket.emit('message', {
  nickname: 'Pedro',
  chatMessage: 'Web Chat projeto',
});
socket.on('message', (msg) => {
  console.log(msg);
});
