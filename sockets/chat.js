const Controller = require('../controller/Messages');
const { createTimestamp } = require('../middleware/createTimestamp');

// ..Source: https://socket.io/get-started/chat
module.exports = (io) => io.on('connection', async (socket) => {
  socket.on('message', async ({ chatMessage, nickname }) => {
    const timestamp = createTimestamp();
    await Controller.create({
      message: chatMessage,
      nickname,
      timestamp,
    });

    io.emit('message', `${timestamp} - ${nickname}: ${chatMessage}`);
  });

  const messages = await Controller.getAll();
  socket.emit('messageHistory', messages);
});