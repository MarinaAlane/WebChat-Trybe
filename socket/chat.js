const messageController = require('../controller/message');
const { getFormatTime } = require('../middleware/manageMessage');

const generateNickname = () => {
  const chars = 'abcdefghijklmnopqrstuvwxyz';
  let randomName = '';
  const passwordLength = 15;

  const randomNumber = Math.floor(Math.random() * chars.length);
  for (let i = 0; i <= passwordLength; i += 1) {
    randomName += chars.substring(randomNumber, randomNumber + 1);
  }
  return randomName;
};

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
