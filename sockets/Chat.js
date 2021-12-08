module.exports = (io) => {
  io.on('connection', (socket) => {
    // socket.emit('ola', `Usuário conectado. ID: ${socket.id}`);
    socket.on('sendMessage', (msg) => {
      io.emit('serverMessage', `${socket.id}: ${msg}`);
    });
  });  
};
