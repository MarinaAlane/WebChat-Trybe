module.exports = (io) => io.on('connection', (socket) => {
    socket.on('message', ({ chatMessage, nickname }) => {
        const todayDate = new Date().toLocaleString().replaceAll('/', '-');
        io.emit('message', `${todayDate} ${nickname}: ${chatMessage}`);
    });
    socket.on('disconnect', () => {
        console.log(`Usuário ${socket.id} desconectou`);
      });
});
