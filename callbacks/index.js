const sendMessage = ({ chatMessage, nickname, _id }, usrList, io, socket) => {
  // se tiver nickname - reassign list user nick name first.
  const now = new Date();
  const date = now.toLocaleDateString().replace(/\//g, '-');
  const hour = now.toLocaleTimeString();
  const nick = usrList.online.filter((users) => users.id === socket.id)[0].nickname;
  const messageString = `${date} ${hour} ${nickname || nick}: ${chatMessage}`;

  io.emit('message', messageString);
};

const changeNickname = ({ nickname, id }, usrList, io, socket) => {
  usrList.changeUserNick(nickname, id);
  io.emit('updateUserList', usrList.online);
  console.log(`usuário ${socket.id} trocou nick para: ${nickname}`);
};

const disconnectUser = (usrList, io, socket) => {
  console.log(`usuário ${socket.id} desconectou`);

  io.emit('userLoggedOut', socket.id);
  usrList.removeUser(socket.id);

  console.log('online users:', usrList.online);
};

module.exports = {
  sendMessage,
  changeNickname,
  disconnectUser,
};
