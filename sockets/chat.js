const moment = require('moment');
const model = require('../models/chat');

const message = ({ chatMessage, nickname }) => {
  const atualDate = moment(new Date()).format('DD-MM-yyyy h:mm:ss a');
  model.createMessage({ chatMessage, nickname, atualDate });
  return `${atualDate} ${nickname}: ${chatMessage}`;
};

let allUsers = [];

const editUser = ({ nickname, socketId }) => {
 allUsers = allUsers.map((user) => {
  if (user.socketId === socketId) return { socketId, nickname }; return user; 
});
};

const disconnectUser = (socket) => {
  allUsers = allUsers.filter((user) => user.socketId !== socket.id);
};

module.exports = (io) =>
io.on('connection', (socket) => {
  socket.on('message', ({ chatMessage, nickname }) => {
    io.emit('message', message({ chatMessage, nickname }));
  });

  socket.on('userOnline', ({ nickname }) => {
    const user = { nickname, socketId: socket.id };
    allUsers = [user, ...allUsers];
    io.emit('userOnline', allUsers);
  });

  socket.on('disconnect', () => {
    disconnectUser(socket);
    socket.broadcast.emit('disconnectUser', socket.id);
  });

  socket.on('editUser', ({ nickname, socketId }) => {
    editUser({ nickname, socketId });
    io.emit('userOnline', allUsers);
  });
});