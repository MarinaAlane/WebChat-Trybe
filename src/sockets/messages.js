const getCurrentDate = require('../utils/getCurrentDate');
const MessagesModels = require('../database/models/Messages');

module.exports = (io) => io.on('connection', (socket) => {
  socket.on('message', async ({ chatMessage: message, nickname }) => {
    const timestamp = getCurrentDate('pt-BR');

    await MessagesModels.addNewMessage({ message, nickname, timestamp });

    io.emit('message', `${timestamp} - ${nickname}: ${message}`);
  });

  socket.on('loadMessages', async () => {
    const allMessages = await MessagesModels.getAllMessages();

    io.emit('loadMessages', allMessages);
  });

  socket.on('userSignIn', (nickName) => socket.broadcast.emit('userSignIn', nickName));

  socket.on('loggedUsers', (loggedUser) => socket.broadcast.emit('loggedUsers', loggedUser));
});