const formatMessage = ({ nickname, chatMessage }) => {
  const date = new Date().toLocaleString().replace(/\//gi, '-');
  return `${date} - ${nickname}: ${chatMessage}`;
};

let users = [];

module.exports = (io) => io.on('connection', (socket) => {
  socket.emit('nickname', `${socket.id.slice(0, 16)}`);
  users.push(socket.id.slice(0, 16));
  io.emit('userList', users);

  socket.on('message', (message) => {
    const newMsg = formatMessage(message);
    io.emit('message', newMsg);
  });

  socket.on('changeNickname', (nicknames) => {
    users = users.map((user) => {
      if (user === nicknames.oldUser) return nicknames.newUser;
      return user;
    });
    io.emit('userList', users);
  });

  socket.on('disconect', (nickname) => {
    users = users.filter((user) => user !== nickname);
    socket.broadcast.emit('userList', users);
  });
});
