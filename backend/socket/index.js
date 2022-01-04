module.exports = (io) => {
  io.on('connection', (socket) => {

    socket.emit('userID', socket.id);

    socket.emit('youLogged', "You've join");

    io.emit('userLogged', { 
      userID: socket.id,
      msg: `User ${socket.id} acabou de entrar`
    });
  
    socket.on('message', clientMsg => {
      io.emit('serverBroadcast', clientMsg.chatMessage);
    })

  });
}