module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`${socket} conectado`);
  
    socket.on('message', ({ nickname, chatMessage }) => {
      const date = new Date();
      const hour = date.toLocaleTimeString();
      const dateFormated = date.toISOString().split('T')[0].split('-').reverse().join('-');
      const completeDate = `${dateFormated} ${hour}`;
      io.emit('message', `${completeDate} - ${nickname}: ${chatMessage}`);
    });
  });
};