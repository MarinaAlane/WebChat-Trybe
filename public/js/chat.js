const socket = window.io();

socket.emit('message', {
    nickname: 'Freddy',
    chatMessage: 'Web Chat Project',
});

socket.on('message', (msg) => {
   console.log(msg);
});