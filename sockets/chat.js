module.exports = (io) => io.on('connection', (socket) => {
  socket.on('message', ({ chatMessage, nickname }) => {
    const response = JSON.stringify({
      message: chatMessage,
      nickname,
      date: new Date().toLocaleDateString().replace(/[/]/g, '-'),
      time: new Date().toLocaleTimeString(),
    });

    console.log(response);

    io.emit('message', response);
  });
}); 
