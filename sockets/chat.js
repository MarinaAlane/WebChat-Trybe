module.exports = (io) => io.on('connection', (socket) => {
  socket.on('newMessage', (message) => {
    console.log(message);
  });
});