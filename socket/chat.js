const messageController = require('../controller/message');
const { getFormatTime } = require('../middleware/manageMessage');

const createMessage = async (msg, io) => {
  const { timestamp } = getFormatTime();
  await messageController.createMessage(msg, timestamp);

  const { nickname, chatMessage } = msg;
  const message = `${timestamp} - ${nickname}: ${chatMessage}`;

  io.emit('message', message);
};

const listAllMessages = async (io) => {
  const allMessages = await messageController.getAllMessages();
  io.emit('messageHistory', allMessages);
};

module.exports = (io) =>
  io.on('connection', async (socket) => {
    await listAllMessages(io);
    socket.on('message', async (msg) => createMessage(msg, io));
});
