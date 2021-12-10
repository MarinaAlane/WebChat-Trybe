const socket = window.io();

socket.on('connect', () => {
  console.log('Cliente conectado ao servidor');
});
