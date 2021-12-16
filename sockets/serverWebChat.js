const { format } = require('date-fns');
const updateNickname = require('../utils/updateNickname');
const { setMessage, getMessages } = require('../controllers/messages');

let usersOnline = [];

const createUserCB = (socket, io) => async (randomNickname) => {
  usersOnline.push({ randomNickname, id: socket.id });
  io.emit('userLoggedIn', usersOnline);
  const histMsg = await getMessages();
  socket.emit('histMessages', histMsg);
};

module.exports = (io) => io.on('connection', (socket) => {
  socket.on('userLoggedIn', createUserCB(socket, io));
  socket.on('newNickName', (user) => {
    usersOnline = updateNickname(usersOnline, user.newNickname, user.oldNickname);
    io.emit('newNickName', usersOnline);
  });
  socket.on('message', (cltMsg) => {
    const timestamp = format(new Date(), 'dd-MM-yyyy HH:mm:ss');
    setMessage({ message: cltMsg.chatMessage, nickname: cltMsg.nickname, timestamp });
    io.emit('message', `${timestamp} ${cltMsg.nickname} ${cltMsg.chatMessage}`);
  });
  socket.on('disconnect', () => {
    usersOnline = usersOnline.filter((user) => user.id !== socket.id);
    socket.broadcast.emit('userLoggedIn', usersOnline);
  });
});
