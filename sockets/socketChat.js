const checkNickName = require('./checkNickName');
const insertMessage = require('../models/insertMessage');

module.exports = (io) =>
  io.on('connection', (socket) => {
    const randNameId = socket.id.slice(0, -4);

    io.emit('userOnline', randNameId);

    socket.on('message', async (clientMessage) => {
      const { timestamp, nickname, message } = await insertMessage(clientMessage);

      const checkNick = checkNickName(randNameId, nickname);

      const formatMessage = `${timestamp} - ${checkNick}: ${message}`;

      io.emit('message', formatMessage, checkNick);
    });
  });
