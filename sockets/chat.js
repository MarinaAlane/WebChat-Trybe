const messagesModel = require('../models/messages');

const online = [];

const createUser = (socket) => {
  const { id } = socket;
  const newId = id.substr(0, 16);
  online.push({ id, nickname: newId });
  socket.emit('newUser', newId);
};

const newMessage = (socket, io) => {
  const { id } = socket;
  const timestamp = new Date()
        .toLocaleString('pt-BR').replaceAll('/', '-').replaceAll(',', '');
  socket.on('message', async ({ nickname, chatMessage }) => {
    io.emit('message', `${timestamp} - ${!nickname ? id : nickname}: ${chatMessage}`);
    await messagesModel.createMessages(nickname, chatMessage, timestamp);
  });
};

const getMessages = async (socket) => {
  const messages = await messagesModel.getAllMessages();
  socket.emit('allMessages', messages);
};

const saveNickname = async (socket, io) => {
  socket.on('saveNickname', (nickname) => {
    const userIndex = online.findIndex((user) => user.id === socket.id);
    online[userIndex].nickname = nickname;
    io.emit('usersOnline', online);
  });
};

const usersOnline = (socket, io) => {
  socket.on('usersOnline', () => {
    io.emit('usersOnline', online);
  });
};

const disconnectUser = (socket, io) => {
  socket.on('disconnect', () => {
    const userIndex = online.findIndex((user) => user.id === socket.id);
    online.splice(userIndex, 1);
    io.emit('usersOnline', online);
  });
};

module.exports = (io) => {
  io.on('connection', (socket) => {
    createUser(socket);
    newMessage(socket, io);
    getMessages(socket);
    saveNickname(socket, io);
    usersOnline(socket, io);
    disconnectUser(socket, io);
  });
};