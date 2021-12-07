const moment = require('moment');
const formatUser = require('./formatNickName');

const time = moment().format('DD-MM-YYYY hh:mm:ss A');

module.exports = (io) =>
  io.on('connection', (socket) => {
    const randNameId = socket.id.slice(0, -4);

    io.emit('userOnline', randNameId);

    socket.on('message', async (message) => {
      const formatNickName = formatUser(randNameId, message);

      const formatMessage = `${time} - ${formatNickName}: ${message.chatMessage}`;
      io.emit('message', formatMessage, formatNickName);
    });
  });
