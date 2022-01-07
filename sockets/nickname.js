module.exports = (io) => io.on('connection', (socket) => {
  socket.on('clientNickname', (nickname) => {
    console.log(`Nickname ${nickname}`);
    io.emit('serverNickname', nickname);
  });
});
