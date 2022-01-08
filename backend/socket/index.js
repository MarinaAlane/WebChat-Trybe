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

const connectionLoggedUsers = (_socket = null, io = null) => {
  const onlineUsersReverse = onlineUsers.reverse();
  io.emit('LoggedUsers', onlineUsersReverse);
};
  
// const connectionYouLoggedUser = (socket = null, _io = null) => {
//   socket.emit('youLoggedUser', onlineUsersReverse);
// };

module.exports = (io) => {
  io.on('connection', async (socket) => {
  // let randomNickname;

  // socket.on('nickname', (data) => { // estou aqui
  //   // randomNickname = data;

  //   onlineUsers.push({ socketId: socket.id, nickname: data });
  // });

  // socket.emit('login', nickname);

    // socket.on('alterNickname', (newNickName) => { 
    //   nickname = newNickName; 
    // });

    // socket.emit('login', );
  
    connectionLoggedUsers(socket, io);

    socket.on('message', (clientMsg) => {
      // const { nickname, chatMessage } = clientMsg;
      const { chatMessage, nickname } = clientMsg;
      const time = currentlyTime();

      // Debug
      console.log('Nick sendo passado:');
      console.log(nickname);

      io.emit('message', `${time} - ${nickname}: ${chatMessage}`);
    });
  });
};
