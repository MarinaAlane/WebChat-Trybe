module.exports = (io) => io.on('connection', (socket) => {
  socket.on('clientMessage', (message) => {
    console.log(`Mensagem: ${message}`);
    console.log(`${socket.id}`);
    io.emit('serverMessage', message);
  });
});