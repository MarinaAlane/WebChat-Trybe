const axios = require('axios');
const Users = require('./users');

const formatNewDate = () => {
  const now = new Date();
  const nowPtBr = now.toLocaleString('pt-br');
  return nowPtBr.replaceAll('/', '-');
};

const postMessage = async (message, nickname, timestamp) => {
  axios.post('http://localhost:3000/message', {
    message,
    nickname,
    timestamp,
  });
};

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`Usuário conectado. ID: ${socket.id} `);

    Users(socket, io);

    socket.on('message', async (message) => {
      const { nickname, chatMessage } = message;
      const saveDate = formatNewDate();
      postMessage(chatMessage, nickname, saveDate);
      const stringMessage = await `${saveDate} ${nickname} ${chatMessage}`;
      io.emit('message', stringMessage);
    });
  });
};
