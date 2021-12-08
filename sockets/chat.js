const moment = require('moment');
const { createMessage, getAllMessages } = require('../models/chatModel');

module.exports = (io) => {
  io.on('connection', async (socket) => {
    const hashNick = socket.id.substring(0, 16);

    io.emit('connection', hashNick);

    socket.emit('connectedMessages', await getAllMessages());

    socket.on('userEnter', (userName) => {
      io.emit('userLogin', { userName, hashNick });
    });

    socket.on('message', async ({ chatMessage, nickname }) => {
      // https://stackoverflow.com/questions/30158574/how-to-convert-result-from-date-now-to-yyyy-mm-dd-hhmmss-ffff
      // https://momentjs.com/
      const date = moment(new Date()).format('DD-MM-yyyy h:mm:ss A');
      const message = `${date} - ${nickname}: ${chatMessage}`;

      io.emit('message', message);
      await createMessage(chatMessage, nickname, date);
    });
  });
};