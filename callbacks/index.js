const { createMsg, getAllMsgs } = require('../models');

const sendMessage = async ({ chatMessage, nickname, _id }, usrList, io, socket) => {
  const now = new Date();
  const date = now.toLocaleDateString().replace(/\//g, '-');
  const hour = now.toLocaleTimeString();
  const nick = usrList.online.filter((users) => users.id === socket.id)[0].nickname;
  const messageString = `${date} ${hour} ${nickname || nick}: ${chatMessage}`;
  const bdPayload = { 
    message: chatMessage,
    nickname: nickname || nick,
    timestamp: `${date} ${hour}`,
  };

  io.emit('message', messageString);

  await createMsg(bdPayload);
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

const retrieveHistory = async () => {
  const msgHistory = await getAllMsgs();

  return msgHistory;
};

module.exports = {
  sendMessage,
  changeNickname,
  disconnectUser,
  retrieveHistory,
};
