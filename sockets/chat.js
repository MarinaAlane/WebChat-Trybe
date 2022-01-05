const { saveMessage, getAllMessages } = require('../models/chat');
const getDate = require('../helpers/date');

module.exports = (io) => io.on('connection', (socket) => {
  socket.on('message', async ({ chatMessage, nickname }) => {
    const date = getDate();
    await saveMessage({ message: chatMessage, nickname, timestamp: date });
    io.emit('message', `${date} - ${nickname}: ${chatMessage}`);
  });
  socket.on('getMessagesFromDB', async () => {
    const response = await getAllMessages();
    socket.emit('messagesToLoad', response);
  });
});
