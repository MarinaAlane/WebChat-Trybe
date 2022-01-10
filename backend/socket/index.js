const messagesModel = require('../../models/messagesModel');

const currentlyTime = () => {
  const data = new Date();
  const dia = String(data.getDate()).padStart(2, '0');
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const ano = data.getFullYear();

  const dataAtual = `${dia}-${mes}-${ano}`;
  const horaAtual = data.toLocaleTimeString('pt-BR');

  return `${dataAtual} ${horaAtual}`;
};

const onlineUsers = [];

const serverReturnAfterLogin = (socket = null, _io = null, data = null) => {
const { nickname } = data;
  socket.emit('login', { onlineUsers });
  onlineUsers.push({ socketId: socket.id, nickname });
  socket.broadcast.emit('otherUserConnected', nickname);
};

const updateNickname = (socket = null, io = null, nickname = null) => {
    const userIndex = onlineUsers.findIndex((item) => item.socketId === socket.id);

    onlineUsers[userIndex] = { ...onlineUsers[userIndex], nickname };
    io.emit('alterNickname', onlineUsers);
  };

  const messagesHandler = async (_socket = null, io = null, data = null) => {
    const time = currentlyTime();
    const { nickname, chatMessage: message } = data;
    // try {
    //   await messagesModel.create({ time, nickname, message });
    //   console.log('Insertion successfully');
    // } catch (error) {
    //   console.log(error);
    // }
    io.emit('message', `${time} - ${nickname}: ${message}`);
  };

  const disconnectHandler = (socket = null, _io = null, _data = null) => {
    const userIndex = onlineUsers.findIndex((item) => item.socketId === socket.id);

    onlineUsers.splice(userIndex, 1);
    socket.broadcast.emit('otherUserDisconnected', { onlineUsers });
  };

module.exports = (io) => {
  io.on('connection', (socket) => {
    socket.on('login', (nickname) => {
      serverReturnAfterLogin(socket, io, { nickname });
    });

    socket.on('disconnect', () => {
      disconnectHandler(socket, io);
    });

    socket.on('alterNickname', (newNickName) => {
      updateNickname(socket, io, newNickName);
    });
  
    socket.on('message', async (data) => {
      try {
        await messagesHandler(socket, io, data);
      } catch (error) {
        console.log(error);
      }
    });
  });
};
