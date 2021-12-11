const makeDate = () => {
  const date = new Date();
  const day = date.getDay();
  const month = date.getMonth();
  const year = date.getFullYear();
  const hour = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  return `${day}-${month}-${year} ${hour}:${minutes}:${seconds}`;
};

module.exports = (io) => io.on('connection', (socket) => {
  console.log(`Usuário conectado. ID: ${socket.id} `);
  socket.on('message', ({ chatMessage, nickname }) => {
    const mes = `${makeDate()} ${nickname}: ${chatMessage}`;
    io.emit('message', mes);
  });
});
