const socket = window.io();

socket.on('connect', () => {
  console.log('usuário conectado');
});

socket.emit('newMessage', { // emitindo mensagem para o servidor
  nickname: 'leon',
  chatMessage: 'Olá',
});

socket.on('message', (message) => { // cada cliente conectado, vai ouvir a mensagem já formatada, vinda do servidor
  console.log(message);
});
