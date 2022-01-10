const messagesModel = require('../models/messages');

const userList = [];
const findIndex = (socketId) => {
  let i;
  userList.forEach((user, index) => {
    if (user.socketId === socketId) {
      i = index;
    }
  });
  return i;
};

module.exports = (io) => io.on('connection', (socket) => {
  let username = socket.id.slice(0, 16); userList.push({ username, socketId: socket.id });
   socket.emit('userConnected', { username, socketId: socket.id });
   io.emit('createUsers', userList);

  socket.on('message', ({ chatMessage, nickname }) => {
    const date = new Date().toLocaleString('pt-BR'); const formatedDate = date.replace(/\//g, '-');
    const message = `${formatedDate} ${nickname}: ${chatMessage}`;
    messagesModel.insertMessage(message);
    io.emit('message', message);
  });

  socket.on('changeNick', (newNick) => {
    const index = findIndex(socket.id); username = newNick; userList[index].username = username;
    io.emit('nickChanged', userList);
  });

  socket.on('disconnect', () => {
    const index = userList.indexOf({ username, socketId: socket.id }); userList.splice(index, 1);
    io.emit('userDisconnected', userList);
  });
});