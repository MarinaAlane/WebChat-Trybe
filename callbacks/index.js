const sendMessage = ({ chatMessage, nickname, _id }, usrList, io, socket) => {
  // se tiver nickname - reassign list user nick name first.
  const now = new Date();
  const date = now.toLocaleDateString().replace(/\//g, '-');
  const hour = now.toLocaleTimeString();
  const nick = usrList.online.filter((users) => users.id === socket.id)[0].nickname;
  const messageString = `${date} ${hour} ${nickname || nick}: ${chatMessage}`;

  io.emit('message', messageString);
};

const changeNickname = ({ nickname, id }, usrList, io, _socket) => {
  console.log(usrList.online);
  console.log(nickname);
  const userIndex = usrList.online.findIndex((userData) => id === userData.id);
  console.log(userIndex);
  usrList.changeUserNick(nickname, id);
  io.emit('updateUserList', usrList.online);
};

const disconnectUser = (usrList, io, socket) => {
  console.log(`usuário ${socket.id} desconectou`);
  console.log(usrList.online);

  io.emit('userLoggedOut', socket.id);
  usrList.removeUser(socket.id);
};

module.exports = {
  sendMessage,
  changeNickname,
  disconnectUser,
};
