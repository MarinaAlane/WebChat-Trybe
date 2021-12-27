module.exports = (io) => io.on('connection', (socket) => {
    socket.on('message', (chatMessage) => {
        io.emit('serverMessage', chatMessage);
    });
});

// add nickname
