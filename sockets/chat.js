const todayDate = new Date().toLocaleString();
module.exports = (io) => io.on('connection', (socket) => {
    console.log(`Usuário ${socket.id} conectado`);
    socket.on('message', ({ chatMessage, nickName }) => {
        io.emit('message', `${todayDate} - ${nickName}: ${chatMessage}`);
    });
    socket.on('disconnect', () => {
        console.log(`Usuário ${socket.id} desconectou`);
      });
});
