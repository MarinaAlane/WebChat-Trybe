const moment = require('moment');
const chatModel = require('../models/chatModel');

const usersOnline = [];

const createUser = (socket) => {
  const { id } = socket;
  const newId = id.substr(0, 16);
  usersOnline.push({ id, nickname: newId });
  socket.emit('newUser', newId);
};

const newMsg = (socket, io) => {
  const timestamp = moment().format('DD-MM-YYYY h:mm:ss A');
  socket.on('message', async ({ nickname, chatMessage }) => {
    io.emit('message', `${timestamp} - ${nickname}: ${chatMessage}`);
    await chatModel.createMessage({
      message: chatMessage,
      nickname,
      timestamp,
    });
  });
};

const setNewNickname = (socket, io) => {
  socket.on('saveNickname', (newNick) => {
    const userIndex = usersOnline.findIndex((user) => user.id === socket.id);
    usersOnline[userIndex].nickname = newNick;
    io.emit('usersOnline', usersOnline);
  });
};

const updateUsersOnline = (socket, io) => {
  socket.on('usersOnline', () => {
    io.emit('usersOnline', usersOnline);
  });
};

const getMessages = async (socket) => {
  const messages = await chatModel.getAllMessages();
  socket.emit('getMessages', messages);
};

module.exports = (io) => {
  io.on('connection', (socket) => {
    newMsg(socket, io);
    createUser(socket);
    setNewNickname(socket, io);
    updateUsersOnline(socket, io);
    getMessages(socket);
  });
};
