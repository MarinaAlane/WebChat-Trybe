/* eslint-disable max-lines-per-function */
let onlineUsers = [];

const UsersIO = (io, socket) => {
  let actualUser;

  socket.on('connectUser', (nickname) => {
    onlineUsers.push(nickname);
    
    actualUser = nickname;

    io.emit('updateOnlineUsers', onlineUsers);
  });

  socket.on('updateUser', ({ oldNickname, newNickname }) => {
    const userIndex = onlineUsers.indexOf(oldNickname);
    onlineUsers.splice(userIndex, 1, newNickname);

    actualUser = newNickname;

    io.emit('updateOnlineUsers', onlineUsers);
  });

  socket.on('disconnect', () => {
    onlineUsers = onlineUsers.filter((user) => user !== actualUser);

    io.emit('updateOnlineUsers', onlineUsers);
  });
};

module.exports = UsersIO;