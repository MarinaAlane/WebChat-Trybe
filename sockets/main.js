const getDateAndTime = () => {
const date = new Date();
const currentDate = date.toLocaleDateString('pt-BR').replace(/\//g, '-');
const currentHour = date.toLocaleTimeString('pt-BR', { hour12: true });
return `${currentDate} ${currentHour}`;
};

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`Usuário ${socket.id} conectado!`);

    socket.on('message', (msg) => {
      io.emit('message', `${getDateAndTime()} - ${msg.nickname}: ${msg.chatMessage}`);
    });

    socket.on('disconnect', () => {
      console.log(`Usuário ${socket.id} desconectado!`);
    });
  });
};
