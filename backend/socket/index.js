module.exports = (io) => {
  io.on('connection', async (socket) => {
    socket.emit('userID', socket.id);

    socket.emit('youLogged', 'You are in');

    socket.broadcast.emit('userLogged', { 
      userID: socket.id,
      msg: `User ${socket.id} just joined`,
    });
  
    socket.on('message', async (clientMsg) => {
      io.emit('message', clientMsg.chatMessage);
    });
  });
};
