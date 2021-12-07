module.exports = (io) => {
  io.on('connection', (socket) => {
    socket.on('sendMessage', (data) => {
      console.log(data);
    });
  });
};
