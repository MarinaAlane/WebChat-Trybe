const crypto = require('crypto');

module.exports = (io) => io.on('connection', (socket) => {
  const nickname = crypto.randomBytes(8).toString('hex');
  socket.emit('nickname', nickname);

  socket.on('nickname', (newNickname) => {
    io.emit('nickname', newNickname);
  });
});
