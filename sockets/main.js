const fortmatedDate = require('../utils/formatedDate');
const messageModel = require('../models/messageModel');

const formatedMessage = ({ date = fortmatedDate(), nickname, chatMessage }) =>
  `${date} - ${nickname}: ${chatMessage}`;

const connections = [];

const updateOnlineUsers = (io) => {
  io.emit('conectedUsers', connections.map((connection) => connection.nickname));
};

const changeNick = (nickname, socket, io) => {
  connections.map((connection) => {
    const newConn = connection;
    if (connection === socket) newConn.nickname = nickname;
    return newConn;
  });
  updateOnlineUsers(io);
};

module.exports = async (io) =>
  io.on('connection', async (socket) => {
  socket.on('newUser', (nick) => {
    const newConnection = socket;
    newConnection.nickname = nick; connections.push(newConnection); updateOnlineUsers(io);
  });
  
  socket.on('message', (data) => {
    io.emit('message', formatedMessage(data));
    messageModel.addMessage(data);
  });

  socket.on('changeNickname', ({ nickname }) => changeNick(nickname, socket, io));
  
  socket.on('disconnect', () => {
    connections.splice(connections.indexOf(socket), 1);
    updateOnlineUsers(io);
  });

  const messagesHistory = await messageModel.getMessages();

  io.emit('messages-history', messagesHistory
    .map(({ message, ...rest }) => formatedMessage({ chatMessage: message, ...rest })));
});
