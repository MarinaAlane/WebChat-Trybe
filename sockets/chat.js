const messageModel = require('../models/messages');

let Users = [];

const getDate = () => new Date().toLocaleString().replace(/\//g, '-');

const showMessage = ({ nickname, timestamp, message }) =>
  `${timestamp} - ${nickname}: ${message}`;

const getAllMessages = async () => {
  const messagesList = await messageModel.getAllMessages();

  const formatedMessages = messagesList.map((message) => showMessage(message));

  return formatedMessages;  
};

const addUpdateUser = (socketId, nickname) => {
  const usersBySocketId = Users.find((user) => user.id === socketId);

  if (!usersBySocketId) {
    Users.push({ id: socketId, nickname });
  } else {
    const UsersBMap = Users.map((user) => {
      if (user.id === socketId) {
        return {

          id: user.id,

          nickname,

        };
      }
      return user;
    });

    Users = UsersBMap;
  }
};

const emitAllMessages = async (socket) => {
  const messagesList = await getAllMessages();

  socket.emit('allMessages', messagesList);
};

const saveMessage = (socket) => {
  socket.on('message', async ({ chatMessage, nickname }) => {
    const messageProps = {

      message: chatMessage,

      nickname,

      timestamp: getDate(),

    };

    await messageModel.saveMessage(messageProps);

    const message = showMessage(messageProps);

    socket.emit('message', message);

    socket.broadcast.emit('message', message);
  });
};

const disconnectUser = (socket, socketId) => {
  socket.on('disconnect', () => {
    Users = Users.filter((user) => user.id !== socketId);

    socket.emit('users', Users);

    socket.broadcast.emit('users', Users);
  });
};

module.exports = (io) =>

  io.on('connection', (socket) => {
    console.log(`Usuário conectado. ID: ${socket.id} `);

    let socketId = '';

    emitAllMessages(socket);

    saveMessage(socket);

    socket.on('users', (nickname) => {
      socketId = socket.id;

      addUpdateUser(socketId, nickname);

      const changeFirst = Users.filter((user) => user.id !== socketId);

      changeFirst.unshift({ id: socketId, nickname });

      socket.emit('users', changeFirst);

      socket.broadcast.emit('users', Users);

      disconnectUser(socket, socketId);
    });
  });