module.exports = (io) => io.on('connection', (socket) => {
  console.log(`Cliente ${socket.id} se conectou`);
  
  socket.on('message', ({ chatMessage, nickname }) => {
    const response = JSON.stringify({
      message: chatMessage,
      nickname,
      date: new Date().toLocaleDateString().replace(/[/]/g, '-'),
      time: new Date().toLocaleTimeString(),
    });

    io.emit('message', response);
  });
}); 
