const { saveMessage, getAllMessages } = require('../models/chat');
const getDate = require('../helpers/getDate');

module.exports = (io) => io.on('connection', (socket) => {
  // socket.emit('serverMessage',
  // 'Olá, seja bem vindo ao nosso chat público! Use essa página para conversar a vontade.');
  socket.on('message', async ({ chatMessage, nickname }) => {
    const date = getDate();
    await saveMessage({ message: chatMessage, nickname, timestamp: date });
    io.emit('message', `${date} - ${nickname}: ${chatMessage}`);
  });
  socket.on('getMessagesFromDB', async () => {
    const response = await getAllMessages();
    socket.emit('messagesToLoad', response);
  });
});
