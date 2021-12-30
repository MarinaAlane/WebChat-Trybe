const users = {};

module.exports = (io) => io.on('connection', (socket) => {
    socket.on('newUser', (nickname) => {
        users[socket.id] = nickname;
        io.emit('updateUserList', users);
    });
    socket.on('message', ({ chatMessage, nickname }) => {
        const todayDate = new Date().toLocaleString().replaceAll('/', '-');
        io.emit('message', `${todayDate} ${nickname}: ${chatMessage}`);
    });
    socket.on('disconnect', () => {
        delete users[socket.id];
        io.emit('updateUserList', users);
      });
});
