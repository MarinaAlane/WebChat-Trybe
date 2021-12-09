const dateInform = require('../utils/dateInform');
const { saveMessage } = require('../models/queries');

function filterAllUsers(usersList) {
  const filteredUsers = usersList.filter((user) => user[1].nickname);
  return filteredUsers.map((user) => ({
    nickname: user[1].nickname,
    socketId: user[0],
  }));
}
const date = dateInform();

let connectedUsers= {};

module.exports = (io) =>
  io.on('connection', (socket) => {
    socket.on('message', async (message) => {
      await saveMessage(message.chatMessage, message.nickname, date);
      if (message.date) {
 return io.emit('message', `${message.date} - ${message.nickname}: ${message.chatMessage}`);
      }
      return io.emit('message', `${date} - ${message.nickname}: ${message.chatMessage}`);
    });
    socket.on('join', (nickname) => {
      socket.emit('yourId', socket.id);
      connectedUsers[socket.id] = nickname;
      let setSocketNickname = socket.nickname; setSocketNickname = nickname; 
      const allNicknames = [...io.sockets.sockets]; const allUsers = filterAllUsers(allNicknames);
      io.emit('join', allUsers); console.log(setSocketNickname);
    });
    socket.on('disconnect', () => { io.emit('disconnectedUser', socket.id); });
    socket.on('changeNickname', (oldNickname, newNickname) => {
      socket.nickname = newNickname;
      io.emit('changeNickname', oldNickname, newNickname);
    });
  });
