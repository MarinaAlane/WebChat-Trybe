const messages = require('./messages');

let usersConnected = [];

function updateUsersConnected(array, onlineUser, nickName) {
  const newArray = array;
  const userIndex = array.map((user) => user.userConnected).indexOf(onlineUser);
  newArray[userIndex].userNickName = nickName;
  return newArray;
}

module.exports = (io) => {
  io.on('connection', (socket) => {
    const onlineUser = socket.id.substring(0, 16);
    usersConnected.push({ userConnected: onlineUser, userNickName: onlineUser });
    io.emit('connectedUser', onlineUser);

    socket.emit('currentConnectedUsers', { usersConnected, onlineUser });

    messages(io, socket, onlineUser);

    socket.on('updatedNickName', (nickName) => {
      usersConnected = updateUsersConnected(usersConnected, onlineUser, nickName);
      io.emit('currentNickName', ({ nickName, onlineUser }));
    });

    socket.on('disconnect', () => {
      usersConnected = usersConnected.filter((user) => user.userConnected !== onlineUser);
      io.emit('removedUser', { onlineUser });
    });
  });
};
