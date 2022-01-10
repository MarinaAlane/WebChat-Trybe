const moment = require('moment');
const { createMsg, getAllMessages } = require('../models/chat');

const users = [];

const newUser = (socket) => {
  users.push({ id: socket.id, nickname: socket.id.substr(0, 16) });
  socket.emit('newUser', socket.id.substr(0, 16));
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
      users.find((user) => user.id === socket.id).nickname = newNickName;
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

module.exports = (io) => {
  io.on('connection', (socket) => {
    // console.log('servidor conectado');
      messageNew(socket, io);
      newUser(socket);
      settleNickName(socket, io);
      onlineUsersupdated(socket, io);
      getAllMsgs(socket);
    });
};
