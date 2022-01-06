const { createMessage } = require('../helpers/index');
const { saveMessage, getAll } = require('../models/chatModel');

module.exports = (io) => io.on('connection', async (socket) => {
  console.log(`a user ${socket.id} connected`);
  socket.emit('newUser', 'Olá, seja bem vindo ao nosso chat público!');
  const historyMessages = await getAll();
  io.emit('history', historyMessages);
  socket.on('message', async (message) => {
    const data = createMessage();
    await saveMessage(message.chatMessage, message.nickname, data);
    console.log(message);
    io.emit('message', `${data} ${message.nickname}: ${message.chatMessage}`);
  });
});
