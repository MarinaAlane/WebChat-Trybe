const { addMessage, getMessages } = require('../models/messageModel');

const getDateAndTime = () => {
const date = new Date();
const currentDate = date.toLocaleDateString('pt-BR').replace(/\//g, '-');
const currentHour = date.toLocaleTimeString('pt-BR', { hour12: true });
return `${currentDate} ${currentHour}`;
};

const connections = [];

const updateUsers = (io) => {
  io.emit('conectedUsers', connections.map((connection) => connection.nickname));
  console.log({ numConnections: connections.length });
};
// Feito com ajuda do viniG 
const removeUserOnDisconnect = (socketId) => {
  const indexToDeleteUser = connections
    .findIndex(({ id }) => id === socketId);

  connections.splice(indexToDeleteUser, 1);
};

module.exports = (io) => {
  io.on('connection', (socket) => {
    socket.on('newUser', (nick) => {
      const newCon = socket; newCon.nickname = nick; connections.push(socket); updateUsers(io); 
    });

    socket.on('getMessages', async () => {
      const messages = await getMessages(); socket.emit('showMessages', messages);
    });

    socket.on('changeNickname', (nickname) => {
      connections.map((conn) => {
        const nc = conn; if (nc.nickname === socket.nickname) nc.nickname = nickname; return nc;
}); updateUsers(io);
    });

    socket.on('message', (msg) => {
      io.emit('message', `${getDateAndTime()} - ${msg.nickname}: ${msg.chatMessage}`);
      addMessage({ message: msg.chatMessage, nickname: msg.nickname });
    });

    socket.on('disconnect', () => { removeUserOnDisconnect(socket.id); updateUsers(io); });
  });
};
