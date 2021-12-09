const formatInfoMessage = require('../middleware/formatInfoMessage');
const insertMessage = require('../models/insertMessage');

module.exports = (io, socket) => {
  const randNameId = socket.id.slice(0, 16);
  socket.on('message', async (clientMessage) => {
    const { nickname, message, timestamp } = formatInfoMessage(randNameId, clientMessage);
    const formatMessage = `${timestamp} - ${nickname}: ${message}`;
    io.emit('message', formatMessage);
    await insertMessage({ nickname, message, timestamp });
  });
};
