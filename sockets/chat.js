const formatNewDate = () => {
  const now = new Date();
  const nowPtBr = now.toLocaleString('pt-br');
  return nowPtBr.replaceAll('/', '-');
};

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`Usuário conectado. ID: ${socket.id} `);
    
    socket.on('message', async (message) => {
      const { nickname, chatMessage } = message;
      const stringMessage = await `${formatNewDate()} ${nickname} ${chatMessage}`;
      console.log(`${socket.id} enviou uma mensagem!`);
      io.emit('message', stringMessage);
    });
  });
};
