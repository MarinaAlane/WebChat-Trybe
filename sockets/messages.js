const getCurrentDate = () => {
  const date = new Date();
  const day = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  const time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

  return `${day} ${time}`;
};

module.exports = (io) => {
  io.on('connection', (socket) => {
    socket.on('message', ({ chatMessage, nickname }) => {
      const currentDate = getCurrentDate();
      console.log(`to front-end-> ${currentDate} - ${nickname}: ${chatMessage}`);
      io.emit('message', `${currentDate} - ${nickname}: ${chatMessage}`);
    });
  });
};