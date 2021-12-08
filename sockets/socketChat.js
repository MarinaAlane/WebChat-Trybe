const formatInfoMessage = require('./formatInfoMessage');
const insertMessage = require('../models/insertMessage');
// const getMessages = require('../models/getMessages');

module.exports = (io) => {
  io.on('connection', async (socket) => {
    const randNameId = socket.id.slice(0, -4);

    io.emit('userOnline', randNameId);

    socket.on('message', async (clientMessage) => {
      const { nickname, message, timestamp } = formatInfoMessage(randNameId, clientMessage);
      const formatMessage = `${timestamp} - ${nickname}: ${message}`;

      io.emit('message', formatMessage);
      await insertMessage({ nickname, message, timestamp });
    });
  });
};
