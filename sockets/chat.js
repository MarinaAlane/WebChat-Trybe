const users = {}; // Stores users in object in order to manage connect
                    // and disconnect listing and nickname updates

module.exports = (io) => io.on('connection', (socket) => {
    socket.on('newUser', (nickname) => {
        users[socket.id] = nickname;
        io.emit('updateUsersList', users);
    });

    socket.on('updateNickname', (newNickname) => {
        users[socket.id] = newNickname;
        io.emit('updateUsersList', users);
    });

    socket.on('message', ({ chatMessage, nickname }) => {
        const todayDate = new Date().toLocaleString().replaceAll('/', '-');
        io.emit('message', `${todayDate} ${nickname}: ${chatMessage}`);
    });

    socket.on('disconnect', () => {
        delete users[socket.id];
        io.emit('updateUsersList', users);
      });
});
