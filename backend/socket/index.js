const currentlyTime = () => {
  const data = new Date();
  const dia = String(data.getDate()).padStart(2, '0');
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const ano = data.getFullYear();

  const dataAtual = `${dia}-${mes}-${ano}`;
  const horaAtual = data.toLocaleTimeString('pt-BR');

  return `${dataAtual} ${horaAtual}`;
};

module.exports = (io) => {
  io.on('connection', async (socket) => {
    socket.emit('userID', socket.id);

    socket.emit('youLogged', 'You are in');

    socket.on('userLogged', (nicknameRandom) => {
      io.emit('userLogged', nicknameRandom);
    });
  
    socket.on('message', async (clientMsg) => {
      const { nickname, chatMessage } = clientMsg;
      const time = currentlyTime();
      io.emit('message', `${time} - ${nickname}: ${chatMessage}`);
    });
  });
};
