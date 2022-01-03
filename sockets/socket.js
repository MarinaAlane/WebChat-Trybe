const { getAllMsg, format, deleteOneMsg } = require('../triggers/message');
const { userJoin, getAllUsers, removeOne, byId } = require('../triggers/user');

module.exports = (io) => io.on('connection', (socket) => {
  const user = userJoin(socket.id.substr(1, 16), '');
  
  io.emit('userServer', { users: getAllUsers() });
  // io.emit('serverName', { message: getAllUsers() });
  io.emit('serverAllMessages', { message: getAllMsg() });
  // socket.emit('message', `Bem vindo(a) ${user.nickname}`);
  // socket.broadcast.emit('serverMessage', { message: `${user.id} entrou na sala!` });
   
  socket.on('messages', (msg) => {
    // const update = getUserById(user.id);
    const saved = format({ text: msg, nickname: byId(user.id).nickname });
    io.emit('serverMessage', { chatMessage: saved.text, nickname: saved.nickname });
  });

  socket.on('name', (name) => {
    removeOne(socket.id.substr(1, 16));
    userJoin(socket.id.substr(1, 16), name);
    io.emit('userServer', { users: getAllUsers() });
  });

  socket.on('disconnect', () => {
    io.emit('serverMessage', { message: `${byId(socket.id.substr(1, 16)).nickname} saiu da sala` });
    deleteOneMsg(byId(socket.id.substr(1, 16)).id, byId(socket.id.substr(1, 16)).nickname);
    removeOne(user.id);
    io.emit('userServer', { users: getAllUsers() });
  });
});
