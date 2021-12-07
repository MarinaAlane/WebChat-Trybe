module.exports = (io) => io.on('connection', (socket) => {
  // socket.broadcast.emit('serverMessage', `Iiiiiirraaaa! ${socket.id} acabou de se conectar :D`);
  
  //  socket.on('disconnect', () => {
  //   socket.broadcast.emit('serverMessage', `Xiii! ${socket.id} acabou de se desconectar! :(`);
  // });

  socket.on('message', ({ chatMessage, nickname }) => {   
    const timeHour = new Date().toLocaleTimeString('pt-br', { hour12: true });
    const day = (new Date().toLocaleDateString()).replace(/\//g, '-');
    const time = `${day} ${timeHour}`;

    const userMessage = `${time} ${nickname} ${chatMessage}`;

    io.emit('message', userMessage);
  });
});