const Messages = require('../models/messagesModel');

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

    socket.on('message', async ({ chatMessage, nickname }) => {
        const timestamp = new Date().toLocaleString().replaceAll('/', '-');
        await Messages.createMessage(chatMessage, timestamp, nickname);
        io.emit('message', `${timestamp} ${nickname}: ${chatMessage}`);
    });

    socket.on('disconnect', () => {
        delete users[socket.id];
        io.emit('updateUsersList', users);
      });
});
