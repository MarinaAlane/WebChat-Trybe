const currentlyTime = () => {
  const data = new Date();
  const dia = String(data.getDate()).padStart(2, '0');
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const ano = data.getFullYear();

  const dataAtual = `${dia}-${mes}-${ano}`;
  const horaAtual = data.toLocaleTimeString('pt-BR');

  return `${dataAtual} ${horaAtual}`;
};

// let onlineUsers = [];

const connectionUserLoggedEvent = (socket = null, io = null) => {
  socket.on('userLogged', (nicknameRandom) => {
    // onlineUsers.push({ socketId: socket.id, nickName: nicknameRandom });

    // io.emit('userLogged', { 
    //   nickname: nicknameRandom,
    //   onlineUsers: onlineUsers.reverse(),
    // });

    io.emit('userLogged', nicknameRandom);
  });
};

module.exports = (io) => {
  io.on('connection', async (socket) => {
    socket.emit('userID', socket.id);

    connectionUserLoggedEvent(socket, io);

    // socket.on('userLogged', (nicknameRandom) => {
    //   // onlineUsers.push({ socketId: socket.id, nickName: nicknameRandom });

    //   // io.emit('userLogged', { 
    //   //   nickname: nicknameRandom,
    //   //   onlineUsers: onlineUsers.reverse(),
    //   // });

    //   io.emit('userLogged', nicknameRandom);
    // });
  
    socket.on('message', async (clientMsg) => {
      const { nickname, chatMessage } = clientMsg;
      const time = currentlyTime();
      io.emit('message', `${time} - ${nickname}: ${chatMessage}`);
    });
  });
};