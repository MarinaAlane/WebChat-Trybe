const fortmatedDate = require('../utils/formatedDate');

const formatedMessage = ({ nickname, chatMessage }) =>
  `${fortmatedDate()} - ${nickname}: ${chatMessage}`;

const connections = [];

const updateOnlineUsers = (io) => {
  io.emit('conectedUsers', connections.map((connection) => connection.nickname));
};

module.exports = (io) =>
  io.on('connection', (socket) => {
  socket.on('newUser', (nick) => {
    const newConnection = socket;
    newConnection.nickname = nick; connections.push(newConnection); updateOnlineUsers(io);
  });
  
  socket.on('message', (data) => io.emit('message', formatedMessage(data)));

  socket.on('changeNickname', ({ nickname }) => {
    connections.map((connection) => {
      const newConn = connection;
      if (connection === socket) newConn.nickname = nickname;
      return newConn;
    });
    updateOnlineUsers(io);
  });

  // Listen for disconnect
  socket.on('disconnect', () => {
    connections.splice(connections.indexOf(socket), 1);
    updateOnlineUsers(io);
  });
});
