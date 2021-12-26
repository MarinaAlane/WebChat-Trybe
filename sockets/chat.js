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

  socket.on('userList', (data) => {
   io.emit('updateUserList', data);
  });

  socket.on('newClient', ({ username }) => {
    socket.broadcast.emit('clientDisconnect', socket.id);
    socket.broadcast.emit('newClient', ({ username, id: socket.id }));
  });

  socket.on('updateContact', ({ username }) => {
   io.emit('updateContact', ({ username, id: socket.id }));
  });

  socket.on('disconnect', () => {
    io.emit('clientDisconnect', socket.id);
  });

  socket.on('message', handleMessageReceived);
}); 
