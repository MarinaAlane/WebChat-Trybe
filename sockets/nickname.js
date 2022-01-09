const crypto = require('crypto');

let usersList = [];

function newUser(id, io) {
  const randomNickname = crypto.randomBytes(8).toString('hex');
  usersList = [...usersList, { id, nickname: randomNickname }];
  io.emit('renderUsersList', usersList);
}

function removeUser(removedUserId, io) {
  usersList = usersList.filter((user) => user.id !== removedUserId);
  io.emit('renderUsersList', usersList);
}

function updateUser(updatedUser, io) {
  usersList = usersList.map((user) => {
    if (user.id === updatedUser.id) {
      return updatedUser;
    }
    return user;
  });
  io.emit('renderUsersList', usersList);
}

module.exports = (io) => io.on('connection', async (socket) => {
  socket.on('newNickname', () => {
    newUser(socket.id, io);
  });
  
  socket.on('updateNickname', (nickname) => {
    updateUser({ id: socket.id, nickname }, io);
  });

  socket.on('disconnect', () => {
    removeUser(socket.id, io);
  });
});
