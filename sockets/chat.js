const Users = require('./users');

const formatNewDate = () => {
  const now = new Date();
  const nowPtBr = now.toLocaleString('pt-br');
  return nowPtBr.replaceAll('/', '-');
};

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`Usuário conectado. ID: ${socket.id} `);

    Users(socket, io);

    socket.on('message', async (message) => {
      const { nickname, chatMessage } = message;
      const stringMessage = await `${formatNewDate()} ${nickname} ${chatMessage}`;
      io.emit('message', stringMessage);
    });
  });
};
