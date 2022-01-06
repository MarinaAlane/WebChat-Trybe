let users = [];

const newUserFunc = (io) => {
  io.on('connection', (socket) => {
    socket.on('newUser', (user) => {
      users = [...users, { user, id: socket.id }];
      io.emit('newUser', { user, id: socket.id }); 
    });
  });
};

const updateUserFunc = (io) => {
  io.on('connection', (socket) => {
    socket.on('updateUser', ({ nickName, id }) => {
      const index = users.findIndex((user) => user.id === socket.id);
      users[index].user = nickName;
      io.emit('updateUser', { nickName, id });
    });
  });
};

const disconnectUserFunc = (io) => {
  io.on('connection', (socket) => {
    socket.on('disconnect', () => {
      const index = users.findIndex((user) => user.id === socket.id);
      users.splice(index, 1);
      io.emit('disconnected', socket.id);
    });
  });
};

module.exports = (io) => {
  newUserFunc(io);
  updateUserFunc(io);
  disconnectUserFunc(io);

  io.on('connection', (socket) => {
    socket.on('userList', () => { io.emit('userList', users); });
  });
};
