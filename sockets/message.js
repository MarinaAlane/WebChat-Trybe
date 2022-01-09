const { createMessage } = require('../helpers/createMessage');
const { getAllMessages, saveMessage } = require('../models');

module.exports = (io) => io.on('connection', async (socket) => {
  const messages = await getAllMessages();

  socket.emit('allMessages', messages);
  
  socket.on('message', async ({ chatMessage, nickname }) => {
    const message = createMessage({ chatMessage, nickname });
    io.emit('message', message);
    await saveMessage({ message: chatMessage, nickname, id: socket.id });
  });
});
