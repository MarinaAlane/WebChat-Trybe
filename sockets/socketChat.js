const formatInfoMessage = require('../middleware/formatInfoMessage');
const insertMessage = require('../models/insertMessage');

let arrayUsersOnline = [];

module.exports = (io) => {
  io.on('connection', async (socket) => {
    const randNameId = socket.id.slice(0, 16);

    arrayUsersOnline.push({ userNickName: randNameId });

    io.emit('usersOnline', arrayUsersOnline);

    // arrayUsersOnline.splice(arrayUsersOnline.indexOf(randNameId), 1);

    socket.on('message', async (clientMessage) => {
      const { nickname, message, timestamp } = formatInfoMessage(randNameId, clientMessage);
      const formatMessage = `${timestamp} - ${nickname}: ${message}`;

      io.emit('message', formatMessage);
      await insertMessage({ nickname, message, timestamp });
    });

    socket.on('disconnect', () => {
      const newArray = arrayUsersOnline.filter(({ userNickName }) => userNickName !== randNameId);
      arrayUsersOnline = newArray;
      io.emit('usersOnline', arrayUsersOnline);
    });
  });
};
