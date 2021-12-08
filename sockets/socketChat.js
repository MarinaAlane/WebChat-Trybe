const formatInfoMessage = require('./formatInfoMessage');
const time = require('../middleware/getTime');

module.exports = (io) =>
  io.on('connection', (socket) => {
    const randNameId = socket.id.slice(0, -4);

    io.emit('userOnline', randNameId);

    socket.on('message', async (message) => {
      const formatNickName = formatInfoMessage(randNameId, message);

      const formatMessage = `${time} - ${formatNickName}: ${message.chatMessage}`;
      io.emit('message', formatMessage, formatNickName);
    });
  });
