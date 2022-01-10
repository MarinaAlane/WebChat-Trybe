const moment = require('moment');
const { createMsg, getAllMessages } = require('../models/chat');

const users = [];

const newUser = (socket) => {
  const newNickName = socket.id.substr(0, 16);
  users.push({ id: socket.id, nickname: newNickName });
  socket.emit('newUser', newNickName);
};

const messageNew = (socket, io) => {
  const date = moment().format('DD-MM-YYYY h:mm:ss A');
  const timestamp = date;
  socket.on('message', async ({ nickname, chatMessage }) => {
  io.emit('message', `${timestamp} - ${nickname}: ${chatMessage}`);
  await createMsg({
    message: chatMessage,
    nickname,
    timestamp,
  });
});
};

const settleNickName = (socket, io) => {
  socket.on('saveNick', (newNickName) => {
      const indexUser = users.findIndex((user) => user.id === socket.id);
      users[indexUser].nickname = newNickName;
      io.emit('onlineUsers', users);
  });
};

const onlineUsersupdated = (socket, io) => { // emite para todos os usuarios conectados
  socket.on('onlineUsers', () => {
    io.emit('onlineUsers', users);
  });
};

const getAllMsgs = async (socket) => {
    const allMessages = await getAllMessages(); // chamando a query getAllMessages da model chat
    socket.emit('getAllMessages', allMessages);
};

const disconnect = (socket, io) => {
  socket.on('disconnect', () => {
    const indexOfUser = users.findIndex((u) => u.id === socket.id);
    users.splice(indexOfUser, 1);
    io.emit('onlineUsers', users);
  });
};

module.exports = (io) => {
  io.on('connection', (socket) => {
    // console.log('servidor conectado');
      messageNew(socket, io);
      newUser(socket);
      settleNickName(socket, io);
      onlineUsersupdated(socket, io);
      getAllMsgs(socket);
      disconnect(socket, io);
    });
};
