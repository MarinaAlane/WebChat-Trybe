const checkMessageInfos = require('../middleware/checkMessageInfos');
const insertMessage = require('../models/insertMessage');
const getMessages = require('../models/getMessages');

module.exports = (io) =>
  io.on('connection', async (socket) => {
    const randNameId = socket.id.slice(0, -4);

    io.emit('userOnline', randNameId);

    const arrayMessages = await getMessages();
    arrayMessages.forEach(({ timestamp, nickname, message }) => {
      const formatMessage = `${timestamp} - ${nickname}: ${message}`;
      io.emit('message', formatMessage);
    });

    socket.on('message', async (clientMessage) => {
      const resultInfosMessages = checkMessageInfos(clientMessage, randNameId);

      const { timestamp, nickname, message } = await insertMessage(resultInfosMessages);
      const formatMessage = `${timestamp} - ${nickname}: ${message}`;

      io.emit('message', formatMessage);
    });
  });
