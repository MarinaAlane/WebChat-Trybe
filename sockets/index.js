const formatedMessages = require('./formatedMessage');

let connectedUsers = [];

function updateConnectedUsers(arr, onlineUser, nickName) {
  const newArr = arr;
  const userIndex = arr.map((user) => user.connectedUser).indexOf(onlineUser);
  newArr[userIndex].userNickName = nickName;

  return newArr;
}

module.exports = (io) => {
  io.on('connection', (socket) => {
    const onlineUser = socket.id.substring(0, 16);
    connectedUsers.push({ connectedUser: onlineUser, userNickName: onlineUser });
    io.emit('connectedUser', onlineUser);

    socket.emit('currentConnectedUsers', { connectedUsers, onlineUser });

    formatedMessages(io, socket, onlineUser);

    socket.on('updatedNickName', (nickName) => {
      connectedUsers = updateConnectedUsers(connectedUsers, onlineUser, nickName);
      io.emit('currentNickName', { nickName, onlineUser });
    });

    socket.on('disconnect', () => {
      connectedUsers = connectedUsers.filter((user) => user.connectedUser !== onlineUser);
      io.emit('removedUser', { onlineUser });
    });
  });
};
