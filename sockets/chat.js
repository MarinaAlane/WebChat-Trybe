const { createMessage } = require('../helpers/index');
const { saveMessage, getAll } = require('../models/chatModel');

module.exports = (io) => io.on('connection', async (socket) => {
  console.log(`a user ${socket.id} connected`);

  const historyMessages = await getAll();
  socket.emit('history', historyMessages);

  socket.on('message', async (message) => {
    const data = createMessage();
    await saveMessage(message.chatMessage, message.nickname, data);
    io.emit('message', `${data} ${message.nickname}: ${message.chatMessage}`);
  });
});
