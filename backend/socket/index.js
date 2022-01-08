const currentlyTime = () => {
  const data = new Date();
  const dia = String(data.getDate()).padStart(2, '0');
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const ano = data.getFullYear();

  const dataAtual = `${dia}-${mes}-${ano}`;
  const horaAtual = data.toLocaleTimeString('pt-BR');

  return `${dataAtual} ${horaAtual}`;
};

let onlineUsers = [];

const allLoggedUsers = (_socket = null, io = null) => {
  const onlineUsersReverse = onlineUsers.reverse();
  io.emit('allLoggedUsers', onlineUsersReverse);
};

module.exports = (io) => {
  io.on('connection', async (socket) => {
  //   onlineUsers.push({ socketId: socket.id, nickname: data });

  // socket.emit('login', nickname);

  // socket.on('alterNickname', (newNickName) => { 
  //   nickname = newNickName; 
  // });
  
    allLoggedUsers(socket, io);

    socket.on('message', (clientMsg) => {
      const { chatMessage, nickname } = clientMsg;
      const time = currentlyTime();

      io.emit('message', `${time} - ${nickname}: ${chatMessage}`);
    });
  });
};
