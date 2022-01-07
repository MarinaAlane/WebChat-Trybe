const crypto = require('crypto');

module.exports = (io) => io.on('connection', (socket) => {
  const randomNickname = crypto.randomBytes(8).toString('hex');
  socket.on('nickname', ({ id = socket.id, nickname = randomNickname }) => {
    io.emit('nickname', { id, nickname });
  });
});
