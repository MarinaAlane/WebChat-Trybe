const day = new Date().toLocaleDateString('pt-BR').replace(/\//g, '-');
const hour = new Date().toLocaleTimeString('pt-BR', { hour12: true });
const dayTime = `${day} ${hour}`;

module.exports = (io) => io.on('connection', (socket) => {
  socket.on('message', ({ chatMessage, nickname }) => {
    console.log(`Mensagem ${chatMessage} - ${nickname}`);
    io.emit('message', `${dayTime} ${nickname} ${chatMessage}`);
  });
});