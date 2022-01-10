const messages = require('./messages');

let usersConnection = [];

function updateUsers(array, onlineUser, nickName) {
  const newArray = array;
  const userIndex = array.map((user) => user.userConnected).indexOf(onlineUser);
  newArray[userIndex].userNickName = nickName;
  return newArray;
}

module.exports = (io) => {
  io.on('connection', (socket) => {
    const onlineUser = socket.id.substring(0, 16);
    usersConnection.push({ userConnected: onlineUser, userNickName: onlineUser });
    io.emit('connectUser', onlineUser);

    socket.emit('currUsers', { usersConnection, onlineUser });

    messages(io, socket, onlineUser);

    socket.on('updatedNickName', (nickName) => {
      usersConnection = updateUsers(usersConnection, onlineUser, nickName);
      io.emit('currentNickName', ({ nickName, onlineUser }));
    });
    socket.on('disconnect', () => {
      usersConnection = usersConnection.filter((user) => user.userConnected !== onlineUser);
      io.emit('removedUser', { onlineUser });
    });
  });
};
