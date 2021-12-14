const { webchat } = require('../models');

const users = {};

function onMessage(io) {
  return async ({ nickname, chatMessage }) => {
    const now = new Date();
    const timestamp = `${now
      .toLocaleDateString('pt-br')
      .replaceAll('/', '-')} ${now.toLocaleTimeString('pt-br')}`;

    await webchat.createMessage({
      nickname,
      message: chatMessage,
      timestamp,
    });

    io.emit('message', `${timestamp} ${nickname} : ${chatMessage}`);
  };
}

function changeNick(socket, io) {
  return ({ oldNick, nickname }) => {
    users[socket.id] = nickname;
    io.emit('newNick', { oldNick, nickname });
  };
}

function newClient(socket, io) {
  return ({ nickname }) => {
    users[socket.id] = nickname;
    io.emit('newConnection', users);
  };
}

function disconnectFn(socket, io) {
  return () => {
    delete users[socket.id];
    io.emit('newConnection', users);
  };
}

module.exports = (io) => {
  io.on('connection', (socket) => {
    socket.on('newClient', newClient(socket, io));

    socket.on('disconnect', disconnectFn(socket, io));

    socket.on('changeNick', changeNick(socket, io));

    socket.on('message', onMessage(io));
  });
};
