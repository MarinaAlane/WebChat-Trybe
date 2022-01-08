module.exports = (io) => io.on('connection', (socket) => {
  socket.on('message', ({ chatMessage, nickname }) => {
    const date = new Date().toLocaleString('pt-BR');
    const formatedDate = date.replace(/\//g, '-');
    console.log(formatedDate);
    io.emit('message', `${formatedDate} ${nickname}: ${chatMessage}`);
  });
});