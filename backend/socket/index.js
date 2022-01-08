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
  socket.emit('serverReturnAfterLogin', { onlineUsers });

  socket.broadcast.emit('otherUserConnected', nickname);
};

module.exports = (io) => {
  io.on('connection', async (socket) => {
    socket.on('login', (nickname) => {
      serverReturnAfterLogin(socket, io, { nickname });
      onlineUsers.push({ socketId: socket.id, nickname });
    // debug
    console.log('BACK: onlineUsers');
    console.log(onlineUsers);
  });

  // socket.on('alterNickname', (newNickName) => { 
  //   nickname = newNickName; 
  // });
  

    socket.on('message', (clientMsg) => {
      const { chatMessage, nickname } = clientMsg;
      const time = currentlyTime();

      io.emit('message', `${time} - ${nickname}: ${chatMessage}`);
    });
  });
};
