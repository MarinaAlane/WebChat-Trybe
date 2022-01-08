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

const serverReturnAfterLogin = (socket = null, _io = null) => {
  const onlineUsersReverse = onlineUsers.reverse();

  socket.emit('serverReturnAfterLogin', { onlineUsersReverse });
};

module.exports = (io) => {
  io.on('connection', async (socket) => {
    socket.on('login', (nickname) => {
        onlineUsers.push({ socketId: socket.id, nickname });
  });

    // debug
    console.log('BACK: array onlineUsres');
    console.log(onlineUsers);

  // socket.on('alterNickname', (newNickName) => { 
  //   nickname = newNickName; 
  // });
  
  serverReturnAfterLogin(socket, io);

    socket.on('message', (clientMsg) => {
      const { chatMessage, nickname } = clientMsg;
      const time = currentlyTime();

      io.emit('message', `${time} - ${nickname}: ${chatMessage}`);
    });
  });
};
