const messageController = require('../controllers/messageController');

const getBrazilianDate = require('../utils/getBrazilianDate');

const formatedUser = (data) => `${getBrazilianDate()} - ${data.nickname}: ${data.chatMessage}`;

const connectedUsers = [];

const findIndexViaNickname = (oldNickname, newNickname) => {
  const indexToUpdateUser = connectedUsers
  .findIndex(({ nickname }) => nickname === oldNickname);
  connectedUsers[indexToUpdateUser].nickname = newNickname;
};

const removeUserOnDisconnect = (sockedId) => {
  const indexToDeleteUser = connectedUsers
      .findIndex(({ id }) => id === sockedId);
    connectedUsers.splice(indexToDeleteUser, 1);
};

module.exports = (io) => io.on('connection', (socket) => {
  socket.on('message', async (data) => {
    await messageController.storeMessage(data); io.emit('message', formatedUser(data)); 
});

  socket.on('newUser', (nickname) => {
    connectedUsers.push({ nickname, id: socket.id });
    io.emit('updateUser', connectedUsers); 
});

  socket.on('updateUser', ({ oldNickname, newNickname }) => {
    findIndexViaNickname(oldNickname, newNickname); io.emit('updateUser', connectedUsers);
  });

  socket.on('getMessages', async () => {
    const messageHistory = await messageController.getMessages();
    io.emit('showMessageHistory', messageHistory);
  });

  socket.on('disconnect', () => {
    removeUserOnDisconnect(socket.id);
    io.emit('updateUser', connectedUsers);
  });
});