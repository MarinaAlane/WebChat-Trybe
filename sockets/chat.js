const messagesModel = require('../models/Message');

let io;

const sendMessagesHistory = async (socket) => {
  const messageHistory = await messagesModel.getAll();

  socket.emit('messagesHistory', messageHistory);
};

const handleClientConnection = async (socket) => {
  await sendMessagesHistory(socket);
};

const createTimestamp = () => {
  const date = new Date().toLocaleDateString().replace(/[/]/g, '-');
  const time = new Date().toLocaleTimeString();

  return `${date} ${time}`;
};

const handleMessageReceived = async ({ chatMessage, nickname }) => {
  const response = {
    message: chatMessage,
    nickname,
    timestamp: createTimestamp(),
  };

  io.emit('message', JSON.stringify(response));

  await messagesModel.insert(response);
};

module.exports = (socketIo) => socketIo.on('connection', (socket) => {
  io = socketIo;
  handleClientConnection(socket);

  socket.on('message', handleMessageReceived);
}); 
