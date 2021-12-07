module.exports = (io) =>
  io.on('connection', (socket) => {
    socket.on('message', ({ chatMessage, nickname }) => {
      // date format 09-10-2020 2:35:09 PM
      const date = new Date();
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();
      const time = `${hours}:${minutes}:${seconds}`;
      const dateFormat = `${day}-${month}-${year} ${time}`;

      const message = `${dateFormat}-${nickname}-${chatMessage}`;

      io.emit('message', message);
    });
  });
